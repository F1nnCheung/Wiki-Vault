---
title: GitNexus — 零服务器代码知识图谱引擎
type: entity
tags: [gitnexus, knowledge-graph, code-analysis, graph-rag, mcp, wasm]
created: 2026-05-28
updated: 2026-05-28
sources:
  - raw/articles/知识库/开源一款零服务器代码知识图谱引擎，支持多语言解析、Graph RAG 问答、AI 代理集成的代码分析平台.md
related:
  - entities/graphify.md
  - concepts/code-knowledge-graph.md
  - concepts/rag-architectures.md
  - entities/mcp.md
---

# GitNexus — 零服务器代码知识图谱引擎

GitNexus 是一款完全在浏览器端运行的**零服务器代码知识图谱引擎**。把 GitHub 仓库 URL 拖进去或上传 ZIP，它在浏览器中把整个项目解析成交互式知识图谱，支持 Graph RAG 问答和 MCP 集成。GitHub Stars 3.55 万，单日最高涨星 1800+。

> 定位：为 AI 代理构建代码理解的神经系统——给 AI 编程工具配一双能看懂代码结构的眼睛。

---

## 核心特点

### 完全浏览器端运行，零服务器

整个图谱的构建、渲染、查询都在浏览器内完成，代码永不离开你的电脑：
- **Tree-sitter WASM**：浏览器端 AST 解析
- **LadybugDB WASM**：浏览器端存储
- **transformers.js**：嵌入向量计算（WebGPU 或 WASM）
- **Web Workers**：多线程解析不卡 UI
- **IndexedDB**：持久化存储

对企业合规敏感、代码不能出本地的团队来说，这一点直接解决了核心顾虑。

### 知识图谱，不只是搜索

传统 IDE 全局搜索告诉你「这个函数被引用 12 次」，但 GitNexus 能：
- 画出从入口点到目标函数的**完整调用链**，标注每步置信度
- 追踪**关系**而非文本匹配
- 使用 **Leiden 社区检测算法**自动聚合成功能集群

图谱结构：节点 = 函数/类/模块，边 = 调用/继承/导入/实现关系。

### Graph RAG：让 AI 真正理解代码

普通 RAG 是文档切片→向量库→召回片段。GitNexus 做的是**拿代码结构化图谱做 RAG**，精度远高于文档切片：

| 普通 RAG | GitNexus Graph RAG |
|----------|---------------------|
| 召回含 "Auth" 关键词的文档片段 | 返回依赖关系图谱，列出直接依赖 7 个模块 + 间接依赖 12 个模块，标注风险等级 |

### MCP 集成：16 个工具

提供 16 个 MCP 工具，让 Claude Code、Cursor、Codex、Windsurf 等 AI 编程工具通过标准 MCP 协议访问代码知识图谱。配置一次后，AI 改代码前先查图谱知道影响面，减少「改一处、炸一片」。

### 多语言支持（14 种）

| 支持程度 | 语言 |
|----------|------|
| **最完整** | TypeScript、JavaScript、Python（含导入/导出分析、继承关系、类型注解、构造函数推断） |
| **良好** | Java、Kotlin、C#、Go、Rust、PHP、Ruby、Swift |
| **基础** | C、C++、Dart |

---

## 技术架构

### 索引管道（6 阶段）

1. **结构阶段**：遍历文件树，映射文件夹与文件关系
2. **解析阶段**：Tree-sitter AST 提取函数、类、方法、接口
3. **关联阶段**：跨文件关系解析（导入、函数调用、继承、构造函数推断、self/this 类型解析）
4. **聚类阶段**：Leiden 算法将相关符号分组为功能社区
5. **流程阶段**：从入口点开始追踪执行流
6. **搜索阶段**：构建混合搜索索引（BM25 关键词 + 语义向量 + RRF 融合）

### 可视化层

Sigma.js + Graphology，基于 WebGL 渲染。中型以上项目建议先缩小到目标模块再分析。

---

## 部署方式

| 方式 | 适用场景 |
|------|----------|
| **CLI** | 日常开发配合 AI 代理，Node.js 原生运行时 |
| **Web UI** | 浏览器直接使用，全部 WASM 运行 |
| **MCP Server** | 接入 AI 编程工具，提供 16 个图谱查询工具 |

---

## 与 Graphify 对比

| 维度 | GitNexus | Graphify |
|------|----------|----------|
| **运行环境** | 浏览器端（WASM） | 终端 CLI |
| **核心能力** | 14 语言代码图谱 + Graph RAG + MCP | 多模态项目图谱（代码+文档+图片+视频） |
| **MCP 集成** | 16 个 MCP 工具 | 支持 MCP 接入 |
| **零服务器** | 完全浏览器端 | 本地终端运行 |
| **可视化** | 交互式 WebGL 图谱 | graph.html 浏览器图谱 |
| **Stars** | 3.55 万 | 较新项目 |

两者互补：GitNexus 侧重代码级深层分析与合规场景，Graphify 侧重多模态项目全局理解。
