# 操作日志

## [2026-05-29] output | 创建 OPC 一人公司教程

- **新增文件**：
  - 教程/OPC/OPC 一人公司学习指南.md（主索引/总纲，含需求匹配表和快速导航）
  - 教程/OPC/01-OPC概述与核心理念.md（OPC 定义/自由职业 vs OPC/三大驱动力/底层逻辑）
  - 教程/OPC/02-六大商业模式详解.md（六种模式逐一详解/案例/踩坑提醒/选型指南）
  - 教程/OPC/03-从零启动OPC.md（四阶段方法论：构思→MVP→发布→扩展/中美对比/启动清单）
  - 教程/OPC/04-AI工具链与效率杠杆.md（三大 AI 杠杆/工具选型/各模式工具组合/成本估算）
  - 教程/OPC/05-风险管理与长期发展.md（四大痛点/甜蜜区间突破/终极问题/三种结局）
- **更新页面**：
  - Wiki/wiki/index.md（AI 原生创业专题区 + 输出产物区新增教程条目）
- **摘要**：基于已有 OPC 概念页面、Anthropic 创始人手册专题和原始资料（6 种 OPC 商业模式），创建了一份 5 章完整 OPC 教程。覆盖从概念理解 → 商业模式选择 → 四阶段启动方法论 → AI 工具链推荐 → 风险管理的全流程。延续了现有教程风格（主索引 + 章节分离），附带角色化需求匹配和快速导航。

## [2026-05-29] output | 创建智能家居教程

- **新增文件**：
  - 教程/智能家居/智能家居学习指南.md（主索引/总纲，含学习路线图和角色推荐）
  - 教程/智能家居/01-智能家居概览.md（品牌壁垒困境 → 全屋智能三步进化）
  - 教程/智能家居/02-Home-Assistant基础.md（核心概念/架构/部署方式对比）
  - 教程/智能家居/03-安装与部署.md（群晖 NAS Docker 部署 + HACS 离线安装）
  - 教程/智能家居/04-品牌集成实战.md（米家/海尔/美的/海信/HomeKit 五大品牌逐攻略）
  - 教程/智能家居/05-AI语音控制与自动化.md（Hermes + HA 五大场景 + 记忆系统 + 门铃案例）
  - 教程/智能家居/06-远程访问与进阶.md（花生壳穿透/App配置/HA原生自动化/踩坑清单）
- **更新页面**：
  - Wiki/wiki/index.md（新增教程条目，智能家居专题区 + 输出产物区）
- **摘要**：基于已有 Home Assistant 实体页面和 Hermes + HA 集成专题，结合两篇原始资料，创建了一份 6 章完整智能家居教程。覆盖从概念理解 → Docker 部署 → 五大品牌集成 → AI 语音控制 → 远程访问的全流程，附带角色化学习路线图和完整踩坑清单。

## [2026-05-28] ingest | Gemini 学术论文写作（1 篇）
- **新增页面**：
  - Wiki/wiki/topics/gemini-academic-writing.md（Gemini 3.5 + 六个 Skill：定框架→引言→文献综述→方法→结果分析→结论，含 Skill 设计模式）
- **更新页面**：
  - Wiki/wiki/overview.md（文章数 105→106，专题 31→32）
  - Wiki/wiki/index.md（新增专题条目 1 个 + Gemini 资料 1 条）
- **摘要**：处理 Gemini 学术写作 1 篇。核心产出：将学术论文初稿六步流程封装为六个 Skill，每个 Skill 含 Goals/Constraints/Skills/Workflows 四维结构。关联知识库已有 Skills 生态体系。

## [2026-05-28] ingest | Hemmers 补充 3 篇（架构详解/完整上手指南/安装推荐）
- **更新页面**：
  - Wiki/wiki/topics/hermes-architecture-deep-dive.md（新增 1 篇 source：可中断 API/Prompt Cache 降费 75%/双层压缩详解）
  - Wiki/wiki/topics/hermes-agent-guide.md（新增 2 篇 sources：GEPA 模型/三层记忆详解/硬件选型指南）
  - Wiki/wiki/overview.md（文章数 103→105，Hemmers 18→20）
  - Wiki/wiki/index.md（Hemmers 资料 18→20 篇完整索引，新增 架构详解/从零到精通 条目）
- **摘要**：Hemmers 3 篇均为现有页面的补充内容。核心增量：架构详解补充了 Agent Loop 可中断机制、Fallback 链、Prompt Cache 策略；从零到精通补充了 GEPA（Goal-Execute-Plan-Act）模型和技能自进化机制；安装推荐补充了硬件选型指南（云/迷你主机/旧电脑）。

## [2026-05-28] ingest | Codex 补充 5 篇（入门教程 + 工具对比 + 国内安装）
- **更新页面**：
  - Wiki/wiki/topics/codex-guide.md（新增 3 篇 sources：小白视角界面详解/新手入门路径/下载安装到看懂界面）
  - Wiki/wiki/topics/codex-deepseek-integration.md（新增 1 篇 source + Windows 离线下载方案）
  - Wiki/wiki/topics/ai-coding-tools-comparison.md（新增 1 篇 source + "从 IDE 到 Agent：入口之争" 章节）
  - Wiki/wiki/overview.md（文章数 102→103，Codex 12→13）
  - Wiki/wiki/index.md（Codex 资料 12→13 篇完整索引，新增 国内可用 条目）
- **摘要**：Codex 5 篇均为现有页面的补充内容，不新增独立页面。核心增量：(1) codex-guide 新增 3 个小白入门视角的 sources；(2) codex-deepseek-integration 新增 Windows 离线下载+国内中转 API 方案；(3) ai-coding-tools-comparison 新增「入口之争」视角——四工具从 IDE 到 Agent 的竞争格局。

## [2026-05-28] ingest | AI Agent 编排框架横向对比（1 篇）
- **新增页面**：
  - Wiki/wiki/comparisons/agent-orchestration-frameworks.md（LangChain vs LangGraph vs Spring AI Alibaba Graph：执行模型/Agent 模式/企业特性/开发体验四维对比 + 选型公式）
- **更新页面**：
  - Wiki/wiki/comparisons/agent-frameworks-moc.md（新增编排框架对比入口）
  - Wiki/wiki/overview.md（Agent 框架对比体系新增编排框架分支；文章数 101→102；对比页 2→3）
  - Wiki/wiki/index.md（新增对比条目 1 个 + AI Agent 资料 1 条）
- **摘要**：处理 AI Agent 编排框架对比 1 篇。核心产出：三大编排框架（LangChain/LangGraph/Spring AI Alibaba Graph）横向对比页，覆盖执行模型、Agent 模式、企业级特性、开发体验四个维度，提炼出「技术栈 × 任务复杂度 × 企业级需求」选型公式。

## [2026-05-28] ingest | 知识库 7 篇（RAG 架构/优化/知识图谱）
- **新增页面**：
  - Wiki/wiki/topics/rag-optimization-techniques.md（RAG 优化 20 法：五阶段管线 / Milvus 索引选型 / 嵌入模型选择 / 场景组合推荐）
  - Wiki/wiki/concepts/knowledge-graph.md（知识图谱：三元组/本体/构建流程/GraphRAG/应用场景）
- **更新页面**：
  - Wiki/wiki/concepts/rag-architectures.md（新增微调策略四象限/知识库构建管线/RAG 系统评估/优化策略；新增 sources 2 篇；新增 related 交叉引用）
  - Wiki/wiki/overview.md（知识库技术体系大幅扩展为四分支；文章数 94→101；专题 30→31；概念 14→15）
  - Wiki/wiki/index.md（新增概念条目 1 个 + 专题条目 1 个；知识库技术资料 4→11 篇完整索引）
- **摘要**：完成知识库目录全部 7 篇未处理文章。核心产出：RAG 优化 20 法专题页（合并 Milvus/Embedding/查询前处理/RAG优化 4 篇文章）+ 知识图谱概念页 + rag-architectures 新增微调策略、评估体系和优化策略三个理论维度。知识库技术从「4 篇资料 + 架构对比」升级为「11 篇资料 + 架构/优化/图谱/代码图谱四分支」完整体系。

## [2026-05-28] ingest | 批量收录 Claude Code 增量（4篇）+ Obsidian 增量（3篇）
- **新增页面**：
  - Wiki/wiki/topics/claude-code-skills-recommendations.md（Skills 分级推荐：渐进式披露机制/五级梯队 11 个 Skill/8 种角色定制方案/5 个常见坑）
- **更新页面**：
  - Wiki/wiki/topics/claude-md-12-rules.md（新增 2 篇 sources：Karpathy 现象文章 + 12 条规则中英对照）
  - Wiki/wiki/entities/codex.md（新增 CC vs Codex 用户类型框架：许愿型/现场型/派单型/调度型）
  - Wiki/wiki/topics/claude-code-skills-ecosystem.md（新增 Skills 分级推荐交叉引用）
  - Wiki/wiki/topics/obsidian-plugins-advanced.md（新增插件七：HomePage 个人主页 + 三大经典 Dataview 模块）
  - Wiki/wiki/topics/obsidian-getting-started.md（新增"搭建你的个人主页"章节：功能中心型 vs 生活空间型两种哲学）
  - Wiki/wiki/topics/obsidian-ai-integration.md（新增方案七：Markdown + HTML 双格式范式）
  - Wiki/wiki/overview.md（Skills 生态条目更新 + 专题页面 29→30 + 知识领域更新）
  - Wiki/wiki/index.md（新增专题条目 1 个 + CLAUDE.md 资料 2 条 + CC 资料 2 条 + Obsidian 资料 3 条）
- **未新增**（已在之前批次处理，内容已完整覆盖）：
  - Claude 官方客户端 + DeepSeek-V4（installation.md 第 73-78 行已覆盖 3P 模式）
  - Claude与FigJam打通（design-integration.md 第 42-47 行已覆盖 FigJam Connector）
- **摘要**：处理 Claude Code 增量 4 篇 + Obsidian 增量 3 篇共 7 篇新增资料。核心产出：Skills 分级推荐专题页填补了"该装什么 Skill"的实操空白（五级梯队+8角色），CC vs Codex 用户类型框架补充了从"工具特性对比"到"你在什么位置"的新视角，Obsidian 主页设计（HomePage 插件+两种哲学）和 MD+HTML 双格式丰富了知识管理工作流。另有 2 篇 Claude Code 文章确认已在之前批次处理完毕。

## [2026-05-28] ingest | 批量收录 Home Assistant（2篇）+ OPC（2篇）+ VibeCoding（1篇）
- **新增页面**：
  - Wiki/wiki/entities/home-assistant.md（Home Assistant 实体页：开源跨品牌智能家居中控/Docker 群晖部署/HACS/五品牌集成方案/远程访问）
  - Wiki/wiki/topics/hermes-home-assistant-integration.md（Hermes + HA 集成专题：Token 配置/五大场景实战/记忆系统/门铃对讲社区案例）
  - Wiki/wiki/concepts/opc-one-person-company.md（OPC 概念页：定义（系统vs时间）/六种商业模式/中美对比/真实痛点）
  - Wiki/wiki/topics/ai-native-startup-playbook.md（Anthropic 创始人手册专题：三大 AI 杠杆/创业四阶段/创始人=指挥家/三大新坑）
- **更新页面**：
  - Wiki/wiki/concepts/vibe-coding.md（新增实践案例章节：Figma→Trae→HBuilderX→微信开发者工具完整工具链；更新 frontmatter 增加 source 和 related；新增 entities/trae 交叉引用）
  - Wiki/wiki/overview.md（新增智能家居知识体系 + AI 原生创业知识体系两大板块；统计数据更新 89→94篇/27→29专题/13→14概念/13→15实体）
  - Wiki/wiki/index.md（新增概念条目1个 + 实体条目1个 + 专题条目2个；新增 Home Assistant 2篇/OPC 2篇/VibeCoding 1篇 原始资料索引）
- **教程同步**：
  - 无需更新（本次新增内容涉及智能家居和 AI 创业两个全新领域，现有教程聚焦 AI Coding 主题，暂无相关章节需要同步）
- **摘要**：处理 Home Assistant（2篇）+ OPC（2篇）+ VibeCoding（1篇）共 5 篇新增资料。新增智能家居领域的两个页面（Home Assistant 实体 + Hermes 集成），覆盖了群晖 NAS Docker 部署、五品牌集成方案、自然语言控制五大场景等完整内容。新增 AI 原生创业领域的两个页面（OPC 概念 + Anthropic 创始人手册），覆盖了六种商业模式、中美对比、三大 AI 杠杆、创业四阶段等方法论。更新 Vibe Coding 概念页增加微信小程序实战案例。智能家居和 AI 创业是知识库的全新领域扩展，后续可考虑在教程中增加相关章节。

## [2026-05-28] ingest | 批量收录 12 篇 Codex 文章 + 4 篇知识库技术文章
- **新增页面**：
  - Wiki/wiki/topics/codex-deepseek-integration.md（DeepSeek 接入 Codex 完整教程：mimo2codex + CC Switch 本地转发方案）
  - Wiki/wiki/concepts/rag-architectures.md（RAG 三种架构：Classic RAG/Graph RAG/Agentic RAG 对比 + 选型指南）
  - Wiki/wiki/entities/graphify.md（Graphify 实体：多模态项目知识图谱 CLI 工具）
  - Wiki/wiki/entities/gitnexus.md（GitNexus 实体：零服务器代码知识图谱引擎，3.55 万 Stars，14 语言 + 16 MCP 工具）
  - Wiki/wiki/concepts/code-knowledge-graph.md（代码知识图谱概念：从检索文件到查询关系）
- **更新页面**：
  - Wiki/wiki/entities/codex.md（全面重写：从51行→200+行，新增四大产品形态/沙箱安全系统/Computer Use/Automation/Skills三层体系/六阶段方法论/与Claude Code详细对比表）
  - Wiki/wiki/topics/codex-guide.md（全面重写：从130行→300+行，新增界面详解/项目任务管理/沙箱权限/Memory系统/Plugins+Skills+MCP/Automation/Computer Use/Git Worktree/Cloud环境/TDD闭环/十三大章节）
  - Wiki/wiki/overview.md（新增 OpenAI Codex 知识体系 + 知识库技术体系两大板块；统计数据更新 73→89篇/26→27专题/11→13概念/11→13实体/2→2对比）
  - Wiki/wiki/index.md（新增概念条目2个 + 实体条目3个 + 专题条目2个 + 更新 Codex 实体+教程描述 + 新增 Codex 12 篇资料索引 + 知识库技术 4 篇资料索引）
- **教程同步**：
  - 教程/AI-Coding/02-主流AI-Coding工具/05-Codex/01-介绍与安装.md（全面重写：四大产品形态/沙箱/定价/DeepSeek接入/与CC互补定位）
  - 教程/AI-Coding/02-主流AI-Coding工具/05-Codex/02-基本使用与Spec-Driven开发.md（全面重写：界面速览/Plan+Steering+Fork/AGENTS.md/TDD闭环/Git Worktree/Plugin+Skill+MCP三层）
  - 教程/AI-Coding/02-主流AI-Coding工具/05-Codex/03-适用场景.md（全面重写：从「4%配角」→「65%日常首选」，Codex vs CC 分工/场景矩阵/组合策略）
  - 教程/AI-Coding/02-主流AI-Coding工具/01-工具全景对比.md（Codex 条目更新：从「全流程自动化」→「AI Agent 操作平台」，工具占比更新）
  - 教程/AI-Coding/AI Coding 学习计划.md（Codex 章节全面更新：四大形态/核心工作流/适用场景表格/工具占比更新）
- **摘要**：处理 Codex（12篇）+ 知识库技术（4篇）共 16 篇新增资料。Codex 从过时的「云端编程助手」定位更新为「统一 AI Agent 操作平台」，覆盖四大产品形态/沙箱/Computer Use/Automation/六阶段方法论等全部新能力。知识库技术板块新增三种 RAG 架构对比和代码知识图谱工具（GitNexus/Graphify）。本轮是优先级方案的第一批（Codex+知识库），还有 Home Assistant/OPC/VibeCoding/Claude Code增量/Obsidian增量 待处理。

## [2026-05-13] ingest | 让Claude编程失误率从41%降到3%：12条CLAUDE.md规则的踩坑复盘
- **新增页面**：Wiki/wiki/topics/claude-md-12-rules.md（CLAUDE.md 12 条规则深度解析：Karpathy 原版 4 条 + 辰北 8 条增量，含每条规则的翻车现场、实验数据、完整模板和使用指南）
- **更新页面**：Wiki/wiki/entities/claude-code.md（CLAUDE.md 章节新增 12 条规则专题引用 + related 交叉引用）、Wiki/wiki/overview.md（知识结构树新增 CLAUDE.md 规则条目 + 统计数据更新 73 篇/26 专题）、Wiki/wiki/index.md（索引新增专题页条目 + 原始资料条目）
- **教程同步**：教程/AI-Coding/02-主流AI-Coding工具/02-Claude-Code/02-安装与配置.md（CLAUDE.md 写作原则段落新增引用）、教程/AI-Coding/AI Coding 学习计划.md（Rule 概念段落新增延伸阅读）、教程/AI-Coding/02-主流AI-Coding工具/02-Claude-Code/06-高阶指令.md（Q&A 段落新增 12 条规则引用）
- **摘要**：处理辰北 2026.05 发布的 CLAUDE.md 规则深度文章。文章基于 Karpathy 发帖吐槽 Claude 编码的三种典型翻车模式，Forrest Chang 的 4 条规则模板（12 万 star），加上作者在 30 个代码库 6 周实验中的 8 条增量规则。核心数据：失误率从 41% 降至 3%（4 条）再压 8 个百分点（12 条），合规率仅从 78% 降至 76%。专题页完整覆盖了 12 条规则的设计逻辑、防止的失败模式、真实翻车现场和实验数据。

## [2026-05-13] ingest | Everything Claude Code (ECC)
- **新增页面**：Wiki/wiki/entities/everything-claude-code.md（实体页）、Wiki/wiki/topics/ecc-complete-guide.md（完整指南专题）
- **更新页面**：Wiki/wiki/concepts/skills-concept.md（添加 ECC Skills 体系段落 + related 交叉引用）、Wiki/wiki/concepts/harness-engineering.md（新增第十节 ECC 标杆实践 + related）、Wiki/wiki/concepts/agentic-engineering.md（实践工具新增 ECC 条目 + related）、Wiki/wiki/entities/claude-code.md（新增 Harness 性能优化段落 + related）、Wiki/wiki/overview.md（新增第 6 核心论点 + 更新统计数据）、Wiki/wiki/index.md（索引新增 ECC 实体 + 专题 + 原始资料条目）
- **教程同步**：教程/AI-Coding/02-主流AI-Coding工具/02-Claude-Code/04-进阶使用-Skill.md（Skill 生态资源表新增 ECC + 更新时间）、教程/AI-Coding/04-拓展使用/03-其他拓展工具与场景.md（新增 ECC 专题章节 + 与逐个安装 Skill 的对比表 + 更新时间）、教程/AI-Coding/AI Coding 学习计划.md（精选 Skill 表新增 ECC + Obsidian 推荐 Skill 段落新增 ECC + 4.3 章节标题更新）
- **摘要**：从 GitHub 仓库（200K+ Stars, Anthropic 黑客松获胜）和 132 页中文教程文章中提取信息，创建 ECC 实体页面（60 个 Agent / 228 个 Skill / 75 个命令 / 17 个语言规则包 / Hook 自动化 / 持续学习 / 跨 7+ 框架）和完整指南专题页面（安装/Agent 体系/Skills 生态/Hook 自动化/持续学习/安全/多 Agent 编排/跨框架/ECC 2.0/故障排除），同步更新了 5 个相关页面（skills-concept、harness-engineering、agentic-engineering、claude-code、overview）

## [2026-05-13] ingest | Superpowers 深度实战指南：从入门到精通（插件系统增量）
- 新增页面：Wiki/wiki/topics/superpowers-plugin-system.md（多平台适配架构 / 跨平台钩子兼容 / 版本管理 / 贡献标准 / 适用场景判断）
- 更新页面：Wiki/wiki/entities/superpowers.md（添加 related 交叉引用）、Wiki/wiki/index.md（索引新增条目）
- 教程同步：无需更新（新页面为插件系统技术细节，教程聚焦开发工作流，已有内容充分）
- 摘要：该文章的核心内容（14 个技能详解、设计哲学、开发闭环）在之前的收录中已被 3 个已有页面覆盖，本次提取了之前未覆盖的插件系统技术细节和贡献标准，创建独立专题页面

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

## [2026-05-10] create | AI Coding 完整学习计划（综合教程）
- **摘要**：基于知识库全部内容，撰写一份面向新手的完整 AI Coding 学习计划，输出到 `教程/` 文件夹
- **新增输出产物（1 个）**：
  - 教程/AI-Coding/AI Coding 学习计划.md — 1072 行综合教程，包含四大章节
- **教程结构**：
  - 第一部分：AI Coding 简介（发展历程 2024→2026 三阶段、6 个核心概念名词解释）
  - 第二部分：主流工具完整教程（Claude Code 安装/命令/Skill/MCP、Cursor Tab/Composer/Background Agent、Trae 四种模式、Codex 云端全流程、Copilot 概览）
  - 第三部分：Agent 框架（OpenClaw 安装/消息平台/Skills、Hermes Agent 安装/自进化/SOUL.md/Workspace/多Profile、两框架九维深度对比）
  - 第四部分：拓展使用（Obsidian 知识库五步工作流、Superpowers+gstack 完整开发闭环、Figma/Playwright/HUD 等）
  - 附录：按角色（国内初学者/海外开发者/架构师/内容创作者）推荐学习路径
- **更新页面**：wiki/index.md（新增输出产物板块 + 学习路线引用）、wiki/overview.md（更新统计数据）、wiki/topics/ai-coding-learning-plan.md（添加交叉引用）

## [2026-05-11] ingest | Superpowers 深度实战指南：从入门到精通
- 新增页面：Wiki/wiki/concepts/superpowers-design-philosophy.md（设计哲学概念页）
- 更新页面：Wiki/wiki/entities/superpowers.md（大幅扩展：跨 8 平台定位 + 架构全景 + 三种 Bootstrap 路径 + 14 技能详解含铁律 + 7 平台安装 + 设计哲学概述 + 调试指南 + 贡献标准）
- 更新页面：Wiki/wiki/topics/claude-code-superpowers-workflow.md（新增跨平台 Bootstrap 路径表 + React Todo List 完整实战演练 + 补充不适用的场景）
- 更新页面：Wiki/wiki/index.md（实体页简介更新为跨平台定位 + 新增设计哲学概念页条目）
- 教程同步：教程/AI-Coding/AI Coding 学习计划.md（4.2 Superpowers+gstack 章节补充跨平台说明和设计哲学链接）
- 摘要：处理 AgentBuff 2026-05-08 文章（1048 行）。核心新知：Superpowers 不仅是 Claude Code 插件，而是跨 8 平台方法论框架（三种 Bootstrap 路径）；每个技能有铁律+HARD-GATE+Red Flags+Common Rationalizations 四层防线；设计哲学（人的搭档语言/CSO）是全新内容；补充了 React Todo List 完整实战演练

## [2026-05-13] update | MCP 安装范围参数补充
- 更新页面：教程/AI-Coding/02-主流AI-Coding工具/02-Claude-Code/05-进阶使用-MCP.md（「基本命令」补充 -s 范围参数及示例；「配置文件」改为「三种安装范围」对照表，含 Local/Project/User 存储位置与优先级；「避坑指南」#2 补充具体命令）
- 更新页面：Wiki/wiki/entities/mcp.md（「安装方式」补充 -s 参数示例；「配置范围」改为表格格式含存储位置）
- 更新页面：Wiki/wiki/topics/claude-code-mcp-ecosystem.md（「避坑指南」#2 补充具体命令参数）
- 摘要：来自用户提问。教程此前只提「推荐项目级配置」，未写明 claude mcp add -s project/user 具体参数。三页同步补充完毕

## [2026-05-14] update | CLAUDE.md 层级结构与优先级机制详解
- 更新页面：Wiki/wiki/entities/claude-code.md（CLAUDE.md 层级结构章节全面扩展：新增托管策略/本地覆盖/规则文件/自动记忆层级、父目录vs子目录按需加载区分、拼接而非覆盖的核心原理、@import 语法、路径作用域 globs 机制）
- 更新页面：Wiki/wiki/concepts/harness-engineering.md（4.4 上下文管理新增交叉引用指向 CLAUDE.md 层级结构详解）
- 教程同步：教程/AI-Coding/02-主流AI-Coding工具/02-Claude-Code/02-安装与配置.md（「规则层详解」新增层级结构子章节，含 5 层级对照表和拼接机制说明）
- 摘要：来自用户提问「CLAUDE.md 分不分层级，有没有优先级」。知识库原有 4 级基本层级，补充到完整 8 级（含按需加载/启动加载区分、拼接机制、globs 规则文件）

## [2026-05-28] output | 知识库技术学习指南
- **新增产物**：教程/知识库/知识库技术学习指南.md（451 行综合教程）
- **覆盖内容**：RAG 三大架构 / RAG 优化 20 法 / 知识图谱 / 代码知识图谱 / LLM Wiki 范式 / 向量数据库 & 嵌入模型 / 工具生态 / 推荐学习路线图
- **摘要**：基于 wiki 中 7 个核心技术页面，生成一份面向学习者的知识库技术综合教程，涵盖从 Classic RAG 到 Agentic RAG、从知识图谱到 LLM Wiki 的完整知识体系，附带按阶段的学习路线图。

## [2026-05-28] lint | 知识库全面巡检与增强
- **诊断范围**：78 个 wiki 页面（16 概念 + 17 实体 + 41 专题 + 4 对比）
- **发现问题**：
  - 断裂 wikilinks：~60 处跨目录链接缺少 `../` 前缀，~15 处同目录链接多余 `topics/` 前缀
  - 导航缺失：6 个核心枢纽页面（rag-architectures / knowledge-graph / code-knowledge-graph / obsidian-llm-wiki-practice / rag-optimization-techniques / ai-coding-learning-plan）均无 overview 导航链接
- **修复操作**：
  - 修复 ~75 处 wikilinks：批量修正 agent-frameworks-moc / agentic-engineering / ai-coding-concepts / ai-coding-learning-plan / ai-coding-tools-comparison / agent-self-evolution / hermes-agent / claude-code / openclaw / superpowers 等 20+ 文件
  - 为 6 个核心枢纽页面添加 overview 导航 footer
  - 为 5 个知识库技术页面添加「知识库技术学习指南」教程交叉引用
- **质量指标**：
  - Frontmatter 完整性：100%（78/78）
  - 入链 > 5 的枢纽页面：48 个
  - 无真正孤立页面
  - Top 实体入链：claude-code(40) > hermes-agent(22) > openclaw(18) = obsidian(18) > mcp(16)
- **摘要**：完成知识库首次全面巡检。修复了 wiki 子目录之间大量断裂的 wikilink（主要问题是页面在 entities/concepts/topics/comparisons 子目录间互链时缺少 `../` 前缀），为关键枢纽页面补充了 overview 导航入口，将新生成的「知识库技术学习指南」教程与 5 个核心技术页面建立双向引用。知识库整体健康度良好。

## [2026-05-28] output | 知识库技术详细教程（7 章）
- **新增产物**：教程/知识库/01-07 共 7 章教程（合计 1,548 行）：
  - 01-知识库技术总览.md（177 行）— 三代演进 + 技术全景图
  - 02-RAG三大架构.md（297 行）— Classic/Graph/Agentic 深度对比 + 三问选型法
  - 03-RAG优化管线.md（246 行）— 20 种优化方法五阶段实战
  - 04-知识图谱.md（198 行）— 三元组/本体/GraphRAG/代码图谱
  - 05-LLM Wiki范式.md（187 行）— 编译器范式 + 开源实现 + 搭建实践
  - 06-向量数据库与嵌入模型.md（222 行）— Milvus 索引 + bge-m3 推荐 + 实操代码
  - 07-工具生态与选型.md（221 行）— 工具全景 + 四大场景 + 决策树
- **更新页面**：
  - 教程/知识库/知识库技术学习指南.md（新增章节导航表）
- **摘要**：基于知识库技术学习指南总纲，对标 Obsidian 教程风格，将 451 行总纲扩展为 7 章独立教程（+1,548 行），涵盖从概念到代码实操的完整知识体系。每章含 YAML frontmatter、学习路径导航、参考引用。
