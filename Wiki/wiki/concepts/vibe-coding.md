---
title: Vibe Coding
type: entity
tags: [vibe-coding, concept, karpathy]
created: 2026-05-09
updated: 2026-05-09
sources: []
related:
  - topics/ai-coding-concepts.md
  - topics/ai-coding-history.md
---

# Vibe Coding（氛围编程）

> 2025 年初由 Andrej Karpathy（前 OpenAI 联合创始人、前 Tesla AI 总监）提出。

## 定义

用自然语言描述想要的效果，让 AI 生成代码——开发者「凭感觉」（vibe）编程，关注「做什么」而非「怎么做」。

## 核心主张

- 不逐行审查代码，而是描述期望效果
- 让 AI 反复迭代直到满意
- 降低编程门槛，让非技术人员也能开发
- 快速原型验证，加速从想法到产品的过程

## 演进

```
Vibe Coding (2025)
  ↓  快速探索，但质量难保证
Agentic Engineering (2026)
  ↓  多 Agent 协同，有审查闭环
ID Coding (未来)
  ↓  意图直接转化为软件服务
```

## 风险

- **「技术次贷危机」**：AI 垃圾代码堆积——生成成本趋近于零，但理解维护成本指数上升
- **「死亡螺旋」**：错误喂给 AI → AI 反刍出新错误 → 人类丧失对代码库的控制
- **技能退化**：过度依赖 AI 可能导致开发者丧失底层理解能力

## 应对策略

- 理解 AI 生成代码的核心逻辑，而非盲目接受
- 用 Spec-Driven Development（接口契约驱动）替代模糊描述
- 配合 Superpowers/gstack 等强制流程确保质量
