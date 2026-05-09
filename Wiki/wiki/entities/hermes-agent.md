---
title: Hermes Agent
type: entity
tags: [hermes-agent, nous-research, agent, self-evolving]
created: 2026-05-09
updated: 2026-05-09
sources: []
related:
  - topics/hermes-agent-guide.md
  - topics/ai-coding-concepts.md
  - entities/openclaw.md
---

# Hermes Agent

Hermes Agent 是 Nous Research 开发的开源自进化 AI Agent（MIT 许可证），能从完成任务中自动提炼可复用技能——越用越聪明。GitHub 5.2 万+ Stars。

> 注：中文社区有时称其为「爱马仕」（Hermès 谐音梗）。

## 核心特性

| 特性 | 说明 |
|---|---|
| **自学习循环** | 自动将成功操作转化为可复用 Skill，无需手动微调 |
| **多层记忆** | 跨会话持久记忆 + FTS5 全文搜索 + LLM 摘要 |
| **22+ LLM 提供商** | OpenAI、Anthropic、Gemini、Groq、DeepSeek、Ollama、Kimi K2.6 等 |
| **16 个消息平台** | Telegram、Discord、Slack、WhatsApp、Signal、微信、钉钉、飞书等 |
| **CLI + TUI** | React/Ink 交互终端、流式渲染、皮肤引擎 |
| **40+ 内置工具** | 终端执行、文件 I/O、Web 搜索、浏览器自动化、图片生成、TTS |
| **子代理委派** | 并行派发子代理，可配置深度 |
| **Cron 自动化** | 自然语言调度（如「每天早上 8 点发送日报」） |

## 版本历史

| 版本 | 日期 | 亮点 |
|---|---|---|
| v0.8.0 | 2026.04.08 | 后台任务通知、热切换模型、MCP OAuth 2.1 |
| v0.9.0 | 2026.04.13 | 本地 Web Dashboard、Fast Mode、iMessage/WeChat 支持 |
| v0.10.0 | 2026.04.16 | Nous Tool Gateway（Web搜索/图片生成/TTS） |
| v0.11.0 | 2026.04.23 | 全 React/Ink TUI 重写、GPT-5.5 支持、QQBot |

## 与 OpenClaw 对比

| 维度 | Hermes Agent | OpenClaw |
|---|---|---|
| 开发者 | Nous Research | Peter Steinberger → OpenAI |
| 核心差异 | 自进化 + 多平台网关 | 消息平台优先 + 大社区 |
| 语言 | Python + Rust CLI | Node.js |
| Stars | 5.2 万 | 24.7 万 |
| 许可证 | MIT | MIT |
