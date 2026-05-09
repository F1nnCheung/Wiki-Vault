---
title: 知识库索引
type: overview
updated: 2026-05-09
---

# 知识库索引

## 概览
- [全局概览](overview.md) — Claude Code + AI Coding 知识体系总览

---

## 🗺️ AI Coding 学习路线
- [AI Coding 学习路线](topics/ai-coding-learning-plan.md) — 从零开始的系统学习路径
- [AI Coding 发展史](topics/ai-coding-history.md) — 2024-2026 发展历程与市场格局
- [AI Coding 核心概念](topics/ai-coding-concepts.md) — Vibe Coding、Agent、MCP、Skills、Claw、Hermes 等
- [AI Coding 工具全景对比](topics/ai-coding-tools-comparison.md) — Claude Code / Cursor / Codex / Trae / Copilot 对比

---

## 概念

### AI Coding 概念
- [Vibe Coding](concepts/vibe-coding.md) — Karpathy 提出，用自然语言描述需求，让 AI「凭感觉」编程
- [Agentic Engineering](concepts/agentic-engineering.md) — 多 Agent 自主规划→编写→测试→审查，人类退为架构师
- [AI Agent](concepts/ai-agent.md) — 自主感知、规划、执行、反思的 AI 系统，L1-L5 能力层次
- [Skills（技能系统）](concepts/skills-concept.md) — AI 的可复用「能力包」，自动发现并按需调用
- [ID Coding](concepts/id-coding.md) — 终极愿景：意图→服务，编程语言可能消失

### Agent 架构概念
- [Agent 自进化](concepts/agent-self-evolution.md) — Prompt 驱动 vs 后台流水线，两种自进化策略的设计取舍
- [Agent 记忆系统设计](concepts/agent-memory-systems.md) — 三层记忆 vs 单插件槽位，冻结快照与 Session 链
- [Agent 上下文压缩](concepts/agent-context-compression.md) — 压中间 vs 压头部，Session 链保数据不丢

---

## 实体

### Claude Code 生态
- [Claude Code](entities/claude-code.md) — Anthropic 终端 AI 编程 Agent，四层能力体系
- [MCP（Model Context Protocol）](entities/mcp.md) — AI 连接外部工具的开源标准协议
- [Superpowers](entities/superpowers.md) — 14 个强制流程 Skill，返工减 90%
- [gstack](entities/gstack.md) — YC 合伙人 Garry Tan 的执行工具链
- [CC Switch](entities/cc-switch.md) — 跨平台 GUI 模型配置管理工具（52.8k Stars）
- [Claude Code Router](entities/claude-code-router.md) — 智能模型路由层，降本 70%+

### AI Coding 工具
- [Cursor](entities/cursor.md) — AI 原生 IDE，估值 290 亿美元
- [Codex](entities/codex.md) — OpenAI 云端编程 Agent，全流程自动化
- [Trae](entities/trae.md) — 字节跳动 AI IDE，永久免费，中国市场份额 41.2%

### AI Agent 工具
- [OpenClaw](entities/openclaw.md) — 开源个人 AI Agent（24.7 万 Stars），消息平台交互
- [Hermes Agent](entities/hermes-agent.md) — 自进化 AI Agent，多平台网关（5.2 万 Stars）

---

## 专题

### 📖 Claude Code 介绍篇
- [Claude Code 介绍](topics/claude-code-introduction.md) — 什么是 Claude Code、四层能力、三种模式

### 🔧 Claude Code 安装篇
- [Claude Code 安装与配置](topics/claude-code-installation.md) — CLI/桌面客户端、国内模型接入、CCR/CC Switch

### 🚀 Claude Code 入门篇
- [命令与日常使用](topics/claude-code-getting-started.md) — 50+ 命令体系、会话管理、权限规则
- [提示词工程](topics/claude-code-prompt-engineering.md) — 20 个结构化模板、Spec-Driven 开发

### 🧠 Claude Code 进阶篇
- [MCP 生态系统](topics/claude-code-mcp-ecosystem.md) — Top 15 排行榜、按角色推荐
- [Skills 生态系统](topics/claude-code-skills-ecosystem.md) — 8 个核心 Skill、UI/UX 设计 Skill
- [Superpowers + gstack 工作流](topics/claude-code-superpowers-workflow.md) — 完整开发闭环
- [设计集成与前端开发](topics/claude-code-design-integration.md) — Figma MCP、DESIGN.md
- [辅助工具](topics/claude-code-tools.md) — Claude HUD、Understand-Anything

### 🛠️ AI Coding 工具教程
- [Trae 完整教程](topics/trae-guide.md) — 安装、Chat/Builder/SOLO/IDE 四种模式、MCP 配置
- [Cursor 完整教程](topics/cursor-guide.md) — Tab 补全、Cmd+K、Composer、Background Agents
- [Codex 完整教程](topics/codex-guide.md) — 云端 Agent、Spec-Driven 开发、适用场景
- [OpenClaw 完整教程](topics/openclaw-guide.md) — 安装、消息平台配置、Skills 安装
- [Hermes Agent 完整教程](topics/hermes-agent-guide.md) — 自进化系统、多平台网关、模型配置

### 🏗️ Agent 架构专题
- [Hermes Agent 五层架构深度拆解](topics/hermes-architecture-deep-dive.md) — 跟一条消息走完五层：适配器→网关→主循环→系统提示→自修复→自进化

---

## 对比

- [Agent 框架对比索引](comparisons/agent-frameworks-moc.md) — OpenClaw vs Hermes 知识体系导航（MOC）
- [OpenClaw vs Hermes 深度对比](comparisons/openclaw-vs-hermes.md) — 设计哲学/学习闭环/记忆/压缩/安全/执行环境/选型建议，九维全面对比

## 输出产物

（暂无）

## 原始资料

24 篇 Claude Code 中文文章，位于 `raw/articles/Claude Code/`：安装配置(5) / 命令提示词(3) / MCP(4) / Skills(3) / Superpowers(3) / 设计集成(4) / 辅助工具(2)

### OpenClaw 资料
2 篇 OpenClaw vs Hermes 深度对比文章 + 1 份橙皮书 PDF（已转 Markdown），位于 `raw/articles/OpenClaw/`：
- 【万字】OpenClaw vs Hermes：一文深入拆解两大 Agent 框架 — 叶小钗，2026.04
- OpenClaw vs Hermes：拆解 Hermes Agent 五层架构 — 叶小钗，2026.04
- OpenClaw橙皮书-从入门到精通-v1.4.0 — 花叔，2026.03，涵盖架构/部署/渠道/Skills/模型/安全
