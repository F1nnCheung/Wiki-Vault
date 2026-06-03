---
title: MCP 协议
type: tutorial
tags: [MCP, Client-Server, 工具暴露, Playwright, GitHub, Context7]
created: 2026-06-02
updated: 2026-06-02
sources:
  - Wiki/wiki/entities/mcp.md
  - Wiki/wiki/topics/claude-code-mcp-ecosystem.md
related:
  - 00-MCP与本地部署学习指南.md
  - 02-Function Calling.md
---

# 第一章：MCP 协议

> 📖 对应学习计划 Day 1-3。深度内容见 [[Wiki/wiki/entities/mcp|MCP 实体页]] 和 [[Wiki/wiki/topics/claude-code-mcp-ecosystem|MCP 生态系统]]。

---

## 1.1 MCP 是什么？

MCP（Model Context Protocol）是 Anthropic 推出的**开源标准协议**，用于将 AI 应用连接到外部数据源和工具。类比 USB-C——为 AI 接入外部系统提供了标准化方式。

**一句话**：MCP 是 AI 的「手脚」。默认 Claude Code 只能读文件和对话，装上 MCP 后能操作浏览器、管理 GitHub、查最新文档、连接数据库。

```
AI ←→ MCP ←→ 浏览器 / 数据库 / GitHub / Figma / ...
```

> ⚠️ **社区共识**：不装 MCP 的 Claude Code 只发挥了约三成功力。

---

## 1.2 Client-Server 架构

MCP 采用经典的 Client-Server 模式：

```
┌──────────┐        ┌──────────┐        ┌──────────┐
│ AI Host  │ ←────→ │MCP Client│ ←────→ │MCP Server│
│ (Claude) │        │ (内置)    │        │ (工具实现)│
└──────────┘        └──────────┘        └──────────┘
```

| 角色 | 说明 | 示例 |
|------|------|------|
| **AI Host** | AI 应用本身 | Claude Code、Cursor、Trae、Codex |
| **MCP Client** | 协议客户端（内置于 Host） | Claude Code 内置的 MCP Client |
| **MCP Server** | 提供具体能力的服务 | Playwright MCP（浏览器操作）、GitHub MCP（仓库管理） |

### MCP Server 的三种通信方式

| 方式 | 协议 | 适用 |
|------|------|------|
| **stdio** | 标准输入/输出 | 本地工具（Claude Code 启动子进程，通过 stdin/stdout 通信） |
| **SSE** | Server-Sent Events | 远程 HTTP 服务 |
| **Streamable HTTP** | HTTP + 流式响应 | 2025 新版，替代 SSE |

---

## 1.3 消息格式与工具暴露机制

MCP 使用 JSON-RPC 2.0 消息格式。核心消息类型：

| 方法 | 方向 | 说明 |
|------|------|------|
| `tools/list` | Client → Server | 获取可用工具列表 |
| `tools/call` | Client → Server | 调用具体工具 |
| `resources/list` | Client → Server | 获取可用资源（文件/数据） |
| `resources/read` | Client → Server | 读取资源内容 |
| `prompts/list` | Client → Server | 获取预置提示词模板 |

### Tool vs Resource vs Prompt

| 概念 | 含义 | 示例 |
|------|------|------|
| **Tool** | AI 可以调用的**操作** | `browser_navigate(url)` |
| **Resource** | AI 可以读取的**数据** | 数据库表结构、日志文件 |
| **Prompt** | 预置的**提示词模板** | 「帮我审查这段代码的 SQL 注入风险」 |

---

## 1.4 核心 MCP 安装实战

### Playwright MCP（浏览器操作）

```bash
# 安装
claude mcp add playwright -- npx @playwright/mcp@latest

# 功能：AI 能做的事情
# - 打开网页、填表、点击按钮
# - 截图验证页面效果
# - 测试登录/注册/表单提交流程
# - 检查页面可访问性
```

**验证安装**：在 Claude Code 中说「打开 https://example.com，截图给我看」

### GitHub MCP（仓库管理）

```bash
# 安装
claude mcp add github -- npx @anthropic/mcp-github

# 功能
# - 创建/管理 PR 和 Issue
# - 代码审查
# - 搜索仓库内容
# - 管理分支和标签
```

### Context7 MCP（最新文档注入）

```bash
# 安装
claude mcp add context7 -- npx @context7/mcp

# 功能：注入最新版本框架文档，防止 AI 用过时的 API
# 适用：遇到「AI 建议的 API 不存在」问题时
```

---

## 1.5 实战：用 MCP 完成一次完整开发验证

```
「帮我修复 src/login.ts 的表单验证问题，然后在浏览器里验证修复是否生效」

Claude Code 使用：
1. Filesystem MCP → 读取并修改 login.ts
2. Playwright MCP → 启动浏览器 → 打开本地页面 → 测试表单
3. 如果验证失败 → 读取 Playwright MCP 的截图 → 继续修复
```

---

## 1.6 按角色推荐 MCP 组合

| 角色 | 推荐组合 | 理由 |
|------|---------|------|
| **前端** | Filesystem + Playwright + Figma + Context7 | 浏览器验证 + 设计稿转代码 + 最新文档 |
| **后端** | Filesystem + GitHub + PostgreSQL + Context7 | 版本管理 + 数据库直连 + 最新 API |
| **全栈** | Filesystem + Playwright + GitHub + Context7 | 前后端全覆盖 |
| **数据分析** | Context7 + mcp-run-python + SQLite | Python 执行 + 数据库查询 |
| **新手起步** | Filesystem + Playwright + GitHub | 能直观体验 MCP 价值的组合 |

---

## 1.7 MCP 避坑指南

1. **不要一次性装太多**：按项目选 2-4 个核心 MCP，多了反而让 AI 混淆
2. **优先项目级配置**：使用 `.mcp.json`（项目根目录）而非全局配置，方便团队共享
3. **先装 Playwright**：最能直观感受 MCP 价值的入口——AI 操作浏览器让你亲眼看到效果
4. **注意权限**：MCP 给了 AI 操作外部系统的能力，生产环境要控制权限范围
5. **stdio 模式更安全**：优先使用本地 stdio 模式，避免不必要的网络暴露

---

## 1.8 本章实战练习

- [ ] 安装 Playwright MCP，让 AI 打开一个网页并截图
- [ ] 安装 GitHub MCP，让 AI 查看你的仓库状态
- [ ] 安装 Context7 MCP，让 AI 用最新框架文档回答问题
- [ ] 设计你常用的 MCP 组合（按你的角色选 3-4 个）

---

> 📖 继续学习 [[02-Function Calling|第二章：Function Calling]]——手写 Agent 工具调度器，理解 MCP 的底层基础。
