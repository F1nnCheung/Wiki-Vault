---
title: Rule 与 Skills 学习指南
type: tutorial
tags: [Rule, Skills, CLAUDE.md, 技能封装, 规则体系, 学习计划]
created: 2026-06-01
updated: 2026-06-02
sources:
  - Wiki/wiki/topics/claude-md-12-rules.md
  - Wiki/wiki/concepts/skills-concept.md
  - Wiki/wiki/topics/claude-code-skills-ecosystem.md
  - Wiki/wiki/entities/everything-claude-code.md
related:
  - ../01-LLM与Prompt工程/00-LLM与Prompt工程学习指南.md
  - ../03-AI编码工具/00-AI Coding 学习计划.md
---

# Rule 与 Skills 学习指南

> 对应学习计划**第 2 周**：掌握 Rule 规则约束（根治 AI 自由发挥），将高频开发能力封装为可复用 Skills，搭建个人 AI 技能库。

---

## 核心认知

**Prompt 告诉 AI「这次做什么」，Rule 告诉 AI「在这个项目里怎么做事」，Skills 教 AI「遇到某类问题怎么思考」。**

三者协同关系：

```
Rule（约束层）→ 定义边界和规范，每次会话自动注入
  ↓
Prompt（指令层）→ 描述本次具体需求
  ↓
Skills（方法论层）→ 被 AI 自动发现、按需调用
```

**为什么需要 Rule？** 没有约束的 LLM 会自由发挥——过度设计、顺手重构、静默失败。约束不是限制 AI，是让 AI 成为你想要的开发者。

**为什么需要 Skills？** 把高频开发动作标准化——接口生成、SQL 编写、代码重构——不用每次都从零写 Prompt。

---

## 学习路线图

```
阶段一：Rule 规则体系（Day 1-3，4 小时）
  ├── Rule 本质：行为契约
  ├── CLAUDE.md 层级结构（用户级 / 项目级 / 会话级）
  ├── Karpathy 4 条基础规则
  ├── 辰北 8 条增量规则
  ├── 各工具 Rule 体系对比（Claude Code / Cursor / Trae / Hermes）
  └── 实战产出：通用全局 Rule 文件

        ↓

阶段二：Skills 概念与结构（Day 4-5，3 小时）
  ├── Skill vs Slash 命令 vs MCP 的本质区别
  ├── Skill 文件结构（SKILL.md + scripts + templates）
  ├── Skills 的触发与加载机制
  ├── 社区核心 Skill 生态
  └── 实战产出：理解 Skill 与 Slash 命令的本质区别

        ↓

阶段三：Skills 封装实战（Day 6-7，4 小时）
  ├── 编写第一个自定义 Skill
  ├── 6-8 个开发常用 Skill 模板
  ├── Skills 分级管理与角色定制
  └── 实战产出：个人 AI 技能库（6-8 个常用 Skill）
```

---

## 分章导航

| 章节 | 内容 | 预计时间 |
|------|------|---------|
| [[01-Rule规则体系]] | Rule 本质、CLAUDE.md 层级结构、Karpathy 4 条 + 辰北 8 条规则、各工具适配 | 4h（Day 1-3） |
| [[02-Skills概念与触发机制]] | Skill vs Slash 命令 vs MCP、文件结构、加载机制、社区生态 | 3h（Day 4-5） |
| [[03-Skills封装实战]] | 自定义 Skill 编写、6-8 个模板、分级管理与角色定制 | 4h（Day 6-7） |

---

## 附录 A：第 2 周每日学习清单

| 天数 | 学习内容 | 实战产出 |
|------|---------|---------|
| Day 1-3 | Rule 规则编写：12 条规则逐条理解 + 各工具适配 | 通用全局 Rule 文件 |
| Day 4-5 | Skills 概念、结构、与命令和 MCP 的区别 | 理解 Skill 的本质和触发机制 |
| Day 6-7 | Skills 封装实战，安装社区 Skill + 编写自定义 Skill | 个人 AI 技能库（6-8 个常用 Skill） |

## 附录 B：第 2 周复盘自检

- [ ] 能否在 5 分钟内为新项目编写一份 50 行以内的 CLAUDE.md？
- [ ] 能否解释 Karpathy 4 条规则分别防止什么失败模式？
- [ ] 能否说清 Skill / Slash 命令 / MCP 三者各解决什么问题？
- [ ] 是否已安装并配置好至少 3 个社区核心 Skill？
- [ ] 是否已编写至少 2 个自定义 Skill 并验证可用？
- [ ] 个人全局 Rule 是否已挂载到所有 AI 编码工具的配置中？

## 附录 C：延伸阅读

| 主题 | 知识库资源 |
|------|-----------|
| 12 条规则完整实验数据 + 可复制模板 | [[Wiki/wiki/topics/claude-md-12-rules|CLAUDE.md 12 条规则深度解析]] |
| Skills 概念 + 选择标准 | [[Wiki/wiki/concepts/skills-concept|Skills 概念页]] |
| 8 个核心 Skill 详解 | [[Wiki/wiki/topics/claude-code-skills-ecosystem|Skills 生态系统]] |
| 11 个 Skill 五级梯队 + 8 角色定制 | [[Wiki/wiki/topics/claude-code-skills-recommendations|Skills 分级推荐]] |
| ECC：一站式 Harness（60 Agent + 228 Skill） | [[Wiki/wiki/entities/everything-claude-code|ECC 实体页]] |

---

> 📖 完成第 2 周学习后，进入 [[../03-AI编码工具/00-AI Coding 学习计划|第 3 周：AI 编码工具全栈 + Vibe Coding]]——吃透四大主流 AI 代码助手，掌握自然语言编程范式。
