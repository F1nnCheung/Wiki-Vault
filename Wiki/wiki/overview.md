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
  - raw/articles/Obsidian/
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
  - entities/obsidian.md
  - topics/obsidian-getting-started.md
  - topics/obsidian-ai-integration.md
  - topics/obsidian-capture-workflow.md
  - topics/obsidian-llm-wiki-practice.md
  - comparisons/obsidian-notion-tolaria.md
  - concepts/second-brain.md
  - concepts/file-over-app.md
---

# 全局概览

本知识库围绕 **Claude Code**、**Agent 框架对比** 和 **Obsidian 知识管理** 三大主线构建，收录了 27 篇 Claude Code 文章（含 1 本 10 章完整指南） + 2 篇 OpenClaw vs Hermes 深度对比文章 + 1 份橙皮书 + 18 篇 Hemmers Hermes Agent 系列文章 + 23 篇 Obsidian 知识管理文章，系统化整理了从概念到实战的完整知识体系。

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
│   ├── 高频实战技巧 ── /init + /memory 项目记忆、会话管理四件套、模型/上下文/成本/状态监控
│   └── Spec-Driven 开发模式
│
└── 🧠 进阶篇
    ├── MCP 生态 ── Playwright、Context7、GitHub 等 20+ 核心 MCP
    ├── Skills 生态 ── 8 个核心 Skill、7 个 UI/UX Skill
    ├── Superpowers+gstack ── 完整开发闭环（想法→上线）
    ├── 设计集成 ── Figma MCP、DESIGN.md、UI/UX Skill 体系
    ├── 辅助工具 ── Claude HUD、Understand-Anything
    ├── 精通指南（花叔 v2.0.0）── 三层模型、CLAUDE.md 深度实践、Computer Use/Voice Mode、Agent Teams、六反模式
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

## Obsidian 知识管理体系

```
Obsidian 知识体系
│
├── 🏗️ 基础概念 ─── 第二大脑、File over App、LLM Wiki
│
├── 🔰 入门指南 ─── PARA / Zettelkasten / MOC 方法论 + 20 个核心插件 + 从零搭建实操
│
├── 🤖 AI 集成 ───── 五种方案对比
│   ├── Claude Code + Obsidian CLI（最强能力）
│   ├── Copilot + DeepSeek（新手最佳：便宜 6-15 倍）
│   ├── Claudian 插件（无缝嵌入侧边栏）
│   ├── Copilot + Ollama（完全本地，零数据外传）
│   └── Web Clipper + Claude Code 批量处理
│
├── 📥 信息收集 ──── 三种入口打通
│   ├── Obsidian Web Clipper：浏览器 → Obsidian，3 秒保存
│   ├── 微信同步：笔记同步助手 / Messager 插件
│   └── LLM Wiki raw/ 收录：Web Clipper → raw/ → AI 处理
│
├── 🔄 LLM Wiki 实践 ─ 七种开源实现
│   ├── 完整应用：llmwiki、llm_wiki、Karpathy-LLM-Wiki
│   ├── Skill 包：llm-wiki-skill、llm-knowledge-base、karpathy-llm-wiki
│   └── Obsidian Vault 内：Ar9av/obsidian-wiki（14+ Agent 共享）
│
├── 🔧 插件进阶 ──── 图片管理 / 文档导出 / 数据查询 / 快速捕获
│   ├── Custom Attachment Location：标准化图片管理
│   ├── Enhancing Export：多格式导出（Word/PDF/HTML/ePub）
│   ├── Dataview / Templater / Calendar / QuickAdd 深度用法
│   └── 插件性能优化建议
│
├── 🔐 Git 云同步 ── 免费多端同步方案
│   ├── GitHub 私有仓库创建与克隆
│   ├── Git 插件自动同步配置（1 分钟自动 commit+push）
│   └── 手机端完整配置（Personal Access Token + 同步验证）
│
├── 🆚 工具对比 ─── Obsidian vs Notion vs Tolaria
│   └── 本地优先 vs 云端优先 vs 两者兼顾
│
└── 🔌 实体层 ─── Obsidian、Tolaria
```

## 关键数据

- 收录文章：71 篇（Claude Code 27 篇 + OpenClaw/Hermes 2 篇 + Hemmers 18 篇 + Obsidian 23 篇 + 橙皮书 1 份）
- 输出产物：1 份（[AI Coding 学习计划](../../教程/AI-Coding/AI Coding 学习计划.md)，1072 行综合教程）
- 知识领域：安装配置、命令体系、MCP 生态、Skills 生态、设计集成、工作流方法、Agent 架构对比、多 Agent 协作、Hermes 配置、知识库集成、Obsidian 知识管理、信息收集工作流、LLM Wiki 实践、实战技巧、精通指南
- 核心实体：10 个（Claude Code、MCP、Superpowers、gstack、CC Switch、CCR、OpenClaw、Hermes Agent、Obsidian、Tolaria）
- 专题页面：24 个
- 概念页面：11 个
- 对比页面：2 个
