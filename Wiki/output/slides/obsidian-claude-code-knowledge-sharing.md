---
marp: true
theme: uncover
class:
  - lead
paginate: true
backgroundColor: "#0f0f1a"
color: "#e0e0e0"
headingColor: "#f0c060"
footer: "Obsidian + Claude Code 知识库分享"
style: |
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;700;900&display=swap');
  :root {
    --accent: #f0c060;
    --accent2: #e8755a;
    --accent3: #5ab4e8;
    --dark: #0f0f1a;
    --card: #1a1a2e;
    --card2: #16213e;
  }
  section {
    font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
    font-size: 28px;
    padding: 60px 80px;
    background: var(--dark);
    background-image:
      radial-gradient(ellipse at 20% 50%, rgba(240, 192, 96, 0.04) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 20%, rgba(90, 180, 232, 0.03) 0%, transparent 50%);
  }
  section.lead {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  h1 {
    font-size: 2.2em;
    font-weight: 900;
    color: var(--accent);
    margin-bottom: 0.3em;
    letter-spacing: 0.02em;
  }
  h2 {
    font-size: 1.6em;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 0.4em;
    position: relative;
    padding-bottom: 0.3em;
  }
  h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, var(--accent), transparent);
    border-radius: 2px;
  }
  section.lead h2::after,
  section.section-divider h2::after { display: none; }
  h3 {
    font-size: 1.15em;
    font-weight: 700;
    color: var(--accent2);
    margin: 0.5em 0 0.3em;
  }
  p { margin: 0.3em 0; line-height: 1.6; }
  ul, ol { margin: 0.3em 0; padding-left: 1.2em; }
  li { margin: 0.15em 0; line-height: 1.5; }
  strong { color: var(--accent); font-weight: 700; }
  em { color: #ccc; }
  code {
    background: rgba(240, 192, 96, 0.12);
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.85em;
    color: var(--accent);
  }
  pre {
    background: var(--card);
    padding: 16px 20px;
    border-radius: 10px;
    font-size: 0.55em;
    line-height: 1.4;
    border: 1px solid rgba(255,255,255,0.06);
  }
  table {
    font-size: 0.7em;
    margin: 0.5em auto;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  }
  th {
    background: linear-gradient(135deg, #2a2a4a, #1a1a3a);
    color: var(--accent);
    padding: 10px 20px;
    font-weight: 700;
    text-align: left;
  }
  td {
    padding: 8px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    background: var(--card);
  }
  tr:last-child td { border-bottom: none; }
  blockquote {
    border-left: 4px solid var(--accent);
    padding: 10px 20px;
    margin: 0.8em 0;
    background: rgba(240, 192, 96, 0.06);
    border-radius: 0 8px 8px 0;
    font-style: italic;
    font-size: 0.85em;
    color: #c0c0c0;
  }
  .columns { display: flex; gap: 30px; }
  .columns > div { flex: 1; }
  .card {
    background: var(--card);
    border-radius: 12px;
    padding: 24px;
    border: 1px solid rgba(255,255,255,0.06);
    box-shadow: 0 8px 30px rgba(0,0,0,0.2);
  }
  .big-number {
    font-size: 2.5em;
    font-weight: 900;
    color: var(--accent);
    line-height: 1;
  }
  section.section-divider {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: linear-gradient(135deg, #0f0f1a 0%, #16213e 50%, #0f0f1a 100%);
  }
  section.section-divider h1 {
    font-size: 2.8em;
    margin-bottom: 0.2em;
  }
  section.section-divider h2 {
    font-size: 1.4em;
    color: #aaa;
  }
---

<!-- _class: lead -->

# Obsidian + Claude Code
# 打造个人知识库

<br>

**从工具到方法论，构建你的「第二大脑」**

<br>

### 部门内部知识分享 · 2026 年 7 月

---

## 今天聊什么

<div class="columns">
<div class="card" style="text-align:center;">

### 🧰

**第一部分**

### Obsidian 入门

本地知识管理工具
核心插件与 Git 同步

</div>
<div class="card" style="text-align:center;">

### 🤖

**第二部分**

### LLM Wiki 范式

Claude Code 驱动的
AI 知识库工作流

</div>
<div class="card" style="text-align:center;">

### 🌐

**第三部分**

### 网站部署

知识库即网站
GitHub Pages 自动上线

</div>
</div>

---

<!-- _class: section-divider -->

# 第一部分

## 🧰 认识 Obsidian：你的第二大脑

---

## Obsidian 是什么

> 一款**本地优先、基于 Markdown** 的个人知识管理工具。
> 所有笔记以 `.md` 纯文本保存在你的硬盘上。

<br>

<div class="columns">
<div>

### ✨ 核心理念

**File over App**

> "数据永远属于你。即使 Obsidian 公司消失，任何文本编辑器都能打开你的笔记。"

</div>
<div>

### 🔗 超级能力

**双向链接** `[[笔记名]]`

> 像神经元一样连接你的知识，自下而上地生长出知识网络。

</div>
</div>

---

## 几个让人惊讶的数字

<div class="columns">
<div class="card" style="text-align:center;">

<span class="big-number">7+1</span>

**人的团队**

工程团队仅 3 人
外加 1 只猫 🐱

零会议文化

</div>
<div class="card" style="text-align:center;">

<span class="big-number">$3.5亿</span>

**估值**

**零** 外部融资
100% 靠用户付费

唯一的老板 = 用户

</div>
<div class="card" style="text-align:center;">

<span class="big-number">2700+</span>

**社区插件**

24 万+ 周活跃用户
2020 年 3 月诞生

开源生态蓬勃

</div>
</div>

---

## 五大核心特性

<div class="columns">
<div>

| 特性 | 亮点 |
|:---|:---|
| 📝 **本地 Markdown** | 数据主权在你手里 |
| 🔗 **双向链接** | 网状思维，自下而上 |
| 🗺️ **知识图谱** | 可视化你的知识网络 |
| 🧩 **插件系统** | 2700+ 插件按需扩展 |
| 🎨 **高度定制** | 主题、CSS 随心调 |

</div>
<div class="card">

### 💡 为什么 Markdown 是 AI 时代的"通用语"

三个独立十亿级项目——**Manus**、**OpenClaw**、**Claude Code**——殊途同归，都选择了 Markdown 作为 Agent 记忆层。

- Token 效率比 JSON/XML 高 **30-50%**
- LLM 在 Markdown 上训练最多
- 人类和 AI 都能直接读写

</div>
</div>

---

## 必备插件速览

| 类别 | 插件 | 下载量 | 一句话 |
|:---|:---|:---:|:---|
| 🔄 同步 | **Git** | 230万+ | 免费多端同步，完整版本历史 |
| 📊 查询 | **Dataview** | 390万+ | 把笔记当数据库查 |
| 📝 模板 | **Templater** | 390万+ | 动态模板，自动填充 |
| 📅 日历 | **Calendar** | 250万+ | 日记导航，习惯追踪 |
| ⚡ 速记 | **QuickAdd** | — | 2 秒捕获闪念 |
| 🖼️ 图片 | **Custom Attachment Location** | — | 图片自动归类管理 |
| 📤 导出 | **Enhancing Export** | — | Word / PDF / HTML 一键导出 |

---

## 重点：Git 插件 — 免费多端同步

### ⚖️ 方案对比

| 维度 | 🆓 Git + GitHub | ☁️ iCloud | 💰 Obsidian Sync |
|:---|:---:|:---:|:---:|
| 费用 | **免费** | 免费 | $4/月 |
| 版本历史 | ✅ 完整 Git 历史 | ❌ 有限 | ✅ 有 |
| 任意回滚 | ✅ 可以 | ❌ 困难 | ✅ 可以 |
| 隐私性 | ✅ 私有仓库 | ⚠️ 云端 | ✅ 端到端加密 |

> ⚠️ 不要用 Dropbox，社区大量报告同步问题。

---

## Git 插件：5 分钟配置

```
┌──────────┐    ┌──────────┐    ┌──────────┐
│ ① GitHub │ →  │ ② 克隆到  │ →  │ ③ Obsidian │
│ 创建私有仓库 │    │    本地    │    │ 打开 Vault  │
└──────────┘    └──────────┘    └──────────┘
                                       ↓
┌──────────┐    ┌──────────┐    ┌──────────┐
│ ⑥ 自动同步 │ ←  │ ⑤ 配置   │ ←  │ ④ 创建    │
│ 搞定！☕   │    │ Git 插件  │    │ .gitignore │
└──────────┘    └──────────┘    └──────────┘
```

| 核心配置 | 推荐值 |
|:---|:---|
| Auto commit-and-sync interval | **1 分钟** |
| Pull on startup | **开启** |
| Push on commit-and-sync | **开启** |

---

## 多重备份策略

<div class="columns">
<div class="card" style="text-align:center;">

### 🔥 热备份

**GitHub 私有仓库**

实时同步
多端可用
版本回滚

</div>
<div class="card" style="text-align:center;">

### 🌡️ 温备份

**iCloud / 百度云**

每周自动
独立于 Git
异地容灾

</div>
<div class="card" style="text-align:center;">

### ❄️ 冷备份

**移动硬盘 / U盘**

每月手动
完全离线
防勒索病毒

</div>
</div>

<br>

> 三层防护：即使 GitHub 关闭、电脑损坏——你的笔记依然安全。

---

<!-- _class: section-divider -->

# 第二部分

## 🤖 Claude Code 驱动的 LLM Wiki

---

## Claude Code 是什么

**Anthropic 推出的终端 AI 编程 Agent**，能**读写文件、执行命令、管理 Git**。

> 比普通 AI Chat 多了一层「规划 + 自主执行」能力

<br>

| 能力 | 说明 |
|:---|:---|
| 📂 **文件操作** | 读、写、编辑项目中所有文件 |
| 💻 **命令执行** | 运行 Shell 命令、脚本、测试 |
| 🔀 **Git 管理** | 自动 commit、PR、分支管理 |
| 🔌 **MCP 扩展** | 连接浏览器、数据库、外部 API |
| 📦 **Skills 系统** | 安装可复用方法论包，AI 自主调用 |

---

## 核心思想：AI 不是检索器，是编译器

> Karpathy · 2026 年 4 月 · 1600 万浏览

<div class="card" style="text-align:center; padding: 32px;">

```
  raw/   ────────►    LLM    ────────►   wiki/
  ─────────────────────────────────────────────
  源代码              编译器              可执行输出
  (原始资料)         (AI Agent)         (结构化知识)

  不可变              处理引擎            持续积累
```

</div>

<br>

<div class="columns">
<div class="card" style="text-align:center;">

### 🔬 Lint

**测试**

发现矛盾
标记过时
检查孤立页面

</div>
<div class="card" style="text-align:center;">

### 🔍 Query

**运行时**

在知识库上提问
先搜库后联网
引用来源

</div>
</div>

---

## 三层架构

```
知识库/
├── raw/                          ← 你收藏的文章（不可变）
│   ├── articles/                    网页剪藏、PDF、公众号文章
│   ├── notes/                       个人笔记
│   └── assets/                      图片、附件
│
├── wiki/                          ← AI 生成的结构化知识（持续更新）
│   ├── concepts/                    概念（RAG、知识图谱…）
│   ├── entities/                    实体（Claude Code、Obsidian…）
│   ├── topics/                      专题（Git 同步指南…）
│   ├── comparisons/                 对比（Obsidian vs Notion…）
│   ├── index.md                     全局索引
│   └── overview.md                  全局概览
│
└── CLAUDE.md                      ← 模式文件：告诉 AI 怎么操作
```

---

## 操作一：Ingest（收录）= 编译

> 把一篇文章丢进 `raw/`，AI 自动完成：

<div class="columns">
<div>

```
📥 阅读原始资料
   ↓
🏷️ 提取关键信息
   ↓
📝 创建/更新概念页
📝 创建/更新实体页
   ↓
📋 更新专题页
   ↓
📊 更新全局概览
   ↓
📑 更新索引 + 追加日志
```

</div>
<div class="card">

### ✨ 一篇资料触发 10-15 个页面更新！

知识库不是简单的文章收藏——**每篇新资料都会和已有知识发生化学反应**。

- 新概念 → 新建概念页
- 新工具/人物 → 新建实体页
- 深化理解 → 更新专题页
- 改变认知 → 更新全局概览

</div>
</div>

---

## 操作二 & 三：Query + Lint

<div class="columns">
<div class="card">

### 🔍 Query（查询）

**运行时 — 在知识库上提问**

用户提问
  ↓
读 index.md 定位相关页面
  ↓
精读相关 Wiki 页面 + 原始资料
  ↓
综合回答，附带 `[[引用]]`

> **原则：先搜知识库，不够才联网。**

</div>
<div class="card">

### 🔬 Lint（巡检）

**测试 — 定期健康检查**

- ⚠️ 页面之间有没有矛盾？
- 🗑️ 有没有被新资料推翻的过时论断？
- 🏝️ 有没有孤立页面？
- 🔗 交叉引用是否断裂？
- 📝 重要概念是否缺独立页面？

> **Lint 让知识库在不断膨胀中保持健康。**

</div>
</div>

---

## CLAUDE.md：AI 的"宪法"

```markdown
# 知识库 Schema                        ← 告诉 AI 这是知识库

## 基本规则                              ← 行为准则
- 所有回复使用中文
- 先搜知识库，不够才联网
- 联网后有新信息，主动询问是否收录

## 目录结构                              ← 数据在哪
  raw/ → wiki/ → output/

## 页面规范                              ← 怎么写
- YAML frontmatter（title, type, tags, sources, related）
- 命名：英文小写 + 连字符  ·  标题：中文  ·  200-500 行

## 工作流                                ← 怎么干活
  1. Ingest（收录） 2. Query（查询） 3. Lint（巡检） 4. Output（输出）
```

> **护栏，不是手册。** 每次 AI 犯错就加一条规则——文件是活的，一直在进化。

---

## 从零开始的 4 步

<div class="columns">
<div class="card" style="text-align:center;">

### ①

**创建目录**

```
raw/
wiki/
CLAUDE.md
```

搭好骨架

</div>
<div class="card" style="text-align:center;">

### ②

**写 CLAUDE.md**

定义规则
告诉 AI
怎么干活

</div>
<div class="card" style="text-align:center;">

### ③

**丢一篇文章进 raw/**

对 AI 说：
**"帮我收录这篇"**

</div>
<div class="card" style="text-align:center;">

### ④

**开始提问**

知识库开始积累
越用越聪明

</div>
</div>

<br>

> 一个最小但持续使用的 LLM Wiki，比一个用向量数据库但没人维护的 **RAG 系统强一万倍。**

---

## LLM Wiki vs 传统 RAG

| 维度 | 传统 RAG | LLM Wiki ✨ |
|:---|:---|:---|
| 🧠 知识状态 | 无状态，每次从零发现 | **有状态，持续积累** |
| 🔧 基础设施 | 向量数据库 + Embedding | **Git + Markdown** 就够了 |
| 📈 知识复利 | 无积累 | **新知识建立在旧知识之上** |
| ⚠️ 发现矛盾 | 不检测 | **Lint 主动发现** |
| 🔗 交叉引用 | 依赖检索质量 | **编译时预处理** |
| 👤 适合规模 | 企业级百万文档 | **个人/团队 < 500 篇** |

> RAG 每次查询从零发现——没有积累。LLM Wiki **编译一次，永久可用。**

---

<!-- _class: section-divider -->

# 第三部分

## 🌐 部署个人知识库网站

---

## 网站技术栈

<div class="columns">
<div>

```
📝 Markdown 源文件
   Wiki/wiki/*.md
        ↓
🐍 Python 构建脚本
   build.py（296 行）
   提取 frontmatter
   Markdown → HTML
   转换 Wiki 链接
        ↓
📊 结构化 JSON
   data/data.json
        ↓
```

</div>
<div>

```
🎨 纯前端 SPA
   index.html（100 行）
   js/app.js（400 行）
   css/style.css
   Hash 路由 · 全文搜索
   标签云 · 明暗主题
        ↓
🚀 GitHub Pages
   .github/workflows/
   deploy.yml
   自动构建 + 部署
```

</div>
</div>

---

## 前端功能

<div class="columns">
<div>

| 功能 | 说明 |
|:---|:---|
| 🏠 首页仪表盘 | 统计卡片 + 最近更新 |
| 📚 页面浏览 | 按类型/标签过滤 |
| 🏷️ 标签云 | 自动聚合排序 |
| 🔍 搜索 | Ctrl+K 全量模糊搜索 |

</div>
<div>

| 功能 | 说明 |
|:---|:---|
| 🌓 主题切换 | 明/暗跟随系统 |
| 📖 教程阅读 | 上下篇导航 |
| 📱 响应式 | 手机/平板/桌面适配 |
| ⚡ 性能 | 零后端，纯静态 |

</div>
</div>

<br>

<div class="card">

### 🎨 设计美学：「学者书房」

**宋体标题 + 铜金点缀 · 暖纸墨色阅读体验 · 克制、优雅、不喧宾夺主**

</div>

---

## 自动部署流水线

<div class="card" style="text-align:center; padding: 28px;">

```
git push → GitHub Actions 触发
              ↓
         ┌──────────┐    ┌──────────┐    ┌──────────┐
         │ ① Checkout │ → │ ② Build   │ → │ ③ Deploy  │
         │   检出代码   │    │  build.py │    │GitHub Pages│
         └──────────┘    └──────────┘    └──────────┘
              ↓
         网站自动更新 ✨
```

</div>

<br>

**关键配置**：Push 到 main 分支 → 检测 `Wiki/wiki/**` 变更 → Python 3.12 → 部署到 GitHub Pages

> 每次更新 Wiki 内容，网站**自动同步**，无需手动操作。

---

## 零成本方案

| 服务 | 用途 | 费用 |
|:---|:---|:---:|
| 🏠 Obsidian | 本地知识管理 | 🆓 个人免费 |
| 📦 GitHub 私有仓库 | 版本控制 + 同步 | 🆓 无限私有仓库 |
| 🌐 GitHub Pages | 网站托管 | 🆓 免费托管 |
| 🔧 GitHub Actions | 自动构建部署 | 🆓 2000 分钟/月 |
| 🤖 Claude Code API | AI 驱动知识管理 | 💰 按量付费 |

<br>

<div class="card" style="text-align:center;">

### 🎯 基础设施完全免费，唯一的成本是 AI 调用

可接入 DeepSeek、GLM 等国产模型进一步降低成本

</div>

---

<!-- _class: section-divider -->

# 总结

---

## 三个关键词

<div class="columns">
<div class="card" style="text-align:center;">

### 🧰

**Obsidian**

数据主权
本地 Markdown
双向链接 + 插件生态

### 你的第二大脑

</div>
<div class="card" style="text-align:center;">

### 🤖

**Claude Code**

LLM Wiki 范式
三层架构
Ingest / Query / Lint

### AI 知识编译器

</div>
<div class="card" style="text-align:center;">

### 🌐

**网站部署**

Python 构建
纯前端 SPA
GitHub Pages

### 一键上线

</div>
</div>

---

## 四句值得记住的话

<br>

> **"AI 不是检索器，是编译器。"**
> — Andrej Karpathy

<br>

> **"数据永远属于你。"**
> — Obsidian 哲学

<br>

> **"一个最小但持续使用的 LLM Wiki，比一个用向量数据库但没人维护的 RAG 系统强一万倍。"**

<br>

> **"护栏，不是手册。"**
> — CLAUDE.md 设计原则

---

## 今天就试试

<div class="card">

```
第 1 步：下载 Obsidian，建一个 Vault

第 2 步：装 Git 插件，推送到 GitHub 私有仓库

第 3 步：安装 Claude Code
         npm install -g @anthropic-ai/claude-code

第 4 步：创建 raw/  +  wiki/  +  CLAUDE.md

第 5 步：扔一篇文章进 raw/，
         对 AI 说："帮我收录这篇文章"
```

</div>

---

<!-- _class: lead -->

# Q & A

<br>

### 谢谢大家！

<br>

📂 知识库在线地址
### [f1nncheung.github.io/Wiki-Vault](https://f1nncheung.github.io/Wiki-Vault/)
