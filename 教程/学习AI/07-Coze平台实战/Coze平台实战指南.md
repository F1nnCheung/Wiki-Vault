---
title: Coze 平台实战指南
type: tutorial
tags: [Coze, 扣子, 低代码, Agent编排, 可视化, 学习计划]
created: 2026-06-01
updated: 2026-06-01
sources:
  - Wiki/wiki/entities/coze.md
  - Wiki/wiki/comparisons/lowcode-ai-platforms.md
  - Wiki/wiki/concepts/ai-agent.md
related:
  - ../Dify平台实战/Dify平台实战指南.md
  - ../AI Agent/AI Agent 学习指南.md
---

# Coze 平台实战指南

> 对应学习计划**第 5 周 Day 5-7**：先理解 Agent 核心原理（Day 1-4 见 [[../AI Agent/AI Agent 学习指南|AI Agent 教程]]），再用 Coze 可视化编排快速搭建 Agent——手写 Agent 核心代码 + Coze 快速原型，两条腿走路。

---

## 学习心法

> 💡 **Coze 不是「玩具」，是 Agent 思想的速成教具**。通过 Coze 的可视化编排，你能在 1 小时内直观理解 Agent 的工具调用、条件分支、记忆存储。然后回到代码层手写 Agent 时，你能清晰地知道每个模块对应 Coze 中哪个节点。

---

## 学习路线图

```
第一章：认识 Coze（30 分钟）
  ├── Coze 是什么？四大产品线
  ├── Coze vs Dify 选型
  └── 扣子 Agent 核心概念：人设 + 技能 + 记忆

        ↓

第二章：快速上手第一个 Agent（1 小时）
  ├── 注册与界面概览
  ├── 人设与回复逻辑（系统提示词）
  ├── 插件添加与配置
  ├── 知识库挂载
  └── 实战产出：个人开发助手 Agent

        ↓

第三章：可视化工作流编排（1.5 小时）
  ├── 工作流核心节点（LLM/条件/循环/代码）
  ├── 代码解释 + SQL 生成 + 接口调试工作流
  ├── Agent Skills 三级体系
  └── 实战产出：全栈开发助手 Agent（三合一工作流）

        ↓

第四章：发布与 API 集成（1 小时）
  ├── 多平台一键发布
  ├── API 调用方式
  ├── 与本地开发环境集成
  └── 实战产出：发布 Agent 为 API，接入本地 VS Code
```

---

## 第一章：认识 Coze

### 1.1 Coze 是什么？

Coze（国内版：**扣子**）是字节跳动推出的 AI Agent 开发平台，定位「人人都是 AI 开发者」。

**一句话**：像搭积木一样创建 AI Agent——内置上千款工具插件，支持零代码可视化编排，一键发布到微信、抖音、飞书等平台。

### 1.2 四大产品线

| 产品 | 定位 | 适合谁 |
|------|------|-------|
| **扣子 Agent** | 智能体对话助手 + 技能商店 | 所有人 |
| **扣子编程** | AI 编程（Vibe Coding）+ 低代码（可视化） | 产品经理、程序员 |
| **扣子罗盘** | Agent 开发与运维平台（全生命周期管理） | 专业开发者 |
| **扣子开源** | 企业私有化部署与二次开发 | 企业技术团队 |

### 1.3 Coze vs Dify 快速对比

| 维度 | Coze | Dify |
|------|------|------|
| **上手难度** | ⭐ 极低（零代码为主） | ⭐⭐⭐ 中等（需理解架构） |
| **开源** | 部分开源 | ✅ 完全开源 Apache 2.0 |
| **私有化部署** | 扣子开源版 | ✅ Docker 一键部署 |
| **插件生态** | ✅✅ 500+ 插件 + 技能商店 | ⚠️ 基础，不如 Coze |
| **多平台分发** | ✅✅ 微信/抖音/飞书/小程序/API | ⚠️ 主要为 API 和网页嵌入 |
| **RAG 能力** | 内置基础 RAG | ✅✅ 深度 RAG Pipeline |
| **LLMOps** | 基础监控 | ✅✅ 完整 LLMOps 套件 |
| **适合场景** | 快速原型、非技术人员、内容创作 | 企业级 AI 应用、复杂 RAG、数据安全 |

> 📖 完整对比见 [[Wiki/wiki/comparisons/lowcode-ai-platforms|低代码 AI 平台对比]]。

---

## 第二章：快速上手第一个 Agent

### 2.1 注册与界面概览

```
1. 访问 https://www.coze.cn （国内）/ https://www.coze.com （国际）
2. 手机号/邮箱注册
3. 进入「扣子 Agent」→ 创建智能体
```

**三大配置面板**：

| 面板 | 作用 | 类比 |
|------|------|------|
| **人设与回复逻辑** | 定义 Agent 的身份、能力、回复风格 | Agent 的「性格和岗位描述」 |
| **编排** | 配置模型、插件、工作流、知识库 | Agent 的「工具箱」 |
| **预览与调试** | 实时测试 Agent 效果 | 面试 Agent |

### 2.2 人设与回复逻辑

这是 Agent 的「系统提示词」，直接影响 Agent 的表现质量：

```markdown
# 角色
你是一个资深全栈开发助手，精通 TypeScript、React、Node.js、PostgreSQL。

# 能力范围
- 代码编写：根据需求生成可直接运行的代码
- 代码解释：解释复杂逻辑，标注关键设计决策
- Bug 定位：分析错误信息，定位根因，给出修复方案
- SQL 生成：根据表结构生成优化后的查询
- 技术选型：根据场景推荐合适的技术方案

# 回复风格
- 代码优先，解释为辅
- 不确定时明确标注，不编造
- 代码块标注语言类型
- 涉及多文件时标注文件路径

# 约束
- 不确定的 API/参数用 TODO: verify 标注
- 不推荐已废弃的 API（如 React 16 的生命周期）
- 安全相关代码额外标注注意事项
```

### 2.3 插件添加与配置

Coze 有 500+ 内置插件，分类如下：

| 类别 | 精选插件 | 用途 |
|------|---------|------|
| **代码工具** | 代码执行器、JSON 解析器、HTTP 请求 | 基础开发工具 |
| **搜索引擎** | 必应搜索、Google 搜索、头条搜索 | 联网获取最新信息 |
| **办公协作** | 飞书文档、多维表格、日历 | 企业内部集成 |
| **效率工具** | 图片理解、语音合成、OCR 识别 | 多模态能力 |
| **知识管理** | 知识库插件、向量检索 | 挂载自有知识库 |

**添加方式**：编排 → 插件 → 搜索插件名 → 添加

### 2.4 知识库挂载

Coze 支持上传文档作为 Agent 的私有知识库：

```
编排 → 知识库 → 新建知识库 → 上传文档
```

**支持格式**：TXT、PDF、Markdown、Word、CSV、网页链接

**使用建议**：
- 上传项目 README、架构文档、API 文档
- 切片长度选择「智能分段」
- 关联到 Agent 后，在对话中 Agent 会自动参考知识库内容

### 2.5 实战产出：个人开发助手 Agent

完成上述配置后，你的 Agent 应该具备：
- 清晰的开发者人设
- 代码生成 + 解释 + Bug 定位 + SQL 生成 + 技术选型
- 联网搜索能力（必应搜索插件）
- 私有知识库（项目文档）

**测试用例**：
1. 「用 React + TypeScript 写一个 useDebounce hook」
2. 「这段代码有什么问题？」（粘贴代码）
3. 「PostgreSQL 中如何优化一个百万行表的查询？」
4. 「Next.js 14 和 Remix 各适合什么场景？」

---

## 第三章：可视化工作流编排

### 3.1 工作流核心节点

Coze 工作流由以下核心节点组成：

```
开始节点
  ↓
[LLM 节点]     → 调用大模型生成内容
[条件节点]     → if-else 分支逻辑
[循环节点]     → 遍历列表 / 重复执行
[代码节点]     → 执行 Python/JS 自定义逻辑
[知识库节点]   → 检索私有知识库
[插件节点]     → 调用任意插件
[变量节点]     → 暂存中间结果
[结束节点]     → 输出最终结果
```

### 3.2 实战工作流 1：代码解释器

```
开始 → 接收代码输入
  ↓
节点1: LLM（分析代码结构）
  ↓
节点2: 条件判断（复杂度 > 100行？）
  ├── 是 → 节点3: LLM（分段解释）
  └── 否 → 节点4: LLM（整体解释）
  ↓
节点5: 代码节点（格式化输出）
  ↓
结束 → 返回解释 + 关键点列表
```

### 3.3 实战工作流 2：SQL 生成器

```
开始 → 接收自然语言查询需求
  ↓
节点1: 知识库节点（检索表结构文档）
  ↓
节点2: LLM（理解需求 + 表结构 → 生成 SQL）
  ↓
节点3: LLM（SQL 安全检查：注入/SELECT */无 LIMIT）
  ↓
节点4: 条件判断（通过安全检查？）
  ├── 是 → 结束（返回 SQL + EXPLAIN 建议）
  └── 否 → 节点5: LLM（修复安全问题 → 回到节点3）
```

### 3.4 实战工作流 3：接口调试助手

```
开始 → 接收接口信息（方法/URL/参数）
  ↓
节点1: 代码节点（构造 HTTP 请求）
  ↓
节点2: HTTP 请求插件（发送请求）
  ↓
节点3: 条件判断（响应状态码？）
  ├── 2xx → 节点4: LLM（分析响应体，总结数据结构）
  ├── 4xx → 节点5: LLM（分析错误原因，给出修复建议）
  └── 5xx → 节点6: LLM（分析服务端错误）
  ↓
结束 → 返回分析结果
```

### 3.5 实战：全栈开发助手 Agent（三合一）

将上述三个工作流集成到一个 Agent 中：

```
全栈开发助手
├── 技能1: 代码解释（触发词：「解释这段代码」「这段代码什么意思」）
├── 技能2: SQL 生成（触发词：「生成 SQL」「查询」「帮我写个 SQL」）
└── 技能3: 接口调试（触发词：「调试接口」「调用 API」「测试这个接口」）
```

配置方式：编排 → 添加工作流 → 为每个工作流设置跳转条件（关键词触发）

### 3.6 Agent Skills 三级体系

| 级别 | 复杂度 | 实现方式 | 示例 |
|------|-------|---------|------|
| **初级** | 结构化 Prompt | 编写详细的 SKILL.md | 「代码审查」→ 写一段审查维度的 Prompt |
| **中级** | Prompt + API | 初级 + 调用外部 API | 「SQL 生成」→ Prompt + 知识库检索 API |
| **高级** | Prompt + API + 脚本 | 中级 + Python/JS 代码 | 「自动化测试」→ Prompt + 运行测试 + 分析结果 |

---

## 第四章：发布与 API 集成

### 4.1 多平台一键发布

Coze 的核心优势：一次搭建，多平台发布。

| 发布平台 | 配置难度 | 适用场景 |
|---------|---------|---------|
| **扣子商店** | ⭐ | 公开分享，获取用户 |
| **微信** | ⭐⭐ | 私域流量，企业内部 |
| **飞书** | ⭐ | 企业内部协作 |
| **抖音** | ⭐⭐ | 内容营销 |
| **微信小程序** | ⭐⭐⭐ | 产品级应用 |
| **Web 网页** | ⭐ | 嵌入网站 |
| **API** | ⭐⭐ | 接入自有系统 |

**发布步骤**：Agent 页面 → 发布 → 选择平台 → 填写配置 → 提交审核

> ⚠️ 微信/抖音发布需要应用审核，预留 1-3 个工作日。

### 4.2 API 调用

Coze 支持将 Agent 发布为 API，供本地程序调用：

```python
import requests

# Coze API 配置
API_URL = "https://api.coze.cn/v1/chat"
API_KEY = "pat_xxxxxxxx"  # 个人访问令牌
BOT_ID = "bot_xxxxxxxx"    # Agent ID

# 发送消息
response = requests.post(
    API_URL,
    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    },
    json={
        "bot_id": BOT_ID,
        "user": "developer-001",
        "query": "用 TypeScript 写一个 LRU Cache 实现",
        "stream": False
    }
)

print(response.json()["messages"][-1]["content"])
```

### 4.3 与本地开发环境集成

#### VS Code 集成（通过 REST Client 或自定义扩展）

```json
// .vscode/settings.json
{
  "rest-client.environmentVariables": {
    "coze": {
      "apiKey": "pat_xxxxxxxx",
      "botId": "bot_xxxxxxxx"
    }
  }
}
```

```http
### .vscode/coze.http
POST https://api.coze.cn/v1/chat
Authorization: Bearer {{apiKey}}
Content-Type: application/json

{
  "bot_id": "{{botId}}",
  "user": "vscode-user",
  "query": "审查当前打开的文件",
  "stream": false,
  "additional_messages": [
    {
      "role": "user",
      "content": "文件内容：{{fileContent}}"
    }
  ]
}
```

#### 终端集成（通过 Shell 函数）

```bash
# ~/.zshrc 或 ~/.bashrc
coze() {
  curl -s -X POST "https://api.coze.cn/v1/chat" \
    -H "Authorization: Bearer $COZE_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"bot_id\": \"$COZE_BOT_ID\", \"user\": \"cli-user\", \"query\": \"$1\", \"stream\": false}" \
    | jq -r '.messages[-1].content'
}

# 使用
coze "帮我查一下 localhost:3000 的 /api/users 接口返回格式"
```

### 4.4 进阶：Coze → 手写 Agent

当你通过 Coze 验证了 Agent 的核心逻辑后，可以将其迁移到代码层：

```
Coze 可视化原型 → 验证核心逻辑（1 天）
  ↓
确定 Agent 的核心工具和工作流
  ↓
手写代码实现：Function Calling + MCP + 记忆系统
  ↓
部署到自有服务器，突破 Coze 能力边界
```

**何时该从 Coze 迁移**：
- 需要自定义复杂的 Function Calling 逻辑（Coze 的代码节点有限）
- 需要接入自研模型或向量数据库
- 需要复杂的多 Agent 协作（Coze 对多 Agent 支持有限）
- 数据安全要求数据不出企业服务器
- 需要处理高并发请求（>100 QPS）

---

## 附录 A：学习计划对照

| 学习计划 Day | 学习内容 | 本文对应章节 |
|-------------|---------|------------|
| Day 5 | Coze 快速上手 | 第二章 |
| Day 6 | 可视化 Agent 编排 + 发布 | 第三章、第四章 |
| Day 7 | Agent + Coze 串联实战 | 第四章（Coze → 手写 Agent） |

> ⚠️ 学习计划 Day 1-4 的 Agent 理论基础，参见 [[../AI Agent/AI Agent 学习指南|AI Agent 教程]]。

## 附录 B：Coze 踩坑清单

1. **知识库检索不如预期**：Coze 的 RAG 是简化版，切片粒度不可精细控制。如需深度 RAG，用 Dify 或手写。
2. **代码节点有执行限制**：单次执行时间 30 秒上限，不能用 pip install 安装任意包。
3. **免费额度有限**：Coze 2.0 后基本功能已收费（积分制），生产环境需评估成本。
4. **模型选择有限**：主要支持豆包系列模型，非字节系模型支持有限。
5. **工作流复杂度有限**：节点数量有限制，超复杂编排建议用 Dify 或 LangGraph。

## 附录 C：延伸阅读

| 主题 | 知识库资源 |
|------|-----------|
| AI Agent 核心概念（L1-L5 能力层次） | [[Wiki/wiki/concepts/ai-agent\|AI Agent 概念页]] |
| Agent 手写开发完整教程 | [[../AI Agent/AI Agent 学习指南\|AI Agent 学习指南]] |
| Coze vs Dify 全面对比 | [[Wiki/wiki/comparisons/lowcode-ai-platforms\|低代码 AI 平台对比]] |
| Agent 记忆系统设计 | [[Wiki/wiki/concepts/agent-memory-systems\|Agent 记忆系统]] |
| Agentic Engineering | [[Wiki/wiki/concepts/agentic-engineering\|Agentic Engineering]] |

---

> 📖 Coze 帮你快速验证 Agent 想法，但生产级定制必须回到代码层。接下来学习 [[../MCP与本地部署/MCP与本地部署学习指南|第 6 周：MCP 协议 + Function Calling + Ollama 本地部署]]——掌握 Agent 生态的核心协议和本地化方案。
