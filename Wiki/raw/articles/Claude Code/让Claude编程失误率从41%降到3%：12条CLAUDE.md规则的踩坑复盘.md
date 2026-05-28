辰北 *2026年5月11日 17:00*

你让 Claude 写了个数据库迁移脚本。跑完，它说"已完成"。

11天后你发现报表数据不对——它偷偷跳过了 14% 的记录，因为遇到了约束冲突。跳过的日志存在但没被上报。Claude 觉得"大部分完成就算完成"。

这不是 Claude 的问题。这是你没告诉它什么叫"完成"。

今年 1 月底，Andrej Karpathy 发了一条吐槽 Claude 编码的长帖，列出三种典型翻车模式：静默做错假设、过度设计、顺手"优化"不该碰的代码。Forrest Chang 把这些抱怨打包成 4 条行为规则塞进一个 CLAUDE.md 文件，扔上 GitHub。第一天 5828 star，两周 6 万书签，到今天 12 万 star——2026 年增长最快的单文件仓库。

![图片](https://mmbiz.qpic.cn/mmbiz_png/SiaGpPqCviac1kEicrKyJO8169dDPodTjbicX90YQhoia8jrOE4hYOVwsgBibyk5tAfzYskMeJ00p1npc2CtYPJSvurz65I9pxumoEibM4TsaXjYeo/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

然后我在 30 个代码库上跑了 6 周。

4 条规则确实管用。在它们擅长的场景下，失误率从约 40% 掉到 3% 以下。但问题在于——这个模板是为 2026 年 1 月的编码场景设计的。2026 年 5 月的 Claude Code 生态已经变了：agent 缠斗、hook 链级联、skill 加载冲突、跨 session 多步工作流——这些在 Karpathy 发帖时还不存在。

所以我加了 8 条规则。下面展开讲：完整的 12 条 CLAUDE.md、每条为什么值这个位置、以及原始 Karpathy 模板的 4 个静默断裂点。

CLAUDE.md 是整个 AI 编码栈里最被低估的文件。大多数开发者的用法分三类：

- • 当成偏好垃圾桶，塞满 4000+ token，合规率掉到 30%
- • 完全跳过，每次手动 prompt——5 倍 token 消耗，跨 session 零一致性
- • 抄一份模板就忘了。用两周还行，代码库一变就静默崩

Anthropic 官方文档说得很直白：CLAUDE.md 是建议性的。Claude 大约 80% 的时候会遵守。超过 200 行，合规率急剧下降，因为重要规则被噪声淹没。

Karpathy 的模板一个文件、65 行、4 条规则搞定了这个问题。这是底线。

天花板可以更高。

## 原版 4 条规则

如果你还没看过 Forrest Chang 的仓库，这是底线：

**规则 1 — 先想再写。** 禁止静默假设。明确说出你的假设、列出权衡、不确定就问。有更简单的方案就 push back。

**规则 2 — 简单第一。** 最少代码解决问题。不写推测性功能。不为一次性代码建抽象层。高级工程师说"过度设计"→ 简化。

**规则 3 — 精准改动。** 只碰必须改的。别顺手"优化"相邻代码、注释、格式。不改没坏的东西。匹配现有风格。

**规则 4 — 目标驱动执行。** 定义成功标准。循环迭代直到验证通过。不要告诉 Claude 步骤，告诉它目标长什么样，让它自己迭代。

这四条堵住了我观察到的约 40% 的无监督 Claude Code 翻车。剩下约 60% 藏在下述空白里。

## 我加的 8 条规则（以及背后的事故）

每条都来自一个 4 条规则兜不住的现场翻车。

### 规则 5 — 别让模型做代码就能干的事

Karpathy 的规则对此完全沉默。模型决定本应是确定性代码的事：要不要重试 API、怎么路由消息、什么时候升级——每周决定都不一样。一个不稳定的 if-else，每次 $0.003 token。

```
## Rule 5 — Use the model only for judgment calls
Use Claude for: classification, drafting, summarization, extraction from unstructured text.
Do NOT use Claude for: routing, retries, status-code handling, deterministic transforms.
If a status code already answers the question, plain code answers the question.
```

翻车现场：代码调用 Claude "决定 503 要不要重试"，漂亮地跑了两个星期，然后开始抽风——模型开始读请求 body 的上下文来做重试决策。重试策略是随机的，因为 prompt 是随机的。

### 规则 6 — Token 预算是硬约束

没有预算的 CLAUDE.md 是空白支票。每个循环都可能螺旋膨胀成 5 万 token 的上下文倾倒。模型自己不会停。

```
## Rule 6 — Token budgets are not advisory
Per-task budget: 4,000 tokens.
Per-session budget: 30,000 tokens.
If a task is approaching budget, summarize and start fresh. Do not push through.
Surfacing the breach > silently overrunning.
```

翻车现场：一次调试跑了 90 分钟。模型乐此不疲地在同一个 8KB 错误信息上迭代，逐渐忘掉已经试过哪些方案。到最后它建议的修复方案我在 40 条消息前就否决过。Token 预算在第 12 分钟就该叫停。

### 规则 7 — 暴露冲突，别取平均

代码库里两套模式互相矛盾时，Claude 会试图两全。结果是四不像。

```
## Rule 7 — Surface conflicts, don't average them
If two existing patterns in the codebase contradict, don't blend them.
Pick one (the more recent / more tested), explain why, and flag the other for cleanup.
"Average" code that satisfies both rules is the worst code.
```

翻车现场：一个代码库有两套错误处理模式——一套是 async/await + try/catch，一套用全局 error boundary。Claude 写的新代码两种都用了。双层错误处理器。花了 30 分钟才搞明白为什么错误被吞了两次。

### 规则 8 — 先读再写

Karpathy 的"精准改动"告诉 Claude 别碰相邻代码。但没告诉它先理解相邻代码。缺了这条，Claude 写的新代码跟 30 行外的已有代码冲突。

```
## Rule 8 — Read before you write
Before adding code in a file, read the file's exports, the immediate caller, and any obvious shared utilities.
If you don't understand why existing code is structured the way it is, ask before adding to it.
"Looks orthogonal to me" is the most dangerous phrase in this codebase.
```

翻车现场：Claude 在一个已有相同函数 6 个月的代码旁边又加了一个一模一样的函数。新函数因为 import 顺序覆盖了旧的。旧函数是数据源用了半年。

### 规则 9 — 测试验证意图，不是行为

Karpathy 的"目标驱动执行"暗示把测试通过作为成功标准。实践中 Claude 会把"测试通过"当成唯一目标，写出过浅层测试但破坏其他一切的代码。

```
## Rule 9 — Tests verify intent, not just behavior
Every test must encode WHY the behavior matters, not just WHAT it does.
A test like \`expect(getUserName()).toBe('John')\` is worthless if the function takes a hardcoded ID.
If you can't write a test that would fail when business logic changes, the function is wrong.
```

翻车现场：Claude 为一个认证函数写了 12 个测试。全过了。生产环境认证挂了。测试测的是"函数有返回值"，不是"返回值是否正确"。函数通过是因为它返回了一个常量。

### 规则 10 — 长流程必须设检查点

Karpathy 模板假设一次性交互。真实的 Claude Code 是多步的——横跨 20 个文件重构、一个 session 内构建功能、跨多个 commit 调试。没有检查点，一步走错全盘丢失。

```
## Rule 10 — Checkpoint after every significant step
After completing each step in a multi-step task: summarize what was done, what's verified, what's left.
Don't continue from a state you can't describe back to me.
If you lose track, stop and restate.
```

翻车现场：6 步重构在第 4 步翻车。等发现时 Claude 已在坏掉的状态上把第 5、6 步也做完了。回滚的工夫比重做还长。

### 规则 11 — 惯例优先于品味

代码库里已有既定模式时，Claude 喜欢引入自己的。即使它的方式"更好"，引入两种模式比任何一种单独存在更糟。

```
## Rule 11 — Match the codebase's conventions, even if you disagree
If the codebase uses snake_case and you'd prefer camelCase: snake_case.
If the codebase uses class-based components and you'd prefer hooks: class-based.
Disagreement is a separate conversation. Inside the codebase, conformance > taste.
If you genuinely think the convention is harmful, surface it. Don't fork it silently.
```

翻车现场：Claude 在一个 class-component 代码库里引入了 React hooks。能跑。但破坏了代码库的测试模式——测试依赖 componentDidMount。半天时间删除重写。

### 规则 12 — 失败要喊出来

最贵的 Claude 翻车是那些看起来像成功的。函数"能用"但返回了错误数据。迁移"完成"但跳过了 30 条记录。测试"通过"但断言本身写错了。

```
## Rule 12 — Fail loud
If you can't be sure something worked, say so explicitly.
"Migration completed" is wrong if 30 records were skipped silently.
"Tests pass" is wrong if you skipped any.
"Feature works" is wrong if you didn't verify the edge case I asked about.
Default to surfacing uncertainty, not hiding it.
```

就是开头那个故事。Claude 说迁移"成功完成"，静默跳过了 14% 的记录。

## 数据

6 周、30 个代码库、同一组 50 个代表性任务、三种配置：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

失误率 = 任务需要人工修正或重写才算达到预期。计入：静默错误假设、过度设计、附带破坏、静默失败、惯例冲突、冲突平均化、漏检查点。

合规率 = 适用场景下 Claude 明显应用了相关规则的频率。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

有意思的结果不是从 41% 到 3% 的降幅——虽然这个数字很抓眼球——而是从 4 条到 12 条规则几乎不增加合规开销（78% → 76%），却把失误率又压了 8 个百分点。新规则覆盖了原版 4 条没触及的失败模式——它们不争夺同一块注意力预算。

## Karpathy 模板的 4 个静默断裂点

即便在加新规则之前，原版 4 条规则也有 4 个地方兜不住：

**1\. 长时间 agent 任务。** Karpathy 的规则瞄准的是 Claude 写代码的那一刻。对于多步流水线完全沉默。没预算规则。没检查点规则。没"喊出来"规则。流水线会漂移。

**2\. 多代码库一致性。** "匹配现有风格"假设只有一个风格。一个 monorepo 有 12 个服务，Claude 得选哪个风格。原版规则没告诉它怎么选。它要么随机选、要么取平均。

**3\. 测试质量。** "目标驱动执行"把测试通过当作成功。没说测试必须有意义。结果是测试什么都没测但让 Claude 很自信。

**4\. 生产 vs 原型。** 保护生产代码不被过度设计的同 4 条规则，也在扼杀早期原型——后者确实需要 100 行推测性脚手架来探路。Karpathy 的"简单第一"对早期代码杀伤过度。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 完整的 12 条 CLAUDE.md（可直接复制）

```
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

保存为仓库根目录下的 CLAUDE.md。在这 12 条下面加项目特定规则（技术栈、测试命令、常见错误模式）。 **总行数不要超过 200 行** ——超过后合规率断崖下降。

## 怎么用

两步：

```
# 1. 先把 Karpathy 的 4 条基线追加到你的 CLAUDE.md
curl https://raw.githubusercontent.com/forrestchang/andrej-karpathy-skills/main/CLAUDE.md >> CLAUDE.md

# 2. 把上面 5-12 条规则贴到下面
```

`>>` 很重要——追加而不是覆盖，保留你可能已有的项目特定规则。

## 心法

CLAUDE.md 不是愿望清单。是行为契约，每一条都对应你观察到的具体失败模式。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

问你自己的标准问题： **这条规则防止什么错误？**

Karpathy 的 4 条防止的是 2026 年 1 月的失败模式：静默假设、过度设计、附带破坏、弱成功标准。它们是地基，不能跳。

加的 8 条防止的是 2026 年 5 月冒出来的新问题：没预算的 agent 循环、缺检查点的多步操作、不测实质的测试、静默成功掩盖的静默失败。它们是增量的。

你的场景可能不一样。不跑多步流水线的话，规则 10 没用。代码库有 linting 强制统一风格的话，规则 11 多余。读完 12 条，留那些映射到你真实翻车现场的，扔掉用不着的。

一个针对你真实失败的 6 条 CLAUDE.md，比一个塞了 6 条永远用不上的 12 条版本强得多。

继续滑动看下一个

AI深度游民

向上滑动看下一个