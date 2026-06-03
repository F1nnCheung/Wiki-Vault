---
title: 第一章：AI Agent 基础概念
type: tutorial
tags: [ai-agent, concept, beginner, tutorial]
created: 2026-05-29
updated: 2026-05-29
sources:
  - Wiki/wiki/concepts/ai-agent.md
  - Wiki/wiki/concepts/agentic-engineering.md
  - Wiki/wiki/topics/ai-coding-history.md
related:
  - 02-Agent核心架构.md
  - 00-AI Agent 学习指南.md
---

# 第一章：AI Agent 基础概念

> 从「AI 是什么」到「Agent 为什么是未来」，建立对 AI Agent 的系统认知。

---

## 1.1 什么是 AI Agent？

### 先理解 ChatBot，再理解 Agent

**ChatBot（聊天机器人）**：
- 你问 → 它答
- 单轮或简单多轮交互
- 没有自主行动能力
- 不记忆上下文（或记忆极短）

**AI Agent（智能体）**：
- 你给目标 → 它自主完成
- 多步骤闭环：感知→规划→执行→验证
- 能调用工具（读文件、执行命令、浏览网页）
- 有记忆系统，跨会话保留知识

> 核心区别：ChatBot **回答**问题，Agent **解决**问题。

### 一个例子理解 Agent

你对 ChatBot 说：「帮我分析这个项目的代码质量」→ 它只能告诉你「建议用 SonarQube 等工具」。

你对 Agent 说同样的话 → 它：
1. 列出项目文件结构
2. 逐个读取关键文件
3. 运行 lint 和 test
4. 分析代码模式
5. 生成一份质量报告并保存为文件

这就是 Agent 的**自主执行能力**。

### 严格定义

AI Agent 是能**自主感知环境、制定计划、执行多步任务并自我修正**的 AI 系统。

```
Agent = 感知 + 规划 + 执行 + 记忆 + 反思
```

> 📚 参考：[[Wiki/wiki/concepts/ai-agent|AI Agent 概念页]]

---

## 1.2 Agent 能力层次（L1-L5）

这是理解 Agent 成熟度的核心框架：

```
L5: 多 Agent 协同  ← 2026 年前沿
    │  多个 Agent 分工协作，人类监督
    │  代表：ECC（60 个 Agent）、Claude Code Subagent
    │
L4: 自主 Agent    ← 当前主流
    │  规划→执行→验证→修正 全闭环
    │  代表：Claude Code / Codex / OpenClaw / Hermes
    │
L3: 任务执行      ← AI Coding 工具入门
    │  多步操作（读文件→写代码→跑测试）
    │  代表：Cursor Tab、Copilot Agent Mode
    │
L2: 代码补全      ← 最早普及
    │  实时建议，单次操作
    │  代表：GitHub Copilot 补全、TabNine
    │
L1: 对话 AI       ← 2022 年底
    一问一答，无记忆
    代表：ChatGPT 基础版
```

### 层次跃迁的关键变化

| 跃迁 | 关键变化 | 时间节点 |
|------|---------|---------|
| L1→L2 | 从对话到代码生成 | 2021-2022 |
| L2→L3 | 从单次操作到多步执行 | 2023-2024 |
| L3→L4 | 从执行到自主规划+验证 | 2024-2025 |
| L4→L5 | 从单 Agent 到多 Agent 协同 | 2025-2026 |

> 注意：大多数标榜「AI Agent」的产品实际处于 L3-L4 之间。真正的 L5 多 Agent 协同仍处于前沿探索阶段。

---

## 1.3 Agent 五大核心组件

### 感知（Perception）

Agent 的「眼睛和耳朵」——读取和理解环境信息：

- 文件系统：读代码、配置、文档
- 网络：API 响应、网页内容
- 数据库：查询结果
- 用户输入：自然语言指令
- 传感器：智能家居温度、摄像头画面

### 规划（Planning）

Agent 的「大脑」——将目标分解为可执行步骤：

```
用户：「做一个用户登录页面」

Agent 规划：
1. 分析需求：需要什么字段？什么验证规则？
2. 设计组件结构：LoginForm → InputField × 2 + SubmitButton
3. 编写组件代码
4. 添加表单验证逻辑
5. 编写测试用例
6. 运行测试 → 修复 → 再测试
```

好的规划 = 步骤粒度适中 + 有验证点 + 有回退方案。

### 执行（Execution）

Agent 的「手脚」——调用工具完成操作：

| 工具类型 | 示例 |
|---------|------|
| 文件操作 | Read、Write、Edit |
| 命令执行 | Bash、终端命令 |
| 网络请求 | WebFetch、API 调用 |
| 浏览器操作 | Playwright、Puppeteer |
| 数据库 | SQL 查询、向量检索 |

工具通过 **MCP（Model Context Protocol）** 标准化接入。MCP 让 Agent 能像插 USB 设备一样接入新工具。

### 记忆（Memory）

Agent 的「经验库」——保留和利用信息：

| 类型 | 生命周期 | 存储方式 | 示例 |
|------|---------|---------|------|
| **工作记忆** | 当前会话 | 上下文窗口 | 「刚才那个报错是什么？」 |
| **短期记忆** | 跨会话（天） | MEMORY.md、会话历史 | 「上周我们讨论过的那个方案」 |
| **长期记忆** | 永久 | 向量数据库、知识图谱 | 「这个项目的技术栈是 Next.js」 |

> 📚 深入：[[Wiki/wiki/concepts/agent-memory-systems|Agent 记忆系统设计]]

### 反思（Reflection）

Agent 的「自我检查」——评估结果并修正：

```
执行 → 检查结果 → 成功？→ 继续下一步
                 → 失败？→ 分析原因 → 调整策略 → 重试
```

好的反思能力 = Agent 不会在同一个坑里跌倒两次。

---

## 1.4 Agent 与相关概念的关系

### Agent vs MCP

```
Agent（大脑）—— 决策用哪个工具、什么时候用
  ↓
MCP（接口）—— 标准化工具连接协议
  ↓
外部工具（手脚）—— 浏览器 / 数据库 / GitHub / Figma / 文件系统
```

Agent 负责**决策和规划**，MCP 提供**标准化工具接口**。两者结合才能让 AI 真正「动手做事」。

### Agent vs Skill

```
Skill = 可复用的「能力包」
  - 定义了「遇到 X 情况，按 Y 步骤处理」
  - 是 Agent 可以调用的方法论

Agent = 使用 Skills 完成任务的自主系统
  - 判断什么时候该用哪个 Skill
  - 组合多个 Skill 完成复杂任务
```

Skill 是静态的「菜谱」，Agent 是动态的「厨师」。

### Agent vs RAG

```
RAG（检索增强生成）= 让 AI 能查外部知识库
Agent = 能自主使用 RAG 及其他工具的智能体

Agentic RAG = Agent + RAG
  - Agent 自主决定要不要检索
  - Agent 自主选择检索策略
  - Agent 自主判断检索结果是否够用
```

> 📚 延伸：[[Wiki/wiki/topics/agentic-rag-patterns|Agentic RAG 四种模式]]

---

## 1.5 Agent 发展简史

| 时间 | 里程碑 | 意义 |
|------|--------|------|
| 2022.11 | ChatGPT 发布 | L1 对话 AI 普及 |
| 2023.03 | GPT-4 + Plugin 生态 | 工具调用能力萌芽 |
| 2023.10 | AutoGPT / BabyAGI | 自主 Agent 概念爆发 |
| 2024.03 | Claude 3 + Tool Use | 工具调用成熟 |
| 2024.06 | Claude Code 发布 | L4 编程 Agent 标杆 |
| 2024.11 | MCP 协议发布 | 工具连接标准化 |
| 2025.01 | Karpathy 提出 Vibe Coding | 自然语言编程范式 |
| 2025.06 | OpenAI Codex 发布 | 云端全流程 Agent |
| 2025.10 | Cursor 3 多 Agent | L5 多 Agent 协同 |
| 2026.01 | Karpathy 提出 Agentic Engineering | 多 Agent 自主协作理论 |
| 2026.03 | Harness Engineering 论文 | Agent 架构理论化 |
| 2026.05 | ECC 生态完善 | 60 Agent + 228 Skill 协同 |

> 📚 完整发展史：[[Wiki/wiki/topics/ai-coding-history|AI Coding 发展史]]

---

## 1.6 关键概念区分

### Agent vs Agentic

经常被混用，但有区别：

- **Agent**：名词，指一个能自主执行的 AI 系统实体
- **Agentic**：形容词，描述「具有 Agent 特性的」

例如：
- "我用 Claude Code 这个 **Agent** 写代码"（指工具）
- "这个工作流很 **Agentic**"（描述特征：自主、多步、闭环）

### Agent vs Bot

- **Bot**：按预设规则自动执行，不涉及 LLM 推理。如 Telegram Bot、Slack Bot
- **Agent**：基于 LLM 推理决策，能处理未预设的场景

---

## 1.7 自测清单

学完本章，你应该能回答：

- [ ] 用自己的话说出 AI Agent 与 ChatBot 的 3 个核心区别
- [ ] 写出 L1-L5 五个层次及每层的典型代表
- [ ] 解释 Agent 五大核心组件的各自作用
- [ ] 说明 Agent 与 MCP、Skill、RAG 的关系
- [ ] 说出 2024-2026 年间 Agent 发展的 3 个关键事件

---

> 🎯 **下一步**：[[02-Agent核心架构|第二章：Agent 核心架构]]——深入理解 Harness Engineering 和 Agent 的内部运行机制。
