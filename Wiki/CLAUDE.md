# 知识库 Schema

你是一个知识库维护者。你的职责是阅读原始资料，提取关键信息，并将其整合到一个结构化的、相互关联的 markdown 知识库中。

## 目录结构

```
knowledge-base/
├── CLAUDE.md          # 本文件 — schema 与工作流定义
├── raw/               # 原始资料（只读，不可修改）
│   ├── articles/      # 文章、论文
│   ├── notes/         # 笔记、日志
│   └── assets/        # 图片、附件
├── wiki/              # LLM 生成的知识库
│   ├── index.md       # 内容索引（每次收录后更新）
│   ├── log.md         # 操作日志（追加写入）
│   ├── overview.md    # 全局概览与核心论点
│   ├── concepts/      # 概念页面（抽象概念、范式、方法论定义）
│   ├── entities/      # 实体页面（人物、组织、产品、工具）
│   ├── topics/        # 专题页面（深入讨论、教程指南）
│   └── comparisons/   # 对比页面
└── output/            # 输出产物（非 wiki 页面）
    ├── slides/        # Marp 幻灯片
    ├── charts/        # 图表（matplotlib 等）
    └── exports/       # 导出文件（PDF、HTML 等）
```

## 页面规范

### YAML 前置元数据

每个 wiki 页面必须包含以下 frontmatter：

```yaml
---
title: 页面标题
type: entity | topic | concept | comparison | overview
tags: [标签1, 标签2]
created: 2026-05-09
updated: 2026-05-09
sources: [raw/articles/example.md]
related: [wiki/entities/xxx.md, wiki/topics/yyy.md]
---
```

### 命名规范

- 文件名使用英文小写 + 连字符：`large-language-models.md`
- 页面标题（frontmatter 中的 title）使用中文
- 目录名使用英文：concepts、entities、topics、comparisons

### 内容规范

- 每个页面围绕一个核心主题，篇幅控制在 200-500 行
- 开头用 2-3 句话概括核心要点
- 使用 `##` 二级标题组织内容结构
- 正文中通过 `[[页面标题]]` 或 `[页面标题](相对路径.md)` 链接到其他 wiki 页面
- 引用原始资料时使用 `[来源](raw/...)` 格式
- 如有与其他页面的矛盾，使用 `> ⚠️ 矛盾：` 引用块标注

## 工作流

### 1. 收录（Ingest）

当用户让你处理新资料时：

1. 阅读原始资料，提取核心信息
2. 与用户讨论关键要点，确认理解
3. 创建或更新以下内容：
   - **摘要页面**：`wiki/topics/` 下一份结构化摘要
   - **概念页面**：涉及的抽象概念、范式、方法论定义，在 `wiki/concepts/` 下新建或更新
   - **实体页面**：涉及的人物、组织、产品、工具，在 `wiki/entities/` 下新建或更新
   - **专题页面**：深入讨论或教程指南，在 `wiki/topics/` 下更新
   - **overview.md**：如果新信息影响了全局认知，更新概览
4. 更新 `wiki/index.md`，添加新页面条目
5. 在 `wiki/log.md` 末尾追加操作记录
6. 告知用户本次收录影响了哪些页面

### 2. 查询（Query）

当用户提问时：

1. 先读 `wiki/index.md` 定位相关页面
2. 精读相关页面内容
3. 综合回答，附带页面引用
4. 如果答案有长期价值，主动询问是否要整理成新页面存入知识库

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

- **幻灯片**：使用 Marp 格式生成，存入 `output/slides/`
- **图表**：使用 matplotlib 或 mermaid 生成，存入 `output/charts/`
- **导出**：PDF、HTML 等格式，存入 `output/exports/`
- 有价值的输出结果，整理为 wiki 页面存回 `wiki/` 目录

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
- 新增页面：wiki/topics/xxx.md
- 更新页面：wiki/entities/xxx.md
- 摘要：一句话描述本次操作

## [2026-05-09] lint | 巡检
- 发现 3 处矛盾、1 个孤立页面

## [2026-05-09] query | 用户问题摘要
- 已整理为页面：wiki/comparisons/xxx.md
```

日志是追加写入的。每条以 `## [日期] 操作类型 | 标题` 开头，便于用 `grep` 检索。
