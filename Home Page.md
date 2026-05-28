---
title: 首页
type: homepage
created: 2026-05-28
updated: 2026-05-28
---

# 知识库

> 今天是 `=dateformat(date(today), "yyyy 年 M 月 d 日 (EEE)")`，欢迎回来。

---

## 快速导航

| 📖 知识库 | 🛠️ AI Coding | 📓 Obsidian | 🏗️ Agent 框架 |
|:--|:--|:--|:--|
| [[Wiki/wiki/index|知识库索引]] | [[Claude Code 介绍|Claude Code]] | [[Obsidian 入门指南|入门指南]] | [[Agent 框架对比索引|框架对比]] |
| [[Wiki/wiki/overview|全局概览]] | [[Claude Code 安装与配置|安装配置]] | [[Obsidian AI 集成方案|AI 集成]] | [[OpenClaw vs Hermes 深度对比|OpenClaw vs Hermes]] |
| [[Wiki/wiki/log|操作日志]] | [[Claude Code 命令与日常使用|命令日常]] | [[Obsidian 信息收集工作流|信息收集]] | [[Hermes Agent 完整教程|Hermes 教程]] |
| [[知识库技术学习指南|知识库技术]] | [[AI Coding 学习计划|学习计划]] | [[Obsidian Git 云同步指南|Git 同步]] | [[AI Agent|AI Agent 概念]] |

---

## 最近更新

```dataview
TABLE
  dateformat(updated, "MM-dd") AS "更新",
  type AS "类型",
  file.etags AS "标签"
FROM "Wiki/wiki"
WHERE updated
SORT updated DESC
LIMIT 12
```

---

## 教程入口

- 📖 [[AI Coding 学习计划]] — 从零开始的 AI Coding 系统学习路径（1072 行综合教程）
- 📖 [[知识库技术学习指南]] — 知识库技术总纲：RAG → 知识图谱 → LLM Wiki（451 行综合教程）
- 📖 [[教程/Obsidian/01-入门与核心理念|Obsidian 完整教程]] — 从入门到 AI 集成的 9 章系统教程

---

## 知识库概览

```dataviewjs
const wikiPages = dv.pages('"Wiki/wiki"');
const concepts = wikiPages.where(p => p.type === "concept").length;
const entities = wikiPages.where(p => p.type === "entity").length;
const topics = wikiPages.where(p => p.type === "topic").length;
const comparisons = wikiPages.where(p => p.type === "comparison").length;
const total = wikiPages.length;

dv.table(
  ["指标", "数量"],
  [
    ["📚 Wiki 页面总计", total],
    ["💡 概念页面", concepts],
    ["🏢 实体页面", entities],
    ["📝 专题页面", topics],
    ["⚖️ 对比页面", comparisons],
    ["📄 原始文章", dv.pages('"Wiki/raw/articles"').file.length]
  ]
);
```

---

## 核心主题

```dataviewjs
const sections = [
  { name: "Claude Code", icon: "🤖", query: '"Wiki/wiki/topics" and #claude-code' },
  { name: "AI Coding 工具", icon: "🛠️", query: '"Wiki/wiki/entities" and #ai-coding' },
  { name: "Agent 框架", icon: "🏗️", query: '"Wiki/wiki" and #agent' },
  { name: "Obsidian 知识管理", icon: "📓", query: '"Wiki/wiki" and #obsidian' },
  { name: "知识库技术", icon: "🧠", query: '"Wiki/wiki" and #rag' },
  { name: "AI 原生创业", icon: "🚀", query: '"Wiki/wiki" and #startup' }
];

const rows = [];
for (const s of sections) {
  const pages = dv.pages(s.query);
  const links = pages.file.link.array().slice(0, 3);
  rows.push([
    `${s.icon} **${s.name}**`,
    `${pages.length} 页 · ${links.map(l => `[[${l.path}|→]]`).join(" ")}`
  ]);
}

dv.table(["主题", "概况"], rows);
```

---

## 随机发现

```dataviewjs
const allNotes = dv.pages('"Wiki/wiki"').file
    .filter(f => f.path && f.path.endsWith(".md"));

if (allNotes.length === 0) {
    dv.paragraph("*暂无页面*");
} else {
    const today = new Date().toISOString().slice(0, 10);
    const seed = parseInt(today.replace(/-/g, ""));
    const randomIndex = Math.abs(Math.floor(Math.sin(seed) * allNotes.length)) % allNotes.length;
    const randomNote = allNotes[randomIndex];

    dv.paragraph(`🔄 今日推荐阅读：[[${randomNote.path}|${randomNote.name || "未命名"}]]`);
}
```

---

> "工具是次要的。找到自己的方式，才重要。"
> — 林大友
