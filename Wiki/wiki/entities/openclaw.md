---
title: OpenClaw
type: entity
tags: [openclaw, clawdbot, agent, open-source, typescript]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/OpenClaw/【万字】OpenClaw vs Hermes：一文深入拆解两大 Agent 框架.md
related:
  - topics/openclaw-guide.md
  - topics/ai-coding-concepts.md
  - entities/hermes-agent.md
  - comparisons/openclaw-vs-hermes.md
  - concepts/agent-memory-systems.md
  - concepts/agent-context-compression.md
---

# OpenClaw

OpenClaw（原名 Clawdbot / Moltbot）是奥地利开发者 Peter Steinberger 于 2025 年 11 月创建的开源个人 AI Agent。它运行在你的本地电脑上，通过 WhatsApp、Telegram、Discord、飞书等消息平台与你交互，能自主执行文件操作、命令运行、网页浏览等多步任务。

GitHub: 24.7 万+ Stars | MIT 许可证 | TypeScript

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

## 设计哲学：安全优先

OpenClaw 回答的核心问题是：**"怎么让 Agent 安全可靠地执行任务？"**

这决定了它的设计方向：
- **多层审批**：safe-bin、allowlist、执行审批等机制
- **安全审计**：10+ 安全模块，专门的 `SECURITY.md` 和漏洞响应流程
- **沙箱隔离**：Docker 沙箱（含浏览器环境），支持本地/Docker/SSH 远程三种执行后端
- **严格插件边界**：Plugin SDK，manifest-first，Skills 由人工编写和维护

## 架构特点

### Skills 系统
- **预定义任务流程**：Skills 是"给 Agent 的操作手册"
- **人工维护**：创建和更新依赖人工，Agent 不会主动创建或改写 Skill
- **社区丰富**：ClawHub 有 5700+ 社区 Skill

### 记忆系统
- **单插件槽位**：记忆作为"特殊插件"统一管理
- **可替换**：同一时间只激活一个记忆插件，约束强
- **设计理念**：关注"记忆怎么接进系统才不破坏稳定性"，至于"Agent 怎么靠记忆越来越像人"交给开发者

### 上下文压缩
- **从头压缩**：从最老的对话轮次开始，最近对话原样保留
- **完整归档**：压缩前保留快照，原始消息归档到 archive 路径
- **缓存优化**：确定性排序、空格规范化、cache boundary marker

### 执行环境
- 3 种后端：本地 / Docker / SSH 远程沙箱
- 安全优先：多层审批 + 审计系统 + 策略层面限制

### 子 Agent
- 使用 ACP（Agent Client Protocol），偏标准化
- `sessions_spawn` 默认 HTTP 端口拒绝，需显式启用
- 对委派操作态度谨慎

## 消息平台

支持 25+ 渠道。国内方面通过扩展插件支持飞书和 QQ 机器人（`extensions/feishu/`、`extensions/qqbot/`），缺少钉钉、企业微信和个人微信的原生支持。

## 模型接入

走 Provider Plugin 路线，每个提供商一个插件。支持 Auth Profile 轮换和 Failover，集成深度好，广度不如 Hermes。

## 2026 年重大事件

- 2026.02：Sam Altman 宣布 Peter Steinberger **加入 OpenAI** 领导下一代个人 Agent
- 2026.02：OpenClaw 移交独立基金会，OpenAI 作为财务赞助
- 2026.04：Anthropic **封禁** Claude 用户使用 OpenClaw，OpenAI 反向开放 ChatGPT 订阅给 OpenClaw 用户

## 与 Hermes Agent 的对比

详见 [[../comparisons/openclaw-vs-hermes|OpenClaw vs Hermes 深度对比]]。

| 维度 | OpenClaw | Hermes Agent |
|------|----------|-------------|
| 核心问题 | 怎么安全可靠地执行任务 | Agent 怎么越来越强 |
| 语言 | TypeScript | Python |
| Skills | 人工编写，预定义流程 | Agent 自动提取，Markdown 文件 |
| 记忆 | 单插件槽位，可替换 | 三层：内置 + 外部 + 会话搜索 |
| 安全 | 10+ 安全模块，默认安全 | 智能审批（辅助模型判断风险） |
