澄旭 *2026年5月9日 14:01*

先看几个问题（看完本篇文章自然就有答案）：

- 为什么 Claude Code、Codex 这类 Agent 能参与真实业务开发，而不只是生成回答？
- 为什么很多人都说Claude Code 强，究竟是因为 Claude 模型强，还是因为什么强？
- 如果模型能力越来越接近，真正拉开 Agent 体验差距的会是什么？
- 对业务开发团队来说，如何更工程化地使用 Agent？

## 1\. 为什么要说Harness Engineering

> 2025 年是 Agent 的元年，而 2026 年将是 Agent Harness 的爆发之年。

OpenAI、Anthropic 等顶级 AI 公司都在投入 Harness Engineering。官方博客、开源生态、研究论文和行业讨论都在指向同一个趋势：在生产落地里，Agent 的稳定性上限往往不只取决于给模型喂了什么 prompt，也不只取决于选了什么模型，而取决于给模型搭的运行系统（Harness）。

## 行业信号

| 来源 | 标题 / 要点 | 时间 |
| --- | --- | --- |
| Anthropic 官方 | Effective harnesses for long-running agents | 2025年11月26日 |
| Mitchell Hashimoto（个人） | My AI Adoption Journey | 2026年2月5日 |
| OpenAI 官方博客 | Harness Engineering，约 1500 个自动化 PR | 2026年2月11日 |
| arXiv 2603.05344 | Building Effective AI Coding Agents，形式化定义 | 2026年3月 |
| LangChain | Deep Agents，仅调 harness 提升13.7 个百分点 | 2026年3月 |
| Simon Willison | Coding agent = harness for LLM | 2026年2月 |
| Latent Space (Swyx) | Is Harness Engineering Real?，行业辩论 | 2026年3月 |

- Anthropic 系统化阐述了 long-running agent harness，2025-11-26 发布了一篇文章：
- ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
- Mitchell Hashimoto（个人）2026-02-05 发布了一篇文章
	> It is the idea that anytime you find an agent makes a mistake, you take the time to engineer a solution such that the agent never makes that mistake again.
	> 
	> 翻译：每当发现Agent犯了一个错误，就花时间设计一个工程化解决方案，确保它以后不再犯同样的错误。
- ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
- OpenAI 把术语推到台前，2026-02-11 发布了一篇文章：
- ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 2026 年 Harness 生态与趋势

生态侧也能看到类似趋势：越来越多产品不只是提供一个模型入口，而是在模型外面搭建完整的 Agent Harness，如下表格：

| Harness | 定位 | 模型绑定 | 开源 |
| --- | --- | --- | --- |
| Claude Code | Anthropic 官方 CLI | 默认 Claude，社区有非官方多模型适配 | 否（2.1.88被意外暴露） |
| Agent SDK | Anthropic 可编程库 | 默认 Claude，社区有非官方多模型适配 | 否（商业许可） |
| OpenCode | 第三方多模型 Agent | 多模型 | MIT 开源 |
| OpenClaw | Agent 网关 / 平台 | 多模型 | MIT 开源 |
| Cursor / Windsurf | IDE 内置 Agent | 多模型 | 否 |
| Codex CLI | OpenAI CLI Agent | 仅 GPT | Apache 2.0 |

## 总结

2026 年，竞争差异化的重心，正在从单纯比拼 Model，扩展到比拼 Harness。

不是模型不重要，而是头部模型的能力 **差距正在缩小** ，继续提升模型能力的 **边际成本越来越高** ；同时，模型能力的提升通常不由业务团队直接控制。对大多数工程团队来说，真正能改进的是模型外面的运行环境、上下文、工具、验证和协作流程，所以 Harness 就成了新的竞争壁垒。

## 2\. Harness 与 Harness Engineering

## 什么是 Harness

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> 这张图只是一个简单类比：Tools、Memory、Permissions、Context、Hooks 就像马具上的不同部件，用来把模型能力接入真实任务。但真正的Harness不只是一组组件，还包括后面的任务编排、反馈验证和执行循环。

### 行业定义与官方表述

- LangChain 的一篇 blog（https://blog.langchain.com/the-anatomy-of-an-agent-harness/）中指出：

> Agent = Model + Harness.
> 
> If you're not the model, you're the harness.

- Anthropic 官方文档（https://code.claude.com/docs/en/how-claude-code-works）中指出：

> Claude Code serves as the agentic harness around Claude: it provides the tools, context management, and execution environment that turn a language model into a capable coding agent.
> 
> 翻译： Claude Code 是一个智能体编排框架，包裹在 Claude 模型外面。它提供工具、上下文管理和执行环境，把一个语言模型变成一个有能力的编码 Agent。

### 核心理解：Agent = Model + Harness

单独的 Model 只能根据输入生成输出；Agent 之所以能持续完成任务，是因为它在 Model 外面增加了一层 Harness，把模型的推理、生成和工具选择能力接入真实任务流程。

- Model：提供推理、生成和工具选择能力。
- Harness：提供工具、上下文、状态、编排、验证和约束，让模型能在真实环境里持续、稳定、可验证地把事做完。

> ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 运行机制：编排循环（Orchestration Loop）

上图中间的核心是 Orchestration Loop（编排循环）。它不是一次性的模型调用，而是一个持续迭代的运行机制：

> Observe -> Model Call -> Act -> Environment -> Observe

每一轮里：

- Observe：Harness 收集用户输入、环境反馈、工具结果和当前状态。
- Model Call：Harness 将 Context Window、工具定义、历史消息等组装后发给 Model，让模型判断下一步该回答、继续规划，还是调用工具。
- Act：Harness 执行模型给出的动作，比如调用 API、搜索、运行代码、向用户追问，或者给出最终答案。
- Environment：动作作用到外部环境后，新的反馈再回到 Observe，形成闭环，直到任务完成。
- Planning 负责把复杂任务拆成步骤，决定当前应该推进哪一步。
- Guardrails 负责安全、权限和人审，比如哪些数据能访问、哪些操作需要确认、哪些动作不能执行。
- Tools 是 Harness 在 Act 阶段可调用的外部能力，例如 API、搜索、代码执行。
- Memory Store（记忆存储）偏长期，例如用户偏好、历史摘要、跨会话信息。编排循环会按需检索，也可能在任务结束后写入新的重要信息。
- Context Window（上下文窗口）是本轮发给模型的上下文窗口，偏临时和工作态。它由 Harness 动态组装，里面可能包含用户当前输入、系统状态、工具返回结果、从 Memory 检索出的相关记忆等。

### 实例：Claude Code 一次请求的生命周期（基于源码）

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

> 一次请求的真实流程更接近：
> 
> 用户输入 -> 上下文组装 -> 模型推理 -> 工具调用 -> 结果回填 -> 继续推理 ->......

这张图展示了 Claude Code 一次请求从用户输入到结果回填的完整生命周期，核心在于模型调用被包在一个显式的 while循环里，它不是一次性问答，而是一个由 Harness 驱动的循环系统。整体分四层：

- 输入层：REPL.onSubmit() 先判断是不是即时命令（如/clear）。即时命令直接在本地执行、不进入模型循环，避免浪费一次模型调用。
- 上下文准备：非即时命令进入 onQueryImpl()，Harness 组装 system prompt、工具定义和对话历史，再判断是否需要 compact压缩上下文（保留目标、关键发现、已修改内容），然后通过 queryLoop()进入智能体循环。
- 智能体循环（每一轮做三件事）：
- 组装消息列表：messages = system + user + history + tool\_result
	- 流式请求模型：POST /v1/messages(stream)
	- 按 SSE content block 类型分发：text 实时渲染、tool\_use 交给工具执行器、stop 本轮收尾
- 工具执行与结果回填
- StreamingToolExecutor 先做并发安全判断（isConcurrencySafe()）—— 只读工具（Read / Grep / Glob）并发执行，带副作用的工具（Edit / Write / Bash）串行执行。
	- 再做权限检查（permission check / sandbox），通过才真正访问工作区，失败则把错误作为 observation 注入下一轮。
	- 工具结果会作为 tool\_result 回填到 messages，带着新 observation 进入下一轮循环，直到模型返回 stop 且本轮没有新的 tool\_use。

## 为什么需要 Harness

### 现实落差

LLM 本质上是无状态的：

- 无记忆：上一轮对话内容，模型完全不知道（除非重新喂给他）
- 无决策：模型不会主动决定下一步做什么，只回答当前问题
- 无行动：模型不能读文件、不能调用API、不能执行任务操作 但我们希望它能 **做事** ：写代码并运行、修 bug 并验证、记住之前的工作、在长任务中保持连贯。

### 典型失败模式

为什么之前看似合理的方案总是失败呢？如 Anthropic 说的 Naive Agent：

- One-Shot 问题：模型试图一次性完成任务，缺乏分解和迭代。
- Context 丢失：跨 Session 后无法理解当前状态。
- 状态污染：上下文混乱，决策不一致。
- 假完成：功能只实现了部分，但是模型认为已经完成了。

### 结论

失败往往不是模型不够聪明，而是没有有效的 Harness 来控制整个流程。如果没有结构化控制、状态管理和验证机制，模型就会像脱缰的野马，越跑越偏。所以，解决方案不是只训练更强的模型，而是把系统设计得更可控。 由于“希望”和“现实”之间的落差，就产生了 Harness。

### 代表案例

- OpenAI 用 Codex 从零开始生成了一个几乎完全由智能体构建的软件项目：5 个月里，一个最初只有 3 人、后来扩展到 7 人的小团队，主要通过 Codex 生成和推进代码变更，推动了约 1500 个 PR，让仓库增长到约 100 万行代码，并把产品交付给数百名真实内测用户使用。
- LangChain Deep Agents 实验（2026-03），同模型，换 Harness，性能提升 13.7 个百分点。

## 什么是 Harness Engineering

如果说 Harness 是模型外面的运行系统，那么 Harness Engineering 就是设计、配置、调优和治理这套系统的工程方法。

**本质** ：不是在教模型怎么回答，而是在设计模型怎么工作。

**核心** ：如何给Agent提供执行环境、状态、编排、上下文、反馈、约束，并让这些控制手段持续可迭代。

**目标** ：把模型能力转化成可控的、可靠的、可持续的生产能力。

## 从 Prompt Engineering 到 Harness Engineering

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

- Prompt Engineering：解决“怎么描述”。优化单次模型调用里的指令表达。
- Context Engineering：解决“让模型看到什么”。动态管理模型可见的信息，包括文档、代码、历史消息、检索结果、项目规则和工具返回结果。
- Harness Engineering：解决“整个系统如何运转”。设计模型外部的运行系统，包括工具、状态、上下文、任务编排、权限、验证、反馈和恢复机制。 三者不是替代关系，而是包含关系：

> Prompt 是 Context 的一部分，Context 管理是 Harness 的一部分。

## 3\. Harness Engineering 核心能力

## 3.1 执行环境：给模型一块能动手的工作区

**问题** ：模型本身只能生成文本，不能直接读文件、改代码、运行测试。

**Harness 设计** ：在模型外面搭一块受控的执行环境，再通过工具把它暴露给模型。

**Claude Code 中的体现** ：默认在工作目录里跑 Bash 子进程，开启沙箱后做进程隔离和网络白名单过滤；Read / Edit / Write / Bash / WebFetch / WebSearch / Glob / Grep等内置工具是这块运行时的 API；外部能力通过 MCP 接入。

## 3.2 状态管理：让 Agent 知道任务做到哪一步

**问题** ：模型每次调用都是一次无状态计算。如果没有外部状态，长任务很容易断裂。

**Harness 设计** ：通过文件系统、会话历史、工具结果、任务列表等机制保存状态。

**Claude Code 中的体现** ：维护 task list，用来跟踪当前多步骤任务的进度；文件变更 + Git 提供状态快照；上下文压缩让长会话在压缩后仍能继续推进。

## 3.3 任务编排：从一次回答变成持续执行

**问题** ：复杂工程任务无法靠一次模型回答完成。

**Harness 设计** ：把任务组织成一个持续循环：用户输入 -> 上下文组装 -> 模型推理 -> 工具调用 -> 结果回填 -> 继续推理。模型每一轮只基于当前状态决定下一步，Harness 负责执行动作、更新环境，并驱动下一轮，直到任务完成。

**Claude Code 中的体现** ：Claude Code 会把一次开发任务拆进 queryLoop() 循环：模型每轮只决定下一步，Harness 执行工具并把tool\_result 回填给模型，让模型基于新的 observation 继续修正，直到任务完成或需要用户确认。

## 3.4 上下文管理：决定什么信息进入模型

**问题** ：模型上下文窗口有限，长任务会不断积累历史、日志、代码和工具结果。如果不做筛选，真正重要的信息反而会被淹没。

**Harness 设计** ：动态组装上下文，决定哪些信息保留、哪些信息压缩、哪些信息重新注入，让模型在每一轮都优先看到当前任务最相关的内容。

**Claude Code 中的体现** ：通过 /compact 压缩长对话；通过 CLAUDE.md / CLAUDE.local.md、rules files 和 auto memory 提供项目规则、常用命令和团队约定；skills 只在被使用时才加载；SubAgents 则把探索性工作隔离到独立上下文窗口中，只把结果带回主流程；这样，模型在有限上下文窗口里优先看到当前步骤最相关的信息。

## 3.5 反馈与验证：让 Agent 知道自己做得对不对

**问题** ：模型会给出看似合理的答案，但它自己并不知道代码是否真的能运行。

**Harness 设计** ：通过测试、lint、build、日志、截图、评审结果等外部反馈验证结果；同时记录执行过程和失败原因，形成可观测、可复盘的修正闭环。

**Claude Code 中的体现** ：通过 Bash 运行 test、lint、build 等命令，把报错、日志和检查结果作为外部反馈带回后续推理；也可以通过 hooks 在 PreToolUse、PostToolUse 等节点接入校验脚本触发格式化、检查和测试；对于 UI 或端到端场景，还可以通过 MCP 接入浏览器自动化或其他外部验证工具，把运行结果纳入下一轮修正。

## 3.6 约束与治理：让 Agent 在边界内自由发挥

**问题** ：Agent 能操作真实环境后，风险也随之增加。文件修改、命令执行、网络访问都需要边界。

**Harness 设计** ：通过权限、策略、沙箱隔离和自动化规则限制 Agent 行为，让它在安全边界内自由发挥。

**Claude Code 中的体现** ：permission modes （acceptEdits、plan等）决定整体自动化程度，用 allow / ask / deny 规则约束具体工具调用的边界，如：deny配置Bash(rm -rf \*)，并通过 sandbox 对 Bash 的文件系统和网络访问施加隔离；同时还可借助 hooks 在PreToolUse、PostToolUse、Notification、Stop、SessionStart 等生命周期节点挂接自定义逻辑。几者结合起来，形成了一套“可放权、可收口、可隔离”的治理体系。

## 关于设计原则：Harness 不是越复杂越好

Harness Engineering 并不是“能力堆得越多越好”，而是要让复杂度和模型能力、任务复杂度、团队流程匹配。

### 工具不是越多越好

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**案例** ： Vercel最初给Agent配置了全面的工具库，Agent变得困惑、进行冗余调用、执行不必要的步骤，然后，Vercel移除了80%的工具，反而获得了更好的效果：更少的步骤、更少的token消耗、更快的响应、更高的成功率。

### Harness 是可拆卸的

模型能力变了，Harness 也要跟着变： Sonnet 4.5 模型有上下文焦虑倾向，所以 Harness 设计了上下文重置机制。但 Opus 4.5 之后，模型自行消除了这个行为，Harness 的重置机制就没必要了，需要删除。 所以，过度工程化的 Harness 在模型升级后反而可能成为包袱。

## 4\. 头部公司Harness架构

## Claude Code 长任务 Harness：多Agent 架构

> 这里的 Agent 更接近 Harness 中的职责角色或独立工作单元，不必等同于 Claude Code 里的 SubAgent。

### 双 Agent 架构

- 初始化 Agent：作为第一个会话，然后专门负责搭建环境；
- 编码 Agent：在后续每个会话中作出增量进展，并为下一个会话留下清晰的交接物。

双 Agent 架构解决了“跨会话续跑”，但暴露了两个新问题（Anthropic 原文）：

- Self-evaluation bias：模型自评总是“乐观”的，几乎总给自己高分，哪怕产物明显粗糙。
- Context anxiety：Sonnet 4.5 在误判自己快到上下文上限时，会主动提前收尾，把未完成的工作包装成“已完成”。

### 三 Agent 架构

这种架构的关键在于： **生成-评估** 分离。

- Planner（规划者）：把模糊需求展开成完整产品规格。
- Generator（生成者）：
- 契约：与 Evaluator 协商每轮冲刺目标和验收标准
	- 执行：分阶段实现，Git 版本控制保证可回溯
	- 返工：根据 Evaluator 反馈迭代
- Evaluator（评估者）：独立于 Generator 的质量把关角色，替代模型自我评估，防止过度乐观偏差。

#### Anthropic 的实验对比

三 Agent Harness 跑 6 小时、花费约 200 美元，产出了相对完整可用的应用；单 Agent 跑 20 分钟、花费约 9 美元，产物明显残缺。差距不只在模型，而在 Harness 是否形成了规划、生成、验证和返工闭环。

## OpenAI Codex Harness 实践：把工程环境变成 Agent 可工作的系统

- Generator：Codex CLI 本地生成代码变更、推 PR。
- Reviewer：PR 同步时，独立的 Reviewer 自动触发，带自己的 prompt 约束；Generator 可以反驳 Reviewer 意见，通过多轮迭代直到所有 Reviewer 满意。 也是 **生成-评估** 分离

> 延伸：Codex 工程实践的三大支柱
> 
> - Context Engineering：把 AGENTS.md 当入口，架构文档、产品规格、技术债等沉淀到结构化 docs
> - 架构约束：通过自定义 linter、结构测试、CI、分层和依赖规则机械化约束 Agent 输出
> - 工程清理：周期性文档整理、过期规则清理、技术债追踪和自动 PR
> 
> 核心模式：当 Agent 遇到困难时，反推工程环境缺少什么支撑——缺上下文补知识库、缺边界补架构约束、缺反馈补测试。

## Aletheia（Google）

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) **生成-评估** 分离

## 总结

Anthropic、Google、OpenAI 三家独立走到了同一设计模式上，说明，生成-评估分离正在成为Harness设计的行业共识。

## 5\. 为什么很多人认为 Claude Code 是最强 Agent

回到开头的问题“很多人说 Claude Code 强，到底强在哪？”

答案不是单点取胜，而是 **模型 × Harness × 协同 × 生态** 四者叠加的结果。

## 模型层面：Claude 的训练向 Agent 任务深度倾斜

Claude 系列在工具调用、长上下文、多步推理、长任务规划上的训练特别充分。它不只是"会写代码"，而是被训练成能在工具反馈、错误日志、文件状态之间持续推理的工程协作者。这是 Harness 敢把控制权交给模型的前提。

## Harness 层面：六项能力全栈完整

第 3 节列出的六项核心能力——执行环境、状态管理、任务编排、上下文管理、反馈与验证、约束与治理——Claude Code 全部做到位。很少有 Agent 产品把这六项同时覆盖完整。

## 协同层面：模型与 Harness 是一起设计的

这是 Claude Code 区别于第三方 Agent 的关键。Anthropic 同时设计模型和 Harness，模型在训练阶段就"知道"自己会跑在 Claude Code 里。

什么时候该调用 TodoWrite、什么时候该压缩上下文、什么时候该让用户确认、Bash 失败后应该怎么读 stderr 继续推理——这些行为是 **模型行为与 Harness 约定的双向协同结果** ，而不是 prompt 临时拼出来的。

第三方 Harness 即便接入同样的 Claude 模型，也很难复现这种默契；反过来，把其他模型套进 Claude Code 的 Harness 里，效果通常也会打折。 **模型与 Harness 的协同设计，本身就是一种壁垒。**

## 生态层面：可扩展、可沉淀、可分发

Skills 让任务经验可复用，SubAgents 让复杂任务可拆分，Hooks 让确定性动作可固化，MCP 让外部系统可接入，Plugin 让团队规范可分发。这套插件体系让 Claude Code 不只是一个开箱即用的工具，而是一个 **可以被团队不断加固的 Agent 平台** 。

## 一句话总结

Claude Code 的"强"，不是某个单点强，而是 **强模型 + 完整 Harness + 双向协同 + 可扩展生态** 四股力的合力。这也正好回应第 1 节的判断：未来 Agent 的竞争差距，会越来越多地落在 Harness 和协同设计上，而不是单纯比拼模型分数。

## 6\. 用工程化方式使用 Agent

> 2026 年，业务开发人员的分水岭，不再只是“用哪个模型”，而是有没有 Harness Engineering 能力——能把 AI 工程化地接入业务研发流程，让它稳定、可控、可复用地产生价值。

通过理解 Harness 的原理、结构和运行模式，我们不是为了自己造一个 Harness，而是为了更好地把 Agent 的上下文、工具、流程、验证和权限组织起来。 这会让 Agent 使用方式真正工程化，从而更稳定地完成业务开发，例如：

- 用 CLAUDE.md 和.claude/rules/ 沉淀项目上下文：项目规则、构建命令、代码风格、模块边界、目录级规则和常见坑点，使 Agent 每次进入项目时都有稳定上下文。
- 用 Skill 沉淀可复用的任务经验：比如如何排查某类问题、如何做某类重构、如何按团队规范生成代码。
- 用 MCP 接入外部系统和内部工具：让 Agent 能访问必要的数据、接口、文档、日志和业务工具。
- 用 Hook 固化确定性动作：格式化、lint、test、build、安全检查、通知等，不依赖模型每次自己想起来。
- 用 headless CI/CD 接入无人值守场景：把 Agent 放进非交互式流水线，让它执行自动修复、回归检查、依赖升级、文档生成、变更摘要等固定任务，并通过 CI 结果、日志、PR 和权限策略形成可审计闭环。
- 用 SubAgent 拆分复杂任务：把探索、实现、验证、评审等不同职责拆开，实现上下文隔离和职责拆分。
- 用权限控制管理风险：低风险操作可以 allow 自动执行；删除文件、修改配置、批量重构、执行危险命令等高风险操作应该进入 ask 人工确认，或者直接 deny 禁止。
- 如果这些能力需要跨项目复用，可以进一步用 Plugin 打包分发，让团队共享同一套 Agent 使用规范。

继续滑动看下一个

澄旭

向上滑动看下一个