# 操作日志

## [2026-05-09] init | 知识库初始化
- 创建知识库目录结构
- 初始化 schema、索引、日志

## [2026-05-09] ingest | 批量收录 24 篇 Claude Code 文章
- **摘要**：一次性处理 `raw/articles/Claude Code/` 全部 24 篇文章，按 介绍→安装→入门→进阶 四层结构组织
- **新增实体页（6个）**：
  - wiki/entities/claude-code.md — Claude Code 本体
  - wiki/entities/mcp.md — Model Context Protocol
  - wiki/entities/superpowers.md — Superpowers 框架
  - wiki/entities/gstack.md — gstack 工具链
  - wiki/entities/cc-switch.md — CC Switch 配置管理工具
  - wiki/entities/claude-code-router.md — Claude Code Router 路由层
- **新增专题页（9个）**：
  - wiki/topics/claude-code-introduction.md — 介绍篇
  - wiki/topics/claude-code-installation.md — 安装与配置篇
  - wiki/topics/claude-code-getting-started.md — 命令与日常使用篇
  - wiki/topics/claude-code-mcp-ecosystem.md — MCP 生态系统
  - wiki/topics/claude-code-skills-ecosystem.md — Skills 生态系统
  - wiki/topics/claude-code-superpowers-workflow.md — Superpowers+gstack 工作流
  - wiki/topics/claude-code-design-integration.md — 设计集成与前端开发
  - wiki/topics/claude-code-tools.md — 辅助工具
  - wiki/topics/claude-code-prompt-engineering.md — 提示词工程
- **更新页面**：wiki/overview.md（填充全局概览）、wiki/index.md（更新完整索引）
- 知识领域覆盖：安装配置、命令体系、MCP 生态、Skills 生态、Superpowers 工作流、设计集成、提示词工程

## [2026-05-09] create | AI Coding 学习路线与工具生态
- **摘要**：构建 AI Coding 完整学习体系，包含发展历程、核心概念、工具对比、实战教程
- **新增实体页（7个）**：
  - wiki/entities/vibe-coding.md — Vibe Coding 概念
  - wiki/entities/openclaw.md — OpenClaw 个人 AI Agent
  - wiki/entities/hermes-agent.md — Hermes Agent 自进化 Agent
  - wiki/entities/cursor.md — Cursor AI IDE
  - wiki/entities/codex.md — OpenAI Codex 云端 Agent
  - wiki/entities/trae.md — Trae 国产 AI IDE
- **新增专题页（8个）**：
  - wiki/topics/ai-coding-learning-plan.md — AI Coding 学习路线总页
  - wiki/topics/ai-coding-history.md — 发展史（2024-2026）
  - wiki/topics/ai-coding-concepts.md — 核心概念解析（Vibe Coding/Agent/MCP/Skills/Claw/Hermes）
  - wiki/topics/ai-coding-tools-comparison.md — 六大工具全景对比
  - wiki/topics/trae-guide.md — Trae 完整教程（安装→入门→进阶）
  - wiki/topics/cursor-guide.md — Cursor 完整教程
  - wiki/topics/codex-guide.md — Codex 完整教程
  - wiki/topics/openclaw-guide.md — OpenClaw 完整教程（安装→消息平台配置→Skills）
  - wiki/topics/hermes-agent-guide.md — Hermes Agent 完整教程（自进化系统→多平台网关）
- **更新页面**：wiki/index.md（新增 AI Coding 学习路线和工具教程板块）

## [2026-05-09] ingest | OpenClaw vs Hermes 深度对比系列（2 篇文章 + 1 份橙皮书）
- **摘要**：处理 `raw/articles/OpenClaw/` 下 3 份资料，构建 Agent 框架对比知识体系
- **新增对比页（2 个）**：
  - wiki/comparisons/openclaw-vs-hermes.md — 九维度全面对比（设计哲学/学习闭环/记忆/压缩/安全/执行环境/子Agent/国内生态/选型）
  - wiki/comparisons/agent-frameworks-moc.md — Agent 框架对比索引（MOC）
- **新增专题页（1 个）**：
  - wiki/topics/hermes-architecture-deep-dive.md — 五层架构深度拆解（适配器→网关→主循环→系统提示→自修复→自进化）
- **新增概念页（3 个）**：
  - wiki/concepts/agent-self-evolution.md — Agent 自进化（Prompt 驱动 vs 后台流水线）
  - wiki/concepts/agent-memory-systems.md — Agent 记忆系统设计（三层记忆 vs 单插件）
  - wiki/concepts/agent-context-compression.md — Agent 上下文压缩（压中间 vs 压头部）
- **更新页面**：
  - wiki/entities/openclaw.md — 补充设计哲学、架构特点、安全模型
  - wiki/entities/hermes-agent.md — 补充五层架构、自进化机制、错误恢复
  - wiki/overview.md — 新增 Agent 框架对比知识体系板块
  - wiki/index.md — 新增对比/概念/专题板块条目
- **PDF 转换**：OpenClaw橙皮书-从入门到精通-v1.4.0.pdf → raw/articles/OpenClaw/OpenClaw橙皮书.md（2722 行）

## [2026-05-09] ingest | 批量收录 18 篇 Hemmers Hermes Agent 系列文章
- **摘要**：处理 `raw/articles/Hemmers/` 下全部 18 篇 Markdown 文章，覆盖 Hermes Agent v0.9.0/v0.10.0/v0.13.0 版本更新、多 Agent 团队搭建、SOUL.md/AGENTS.md 配置、Workspace Web 控制中心、Obsidian 集成、RAG 知识管理、Harness Engineering 方法论
- **新增专题页（5 个）**：
  - wiki/topics/hermes-multi-agent.md — 多 Agent 团队搭建指南（Profile 隔离 + Kanban 四角色）
  - wiki/topics/hermes-configuration.md — SOUL.md & AGENTS.md 配置指南（附可复制模板）
  - wiki/topics/hermes-workspace-setup.md — Hermes Workspace 六面板 Web 控制中心
  - wiki/topics/hermes-obsidian-integration.md — Obsidian + Hermes 知识库集成（Source→Draft→Published）
  - wiki/topics/hermes-rag-setup.md — 个人知识管理 RAG 检索（Ollama + ChromaDB）
- **新增概念页（1 个）**：
  - wiki/concepts/harness-engineering.md — Harness Engineering 方法论（Agent = Model + Harness，生成-评估分离）
- **更新页面**：
  - wiki/entities/hermes-agent.md — Stars 5.2万→13.7万、新增 v0.12.0/v0.13.0 版本历史、新增多 Agent/视频/语音特性、补充 Hemmers 来源
  - wiki/topics/hermes-agent-guide.md — 新增 SOUL.md & AGENTS.md 配置、Workspace 安装、多 Agent Profile 章节、Android Termux 支持、版本号更新
  - wiki/overview.md — 新增 Hermes 深度专题架构图、更新文章计数（27→45）、更新页面计数
  - wiki/index.md — 新增 Hermes 深度专题板块、新增 Harness Engineering 概念条目、更新 Stars 数据、新增 Hemmers 资料索引
- **清理操作**：
  - `Hermes Agent 从入门到精通 V1.2...1.md` → 加 `_dup` 后缀（与带 frontmatter 版本重复）
  - HTML 文件 `官方出的HermesAgent大全.html` 为微信图片模式，内容无法提取为文本，已转为 Markdown 骨架
  - 11 个 .webp 文件未被任何文章引用（所有文章使用外部 `mmbiz.qpic.cn` URL），保留不动

## [2026-05-09] ingest | 批量收录 15 篇 Obsidian 知识管理文章
- **摘要**：处理 `raw/articles/Obsidian/` 下全部 15 篇文章，覆盖入门指南、AI 集成、信息收集、LLM Wiki 实践、工具对比五大板块
- **新增实体页（2个）**：
  - wiki/entities/obsidian.md — Obsidian 本体（7 人团队，3.5 亿美元估值，2700+ 插件）
  - wiki/entities/tolaria.md — Tolaria 新兴开源 PKM 工具
- **新增概念页（2个）**：
  - wiki/concepts/second-brain.md — 第二大脑（数字认知基础设施）
  - wiki/concepts/file-over-app.md — File over App（文件比应用更长寿的软件哲学）
- **新增专题页（4个）**：
  - wiki/topics/obsidian-getting-started.md — 入门指南（PARA/Zettelkasten/MOC 方法论 + 20 插件 + 从零搭建实操）
  - wiki/topics/obsidian-ai-integration.md — AI 集成方案（5 种路线对比：Claude Code CLI / Copilot+DeepSeek / Claudian / Ollama / Web Clipper）
  - wiki/topics/obsidian-capture-workflow.md — 信息收集工作流（Web Clipper / 微信同步 / Messager + 五步知识内化法）
  - wiki/topics/obsidian-llm-wiki-practice.md — LLM Wiki 实践（7 种开源实现 + Python 蒸馏脚本 + LLM Wiki v2 扩展）
- **新增对比页（1个）**：
  - wiki/comparisons/obsidian-notion-tolaria.md — Obsidian vs Notion vs Tolaria 三维全面对比
- **更新页面**：wiki/overview.md（新增 Obsidian 知识体系板块）、wiki/index.md（新增概念/实体/专题/对比/原始资料板块）
- 知识领域覆盖：知识管理方法论（PARA/Zettelkasten/MOC）、Obsidian 插件生态（20 个核心插件）、AI 集成路线（Claude Code/DeepSeek/Ollama）、信息收集闭环（Web Clipper/微信同步）、LLM Wiki 生态（7 种开源实现）、工具对比（Obsidian vs Notion vs Tolaria）

## [2026-05-09] ingest | 收录 8 篇 Obsidian 系统教程（6 章 + 大纲 + 总教程）
- **摘要**：处理 `raw/articles/Obsidian/` 下新增的 8 个教程文件，这是上一批 15 篇公众号文章的补充——一本完整结构化的 Obsidian 教科书
- **新增专题页（2个）**：
  - wiki/topics/obsidian-git-sync.md — Git 云同步完整指南（GitHub 私有仓库 + Git 插件自动同步 + 手机端 Token 配置 + 多重备份策略）
  - wiki/topics/obsidian-plugins-advanced.md — 插件进阶指南（Custom Attachment Location / Enhancing Export / Dataview / Templater / Calendar / QuickAdd 深度配置）
- **更新页面**：
  - wiki/topics/obsidian-ai-integration.md — 新增方案六：Gemini CLI（Google 出品，安装/配置/智能选题/批量处理/模仿文风），方案总数 5→6
  - wiki/overview.md — 新增插件进阶和 Git 云同步板块、更新文章计数（60→68）、更新专题页面计数（20→22）
  - wiki/index.md — 新增 2 个专题页条目、新增 Obsidian 教程资料板块
- 知识领域覆盖：Git 多端同步（电脑+手机完整配置）、图片标准化管理、文档多格式导出、动态模板系统、快速捕获工作流、Gemini CLI 智能化工作流

## [2026-05-09] ingest | 收录 3 篇 Claude Code 新增资料（2 篇实战技巧 .docx + 1 本精通指南 PDF）
- **摘要**：处理 `raw/articles/Claude Code/` 下新增的 3 个文件（2 篇 .docx + 1 本 10 章 PDF），覆盖高频实战技巧（乐进）和从入门到精通完整指南（花叔 v2.0.0）
- **文件转换**：
  - 一、Claude Code：从入门到进阶的高频实战技巧(一).docx → textutil 转 text（68 行）
  - 二、Claude Code：从入门到进阶的高频实战技巧(二).docx → textutil 转 text（132 行）
  - Claude Code从入门到精通-v2.0.0.pdf → pdftotext 转 text（3330 行，10 章 + 附录）
- **新增专题页（2个）**：
  - wiki/topics/claude-code-practical-techniques.md — 高频实战技巧（/init + /memory 项目记忆系统、会话管理四件套 compact/clear/resume/export、模型/上下文/成本/状态四项监控）
  - wiki/topics/claude-code-mastery-guide.md — 从入门到精通指南（三层模型 Prompt→Context→Harness、CLAUDE.md 深度实践：护栏不是手册 + 层级结构 + 迭代飞轮、Auto 模式 AI 分类器、Computer Use/Voice Mode、Agent Teams/Subagents、六反模式、TAOR 循环架构、产品开发实战教训）
- **更新页面**：
  - wiki/entities/claude-code.md — 新增 Computer Use、Voice Mode、Agent Teams、Auto 模式、三层能力模型、CLAUDE.md 层级结构、Web 模式
  - wiki/overview.md — 新增实战技巧和精通指南板块、更新文章计数（68→71）、更新专题页面计数（22→24）
  - wiki/index.md — 新增 2 个专题页条目、更新 Claude Code 资料索引（24→27）
- 知识领域覆盖：项目记忆系统、会话管理哲学、三层能力模型、CLAUDE.md 深度最佳实践、Computer Use 与 GUI 操作、Voice Mode 语音交互、Agent Teams 多智能体协作、Auto 模式安全机制、六反模式、TAOR Agent 循环、产品开发工作流
