---
title: OpenClaw 完整教程
type: topic
tags: [openclaw, clawdbot, agent, installation, tutorial]
created: 2026-05-09
updated: 2026-05-09
sources: []
related:
  - entities/openclaw.md
  - topics/hermes-agent-guide.md
  - topics/ai-coding-concepts.md
---

# OpenClaw 完整教程

## 一、介绍

OpenClaw（原名 Clawdbot / Moltbot）是一个开源的**个人 AI Agent**。它运行在你的电脑上，7×24 小时在线，通过 WhatsApp、Telegram、Discord、飞书等消息平台与你交互，能自主读写文件、执行命令、浏览网页。

**官网**：openclaw.ai | GitHub：24.7 万+ Stars

**一句话**：不是 ChatBot——是 AI 员工。你可以像给同事发微信一样给它派任务。

---

## 二、安装

### 系统要求

| 项目 | 要求 |
|---|---|
| 操作系统 | macOS 12+ / Ubuntu 20.04+ / Debian 11+ / Windows（WSL2） |
| Node.js | v22+ |
| 内存 | 最低 2GB，推荐 4GB+ |
| 磁盘 | 最低 1GB |

### 方式一：官方一键安装（推荐）

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

### 方式二：npm 安装

```bash
npm install -g openclaw@latest
```

### 方式三：Docker 部署

```bash
docker pull openclaw/openclaw:latest
docker run -d --name openclaw --restart unless-stopped \
  -v ~/.openclaw:/data -p 3000:3000 \
  openclaw/openclaw:latest
```

---

## 三、初始化配置

```bash
# 进入配置向导
openclaw onboard
```

配置向导依次设置：

### 3.1 选择 AI 模型

| Provider | 说明 |
|---|---|
| Anthropic | Claude 系列（最好但可能被封） |
| OpenAI | GPT 系列 |
| DeepSeek | 性价比高，国内友好 |
| 阿里云百炼 | 有免费额度 |
| MiniMax | 国产模型 |
| Ollama | 本地模型（零成本） |

```bash
# 示例：配置阿里云百炼
openclaw config set model.provider aliyun_bailian
openclaw config set model.aliyun_bailian.api_key "你的API-Key"
```

### 3.2 配置消息平台

```bash
# Telegram
openclaw config set channels.telegram.botToken "你的Bot Token"

# 飞书
openclaw config set channels.feishu.appId "cli_xxxxx"
openclaw config set channels.feishu.appSecret "your_secret"
openclaw config set channels.feishu.enabled true

# Discord
openclaw config set channels.discord.botToken "your_token"
```

---

## 四、日常使用

### 启动与停止

```bash
# 启动 Gateway
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

### 通过消息平台交互

配置完成后，直接在 WhatsApp/Telegram/Discord 上与 OpenClaw 对话：

```
你：「帮我把今天的重要邮件整理成摘要」
OpenClaw：「好的，正在检查邮箱...」（自动执行）

你：「给我写一个 Python 脚本，每天备份数据库」
OpenClaw：生成脚本 → 测试 → 设置 cron 定时任务

你：「github.com/xxx 这个项目分析一下」
OpenClaw：「正在克隆仓库...」（分析后给出报告）
```

---

## 五、Skills 技能安装

### ClawHub 安装

```bash
# 搜索 Skill
clawhub search "财经分析"

# 安装
clawhub install skill-name
```

### 手动安装

```bash
git clone <Skill仓库URL> ~/.openclaw/workspace/skills/<技能名>
openclaw skills list  # 查看已安装
```

### 推荐 Skills

| Skill | 用途 |
|---|---|
| skill-vetter | 扫描已安装 Skill 的安全性 |
| boot-md | 启动时的上下文注入 |
| command-logger | 记录所有操作日志 |
| session-memory | 跨会话持久记忆 |

---

## 六、安全建议

1. **不要暴露公网**：使用 VPN / IP 白名单
2. **仅安装可信 Skill**：优先用 skill-vetter 扫描
3. **Docker 隔离**：推荐在容器中运行
4. **保护密钥**：API Key 不要硬编码，用环境变量
