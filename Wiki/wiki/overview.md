---
title: 全局概览
type: overview
tags: []
created: 2026-05-09
updated: 2026-05-29
sources:
  - raw/articles/Claude Code/
  - raw/articles/Codex/
  - raw/articles/OpenClaw/
  - raw/articles/Hemmers/
  - raw/articles/Obsidian/
  - raw/articles/知识库/
  - raw/articles/132页！Anthropic黑客松获胜者everything-claude-code完整教程来了！.md
related:
  - entities/everything-claude-code.md
  - topics/ecc-complete-guide.md
  - topics/claude-code-introduction.md
  - topics/claude-code-installation.md
  - topics/claude-code-getting-started.md
  - topics/claude-code-mcp-ecosystem.md
  - topics/claude-code-skills-ecosystem.md
  - topics/claude-code-superpowers-workflow.md
  - topics/claude-code-design-integration.md
  - topics/claude-code-tools.md
  - topics/claude-code-prompt-engineering.md
  - topics/claude-md-12-rules.md
  - comparisons/openclaw-vs-hermes.md
  - topics/hermes-architecture-deep-dive.md
  - topics/hermes-multi-agent.md
  - topics/hermes-configuration.md
  - topics/hermes-workspace-setup.md
  - topics/hermes-obsidian-integration.md
  - topics/hermes-rag-setup.md
  - topics/hermes-agent-guide.md
  - concepts/harness-engineering.md
  - entities/obsidian.md
  - topics/obsidian-getting-started.md
  - topics/obsidian-ai-integration.md
  - topics/obsidian-capture-workflow.md
  - topics/obsidian-llm-wiki-practice.md
  - comparisons/obsidian-notion-tolaria.md
  - concepts/second-brain.md
  - concepts/file-over-app.md
  - concepts/rag-evaluation.md
  - concepts/hybrid-retrieval.md
  - topics/agentic-rag-patterns.md
  - topics/vector-graph-rag.md
---

# 全局概览

本知识库围绕 **Claude Code**、**OpenAI Codex**、**Agent 框架对比**、**Obsidian 知识管理**、**知识库技术（RAG/图谱）**、**智能家居（Home Assistant + Hermes）** 和 **AI 原生创业（OPC）** 七大主线构建，收录了 27 篇 Claude Code 文章（含 1 本 10 章完整指南）+ Everything Claude Code（180K+ Stars）+ 13 篇 Codex 文章 + 2 篇 OpenClaw vs Hermes 深度对比 + 1 份橙皮书 + **21 篇** Hemmers Hermes Agent 系列文章 + 23 篇 Obsidian 知识管理文章 + **29 篇**知识库技术文章（RAG 架构/进化史/Agentic RAG/混合检索/评估体系/知识图谱/Vector Graph RAG/向量检索算法） + 2 篇 Home Assistant 文章 + 2 篇 OPC/AI 创业文章 + 1 篇 VibeCoding 实战文章，系统化整理了从概念到实战的完整知识体系。

## 核心论点

1. **Claude Code 是一种新工作范式**：它不仅是代码补全工具，更是能自主规划并执行的多工具 Agent，能力通过 Prompt → Skill → Project → MCP 四层协同释放。

2. **能力扩展是价值倍增器**：裸用 Claude Code 只发挥了约三成功力。MCP（外部工具连接）赋予了 AI 操作浏览器、数据库、GitHub 的能力；Skills（可复用方法论）将软件工程最佳实践编码为 AI 自动遵循的流程。

3. **流程约束比模型能力更重要**：AI 模型本身在变强，但怎么用的方法论决定了最终产出质量。Superpowers + gstack 的「大脑+手脚」双插件体系通过强制流程将返工率降低约 90%。

4. **国内用户有成熟替代方案**：通过 CC Switch、CCR、桌面客户端 3P 模式等工具，可以无缝接入 DeepSeek、GLM、MiniMax 等国产模型，完全不需 Anthropic 账号。

5. **设计集成正在重塑前端开发**：从 Figma MCP 的设计稿转代码，到 DESIGN.md 的设计系统规则，AI 前端开发正从「Vibe Coding」进入「Vibe Design」阶段。

6. **Harness Engineering 是 Agent 效能倍增器**：Everything Claude Code（ECC）证明了 Harness 可以工程化为可安装的系统——60 个 Agent + 228 个 Skill + Hook 自动化 + 持续学习 + 安全扫描，将 Claude Code 裸用的「三成功力」提升到接近极限。ECC 的 Skills-first 架构、选择式安装、跨框架支持，代表了 Agent Harness 的最佳实践方向。

## 知识结构

```
Claude Code 知识体系
│
├── 📖 介绍篇 ─── 什么是 Claude Code、四层能力体系、适用场景
│
├── 🔧 安装篇 ─── CLI/桌面客户端两条路线、国内模型接入
│   ├── CC Switch（GUI 配置管理）
│   └── CCR（智能模型路由）
│
├── 🚀 入门篇 ─── 50+ 命令体系、日常工作流、提示词工程
│   ├── 会话管理（compact/clear/resume/rewind）
│   ├── 权限管理（allow/ask/deny 三层分级）
│   ├── 高频实战技巧 ── /init + /memory 项目记忆、会话管理四件套、模型/上下文/成本/状态监控
│   └── Spec-Driven 开发模式
│
└── 🧠 进阶篇
    ├── MCP 生态 ── Playwright、Context7、GitHub 等 20+ 核心 MCP
    ├── Skills 生态 ── 8 个核心 Skill、7 个 UI/UX Skill、11 个分级推荐
    ├── Superpowers+gstack ── 完整开发闭环（想法→上线）
    ├── 设计集成 ── Figma MCP、DESIGN.md、UI/UX Skill 体系
    ├── 辅助工具 ── Claude HUD、Understand-Anything
    ├── 精通指南（花叔 v2.0.0）── 三层模型、CLAUDE.md 深度实践、Computer Use/Voice Mode、Agent Teams、六反模式
    └── 提示词工程 ── 5 大场景 20 个模板

实體层：Claude Code / MCP / Superpowers / gstack / CC Switch / CCR / ECC
```

## Agent 框架对比知识体系

```
OpenClaw vs Hermes 知识体系
│
├── 📊 综合对比 ─── 设计哲学 / 学习闭环 / 记忆 / 压缩 / 安全 / 执行环境 / 选型
│
├── 🏗️ 架构专题 ─── Hermes 五层架构深度拆解
│   ├── 适配器模式（20+ 平台统一入口）
│   ├── Gateway + Profile 隔离
│   ├── Agent 主循环（迭代预算 / PTC / 工具并行 / 子 Agent）
│   ├── 系统提示词（模型特定引导 / 安全扫描 / 前缀缓存优化）
│   └── 自修复（14 种错误分类 / 级联中断 / Session 链）
│
├── 🔄 编排框架对比 ─── LangChain vs LangGraph vs Spring AI Alibaba Graph
│   ├── 执行模型（线性 Chain vs 有向图 StateGraph）
│   ├── Agent 模式（ReAct / Supervisor+Worker / Plan-Act）
│   ├── 企业特性（可观测性 / 断点回放 / 低代码）
│   └── 选型公式：技术栈 × 任务复杂度 × 企业级需求
│
└── 🧠 核心概念
    ├── Agent 自进化（Prompt 驱动 + 后台复盘）
    ├── Agent 记忆系统（三层记忆 vs 单插件）
    └── 上下文压缩（压中间 vs 压头部）
```

## Hermes Agent 深度专题

```
Hermes 深度专题
│
├── 🏗️ 架构 ─── 五层架构深度拆解（入口→网关→执行→扩展→存储）
│
├── 👥 多 Agent ── 多角色团队搭建、Kanban 任务编排
│   ├── Profile 隔离机制（独立配置/密钥/记忆/会话）
│   ├── Kanban 四角色（Orchestrator/Dispatcher/Worker/Board）
│   └── 实战案例（default+coding 协作 12 分钟完成爬虫）
│
├── ⚙️ 配置 ──── SOUL.md & AGENTS.md 最佳实践
│   ├── SOUL.md（全局身份/协作方式）
│   └── AGENTS.md（项目规则/目录/命令）
│
├── 🖥️ Workspace ─ 六面板 Web 控制中心
│   ├── Chat/Memory/Skills/Terminal/Tools/Conductor
│   └── Kanban 多代理协作
│
├── 📓 Obsidian ─ Obsidian + Hermes 知识库集成
│   └── Source → Topic → Draft → Published 生产线
│
├── 🔍 RAG ──── 个人知识管理 RAG 检索
│   └── Markdown → Ollama Embedding → ChromaDB → Hermes 检索
│
└── 🧠 概念 ──── Harness Engineering
    └── Agent = Model + Harness，生成-评估分离
```

## Obsidian 知识管理体系

```
Obsidian 知识体系
│
├── 🏗️ 基础概念 ─── 第二大脑、File over App、LLM Wiki
│
├── 🔰 入门指南 ─── PARA / Zettelkasten / MOC 方法论 + 20 个核心插件 + 从零搭建实操
│
├── 🤖 AI 集成 ───── 五种方案对比
│   ├── Claude Code + Obsidian CLI（最强能力）
│   ├── Copilot + DeepSeek（新手最佳：便宜 6-15 倍）
│   ├── Claudian 插件（无缝嵌入侧边栏）
│   ├── Copilot + Ollama（完全本地，零数据外传）
│   └── Web Clipper + Claude Code 批量处理
│
├── 📥 信息收集 ──── 三种入口打通
│   ├── Obsidian Web Clipper：浏览器 → Obsidian，3 秒保存
│   ├── 微信同步：笔记同步助手 / Messager 插件
│   └── LLM Wiki raw/ 收录：Web Clipper → raw/ → AI 处理
│
├── 🔄 LLM Wiki 实践 ─ 七种开源实现
│   ├── 完整应用：llmwiki、llm_wiki、Karpathy-LLM-Wiki
│   ├── Skill 包：llm-wiki-skill、llm-knowledge-base、karpathy-llm-wiki
│   └── Obsidian Vault 内：Ar9av/obsidian-wiki（14+ Agent 共享）
│
├── 🔧 插件进阶 ──── 图片管理 / 文档导出 / 数据查询 / 快速捕获
│   ├── Custom Attachment Location：标准化图片管理
│   ├── Enhancing Export：多格式导出（Word/PDF/HTML/ePub）
│   ├── Dataview / Templater / Calendar / QuickAdd 深度用法
│   └── 插件性能优化建议
│
├── 🔐 Git 云同步 ── 免费多端同步方案
│   ├── GitHub 私有仓库创建与克隆
│   ├── Git 插件自动同步配置（1 分钟自动 commit+push）
│   └── 手机端完整配置（Personal Access Token + 同步验证）
│
├── 🆚 工具对比 ─── Obsidian vs Notion vs Tolaria
│   └── 本地优先 vs 云端优先 vs 两者兼顾
│
└── 🔌 实体层 ─── Obsidian、Tolaria
```

## OpenAI Codex 知识体系

Codex 已从「云端编程助手」演化为集编程、浏览器操作、电脑自动化、AI 生图于一体的统一 AI Agent 操作平台。2026 年与 Claude Code 并称双强，token 效率约为 Claude Code 的 4 倍。

```
Codex 知识体系
│
├── 🏗️ 核心概念 ─── 四大产品形态（App/CLI/IDE/Cloud）共享配置
│   ├── 沙箱安全系统（3 档沙箱 × 3 档审批 = 9 种安全组合）
│   ├── 项目 = 文件夹（产物全部在用户硬盘）
│   └── Steering 异步纠偏（接管方向盘，不等当前步骤结束）
│
├── 🔧 安装与配置 ── Windows/Mac 双平台
│   ├── App 安装（图形界面，三栏布局）
│   ├── CLI 安装（npm/brew，交互+非交互双模式）
│   └── DeepSeek 接入（mimo2codex + CC Switch 本地转发方案）
│
├── 🚀 实战篇 ─── 从入门到精通的完整工作流
│   ├── 项目与任务管理（多项目并行、序列化 prompt）
│   ├── Plan 模式（先出计划确认，再执行）
│   ├── Fork Chat（对话分叉 + Git 回滚 = 双重撤销）
│   ├── TDD 闭环（先写测试→确认失败→写实现→不许改测试）
│   └── 六阶段方法论（搞懂→装上→划笼子→教规矩→装缰绳→规模化）
│
├── 🧠 扩展体系 ── Plugin / Skill / MCP 三层
│   ├── Plugin 市场（第三方服务能力扩展包）
│   ├── Skills（官方/第三方/自建，Skill Creator 自然语言生成）
│   └── MCP 集成（Supabase 等外部服务标准化接入）
│
├── 🤖 高级能力
│   ├── Computer Use（Mac 虚拟鼠标后台操作桌面应用）
│   ├── Automation（chat 一键转定时任务，Skill+Automation=个人 RPA）
│   ├── 云端运行环境（任务丢 OpenAI 云上跑，下班丢给它，第二天收 PR）
│   ├── AI 生图（GPT-Image-2，当前最强生图模型）
│   └── 记忆系统（AGENTS.md 项目级+全局级，测试命令自动执行）
│
├── 🔄 Git 深度集成 ── 对话式 Git 操作
│   ├── Worktree 并行开发（同一项目多分支，不同文件夹互不干扰）
│   ├── Fork + 回滚（对话+代码双重撤销）
│   └── IDE 联动（一键在 VSCode/Cursor/Windsurf 打开）
│
└── 🆚 与 Claude Code 对比 ── 执行型工程师 vs 协作者
    ├── Codex：边界清楚的活、review、debug（token 效率 4 倍优势）
    ├── Claude Code：从零想架构、初始功能（交互推理强、上下文深）
    └── 高手玩法：Codex 做审查+Debug，Claude Code 做架构，互补而非二选一
```

## 知识库技术：RAG 架构、优化与知识图谱

从 RAG 到知识图谱，知识库技术经历了三代演进。本板块覆盖 RAG 架构对比、20 种优化方法、知识图谱概念、代码图谱工具四大分支。

```
知识库技术体系
│
├── 📊 RAG 架构与优化
│   ├── 三种检索架构
│   │   ├── Classic RAG — 检索：找资料（chunk→embedding→向量库→Top K→生成）
│   │   ├── Graph RAG — 连接：找关系（知识图谱实体+关系遍历）
│   │   └── Agentic RAG — 推理：决定下一步（多步骤动态调查，Agent 自主选择工具）
│   ├── 微调策略四象限（无微调/检索器微调/模型微调/协同微调）
│   ├── RAG 优化 20 法 — 从「能跑」到「能用」的五阶段优化管线
│   │   ├── 数据入库（语义分块/元数据过滤/Graph RAG/反向提问）
│   │   ├── 检索前（查询重写/多路查询/HyDE/路由）
│   │   ├── 检索阶段（稠密+稀疏混合检索/RRF/微调嵌入）
│   │   ├── 检索后（重排/上下文压缩/MMR）
│   │   └── 生成阶段（Prompt 护栏/自我反思/引用溯源）
│   └── 系统评估（检索质量+生成质量双维度指标）
│
├── 🧠 知识图谱
│   ├── 三元组（实体-关系-实体）→ 本体（Ontology）→ 置信度与溯源
│   ├── 构建流程：问题→Schema→数据源→抽取→消歧→融合→校验→存储→应用→迭代
│   └── 应用：搜索/推荐/风控/医疗/企业 KM/GraphRAG
│
├── 🔧 代码知识图谱工具
│   ├── GitNexus（3.55 万 Stars）— 零服务器浏览器端引擎，14 语言，16 MCP 工具
│   └── Graphify — 终端 CLI，多模态项目图谱（代码+文档+图片+视频）
│
└── 🧠 核心概念
    ├── 代码知识图谱 — 从「检索文件」到「查询关系」
    ├── 知识图谱 — 把散落的关系显式化，让计算机理解和复用
    └── RAG 选型心法 — 看问题形状，不看架构名字
```

## 智能家居：Home Assistant + Hermes

Home Assistant 是开源智能家居的中控平台，Hermes Agent 为其注入自然语言理解能力。两者结合实现了「说话就能控制全家」的智能家居体验。

```
Home Assistant + Hermes 智能家居
│
├── 🏠 Home Assistant — 开源跨品牌智能家居中控
│   ├── Docker 部署（群晖 NAS 方案）
│   ├── HACS 插件商店
│   ├── 品牌集成：米家 / 海尔 / 美的 / 海信 / Apple HomeKit
│   └── 远程访问（花生壳内网穿透）
│
├── 🤖 Hermes + HA 集成 — 自然语言控制
│   ├── Long-Lived Access Token + toolset 自动加载
│   ├── 五大场景：自然语言 / 条件逻辑 / Cron 定时 / Telegram 远程 / Philips Hue
│   ├── 记忆系统：记住偏好，一句话触发完整场景
│   └── 社区实验：本地 LLM 接管门铃对讲
│
└── 🔌 实体层：Home Assistant、Hermes Agent
```

## AI 原生创业：OPC 与 Anthropic 创始人手册

AI 让「一个人 = 一家公司」从理想变为现实。本板块覆盖 OPC 概念、六种商业模式、中美对比，以及 Anthropic 官方发布的 AI 原生创业四阶段方法论。

```
AI 原生创业知识体系
│
├── 🏗️ OPC（一人公司）— 出售系统，而非时间
│   ├── 定义：自由职业 vs OPC（时间 vs 系统）
│   ├── 三大驱动力：AI 效率 10x / 大厂裁员潮 / 政策转向
│   ├── 六种商业模式：内容 / 咨询 / 微SaaS / 跨境 / 撮合 / AI Agent 定制
│   ├── 中美对比：美国技术驱动 vs 中国生态培育
│   └── 真实痛点：孤独 / 收入天花板 / 融资困难 / 认知壁垒
│
├── 📖 Anthropic 创始人手册 — 四阶段方法论
│   ├── 三大 AI 杠杆：研究调研 / 智能体编程 / 流程自动化
│   ├── 构思阶段：验证问题（最大坑：跳过验证直接开发）
│   ├── MVP 阶段：CLAUDE.md 防复利技术债
│   ├── 发布阶段：从执行者到系统设计者
│   ├── 扩展阶段：领域知识为护城河
│   └── 核心理念：创始人 = AI 智能体的指挥家
│
└── 🔌 实体层：Claude Code、Claude Cowork
```

## 关键数据

- 收录文章：**124 篇**（Claude Code 27 篇 + 辰北 CLAUDE.md 规则 1 篇 + ECC 1 篇 + OpenClaw/Hermes 2 篇 + Hemmers 21 篇 + Obsidian 23 篇 + Codex 13 篇 + 知识库技术 29 篇 + AI Agent 编排 1 篇 + Gemini 1 篇 + Home Assistant 2 篇 + OPC 2 篇 + VibeCoding 1 篇 + 橙皮书 1 份）
- 输出产物：4 份（[AI Coding 学习计划](../../教程/AI Coding/AI Coding 学习计划.md) · [知识库技术学习指南](../../教程/知识库技术/知识库技术学习指南.md) · [智能家居学习指南](../../教程/智能家居/智能家居学习指南.md) · [OPC 一人公司学习指南](../../教程/OPC/OPC 一人公司学习指南.md)）
- 知识领域：安装配置、命令体系、MCP 生态、Skills 生态与推荐、设计集成、工作流方法、Agent 架构对比、多 Agent 协作、Hermes 配置、知识库集成、Obsidian 知识管理、信息收集工作流、LLM Wiki 实践、实战技巧、精通指南、Harness 性能优化、CLAUDE.md 规则体系、OpenAI Codex 全体系、CC vs Codex 选型框架、**RAG 五阶段进化史、混合检索（BM25+向量）、RAG 评估体系（检索+生成两层）、Agentic RAG 四种模式、A-RAG 层级检索、NaviRAG 主动导航、Vector Graph RAG**、知识图谱、GraphRAG、代码图谱、智能家居自动化（Home Assistant + Hermes）、AI 原生创业方法论（OPC + Anthropic 手册）、VibeCoding 实战、Obsidian 主页设计
- 核心实体：**15 个**（Claude Code、MCP、Superpowers、gstack、CC Switch、CCR、ECC、Codex、OpenClaw、Hermes Agent、Obsidian、Tolaria、GitNexus、Graphify、Home Assistant）
- 专题页面：**34 个**
- 概念页面：**17 个**
- 对比页面：3 个
