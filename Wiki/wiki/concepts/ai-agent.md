---
title: AI Agent（智能体）
type: concept
tags: [ai-agent, concept, autonomy]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/AI Agent/一文看懂 AI Agent 的7大核心模块：Skill、RAG、MCP、Harness…….md
related:
  - concepts/vibe-coding.md
  - concepts/agentic-engineering.md
  - entities/mcp.md
  - concepts/skills-concept.md
  - concepts/harness-engineering.md
  - concepts/prompt-engineering-trilogy.md
---

# AI Agent（智能体）

## 定义

能自主感知环境、制定计划、执行多步任务并自我修正的 AI 系统。区别于普通 ChatBot 的核心是**自主执行能力**——不只是回答问题，而是动手做事。

## 能力层次

```
L1: 对话 AI        → 一问一答，无记忆
L2: 代码补全        → 实时建议，单次操作
L3: 任务执行        → 多步操作（读文件→写代码→跑测试）
L4: 自主 Agent      → 规划→执行→验证→修正 全闭环
L5: 多 Agent 协同   → 多个 Agent 分工协作，人类监督
```

## 核心组件

| 组件 | 作用 |
|---|---|
| **感知** | 读取环境信息（文件、API 响应、网页内容） |
| **规划** | 将目标分解为可执行步骤 |
| **执行** | 调用工具完成每步操作 |
| **记忆** | 短期（会话上下文）+ 长期（跨会话知识） |
| **反思** | 评估执行结果，自我修正 |

## 典型 Agent 工具

| 工具 | 层次 | 特点 |
|---|---|---|
| **Claude Code** | L4-L5 | 终端 Agent，支持 Subagent 并行 |
| **Codex** | L4 | 云端全流程自动化 |
| **Cursor 3** | L4-L5 | 多智能体协同 IDE |
| **OpenClaw** | L4 | 消息平台 Agent |
| **Hermes Agent** | L4 | 自进化 Agent |
| **Devin** | L4 | 首个全自主 AI 软件工程师 |

## Agent 与 MCP 的关系

```
Agent（大脑）
  ↓ 决策用哪个工具
MCP（接口）
  ↓ 标准化连接
外部工具（手脚）
  浏览器 / 数据库 / GitHub / Figma / ...
```

Agent 负责**决策和规划**，MCP 提供**标准化工具接口**。两者结合才能让 AI 真正「动手做事」。

## Agent 的关键能力

1. **工具使用**：调用外部 API、执行命令、操作文件
2. **任务分解**：将复杂目标拆分为可执行子任务
3. **错误恢复**：执行失败时自动调整策略
4. **知识积累**：从成功经验中学习，越用越好

## 七大核心工程模块

随着大模型基础能力趋于同质化，AI 行业的竞争焦点已从模型本身转移到**如何将以下七个模块高效整合**。

### 三层架构

```
工程层：SDD（规范） + Harness（驾驭）→ 确保开发规范和运行稳定
能力层：Skill + Prompt + RAG + MCP → 赋予场景技能和连接世界的能力
资源层：Token → 精细化管理 AI 的「燃料」与「内存」
```

### 七大模块详解

| 模块 | 一句话 | 关键点 |
|------|--------|--------|
| **Token** | AI 系统运行的基础信息载体 | 大模型只能识别 Token；Token 数量决定推理深度；精细管控 = 降低成本 + 提高思考质量 |
| **Skill** | 可复用功能模块，AI 的「能力包」 | 本质是文本而非可执行程序；行业统一标准为 OpenAI Function Calling 格式；Skill 清单 = Agent 的战斗力 |
| **Prompt** | AI 的「编程语言」 | 三种类型：任务 Prompt / 角色 Prompt / 思维 Prompt；好的 Prompt 让普通模型变 Agent |
| **RAG** | 让 AI 开卷考试 | 知识是冻死的（训练截止）+ 喜欢胡说（幻觉）→ 实时检索外部知识再生成答案 |
| **MCP** | AI 世界的 USB-C | 统一外部资源通信协议；有 MCP = Agent，没有 MCP = 问答工具；缺点是绑定体系 |
| **SDD** | Skill Definition Document，技能定义规范 | Agent 生态的基础；让不同开发者开发的 Skill 互相调用 |
| **Harness** | 驾驭工程，Agent 的缰绳 | 上下文统筹/工具调用/沙箱/权限/日志/审核；Demo → 生产级的关键 |

### 一句话总结

> 行业竞争的下半场，已经不是「谁的模型更强」的军备竞赛，而是「谁能把这些七巧板拼得更快、更稳、成本更低」的效率之争。

## Prompt 工程三板斧

Prompt 工程的三个核心技术——Few-shot（格式稳定）、Chain-of-Thought（推理准确）、Self-Consistency（答案稳定）——是 Agent 推理能力的基础支撑。详见 [[prompt-engineering-trilogy|Prompt 工程三板斧]]。
