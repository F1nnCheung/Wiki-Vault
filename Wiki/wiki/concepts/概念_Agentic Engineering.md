---
title: Agentic Engineering（智能体工程）
type: concept
tags: [agentic-engineering, agent, karpathy, paradigm]
created: 2026-05-09
updated: 2026-05-09
sources: []
related:
  - concepts/概念_Vibe Coding.md
  - concepts/概念_AI Agent.md
  - topics/ai-coding-history.md
---

# Agentic Engineering（智能体工程）

> 2026 年初由 Andrej Karpathy 提出，是 Vibe Coding 的进化形态。

## 定义

多个 AI 智能体自主完成**规划→编写→测试→审查**全流程。人类从「驾驶员」退后为「架构师」和「监督者」。

## 核心理念

```
Vibe Coding（2025）          Agentic Engineering（2026）
人→AI→人检查               AI团队→自主规划→执行→验证→上报
单个 AI 生成代码             多个 AI Agent 分工协作
质量不确定                  审查闭环保证
```

## 角色分工

| Agent 角色 | 职责 |
|---|---|
| **Planner** | 分析需求，制定实现计划 |
| **Coder** | 按计划编写代码 |
| **Tester** | 运行测试，验证功能 |
| **Reviewer** | 独立审查代码质量 |
| **Human（架构师）** | 定义架构边界、验收标准、做关键决策 |

## 关键特征

1. **自主协作**：多个 Agent 自动分工，无需人类逐个指派
2. **闭环验证**：代码→测试→审查→修复，自动循环直到通过
3. **人类退后**：不再逐行审查代码，而是审查架构和验收结果
4. **证据驱动**：每个 Agent 的工作必须留下可验证的证据

## 与 Vibe Coding 对比

| 维度 | Vibe Coding | Agentic Engineering |
|---|---|---|
| 人类角色 | 需求描述者 | 架构师 / 监督者 |
| AI 角色 | 单一代码生成器 | 多 Agent 协同团队 |
| 流程 | 人→AI→人检查 | AI 自主规划→执行→验证 |
| 产出质量 | 不确定 | 有审查闭环保证 |
| 适用规模 | 小型项目、原型 | 中大型项目、生产系统 |

## 实践工具

- **Superpowers + gstack**：将 Agentic Engineering 流程编码为 Claude Code 可遵循的强制流程
- **Claude Code**：支持多 Agent 并行（Subagent）
- **Codex**：云端多步自动化
- **Cursor 3**：多智能体协同工作区

## 未来展望

Karpathy 预言的终极形态是 **ID Coding（意图编程）**——人类表达意图直接转化为软件服务，编程语言本身可能消失。
