---
title: Agent 框架对比索引
type: overview
tags: [agent, comparison, moc, openclaw, hermes-agent]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/OpenClaw/
related:
  - comparisons/openclaw-vs-hermes.md
  - topics/hermes-architecture-deep-dive.md
  - concepts/agent-self-evolution.md
  - concepts/agent-memory-systems.md
  - concepts/agent-context-compression.md
---

# Agent 框架对比索引（MOC）

围绕 OpenClaw 与 Hermes Agent 两个主流开源 Agent 框架的深度对比知识体系。

## 入口

- [[openclaw-vs-hermes|OpenClaw vs Hermes 深度对比]] — 从设计哲学到执行环境的九维度全面对比，含选型建议
- [[agent-orchestration-frameworks|Agent 编排框架对比]] — LangChain vs LangGraph vs Spring AI Alibaba Graph，三大编排框架横向对比

## 架构专题

- [[../topics/hermes-architecture-deep-dive|Hermes Agent 五层架构深度拆解]] — 跟一条消息走完五层架构：适配器→网关→主循环→系统提示→记忆→自修复→自进化

## 核心概念

- [[../concepts/agent-self-evolution|Agent 自进化]] — Prompt 驱动 vs 后台流水线，两种自进化策略的设计取舍
- [[../concepts/agent-memory-systems|Agent 记忆系统设计]] — 三层记忆 vs 单插件槽位，冻结快照与 Session 链
- [[../concepts/agent-context-compression|Agent 上下文压缩]] — 压中间 vs 压头部，Session 链保数据不丢

## 实体

- [[../entities/openclaw|OpenClaw]] — 安全优先的个人 AI Agent，24.7 万 Stars
- [[../entities/hermes-agent|Hermes Agent]] — 自进化的 AI Agent，5.2 万 Stars

## 教程

- [[../topics/openclaw-guide|OpenClaw 完整教程]] — 安装、消息平台配置、Skills 安装
- [[../topics/hermes-agent-guide|Hermes Agent 完整教程]] — 安装、配置、自进化系统

## 原始资料

- [[../../raw/articles/OpenClaw/【万字】OpenClaw vs Hermes：一文深入拆解两大 Agent 框架|【万字】OpenClaw vs Hermes：一文深入拆解两大 Agent 框架]]
- [[../../raw/articles/OpenClaw/OpenClaw vs Hermes：拆解 Hermes Agent 五层架构|OpenClaw vs Hermes：拆解 Hermes Agent 五层架构]]

## 知识图谱

```
                    ┌──────────────────────────────┐
                    │  openclaw-vs-hermes (对比)     │
                    └────────────┬─────────────────┘
           ┌─────────────────────┼─────────────────────┐
           │                     │                     │
           ▼                     ▼                     ▼
  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────┐
  │ agent-self-     │  │ agent-memory-   │  │ agent-context-      │
  │ evolution (概念) │  │ systems (概念)   │  │ compression (概念)   │
  └─────────────────┘  └─────────────────┘  └─────────────────────┘
           │                     │                     │
           └─────────────────────┼─────────────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────────┐
                    │ hermes-architecture-deep-dive │
                    │ (专题)                        │
                    └──────────────────────────────┘
```
