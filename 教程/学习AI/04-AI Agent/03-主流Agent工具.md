---
title: 第三章：主流 Agent 工具
type: tutorial
tags: [ai-agent, tools, claude-code, codex, openclaw, hermes-agent, comparison]
created: 2026-05-29
updated: 2026-05-29
sources:
  - Wiki/wiki/entities/claude-code.md
  - Wiki/wiki/entities/codex.md
  - Wiki/wiki/entities/openclaw.md
  - Wiki/wiki/entities/hermes-agent.md
  - Wiki/wiki/comparisons/openclaw-vs-hermes.md
  - Wiki/wiki/topics/ai-coding-tools-comparison.md
related:
  - 02-Agent核心架构.md
  - 04-多Agent协作与编排.md
  - 00-AI Agent 学习指南.md
---

# 第三章：主流 Agent 工具

> 全面了解 Claude Code、OpenAI Codex、OpenClaw、Hermes Agent 四大工具，掌握选型方法。

---

## 3.1 工具全景图

```
                      AI Agent 工具生态

  ┌─────────┐  ┌─────────┐  ┌──────────┐  ┌──────────────┐
  │ Claude  │  │  Codex  │  │ OpenClaw │  │Hermes Agent  │
  │  Code   │  │ (OpenAI)│  │(24.7万★) │  │  (13.7万★)   │
  └────┬────┘  └────┬────┘  └────┬─────┘  └──────┬───────┘
       │            │            │                │
  终端 Agent   云端 Agent   消息平台 Agent    自进化 Agent
  偏开发者     偏全流程     偏个人助理       偏探索性
  L4-L5         L4           L4              L4
```

---

## 3.2 Claude Code：终端 AI 编程 Agent

### 一句话定位

**Anthropic 官方终端 AI 编程 Agent**，把 Claude 模型的能力通过终端界面完整释放给开发者。

### 核心特点

| 能力 | 说明 |
|------|------|
| **终端原生** | 在项目目录下直接运行，完全访问文件系统 |
| **Subagent 并行** | 多个子 Agent 同时处理不同任务 |
| **CLAUDE.md** | 项目级规则文件，定义上下文和行为约束 |
| **MCP 生态** | 通过标准协议接入 20+ 外部工具 |
| **Skills 生态** | 可复用的能力包，按需调用 |
| **Hooks 系统** | 在工具调用前后注入自定义逻辑 |
| **权限分级** | allow/ask/deny 三层权限控制 |

### 四层能力体系

```
Prompt（提示词）   → 怎么描述任务
  ↓
Skills（技能）     → 可复用的方法论和能力包
  ↓
Project（项目）    → CLAUDE.md + Rules + Context
  ↓
MCP（工具连接）    → 连接外部系统（浏览器、数据库、GitHub）
```

### 适合场景

- 🟢 从零开发新功能（交互推理强、上下文深）
- 🟢 复杂架构设计和技术决策
- 🟢 多文件重构
- 🟢 需要精细控制的开发任务

### 不适合

- 🔴 简单重复任务（token 消耗较高）
- 🔴 非开发者使用（学习曲线较陡）

> 📚 深入：[[Wiki/wiki/entities/claude-code|Claude Code 实体页]] · [[Wiki/wiki/topics/claude-code-introduction|Claude Code 介绍]]

---

## 3.3 OpenAI Codex：云端全流程 Agent 平台

### 一句话定位

**OpenAI 的统一 AI Agent 操作平台**，集编程、浏览器操作、电脑自动化、AI 生图于一体。

### 核心特点

| 能力 | 说明 |
|------|------|
| **四大产品形态** | App / CLI / IDE / Cloud，共享配置 |
| **沙箱安全系统** | 3 档沙箱 × 3 档审批 = 9 种安全组合 |
| **Computer Use** | Mac 虚拟鼠标后台操作桌面应用 |
| **Automation** | chat 一键转定时任务，个人 RPA |
| **云端运行** | 任务丢 OpenAI 云上跑，下班丢给它第二天收 PR |
| **Steering 纠偏** | 不等当前步骤结束，实时接管方向盘 |
| **Fork Chat** | 对话分叉 + Git 回滚 = 双重撤销 |
| **Plan 模式** | 先出计划确认，再执行 |

### Codex vs Claude Code

| 维度 | Claude Code | Codex |
|------|------------|-------|
| **角色** | 协作者（从零想架构） | 执行型工程师（边界清楚的活） |
| **强项** | 交互推理、架构设计 | Token 效率（约 4 倍优势） |
| **运行环境** | 本地终端 | 本地 + 云端 |
| **安全模型** | 权限分级 | 沙箱 3×3 矩阵 |
| **非编程能力** | 有限 | Computer Use、生图、自动化 |

### 高手玩法：互补策略

```
Claude Code：做架构、从零搭功能、复杂推理
    +
Codex：做 review、做 debug、跑自动化任务
    = 互补而非二选一
```

> 📚 深入：[[Wiki/wiki/entities/codex|Codex 实体页]] · [[Wiki/wiki/topics/codex-guide|Codex 完整教程]]

---

## 3.4 OpenClaw：消息平台个人 AI Agent

### 一句话定位

**7×24 小时在线、通过 WhatsApp/Telegram/飞书交互的个人 AI Agent**。GitHub 24.7 万 Stars，最大的开源 AI Agent。

### 核心特点

| 特点 | 说明 |
|------|------|
| **消息平台交互** | WhatsApp / Telegram / Discord / 飞书 / QQ 等 25+ 渠道 |
| **安全优先** | 10+ 安全模块，默认安全设计 |
| **Skill 生态** | 5700+ 社区 Skills |
| **一键安装** | `curl -fsSL https://openclaw.ai/install.sh \| bash` |
| **模型无关** | 支持 Anthropic / OpenAI / DeepSeek / 阿里云 / Ollama |
| **Docker 部署** | 推荐生产环境容器化运行 |

### 典型使用场景

```
📧 "帮我把今天的重要邮件整理成摘要"
🐍 "写一个 Python 脚本，每天备份数据库"
🔍 "分析这个 GitHub 项目的代码质量"
📊 "每周五把 Issues 整理成周报发到 Telegram"
```

### 适合

- 🟢 首次尝试 Agent（安装最简单）
- 🟢 需要安全合规的企业环境
- 🟢 轻量日常任务自动化
- 🟢 TypeScript/Node.js 技术栈

### 不适合

- 🔴 需要 Agent 自己学习改进（选 Hermes）
- 🔴 深度依赖飞书/钉钉/企业微信（选 Hermes）

> 📚 深入：[[Wiki/wiki/entities/openclaw|OpenClaw 实体页]] · [[Wiki/wiki/topics/openclaw-guide|OpenClaw 完整教程]]

---

## 3.5 Hermes Agent：自进化 AI Agent

### 一句话定位

**会从成功经验中自动学习、越用越聪明的开源 AI Agent**。GitHub 13.7 万 Stars，中文社区常称「爱马仕」。

### 核心特点

| 特点 | 说明 |
|------|------|
| 🧬 **自学习循环** | 自动从成功操作中提炼 Skill，越用越聪明 |
| 🧠 **三层记忆** | 会话记忆 + 持久记忆 + 技能记忆 |
| 🌐 **20+ 消息平台** | 微信 / 飞书 / Telegram / Discord / QQBot 等 |
| 🔌 **模型无关** | 支持 22+ LLM 提供商 |
| 🏗️ **多 Agent 协作** | Orchestrator / Dispatcher / Worker / Board |
| 📱 **安卓支持** | Termux 环境手机直接跑 |
| 🖥️ **Workspace** | 六面板 Web 控制中心 |

### 核心差异：自进化

这是 Hermes 区别于所有其他 Agent 的独特能力：

```
用户任务 → Agent 执行 → 成功完成
  ↓
自动分析：用了什么工具？什么流程？
  ↓
提炼为 Skill → 下次类似任务自动调用
```

**举例**：第一次你教它「如何部署到 Vercel」→ 成功后自动创建 `deploy-to-vercel` 技能 → 下次你说「部署」，它直接调用技能。

### Hermes 深度生态

| 能力 | 相关教程 |
|------|---------|
| SOUL.md / AGENTS.md 配置 | [[Wiki/wiki/topics/hermes-configuration\|配置指南]] |
| Workspace Web 控制中心 | [[Wiki/wiki/topics/hermes-workspace-setup\|Workspace 指南]] |
| 多 Agent Profile | [[Wiki/wiki/topics/hermes-multi-agent\|多 Agent 团队]] |
| Obsidian 知识库集成 | [[Wiki/wiki/topics/hermes-obsidian-integration\|Obsidian 集成]] |
| 个人 RAG 检索 | [[Wiki/wiki/topics/hermes-rag-setup\|RAG 设置]] |
| 智能家居控制 | [[Wiki/wiki/topics/hermes-home-assistant-integration\|Home Assistant]] |

### 适合

- 🟢 希望 Agent 越用越聪明
- 🟢 深度使用飞书/钉钉/企业微信
- 🟢 Python 技术栈
- 🟢 想做 AI Agent 研究

### 不适合

- 🔴 严格安全合规要求（选 OpenClaw）
- 🔴 想快速上手不想折腾
- 🔴 Windows 用户（需 WSL2）

> 📚 深入：[[Wiki/wiki/entities/hermes-agent|Hermes Agent 实体页]] · [[Wiki/wiki/topics/hermes-agent-guide|Hermes 完整教程]]

---

## 3.6 横向对比总结

### 一张表选型

| 维度 | Claude Code | Codex | OpenClaw | Hermes Agent |
|------|------------|-------|----------|-------------|
| **层次** | L4-L5 | L4 | L4 | L4 |
| **交互** | 终端 CLI | App/CLI/IDE/Cloud | 消息平台 | 消息平台 |
| **语言** | TypeScript | TypeScript | Node.js | Python |
| **自进化** | ❌ | ❌ | ❌ | ✅ |
| **安装难度** | 中 | 中 | **低** | 中 |
| **安全模型** | 权限分级 | 沙箱矩阵 | 10+ 安全模块 | 智能审批 |
| **国内友好** | CC Switch 接入 | 中转 API | 扩展支持 | **原生飞书/钉钉/企微** |
| **学习资源** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **社区热度** | 极高 | 极高 | 24.7 万 Stars | 13.7 万 Stars |

### 选择决策树

```
你的首要需求是什么？
├── 写代码 → Claude Code（从零架构）或 Codex（明确任务）
├── 消息平台日常助手 → OpenClaw（稳定）或 Hermes（智能）
├── 希望 Agent 自己学习 → Hermes（唯一选择）
├── 企业安全合规 → OpenClaw
├── 深度国内生态 → Hermes（飞书/钉钉/企微原生）
├── 快速体验 → OpenClaw（5 分钟上手）
└── 深入探索 → Hermes（可定制性最强）
```

### 组合策略

不必非此即彼。推荐组合：

```
Hermes：日常助手（微信/飞书交互，自动学习）
  +
OpenClaw：安全任务（企业环境，严格审批）
  +
Claude Code / Codex：编程任务（各取所长）
```

---

## 自测清单

- [ ] 说出四大 Agent 工具各自的核心定位
- [ ] 理解 Claude Code 和 Codex 的角色差异（协作者 vs 执行者）
- [ ] 解释 OpenClaw「安全优先」和 Hermes「成长优先」的设计差异
- [ ] 能根据具体场景做出选型推荐
- [ ] 了解 Hermes 自进化的独特价值

---

> 🎯 **下一步**：[[04-多Agent协作与编排|第四章：多 Agent 协作与编排]]——学习如何让多个 Agent 协同工作。
