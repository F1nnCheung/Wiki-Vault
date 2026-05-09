# AI Coding 学习计划：从入门到精通

> 基于知识库 [[Wiki/llm-wiki|LLM Wiki]] 整理，最后更新：2026-05-09

---

## 📋 目录

- [第一部分：AI Coding 简介](#第一部分ai-coding-简介)
  - [1.1 发展历程](#11-发展历程2024-2026)
  - [1.2 核心概念名词解释](#12-核心概念名词解释)
- [第二部分：主流 AI Coding 工具](#第二部分主流-ai-coding-工具)
  - [2.1 工具全景对比](#21-工具全景对比)
  - [2.2 Claude Code](#22-claude-code)
  - [2.3 Cursor](#23-cursor)
  - [2.4 Trae](#24-trae)
  - [2.5 Codex](#25-codex)
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
自动化脚本 4%：Codex
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

> 核心原则：Skill 不在多，在配合。十个打架的 Skill 不如两个清晰分工的 Skill。

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

Codex 是 OpenAI 推出的云端 AI 编程 Agent，集成于 ChatGPT。核心能力：「无人值守」编程——给它任务描述，从需求分析到部署完成全流程自动化。

入口：chatgpt.com → 切换到 Codex 模式

#### 安装与配置

Codex 是云端服务，无需本地安装：
1. 访问 **chatgpt.com**，登录 OpenAI 账号
2. 切换到 Codex 模式
3. 连接 GitHub 账号（授权仓库访问）

CLI 工具（可选）：
```bash
npm install -g @openai/codex
codex login
codex init
```

#### 基本使用

工作流：
```
描述任务 → Codex 分析仓库 → 制定计划（展示确认）
  → 执行（创建文件/修改代码/安装依赖）
  → 运行测试，修复错误 → 提交 PR
```

任务类型：新功能开发、重构（class→函数组件）、Bug 修复、代码迁移（JS→TS）、文档生成

**最佳实践**：
- 任务描述要具体（不要说"优化代码"，说"把 fetch 改成 axios，加上超时和重试"）
- 提供上下文，链接相关文件
- 分步执行，大任务拆成小步骤
- 始终 Review PR before merging

#### 进阶使用：Spec-Driven 开发

```markdown
# spec/auth.md
## POST /api/auth/login
- 参数：{ email: string, password: string }
- 返回：{ token: string, user: User }
- 错误：401（凭证无效）、429（频率限制）
```

引用 Spec：「根据 @spec/auth.md 的接口定义，实现 src/auth/ 模块」

#### 适用场景

| ✅ 适合 | ❌ 不适合 |
|---|---|
| 从零搭建新项目 | 与现有复杂项目深度集成 |
| 批量代码迁移/重构 | 需要精细业务逻辑 |
| 自动化脚本和工具 | 强依赖内部服务的系统 |
| 生成文档和测试 | 安全性要求极高的代码 |

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

**推荐 Skills**：skill-vetter（安全扫描）、boot-md（启动上下文注入）、command-logger（操作日志）、session-memory（跨会话持久记忆）

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

