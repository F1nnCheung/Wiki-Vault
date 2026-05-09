---
title: 全局概览
type: overview
tags: []
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/Claude Code/
  - raw/articles/OpenClaw/
  - raw/articles/Hemmers/
related:
  - topics/claude-code-introduction.md
  - topics/claude-code-installation.md
  - topics/claude-code-getting-started.md
  - topics/claude-code-mcp-ecosystem.md
  - topics/claude-code-skills-ecosystem.md
  - topics/claude-code-superpowers-workflow.md
  - topics/claude-code-design-integration.md
  - topics/claude-code-tools.md
  - topics/claude-code-prompt-engineering.md
  - comparisons/openclaw-vs-hermes.md
  - topics/hermes-architecture-deep-dive.md
  - topics/hermes-multi-agent.md
  - topics/hermes-configuration.md
  - topics/hermes-workspace-setup.md
  - topics/hermes-obsidian-integration.md
  - topics/hermes-rag-setup.md
  - concepts/harness-engineering.md
---

# 全局概览

本知识库围绕 **Claude Code** 和 **Agent 框架对比** 两大主线构建，收录了 24 篇 Claude Code 文章 + 2 篇 OpenClaw vs Hermes 深度对比文章 + 1 份橙皮书 + 18 篇 Hemmers Hermes Agent 系列文章，系统化整理了从概念到实战的完整知识体系。

## 核心论点

1. **Claude Code 是一种新工作范式**：它不仅是代码补全工具，更是能自主规划并执行的多工具 Agent，能力通过 Prompt → Skill → Project → MCP 四层协同释放。

2. **能力扩展是价值倍增器**：裸用 Claude Code 只发挥了约三成功力。MCP（外部工具连接）赋予了 AI 操作浏览器、数据库、GitHub 的能力；Skills（可复用方法论）将软件工程最佳实践编码为 AI 自动遵循的流程。

3. **流程约束比模型能力更重要**：AI 模型本身在变强，但怎么用的方法论决定了最终产出质量。Superpowers + gstack 的「大脑+手脚」双插件体系通过强制流程将返工率降低约 90%。

4. **国内用户有成熟替代方案**：通过 CC Switch、CCR、桌面客户端 3P 模式等工具，可以无缝接入 DeepSeek、GLM、MiniMax 等国产模型，完全不需 Anthropic 账号。

5. **设计集成正在重塑前端开发**：从 Figma MCP 的设计稿转代码，到 DESIGN.md 的设计系统规则，AI 前端开发正从「Vibe Coding」进入「Vibe Design」阶段。

## 知识结构

```
Claude Code 知识体系
│
├── 📖 介绍篇 ─── 什么是 Claude Code、四层能力体系、适用场景
│
├── 🔧 安装篇 ─── CLI/桌面客户端两条路线、国内模型接入
│   ├── CC Switch（GUI 配置管理）
│   └── CCR（智能模型路由）
│
├── 🚀 入门篇 ─── 50+ 命令体系、日常工作流、提示词工程
│   ├── 会话管理（compact/clear/resume/rewind）
│   ├── 权限管理（allow/ask/deny 三层分级）
│   └── Spec-Driven 开发模式
│
└── 🧠 进阶篇
    ├── MCP 生态 ── Playwright、Context7、GitHub 等 20+ 核心 MCP
    ├── Skills 生态 ── 8 个核心 Skill、7 个 UI/UX Skill
    ├── Superpowers+gstack ── 完整开发闭环（想法→上线）
    ├── 设计集成 ── Figma MCP、DESIGN.md、UI/UX Skill 体系
    ├── 辅助工具 ── Claude HUD、Understand-Anything
    └── 提示词工程 ── 5 大场景 20 个模板

实体层：Claude Code / MCP / Superpowers / gstack / CC Switch / CCR
```

## Agent 框架对比知识体系

```
OpenClaw vs Hermes 知识体系
│
├── 📊 综合对比 ─── 设计哲学 / 学习闭环 / 记忆 / 压缩 / 安全 / 执行环境 / 选型
│
├── 🏗️ 架构专题 ─── Hermes 五层架构深度拆解
│   ├── 适配器模式（20+ 平台统一入口）
│   ├── Gateway + Profile 隔离
│   ├── Agent 主循环（迭代预算 / PTC / 工具并行 / 子 Agent）
│   ├── 系统提示词（模型特定引导 / 安全扫描 / 前缀缓存优化）
│   └── 自修复（14 种错误分类 / 级联中断 / Session 链）
│
└── 🧠 核心概念
    ├── Agent 自进化（Prompt 驱动 + 后台复盘）
    ├── Agent 记忆系统（三层记忆 vs 单插件）
    └── 上下文压缩（压中间 vs 压头部）
```

## Hermes Agent 深度专题

```
Hermes 深度专题
│
├── 🏗️ 架构 ─── 五层架构深度拆解（入口→网关→执行→扩展→存储）
│
├── 👥 多 Agent ── 多角色团队搭建、Kanban 任务编排
│   ├── Profile 隔离机制（独立配置/密钥/记忆/会话）
│   ├── Kanban 四角色（Orchestrator/Dispatcher/Worker/Board）
│   └── 实战案例（default+coding 协作 12 分钟完成爬虫）
│
├── ⚙️ 配置 ──── SOUL.md & AGENTS.md 最佳实践
│   ├── SOUL.md（全局身份/协作方式）
│   └── AGENTS.md（项目规则/目录/命令）
│
├── 🖥️ Workspace ─ 六面板 Web 控制中心
│   ├── Chat/Memory/Skills/Terminal/Tools/Conductor
│   └── Kanban 多代理协作
│
├── 📓 Obsidian ─ Obsidian + Hermes 知识库集成
│   └── Source → Topic → Draft → Published 生产线
│
├── 🔍 RAG ──── 个人知识管理 RAG 检索
│   └── Markdown → Ollama Embedding → ChromaDB → Hermes 检索
│
└── 🧠 概念 ──── Harness Engineering
    └── Agent = Model + Harness，生成-评估分离
```

## 关键数据

- 收录文章：45 篇（Claude Code 24 篇 + OpenClaw/Hermes 2 篇 + Hemmers 18 篇 + 橙皮书 1 份）
- 知识领域：安装配置、命令体系、MCP 生态、Skills 生态、设计集成、工作流方法、Agent 架构对比、多 Agent 协作、Hermes 配置、知识库集成
- 核心实体：8 个（Claude Code、MCP、Superpowers、gstack、CC Switch、CCR、OpenClaw、Hermes Agent）
- 专题页面：16 个
- 概念页面：9 个
- 对比页面：1 个
