---
title: Hermes Agent 完整教程
type: topic
tags: [hermes-agent, tutorial, installation, self-evolving]
created: 2026-05-09
updated: 2026-05-09
sources: []
related:
  - entities/hermes-agent.md
  - topics/openclaw-guide.md
  - topics/ai-coding-concepts.md
---

# Hermes Agent 完整教程

## 一、介绍

Hermes Agent 是 Nous Research 开发的开源 AI Agent（MIT 许可证），核心特点是**自进化**——能从完成任务中自动提炼可复用 Skill，越用越聪明。

> 注：中文社区有时称其为「爱马仕」（Hermès 谐音梗）。

**GitHub**：github.com/NousResearch/hermes-agent | 5.2 万+ Stars

**核心特点**：
- 🧬 自学习循环：自动从成功操作中提炼 Skill
- 🧠 跨会话持久记忆
- 🌐 16 个消息平台支持
- 🔌 模型无关：支持 22+ LLM 提供商
- 🛠️ 40+ 内置工具

---

## 二、安装

### 系统要求

| 组件 | 最低 | 推荐 |
|---|---|---|
| 操作系统 | Linux / macOS / WSL2 | Ubuntu 22.04 |
| Python | 3.10+ | 3.11+ |
| 内存 | 4GB | 16GB+ |
| 存储 | 2GB | 10GB |

> ⚠️ 不支持原生 Windows，需通过 WSL2 或 Docker。

### 方式一：一键安装（推荐）

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

# 加载环境变量
source ~/.bashrc

# 验证
hermes --version
# 预期：hermes v0.11.0
```

### 方式二：Docker 部署

```bash
docker pull nousresearch/hermes-agent:latest
mkdir -p ~/.hermes

# 配置向导
docker run -it --rm -v ~/.hermes:/opt/data nousresearch/hermes-agent setup

# 启动服务
docker run -d --name hermes --restart unless-stopped \
  -p 8000:8000 -v ~/.hermes:/opt/data \
  nousresearch/hermes-agent gateway run
```

### 方式三：Windows WSL2

```powershell
# 管理员 PowerShell
wsl --install

# 重启后 Ubuntu 终端中运行
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

---

## 三、配置

### 初始化配置向导

```bash
# 完整配置向导
hermes setup

# 选择模型
hermes model

# 配置工具
hermes tools

# 配置消息平台
hermes gateway setup
```

### LLM 提供商配置

| 提供商 | 适合场景 |
|---|---|
| **OpenRouter** | 聚合 200+ 模型，国内用户首选 |
| **Anthropic** | Claude（能力最强） |
| **OpenAI** | GPT 系列 |
| **火山方舟 Coding Plan** | 国内低价方案 |
| **Ollama** | 本地模型，零成本 |
| **DeepSeek** | 高性价比 |

```bash
# 配置示例：火山方舟
hermes config set llm.provider volcengine
hermes config set llm.base_url "https://ark.cn-beijing.volces.com/api/coding/v3"
hermes config set llm.api_key "你的API Key"
hermes config set llm.model "deepseek-v3.2"
```

### 消息平台配置

```bash
# Telegram
hermes gateway telegram

# Discord
hermes gateway discord

# 飞书
hermes gateway feishu

# 微信
hermes gateway wechat
```

---

## 四、日常使用

```bash
# 系统诊断
hermes doctor

# 启动交互式对话
hermes

# 启动网关服务（连接消息平台）
hermes gateway start

# 更新
hermes update
```

### 配置文件结构

| 路径 | 用途 |
|---|---|
| `~/.hermes/config.yaml` | 主配置 |
| `~/.hermes/.env` | API 密钥（权限 0600） |
| `~/.hermes/skills/` | 已安装技能库 |
| `~/.hermes/sessions/` | 会话数据 |
| `~/.hermes/logs/` | 运行日志 |

---

## 五、自进化系统

Hermes Agent 区别于其他工具的核心能力：

```
用户任务 → Agent 执行 → 成功完成
  ↓
自动分析：用了什么工具？什么流程？
  ↓
提炼为 Skill：存储到 ~/.hermes/skills/
  ↓
下次类似任务 → 自动调用 Skill → 更快完成
```

### 查看已学习的 Skill

```bash
hermes skills list
hermes skills show <skill-name>
```

---

## 六、Hermes vs OpenClaw 对比

| 维度 | Hermes Agent | OpenClaw |
|---|---|---|
| 核心差异 | **自进化** + 多平台网关 | 消息平台优先 + 大社区 |
| 语言 | Python + Rust CLI | Node.js |
| Stars | 5.2 万 | 24.7 万 |
| 安装复杂度 | 中等 | 低 |
| 适合 | 深度 AI 用户 | 轻量入门 |

### 选择建议

- **选 OpenClaw**：首次尝试 Agent、喜欢大社区、轻量快速
- **选 Hermes**：追求自进化、需要多平台网关、Python 用户
