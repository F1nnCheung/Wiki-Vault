# 📚 Wiki Vault — LLM 驱动的 AI 全栈知识库

[![Deploy Wiki Site](https://github.com/finn/key-notes/actions/workflows/deploy.yml/badge.svg)](https://github.com/finn/key-notes/actions/workflows/deploy.yml)
[![Pages](https://img.shields.io/badge/GitHub%20Pages-在线预览-blue?logo=github)](https://finn.github.io/key-notes/)

> 一个基于 Obsidian 的结构化知识库，围绕 Claude Code、AI Coding、Agent 框架、RAG 知识库技术、低代码 AI 平台、Obsidian 知识管理、智能家居和 AI 原生创业八大主线，系统化整理了从概念到实战的完整知识体系。

---

## 📖 这是什么？

Wiki Vault 是一个 **LLM 辅助构建、人类维护** 的 AI 技术知识库。它不是一个简单的文章收藏夹——每篇原始资料都经过 AI 提取关键信息、与已有知识交叉验证、结构化重组后，形成概念页、实体页、专题页和对比页，最终织成一张相互关联的知识网络。

此外，知识库还自动生成了一套面向学习者的 **系统化教程** 和一个可在浏览器中浏览的 **静态知识网站**。

---

## 🧠 知识库全景

```
                    ┌──────────────────────────────────┐
                    │         📚 Wiki Vault             │
                    │   LLM 辅助构建的结构化知识库        │
                    └──────────────┬───────────────────┘
                                   │
     ┌──────────────┬──────────────┼──────────────┬──────────────┐
     ▼              ▼              ▼              ▼              ▼
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐   ┌─────────┐
│ Claude  │   │  Agent  │   │  RAG &  │   │ 低代码  │   │ AI原生  │
│  Code   │   │  框架   │   │  知识库  │   │ AI平台  │   │  创业   │
└─────────┘   └─────────┘   └─────────┘   └─────────┘   └─────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
        ┌──────────┐       ┌──────────┐        ┌──────────┐
        │ Obsidian │       │ 智能家居  │        │ 教程体系  │
        │ 知识管理  │       │ HA+AI   │        │ 9周学习   │
        └──────────┘       └──────────┘        └──────────┘
```

### 八大知识主线

| 主线 | 内容 | 规模 |
|------|------|------|
| **Claude Code** | 安装→命令→MCP→Skills→Superpowers→设计集成→提示词工程 | 28 篇文章 + 11 个专题 |
| **AI Coding 工具** | Cursor / Codex / Trae / Copilot 完整教程与对比 | 5 个工具 + 对比页 |
| **Agent 框架** | OpenClaw vs Hermes 九维对比 + 五层架构拆解 + 编排框架 | 2 个框架 + 3 个对比 |
| **RAG 与知识库技术** | 五阶段演进 / 优化 20 法 / 知识图谱 / Agentic RAG | 35 篇文章 + 6 个专题 |
| **低代码 AI 平台** | Coze / Dify / n8n / FastGPT / RAGFlow 对比 | 6 篇文章 + 1 个对比 |
| **Obsidian 知识管理** | 入门 / AI 集成 / 信息收集 / LLM Wiki / Git 同步 | 23 篇文章 + 6 个专题 |
| **智能家居** | Home Assistant + Hermes Agent 自然语言控制 | 3 篇文章 + 2 个专题 |
| **AI 原生创业** | OPC 六种商业模式 + Anthropic 创始人手册 | 9 篇文章 + 2 个专题 |

---

## 🗂️ 项目结构

```
Wiki Vault/
├── CLAUDE.md                  # 知识库 Schema — 目录规范与工作流定义
├── Home Page.md               # Obsidian 首页（Dataview 仪表盘）
│
├── Wiki/                      # 📦 知识库核心
│   ├── raw/                   # 原始资料（只读，不可修改）
│   │   └── articles/          # 154 篇原始文章，按主题分文件夹
│   ├── wiki/                  # LLM 生成的结构化知识库
│   │   ├── index.md           # 内容索引（所有页面的导航入口）
│   │   ├── overview.md        # 全局概览与八大知识体系
│   │   ├── log.md             # 操作日志（完整收录/维护历史）
│   │   ├── concepts/          # 概念页（19 个）— 抽象概念定义
│   │   ├── entities/          # 实体页（20 个）— 工具/产品/组织
│   │   ├── topics/            # 专题页（46 个）— 深入讨论与教程
│   │   └── comparisons/       # 对比页（5 个）— 多维度横向对比
│   ├── site/                  # 🌐 静态知识网站
│   │   ├── build.py           # Python 构建脚本（扫描 wiki → 生成 data.json）
│   │   ├── index.html         # 单页应用入口
│   │   ├── css/               # 网站样式（支持明暗主题）
│   │   ├── js/                # 前端交互逻辑
│   │   └── data/data.json     # 构建产物（所有页面的结构化数据）
│   └── output/                # 输出产物（幻灯片/图表/导出）
│
├── 教程/                      # 📖 面向学习者的系统化教程
│   └── 学习AI/                # 9 周 AI 全栈学习计划
│       ├── 01-LLM与Prompt工程/
│       ├── 02-Rule与Skills/
│       ├── 03-MCP/
│       ├── 04-AI Agent/
│       ├── 05-AI Coding/
│       ├── 06-知识库与RAG/
│       ├── 07-Dify平台实战/
│       ├── 08-Coze平台实战/
│       ├── 09-LLMOps与工程化/
│       └── 10-OPC创业变现/
│
└── .github/workflows/         # 🤖 CI/CD
    └── deploy.yml              # 自动构建并部署到 GitHub Pages
```

---

## 📊 数据统计

| 类别 | 数量 |
|------|------|
| **原始文章** | 154 篇 |
| **Wiki 页面** | 90+ 个（概念 19 / 实体 20 / 专题 46 / 对比 5 / 概览 2） |
| **教程文件** | 92 个 |
| **核心实体** | 20 个 |
| **标签** | 130+ 个 |

---

## 🌐 在线网站

每当 `Wiki/wiki/` 或 `Wiki/raw/` 下的内容发生变更并推送到 `main` 分支，GitHub Actions 会自动运行构建脚本并部署到 GitHub Pages。

网站是一个纯静态单页应用，支持：
- 📱 响应式布局（桌面/平板/手机）
- 🌓 明暗主题切换
- 🔍 全文搜索（按标题、标签、内容）
- 🔗 Wiki 链接导航（页面间相互跳转）

> 在线地址：[https://finn.github.io/key-notes/](https://finn.github.io/key-notes/)

---

## 🔧 技术栈

| 层 | 技术 |
|----|------|
| 知识库载体 | [Obsidian](https://obsidian.md) — 本地优先的 Markdown 知识管理工具 |
| 知识处理 | [Claude Code](https://claude.ai) — AI 驱动的知识提取与结构化 |
| 数据构建 | Python 3 + PyYAML + Markdown — 扫描 wiki 页面生成结构化 JSON |
| 前端展示 | 原生 HTML/CSS/JS 单页应用 — 零框架依赖，极速加载 |
| CI/CD | GitHub Actions — 自动构建 + GitHub Pages 部署 |
| 版本管理 | Git + GitHub |

---

## 🚀 本地运行

### 前置要求

- Python 3.10+
- Git

### 构建知识库数据

```bash
# 安装依赖
pip install -r Wiki/site/requirements.txt

# 构建 data.json
python3 Wiki/site/build.py
```

构建完成后，打开 `Wiki/site/index.html` 即可在浏览器中浏览知识网站。

### 在 Obsidian 中打开

1. 克隆本仓库
2. 用 [Obsidian](https://obsidian.md) 打开仓库根目录作为 Vault
3. 建议安装以下插件以获得完整体验：
   - **Dataview** — 首页仪表盘的数据查询
   - **Git** — 自动同步与版本管理

---

## 🤝 贡献指南

### 知识库维护流程

本项目使用 **LLM 辅助维护**，核心流程定义在 `CLAUDE.md` 中：

1. **收录（Ingest）** — 阅读原始资料 → 提取核心信息 → 创建/更新概念/实体/专题页 → 更新索引 → 同步教程
2. **查询（Query）** — 先搜索知识库 → 不足时联网补充 → 主动询问是否收录
3. **巡检（Lint）** — 检查页面矛盾、过时论断、孤立页面、缺失引用
4. **输出（Output）** — 生成幻灯片、图表等非 wiki 格式产物

### 如果你想贡献

- **新增资料**：将文章放入 `Wiki/raw/articles/<主题>/` 目录，然后通过 Claude Code（或其他 AI 工具）按 `CLAUDE.md` 定义的流程进行结构化
- **修正错误**：直接修改 wiki 页面并提交 PR
- **补充教程**：在 `教程/` 下新增或完善教程内容

### 页面规范

- 每个 wiki 页面必须包含 YAML frontmatter（title、type、tags、created、updated、sources、related）
- 文件名使用英文小写 + 连字符
- 页面标题使用中文
- Wiki 链接使用 `[[页面标题]]` 格式

---

## 📄 许可

本项目为个人知识库，原始文章版权归原作者所有。

---

## 🙏 致谢

- [Andrej Karpathy](https://github.com/karpathy) — LLM Wiki 理念的提出者
- [Anthropic](https://anthropic.com) — Claude Code 及 AI 能力的提供者
- 所有原始文章的作者 — 知识的源头活水
- [Obsidian](https://obsidian.md) — 让本地知识管理变得优雅

---

*最后更新：2026-06-04 · 持续维护中*
