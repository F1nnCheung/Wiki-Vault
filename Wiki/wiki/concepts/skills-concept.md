---
title: Skills（技能系统）
type: concept
tags: [skills, concept, methodology, extension]
created: 2026-05-09
updated: 2026-05-09
sources: []
related:
  - entities/mcp.md
  - concepts/ai-agent.md
  - topics/claude-code-skills-ecosystem.md
---

# Skills（技能系统）

## 定义

Skills 是给 AI Agent 安装的可复用「能力包」——本质是特定目录下的 Markdown 文档，AI 自动发现并在适当时机按需调用。

## 核心区别

| 维度 | Skills | Slash 命令 | MCP |
|---|---|---|---|
| 触发方式 | **自动发现、智能调用** | 手动输入 `/命令` | AI 按需调用 |
| 内容 | 完整方法论（流程+脚本+模板） | 提示文本模板 | 工具接口 |
| 定位 | 教 AI **怎么想** | 快速指令 | 给 AI **工具** |

## Skill 文件结构

```
skill-name/
├── SKILL.md       # 必需：技能说明和元数据
├── scripts/       # 可选：辅助脚本
├── templates/     # 可选：文档模板
└── resources/     # 可选：参考文件
```

## 安装方式

```bash
# Claude Code 插件市场
/plugin install skill-name

# 手动安装
git clone <repo> ~/.claude/skills/my-skill

# CC Switch GUI 管理
# 在 Skills 面板搜索并一键安装
```

## Skills vs MCP：选择标准

- **一次性 / 命令式任务** → CLI + Skill
- **需要跨客户端复用** → MCP
- **方法论 / 流程规范** → Skill
- **外部工具连接** → MCP

## 核心 Skills 推荐

参见 [[topics/claude-code-skills-ecosystem|Skills 生态系统]]：
- Superpowers：方法论框架（14 个子 Skill）
- gstack：执行工具链
- frontend-design：前端 UI 生成
- claude-mem：长期记忆
- Repomix：仓库打包分析
