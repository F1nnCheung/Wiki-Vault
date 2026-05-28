---
title: Hermes Agent
type: entity
tags: [hermes-agent, nous-research, agent, self-evolving, python]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/OpenClaw/【万字】OpenClaw vs Hermes：一文深入拆解两大 Agent 框架.md
  - raw/articles/OpenClaw/OpenClaw vs Hermes：拆解 Hermes Agent 五层架构.md
  - raw/articles/Hemmers/Hermes Agent v0.13.0 来了：137K 星的开源 AI Agent 又进化了.md
  - raw/articles/Hemmers/Hermes Agent v1.3 从入门到精通：开口就能用.md
  - raw/articles/Hemmers/Hermes Agent 从入门到精通 V1.2：2026年最值得学的 AI Agent 框架.md
  - raw/articles/Hemmers/Hermes Agent从入门到实战.md
related:
  - topics/hermes-agent-guide.md
  - topics/hermes-architecture-deep-dive.md
  - topics/hermes-multi-agent.md
  - topics/hermes-configuration.md
  - topics/hermes-workspace-setup.md
  - topics/hermes-obsidian-integration.md
  - topics/hermes-rag-setup.md
  - concepts/harness-engineering.md
  - entities/openclaw.md
  - comparisons/openclaw-vs-hermes.md
  - concepts/agent-self-evolution.md
  - concepts/agent-memory-systems.md
  - concepts/agent-context-compression.md
---

# Hermes Agent

Hermes Agent 是 Nous Research 开发的开源自进化 AI Agent（MIT 许可证），Python 编写。核心特色是**自进化**——能从完成任务中自动提炼可复用技能，越用越聪明。

GitHub: **137K+ Stars**（2026 年 5 月数据），21,184 Fork。从 2025 年 7 月首次提交至今不到一年，正在成为最活跃的开源 AI Agent 框架。v0.13.0 一周内 295 位贡献者提交 864 个 commit，合并 588 个 PR。

> 注：中文社区有时称其为「爱马仕」（Hermès 谐音梗）。137K 星的增长速度在同类项目中极为罕见。

## 设计哲学：成长优先

Hermes 回答的核心问题是：**"Agent 怎么才能越来越强？"**

核心设计理念是**闭环学习**：

```
经验 → 技能 → 改进 → 知识持久化
```

这决定了它的设计方向：
- **自进化**：Agent 自己判断是否沉淀技能（完全依赖 prompt 引导 + 后台复盘）
- **灵活性**：不追求绝对稳定，追求"越用越聪明"
- **智能审批**：用便宜辅助模型判断风险，低风险自动通过
- **多后端**：6 种执行环境后端，灵活切换

详见 [[../concepts/agent-self-evolution|Agent 自进化]]。

## 五层架构

详见 [[../topics/hermes-architecture-deep-dive|Hermes Agent 五层架构深度拆解]]。

| 层 | 名称 | 核心 |
|---|------|------|
| 第一层 | 入口层 | CLI + 20+ 消息平台适配器 |
| 第二层 | 网关层 | GatewayRunner，Profile 隔离 |
| 第三层 | 执行层 | AIAgent 主循环，90 轮迭代预算 |
| 第四层 | 扩展层 | 工具注册、技能系统、子 Agent、MCP、记忆 Provider |
| 第五层 | 存储层 | SQLite + FTS5、MEMORY.md / USER.md、Skills 目录 |

## 核心特性

| 特性 | 说明 |
|------|------|
| **自学习循环** | 自动将成功操作转化为可复用 Skill，无需手动微调 |
| **多层记忆** | 三层：内置 MEMORY.md + USER.md、外部 8 个 Provider、FTS5 会话搜索 |
| **22+ LLM 提供商** | OpenAI、Anthropic、Gemini、Groq、DeepSeek、Ollama、Kimi K2.6 等 |
| **20 个消息平台** | Telegram、Discord、Slack、WhatsApp、Signal、微信、QQBot、飞书、Google Chat 等 |
| **CLI + TUI** | React/Ink 交互终端、流式渲染、皮肤引擎 |
| **40+ 内置工具** | 终端执行、文件 I/O、Web 搜索、浏览器自动化、图片生成、TTS |
| **子代理委派** | 并行派发子代理，最大深度 1 层，并发上限 3 个 |
| **Cron 自动化** | 自然语言调度 |
| **多 Agent 协作** | Kanban 看板（Orchestrator/Dispatcher/Worker/Board 四角色），Profile 隔离，并行任务分解 |
| **跨轮目标追踪** | `/goal` 命令在多轮对话中持续追踪目标，对标 Ralph 循环 |
| **多模态** | 视频理解（video_analyze）、语音克隆（xAI Custom Voices）、TTS |
| **RL 训练工具链** | 批量轨迹生成、轨迹压缩、SWE 基准测试 |

### 记忆系统

详见 [[../concepts/agent-memory-systems|Agent 记忆系统设计]]。

- **内置记忆**：MEMORY.md（2200 字符）+ USER.md（1375 字符），冻结快照（会话开始时注入，期间不变）
- **外部记忆**：8 个 MemoryProvider（Honcho/Mem0/Hindsight/Holographic/ByteRover 等）
- **会话搜索**：FTS5 全文搜索 + 辅助模型摘要

### 上下文压缩

详见 [[../concepts/agent-context-compression|Agent 上下文压缩]]。

- 保护两端、压缩中间的迭代摘要策略
- Session 链机制（压缩后开新 session，`parent_session_id` 关联）
- 数据不丢：原始对话完整保留在 SQLite

### 自进化机制

两条信号并行：
1. **系统提示词引导**：三层 prompt 告诉 Agent 何时创建/更新技能
2. **后台强制复盘**：每 10 轮推理触发 mini Agent 复盘，独立后台线程

### 安全模型

智能审批 + 危险命令检测（rm -rf、sudo、chmod）+ 上下文注入防护。

> ⚠️ 注意：用辅助模型判断风险级别本身引入了新的信任问题。安全审计和测试覆盖不如 OpenClaw。

### 错误恢复

14 种错误分类 → `ClassifiedError` 四个布尔标记（retryable / should_compress / should_rotate_credential / should_fallback）→ 主循环只看标记 dispatch。

## 版本历史

| 版本 | 日期 | 亮点 |
|------|------|------|
| v0.8.0 | 2026.04.08 | 后台任务通知、热切换模型、MCP OAuth 2.1 |
| v0.9.0 | 2026.04.13 | 本地 Web Dashboard、Fast Mode、iMessage/WeChat 支持 |
| v0.10.0 | 2026.04.16 | Nous Tool Gateway（Web搜索/图片生成/TTS） |
| v0.11.0 | 2026.04.23 | 全 React/Ink TUI 重写、GPT-5.5 支持、QQBot |
| v0.12.0 | 2026.04.30 | Curator Release：技能市场、多 Agent Profile、上下文引擎可插拔 |
| v0.13.0 | 2026.05.07 | 多 Agent Kanban 看板、`/goal` 跨轮目标追踪、video_analyze 视频理解、xAI 语音克隆、第 20 个消息平台（Google Chat）、会话自动恢复、写文件后自动 Lint |

## 国内生态

- **消息平台**：飞书、钉钉、企业微信、个人微信（通过腾讯 iLink Bot API）原生支持
- **模型**：通过 models.dev 集成 4000+ 模型元数据，含智谱、月之暗面、MiniMax
- **离线快照**：网络不好也不影响使用

## 与 OpenClaw 的对比

详见 [[../comparisons/openclaw-vs-hermes|OpenClaw vs Hermes 深度对比]]。

| 维度 | Hermes Agent | OpenClaw |
|------|-------------|----------|
| 核心差异 | 自进化 + 多平台网关 | 安全优先 + 大社区 |
| 语言 | Python + Rust CLI | TypeScript |
| Stars | 13.7 万 | 24.7 万 |
| 研究能力 | 内置 RL 训练工具链 | 纯产品，无训练能力 |
