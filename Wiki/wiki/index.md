---
title: 知识库索引
type: overview
updated: 2026-05-28
---

# 知识库索引

## 概览
- [全局概览](overview.md) — Claude Code + AI Coding + Obsidian 知识管理三大体系总览

---

## 🗺️ AI Coding 学习路线
- [AI Coding 学习路线](topics/ai-coding-learning-plan.md) — 从零开始的系统学习路径
- [AI Coding 完整学习计划](../../教程/AI-Coding/AI Coding 学习计划.md) — 📖 综合教程：从入门到精通（含概念/工具/Agent/拓展）
- [AI Coding 发展史](topics/ai-coding-history.md) — 2024-2026 发展历程与市场格局
- [AI Coding 核心概念](topics/ai-coding-concepts.md) — Vibe Coding、Agent、MCP、Skills、Claw、Hermes 等
- [AI Coding 工具全景对比](topics/ai-coding-tools-comparison.md) — Claude Code / Cursor / Codex / Trae / Copilot 对比

---

## 概念

### AI Coding 概念
- [Vibe Coding](concepts/vibe-coding.md) — Karpathy 提出，用自然语言描述需求，让 AI「凭感觉」编程
- [Agentic Engineering](concepts/agentic-engineering.md) — 多 Agent 自主规划→编写→测试→审查，人类退为架构师
- [AI Agent](concepts/ai-agent.md) — 自主感知、规划、执行、反思的 AI 系统，L1-L5 能力层次
- [Skills（技能系统）](concepts/skills-concept.md) — AI 的可复用「能力包」，自动发现并按需调用
- [ID Coding](concepts/id-coding.md) — 终极愿景：意图→服务，编程语言可能消失

### Agent 架构概念
- [Agent 自进化](concepts/agent-self-evolution.md) — Prompt 驱动 vs 后台流水线，两种自进化策略的设计取舍
- [Agent 记忆系统设计](concepts/agent-memory-systems.md) — 三层记忆 vs 单插件槽位，冻结快照与 Session 链
- [Agent 上下文压缩](concepts/agent-context-compression.md) — 压中间 vs 压头部，Session 链保数据不丢
- [Harness Engineering（编排工程）](concepts/harness-engineering.md) — Agent = Model + Harness，生成-评估分离的行业共识
- [Superpowers 设计哲学](concepts/superpowers-design-philosophy.md) — 铁律+硬门控 / 合理化防范 / 人的搭档 / CSO 四大设计原则

### RAG 与知识图谱概念
- [RAG 三种架构](concepts/rag-architectures.md) — Classic RAG（检索）→ Graph RAG（连接）→ Agentic RAG（推理），含微调策略/评估/优化三维度
- [知识图谱](concepts/knowledge-graph.md) — 实体 + 关系 + 三元组 + 本体，把散落的关系显式化，让计算机理解和复用
- [代码知识图谱](concepts/code-knowledge-graph.md) — 从「检索文件」走向「查询关系」，让 AI 编程助手具备项目记忆层

### Obsidian / 知识管理概念
- [第二大脑（Second Brain）](concepts/second-brain.md) — 外部化的、可持久积累的认知基础设施
- [File over App](concepts/file-over-app.md) — 数据属于用户，文件比应用更长寿的软件哲学

### 创业 / 组织形态概念
- [OPC（一人公司）](concepts/opc-one-person-company.md) — 出售系统而非时间，一个人 + AI = 一家公司，六种商业模式与中美对比

---

## 实体

### Claude Code 生态
- [Claude Code](entities/claude-code.md) — Anthropic 终端 AI 编程 Agent，四层能力体系，含 CLAUDE.md 层级结构详解
- [Everything Claude Code (ECC)](entities/everything-claude-code.md) — Anthropic 黑客松获胜项目，Agent Harness 性能优化系统（180K+ Stars）
- [MCP（Model Context Protocol）](entities/mcp.md) — AI 连接外部工具的开源标准协议
- [Superpowers](entities/superpowers.md) — 跨 8 个平台的 14 个强制流程 Skill，返工减 90%
- [gstack](entities/gstack.md) — YC 合伙人 Garry Tan 的执行工具链
- [CC Switch](entities/cc-switch.md) — 跨平台 GUI 模型配置管理工具（52.8k Stars）
- [Claude Code Router](entities/claude-code-router.md) — 智能模型路由层，降本 70%+

### AI Coding 工具
- [Cursor](entities/cursor.md) — AI 原生 IDE，估值 290 亿美元
- [Codex](entities/codex.md) — OpenAI 统一 AI Agent 平台（App/CLI/IDE/Cloud），沙箱安全系统、Computer Use、Automation、Skill，与 Claude Code 并称双强
- [Trae](entities/trae.md) — 字节跳动 AI IDE，永久免费，中国市场份额 41.2%

### AI Agent 工具
- [OpenClaw](entities/openclaw.md) — 开源个人 AI Agent（24.7 万 Stars），消息平台交互
- [Hermes Agent](entities/hermes-agent.md) — 自进化 AI Agent，多平台网关（13.7 万 Stars）

### 知识管理工具
- [Obsidian](entities/obsidian.md) — 本地优先、Markdown 原生的个人知识管理工具，2700+ 插件生态
- [Tolaria](entities/tolaria.md) — 2026 年新兴开源 PKM，取 Obsidian（本地 Markdown）+ Notion（友好界面）之长

### 智能家居
- [Home Assistant](entities/home-assistant.md) — 开源智能家居中控平台，跨品牌统一控制（米家/海尔/美的/海信/HomeKit）

### 知识图谱与代码分析
- [GitNexus](entities/gitnexus.md) — 零服务器代码知识图谱引擎（3.55 万 Stars），浏览器端 WASM 运行，14 语言 + 16 MCP 工具 + Graph RAG
- [Graphify](entities/graphify.md) — 多模态项目知识图谱 CLI 工具，支持代码+文档+图片+视频的关系查询

---

## 专题

### 📖 Claude Code 介绍篇
- [Claude Code 介绍](topics/claude-code-introduction.md) — 什么是 Claude Code、四层能力、三种模式
- [ECC 完整指南](topics/ecc-complete-guide.md) — Everything Claude Code 从零到精通：安装/Agent/Skills/Hook/持续学习/安全/高级用法

### 🔧 Claude Code 安装篇
- [Claude Code 安装与配置](topics/claude-code-installation.md) — CLI/桌面客户端、国内模型接入、CCR/CC Switch

### 🚀 Claude Code 入门篇
- [命令与日常使用](topics/claude-code-getting-started.md) — 50+ 命令体系、会话管理、权限规则
- [高频实战技巧](topics/claude-code-practical-techniques.md) — /init + /memory 项目记忆、会话管理四件套、模型/上下文/成本/状态监控
- [提示词工程](topics/claude-code-prompt-engineering.md) — 20 个结构化模板、Spec-Driven 开发

### 🧠 Claude Code 进阶篇
- [MCP 生态系统](topics/claude-code-mcp-ecosystem.md) — Top 15 排行榜、按角色推荐
- [Skills 生态系统](topics/claude-code-skills-ecosystem.md) — 8 个核心 Skill、UI/UX 设计 Skill
- [Skills 分级推荐](topics/claude-code-skills-recommendations.md) — 11 个 Skill 五级梯队 + 8 种角色定制方案
- [Superpowers + gstack 工作流](topics/claude-code-superpowers-workflow.md) — 完整开发闭环
- [Superpowers 插件系统与多平台适配](topics/superpowers-plugin-system.md) — 多平台装配层 / 跨平台钩子兼容 / 版本管理 / 贡献标准
- [设计集成与前端开发](topics/claude-code-design-integration.md) — Figma MCP、DESIGN.md
- [辅助工具](topics/claude-code-tools.md) — Claude HUD、Understand-Anything
- [从入门到精通指南（花叔 v2.0.0）](topics/claude-code-mastery-guide.md) — 三层模型、CLAUDE.md 深度实践、Computer Use/Voice Mode、Agent Teams、六反模式
- [CLAUDE.md 12 条规则深度解析](topics/claude-md-12-rules.md) — Karpathy 4 条 + 辰北 8 条，41%→3% 失误率，含完整模板与翻车复盘

### 🛠️ AI Coding 工具教程
- [Trae 完整教程](topics/trae-guide.md) — 安装、Chat/Builder/SOLO/IDE 四种模式、MCP 配置
- [Cursor 完整教程](topics/cursor-guide.md) — Tab 补全、Cmd+K、Composer、Background Agents
- [Codex 完整教程](topics/codex-guide.md) — 安装/沙箱/Plan模式/Steering/Skills/MCP/Automation/Computer Use/Git 完整工作流
- [Codex + DeepSeek 接入教程](topics/codex-deepseek-integration.md) — mimo2codex + CC Switch 本地转发方案，零修改核心文件
- [OpenClaw 完整教程](topics/openclaw-guide.md) — 安装、消息平台配置、Skills 安装
- [Hermes Agent 完整教程](topics/hermes-agent-guide.md) — 自进化系统、多平台网关、模型配置

### 🏗️ Agent 架构专题
- [Hermes Agent 五层架构深度拆解](topics/hermes-architecture-deep-dive.md) — 跟一条消息走完五层：适配器→网关→主循环→系统提示→自修复→自进化

### 🤖 Hermes 深度专题
- [Hermes 多 Agent 团队搭建指南](topics/hermes-multi-agent.md) — Profile 隔离、Kanban 四角色协作、实战案例（12 分钟双 Agent 协同开发）
- [Hermes 配置指南：SOUL.md & AGENTS.md](topics/hermes-configuration.md) — 装完后第一件事：给 Agent 定性格和规矩（附可复制模板）
- [Hermes Workspace 设置指南](topics/hermes-workspace-setup.md) — 六面板 Web 控制中心：Chat/Memory/Skills/Terminal/Tools/Conductor
- [Hermes + Obsidian 知识库集成](topics/hermes-obsidian-integration.md) — Obsidian 做底座，Hermes 做执行层：Source→Topic→Draft→Published 生产线
- [Hermes 个人知识管理 RAG 检索](topics/hermes-rag-setup.md) — Ollama Embedding + ChromaDB，自然语言检索所有笔记

### 📓 Obsidian 知识管理
- [Obsidian 入门指南](topics/obsidian-getting-started.md) — PARA / Zettelkasten / MOC 方法论 + 20 个核心插件 + 从零搭建实操
- [Obsidian AI 集成方案](topics/obsidian-ai-integration.md) — 五种方案对比：Claude Code CLI / Copilot+DeepSeek / Claudian / Ollama / Web Clipper
- [Obsidian 信息收集工作流](topics/obsidian-capture-workflow.md) — 浏览器 Web Clipper / 微信 Messager / 笔记同步助手，三种入口打通
- [Obsidian LLM Wiki 实践](topics/obsidian-llm-wiki-practice.md) — 七种 Karpathy Wiki 开源实现 + Python 知识蒸馏脚本 + LLM Wiki v2 扩展
- [Obsidian Git 云同步指南](topics/obsidian-git-sync.md) — 免费 Git+GitHub 多端同步，电脑端+手机端完整教程
- [Obsidian 插件进阶指南](topics/obsidian-plugins-advanced.md) — 图片管理/文档导出/Dataview/Templater/Calendar/QuickAdd 深度配置

### 🏠 智能家居与 AI Agent
- [Hermes + Home Assistant 集成](topics/hermes-home-assistant-integration.md) — 自然语言控制全家设备，五大场景实战（条件逻辑/Cron/Telegram/记忆/门铃对讲）

### 🚀 AI 原生创业
- [AI 原生创业手册（Anthropic 2026）](topics/ai-native-startup-playbook.md) — 三大 AI 杠杆 / 创业四阶段 / 创始人 = AI 指挥家 / 三大新坑

### 📚 RAG 与知识库技术
- [RAG 优化 20 法](topics/rag-optimization-techniques.md) — 五阶段优化管线：数据入库 → 检索前 → 检索阶段 → 检索后 → 生成阶段，含 Milvus 索引选型与嵌入模型选择

### ✍️ AI 学术写作
- [Gemini 3.5 + 六个 Skill 学术论文写作](topics/gemini-academic-writing.md) — 定框架→引言→文献综述→方法→结果分析→结论，六步 Skill 管线化工作流

---

## 对比

- [Agent 框架对比索引](comparisons/agent-frameworks-moc.md) — OpenClaw vs Hermes 知识体系导航（MOC） + 编排框架对比
- [OpenClaw vs Hermes 深度对比](comparisons/openclaw-vs-hermes.md) — 设计哲学/学习闭环/记忆/压缩/安全/执行环境/选型建议，九维全面对比
- [Agent 编排框架对比](comparisons/agent-orchestration-frameworks.md) — LangChain vs LangGraph vs Spring AI Alibaba Graph，三大编排框架横向对比

### PKM 工具对比
- [Obsidian vs Notion vs Tolaria](comparisons/obsidian-notion-tolaria.md) — 本地优先 vs 云端优先 vs 两者兼顾，三款知识管理工具全面对比

## 输出产物

- [知识库技术学习指南](../../教程/知识库/知识库技术学习指南.md) — 📖 综合教程（451 行），涵盖：RAG 三大架构 / RAG 优化 20 法 / 知识图谱 / 代码知识图谱 / LLM Wiki 范式 / 向量数据库 / 工具生态
- [AI Coding 学习计划](../../教程/AI-Coding/AI Coding 学习计划.md) — 📖 综合教程（1072 行），涵盖：发展历程与核心概念 → 五大工具完整教程（Claude Code/Cursor/Trae/Codex/Copilot）→ Agent 框架（OpenClaw/Hermes）→ 拓展使用（Obsidian 知识库/Superpowers+gstack）→ 按角色学习路线图

## 原始资料

27 篇 Claude Code 中文文章（含 1 本 10 章完整指南），位于 `raw/articles/Claude Code/`：安装配置(5) / 命令提示词(3) / 实战技巧(2) / 精通指南(1) / MCP(4) / Skills(4) / Superpowers(3) / 设计集成(4) / 辅助工具(2) / 工具对比(1)
- [Claude Code 还是 Codex？老金告你怎么选！](../raw/articles/Claude%20Code/Claude%20Code还是Codex？老金告你怎么选！.md) — 老金，2026.05，四种用户类型（许愿/现场/派单/调度）选型框架
- [Claude Code 十一个常用 Skill 推荐（含各职业最佳 Skill）](../raw/articles/Claude%20Code/Claude%20Code十一个常用Skill推荐（含各职业最佳Skill）.md) — 萝卜啊，2026.05，五级梯队 + 8 角色定制的完整 Skill 推荐方案

### Claude Code / CLAUDE.md 资料
3 篇 CLAUDE.md 规则深度文章，位于 `raw/articles/Claude Code/`：
- [让Claude编程失误率从41%降到3%：12条CLAUDE.md规则的踩坑复盘](../raw/articles/Claude%20Code/让Claude编程失误率从41%降到3%：12条CLAUDE.md规则的踩坑复盘.md) — 辰北，2026.05，Karpathy 原版 4 条 + 8 条增量规则，含 30 代码库 6 周实验数据
- [CLAUDE.md 的12条规则，让编程错误率从 41% 降至 3%](../raw/articles/Claude%20Code/CLAUDE.md%20的12条规则，让编程错误率从%2041%25%20降至%203%25.md) — 来杯凉白开，2026.05，Karpathy 4 条基础 + 辰北 8 条高级规则中英对照
- [最佳 Claude Code 配置：Andrej Karpathy 的 CLAUDE.md，134+k star了！](../raw/articles/Claude%20Code/最佳%20Claude%20Code%20配置：Andrej%20Karpathy%20的%20CLAUDE.md，134+k%20star了！.md) — ChallengeHub，2026.05，Karpathy 推文→Forrest Chang 仓库→11 万 Star 现象拆解

### ECC 资料
1 篇 ECC 介绍文章，位于 `raw/articles/`：
- 132页！Anthropic黑客松获胜者everything-claude-code完整教程来了！— 灰尘，2026.05，ECC 项目介绍 + 132 页 PDF 教程

### OpenClaw 资料
2 篇 OpenClaw vs Hermes 深度对比文章 + 1 份橙皮书 PDF（已转 Markdown），位于 `raw/articles/OpenClaw/`：
- 【万字】OpenClaw vs Hermes：一文深入拆解两大 Agent 框架 — 叶小钗，2026.04
- OpenClaw vs Hermes：拆解 Hermes Agent 五层架构 — 叶小钗，2026.04
- OpenClaw橙皮书-从入门到精通-v1.4.0 — 花叔，2026.03，涵盖架构/部署/渠道/Skills/模型/安全

### Hemmers 资料
20 篇 Hermes Agent 系列文章 + 1 个 HTML 页面 + 11 个 WebP 图片，位于 `raw/articles/Hemmers/`：
- Hermes Agent v0.13.0 来了：137K 星的开源 AI Agent 又进化了 — 朗朗晴空，2026.05，Kanban/跨轮目标/视频理解/语音克隆
- Hermes Agent v1.3 从入门到精通：开口就能用 — 小飞哥，2026.04，自然语言操作范式
- Hermes Agent 从入门到精通 V1.2 — 2026.05，安装/模型/平台/v0.9.0 新功能
- Hermes Agent 多角色团队搭建指南 — 2026.05，Profile 隔离机制 + Kanban 入门
- Hermes 装完以后先写这 2 个文件：SOUL.md 和 AGENTS.md — 1Percent，2026.05，附可复制模板
- Hermes(爱马仕)：如何搭建多 Agent 任务编排系统 — 远飞哥，2026.05，Kanban 四角色架构
- Hermes(爱马仕)：搭建个人知识管理 RAG 检索 — 远飞哥，2026.04，Ollama+ChromaDB 方案
- 使用 Hermes 开发多智能体的实践及流程 — Dr.Xiang，2026.05，双 Agent 协同 12 分钟完成爬虫
- Hermes Agent 从入门到实战 — 量子智元，2026.05，学习循环/三层记忆/Skill 自改进
- 我把 Hermes Agent 接进 Obsidian 后 — 超级猛，2026.05，内容中台 Source→Draft→Published
- 手把手：给 Hermes Agent 装一个六面板控制中心 — 2026.05，Workspace 安装配置
- 从 Claude Code 看 Harness Engineering — 澄旭，2026.05，编排工程方法论
- 我为什么推荐你安装 Hermes Agent — Jeffrey Hu，2026.04，硬件选择/部署实操
- [Hermes Agent 架构详解](../raw/articles/Hemmers/Hermes%20Agent%20架构详解.md) — AI灰鲸，2026.05，Agent Loop/可中断API/Prompt Cache(降费75%)/双层压缩系统
- [从零到精通：Hermes Agent 完整上手指南（2026版）](../raw/articles/Hemmers/从零到精通：Hermes%20Agent%20完整上手指南（2026版），Github%209万星的底层解析：记忆、技能、GEPA.md) — AI潮局，2026.05，SOUL身份层/三层记忆/技能自进化/GEPA模型

### Obsidian 资料
15 篇 Obsidian 知识管理中文文章，位于 `raw/articles/Obsidian/`：入门与指南(5) / AI 集成(5) / 信息收集(3) / 生态与替代品(2)
- 万字长文：个人如何用 Obsidian 搭建本地知识库 — 南哥，2026.04，全方位指南
- Claude Code+Obsidian：让 AI 当你的知识管家 — 强西，2026.05
- 别再手动整理笔记了！Claude+Obsidian 打造永不遗忘的 AI 知识系统 — Harry，2026.05
- Obsidian CLI 基础使用教程 AI 化知识管理全过程 — ShikiLab，2026.03
- 从崩溃到兴奋，5 小时把 DeepSeek V4 接入 Obsidian 实现自动化 — 小观，2026.04
- 新手别折腾了：Obsidian + DeepSeek 组合便宜又能直接用 — 西湖太极熊，2026.05
- 手把手实践 Karpathy 爆红的 AI 知识库 — 多颗糖，2026.04
- 推荐 obsidian-wiki（14+ Agent 共享 Wiki Skills） — 灵境星匠，2026.05
- 公开我的 Obsidian LLM Wiki 的脚本 — V二君，2026.04
- 建立 Obsidian 个人知识库的正确驾驶方式 — isEris，2026.04
- 我简直爱死这个 Obsidian 插件了：Web Clipper 打通浏览器 — 蒋先森，2026.03
- 微信文章 5 秒保存到 Obsidian 知识库 — Kevin，2026.04
- 微信文章一键入库 Obsidian — 枫林，2026.04
- Tolaria：结合 Obsidian 和 Notion 优势的开源笔记新品 — 火箭君，2026.04
- 一个装上就不想换的 Obsidian 主题：Baseline — 毕小烦，2026.04
- [Obsidian 入门45：对自己好一点，给 Obsidian 建个个人主页](../raw/articles/Obsidian/Obsidian%20入门45：对自己好一点，给%20Obsidian%20建个个人主页.md) — 林大友，2026.05，HomePage 插件 + Dataview 三区块仪表盘
- [我的 Obsidian 新主页，让我更期待每日打开记录](../raw/articles/Obsidian/我的Obsidian新主页，让我更期待每日打开记录.md) — 西湖太极熊，2026.05，从"功能中心"到"生活空间"的主页哲学
- [用 Markdown 做笔记，用 HTML 做呈现](../raw/articles/Obsidian/用%20Markdown%20做笔记，用%20HTML%20做呈现.md) — 唐巧，2026.05，MD+HTML 双格式 = AI 友好 + 人类友好

### Obsidian 教程资料
8 篇 Obsidian 系统教程（含大纲和 6 章正文 + 总教程），位于 `raw/articles/Obsidian/`：
- Obsidain使用教程大纲 — 全系列导航与教学规划
- 01-基础入门 — 安装/界面/设置/笔记管理/Markdown 语法
- 02-核心功能与方法论 — 双向链接/知识图谱/Canvas/PARA/MOC/原子笔记
- 03-Git云同步 — Git+GitHub 电脑端+手机端完整同步教程
- 04-第三方插件 — Custom Attachment Location/Enhancing Export/Dataview/Templater/Calendar/QuickAdd
- 05-AI接入 — Gemini CLI 配置与智能化工作流
- 06-附录 — 插件清单/工具清单/快捷键速查/FAQs

### Codex 资料
13 篇 Codex 中文文章，位于 `raw/articles/Codex/`：
- OpenAI Codex 完全方法论：6 个阶段，从装上到吃透 — 莲花明，2026.05，六阶段方法论/沙箱系统/AGENTS.md/TDD/云端/与CC混用
- OpenAI Codex 完整教程 2026：100 分钟 — 邵猛，2026.05，Riley Brown 视频拆解：产品定位/核心机制/六项目实战
- Codex (APP) 保姆级全攻略 — 技术爬爬虾，2026.04，12 章完整教程：安装→沙箱→记忆→插件→Skills→MCP→部署→电脑自动化
- 从0到1带你速通Codex — 数字生命卡兹克，2026.05，最新教程：安装/配置/Skills/MCP/实战网页+App
- DeepSeek 模型接入 Codex — 鲲鹏论AI，2026.05，mimo2codex+CC Switch 本地转发方案
- [Codex App 从0到1完整入门教程](../raw/articles/Codex/Codex%20App%20从0到1完整入门教程：把这个超级APP的每一个细节抽丝剥茧讲清楚.md) — 逸尘，2026.05，小白视角：界面三栏详解/设置逐项解释/项目vs对话/插件+Skills+MCP+自动化概念
- 1.1万字 Codex保姆级教程 — nobody，2026.05，Windows 新手：项目文件夹配置/规则/插件/Skills
- Codex 从入门到精通 — AI4ALL，2026.05，六步方法论：建目录→拆chat→专注产物→Skill→Automation
- [Codex 新手入门教程，看这篇就够了](../raw/articles/Codex/Codex%20新手入门教程，看这篇就够了.md) — AI评测老李，2026.05，开通路径（Plus/Pro/API）/Computer Use 体验/额度管理
- Codex零基础保姆式安装教程 — 欧工666，2026.05，四大入口对比/Windows安装/Git配置
- [《Codex从0到1完整入门教程》下载安装到看懂界面](../raw/articles/Codex/《Codex从0到1完整入门教程》下载安装到看懂界面，一篇讲清楚。.md) — 水哥，2026.05，微信指数 508 万+/下载→登录→界面详解
- [Cursor、Claude Code、Codex、Copilot：AI 编程工具进入"四国杀"](../raw/articles/Codex/Cursor、Claude%20Code、Codex、Copilot：AI%20编程工具进入"四国杀".md) — 鲁大猿，2026.05，入口之争：从IDE到Agent/四工具定位对比
- [国内可用！Codex 一步步安装配置指南](../raw/articles/Codex/国内可用！Codex%20一步步安装配置指南.md) — 海鱼星，2026.05，Windows 离线下载（rg-adguard）/msix→rar/中转 API 配置

### 知识库技术资料
11 篇知识库技术中文文章，位于 `raw/articles/知识库/`：
- [AI 知识库技术演进拆解：从 RAG 到 NotebookLM，再到 LLM Wiki](../raw/articles/知识库/AI%20知识库技术演进拆解：从%20RAG%20到%20NotebookLM，再到%20LLM%20Wiki.md) — 叶小钗，2026.05，NotebookLM 七层技术架构拆解/RAG 产品化/三阶段演进
- [一文看懂三种 RAG 架构：Classic RAG、Graph RAG 与 Agentic RAG](../raw/articles/知识库/一文看懂三种%20RAG%20架构：Classic%20RAG、Graph%20RAG%20与%20Agentic%20RAG.md) — 兔兔AGI，2026.05，三种架构对比+选型指南
- [一文看懂三种 RAG 架构（补充版）](../raw/articles/知识库/一文看懂三种%20RAG%20架构：Classic%20RAG、Graph%20RAG%20与%20Agentic%20RAG%201.md) — 兔兔AGI，2026.05，以问题形状为纲的深度解读
- [RAG 优化 20 法：从"搜得到"到"答得好"](../raw/articles/知识库/RAG%20优化%2020%20法：从"搜得到"到"答得好"%201.md) — 水果派哲思，2026.04，五阶段优化管线/场景组合推荐
- [RAG-向量数据库 Milvus](../raw/articles/知识库/RAG-向量数据库Milvus.md) — idong，2026.04，六大索引类型/相似度量/L2/IP/COSINE
- [RAG-搞懂嵌入向量的生成](../raw/articles/知识库/RAG-搞懂嵌入向量的生成.md) — idong，2026.05，Dense/Sparse/Multi-Vector/BGE-M3
- [RAG-查询前处理](../raw/articles/知识库/RAG-查询前处理.md) — idong，2026.05，查询改写/拆分/HyDE/路由四种预处理
- [RAG 我懂你：从架构到知识库构建](../raw/articles/知识库/RAG我懂你：从架构到知识库构建.md) — 二进制左右，2026.05，四象限微调策略/知识库构建管线/评估体系/优化策略
- [知识图谱入门：从一张关系网到 AI 知识底座](../raw/articles/知识库/知识图谱入门：从一张关系网到%20AI%20知识底座.md) — 水果派哲思，2026.04，三元组/本体/构建流程/GraphRAG
- [开源 AI 编程可查询的软件工程知识图谱：Graphify 完整上手攻略](../raw/articles/知识库/开源%20AI%20编程可查询的软件工程知识图谱：Graphify%20完整上手攻略.md) — 兔兔AGI，2026.05，AST解析/多模态图谱/MCP集成
- [开源一款零服务器代码知识图谱引擎：GitNexus](../raw/articles/知识库/开源一款零服务器代码知识图谱引擎，支持多语言解析、Graph%20RAG%20问答、AI%20代理集成的代码分析平台.md) — 刘哥聊技术，2026.05，WASM浏览器端/14语言/16 MCP工具/Graph RAG

### Home Assistant 资料
2 篇 Home Assistant 中文文章，位于 `raw/articles/Home Assistant/`：
- Hermes Agent + Home Assistant：用自然语言控制你的整个家 — AI赋能说，2026.05，Token 配置/五大场景/Cron/Telegram/门铃对讲案例
- 真正全屋智能HomeAssistant：跨平台接入群晖NAS——整合米家、海尔、美的、海信、Homekit — 温泉，2026.05，Docker部署/HACS/五品牌集成/花生壳远程访问

### OPC / AI 创业资料
2 篇 OPC 中文文章，位于 `raw/articles/OPC/`：
- 6种OPC商业模式 — 小麦，2026.05，OPC定义（系统vs时间）/六大商业模式/中美对比/Pieter Levels案例/真实痛点
- Anthropic 2026《创始人手册：打造AI原生初创公司》精读长文 — AI潮局，2026.05，三大AI杠杆/四阶段方法论/创始人=指挥家/三大新坑

### AI Agent 编排框架资料
1 篇 AI Agent 编排框架文章，位于 `raw/articles/AI Agent/`：
- [AI Agent 编排框架横向对比：LangChain vs LangGraph vs Spring AI Alibaba Graph](../raw/articles/AI%20Agent/AI%20Agent%20编排框架横向对比：LangChain%20vs%20LangGraph%20vs%20Spring%20AI%20Alibaba%20Graph.md) — 修行者华军，2026.05，执行模型/Agent 模式/企业特性/开发体验四维对比

### Gemini / 学术写作资料
1 篇 Gemini 学术写作文章，位于 `raw/articles/`：
- [Gemini 3.5+六个 Skill，高质量论文初稿一气呵成！](../raw/articles/Gemini%203.5+六个skill，高质量论文初稿一气呵成！.md) — 七哥，2026.05，六个 Skill 覆盖定框架→引言→文献综述→方法→结果分析→结论

### VibeCoding 实战资料
1 篇 VibeCoding 实战文章，位于 `raw/articles/VibeCoding/`：
- VibeCoding——从0到1开发微信小程序 — 子言sugar，2026.05，Figma→Trae→HBuilderX→微信开发者工具 完整工具链
