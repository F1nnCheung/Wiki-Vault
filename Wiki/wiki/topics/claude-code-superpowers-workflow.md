---
title: Claude Code Superpowers + gstack 工作流
type: topic
tags: [claude-code, superpowers, gstack, workflow, methodology, cross-platform]
created: 2026-05-09
updated: 2026-05-11
sources:
  - raw/articles/Claude Code/用了 Superpowers，我的 Claude Code 返工少了九成.md
  - raw/articles/Claude Code/实战篇 Claude Code + superpowers + gstack 开发流程实录，可直接复制使用，一篇文章讲清楚！.md
  - raw/articles/Claude Code/Claude Code + MiniMax 2.7 + Superpowers：我是怎么真正交付一套生产系统的.md
  - raw/articles/Superpowers 深度实战指南：从入门到精通.md
related:
  - entities/superpowers.md
  - concepts/superpowers-design-philosophy.md
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

## Superpowers 跨平台说明

虽然本页以 Claude Code + gstack 为主线，但 **Superpowers 本身是跨平台框架**，支持 8 个平台。各平台通过不同机制注入 bootstrap 上下文：

| 路径 | 平台 | 注入机制 |
|------|------|---------|
| **A: Hook 驱动** | Claude Code / Cursor / GitHub Copilot CLI | `hooks/session-start` → JSON context |
| **B: 插件 Transform** | OpenCode | `.opencode/plugins/` → 消息变换 + 技能目录注册 |
| **C: 上下文文件引用** | Gemini CLI | `GEMINI.md` → `@./skills/using-superpowers/SKILL.md` |

无论哪种路径，`using-superpowers` 入口技能是所有平台共享的行为起点。详见 [[entities/superpowers#工作原理：三种 Bootstrap 路径|Superpowers 工作原理]]。

## 完整实战演练：React Todo List

以下展示 Superpowers 在 Claude Code hook 路径下的完整执行过程。

### Step 1：会话启动

代理启动后，`session-start` 钩子注入 `<EXTREMELY_IMPORTANT>` 包裹的 bootstrap 上下文，其中包含 `using-superpowers` 技能正文：

```
<EXTREMELY_IMPORTANT>
You have superpowers.

[using-superpowers 技能正文 + 平台说明]
</EXTREMELY_IMPORTANT>
```

### Step 2：用户输入

用户说："Let's make a react todo list"

### Step 3：brainstorming 自动触发

代理检测到"创建功能"，根据 `using-superpowers` 的铁律（有 1% 可能技能适用就必须调用），自动进入 `brainstorming`：

```
代理: I'm using the brainstorming skill to explore this design.
Let me first check the project context...

[探索项目文件、文档、最近提交]

代理: 在深入之前——有些内容通过浏览器展示会更直观。想试试 visual companion 吗？

用户: No thanks

代理: 好的。让我问你几个问题来理解需求。

这个 todo list 的主要使用场景是什么？
A) 个人任务管理
B) 共享团队任务
C) 学习/演示项目
D) 其他

用户: C, learning project

代理: todos 需要在页面刷新后保持吗？
A) localStorage 持久化
B) 不持久化（仅内存中）
C) 后端 API

用户: B
```

继续一次一个问题地澄清需求。设计确认后，代理分段呈现组件架构：

```
**Section 1: Component Architecture**
- App (root)
  - TodoInput (add new todo)
  - TodoList (display todos)
    - TodoItem (single todo with toggle/delete)
  - TodoFilter (all/active/completed)

Does this look right?
```

全部确认后，写设计文档并提交 → 自审 → 用户审阅。

### Step 4：writing-plans

设计批准后，代理调用 `writing-plans`，生成类似这样的计划文件：

```markdown
# React Todo List Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development

**Goal:** Build a React todo list with add, toggle, delete, and filter
**Tech Stack:** React, Vite, CSS Modules

---

### Task 1: Project Setup
**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`

- [ ] **Step 1: Initialize project**
  Run: `npm create vite@latest . -- --template react`

- [ ] **Step 2: Verify setup**
  Run: `npm run dev`
  Expected: Dev server starts on localhost:5173

- [ ] **Step 3: Commit**

### Task 2: TodoItem Component
**Files:**
- Create: `src/components/TodoItem.jsx`
- Test: `src/components/TodoItem.test.jsx`

- [ ] **Step 1: Write failing test**
  ...
```

### Step 5：subagent-driven-development

代理读取计划，为每个任务派发子代理（实现者 → 规格审查 → 质量审查）：

```
[派发实现者子代理执行 Task 1]
实现者: DONE - Project initialized, dev server running

[派发规格审查者]
规格审查者: Spec compliant

[派发代码质量审查者]
质量审查者: Approved

[标记 Task 1 完成，继续 Task 2...]
```

所有任务完成后，派发最终代码审查 → `finishing-a-development-branch` 收尾。

## 不适合这套的情况

- 纯后端库/SDK 开发（gstack 的浏览器/QA 用不上）
- 无正规 CI/PR 发布流程的小团队
- 追求极简的资深开发者（可选只装 gstack）
- 快速原型（brainstorming 流程会增加前期时间）
- 单文件脚本（工作流开销不值得）
- 不支持 bootstrap 上下文注入或技能发现机制的代理平台
