---
title: Everything Claude Code (ECC)
type: entity
tags: [ecc, claude-code, agent-harness, skills, anthropic-hackathon]
created: 2026-05-13
updated: 2026-05-13
sources:
  - raw/articles/132页！Anthropic黑客松获胜者everything-claude-code完整教程来了！.md
  - https://github.com/affaan-m/everything-claude-code
related:
  - entities/claude-code.md
  - concepts/skills-concept.md
  - concepts/agentic-engineering.md
  - concepts/harness-engineering.md
  - topics/ecc-complete-guide.md
---

# Everything Claude Code (ECC)

Everything Claude Code 是 Anthropic 黑客松获胜项目，由 Affaan Mustafa 创建。它不只是一个配置文件包，而是一套完整的 **Agent Harness 性能优化系统**——包含可直接用于生产环境的智能体、技能模块、钩子、规则、MCP 配置，所有内容均经过 10+ 个月高强度日常使用与真实产品开发迭代打磨。

> **140K+ Stars** | **21K+ Forks** | **170+ 贡献者** | **12+ 语言生态** | **跨 7+ 个 AI 编码框架**

## 核心定位

ECC 的定位是 **Agent Harness 性能优化系统**（The performance optimization system for AI agent harnesses），而不仅仅是配置集。它跨越 Claude Code、Codex、Cursor、OpenCode、Gemini、GitHub Copilot 等多个 AI 编码框架。

### 三大公开指南

| 指南 | 内容 | 状态 |
|------|------|------|
| **Shorthand Guide**（精简指南） | 安装、基础、理念，**先读这个** | 已发布 |
| **Longform Guide**（详细指南） | Token 优化、内存持久化、评估、并行化 | 已发布 |
| **Security Guide**（安全指南） | 攻击向量、沙箱技术、数据净化、CVE、AgentShield | 已发布 |

## 项目规模

| 组件 | 数量 | 说明 |
|------|------|------|
| **agents/** | 60 个 | 专业化 subagent，覆盖 12+ 语言和框架 |
| **skills/** | 228 个 | 工作流定义与领域知识（主要工作流表面） |
| **commands/** | 75 个 | 传统斜杠命令兼容层（正逐步迁移到 skills） |
| **hooks/** | 触发式自动化 | SessionStart/Stop、PreToolUse 等生命周期钩子 |
| **rules/** | 17 个语言/框架包 | 始终遵循的编码准则 |
| **mcp-configs/** | 14 个 | MCP 服务器配置 |
| **legacy-command-shims/** | 72 个 | 退役命令的适配层（如 /tdd、/e2e） |

## 五大核心原则

1. **Agent-First**：尽早将工作路由到正确的专业 Agent
2. **Test-Driven**：先写测试再信任实现变更，要求 80%+ 覆盖率
3. **Security-First**：验证输入、保护密钥、保持安全默认值
4. **Immutability**：优先使用新对象而非变更旧对象
5. **Plan Before Execute**：复杂变更应分解为有意识的阶段

## 核心能力体系

### 1. Token 优化
- 模型选择策略
- 系统提示精简
- 后台进程管理

### 2. 内存持久化（Memory Persistence）
- 跨会话自动保存/加载上下文的钩子
- SessionStart 注入历史上下文
- Stop 阶段生成会话摘要

### 3. 持续学习（Continuous Learning）
- 从会话中自动提取模式到可复用技能
- **v2 本能学习（Instinct-based Learning）**：带置信度评分的模式学习
- `/instinct-status`、`/instinct-import`、`/instinct-export` 命令
- `/evolve`：将本能聚类为正式技能

### 4. 验证循环（Verification Loops）
- 检查点 vs 持续评估
- 评分器类型选择
- pass@k 指标

### 5. 并行化（Parallelization）
- Git worktrees 并行开发
- 级联方法（Cascade Method）
- 实例扩展时机

### 6. Subagent 编排
- 上下文问题处理
- 迭代检索模式（Iterative Retrieval）
- 多 Agent 协作工作流

## Agent 体系

ECC 提供 60 个专业化 subagent，分为以下几类：

### 通用开发 Agent
- **planner**：功能实现规划
- **architect**：系统架构设计
- **code-reviewer**：代码质量和可维护性审查
- **security-reviewer**：漏洞检测
- **build-error-resolver**：构建/类型错误修复
- **tdd-guide**：测试驱动开发
- **e2e-runner**：端到端 Playwright 测试
- **refactor-cleaner**：死代码清理
- **doc-updater**：文档与 codemap 同步
- **docs-lookup**：通过 Context7 查 API 文档

### 语言专项 Agent
- **typescript-reviewer**、**python-reviewer**、**go-reviewer**、**go-build-resolver**
- **java-reviewer**、**java-build-resolver**、**kotlin-reviewer**、**kotlin-build-resolver**
- **rust-reviewer**、**rust-build-resolver**、**cpp-reviewer**、**cpp-build-resolver**
- **swift-reviewer**、**swift-build-resolver**、**dart-build-resolver**
- **fsharp-reviewer**、**csharp-reviewer**

### 框架专项 Agent
- **django-reviewer**、**django-build-resolver**、**fastapi-reviewer**
- **flutter-reviewer**、**database-reviewer**（PostgreSQL/Supabase）
- **pytorch-build-resolver**、**mle-reviewer**（ML 流水线）

### 运维与基础设施 Agent
- **loop-operator**：自主循环执行与监控
- **harness-optimizer**：Harness 配置调优
- **network-architect**、**network-config-reviewer**、**network-troubleshooter**
- **homelab-architect**、**healthcare-reviewer**

### 开源与协作 Agent
- **opensource-forker**、**opensource-packager**、**opensource-sanitizer**
- **chief-of-staff**：沟通分类与草稿
- **performance-optimizer**、**code-simplifier**

## 安装方式

### 方式一：插件安装（推荐）

```bash
# 添加市场
/plugin marketplace add https://github.com/affaan-m/everything-claude-code

# 安装插件
/plugin install ecc@ecc

# 手动复制所需规则
mkdir -p ~/.claude/rules/ecc
cp -R rules/common ~/.claude/rules/ecc/
cp -R rules/typescript ~/.claude/rules/ecc/
```

### 方式二：手动安装

```bash
git clone https://github.com/affaan-m/everything-claude-code.git
cd everything-claude-code
npm install
./install.sh --profile full    # 完整安装
# 或
./install.sh --profile minimal --target claude  # 最小安装（无 hooks）
```

### 方式三：NPM

```bash
npx ecc-install --profile full
```

### ⚠️ 重要提醒

> **不要叠加安装方式**。最常见的错误是先 `/plugin install`，再运行 `install.sh --profile full`，导致技能重复和行为重复。

## 选择式安装（Selective Install）

v1.9.0 引入的选择式安装架构支持按需安装：

```bash
# 咨询顾问，找出需要的组件
npx ecc consult "security reviews" --target claude

# 最小安装 + 机器学习能力
npx ecc install --profile minimal --target claude --with capability:machine-learning
```

## Hook 运行时控制

```bash
# Hook 严格度配置（默认 standard）
export ECC_HOOK_PROFILE=standard

# 禁用特定 Hook
export ECC_DISABLED_HOOKS="pre:bash:tmux-reminder,post:edit:typecheck"

# SessionStart 上下文上限（默认 8000 字符）
export ECC_SESSION_START_MAX_CHARS=4000

# 完全关闭 SessionStart 上下文注入
export ECC_SESSION_START_CONTEXT=off
```

## ECC 2.0（Alpha）

v2.0.0-rc.1 引入了 Rust 控制层原型（`ecc2/`），提供：

- `ecc dashboard`：桌面 GUI（Tkinter 实现）
- `ecc start`、`ecc stop`、`ecc resume`：会话生命周期管理
- `ecc sessions`：会话列表
- `ecc status --markdown --write status.md`：状态快照导出
- `ecc daemon`：后台守护进程

## 跨框架支持

ECC 的 skill catalog 和治理规则可在以下框架中通用：

| 框架 | 集成方式 |
|------|----------|
| **Claude Code** | 原生插件 + marketplace |
| **Codex (OpenAI)** | `AGENTS.md` 集成 |
| **Cursor** | `.cursor/` 目录适配 |
| **OpenCode** | 插件系统（20+ 事件类型） |
| **Gemini** | `.gemini/` 配置适配 |
| **GitHub Copilot** | 规则和提示适配 |
| **Trae / Antigravity / Qwen** | 规则和 Skill 适配 |

## 生态工具

| 工具 | 说明 |
|------|------|
| **ecc-universal**（npm） | ECC 通用安装和 CLI 工具 |
| **ecc-agentshield**（npm） | Agent 安全审计工具（1282 测试，102 规则） |
| **ECC Tools GitHub App** | GitHub Marketplace 应用（免费/Pro/企业版） |
| **ECC Dashboard** | 桌面 GUI 组件浏览器 |

## 版本历史

| 版本 | 日期 | 关键更新 |
|------|------|----------|
| v1.2.0 | 2026.02 | Django/Spring Boot 支持，持续学习 v2 |
| v1.3.0 | 2026.02 | OpenCode 插件支持 |
| v1.4.0 | 2026.02 | 多语言规则，安装向导，PM2，中文翻译 |
| v1.6.0 | 2026.02 | Codex CLI，AgentShield，GitHub Marketplace |
| v1.7.0 | 2026.02 | 跨平台扩展，Presentation Builder |
| v1.8.0 | 2026.03 | **Harness Performance System** 正式定位 |
| v1.9.0 | 2026.03 | 选择式安装，6 个新 Agent，SQLite 状态存储 |
| v2.0.0-rc.1 | 2026.04 | Dashboard GUI，运营工作流，ECC 2.0 Alpha，Rust 控制层 |

## 项目标识

ECC 有三个不可互换的公共标识符：

- **GitHub 源码仓库**：`affaan-m/everything-claude-code`
- **Claude marketplace/plugin 标识**：`ecc@ecc`
- **npm 包名**：`ecc-universal`
