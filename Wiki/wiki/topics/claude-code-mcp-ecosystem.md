---
title: Claude Code MCP 生态系统
type: topic
tags: [claude-code, mcp, ecosystem, extension]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/Claude Code/2026年Claude Code 必装 MCP 排行榜：最火20个插件，帮你整理好了！.md
  - raw/articles/Claude Code/90%的人都在裸奔Claude Code，10大必装MCP推荐.md
  - raw/articles/Claude Code/给 Claude Code 接上 Playwright MCP：让它不只写代码，还能自己验页面.md
related:
  - entities/mcp.md
  - entities/claude-code.md
  - topics/claude-code-skills-ecosystem.md
---

# Claude Code MCP 生态系统

> ⚠️ 社区共识：不装 MCP 的 Claude Code 只发挥了约三成功力。

## 什么是 MCP

MCP（Model Context Protocol）是 Anthropic 推出的开源标准协议。类比 USB-C——它为 AI 连接外部系统提供标准化方式。默认 Claude Code 只能读写文件和对话，MCP 让它能操作浏览器、连接数据库、管理 GitHub、查阅最新文档。

## MCP 排行榜 Top 15（按 GitHub Stars）

| 排名 | MCP | Stars | 用途 |
|---|---|---|---|
| 1 | Filesystem MCP | 64k | 文件系统操作 |
| 2 | Git MCP | 64k | Git 版本控制 |
| 3 | Prisma MCP | 43k | 数据库 ORM 集成 |
| 4 | Context7 MCP | 26k | 最新库文档注入，防幻觉 |
| 5 | GitHub MCP | 21k | PR/Issue/代码审查 |
| 6 | Task Master | 21k | 任务管理 |
| 7 | Repomix | 19k | 仓库打包分析 |
| 8 | BlenderMCP | 13k | 3D 建模 |
| 9 | mcp-run-python | 12k | Python 代码执行 |
| 10 | Pipedream | 10k | 工作流自动化 |
| 11 | Figma MCP | 9.9k | 设计稿转代码 |
| 12 | 数据库MCP工具箱 | 9.2k | 多数据库支持 |
| 13 | Serena | 8.7k | 代码理解 |
| 14 | FastAPI-MCP | 7.9k | API 文档生成 |
| 15 | Fonoster MCP | 6.7k | 语音通信 |

## 按角色推荐安装组合

| 角色 | 推荐组合 | 覆盖场景 |
|---|---|---|
| **前端** | Filesystem + Git + Figma + UI UX Pro Max | 文件管理、版本控制、设计稿转代码、UI 质量 |
| **后端** | Git + Prisma + FastAPI-MCP + SecureCode | 版本控制、ORM、API 文档、安全管理 |
| **数据分析** | Context7 + mcp-run-python + 数据库MCP | 文档查询、Python 执行、数据操作 |
| **全栈** | Filesystem + Git + Pipedream + Claude Mem | 全链路覆盖 |
| **新手起步** | Filesystem + Git + GitHub | 覆盖 90% 日常需求 |

## 10 大必装 MCP（实战推荐）

| MCP                     | 功能             | 一句话                   |
| ----------------------- | -------------- | --------------------- |
| **Playwright**          | 自动操作浏览器        | 浏览器里能手动做的事，AI 都能帮你自动做 |
| **Desktop Commander**   | 终端命令/进程管理/文件搜索 | 让 AI 像人一样操作整台电脑       |
| **GitHub**              | PR/Issue/代码审查  | 代码仓库全流程管理             |
| **Context7**            | 最新框架文档注入       | 解决 AI 输出过时 API 的问题    |
| **Firecrawl**           | 网页内容抓取         | 批量网页数据采集              |
| **Fetch**               | 轻量 URL 读取      | 简单 HTTP 请求            |
| **PostgreSQL/SQLite**   | 数据库直接操作        | 自然语言查询数据              |
| **Sequential Thinking** | 分步推理           | 复杂问题结构化思考             |
| **飞书 MCP**              | 飞书文档/多维表格      | 企业协作集成                |
| **Excel MCP**           | Excel 读写/公式/汇总 | 办公表格处理                |

## 避坑指南

1. **不要一次性装几十个**：按项目选 2-4 个核心 MCP
2. **使用项目级配置**：`.mcp.json` 而非全局配置，避免冲突
3. **阅读配置说明**：每个 MCP 的依赖和启动方式不同
4. **先装 Playwright**：最能直观感受 MCP 价值的入口

## Playwright MCP 深度指南

Playwright MCP 将 Claude Code 从"只写代码"推进到"写完之后自己验证页面"：

**完整闭环**：
```
读代码 → 修改 → 启动本地服务 → 打开页面
  → 操作页面 → 根据结果再修 → 输出验证报告
```

**适用场景**：表单验证、登录/注册流程、管理后台按钮操作、页面跳转检查、弹窗/Toast 验证、可访问性检查

**安全规则**（写入 `CLAUDE.md`）：
- 只允许本地测试地址
- 禁止生产环境写入
- 敏感操作必须先询问
