---
title: Hermes Agent 五层架构深度拆解
type: topic
tags: [hermes-agent, architecture, agent, deep-dive, gateway, system-prompt, self-healing]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/OpenClaw/OpenClaw vs Hermes：拆解 Hermes Agent 五层架构.md
  - raw/articles/Hemmers/Hermes Agent 架构详解.md
related:
  - entities/hermes-agent.md
  - comparisons/openclaw-vs-hermes.md
  - concepts/agent-self-evolution.md
  - concepts/agent-memory-systems.md
  - concepts/agent-context-compression.md
---

# Hermes Agent 五层架构深度拆解

**核心方法**：跟一条消息走一遍——从终端敲下一句话到最后一个字回到屏幕，中间发生的所有事就是这个 Agent 的全部骨架。

> 消息接收 → 平台适配 → 会话管理 → 上下文组装 → 记忆注入 → 技能发现 → 流式执行 → 工具调用 → 上下文压缩 → 子 Agent 分发 → 错误恢复 → 状态持久化

## 五层架构总览

| 层 | 名称 | 核心职责 |
|---|------|---------|
| 第一层 | **入口层** | CLI + 20+ 消息平台适配器 |
| 第二层 | **网关层** | `GatewayRunner` 常驻进程，管连接、会话生命周期、斜杠命令 |
| 第三层 | **执行层** | `AIAgent`（`run_agent.py`），组装上下文、调模型、跑工具、处理错误 |
| 第四层 | **扩展层** | 工具注册中心、技能系统、子 Agent 委托、MCP 客户端、8 个外部记忆 Provider |
| 第五层 | **存储层** | SQLite + FTS5、MEMORY.md / USER.md、Skills 目录、config.yaml、.env |

一条消息的完整路径：

```
终端输入 → CLI 解析 → 会话加载 → 上下文组装
→ 模型推理 → 工具执行 → 流式输出 → 状态落盘
```

---

## 一、适配器模式：内外统一

Hermes 支持 20+ 平台，每个平台消息格式都不一样（Telegram 长轮询、Slack WebSocket、Email IMAP、SMS HTTP Webhook）。

### 设计模式

所有平台适配器继承 `BasePlatformAdapter`：

```python
class BasePlatformAdapter(ABC):
    @abstractmethod
    async def connect(self) -> bool: ...
    @abstractmethod
    async def disconnect(self) -> None: ...
    @abstractmethod
    async def send(self, chat_id, content, reply_to=None, metadata=None) -> SendResult: ...
```

基类只定义 `connect` / `disconnect` / `send`，消息转换逻辑藏在每个适配器的 `connect()` 里——监听回调拿到平台原始消息后，自己构造 `MessageEvent`，再交给基类统一处理。

这是**约定**而非**约束**：各自监听、各自构造 `MessageEvent`，后续所有代码对同一个内部对象干活。

### 一进一出

- **进来**：各平台消息 → 统一成 `MessageEvent`
- **出去**：文本里加 `MEDIA:/absolute/path/to/file` 前缀发附件。Gateway 在展示前剥掉 `MEDIA:` 指令，交给对应平台转成各自的附件 API（飞书走上传素材接口，Discord 拼 file attachment，iMessage 走 BlueBubbles）

**核心代码（主循环、工具、记忆、技能）从头到尾只跟统一协议打交道。接新平台只需写一个适配器。**

---

## 二、Gateway 的 Profile 隔离

Gateway 启动按顺序做四件事：

1. SSL 证书自动探测（在任何 HTTP 库导入**之前**）
2. 加载 `~/.hermes/.env`
3. 桥接 `config.yaml` 到环境变量（YAML 支持 `${ENV_VAR}` 引用）
4. 启动启用的平台适配器

### Profile 隔离机制

```bash
hermes profile create coder --clone  # 复制当前 profile
hermes -p coder chat                 # 一次性切换
hermes profile use coder             # 设为默认
```

核心原理：一个 `HERMES_HOME` 环境变量控制整棵目录树。在 CLI 入口处、任何模块导入**之前**就设置好，所有后续代码通过 `get_hermes_home()` 拿主目录。一台机器上可以同时跑"工作 Agent"和"个人 Agent"，互不打扰。

---

## 三、Agent 主循环

项目的心脏——`AIAgent`（`run_agent.py`）。

### 主循环骨架

```python
while iteration_budget.remaining > 0:
    response = client.chat.completions.create(
        model=model, messages=messages, tools=tool_schemas, stream=True
    )
    if response 有 tool_calls:
        执行工具(可能并行)
        iteration_budget.consume()
    else:
        return response.content  # 返回最终结果
```

### 三种退出路径

| 退出方式 | 触发条件 | 行为 |
|---------|---------|------|
| 正常完结 | 模型给最终文本（本轮无 tool_calls） | 返回 `response.content` |
| 预算耗尽 | `iteration_budget.remaining` 归零 | 硬上限，防 token 烧光 |
| 用户中断 | `_interrupt_requested` 被置位 | break 出循环，持久化已有结果 |

### 迭代预算

- 父 Agent：90 轮
- 子 Agent：50 轮
- 每轮推理消耗 1 次预算（不管这轮并行调了几个工具）

**PTC 退还机制**：当本轮工具调用里只有 `execute_code` 一种时，刚扣掉的迭代被退还。

`execute_code`（Programmatic Tool Calling）：模型不是直接调工具，而是写一段 Python 脚本，脚本内部通过 RPC 把 web_search、read_file 等工具串起来跑。

对比：同样做 8 次信息获取——
- 普通工具调用：8 轮模型推理，吃掉 8 次预算
- PTC：1 轮写出脚本，脚本自己连调 8 次 → **1 轮推理**

退还的意义：脚本密集型任务可能要写十几个脚本才做完，一次扣 1 轮的话 90 轮很快被脚本执行吃光。让脚本执行零成本，预算全留给需要推理的轮次。

### 工具并行执行

三个集合决定工具能否并行：

```python
_NEVER_PARALLEL_TOOLS = frozenset({"clarify"})            # 会跟用户交互
_PARALLEL_SAFE_TOOLS = frozenset({                         # 只读，无共享状态
    "read_file", "search_files", "session_search",
    "skill_view", "skills_list",
    "vision_analyze", "web_extract", "web_search",
    # ...
})
_PATH_SCOPED_TOOLS = frozenset({"read_file", "write_file", "patch"})
```

路径工具冲突检查：提取每次调用的目标路径，两两比对看有无重叠（同一路径或一个是另一个的祖先）。重叠 → 串行（防读写竞态），路径独立 → 并行。并行池最多 8 个工作线程。

### delegate_task（子 Agent）

模型选 `delegate_task` 时，fork 一个新的 `AIAgent`：

- 子 Agent 有自己独立的上下文和 50 轮迭代预算
- 父子之间只通过任务描述（传入）和最终摘要（传出）通信
- 子 Agent 被禁用 5 个工具：`delegate_task`（防套娃）、`clarify`（不能反问用户）、`memory`（不污染共享记忆）、`send_message`（不直接发消息）、`execute_code`（应逐步推理）
- 最大深度 1 层，并发上限 3 个
- 30 秒心跳实现**级联中断**：父停 → 子停

> 主 Agent 上下文只看到委托调用和最终摘要，看不到子 Agent 那可能 20 次工具调用的中间过程。用一点并行开销换主 Agent 的长寿。

---

## 四、系统提示词

模型推理前，系统提示词按顺序拼装：

```
身份 → 工具行为引导 → 外部系统提示 → 记忆
→ 技能索引 → 项目上下文 → 运行时元数据
```

**顺序的门道**：越稳定的内容越靠前，配合前缀缓存——前缀不变就能命中，只有尾巴会变。

### 身份
默认 `"You are Hermes Agent..."`，用户可在 `~/.hermes/SOUL.md` 自定义人格覆盖。

### 工具行为引导（模型特定）
- GPT/Gemini/Grok 家族：注入 `TOOL_USE_ENFORCEMENT_GUIDANCE`——"说做就做，别光说不动"
- GPT 还有 `<tool_persistence>`、`<mandatory_tool_use>`、`<prerequisite_checks>` 等模块，逐一应对 GPT 的老毛病：部分结果就放弃、跳过前置检查、不调工具直接编答案
- Claude 不需要这段——不同模型在工具调用行为上确实有差异

### 项目上下文安全扫描

从工作区扫 `.hermes.md` / `HERMES.md` / `AGENTS.md` / `CLAUDE.md` / `.cursorrules`，注入前过 10 条正则：

```
ignore previous instructions → prompt_injection
do not tell the user → deception_hide
HTML 注释注入 → html_comment_injection
隐藏 div → hidden_div
curl + 环境变量 → exfil_curl
cat 敏感文件 → read_secrets
```

命中任何一条规则，整个文件内容被阻断并替换为 `[BLOCKED: ...]`。

> ⚠️ 盲区：这些正则只覆盖英文模式。中文 prompt injection（"忽略之前的所有指令"）不在检测范围内。是否该用模型做 injection 检测？正则快但易绕过，模型检测更鲁棒但增延迟和成本。

### 技能索引
只放紧凑目录（`<available_skills>` 标签），模型通过 `skill_view` 按需加载完整内容——启动时不全部塞进来。

---

## 五、记忆系统

详见 [[../concepts/agent-memory-systems|Agent 记忆系统设计]]。这里补充几个关键设计细节：

- **冻结快照**：记忆在会话开始时注入，会话期间不变（为前缀缓存）
- **写入安全扫描**：记忆写入要过 threat patterns 检测（prompt injection、role hijack、exfil、SSH backdoor 等）
- **容量限制**：MEMORY.md 2200 字符、USER.md 1375 字符（按字符算而非 token，模型无关）

---

## 六、自我修复

主循环每一步都可能出问题，Hermes 的做法是**按错误分类，各走各的恢复路径**。

### 错误分类器

`FailoverReason` 枚举归了 14 种错误。每个错误过一道分类器，封装成 `ClassifiedError`，只带四个布尔恢复标记：

```python
retryable: bool                  # 能直接重试？
should_compress: bool            # 先压缩上下文再重试？
should_rotate_credential: bool   # 切换到下一个 API Key？
should_fallback: bool            # 切到 fallback 模型？
```

主循环只看这四个标记决定下一步，不做字符串匹配。

### 典型对比：HTTP 402 vs 429

两者表面都是"限额"错误，处理完全不同：
- **429 临时限流**：退避重试同一个 Key → `retryable=True`
- **402 额度耗尽**：同一个 Key 短期内不恢复 → `should_rotate_credential=True`

不分清楚的话，Agent 会在一个没钱的 Key 上反复退避到天荒地老。

### 用户中断

用户 Ctrl+C 或发新消息触发时**不 raise 而是 break**。如果前面 tool_calls 已追加但没执行，会补一个伪造错误 tool result，保证消息结构对 API 合法——下次恢复对话不会被 Provider 拒。

---

## 七、消息返回

流式 token 通过 `_fire_stream_delta()` 边生成边推：
- CLI：直接写进 prompt_toolkit 的 `patch_stdout`
- Gateway：`stream_consumer.py` 按 1 秒节流编辑同一条消息（不是每个 token 发一条，防平台限流）

附件处理：文本中嵌入 `MEDIA:/path/to/file` 前缀，Gateway 在展示前剥掉，交给对应平台适配器转成各自的附件 API。

**一进一出，两层适配把平台差异挡在核心之外。**

---

## 八、自进化

这是 Hermes 区别于 OpenClaw 的核心所在。详见 [[../concepts/agent-self-evolution|Agent 自进化]]。

### 回复发出后的后台三件事

`run_conversation()` 返回前还有三件事，在用户看完回复后发生，对用户零感知：

1. **落盘**：会话状态持久化
2. **记忆同步**：
   - 内置 MEMORY.md / USER.md：每次 `memory` 工具调用立刻 atomic rename 写磁盘
   - 外部 Provider：每轮结束调 `sync_all()`，会话末调 `on_session_end()`
3. **后台复盘**：每 10 轮推理触发一次 mini Agent 复盘，独立后台线程，不回显给用户

---

## 关键设计决策总结

| # | 设计决策 | 动机 |
|---|---------|------|
| 1 | 压缩后开新会话形成 session 链 | "省成本"和"不丢历史"分层满足 |
| 2 | 会话中记忆不更新 | 保持前缀缓存命中 |
| 3 | 被中断的工具自动补齐结果 | 保证消息结构合法 |
| 4 | 不同模型用不同提示词鞭策 | GPT 需要，Claude 不需要 |
| 5 | 技能自进化 = prompt 引导 + 后台复盘 | 用户零感知，经验不蒸发 |
