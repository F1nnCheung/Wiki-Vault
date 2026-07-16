---
marp: true
theme: uncover
class:
  - lead
paginate: true
backgroundColor: "#1a1a2e"
color: "#eaeaea"
headingColor: "#f0c060"
_paginate: false
_paginationColor: "#666"
footer: "Obsidian + Claude Code 知识库分享"
---

<style>
section {
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}
h1 { font-size: 2.4em; color: #f0c060; }
h2 { font-size: 1.6em; color: #f0c060; }
h3 { font-size: 1.2em; color: #e8b84b; }
strong { color: #f0c060; }
code { background: #2a2a4a; padding: 2px 8px; border-radius: 4px; font-size: 0.85em; }
pre { background: #2a2a4a; padding: 16px; border-radius: 8px; font-size: 0.7em; }
table { font-size: 0.75em; margin: 0 auto; }
th { background: #2a2a4a; color: #f0c060; padding: 8px 16px; }
td { padding: 6px 16px; border-bottom: 1px solid #333; }
img { border-radius: 8px; }
blockquote {
  border-left: 4px solid #f0c060;
  padding-left: 20px;
  color: #ccc;
  font-style: italic;
}
.columns { display: flex; gap: 20px; }
.columns > div { flex: 1; }
</style>

# Obsidian + Claude Code<br>打造个人知识库

**从工具到方法论，构建你的第二大脑**

<br>

部门内部知识分享 · 2026 年 7 月

---

## 今天聊什么

<br>

| 🧰 | 🤖 | 🌐 |
|:---:|:---:|:---:|
| **第一部分** | **第二部分** | **第三部分** |
| Obsidian 入门 | LLM Wiki 范式 | 知识库网站部署 |
| 软件介绍 + 核心插件 | Claude Code 驱动的知识管理 | GitHub Pages 自动上线 |

---

# 第一部分

## 🧰 Obsidian：你的第二大脑

---

## Obsidian 是什么

> **本地优先、基于 Markdown 的个人知识管理工具**

所有笔记以 `.md` 纯文本保存在你的硬盘上，通过 `[[双向链接]]` 编织知识网络。

<br>

**核心理念：File over App**

> 数据永远属于你。即使 Obsidian 公司消失，任何文本编辑器都能打开你的笔记。

---

## 几个惊人的数字

<div class="columns">
<div>

### 👥 团队
- **7 人 + 1 只猫**
- 工程团队仅 3 人
- 零会议文化

### 💰 商业
- **零外部融资**
- 估值 **3.5 亿美元**
- 100% 靠用户付费

</div>
<div>

### 🔌 生态
- **2700+ 社区插件**
- 24 万+ 周活跃 Reddit 用户
- 2020 年 3 月诞生于疫情隔离

### 🎯 哲学
- 不做强制闭源 AI
- 不让资本绑架产品
- 唯一的老板 = 用户

</div>
</div>

---

## 核心特性一览

<!-- _class: default -->

| 特性 | 说明 | 为什么重要 |
|:---|:---|:---|
| 📝 **本地 Markdown** | 文件在你硬盘上 | 数据主权、可移植、Git 友好 |
| 🔗 **双向链接** | `[[笔记名]]` 自动关联 | 网状思维，自下而上组织 |
| 🗺️ **知识图谱** | 可视化笔记网络 | 发现隐藏关联 |
| 🧩 **插件系统** | 2700+ 开源插件 | 按需扩展，不臃肿 |
| 🎨 **高度可定制** | 主题、CSS 片段 | 打造专属工作环境 |

---

## Markdown：AI 时代的"通用语"

> 三个独立十亿级项目（Manus、OpenClaw、Claude Code）殊途同归，都选择 Markdown 作为 Agent 记忆层

<br>

- **Token 效率**：比 JSON/XML 高 30-50%
- **LLM 原生理解**：模型在 Markdown 上训练最多
- **人类可读**：AI 产出你也能直接看懂
- **工具链成熟**：Git diff、静态站点生成、批量处理

---

## 必备插件推荐

<!-- _class: default -->

| 类别 | 插件 | 下载量 | 解决什么问题 |
|:---|:---|:---:|:---|
| 🔄 同步 | **Git** | 230万+ | 免费多端同步 + 版本历史 |
| 📊 查询 | **Dataview** | 390万+ | 笔记数据库，类 SQL 查询 |
| 📝 模板 | **Templater** | 390万+ | 动态模板，自动填充日期/标题 |
| 📅 日历 | **Calendar** | 250万+ | 日记导航，习惯追踪 |
| ⚡ 捕获 | **QuickAdd** | — | 2 秒捕获想法，不打断心流 |
| 🖼️ 图片 | **Custom Attachment Location** | — | 图片按笔记自动归类 |
| 📤 导出 | **Enhancing Export** | — | Word/PDF/HTML/ePub 多格式导出 |

---

## 重点：Git 插件 — 免费云同步

<!-- _class: default -->

### 为什么选 Git + GitHub？

| vs | Git + GitHub | iCloud/OneDrive | Obsidian Sync |
|:---|:---:|:---:|:---:|
| 💰 费用 | 🆓 免费 | 🆓 免费 | $4/月 |
| 📜 版本历史 | ✅ 完整 | ❌ 有限 | ✅ 有 |
| 🔙 回滚 | ✅ 任意版本 | ❌ 困难 | ✅ 有 |
| 🔒 隐私 | ✅ 私有仓库 | ⚠️ 云端 | ✅ 端到端加密 |

---

## Git 插件配置（5 分钟搞定）

<!-- _class: default -->

```
1. GitHub 创建私有仓库 → 2. 克隆到本地 → 3. Obsidian 打开
                ↓
4. 创建 .gitignore       5. 安装 Git 插件         6. 配置自动同步
   .obsidian/workspace      作者 Denis Olekhov       停止编辑 1 分钟后
   .trash/                                          自动 commit + push
```

**核心配置项**：

| 配置 | 推荐值 |
|:---|:---|
| Auto commit-and-sync interval | **1 分钟** |
| Pull on startup | **开启** |
| Push on commit-and-sync | **开启** |

> 配置完就不用管了，状态栏会自动显示同步状态 ☕

---

## 多重备份策略

```
         ┌──────────────────────────────┐
         │         🔥 热备份            │
         │     GitHub 私有仓库          │
         │  实时同步 · 多端可用         │
         │                              │
         │   ┌──────────────────────┐   │
         │   │   🌡️ 温备份          │   │
         │   │   iCloud / 百度云    │   │
         │   │   每周自动备份        │   │
         │   │                      │   │
         │   │   ┌──────────────┐   │   │
         │   │   │ ❄️ 冷备份    │   │   │
         │   │   │ 移动硬盘/U盘 │   │   │
         │   │   │ 每月手动备份 │   │   │
         │   │   └──────────────┘   │   │
         │   └──────────────────────┘   │
         └──────────────────────────────┘
```

> 即使 GitHub 关闭、电脑损坏——你的笔记依然安全。

---

# 第二部分

## 🤖 Claude Code 驱动的 LLM Wiki

---

## Claude Code 是什么

**Anthropic 推出的终端 AI 编程 Agent**

比普通 AI Chat 多了一层 **"规划 + 自主执行"** 能力：

<br>

| 能力 | 说明 |
|:---|:---|
| 📂 文件操作 | 读、写、编辑项目中的所有文件 |
| 💻 命令执行 | 运行 shell 命令、脚本、测试 |
| 🔀 Git 管理 | 自动 commit、PR、分支管理 |
| 🔌 MCP 扩展 | 连接浏览器、数据库、外部 API |
| 📦 Skills 系统 | 可安装的方法论包，AI 自主调用 |

---

## 核心思想：AI 不是检索器，是编译器

> Karpathy 2026 年 4 月提出，1600 万浏览

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   raw/   ───────────►   LLM   ───────────►  wiki/   │
│  源代码                 编译器              可执行   │
│  (原始资料)            (AI Agent)         (结构化知识) │
│                                                     │
│  不可变                处理引擎            持续积累   │
│                                                     │
└─────────────────────────────────────────────────────┘

   lint = 测试（发现矛盾）     query = 运行时（提问）
```

---

## 三层架构

```
知识库/
├── raw/              ← 你收藏的文章（不可变）
│   ├── articles/        网页剪藏、PDF、公众号文章
│   ├── notes/           你的个人笔记
│   └── assets/          图片、附件
│
├── wiki/              ← AI 生成的结构化知识（持续更新）
│   ├── concepts/        概念页面（RAG、知识图谱…）
│   ├── entities/        实体页面（Claude Code、Obsidian…）
│   ├── topics/          专题页面（Git 同步指南…）
│   ├── comparisons/     对比页面（Obsidian vs Notion…）
│   ├── index.md         全局索引（每次收录后更新）
│   └── overview.md      全局概览
│
└── CLAUDE.md           ← 模式文件：告诉 AI 怎么操作
```

---

## 三个核心操作

<!-- _class: default -->

### 📥 Ingest（收录）= 编译

> 丢一篇文章进 `raw/`，AI 自动：

1. 提取关键信息 → 创建/更新概念页、实体页
2. 更新专题页 → 更新全局概览 → 更新索引
3. 追加操作日志 → 检查教程同步 → 重建网站数据

**一篇资料可能触达 10-15 个 wiki 页面！**

### 🔍 Query（查询）= 运行时

> 提问 → AI 先读索引定位 → 精读相关页 → 综合回答 + 引用

**先搜知识库，不够才联网。**

### 🔬 Lint（巡检）= 测试

> 定期健康检查：矛盾？过时？孤立页面？缺失引用？

---

## CLAUDE.md：AI 的"宪法"

```markdown
# 知识库 Schema

## 基本规则
- 所有回复使用中文
- 先搜知识库，不够才联网
- 联网后有新信息，主动询问是否收录

## 目录结构
  raw/ → wiki/ → output/

## 页面规范
- YAML frontmatter（title, type, tags, sources, related）
- 命名：英文小写 + 连字符
- 标题：中文
- 200-500 行

## 工作流
  1. Ingest  2. Query  3. Lint  4. Output
```

> 护栏，不是手册。每次 AI 犯错就加一条规则——文件是活的。

---

## 实践：从零开始的 4 步

```
┌──────────────────────────────────────────────────┐
│                                                  │
│  Step 1          Step 2          Step 3    Step 4│
│  ┌──────┐       ┌──────┐       ┌──────┐  ┌─────┐│
│  │ 创建  │  →   │ 写    │  →   │ 收录  │  │ 开始 ││
│  │ 目录  │      │CLAUDE │      │第一篇文章│  │ 提问 ││
│  │      │       │ .md  │       │      │  │     ││
│  └──────┘       └──────┘       └──────┘  └─────┘│
│                                                  │
│  raw/ + wiki/   定义规则      丢进 raw/   知识库   │
│  + CLAUDE.md   告诉 AI      对 AI 说    开始积累  │
│                 怎么干活     "收录这篇"           │
└──────────────────────────────────────────────────┘
```

> 一个最小但持续使用的 LLM Wiki，比一个用向量数据库但没人维护的 RAG 系统强一万倍。

---

## LLM Wiki vs 传统 RAG

<!-- _class: default -->

| 维度 | 传统 RAG | LLM Wiki |
|:---|:---|:---|
| 🧠 知识状态 | 无状态，每次从零发现 | **有状态，持续积累** |
| 🔧 基础设施 | 向量数据库 + Embedding | **Git + Markdown** |
| 📈 知识复利 | 无积累 | **新知识建立在旧知识之上** |
| ⚠️ 发现矛盾 | 不检测 | **Lint 主动发现** |
| 🔗 交叉引用 | 依赖检索质量 | **编译时预处理** |
| 🏠 维护负担 | 低（不需维护） | 中（AI 自动维护大部分） |

<br>

> RAG 每次查询从零发现知识——没有积累。LLM Wiki 知识编译一次，永久可用。

---

## 实际效果：这个 Vault 的数字

<!-- _class: default -->

<div class="columns">
<div>

### 📊 内容规模
- **90+** 篇 Wiki 页面
- **19** 个概念页
- **20** 个实体页
- **46** 个专题页
- **147+** 篇原始文章

</div>
<div>

### 🔗 知识网络
- 每篇页面 **5-20 条交叉引用**
- 全局索引自动维护
- 8 条核心论点贯穿全局

### 📝 教程体系
- **30+** 份系统教程
- 覆盖 AI Coding、RAG、Agent 等
- 与 Wiki **双向同步**

</div>
</div>

---

# 第三部分

## 🌐 部署个人知识库网站

---

## 网站技术栈

```
┌─────────────────────────────────────────────────┐
│                                                 │
│   📝 Markdown 源文件      Wiki/wiki/*.md         │
│              ↓                                  │
│   🐍 Python 构建脚本      Wiki/site/build.py     │
│      提取 frontmatter + 内容 → Markdown → HTML   │
│      转换 Wiki 链接 → 统计标签/类型              │
│              ↓                                  │
│   📊 结构化 JSON         Wiki/site/data/data.json│
│              ↓                                  │
│   🎨 纯前端 SPA          index.html + app.js     │
│      Hash 路由 · 搜索 · 标签云 · 明暗主题        │
│              ↓                                  │
│   🚀 GitHub Pages        .github/workflows/     │
│      自动构建 + 部署      deploy.yml             │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 前端功能一览

<!-- _class: default -->

| 功能 | 实现 |
|:---|:---|
| 🏠 **首页仪表盘** | 统计卡片 + 最近更新 + 快速导航 |
| 📚 **全部页面浏览** | 按类型/标签过滤，全文搜索 |
| 🏷️ **标签云** | 自动聚合，按使用频率排序 |
| 🔍 **搜索 (Ctrl+K)** | 全量模糊搜索，即时响应 |
| 🌓 **主题切换** | 明/暗模式，跟随系统或手动切换 |
| 📖 **教程阅读器** | 上下篇导航，完整渲染 |
| 📱 **响应式设计** | 手机/平板/桌面全适配 |

---

## GitHub Actions 自动部署

```yaml
触发条件：push 到 main 分支 + Wiki 文件变更

┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Checkout │ →  │ 构建数据  │ →  │ 验证产物  │ →  │ 部署上线  │
│  代码     │    │ build.py │    │ data.json│    │GitHub Pages│
└──────────┘    └──────────┘    └──────────┘    └──────────┘

每次更新 Wiki → 自动构建 → 自动部署 → 网站实时同步
```

### 关键配置

- **触发路径**：`Wiki/wiki/**`、`Wiki/raw/**`、`Wiki/site/**`
- **Python 版本**：3.12
- **部署目标**：GitHub Pages（免费）
- **在线地址**：`https://<用户名>.github.io/<仓库名>/`

---

## 效果：学者书房美学

<!-- _class: default -->

<div class="columns">
<div>

### 🎨 设计理念
- 宋体标题 + 铜金点缀
- 暖纸墨色阅读体验
- 克制、优雅、不喧宾夺主

</div>
<div>

### ⚡ 性能
- 零后端，纯静态
- 全量数据在一个 JSON 中
- 首次加载后完全离线可用

</div>
</div>

<br>

```
Wiki/site/
├── index.html        ← SPA 入口（100 行）
├── css/style.css     ← 完整样式系统
├── js/app.js         ← 路由 + 搜索 + 渲染（~400 行）
├── data/data.json    ← 构建产物（所有页面结构化数据）
├── build.py          ← 构建脚本（296 行）
└── requirements.txt  ← pyyaml + markdown
```

---

## 你也可以这样做

### 需要的准备工作

```
1. 一个 GitHub 账号（免费）
2. Obsidian Vault 推送为 Git 仓库
3. 写一份 CLAUDE.md（定义规则）
4. 配置 GitHub Actions 自动部署
```

### 成本

| 项目 | 费用 |
|:---|:---|
| Obsidian 个人使用 | 🆓 免费 |
| GitHub 私有仓库 | 🆓 免费 |
| GitHub Pages 托管 | 🆓 免费 |
| GitHub Actions 构建 | 🆓 免费（2000 分钟/月） |
| Claude Code API | 💰 按量付费（或接国产模型降低成本） |

> **基础设施完全免费，唯一的成本是 AI 调用。**

---

# 总结

---

## 三个关键词

<br>

<div class="columns">
<div>

### 🧰 Obsidian
数据主权 + 本地 Markdown + 双向链接 + 插件生态

**你的第二大脑**

</div>
<div>

### 🤖 Claude Code
LLM Wiki 范式 + 三层架构 + Ingest/Query/Lint

**AI 驱动的知识编译器**

</div>
<div>

### 🌐 网站部署
Python 构建 + 纯前端 SPA + GitHub Pages

**知识库即网站，一键上线**

</div>
</div>

---

## 核心金句

> **"AI 不是检索器，是编译器。"** —— Karpathy

> **"数据永远属于你。"** —— Obsidian 哲学

> **"一个最小但持续使用的 LLM Wiki，比一个用向量数据库但没人维护的 RAG 系统强一万倍。"**

> **"护栏，不是手册。"** —— CLAUDE.md 设计原则

---

## 行动起来

```
今天就试试：

1. 下载 Obsidian，建一个 Vault
2. 装 Git 插件，推到 GitHub 私有仓库
3. 在终端装 Claude Code：npm install -g @anthropic-ai/claude-code
4. 创建 raw/ + wiki/ + CLAUDE.md
5. 扔一篇文章进 raw/，对 Claude Code 说：
   "帮我收录这篇文章到知识库"
```

---

<!-- _class: lead -->

# Q & A

<br>

### 谢谢大家！

<br>

📂 本知识库在线地址：**[Wiki Vault](https://f1nncheung.github.io/Wiki-Vault/)**

