---
title: Obsidian
type: entity
tags: [obsidian, 知识管理, PKM, markdown, 本地优先]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/Obsidian/万字长文：个人如何用 Obsidian 搭建本地知识库——从入门到构建你的「第二大脑」.md
  - raw/articles/Obsidian/Claude Code+Obsidian ：让 AI 当你的知识管家.md
  - raw/articles/Obsidian/Obsidian Cli 基础使用教程 AI化知识管理全过程.md
  - raw/articles/Obsidian/一个装上就不想换的 Obsidian 主题：Baseline.md
related:
  - entities/tolaria.md
  - concepts/second-brain.md
  - concepts/file-over-app.md
  - topics/obsidian-getting-started.md
  - topics/obsidian-ai-integration.md
  - entities/claude-code.md
---

# Obsidian

Obsidian 是一款**本地优先、基于 Markdown** 的个人知识管理（PKM）工具。它将所有笔记以 `.md` 纯文本格式保存在用户本地硬盘上，通过 `[[双向链接]]` 和知识图谱实现网状知识管理。

**核心理念**：File over App — 数据永远属于用户，不锁定在任何专有格式中。即使 Obsidian 公司消失，用任何文本编辑器都能打开你的笔记。

## 关键数据

- **公司规模**：7 人 + 1 只猫，工程团队仅 3 人
- **估值**：3.5 亿美元（2026 年）
- **融资情况**：零外部融资，100% 靠用户付费
- **社区插件**：2700+ 个开源插件
- **核心付费服务**：Sync（跨平台同步，$4/月）、Publish（网站发布）、商业许可证
- **创始人**：Erica Xu（COO）、Shida Li（CTO，滑铁卢大学校友），2020 年 3 月 Beta 版诞生于疫情隔离期间
- **CEO**：Steph Ango（又名 kepano，也是 Minimal 主题作者）

## 核心特性

### 1. 数据主权：本地 Markdown 文件

所有笔记以 `.md` 纯文本存储在本地。对比 Notion 的云端锁定方案，Obsidian 选择了**根本性的设计决策**：用户的笔记永远在用户自己的硬盘上。这意味着：
- 数据可移植性：任何文本编辑器都能打开
- 长期安全：不依赖 Obsidian 公司存续
- 版本控制友好：天然适配 Git

### 2. 双向链接与知识图谱

`[[双向链接]]` 是 Obsidian 的核心机制。当你在笔记 A 中写下 `[[笔记 B]]`，B 也会感知到来自 A 的引用。随着笔记增长，这些链接编织成**知识图谱**——可在图谱视图中可视化整个知识网络。

这是一种**自下而上**的组织方式，更接近人脑的神经元连接模式，而非传统的文件夹层级。

### 3. 插件生态：2700+ 社区插件

受 VS Code 启发，Obsidian 构建了强大的插件 API。社区贡献覆盖：
- 数据查询（Dataview）
- 任务管理（Tasks、Kanban）
- 可视化思考（Excalidraw）
- AI 集成（Copilot、Smart Connections、Text Generator）
- 版本控制（Git）
- 主题定制（Style Settings）

### 4. 2025-2026 重要更新

- **Bases**：原生数据库视图（表格、卡片），直接读取 YAML frontmatter，正在替代 Dataview 的简单场景
- **Properties 系统增强**：更丰富的属性类型和编辑方式
- **Canvas 改进**：支持反向链接检测
- **Obsidian CLI（v1.12+）**：命令行接口，支持通过 AI 工具（Claude Code 等）批量操作 Vault

## Obsidian 的「反硅谷」哲学

Obsidian 在 SaaS 创业圈中是一个异类：
- 零融资，零会议（使用「Ramblings」频道机制保持团队对齐）
- 没有资本退出压力，无需塞入臃肿的商业功能
- 唯一的「老板」是每天使用软件的用户
- 坚持不做强制内置的闭源 AI，让用户自由选择 AI 提供商

## AI 时代的 Obsidian

Obsidian 在 AI 集成路线上走了一条不同于 Notion 的路：
- Notion AI 是开箱即用的商业化方案，但数据暴露给云端闭源模型
- Obsidian 让用户自由选择：可以接入 ChatGPT/Claude API，也可以通过 Ollama 在本地运行开源模型，完全离线，零数据外传

**Obsidian + Claude Code 的组合**被多位作者认为是 2026 年个人知识管理的最优解：
- Markdown 是 LLM 的母语（token 效率比 JSON/XML 高 30-50%）
- 本地文件让 AI 零摩擦读写（Claude Code 直接操作文件系统）
- 三个独立十亿级项目（Manus、OpenClaw、Claude Code）殊途同归，都选择 Markdown 作为 Agent 记忆层

## 核心社区插件速览

| 类别 | 代表插件 | 下载量 |
|------|---------|--------|
| 数据查询 | Dataview | 390 万+ |
| 模板引擎 | Templater | 390 万+ |
| 任务管理 | Tasks | 320 万+ |
| 可视化 | Excalidraw | 570 万+ |
| 日历导航 | Calendar | 250 万+ |
| 版本控制 | Git | 230 万+ |
| 看板 | Kanban | 220 万+ |
| 主题定制 | Style Settings | 220 万+ |
| AI 语义 | Smart Connections | — |
| AI 对话 | Copilot | — |
| AI 写作 | Text Generator | — |

## 学习曲线

比 Notion 陡峭，比 Vim 平缓。基础用法（写笔记、加链接）几乎零门槛，但发挥全部威力（Dataview 查询、Templater 脚本、AI 集成）需要一些学习投入。Reddit r/ObsidianMD 社区有 24 万+周活跃用户。
