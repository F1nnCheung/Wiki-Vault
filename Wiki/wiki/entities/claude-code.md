---
title: Claude Code
type: entity
tags: [claude-code, ai-coding, agent, anthropic]
created: 2026-05-09
updated: 2026-05-14
sources:
  - raw/articles/Claude Code/Claude Code 教程丨安装、使用与配置指南.md
  - raw/articles/Claude Code/Claude Code 保姆级完整教程（包含10个章节，包括接入国内大模型）.md
  - raw/articles/Claude Code/全网最全 Claude Code 命令指南：会话、权限、扩展、自动化全搞定！从新手到大神，这一篇就够了.md
  - raw/articles/Claude Code/一、Claude Code：从入门到进阶的高频实战技巧(一).docx
  - raw/articles/Claude Code/二、Claude Code：从入门到进阶的高频实战技巧(二).docx
  - raw/articles/Claude Code/Claude Code从入门到精通-v2.0.0.pdf
  - raw/articles/让Claude编程失误率从41%降到3%：12条CLAUDE.md规则的踩坑复盘.md
related:
  - topics/claude-code-introduction.md
  - topics/claude-code-installation.md
  - topics/claude-code-getting-started.md
  - topics/claude-code-practical-techniques.md
  - topics/claude-code-mastery-guide.md
  - topics/claude-md-12-rules.md
  - entities/mcp.md
  - entities/everything-claude-code.md
  - topics/ecc-complete-guide.md
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

**CLAUDE.md 是分层的，有明确的优先级。**Claude Code 在会话启动时从多个位置发现并加载 CLAUDE.md 文件，从最全局到最具体：

### 完整层级

| 层级 | 位置 | 作用域 | 加载时机 | Git |
|---|---|---|---|---|
| **托管策略**（企业级） | `/Library/Application Support/ClaudeCode/CLAUDE.md`（macOS） | 组织/全员 | 启动时 | 否 |
| **用户全局** | `~/.claude/CLAUDE.md` | 本机所有项目 | 启动时 | 否 |
| **项目根** | `./CLAUDE.md` 或 `./.claude/CLAUDE.md` | 团队共享 | 启动时 | **是** |
| **本地覆盖** | `./CLAUDE.local.md` | 个人偏好（Git ignored） | 启动时 | 否 |
| **父目录** | 从 CWD 向上走的各级 `CLAUDE.md` | Monorepo 结构 | 启动时 | 视项目 |
| **子目录** | `packages/web/CLAUDE.md` 等 | 模块专属 | **按需加载** | 视项目 |
| **规则文件** | `.claude/rules/*.md`（可选 `globs` 路径过滤） | 路径作用域 | 匹配时 | **是** |
| **自动记忆** | `~/.claude/projects/<hash>/memory/MEMORY.md` | AI 学习记录 | v2.1.59+ | 否 |

> 也支持 `CLA.md` 作为 `CLAUDE.md` 的简写别名。

### 优先级原则：越靠近工作目录越优先

```
托管策略 → 用户全局 → 项目根 → 本地覆盖 → 父目录 → 子目录（按需）
```

例：全局 `~/.claude/CLAUDE.md` 写「用空格缩进」，但项目 `./CLAUDE.md` 写「用 Tab」→ **Tab 胜出**。

### 🔑 核心真相：拼接而非覆盖

> **Claude Code 不存在 override（覆盖）机制，只有 concatenation（拼接）。**

所有层级的 CLAUDE.md 文件被**拼接成一个 prompt** 喂给模型。没有规则会被删除或替换——它们只是被放在一起。当指令冲突时，Claude 倾向于遵循**在上下文中最后出现的、更具体的**内容，但这**不是确定性行为**。

**实践含义**：
- 不要在不同层级重复同一规则来「加强」它——冲突是未定义行为
- 每层职责分明：全局 = 个人风格；项目根 = 团队约定；子目录 = 模块特定
- 单文件不要超过 200 行（超过后合规率断崖下降）

### 父目录 vs 子目录：加载时机不同

```
monorepo/
├── CLAUDE.md              ← 启动时加载（CWD 的父目录）
├── packages/
│   ├── api/
│   │   └── CLAUDE.md      ← 启动时加载（CWD 为 api/ 时）
│   └── web/
│       └── CLAUDE.md      ← 按需加载（只在读 web/ 下文件时注入）
└── .claude/
    └── rules/
        ├── testing.md     ← 启动时加载（无 globs 过滤）
        └── api.md         ← 按需加载（globs: src/api/**）
```

- **父目录**（CWD 往上走）：**会话启动时一次性全部加载**
- **子目录**（比 CWD 更深的目录）：**按需加载**——仅当 Claude 实际读取该子目录下的文件时才注入

这个设计在 Monorepo 中非常关键：前端专属规则不会在处理后端代码时被加载，节省 token。

### `.claude/rules/` 路径作用域规则

通过 YAML frontmatter 中的 `globs` 字段实现精确控制：

```markdown
---
globs: src/api/**/*.ts
---
# API 约定
- 所有端点必须用 Zod schema 校验入参
- 使用标准错误响应格式
```

- **无 `globs`**：启动时加载，优先级同项目级 CLAUDE.md
- **有 `globs`**：按需加载，仅当读取匹配文件时注入
- ⚠️ 使用 `globs:` 而非 `paths:`（后者实践不可用）

### `@import` 引用语法

可在 CLAUDE.md 中用 `@` 内联外部文件（最多 5 跳）：

```markdown
# 编码规范
@docs/coding-standards.md
# 个人偏好
@~/.claude/my-preferences.md
```

注意：导入文件保留**原始标题层级**，不会嵌套到引用方的标题下。

### 核心原则

**护栏，不是手册（Guardrails, Not Manuals）。**Boris 团队的 CLAUDE.md 只有约 2500 tokens（约 100 行）。每次 Claude 犯错就加一条规则——文件是活的，一直在长。

一条好规则的检验标准：**「这条规则防止什么具体错误？」**Karpathy 的 4 条防止的是静默假设、过度设计、附带破坏、弱成功标准。辰北加的 8 条防止的是无预算循环、缺检查点多步操作、测试不测实质、静默成功掩盖静默失败。完整 12 条规则的深度拆解、翻车现场和数据验证，参见 [[topics/claude-md-12-rules|CLAUDE.md 12 条规则深度解析]]。

用 `/memory` 命令可验证实际加载了哪些文件——加载失败是静默的。

## Claude Code 生态：Harness 性能优化

[[entities/everything-claude-code|Everything Claude Code (ECC)]] 是 Claude Code 生态中最完整的 Harness 性能优化系统，来自 Anthropic 黑客松获胜项目（180K+ Stars）。ECC 将 Claude Code 的 Harness 能力工程化为可安装的系统组件——60 个 Agent、228 个 Skill、Hook 自动化、持续学习、安全扫描——跨越 Claude Code、Codex、Cursor、OpenCode 等 7+ 个 AI 编码框架。参见 [[topics/ecc-complete-guide|ECC 完整指南]]。
