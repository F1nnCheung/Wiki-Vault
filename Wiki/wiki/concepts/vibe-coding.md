---
title: Vibe Coding
type: concept
tags: [vibe-coding, concept, karpathy]
created: 2026-05-09
updated: 2026-05-28
sources:
  - raw/articles/VibeCoding/VibeCoding——从0到1开发微信小程序.md
related:
  - topics/ai-coding-concepts.md
  - topics/ai-coding-history.md
  - entities/trae.md
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

## 实践案例：Figma → Trae → 微信小程序

2026 年一个典型的 Vibe Coding 全流程：

```
Figma 生成原型图
    ↓  自然语言描述：「创建一个宝妈馄饨的微信小程序」
Trae AI 编辑器
    ↓  拖入 Figma 原型图文件夹，prompt：「一比一复刻开发前端页面」
HBuilderX + UniApp + UniCloud
    ↓  项目框架 + 后端服务空间
微信开发者工具
    ↓  运行 → 发布
```

### 工具链

| 步骤 | 工具 | 作用 |
|------|------|------|
| 1. 原型设计 | **Figma** | 自然语言描述需求，自动生成 UI 原型 |
| 2. 项目框架 | **HBuilderX** | UniApp + UniCloud 搭建多端项目模板 |
| 3. AI 编码 | **Trae**（[[../entities/trae|Trae]]） | 根据原型图 1:1 复刻前端页面 |
| 4. 运行调试 | **微信开发者工具** | 编译运行，真机预览 |

### 进阶技巧

- 选中页面元素拖入 Trae 对话 → 指定 UniCloud 服务空间对象 → 实现前后台数据交互
- Trae MTC（Solo）模式可直接全流程开发，无需手动拼接
- 这是 Vibe Coding 从概念到落地的完整闭环：**原型即设计，设计即代码**

## 应对策略

- 理解 AI 生成代码的核心逻辑，而非盲目接受
- 用 Spec-Driven Development（接口契约驱动）替代模糊描述
- 配合 Superpowers/gstack 等强制流程确保质量
- 选择适合的 AI 工具组合：国内用户推荐 Trae（永久免费、中文好），海外推荐 Cursor/Claude Code
