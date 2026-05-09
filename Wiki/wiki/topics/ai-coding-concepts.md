---
title: AI Coding 核心概念
type: topic
tags: [ai-coding, concepts, vibe-coding, agent, mcp, skills]
created: 2026-05-09
updated: 2026-05-09
sources: []
related:
  - entities/mcp.md
  - entities/vibe-coding.md
  - topics/ai-coding-history.md
  - topics/claude-code-introduction.md
---

# AI Coding 核心概念

## Vibe Coding（氛围编程）

> 2025 年初由 Andrej Karpathy（前 OpenAI 联合创始人）提出。

**定义**：用自然语言描述需求，让 AI 生成代码，开发者「凭感觉」编程——不逐行审查代码，而是描述想要什么效果，让 AI 反复迭代直到满意。

**核心特征**：
- 关注「做什么」而非「怎么做」
- 快速原型验证，迭代速度快
- 降低编程门槛，让非技术人员也能开发

**风险**：
- 代码质量难以保证——「AI 垃圾代码」堆积
- 生成成本趋近于零，但理解维护成本指数上升
- 可能陷入「死亡螺旋」：错误→AI 反刍→新错误

---

## Agentic Engineering（智能体工程）

> 2026 年初由 Karpathy 提出，是 Vibe Coding 的进化形态。

**定义**：多个 AI 智能体自主完成规划→编写→测试→审查全流程，人类退后为架构师和监督者。

**Vibe Coding vs Agentic Engineering**：

| 维度 | Vibe Coding | Agentic Engineering |
|---|---|---|
| 人类角色 | 需求描述者 | 架构师 / 监督者 |
| AI 角色 | 单一代码生成器 | 多 Agent 协同团队 |
| 流程 | 人→AI→人检查 | AI 自主规划→执行→验证 |
| 产出质量 | 不确定 | 有审查闭环保证 |

---

## MCP（Model Context Protocol）

参见 [[entities/mcp|MCP 实体页]]。

**一句话**：AI 连接外部工具和数据源的开放标准协议。类比 USB-C——标准化的连接方式。

```
AI ←→ MCP ←→ 浏览器 / 数据库 / GitHub / Figma / ...
```

---

## Skills（技能系统）

**定义**：给 AI 安装的可复用「能力包」——本质是特定目录下的 Markdown 文档，AI 自动发现并按需调用。

**Skills vs Slash 命令**：
- Skills：自动触发、复杂流程、包含脚本
- Slash 命令：手动触发、简单模板、提示文本

**Skills vs MCP**：
- Skills：教 AI **怎么想**（方法论、流程规范）
- MCP：给 AI **怎么做**（连接外部工具）

---

## Agent（智能体）

**定义**：能自主感知环境、制定计划、执行多步任务并自我修正的 AI 系统。

**Agent 的能力层次**：
```
L1: 对话 AI      → 一问一答
L2: 代码补全      → 实时建议
L3: 任务执行      → 多步操作（读文件→写代码→跑测试）
L4: 自主 Agent    → 规划→执行→验证→修正 全闭环
L5: 多 Agent 协同 → 多个 Agent 分工协作
```

---

## Claw / OpenClaw

参见 [[entities/openclaw|OpenClaw 实体页]]。

**一句话**：开源的个人 AI Agent，运行在你的电脑上，通过 WhatsApp/Telegram/Discord 等消息平台与你交互。

核心特征：本地运行、消息平台交互、可自主执行任务、丰富的 Skill 生态。

---

## Hermes Agent

参见 [[entities/hermes-agent|Hermes Agent 实体页]]。

**一句话**：Nous Research 开发的自进化 AI Agent，能从完成任务中自动提炼可复用技能，越用越聪明。

核心特征：自学习循环、跨会话记忆、40+ 内置工具、多平台网关、模型无关。

---

## ID Coding（意图编程）—— 终极形态

**定义**：人类表达意图 → 直接转化为软件服务。编程语言本身可能消失，取而代之的是意图表达和架构设计能力。

**演进路径**：
```
手写代码 → AI 补全 → Vibe Coding → Agentic Engineering → ID Coding
```
