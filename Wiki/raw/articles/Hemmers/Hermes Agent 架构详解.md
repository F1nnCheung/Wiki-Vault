AI灰鲸 *2026年5月24日 09:05*

## 如果你最近也在看 Agent 框架，会发现很多项目的问题不是「能不能调模型」，而是消息从哪来、上下文怎么保住、工具怎么接、中途怎么停、历史怎么找回来。Hermes Agent 这篇架构拆解刚好把这些工程细节摊开了。它不是只讲一个漂亮的 Agent 循环，而是把命令行、消息网关、IDE 插件、工具注册、压缩和会话存储放在同一张图里看，适合想自己搭 Agent 系统的开发者细读。

## 正文

// 01

## 先从全貌说起

整个系统可以用三句话概括：入口多样，内核唯一；功能模块化，依赖松耦合；状态持久化，会话可恢复。

![图片](https://mmbiz.qpic.cn/mmbiz_png/DsDpfuXjiaoDXGgTDUssKpcQQdkoo2yClv6yNZtibmgIRJH1PbaCVENqxQOXjYBtnQ3vUDRZlukfBSkqL3rfUib5cQT5ExOhzj0PKgBGTsgQnM/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

无论你从命令行、Telegram、VS Code 还是 REST API 发来消息，最终都由同一个 `AIAgent` 类来处理。这保证了行为一致，也大大降低了维护成本。工具系统、内存插件、上下文引擎都是注册制——可以随时插拔，不需要修改核心代码。

// 02

## Agent 循环：心跳一直在跳

如果说整个系统是一台机器，Agent 循环（Agent Loop）就是它的心跳。每当用户发来一条消息， `AIAgent.run_conversation()` 就开始一轮循环。

![fig.02 — Agent Loop 生命周期](https://mmbiz.qpic.cn/mmbiz_png/DsDpfuXjiaoDlHFBI5L9whEjNg00dWmceCBcCb2XZjxFYGUfxiasrLEYwpLibf4RLJH8CUQhcStlZyJpj74UWkX1V15mfTbQibG2OSX8U3MvFDA/640?from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

**可中断的 API 调用：** HTTP 请求在后台线程运行，主线程同时监听中断信号。用户发来 `/stop` 或新消息时，当前请求被丢弃，Agent 干净地响应新输入——不会有"回答到一半"的脏数据写入历史。

**Fallback 兜底：** 主模型报 429、5xx 或鉴权错误时，系统自动按配置顺序尝试备用服务商，整个对话不中断。辅助任务（视觉理解、压缩摘要）也有独立的备用链。

// 03

## Prompt 组装：系统提示词是怎么搭起来的

Hermes 把系统提示词拆成多个稳定层，在会话开始时一次性组装好，此后不再改动。核心原因是 **Prompt Cache 成本** ——稳定的前缀可将 token 费用降低约 75%。

![fig.03 — 系统 Prompt 组装层次（从上到下叠入）](https://mmbiz.qpic.cn/sz_mmbiz_png/DsDpfuXjiaoCetibzPAiaYqiaQnPURZ02AkIeSpjU6dopeziaIS0G6UhicVb98zwfBVVEJicPQibMskibZicHcj3ghOaqKrhxJicZFTKXaw0eIe1YnHcLE/640?from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

### 上下文文件优先级（仅加载第一个命中的）

1st ·.hermes.md / HERMES.md2nd · AGENTS.md3rd · CLAUDE.md4th ·.cursorrules

**记忆快照的微妙之处：** MEMORY.md 在会话开始时冻结进 Prompt。如果会话中途通过 `memory` 工具写入了新内容，它会实时写到磁盘，但 **不会** 改变当前会话的系统提示词——要等下一个会话才能看到新记忆。这防止了"改动 Prompt 导致缓存全部失效"的问题。

// 04

## 上下文压缩与缓存：长对话不失忆

处理复杂任务时对话往往很长——一个重构大型代码库的任务可能产生几十轮工具调用，消耗数万 token。Hermes 的解法是 **双层压缩系统** 加 Anthropic Prompt Cache。

![fig.04 — 双层压缩触发逻辑](https://mmbiz.qpic.cn/mmbiz_png/DsDpfuXjiaoA8tL8icWbjUpQ4kJu2IhKQe4McF72sK5YjJrD13YciaCk2B4SdcmKY6cPabJGFA17ZDrpyUzDGQtPKd0FcPQuMYOnHbpicg29TWw/640?from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

### 压缩算法四个阶段

PHASE 01

清除旧工具输出

无 LLM 调用，直接替换超过 200 字符的旧工具结果为占位符，最廉价的降本手段

PHASE 02

确定保护边界

头部保留 3 条，尾部按 token 预算保留最近 N 条（至少 20 条），中间段将被摘要

PHASE 03

LLM 生成结构化摘要

辅助 LLM 将中间段压缩为"目标→进度→决策→相关文件→下一步"的结构化摘要

PHASE 04

拼接并清理

组合头部+摘要+尾部，修复孤儿 tool\_call/tool\_result 对，生成子会话 ID

压缩后的实际效果： **45 条消息 95K token → 压缩后 25 条 45K token** ，关键进度和决策完整保留。再次压缩时，旧摘要会被"更新"而非重写，已完成的任务从"进行中"移到"已完成"，信息不丢失地迭代积累。

**Prompt Caching 策略（仅限 Anthropic）：** Hermes 在系统提示词和最近 3 条消息上各放置一个 cache breakpoint（共 4 个，达到 Anthropic 的上限），使多轮对话的输入 token 成本降低约 75%。

// 05

## 消息网关：一个 Agent，接入 20+ 平台

Hermes 有一个长期运行的消息网关进程，负责对接各种通讯平台。无论是 Telegram 群组消息、Discord @提及还是企业微信工单，都会被规范化成内部 `MessageEvent` ，交由同一个 AIAgent 处理。

![fig.05 — 网关消息流向](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 两级消息保护

当 Agent 正在处理一条消息时，用户发来第二条会被暂时排队。 `/stop` 、 `/approve` 、 `/deny` 等控制命令可以"插队"直接到达 Agent，其他消息则等待。这防止了并发竞争导致的历史记录混乱。

### DM 配对授权

管理员用 `/pair` 生成一次性配对码，新用户发送这个码就能获得授权，无需修改任何配置文件——适合快速将新用户引入 Agent。

// 06

## 工具系统：Agent 的手

工具是 Agent 执行能力的载体。Hermes 内置 70+ 工具，分成约 28 个工具集，从文件读写、终端命令到浏览器自动化，一应俱全。

### 自动注册机制

每个工具文件的底部只需一行注册调用，启动时自动被发现，无需手动维护列表：

```
# tools/file_tools.py 末尾
registry.register("read_file", read_file_handler, schema=READ_FILE_SCHEMA)

# tools/web_tools.py 末尾
registry.register("web_search", web_search_handler, schema=WEB_SEARCH_SCHEMA)
```

整个注册链路如下：

```
tools/registry.py    # 基础模块，无依赖，最先加载
    ↑
tools/*.py           # 各自在 import 时调用 registry.register()
    ↑
model_tools.py       # 汇总 schema，处理 handle_function_call() 分发
    ↑
run_agent.py         # 使用工具列表构造 LLM API 请求
```

### 终端工具支持 7 种后端

本地 shellDocker 容器SSH 远程DaytonaModalSingularityVercel Sandbox

切换执行环境只需改配置，工具调用代码不变。同时，MCP（Model Context Protocol）工具得到原生支持——挂载任意 MCP 服务后，Hermes 在运行时动态加载其暴露的工具，无需重启。

// 07

## 会话存储：记住每一次交流

Hermes 用 SQLite + FTS5 做会话持久化。FTS5 是 SQLite 的全文检索扩展，让 `session_search` 工具能在历史会话中快速检索关键词——Agent 在开始新任务前可以主动"回忆"相关背景。

### 会话血缘追踪（Lineage）

每次压缩会生成一个"子会话"，记录从哪个父会话压缩而来。这让你可以追溯一个长任务的完整历史，即便中途经过多次压缩。

### Profile 隔离

每个 profile（如 `hermes -p dev` 、 `hermes -p work` ）拥有独立的 `HERMES_HOME` ，包含独立的配置、记忆、会话和网关进程。多个 profile 可以同时运行，互不干扰——比如一个挂着 Telegram Bot，另一个跑着 IDE 插件。

// 08

## 设计哲学总结

读完这些子系统，可以提炼出 Hermes 背后的六条核心设计原则——它们相互支撑，共同造就了在复杂长任务场景下依然稳定可靠的 Agent 框架。

| 原则 | 具体体现 |
| --- | --- |
| Prompt 稳定性 | 系统提示词在会话内不变，最大化 Anthropic Prompt Cache 命中率，降低约 75% 输入 token 成本 |
| 可观测执行 | 每次工具调用都通过 callback 实时反馈给用户：CLI 显示 spinner，网关发送进度消息 |
| 可中断 | API 调用和工具执行均可被用户随时取消，不留脏数据，新消息优先处理 |
| 平台无关核心 | 同一个 AIAgent 类服务 CLI、消息网关、ACP IDE 插件、批处理和 API Server，平台差异在入口层处理 |
| 松耦合 | MCP、插件、内存提供者、RL 环境均为注册制和 check\_fn 门控，非强依赖，可按需启用 |
| Profile 隔离 | 每个 profile 有独立的 HERMES\_HOME、配置、记忆、会话、网关进程，多实例并行互不干扰 |

## AI灰鲸更建议把这篇当成一份 Agent 工程设计清单，而不是单纯的项目介绍。真正做过长任务 Agent 的人都知道，模型调用只是最显眼的一层，后面更磨人的其实是缓存命中、可中断执行、工具结果膨胀、消息并发和多平台会话隔离。Hermes 的价值在于，它把这些「上线以后才会疼」的问题前置成架构约束。你不一定要照搬它的实现，但这些模块边界很值得抄作业。尤其是 Prompt 稳定性、两层压缩和 profile 隔离这几块，放到任何企业内部 Agent 或开发者自动化助手里，都是迟早要面对的坑。

继续滑动看下一个

AI灰鲸

向上滑动看下一个