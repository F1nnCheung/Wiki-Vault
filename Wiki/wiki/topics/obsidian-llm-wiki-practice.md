---
title: Obsidian LLM Wiki 实践
type: topic
tags: [obsidian, llm-wiki, karpathy, 知识蒸馏, 知识库自动化]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/Obsidian/手把手实践 Karpathy 爆红的 AI 知识库.md
  - raw/articles/Obsidian/推荐 Obsidian + Claude Code + Andrej Karpathy Wiki的obsidian-wiki，同时支持 hermes、openclaw等 AI接管你的 LangChain 实战课.md
  - raw/articles/Obsidian/公开我的Obsidian LLM Wiki的脚本（附双平台脚本）.md
  - raw/articles/Obsidian/建立Obsidian个人知识库的正确驾驶方式.md
related:
  - entities/obsidian.md
  - topics/obsidian-ai-integration.md
  - topics/obsidian-capture-workflow.md
  - concepts/second-brain.md
---

# Obsidian LLM Wiki 实践

2026 年 4 月，Karpathy 提出的 LLM Wiki 概念在技术圈引发轰动（1600 万浏览的推文）。核心类比极其精妙：**AI 不是检索器，是编译器**——`raw/` = 源代码，LLM = 编译器，`wiki/` = 可执行输出，`lint` = 测试，`queries` = 运行时。

在 Obsidian 中落地这一模式，已有多种社区方案。

## LLM Wiki 三层架构

```
知识库/
├── raw/        # 不可变的原始资料（文章、论文、网页剪藏）
├── wiki/       # AI 生成和维护的 wiki 页面
│   ├── index.md    # 全局目录
│   └── log.md      # 操作日志
└── CLAUDE.md   # 模式文件：告诉 AI 如何操作这个 wiki
```

### 三个核心操作

| 操作 | 作用 | 类比 |
|------|------|------|
| **Ingest（摄取）** | 把原始资料丢进 `raw/`，AI 阅读后提取关键信息，整合到 wiki 页面 | 编译 |
| **Query（查询）** | 向 AI 提问，它先读索引找到相关页面，然后综合回答，附带 `[[wiki-link]]` 引用 | 运行时 |
| **Lint（检查）** | 健康检查——发现孤立页面、过时声明、断裂的交叉引用 | 测试 |

### 为什么比 RAG 更好（在个人规模下）

在个人规模（约 100 篇文章、约 40 万字）下，结构化 Markdown + 摘要和索引文件比向量数据库 RAG 更有效：
- RAG 每次查询都从零发现知识（没有积累）
- LLM Wiki 是有状态的——知识建立在先前知识之上
- 没有嵌入、没有向量搜索、没有基础设施开销
- LLM 通过摘要和索引文件导航，在个人规模下足够了

## 七种 Obsidian LLM Wiki 实现

### 完整应用（独立 GUI/Web）

| 项目 | Stars | 特点 |
|------|-------|------|
| **lucasastorian/llmwiki** | 698 | Karpathy 本人转发，MCP 协议让 Claude Desktop 直接变 wiki 编辑器 |
| **nashsu/llm_wiki** | 3856 | Tauri 桌面 + 三栏布局 + Louvain 社区检测自动发现知识簇 |
| **taffy123d/Karpathy-LLM-Wiki** | 8 | 国产模型友好，通义/DeepSeek/OpenAI 一行切换 |

### Skill 包（Claude Code / Codex 内运行）

| 项目 | Stars | 特点 |
|------|-------|------|
| **sdyckjq-lab/llm-wiki-skill** | 1183 | 国内素材抓取最全（公众号/知乎/X/YouTube）+ 离线知识图谱 |
| **gatelynch/llm-knowledge-base** | 221 | 繁体中文，raw/wiki/brainstorming/artifacts 四层魔改 |
| **Astro-Han/karpathy-llm-wiki** | 651 | agentskills.io 开放标准 + 94 篇真实样例库 |

### Obsidian Vault 内（Ar9av/obsidian-wiki）

| 项目 | Stars | 特点 |
|------|-------|------|
| **Ar9av/obsidian-wiki** | 988 | 装在 Obsidian Vault 里，14+ Agent 共享，20+ Slash 命令，支持挖掘会话历史 |

**Ar9av 的独家能力**：
- **14+ 种 Agent 共享**：同一份 wiki，Claude Code / Cursor / Codex / Gemini CLI / Hermes / OpenClaw 都可以读写，早上在 Claude Code 用 `/wiki-ingest`，下午在 Codex 用 `$wiki-query` 查同一份 wiki
- **挖掘会话历史**：`/claude-history-ingest` 把你过去半年和 AI 的所有对话装进 wiki——你为调通某个问题踩过的坑、试过的 prompt、最后选的方案，都以 wiki 页形式永久保存
- **知识图谱导出**：Gephi / Neo4j / 交互 HTML，自然语言上色（"color code by category"）
- **增量更新**：`.manifest.json` 记住每份源文件 hash，下次只跑 delta

## Python 脚本方案：双平台知识蒸馏

当 Obsidian 插件方案遇到瓶颈时（批量处理 700 个文件卡死），有作者转而使用 Python 脚本：

### 工作流程

1. 指定要读取的目录（目录 A）
2. 指定保存知识卡片的目录（目录 B）
3. LLM 处理每个文件，蒸馏为知识卡片
4. 提取实体，创建实体页面（`[[双向链接]]` 包裹）
5. 蒸馏完成的文件标签改为「已蒸馏」

### 关键设计

- **不会修改源文件**：只读取并生成新文件到指定目录，不满意随时删
- **自动记忆配置**：首次输入后自动保存为默认值
- **双平台支持**：Mac 和 Windows
- **提示词工程**：精心设计的提示词实现了字符级过滤、去噪、列表化输出、实体命名协议（中英文取公认、禁止中英混用、去复数去符号、技术缩写全大写）

### 已知限制

- 实体识别准确率受模型性能限制
- 近似词合并需要定期人工维护
- 单脚本有局限性，大规模维护需要联网模型辅助

## 实践建议

1. **先手动建立习惯**：理解 PARA、Zettelkasten、MOC 的逻辑，再引入 AI
2. **渐进式引入 AI**：先装 Smart Connections（发现隐藏关联）→ 再装 Copilot/Text Generator（辅助提炼）→ 最后用 LLM Wiki 完整流程
3. **不要完全外包思考**：AI 负责簿记和执行，人类负责策展和方向。你决定什么值得知道、什么值得深入、什么值得产出
4. **结合 Web Clipper**：Obsidian Web Clipper 保存网页到 `raw/` → AI 定期处理 → wiki 持续增长

## LLM Wiki v2 扩展

基于 agentmemory 项目的实战经验，LLM Wiki v2 增加了：
- **置信度评分**：每个事实附加置信度分数，随时间衰减，被强化时回升
- **记忆层级**：工作记忆 → 情景记忆 → 语义记忆 → 程序记忆的升级管道
- **遗忘曲线**：借鉴艾宾浩斯，几个月未被访问的知识自动降低优先级
- **知识图谱**：提取实体，建立类型化关系（使用/依赖/矛盾/导致/修复/取代）
- **混合搜索**：BM25 + 向量 + 图遍历三路融合，LongMemEval-S 基准 95.2% 准确率
- **自动化钩子**：新来源到来自动摄取，会话结束自动归档
- **矛盾解决**：基于来源时效性和权威性，AI 提出哪个声明更可能正确

> 📖 导航：[[../overview|全局概览]] · [[../concepts/rag-architectures|RAG 三种架构]] · [[../concepts/second-brain|第二大脑]] · [[../../教程/知识库/知识库技术学习指南|知识库技术教程]]
