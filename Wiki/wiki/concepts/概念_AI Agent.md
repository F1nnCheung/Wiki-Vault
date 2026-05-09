---
title: AI Agent（智能体）
type: concept
tags: [ai-agent, concept, autonomy]
created: 2026-05-09
updated: 2026-05-09
sources: []
related:
  - concepts/概念_Vibe Coding.md
  - concepts/概念_Agentic Engineering.md
  - entities/mcp.md
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
