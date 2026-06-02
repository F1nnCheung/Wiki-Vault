---
title: MCP 与本地部署学习指南
type: tutorial
tags: [MCP, Function Calling, Ollama, 本地部署, 多智能体通信, 学习计划]
created: 2026-06-01
updated: 2026-06-02
sources:
  - Wiki/wiki/entities/mcp.md
  - Wiki/wiki/topics/claude-code-mcp-ecosystem.md
  - Wiki/wiki/concepts/ai-agent.md
related:
  - ../03-AI编码工具/AI Coding 学习计划.md
  - ../06-AI智能体/AI Agent 学习指南.md
  - ../09-LLMOps与工程化/00-LLMOps与工程化指南.md
---

# MCP 与本地部署学习指南

> 对应学习计划**第 6 周**：掌握 MCP 多智能体通信协议、Function Calling 底层机制、Ollama 本地私有化部署。三个主题强关联——MCP 是 Agent 的「手脚」，Function Calling 是 MCP 的底层基础，Ollama 让这一切在本地零成本运行。

---

## 学习路线图

```
阶段一：MCP 协议（Day 1-3，4 小时）
  ├── MCP 是什么？为什么是「AI 版 USB-C」？
  ├── Client-Server 架构与消息格式
  ├── 工具暴露机制与权限模型
  ├── 安装核心 MCP（Playwright / GitHub / Context7）
  └── 实战产出：Claude Code 接入 3+ MCP 体验 AI 操作浏览器

        ↓

阶段二：Function Calling（Day 4-5，3 小时）
  ├── LLM 原生 Function Calling 机制
  ├── 工具 Schema 定义（JSON Schema）
  ├── 调用链优化与风控
  └── 实战产出：手写支持 Function Calling 的 Agent 工具调度器

        ↓

阶段三：Ollama 本地部署（Day 6-7，3 小时）
  ├── Ollama 安装与模型下载
  ├── API 调用与本地编码集成
  ├── 国产模型选型（DeepSeek / Qwen / GLM）
  └── 实战产出：本地 Ollama + DeepSeek 7B 替代云端 API
```

---

## 分章导航

| 章节 | 内容 | 预计时间 |
|------|------|---------|
| [[01-MCP协议]] | MCP 概念、Client-Server 架构、消息格式、核心 MCP 安装 | 4h（Day 1-3） |
| [[02-Function Calling]] | 原生机制、Schema 定义、工具调度器、调用链风控 | 3h（Day 4-5） |
| [[03-Ollama本地部署]] | 安装、模型选型、API 调用、云端/本地分层策略 | 3h（Day 6-7） |

---

## 附录 A：第 6 周每日学习清单

| 天数 | 学习内容 | 实战产出 |
|------|---------|---------|
| Day 1-2 | MCP 协议原理：Client-Server、消息格式、工具暴露 | 理解 MCP 的「AI 版 USB-C」定位 |
| Day 3 | MCP 实战：安装 Playwright/GitHub/Context7 | Claude Code 接入 3+ MCP，AI 操作浏览器 |
| Day 4-5 | Function Calling 深入：Schema 定义、调度器、风控 | 手写支持 Function Calling 的 Agent 工具调度器 |
| Day 6-7 | Ollama 安装、模型下载、API 调用、与 Claude Code 对接 | 本地 Ollama + DeepSeek 7B 替代云端 API |

## 附录 B：第 6 周复盘自检

- [ ] 能解释 MCP 的 Client-Server 架构和工具暴露机制？
- [ ] Claude Code 至少接入了 3 个 MCP，能否让 AI 成功操作浏览器？
- [ ] 能用手写的 Function Calling 调度器让 LLM 调用自定义工具？
- [ ] Ollama 本地运行成功，能用 API 完成代码生成？
- [ ] 是否建立了云端 API + 本地 Ollama 的分层调用策略？

## 附录 C：延伸阅读

| 主题 | 知识库资源 |
|------|-----------|
| MCP 实体页（协议详解） | [[Wiki/wiki/entities/mcp|MCP 实体页]] |
| MCP 生态系统（Top 15 排行榜） | [[Wiki/wiki/topics/claude-code-mcp-ecosystem|MCP 生态系统]] |
| Claude Code 安装与国内模型接入 | [[Wiki/wiki/topics/claude-code-installation|Claude Code 安装配置]] |
| AI Agent 核心架构 | [[../06-AI智能体/AI Agent 学习指南|AI Agent 教程]] |

---

> 📖 完成第 6 周学习后，进入 [[../03-AI编码工具/AI Coding 学习计划|第 7 周：Agent 框架实战（OpenClaw + Hermes + Agentic RAG + KV 缓存）]]——已有完整教程，直接使用即可。
