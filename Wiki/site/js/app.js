/* ══════════════════════════════════════════════════════════════
   知识库网站 — 应用逻辑
   单页应用：数据加载、搜索、导航、渲染
   ══════════════════════════════════════════════════════════════ */

// ── 全局状态 ──
const state = {
  data: null,
  currentView: "home",     // home | browse | page | search
  currentType: null,       // 类型筛选
  currentTag: null,        // 标签筛选
  currentPage: null,       // 当前查看的页面路径
  searchQuery: "",
  theme: "light",
  history: [],             // 浏览历史栈
};

// ── DOM 引用 ──
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ── 初始化 ──
async function init() {
  // 加载主题
  const saved = localStorage.getItem("kb-theme");
  if (saved) state.theme = saved;
  applyTheme();

  // 加载数据
  try {
    const resp = await fetch("data/data.json");
    state.data = await resp.json();
  } catch (e) {
    $("#app").innerHTML = `<div class="empty-state"><div class="empty-icon">⚠️</div><p>数据加载失败。请运行 <code>python3 build.py</code> 生成数据文件。</p></div>`;
    return;
  }

  // 绑定事件
  bindEvents();

  // 渲染首页
  navigate("home");
}

// ── 主题 ──
function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.theme);
  localStorage.setItem("kb-theme", state.theme);
  const btn = $("#themeBtn");
  if (btn) btn.textContent = state.theme === "dark" ? "☀️ 亮色模式" : "🌙 暗色模式";
}

function toggleTheme() {
  state.theme = state.theme === "light" ? "dark" : "light";
  applyTheme();
}

// ── 事件绑定 ──
function bindEvents() {
  // 主题切换
  $("#themeBtn").addEventListener("click", toggleTheme);

  // 搜索
  const searchInput = $("#searchInput");
  searchInput.addEventListener("input", debounce(handleSearch, 200));
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      searchInput.value = "";
      handleSearch();
    }
  });
  $("#searchClear").addEventListener("click", () => {
    searchInput.value = "";
    handleSearch();
  });

  // 移动端菜单
  $("#menuToggle").addEventListener("click", toggleSidebar);
  $("#sidebarOverlay").addEventListener("click", closeSidebar);

  // 键盘快捷键
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      searchInput.focus();
    }
  });

  // 侧边栏导航点击
  $$(".nav-item[data-view]").forEach(item => {
    item.addEventListener("click", () => navigate(item.dataset.view));
  });

  // 点击侧边栏外关闭
  $("#mainContent").addEventListener("click", (e) => {
    if (window.innerWidth <= 768 && $(".sidebar").classList.contains("open")) {
      if (!e.target.closest(".sidebar") && !e.target.closest(".menu-toggle")) {
        closeSidebar();
      }
    }
  });
}

// ── 侧边栏 ──
function toggleSidebar() {
  $(".sidebar").classList.toggle("open");
  $("#sidebarOverlay").classList.toggle("visible");
}

function closeSidebar() {
  $(".sidebar").classList.remove("open");
  $("#sidebarOverlay").classList.remove("visible");
}

// ── 导航 ──
function navigate(view, params = {}) {
  state.currentView = view;

  // 重置筛选
  if (view === "home") {
    state.currentType = null;
    state.currentTag = null;
    state.searchQuery = "";
    $("#searchInput").value = "";
  }

  if (view === "browse") {
    state.currentType = params.type || null;
    state.currentTag = null;
  }

  if (view === "tag") {
    state.currentTag = params.tag || null;
    state.currentType = null;
    view = "browse";
    state.currentView = "browse";
  }

  if (view === "page") {
    state.currentPage = params.path;
  }

  // 更新侧边栏激活状态
  updateSidebar();

  // 关闭移动端侧边栏
  if (window.innerWidth <= 768) closeSidebar();

  // 渲染视图
  renderView();

  // 滚动到顶部
  $("#mainContent").scrollTop = 0;
}

// ── 更新侧边栏 ──
function updateSidebar() {
  $$(".nav-item[data-view]").forEach(item => {
    const view = item.dataset.view;
    item.classList.toggle("active", view === state.currentView && !state.currentType);
  });

  // 更新计数
  if (state.data) {
    $("#navConceptCount").textContent = state.data.stats.concepts;
    $("#navEntityCount").textContent = state.data.stats.entities;
    $("#navTopicCount").textContent = state.data.stats.topics;
    $("#navComparisonCount").textContent = state.data.stats.comparisons;
  }

  // 渲染标签云
  renderTagCloud();
}

// ── 渲染标签云 ──
function renderTagCloud() {
  const container = $("#tagCloud");
  if (!container || !state.data) return;

  const tags = Object.entries(state.data.tags).slice(0, 40);
  container.innerHTML = tags.map(([tag, count]) => {
    const isActive = state.currentTag === tag;
    return `<button class="tag-item${isActive ? ' active' : ''}" data-tag="${escapeHtml(tag)}" title="${tag} (${count})">${escapeHtml(tag)}</button>`;
  }).join("");

  // 绑定标签点击事件
  container.querySelectorAll(".tag-item").forEach(btn => {
    btn.addEventListener("click", () => navigate("tag", { tag: btn.dataset.tag }));
  });
}

// ── 渲染视图 ──
function renderView() {
  switch (state.currentView) {
    case "home": renderHome(); break;
    case "browse": renderBrowse(); break;
    case "page": renderPageDetail(); break;
    default: renderHome();
  }
}

// ── 首页渲染 ──
function renderHome() {
  const d = state.data;
  const s = d.stats;
  const recent = d.recent_updates;
  const types = d.type_labels;

  // 统计卡片
  const statCards = [
    { n: s.wiki_pages, l: "Wiki 页面", i: "📚", v: "browse" },
    { n: s.articles, l: "原始文章", i: "📄", v: null },
    { n: s.tutorials, l: "教程文档", i: "📖", v: null },
    { n: s.entities, l: "核心实体", i: "🏢", v: "entity" },
    { n: s.topics, l: "专题页面", i: "📝", v: "topic" },
    { n: s.concepts, l: "核心概念", i: "💡", v: "concept" },
    { n: s.comparisons, l: "对比分析", i: "⚖️", v: "comparison" },
    { n: s.total_tags, l: "标签", i: "🏷️", v: null },
  ];

  const today = new Date();
  const dateStr = `${today.getFullYear()} 年 ${today.getMonth() + 1} 月 ${today.getDate()} 日`;

  let html = `
    <div class="page-header" style="text-align:center; padding-top:12px;">
      <h1 style="font-size:2em;">📚 知识库</h1>
      <p class="subtitle">今天是 ${dateStr}，欢迎回来</p>
    </div>

    <div class="stats-grid">
      ${statCards.map(c => `
        <div class="stat-card" ${c.v ? `onclick="window.app.navigate('browse', {type: '${c.v}'})"` : ""}>
          <span class="stat-icon">${c.i}</span>
          <div class="stat-num">${c.n}</div>
          <div class="stat-label">${c.l}</div>
        </div>
      `).join("")}
    </div>
  `;

  // 快速导航
  html += `
    <h2 style="font-size:1.1rem; margin-bottom:12px;">🧭 快速导航</h2>
    <div class="stats-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
      ${renderQuickNav()}
    </div>
  `;

  // 最近更新
  html += `
    <h2 style="font-size:1.1rem; margin: 24px 0 12px;">📋 最近更新</h2>
    <div class="page-list">
      ${recent.slice(0, 10).map(p => renderPageCard(p)).join("")}
    </div>
  `;

  // 教程入口
  if (d.tutorials.length) {
    const tutorialFolders = [...new Set(d.tutorials.map(t => t.folder))];
    html += `
      <h2 style="font-size:1.1rem; margin: 24px 0 12px;">📖 教程入口</h2>
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${tutorialFolders.filter(f => f !== 'root').map(folder => {
          const tutForFolder = d.tutorials.find(t => t.folder === folder);
          const count = d.tutorials.filter(t => t.folder === folder).length;
          return tutForFolder ? `
            <div style="background:var(--bg-secondary); border-radius:var(--radius-md); padding:12px 16px; border-left:4px solid var(--accent);">
              <strong>📁 ${escapeHtml(folder)}</strong>
              <span style="color:var(--text-muted); font-size:0.78em; margin-left:8px;">${count} 个文档</span>
            </div>
          ` : "";
        }).join("")}
      </div>
    `;
  }

  // 页脚
  html += `
    <div class="site-footer">
      基于 ${s.wiki_pages} 个 Wiki 页面、${s.articles} 篇原始资料构建 · 数据更新于 ${d.generated_at}
    </div>
  `;

  $("#app").innerHTML = html;

  // 重新绑定统计卡片事件（内联 onclick 引用 window.app）
  window.app = { navigate };
}

// ── 快速导航卡片 ──
function renderQuickNav() {
  const sections = [
    {
      title: "🤖 Claude Code",
      items: [
        { path: "Wiki/wiki/topics/claude-code-introduction.md", label: "📘 介绍" },
        { path: "Wiki/wiki/topics/claude-code-installation.md", label: "🔧 安装" },
        { path: "Wiki/wiki/topics/claude-code-getting-started.md", label: "⚡ 命令" },
        { path: "Wiki/wiki/topics/claude-code-mcp-ecosystem.md", label: "🔌 MCP" },
        { path: "Wiki/wiki/topics/claude-code-skills-ecosystem.md", label: "🎒 Skills" },
      ]
    },
    {
      title: "📓 Obsidian",
      items: [
        { path: "Wiki/wiki/topics/obsidian-getting-started.md", label: "🔰 入门" },
        { path: "Wiki/wiki/topics/obsidian-ai-integration.md", label: "🤖 AI 集成" },
        { path: "Wiki/wiki/topics/obsidian-capture-workflow.md", label: "📥 收集" },
        { path: "Wiki/wiki/topics/obsidian-git-sync.md", label: "☁️ 同步" },
      ]
    },
    {
      title: "🏗️ Agent & 更多",
      items: [
        { path: "Wiki/wiki/comparisons/openclaw-vs-hermes.md", label: "⚔️ OC vs Hermes" },
        { path: "Wiki/wiki/topics/hermes-agent-guide.md", label: "🏠 Hermes" },
        { path: "Wiki/wiki/topics/ai-coding-tools-comparison.md", label: "🛠️ 工具对比" },
        { path: "Wiki/wiki/topics/ai-native-startup-playbook.md", label: "🚀 创业" },
      ]
    },
    {
      title: "📚 知识库",
      items: [
        { path: "Wiki/wiki/index.md", label: "📋 知识库索引" },
        { path: "Wiki/wiki/overview.md", label: "🗺️ 全局概览" },
        { path: "Wiki/wiki/log.md", label: "📝 操作日志" },
      ]
    },
  ];

  return sections.map(s => `
    <div style="background:var(--bg-secondary); border-radius:var(--radius-md); padding:14px 16px 10px; border:1px solid var(--border-color);">
      <div style="font-weight:700; font-size:0.92em; margin-bottom:8px;">${s.title}</div>
      ${s.items.map(item => {
        const page = findPage(item.path);
        const title = page ? page.title : item.label;
        return `<div style="margin:1px 0;">
          <a href="#" class="wiki-link" data-page="${escapeHtml(item.path)}" style="font-size:0.85em; color:var(--text-secondary); text-decoration:none;">${item.label}</a>
        </div>`;
      }).join("")}
    </div>
  `).join("");
}

// ── 浏览视图 ──
function renderBrowse() {
  let pages = [...state.data.pages];
  const d = state.data;
  const typeLabel = state.currentType ? d.type_labels[state.currentType] || state.currentType : null;
  const tagLabel = state.currentTag;

  // 类型筛选
  if (state.currentType) {
    pages = pages.filter(p => p.type === state.currentType);
  }

  // 标签筛选
  if (state.currentTag) {
    pages = pages.filter(p => p.tags.includes(state.currentTag));
  }

  // 搜索筛选
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    pages = pages.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  let title = "📋 全部页面";
  if (typeLabel) title = `${getTypeIcon(state.currentType)} ${typeLabel}`;
  if (tagLabel) title = `🏷️ #${tagLabel}`;

  let html = `
    <div class="page-header">
      <h1>${title}</h1>
      <p class="subtitle">共 ${pages.length} 个页面</p>
    </div>
  `;

  // 类型筛选栏
  html += `
    <div class="filter-bar">
      <button class="filter-btn ${!state.currentType && !state.currentTag ? 'active' : ''}" onclick="window.app.navigate('browse')">全部</button>
      ${Object.entries(d.type_labels).map(([type, label]) => `
        <button class="filter-btn ${state.currentType === type ? 'active' : ''}" onclick="window.app.navigate('browse', {type: '${type}'})">${getTypeIcon(type)} ${label} (${d.stats[type + 's'] || 0})</button>
      `).join("")}
    </div>
  `;

  // 结果
  if (pages.length === 0) {
    html += `<div class="empty-state"><div class="empty-icon">🔍</div><p>没有找到匹配的页面</p></div>`;
  } else {
    html += `<div class="page-list">${pages.map(p => renderPageCard(p)).join("")}</div>`;
  }

  $("#app").innerHTML = html;
  window.app = { navigate };
  bindPageCardClicks();
}

// ── 页面详情 ──
function renderPageDetail() {
  const page = findPage(state.currentPage);
  if (!page) {
    $("#app").innerHTML = `<div class="empty-state"><div class="empty-icon">📄</div><p>页面未找到</p></div>`;
    return;
  }

  const d = state.data;
  const typeLabel = d.type_labels[page.type] || page.type;

  let html = `
    <div class="page-detail">
      <button class="back-btn" onclick="window.app.navigate('browse')">← 返回</button>

      <div class="detail-meta">
        <span class="detail-type">${getTypeIcon(page.type)} ${typeLabel}</span>
        ${page.created ? `<span class="detail-dates">创建: ${page.created}</span>` : ""}
        ${page.updated ? `<span class="detail-dates">更新: ${page.updated}</span>` : ""}
      </div>

      <h1>${escapeHtml(page.title)}</h1>

      ${page.tags && page.tags.length ? `
        <div class="detail-tags">
          ${page.tags.map(t => `<button class="tag" onclick="window.app.navigate('tag', {tag: '${escapeHtml(t)}'})">#${escapeHtml(t)}</button>`).join("")}
        </div>
      ` : ""}

      <div class="wiki-content">
        ${page.html}
      </div>
  `;

  // 相关链接
  if (page.related && page.related.length) {
    const relatedPages = page.related.map(r => findPage(r)).filter(Boolean);
    if (relatedPages.length) {
      html += `
        <div class="related-section">
          <h3>📎 相关页面</h3>
          <div class="related-links">
            ${relatedPages.map(rp => `
              <button class="related-link" onclick="window.app.navigate('page', {path: '${escapeHtml(rp.path)}'})">
                ${getTypeIcon(rp.type)} ${escapeHtml(rp.title)}
              </button>
            `).join("")}
          </div>
        </div>
      `;
    }
  }

  // 原始资料
  if (page.sources && page.sources.length) {
    html += `
      <div class="related-section" style="margin-top:16px;">
        <h3>📚 原始资料来源</h3>
        <ul style="font-size:0.85em; color:var(--text-muted); padding-left:20px; margin:0;">
          ${page.sources.map(s => `<li>${escapeHtml(s)}</li>`).join("")}
        </ul>
      </div>
    `;
  }

  html += `</div>`;
  $("#app").innerHTML = html;
  window.app = { navigate };

  // 绑定 wiki 链接点击
  $$(".wiki-link[data-page]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navigate("page", { path: link.dataset.page });
    });
  });

  // 绑定 wiki-content 内的链接
  $("#app").querySelectorAll(".wiki-content a[data-page]").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navigate("page", { path: link.dataset.page });
    });
  });
}

// ── 渲染页面卡片 ──
function renderPageCard(page) {
  return `
    <div class="page-card" data-path="${escapeHtml(page.path)}">
      <div class="page-type-badge ${page.type}">${getTypeIcon(page.type)}</div>
      <div class="page-info">
        <div class="page-title">${escapeHtml(page.title)}</div>
        ${page.summary ? `<div class="page-summary">${escapeHtml(page.summary)}</div>` : ""}
        <div class="page-meta">
          ${(page.tags || []).slice(0, 3).map(t => `<span class="page-tag">#${escapeHtml(t)}</span>`).join("")}
        </div>
        ${page.updated ? `<div class="page-date">更新: ${page.updated}</div>` : ""}
      </div>
    </div>
  `;
}

function bindPageCardClicks() {
  $$(".page-card[data-path]").forEach(card => {
    card.addEventListener("click", () => {
      navigate("page", { path: card.dataset.path });
    });
  });
}

// ── 搜索 ──
function handleSearch() {
  const query = $("#searchInput").value.trim();
  state.searchQuery = query;

  const clearBtn = $("#searchClear");
  clearBtn.classList.toggle("visible", query.length > 0);

  if (state.currentView === "home" && query) {
    navigate("browse");
  } else if (state.currentView === "browse") {
    renderBrowse();
  }
}

// ── 辅助函数 ──
function findPage(path) {
  if (!state.data) return null;
  // 精确匹配
  let page = state.data.pages.find(p => p.path === path);
  if (page) return page;
  // 模糊匹配
  const cleanPath = path.replace(".md", "").replace(/^Wiki\/wiki\//, "");
  page = state.data.pages.find(p => {
    const pClean = p.path.replace(".md", "").replace(/^Wiki\/wiki\//, "");
    return pClean === cleanPath || pClean.endsWith(cleanPath) || cleanPath.endsWith(pClean) || p.path.includes(cleanPath);
  });
  return page || null;
}

function getTypeIcon(type) {
  const icons = {
    concept: "💡",
    entity: "🏢",
    topic: "📝",
    comparison: "⚖️",
    overview: "🗺️",
  };
  return icons[type] || "📄";
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function debounce(fn, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

// ── 启动 ──
window.addEventListener("DOMContentLoaded", init);
