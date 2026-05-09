---
title: Claude Code
type: entity
tags: [claude-code, ai-coding, agent, anthropic]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/claude/Claude Code 教程丨安装、使用与配置指南.md
  - raw/articles/claude/Claude Code 保姆级完整教程（包含10个章节，包括接入国内大模型）.md
  - raw/articles/claude/全网最全 Claude Code 命令指南：会话、权限、扩展、自动化全搞定！从新手到大神，这一篇就够了.md
related:
  - topics/claude-code-introduction.md
  - topics/claude-code-installation.md
  - topics/claude-code-getting-started.md
  - entities/mcp.md
---

# Claude Code

Claude Code 是 Anthropic 推出的终端 AI 编程助手（Agent），不仅支持对话聊天，更能**读写文件、执行命令、管理 Git、运行测试**。它比普通 AI Chat 多了一层"规划 + 自主执行"能力，是目前社区公认最智能的 AI 编码代理。

## 核心定位

- **不只是代码补全**：Claude Code 是通用 Agent，能读项目文件、理解架构、跨文件修改、执行 shell 命令
- **四层能力体系**：Prompt（指令）→ Skill（可复用方法论）→ Project（持久化上下文）→ MCP（外部工具连接）
- **开源开放**：通过 `--dangerously-skip-permissions` 可完全自主运行，配合第三方模型降低成本

## 与其他工具对比

| 工具 | 定位 | 优势 |
|---|---|---|
| Claude Code | 终端 AI 编程 Agent | 最智能、生态最完善 |
| Codex (OpenAI) | 终端 AI 编程 Agent | 与 OpenAI 深度整合 |
| Gemini CLI | 终端 AI 编程 Agent | 与 Google 生态整合 |
| Cursor | IDE 内置 AI | 图形化、无需终端 |
| Copilot | IDE 代码补全 | 低延迟、上下文感知 |

## 核心能力

1. **文件操作**：读取、创建、编辑项目中的所有文件
2. **命令执行**：运行 shell 命令、脚本、测试
3. **Git 管理**：自动 commit、创建 PR、管理分支
4. **MCP 扩展**：通过 Model Context Protocol 连接外部工具和数据源
5. **Skills 系统**：可安装/自定义方法论包，AI 自动发现并按需调用
6. **多模型支持**：可通过配置接入 DeepSeek、GLM、MiniMax 等第三方模型

## 两种使用方式

- **CLI 模式**：终端运行 `claude`，适合开发者
- **桌面客户端**：GUI 操作，支持 Code/Cowork/Chat 三种模式，适合非技术用户

## 关键配置文件

- `settings.json`：工具层配置（权限、模型、MCP）
- `CLAUDE.md`：规则层配置（项目规范、编码约定）
- `auto memory`：学习层（AI 自动记录的长期记忆）
