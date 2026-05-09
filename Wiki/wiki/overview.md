---
title: 全局概览
type: overview
tags: []
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/claude/
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
---

# 全局概览

本知识库围绕 **Claude Code** 构建，收录了 24 篇中文社区文章，系统化整理了从概念到实战的完整知识体系。

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

## 关键数据

- 收录文章：24 篇
- 知识领域：安装配置、命令体系、MCP 生态、Skills 生态、设计集成、工作流方法
- 核心实体：6 个（Claude Code、MCP、Superpowers、gstack、CC Switch、CCR）
- 专题页面：9 个
