---
title: 首页
type: homepage
created: 2026-05-28
updated: 2026-05-28
---

```dataviewjs
// ═══════════════ 顶部问候 ═══════════════
const root = dv.container;

const header = root.createEl("div");
header.style.cssText = "text-align: center; padding: 24px 0 0 0; margin-bottom: 16px;";

const h1 = header.createEl("h1");
h1.style.cssText = "font-size: 2em; font-weight: 700; margin: 0 0 4px 0; letter-spacing: -0.02em;";
h1.textContent = "📚 知识库";

const dateLine = header.createEl("p");
dateLine.style.cssText = "font-size: 1em; color: var(--text-muted); margin: 0;";
const now = moment();
dateLine.textContent = `今天是 ${now.format("YYYY 年 M 月 D 日 (ddd)")}，欢迎回来`;
```

---

```dataviewjs
// ═══════════════ 数据概览卡片 ═══════════════
const wikiPages = dv.pages('"Wiki/wiki"');
const articles = dv.pages('"Wiki/raw/articles"').file.length;
const entities = wikiPages.where(p => p.type === "entity").length;
const topics = wikiPages.where(p => p.type === "topic").length;

const row = dv.container;
row.style.cssText = "display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 20px;";

[
  { v: wikiPages.length, l: "Wiki 页面", i: "📚" },
  { v: articles, l: "原始文章", i: "📄" },
  { v: 3, l: "综合教程", i: "📖" },
  { v: entities, l: "核心实体", i: "🏢" },
  { v: topics, l: "专题页面", i: "📝" },
].forEach(s => {
  const card = row.createEl("div");
  card.style.cssText = "flex:1; min-width:90px; max-width:130px; background:var(--background-secondary); border-radius:10px; padding:12px 8px; text-align:center; border:1px solid var(--background-modifier-border);";
  const num = card.createEl("div");
  num.style.cssText = "font-size:1.7em; font-weight:800; color:var(--text-accent);";
  num.textContent = String(s.v);
  const lbl = card.createEl("div");
  lbl.style.cssText = "font-size:0.73em; color:var(--text-muted); margin-top:2px;";
  lbl.textContent = `${s.i} ${s.l}`;
});
```

---

## 🧭 快速导航

```dataviewjs
const nav = [
  ["📖 知识库", [
    ["Wiki/wiki/index", "📋 知识库索引"],
    ["Wiki/wiki/overview", "🗺️ 全局概览"],
    ["Wiki/wiki/log", "📝 操作日志"],
    ["教程/知识库/知识库技术学习指南", "🧠 知识库技术"],
  ]],
  ["🤖 Claude Code", [
    ["Wiki/wiki/topics/claude-code-introduction", "📘 介绍"],
    ["Wiki/wiki/topics/claude-code-installation", "🔧 安装"],
    ["Wiki/wiki/topics/claude-code-getting-started", "⚡ 命令"],
    ["Wiki/wiki/topics/claude-code-prompt-engineering", "🎯 提示词"],
    ["Wiki/wiki/topics/claude-code-mcp-ecosystem", "🔌 MCP"],
    ["Wiki/wiki/topics/claude-code-skills-ecosystem", "🎒 Skills"],
  ]],
  ["📓 Obsidian", [
    ["Wiki/wiki/topics/obsidian-getting-started", "🔰 入门"],
    ["Wiki/wiki/topics/obsidian-ai-integration", "🤖 AI 集成"],
    ["Wiki/wiki/topics/obsidian-capture-workflow", "📥 收集"],
    ["Wiki/wiki/topics/obsidian-git-sync", "☁️ 同步"],
    ["Wiki/wiki/topics/obsidian-plugins-advanced", "🔌 插件"],
  ]],
  ["🏗️ Agent & 更多", [
    ["Wiki/wiki/comparisons/openclaw-vs-hermes", "⚔️ OC vs Hermes"],
    ["Wiki/wiki/topics/hermes-agent-guide", "🏠 Hermes"],
    ["Wiki/wiki/topics/ai-coding-tools-comparison", "🛠️ 工具对比"],
    ["Wiki/wiki/topics/ai-native-startup-playbook", "🚀 创业"],
    ["Wiki/wiki/topics/hermes-home-assistant-integration", "🏡 智能家居"],
  ]],
];

const grid = dv.container;
grid.style.cssText = "display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:12px; margin-bottom:20px;";

nav.forEach(([title, links]) => {
  const card = grid.createEl("div");
  card.style.cssText = "background:var(--background-primary-alt); border-radius:10px; padding:14px 16px 10px; border:1px solid var(--background-modifier-border);";
  const h3 = card.createEl("div");
  h3.style.cssText = "font-weight:700; font-size:0.95em; margin-bottom:6px;";
  h3.textContent = title;

  links.forEach(([path, label]) => {
    const div = card.createEl("div");
    div.style.cssText = "margin:1px 0;";
    const a = div.createEl("a");
    a.textContent = label;
    a.setAttr("data-href", path + ".md");
    a.setAttr("href", path + ".md");
    a.addClass("internal-link");
    a.style.cssText = "font-size:0.88em; color:var(--text-normal); text-decoration:none;";
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
const tut = [
  ["教程/AI-Coding/AI Coding 学习计划", "📖 AI Coding 学习计划", "从零开始的系统学习路径（1072 行）→ 发展历程 / 五大工具 / Agent / 拓展"],
  ["教程/知识库/知识库技术学习指南", "🧠 知识库技术学习指南", "知识库技术总纲（451 行）→ RAG / 优化 20 法 / 知识图谱 / LLM Wiki"],
  ["教程/Obsidian/01-入门与核心理念", "📓 Obsidian 完整教程", "从入门到 AI 集成的 9 章系统教程 → 入门 / 核心功能 / 插件 / Git / AI"],
];

const list = dv.container;
list.style.cssText = "display:flex; flex-direction:column; gap:8px; margin-bottom:20px;";

tut.forEach(([path, title, desc]) => {
  const card = list.createEl("div");
  card.style.cssText = "background:var(--background-primary-alt); border-radius:10px; padding:12px 16px; border-left:4px solid var(--text-accent);";
  const link = card.createEl("a");
  link.style.cssText = "font-weight:700; font-size:0.93em; text-decoration:none; color:var(--text-normal); display:block; margin-bottom:2px;";
  link.textContent = title;
  link.setAttr("data-href", path + ".md");
  link.setAttr("href", path + ".md");
  link.addClass("internal-link");
  const sub = card.createEl("div");
  sub.style.cssText = "font-size:0.78em; color:var(--text-muted);";
  sub.textContent = desc;
});
```

---

## 🔄 今日推荐阅读

```dataviewjs
const notes = dv.pages('"Wiki/wiki"').file.filter(f => f.path?.endsWith(".md"));
const ctr = dv.container;
ctr.style.cssText = "background:var(--background-primary-alt); border-radius:10px; padding:14px 18px; border-left:4px solid var(--text-accent); margin-bottom:20px;";

if (!notes.length) {
  ctr.textContent = "暂无页面";
} else {
  const today = new Date().toISOString().slice(0, 10);
  const seed = parseInt(today.replace(/-/g, ""));
  const idx = Math.abs(Math.floor(Math.sin(seed) * notes.length)) % notes.length;
  const note = notes[idx];

  const pre = ctr.createEl("span");
  pre.style.cssText = "color:var(--text-muted);";
  pre.textContent = "🔄 基于今日日期推荐：";

  const linkEl = ctr.createEl("a");
  linkEl.textContent = note.name || "未命名";
  linkEl.setAttr("data-href", note.path);
  linkEl.setAttr("href", note.path);
  linkEl.addClass("internal-link");
  linkEl.style.cssText = "font-weight:600; color:var(--text-accent); text-decoration:none; margin-left:4px;";
}
```

---

<div style="text-align: center; padding-top: 12px; margin-top: 8px; border-top: 1px solid var(--background-modifier-border); color: var(--text-muted); font-size: 0.8em; font-style: italic;">
"工具是次要的。找到自己的方式，才重要。" — 林大友
</div>
