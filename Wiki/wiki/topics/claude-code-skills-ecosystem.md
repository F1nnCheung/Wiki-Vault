---
title: Claude Code Skills 生态系统
type: topic
tags: [claude-code, skills, plugins, ecosystem]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/claude/2026用上这48个Skills，你就跑赢了95%的人.md
  - raw/articles/claude/别再给Claude Code乱装Skill了，推荐这8个.md
related:
  - entities/claude-code.md
  - entities/mcp.md
  - topics/claude-code-mcp-ecosystem.md
  - topics/claude-code-superpowers-workflow.md
---

# Claude Code Skills 生态系统

## Skill 是什么

Skill 是 Claude Code 的「可插拔能力包」——本质是放在特定目录下的 Markdown 文档，Claude Code 会自动发现并在适当时机调用。

与 Slash 命令的区别：

| 维度 | Skills | Slash 命令 |
|---|---|---|
| 触发方式 | 自动发现、智能调用 | 手动输入 `/命令名` |
| 适用场景 | 复杂、多文件、涉及脚本 | 简单、重复的提示模板 |
| 安装位置 | `~/.claude/skills/` 或 `.claude/skills/` | `.claude/commands/` |

## Skill 文件结构

```
skill-name/
├── SKILL.md       # 必需：技能说明和元数据
├── scripts/       # 可选：辅助脚本
├── templates/     # 可选：文档模板
└── resources/     # 可选：参考文件
```

## 精选 8 个核心 Skill（按需安装）

| Skill | 用途 | 解决什么痛点 |
|---|---|---|
| **Repomix** | 打包整个仓库为一个文件 | Claude 一次性读懂项目全貌 |
| **ccusage** | 实时显示 Token 消耗 | 促使优化 prompt，控制成本 |
| **frontend-design** | 官方前端设计 Skill | 一句话生成有设计感的 UI |
| **awesome-design-md** | 设计系统 + 文档规范 | 从设计稿直接生成代码级文档 |
| **claude-mem** | 长期记忆 | 记住项目偏好和架构决策 |
| **Superpowers** | 全流程增强包 | 14 个方法论的强制流程 |
| **gstack** | YC 的工程标准 | 生产级开发->部署->监控闭环 |
| **marketingskills** | 增长/营销 | Landing 页文案、投放策略 |

## 精选 UI/UX 设计 Skill（7 个）

| Skill | 功能 |
|---|---|
| **UI-UX-Pro-Max** | UX 策略专家，含设计系统推理引擎 |
| **Frontend-design** | 高精度网页设计，规避通用布局 |
| **Taste-skill** | 间距控制、动效和视觉质感 |
| **Shadcn-UI** | shadcn/ui 组件库深度知识 |
| **UI-animation** | 缓动函数、CSS 过渡、framer-motion |
| **Web-design-guidelines** | Vercel 萃取的 100+ 条网页设计准则 |

安装方式：
```bash
npx skills add nextlevelbuilder/ui-ux-pro-max-skill
npx skills add frontend-design
npx skills add vercel-labs/agent-skills@web-design-guidelines
```

## Skill 生态资源

- 官方仓库：github.com/anthropics/skills
- 社区网站：skillsmp.com
- 热门 Skills：agentskills.so
- awesome-skills：github.com/ComposioHQ/awesome-claude-skills (56.8k Stars)
- 中文资源：skillhub.cn、clawhub.ai

## 核心原则

> Skill 不在多，在配合。十个打架的 Skill 不如两个清晰分工的 Skill。

- 先判断自己缺什么，再装对应 Skill
- 功能重叠的 Skill 必须删除（如 OMC、feature-dev 与 Superpowers 冲突）
- 优先装 Repomix（上下文）+ ccusage（成本感知）
