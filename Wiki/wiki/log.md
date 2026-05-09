# 操作日志

## [2026-05-09] init | 知识库初始化
- 创建知识库目录结构
- 初始化 schema、索引、日志

## [2026-05-09] ingest | 批量收录 24 篇 Claude Code 文章
- **摘要**：一次性处理 `raw/articles/Claude Code/` 全部 24 篇文章，按 介绍→安装→入门→进阶 四层结构组织
- **新增实体页（6个）**：
  - wiki/entities/claude-code.md — Claude Code 本体
  - wiki/entities/mcp.md — Model Context Protocol
  - wiki/entities/superpowers.md — Superpowers 框架
  - wiki/entities/gstack.md — gstack 工具链
  - wiki/entities/cc-switch.md — CC Switch 配置管理工具
  - wiki/entities/claude-code-router.md — Claude Code Router 路由层
- **新增专题页（9个）**：
  - wiki/topics/claude-code-introduction.md — 介绍篇
  - wiki/topics/claude-code-installation.md — 安装与配置篇
  - wiki/topics/claude-code-getting-started.md — 命令与日常使用篇
  - wiki/topics/claude-code-mcp-ecosystem.md — MCP 生态系统
  - wiki/topics/claude-code-skills-ecosystem.md — Skills 生态系统
  - wiki/topics/claude-code-superpowers-workflow.md — Superpowers+gstack 工作流
  - wiki/topics/claude-code-design-integration.md — 设计集成与前端开发
  - wiki/topics/claude-code-tools.md — 辅助工具
  - wiki/topics/claude-code-prompt-engineering.md — 提示词工程
- **更新页面**：wiki/overview.md（填充全局概览）、wiki/index.md（更新完整索引）
- 知识领域覆盖：安装配置、命令体系、MCP 生态、Skills 生态、Superpowers 工作流、设计集成、提示词工程

## [2026-05-09] create | AI Coding 学习路线与工具生态
- **摘要**：构建 AI Coding 完整学习体系，包含发展历程、核心概念、工具对比、实战教程
- **新增实体页（7个）**：
  - wiki/entities/vibe-coding.md — Vibe Coding 概念
  - wiki/entities/openclaw.md — OpenClaw 个人 AI Agent
  - wiki/entities/hermes-agent.md — Hermes Agent 自进化 Agent
  - wiki/entities/cursor.md — Cursor AI IDE
  - wiki/entities/codex.md — OpenAI Codex 云端 Agent
  - wiki/entities/trae.md — Trae 国产 AI IDE
- **新增专题页（8个）**：
  - wiki/topics/ai-coding-learning-plan.md — AI Coding 学习路线总页
  - wiki/topics/ai-coding-history.md — 发展史（2024-2026）
  - wiki/topics/ai-coding-concepts.md — 核心概念解析（Vibe Coding/Agent/MCP/Skills/Claw/Hermes）
  - wiki/topics/ai-coding-tools-comparison.md — 六大工具全景对比
  - wiki/topics/trae-guide.md — Trae 完整教程（安装→入门→进阶）
  - wiki/topics/cursor-guide.md — Cursor 完整教程
  - wiki/topics/codex-guide.md — Codex 完整教程
  - wiki/topics/openclaw-guide.md — OpenClaw 完整教程（安装→消息平台配置→Skills）
  - wiki/topics/hermes-agent-guide.md — Hermes Agent 完整教程（自进化系统→多平台网关）
- **更新页面**：wiki/index.md（新增 AI Coding 学习路线和工具教程板块）
