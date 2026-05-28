---
title: Graphify — 软件工程知识图谱
type: entity
tags: [graphify, knowledge-graph, code-analysis, ai-coding, mcp, ast]
created: 2026-05-28
updated: 2026-05-28
sources:
  - raw/articles/知识库/开源 AI 编程可查询的软件工程知识图谱：Graphify 完整上手攻略.md
related:
  - entities/gitnexus.md
  - concepts/code-knowledge-graph.md
  - concepts/rag-architectures.md
  - entities/mcp.md
---

# Graphify — 软件工程知识图谱

Graphify 是一个将项目代码、文档、设计资料等分散信息整理成**可查询的软件工程知识图谱**的开源工具。核心价值：把 AI 编程助手从「每次重新读文件」升级为「沿着项目关系持续推理」。

> 变化的核心：从「检索文件」走向「查询关系」。

---

## 为什么 AI 编程需要知识图谱

当前 AI 编程助手的局限：每次提问都要重新扫描文件、拼接上下文。项目一大，这种方式开始吃力——**文件都在，资料都在，但理解没有累积。**

Graphify 提供的是**项目记忆层**：先读取项目，把代码结构、文档、设计思路和外部资料组织成图谱，之后 AI 回答问题时可沿着已有关系继续查找和推理。

---

## 核心功能

### 一键生成知识图谱

```bash
# 在 AI 编程助手中（支持的命令行工具）
/graphify .

# 或在普通终端
graphify .
```

### 输出产物

```
graphify-out/
├── graph.html        # 浏览器可视化图谱（给人看）
├── GRAPH_REPORT.md   # 项目总结与关系分析（给人+AI看）
└── graph.json        # 完整结构化图谱（底层数据，供查询/MCP/合并）
```

### 多模态资料处理

- **代码**：使用 tree-sitter AST 解析，不调用模型 API，速度快且稳定
- **文档**：Markdown、PDF 等
- **图片、视频**：提取元数据并关联到相关模块

---

## 典型使用场景

| 场景 | 查询示例 |
|------|----------|
| **影响分析** | 认证流程经过了哪些模块？ |
| **依赖追踪** | 某个配置类影响了哪些服务？ |
| **设计追溯** | 当前代码为什么这样设计？有没有设计说明？ |
| **资料关联** | 哪些论文、文档、视频和这个模块有关？ |

---

## 与 MCP 集成

Graphify 可通过 MCP 协议接入 Claude Code、Codex 等 AI 编程工具，让 AI 在改代码之前先查图谱了解影响面，理论上能大幅减少「改一处、炸一片」的情况。
