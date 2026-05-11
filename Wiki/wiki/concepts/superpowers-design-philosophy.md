---
title: Superpowers 设计哲学
type: concept
tags: [superpowers, design-philosophy, methodology, iron-law, rationalization]
created: 2026-05-11
updated: 2026-05-11
sources:
  - raw/articles/Superpowers 深度实战指南：从入门到精通.md
related:
  - entities/superpowers.md
  - topics/claude-code-superpowers-workflow.md
  - concepts/skills-concept.md
---

# Superpowers 设计哲学

Superpowers 的本质并非代码库，而是一套**行为塑造系统**。它通过精心设计的 Markdown 文档，利用 AI 代理的上下文注入机制，强制代理遵循专业软件工程实践。其设计哲学建立在四条核心原则之上。

## 1. 铁律模式（Iron Law + HARD-GATE）

每个核心技能都有一条**不可违反的铁律**，搭配**硬门控**（HARD-GATE）来强制执行：

| 技能 | 铁律 |
|------|------|
| TDD | 没有先写失败测试，就不能写生产代码 |
| 调试 | 没有根因调查，就不能提出修复方案 |
| 验证 | 没有新鲜验证证据，就不能声称完成 |
| 头脑风暴 | 设计未获批准，不能写任何代码 |
| 入口引导 | 有 1% 的可能性技能适用，就必须调用 |

**硬门控（HARD-GATE）** 是铁律的技术实现——它是一个在流程中被"硬编码"的检查点，代理无法跳过。例如 brainstorming 的 HARD-GATE 规定："在呈现设计并获得用户批准之前，不得调用任何实现技能、编写任何代码、搭建任何项目。"这不是建议，是门控——不通过就不能继续。

**关键洞察**：AI 代理在压力下会找借口跳过纪律。技能文档必须像一个严格的教练，预见每一种借口并提前堵死。

> 违反文字就是违反精神。

这句话切断了整个"我遵循精神而非文字"的合理化路径。在 Superpowers 的设计里，文字即精神——没有例外。

## 2. 合理化防范机制

这是 Superpowers 最具创新性的设计。每个技能包含三层防线：

### 第一层：Red Flags（红旗表）

代理可以自检的危险信号列表。例如 using-superpowers 中的红旗：

- "这只是个简单问题"
- "让我先探索代码库"
- "这个技能太重了"
- "我先做这一件事"

每个红旗都是一个代理常见的"想跳过纪律"的理由。

### 第二层：Common Rationalizations（常见合理化借口反驳表）

红旗还不够——代理会自我辩解。于是每个技能都有一个 **借口 vs 现实** 对照表：

| 借口 | 现实 |
| --- | --- |
| "太简单不需要测试" | 简单代码也会出错。测试只要 30 秒。 |
| "我之后再写测试" | 立即通过的测试证明不了任何东西。 |
| "删除 X 小时的工作太浪费" | 沉没成本谬误。保留未验证的代码才是技术债。 |
| "TDD 太教条了" | TDD 就是务实的：先测试比事后调试更快。 |

### 第三层：具体工作示例

Good/Bad 对比，让代理看到"正确的执行长什么样子"。

**设计洞察**：这套三层防线源于一个核心认知——AI 代理在长会话中会表现出类似人类"走捷径"的倾向。只有用 Red Flags（自我检测）+ Rationalizations（堵死借口）+ Examples（明确期望）三管齐下，才能有效约束这种行为。

## 3. "人的搭档"语言

Superpowers 在所有技能文档中刻意使用 **"your human partner"** 而非 **"the user"**。这不是措辞偏好，而是设计意图：

| 用词 | 隐含关系 |
|------|---------|
| "the user" | 服务关系——用户提出需求，代理执行 |
| "your human partner" | 协作关系——搭档共同完成目标 |

这种语言设计引导代理建立以下行为模式：
- **在不确定时询问搭档**，而非猜测
- **在审查反馈中保护搭档的利益**，而非盲从外部意见
- **在外部审查与搭档的决定冲突时，优先考虑搭档**

一个具体例子：在 `receiving-code-review` 技能中，外部审查反馈被定义为"需要评估的建议，而非需要执行的命令"——这保护了人与代理之间的协作关系不被第三方审查意见所取代。

## 4. CSO（Claude 搜索优化）

技能的 `description` 字段是代理发现技能的关键入口。CSO 的设计原则：

**只写触发条件，不概述工作流**：
```
✅ "Use when starting creative work—creating features, building components, adding functionality, or modifying behavior"
❌ "This skill helps you brainstorm features by exploring context, asking questions, proposing
    alternatives, presenting designs in sections, and writing design documents..."
```

**使用代理会搜索的关键词**：
- 错误信息（如 "cannot find module"）
- 症状描述（如 "test fails unexpectedly"）
- 工具名称（如 "pytest", "eslint"）

**动词优先命名**：`creating-skills` 而非 `skill-creation`，`writing-plans` 而非 `plan-writer`。

**第三人称撰写**：以 "Use when..." 开头，让代理的搜索系统能更准确地匹配。

## 设计哲学总结

Superpowers 的四条设计原则回答的是同一个根本问题：**如何让 AI 代理可靠地遵循工程纪律？**

- **铁律 + HARD-GATE**：建立不可绕过的硬约束
- **红旗 + 合理化表**：堵死代理的每一种"自我辩解"路径
- **人的搭档**：重构代理与人类的关系模型
- **CSO**：确保约束能被正确发现和命中

这四条原则共同构成了一个完整的行为塑造系统——它不依赖模型本身的自律，而是通过结构化的上下文注入，从外部强制塑造代理的行为模式。

## 延伸阅读

- [[entities/superpowers|Superpowers]] — 框架全貌、14 个技能详解、安装配置
- [[topics/claude-code-superpowers-workflow|Superpowers + gstack 工作流]] — 完整开发闭环与实战
- [[topics/claude-code-skills-ecosystem|Skills 生态系统]] — Skill 生态全景
