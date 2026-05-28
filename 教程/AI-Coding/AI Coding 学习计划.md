# AI Coding 学习计划：从入门到精通

> 基于知识库 [[Wiki/llm-wiki|LLM Wiki]] 整理，最后更新：2026-05-10

---

## 📋 目录

- [第一部分：AI Coding 简介](#第一部分ai-coding-简介)
  - [1.1 发展历程](#11-发展历程2024-2026)
  - [1.2 核心概念名词解释](#12-核心概念名词解释)
  - [1.3 六维概念对比](#13-六维概念对比-skills--mcp--agent--rule--prompt--命令)
- [第二部分：主流 AI Coding 工具](#第二部分主流-ai-coding-工具)
  - [2.1 工具全景对比](#21-工具全景对比)
  - [2.2 Claude Code](#22-claude-code) — 介绍 · 安装与配置 · 基本使用 · 进阶使用（Skill / MCP） · 高阶指令
  - [2.3 Cursor](#23-cursor) — 介绍 · 安装 · 基本使用 · 进阶使用 · 插件
  - [2.4 Trae](#24-trae) — 介绍 · 安装 · 四种模式 · 进阶使用 · Trae vs Cursor
  - [2.5 Codex](#25-codex) — 介绍 · 安装与配置 · 基本使用 · Spec-Driven 开发 · 适用场景
  - [2.6 GitHub Copilot](#26-github-copilot)
- [第三部分：Agent 框架](#第三部分agent-框架)
  - [3.1 OpenClaw](#31-openclaw)
  - [3.2 Hermes Agent](#32-hermes-agent)
  - [3.3 两者深度对比](#33-openclaw-vs-hermes-深度对比)
- [第四部分：拓展使用](#第四部分拓展使用)
  - [4.1 Obsidian + AI 知识库工作流](#41-obsidian--ai-知识库工作流)
  - [4.2 Superpowers + gstack 进阶闭环](#42-superpowers--gstack-进阶开发闭环)
  - [4.3 其他拓展工具与场景](#43-其他拓展工具与场景)
- [学习路线图](#推荐学习路线图)

---

## 第一部分：AI Coding 简介

### 1.1 发展历程（2024-2026）

AI Coding 的发展可以分为三个阶段，从简单的代码补全到多智能体自主协作。

#### 第一阶段：2024 — 代码补全时代

| 时间 | 事件 | 影响 |
|---|---|---|
| 2024 年中 | **Claude 3.5 Sonnet** 发布 | 200K 上下文 + 工具使用能力，成为最强编程模型 |
| 2024 年 | Cursor 日活暴涨十倍，ARR 突破 1 亿美元 | AI 原生 IDE 验证商业模式 |
| 2024 年 3 月 | Cognition 推出 **Devin**（首个全自主 AI 软件工程师） | SWE-bench 13.86%，估值 20 亿美元 |
| 2024 年底 | Windsurf (Codeium) ARR 达 1200 万美元 | Vibe Coding 概念开始流行 |

**特征**：以代码补全和对话式编程为主，"人主导、AI 辅助"的 Copilot 模式。

#### 第二阶段：2025 — 智能体元年

| 时间 | 事件 | 影响 |
|---|---|---|
| 2025 年初 | **Andrej Karpathy 提出 "Vibe Coding"** | 用自然语言描述需求，让 AI 生成代码 |
| 2025 年 1 月 | 字节跳动发布 **Trae** | 完全免费，迅速占领国内市场 |
| 2025 年初 | Anthropic 发布 **Claude Code** | 终端 CLI 智能体，6 个月 ARR 突破 10 亿美元 |
| 2025 年 1 月 | **DeepSeek R1** 引爆市场 | 成本仅为 OpenAI o1 的 1/20 |
| 2025 年 5 月 | Cursor ARR 达 5 亿美元 | AI IDE 进入主流 |
| 2025 年底 | OpenAI 推出 **Codex**；Google 发布 **Gemini CLI** | 大厂全面入局 Agent 编程 |
| 2025 年 11 月 | Peter Steinberger 发布 **OpenClaw** | 开源 AI Agent 引爆 GitHub（24.7 万 Stars） |

**特征**：Agent 智能体成为主旋律；Vibe Coding 从非共识变成共识；工具生态爆炸式增长。

#### 第三阶段：2026 — 智能体工程落地年

| 时间 | 事件 | 影响 |
|---|---|---|
| 2026 年初 | Karpathy 提出 **"Agentic Engineering"** | 多智能体自主规划、执行、测试 |
| 2026 年 2 月 | OpenAI 发布 **GPT-5.3-Codex** | 与 Claude Opus 4.6 同夜发布 |
| 2026 年 3 月 | Claude Code 添加 **Computer Use** | AI 可操作浏览器、桌面应用 |
| 2026 年 3 月 | Anthropic ARR 突破 **300 亿美元** | 超越 OpenAI |
| 2026 年 4 月 | Cursor 发布 **Cursor 3**，估值 **290 亿美元** | 多智能体协同工作区 |
| 2026 年 4 月 | Trae 注册用户破 **600 万**，中国市场份额 **41.2%** | 国产工具登顶 |
| 2026 年 | Claude Code 获 **46% 开发者最爱** | 能力认可度最高 |

**概念演变路径**：

```
2024: AI 代码补全（Copilot 模式）
  ↓
2025: Vibe Coding（自然语言→代码，凭感觉编程）
  ↓
2026: Agentic Engineering（多 Agent 自主协同）
  ↓
未来: ID Coding（意图编程——人类意图直接转化为软件服务）
```


---

### 1.2 核心概念名词解释

#### Vibe Coding（氛围编程）

> 2025 年初由 Andrej Karpathy（前 OpenAI 联合创始人、前 Tesla AI 总监）提出。

**定义**：用自然语言描述想要的效果，让 AI 生成代码——开发者「凭感觉」（vibe）编程，关注「做什么」而非「怎么做」。

**核心主张**：
- 不逐行审查代码，而是描述期望效果
- 让 AI 反复迭代直到满意
- 降低编程门槛，让非技术人员也能开发
- 快速原型验证，加速从想法到产品的过程

**风险**：
- **「技术次贷危机」**：AI 垃圾代码堆积——生成成本趋近于零，但理解维护成本指数上升
- **「死亡螺旋」**：错误喂给 AI → AI 反刍出新错误 → 人类丧失对代码库的控制
- **技能退化**：过度依赖 AI 可能导致开发者丧失底层理解能力

#### Agentic Engineering（智能体工程）

> 2026 年初由 Karpathy 提出，是 Vibe Coding 的进化形态。

**定义**：多个 AI 智能体自主完成**规划→编写→测试→审查**全流程。人类从「驾驶员」退后为「架构师」和「监督者」。

| 维度 | Vibe Coding | Agentic Engineering |
|---|---|---|
| 人类角色 | 需求描述者 | 架构师 / 监督者 |
| AI 角色 | 单一代码生成器 | 多 Agent 协同团队 |
| 流程 | 人→AI→人检查 | AI 自主规划→执行→验证 |
| 产出质量 | 不确定 | 有审查闭环保证 |

角色分工：**Planner**（规划）→ **Coder**（编码）→ **Tester**（测试）→ **Reviewer**（审查）→ **Human 架构师**（定义边界、验收标准）

#### ID Coding（意图编程）—— 终极形态

**定义**：人类表达意图 → 直接转化为软件服务。编程语言本身可能消失，取而代之的是意图表达和架构设计能力。

对未来开发者的影响：
- ↓ 贬值：写代码
- ↑ 升值：读代码 / 定架构、系统设计、需求理解
- → 持续重要：代码审查

#### MCP（Model Context Protocol）

**一句话**：AI 连接外部工具和数据源的开放标准协议。类比 USB-C——为 AI 接入外部系统提供标准化方式。

```
AI ←→ MCP ←→ 浏览器 / 数据库 / GitHub / Figma / ...
```

默认 Claude Code 只能读写文件和对话。MCP 让它能：
- 🖥️ 操作浏览器（Playwright MCP）
- 📦 管理仓库（GitHub MCP）
- 📚 查阅最新文档（Context7，防幻觉）
- 🗄️ 连接数据库（PostgreSQL/SQLite MCP）
- 🔧 桌面控制（Desktop Commander）

> ⚠️ 社区共识：不装 MCP 的 Claude Code 只发挥了约三成功力。

#### Skills（技能系统）

**定义**：给 AI 安装的可复用「能力包」——本质是特定目录下的 Markdown 文档，AI 自动发现并在适当时机按需调用。

| 维度 | Skills | Slash 命令 | MCP |
|---|---|---|---|
| 触发方式 | **自动发现、智能调用** | 手动输入 `/命令` | AI 按需调用 |
| 内容 | 完整方法论（流程+脚本+模板） | 提示文本模板 | 工具接口 |
| 定位 | 教 AI **怎么想** | 快速指令 | 给 AI **工具** |

#### Agent（智能体）

**定义**：能自主感知环境、制定计划、执行多步任务并自我修正的 AI 系统。

能力层次：
```
L1: 对话 AI      → 一问一答，无记忆
L2: 代码补全      → 实时建议，单次操作
L3: 任务执行      → 多步操作（读文件→写代码→跑测试）
L4: 自主 Agent    → 规划→执行→验证→修正 全闭环
L5: 多 Agent 协同 → 多个 Agent 分工协作，人类监督
```

核心组件：**感知**（读取环境信息）→ **规划**（分解目标）→ **执行**（调用工具）→ **记忆**（短期+长期）→ **反思**（自我修正）

#### Prompt（提示词）

**定义**：你向 AI 描述需求的自然语言指令。是所有 AI 交互的起点——门槛最低，但天花板也最高。

**Prompt 的层次**：
```
一句话需求："帮我写个登录页"
  ↓ 低质量，AI 自由发挥空间太大
结构化需求："用 React + Tailwind，包含邮箱/密码输入、表单验证、错误提示、提交按钮"
  ↓ 更可控，但仍靠 AI 自行理解
Spec-Driven："参照 spec/auth.md 接口定义，实现 src/pages/Login.tsx"
  ↓ 精确约束，AI 按规格执行
```

**为什么 Prompt 仍然重要**：
- Skills、MCP、Agent 本质都是「封装好的高级 Prompt」
- 好的 Prompt 能减少返工、降低 Token 消耗
- 即使有了 Skill，最后的细节修正仍然靠 Prompt

#### 命令（Commands / Slash Commands）

**定义**：AI Coding 工具中手动触发的快捷指令，以 `/` 开头。与 Skill 的关键区别：**命令是手动触发，Skill 是自动发现**。

| 维度 | Slash 命令 | Skills |
|---|---|---|
| 触发方式 | 手动输入 `/命令名` | AI 自动发现、智能调用 |
| 适用场景 | 简单、重复的操作 | 复杂、多步骤的流程 |
| 内容 | 提示文本模板 | 完整方法论（流程+脚本+模板） |
| 安装位置 | `.claude/commands/` | `~/.claude/skills/` |

**常用命令分类**：
- **会话管理**：`/clear`（重置）、`/compact`（压缩）、`/resume`（续接）
- **上下文控制**：`/context`（查看占用）、`/cost`（费用）、`/model`（切换模型）
- **任务执行**：`/init`（初始化）、`/plan`（规划模式）、`/todos`（任务管理）
- **代码操作**：`/diff`（查看改动）、`/rewind`（回退）、`/simplify`（代码评审）

#### Rule（规则 / 项目记忆）

**定义**：持久化的指令文件，告诉 AI 「在这个项目里应该怎么做」。不同于一次性 Prompt，Rule 在**每次会话自动加载**，形成 AI 的「长期项目记忆」。

**各工具的 Rule 体系**：

| 工具 | Rule 文件 | 作用域 | 格式 |
|---|---|---|---|
| Claude Code | `CLAUDE.md` | 项目级（根目录）/ 用户级（`~/.claude/`） | Markdown |
| Cursor | `.cursorrules` | 项目级 | Markdown |
| Trae | `.trae/rules.md` | 项目级 | Markdown |
| Hermes Agent | `AGENTS.md` + `SOUL.md` | 项目级（规矩）+ 用户级（性格） | Markdown |

**Rule 里写什么**（以 `CLAUDE.md` 为例）：
```markdown
# 项目规范
- 技术栈：Next.js 14 + TypeScript + Prisma + Tailwind
- 使用 Server Components 优先，避免不必要的 'use client'
- 所有 API 路由统一放 src/app/api/，命名遵循 RESTful 规范
- 测试用 Vitest，覆盖率 >80%
- 禁止直接修改 .env 文件
```

**Rule 的核心价值**：不用每次新会话都重复解释项目背景、技术栈、编码规范。Rule 文件越完善，AI 的「理解偏差」越少。

> 📖 **延伸阅读**：[[Wiki/wiki/topics/claude-md-12-rules|CLAUDE.md 12 条规则深度解析]]——从 Karpathy 原版 4 条到辰北 8 条增量，每条规则都来自真实翻车现场。文末附可复制完整模板，实验数据显示失误率从 41% 降至 3%。

---

### 1.3 六维概念对比：Skills / MCP / Agent / Rule / Prompt / 命令

这些概念本质上是 **从不同维度、不同层级解决同一个问题：如何让 AI 更准确、更自主地完成任务**。

| 维度 | Prompt | 命令 | Rule | Skills | MCP | Agent |
|---|---|---|---|---|---|---|
| **触发方式** | 每次手动输入 | 手动 `/` 触发 | **自动加载** | **自动发现调用** | AI 按需调用 | **自主决策** |
| **持久性** | 一次性 | 一次性 | 跨会话持久 | 跨会话持久 | 跨会话持久 | 跨会话持久 |
| **内容形态** | 自然语言 | 快捷指令模板 | 项目规范文档 | Markdown 方法论包 | 外部工具接口 | 完整决策系统 |
| **定位** | 告诉 AI **做什么** | 快速执行**常见操作** | 告诉 AI **边界在哪** | 教 AI **怎么思考** | 给 AI **工具** | AI **自主行动** |
| **层级** | L0：基础交互 | L1：快捷操作 | L1：持久约束 | L2：方法论封装 | L2：工具扩展 | L3-L5：自主智能 |
| **类比** | 口述需求 | 快捷键 | 公司规章制度 | 员工培训手册 | 办公设备 | 自主员工 |

**六者的协作关系**：

```
Rule（约束层）
  ↓ 定义边界和规范，每次会话自动注入
Prompt（指令层）
  ↓ 描述本次具体需求
Agent（决策层）
  ↓ 理解需求 → 制定计划 → 自主执行
  ├── 调用 Skills（方法论层）
  │     ↓ 按流程思考、按模板输出
  ├── 调用 MCP（工具层）
  │     ↓ 操作浏览器/数据库/GitHub
  └── 响应 /命令（快捷层）
        ↓ 执行常规操作
```

**一句话总结每个概念**：
- **Prompt**：告诉 AI「这次要做什么」
- **命令**：快速触发「常见操作」
- **Rule**：告诉 AI「在这个项目里怎么做事」
- **Skills**：教 AI「遇到某类问题怎么思考」
- **MCP**：给 AI「连接外部世界的手脚」
- **Agent**：以上所有要素整合后的「自主行动者」

---

## 第二部分：主流 AI Coding 工具

### 2.1 工具全景对比

| 维度 | Claude Code | Cursor | Codex | Copilot | Trae |
|---|---|---|---|---|---|
| 公司 | Anthropic | Anysphere | OpenAI | Microsoft | 字节跳动 |
| 形态 | 终端 CLI | AI 原生 IDE | 云端 Agent | IDE 插件 | AI 原生 IDE |
| 上下文 | **2M Token** | 128K | 200K+ | 64K | 128K |
| 代码质量 | **9.7/10** | 9.2/10 | 8.9/10 | 8.5/10 | 8.8/10 |
| 自主能力 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ |
| 定价 | $20-200/月 | $20-200/月 | $20-200/月 | **$10-19/月** | **免费** |
| 偏爱度 | **46%** | 19% | — | 9% | — |

**国内用户维度**：

| 维度 | Trae | Cursor | Copilot | Codex | Claude Code |
|---|---|---|---|---|---|
| 国内直连 | ✅ 极速 | ✅ 基础 | ✅ 稳定 | ❌ 需代理 | ❌ 严格限制 |
| 中文理解 | **98%** | 75% | 58% | 72% | 70% |
| 支付宝支付 | ✅ | ✅ | ❌ | ❌ | ❌ |
| 数据合规 | ✅ | ⚠️ | ⚠️ | ❌ | ❌ |

**推荐组合策略**：
```
日常编码 80%：Trae（国内）/ Cursor（海外）
  +
架构攻坚 15%：Claude Code
  +
审查/debug/批量/自动化：Codex（与 Claude Code 互补）
  +
个人助手 1%：OpenClaw / Hermes
```


---

### 2.2 Claude Code

#### 介绍

Claude Code 是 Anthropic 推出的终端 CLI AI 编程助手。不仅是一个聊天工具——只需描述需求，它就能**自动计划并执行**：读文件、写代码、跑命令、管理 Git。

**核心差异**：Claude Code vs 普通 AI Chat（豆包、DeepSeek）

| 维度 | 普通 AI Chat | Claude Code |
|---|---|---|
| 交互方式 | 一问一答 | 规划 + 自主执行 |
| 文件操作 | 不支持 | 读写项目文件 |
| 命令执行 | 不支持 | 运行脚本、测试、部署 |
| Git 管理 | 不支持 | commit、PR、分支操作 |
| 扩展能力 | 有限 | MCP + Skills 生态 |

**四层能力体系**：
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

**三种运行模式**：
- **默认模式**（修改前询问）：安全模式，每次编辑需确认
- **自动模式**（accept edits on）：减少确认，提高效率
- **规划模式**（plan mode on）：只讨论不修改，用于设计阶段

#### 安装与配置

**前置要求**：Node.js 18+、Git

```bash
# 官方脚本安装（推荐）
curl -fsSL https://claude.ai/install.sh | bash

# 或 npm 全局安装
npm install -g @anthropic-ai/claude-code

# 验证安装
claude --version

# 启动
cd your-project
claude
```

**桌面客户端**（适合非技术用户）：
1. 从 claude.ai/download 下载 Claude Desktop Client
2. 启用开发者模式：Help → Troubleshooting → Enable Developer Mode
3. 切换到 **Code 模式**（`</>` 图标）

**国内用户配置第三方模型**（Claude 账号容易封禁）：

```json
// ~/.claude/settings.json
{
  "hasCompletedOnboarding": true,
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "你的API Key",
    "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
    "ANTHROPIC_MODEL": "deepseek-chat"
  }
}
```

推荐国产模型供应商：
| 供应商 | 优势 | 推荐模型 |
|---|---|---|
| 火山引擎 | Coding Plan 性价比高 | minimax-latest, kimi-k2.6, glm-5.1, deepseek-v3.2 |
| 阿里云百炼 | 有免费额度 | glm-5, qwen系列 |
| DeepSeek | 兼容性最好 | deepseek-chat, deepseek-reasoner |
| 智谱 GLM | 有 Claude Code 专门文档 | glm-5.1 |

**配置的三个层次**：
| 层 | 文件 | 用途 |
|---|---|---|
| 工具层 | `settings.json` | 权限、模型、MCP 配置 |
| 规则层 | `CLAUDE.md` | 项目规范、编码约定（<200行） |
| 学习层 | auto memory | AI 自动记录的偏好和经验 |

**进阶配置工具**：
- **CC Switch**：GUI 管理多工具 Provider/MCP/Skills 配置，支持热切换
- **Claude Code Router**：按任务类型智能路由到不同模型，降低成本 70%+

安装后第一步：
```bash
/init    # 在项目根目录生成 CLAUDE.md
/memory  # 编辑 CLAUDE.md，补充技术栈和编码规范
```

#### 基本使用：核心命令

**新手必知 6 个命令**：

| 命令 | 作用 | 场景 |
|---|---|---|
| `/help` | 查看帮助 | 不知道怎么办时 |
| `/clear` | 清空上下文 | 话题完全切换时 |
| `/compact` | 压缩上下文 | 上下文占用 70%+ 时 |
| `/model` | 切换模型 | 想换模型时 |
| `/effort` | 调整推理深度 | 简单任务降配、复杂任务升配 |
| `/permissions` | 管理权限规则 | 权限弹窗太多时 |

**每日 Top 10 命令**：
1. `/init` — 生成项目 CLAUDE.md，建立"长期记忆"
2. `/compact` — 压缩上下文节省 Token（被最严重低估的命令）
3. `/clear` — 清空会话重新开始
4. `/model` — 查看和切换模型
5. `/cost` — 查看 Token 消耗和费用
6. `/context` — 查看上下文占用状态
7. `/diff` — 查看代码改动（提交前必看）
8. `/memory` — 编辑 CLAUDE.md 记忆文件
9. `/resume` — 恢复历史会话
10. `/rewind` — 回退操作

> ⚠️ 多数人条件反射式 `/clear`，但 `/compact` 保留主线才是更优选择。

**日常工作流**：
```
规划模式 → 描述需求 → 执行 → /context 监控
  → /compact 压缩 → /diff 检查改动 → 提交
```

**权限管理三原则**：
- **allow**（允许）：低风险高频操作（lint、test、git status）
- **ask**（询问）：中风险操作（修改文件、安装依赖）
- **deny**（禁止）：高风险操作（.env、git push --force、rm -rf）

#### 进阶使用：Skill 技能系统

Skill 是放在特定目录下的 Markdown 文档，Claude Code 自动发现并按需调用。

与 Slash 命令的区别：
| 维度 | Skills | Slash 命令 |
|---|---|---|
| 触发方式 | 自动发现、智能调用 | 手动输入 `/命令名` |
| 适用场景 | 复杂、多文件、涉及脚本 | 简单、重复的提示模板 |
| 安装位置 | `~/.claude/skills/` | `.claude/commands/` |

Skill 文件结构：
```
skill-name/
├── SKILL.md       # 必需：技能说明和元数据
├── scripts/       # 可选：辅助脚本
├── templates/     # 可选：文档模板
└── resources/     # 可选：参考文件
```

**精选 8 个核心 Skill**：

| Skill | 用途 | 解决什么痛点 |
|---|---|---|
| **Repomix** | 打包整个仓库为一个文件 | 一次性读懂项目全貌 |
| **ccusage** | 实时显示 Token 消耗 | 控制成本 |
| **frontend-design** | 官方前端设计 Skill | 一句话生成有设计感的 UI |
| **awesome-design-md** | 设计系统 + 文档规范 | 设计稿直接生成代码级文档 |
| **claude-mem** | 长期记忆 | 记住项目偏好和架构决策 |
| **Superpowers** | 全流程增强包 | 14 个方法论的强制流程 |
| **gstack** | YC 的工程标准 | 生产级开发→部署→监控闭环 |
| **marketingskills** | 增长/营销 | Landing 页文案、投放策略 |
| **Everything Claude Code** | 一站式 Harness 系统 | 60 Agent + 228 Skill + Hook + 持续学习 + 安全扫描，社区最大单一 Skill 集合（[[Wiki/wiki/entities/everything-claude-code\|ECC]]） |

> 核心原则：Skill 不在多，在配合。十个打架的 Skill 不如两个清晰分工的 Skill。如果你想要开箱即用的一整套 Skill + Agent 体系，[[Wiki/wiki/entities/everything-claude-code|ECC]] 是最完整的选择。

#### 进阶使用：MCP 生态系统

> ⚠️ 不装 MCP 的 Claude Code 只发挥了约三成功力。

安装方式：
```bash
claude mcp add <名称> -- <启动命令>
# 示例：安装 Playwright
claude mcp add playwright -- npx @playwright/mcp@latest
claude mcp list  # 查看已安装
```

**10 大必装 MCP**：

| MCP | 功能 | 一句话 |
|---|---|---|
| **Playwright** | 自动操作浏览器 | 浏览器里能手动做的事，AI 都能帮你自动做 |
| **Desktop Commander** | 终端命令/进程管理/文件搜索 | 让 AI 像人一样操作整台电脑 |
| **GitHub** | PR/Issue/代码审查 | 代码仓库全流程管理 |
| **Context7** | 最新框架文档注入 | 解决 AI 输出过时 API 的问题 |
| **Firecrawl** | 网页内容抓取 | 批量网页数据采集 |
| **Fetch** | 轻量 URL 读取 | 简单 HTTP 请求 |
| **PostgreSQL/SQLite** | 数据库直接操作 | 自然语言查询数据 |
| **Sequential Thinking** | 分步推理 | 复杂问题结构化思考 |
| **飞书 MCP** | 飞书文档/多维表格 | 企业协作集成 |
| **Excel MCP** | Excel 读写/公式/汇总 | 办公表格处理 |

**按角色推荐安装组合**：
| 角色 | 推荐组合 |
|---|---|
| **前端** | Filesystem + Git + Figma + UI UX Pro Max |
| **后端** | Git + Prisma + FastAPI-MCP + SecureCode |
| **数据分析** | Context7 + mcp-run-python + 数据库MCP |
| **全栈** | Filesystem + Git + Pipedream + Claude Mem |
| **新手起步** | Filesystem + Git + GitHub |

**避坑指南**：
1. 不要一次性装几十个：按项目选 2-4 个核心 MCP
2. 使用项目级配置 `.mcp.json` 而非全局配置
3. 先装 Playwright——最能直观感受 MCP 价值的入口

#### 高阶进阶指令

| 命令 | 作用 |
|---|---|
| `/btw` (By the way) | 不中断主任务快速提问，不污染对话历史 |
| `/fast` | 极速模式，简化回复 |
| `/plan` | 只读规划模式 |
| `/todos` | 跨会话任务管理 |
| `/simplify` | 2026 全新代码评审（时代评审） |
| `/batch` | 大规模拆分改造 |
| `/loop` | 持续观察/轮询 |

#### 相关资源

- 技能生态：github.com/anthropics/skills、skillsmp.com、skillhub.cn
- MCP 生态：github.com/modelcontextprotocol/servers
- 社区教程：Claude Code 保姆级完整教程（知识库中有 10+ 篇深度文章）


---

### 2.3 Cursor

#### 介绍

Cursor 是 Anysphere 开发的 AI 原生 IDE（基于 VS Code），2026 年估值 290 亿美元，被 19% 的开发者选为最爱。官网：cursor.com

**定位**：全能均衡型 AI IDE，适合从 VS Code 迁移的日常全能开发者。

#### 安装

1. 访问 **cursor.com** 下载安装包
2. 安装后首次启动可选择从 VS Code 导入配置
3. 注册/登录 Cursor 账号
4. 选择订阅计划（Free / Pro $20 / Business $40）

#### 基本使用

| 功能 | 快捷键 | 说明 |
|---|---|---|
| **Tab 补全** | `Tab` | <100ms 延迟，多行代码预测 |
| **Cmd+K** | `Cmd/Ctrl + K` | 选中代码，自然语言修改 |
| **Composer** | `Cmd/Ctrl + I` | 跨文件编辑 Agent |
| **Chat** | `Cmd/Ctrl + L` | 侧边栏 AI 对话 |
| **@ 引用** | `@` | 引用文件/文件夹/文档 |

**@ 引用技巧**：
```
@file       引用单个文件
@folder     引用整个文件夹
@web        引用网页内容
@docs       引用官方文档
@codebase   引用整个代码库
```

#### 进阶使用

**Background Agents（Cursor 3）**：
```
启动 Agent 任务 → Agent 在云端运行，不阻塞 IDE → 完成后通知你 Review 结果
```

**多模型配置**（Settings → Models）：Claude 系列、GPT-4o/GPT-5、Gemini 2.5、自定义 API endpoint

**.cursorrules 项目规则**：
```markdown
# .cursorrules
你是一个 TypeScript 全栈开发者。
技术栈：Next.js 14 + Prisma + Tailwind CSS
编码规范：
- 所有函数必须有类型注解
- 组件使用 Server Components 优先
```

#### 插件与扩展

Cursor 完全兼容 VS Code 插件生态。推荐：GitLens、Prettier、Tailwind CSS IntelliSense、Error Lens、Thunder Client

---

### 2.4 Trae

#### 介绍

Trae 是字节跳动推出的 AI 原生 IDE，**永久免费**，2026 年中国市场份额 41.2%。内置豆包、DeepSeek、GLM、Qwen 等顶级模型，中文理解准确率 98%。

官网：trae.cn（国内）/ trae.ai（国际）

**定位**：国内开发者首选，永久免费，中文优化。

#### 安装

1. 访问 **https://www.trae.cn**（认准 `.cn` 域名）
2. 点击「下载 IDE」，约 100MB
3. 用**手机号**或**稀土掘金账号**登录
4. 可选：从 VS Code / Cursor 导入配置

#### 基本使用：四种开发模式

| 模式 | 快捷键 | 适用场景 |
|---|---|---|
| **Chat** | `Cmd/Ctrl + L` | 代码解释、Bug 排查、技术咨询 |
| **Builder** | `Cmd/Ctrl + B` | 快速搭建 CRUD、数据看板 |
| **SOLO** | `Cmd/Ctrl + I` | 一句话生成完整项目 |
| **IDE** | 默认 | 传统编码 + AI 补全 |

**CUE 智能补全**：代码补全、多行修改、智能导入、智能重命名

#### 进阶使用

**MCP Server 配置**（`.trae/mcp.json`）：
```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

**火山引擎 Coding Plan**：注册火山引擎 → 开通 Coding Plan → 在 Trae 设置中配置 API Key，可接入更多商业模型。

**规则配置**（`.trae/rules.md`）：定义项目规则、技术栈规范。

#### Trae vs Cursor 快速对比

| 维度 | Trae | Cursor |
|---|---|---|
| 定价 | **免费** | $20-200/月 |
| 中文 | **98%** | 75% |
| 国内速度 | **极速** | 一般 |
| 国际化 | 弱 | 强 |

---

### 2.5 Codex

#### 介绍

Codex 是 OpenAI 推出的 **统一 AI Agent 操作平台**，2026 年已从「云端编程助手」演化为集编程、浏览器操作、电脑自动化、AI 生图于一体的超级应用。与 Claude Code 并称 AI 编程双强，token 效率约为 Claude Code 的 4 倍。

**四大产品形态**（共享同一套配置）：Codex App（桌面图形界面）⭐推荐 / CLI / IDE Extension / Cloud（Web）

> 气质差异：Claude Code = 边干边商量的协作者；Codex = 「别打扰我，干完给你看」的执行型工程师。

#### 安装与配置

详见完整教程 [[Wiki/wiki/topics/codex-guide|Codex 完整指南]] 和 [[Wiki/wiki/entities/codex|Codex 实体页]]。

**App 安装**：访问 codex 官网下载 → ChatGPT 账户登录 → 设置沙盒（首次关键步骤）

**CLI 安装**：
```bash
npm i -g @openai/codex    # 或 brew install --cask codex
codex                     # 启动并登录
codex exec "任务" --json  # 非交互模式
```

**DeepSeek 接入**：通过 mimo2codex + CC Switch 本地转发方案 → [[Wiki/wiki/topics/codex-deepseek-integration|详细教程]]

#### 核心工作流

- **Plan 模式**（强烈推荐）：先出计划确认再执行
- **Steering**：中途偏了立即纠正（Ctrl+Enter）
- **AGENTS.md**：项目持久说明书，**写测试命令后 Codex 自动跑测试才交活**——最大分水岭
- **TDD 闭环**：先写测试→确认失败→写实现→不许改测试（给 Agent 装缰绳）
- **Fork Chat + Git 回退**：对话历史 + 代码双重撤销
- **Automation**：任意 chat 一键转定时任务（Skill+Automation=个人 RPA）

#### 适用场景

| ✅ 适合 | ❌ 不适合 |
|---|---|
| 全栈项目从零搭建（iOS + Web + DB + 部署） | 从零设计复杂架构（用 Claude Code） |
| 代码审查 / Debug（token 效率 4 倍优势） | 需要精细业务逻辑决策 |
| 批量迁移 / 重构 | 安全关键代码（需严格人工审查） |
| 定时自动化 / 云端过夜任务 | |
| 非编程任务（生图/PPT/视频/操控浏览器） | |

---

### 2.6 GitHub Copilot

**定位**：性价比之王，470 万付费用户，42% 市场份额。

适合预算有限的个人开发者、不想改变编码习惯的保守型团队。核心优势是不改变工作流（IDE 插件形态），短板是 Agent 能力弱、创新迭代慢。

---


---

## 第三部分：Agent 框架

### 3.1 OpenClaw

#### 介绍

OpenClaw（原名 Clawdbot / Moltbot）是一个开源的**个人 AI Agent**，GitHub 24.7 万+ Stars。它运行在你的电脑上，7×24 小时在线，通过 WhatsApp、Telegram、Discord、飞书等消息平台与你交互，能自主读写文件、执行命令、浏览网页。

官网：openclaw.ai

**一句话**：不是 ChatBot——是 AI 员工。你可以像给同事发微信一样给它派任务。

#### 安装

**系统要求**：macOS 12+ / Ubuntu 20.04+ / Debian 11+ / Windows（WSL2）、Node.js v22+、内存最低 2GB

```bash
# 官方一键安装（推荐）
curl -fsSL https://openclaw.ai/install.sh | bash

# 或 npm 安装
npm install -g openclaw@latest

# Docker 部署
docker pull openclaw/openclaw:latest
docker run -d --name openclaw --restart unless-stopped \
  -v ~/.openclaw:/data -p 3000:3000 \
  openclaw/openclaw:latest
```

#### 初始化配置

```bash
openclaw onboard   # 进入配置向导
```

**选择 AI 模型 Provider**：Anthropic（Claude）、OpenAI（GPT）、DeepSeek（性价比高）、阿里云百炼（免费额度）、MiniMax、Ollama（本地零成本）

**配置消息平台**：
```bash
openclaw config set channels.telegram.botToken "你的Bot Token"
openclaw config set channels.feishu.appId "cli_xxxxx"
openclaw config set channels.feishu.appSecret "your_secret"
openclaw config set channels.feishu.enabled true
```

#### 日常使用

```bash
openclaw gateway start    # 启动 Gateway
openclaw gateway status   # 查看状态
openclaw gateway stop     # 停止
openclaw logs --follow    # 查看日志
openclaw doctor           # 健康检查
```

**通过消息平台交互**：配置完成后，直接在 WhatsApp/Telegram/Discord 上与 OpenClaw 对话派任务：
- "帮我把今天的重要邮件整理成摘要"
- "给我写一个 Python 脚本，每天备份数据库"
- "github.com/xxx 这个项目分析一下"

#### Skills 技能安装

```bash
clawhub search "财经分析"     # 搜索 Skill
clawhub install skill-name    # 安装
openclaw skills list          # 查看已安装
```

**推荐 Skills**：skill-vetter（安全扫描）、boot-md（启动上下文注入）、command-logger（操作日志）、session-memory（跨会话持久记忆）。如果你想一步到位，[[Wiki/wiki/entities/everything-claude-code|ECC]] 提供了最完整的 Skill 和 Agent 集合

#### 安全建议

1. 不要暴露公网，使用 VPN / IP 白名单
2. 仅安装可信 Skill，优先用 skill-vetter 扫描
3. 推荐 Docker 隔离运行
4. API Key 不要硬编码，用环境变量

---

### 3.2 Hermes Agent

#### 介绍

Hermes Agent 是 Nous Research 开发的开源 AI Agent（MIT 许可证），GitHub 137K+ Stars。中文社区常称「爱马仕」（Hermès 谐音梗）。

**核心特点**：
- 🧬 **自学习循环**：自动从成功操作中提炼 Skill，越用越聪明
- 🧠 **跨会话持久记忆**（三层：会话/持久/Skill）
- 🌐 **20 个消息平台**（微信、飞书、Telegram、Discord、QQBot 等）
- 🔌 **模型无关**：支持 22+ LLM 提供商
- 🛠️ **40+ 内置工具**
- 🏗️ **多 Agent Kanban**：Orchestrator/Dispatcher/Worker/Board
- 📱 **安卓 Termux 支持**，手机上直接跑
- 🎯 **`/goal` 跨轮目标追踪**：不用重复提醒，Agent 记住目标持续推进

**一句话**：不是 ChatBot，是一个能从经验中学、越用越强的 AI 代理。

#### 安装

**系统要求**：Linux / macOS / WSL2、Python 3.10+、内存 4GB+

```bash
# 一键安装（推荐）
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
source ~/.bashrc
hermes --version

# Docker 部署
docker pull nousresearch/hermes-agent:latest
mkdir -p ~/.hermes
docker run -it --rm -v ~/.hermes:/opt/data nousresearch/hermes-agent setup
docker run -d --name hermes --restart unless-stopped \
  -p 8000:8000 -v ~/.hermes:/opt/data \
  nousresearch/hermes-agent gateway run
```

#### 配置

```bash
hermes setup           # 完整配置向导
hermes model           # 选择模型
hermes tools           # 配置工具
hermes gateway setup   # 配置消息平台
```

**配置文件结构**：
| 路径 | 用途 |
|---|---|
| `~/.hermes/config.yaml` | 主配置 |
| `~/.hermes/.env` | API 密钥（权限 0600） |
| `~/.hermes/skills/` | 已安装技能库 |
| `~/.hermes/sessions/` | 会话数据 |

**LLM 提供商**：OpenRouter（聚合 200+ 模型，国内首选）、Anthropic、OpenAI、火山方舟 Coding Plan、Ollama（本地零成本）、DeepSeek

#### 日常使用

```bash
hermes doctor           # 系统诊断
hermes                  # 启动交互式对话
hermes gateway start    # 启动网关服务（连接消息平台）
hermes update           # 更新
hermes skills list      # 查看已学习的 Skill
hermes skills show <skill-name>
```

#### 自进化系统（核心差异）

Hermes Agent 区别于其他工具的核心能力：

```
用户任务 → Agent 执行 → 成功完成
  ↓
自动分析：用了什么工具？什么流程？
  ↓
提炼为 Skill：存储到 ~/.hermes/skills/
  ↓
下次类似任务 → 自动调用 Skill → 更快完成
```

#### 装完后第一件事：SOUL.md 与 AGENTS.md

| 文件 | 主要作用 | 放在哪里 |
|------|---------|---------|
| `SOUL.md` | 全局身份、语气、协作方式 | `~/.hermes/SOUL.md` |
| `AGENTS.md` | 项目规则、命令、目录、注意事项 | 项目根目录 |

使用顺序：先改 SOUL.md 定性格 → 在每个重要项目根目录放 AGENTS.md 定规矩 → 在项目根目录启动 Hermes

#### Hermes Workspace：六面板 Web 控制中心

| 面板 | 功能 |
|------|------|
| **Chat** | 多模型聊天，同对话切换模型不丢上下文 |
| **Memory** | 浏览、搜索、编辑三层记忆系统 |
| **Skills** | 100+ 技能在线管理 |
| **Terminal** | 内置终端 |
| **Tools** | 实时查看代理调用的工具，可批准/中止 |
| **Conductor** | 任务编排器，并行生成子代理 |

```bash
git clone https://github.com/outsourc-e/hermes-workspace.git
cd hermes-workspace && pnpm install
# 终端 1：hermes gateway run
# 终端 2：pnpm dev → 浏览器打开 http://localhost:3000
```

#### 多 Agent Profile

```bash
hermes profile create "coder" --clone      # 创建编码助手
hermes profile create "research" --clone   # 创建研究 Agent
coder chat                                  # 直接用 Profile 名
hermes -p research chat                    # 或 -p 标志
```

典型分工：
- **default** — 项目经理/架构师：拆解任务、分派子 Agent
- **coder** — 编码专家：代码编写、调试、修复
- **research** — 研究助手：文献检索、知识整理

---

### 3.3 OpenClaw vs Hermes 深度对比

两个 Agent 框架回答的根本问题不同：

| 维度 | Hermes Agent | OpenClaw |
|------|-------------|----------|
| **核心问题** | Agent 怎么才能越来越强？ | 怎么让 Agent 安全可靠地执行任务？ |
| **设计哲学** | 成长优先（自进化） | 安全优先（默认安全） |
| **语言** | Python + Rust CLI | Node.js / TypeScript |
| **Stars** | 13.7 万 | 24.7 万 |
| **技能/插件** | Agent 自己创建 Markdown 技能 | Plugin SDK，manifest-first |
| **记忆系统** | 三层：内置 + 外部 Provider + 会话搜索 | 单插件槽位，可替换 |
| **安全模型** | 智能审批（辅助模型判断风险） | 10+ 安全模块，默认安全 |
| **执行环境** | 6 种后端（含无服务器） | 3 种后端（偏安全沙箱） |
| **国内平台** | 飞书/钉钉/企业微信/微信 原生支持 | 飞书/QQ 扩展支持 |
| **研究能力** | 内置 RL 训练工具链 | 纯产品，无训练能力 |
| **安装复杂度** | 中等 | 低 |
| **适合** | 深度 AI 用户、追求自进化 | 轻量入门、首次尝试 Agent |

**选择建议**：
```
安全合规是硬要求 → 选 OpenClaw
想让 Agent 自己学习改进 → 选 Hermes
消息平台要覆盖最广 → OpenClaw 支持 25+ 渠道
主力用飞书/钉钉/企业微信 → Hermes 三者原生支持
TypeScript 技术栈 → OpenClaw，Python → Hermes
企业环境/安全合规 → OpenClaw 更让人放心
快速探索/个人使用 → Hermes 更灵活、更"聪明"
```

**一句话总结**：Hermes 非常迎合小白用户（灵活、自进化、多平台），OpenClaw 想做生产级平台（安全、稳定、可扩展）——但现阶段 Agent 整体还不成熟，两者都偏探索性质。


---

## 第四部分：拓展使用

### 4.1 Obsidian + AI 知识库工作流

**核心认知**：知识库最大的浪费不是「不够大」，而是「存了不用」。

#### 核心方案

Obsidian 做存储底座，AI Agent（Claude Code / Hermes）做执行层。让知识库从「仓库」变成「生产线」：

```
资料进来 → 判断价值 → 拆成选题 → 生成草稿 → 发布归档
```

#### 目录设计：给 Agent 认路的

```
📁 01-Sources     ← 外部资料入库
📁 02-Accounts    ← 各账号的内容资产
    └─ 超级猛
       ├─ Topics    ← 选题池
       ├─ Drafts    ← 草稿区
       └─ Published ← 发布归档
📁 03-Frameworks  ← 内容框架、写作规范、账号定位
```

最小流转链路：
```
Source Note → Topic Note → Draft Note → Published Note
```

只要这条线跑顺了，知识库就已经从「仓库」变成了「生产线」。

#### 实操流程

**第一步：入库判断**——让 AI 帮你做初筛
> 判断一篇内容是否值得收入。如果值得，生成 Source Note（核心摘要、关键观点、适合账号、可延展选题、建议目录和文件名）

**第二步：拆选题**——锚住「我要写什么」
> 基于 Source Note 拆 3 个选题（一句话定义、目标读者、用户痛点、核心承诺、标题候选、简短提纲）

选题四标准：有明确用户痛点、有真实案例、能讲成可复现工作流、能给出可操作方法

**第三步：生成草稿**（别让 AI 直接定稿）
> ⚠️ 坑：AI 工具文容易写成「某工具是什么、有什么功能、有什么优势」的产品介绍。真正有用的写法是从具体问题切入：「为什么需要它？之前卡在哪？接进来之后哪一步变了？」

AI 产出只当初稿，人工过两轮：
- 第一轮：删掉正确但没信息量的话
- 第二轮：补上真实判断和使用细节

**第四步：把固定流程写成 Skill**
将稳定流程沉淀为 Skill：Source Note 生成规范、Topic Note 字段模板、账号定位/选题偏好/表达风格、公众号 vs 小红书的差异化要求

**第五步：发布后归档形成反馈闭环**
```
Source → Topic → Draft → Published → Review → New Topic
```
这才叫「内容中台」——不是一个资料库，是一个能持续产生判断的系统。

#### Obsidian 推荐工具组合

| 工具 | 用途 |
|---|---|
| Obsidian | 本地 Markdown 知识库底座 |
| Claude Code | 内容加工、批量处理、知识库分析 |
| Hermes Agent | 跨平台内容助手（微信/飞书即时交互） |
| Obsidian Git 插件 | 版本控制 + 多端同步 |
| Dataview 插件 | 动态查询知识库内容 |
| Obsidian Web Clipper | 网页内容一键剪藏入库 |

**推荐搭配阅读**：知识库中有 20+ 篇 Obsidian 深度教程，涵盖从入门到 AI 化管理的全流程。

---

### 4.2 Superpowers + gstack 进阶开发闭环

> ℹ️ Superpowers 是一个跨平台方法论框架（支持 Claude Code / Codex / Cursor / Gemini CLI / OpenCode / Copilot CLI / Factory Droid 等 8 个平台）。本教程以 Claude Code + gstack 为主线展示最完整的开发闭环。更多设计哲学见 [[Wiki/wiki/concepts/superpowers-design-philosophy|Superpowers 设计哲学]]。

#### 核心理念：大脑 + 手脚

```
Superpowers（大脑）        gstack（手脚）
├── brainstorming          ├── /browse（浏览器验证）
├── writing-plans          ├── /qa（端到端测试）
├── executing-plans        ├── /ship（发布流水线）
├── TDD                    ├── /land-and-deploy（部署）
├── systematic-debugging   ├── /canary（上线监控）
├── code-review            ├── /retro（周回顾）
└── verification           └── /careful + /freeze（安全护栏）
```

#### 完整开发闭环

```
想法 → brainstorming → writing-plans
  → /plan-eng-review（多视角审查）
  → using-git-worktrees（隔离工作环境）
  → executing-plans + TDD
  → /browse 或 /qa（真实环境验证）
  → verification-before-completion
  → requesting-code-review（独立 reviewer）
  → finishing-a-development-branch
  → /ship（发布）→ /land-and-deploy（部署）
  → /canary（上线监控 30 分钟）
  → 完成
```

#### 五条铁律

1. **浏览器只走 `/browse`**：禁用底层 MCP 浏览器原语
2. **作者不能审自己的代码**：AI 写完代码后在同一上下文自审只会找无关痛痒的瑕疵
3. **没证据不算完成**：测试报告 + 截图 + QA 报告，三缺一不算
4. **歧义先 brainstorm**：5 分钟头脑风暴能省 5 小时返工
5. **危险命令先 `/careful`**：rm -rf / DROP TABLE / force-push 一律先走护栏

#### 任务分流策略

| 任务类型 | 流程深度 | 示例 |
|---|---|---|
| **轻量** | 直接实现 + 定向验证 | 改 typo、修单文件 bug、配置调整 |
| **中等** | 简短 brainstorm + 短 writing-plans + 验证 | 多文件新功能、边界清晰的重构 |
| **大型** | 完整闭环 | 跨模块架构变更、新公共 API |

---

### 4.3 Everything Claude Code + 其他拓展工具与场景

> 🆕 **新增**：[[Wiki/wiki/entities/everything-claude-code|Everything Claude Code (ECC)]]（180K+ Stars）是目前最完整的一站式 Harness 优化系统——60 个 Agent + 228 个 Skill + Hook 自动化 + 持续学习 + 安全扫描，详见 [[Wiki/wiki/topics/ecc-complete-guide|ECC 完整指南]] 和本节的 ECC 专题。

#### Figma → 代码

Claude Code 通过 Figma MCP 实现设计稿秒变代码：
- 连接 Figma 文件 → AI 读取设计稿 → 生成前端代码
- 配合 FigJam 快速生成可修改的流程图

#### Playwright MCP：不只是写代码，还能验

```
读代码 → 修改 → 启动本地服务 → 打开页面
  → 操作页面 → 根据结果再修 → 输出验证报告
```

适用：表单验证、登录/注册流程、管理后台按钮操作、页面跳转检查、可访问性检查

#### Claude HUD

让 Claude Code 状态一目了然的可视化面板，实时查看 Agent 在做什么。

#### Repomix

打包整个仓库为一个文件，让 Claude 一次性读懂项目全貌，大幅提升上下文利用效率。

---

## 推荐学习路线图

```
第1天：读 AI Coding 发展史 + 核心概念
  ↓
第2天：选一个主力工具，完成安装和第一个项目
  ↓
第3-5天：深入主力工具的进阶功能（MCP/Skills/工作流）
  ↓
第6-7天：了解其他工具，形成组合使用策略
  ↓
持续：跟踪更新，实践 Superpowers/gstack 等进阶方法论
```

### 按角色推荐学习路径

**国内初学者（预算为零）**：
```
Trae（安装→四种模式→MCP 配置）→ 核心概念学习 → Claude Code（进阶）
```

**海外/英语开发者**：
```
Cursor（安装→Tab/Cmd+K/Composer）→ Claude Code（MCP+Skills）→ Agent 框架
```

**架构师/技术负责人**：
```
Claude Code（四层体系）→ MCP 生态 → Superpowers+gstack → Agentic Engineering
```

**内容创作者**：
```
Obsidian 基础 → Claude Code + Obsidian 工作流 → Hermes Agent 内容中台
```

### 学习建议

1. **不要贪多**：先选一个主力工具（国内推荐 Trae，海外推荐 Cursor/Claude Code），精通后再扩展
2. **实践驱动**：每个工具学习后立即用它做一个真实项目
3. **理解原理**：工具会变，但 MCP/Skills/Agent 的核心概念是通用的
4. **保持跟进**：AI Coding 领域每月有新变化，定期查看知识库更新
5. **先跑通最小闭环**：安装 → 第一个项目 → 加入规则文件 → 配置模型 → 逐步添加增强工具

---

> 📚 本学习计划基于 [[Wiki/llm-wiki|LLM Wiki]] 知识库整理。知识库中包含 50+ 篇深度文章，覆盖 Claude Code、Cursor、Trae、Codex、OpenClaw、Hermes、Obsidian 等主题，欢迎深入阅读。
> 
> 🔗 推荐进一步阅读：[[Wiki/wiki/topics/ai-coding-history|AI Coding 发展史]] · [[Wiki/wiki/topics/ai-coding-concepts|核心概念]] · [[Wiki/wiki/topics/ai-coding-tools-comparison|工具全景对比]] · [[Wiki/wiki/topics/claude-code-installation|Claude Code 安装配置]] · [[Wiki/wiki/topics/claude-code-mcp-ecosystem|MCP 生态系统]]

