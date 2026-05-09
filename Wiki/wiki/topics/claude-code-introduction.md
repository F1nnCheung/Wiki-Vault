---
title: Claude Code 介绍
type: topic
tags: [claude-code, introduction, overview]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/claude/干货｜Prompt、Skill、Project、MCP，一套完整的 AI 工作流！.md
  - raw/articles/claude/Claude Code 保姆级完整教程（包含10个章节，包括接入国内大模型）.md
related:
  - entities/claude-code.md
  - topics/claude-code-installation.md
---

# Claude Code 介绍

## 一句话概括

Claude Code 不仅是一个终端 AI 编程助手——只需描述需求，它就能**自动计划并执行**：读文件、写代码、跑命令、管理 Git。

## Claude Code vs 普通 AI Chat

| 维度 | 普通 AI Chat（豆包、DeepSeek） | Claude Code |
|---|---|---|
| 交互方式 | 一问一答 | 规划 + 自主执行 |
| 文件操作 | 不支持 | 读写项目文件 |
| 命令执行 | 不支持 | 运行脚本、测试、部署 |
| Git 管理 | 不支持 | commit、PR、分支操作 |
| 扩展能力 | 有限 | MCP + Skills 生态 |

## 四层能力体系

Claude Code 通过四层协同释放 Agent 能力：

```
┌────────────────────────────────┐
│  Prompt（指令层）               │ ← 自然语言描述需求
├────────────────────────────────┤
│  Skill（方法论层）              │ ← 可复用的专业能力包
├────────────────────────────────┤
│  Project（上下文层）            │ ← 持久化工作空间
├────────────────────────────────┤
│  MCP（工具连接层）              │ ← 连接外部数据源和工具
└────────────────────────────────┘
```

- **Prompt**：基础指令，门槛最低但复用性差
- **Skill**：可复用的方法论，把专业知识编码为 AI 能遵循的流程
- **Project**：持久化上下文，跨会话保持项目记忆
- **MCP**：外部工具连接，让 AI 操作浏览器、数据库、GitHub

## 适用场景

- 💻 **软件开发**：全栈项目、Bug 修复、重构、代码审查
- 🎨 **前端设计**：设计稿转代码、UI 生成、设计系统管理
- 📊 **数据分析**：文件处理、数据可视化、报告生成
- 🔧 **DevOps**：CI/CD 配置、部署脚本、监控设置
- 📝 **文档写作**：技术文档、API 文档、项目说明

## 三种运行模式

- **默认模式**（修改前询问）：安全模式，每次编辑需确认
- **自动模式**（accept edits on）：减少确认，提高效率
- **规划模式**（plan mode on）：只讨论不修改，用于设计阶段
