---
title: Claude Code 入门：命令与日常使用
type: topic
tags: [claude-code, commands, getting-started, daily-usage]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/Claude Code/Claude Code 拥有 50 多个命令。大多数开发者只用到 5 个.md
  - raw/articles/Claude Code/全网最全 Claude Code 命令指南：会话、权限、扩展、自动化全搞定！从新手到大神，这一篇就够了.md
related:
  - entities/claude-code.md
  - topics/claude-code-installation.md
  - topics/claude-code-prompt-engineering.md
---

# Claude Code 入门：命令与日常使用

## 新手必知 6 个命令

| 命令 | 作用 | 场景 |
|---|---|---|
| `/help` | 查看帮助 | 不知道怎么办时 |
| `/clear` | 清空上下文 | 话题完全切换时 |
| `/compact` | 压缩上下文 | 上下文占用 70%+ 时 |
| `/model` | 切换模型 | 想换模型时 |
| `/effort` | 调整推理深度 | 简单任务降配、复杂任务升配 |
| `/permissions` | 管理权限规则 | 权限弹窗太多时 |

## 每日保命级 Top 10

1. `/init` — 生成项目 CLAUDE.md，建立"长期记忆"
2. `/compact` — 压缩上下文节省 Token（被最严重低估的命令）
3. `/clear` — 清空会话重新开始
4. `/model` — 查看和切换模型
5. `/cost` — 查看 Token 消耗和费用
6. `/context` — 查看上下文占用状态
7. `/diff` — 查看代码改动（提交前必看）
8. `/memory` — 编辑 CLAUDE.md 记忆文件
9. `/resume` — 恢复历史会话
10. `/rewind` — 回退操作

## 会话与上下文管理

| 命令 | 用途 | 使用建议 |
|---|---|---|
| `/clear` | 完全重置 | 话题彻底切换时 |
| `/compact` | 压缩保留主线 | **优先于 clear**——保留主线逻辑 |
| `/context` | 查看占用状态 | 上下文 70-80% 时应 compact |
| `/resume` | 续接历史会话 | 或使用 `claude -c` 启动 |
| `/rewind` | 回退操作 | Esc Esc 快捷键 |
| `/recap` | 生成会话摘要 | 收口用 |

> ⚠️ 多数人条件反射式 `/clear`，但 `/compact` 保留主线才是更优选择。

## 高阶进阶指令

| 命令 | 作用 |
|---|---|
| `/btw` (By the way) | 不中断主任务快速提问，不污染对话历史 |
| `/fast` | 极速模式，简化回复 |
| `/plan` | 只读规划模式 |
| `/todos` | 跨会话任务管理 |
| `/simplify` | 2026 全新代码评审（时代评审） |
| `/batch` | 大规模拆分改造 |
| `/loop` | 持续观察/轮询 |

## 权限管理三原则

- **allow**（允许）：低风险高频操作（lint、test、git status）
- **ask**（询问）：中风险操作（修改文件、安装依赖）
- **deny**（禁止）：高风险操作（.env、git push --force、rm -rf）

## CLI 启动标志

```bash
claude --print "提示词"    # 单次执行，输出结果（脚本集成）
claude -c                  # 续接上次会话
claude --agents            # 预设子代理
claude --dangerously-skip-permissions  # 完全自主模式
```

## 日常工作流

```
规划模式 → 描述需求 → 执行 → /context 监控
  → /compact 压缩 → /diff 检查改动 → 提交
```

**核心原则**：
- 用 `/init` 建立 CLAUDE.md，避免每次重复解释规范
- 简单任务用便宜模型，复杂推理用高质量模型
- 任务分解为小步骤（设计→实现→测试→审查），每步验证
- 上下文占用达 70-80% 时主动 `/compact`
