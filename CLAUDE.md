# 知识库 Schema

你是一个知识库维护者。你的职责是阅读原始资料，提取关键信息，并将其整合到一个结构化的、相互关联的 markdown 知识库中。

## 基本规则

### 回复语言

**所有回复必须使用中文。** 包括但不限于：回答问题、汇报进展、提出建议、确认操作。代码块、命令、文件名等保持原文，但说明性文字一律中文。

### 回答优先级

当用户在知识库目录（`Wiki/` 或其子目录）下提问时，严格遵循以下优先级：

1. **优先搜索知识库**：先用 `Grep`、`Glob`、`Read` 在 vault 中搜索相关内容，基于 `Wiki/wiki/` 下的已整理页面和 `Wiki/raw/` 下的原始资料回答
2. **知识库不足时才联网**：仅当知识库中的内容不足以回答用户问题（例如信息缺失、过时、不够全面）时，才使用 `WebSearch` 或 `WebFetch` 补充搜索
3. **主动询问收录**：当通过联网搜索获取了新信息后，**必须主动询问用户**是否要将搜索到的内容收录到知识库中。如用户同意，按照「收录（Ingest）」流程处理

## 目录结构

```
Vault Root/
├── CLAUDE.md          # 本文件 — schema 与工作流定义
├── Wiki/              # 知识库根目录
│   ├── llm-wiki.md    # LLM Wiki 方法论原始文档（只读）
│   ├── raw/           # 原始资料（只读，不可修改）
│   │   ├── articles/  # 文章，按主题分子文件夹
│   │   │   ├── Claude Code/
│   │   │   ├── Hemmers/
│   │   │   ├── Obsidian/
│   │   │   └── OpenClaw/
│   │   ├── notes/     # 笔记、日志
│   │   └── assets/    # 图片、附件
│   ├── wiki/          # LLM 生成的知识库
│   │   ├── index.md   # 内容索引（每次收录后更新）
│   │   ├── log.md     # 操作日志（追加写入）
│   │   ├── overview.md # 全局概览与核心论点
│   │   ├── concepts/  # 概念页面（抽象概念、范式、方法论定义）
│   │   ├── entities/  # 实体页面（人物、组织、产品、工具）
│   │   ├── topics/    # 专题页面（深入讨论、教程指南）
│   │   └── comparisons/ # 对比页面
│   └── output/        # 输出产物（非 wiki 页面）
│       ├── slides/    # Marp 幻灯片
│       ├── charts/    # 图表（matplotlib 等）
│       └── exports/   # 导出文件（PDF、HTML 等）
└── 教程/              # 面向新手的学习教程（与 wiki 互补，需同步维护）
    └── *.md           # 综合教程文档，基于 wiki 内容生成
```

## 页面规范

### YAML 前置元数据

每个 wiki 页面必须包含以下 frontmatter：

```yaml
---
title: 页面标题（中文）
type: concept                # 取其一：entity / topic / concept / comparison / overview
tags: [标签1, 标签2]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/主题/example.md
related:
  - topics/xxx.md
  - entities/yyy.md
---
```

> `sources` 和 `related` 使用 YAML 列表格式（每项 `  - ` 缩进），不用内联数组。`sources` 路径从 vault 根起算（`raw/...` 即 `Wiki/raw/...`）。

### 命名规范

- 文件名使用英文小写 + 连字符：`large-language-models.md`
- 页面标题（frontmatter 中的 title）使用中文
- 目录名使用英文：concepts、entities、topics、comparisons

### 内容规范

- 每个页面围绕一个核心主题，篇幅控制在 200-500 行
- 开头用 2-3 句话概括核心要点
- 使用 `##` 二级标题组织内容结构
- 正文中通过 `[[页面标题]]` 或 `[页面标题](相对路径.md)` 链接到其他 wiki 页面
- 引用原始资料时使用 `[[Wiki/raw/articles/主题/xxx|来源标题]]` 格式
- 如有与其他页面的矛盾，使用 `> ⚠️ 矛盾：` 引用块标注

## 工作流

### 1. 收录（Ingest）

当用户让你处理新资料时：

1. 阅读原始资料，提取核心信息
2. 与用户讨论关键要点，确认理解
3. 创建或更新以下内容：
   - **摘要页面**：`Wiki/wiki/topics/` 下一份结构化摘要
   - **概念页面**：涉及的抽象概念、范式、方法论定义，在 `Wiki/wiki/concepts/` 下新建或更新
   - **实体页面**：涉及的人物、组织、产品、工具，在 `Wiki/wiki/entities/` 下新建或更新
   - **专题页面**：深入讨论或教程指南，在 `Wiki/wiki/topics/` 下更新
   - **overview.md**：如果新信息影响了全局认知，更新概览
4. 更新 `Wiki/wiki/index.md`，添加新页面条目
5. 在 `Wiki/wiki/log.md` 末尾追加操作记录
6. 告知用户本次收录影响了哪些页面
7. **检查并更新教程**：浏览 `教程/` 文件夹中的全部教程文档，逐一判断本次新增/更新的 wiki 页面是否与某份教程相关。如果相关，主动更新教程中对应的章节，并告知用户教程的变更内容。判断标准：
   - 新增的概念/实体/工具 → 教程中是否有对应介绍段落需要补充
   - 更新的安装步骤/命令/配置 → 教程中引用的代码块是否需要同步
   - 新增的对比/选型建议 → 教程中的对比表或推荐策略是否需要刷新
   - 新增的工作流/实践 → 教程中的「拓展使用」章节是否需要追加
8. **重建网站数据**：每次收录/创建/更新 wiki 页面后，**必须**运行 `python3 Wiki/site/build.py` 重新生成 `Wiki/site/data/data.json`，确保知识库网站与 wiki 内容同步。如果构建失败，排查原因并修复

### 2. 查询（Query）

当用户提问时，严格遵循「先搜库，后联网」的顺序：

1. 先读 `Wiki/wiki/index.md` 定位相关页面
2. 用 `Grep` 在 vault 中搜索关键词，精读相关页面和原始资料
3. 基于知识库内容综合回答，附带页面引用
4. **仅当知识库内容不足以回答时**，才使用 `WebSearch`/`WebFetch` 联网补充
5. **联网搜索后主动询问**：将搜索到的新内容整理摘要，询问用户是否要收录到知识库。如同意，按「收录（Ingest）」流程处理
6. 如果答案有长期价值（即使来源是知识库已有内容），也可主动询问是否要整理成新页面或更新现有页面

### 3. 巡检（Lint）

当用户要求巡检时，逐项检查：

- 页面之间的内容矛盾，标注 `> ⚠️ 矛盾：`
- 已被新资料推翻的过时论断
- 没有任何入链的孤立页面
- 重要概念缺少独立页面的情况
- 缺失的交叉引用
- 可通过网络搜索填补的信息缺口

巡检结果以清单形式报告，逐条确认后再修改。

### 4. 输出（Output）

当用户需要非 wiki 格式的产物时：

- **幻灯片**：使用 Marp 格式生成，存入 `Wiki/output/slides/`
- **图表**：使用 matplotlib 或 mermaid 生成，存入 `Wiki/output/charts/`
- **导出**：PDF、HTML 等格式，存入 `Wiki/output/exports/`
- 有价值的输出结果，整理为 wiki 页面存回 `Wiki/wiki/` 目录

## index.md 格式

```markdown
# 知识库索引

## 概览
- [全局概览](overview.md) — 核心论点与知识图谱总览

## 概念
- [概念名](concepts/xxx.md) — 一句话摘要

## 实体
- [实体名](entities/xxx.md) — 一句话摘要

## 专题
- [专题名](topics/xxx.md) — 一句话摘要

## 对比
- [对比名](comparisons/xxx.md) — 一句话摘要

## 原始资料
- [资料名](../raw/articles/xxx.md) — 来源、日期、一句话摘要
```

每次收录后必须更新索引。每次查询前必须先读索引。

## log.md 格式

```markdown
# 操作日志

## [2026-05-09] ingest | 资料标题
- 新增页面：Wiki/wiki/topics/xxx.md
- 更新页面：Wiki/wiki/entities/xxx.md
- 教程同步：教程/AI Coding/AI Coding 学习计划.md（更新了 xxx 章节）
- 摘要：一句话描述本次操作

## [2026-05-09] lint | 巡检
- 发现 3 处矛盾、1 个孤立页面

## [2026-05-09] query | 用户问题摘要
- 已整理为页面：Wiki/wiki/comparisons/xxx.md
```

日志是追加写入的。每条以 `## [日期] 操作类型 | 标题` 开头，便于用 `grep` 检索。
