---
title: 第二章：Agent 核心架构
type: tutorial
tags: [ai-agent, architecture, harness-engineering, memory, tutorial]
created: 2026-05-29
updated: 2026-05-29
sources:
  - Wiki/wiki/concepts/harness-engineering.md
  - Wiki/wiki/concepts/agent-memory-systems.md
  - Wiki/wiki/concepts/agent-self-evolution.md
  - Wiki/wiki/concepts/agent-context-compression.md
  - Wiki/wiki/topics/hermes-architecture-deep-dive.md
related:
  - 01-AI Agent基础概念.md
  - 03-主流Agent工具.md
  - AI Agent 学习指南.md
---

# 第二章：Agent 核心架构

> 从「能用 Agent」到「理解 Agent 为什么能工作」——深入 Harness Engineering、记忆系统、上下文压缩和自进化机制。

---

## 2.1 Harness Engineering：2026 年最重要的 Agent 方法论

### 核心公式

```
Agent = Model + Harness
```

这不是一个简单的加法。如果 Model（模型）是大脑，**Harness 就是包裹在模型外面的整个运行系统**。

2026 年行业共识：**拉开 Agent 差距的不是模型本身，而是 Harness 的设计水平。**

### 为什么单独的模型不够？

LLM 本质上有三个短板：

| 短板 | 表现 | Harness 如何补足 |
|------|------|-----------------|
| **无记忆** | 每次调用都是「失忆」状态 | 状态管理、记忆系统、会话历史 |
| **无决策** | 只回答当前问题，不规划下一步 | 编排循环——每轮基于状态决定下一步 |
| **无行动** | 只能生成文本，不能操作世界 | 工具系统——读文件、执行命令、调 API |

### 编排循环：Agent 的心跳

```
         ┌──────────────────────────┐
         │      Observe（观察）       │
         │  收集：用户输入+环境反馈    │
         │  +工具结果+当前状态        │
         └──────────┬───────────────┘
                    ↓
         ┌──────────────────────────┐
         │    Model Call（思考）      │
         │  组装上下文 → 模型推理     │
         │  → 决定下一步动作          │
         └──────────┬───────────────┘
                    ↓
         ┌──────────────────────────┐
         │      Act（行动）           │
         │  执行工具调用：写文件、     │
         │  跑命令、调 API、搜索等     │
         └──────────┬───────────────┘
                    ↓
         ┌──────────────────────────┐
         │   Environment（环境）      │
         │  动作产生反馈 → 回到观察    │
         └──────────────────────────┘
```

每一轮循环约 2-5 秒，一个复杂任务可能需要 10-50 轮循环。这就是为什么 Agent 做复杂任务需要几分钟甚至几小时。

### Harness 六大核心能力

| 能力 | 要解决的问题 | Claude Code 如何实现 |
|------|------------|-------------------|
| **1. 执行环境** | 模型没手没脚，怎么做事？ | Bash 子进程 + 沙箱 + Read/Write/Edit 工具 |
| **2. 状态管理** | 任务做到哪了？ | Task List + 文件变更 + Git 快照 |
| **3. 任务编排** | 怎么从「答一次」变成「持续做」？ | queryLoop() 循环驱动 |
| **4. 上下文管理** | 窗口不够用，信息太多了 | /compact 压缩 + CLAUDE.md + SubAgent 隔离 |
| **5. 反馈与验证** | Agent 怎么知道做对了？ | test/lint/build 外部反馈 |
| **6. 约束与治理** | 怎么防止 Agent 乱来？ | 权限分级（allow/ask/deny）+ 沙箱 |

> 📚 深入：[[Wiki/wiki/concepts/harness-engineering|Harness Engineering 完整解读]]

### 典型案例：Naive Agent 的失败模式

Anthropic 研究发现，没有有效 Harness 的 Agent 会出现四种典型失败：

| 失败模式 | 表现 | Harness 解法 |
|---------|------|------------|
| **One-Shot 问题** | 试图一次性完成，缺乏分解和迭代 | 任务编排 → 强制多步执行 |
| **Context 丢失** | 跨 Session 后无法理解当前状态 | 状态管理 → Git 快照 + 会话历史 |
| **状态污染** | 上下文混乱，决策不一致 | 上下文管理 → 压缩 + 隔离 |
| **假完成** | 功能只实现了部分，模型认为完成了 | 反馈验证 → test/lint 强制检查 |

> 失败往往不是模型不够聪明，而是没有有效的 Harness。

---

## 2.2 Agent 记忆系统：三层架构

记忆系统决定了 Agent 如何跨会话、跨任务保留和利用信息。这是 Agent 「越用越聪明」的基础。

### Hermes 的三层记忆（业界最完整实践）

```
┌─────────────────────────────────────────────┐
│ 第一层：内置记忆（Built-in Memory）           │
│ MEMORY.md（Agent 笔记本）+ USER.md（用户画像） │
│ 会话开始时冻结快照 → 整个会话不变               │
│ → 为了前缀缓存命中                            │
├─────────────────────────────────────────────┤
│ 第二层：外部记忆（MemoryProvider）             │
│ Honcho / Mem0 / Hindsight 等 8 种 Provider    │
│ 语义检索、用户建模、跨会话画像                  │
│ → 长期积累，按需注入                          │
├─────────────────────────────────────────────┤
│ 第三层：会话搜索（session_search）             │
│ FTS5 全文搜索 → LLM 摘要 → 返回给主模型        │
│ → 不把原始对话堆进上下文，先压缩再呈现           │
└─────────────────────────────────────────────┘
```

### 关键设计：记忆 ≠ 搜索

```
搜索（session_search）：
  - 按需检索 → 临时上下文 → 用完即弃
  - 不会自动变成持久记忆

记忆（memory 工具写入）：
  - 主动沉淀 → 持久化到磁盘 → 下次会话自动加载
  - 只有这条路通向真正的「长期记忆」
```

**两条通道各管各的**：Session 链保原始数据不丢，记忆系统保经验沉淀不丢。

### 冻结快照的设计智慧

为什么 Hermes 在会话开始时冻结记忆快照，而不是实时更新？

> 为了**前缀缓存命中**。如果每轮写记忆都改系统提示词，缓存就无法命中。这是一致性换性能的工程权衡。

> 📚 深入：[[Wiki/wiki/concepts/agent-memory-systems|Agent 记忆系统设计]]

---

## 2.3 Agent 上下文压缩

长任务中，上下文窗口是最稀缺的资源。一个复杂 Agent 任务可能产生数十万 token 的对话历史，远超模型窗口限制。

### 两种压缩策略

| 策略 | 做法 | 优点 | 缺点 |
|------|------|------|------|
| **压中间** | 保留头（系统提示词）和尾（最新对话），压缩中间 | 保留最近的上下文 | 可能丢失关键中间信息 |
| **压头部** | 用 Session 链：上轮摘要 → 下轮开头 | 结构清晰 | 摘要质量决定信息保真度 |

### Session 链机制

```
Session 1: 完整对话（100K tokens）
    ↓ 压缩 → 摘要（5K tokens）
Session 2: 摘要 + 新对话（100K tokens）
    ↓ 压缩 → 摘要（5K tokens）
Session 3: 摘要 + 新对话...
```

**关键**：不是无限套娃——Hermes 在压缩前会调用 `on_pre_compress` 钩子，把关键信息摘出来存入外部记忆，保证不丢。

> 📚 深入：[[Wiki/wiki/concepts/agent-context-compression|Agent 上下文压缩]]

---

## 2.4 Agent 自进化：从「用 Agent」到「养 Agent」

### 什么是自进化？

> 把一次次任务执行中产生的经验重新回收，再沉淀成新的 Skill、规则或工作方法。

```
交互数据积累 → 经验提炼 → 知识沉淀 → 下一轮效果提升
```

与 AI 知识库自进化的区别：
- 知识库自进化 = **数据飞轮**：沉淀的是「答案」
- Agent 自进化 = **方法飞轮**：沉淀的是「做事方法」

### Hermes 的双信号机制

Hermes 的技能自进化**没有一行硬编码的自动触发逻辑**，完全靠两条信号：

**信号一：系统提示词主动引导（三层 Prompt）**
1. 告诉 Agent 什么时候该创建技能
2. 列出五条创建条件和三条更新条件
3. 使用技能时督促它持续改进

**信号二：后台强制复盘**
- 每 10 轮模型推理触发一次技能复盘
- 独立后台线程，不抢用户任务的模型资源
- 复盘在回复发给用户**之后**才启动

> Agent 自己主动存是理想情况，后台线程是防止它漏掉或偷懒的保险。

### 技能沉淀的触发条件

Agent 会在以下情况倾向于沉淀 Skill：
1. 完成了复杂任务（5+ tool calls）
2. 中途遇到错误但最终找到可行路径
3. 用户纠正了它的做法
4. 识别出可复用的多步骤方法链

### 实战案例：内容创作技能自沉淀

Agent 帮用户完成「热点话题多平台内容创作」后，自动生成了技能文件：

```markdown
---
name: hot-topic-content-creation
description: "热点追踪与多平台内容创作技能"
---
# 热点内容创作流程
## 步骤
1. 搜索当前平台热门话题/趋势
2. 分析热点关键词，确定内容切入角度
3. 根据话题生成配图
4. 撰写小红书笔记：标题党+口语化正文+话题标签
5. 基于同一话题改写公众号长文
6. 生成发布建议
```

下次你说「追个热点写内容」，Agent 直接调用这个技能，不再需要逐步指导。

> 📚 深入：[[Wiki/wiki/concepts/agent-self-evolution|Agent 自进化]]

---

## 2.5 Hermes 五层架构速览

理解一个具体 Agent 的架构，比抽象理论更有帮助。Hermes Agent 是开源 Agent 中架构最完整的：

```
第一层：适配器层（Adapter Layer）
  20+ 消息平台统一入口 → Gateway 标准化消息格式

第二层：网关层（Gateway Layer）
  Profile 隔离 + 权限管理 + 智能审批

第三层：主循环层（Agent Loop）
  迭代预算 + PTC + 工具并行 + 子 Agent 委托

第四层：扩展层（Extension Layer）
  系统提示词（模型特定引导 + 安全扫描 + 前缀缓存优化）

第五层：存储层（Storage Layer）
  会话链 + 记忆写入 + 技能沉淀
```

> 📚 深入：[[Wiki/wiki/topics/hermes-architecture-deep-dive|Hermes 五层架构深度拆解]]

---

## 2.6 Superpowers 设计哲学：Agent 安全的四个原则

来自 Superpowers 的 Agent 行为约束设计，可作为任何 Agent 系统的安全参考：

| 原则 | 含义 | 实践 |
|------|------|------|
| **铁律 + 硬门控** | 某些规则不可绕过 | `rm -rf /` 绝对拦截 |
| **合理化防范** | 每个约束有明确理由 | 不是「不许做 X」而是「X 会导致 Y 后果」 |
| **人的搭档** | Agent 是搭档不是替代 | 关键决策需人类确认 |
| **CSO（首席安全官）** | 独立角色把关安全 | Reviewer Agent 独立审查 |

> 📚 深入：[[Wiki/wiki/concepts/superpowers-design-philosophy|Superpowers 设计哲学]]

---

## 自测清单

学完本章，你应该能回答：

- [ ] 解释 Harness Engineering 的核心公式和六大能力
- [ ] 画出 Agent 编排循环的四个阶段
- [ ] 说明三层记忆架构中每层的作用和设计考量
- [ ] 解释「冻结快照」为什么是为了缓存命中
- [ ] 区分上下文压缩的两种策略（压中间 vs 压头部）
- [ ] 说出 Agent 自进化的双信号机制
- [ ] 理解「记忆 ≠ 搜索」这个关键区分

---

> 🎯 **下一步**：[[03-主流Agent工具|第三章：主流 Agent 工具]]——全面对比 Claude Code / Codex / OpenClaw / Hermes 四大工具。
>
> 📖 **延伸阅读**：[[../../Wiki/wiki/concepts/ai-agent#七大核心工程模块|AI Agent 七大核心工程模块]]——从 Token/Skill/Prompt/RAG/MCP/SDD/Harness 三层架构理解 Agent 的全景技术栈。
