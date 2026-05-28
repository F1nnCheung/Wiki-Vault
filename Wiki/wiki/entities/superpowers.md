---
title: Superpowers
type: entity
tags: [superpowers, skill, workflow, methodology, cross-platform]
created: 2026-05-09
updated: 2026-05-11
sources:
  - raw/articles/Claude Code/用了 Superpowers，我的 Claude Code 返工少了九成.md
  - raw/articles/Claude Code/实战篇 Claude Code + superpowers + gstack 开发流程实录，可直接复制使用，一篇文章讲清楚！.md
  - raw/articles/Claude Code/Claude Code + MiniMax 2.7 + Superpowers：我是怎么真正交付一套生产系统的.md
  - raw/articles/Superpowers 深度实战指南：从入门到精通.md
related:
  - topics/claude-code-superpowers-workflow.md
  - topics/superpowers-plugin-system.md
  - concepts/superpowers-design-philosophy.md
  - entities/gstack.md
  - entities/claude-code.md
  - topics/claude-code-skills-ecosystem.md
---

# Superpowers

Superpowers 是一个为 AI 编程代理设计的**跨平台软件开发方法论框架**，覆盖 Claude Code、Codex CLI、Codex App、Cursor、Gemini CLI、OpenCode、GitHub Copilot CLI、Factory Droid 共 8 个平台。它通过 **14 个强制流程 Skill** 将软件工程最佳实践编码为 AI 自动遵循的工作流程，核心哲学是"代理不需要被建议，而需要被强制"。

维护者：obra | GitHub: github.com/obra/superpowers

## 核心理念

> 代理不需要"被建议"怎么做，而是需要"被强制"怎么做。

Superpowers 通过 `HARD-GATE`（硬门控）、铁律（Iron Law）、红旗表（Red Flags）等机制，将最佳实践从"建议"升级为"铁律"——违反文字就是违反精神，切断一切 "我遵循精神而非文字" 的合理化借口。

虽然各平台引导方式不同（hook、插件 transform、context file），但核心理念统一：所有平台共享 `using-superpowers` 作为唯一行为入口。

## 架构全景

### 目录结构

```
superpowers/
├── hooks/                 # 会话启动钩子
│   ├── hooks.json         # Claude Code 钩子配置
│   ├── hooks-cursor.json  # Cursor 钩子配置
│   ├── session-start      # 核心启动脚本（Bash）
│   └── run-hook.cmd       # 跨平台包装器（Windows 兼容）
├── skills/                # 技能库（核心资产）
│   ├── brainstorming/
│   ├── dispatching-parallel-agents/
│   ├── executing-plans/
│   ├── finishing-a-development-branch/
│   ├── receiving-code-review/
│   ├── requesting-code-review/
│   ├── subagent-driven-development/
│   ├── systematic-debugging/
│   ├── test-driven-development/
│   ├── using-git-worktrees/
│   ├── using-superpowers/       # 入口技能（引导文档）
│   ├── verification-before-completion/
│   ├── writing-plans/
│   └── writing-skills/
├── scripts/               # 工具脚本（版本管理等）
├── docs/                  # 文档
├── CLAUDE.md              # Claude Code 项目指令
├── GEMINI.md              # Gemini CLI 项目指令
└── AGENTS.md              # 通用代理指令
```

`skills/` 是本仓库真正的主体——一条完整开发流水线的拆分版：从接到任务、讨论设计、写计划、实现、调试、验证，到最后收尾，每个阶段都有对应的技能在管。

### 技能体系速览

| 阶段 | 技能 | 职责 |
|------|------|------|
| **入口与调度** | `using-superpowers` | 总规则："先检查技能再做事" |
| | `dispatching-parallel-agents` | 多代理并行调度 |
| | `subagent-driven-development` | 子代理驱动开发 |
| **前期设计** | `brainstorming` | 压住"先写再说"的冲动，先澄清需求 |
| **实现规划** | `writing-plans` | 需求拆成可执行、可验证的小任务 |
| **开发执行** | `executing-plans` | 单线程会话中串行落地任务 |
| | `test-driven-development` | 强制先写失败测试再写代码 |
| | `systematic-debugging` | 四阶段系统化调试 |
| | `verification-before-completion` | 交付前强制运行新鲜验证 |
| | `using-git-worktrees` | 隔离工作环境 |
| **交付收尾** | `requesting-code-review` / `receiving-code-review` | 代码审查的双向规范 |
| | `finishing-a-development-branch` | 分支收尾与清理 |
| **工具** | `writing-skills` | 教你写自定义技能（技能创建方法论） |

## 工作原理：三种 Bootstrap 路径

Superpowers 统一的流程是：**会话启动/插件加载 → bootstrap 上下文注入 → 技能发现与按需加载 → 技能自动触发**。但不同平台的具体接入方式不同：

### 路径 A：Hook 驱动（Claude Code / Cursor / GitHub Copilot CLI）

由 `hooks/session-start` 脚本驱动。`hooks/hooks.json`（Claude Code 的 `SessionStart`）或 `hooks/hooks-cursor.json`（Cursor 的 `sessionStart`）在会话启动时触发脚本，脚本读取 `skills/using-superpowers/SKILL.md`，转义为 JSON 字符串后嵌入上下文：

```
<EXTREMELY_IMPORTANT>
You have superpowers.
[using-superpowers 技能正文 + 平台说明/警告]
</EXTREMELY_IMPORTANT>
```

然后根据平台输出不同的 JSON 格式字段（`additionalContext` 或 `hookSpecificOutput`）。

### 路径 B：插件 Transform（OpenCode）

OpenCode 不走 hook，而是用 `.opencode/plugins/superpowers.js`：
- 通过 `config` hook 把 `skills/` 目录注册到 OpenCode 的技能搜索路径
- 通过 `experimental.chat.messages.transform` 把 bootstrap 文本注入到会话第一条用户消息前面

### 路径 C：上下文文件引用（Gemini CLI）

由 `gemini-extension.json` 指定 `contextFileName: "GEMINI.md"`，`GEMINI.md` 再显式引用：
- `@./skills/using-superpowers/SKILL.md`
- `@./skills/using-superpowers/references/gemini-tools.md`

**结论**：`using-superpowers` 是所有平台共享的行为入口；hook、插件 transform、context file 只是不同 harness 的装配层。

## 安装与配置

### Claude Code

```bash
# 方式一：官方市场
/plugin install superpowers@claude-plugins-official

# 方式二：Superpowers 市场
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

### Codex CLI / Codex App

```bash
/plugins
# 搜索 "superpowers" → Install Plugin
```

Codex App 与 CLI 复用同一个 `.codex-plugin/plugin.json`，App 会额外读取 `interface` 字段展示名称、分类、默认提示词、品牌色（`#F59E0B`）等 UI 信息。

### Cursor

```
/add-plugin superpowers
```

### Gemini CLI

```bash
gemini extensions install https://github.com/obra/superpowers
```

### OpenCode

在 `opencode.json` 的 `plugin` 数组里添加：

```json
{
  "plugin": ["superpowers@git+https://github.com/obra/superpowers.git"]
}
```

### GitHub Copilot CLI

```bash
copilot plugin marketplace add obra/superpowers-marketplace
copilot plugin install superpowers@superpowers-marketplace
```

### Factory Droid

```bash
droid plugin marketplace add https://github.com/obra/superpowers
droid plugin install superpowers@superpowers
```

## 14 个 Skill 详解

### 入口引导 — using-superpowers

**铁律**：如果有 1% 的可能性某个技能适用，就必须调用它。

包含一个"红旗表"识别代理的常见合理化借口：

| 代理的想法 | 现实 |
| --- | --- |
| "这只是个简单问题" | 问题就是任务。检查技能。 |
| "我需要先了解更多上下文" | 技能检查在澄清问题之前。 |
| "让我先探索代码库" | 技能告诉你如何探索。先检查。 |
| "这个技能太重了" | 简单的事会变复杂。用它。 |
| "我先做这一件事" | 做任何事之前先检查。 |

**优先级顺序**：用户 CLAUDE.md / GEMINI.md / AGENTS.md（最高）→ Superpowers 技能 → 默认系统提示（最低）

---

### 头脑风暴 — brainstorming

**触发条件**：任何创造性工作之前——创建功能、构建组件、添加功能、修改行为。

**硬门控（HARD-GATE）**：在呈现设计并获得用户批准之前，不得调用任何实现技能、编写任何代码、搭建任何项目。

**流程**：探索项目上下文 → 一次一个问题澄清（优先选择题）→ 提出 2-3 种方案 → 分段呈现设计 → 写设计文档 → 自审 → 用户审阅 → 转入 `writing-plans`

**关键原则**：
- 一次只问一个问题，优先使用选择题
- YAGNI——无情地移除不必要的功能
- 设计文档保存到 `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md`，需提交到 git
- **视觉伴侣**：如涉及布局/线框图，可作为单独消息征得用户同意，启动本地服务展示架构设计
- brainstorming 结束后，唯一允许衔接的下一个技能是 `writing-plans`，不能直接跳去实现

---

### 编写计划 — writing-plans

**触发条件**：有了规格说明或需求，准备开始编码之前。

**核心原则**：假设执行者是一个"有技能但零上下文、品味存疑、不愿测试的热心初级工程师"。

**任务粒度**：每步是 2-5 分钟的一个动作：

```
### Task N: [组件名]

**Files:**
- Create: `exact/path/to/file.py`
- Modify: `exact/path/to/existing.py:123-145`
- Test: `tests/exact/path/to/test.py`

- [ ] **Step 1: Write the failing test**
    def test_specific_behavior():
        result = function(input)
        assert result == expected

- [ ] **Step 2: Run test to verify it fails**
    Run: `pytest tests/path/test.py::test_name -v`
    Expected: FAIL

- [ ] **Step 3: Write minimal implementation**
    ...

- [ ] **Step 4: Run test to verify it passes**
    ...

- [ ] **Step 5: Commit**
```

**禁止占位符**："TBD"、"TODO"、"稍后实现"、"添加适当的错误处理"、"类似 Task N"（必须重复完整代码）。

**自审清单**：规格覆盖、占位符扫描、类型一致性。

**保存位置**：`docs/superpowers/plans/YYYY-MM-DD-<feature-name>.md`

**后续动作**：写完计划后，明确让用户在 `subagent-driven-development` 和 `executing-plans` 之间二选一。

---

### 测试驱动开发 — test-driven-development

**铁律**：没有先写失败测试，就不能写生产代码。

**如果先写了代码？** 删除它。重新开始。不要保留作为"参考"，不要"改编"，不要看它。

**RED-GREEN-REFACTOR 循环**：RED（写失败测试）→ 验证失败 → GREEN（最简代码通过）→ 验证通过 → REFACTOR（重构）→ 下一个测试。

**常见合理化借口反驳**：

| 借口 | 现实 |
| --- | --- |
| "太简单不需要测试" | 简单代码也会出错。测试只要 30 秒。 |
| "我之后再写测试" | 立即通过的测试证明不了任何东西。 |
| "删除 X 小时的工作太浪费" | 沉没成本谬误。未验证的代码才是技术债。 |
| "TDD 太教条了" | TDD 就是务实的：先测试比事后调试更快。 |

---

### 子代理驱动开发 — subagent-driven-development

**核心思想**：每个任务分配一个全新的子代理，两阶段审查（规格审查 + 代码质量审查），默认**连续执行完整个计划**，不在任务间回头问用户。

**流程**：

```
读取计划 → 提取所有任务 → 创建 TodoWrite
  ↓
每个任务：
  派发实现者子代理 → 子代理提问？→ 回答 → 实现、测试、提交、自审
  → 派发规格审查者 → 是否符合规格？→ 修复 → 重审
  → 派发代码质量审查者 → 质量通过？→ 修复 → 重审
  → 标记任务完成
  ↓
所有任务完成 → 派发最终代码审查 → finishing-a-development-branch
```

**模型选择策略**：
- 机械实现（1-2 文件，清晰规格）→ 便宜快速的模型
- 集成和判断（多文件协调）→ 标准模型
- 架构、设计、审查 → 最强大的模型

**子代理状态处理**：`DONE` → 进入审查；`DONE_WITH_CONCERNS` → 先评估担忧；`NEEDS_CONTEXT` → 提供缺失上下文；`BLOCKED` → 评估阻塞原因。

**三个提示模板**：
1. `implementer-prompt.md` — 实现者模板
2. `spec-reviewer-prompt.md` — 规格审查者模板（关键指令："不要信任实现者的报告，独立验证一切"）
3. `code-quality-reviewer-prompt.md` — 代码质量审查者模板

---

### 批量执行计划 — executing-plans

**适用场景**：已有一份书面计划，但当前平台缺少高质量子代理支持，或刻意选择不用子代理，在单线程会话中串行执行。

**与 subagent-driven-development 的区别**：
- `subagent-driven-development`：主控 + 新鲜子代理 + 两阶段审查
- `executing-plans`：当前代理自己读计划、质疑计划、逐项执行
- 如果平台支持子代理，技能明确要求优先使用 `subagent-driven-development`

**流程**：加载并批判性审查计划 → 如有疑点先澄清 → 逐个执行任务（标记 in_progress → 按步骤执行 → 运行验证 → 标记完成）→ 全部完成后调用 `finishing-a-development-branch`

---

### 系统化调试 — systematic-debugging

**铁律**：没有根因调查，就不能提出修复方案。

**四个阶段**：
1. **Phase 1：根因调查** — 仔细读错误信息 → 一致地复现 → 检查最近变更 → 多组件系统先加诊断仪器 → 追踪数据流
2. **Phase 2：模式分析** — 找类似的工作代码 → 对比参考实现 → 识别差异
3. **Phase 3：假设与测试** — 形成单一假设（"我认为 X 是根因，因为 Y"）→ 最小变更测试 → 一次只改一个变量
4. **Phase 4：实现** — 创建失败测试用例 → 实现单一修复 → 验证 → **如果 3 次修复都失败 → 质疑架构**

**支持子文档**：`root-cause-tracing.md`（调用栈反向追踪）、`defense-in-depth.md`（多层验证）、`condition-based-waiting.md`（条件轮询替代任意超时）

---

### 完成前验证 — verification-before-completion

**铁律**：没有新鲜的验证证据，就不能声称完成。

**门控函数**：
```
在声称任何状态之前：
1. 识别：什么命令能证明这个声明？
2. 运行：执行完整命令（新鲜的、完整的）
3. 阅读：完整输出，检查退出码，计数失败
4. 验证：输出是否确认了声明？
5. 只有这时：才能做出声明
```

**常见失败模式**：

| 声明 | 需要 | 不够 |
| --- | --- | --- |
| 测试通过 | 测试命令输出：0 failures | 上一次运行、"应该通过" |
| 构建成功 | 构建命令：exit 0 | Linter 通过、日志看起来好 |
| Bug 已修复 | 测试原始症状：通过 | 代码改了、假设已修复 |

---

### Git Worktree 管理 — using-git-worktrees

**核心原则**：先检测现有隔离 → 使用平台原生工具（如 Claude Code 的 `EnterWorktree`）→ 回退到 `git worktree add`。

**安全验证**：创建前必须验证目标目录被 `.gitignore` 忽略；如果没有既有偏好，技能会先征求用户是否同意创建隔离 worktree；排除子模块误判。

---

### 完成开发分支 — finishing-a-development-branch

**四个选项**：
1. 本地合并回基准分支（清理 worktree）
2. 推送并创建 Pull Request（保留 worktree）
3. 保留分支原样（保留 worktree）
4. 丢弃此工作（清理 worktree）

**清理规则**：只清理 Superpowers 创建的 worktree；清理前必须先 `cd` 到主仓库根目录；清理后执行 `git worktree prune`；detached HEAD 下收缩为 3 个选项。

---

### 代码审查 — requesting-code-review / receiving-code-review

**请求审查**：获取 git SHAs → 派发代码审查子代理 → 按严重程度处理反馈（Critical → 立即修复；Important → 继续前修复；Minor → 记录）

**接收审查的铁律**：
- 禁止表演性同意："You're absolutely right!"、"Great point!"
- 正确做法：重述技术要求、用技术推理反驳、直接开始修复
- 外部反馈 = 需要评估的建议，而非需要执行的命令
- YAGNI 检查：如果审查者建议"正确实现"某个功能，先 grep 代码库看是否有人在用

---

### 并行代理调度 — dispatching-parallel-agents

**适用场景**：2+ 个独立任务，无共享状态，无顺序依赖。

**流程**：识别独立领域 → 创建聚焦的代理任务（具体范围、清晰目标、约束、期望输出）→ 并行派发 → 审查与集成。每个代理获得精确构造的上下文，不继承主会话的历史。

---

### 编写技能 — writing-skills

**核心思想**：编写技能就是对流程文档做 TDD。

**TDD 映射**：

| TDD 概念 | 技能创建 |
| --- | --- |
| 测试用例 | 压力场景 + 子代理 |
| 生产代码 | 技能文档（SKILL.md） |
| 测试失败（RED） | 没有技能时代理违反规则 |
| 测试通过（GREEN） | 有技能时代理遵守规则 |
| 重构 | 关闭漏洞，保持合规 |

**技能类型**：技术型（Technique，有步骤可循）、模式型（Pattern，思考问题的方式）、参考型（Reference，API 文档/语法指南）

---

## 技能文件结构

每个技能是一个目录，核心文件是 `SKILL.md`，采用 YAML frontmatter + Markdown：

```
---
name: skill-name
description: "Use when [触发条件]..."
---

# 技能标题

## Overview        — 核心原则
## When to Use     — 使用场景
## Checklist / Process — 工作流或操作步骤
## Red Flags       — 反模式清单
## Common Rationalizations — 借口 vs 现实
```

`description` 字段优先描述"何时触发"，而不是概述完整工作流——这是 CSO（Claude 搜索优化）的关键。

## 设计哲学

详见 [[../concepts/superpowers-design-philosophy|Superpowers 设计哲学]]。核心四点：

1. **铁律模式** — 每个技能有一条不可违反的 Iron Law + HARD-GATE
2. **合理化防范** — Red Flags 自检表 + Common Rationalizations 反驳表，预见并堵死代理的每一种借口
3. **"人的搭档"语言** — 使用 "your human partner" 而非 "the user"，建立协作关系而非服务关系
4. **CSO（Claude 搜索优化）** — description 只写触发条件，用动词优先命名，覆盖代理会搜索的关键词

## 核心效果

以前：30 分钟任务 + 3 次返工 = 2 小时
现在：90 分钟 + 0 次返工 = 90 分钟

**返工减少约 90%**，总时间节省 25%。

## 与 gstack 的关系

- **Superpowers** = 大脑（思考与流程层）：规划、调试、审查、验证
- **gstack** = 手脚（执行与外部世界层）：浏览器、QA、发布、部署、监控

两者配合形成完整闭环：想法 → brainstorming → writing-plans → worktrees → 执行+TDD → 浏览器验证 → 独立审查 → 发布上线。

完整工作流详见 [[../topics/claude-code-superpowers-workflow|Superpowers + gstack 工作流]]。

## 自定义技能

个人技能放在：
- Claude Code：`~/.claude/skills`
- Codex：`~/.agents/skills/`
- OpenCode：`~/.config/opencode/skills/` 或项目级 `.opencode/skills/`

创建技能遵循 TDD 流程：RED（记录无技能时的违规行为）→ GREEN（编写最简技能解决违规）→ REFACTOR（发现新借口 → 堵住 → 重新验证）。

## 性能考量

- `using-superpowers` 每会话加载，必须保持精简（<150 词）
- 频繁引用技能目标 <200 词
- 其他技能目标 <500 词
- 使用交叉引用而非重复内容
- 代码示例只用一种语言

## 调试 Superpowers

如果技能未按预期触发：
1. 先分清当前 harness 的引导路径
2. 检查 `using-superpowers` 是否进入上下文
3. 检查技能的 `description` 是否覆盖正确的触发条件
4. 查看代理是否在合理化跳过技能
5. OpenCode 可额外检查插件日志；Windows 下确认 `run-hook.cmd` 能找到 bash

## 贡献标准

- PR 必须填写完整模板（解决问题、变更内容、替代方案、测试环境、评估结果等）
- 拒绝标准：添加第三方依赖、为合规重构技能、批量/喷洒式 PR、推测性修复、领域特定技能等
- 新平台集成必须通过验收测试："Let's make a react todo list" 后 brainstorming 必须自动触发
