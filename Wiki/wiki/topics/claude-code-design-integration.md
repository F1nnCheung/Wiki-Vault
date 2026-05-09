---
title: Claude Code 设计集成与前端开发
type: topic
tags: [claude-code, design, figma, ui-ux, frontend]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/claude/Claude Code 连接 Figma 保姆级教程！设计稿秒变代码.md
  - raw/articles/claude/Claude与FigJam打通，快速生成流程图（可修改）- UX交互设计&产品经理.md
  - raw/articles/claude/68.4k Star 的 DESIGN.md 仓库：AI 写前端，终于不靠"感觉"了.md
  - raw/articles/claude/玩转 Claude Code：不可或缺的 UXUI 设计神级插件.md
related:
  - entities/claude-code.md
  - topics/claude-code-skills-ecosystem.md
---

# Claude Code 设计集成与前端开发

## 设计集成的三个层次

```
第1层：设计稿转代码   → Figma MCP 直接读取设计稿生成代码
第2层：设计质量控制    → DESIGN.md + UI/UX Skills 注入专业设计知识
第3层：双向设计流     → 文本转设计 + 设计转代码 + 网页转设计稿
```

---

## 第一层：Figma 集成

### Figma MCP（设计稿秒变代码）

1. 安装：`claude plugin install figma@claude-plugins-official`
2. 授权：通过 `/plugin` 完成 OAuth
3. 使用：在 Figma 选中图层 → 右键 Copy link to selection → 粘贴到 Claude Code
4. AI 自动提取图层、颜色、间距、组件结构，生成代码

**高级功能**：
- **Write to Canvas**：AI 直接在 Figma 画布创建/修改内容
- **Code to Canvas**：将网页捕获为 Figma 设计稿

### FigJam 集成（流程图直接生成）

在 Claude 中通过 Customize → Connectors → Figma 连接账户后，提示词中加入「使用 Figma 绘制」，Claude 直接在 Figma Draft 中创建**可编辑**的 FigJam 流程图/原型图。

> 区别于传统 AI 生成的不可编辑图片，FigJam 产出可在 Figma 中直接编辑修改。

---

## 第二层：DESIGN.md 设计系统

### 核心问题

AI 会写代码但不懂设计系统：颜色不统一、间距不稳定、圆角随意、字体层级混乱。"做得高级一点"这类模糊描述对 AI 无效。

### 解决方案

[DEN.md](https://github.com/awesome-design-md/awesome-design-md)（68.4k Stars）：

> AGENTS.md 告诉 AI「这个项目应该怎么做」，DESIGN.md 告诉 AI「这个项目应该长什么样」。

- 收集了 100+ 品牌的 DESIGN.md：Claude、Vercel、Linear、Stripe、Apple、Tesla 等
- 每个文件定义：视觉主题、颜色体系、字体层级、组件样式、布局原则、阴影系统、响应式行为、Agent Prompt Guide
- 使用：复制对应 DESIGN.md 到项目根目录 → 告诉 AI「按照 DESIGN.md 生成页面」

### 意义：从 Vibe Coding 到 Vibe Design

不再只告诉 AI「做什么」，而是告诉 AI「应该呈现什么样的视觉语言」。对团队来说，DESIGN.md 成为跨人、跨 Agent 的设计边界。

---

## 第三层：UI/UX 增强 Skill

| Skill | 功能 |
|---|---|
| **UI-UX-Pro-Max** | UX 策略引擎 + 设计系统生成器（自动生成色彩/字体/动效规范） |
| **Frontend-design** | 高精度网页设计，规避 AI slop 通用布局 |
| **Taste-skill** | 间距控制、动效、视觉质感 |
| **Shadcn-UI** | shadcn/ui 组件库专业知识注入 |
| **UI-animation** | 缓动函数、CSS 过渡、framer-motion、弹簧动画 |
| **Web-design-guidelines** | Vercel 100+ 条网页设计准则 |

---

## 推荐工具组合

| 场景 | 工具链 |
|---|---|
| 设计稿转代码 | Figma MCP + Frontend-design |
| 品牌级页面 | DESIGN.md + UI-UX-Pro-Max + Web-design-guidelines |
| 交互原型 | FigJam Connector + Shadcn-UI |
| 动效开发 | UI-animation + Taste-skill |
