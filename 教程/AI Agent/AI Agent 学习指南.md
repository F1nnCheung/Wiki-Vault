---
title: AI Agent 学习指南
type: tutorial
tags: [ai-agent, agent, learning-plan, tutorial]
created: 2026-05-29
updated: 2026-05-29
sources:
  - Wiki/wiki/concepts/ai-agent.md
  - Wiki/wiki/concepts/agentic-engineering.md
  - Wiki/wiki/concepts/harness-engineering.md
  - Wiki/wiki/concepts/agent-memory-systems.md
  - Wiki/wiki/concepts/agent-self-evolution.md
  - Wiki/wiki/comparisons/agent-frameworks-moc.md
related:
  - 01-AI Agent基础概念.md
  - 02-Agent核心架构.md
  - 03-主流Agent工具.md
  - 04-多Agent协作与编排.md
  - 05-Agent实战指南.md
---

# AI Agent 学习指南

> 从零开始系统学习 AI Agent：理解什么是智能体、掌握核心架构、熟悉主流工具、学会多 Agent 协作，最终能独立搭建和运维自己的 AI Agent。

---

## 学习路线图

本教程按**五个阶段**递进组织，每阶段预估学习时间，建议按顺序学习：

```
阶段一：基础概念（2-3 小时）
  ├── 什么是 AI Agent？与 ChatBot 有什么区别？
  ├── Agent 的 L1-L5 能力层次
  ├── Agent 五大核心组件（感知/规划/执行/记忆/反思）
  └── Agent 发展简史：从对话式 AI 到多 Agent 协同

        ↓

阶段二：核心架构（3-4 小时）
  ├── Harness Engineering：Agent = Model + Harness
  ├── 编排循环（Observe → Think → Act → Observe）
  ├── Agent 记忆系统：三层记忆架构
  ├── Agent 上下文压缩：压中间 vs 压头部
  └── Agent 自进化：Prompt 驱动 vs 后台流水线

        ↓

阶段三：主流工具（4-5 小时）
  ├── Claude Code：终端 AI 编程 Agent
  ├── OpenAI Codex：云端全流程 Agent 平台
  ├── OpenClaw：消息平台个人 AI Agent
  ├── Hermes Agent：自进化 AI Agent
  └── 四大工具横向对比与选型建议

        ↓

阶段四：多 Agent 协作（3-4 小时）
  ├── Agentic Engineering：多 Agent 自主协作范式
  ├── 生成-评估分离架构：行业共识
  ├── Agent 编排框架：LangChain / LangGraph / Spring AI
  ├── 多 Agent 角色分工与 Kanban 任务编排
  └── 实战案例：双 Agent 协同开发

        ↓

阶段五：实战指南（4-6 小时）
  ├── 从零搭建第一个 Agent
  ├── 写规则文件：SOUL.md / AGENTS.md / CLAUDE.md
  ├── Agent 安全与权限管理
  ├── Agent + Obsidian 知识库集成
  └── Agent 进阶：RAG 检索、智能家居控制、学术写作
```

---

## 第一章：AI Agent 基础概念

> 📖 详细内容：[[01-AI Agent基础概念]]

### 1.1 什么是 AI Agent？

AI Agent（智能体）是能**自主感知环境、制定计划、执行多步任务并自我修正**的 AI 系统。区别于普通 ChatBot 的核心是**自主执行能力**——不只是回答问题，而是动手做事。

- ChatBot：你问 → 它答。单轮交互，无记忆。
- AI Agent：你给目标 → 它感知 → 规划 → 执行 → 验证 → 汇报。多步闭环。

### 1.2 Agent 能力层次（L1-L5）

| 层次 | 名称 | 能力 | 典型代表 |
|------|------|------|---------|
| L1 | 对话 AI | 一问一答，无记忆 | ChatGPT 基础版 |
| L2 | 代码补全 | 实时建议，单次操作 | GitHub Copilot 补全 |
| L3 | 任务执行 | 多步操作（读文件→写代码→跑测试） | Cursor Tab |
| L4 | 自主 Agent | 规划→执行→验证→修正 全闭环 | Claude Code / Codex |
| L5 | 多 Agent 协同 | 多个 Agent 分工协作，人类监督 | ECC 60 个 Agent 协同 |

大多数「AI Coding 工具」本质上是 L3-L4 的 Agent。2026 年前沿正在向 L5 推进。

### 1.3 Agent 五大核心组件

| 组件 | 作用 | 举例 |
|------|------|------|
| **感知** | 读取环境信息 | 读文件、API 响应、网页内容、数据库查询 |
| **规划** | 将目标分解为可执行步骤 | 「做一个登录页」→ 拆分为 6 个子任务 |
| **执行** | 调用工具完成每步操作 | 写代码、执行命令、调 API、操作浏览器 |
| **记忆** | 短期（会话上下文）+ 长期（跨会话知识） | MEMORY.md、向量数据库 |
| **反思** | 评估执行结果，自我修正 | 测试失败 → 分析原因 → 修复 → 重新验证 |

> 📚 深入阅读：[[Wiki/wiki/concepts/ai-agent|AI Agent 概念页]] · [[Wiki/wiki/concepts/agentic-engineering|Agentic Engineering]]

---

## 第二章：Agent 核心架构

> 📖 详细内容：[[02-Agent核心架构]]

### 2.1 Harness Engineering：Agent 效能的核心

**Agent = Model + Harness**。如果 Model 是大脑，Harness 就是包裹在模型外面的运行系统——提供工具、上下文管理、任务编排、验证反馈和约束治理。

2026 年行业共识：**拉开 Agent 差距的不是模型本身，而是 Harness 的设计水平。**

Harness 六大核心能力：
1. **执行环境**：给模型一块能动手的工作区
2. **状态管理**：让 Agent 知道任务做到哪一步
3. **任务编排**：从一次回答变成持续执行
4. **上下文管理**：决定什么信息进入模型
5. **反馈与验证**：让 Agent 知道自己做得对不对
6. **约束与治理**：让 Agent 在边界内自由发挥

### 2.2 编排循环

```
Observe（观察）→ Model Call（思考）→ Act（行动）→ Environment（环境）→ Observe
```

每一轮 Agent 收集环境信息 → 模型决定下一步 → 执行工具调用 → 环境反馈进入下一轮——形成一个持续运行的闭环。

### 2.3 Agent 记忆系统

Hermes Agent 开创的三层记忆架构：

| 层级 | 机制 | 作用 |
|------|------|------|
| **内置记忆** | MEMORY.md + USER.md，会话启动时冻结快照 | Agent 的笔记本 + 用户画像 |
| **外部记忆** | 8 种 MemoryProvider（Honcho/Mem0 等） | 语义检索、长期画像 |
| **会话搜索** | FTS5 全文搜索 + LLM 摘要 | 跨会话知识找回 |

关键设计：记忆 ≠ 搜索。搜索是按需检索的临时上下文，记忆是持久化的经验沉淀。两条通道各管各的。

### 2.4 Agent 上下文压缩

长任务中上下文窗口是稀缺资源。两种策略：
- **压中间**：保留头尾，压缩中间冗余部分
- **压头部**：Session 链机制——上一会话摘要作为下一会话的开头

### 2.5 Agent 自进化

**Prompt 驱动 + 后台强制复盘**：Agent 完成复杂任务后，自主判断是否沉淀为 Skill。后台线程每 10 轮强制复盘，防止 Agent 偷懒。

自进化本质上是**方法飞轮**——把成功路径、失败模式和可复用 workflow 回流到 Skills 层。

> 📚 深入阅读：[[Wiki/wiki/concepts/harness-engineering|Harness Engineering]] · [[Wiki/wiki/concepts/agent-memory-systems|Agent 记忆系统]] · [[Wiki/wiki/concepts/agent-self-evolution|Agent 自进化]] · [[Wiki/wiki/concepts/agent-context-compression|上下文压缩]]

---

## 第三章：主流 Agent 工具

> 📖 详细内容：[[03-主流Agent工具]]

### 3.1 工具全景

| 工具 | 定位 | 层次 | Stars | 核心特色 |
|------|------|------|-------|---------|
| **Claude Code** | 终端 AI 编程 Agent | L4-L5 | - | Subagent 并行、CLAUDE.md、MCP/Skills 生态 |
| **OpenAI Codex** | 云端全流程 Agent 平台 | L4 | - | 沙箱安全、Computer Use、Automation |
| **OpenClaw** | 消息平台个人 Agent | L4 | 24.7 万 | 安全优先、5700+ Skills、25+ 渠道 |
| **Hermes Agent** | 自进化 Agent | L4 | 13.7 万 | 自学习闭环、三层记忆、20+ 国内平台 |

### 3.2 快速对比

| 维度 | Claude Code | Codex | OpenClaw | Hermes Agent |
|------|------------|-------|----------|-------------|
| **交互方式** | 终端 CLI | App/CLI/IDE/Cloud | WhatsApp/Telegram/飞书等 | 微信/飞书/Telegram 等 |
| **语言** | TypeScript | TypeScript | Node.js | Python |
| **学习能力** | Skills（人工安装） | Skills（人工安装） | Skills（人工安装） | **自进化** |
| **安全模型** | 权限分级 | 沙箱 3×3 矩阵 | 10+ 安全模块 | 智能审批 |
| **国内友好** | CC Switch 接入国产模型 | 中转 API | 扩展支持 | **原生支持飞书/钉钉/企微** |
| **适合人群** | 开发者 | 开发者/非开发者 | Agent 入门/企业 | 深度用户/探索者 |

### 3.3 选型决策树

```
你的首要需求是什么？
├── 写代码为主 → Claude Code（架构从零）或 Codex（边界清晰的任务）
├── 消息平台交互 → OpenClaw（安全稳定）或 Hermes（国内平台）
├── 希望 Agent 越用越聪明 → Hermes（唯一自进化）
├── 企业安全合规 → OpenClaw
├── 想快速体验 Agent → OpenClaw（安装最简单）
└── 深度探索 Agent 边界 → Hermes（可定制性最强）
```

> 📚 深入阅读：[[Wiki/wiki/entities/claude-code|Claude Code]] · [[Wiki/wiki/entities/codex|Codex]] · [[Wiki/wiki/entities/openclaw|OpenClaw]] · [[Wiki/wiki/entities/hermes-agent|Hermes Agent]] · [[Wiki/wiki/comparisons/openclaw-vs-hermes|OpenClaw vs Hermes]]

---

## 第四章：多 Agent 协作与编排

> 📖 详细内容：[[04-多Agent协作与编排]]

### 4.1 Agentic Engineering

由 Andrej Karpathy 提出，是 Vibe Coding 的进化形态：**多个 AI Agent 自主完成规划→编写→测试→审查全流程**。人类从「驾驶员」退后为「架构师」和「监督者」。

五角色模型：
- **Planner**：分析需求，制定实现计划
- **Coder**：按计划编写代码
- **Tester**：运行测试，验证功能
- **Reviewer**：独立审查代码质量
- **Human**：定义架构边界、验收标准、做关键决策

### 4.2 生成-评估分离：行业共识

Anthropic、Google、OpenAI 三家独立走到了同一设计模式：

```
Generator（生成者）→ 产出代码
    ↓
Evaluator（评估者）→ 独立审查，提出修改意见
    ↓
Generator → 根据反馈修改
    ↓
循环直到 Evaluator 满意
```

实验数据：三 Agent 架构 6 小时 $200 产出可用应用；单 Agent 20 分钟 $9 产物残缺。**质量差距是数量级的。**

### 4.3 编排框架对比

| 框架 | 定位 | 语言 | 适合场景 |
|------|------|------|---------|
| **LangChain** | LLM 应用基础框架 | Python/JS | 简单 RAG、线性管道 |
| **LangGraph** | 有状态图编排引擎 | Python/JS | 循环推理、多 Agent 协作 |
| **Spring AI Alibaba Graph** | Java 企业级图编排 | Java | Spring 生态、企业可观测 |

> 📚 深入阅读：[[Wiki/wiki/comparisons/agent-orchestration-frameworks|编排框架对比]] · [[Wiki/wiki/topics/hermes-multi-agent|Hermes 多 Agent 团队搭建]] · [[Wiki/wiki/entities/everything-claude-code|ECC]]

---

## 第五章：Agent 实战指南

> 📖 详细内容：[[05-Agent实战指南]]

### 5.1 从零搭建第一个 Agent

**推荐入门路径**：OpenClaw（安装最简单）→ Hermes（体验自进化）→ Claude Code/Codex（编程场景）

```bash
# OpenClaw 一键安装（5 分钟上手）
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw onboard

# Hermes Agent 一键安装
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
hermes setup
```

### 5.2 装完后第一件事：写规则文件

规则文件决定了 Agent 的「性格」和「边界」：

| 文件 | 作用 | 示例 |
|------|------|------|
| **SOUL.md** (Hermes) | 全局身份、语气、协作方式 | 「你是我的技术助手，回答直接、简洁、给方案」 |
| **AGENTS.md** (Hermes/Codex) | 项目规则、技术栈、注意事项 | 「技术栈：Next.js 14 + TypeScript」 |
| **CLAUDE.md** (Claude Code) | 项目上下文、规则、命令 | 12 条规则让失误率从 41% 降到 3% |

### 5.3 Agent 安全与权限管理

核心原则：
1. **最小权限**：只给 Agent 它真正需要的权限
2. **分级审批**：读文件 allow、写文件 ask、删文件 deny
3. **沙箱隔离**：高风险操作在容器中执行
4. **操作日志**：记录所有 Agent 行为，可审计可回溯

### 5.4 进阶实战场景

| 场景 | 涉及技术 | 教程 |
|------|---------|------|
| Agent + 知识库 | Obsidian + Hermes RAG | [[Wiki/wiki/topics/hermes-obsidian-integration\|Hermes + Obsidian]] |
| Agent + 智能家居 | Home Assistant + Hermes | [[Wiki/wiki/topics/hermes-home-assistant-integration\|Hermes + HA]] |
| Agent + 学术写作 | Gemini + 6 个 Skill | [[Wiki/wiki/topics/gemini-academic-writing\|学术写作工作流]] |
| Agent + 创业 | OPC + AI 工具链 | [[../OPC/OPC 一人公司学习指南\|OPC 学习指南]] |

---

## 按角色推荐学习路径

### 🆕 AI Agent 新手（零基础）

> 目标：理解 Agent 是什么，会用至少一个 Agent 工具

1. [[01-AI Agent基础概念|第一章]]：前两节（什么是 Agent、L1-L5 层次）—— 1 小时
2. [[03-主流Agent工具|第三章]]：工具全景 + 选型决策树 —— 1 小时
3. [[05-Agent实战指南|第五章]]：从零搭建第一个 Agent —— 2 小时
4. 装上 OpenClaw 或 Hermes，实际用它完成 3 个日常任务 —— 边用边学

**预计总时间**：一个下午（4-5 小时）

### 👨‍💻 开发者

> 目标：理解 Agent 架构原理，能用 Agent 提升开发效率

1. [[01-AI Agent基础概念|第一章]]：全部 —— 2 小时
2. [[02-Agent核心架构|第二章]]：Harness Engineering + 编排循环 —— 2 小时
3. [[03-主流Agent工具|第三章]]：Claude Code + Codex 重点学习 —— 3 小时
4. [[04-多Agent协作与编排|第四章]]：生成-评估分离 + 编排框架 —— 2 小时
5. [[05-Agent实战指南|第五章]]：写规则文件 + 安全配置 —— 2 小时

**预计总时间**：2-3 天（11-15 小时）

### 🏗️ 架构师 / 技术 Leader

> 目标：设计 Agent 系统架构，评估 Agent 技术选型

1. [[02-Agent核心架构|第二章]]：Harness Engineering 深度理解 —— 3 小时
2. [[04-多Agent协作与编排|第四章]]：多 Agent 协作 + 编排框架对比 —— 3 小时
3. [[03-主流Agent工具|第三章]]：四大工具深度对比 —— 2 小时
4. 补充阅读：[[Wiki/wiki/concepts/agent-memory-systems|记忆系统]] + [[Wiki/wiki/concepts/agent-self-evolution|自进化]] + [[Wiki/wiki/concepts/harness-engineering|Harness Engineering]] —— 3 小时
5. 实践：搭建多 Agent 协作系统（Hermes Kanban） —— 3 小时

**预计总时间**：3-4 天（14-18 小时）

### 🔬 AI Agent 研究者

> 目标：深入 Agent 技术细节，探索前沿

1. 全部五个章节 —— 8 小时
2. 深度阅读全部 Agent 概念页：
   - [[Wiki/wiki/concepts/harness-engineering|Harness Engineering]]
   - [[Wiki/wiki/concepts/agent-memory-systems|Agent 记忆系统]]
   - [[Wiki/wiki/concepts/agent-self-evolution|Agent 自进化]]
   - [[Wiki/wiki/concepts/agent-context-compression|上下文压缩]]
   - [[Wiki/wiki/concepts/superpowers-design-philosophy|Superpowers 设计哲学]]
3. 架构拆解：[[Wiki/wiki/topics/hermes-architecture-deep-dive|Hermes 五层架构]]
4. 框架对比：[[Wiki/wiki/comparisons/agent-frameworks-moc|Agent 框架对比 MOC]]
5. 实践：ECC 深度使用（60 个 Agent + 228 个 Skill）

**预计总时间**：1-2 周

---

## 核心概念速查表

| 概念 | 一句话解释 | 详细页面 |
|------|-----------|---------|
| **AI Agent** | 自主感知、规划、执行、反思的 AI 系统 | [[Wiki/wiki/concepts/ai-agent\|AI Agent]] |
| **Agentic Engineering** | 多 Agent 自主协作，人类退为架构师 | [[Wiki/wiki/concepts/agentic-engineering\|Agentic Engineering]] |
| **Harness Engineering** | Agent = Model + Harness，编排工程方法论 | [[Wiki/wiki/concepts/harness-engineering\|Harness Engineering]] |
| **MCP** | AI 连接外部工具的标准化协议 | [[Wiki/wiki/entities/mcp\|MCP]] |
| **Skills** | AI 可复用的「能力包」，自动发现并按需调用 | [[Wiki/wiki/concepts/skills-concept\|Skills 概念]] |
| **Vibe Coding** | 用自然语言描述需求，让 AI「凭感觉」编程 | [[Wiki/wiki/concepts/vibe-coding\|Vibe Coding]] |
| **ID Coding** | 终极愿景：意图→服务，编程语言可能消失 | [[Wiki/wiki/concepts/id-coding\|ID Coding]] |
| **RAG** | 检索增强生成，让 AI 能查外部知识库 | [[Wiki/wiki/concepts/rag-architectures\|RAG 架构]] |
| **Agentic RAG** | Agent 自主决定检索策略的 RAG | [[Wiki/wiki/topics/agentic-rag-patterns\|Agentic RAG 模式]] |

---

## 延伸学习

- 📖 **AI Coding 完整学习计划**：覆盖 AI 编程工具的完整学习路径 —— [[../AI Coding/AI Coding 学习计划]]
- 📖 **知识库技术学习指南**：RAG、知识图谱、向量数据库 —— [[../知识库技术/知识库技术学习指南]]
- 📖 **OPC 一人公司学习指南**：AI Agent 在创业中的应用 —— [[../OPC/OPC 一人公司学习指南]]
- 📖 **智能家居学习指南**：Agent + Home Assistant —— [[../智能家居/智能家居学习指南]]

---

> 🎯 **开始学习**：从 [[01-AI Agent基础概念]] 开始你的 AI Agent 学习之旅！
