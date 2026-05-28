---
title: 首页
type: homepage
created: 2026-05-28
updated: 2026-05-28
---

<!-- ═══════════════ 顶部问候 ═══════════════ -->
<div style="text-align: center; padding: 28px 0 4px 0;">
<h1 style="font-size: 2.2em; font-weight: 700; margin: 0 0 6px 0; letter-spacing: -0.02em;">📚 知识库</h1>
<p style="font-size: 1.05em; color: var(--text-muted); margin: 0;">
今天是 <code style="font-size: 1em;">`=dateformat(date(today), "yyyy 年 M 月 d 日 (EEE)")`</code>，欢迎回来
</p>
</div>

---

<!-- ═══════════════ 数据概览卡片 ═══════════════ -->

```dataviewjs
const wikiPages = dv.pages('"Wiki/wiki"');
const concepts = wikiPages.where(p => p.type === "concept").length;
const entities = wikiPages.where(p => p.type === "entity").length;
const topics = wikiPages.where(p => p.type === "topic").length;
const comparisons = wikiPages.where(p => p.type === "comparison").length;
const total = wikiPages.length;
const articles = dv.pages('"Wiki/raw/articles"').file.length;

const container = dv.container;
container.style.display = "flex";
container.style.gap = "10px";
container.style.flexWrap = "wrap";
container.style.justifyContent = "center";
container.style.margin = "0 0 20px 0";

const stats = [
  { label: "Wiki 页面", value: total, icon: "📚" },
  { label: "原始文章", value: articles, icon: "📄" },
  { label: "综合教程", value: 3, icon: "📖" },
  { label: "核心实体", value: entities, icon: "🏢" },
  { label: "专题页面", value: topics, icon: "📝" },
];

stats.forEach(s => {
  const card = container.createEl("div");
  card.style.cssText = `
    flex: 1; min-width: 95px; max-width: 140px;
    background: var(--background-secondary);
    border-radius: 10px; padding: 12px 10px; text-align: center;
    border: 1px solid var(--background-modifier-border);
  `;
  const num = card.createEl("div");
  num.style.cssText = "font-size: 1.8em; font-weight: 800; color: var(--text-accent);";
  num.textContent = s.value;
  const lbl = card.createEl("div");
  lbl.style.cssText = "font-size: 0.75em; color: var(--text-muted); margin-top: 2px;";
  lbl.textContent = `${s.icon} ${s.label}`;
});
```

---

## 🧭 快速导航

```dataviewjs
const navSections = [
  {
    icon: "📖", title: "知识库",
    links: [
      ["Wiki/wiki/index", "📋 知识库索引"],
      ["Wiki/wiki/overview", "🗺️ 全局概览"],
      ["Wiki/wiki/log", "📝 操作日志"],
      ["知识库技术学习指南", "🧠 知识库技术指南"],
    ]
  },
  {
    icon: "🤖", title: "Claude Code",
    links: [
      ["Claude Code 介绍", "📘 介绍与概念"],
      ["Claude Code 安装与配置", "🔧 安装与配置"],
      ["Claude Code 命令与日常使用", "⚡ 命令与使用"],
      ["Claude Code 提示词工程", "🎯 提示词工程"],
      ["MCP 生态系统", "🔌 MCP 生态"],
      ["Skills 生态系统", "🎒 Skills 生态"],
    ]
  },
  {
    icon: "📓", title: "Obsidian 知识管理",
    links: [
      ["Obsidian 入门指南", "🔰 入门指南"],
      ["Obsidian AI 集成方案", "🤖 AI 集成方案"],
      ["Obsidian 信息收集工作流", "📥 信息收集"],
      ["Obsidian Git 云同步指南", "☁️ Git 云同步"],
      ["Obsidian 插件进阶指南", "🔌 插件进阶"],
    ]
  },
  {
    icon: "🏗️", title: "Agent 框架 & 更多",
    links: [
      ["Agent 框架对比索引", "⚔️ 框架对比"],
      ["OpenClaw vs Hermes 深度对比", "🔍 深度对比"],
      ["Hermes Agent 完整教程", "🏠 Hermes 教程"],
      ["AI Coding 工具全景对比", "🛠️ 工具对比"],
      ["AI 原生创业手册", "🚀 AI 原生创业"],
      ["Hermes + Home Assistant 集成", "🏡 智能家居"],
    ]
  },
];

const container = dv.container;
container.style.display = "grid";
container.style.gridTemplateColumns = "repeat(auto-fit, minmax(240px, 1fr))";
container.style.gap = "12px";
container.style.marginBottom = "20px";

navSections.forEach(section => {
  const card = container.createEl("div");
  card.style.cssText = `
    background: var(--background-primary-alt);
    border-radius: 10px; padding: 14px 16px 10px 16px;
    border: 1px solid var(--background-modifier-border);
  `;
  const h3 = card.createEl("h3");
  h3.style.cssText = "margin: 0 0 8px 0; font-size: 1em;";
  h3.textContent = `${section.icon} ${section.title}`;

  section.links.forEach(([page, label]) => {
    const row = card.createEl("div");
    row.style.cssText = "margin: 2px 0;";
    const link = row.createEl("a");
    link.style.cssText = "font-size: 0.88em; color: var(--text-normal); text-decoration: none;";
    link.textContent = label;
    link.href = page;
    link.addClass("internal-link");
  });
});
```

---

## 📋 最近更新

```dataview
TABLE WITHOUT ID
  file.link AS "页面",
  dateformat(updated, "MM-dd") AS "更新",
  type AS "类型"
FROM "Wiki/wiki"
WHERE updated
SORT updated DESC
LIMIT 10
```

---

## 📖 教程入口

```dataviewjs
const tutorials = [
  {
    icon: "📖", title: "AI Coding 学习计划",
    desc: "从零开始的系统学习路径（1072 行）",
    sub: "发展历程 → 五大工具教程 → Agent 框架 → 拓展使用",
    link: "教程/AI-Coding/AI Coding 学习计划",
  },
  {
    icon: "🧠", title: "知识库技术学习指南",
    desc: "知识库技术总纲（451 行）",
    sub: "RAG 三大架构 → 优化 20 法 → 知识图谱 → LLM Wiki",
    link: "教程/知识库/知识库技术学习指南",
  },
  {
    icon: "📓", title: "Obsidian 完整教程",
    desc: "从入门到 AI 集成的 9 章系统教程",
    sub: "入门 → 核心功能 → 插件系统 → Git 同步 → AI 集成",
    link: "教程/Obsidian/01-入门与核心理念",
  },
];

const container = dv.container;
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.gap = "10px";
container.style.marginBottom = "20px";

tutorials.forEach(t => {
  const card = container.createEl("a");
  card.style.cssText = `
    display: block; background: var(--background-primary-alt);
    border-radius: 10px; padding: 12px 16px; text-decoration: none;
    border-left: 4px solid var(--text-accent);
    transition: background 0.15s;
  `;
  card.href = t.link;
  card.addClass("internal-link");

  const header = card.createEl("div");
  header.style.cssText = "font-weight: 600; font-size: 0.95em; margin-bottom: 2px;";
  header.textContent = `${t.icon} ${t.title} — ${t.desc}`;

  const sub = card.createEl("div");
  sub.style.cssText = "font-size: 0.8em; color: var(--text-muted);";
  sub.textContent = t.sub;
});
```

---

## 🔄 今日推荐阅读

```dataviewjs
const allNotes = dv.pages('"Wiki/wiki"').file
    .filter(f => f.path && f.path.endsWith(".md"));

const container = dv.container;
container.style.cssText = `
  background: var(--background-primary-alt);
  border-radius: 10px; padding: 14px 18px;
  border-left: 4px solid var(--text-accent);
  margin-bottom: 20px;
`;

if (allNotes.length === 0) {
  container.innerHTML = `<span style="color: var(--text-muted);">暂无页面</span>`;
} else {
  const today = new Date().toISOString().slice(0, 10);
  const seed = parseInt(today.replace(/-/g, ""));
  const randomIndex = Math.abs(Math.floor(Math.sin(seed) * allNotes.length)) % allNotes.length;
  const randomNote = allNotes[randomIndex];

  const prefix = container.createEl("span");
  prefix.style.cssText = "color: var(--text-muted);";
  prefix.textContent = "🔄 基于今日日期推荐：";

  const linkEl = container.createEl("a");
  linkEl.style.cssText = "font-weight: 600; color: var(--text-accent); text-decoration: none; margin-left: 4px;";
  linkEl.textContent = randomNote.name || "未命名";
  linkEl.href = randomNote.path;
  linkEl.addClass("internal-link");
}
```

---

<!-- ═══════════════ 页脚 ═══════════════ -->
<div style="text-align: center; padding: 4px 0 20px 0; color: var(--text-muted); font-size: 0.82em; font-style: italic; border-top: 1px solid var(--background-modifier-border); margin-top: 4px;">
"工具是次要的。找到自己的方式，才重要。" — 林大友
</div>
