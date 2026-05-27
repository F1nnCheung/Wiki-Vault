---
title: 2.2.5 Claude Code 进阶：MCP 生态系统
type: tutorial
tags: [claude-code, mcp, ecosystem, extension, playwright]
created: 2026-05-11
updated: 2026-05-13
sources:
  - Wiki/wiki/topics/claude-code-mcp-ecosystem.md
  - Wiki/wiki/entities/mcp.md
  - 教程/AI-Coding/AI Coding 学习计划.md
related:
  - 04-进阶使用-Skill.md
  - 06-高阶指令.md
---

# 2.2.5 Claude Code 进阶：MCP 生态系统

> ⚠️ 社区共识：不装 MCP 的 Claude Code 只发挥了约三成功力。MCP 给 AI 连接外部世界的「手脚」——浏览器、数据库、GitHub、Figma……

---

## MCP 是什么

MCP（Model Context Protocol）是 Anthropic 推出的开源标准协议。它解决了 AI 的根本局限：**只能读文件和对话，不能实际操作外部系统**。

```
默认 Claude Code：
  ✅ 读文件 ✅ 写文件 ✅ 对话
  ❌ 操作浏览器 ❌ 查询数据库 ❌ 管理 GitHub

装了 MCP 的 Claude Code：
  ✅ 以上全部 + 🖥️ 浏览器 + 🗄️ 数据库 + 📦 GitHub + 🎨 Figma + ...
```

### 工作原理

```
AI ←→ MCP 协议 ←→ MCP Server ←→ 外部系统
                        ├── Playwright Server → 浏览器
                        ├── GitHub Server → GitHub API
                        ├── Database Server → PostgreSQL
                        └── Context7 Server → 最新文档
```

---

## 安装 MCP

### 基本命令

```bash
# 安装 MCP（默认 local，仅当前目录）
claude mcp add <名称> -- <启动命令>

# 指定安装范围：-s local（默认）| project（项目级）| user（用户级）
claude mcp add <名称> -s <范围> -- <启动命令>

# 示例：用户级安装 Playwright（所有项目可用）
claude mcp add playwright -s user -- npx @playwright/mcp@latest

# 示例：项目级安装（生成 .mcp.json，可 git 提交给团队共享）
claude mcp add playwright -s project -- npx @playwright/mcp@latest

# 查看已安装的 MCP
claude mcp list

# 删除 MCP
claude mcp remove <名称>
```

### 三种安装范围

| 参数 | 范围 | 存储位置 | 适用场景 |
|------|------|----------|----------|
| `-s local` | 当前目录 | 项目的 `.claude.json` | 默认值，仅当前项目 |
| `-s project` | **项目级** 🔑 | 项目根目录 `.mcp.json` | 可 git 提交，团队共享 |
| `-s user` | 用户级 | `~/.claude.json` | 所有项目通用 |

> 🔑 **优先级**：同名 MCP 多处定义时，Local > Project > User

**推荐策略**：与项目强相关的 MCP（Playwright、数据库连接）用 `-s project`，与项目无关的通用工具（Sequential Thinking）用 `-s user`。

### 配置文件

使用 `-s project` 安装后，会自动生成项目根目录的 `.mcp.json`：

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "github": {
      "command": "npx",
      "args": ["@anthropic/mcp-github"]
    }
  }
}
```

> ⚠️ 项目中有 `.mcp.json` 时，Claude Code 首次会要求手动审批才能激活其中的 MCP 服务器。可用 `claude mcp reset-project-choices` 重置审批状态。

---

## 10 大必装 MCP

| MCP                     | 功能            | 一句话                 | 优先级 |
| ----------------------- | ------------- | ------------------- | --- |
| **Playwright**          | 自动操作浏览器       | 浏览器里能做的事，AI 都能帮你自动做 | ⭐⭐⭐ |
| **Desktop Commander**   | 终端/进程/文件管理    | 让 AI 像人一样操作整台电脑     | ⭐⭐⭐ |
| **GitHub**              | PR/Issue/代码审查 | 代码仓库全流程管理           | ⭐⭐⭐ |
| **Context7**            | 最新框架文档注入      | 解决 AI 输出过时 API      | ⭐⭐  |
| **Filesystem**          | 文件系统操作        | 跨项目文件管理             | ⭐⭐  |
| **Git**                 | 版本控制增强        | 更精细的 Git 操作         | ⭐⭐  |
| **PostgreSQL/SQLite**   | 数据库直接操作       | 自然语言查询数据            | ⭐⭐  |
| **Sequential Thinking** | 分步推理          | 复杂问题结构化思考           | ⭐   |
| **Firecrawl**           | 网页内容抓取        | 批量网页数据采集            | ⭐   |
| **Fetch**               | 轻量 URL 读取     | 简单 HTTP 请求          | ⭐   |

---

## 按角色推荐组合

不是每个 MCP 都要装。按你的角色选择 2-4 个核心 MCP：

| 角色       | 推荐组合                                      | 覆盖场景                   |
| -------- | ----------------------------------------- | ---------------------- |
| **前端**   | Filesystem + Git + Figma + UI UX Pro Max  | 文件管理、版本控制、设计稿转代码、UI 质量 |
| **后端**   | Git + Prisma + FastAPI-MCP + SecureCode   | 版本控制、ORM、API 文档、安全     |
| **数据分析** | Context7 + mcp-run-python + 数据库MCP        | 文档查询、Python 执行、数据操作    |
| **全栈**   | Filesystem + Git + Pipedream + Claude Mem | 全链路覆盖                  |
| **新手起步** | Filesystem + Git + GitHub                 | 覆盖 90% 日常需求            |

---

## Playwright MCP 深度指南

Playwright MCP 是最能直观感受 MCP 价值的入口——它让 Claude Code 从「只写代码」进化到「写完自己验证」。

### 它能做什么

```
传统方式：
  写代码 → 手动启动服务 → 手动打开浏览器 → 手动测试 → 发现 Bug → 改代码 → 重复……

Playwright MCP 方式：
  写代码 → AI 启动服务 → AI 打开浏览器 → AI 自动测试 → AI 发现 Bug → AI 修复 → 循环
```

### 适用场景

- ✅ 表单验证（提交流程、错误提示）
- ✅ 登录/注册流程（完整路径测试）
- ✅ 管理后台按钮操作（CRUD 功能验证）
- ✅ 页面跳转检查（路由、导航）
- ✅ 弹窗/Toast 验证（UI 反馈确认）
- ✅ 可访问性检查（a11y 测试）

### 安全规则

在 `CLAUDE.md` 中添加 Playwright 的安全约束：

```markdown
## Playwright 安全规则
- 只允许访问本地测试地址（localhost、127.0.0.1）
- 禁止访问生产环境 URL
- 禁止在页面上输入真实密码/敏感数据
- 截图保存到 tests/screenshots/ 目录
```

---

## 避坑指南

### 1. 不要一次性装几十个

❌ 看到排行榜就全装了 → 冲突、Token 浪费、权限弹窗爆炸
✅ 按项目选 2-4 个核心 MCP → 用完再装

### 2. 使用项目级配置

❌ 默认 `local` 或 `-s user` → 配置不跟随代码，换机器/换人就丢失
✅ `-s project` → 生成 `.mcp.json`，随代码 git 提交，团队开箱即用

```bash
# 好的做法：项目级安装，配置跟着代码走
claude mcp add playwright -s project -- npx @playwright/mcp@latest
claude mcp add github -s project -- npx @anthropic/mcp-github
```

### 3. 先装 Playwright

Playwright 是最能让你直观感受到「AI 真的能做事」的 MCP——它能打开浏览器、点击按钮、填写表单。装完之后你会发现 AI Coding 的体验完全不一样。

---

## MCP vs Skills：如何选择

| 场景 | 用 MCP | 用 Skill |
|---|---|---|
| 需要操作外部系统 | ✅ 浏览器、数据库、GitHub | ❌ |
| 需要工作流程规范 | ❌ | ✅ 方法论、模板 |
| 需要实时数据 | ✅ 查最新文档 | ❌ |
| 需要设计规范 | ❌ | ✅ 设计系统、配色方案 |
| 需要自动化测试 | ✅ Playwright | ❌ |
| 需要代码质量检查 | ❌ | ✅ Review 流程 |

> 💡 记忆口诀：MCP = 工具（手脚），Skill = 方法论（大脑）。

---

## 本章小结

1. MCP 给 AI 连接外部世界的能力——浏览器、数据库、GitHub、Figma
2. 按角色选 2-4 个核心 MCP，不要贪多
3. 必装入门：Playwright（浏览器） + GitHub（代码仓库）
4. 使用项目级配置 `.mcp.json`，不要全局配置
5. 安全永远第一：限制访问范围，禁止生产环境操作

> 📖 **下一步**：Skill 和 MCP 都掌握了？继续阅读 [[06-高阶指令]]，学习那些高手才用的进阶命令和技巧。

---

> 📚 参考：[[Wiki/wiki/topics/claude-code-mcp-ecosystem|MCP 生态系统]] · [[Wiki/wiki/entities/mcp|MCP 实体页]]
