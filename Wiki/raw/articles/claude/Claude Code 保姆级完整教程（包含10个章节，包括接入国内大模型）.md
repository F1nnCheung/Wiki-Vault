---
title: "Claude Code 保姆级完整教程（包含10个章节，包括接入国内大模型）"
source: "https://mp.weixin.qq.com/s/z95wXk_LktYv9O0YGh-W2w?poc_token=HEU7_GmjF5p74SG_v44b0pOwzOeM6fkF4XGD6KSa"
author:
  - "[[zy]]"
published:
created: 2026-05-07
description:
tags:
  - "clippings"
---
zy *2026年4月1日 12:30*

// COMPLETE GUIDE · 2026

## Claude Code保姆级完整教程

从零安装到进阶使用，涵盖模型配置、Skills、路由切换与实战技巧，一篇搞定所有疑惑

📖 综合教程⏱ 约 20 分钟阅读🎯 适合所有水平🔄 持续更新

// 目录 · TABLE OF CONTENTS

1. Claude Code 是什么
2. 安装前的准备
3. 安装 Claude Code
4. 登录与授权
5. 基础使用方法
6. Slash 命令大全
7. 接入第三方模型
8. 进阶路由工具
9. Skills 技能系统
10. 实战技巧与最佳实践

// 01 · OVERVIEW

## Claude Code 是什么？

Claude Code（简称 CC）是 Anthropic 推出的终端 AI 编码助手，核心理念是 **「住在终端里」** 。它不只是一个代码补全工具，而是一个真正意义上的通用 AI Agent：

🧠

#### 理解项目结构

自动读取代码库上下文，理解文件关系与架构设计

✏️

#### 直接编辑代码

可以读写任意文件，重构模块，修复 bug

⚙️

#### 执行终端命令

运行测试、构建项目、执行脚本，全自动流程

🔀

#### 管理 Git

提交代码、合并分支、查看 diff，流畅协作

💻

#### IDE 集成

支持 VS Code、JetBrains 等主流开发环境

📊

#### 通用 AI 助手

不限于编程！数据分析、文档处理、自动化脚本均可

💡

**与普通 AI 对话框的区别** Claude Code 不需要你复制粘贴代码，它直接在你的项目里操作文件。就像雇了一个懂你代码库的工程师，而不是跟陌生人聊天。

// 02 · PREREQUISITES

## 安装前的准备

在安装 Claude Code 之前，需要先准备好以下环境：

### 1\. 科学上网环境（必须）

Claude Code 需要访问 Anthropic 的 API，国内用户必须配置代理。确保代理能正常访问 `claude.ai` 和 `anthropic.com` 。

### 2\. 安装 Node.js

前往 **nodejs.org** 下载最新 LTS 版本。安装后在终端验证：

```
node --version
v22.x.x
 npm --version
10.x.x
```

### 3\. Windows 用户额外步骤

Windows 用户还需要安装 **Git for Windows** （提供 bash 环境），前往 `git-scm.com` 下载。建议使用 WSL2（Windows Subsystem for Linux）获得更好体验。

⚠️

**已安装 Cursor 等 AI 工具的注意** 如果你已经安装了 Cursor、Windsurf 等 AI 编程工具，它们可能与 Node.js 环境存在冲突。建议使用 nvm（Node Version Manager）管理多个 Node 版本。

// 03 · INSTALLATION

## 安装 Claude Code

Claude Code 提供多种安装方式，选择适合你的平台：

### 方式一：NPM 安装（推荐 Node.js 用户）

```
# 全局安装
 npm install -g @anthropic-ai/claude-code
```

### 方式二：官方脚本一键安装

#### macOS / Linux / WSL

```
curl -fsSL https://claude.ai/install.sh | bash
```

#### Windows PowerShell

```
irm https://claude.ai/install.ps1 | iex
```

#### Windows CMD

```
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

### 验证安装是否成功

```
claude --version# 看到版本号说明安装成功
claude# 进入交互模式
```

✅

**安装成功的标志** 终端显示版本号，或进入 `>` 交互提示符界面，即表示安装成功。

### 常见安装报错处理

EACCES 权限错误

使用 `sudo npm install -g` 或配置 npm 全局目录到用户目录

网络连接超时

检查代理配置，或使用 `npm --registry=https://registry.npmmirror.com`

Node 版本不兼容

使用 nvm 切换到 Node.js 18+ 版本

command not found

将 npm 全局 bin 目录加入 PATH 环境变量，重启终端

// 04 · AUTH

## 登录与授权

首次运行 `claude` 会弹出登录提示，支持两种授权方式：

1

**使用 claude.ai 账户交互式登录。需要有效的 Claude Pro/Max 订阅计划，或者使用 API 额度。**

2

**前往 `console.anthropic.com` 获取 API Key，在登录界面选择「API Key」方式输入。**

3

**登录信息保存在 `~/.config/claude` （macOS/Linux）或 `%APPDATA%\claude` （Windows）。**

// 05 · BASIC USAGE

## 使用方法

### 启动方式

```
# 进入你的项目目录后启动
 cd /path/to/your/project
 claude# 或者直接带参数执行
 claude "帮我分析这个项目的代码结构"
```

### 常用自然语言指令示例

进入交互模式后，用中文或英文自然语言描述需求：

```
# 代码相关> 帮我在 utils/ 下创建一个带日志轮转的 logger.py
> 为 date_parser 模块的边缘情况写单元测试
> 解释 module_bar 中的 foo 函数是做什么的
> 把 module_baz 重构为 async/await 风格# 项目管理> 帮我看看有哪些 TODO 还没完成
> 对我刚写的代码做安全审查
> 提交当前改动并写一个清晰的 commit message# 通用任务> 分析 data.csv 并告诉我数据质量问题
> 把 report.docx 里的内容整理成 Markdown
```

### 工作流建议

🎯

**新手最重要的一条建议** 先用 `/init` 命令初始化项目，Claude Code 会生成 `CLAUDE.md` 文件，记录你的项目约定和规范，后续所有对话都会参考这个文件，让 Claude 更了解你的项目。

// 06 · SLASH COMMANDS

## Slash 命令大全

在交互模式中，输入 `/` 开头的命令可以控制会话行为、查看状态、管理配置等。

### 常用内置命令

/init

初始化项目，生成 CLAUDE.md 指导文件（ **新项目必做** ）

/clear

清空当前会话历史，节省 token 用量

/compact

压缩会话上下文，可带聚焦指令，如 `/compact 只保留 Bug 修复相关`

/model

选择或切换当前使用的 AI 模型

/cost

查看当前会话的 token 使用统计和费用

/review

对当前代码请求 Code Review

/security-review

对当前分支的待定更改执行安全审查

/memory

编辑 CLAUDE.md 记忆文件，更新项目规范

/todos

列出当前会话中的待办事项

/mcp

管理 MCP 服务器连接，扩展 Claude 的工具能力

/rewind

回退会话或代码状态到某个节点

/export

导出当前会话到文件或剪贴板

/doctor

检查 Claude Code 安装健康状况，排查问题

/vim

进入 vim 模式，支持交替插入/命令模式

### 自定义命令（Custom Commands）

你可以把常用的提示模板固化为自定义命令，极大提升工作效率。

#### 创建项目命令（团队共享）

```
# 在项目根目录创建命令文件mkdir -p .claude/commands# 创建一个代码审查命令cat > .claude/commands/review.md << 'EOF'
---
description: 全面的代码审查，包含安全检查
allowed-tools: Bash, Read
argument-hint: "文件路径或模块名"
---

请对 $ARGUMENTS 进行全面的代码审查，包括：
1. 潜在 Bug 和逻辑错误
2. 安全漏洞（XSS、SQL 注入、权限问题）
3. 性能瓶颈
4. 代码可读性和命名规范
5. 改进建议

@$ARGUMENTS
EOF
```

使用时输入： `/review src/api/user.py`

#### 创建个人命令（所有项目可用）

```
# 个人命令放在家目录mkdir -p ~/.claude/commands# 创建一个生成单元测试的命令cat > ~/.claude/commands/test.md << 'EOF'
---
description: 为指定模块生成单元测试
---

为 $1 生成完整的单元测试，要求：
- 覆盖正常情况和边缘情况
- 使用 pytest 框架
- 包含 mock 和 fixture 示例
EOF
```

💡

**Slash 命令 vs Skills 的区别** Slash 命令适合简单、重复的提示模板，手动触发。Skills 则适合复杂、多文件的自动发现能力，包含脚本和校验流程——两者互补，不是替代关系。

// 07 · THIRD-PARTY MODELS

## 接入第三方模型

使用官方模型有三大痛点： **成本高、额度限制频繁、灵活性差** 。通过环境变量配置，可以无痛切换到 DeepSeek、智谱 GLM 等国产模型，大幅降低成本。

### 方案一：DeepSeek 集成

DeepSeek 提供与 Anthropic API 兼容的接口，只需设置环境变量：

#### Bash / Zsh（添加到 ~/.bashrc 或 ~/.zshrc）

```
exportANTHROPIC_BASE_URL=https://api.deepseek.com/anthropicexportANTHROPIC_AUTH_TOKEN=your_deepseek_api_keyexportAPI_TIMEOUT_MS=600000exportANTHROPIC_MODEL=deepseek-chatexportANTHROPIC_SMALL_FAST_MODEL=deepseek-chatexportCLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1
```

#### Fish Shell（添加到 ~/.config/fish/config.fish）

```
set -gx ANTHROPIC_BASE_URL https://api.deepseek.com/anthropic
set -gx ANTHROPIC_AUTH_TOKEN your_deepseek_api_key
set -gx API_TIMEOUT_MS 600000
set -gx ANTHROPIC_MODEL deepseek-chat
set -gx ANTHROPIC_SMALL_FAST_MODEL deepseek-chat
set -gx CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC 1
```

配置后重启终端，运行 `claude` 即自动使用 DeepSeek。

### 方案二：智谱 GLM 集成

#### 自动配置（推荐）

```
curl -fsSL "https://cdn.bigmodel.cn/install/claude_code_env.sh" | bash
```

#### 手动配置（编辑 ~/.claude/settings.json）

```
{  "env": {    "ANTHROPIC_AUTH_TOKEN": "your_zhipu_api_key",    "ANTHROPIC_BASE_URL": "https://open.bigmodel.cn/api/anthropic",    // 国际版: "https://api.z.ai/api/anthropic"
    "API_TIMEOUT_MS": "3000000",    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "glm-4.5-air",    "ANTHROPIC_DEFAULT_SONNET_MODEL": "glm-4.6",    "ANTHROPIC_DEFAULT_OPUS_MODEL": "glm-4.6"
  }
}
```

⚠️

**兼容性注意事项** 不同版本的 Claude Code 对第三方 API 的兼容性可能不同。如果遇到报错，优先检查是否使用了最新版本，并查阅第三方提供商的文档。

### 环境变量说明

ANTHROPIC\_BASE\_URL

API 基础地址，替换为第三方提供商地址

ANTHROPIC\_AUTH\_TOKEN

第三方服务的 API Key（替代 Anthropic 官方 Key）

ANTHROPIC\_MODEL

指定默认使用的模型名称

API\_TIMEOUT\_MS

API 调用超时时间（毫秒），推理模型建议设置更长

CLAUDE\_CODE\_DISABLE\_NONESSENTIAL\_TRAFFIC

禁用非必要流量（统计/遥测），节省资源

// 08 · ADVANCED ROUTING

## 进阶路由工具

当需要管理多个模型、实现按任务类型路由时，单纯的环境变量配置就不够了。这里介绍两个强大的开源工具。

### 工具一：Claude Code Router（CCR）

CCR 是命令行路由代理，核心能力是 **按任务类型智能分发请求** 到不同模型：

#### 安装

```
npm install -g @musistudio/claude-code-router
```

#### 创建配置文件

```
# 创建配置目录
 mkdir -p ~/.claude-code-router
 cat > ~/.claude-code-router/config.json << 'EOF'
```
```
{  "LOG": true,  "API_TIMEOUT_MS": 600000,
  "Providers": [    {      "name": "deepseek",      "api_base_url": "https://api.deepseek.com/chat/completions",      "api_key": "sk-你的DeepSeek密钥",      "models": ["deepseek-chat", "deepseek-reasoner"],      "transformer": { "use": ["deepseek"] }    },    {      "name": "gemini",      "api_base_url": "https://generativelanguage.googleapis.com/v1beta/models/",      "api_key": "你的Gemini密钥",      "models": ["gemini-2.5-flash", "gemini-2.5-pro"],      "transformer": { "use": ["gemini"] }    },    {      "name": "ollama",      "api_base_url": "http://localhost:11434/v1/chat/completions",      "api_key": "ollama",      "models": ["qwen2.5-coder:latest"]    }  ],
  "Router": {    "default": "deepseek,deepseek-chat",    "background": "ollama,qwen2.5-coder:latest",    "think": "deepseek,deepseek-reasoner",    "longContext": "gemini,gemini-2.5-pro",    "longContextThreshold": 60000,    "webSearch": "gemini,gemini-2.5-flash"  }}
```

#### 路由策略说明

default

普通任务默认使用的模型（成本敏感，选便宜的）

background

后台任务（如文件索引）使用本地模型，零成本

think

复杂推理任务（如架构设计、算法优化）使用推理模型

longContext

超长上下文（超过 longContextThreshold token）自动切换到支持长窗口的模型

webSearch

需要联网搜索时使用支持搜索的模型

#### 运行 CCR

```
# 启动 Claude Code（通过路由层）
 ccr code# 重启服务
 ccr restart# 打开可视化管理界面
 ccr ui# 交互式切换模型
 ccr model
```

### 系统架构图

┌──────────────────────┐ │ Claude Code CLI │ ← 你的终端 └──────────┬───────────┘ │ ▼ ┌────────────────────────────────────┐ │ CCR 路由层（智能分发） │ │ • 路由策略引擎 • 请求转换器 │ │ • 日志统计 • 响应聚合 │ └───┬──────────┬──────────┬───────────┘ │ │ │ ▼ ▼ ▼ ┌────────┐ ┌────────┐ ┌──────────┐ │DeepSeek│ │本地LLM │ │ Gemini │ │(默认) │ │(后台) │ │(长上下文)│ └────────┘ └────────┘ └──────────┘ │ │ │ └──────────┴──────────┘ │ ▼ 返回给 Claude Code

### 工具二：CC-Switch（可视化管理）

CC-Switch 是跨平台桌面应用，适合不喜欢命令行配置的用户：

#### 核心功能亮点

- **一键切换** Claude Code、Codex、Gemini CLI 的 Provider 配置
- **速度测试** ：测量各 API 端点延迟，可视化对比
- **MCP 管理** ：统一管理所有 MCP 服务器，支持导入导出
- **Skills 管理** ：扫描 GitHub 仓库，一键安装 Skills
- **Prompts 管理** ：多预设系统提示，带 Markdown 编辑器
- **系统托盘** ：后台常驻，快速切换不影响工作流

#### 安装方式

```
# macOS - Homebrew（推荐）
 brew tap farion1231/ccswitch
 brew install --cask cc-switch# ArchLinux
 paru -S cc-switch-bin# Windows/Linux - 从 GitHub Releases 下载安装包# https://github.com/farion1231/cc-switch/releases
```

### CCR vs CC-Switch 选择指南

| **特性** | **Claude Code Router** | **CC-Switch** |
| --- | --- | --- |
| **界面类型** | 命令行 + Web UI | 桌面 GUI（Tauri） |
| **智能路由** | ✓ 按任务类型路由 | ✗ 仅手动切换 |
| **MCP 管理** | ✗ | ✓ 跨应用统一管理 |
| **Skills 管理** | ✗ | ✓ GitHub 扫描安装 |
| **适用场景** | CI/CD、自动化、服务器 | 本地开发、频繁切换 |
| **学习曲线** | 中（需配置 JSON） | 低（可视化操作） |

💡

**最佳组合** 可以用 CC-Switch 管理基础 Provider 配置，再用 CCR 处理复杂的路由逻辑。两者互补，并不冲突。

// 09 · SKILLS

## Skills 技能系统

Skills 是 Claude Code 的「可插拔能力包」，本质是放在特定目录下的 Markdown 文档，Claude Code 会自动发现并在适当时机调用它们——无需手动触发。

### Skills 与 Slash 命令的区别

| **维度** | **Skills** | **Slash 命令** |
| --- | --- | --- |
| **触发方式** | 自动发现、智能调用 | 手动输入 `/命令名` |
| **适用场景** | 复杂、多文件、涉及脚本的能力 | 简单、重复的提示模板 |
| **内容复杂度** | 可包含脚本、验证流程 | 通常是提示文本 |
| **安装位置** | `~/.claude/skills/` | `.claude/commands/`  或 `~/.claude/commands/` |

### Skills 安装目录

```
# 个人 Skills（所有项目可用）~/.claude/skills/# 项目 Skills（仅当前项目）.claude/skills/
```

### 手动安装 Skill

```
# 从 GitHub 安装某个 Skill
 mkdir -p ~/.claude/skills
 git clone https://github.com/some/skill-repo ~/.claude/skills/my-skill# 或者直接复制 Skill 文件
 cp my-skill.md ~/.claude/skills/
```

### 一个完整的 Skill 示例

#### 📄 ~/.claude/skills/code-review.md

```
---
name: code-review
description: 自动执行全面代码审查，包含安全检查和性能分析
triggers:
  - "审查代码"
  - "code review"
  - "检查这段代码"
---# 代码审查 Skill当用户需要代码审查时，按以下步骤执行：## 步骤 1：读取目标文件使用 Read 工具读取指定文件内容## 步骤 2：执行静态分析!python -m pylint {file} --output-format=text## 步骤 3：生成审查报告报告包含：安全漏洞、性能问题、代码规范、改进建议
```

### 用 CC-Switch 一键管理 Skills

CC-Switch 内置了 Skills 管理界面，可以自动扫描 GitHub 仓库并一键安装：

1. 打开 CC-Switch，点击右上角「Skills」按钮
2. 应用会自动扫描预配置的精选 Skill 仓库
3. 找到需要的 Skill，点击「安装」一键部署到 `~/.claude/skills/`
4. 也可以添加自定义 GitHub 仓库地址

// 10 · TIPS & TRICKS

## 实战技巧与最佳实践

TIP · 01

#### 先写 CLAUDE.md，再开始开发

用 `/init` 生成初始文件后，补充你的技术栈、编码规范、项目架构说明。这是让 Claude 真正理解你项目的关键。

TIP · 02

#### 善用 /compact 控制 Token 成本

长对话会消耗大量上下文窗口。每隔一段时间用 `/compact` 压缩历史，可以显著降低成本并减少幻觉。

TIP · 03

#### 任务分解比单次大任务更可靠

不要一次让 Claude 完成整个功能。拆分为「设计接口 → 实现逻辑 → 写测试 → 代码审查」等小步骤，每步验证后再继续。

TIP · 04

#### 用 /review + /security-review 双重把关

提交前先跑 `/review` 检查代码质量，再跑 `/security-review` 做安全检查，养成习惯能避免很多问题。

TIP · 05

#### 低成本模型处理简单任务

用路由工具配置策略：文档整理、格式转换用便宜模型；核心算法、架构设计用高质量模型。合理搭配可降低 70% 以上成本。

TIP · 06

#### 善用 @ 引用文件

在命令和对话中用 `@path/to/file` 明确引用文件，比让 Claude 自己搜索更精准，也节省上下文空间。

TIP · 07

#### 用 /rewind 回退实验性改动

尝试重构或大改前，记住可以用 `/rewind` 回退。但更好的习惯是用 Git 做检查点， `git stash` 是你的后盾。

TIP · 08

#### 把 API Key 放环境变量，不要写死

配置第三方模型时，永远用 `$ENV_VAR_NAME` 引用密钥，不要在配置文件里明文写 API Key，防止泄露。

### Spec-Driven 开发模式（进阶）

社区实践发现， **Spec-Driven（规范驱动）开发** 比 PRD 驱动的 AI 编码效果好得多：

1

**不是需求文档，而是接口契约：函数签名、数据结构、边界条件、错误处理方式。**

2

**`"根据 @spec/auth.md 的接口定义，实现 src/auth/ 模块"` 。Claude 有明确约束，输出质量更稳定。**

3

**运行测试 + 静态检查，不符合的让 Claude 修正，而不是反复对话调试。**

4

**Spec 文件和代码一起提交，下次修改功能时 Claude 有历史参考，不会忘记之前的约定。**

🚨

**常见踩坑提醒** 不要在代理不稳定的时候运行大型重构任务——中途断联会导致部分修改不完整，很难回滚。重要操作前先 `git commit` ！

// RESOURCES

## 参考资源

官方文档

code.claude.com/docs — Claude Code 官方完整文档

DeepSeek API

api-docs.deepseek.com — DeepSeek Anthropic 兼容接口文档

智谱 GLM（国内）

docs.bigmodel.cn/cn/coding-plan/tool/claude

Claude Code Router

github.com/musistudio/claude-code-router — CCR 开源项目

CC-Switch

github.com/farion1231/cc-switch — 可视化配置管理工具

社区讨论

linux.do — 国内最活跃的 Claude Code 中文社区

AI工具 · 目录

继续滑动看下一个

硅基工程师

向上滑动看下一个