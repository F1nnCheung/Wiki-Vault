---
title: 3.1 OpenClaw 个人 AI Agent
type: tutorial
tags: [openclaw, agent, tutorial, installation]
created: 2026-05-11
updated: 2026-05-11
sources:
  - Wiki/wiki/topics/openclaw-guide.md
  - Wiki/wiki/entities/openclaw.md
  - 教程/AiCoding/AI Coding 学习计划.md
related:
  - 02-Hermes-Agent.md
  - 03-深度对比.md
---

# 3.1 OpenClaw 个人 AI Agent

> OpenClaw 不是 ChatBot——是 7×24 小时在线的 AI 员工。你可以像给同事发微信一样给它派任务。GitHub 24.7 万 Stars，是最大的开源 AI Agent。

---

## 概述

OpenClaw（原名 Clawdbot / Moltbot）是一个开源的**个人 AI Agent**。它运行在你的电脑上，通过 WhatsApp、Telegram、Discord、飞书等消息平台与你交互，能自主读写文件、执行命令、浏览网页。

**官网**：openclaw.ai

---

## OpenClaw 能做什么

```
不只是聊天——它能真正「做事」：

📧 "帮我把今天的重要邮件整理成摘要"
  → OpenClaw 检查邮箱 → 分析 → 生成摘要

🐍 "给我写一个 Python 脚本，每天备份数据库"
  → 生成脚本 → 测试运行 → 设置 cron 定时任务

🔍 "github.com/xxx 这个项目分析一下"
  → 克隆仓库 → 分析代码 → 生成分析报告

📊 "每周五把上周的 GitHub Issues 整理成周报"
  → 定期自动执行 → 发送到你的消息平台
```

---

## 核心特点

| 特点 | 说明 |
|---|---|
| **7×24 在线** | 电脑开着它就跑着 |
| **消息平台交互** | WhatsApp/Telegram/Discord/飞书/QQ |
| **自主执行** | 读写文件、执行命令、浏览网页 |
| **安全优先** | 默认安全设计，10+ 安全模块 |
| **Skill 生态** | 5700+ 社区 Skills |

---

## 安装

### 系统要求

| 项目 | 要求 |
|---|---|
| 操作系统 | macOS 12+ / Ubuntu 20.04+ / Debian 11+ / Windows（WSL2） |
| Node.js | v22+ |
| 内存 | 最低 2GB，推荐 4GB+ |

### 方式一：官方一键安装（推荐）

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

### 方式二：npm 安装

```bash
npm install -g openclaw@latest
```

### 方式三：Docker 部署（推荐生产环境）

```bash
docker pull openclaw/openclaw:latest
docker run -d --name openclaw --restart unless-stopped \
  -v ~/.openclaw:/data -p 3000:3000 \
  openclaw/openclaw:latest
```

---

## 初始化配置

```bash
# 进入配置向导
openclaw onboard
```

### 选择 AI 模型

| Provider | 说明 |
|---|---|
| Anthropic | Claude 系列（最强，但可能封号） |
| OpenAI | GPT 系列 |
| DeepSeek | 性价比高，国内友好 |
| 阿里云百炼 | 有免费额度 |
| Ollama | 本地模型（零成本） |

```bash
# 示例：配置阿里云百炼
openclaw config set model.provider aliyun_bailian
openclaw config set model.aliyun_bailian.api_key "你的API-Key"
```

### 配置消息平台

```bash
# Telegram
openclaw config set channels.telegram.botToken "你的Bot Token"

# 飞书
openclaw config set channels.feishu.appId "cli_xxxxx"
openclaw config set channels.feishu.appSecret "your_secret"
openclaw config set channels.feishu.enabled true
```

---

## 日常使用

```bash
# 启动
openclaw gateway start

# 查看状态
openclaw gateway status

# 停止
openclaw gateway stop

# 查看日志
openclaw logs --follow

# 健康检查
openclaw doctor
```

---

## Skills 安装

OpenClaw 拥有 5700+ 社区 Skills，通过 ClawHub 安装：

```bash
# 搜索
clawhub search "财经分析"

# 安装
clawhub install skill-name

# 查看已安装
openclaw skills list
```

**推荐 Skills**：

| Skill | 用途 |
|---|---|
| skill-vetter | 扫描已安装 Skill 的安全性 |
| boot-md | 启动时的上下文注入 |
| command-logger | 记录所有操作日志 |
| session-memory | 跨会话持久记忆 |

---

## 安全建议

1. **不要暴露公网**：使用 VPN / IP 白名单
2. **仅安装可信 Skill**：优先用 skill-vetter 扫描
3. **Docker 隔离**：推荐在容器中运行
4. **保护密钥**：API Key 不要硬编码，用环境变量

---

## OpenClaw 的定位

OpenClaw 适合：
- 🟢 首次尝试 Agent 的用户（安装简单）
- 🟢 需要安全合规的企业环境
- 🟢 轻量日常任务自动化

OpenClaw 不太适合：
- 🔴 需要 Agent 自己学习改进（选 Hermes）
- 🔴 深度依赖飞书/钉钉/企业微信（选 Hermes）

---

## 本章小结

1. OpenClaw = 7×24 在线个人 AI Agent
2. 通过 WhatsApp/Telegram/Discord/飞书 派任务
3. 安装简单（一键脚本），安全优先设计
4. 5700+ Skills 生态，功能可扩展
5. 适合：Agent 入门、企业环境、轻量自动化

> 📖 **下一步**：继续阅读 [[02-Hermes-Agent]]，了解具有自进化能力的 AI Agent。然后看 [[03-深度对比]] 做出选择。

---

> 📚 参考：[[Wiki/wiki/topics/openclaw-guide|OpenClaw 完整教程]] · [[Wiki/wiki/entities/openclaw|OpenClaw 实体页]]
