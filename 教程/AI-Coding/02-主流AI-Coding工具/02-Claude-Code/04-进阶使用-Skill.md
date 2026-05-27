---
title: 2.2.4 Claude Code 进阶：Skill 技能系统
type: tutorial
tags: [claude-code, skills, advanced, ecosystem]
created: 2026-05-11
updated: 2026-05-13
sources:
  - Wiki/wiki/topics/claude-code-skills-ecosystem.md
  - Wiki/wiki/concepts/skills-concept.md
  - Wiki/wiki/entities/everything-claude-code.md
  - 教程/AI-Coding/AI Coding 学习计划.md
related:
  - 03-基本使用.md
  - 05-进阶使用-MCP.md
---

# 2.2.4 Claude Code 进阶：Skill 技能系统

> Skill 是 Claude Code 的能力放大器——它把资深开发者的工作方法论「编码」进了 AI 的执行流程。掌握了 Skill，你就不再是「用 AI 写代码」，而是「让 AI 按专业标准工作」。

---

## Skill 是什么

Skill 是放在特定目录下的 Markdown 文档，包含完整的工作方法论（流程说明 + 辅助脚本 + 输出模板）。Claude Code 会自动发现这些 Skill，并在合适的时机智能调用。

### Skill vs Slash 命令

| 维度 | Skills | Slash 命令 |
|---|---|---|
| 触发方式 | **自动发现、智能调用** | 手动输入 `/命令名` |
| 适用场景 | 复杂、多文件、涉及脚本 | 简单、重复的提示模板 |
| 内容 | 完整方法论（流程+脚本+模板） | 一段提示文本 |
| 安装位置 | `~/.claude/skills/` | `.claude/commands/` |

> 💡 **核心差异**：命令是你告诉 AI 「现在做这个」，Skill 是 AI 自己判断「这个场景该用那个方法」。

---

## Skill 文件结构

```
skill-name/
├── SKILL.md       # 必需：技能说明和元数据
├── scripts/       # 可选：辅助脚本
├── templates/     # 可选：文档模板
└── resources/     # 可选：参考文件
```

### SKILL.md 基本结构

```markdown
---
name: my-skill
description: 这个 Skill 解决什么问题
---

# Skill 名称

## 触发条件
当用户提到 X 或需要做 Y 时触发

## 工作流程
1. 第一步：...
2. 第二步：...
3. 第三步：...

## 输出规范
- 格式要求
- 必须包含的内容
```

---

## 精选 8 个核心 Skill

### 按优先级排序

| 优先级 | Skill | 用途 | 为什么推荐 |
|---|---|---|---|
| ⭐⭐⭐ | **Repomix** | 打包整个仓库为一个文件 | 一次性读懂项目全貌，大幅提升上下文效率 |
| ⭐⭐⭐ | **ccusage** | 实时显示 Token 消耗 | 控制成本，促使优化 Prompt |
| ⭐⭐⭐ | **frontend-design** | 官方前端设计 Skill | 一句话生成有设计感的 UI |
| ⭐⭐ | **awesome-design-md** | 设计系统 + 文档规范 | 设计稿直接生成代码级文档 |
| ⭐⭐ | **claude-mem** | 长期记忆 | 跨会话记住项目偏好和架构决策 |
| ⭐⭐ | **Superpowers** | 全流程增强包 | 14 个方法论，强制规范开发流程 |
| ⭐⭐ | **gstack** | YC 工程标准 | 生产级开发→部署→监控闭环 |
| ⭐ | **marketingskills** | 增长/营销 | Landing 页文案、投放策略 |

---

## 前 3 个必装 Skill 详解

### 1. Repomix — 项目全貌理解

**痛点**：Claude Code 只能逐个读取文件，无法一次性理解整个项目结构和文件间的关系。

**解决**：Repomix 将整个仓库打包为一个结构化的 XML/JSON 文件，Claude 读一次就能理解全貌。

```bash
# 安装
npx skills add repomix

# 使用（AI 会自动调用）
# 或手动触发：
你：用 repomix 分析当前项目
```

**适用场景**：
- 接手新项目，快速理解代码结构
- 大规模重构前的全局分析
- 向 AI 解释项目架构

### 2. ccusage — Token 消耗追踪

**痛点**：不知道每次对话花了多少钱，上下文被冗余内容占据。

**解决**：实时显示当前会话的 Token 消耗和费用估算。

```bash
npx skills add ccusage
```

安装后 AI 会在适当时机自动显示消耗状态。

### 3. frontend-design — 前端设计快启

**痛点**：AI 生成的前端代码往往「功能对但不好看」——布局模板化，配色单调。

**解决**：Anthropic 官方前端设计 Skill，一句话生成有设计感、风格独特的 UI。

```bash
npx skills add frontend-design
```

**使用示例**：
```
你：设计一个 SaaS 仪表盘，包含侧边栏、数据卡片和图表区域
  → AI 应用 frontend-design Skill，生成有设计感的完整页面
```

---

## UI/UX 设计 Skill 组合（前端推荐）

如果你做前端开发，以下 6 个 Skill 值得关注：

| Skill | 功能 |
|---|---|
| **UI-UX-Pro-Max** | UX 策略专家，含设计系统推理引擎 |
| **Frontend-design** | 高精度网页设计，规避通用布局 |
| **Taste-skill** | 间距控制、动效和视觉质感 |
| **Shadcn-UI** | shadcn/ui 组件库深度知识 |
| **UI-animation** | 缓动函数、CSS 过渡、framer-motion |
| **Web-design-guidelines** | Vercel 萃取的 100+ 条网页设计准则 |

```bash
npx skills add nextlevelbuilder/ui-ux-pro-max-skill
npx skills add frontend-design
npx skills add vercel-labs/agent-skills@web-design-guidelines
```

---

## Superpowers + gstack：生产级开发闭环

这是两个强 Skill 的组合，放在 [[../../04-拓展使用/02-Superpowers-gstack进阶闭环|第 4.2 章]] 详细展开。

简单来说：
- **Superpowers**：14 个方法论，强制 Agent 按规范流程工作（规划→执行→测试→审查）
- **gstack**：YC 的工程标准，覆盖从开发到部署到监控的完整闭环

> ⚠️ 这是进阶内容，建议在熟练掌握基础使用后再学习。

---

## Skill 管理核心原则

### 原则一：不在多，在配合

> 十个打架的 Skill 不如两个清晰分工的 Skill。

功能重叠的 Skill 会互相干扰。例如 OMC、feature-dev 与 Superpowers 有功能冲突——只能选其一。

### 原则二：先判断缺什么，再装什么

```
遇到问题 → 分析缺什么能力 → 搜索对应 Skill → 安装
```

不要「先装为敬」。每个 Skill 都会消耗上下文，未使用的 Skill 是纯浪费。

### 原则三：定期清理

每两周检查一次已安装的 Skill：
```bash
ls ~/.claude/skills/    # 查看已安装
# 删除不再使用的
```

---

## Skill 生态资源

| 资源                | 地址                                          | 说明                                                                   |
| ----------------- | ------------------------------------------- | -------------------------------------------------------------------- |
| **ECC Skills 体系** | github.com/affaan-m/everything-claude-code  | **228 个 Skill**，目前最大的单一 Skill 集合，覆盖编码标准/测试/后端/前端/安全/学习/运维/业务等 10+ 领域 |
| 官方仓库              | github.com/anthropics/skills                | Anthropic 维护的官方 Skill                                                |
| 社区网站              | skillsmp.com                                | Skill 搜索引擎                                                           |
| Awesome 列表        | github.com/ComposioHQ/awesome-claude-skills | 56.8k Stars                                                          |
| 中文资源              | skillhub.cn                                 | 国内 Skill 社区                                                          |
| OpenClaw Hub      | clawhub.ai                                  | OpenClaw Skill 市场                                                    |

---

## 本章小结

1. Skill 是「可复用的方法论包」——比命令更智能（自动触发），比 MCP 更「软」（教思考而非给工具）
2. 必装三件套：Repomix（上下文）+ ccusage（成本）+ frontend-design（设计）
3. 核心原则：先判断缺什么，再装什么；不在多，在配合
4. Superpowers + gstack 是进阶内容，等基础扎实后再学
5. 定期清理未使用的 Skill

> 📖 **下一步**：Skill 给 AI 方法论，MCP 给 AI 工具。继续阅读 [[05-进阶使用-MCP]]，学习如何让 AI 连接外部世界。

---

> 📚 参考：[[Wiki/wiki/topics/claude-code-skills-ecosystem|Skills 生态系统]] · [[Wiki/wiki/concepts/skills-concept|Skills 概念]] · [[Wiki/wiki/concepts/superpowers-design-philosophy|Superpowers 设计哲学]]
