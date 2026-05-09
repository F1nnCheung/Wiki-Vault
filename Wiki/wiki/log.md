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

## [2026-05-09] ingest | OpenClaw vs Hermes 深度对比系列（2 篇文章 + 1 份橙皮书）
- **摘要**：处理 `raw/articles/OpenClaw/` 下 3 份资料，构建 Agent 框架对比知识体系
- **新增对比页（2 个）**：
  - wiki/comparisons/openclaw-vs-hermes.md — 九维度全面对比（设计哲学/学习闭环/记忆/压缩/安全/执行环境/子Agent/国内生态/选型）
  - wiki/comparisons/agent-frameworks-moc.md — Agent 框架对比索引（MOC）
- **新增专题页（1 个）**：
  - wiki/topics/hermes-architecture-deep-dive.md — 五层架构深度拆解（适配器→网关→主循环→系统提示→自修复→自进化）
- **新增概念页（3 个）**：
  - wiki/concepts/agent-self-evolution.md — Agent 自进化（Prompt 驱动 vs 后台流水线）
  - wiki/concepts/agent-memory-systems.md — Agent 记忆系统设计（三层记忆 vs 单插件）
  - wiki/concepts/agent-context-compression.md — Agent 上下文压缩（压中间 vs 压头部）
- **更新页面**：
  - wiki/entities/openclaw.md — 补充设计哲学、架构特点、安全模型
  - wiki/entities/hermes-agent.md — 补充五层架构、自进化机制、错误恢复
  - wiki/overview.md — 新增 Agent 框架对比知识体系板块
  - wiki/index.md — 新增对比/概念/专题板块条目
- **PDF 转换**：OpenClaw橙皮书-从入门到精通-v1.4.0.pdf → raw/articles/OpenClaw/OpenClaw橙皮书.md（2722 行）
