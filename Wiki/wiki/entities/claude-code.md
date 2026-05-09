---
title: Claude Code
type: entity
tags: [claude-code, ai-coding, agent, anthropic]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/Claude Code/Claude Code 教程丨安装、使用与配置指南.md
  - raw/articles/Claude Code/Claude Code 保姆级完整教程（包含10个章节，包括接入国内大模型）.md
  - raw/articles/Claude Code/全网最全 Claude Code 命令指南：会话、权限、扩展、自动化全搞定！从新手到大神，这一篇就够了.md
  - raw/articles/Claude Code/一、Claude Code：从入门到进阶的高频实战技巧(一).docx
  - raw/articles/Claude Code/二、Claude Code：从入门到进阶的高频实战技巧(二).docx
  - raw/articles/Claude Code/Claude Code从入门到精通-v2.0.0.pdf
related:
  - topics/claude-code-introduction.md
  - topics/claude-code-installation.md
  - topics/claude-code-getting-started.md
  - topics/claude-code-practical-techniques.md
  - topics/claude-code-mastery-guide.md
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
3. **Git 管理**：自动 commit、创建 PR、管理分支、Git Worktree 并行工作
4. **MCP 扩展**：通过 Model Context Protocol 连接外部工具和数据源
5. **Skills 系统**：可安装/自定义方法论包，AI 自动发现并按需调用
6. **多模型支持**：可通过配置接入 DeepSeek、GLM、MiniMax 等第三方模型
7. **Computer Use**（v2.0）：AI 直接看屏幕截图并操控鼠标键盘，操作 GUI 应用
8. **Voice Mode**（v2.0）：按住空格说话，支持 20 种语言，语音转文字输入
9. **Agent Teams**（v2.0）：多个 Agent Session 互相通信、协调分工，支持 Writer/Reviewer 模式和四阶段 Coordinator
10. **Auto 模式**：AI 分类器自动判断操作安全性，安全操作放行、危险操作拦截

## 三层能力模型（Prompt → Context → Harness）

花叔提出 Claude Code 的所有能力可归入三个层次：

| 层次 | 含义 | 投入方式 | 回报特征 |
|---|---|---|---|
| **Prompt 层** | 你说的话（自然语言指令） | 每次对话重新投入 | 一次性回报 |
| **Context 层** | AI 能看到的信息（CLAUDE.md、项目文件、git 历史） | 写一次持续生效 | 复利回报 |
| **Harness 层** | 自动化环境（Skills、Hooks、MCP、Agent Teams） | 搭一次永久运行 | 指数回报 |

> 核心原则：把时间花在构建 Context 和 Harness 上，而不是优化 Prompt。

## 两种使用方式

- **CLI 模式**：终端运行 `claude`，适合开发者
- **桌面客户端**：GUI 操作，支持 Code/Cowork/Chat 三种模式，适合非技术用户
- **Web 模式**（v2.0）：通过 `claude.ai/code` 在浏览器中运行，无需本地安装

## 关键配置文件

- `settings.json`：工具层配置（权限、模型、MCP）
- `CLAUDE.md`：规则层配置（项目规范、编码约定），被 Shrivu 称为 Agent 的"宪法"
- `.claude/agents/`：Subagent 定义目录，每个 `.md` 文件定义一个专业 subagent
- `auto memory`：学习层（AI 自动记录的长期记忆，存储在 `~/.claude/projects/<项目>/memory/`）

## CLAUDE.md 层级结构

```
~/.claude/CLAUDE.md     ← 全局级：所有项目共用的个人偏好
./CLAUDE.md             ← 项目级：检入 git，与团队共享
./src/CLAUDE.md         ← 子目录级：monorepo 中特定模块
./src/api/CLAUDE.md     ← 更深层子目录
```

核心原则：**护栏，不是手册（Guardrails, Not Manuals）。**Boris 团队的 CLAUDE.md 只有约 2500 tokens（约 100 行）。每次 Claude 犯错就加一条规则——文件是活的，一直在长。
