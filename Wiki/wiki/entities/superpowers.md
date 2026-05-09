---
title: Superpowers
type: entity
tags: [superpowers, skill, workflow, methodology]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/Claude Code/用了 Superpowers，我的 Claude Code 返工少了九成.md
  - raw/articles/Claude Code/实战篇 Claude Code + superpowers + gstack 开发流程实录，可直接复制使用，一篇文章讲清楚！.md
  - raw/articles/Claude Code/Claude Code + MiniMax 2.7 + Superpowers：我是怎么真正交付一套生产系统的.md
related:
  - topics/claude-code-superpowers-workflow.md
  - entities/gstack.md
  - entities/claude-code.md
---

# Superpowers

Superpowers 是 Claude Code 的一个方法论框架（137k GitHub Stars），通过 **14 个强制流程 Skill** 将软件工程最佳实践编码为 AI 自动遵循的工作流程。核心哲学是「慢即是快」——单次任务多花时间，但消除返工，总时间反而缩短。

维护者：obra | GitHub: github.com/obra/superpowers

## 14 个 Skill 分类

### 规划阶段
- **brainstorming**：强制在动手前与用户对齐需求，5 分钟对齐省 5 小时返工
- **writing-plans**：将需求转为可执行文档，每步有验收标准

### 执行阶段
- **executing-plans**：严格按计划带检查点执行，返工减 70%+
- **subagent-driven-development**：多 agent 并行，时间缩 60-75%
- **test-driven-development**：强制先写测试再实现
- **systematic-debugging**：复现→缩小→根因→验证 四阶段排查
- **using-git-worktrees**：隔离工作环境，避免改动互相污染
- **dispatching-parallel-agents**：会话外派独立 agent 并行调研

### 质检阶段
- **verification-before-completion**：强制真正跑验证再宣称完成
- **requesting-code-review**：独立审查上下文（作者不能审自己代码）
- **receiving-code-review**：认真理解反馈再修改
- **finishing-a-development-branch**：规范分支收尾

### 工具类
- **writing-skills**：教你写自定义 Skill
- **using-superpowers**：元 Skill，框架入口

## 核心效果

以前：30 分钟任务 + 3 次返工 = 2 小时
现在：90 分钟 + 0 次返工 = 90 分钟

**返工减少约 90%**，总时间节省 25%。

## 与 gstack 的关系

- **Superpowers** = 大脑（思考与流程层）：规划、调试、审查、验证
- **gstack** = 手脚（执行与外部世界层）：浏览器、QA、发布、部署、监控

两者配合形成完整闭环：想法 → brainstorming → writing-plans → worktrees → 执行+TDD → 浏览器验证 → 独立审查 → 发布上线。
