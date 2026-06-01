---
title: MCP 与本地部署学习指南
type: tutorial
tags: [MCP, Function Calling, Ollama, 本地部署, 多智能体通信, 学习计划]
created: 2026-06-01
updated: 2026-06-01
sources:
  - Wiki/wiki/entities/mcp.md
  - Wiki/wiki/topics/claude-code-mcp-ecosystem.md
  - Wiki/wiki/concepts/ai-agent.md
related:
  - ../AI Coding/AI Coding 学习计划.md
  - ../AI Agent/AI Agent 学习指南.md
  - ../LLMOps与工程化/LLMOps与工程化指南.md
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
