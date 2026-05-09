---
title: MCP（Model Context Protocol）
type: entity
tags: [mcp, protocol, ai, extension]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/claude/2026年Claude Code 必装 MCP 排行榜：最火20个插件，帮你整理好了！.md
  - raw/articles/claude/90%的人都在裸奔Claude Code，10大必装MCP推荐.md
  - raw/articles/claude/给 Claude Code 接上 Playwright MCP：让它不只写代码，还能自己验页面.md
related:
  - topics/claude-code-mcp-ecosystem.md
  - entities/claude-code.md
---

# MCP（Model Context Protocol）

MCP 是 Anthropic 推出的开源标准协议，用于将 AI 应用连接到外部数据源和工具。类比 USB-C——它为 AI 接入外部系统提供了标准化方式。

## 核心价值

默认 Claude Code 只能读写文件和对话。MCP 让它能：
- 🖥️ **操作浏览器**（Playwright MCP）：自动填表、截图、验证页面行为
- 📦 **管理仓库**（GitHub MCP）：创建 PR、审查代码、管理 Issue
- 📚 **查阅文档**（Context7）：注入最新版本框架文档，防止 AI 幻觉
- 🗄️ **连接数据库**（PostgreSQL/SQLite MCP）：自然语言查询数据
- 🔧 **桌面控制**（Desktop Commander）：操作终端、进程管理、文件搜索

> ⚠️ 社区共识：不装 MCP 的 Claude Code 只发挥了约三成功力。

## 安装方式

```bash
# 一行命令安装
claude mcp add <名称> -- <启动命令>

# 示例：安装 Playwright
claude mcp add playwright -- npx @playwright/mcp@latest

# 查看已安装
claude mcp list
```

## 配置范围

- **Local**：当前目录
- **Project**：当前项目（推荐，利于团队协作）
- **User**：所有项目

## 核心 MCP 分类

| 类别 | 推荐 MCP | 用途 |
|---|---|---|
| 基础必装 | Filesystem + Git + GitHub | 覆盖 90% 日常需求 |
| 浏览器 | Playwright | AI 操作浏览器验证页面 |
| 文档 | Context7 | 最新文档注入防幻觉 |
| 数据库 | PostgreSQL/SQLite | 自然语言查询 |
| 部署 | Vercel / Supabase | 一键部署 |
| 设计 | Figma MCP | 设计稿转代码 |
