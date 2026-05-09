---
title: "我为什么推荐你安装 Hermes Agent"
source: "https://mp.weixin.qq.com/s/sSx_S1na8blZLDIhIdlEIw"
author:
  - "[[Jeffrey Hu]]"
published:
created: 2026-05-08
description: "使用Hermes Agent打造你的个人助理，是真的好用啊。"
tags:
  - "clippings"
---
Jeffrey Hu *2026年4月20日 22:40*

今年1月份，我开始重度使用了OpenClaw，然而在3月底，我又被Hermes Agent所吸引，发现这个AI助手更适合我，使用了快一个月，把一些心得体会跟大家分享一下。

![图像](https://mmbiz.qpic.cn/mmbiz_jpg/cK5J0XUzRLzsNCsPyno22TsakvHVjtNibnO1Ribjctrl4bMlreCFiardZX9RpqG2Iehfmygku8SKuGvpHvTkOVCsicNYtX0BwcicRPqUB7UHXQAQ/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

## 一、Hermes Agent 是什么？

Hermes Agent 是由 Nous Research 团队开发的开源 AI Agent 框架。与 OpenClaw 类似，它是一个连接大语言模型与现实世界的桥梁，但定位和功能上有显著差异。

### 核心定位

Hermes Agent 的核心理念是 **让 AI Agent 真正可部署、可控制、可扩展** 。它不仅仅是一个对话助手，而是一个完整的 Agent 运行时环境，支持：

- • **原生 Model Agnostic** ：支持所有主流大语言模型（Claude、GPT、Qwen、MiniMax 等），不绑定特定提供商
- • **MCP 协议** ：完整支持 Model Context Protocol，便于扩展工具和连接外部服务
- • **Gateway/Channel 系统** ：独特的网关连接器架构，可以桥接各种社交平台和外部服务
- • **内置 15+ 工具** ：开箱即用的工具集，包括网页搜索、文件处理、代码执行等
- • **完全开源自托管** ：代码完全开放，可以部署在自己的服务器上

### Hermes Agent vs OpenClaw

一图胜千言，没有好坏之分，只有适合不适合。

![图片](https://mmbiz.qpic.cn/mmbiz_png/cK5J0XUzRLzjh3ktsBhFhEicFsq02IUytZU5AA0NlGp3c3MESXeul2LImLQPeRglz7YsIUxoYvDLg3fqQmib0deibxN0b8bcBM2aBZrTkWecdU/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

我的总结就是，相对于OpenClaw来说，Hermes：

1. 1\. 更安全
2. 2\. 代码量更少，有可能代表实现更优雅
3. 3\. 有self improving的能力，可以把之前做过的事情，自动总结为skill可复用

---

## 二、硬件选择

### 方案对比

| 方案 | 优点 | 缺点 | 适合人群 |
| --- | --- | --- | --- |
| **云服务器** | 无需维护、24h 运行 | 费用、延迟、数据隐私 | 有技术能力、预算充足 |
| **迷你主机** | 低功耗、低噪音、可本地部署 | 需要购买设备 | **推荐新手** |
| **旧电脑** | 零成本 | 功耗高、噪音大、体积大 | 临时测试 |
| **工作电脑** | ❌ 不推荐 | 隐私泄露风险 | — |

### 推荐：迷你主机

这里推荐使用 **迷你主机** 作为部署方案。以 **异能者联想生态 U33** 为例：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### 选择迷你主机的好处

1. 1\. **低功耗** ：每天仅消耗约 0.2 度电，一个月不到 15 元电费
2. 2\. **低价格** ：500-1500 元即可入手，比云服务器年费还便宜
3. 3\. **静音设计** ：无风扇或被动散热，噪音接近零
4. 4\. **体积小巧** ：巴掌大小，不占空间，可放置在任何角落
5. 5\. **本地部署** ：数据完全在本地，隐私有保障
6. 6\. **24h 运行** ：设计支持长时间连续运行，不发热、不死机

### 为什么不用工作电脑？

**强烈不建议将 Hermes Agent 部署在工作电脑上** ：

1. 1\. **隐私泄露风险** ：工作电脑通常存储有公司机密、客户资料等敏感信息
2. 2\. **合规问题** ：很多公司的 IT 政策禁止安装未经批准的软件
3. 3\. **账号关联** ：如果使用公司账号登录各种服务，可能违反公司政策
4. 4\. **性能影响** ：长期运行会占用系统资源，影响正常工作

---

## 三、操作系统选择

### 推荐：Ubuntu 24.04 Desktop

**Ubuntu 24.04 Desktop** 是运行 Hermes Agent 的理想操作系统选择。

### Ubuntu vs Windows

| 对比项 | Ubuntu 24.04 | Windows |
| --- | --- | --- |
| **稳定性** | 专为长期运行设计 | 定期强制更新，需重启 |
| **资源占用** | 轻量级，开机内存 1-2GB | 开机内存 4-8GB |
| **命令行** | 原生支持，强大灵活 | 需要 PowerShell 或 WSL |
| **服务部署** | systemd 原生支持 | 需要手动配置服务 |
| **长时间运行** | 稳定，支持 99.9% uptime | 可能遇到 DLL 地狱、更新失败 |
| **安全更新** | 自动安全补丁 | 需手动或强制重启 |

### Ubuntu vs MacOS

| 对比项 | Ubuntu 24.04 | MacOS |
| --- | --- | --- |
| **成本** | 完全免费 | 需要购买 Mac 设备 |
| **硬件兼容性** | 支持所有 x86 硬件 | 仅限 Apple 硬件 |
| **可定制性** | 完全开源，可深度定制 | 封闭系统，限制多 |
| **服务器部署** | 原生支持，适合 24h 运行 | 不适合长期运行服务 |
| **开发环境** | Linux 环境，接近服务器 | 可能有差异 |

### 安装 Ubuntu 24.04 Desktop

#### 系统要求

| 组件 | 最低要求 | 推荐配置 |
| --- | --- | --- |
| CPU | 2 核心 | 4+ 核心 |
| 内存 | 4GB | 8GB+ |
| 存储 | 25GB | 50GB+ |
| 网络 | 有线网络 | 千兆网口 |

#### 安装步骤

1. 1\. **下载 Ubuntu 24.04 Desktop**
- • 官网：https://ubuntu.com/download/desktop
	- • 推荐下载 LTS 版本（长期支持版）
3. **制作启动盘**
	```
	# 使用 Rufus 制作启动盘（Windows）
	# 或使用 balenaEtcher（跨平台）
	```
4. 3\. **安装系统**
- • 选择"最小化安装"以减少资源占用
	- • 建议分配 50GB+ 给系统
	- • 建议创建独立的 Home 分区
6. **安装后配置**
	```
	# 更新系统
	sudo apt update && sudo apt upgrade -y
	# 安装必要工具
	sudo apt install -y curl wget git vim net-tools
	# 启用 SSH（可选，方便远程管理）
	sudo apt install -y openssh-server
	sudo systemctl enable ssh
	```

---

## 四、安装 Hermes Agent

> ⚠️ **前置要求** ：需要 **科学上网** 能力，因为访问 GitHub 和某些 API 需要代理。

### 一键安装（推荐）

```
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

安装脚本会自动完成以下操作：

- • 检测系统环境
- • 安装必要依赖（Python、Node.js 等）
- • 克隆代码仓库
- • 配置虚拟环境
- • 安装依赖包

### 注意事项

| 注意点 | 说明 |
| --- | --- |
| **科学上网** | 必须开启代理，否则无法访问 GitHub 和部分 LLM API |
| **API Key** | 提前准备好各平台的 API Key |
| **网络延迟** | 建议选择网络质量好的代理服务 |

---

## 五、配置 Hermes Agent

### 1\. 选择大语言模型

Hermes Agent 支持多种 LLM，以下是国内用户的推荐：

#### 推荐模型

| 模型 | 能力 |
| --- | --- |
| **Qwen3.5-Plus** | 文本生成、深度思考、视觉理解 |
| **MiniMax-M2.7** | 文本生成、深度思考（通过MCP也可以实现图片理解） |

#### 配置示例（config.yaml）

```
hermes model

然后选择模型提供商即可：

**Select provider:**

  ↑↓ navigate  ENTER/SPACE select  ESC cancel

   (○) Nous Portal (Nous Research subscription)

   (○) OpenRouter (100+ models, pay-per-use)

   (○) Anthropic (Claude models — API key or Claude Code)

   (○) OpenAI Codex

   (○) Xiaomi MiMo (MiMo-V2 models — pro, omni, flash)

 **→ (●) NVIDIA NIM (Nemotron models — build.nvidia.com or local NIM)  ← currently active**

   (○) Qwen OAuth (reuses local Qwen CLI login)

   (○) GitHub Copilot (uses GITHUB_TOKEN or gh auth token)

   (○) GitHub Copilot ACP (spawns \`copilot --acp --stdio\`)

   (○) Hugging Face Inference Providers (20+ open models)

   (○) Google AI Studio (Gemini models — native Gemini API)

   (○) Google Gemini via OAuth + Code Assist (free tier supported; no API key needed)

   (○) DeepSeek (DeepSeek-V3, R1, coder — direct API)

   (○) xAI (Grok models — direct API)

   (○) Z.AI / GLM (Zhipu AI direct API)

   (○) Kimi Coding Plan (api.kimi.com) & Moonshot API

   (○) Kimi / Moonshot China (Moonshot CN direct API)

   (○) MiniMax (global direct API)

   (○) MiniMax China (domestic direct API)

   (○) Alibaba Cloud / DashScope Coding (Qwen + multi-provider)

   (○) Ollama Cloud (cloud-hosted open models — ollama.com)

   (○) Arcee AI (Trinity models — direct API)

   (○) Kilo Code (Kilo Gateway API)

   (○) OpenCode Zen (35+ curated models, pay-as-you-go)

   (○) OpenCode Go (open models, $10/month subscription)

   (○) Vercel AI Gateway (200+ models, pay-per-use)

   (○) AWS Bedrock (Claude, Nova, Llama, DeepSeek — IAM or API key)

   (○) Custom endpoint (enter URL manually)

   (○) Configure auxiliary models...

   (○) Leave unchanged
```

### 2\. 配置 Gateway

Gateway 是 Hermes Agent 的核心特性，允许连接各种外部平台。

#### 推荐的 Gateway 配置

| 平台 | 难度 | 推荐度 | 说明 |
| --- | --- | --- | --- |
| **QQ** | ⭐⭐ | ⭐⭐⭐⭐⭐ | 国内最常用，推荐新手 |
| **微信** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 国内最常用，推荐新手 |
| **Telegram** | ⭐ | ⭐⭐⭐⭐⭐ | 功能最强大，推荐有条件者（需科学上网） |

### 3\. 启动消息网关

消息网关（Gateway）用于连接各个消息平台，使用命令启动：

```
hermes gateway start
```

#### 配置微信

```
**Select platforms to configure:**

  ↑↓ navigate  SPACE toggle  ENTER confirm  ESC cancel

   [✓] Telegram  (configured)
   [ ] Discord
   [ ] Slack
   [ ] Signal
   [ ] Email
   [ ] SMS (Twilio)
   [ ] Matrix
   [ ] Mattermost
   [ ] WhatsApp
   [ ] DingTalk
   [ ] Feishu / Lark
   [ ] WeCom (Enterprise WeChat)
   [ ] WeCom Callback (Self-Built App)
 **→ [✓] Weixin (WeChat)  (configured)**
   [ ] BlueBubbles (iMessage)
   [ ] QQ Bot
   [ ] Webhooks (GitHub, GitLab, etc.)
```

选择weixin后，命令行会生成一个如下图所示的二维码，用微信扫一下就可以了。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 4\. LLM Wiki 配置

LLM Wiki 基于 Karpathy 的 LLM Wiki 理念构建，支持知识库管理和检索：

```
hermes skills install llm-wiki
```

### 5\. 安装 Web 工具

推荐安装 **Tavily** 作为网页搜索工具：

```
hermes tools

**Tools for 🖥️  CLI**

  ↑↓ navigate  SPACE toggle  ENTER confirm  ESC cancel

 **→ [✓] 🔍 Web Search & Scraping  (web_search, web_extract)**

   [✓] 🌐 Browser Automation  (navigate, click, type, scroll)

   [✓] 💻 Terminal & Processes  (terminal, process)

   [✓] 📁 File Operations  (read, write, patch, search)

   [✓] ⚡ Code Execution  (execute_code)

   [✓] 👁️  Vision / Image Analysis  (vision_analyze)

   [✓] 🎨 Image Generation  (image_generate)

   [ ] 🧠 Mixture of Agents  (mixture_of_agents)  [no API key]

   [✓] 🔊 Text-to-Speech  (text_to_speech)

   [✓] 📚 Skills  (list, view, manage)

   [✓] 📋 Task Planning  (todo)

   [✓] 💾 Memory  (persistent memory across sessions)

   [✓] 🔎 Session Search  (search past conversations)

   [✓] ❓ Clarifying Questions  (clarify)

   [✓] 👥 Task Delegation  (delegate_task)

   [✓] ⏰ Cron Jobs  (create/list/update/pause/resume/run, with optional attached skills)

   [ ] 📨 Cross-Platform Messaging  (send_message)

   [ ] 🧪 RL Training  (Tinker-Atropos training tools)  [no API key]

   [ ] 🏠 Home Assistant  (smart home device control)  [no API key]
```

**Tavily** 提供每月 1000 次免费搜索请求，足够个人使用。

```
**Select provider:**

 ↑↓ navigate  ENTER/SPACE select  ESC cancel

 

  (○) Firecrawl Cloud [★ recommended] — Full-featured search, extract, and crawl

  (○) Exa [paid] — Neural search with semantic understanding

  (○) Parallel [paid] — AI-powered search and extract

**→ (●) Tavily [free tier] — Search, extract, and crawl — 1000 free searches/mo [active]**

  (○) Firecrawl Self-Hosted [free · self-hosted] — Run your own Firecrawl instance (Docker)
```

---

## 六、测试对话

安装完成后，在终端直接输入以下命令即可启动：

```
hermes
```

启动后即可在终端内与 AI 对话。

### 验证安装

运行 `hermes` 后，输入任意问题测试响应是否正常。

---

## 七、我为什么推荐你安装 LLM WIKI

LLM Wiki 是 Hermes Agent 的核心功能之一，基于 Karpathy 的 llm-wiki 理念构建的个人知识库。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 核心能力

LLM Wiki 让 AI 能够阅读、理解和检索你收集的任意内容：

```
你：我在 wiki 里存了哪些关于 AI Agent 的文章？
Bot：你 wiki 里关于 AI Agent 的文章有：
- 2026-03-15：AI Agent 发展现状
- 2026-04-10：OpenClaw 使用指南
- ...

你：总结一下这些文章的核心观点
Bot：根据这几篇文章，AI Agent 的核心观点是...
```

### 使用方式

平时可以图片、语音、文字、链接、文档等发给Hermes，然后跟他说整理到wiki即可，想要用的时候，可以随时取出，或者根据内容进行分析、生成、创作等。

### 使用建议

可以设置一个定时任务，每天晚上（如0点）自动整理wiki。  
如果有条件，可以买一个Obsindian会员，这样电脑上的LLM WIKI可以直接同步到手机上，这样Hermes Agent维护的内容可以实时在手机app上阅读和修改，非常方便，强烈建议。

有时问Hermes一些问题，可以耐心等他回答完成，不要总是急着去打断，Hermes Agent就像你的个人助理，要使用中养成，有时等她在回答的过程中，自己也多思考，和AI一起养成和提升。

---

## 八、注意事项

### 安全相关

| 注意事项 | 说明 |
| --- | --- |
| **API Key 安全** | 定期查看你的LLM模型API和一些工具的API使用情况，发现异常就直接更换 |
| **机器人权限** | 限制 Bot 的管理权限，只允许授权用户使用 |
| **网络隔离** | 建议使用防火墙，只开放必要端口 |
| **定期备份** | 定期备份配置文件和知识库数据 |

### 稳定性相关

| 注意事项 | 说明 |
| --- | --- |
| **24h 运行** | Ubuntu 可以稳定支持长期运行，但建议配置自动重启 |
| **内存监控** | 定期监控内存使用，避免内存泄漏 |
| **磁盘空间** | 知识库会不断增长，注意监控磁盘空间 |
| **日志管理** | 配置日志轮转，避免日志文件撑爆磁盘 |

---

## 九、快速上手

恭喜你走到这一步！现在可以开始你的 Hermes Agent 之旅了！有什么问题，欢迎评论区留言。

祝你使用愉快！

Hermes Agent · 目录

阅读原文

继续滑动看下一个

AITi智能

向上滑动看下一个