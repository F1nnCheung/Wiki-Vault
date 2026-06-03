---
title: LLM 与 Prompt 工程学习指南
type: tutorial
tags: [LLM, Prompt工程, 大模型, 程序员, 学习计划]
created: 2026-06-01
updated: 2026-06-02
sources:
  - Wiki/wiki/concepts/prompt-engineering-trilogy.md
  - Wiki/wiki/topics/claude-code-prompt-engineering.md
  - Wiki/wiki/topics/ai-coding-concepts.md
related:
  - ../02-Rule与Skills/00-Rule与Skills学习指南.md
  - ../05-AI Coding/00-AI Coding学习指南.md
---

# LLM 与 Prompt 工程学习指南

> 对应学习计划**第 1 周**：本地部署大模型 → 搞懂运行逻辑 → 精通 Prompt 写法 → 解决 AI 代码幻觉、输出不规范问题。

---

## 核心认知

**Prompt 是程序员与 AI 的「编程语言」。写好 Prompt 的本质，是把模糊的意图转化为 AI 无法误解的精确指令。**

在第 2 周你将学到 Rule（约束 AI 的行为规范）和 Skills（教 AI 怎么思考的方法论包）。三者分层协同：

```
LLM 底层认知（理解 AI 怎么工作）
  ↓  决定你能写出多精准的 Prompt + 怎么部署
Ollama 本地部署（把大模型跑起来）
  ↓  模型下载、量化选型、API 暴露、成本控制
Prompt 工程（告诉 AI「这次做什么」）
  ↓  具体指令 + 输出格式 + 推理路径
Rule 约束层（告诉 AI「在这个项目里怎么做事」）  ← 第 2 周
  ↓  定义边界和规范，每次会话自动注入
Skills 方法论层（教 AI「遇到某类问题怎么思考」）  ← 第 2 周
  ↓  被 AI 自动发现、按需调用
```

**为什么 Prompt 工程对程序员至关重要？** 因为 LLM 不是数据库、不是搜索引擎、不是推理引擎——它是一个**概率性的文本补全系统**。你不给它精确的上下文和约束，它就会「脑补」——这就是幻觉的根源。好的 Prompt 本质上是**压缩不确定性**：用格式约束减少输出方差，用推理路径提升逻辑准确率，用示例校准行为模式。

---

## 学习路线图

本教程按**四章**递进组织，对应第 1 周 7 天学习任务：

```
第一章：LLM 底层认知（Day 1-2，3 小时）
  ├── Transformer 极简原理 + 训练三阶段
  ├── 上下文窗口与 Token 机制
  ├── 模型幻觉：四种类型 + 六大抑制方法
  ├── 涌现能力 + 规模定律
  ├── 开源 vs 闭源模型选型 + Token 效率
  └── 实战产出：《程序员大模型选型手册》

        ↓

第二章：Ollama 本地部署（Day 2，1.5 小时）
  ├── Ollama 安装与环境配置
  ├── 模型下载与量化选型
  ├── API 暴露与多语言调用
  ├── 三层模型调用策略（本地 Ollama / DeepSeek API / Claude API）
  └── 实战产出：本地可用的编程助手模型

        ↓

第三章：Prompt 工程核心（Day 3-4，4 小时）
  ├── 通用 Prompt 框架（CRISPE / ROLE / R-T-F）
  ├── 基础三板斧：Few-shot + CoT + Self-Consistency
  ├── 高级推理技术：ReAct + Tree of Thoughts + Prompt Chaining
  ├── 代码专用 Prompt 模板（8 套）
  ├── 结构化输出 + 代码场景 8 个常见坑
  └── 实战产出：8 套可直接复用的开发 Prompt

        ↓

第四章：Prompt 实战进阶（Day 5-7，4 小时）
  ├── Spec-Driven 开发模式 + Spec 文件结构
  ├── 需求拆解 + Bug 修复（CoT + ReAct 混合）
  ├── 「零调试生成工业级代码」完整模板
  ├── Prompt 评估体系（PEEM / LLM-as-Judge）
  ├── Prompt A/B 测试五步法
  ├── Prompt 注入安全三层防御
  ├── Prompt 版本管理与测试自动化
  └── 实战产出：可量化评估 + 安全防护的完整 Prompt 资产库
```

---

## 分章导航

### 📖 [[01-LLM底层认知|第一章：LLM 底层认知]]

> Day 1-2 | 3 小时

- LLM 是什么——概率性文本补全系统
- 训练三阶段：预训练 → SFT → RLHF
- 涌现能力与规模定律
- Transformer 极简原理（自注意力 / 多层堆叠 / 位置编码）
- 上下文窗口与 Token 机制
- 模型幻觉：四种类型 + 六大抑制方法
- 大模型生态全景：开源 vs 闭源、国内外主要模型介绍
- 模型选型：场景推荐 + Token 效率 + 推理模型注意

### 📖 [[02-Ollama本地部署|第二章：Ollama 本地部署]]

> Day 2 | 1.5 小时

- Ollama 安装与环境配置（macOS/Linux/Windows）
- 模型下载命令与量化选型表
- Python/cURL API 调用示例
- 三层调用策略（本地 Ollama / DeepSeek API / Claude API）
- 成本对比与风险控制

### 📖 [[03-Prompt工程核心|第三章：Prompt 工程核心]]

> Day 3-4 | 4 小时

- 三个通用框架：CRISPE / ROLE / R-T-F
- **基础三板斧**：Few-shot（静态/动态）、CoT（Zero-shot/Few-shot）、Self-Consistency（参数+场景+成本）
- 组合策略与动态路由（70/30 分，降本 75%）
- **高级推理技术**：ReAct（推理+行动）、Tree of Thoughts（多路径+剪枝）、Prompt Chaining（顺序/分支/验证门）
- 技术选型决策树
- 8 套代码专用 Prompt 模板
- 结构化输出提示词设计
- 代码场景 8 个常见坑

### 📖 [[04-Prompt实战进阶|第四章：Prompt 实战进阶]]

> Day 5-7 | 4 小时

- Spec-Driven 开发模式 + Spec 文件最小结构
- 需求拆解：从一句话到可执行任务列表
- Bug 修复：CoT + ReAct 混合模式
- 「零调试生成工业级代码」完整模板
- **Prompt 评估体系**：六层工程学科 + 三类指标 + PEEM 九轴 + LLM-as-Judge
- **Prompt A/B 测试**：五步法 + MDE 计算 + 灰度发布
- **Prompt 注入安全**：三层防御 + 2026 年关键发现
- **Prompt 版本管理与测试**：仓库结构 + CHANGELOG + 评估自动化脚本

---

## 附录 A：第 1 周每日学习清单

| 天数 | 学习内容 | 实战产出 | 对应章节 |
|------|---------|---------|------------|
| Day 1-2 | LLM 基础理论、训练三阶段、Token 原理、大模型生态、模型选型、幻觉抑制 | 《程序员大模型选型手册》 | [[01-LLM底层认知\|第一章]] |
| Day 2 | Ollama 安装、模型下载与量化选型、API 调用、三层策略 | 本地可用的编程助手模型 | [[02-Ollama本地部署\|第二章]] |
| Day 3-4 | Prompt 框架、三板斧、ReAct/ToT/Chaining、8 套模板、常见坑 | 8 套可复用 Prompt | [[03-Prompt工程核心\|第三章]] |
| Day 5-7 | Spec-Driven、需求拆解、Bug 修复、评估/A/B 测试/注入安全/版本管理 | Prompt 资产库 + 测试套件 | [[04-Prompt实战进阶\|第四章]] |

## 附录 B：第 1 周复盘自检

- [ ] 能否安装 Ollama 并下载至少一个编程模型，完成 API 调用？
- [ ] 能否回答：LLM 为什么会产生幻觉？你的代码场景怎么抑制？
- [ ] 能否画出 LLM 训练三阶段流程图？
- [ ] 能否在 30 秒内为当前项目选择合适的主力模型 + 降本方案？
- [ ] 能否默写 CRISPE 和 R-T-F 两个 Prompt 框架？
- [ ] 能否说清 Few-shot / CoT / Self-Consistency / ReAct / ToT 各自适用场景？
- [ ] 能否用 Spec-Driven 模式让 AI 生成符合团队规范的代码？
- [ ] 8 套 Prompt 模板是否已存入个人资产库？
- [ ] 是否已建立 Prompt 版本管理目录，并有至少 10 条测试用例？
- [ ] 是否能用 A/B 测试量化验证 Prompt 改进效果？
- [ ] 你的 CLAUDE.md 是否包含 Prompt 注入防范措施？

## 附录 C：延伸阅读

| 主题 | 知识库资源 |
|------|-----------|
| Prompt 三板斧原理 + 动态路由 + LangChain 实现 | [[Wiki/wiki/concepts/prompt-engineering-trilogy\|Prompt 工程三板斧]] |
| 20 个 Claude Code 专用提示词模板（5 大场景） | [[Wiki/wiki/topics/claude-code-prompt-engineering\|Claude 提示词工程]] |
| CLAUDE.md 规则——约束 AI 的硬框架 | [[Wiki/wiki/topics/claude-md-12-rules\|CLAUDE.md 12 条规则]] |
| Vibe Coding — 自然语言编程范式 | [[Wiki/wiki/concepts/vibe-coding\|Vibe Coding 概念页]] |
| AI Agent 概念——三板斧/ReAct 与 Agent 推理 | [[Wiki/wiki/concepts/ai-agent\|AI Agent 概念页]] |
| AI Coding 核心概念全景 | [[Wiki/wiki/topics/ai-coding-concepts\|AI Coding 核心概念]] |
| AI Coding 工具对比——模型背后的工具选型 | [[Wiki/wiki/topics/ai-coding-tools-comparison\|AI Coding 工具全景对比]] |
| 完整 9 周学习路径总览 + 5 条角色分层路径 | [[../00-完整学习路径总览\|完整学习路径总览]] |

---

> 📖 完成第 1 周学习后，进入 [[../02-Rule与Skills/00-Rule与Skills学习指南\|第 2 周：Rule 规则体系 + Skills 技能封装]]——学会用规则约束 AI，用技能封装高频开发能力。
