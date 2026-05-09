---
title: OpenClaw
type: entity
tags: [openclaw, clawdbot, agent, open-source]
created: 2026-05-09
updated: 2026-05-09
sources: []
related:
  - topics/openclaw-guide.md
  - topics/ai-coding-concepts.md
  - entities/hermes-agent.md
---

# OpenClaw

OpenClaw（原名 Clawdbot / Moltbot）是奥地利开发者 Peter Steinberger 于 2025 年 11 月创建的开源个人 AI Agent。它运行在你的本地电脑上，通过 WhatsApp、Telegram、Discord、飞书等消息平台与你交互，能自主执行文件操作、命令运行、网页浏览等多步任务。

GitHub: 24.7 万+ Stars | MIT 许可证

## 名称演变

| 时间 | 名称 | 原因 |
|---|---|---|
| 2025.11 | **Clawdbot** | "Claude" + "bot" 的谐音梗 + 龙虾吉祥物 |
| 2026.01 | **Moltbot** | Anthropic 法务要求改名（商标冲突） |
| 2026.01 | **OpenClaw** | 最终定名，强调"Open" + 保留 Claw 身份 |

## 核心定位

> 不是聊天机器人——是 7×24 小时在线的 AI 员工。

**与传统 Chat 的区别**：
- Chat：一问一答，等用户输入
- OpenClaw：常驻后台，主动执行任务，通过消息平台交互

## 为何引爆

1. **本地运行**：数据不离开你的电脑
2. **消息平台交互**：用 WhatsApp/Telegram 与 AI 对话，零学习成本
3. **可扩展**：ClawHub 有 5700+ 社区 Skill
4. **多模型支持**：可接入 Claude、GPT、DeepSeek、本地模型等

## 2026 年重大事件

- 2026.02：Sam Altman 宣布 Peter Steinberger **加入 OpenAI** 领导下一代个人 Agent
- 2026.02：OpenClaw 移交独立基金会，OpenAI 作为财务赞助
- 2026.04：Anthropic **封禁** Claude 用户使用 OpenClaw，OpenAI 反向开放 ChatGPT 订阅给 OpenClaw 用户

## 与 Claude Code 的关系

| 维度 | Claude Code | OpenClaw |
|---|---|---|
| 定位 | 编程 Agent | 通用个人 Agent |
| 交互 | 终端 CLI | 消息平台 |
| 场景 | 写代码 | 写代码 + 日常任务 + 自动化 |
| 部署 | 本地 | 本地/服务器 |
