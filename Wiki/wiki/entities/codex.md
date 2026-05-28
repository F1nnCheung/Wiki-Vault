---
title: Codex (OpenAI)
type: entity
tags: [codex, openai, agent, ai-coding, sandbox, computer-use, automation]
created: 2026-05-09
updated: 2026-05-28
sources:
  - raw/articles/Codex/OpenAI Codex 完全方法论：6 个阶段，从装上到吃透（长文 · 全是可抄的）.md
  - raw/articles/Codex/OpenAI Codex 完整教程 2026：100 分钟，四个关键概念 + 六个实战项目.md
  - raw/articles/Codex/Codex (APP) 保姆级全攻略，海量实战教程， 一文精通.md
  - raw/articles/Codex/Codex 从入门到精通.md
  - raw/articles/Codex/Codex零基础保姆式安装教程.md
  - raw/articles/Codex/DeepSeek 模型接入 Codex（AI 编程助手）的超级详细保姆级安装部署教程.md
related:
  - topics/codex-guide.md
  - topics/codex-deepseek-integration.md
  - topics/ai-coding-tools-comparison.md
  - entities/claude-code.md
  - concepts/harness-engineering.md
  - concepts/skills-concept.md
---

# Codex (OpenAI)

OpenAI 推出的统一 AI Agent 操作平台，已从「云端编程助手」演化为集编程、浏览器操作、电脑自动化、定时任务、AI 生图于一体的通用型 **AI 超级应用**。2026 年与 Claude Code 并称 AI 编程双强，在 500+ 人开发者调查中 65% 日常更倾向使用 Codex——关键原因是 token 效率约为 Claude Code 的 4 倍。

> **气质差异**：Claude Code 像一个边干边跟你商量的协作者；Codex 像一个「别打扰我，干完给你看」的执行型工程师。

---

## 四大产品形态

2026 年的 Codex 是一套产品矩阵，**共享同一套配置**（`~/.codex/config.toml`），配一次四处通用：

| 形态 | 适用人群 | 特点 |
|------|----------|------|
| **Codex App** | 零基础、桌面用户 | 图形界面，功能最全，三栏布局（任务列表/对话/多功能区） |
| **Codex CLI** | 终端用户、开发者 | 命令行 agent，支持交互/非交互（`codex exec`）两种模式 |
| **IDE Extension** | VS Code / Cursor / Windsurf 用户 | 嵌入编辑器，在熟悉环境中使用 |
| **Cloud (Web)** | 进阶用户、团队 | 任务丢到 OpenAI 云端跑，干完直接开 PR，适合「过夜班」 |

---

## 模型体系

- **默认旗舰**：GPT-5.5，OpenAI 当前最强模型
- **专用调优**：GPT-5.2-Codex、GPT-5.3-Codex，专为编程场景调优（云端任务和代码审查默认使用 -Codex 系列）
- **AI 生图**：内置 GPT-Image-2，当前最强 AI 生图模型
- **快速模式**：提升 50% 推理速度，但消耗 2 倍套餐用量

---

## 沙箱安全系统

Codex 的权限控制全部围绕沙箱展开，使用操作系统底层能力（macOS 使用 Seatbelt Sandbox）实现硬性限制，**不是靠模型自觉**：

### 沙箱模式（Sandbox Mode）—— 管它能动什么

| 档位 | 能力 | 使用场景 |
|------|------|----------|
| **read-only** | 只能读，不能写任何文件（含 /tmp） | 读代码、做规划 |
| **workspace-write**（默认） | 读写项目目录内文件、跑本地命令 | 日常开发（推荐） |
| **danger-full-access** | 无任何边界，任意操作 | 仅一次性容器中可用 |

### 审批策略（Approval Policy）—— 管它什么时候问

| 档位 | 行为 |
|------|------|
| **untrusted** | 基本啥都要问 |
| **on-request** | AI 自己判断，敏感操作（联网、改工作区外文件）才提问 |
| **never** | 永远不问（危险） |

### 提权机制（Escalate）

- 沙箱有两项硬限制：不能修改沙箱外文件、默认禁止联网
- 需要突破限制时触发提权操作，需人工审核
- **自动审查模式**（推荐）：小模型自动对提权请求进行安全性审查，低风险直接放行，高风险才触发人工审核

> `--full-auto` = `--ask-for-approval on-request` + `--sandbox workspace-write`，但默认**不开网络**。

---

## 核心机制

### Project = 文件夹
每个项目对应电脑中的真实目录。产物（xlsx、md、png、代码）全部落在用户硬盘，删除项目只移除侧边栏条目，文件不丢。跨 chat 通过 `@文件名` 互相引用。

### Chats / Steering / Queueing
- **Chat**：每次独立任务
- **Queueing**：新输入排队等待当前任务完成
- **Steering（引导/Steer）**：中途即时插入指令纠正方向，不等当前任务结束——将人类与 Agent 的交互从同步对话改为 **异步纠偏**

### Plan 模式
开启后 Codex 不立即执行，先输出工作计划与用户确认（常用问题卡片形式），对齐后再干活。**所有复杂任务建议先开 Plan 模式。**

### Fork Chat
在某条消息处右键「派生到本地」，复制对话历史但不复制代码改动，等价于 Git branch 应用到对话状态——上下文不浪费，分叉不污染主线。

### 上下文压缩
上下文超限时自动压缩，也可手动 `/compact`。但通用经验是：**清空好于压缩**，每个任务完成后开新对话有助于 AI 集中注意力。

---

## 扩展能力体系

Codex 的能力扩展分为三层（由 Riley Brown 提出）：

| 层级 | 本质 | 例子 |
|------|------|------|
| **Plugin** | 官方/第三方预装能力扩展 | Figma、Gmail、GitHub、Google Calendar、Netlify、Remotion |
| **Skill** | 用户可定义的复用工作流配方（SKILL.md） | 视频字幕转 Markdown、YouTube Researcher、电子杂志 PPT |
| **MCP** | 底层协议层，外部服务标准化接入 | Supabase MCP、Paper MCP |

### Skills 的三种来源
1. **官方 Skills**：插件市场内置（如 Remotion Best Practice）
2. **第三方 Skills**：GitHub 下载，放入项目 `.codex/skills/` 目录
3. **自建 Skills**：通过内置 **Skill Creator** 技能，用自然语言描述工作流即可生成 SKILL.md

团队 Skill 可直接 commit 进仓库 `.agents/skills/` 目录，新人 clone 即继承。

> 关键洞察：当工具没有官方 Plugin 时，可让 Codex 自行读取 API 文档，生成 Skill 包装它—— **API 可达 + Agent 能写 = 你想要的工具就存在。** 这对轻量 SaaS 是降维打击。

---

## Computer Use（电脑自动化）

仅 Mac 支持，使用**虚拟鼠标后台运行**，不占用当前窗口：
- 操控聊天软件发消息
- 打开浏览器查看看板并汇总进度
- 操作 Figma 等桌面应用（**不是调 API，是真实操控应用**）

可与 Automation 组合：如「每天下午 5 点汇总 GitHub 看板进度，通过聊天软件发给老板」。

---

## Automation（自动化）

任何 chat 可一句话转为定时任务：「把以上做成自动化，每周五下午 4 点执行」。本质是 prompt + skill 组合保存为 cron：
- 支持每周/每天/每小时重复
- 可选择 mini 模型降低成本
- 执行后自动生成 `memory.md` 记录经验供下次使用

> **Skill + Automation = 个人级 RPA**，不再需要 Zapier。

---

## 记忆系统

### AGENTS.md（项目级 + 全局）
- **项目级**：项目根目录的 `AGENTS.md`，每次对话自动加载，定义技术栈、代码规范、**测试命令**（最重要）
- **全局级**：`~/.codex/AGENTS.md`（或通过设置→自定义指令编辑），对所有项目生效
- **关键用法**：在 AGENTS.md 中写明测试命令，Codex 完成任务前会**自动跑测试**，不绿不交活——这是「用好 Codex」的最大分水岭

### 自动记忆（实验性）
开启后 AI 从对话中提取记忆带入新对话，类似 ChatGPT 记忆机制。

---

## 云端运行环境

- 代码同步到 GitHub → 选择「Cloud 模式」→ 云端执行任务 → 自动创建 PR
- 适合「边界清楚、不需要盯」的活，下班丢给它，第二天看 PR
- 手机可打开 Codex Web 审批云端任务

---

## Git 深度集成

- **一键 Git 初始化**：自然语言让 Codex 创建 .gitignore 并 init
- **代码提交与推送**：对话方式完成所有 Git 操作
- **Worktree 并行开发**：同一项目创建多个工作树分支，不同文件夹互不干扰，并行开发后合并回主干
- **Fork + 回滚**：对话分叉 + Git 回退组合拳，从对话历史和代码层面完全撤销不需要的改动
- **IDE 联动**：一键在 VSCode/Cursor/Windsurf 等 IDE 中打开项目

---

## 与 Claude Code 详细对比

| 维度 | OpenAI Codex | Claude Code |
|------|-------------|-------------|
| **范式** | 自主 Agent，沙箱跑完给你看 | 交互 Copilot，边干边商量 |
| **气质** | 执行型工程师，只管干完 | 协作者，边干边对齐 |
| **代码质量** | 好，逻辑精确 | 盲评更干净、更地道 |
| **Token 效率** | 约 **4 倍优势**，省额度 | 推理深，但烧得快 |
| **SWE-bench Verified** | GPT-5.5 领先 **88.7%** | 87.6% |
| **SWE-bench Pro（更难）** | 58.6% | Opus 4.7 领先 **64.3%** |
| **最适合** | 边界清楚的活、review、debug、批量 | 从零想架构、初始功能、探索 |

### 高手玩法：混合使用

OpenAI 2026 年 3 月 30 日发布 `codex-plugin-cc`，在 Claude Code 中一条斜杠命令即可调 Codex 做代码审查。常见分工：
- **Claude Code** 做初始功能生成和架构决策（交互推理强、上下文深）
- **Codex** 做代码审查和 debug（逻辑精确、token 省）

> Codex 和 Claude Code 不是二选一的题，2026 年真正会用 AI 的人，手里两把都有，看活下菜。

---

## 六阶段方法论

莲花明（2026.05）提出的从装上到吃透的方法论：

1. **搞懂它是什么**：自主 Agent，不是聊天功能
2. **装上跑通**：先让它读和说（"读 README，三句话告诉我项目做什么"），别急着写
3. **划好笼子**：workspace-write + on-request 起步
4. **教它规矩**：config.toml + AGENTS.md（**尤其写测试命令**）
5. **装好缰绳**：TDD 闭环 + 子代理减负（先写测试→确认失败→写实现→不可改测试）
6. **规模化**：云端过夜班 + 混搭 Claude Code

---

## 定价与额度

- **Plus**：$20/月（基础额度，轻度使用）
- **Pro**：$100/月（更多额度）
- **Pro Max**：$200/月（高额度）
- 免费账户也可使用（额度低）
- 额度显示：5 小时限额 + 周限额，任一到达即暂停使用，到时间自动重置

---

## 适用场景

- ✅ 全栈项目从零搭建（Swift iOS App + React 网页 + 数据库 + 部署一条龙）
- ✅ 代码审查与 Debug（逻辑精确、token 省）
- ✅ 重复性任务自动化（定时报告、自动发帖）
- ✅ 非编程工作（生成文档/PPT/图片、操作浏览器、发邮件）
- ✅ 云端过夜任务（下班丢给它，第二天收 PR）
- ⚠️ 需要精细架构决策的复杂系统（建议用 Claude Code 做前期架构）
