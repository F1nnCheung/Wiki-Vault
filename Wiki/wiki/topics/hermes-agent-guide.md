---
title: Hermes Agent 完整教程
type: topic
tags: [hermes-agent, tutorial, installation, self-evolving, configuration, workspace, multi-agent]
created: 2026-05-09
updated: 2026-05-29
sources:
  - raw/articles/Hemmers/Hermes Agent v1.3 从入门到精通：开口就能用.md
  - raw/articles/Hemmers/Hermes Agent 从入门到精通 V1.2：2026年最值得学的 AI Agent 框架.md
  - raw/articles/Hemmers/Hermes Agent从入门到实战.md
  - raw/articles/Hemmers/从零到精通：Hermes Agent 完整上手指南（2026版），Github 9万星的底层解析：记忆、技能、GEPA.md
  - raw/articles/Hemmers/我为什么推荐你安装 Hermes Agent.md
  - raw/articles/Hemmers/Hermes 装完以后，先写这 2 个文件：SOUL.md 和 AGENTS.md（附可复制模板）.md
  - raw/articles/Hemmers/手把手：给 Hermes Agent 装一个六面板控制中心.md
  - raw/articles/Hemmers/Hermes Agent 多角色团队搭建指南.md
  - raw/articles/Hemmers/Hermes Agent 最佳实践：从入门到精通的完整指南（2026）.md
related:
  - entities/hermes-agent.md
  - topics/openclaw-guide.md
  - topics/hermes-configuration.md
  - topics/hermes-workspace-setup.md
  - topics/hermes-multi-agent.md
  - topics/ai-coding-concepts.md
---

# Hermes Agent 完整教程

## 一、介绍

Hermes Agent 是 Nous Research 开发的开源 AI Agent（MIT 许可证），核心特点是**自进化**——能从完成任务中自动提炼可复用 Skill，越用越聪明。

> 注：中文社区有时称其为「爱马仕」（Hermès 谐音梗）。

**GitHub**：github.com/NousResearch/hermes-agent | 137K+ Stars

**核心特点**：
- 🧬 自学习循环：自动从成功操作中提炼 Skill，越用越聪明
- 🧠 跨会话持久记忆（三层：会话/持久/Skill）
- 🌐 20 个消息平台支持（微信、飞书、Telegram、Discord、QQBot 等）
- 🔌 模型无关：支持 22+ LLM 提供商
- 🛠️ 40+ 内置工具
- 🏗️ 多 Agent Kanban：Orchestrator/Dispatcher/Worker/Board 四角色协作
- 📱 安卓 Termux 支持，手机上直接跑
- 🎯 `/goal` 跨轮目标追踪：不用重复提醒，Agent 记住目标持续推进

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
>
> **新增支持**：Android Termux — 手机上直接跑，与桌面体验一致。

### 方式一：一键安装（推荐）

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

# 加载环境变量
source ~/.bashrc

# 验证
hermes --version
# 预期：hermes v0.13.0
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
| Stars | 13.7 万 | 24.7 万 |
| 安装复杂度 | 中等 | 低 |
| 适合 | 深度 AI 用户 | 轻量入门 |

### 选择建议

- **选 OpenClaw**：首次尝试 Agent、喜欢大社区、轻量快速
- **选 Hermes**：追求自进化、需要多平台网关、Python 用户

---

## 七、SOUL.md 与 AGENTS.md：装完后第一件事

很多人装完 Hermes 就去装 Skill，但常见的「反复问同一个背景」「文件乱放」「改完代码不测试」等问题，往往不是 Skill 不够，而是没给它写规则。

### 两个文件的分工

| 文件 | 主要作用 | 放在哪里 |
|------|---------|---------|
| `SOUL.md` | 全局身份、语气、协作方式 | `~/.hermes/SOUL.md` |
| `AGENTS.md` | 项目规则、命令、目录、注意事项 | 项目根目录 |

- **SOUL.md** — 给 Hermes 定「性格」：说话风格、输出偏好、核实习惯、高风险操作提醒
- **AGENTS.md** — 给项目定「规矩」：目录结构、启动命令、测试方式、文件禁区

### 使用顺序

1. 先改 `SOUL.md`，让 Hermes 知道你的长期偏好
2. 在每个重要项目根目录放 `AGENTS.md`
3. 尽量在项目根目录启动 Hermes

> 规则文件不是一次写完的——像 README 一样，随使用不断更新。SOUL.md 控制在 4-8 条核心偏好即可。

详见 [[hermes-configuration|Hermes 配置指南：SOUL.md & AGENTS.md]]。

---

## 八、Hermes Workspace：六面板 Web 控制中心

Hermes Workspace 是一个独立的 Web UI 项目，提供比内置 Dashboard 更强大的可视化管理能力。

### 六大面板

| 面板 | 功能 |
|------|------|
| **Chat** | 多模型聊天，同一对话中切换模型不丢上下文 |
| **Memory** | 浏览、搜索、编辑三层记忆系统 |
| **Skills** | 100+ 技能在线管理 |
| **Terminal** | 内置终端 |
| **Tools** | 实时查看代理调用的工具，可批准/中止 |
| **Conductor** | 任务编排器，并行生成子代理 |

### 前置条件

- Node.js ≥ 22
- Python ≥ 3.11
- pnpm（`npm install -g pnpm`）
- Hermes Agent 已安装

### 快速启动

```bash
git clone https://github.com/outsourc-e/hermes-workspace.git
cd hermes-workspace && pnpm install

# 终端 1：启动 Gateway
hermes gateway run

# 终端 2：启动 Workspace
pnpm dev
# 浏览器打开 http://localhost:3000
```

详见 [[hermes-workspace-setup|Hermes Workspace 设置指南]]。

---

## 九、多 Agent Profile：分工协作

Hermes 支持创建多个独立 Agent Profile，各自拥有独立的配置、密钥、记忆、会话和技能。

### 创建专用 Profile

```bash
# 创建编码助手
hermes profile create "coder" --clone

# 创建研究 Agent
hermes profile create "research" --clone
```

### 调用方式

```bash
# 直接用 Profile 名
coder chat

# 或用 -p 标志
hermes -p research chat

# 设为默认
hermes profile use coder
```

### 典型分工

- **default** — 项目经理/架构师：拆解任务、分派子 Agent、审查输出
- **coder** — 编码专家：代码编写、调试、修复
- **research** — 研究助手：文献检索、知识整理、竞品分析

详见 [[hermes-multi-agent|Hermes 多 Agent 团队搭建指南]]。

## 推荐 Skills 目录

Hermes 有 107+ 个技能，以下按场景分类推荐最值得安装的：

### 开发效率

| 技能 | 用途 | 推荐指数 |
|------|------|----------|
| `systematic-debugging` | 四阶段根因调试法，遇到 bug 先看这个 | ⭐⭐⭐⭐⭐ |
| `writing-plans` | 写实现计划，大任务拆成可执行小步骤 | ⭐⭐⭐⭐⭐ |
| `github-pr-workflow` | GitHub PR 全流程：分支、提交、CI、合并 | ⭐⭐⭐⭐ |
| `github-code-review` | PR 代码审查，支持 diff 和内联评论 | ⭐⭐⭐⭐ |
| `codebase-inspection` | pygount 分析代码库：行数、语言、比例 | ⭐⭐⭐ |
| `requesting-code-review` | 提交前自动审查：安全扫描、质量门控、自动修复 | ⭐⭐⭐⭐ |

### 内容创作

| 技能 | 用途 | 推荐指数 |
|------|------|----------|
| `humanizer` | 去除 AI 写作痕迹，让文本读起来像人写的 | ⭐⭐⭐⭐⭐ |
| `tech-article-writing` | 技术文章写作：对比/工具介绍/分析类 | ⭐⭐⭐⭐⭐ |
| `architecture-diagram` | 暗色主题 SVG 架构/云/基础设施图 | ⭐⭐⭐⭐ |
| `baoyu-image-gen` | AI 图片生成（多后端支持） | ⭐⭐⭐⭐ |
| `baoyu-slide-deck` | 从内容生成专业 PPT 图片 | ⭐⭐⭐⭐ |
| `obsidian` | Obsidian 笔记管理：读取、搜索、创建、编辑 | ⭐⭐⭐⭐ |

### 研究搜索

| 技能 | 用途 | 推荐指数 |
|------|------|----------|
| `tavily-search` | Tavily API 网络搜索，返回精炼结果和摘要 | ⭐⭐⭐⭐⭐ |
| `multi-search-engine` | 17 个搜索引擎集成（8 国内 + 9 国际），无需 API Key | ⭐⭐⭐⭐ |
| `arxiv` | arXiv 论文搜索：关键词、作者、分类 | ⭐⭐⭐⭐ |
| `tech-repo-research` | 研究 GitHub 仓库并生成对比/概览文章 | ⭐⭐⭐⭐ |

### 自动化与运维

| 技能 | 用途 | 推荐指数 |
|------|------|----------|
| `hermes-agent` | Hermes 自身配置、扩展、贡献全套指南 | ⭐⭐⭐⭐⭐ |
| `self-improvement` | 自我改进：捕获错误、纠正和新发现的工作流 | ⭐⭐⭐⭐⭐ |
| `openclaw-auto-updater` | 定时自动更新 Hermes 和技能，带重试机制 | ⭐⭐⭐⭐ |
| `kanban-worker` | Kanban 工作流指南，多 Agent 协作任务 | ⭐⭐⭐ |
| `webhook-subscriptions` | Webhook 订阅：事件驱动的 Agent 运行 | ⭐⭐⭐ |

> 每次做完一件事，让 Agent 把它保存为 skill——一旦成功走通一次就能变成可复用的技能。每月审查 `~/.hermes/skills/` 保持库干净。

---

## 生产环境部署

### Docker 容器（推荐生产环境）

```bash
docker pull nousresearch/hermes-agent
docker run -d \
  --name hermes \
  -v ~/.hermes:/root/.hermes \
  -e DASHSCOPE_API_KEY=your_key \
  nousresearch/hermes-agent
```

### systemd 服务（VPS 长期运行）

```bash
sudo tee /etc/systemd/system/hermes-gateway.service << 'EOF'
[Unit]
Description=Hermes Agent Gateway
After=network.target

[Service]
Type=simple
User=$USER
ExecStart=/path/to/hermes gateway run
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable hermes-gateway
sudo systemctl start hermes-gateway
```

### Redis 调优（持久化记忆场景）

```bash
appendonly yes
appendfsync everysec
maxmemory 2gb
maxmemory-policy allkeys-lru
```

### 防火墙配置

```bash
# 按需开放网关端口
sudo ufw allow 8080/tcp
# 生产环境限制 IP
sudo ufw allow from 192.168.1.0/24 to any port 8080
```

---

## 推荐配置清单

```yaml
# config.yaml 推荐配置
model:
  default: "anthropic/claude-sonnet-4"
  context_length: 128000

agent:
  max_turns: 90

compression:
  enabled: true
  threshold: 0.50
  target_ratio: 0.20

display:
  skin: "default"
  tool_progress: true
  show_reasoning: false
  show_cost: true

security:
  redact_secrets: true

memory:
  memory_enabled: true
  user_profile_enabled: true

approvals:
  mode: "smart"
```

---

## 常见问题

**Q: 改了配置/装了新技能，但没生效？**
Hermes 在会话启动时加载配置。对话内输入 `/reset` 或 `/new` 重新开始会话。

**Q: Gateway 频繁崩溃？**
查看日志 `grep -i "failed to send\|error" ~/.hermes/logs/gateway.log | tail -20`；重置崩溃状态 `systemctl --user reset-failed hermes-gateway`。

**Q: Discord Bot 收不到消息？**
必须在 Discord Developer Portal → Bot → Privileged Gateway Intents → 开启 Message Content Intent。

**Q: 辅助模型（vision/compression/session_search）不工作？**
`auto` 模式找不到后端。设置 `OPENROUTER_API_KEY` 或 `GOOGLE_API_KEY`，或显式配置：`hermes config set auxiliary.vision.provider <provider>`。

**Q: 技能安装后看不到？**
`hermes skills list` 确认已安装，`hermes skills config` 检查平台启用状态，对话内 `/skill <name>` 显式加载。
