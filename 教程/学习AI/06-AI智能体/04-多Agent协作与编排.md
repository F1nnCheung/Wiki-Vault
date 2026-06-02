---
title: 第四章：多 Agent 协作与编排
type: tutorial
tags: [ai-agent, multi-agent, orchestration, agentic-engineering, tutorial]
created: 2026-05-29
updated: 2026-05-29
sources:
  - Wiki/wiki/concepts/agentic-engineering.md
  - Wiki/wiki/comparisons/agent-orchestration-frameworks.md
  - Wiki/wiki/topics/hermes-multi-agent.md
  - Wiki/wiki/entities/everything-claude-code.md
related:
  - 03-主流Agent工具.md
  - 05-Agent实战指南.md
  - AI Agent 学习指南.md
---

# 第四章：多 Agent 协作与编排

> 单个 Agent 解决单个任务。真正的生产力跃迁来自多 Agent 协作——让 Agent 团队像人类团队一样分工配合。

---

## 4.1 Agentic Engineering：从单兵到团队

### Karpathy 的范式升级

2025 年初，Andrej Karpathy 提出 **Vibe Coding**：用自然语言描述需求，让 AI 「凭感觉」编程。

2026 年初，他升级为 **Agentic Engineering**：多个 AI Agent 自主完成规划→编写→测试→审查全流程，人类退后为架构师和监督者。

```
Vibe Coding（2025）              Agentic Engineering（2026）
人→AI→人检查                    AI 团队→自主规划→执行→验证→上报
单个 AI 生成代码                 多个 AI Agent 分工协作
质量不确定                       审查闭环保证
```

### 五角色模型

| Agent 角色 | 职责 | 输 出 |
|-----------|------|------|
| **Planner** | 分析需求，制定实现计划 | 任务分解、实现步骤、验收标准 |
| **Coder** | 按计划编写代码 | 功能代码、单元测试 |
| **Tester** | 运行测试，验证功能 | 测试报告、Bug 列表 |
| **Reviewer** | 独立审查代码质量 | 审查意见、改进建议 |
| **Human** | 定义架构边界、做关键决策 | 需求澄清、架构把关、最终验收 |

> 📚 深入：[[Wiki/wiki/concepts/agentic-engineering|Agentic Engineering]]

---

## 4.2 生成-评估分离：三大公司的共识

### 行业共识的形成

Anthropic、Google、OpenAI 三家独立研发，不约而同走到了同一设计模式：

```
Generator（生成者）──→ 产出代码/方案
    ↓
Evaluator（评估者）──→ 独立审查，提出修改意见
    ↓
Generator ──→ 根据反馈修改
    ↓
循环直到 Evaluator 满意
```

### Anthropic 的三 Agent 架构

| Agent | 职责 |
|-------|------|
| **Planner** | 把模糊需求展开成完整产品规格 |
| **Generator** | 与 Evaluator 协商每轮冲刺目标，分阶段实现 |
| **Evaluator** | 独立质量把关，替代模型自我评估 |

**实验数据**：三 Agent 架构跑 6 小时、花费 $200，产出完整可用应用；单 Agent 跑 20 分钟、花费 $9，产物明显残缺。**质量差距是数量级的。**

### OpenAI Codex 的实现

```
Generator（Codex CLI）→ 本地生成代码变更 → 推 PR
Reviewer（独立 Agent）→ 自动触发审查 → 提修改意见
Generator → 可反驳 Reviewer → 多轮迭代
循环直到所有 Reviewer 满意
```

### 为什么要分离？

模型自我评估不可靠——它会对自己刚生成的代码「偏心」。独立 Evaluator 提供了真实的第二意见，就像代码审查必须有另一个人来看。

---

## 4.3 Agent 编排框架对比

当你需要自己搭建多 Agent 系统（而非使用现成的 Agent 产品），就需要编排框架。

### 三大框架定位

| 框架 | 一句话 | 语言 | 适合 |
|------|--------|------|------|
| **LangChain** | LLM 应用基础框架 | Python/JS | 简单 RAG、线性管道 |
| **LangGraph** | 有状态图编排引擎 | Python/JS | 循环推理、多 Agent |
| **Spring AI Alibaba Graph** | Java 企业级图编排 | Java | Spring 生态、企业级 |

### 架构差异

```
LangChain:  Chain（线性管道）
  A → B → C → D
  适合：简单顺序任务

LangGraph / Spring AI Alibaba Graph:  有向图（支持循环）
  A → B → C
  ↑       ↓
  └── E ← D
  适合：需要循环推理、条件分支的复杂 Agent
```

### 执行模型对比

| 能力 | LangChain | LangGraph | Spring AI Alibaba Graph |
|------|-----------|-----------|------------------------|
| 循环/回溯 | ❌ | ✅ | ✅ |
| 并行节点 | 有限 | ✅ | ✅ |
| Human-in-the-loop | 手动 | ✅ 内置断点 | ✅ |
| 嵌套图 | ❌ | ✅ SubGraph | ✅ |
| 可视化调试 | ❌ | 付费(LangSmith) | ✅ 免费 Studio |
| 低代码建图 | ❌ | ❌ | ✅ 拖拽生成代码 |

### 选型公式

```
技术栈（Python / Java）
  ×
任务复杂度（线性 / 循环推理）
  ×
企业级需求（免费工具 / 阿里云生态）
```

> 📚 深入：[[Wiki/wiki/comparisons/agent-orchestration-frameworks|编排框架完整对比]]

---

## 4.4 多 Agent 角色分工实战

### Hermes Multi-Agent Profile 机制

Hermes 通过 Profile 隔离机制实现真正的多 Agent 协作：

```
~/.hermes/profiles/
├── default/        ← 项目经理/架构师
│   ├── SOUL.md     「你是项目经理，负责全局协调」
│   └── AGENTS.md   「管理项目进度，分配任务」
├── coder/          ← 编码专家
│   ├── SOUL.md     「你是资深全栈工程师」
│   └── AGENTS.md   「技术栈：Next.js + TypeScript」
└── research/       ← 研究助手
    ├── SOUL.md     「你是技术研究员」
    └── AGENTS.md   「擅长文献检索和技术调研」
```

每个 Profile 有独立的配置、密钥、记忆和会话，互不干扰。

### Kanban 四角色架构

Hermes 的 Kanban 任务编排系统：

| 角色 | 职责 |
|------|------|
| **Orchestrator** | 接收用户目标 → 分解为子任务 → 分配到 Board |
| **Dispatcher** | 从 Board 取任务 → 分配给最合适的 Worker |
| **Worker** | 执行具体任务 → 完成后通知 Dispatcher |
| **Board** | 看板状态管理 → 可视化任务进度 |

### 实战案例：双 Agent 协同开发爬虫

```
用户：「写一个豆瓣电影 Top 250 的爬虫」

Orchestrator（default）：
  1. 分析需求 → 拆分为 3 个子任务
  2. 创建 Kanban 卡片：
     - 「设计爬虫架构」
     - 「编写爬虫代码」
     - 「数据清洗与存储」

Dispatcher：
  分配「设计架构」→ research Agent
  分配「编写代码」→ coder Agent

research → 分析豆瓣页面结构 → 返回 HTML 解析方案
coder → 基于方案写代码 → 运行测试 → 修复 bug

Orchestrator → 验收 → 生成使用说明 → 交付用户

总耗时：约 12 分钟
```

> 📚 深入：[[Wiki/wiki/topics/hermes-multi-agent|Hermes 多 Agent 团队搭建指南]]

---

## 4.5 ECC：Harness Engineering 的标杆实践

Everything Claude Code（ECC）是目前最完整的多 Agent Harness 开源实践——**60 个专业化 Agent + 228 个 Skill**，覆盖规划→编码→审查→测试→安全全流程。

### ECC 的多 Agent 体系

| Harness 能力 | ECC 对应组件 |
|-------------|-------------|
| 执行环境 | 60 个专业化 Agent，覆盖 12+ 语言和框架 |
| 状态管理 | SQLite 状态存储 + Session 适配器 |
| 任务编排 | Subagent 编排 + PM2 多 Agent 工作流 |
| 上下文管理 | Token 优化 + 智能压缩 |
| 反馈与验证 | 验证循环 + 评估框架（pass@k） |
| 约束与治理 | Rules 体系（17 个语言包）+ AgentShield 安全审计 |

### 关键设计理念

**可拆卸的 Harness**：不是把所有能力堆上去，而是按需装配。通过选择性安装和 Hook 运行时控制，项目只加载它真正需要的 Agent 和 Skill。

> 📚 深入：[[Wiki/wiki/entities/everything-claude-code|ECC 实体页]] · [[Wiki/wiki/topics/ecc-complete-guide|ECC 完整指南]]

---

## 4.6 多 Agent 协作的挑战与对策

### 挑战一：上下文爆炸

多个 Agent 的对话历史叠加 → 上下文窗口迅速耗尽。

**对策**：
- SubAgent 隔离：每个子 Agent 在独立上下文窗口中运行
- 只回传结果摘要，不传完整对话
- 上下文压缩：压中间 + Session 链

### 挑战二：协调开销

Agent 之间需要通信、协商、同步 → 耗时增加。

**对策**：
- 明确职责边界，减少不必要的协商
- 并行执行无依赖的子任务
- Dispatcher 模式统一调度

### 挑战三：级联失败

一个 Agent 的输出是另一个 Agent 的输入 → 一个出错可能级联。

**对策**：
- 每个环节设置验证门禁（gate）
- Evaluator 独立把关
- 失败快速中止并通知人类

---

## 自测清单

- [ ] 解释 Vibe Coding 到 Agentic Engineering 的范式变化
- [ ] 说出五角色模型及每角色职责
- [ ] 理解「生成-评估分离」为什么是行业共识
- [ ] 区分三大编排框架的适用场景
- [ ] 了解 Hermes Kanban 四角色架构
- [ ] 至少了解一个多 Agent 协作的实战案例

---

> 🎯 **下一步**：[[05-Agent实战指南|第五章：Agent 实战指南]]——从零搭建、配置、安全管理，真正动手用起来。
