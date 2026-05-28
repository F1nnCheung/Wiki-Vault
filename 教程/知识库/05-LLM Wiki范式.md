---
title: 知识库技术 05 — LLM Wiki 范式与实践
type: tutorial
tags: [知识库, LLM-Wiki, Karpathy, 知识蒸馏, 个人知识管理]
created: 2026-05-28
updated: 2026-05-28
sources:
  - Wiki/wiki/topics/obsidian-llm-wiki-practice.md
  - Wiki/llm-wiki.md
related:
  - 02-RAG三大架构.md
  - 07-工具生态与选型.md
---

# 知识库技术 05 — LLM Wiki 范式与实践

> 2026 年 4 月，Karpathy 的一条推文（1600 万浏览）引爆了 LLM Wiki 概念。核心类比极其精妙：**AI 不是检索器，是编译器**。这套范式不依赖向量数据库，用 Git + Markdown + LLM 就构建了一个能持续积累、越用越聪明的知识系统。

---

## 编译器类比

这是理解 LLM Wiki 最关键的一句话：

```
raw/      = 源代码（不可变的原始资料）
LLM       = 编译器
wiki/     = 可执行输出（编译后的结构化知识）
lint      = 测试（发现矛盾、孤立页面）
queries   = 运行时（在知识库上提问）
```

**传统 RAG 是"每次重新检索"**——就像一个没有缓存的编译器，每次运行都重新从源码编译。

**LLM Wiki 是"增量编译"**——只处理新加入的源码，已有知识持续积累、相互引用。

---

## 为什么传统 RAG 不够

### 在个人/团队规模下的对比（~100 篇文章，~40 万字）

| 维度 | RAG | LLM Wiki |
|------|-----|----------|
| **知识状态** | 无状态，每次从零发现 | 有状态，知识持续积累 |
| **维护负担** | 无（不需维护索引外的） | LLM 自动维护交叉引用 |
| **基础设施** | 向量数据库 + Embedding 模型 | Git + Markdown |
| **知识复利** | 无积累 | 新知识建立在旧知识之上 |
| **发现矛盾** | 不检测 | Lint 主动发现 |
| **跨文档综合** | 依赖检索质量 | 索引 + 摘要预编译 |

### RAG 的根本问题

RAG 每次查询都从零发现知识——**没有积累**。你问过的问题、做过的分析，下一次还要重新推理。

LLM Wiki 不同：**知识编译一次，永久可用**。交叉引用已就位、矛盾已标注、综合结论已反映所有资料。

---

## 三层架构

```
知识库/
├── raw/           # 不可变的原始资料
│   ├── articles/  #   Web Clipper 保存的文章
│   ├── notes/     #   个人笔记
│   └── assets/    #   图片、PDF
│
├── wiki/          # LLM 生成和维护的 wiki 页面
│   ├── concepts/  #   概念页面
│   ├── entities/  #   实体页面（人物/组织/工具）
│   ├── topics/    #   专题页面
│   ├── comparisons/#  对比页面
│   ├── index.md   #   全局目录（每次收录后更新）
│   ├── log.md     #   操作日志（追加写入）
│   └── overview.md #  全局概览
│
└── CLAUDE.md      # 模式文件：告诉 LLM 如何操作这个 wiki
```

### 三层角色

| 层 | 谁写 | 谁读 | 可变性 |
|----|------|------|--------|
| `raw/` | 人（收藏、记录） | LLM + 人 | 不可变 |
| `wiki/` | LLM | 人 | LLM 持续更新 |
| `CLAUDE.md` | 人 + LLM 共演进 | LLM | 渐进演化 |

---

## 三个核心操作

### Ingest（收录）— 编译

你丢一篇新文章进 `raw/`，LLM 做以下事：

```
1. 阅读原始资料，提取关键信息
2. 创建或更新概念页面（如果涉及新概念）
3. 创建或更新实体页面（如果涉及新人物/工具）
4. 更新专题页面
5. 更新全局概览（如果改变了对全局的理解）
6. 更新 index.md + 追加 log.md
7. 检查教程是否需要同步更新
```

**一篇资料可能触达 10-15 个 wiki 页面。**

### Query（查询）— 运行时

你提问，LLM 先读 `index.md` 定位相关页面 → 精读相关页面 → 综合回答，附带 `[[wiki-link]]` 引用。

关键原则：**先搜知识库，知识库不够才联网。**

### Lint（巡检）— 测试

定期让 LLM 健康检查：
- 页面之间有没有矛盾？
- 有没有被新资料推翻的过时论断？
- 有没有孤立页面（没人链接到它）？
- 重要概念是否缺少独立页面？
- 交叉引用是否断裂？

**Lint 让知识库在不断膨胀中保持健康。**

---

## LLM Wiki vs RAG：选型建议

| 条件 | 推荐 |
|------|------|
| 个人/小团队，< 500 篇文章 | LLM Wiki（更简单，积累性强） |
| 企业级，百万级文档，高并发查询 | RAG（向量数据库必要） |
| 需要知识持续积累和演化 | LLM Wiki |
| 需要实时检索大量动态文档 | RAG |
| 两者结合 | LLM Wiki 做知识沉淀 + RAG 做日常检索 |

---

## 开源实现一览

| 项目 | Stars | 形态 | 特点 |
|------|-------|------|------|
| **nashsu/llm_wiki** | 3,856 | Tauri 桌面应用 | 三栏布局 + Louvain 社区检测 |
| **sdyckjq-lab/llm-wiki-skill** | 1,183 | Claude Code Skill | 国内素材抓取最全 + 离线知识图谱 |
| **Ar9av/obsidian-wiki** | 988 | Obsidian Vault 内 | 14+ Agent 共享，20+ 命令 |
| **Astro-Han/karpathy-llm-wiki** | 651 | Claude Code Skill | agentskills.io 开放标准 |
| **lucasastorian/llmwiki** | 698 | MCP 协议 | Karpathy 本人转发 |

---

## 最小可行方案

不需要复杂的工具链。你只需要：

```
1. 一个 Obsidian Vault（或任意 Markdown 文件夹）
2. 一份 CLAUDE.md（模式文件，告诉 LLM 规则）
3. 一个 raw/ 文件夹（放原始资料）
4. 一个 wiki/ 文件夹（LLM 产出）
5. 一个 LLM Agent（Claude Code / Codex / 任何支持文件操作的 AI）
```

### 四步启动

1. **创建目录**：`raw/` + `wiki/` + `CLAUDE.md`
2. **写 CLAUDE.md**：定义页面规范、工作流、目录结构
3. **扔一篇资料进 raw/**：对 LLM 说"收录这篇文章"
4. **开始提问**：知识库开始积累

> **一个最小但持续使用的 LLM Wiki，比一个用向量数据库但没人维护的 RAG 系统强一万倍。**

---

## 本章小结

1. LLM Wiki = raw（源码）+ LLM（编译器）+ wiki（可执行输出）
2. 核心差异：RAG 是无状态的，LLM Wiki 是有状态、持续积累的
3. 三个操作：Ingest（编译）、Query（运行时）、Lint（测试）
4. 在个人/团队规模下，比 RAG 更轻量、更有积累性
5. 最小方案只需要 Markdown + LLM Agent，不需要向量数据库

> 📖 **下一步**：[[06-向量数据库与嵌入模型]] — 如果场景确实需要 RAG，如何选向量数据库和嵌入模型。

---

> 📚 参考：[[Wiki/llm-wiki|LLM Wiki 原始文档]] · [[Wiki/wiki/topics/obsidian-llm-wiki-practice|LLM Wiki 实践]]
