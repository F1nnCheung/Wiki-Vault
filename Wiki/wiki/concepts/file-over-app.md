---
title: File over App
type: concept
tags: [file-over-app, 数据主权, 知识管理, 哲学]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/Obsidian/万字长文：个人如何用 Obsidian 搭建本地知识库——从入门到构建你的「第二大脑」.md
  - raw/articles/Obsidian/Claude Code+Obsidian ：让 AI 当你的知识管家.md
  - raw/articles/Obsidian/Tolaria， 一款结合 Obsidian 和 Notion 优势，又是本地，又是开源的笔记工具新品诞生了！.md
related:
  - entities/obsidian.md
  - entities/tolaria.md
  - concepts/second-brain.md
---

# File over App

**File over App** 是一种软件设计哲学：数据应以开放、标准的文件格式存储在用户控制的本地磁盘上，而非被锁定在特定应用程序的专有格式或云端服务中。文件比应用更长寿。

## 核心原则

1. **数据属于用户，不属于软件公司**
2. **文件格式应开放、可读、可迁移**（如纯文本、Markdown）
3. **即使软件消失，数据依然可访问和可用**
4. **用户拥有数据的完全控制权和可移植性**

## 为什么重要

对于知识管理工具，你的知识库可能会伴随你十年、二十年甚至一辈子。如果数据被锁定在：
- **私有格式**中 → 软件停更或倒闭后无法读取
- **云端服务**中 → 公司政策变化、涨价、被收购后数据命运不掌握在你手中
- **数据库**中 → 迁移成本高昂

选择 File over App 不是偏执，而是**远见**——对知识资产做长期风险管理。

## 在 PKM 领域的体现

### Obsidian

Obsidian 是 File over App 的标杆实践：
- 所有笔记以 `.md` 纯文本存储
- Vault 就是一个本地文件夹
- 任何文本编辑器都能打开
- Obsidian 只是给文件夹加了一层 UI（双向链接、图谱视图、搜索、插件）

### Tolaria

Tolaria 明确继承了 File over App 理念：
- 每个笔记是干净的 `.md` 文件
- 无黑盒数据库
- 无云端强制绑定
- 「哪怕明天 Tolaria 从地球上消失，知识库依然完好无损」

### 反面案例

- **Notion**：数据存储在官方云端服务器，导出格式不完整
- **印象笔记**：私有格式，导出困难
- **Apple Notes**：AI 无法直接访问文件系统

## 在 AI 时代的特殊意义

File over App 在 AI 时代获得了新的重要性：

1. **Markdown 是 LLM 的母语**：大语言模型的训练数据中 Markdown 是最主要格式之一。Markdown 的 token 效率比 JSON/XML 高 30-50%。

2. **本地文件让 AI 零摩擦读写**：Claude Code 等 AI 工具可以直接操作文件系统读取 Markdown 文件，无需 API、认证、网络请求。在 Obsidian 里 Claude Code 是有完整权限的管理员，在 Notion 里只能通过 API 间接访问。

3. **三个十亿级项目的殊途同归**：
   - **Manus**：用 `task_plan.md` 和 `notes.md` 存 Agent 记忆
   - **OpenClaw**：用 `MEMORY.md` 和 `SOUL.md` 存 Agent 知识和人格
   - **Claude Code**：用 `CLAUDE.md` 和 `memory/` 目录存上下文和长期记忆
   
   三个独立团队，在没有互相参考的情况下，都选择了 Markdown 文件作为 AI Agent 的记忆层——不是向量数据库，不是 SQL，不是 JSON。

## 实践建议

- 优先选择支持标准格式（Markdown、纯文本）的工具
- 定期将数据从专有格式导出为开放格式
- 用 Git 进行版本控制（而非依赖云服务的版本历史）
- 知识库的持久性 > 工具的功能丰富度
