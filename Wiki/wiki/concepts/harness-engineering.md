---
title: Harness Engineering（编排工程）
type: concept
tags: [harness-engineering, agent, model, orchestration, context-engineering]
created: 2026-05-09
updated: 2026-05-13
sources:
  - raw/articles/Hemmers/从 Claude Code 看 Harness Engineering：2026 年 Agent 真正拉开差距的地方.md
related:
  - entities/hermes-agent.md
  - entities/claude-code.md
  - entities/everything-claude-code.md
  - concepts/agentic-engineering.md
  - concepts/ai-agent.md
  - topics/ecc-complete-guide.md
---

# Harness Engineering（编排工程）

Harness Engineering 是 2026 年 AI Agent 领域的核心方法论：**Agent = Model + Harness**。如果 Model 是大脑，Harness 就是包裹在模型外面的运行系统——提供工具、上下文管理、任务编排、验证反馈和约束治理。

> 2025 年是 Agent 的元年，2026 年将是 Agent Harness 的爆发之年。

## 一、什么是 Harness

### 行业定义

- **LangChain**：「Agent = Model + Harness. If you're not the model, you're the harness.」
- **Anthropic 官方**：「Claude Code serves as the agentic harness around Claude: it provides the tools, context management, and execution environment that turn a language model into a capable coding agent.」

### 核心理解

单独的 Model 只能根据输入生成输出；Agent 之所以能持续完成任务，是因为它在 Model 外面增加了一层 Harness，把模型的推理、生成和工具选择能力接入真实任务流程。

- **Model**：提供推理、生成和工具选择能力
- **Harness**：提供工具、上下文、状态、编排、验证和约束

### 编排循环（Orchestration Loop）

```
Observe → Model Call → Act → Environment → Observe
```

每一轮里：
1. **Observe**：收集用户输入、环境反馈、工具结果和当前状态
2. **Model Call**：组装上下文窗口、工具定义、历史消息发给模型
3. **Act**：执行模型给出的动作（API 调用、搜索、运行代码等）
4. **Environment**：动作作用到环境后，新反馈回到 Observe，形成闭环

## 二、为什么需要 Harness

### LLM 的本质局限

- **无记忆**：上一轮对话内容模型完全不知道（除非重新喂入）
- **无决策**：模型不会主动决定下一步做什么，只回答当前问题
- **无行动**：模型不能读文件、不能调用 API、不能执行任务操作

### 典型失败模式（Anthropic 提出的 Naive Agent）

| 失败模式 | 表现 |
|---------|------|
| **One-Shot 问题** | 模型试图一次性完成，缺乏分解和迭代 |
| **Context 丢失** | 跨 Session 后无法理解当前状态 |
| **状态污染** | 上下文混乱，决策不一致 |
| **假完成** | 功能只实现了部分，模型认为已经完成 |

### 结论

失败往往不是模型不够聪明，而是没有有效的 Harness 来控制整个流程。解决方案不是只训练更强的模型，而是把系统设计得更可控。

## 三、从 Prompt Engineering 到 Harness Engineering

三者不是替代关系，而是包含关系：

```
Prompt Engineering ⊂ Context Engineering ⊂ Harness Engineering
```

- **Prompt Engineering**：解决「怎么描述」——优化单次模型调用里的指令表达
- **Context Engineering**：解决「让模型看到什么」——动态管理模型可见的信息，包括文档、代码、历史、检索结果、项目规则
- **Harness Engineering**：解决「整个系统如何运转」——设计模型外部的运行系统

> Prompt 是 Context 的一部分，Context 管理是 Harness 的一部分。

## 四、Harness Engineering 六大核心能力

### 4.1 执行环境：给模型一块能动手的工作区

模型只能生成文本，不能直接操作文件、改代码、运行测试。Harness 在模型外面搭一块受控的执行环境，通过工具暴露给模型。

**Claude Code 体现**：工作目录里跑 Bash 子进程；沙箱做进程隔离和网络白名单；Read/Edit/Write/Bash/WebFetch 等内置工具就是这块运行时的 API；外部能力通过 MCP 接入。

### 4.2 状态管理：让 Agent 知道任务做到哪一步

模型每次调用都是无状态计算，没有外部状态长任务容易断裂。Harness 通过文件系统、会话历史、工具结果、任务列表等机制保存状态。

**Claude Code 体现**：维护 task list 跟踪多步骤任务进度；文件变更 + Git 提供状态快照；上下文压缩让长会话能继续推进。

### 4.3 任务编排：从一次回答变成持续执行

复杂工程任务无法靠一次模型回答完成。Harness 把任务组织成持续循环，模型每轮只基于当前状态决定下一步，Harness 负责执行动作、更新环境并驱动下一轮。

**Claude Code 体现**：queryLoop() 循环——模型每轮只决定下一步，Harness 执行工具并把 tool_result 回填，直到任务完成或需用户确认。

### 4.4 上下文管理：决定什么信息进入模型

模型上下文窗口有限，长任务不断积累历史。Harness 动态组装上下文——保留、压缩或重新注入信息，让模型每轮都优先看到当前任务最相关的内容。

**Claude Code 体现**：/compact 压缩长对话；CLAUDE.md / rules files 提供项目规则；Skills 只在被使用时才加载；SubAgents 把探索工作隔离到独立上下文窗口。

### 4.5 反馈与验证：让 Agent 知道自己做得对不对

模型会给出看似合理的答案，但不知道代码是否真能运行。Harness 通过测试、lint、build、日志等外部反馈验证结果。

**Claude Code 体现**：Bash 运行 test/lint/build，报错作为外部反馈带回推理；Hooks 在 PreToolUse/PostToolUse 节点接入校验脚本；MCP 接入浏览器自动化做端到端验证。

### 4.6 约束与治理：让 Agent 在边界内自由发挥

Agent 能操作真实环境后风险也随之增加。Harness 通过权限、策略、沙箱隔离和自动化规则限制行为。

**Claude Code 体现**：permission modes 决定自动化程度；allow/ask/deny 规则约束工具调用边界；sandbox 对文件系统和网络访问施加隔离；Hooks 在生命周期节点挂接自定义逻辑。

## 五、设计原则：Harness 不是越复杂越好

### 工具不是越多越好

**案例**：Vercel 最初给 Agent 配置了全面的工具库，Agent 变得困惑、冗余调用增多。移除 80% 的工具后反而获得更好的效果：更少步骤、更少 token 消耗、更快响应、更高成功率。

### Harness 是可拆卸的

模型能力变了，Harness 也要跟着变。过度工程化的 Harness 在模型升级后反而可能成为包袱。例如 Sonnet 4.5 的「上下文焦虑」需要重置机制，但 Opus 4.5 自行消除了这个行为，重置机制就需要删除。

## 六、头部公司 Harness 架构：生成-评估分离

### Anthropic 的三 Agent 架构

- **Planner（规划者）**：把模糊需求展开成完整产品规格
- **Generator（生成者）**：与 Evaluator 协商每轮冲刺目标和验收标准，分阶段实现，根据反馈迭代
- **Evaluator（评估者）**：独立于 Generator 的质量把关角色，替代模型自我评估

**实验对比**：三 Agent Harness 跑 6 小时、花费 $200，产出相对完整可用的应用；单 Agent 跑 20 分钟、花费 $9，产物明显残缺。

### OpenAI Codex：同样生成-评估分离

- **Generator**：Codex CLI 本地生成代码变更、推 PR
- **Reviewer**：独立 Reviewer 自动触发，带自己的 prompt 约束；Generator 可反驳，多轮迭代直到所有 Reviewer 满意

**Anthropic、Google、OpenAI 三家独立走到了同一设计模式——生成-评估分离正在成为 Harness 设计的行业共识。**

## 七、为什么 Claude Code 被认为最强

答案不是单点取胜，而是 **模型 × Harness × 协同 × 生态** 四者叠加：

1. **模型层面**：Claude 系列在工具调用、长上下文、多步推理上训练特别充分
2. **Harness 层面**：六大核心能力全栈完整，很少有产品同时覆盖完整
3. **协同层面**：模型和 Harness 一起设计——模型在训练阶段就「知道」自己会跑在 Claude Code 里。第三方 Harness 接入同样模型也很难复现这种默契
4. **生态层面**：Skills 让经验可复用，SubAgents 让任务可拆分，Hooks 让动作可固化，MCP 让外部系统可接入

## 八、行业信号

| 来源 | 内容 | 时间 |
|------|------|------|
| Anthropic 官方 | Effective harnesses for long-running agents | 2025.11 |
| Mitchell Hashimoto | My AI Adoption Journey | 2026.02 |
| OpenAI 官方 | Harness Engineering，约 1500 个自动化 PR | 2026.02 |
| arXiv 2603.05344 | Building Effective AI Coding Agents，形式化定义 | 2026.03 |
| LangChain | Deep Agents，仅调 harness 提升 13.7 个百分点 | 2026.03 |

## 九、实践启示

通过理解 Harness 的原理，不是为了自己造一个 Harness，而是为了更好地把 Agent 的上下文、工具、流程、验证和权限组织起来：

- 用 CLAUDE.md 和 .claude/rules/ 沉淀项目上下文
- 用 Skill 沉淀可复用的任务经验
- 用 MCP 接入外部系统和内部工具
- 用 Hook 固化确定性动作（格式化、lint、test、build）
- 用 SubAgent 拆分复杂任务，实现上下文隔离
- 用权限控制管理风险：低风险 allow，高风险 ask/deny

## 十、Harness Engineering 的标杆实践：ECC

[[entities/everything-claude-code|Everything Claude Code]] 是目前最完整的 Harness Engineering 开源实践。它明确定位为 **Agent Harness 性能优化系统**（The performance optimization system for AI agent harnesses），将 Harness 的六大核心能力工程化为可安装的系统组件：

| Harness 能力 | ECC 对应组件 |
|-------------|-------------|
| **执行环境** | 60 个专业化 Agent，覆盖 12+ 语言和框架 |
| **状态管理** | SQLite 状态存储 + Session 适配器 + Hook 持久化 |
| **任务编排** | Subagent 编排 + PM2 多 Agent 工作流 + 并行化策略 |
| **上下文管理** | Token 优化 + SessionStart 注入 + 智能压缩 |
| **反馈与验证** | 验证循环（Checkpoint/Continuous）+ 评估框架（pass@k） |
| **约束与治理** | Rules 体系（17 个语言包）+ AgentShield 安全审计 + Prompt Defense Baseline |

ECC 特别强调 Harness 的 **可拆卸性**：通过选择式安装（Selective Install）和 Hook 运行时控制（`ECC_HOOK_PROFILE`），实现按需装配而非全量堆叠。参见 [[topics/ecc-complete-guide|ECC 完整指南]]。
