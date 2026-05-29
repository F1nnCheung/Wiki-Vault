---
title: 3.2 Hermes Agent 自进化 AI Agent
type: tutorial
tags: [hermes-agent, agent, tutorial, self-evolving, installation]
created: 2026-05-11
updated: 2026-05-11
sources:
  - Wiki/wiki/topics/hermes-agent-guide.md
  - Wiki/wiki/entities/hermes-agent.md
  - Wiki/wiki/concepts/agent-self-evolution.md
  - 教程/AI Coding/AI Coding 学习计划.md
related:
  - 01-OpenClaw.md
  - 03-深度对比.md
---

# 3.2 Hermes Agent 自进化 AI Agent

> Hermes Agent 与众不同的地方在于：它会从成功经验中学习——自动提炼可复用技能，越用越聪明。GitHub 137K+ Stars，中文社区常称「爱马仕」。

---

## 概述

Hermes Agent 是 Nous Research 开发的开源 AI Agent（MIT 许可证）。与 OpenClaw 的「安全优先」不同，Hermes 的设计哲学是「成长优先」——让 Agent 从每次成功操作中学习和进化。

**GitHub**：github.com/NousResearch/hermes-agent

---

## 核心特点

| 特点 | 说明 |
|---|---|
| 🧬 **自学习循环** | 自动从成功操作中提炼 Skill，越用越聪明 |
| 🧠 **三层记忆** | 会话记忆 + 持久记忆 + 技能记忆 |
| 🌐 **20+ 消息平台** | 微信、飞书、Telegram、Discord、QQBot 等 |
| 🔌 **模型无关** | 支持 22+ LLM 提供商 |
| 🛠️ **40+ 内置工具** | 文件操作、命令执行、网页浏览 |
| 🏗️ **多 Agent 协作** | Orchestrator/Dispatcher/Worker/Board |
| 📱 **安卓支持** | Termux 环境手机直接跑 |

---

## 核心差异：自进化系统

这是 Hermes 区别于所有其他 AI Agent 的核心能力：

```
用户任务 → Agent 执行 → 成功完成
  ↓
自动分析：用了什么工具？什么流程？
  ↓
提炼为 Skill：存储到 ~/.hermes/skills/
  ↓
下次类似任务 → 自动调用 Skill → 更快完成
```

**举例**：
- 第一次让你教它「如何部署这个项目到 Vercel」
- 成功后自动创建 `deploy-to-vercel` 技能
- 下次你说「部署」，它直接调用技能，不再需要指导

---

## 安装

### 系统要求

| 组件 | 最低 | 推荐 |
|---|---|---|
| 操作系统 | Linux / macOS / WSL2 | Ubuntu 22.04 |
| Python | 3.10+ | 3.11+ |
| 内存 | 4GB | 16GB+ |

> ⚠️ 不支持原生 Windows，需通过 WSL2 或 Docker。

### 方式一：一键安装（推荐）

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
source ~/.bashrc
hermes --version
```

### 方式二：Docker 部署

```bash
docker pull nousresearch/hermes-agent:latest
mkdir -p ~/.hermes
docker run -it --rm -v ~/.hermes:/opt/data nousresearch/hermes-agent setup
docker run -d --name hermes --restart unless-stopped \
  -p 8000:8000 -v ~/.hermes:/opt/data \
  nousresearch/hermes-agent gateway run
```

---

## 配置

```bash
hermes setup           # 完整配置向导
hermes model           # 选择模型
hermes tools           # 配置工具
hermes gateway setup   # 配置消息平台
```

### LLM 提供商推荐

| 提供商 | 适合场景 |
|---|---|
| **OpenRouter** | 聚合 200+ 模型，国内用户首选 |
| **Anthropic** | Claude（能力最强） |
| **火山方舟 Coding Plan** | 国内低价方案 |
| **DeepSeek** | 高性价比 |
| **Ollama** | 本地模型，零成本 |

---

## 装完后第一件事：SOUL.md 与 AGENTS.md

很多人装完就去装 Skill，但真正该做的第一件事是写规则文件：

| 文件 | 作用 | 位置 |
|---|---|---|
| **SOUL.md** | 全局身份、语气、协作方式 | `~/.hermes/SOUL.md` |
| **AGENTS.md** | 项目规则、命令、目录、注意事项 | 项目根目录 |

### SOUL.md 示例

```markdown
# 我的 SOUL.md
- 你是我的技术助手，不是客服——回答直接、简洁、给方案
- 不确定的事先查再回，不要猜
- 每次操作前告诉我你打算怎么做
- 涉及 rm、sudo、git push --force 的操作必须等我确认
```

### AGENTS.md 示例

```markdown
# 项目规则
- 技术栈：Next.js 14 + TypeScript + Prisma
- 启动：npm run dev
- 测试：npm test
- 不要修改 .env 和 prisma/migrations/
```

---

## 日常使用

```bash
hermes doctor           # 系统诊断
hermes                  # 启动交互式对话
hermes gateway start    # 启动网关（连接消息平台）
hermes update           # 更新
hermes skills list      # 查看已学习的 Skill
```

---

## Hermes Workspace：Web 控制中心

一个六面板 Web UI，提供可视化管理：

| 面板 | 功能 |
|---|---|
| **Chat** | 多模型聊天，同对话切换模型 |
| **Memory** | 浏览、搜索、编辑三层记忆 |
| **Skills** | 100+ 技能在线管理 |
| **Terminal** | 内置终端 |
| **Tools** | 实时查看 Agent 调用的工具 |
| **Conductor** | 任务编排，并行子代理 |

```bash
git clone https://github.com/outsourc-e/hermes-workspace.git
cd hermes-workspace && pnpm install

# 终端 1
hermes gateway run

# 终端 2
pnpm dev
# 打开 http://localhost:3000
```

---

## 多 Agent Profile

创建不同角色的 Agent，各司其职：

```bash
hermes profile create "coder" --clone
hermes profile create "research" --clone

# 使用
coder chat              # 编码助手
hermes -p research chat # 研究助手
```

典型分工：
- **default** — 项目经理/架构师
- **coder** — 编码专家
- **research** — 研究助手

---

## Hermes 的定位

适合：
- 🟢 希望 Agent 越用越聪明
- 🟢 深度使用飞书/钉钉/企业微信
- 🟢 Python 技术栈
- 🟢 想做 AI Agent 研究

不太适合：
- 🔴 严格安全合规要求（选 OpenClaw）
- 🔴 想快速上手不想折腾
- 🔴 Windows 用户（需 WSL2）

---

## 本章小结

1. Hermes Agent = 自进化 AI Agent，越用越聪明
2. 核心差异：自动提炼 Skill 的学习闭环
3. 装完后第一件事：写 SOUL.md 和 AGENTS.md
4. Hermes Workspace 提供 Web 可视化控制
5. 多 Agent Profile 支持角色分工

> 📖 **下一步**：阅读 [[03-深度对比]]，全面对比 OpenClaw 和 Hermes，做出最终选择。

---

> 📚 参考：[[Wiki/wiki/topics/hermes-agent-guide|Hermes 完整教程]] · [[Wiki/wiki/entities/hermes-agent|Hermes 实体页]] · [[Wiki/wiki/concepts/agent-self-evolution|Agent 自进化]]
