---
title: Everything Claude Code 完整指南
type: topic
tags: [ecc, claude-code, agent-harness, skills, installation, guide]
created: 2026-05-13
updated: 2026-05-13
sources:
  - raw/articles/132页！Anthropic黑客松获胜者everything-claude-code完整教程来了！.md
  - https://github.com/affaan-m/everything-claude-code
related:
  - entities/everything-claude-code.md
  - entities/claude-code.md
  - concepts/skills-concept.md
  - concepts/harness-engineering.md
  - topics/claude-code-skills-ecosystem.md
---

# Everything Claude Code 完整指南

> 本文是 ECC 的从零到精通实操指南，涵盖安装配置、核心概念、Agent 体系、Skills 生态、Hook 自动化、持续学习、安全扫描和高级用法。

## 一、ECC 是什么

ECC 的本质是一个 **Agent Harness 性能优化系统**。它不是简单的配置集合，而是：
- **技能体系**：228 个可复用工作流
- **本能行为**：跨会话记忆与自动模式提取
- **记忆优化**：上下文持久化与智能压缩
- **持续学习**：从日常使用中提炼新技能
- **安全扫描**：AgentShield 集成，102 条安全规则

## 二、快速安装（2 分钟）

### 推荐路径：插件安装

```bash
# 1. 添加 marketplace
/plugin marketplace add https://github.com/affaan-m/everything-claude-code

# 2. 安装插件
/plugin install ecc@ecc

# 3. 手动复制规则（插件无法自动分发 rules）
mkdir -p ~/.claude/rules/ecc
cp -R rules/common ~/.claude/rules/ecc/
cp -R rules/typescript ~/.claude/rules/ecc/   # 按需选择语言包
```

### 最简安装（无 Hooks，低上下文）

如果不想用全局 Hook，只想要 ECC 的规则、Agent 和核心工作流技能：

```bash
./install.sh --profile minimal --target claude
```

### 完整手动安装

```bash
git clone https://github.com/affaan-m/everything-claude-code.git
cd everything-claude-code
npm install
./install.sh --profile full
```

### ⚠️ 关键警告

**绝对不要叠加安装方法**。最常见的错误：
1. 先 `/plugin install ecc@ecc`
2. 再 `./install.sh --profile full`

这会导致技能重复和行为混乱。选择一种路径，坚持到底。

## 三、安装后验证

```bash
# 检查已安装组件
/plugin list ecc@ecc

# 预览可用命令
/ecc:plan "test feature"    # 插件安装使用命名空间前缀
/plan "test feature"        # 手动安装使用短命令名

# 启动 Dashboard GUI
npm run dashboard
# 或
python3 ./ecc_dashboard.py
```

## 四、核心组件体系

### 4.1 Agent 体系（60 个）

ECC 的 Agent 分为五个层次，按专业领域组织：

| 层级 | 类型 | 示例 Agent | 触发时机 |
|------|------|------------|----------|
| **规划层** | 策略与设计 | planner, architect, chief-of-staff | 复杂功能请求、架构决策 |
| **开发层** | 代码编写与审查 | tdd-guide, code-reviewer, code-simplifier | 新功能、代码修改后 |
| **语言层** | 语言专项 | python-reviewer, go-reviewer, rust-reviewer | 特定语言项目 |
| **构建层** | 错误修复 | build-error-resolver, java-build-resolver | 构建失败时 |
| **运维层** | 系统管理 | loop-operator, harness-optimizer, security-reviewer | 自主循环、配置调优 |

**使用原则**：Agent 会主动被调用，无需用户手动指定——
- 复杂功能 → **planner** 自动介入
- 代码刚写完 → **code-reviewer** 自动审查
- 构建失败 → **build-error-resolver** 自动诊断

### 4.2 Skills 体系（228 个）

Skills 是 ECC 的主要工作流表面（`skills/` 目录），按领域分类：

| 领域 | 代表性 Skill | 用途 |
|------|-------------|------|
| **编码标准** | coding-standards, cpp-coding-standards, java-coding-standards | 语言最佳实践 |
| **测试** | tdd-workflow, e2e-testing, python-testing, golang-testing | 测试方法论 |
| **后端** | backend-patterns, api-design, django-patterns, springboot-patterns | 后端架构模式 |
| **前端** | frontend-patterns, frontend-slides, angular-developer | 前端开发模式 |
| **安全** | security-review, security-scan, perl-security | 安全审查与扫描 |
| **学习** | continuous-learning, continuous-learning-v2, search-first | 模式提取与知识积累 |
| **评估** | eval-harness, verification-loop, agent-eval | 验证与评估 |
| **运维** | deployment-patterns, docker-patterns, autonomous-loops | 部署与自动化 |
| **业务** | article-writing, content-engine, market-research, brand-voice | 内容与商业运营 |
| **数据** | clickhouse-io, database-migrations, postgres-patterns | 数据工程 |

> **Skills-first 方向**：`skills/` 是规范的工作流表面。`commands/` 是遗留的斜杠命令兼容层，正逐步迁移到 skills。

### 4.3 Hooks 体系

ECC 通过 JSON 定义的 Hooks 实现自动化生命周期管理：

```
SessionStart ──→ 注入历史上下文、项目记忆
PreToolUse  ──→ 工具使用前检查（如 bash 命令安全审计）
PostToolUse ──→ 工具使用后处理（如编辑后自动格式化）
Stop        ──→ 生成会话摘要、持久化学习成果
```

**运行时控制**：

```bash
# 三档 Hook 严格度
export ECC_HOOK_PROFILE=minimal    # 最小干预
export ECC_HOOK_PROFILE=standard   # 标准（默认）
export ECC_HOOK_PROFILE=strict     # 严格

# 按需禁用特定 Hook
export ECC_DISABLED_HOOKS="pre:bash:tmux-reminder,post:edit:typecheck"

# 控制 SessionStart 上下文注入量
export ECC_SESSION_START_MAX_CHARS=4000
export ECC_SESSION_START_CONTEXT=off    # 完全关闭
```

### 4.4 Rules 体系

17 个语言/框架规则包，按需安装：

```
rules/
├── common/          # 通用规则（必装）
├── typescript/      # TypeScript/JavaScript
├── python/          # Python
├── golang/          # Go
├── java/            # Java
├── kotlin/          # Kotlin/Android/KMP
├── rust/            # Rust
├── cpp/             # C/C++
├── swift/           # Swift
├── csharp/          # C#
├── dart/            # Dart
├── fsharp/          # F#
├── php/             # PHP
├── perl/            # Perl
├── angular/         # Angular
├── arkts/           # HarmonyOS/ArkTS
└── web/             # Web 通用
```

建议：先装 `common`，再加 1-2 个你实际使用的语言包。

## 五、持续学习系统

ECC 的持续学习分为两个版本：

### v1（Stop-hook 模式提取）
- 会话结束时自动触发
- 从对话中提取模式和教训
- 保存为可复用技能

### v2（Instinct-based 本能学习）
- 带**置信度评分**的模式学习
- 支持导入/导出（`/instinct-import`、`/instinct-export`）
- `/evolve`：将本能自动聚类为正式 Skill
- `/prune`：删除过期的待定本能

```bash
# 查看已学习的本能
/instinct-status

# 导出本能供分享
/instinct-export

# 从外部导入本能
/instinct-import

# 将本能进化为正式 Skill
/evolve
```

## 六、安全体系

### AgentShield 集成

ECC 内置 AgentShield 安全审计（1282 个测试，102 条规则）：

```bash
# 运行安全扫描
/security-scan
```

### 安全指南覆盖

- 攻击向量识别
- 沙箱技术
- 数据净化
- CVE 漏洞追踪
- 密钥管理（绝不硬编码，使用环境变量）

### Prompt Defense Baseline

ECC 的 `CLAUDE.md` 包含 Prompt 防御基线：
- 防止角色/身份变更
- 拒绝泄露机密数据
- 检测 Unicode/同形字/零宽字符攻击
- 验证外部/第三方内容

## 七、多 Agent 编排

### PM2 工作流（v1.4.0+）

```bash
# PM2 服务生命周期管理
/pm2

# 多 Agent 任务分解
/multi-plan "完整的电商系统"

# 编排式多 Agent 执行
/multi-execute

# 后端/前端专项编排
/multi-backend
/multi-frontend
/multi-workflow
```

> ⚠️ `multi-*` 命令需要额外安装 `ccg-workflow` 运行时：`npx ccg-workflow`

### 并行化策略

- **Git Worktrees**：多个分支并行开发
- **级联方法（Cascade）**：任务分层递进
- **实例扩展**：根据复杂度动态增减并行实例

## 八、跨框架使用

ECC 的 Skill 目录和治理规则可在多个 AI 编码框架中复用：

| 框架 | 配置目录 | 集成方式 |
|------|----------|----------|
| Claude Code | `.claude/` | 原生插件 |
| Codex | `.codex/` | `AGENTS.md` |
| Cursor | `.cursor/` | 规则 + 命令适配 |
| OpenCode | `.opencode/` | 插件系统 |
| Gemini | `.gemini/` | 配置适配 |
| Trae | `.trae/` | 规则适配 |
| Antigravity | — | IDE 支持 |
| Qwen | `.qwen/` | 规则适配 |

## 九、ECC 2.0 前瞻

ECC 2.0（当前 Alpha 阶段）引入了 Rust 控制层：

```bash
# 本地构建
cd ecc2/
cargo build

# 核心命令
ecc dashboard     # 启动 Dashboard
ecc start         # 启动会话
ecc sessions      # 查看会话列表
ecc status        # 状态快照
ecc daemon        # 后台守护进程
```

### 关键能力

- **Rust 控制层**：高性能会话管理器
- **状态快照**：`ecc status --markdown --write status.md` 导出可移植状态
- **工作项跟踪**：`ecc work-items sync-github --repo owner/repo`
- **自动就绪检查**：`ecc status --exit-code` 用于 CI/CD

## 十、常见问题与故障排除

### 安装后技能重复

**症状**：同一个 `/plan` 命令出现两次
**原因**：叠加了插件安装和手动安装
**解决**：
1. 移除 Claude Code 插件
2. 运行 `node scripts/ecc.js uninstall`
3. 手动删除不需要的规则文件夹
4. 只用一种方式重装

### Hook 过于侵入

```bash
# 切换到最小 Hook 配置
export ECC_HOOK_PROFILE=minimal

# 或完全关闭 SessionStart 上下文注入
export ECC_SESSION_START_CONTEXT=off
```

### 组件定位

不确定需要安装哪些组件时：

```bash
npx ecc consult "security reviews" --target claude
# 返回匹配的组件、相关配置文件和安装命令
```

### 恢复损坏安装

```bash
node scripts/ecc.js list-installed   # 查看已安装
node scripts/ecc.js doctor           # 诊断
node scripts/ecc.js repair           # 修复
```

## 十一、最佳实践

1. **先读 Shorthand Guide**：了解 ECC 的哲学和基础概念
2. **从最小安装开始**：`--profile minimal`，按需添加组件
3. **规则精简**：只装 `common` + 你实际使用的 1-2 个语言包
4. **善用 consult 命令**：安装前先咨询，避免装不需要的组件
5. **Skills-first**：优先使用 skills/ 下的工作流，commands/ 是过渡层
6. **不要抗拒 Hook**：Hook 是 ECC 的核心价值——自动持久化上下文和持续学习
7. **定期 evolve**：积累足够的本能后，用 `/evolve` 提炼为正式技能
