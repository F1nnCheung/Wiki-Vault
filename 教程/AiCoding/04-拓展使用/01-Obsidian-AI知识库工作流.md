---
title: 4.1 Obsidian + AI 知识库工作流
type: tutorial
tags: [obsidian, knowledge-base, ai, workflow, second-brain]
created: 2026-05-11
updated: 2026-05-11
sources:
  - Wiki/wiki/topics/obsidian-llm-wiki-practice.md
  - Wiki/wiki/topics/obsidian-ai-integration.md
  - 教程/AiCoding/AI Coding 学习计划.md
related:
  - 02-Superpowers-gstack进阶闭环.md
  - 03-其他拓展工具与场景.md
---

# 4.1 Obsidian + AI 知识库工作流

> 知识库最大的浪费不是「不够大」，而是「存了不用」。把 Obsidian 和 AI Agent 组合起来，让知识库从「仓库」变成「生产线」。

---

## 核心认知

2026 年 4 月，Karpathy 提出的 LLM Wiki 概念引爆了知识管理圈。核心类比极其精妙：

```
AI 不是检索器，是编译器

raw/    = 源代码（原始资料）
LLM     = 编译器（AI 处理）
wiki/   = 可执行输出（结构化知识）
lint    = 测试（巡检）
queries = 运行时（查询）
```

---

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
|---|---|---|
| **Ingest（收录）** | 把原始资料丢进 `raw/`，AI 阅读后提取关键信息，整合到 wiki | 编译 |
| **Query（查询）** | 向 AI 提问，它先读索引找到相关页面，然后综合回答 | 运行时 |
| **Lint（巡检）** | 健康检查——发现孤立页面、过时声明、断裂的交叉引用 | 测试 |

### 为什么比 RAG 更好

在个人规模（约 100 篇文章、约 40 万字）下，结构化 Markdown + 索引比向量数据库 RAG 更有效：

- RAG 每次查询都从零发现知识（没有积累）
- LLM Wiki 是有状态的——知识建立在先前知识之上
- 没有嵌入、没有向量搜索、没有基础设施开销

> 📖 RAG 本身并非「不好」，只是更适合不同场景。深入了解 RAG 的架构选型和优化方法，见 [[Wiki/wiki/concepts/rag-architectures|RAG 三种架构]] 和 [[Wiki/wiki/topics/rag-optimization-techniques|RAG 优化 20 法]]。

---

## 目录设计：给 Agent 认路的

```
📁 01-Sources     ← 外部资料入库
📁 02-Accounts    ← 各账号的内容资产
    └─ 超级猛
       ├─ Topics    ← 选题池
       ├─ Drafts    ← 草稿区
       └─ Published ← 发布归档
📁 03-Frameworks  ← 内容框架、写作规范、账号定位
```

### 最小流转链路

```
Source Note → Topic Note → Draft Note → Published Note
```

只要这条线跑顺了，知识库就完成了从「仓库」到「生产线」的转变。

---

## 实操流程

### 第一步：入库判断

让 AI 帮你做初筛——判断一篇内容是否值得收入：

```
Prompt：
"判断以下内容是否值得收入知识库。如果值得，生成 Source Note：
- 核心摘要（3 句话）
- 关键观点（3-5 条）
- 适合的账号/用途
- 可延展选题（3 个）
- 建议目录和文件名"
```

### 第二步：拆选题

基于 Source Note 拆 3 个选题：

```
每个选题包含：
- 一句话定义
- 目标读者
- 用户痛点
- 核心承诺（读者能获得什么）
- 标题候选（3-5 个）
- 简短提纲
```

**选题四标准**：
1. 有明确用户痛点
2. 有真实案例可引用
3. 能讲成可复现的工作流
4. 能给出可操作的方法

### 第三步：生成草稿

> ⚠️ **大坑**：AI 工具文容易写成「某工具是什么、有什么功能、有什么优势」的产品介绍。

正确写法：从具体问题切入——「为什么需要它？之前卡在哪？接进来之后哪一步变了？」

AI 产出只当初稿，人工过两轮：
- **第一轮**：删掉正确但没信息量的话
- **第二轮**：补上真实判断和使用细节

### 第四步：把固定流程写成 Skill

将稳定流程沉淀为 Skill：
- Source Note 生成规范
- Topic Note 字段模板
- 不同平台（公众号 vs 小红书）的差异化要求

### 第五步：发布后归档

```
Source → Topic → Draft → Published → Review → New Topic
```

形成反馈闭环。这才叫「内容中台」——不是一个资料库，是一个能持续产生判断的系统。

---

## 推荐工具组合

| 工具 | 用途 |
|---|---|
| **Obsidian** | 本地 Markdown 知识库底座 |
| **Claude Code** | 内容加工、批量处理、知识库分析 |
| **Hermes Agent** | 跨平台内容助手（微信/飞书即时交互） |
| **Obsidian Git 插件** | 版本控制 + 多端同步 |
| **Dataview 插件** | 动态查询知识库内容 |
| **Obsidian Web Clipper** | 网页内容一键剪藏入库 |

---

## 不同角色的知识库用法

### 开发者

```
Obsidian = 技术笔记 + 踩坑记录 + API 速查
AI = 笔记整理 + 知识关联 + 代码生成
```

### 内容创作者

```
Obsidian = 选题池 + 素材库 + 发布管理
AI = 选题生成 + 初稿起草 + 多平台改写
```

### 研究者

```
Obsidian = 文献笔记 + 概念关联 + 论点追踪
AI = 文献摘要 + 矛盾发现 + 研究方向建议
```

---

## 本章小结

1. 核心认知：知识库的价值在于「用」，不在于「存」
2. LLM Wiki 三层架构：raw → AI 编译 → wiki
3. 最小流转：Source → Topic → Draft → Published
4. AI 产出只当初稿，人工过两轮
5. 把稳定流程写成 Skill，让 AI 持续改进

> 📖 **下一步**：阅读 [[02-Superpowers-gstack进阶闭环]]，学习 Superpowers + gstack 如何构建生产级开发闭环。

---

> 📚 参考：[[Wiki/wiki/topics/obsidian-llm-wiki-practice|Obsidian LLM Wiki 实践]] · [[Wiki/wiki/topics/obsidian-ai-integration|Obsidian AI 集成]]
