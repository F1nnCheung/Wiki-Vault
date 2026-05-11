---
title: 4.2 Superpowers + gstack 进阶开发闭环
type: tutorial
tags: [superpowers, gstack, claude-code, workflow, methodology]
created: 2026-05-11
updated: 2026-05-11
sources:
  - Wiki/wiki/topics/claude-code-superpowers-workflow.md
  - Wiki/wiki/entities/superpowers.md
  - Wiki/wiki/concepts/superpowers-design-philosophy.md
  - 教程/AI Coding 学习计划.md
related:
  - 01-Obsidian-AI知识库工作流.md
  - 03-其他拓展工具与场景.md
---

# 4.2 Superpowers + gstack 进阶开发闭环

> 这是 AI Coding 的「生产级」方案。Superpowers 提供思考框架，gstack 提供执行工具——两者配合形成从想法到监控的完整闭环。

---

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

---

## 完整开发闭环

这是从「一个想法」到「上线监控」的完整路径：

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
[gstack] /canary                         ← 上线监控（30 分钟）
  ↓
完成
```

---

## 五条铁律

### 1. 浏览器只走 `/browse`

禁用底层 MCP 浏览器原语——所有浏览器操作必须经过 gstack 的 `/browse` 命令。这确保：
- 所有浏览器操作有审计日志
- 敏感操作有二次确认
- 不会误操作生产环境

### 2. 作者不能审自己的代码

AI 写完代码后在同一上下文自审，只会找无关痛痒的瑕疵。**必须**用独立 reviewer 通道——不同上下文、不同视角。

### 3. 没证据不算完成

```
完成 ≠ 代码写好了
完成 = 测试报告 + 截图 + QA 报告，三缺一不算
```

### 4. 歧义先 brainstorm

5 分钟头脑风暴能省 5 小时返工。在写代码之前想清楚：
- 到底要解决什么问题？
- 有哪些可能的方案？
- 选哪个方案？为什么？

### 5. 危险命令先 `/careful`

```
rm -rf / DROP TABLE / force-push / 删除数据库
→ 一律先走 /careful 安全护栏
```

---

## 任务分流策略

不是所有任务都需要走完整闭环。按复杂度分级：

| 任务类型 | 流程深度 | 示例 |
|---|---|---|
| **轻量** | 直接实现 + 定向验证 | 改 typo、修单文件 bug、配置调整 |
| **中等** | 简短 brainstorm + 短 writing-plans + 验证 | 多文件新功能、边界清晰的重构 |
| **大型** | 完整闭环（14 步） | 跨模块架构变更、新公共 API |

### 实操判断

```
这个改动会影响几个文件？
├── 1 个 → 轻量（直接实现）
├── 2-5 个 → 中等（brainstorm + plan + verify）
└── 5+ 个 或 改变 API → 大型（完整闭环）
```

---

## 关键交接点（最易出错）

### 交接点 1：executing-plans → /browse

**最容易被跳过的步骤**。代码写完必须用真实环境验证——打开浏览器、点击按钮、检查页面。

> 跳过这一步是「我以为修好了」的根源。

### 交接点 2：verification → code-review

**最容易被合并的步骤**。自检和他人审查是两个独立上下文。

> 合在一起等于作弊——同一双眼睛看不出自己的问题。

---

## 安装与配置

### Superpowers

```bash
npx skills add superpowers
```

安装后 Claude Code 会自动应用 14 个方法论。

### gstack

```bash
npx skills add gstack
```

安装后获得 `/browse`、`/qa`、`/ship`、`/land-and-deploy`、`/canary`、`/retro`、`/careful`、`/freeze` 命令。

---

## 日常使用模式

### 启动新功能

```
1. brainstorming（"我想做一个用户通知系统"）
2. writing-plans（AI 生成详细计划）
3. /plan-eng-review（多视角审查计划）
4. 确认计划 → 开始执行
```

### 执行过程中

```
1. executing-plans + TDD（写代码 + 写测试）
2. 每完成一个模块 → /browse 验证
3. 发现问题 → systematic-debugging
4. 全部完成 → verification-before-completion
```

### 上线前

```
1. requesting-code-review（独立审查）
2. finishing-a-development-branch（分支收尾）
3. /ship（发布）
4. /land-and-deploy（部署）
5. /canary（监控 30 分钟）
```

---

## 为什么需要这套流程

### 没有 Superpowers 的 Claude Code

```
你："做一个用户认证系统"
AI：直接开始写代码
结果：可能方向偏了、缺少测试、没有验证
返工：多次修改、Token 浪费
```

### 有了 Superpowers 的 Claude Code

```
你："做一个用户认证系统"
AI：先 brainstorming 确认需求
  → writing-plans 制定方案
  → 你确认
  → TDD 严格实现
  → /browse 真实验证
  → code-review 独立审查
结果：一次到位，返工极少
```

---

## 本章小结

1. Superpowers = 大脑（14 个方法论），gstack = 手脚（执行和验证）
2. 完整闭环：想法 → 规划 → 执行 → 验证 → 审查 → 部署 → 监控
3. 五条铁律是质量保证的核心
4. 按任务复杂度分级处理，不要所有任务都走完整闭环
5. 最易出错的交接点：验证和独立审查

> 📖 **下一步**：阅读 [[03-其他拓展工具与场景]]，了解 Figma → 代码、Playwright MCP、Claude HUD 等其他拓展工具。

---

> 📚 参考：[[Wiki/wiki/topics/claude-code-superpowers-workflow|Superpowers 工作流]] · [[Wiki/wiki/entities/superpowers|Superpowers]] · [[Wiki/wiki/concepts/superpowers-design-philosophy|设计哲学]]
