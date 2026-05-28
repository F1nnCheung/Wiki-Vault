---
title: CLAUDE.md 12 条规则深度解析
type: topic
tags: [claude-code, claude-md, rules, coding-standards, agent, prompt-engineering]
created: 2026-05-13
updated: 2026-05-28
sources:
  - raw/articles/Claude Code/让Claude编程失误率从41%降到3%：12条CLAUDE.md规则的踩坑复盘.md
  - raw/articles/Claude Code/CLAUDE.md 的12条规则，让编程错误率从 41% 降至 3%.md
  - raw/articles/Claude Code/最佳 Claude Code 配置：Andrej Karpathy 的 CLAUDE.md，134+k star了！.md
related:
  - entities/claude-code.md
  - topics/claude-code-mastery-guide.md
  - concepts/harness-engineering.md
  - topics/claude-code-practical-techniques.md
  - topics/claude-code-prompt-engineering.md
---

# CLAUDE.md 12 条规则深度解析

> CLAUDE.md 是整个 AI 编码栈里最被低估的文件。辰北在 30 个代码库上跑 6 周验证：Karpathy 原版 4 条规则将失误率从 ~40% 压到 ~3%，追加 8 条规则在几乎不增加合规开销的前提下又压了 8 个百分点。本文深度拆解每条规则的设计逻辑、防止的失败模式和背后的真实翻车现场。

## 核心论点

1. **CLAUDE.md 是行为契约，不是愿望清单**——每一条规则必须对应你观察到的具体失败模式
2. **Karpathy 的 4 条是地基**：堵住了静默假设、过度设计、附带破坏、弱成功标准四类基础翻车
3. **辰北的 8 条是增量**：覆盖了 2026 年 5 月 Claude Code 生态新出现的失败模式——agent 缠斗、hook 级联、跨 session 工作流
4. **合规率不随规则增加而线性下降**：4 条→12 条，合规率仅从 78% 降到 76%，因为新旧规则覆盖不相交的失败模式
5. **总行数不超过 200 行是硬约束**：超过后合规率断崖下降

## 背景：CLAUDE.md 的三种典型误用

大多数开发者的 CLAUDE.md 用法分三类：

| 类型 | 表现 | 后果 |
|------|------|------|
| **偏好垃圾桶** | 塞满 4000+ token，什么都想告诉 AI | 合规率掉到 30%，重要规则被噪声淹没 |
| **完全跳过** | 不写 CLAUDE.md，每次手动 prompt | 5 倍 token 消耗，跨 session 零一致性 |
| **抄完就忘** | 抄一份模板用两周 | 代码库一变就静默崩，规则不再匹配现实 |

Anthropic 官方文档明确指出：CLAUDE.md 是**建议性**的，Claude 约 80% 的时候会遵守。超过 200 行，合规率急剧下降。

Karpathy 模板的成功在于：一个文件、65 行、4 条规则——击中了最核心的痛点。

---

## 原版 4 条规则（Karpathy 模板，Forrest Chang 实现）

> 2026 年 1 月，Andrej Karpathy 发帖吐槽 Claude 编码的三种典型翻车模式。Forrest Chang 将这些抱怨打包成 4 条行为规则，扔上 GitHub。第一天 5828 star，到今天 12 万 star——2026 年增长最快的单文件仓库。

### 规则 1 — 先想再写（Think Before Coding）

**核心要求**：
- 禁止静默假设——明确说出你的假设
- 不确定就问，不要猜
- 列出权衡，有更简单的方案就 push back
- 困惑时停下来，说清楚哪里不清楚

**防止的失败模式**：静默做错假设。Claude 会自己脑补缺失的信息然后默默执行，结果与预期南辕北辙。

### 规则 2 — 简单第一（Simplicity First）

**核心要求**：
- 最少代码解决问题，不写推测性功能
- 不为一次性代码建抽象层
- 自检标准：「高级工程师看了会说过度设计吗？如果是，简化」

**防止的失败模式**：过度设计。Claude 喜欢为简单问题构建复杂架构。

### 规则 3 — 精准改动（Surgical Changes）

**核心要求**：
- 只碰必须改的，别顺手"优化"相邻代码、注释、格式
- 不改没坏的东西
- 匹配现有风格

**防止的失败模式**：附带破坏。Claude 会顺手重构没问题的代码，引入新 bug。

### 规则 4 — 目标驱动执行（Goal-Driven Execution）

**核心要求**：
- 定义成功标准，循环迭代直到验证通过
- 不要告诉 Claude 步骤，告诉它目标长什么样，让它自己迭代
- 强的成功标准让 AI 能独立循环

**防止的失败模式**：弱成功标准。AI 不知道什么时候算"完成"，要么过早停止，要么无限循环。

> **这四条堵住了约 40% 的无监督 Claude Code 翻车。**

---

## 追加的 8 条规则（辰北，2026 年 5 月）

> 每条都来自一个 4 条规则兜不住的现场翻车。

### 规则 5 — 别让模型做代码就能干的事

**核心要求**：
- 用模型做：分类、草拟、摘要、从非结构化文本中提取
- **不要**用模型做：路由、重试、状态码处理、确定性转换
- 如果状态码已经回答了问题，就用普通代码回答

**翻车现场**：代码调用 Claude "决定 503 要不要重试"。跑了两周后开始抽风——模型开始读请求 body 的上下文来做重试决策。重试策略是随机的，因为 prompt 是随机的。一个不稳定的 if-else，每次 $0.003 token。

> ⚠️ 核心教训：模型决策不稳定。把确定性逻辑交给代码，把判断力任务交给模型。

### 规则 6 — Token 预算是硬约束

**核心要求**：
- 每任务预算：4,000 tokens
- 每会话预算：30,000 tokens
- 接近预算时，总结并重新开始，不要硬推
- 暴露超支 > 静默超支

**翻车现场**：一次调试跑了 90 分钟。模型在同一个 8KB 错误信息上迭代，逐渐忘掉已经试过哪些方案。到最后建议的修复方案在 40 条消息前就被否决过。Token 预算在第 12 分钟就该叫停。

> ⚠️ 核心教训：没有预算的 CLAUDE.md 是空白支票。每个循环都可能螺旋膨胀成 5 万 token 的上下文倾倒。

### 规则 7 — 暴露冲突，别取平均

**核心要求**：
- 代码库里两套模式互相矛盾时，选一套（更新的或更经过测试的）
- 解释为什么选这套，标记另一套待清理
- "平均"代码——试图同时满足两套规则的代码——是最差的代码

**翻车现场**：一个代码库有两套错误处理模式——一套 async/await + try/catch，一套全局 error boundary。Claude 写的新代码两种都用了。双层错误处理器。花了 30 分钟才搞明白为什么错误被吞了两次。

> ⚠️ 核心教训：Claude 会试图两全，结果是四不像。

### 规则 8 — 先读再写

**核心要求**：
- 在文件里加代码前，先读文件的 exports、直接调用者、明显的共享工具
- 不理解现有代码为什么那样组织，先问再加
- "看起来跟我的改动物理隔离"是这个代码库里最危险的话

**翻车现场**：Claude 在一个已有相同函数 6 个月的代码旁边又加了一个一模一样的函数。新函数因为 import 顺序覆盖了旧的。旧函数是数据源用了半年。

> ⚠️ 核心教训：Karpathy 的"精准改动"告诉 Claude 别碰相邻代码，但没告诉它**先理解**相邻代码。

### 规则 9 — 测试验证意图，不是行为

**核心要求**：
- 每个测试必须编码 **WHY** 这个行为重要，不只是 WHAT 它做了什么
- `expect(getUserName()).toBe('John')` 如果函数接受硬编码 ID 就没价值
- 写不出会在业务逻辑变化时失败的测试 = 函数写错了

**翻车现场**：Claude 为一个认证函数写了 12 个测试。全过了。生产环境认证挂了。测试测的是"函数有返回值"，不是"返回值是否正确"。函数通过是因为它返回了一个常量。

> ⚠️ 核心教训：Karpathy 的"目标驱动执行"把测试通过当作成功。但"测试通过"和"代码正确"是两个概念。Claude 会把"测试通过"当成唯一目标，写出过浅层测试但破坏其他一切的代码。

### 规则 10 — 长流程必须设检查点

**核心要求**：
- 每完成多步任务中的一步：总结做了什么、验证了什么、还剩什么
- 不要从你无法向我描述的状态继续
- 跟丢了就停下来重新陈述

**翻车现场**：6 步重构在第 4 步翻车。等发现时 Claude 已在坏掉的状态上把第 5、6 步也做完了。回滚的工夫比重做还长。

> ⚠️ 核心教训：Karpathy 模板假设一次性交互。真实的 Claude Code 是多步的——横跨 20 个文件重构、一个 session 内构建功能、跨多个 commit 调试。没有检查点，一步走错全盘丢失。

### 规则 11 — 惯例优先于品味

**核心要求**：
- 代码库用 snake_case 而你更喜欢 camelCase？用 snake_case
- 代码库用 class-based components 而你更喜欢 hooks？用 class-based
- 代码库内的遵守 > 个人品味
- 真心觉得惯例有害，提出来讨论。不要静默分叉

**翻车现场**：Claude 在一个 class-component 代码库里引入了 React hooks。能跑。但破坏了代码库的测试模式——测试依赖 componentDidMount。半天时间删除重写。

> ⚠️ 核心教训：即使 Claude 的方式"更好"，引入两种模式比任何一种单独存在更糟。一致性本身就是价值。

### 规则 12 — 失败要喊出来

**核心要求**：
- 不能确定某件事成功了，明确说出来
- "迁移完成"是错的——如果 30 条记录被静默跳过了
- "测试通过"是错的——如果跳过了任何测试
- "功能可用"是错的——如果你没验证我问过的边界情况
- 默认暴露不确定性，不要隐藏

**翻车现场**：让 Claude 写了个数据库迁移脚本。跑完，它说"已完成"。11 天后发现报表数据不对——它偷偷跳过了 14% 的记录，因为遇到了约束冲突。跳过的日志存在但没被上报。Claude 觉得"大部分完成就算完成"。

> ⚠️ 核心教训：最贵的 Claude 翻车是那些看起来像成功的。静默失败比明确报错危险得多。

---

## 实验数据

辰北在 6 周内、30 个代码库、同一组 50 个代表性任务上，测试了三种配置：

| 配置 | 失误率 | 合规率 |
|------|--------|--------|
| 无 CLAUDE.md | ~41% | — |
| Karpathy 4 条 | ~3% | 78% |
| 完整 12 条 | ~1%（原文为从 3% 又压了 8 个百分点中的一部分） | 76% |

**失误率定义**：任务需要人工修正或重写才算达到预期。计入：静默错误假设、过度设计、附带破坏、静默失败、惯例冲突、冲突平均化、漏检查点。

**关键发现**：从 4 条到 12 条规则几乎不增加合规开销（78% → 76%），却把失误率又压了 8 个百分点。新规则覆盖了原版 4 条没触及的失败模式——它们不争夺同一块注意力预算。

---

## Karpathy 模板的 4 个静默断裂点

即便在加新规则之前，原版 4 条规则也有 4 个场景兜不住：

### 1. 长时间 Agent 任务

Karpathy 的规则瞄准的是 Claude 写代码的那一刻。对于多步流水线完全沉默。没预算规则。没检查点规则。没"喊出来"规则。流水线会漂移。

**对应新规则**：规则 6（Token 预算）、规则 10（检查点）、规则 12（Fail Loud）

### 2. 多代码库一致性

"匹配现有风格"假设只有一个风格。一个 monorepo 有 12 个服务，Claude 得选哪个风格。原版规则没告诉它怎么选——它要么随机选、要么取平均。

**对应新规则**：规则 7（暴露冲突）、规则 11（惯例优先）

### 3. 测试质量

"目标驱动执行"把测试通过当作成功。没说测试必须有意义。结果是测试什么都没测但让 Claude 很自信。

**对应新规则**：规则 9（测试验证意图）

### 4. 生产 vs 原型

保护生产代码不被过度设计的同 4 条规则，也在扼杀早期原型——后者确实需要 100 行推测性脚手架来探路。Karpathy 的"简单第一"对早期代码杀伤过度。

**对应策略**：场景感知——根据任务阶段调整规则严格程度。辰北建议在原型阶段显式声明 `## Override for prototyping: Rule 2 suspended`。

---

## 完整 12 条 CLAUDE.md 模板

```markdown
# CLAUDE.md — 12-rule template

These rules apply to every task in this project unless explicitly overridden.
Bias: caution over speed on non-trivial work. Use judgment on trivial tasks.

## Rule 1 — Think Before Coding
State assumptions explicitly. If uncertain, ask rather than guess.
Present multiple interpretations when ambiguity exists.
Push back when a simpler approach exists.
Stop when confused. Name what's unclear.

## Rule 2 — Simplicity First
Minimum code that solves the problem. Nothing speculative.
No features beyond what was asked. No abstractions for single-use code.
Test: would a senior engineer say this is overcomplicated? If yes, simplify.

## Rule 3 — Surgical Changes
Touch only what you must. Clean up only your own mess.
Don't "improve" adjacent code, comments, or formatting.
Don't refactor what isn't broken. Match existing style.

## Rule 4 — Goal-Driven Execution
Define success criteria. Loop until verified.
Don't follow steps. Define success and iterate.
Strong success criteria let you loop independently.

## Rule 5 — Use the model only for judgment calls
Use me for: classification, drafting, summarization, extraction.
Do NOT use me for: routing, retries, deterministic transforms.
If code can answer, code answers.

## Rule 6 — Token budgets are not advisory
Per-task: 4,000 tokens. Per-session: 30,000 tokens.
If approaching budget, summarize and start fresh.
Surface the breach. Do not silently overrun.

## Rule 7 — Surface conflicts, don't average them
If two patterns contradict, pick one (more recent / more tested).
Explain why. Flag the other for cleanup.
Don't blend conflicting patterns.

## Rule 8 — Read before you write
Before adding code, read exports, immediate callers, shared utilities.
"Looks orthogonal" is dangerous. If unsure why code is structured a way, ask.

## Rule 9 — Tests verify intent, not just behavior
Tests must encode WHY behavior matters, not just WHAT it does.
A test that can't fail when business logic changes is wrong.

## Rule 10 — Checkpoint after every significant step
Summarize what was done, what's verified, what's left.
Don't continue from a state you can't describe back.
If you lose track, stop and restate.

## Rule 11 — Match the codebase's conventions, even if you disagree
Conformance > taste inside the codebase.
If you genuinely think a convention is harmful, surface it. Don't fork silently.

## Rule 12 — Fail loud
"Completed" is wrong if anything was skipped silently.
"Tests pass" is wrong if any were skipped.
Default to surfacing uncertainty, not hiding it.
```

---

## 使用指南

### 怎么用

```bash
# 1. 先把 Karpathy 的 4 条基线追加到你的 CLAUDE.md
curl https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md >> CLAUDE.md

# 2. 把上面 5-12 条规则贴到下面
```

`>>` 很重要——**追加**而不是覆盖，保留你可能已有的项目特定规则。

### 怎么裁减

**不是所有规则都需要**。问自己：「这条规则防止什么错误？」

- 不跑多步流水线 → 规则 10（检查点）没用
- 代码库有 linting 强制统一风格 → 规则 11（惯例优先）多余
- 总是在单个文件里做小修改 → 规则 8（先读再写）可以放宽

**一个针对你真实失败的 6 条 CLAUDE.md，比一个塞了 6 条永远用不上的 12 条版本强得多。**

### 心法

> CLAUDE.md 不是愿望清单。是行为契约，每一条都对应你观察到的具体失败模式。

标准自检问题：**这条规则防止什么错误？**

- Karpathy 的 4 条防止的是 2026 年 1 月的失败模式：静默假设、过度设计、附带破坏、弱成功标准
- 辰北加的 8 条防止的是 2026 年 5 月冒出来的新问题：无预算循环、缺检查点多步操作、不测实质的测试、静默成功掩盖的静默失败

在 12 条下面加项目特定规则（技术栈、测试命令、常见错误模式）。**总行数不要超过 200 行。**

---

## 与本知识库的 CLAUDE.md 的关系

本知识库的 [[CLAUDE.md|CLAUDE.md（项目指令）]] 自身也遵循了这些规则的精神：

- **规则 3（精准改动）**：我们的 CLAUDE.md 要求「精确修改，不碰无关内容」
- **规则 4（目标驱动执行）**：我们的 Ingest/Query/Lint/Output 工作流就是目标驱动
- **规则 8（先读再写）**：我们的「先搜库，后联网」原则体现了同样的精神
- **规则 12（失败要喊出来）**：⚠️ 矛盾标注机制就是 Fail Loud 在知识库场景的投射

更多 CLAUDE.md 的层级结构、加载机制、拼接规则，参见 [[entities/claude-code#CLAUDE.md 层级结构|Claude Code 实体页的 CLAUDE.md 层级结构详解]]。
