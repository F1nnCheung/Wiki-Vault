---
title: Claude Code Superpowers + gstack 工作流
type: topic
tags: [claude-code, superpowers, gstack, workflow, methodology]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/claude/用了 Superpowers，我的 Claude Code 返工少了九成.md
  - raw/articles/claude/实战篇 Claude Code + superpowers + gstack 开发流程实录，可直接复制使用，一篇文章讲清楚！.md
  - raw/articles/claude/Claude Code + MiniMax 2.7 + Superpowers：我是怎么真正交付一套生产系统的.md
related:
  - entities/superpowers.md
  - entities/gstack.md
  - entities/claude-code.md
  - topics/claude-code-skills-ecosystem.md
---

# Claude Code Superpowers + gstack 工作流

## 核心理念：大脑 + 手脚

```
Superpowers（大脑）        gstack（手脚）
├── brainstorming          ├── /browse（浏览器验证）
├── writing-plans          ├── /qa（端到端测试）
├── executing-plans        ├── /ship（发布流水线）
├── TDD                    ├── /land-and-deploy（部署）
├── systematic-debugging   ├── /canary（上线监控）
├── code-review            ├── /retro（周回顾）
└── verification           └── /careful + /freeze（安全护栏）
```

## 完整开发闭环

```
想法
  ↓
[Superpowers] brainstorming              ← 想清楚要做什么
  ↓
[Superpowers] writing-plans              ← 写可执行计划
  ↓
[gstack] /plan-eng-review                ← 多视角审查
  ↓
[Superpowers] using-git-worktrees        ← 隔离工作环境
  ↓
[Superpowers] executing-plans + TDD      ← 严格按计划执行
  ↓
[gstack] /browse 或 /qa                  ← 真实环境验证
  ↓
[Superpowers] verification-before-       ← 收集完成证据
              completion
  ↓
[Superpowers] requesting-code-review     ← 独立 reviewer 通道
  ↓
[Superpowers] finishing-a-development-   ← 分支收尾
              branch
  ↓
[gstack] /ship                           ← 发布流水线
  ↓
[gstack] /land-and-deploy                ← 合并部署
  ↓
[gstack] /canary                         ← 上线监控
  ↓
完成
```

## 任务分流策略

| 任务类型 | 流程深度 | 示例 |
|---|---|---|
| **轻量** | 直接实现 + 定向验证 | 改 typo、修单文件 bug、配置调整 |
| **中等** | 简短 brainstorm + 短 writing-plans + 验证 | 多文件新功能、边界清晰的重构 |
| **大型** | 完整闭环 | 跨模块架构变更、新公共 API |

## 关键交接点（最易出错）

1. **executing-plans → /browse**：代码写完必须用真实环境验证——跳过这一步是"我以为修好了"的根源
2. **verification → code-review**：自检和他人审查是两个独立上下文，**不能合并**（合在一起等于作弊）
3. **finishing-branch → /ship**：Superpowers 最后一步交接给 gstack 第一步
4. **/ship → /canary**：发布不是结束——必须监控 30 分钟确认无 regression

## 五条铁律

1. **浏览器只走 `/browse`**：禁用底层 MCP 浏览器原语
2. **作者不能审自己的代码**：AI 写完代码后在同一上下文自审只会找无关痛痒的瑕疵
3. **没证据不算完成**：测试报告 + 截图 + QA 报告，三缺一不算
4. **歧义先 brainstorm**：5 分钟头脑风暴能省 5 小时返工
5. **危险命令先 `/careful`**：rm -rf / DROP TABLE / force-push 一律先走护栏

## 实战案例：生产级全栈交付

使用 Claude Code + MiniMax 2.7 + Superpowers 交付微服务架构的关键经验：

1. **上下文工程**：CLAUDE.md 只放约束和索引，需求放 `doc/需求文档/` 目录渐进式加载
2. **新话题开新会话**：避免主会话被分叉污染
3. **配置日志路径**：让模型自主 debug，而非人工翻日志
4. **错误回写**：模型犯过的错误写入需求文档形成"错题本"
5. **人始终 in the loop**：同时 2-3 个会话是上限，核心决策由人做出

## 不适合这套的情况

- 纯后端库/SDK 开发（gstack 的浏览器/QA 用不上）
- 无正规 CI/PR 发布流程的小团队
- 追求极简的资深开发者（可选只装 gstack）
