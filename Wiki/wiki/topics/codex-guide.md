---
title: Codex 完整教程
type: topic
tags: [codex, openai, tutorial, sandbox, skills, mcp, automation, computer-use]
created: 2026-05-09
updated: 2026-05-28
sources:
  - raw/articles/Codex/Codex (APP) 保姆级全攻略，海量实战教程， 一文精通.md
  - raw/articles/Codex/1.1万字 Codex保姆级教程：小白从安装到跑通项目.md
  - raw/articles/Codex/OpenAI Codex 完全方法论：6 个阶段，从装上到吃透（长文 · 全是可抄的）.md
  - raw/articles/Codex/从0到1带你速通Codex，我整理的终极保姆教程来了。.md
related:
  - entities/codex.md
  - topics/codex-deepseek-integration.md
  - topics/ai-coding-tools-comparison.md
  - entities/claude-code.md
---

# Codex 完整教程

本教程覆盖 Codex 从安装到精通的全流程。Codex 已从「云端编程助手」演化为统一的 **AI Agent 操作平台**，四大产品形态（App/CLI/IDE/Cloud）共享同一套配置。

---

## 一、安装与首次启动

### 准备工作

1. **ChatGPT 账号**（Plus/Pro 或免费账户均可）
2. **稳定的网络**（需科学上网）
3. 推荐预装 **Git** + **Node.js** + **VSCode**

### App 安装（推荐新手）

访问 [Codex 官网](https://chatgpt.com/codex/)，下载对应系统安装包。Windows 和 Mac 均支持，Mac 额外支持 Computer Use。

安装后启动 → 选择 ChatGPT 账户登录 → 选择工作类型（编程/日常工作）→ **设置沙盒**（关键步骤）。

### CLI 安装（开发者推荐）

```bash
# npm 安装
npm i -g @openai/codex

# 或 Homebrew
brew install --cask codex

# 启动并登录
codex
```

### 首次启动建议

**不要上来就让 Codex 写代码。** 第一个任务让它「读和说」：

```
读一下这个项目的 README 和 package.json，
用三句话告诉我这个项目是干什么的、怎么跑起来。
先别改任何代码。
```

借此观察 Codex 如何探索项目，比直接让它写代码安全得多。

### 一键搬家：从 Claude Code 导入

Codex 支持从 Claude Code 和 Cowork 直接导入所有内容和配置，降低迁移成本。

---

## 二、界面详解（Codex App）

Codex App 采用经典**三栏布局**：

| 区域 | 功能 |
|------|------|
| **左侧栏** | 任务列表（按项目分组）、对话搜索（Ctrl+G）、插件入口、自动化入口 |
| **中间** | 对话窗口 + 权限控制 + 上下文指示器 + 模型选择 + 速度选项 |
| **右侧** | 多功能区（文件树/内置浏览器/代码变更/预览） |

### 任务状态标识
- 🔵 蓝色小点：任务执行完毕
- 🟢 绿色标签：等待批准
- 🔄 转圈图标：AI 正在工作

### Steer（引导）
当 AI 跑偏时，点击「引导」按钮（或 Ctrl+Enter），立即插入纠正指令，不等当前步骤结束。

---

## 三、项目与任务管理

### 项目 = 文件夹

每个项目对应电脑真实目录。Codex 在这个目录里读写文件，所有产物（代码、文档、图片）落在你的硬盘：
- 可用 Finder/资源管理器正常操作
- 跨 chat 通过 `@文件名` 引用
- 删除项目只从侧边栏移除，文件不丢

**建议按项目拆分目录，不要把所有任务塞进一个大杂烩文件夹。**

### 多任务并行

Codex 支持同时运行多个 chat，每个 chat 独立执行。核心技巧是 **序列化 prompt**：
1. 一次性给足上下文（避免来回打补丁）
2. 发出去后**信任 Agent** 独立完成 5-15 分钟工作
3. 转去发起下一个任务
4. 按蓝点提示回来 review

### Plan 模式

开启 Plan 模式后，Codex 先输出完整工作计划（常以问题卡片形式沟通），你确认后再执行。**所有复杂任务必须先开 Plan 模式。**

### Fork Chat（分叉）

在历史消息处右键「派生到本地」，复制对话但不复制代码改动——类似 Git branch 应用到对话状态。可配合 Git 回退实现完全撤销。

---

## 四、沙箱与权限系统

Codex 的权限系统围绕**沙箱**展开，使用操作系统底层机制（macOS 用 Seatbelt Sandbox）实现硬性限制：

### 沙箱的两项默认硬限制

1. **不能修改沙箱外文件**（沙箱 = 你的项目文件夹）
2. **默认禁止联网**

需要在沙箱外操作或联网时，触发 **Escalate（提权）**——需人工审核。

### 权限档位

**沙箱模式（管它能动什么）：**
- `read-only`：只能读，/tmp 都不能写 → 读代码、做规划
- `workspace-write`（默认）：读写项目目录 + 跑命令 → 日常开发
- `danger-full-access`：无边界 → 仅一次性容器

**审批策略（管它什么时候问）：**
- `untrusted`：啥都要问
- `on-request`：敏感操作才问（推荐）
- `never`：永远不问

**推荐配置：workspace-write + on-request + 自动审查。** 自动审查模式下，小模型预判风险，低风险自动放行，高风险才触发人工审核。

> `--full-auto` = `on-request` + `workspace-write`，但**默认不开网络**。

---

## 五、记忆系统：AGENTS.md

AGENTS.md 是项目的「持久说明书」，每次对话自动加载。最关键的一项：**写清测试命令**。

```markdown
# AGENTS.md

## 技术栈
- TypeScript + React，包管理用 pnpm

## 代码规范
- 禁止 any，禁止 console.log 进提交

## 怎么验证（Codex 完成任务前会自动跑）
- 单元测试：pnpm test
- 类型检查：pnpm typecheck
- 上面两个都绿，这个任务才算做完
```

写了测试命令后，Codex 交活之前会自己跑 `pnpm test` 和 `pnpm typecheck`，不绿自己接着改。**这是「用好 Codex」和「用 Codex」之间最大的那道分水岭。**

### 全局 AGENTS.md

通过设置 → 个性化 → 自定义指令编辑，对所有项目生效。推荐加入安全规则：

```
禁止批量删除文件或目录。
不要使用：del /s、rd /s、rmdir /s、Remove-Item -Recurse、rm -rf
需要删除文件时，只能一次删除一个明确路径的文件。
如果需要批量删除文件，应停止操作，让用户手动删除。
```

---

## 六、插件与 Skills

### 三层扩展体系

| 层级 | 说明 | 安装方式 |
|------|------|----------|
| **Plugin** | 第三方服务的能力扩展包 | 插件市场一键安装 |
| **Skill** | 用户可定义的可复用工作流（SKILL.md） | 官方市场 / GitHub 下载 / 自建 |
| **MCP** | 底层协议，外部服务标准化接入 | 设置 → MCP 服务器 |

### 安装第三方 Skill

1. GitHub 下载 skill 压缩包
2. 解压后放入项目 `.codex/skills/` 目录
3. 在对话中用 `/` 唤起 skill

### 自建 Skill（Skill Creator）

Codex 内置 **Skill Creator** 技能，用自然语言描述工作流即可自动生成 SKILL.md。示例：创建「视频字幕转 Markdown」skill——读取字幕→生成图文笔记→自动截图→替换占位符。

团队 Skill 可 commit 进仓库 `.agents/skills/`，新人 clone 即继承。

---

## 七、MCP 配置

入口：设置 → MCP 服务器

以 Supabase MCP 为例：
1. 在 Supabase 创建项目 → Connect → 选择 Codex MCP → 复制 URL
2. Codex 设置 → MCP → 流式 HTTP → 粘贴 URL → 保存
3. 终端运行 `codex mcp login supabase` → 授权 → **重启 Codex**
4. 对话中直接让 Codex 操作数据库

---

## 八、Automation（自动化）

任何 chat 可一键转为定时任务：

```
很好，你把以上的流程做成一个自动化，每周五下午 4 点执行。
```

支持配置：重复频率（每周/每天/每小时）、执行模型（复杂任务用旗舰模型，简单任务用 mini 模型省额度）。

自动化执行后自动生成 `memory.md` 总结经验供下次使用。典型场景：
- 每周五汇总 GitHub star 数发邮件
- 每天下午 5 点汇总工作进度发给老板
- 每月最后一天生成频道分析报告

---

## 九、Computer Use（电脑自动化）

仅 Mac 支持（Windows 暂未开放），使用**虚拟鼠标后台运行**：

```
@computer-use 你打开聊天软件，找到老板，发送你好。
@computer-use 打开浏览器，看 GitHub 看板，汇总项目进度，英文简报发给老板。
```

可与 Automation 组合成每日定时工作流。**不是调 API，是真实操控桌面应用。**

---

## 十、Git 工作流

### 基础操作
- 「把项目初始化成 Git 工程，注意排除不需要的文件」
- 「帮我把代码推送到 GitHub」

### Worktree 并行开发
同一项目创建多个工作树分支，不同文件夹互不干扰，并行开发后合并回主干。适合多任务并行场景。

### Fork + 回滚
1. Fork Chat：在出问题之前的消息处右键「派生到本地」
2. Git 回退：复制目标 commit hash，让 Codex `git reset` 回去
3. == 对话历史 + 代码双重回滚

### IDE 联动
右上角一键在 VSCode / Cursor / Windsurf 等 IDE 中打开项目。

---

## 十一、云端运行环境

1. 确保代码已同步到 GitHub
2. 运行模式选择「Cloud」
3. 云端执行任务 → 自动创建 Pull Request
4. 本地 `git pull` 同步回来

适合「边界清楚、不需要盯」的活。可手机审批云端任务。

---

## 十二、AI 生图

Codex 内置 GPT-Image-2（当前最强生图模型）。在对话中可直接要求生成图片，AI 会自动将图片嵌入网页/文档中。可直接粘贴截图作为参考。

---

## 十三、最佳实践总结

### TDD 闭环（给自主 Agent 装缰绳）

1. 先让 Codex **写测试**，别写实现
2. 跑一遍，确认测试**全部失败**（证明测试有效）
3. 把这批失败测试 commit 存档
4. 再让 Codex 写实现：**实现到所有测试通过，不许改测试**

测试就是那根缰绳。它怎么折腾都行，只要测试全绿且测试没被改过——这活就可信。

### 工作节奏

```
写高质量 prompt（一次性给足上下文）
  → 发出去
  → 信任 Agent 完成 5-15 分钟工作
  → 转去下一个任务
  → 蓝点提示回来 review
```

### 模型选择

- **日常开发**：GPT-5.5（旗舰，默认推荐）
- **复杂任务**：选择高思考强度
- **简单自动化**：mini 模型省额度
- **急需加速**：快速模式（2 倍额度消耗）

### 安全底线

- 日常：workspace-write + on-request + 自动审查
- 读代码/做规划：切 read-only
- 全局 AGENTS.md 加批量删除禁令
- 绝不要轻易用 danger-full-access
