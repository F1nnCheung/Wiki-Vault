/* ================================================================
   知识库网站 — 应用逻辑
   Hash 路由 / 系统主题检测 / 页面过渡 / TOC 自动生成
   ================================================================ */

// ── 全局状态 ──
const state = {
  data: null,
  currentView: "home",
  currentType: null,
  currentTag: null,
  currentPage: null,
  searchQuery: "",
  theme: "light",
};

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ═══════════════════════════════════════════════════════
//  初始化
// ═══════════════════════════════════════════════════════

async function init() {
  initTheme();
  applyTheme();
  createScrollToTop();

  try {
    const resp = await fetch("data/data.json");
    state.data = await resp.json();
  } catch (e) {
    $("#app").innerHTML = '<div class="empty-state"><div class="empty-icon">⚠️</div><p>数据加载失败。请运行 <code>python3 build.py</code> 生成数据文件。</p></div>';
    return;
  }

  bindEvents();
  bindGlobalDelegation();
  updateSidebarCounts();
  renderTagCloud();

  window.addEventListener("hashchange", handleHashChange);
  handleHashChange();
}

// ═══════════════════════════════════════════════════════
//  主题系统
// ═══════════════════════════════════════════════════════

function initTheme() {
  const saved = localStorage.getItem("kb-theme");
  if (saved) {
    state.theme = saved;
  } else {
    state.theme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.theme);
  localStorage.setItem("kb-theme", state.theme);
  const btn = $("#themeBtn");
  if (btn) btn.innerHTML = state.theme === "dark" ? "☀️&nbsp;亮色模式" : "🌙&nbsp;暗色模式";
}

function toggleTheme() {
  state.theme = state.theme === "light" ? "dark" : "light";
  applyTheme();
}

// ═══════════════════════════════════════════════════════
//  Hash 路由系统
// ═══════════════════════════════════════════════════════

function parseHash(hash) {
  const h = hash.replace(/^#/, "") || "/";
  if (h === "/" || h === "/home") return { view: "home" };
  if (h === "/browse") return { view: "browse" };

  const typeMatch = h.match(/^\/browse\/type\/(\w+)$/);
  if (typeMatch) return { view: "browse", type: typeMatch[1] };

  const tagMatch = h.match(/^\/browse\/tag\/(.+)$/);
  if (tagMatch) return { view: "browse", tag: decodeURIComponent(tagMatch[1]) };

  const pageMatch = h.match(/^\/page\/(.+)$/);
  if (pageMatch) return { view: "page", path: decodeURIComponent(pageMatch[1]) };

  return { view: "home" };
}

function buildHash(view, params = {}) {
  switch (view) {
    case "home": return "#/";
    case "browse":
      if (params.type) return "#/browse/type/" + params.type;
      if (params.tag) return "#/browse/tag/" + encodeURIComponent(params.tag);
      return "#/browse";
    case "page":
      return "#/page/" + encodeURIComponent(params.path);
    default: return "#/";
  }
}

function handleHashChange() {
  // 跳过 TOC 锚点（#toc-0 等），不触发路由
  if (/^#toc-\d+$/.test(location.hash)) return;
  if (location.hash === state._lastHash) return;
  state._lastHash = location.hash;

  const parsed = parseHash(location.hash);
  state.currentView = parsed.view;
  state.currentType = parsed.type || null;
  state.currentTag = parsed.tag || null;
  state.currentPage = parsed.path || null;

  if (parsed.view === "home") {
    state.searchQuery = "";
    const si = $("#searchInput");
    if (si) si.value = "";
  }

  updateSidebarActive();
  renderView();
  $("#mainContent").scrollTop = 0;
}

function navigate(view, params = {}) {
  const hash = buildHash(view, params);
  if (location.hash === hash && state._lastHash === hash) {
    handleHashChange();
  } else {
    location.hash = hash;
  }
}

// ═══════════════════════════════════════════════════════
//  滚动到顶按钮
// ═══════════════════════════════════════════════════════

function createScrollToTop() {
  const btn = document.createElement("button");
  btn.className = "scroll-top-btn";
  btn.innerHTML = "↑";
  btn.setAttribute("aria-label", "返回顶部");
  btn.addEventListener("click", () => {
    $("#mainContent").scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(btn);

  $("#mainContent").addEventListener("scroll", () => {
    btn.classList.toggle("visible", $("#mainContent").scrollTop > 300);
  });
}

// ═══════════════════════════════════════════════════════
//  事件绑定
// ═══════════════════════════════════════════════════════

function bindEvents() {
  $("#themeBtn").addEventListener("click", toggleTheme);

  const searchInput = $("#searchInput");
  searchInput.addEventListener("input", debounce(handleSearch, 200));
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { searchInput.value = ""; handleSearch(); }
  });
  $("#searchClear").addEventListener("click", () => {
    searchInput.value = ""; handleSearch();
  });

  $("#menuToggle").addEventListener("click", toggleSidebar);
  $("#sidebarOverlay").addEventListener("click", closeSidebar);

  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault(); $("#searchInput").focus();
    }
    if (e.key === "Escape" && state.currentView === "page") {
      navigate("browse");
    }
  });

  // 侧边栏导航
  $$(".nav-item[data-view], .nav-item[data-type]").forEach(item => {
    item.addEventListener("click", () => {
      const view = item.dataset.view;
      const type = item.dataset.type;
      if (type) { navigate("browse", { type }); }
      else if (view) { navigate(view); }
    });
  });

  // 点击侧边栏外关闭（移动端）
  $("#mainContent").addEventListener("click", (e) => {
    if (window.innerWidth <= 768 && $(".sidebar").classList.contains("open")) {
      if (!e.target.closest(".sidebar") && !e.target.closest(".menu-toggle")) {
        closeSidebar();
      }
    }
  });

  // 系统主题变化监听
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("kb-theme")) {
      state.theme = e.matches ? "dark" : "light";
      applyTheme();
    }
  });
}

// ═══════════════════════════════════════════════════════
//  全局事件委托（处理动态生成的内容）
// ═══════════════════════════════════════════════════════

function bindGlobalDelegation() {
  $("#app").addEventListener("click", (e) => {
    // Wiki 链接 (data-page)
    const wl = e.target.closest("[data-page]");
    if (wl) { e.preventDefault(); navigate("page", { path: wl.dataset.page }); return; }

    // 页面卡片 (data-path)
    const pc = e.target.closest("[data-path]");
    if (pc) { navigate("page", { path: pc.dataset.path }); return; }

    // 标签按钮 (data-tag)
    const tb = e.target.closest("[data-tag]");
    if (tb) { navigate("browse", { tag: tb.dataset.tag }); return; }

    // 筛选按钮 (data-filter)
    const fb = e.target.closest("[data-filter]");
    if (fb) { navigate("browse", fb.dataset.filter ? { type: fb.dataset.filter } : {}); return; }

    // 返回按钮 (data-action)
    const ab = e.target.closest("[data-action]");
    if (ab) {
      const action = ab.dataset.action;
      if (action === "back") { navigate("browse"); return; }
    }

    // 统计卡片中 "browse" 是特殊值，表示全部页面
    const sc2 = e.target.closest("[data-stat]");
    if (sc2) {
      const statType = sc2.dataset.stat;
      if (statType === "browse") { navigate("browse"); return; }
      navigate("browse", { type: statType }); return;
    }
  });
}

// ═══════════════════════════════════════════════════════
//  侧边栏
// ═══════════════════════════════════════════════════════

function toggleSidebar() {
  $(".sidebar").classList.toggle("open");
  $("#sidebarOverlay").classList.toggle("visible");
}

function closeSidebar() {
  $(".sidebar").classList.remove("open");
  $("#sidebarOverlay").classList.remove("visible");
}

// ═══════════════════════════════════════════════════════
//  更新侧边栏状态
// ═══════════════════════════════════════════════════════

function updateSidebarActive() {
  $$(".nav-item[data-view]").forEach(item => {
    item.classList.toggle("active", item.dataset.view === state.currentView && !state.currentType);
  });
  $$(".nav-item[data-type]").forEach(item => {
    item.classList.toggle("active", item.dataset.type === state.currentType);
  });
  updateSidebarCounts();
  renderTagCloud();
}

function updateSidebarCounts() {
  if (!state.data) return;
  $("#navConceptCount").textContent = state.data.stats.concepts;
  $("#navEntityCount").textContent = state.data.stats.entities;
  $("#navTopicCount").textContent = state.data.stats.topics;
  $("#navComparisonCount").textContent = state.data.stats.comparisons;
}

function renderTagCloud() {
  const container = $("#tagCloud");
  if (!container || !state.data) return;
  const tags = Object.entries(state.data.tags).slice(0, 40);
  container.innerHTML = tags.map(([tag, count]) => {
    const active = state.currentTag === tag ? " active" : "";
    return '<button class="tag-item' + active + '" data-tag="' + esc(tag) + '" title="' + esc(tag) + ' (' + count + ')">' + esc(tag) + '</button>';
  }).join("");
  container.querySelectorAll(".tag-item").forEach(btn => {
    btn.addEventListener("click", () => navigate("browse", { tag: btn.dataset.tag }));
  });
}

// ═══════════════════════════════════════════════════════
//  视图渲染（带过渡动画）
// ═══════════════════════════════════════════════════════

function renderView() {
  const app = $("#app");
  app.style.opacity = "0";
  app.style.transform = "translateY(6px)";

  setTimeout(() => {
    switch (state.currentView) {
      case "home": renderHome(); break;
      case "browse": renderBrowse(); break;
      case "page": renderPageDetail(); break;
      default: renderHome();
    }
    requestAnimationFrame(() => {
      app.style.opacity = "1";
      app.style.transform = "translateY(0)";
    });
  }, 140);
}

// ═══════════════════════════════════════════════════════
//  搜索
// ═══════════════════════════════════════════════════════

function handleSearch() {
  const query = $("#searchInput").value.trim();
  state.searchQuery = query;
  $("#searchClear").classList.toggle("visible", query.length > 0);
  if (state.currentView === "home" && query) {
    navigate("browse");
  } else if (state.currentView === "browse") {
    renderBrowse();
  }
}

// ═══════════════════════════════════════════════════════
//  首页渲染
// ═══════════════════════════════════════════════════════

function renderHome() {
  const d = state.data;
  const s = d.stats;
  const recent = d.recent_updates;

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
  const dateStr = today.getFullYear() + " 年 " + (today.getMonth() + 1) + " 月 " + today.getDate() + " 日";

  let html = '<div class="page-header" style="text-align:center; padding-top:12px;">' +
    '<h1 style="font-size:2.1em;">📚 知识库</h1>' +
    '<p class="subtitle">今天是 ' + dateStr + '，欢迎回来</p></div>';

  html += '<div class="stats-grid">' +
    statCards.map(c =>
      '<div class="stat-card"' + (c.v ? ' data-stat="' + c.v + '"' : '') + '>' +
      '<span class="stat-icon">' + c.i + '</span>' +
      '<div class="stat-num">' + c.n + '</div>' +
      '<div class="stat-label">' + c.l + '</div></div>'
    ).join("") + '</div>';

  // 快速导航
  html += '<h2 style="font-size:1.1rem; margin-bottom:12px; font-family:var(--font-display);">🧭 快速导航</h2>';
  html += '<div class="quick-nav-grid">' + renderQuickNav() + '</div>';

  // 最近更新
  html += '<h2 style="font-size:1.1rem; margin:28px 0 12px; font-family:var(--font-display);">📋 最近更新</h2>';
  html += '<div class="page-list">' + recent.slice(0, 10).map(p => renderPageCard(p)).join("") + '</div>';

  // 教程入口
  if (d.tutorials && d.tutorials.length) {
    const folders = [...new Set(d.tutorials.map(t => t.folder))].filter(f => f !== "root");
    html += '<h2 style="font-size:1.1rem; margin:28px 0 12px; font-family:var(--font-display);">📖 教程入口</h2>';
    html += '<div style="display:flex;flex-direction:column;gap:8px;">' +
      folders.map(folder => {
        const count = d.tutorials.filter(t => t.folder === folder).length;
        return '<div class="tutorial-entry"><strong>📁 ' + esc(folder) + '</strong>' +
          '<span style="color:var(--text-muted);font-size:0.78em;margin-left:8px;">' + count + ' 个文档</span></div>';
      }).join("") + '</div>';
  }

  html += '<div class="site-footer">基于 ' + s.wiki_pages + ' 个 Wiki 页面、' + s.articles +
    ' 篇原始资料构建 · 更新于 ' + d.generated_at + '</div>';

  $("#app").innerHTML = html;
}

function renderQuickNav() {
  const sections = [
    { title: "🤖 Claude Code", items: [
      { path: "Wiki/wiki/topics/claude-code-introduction.md", label: "📘 介绍" },
      { path: "Wiki/wiki/topics/claude-code-installation.md", label: "🔧 安装" },
      { path: "Wiki/wiki/topics/claude-code-getting-started.md", label: "⚡ 命令" },
      { path: "Wiki/wiki/topics/claude-code-mcp-ecosystem.md", label: "🔌 MCP" },
      { path: "Wiki/wiki/topics/claude-code-skills-ecosystem.md", label: "🎒 Skills" },
    ]},
    { title: "📓 Obsidian", items: [
      { path: "Wiki/wiki/topics/obsidian-getting-started.md", label: "🔰 入门" },
      { path: "Wiki/wiki/topics/obsidian-ai-integration.md", label: "🤖 AI 集成" },
      { path: "Wiki/wiki/topics/obsidian-capture-workflow.md", label: "📥 收集" },
      { path: "Wiki/wiki/topics/obsidian-git-sync.md", label: "☁️ 同步" },
    ]},
    { title: "🏗️ Agent & 更多", items: [
      { path: "Wiki/wiki/comparisons/openclaw-vs-hermes.md", label: "⚔️ OC vs Hermes" },
      { path: "Wiki/wiki/topics/hermes-agent-guide.md", label: "🏠 Hermes" },
      { path: "Wiki/wiki/topics/ai-coding-tools-comparison.md", label: "🛠️ 工具对比" },
      { path: "Wiki/wiki/topics/ai-native-startup-playbook.md", label: "🚀 创业" },
    ]},
  ];
  return sections.map(s =>
    '<div class="quick-nav-card">' +
    '<div class="quick-nav-title">' + s.title + '</div>' +
    s.items.map(item => {
      const page = findPage(item.path);
      const title = page ? page.title : item.label;
      return '<a href="#" class="quick-nav-item" data-page="' + esc(item.path) + '">' + item.label + '</a>';
    }).join("") + '</div>'
  ).join("");
}

// ═══════════════════════════════════════════════════════
//  浏览视图渲染
// ═══════════════════════════════════════════════════════

function renderBrowse() {
  let pages = [...state.data.pages];
  const d = state.data;
  const typeLabel = state.currentType ? d.type_labels[state.currentType] || state.currentType : null;

  if (state.currentType) pages = pages.filter(p => p.type === state.currentType);
  if (state.currentTag) pages = pages.filter(p => p.tags.includes(state.currentTag));
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    pages = pages.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  let title = "📋 全部页面";
  if (typeLabel) title = getTypeIcon(state.currentType) + " " + typeLabel;
  if (state.currentTag) title = "🏷️ #" + state.currentTag;

  let html = '<div class="page-header"><h1>' + title + '</h1>' +
    '<p class="subtitle">共 ' + pages.length + ' 个页面</p></div>';

  // 类型筛选栏
  html += '<div class="filter-bar">' +
    '<button class="filter-btn' + (!state.currentType && !state.currentTag ? ' active' : '') + '" data-filter="">全部</button>' +
    Object.entries(d.type_labels).map(([type, label]) =>
      '<button class="filter-btn' + (state.currentType === type ? ' active' : '') + '" data-filter="' + type + '">' +
      getTypeIcon(type) + ' ' + label + ' (' + (d.stats[type + 's'] || 0) + ')</button>'
    ).join("") + '</div>';

  if (pages.length === 0) {
    html += '<div class="empty-state"><div class="empty-icon">🔍</div><p>没有找到匹配的页面</p></div>';
  } else {
    html += '<div class="page-list">' + pages.map(p => renderPageCard(p, state.searchQuery)).join("") + '</div>';
  }

  $("#app").innerHTML = html;
}

function renderPageCard(page, hl) {
  return '<div class="page-card" data-path="' + esc(page.path) + '">' +
    '<div class="page-type-badge ' + page.type + '">' + getTypeIcon(page.type) + '</div>' +
    '<div class="page-info">' +
    '<div class="page-title">' + hlText(page.title, hl) + '</div>' +
    (page.summary ? '<div class="page-summary">' + hlText(page.summary, hl) + '</div>' : '') +
    '<div class="page-meta">' + (page.tags || []).slice(0, 3).map(t => '<span class="page-tag">#' + esc(t) + '</span>').join("") + '</div>' +
    (page.updated ? '<div class="page-date">更新: ' + page.updated + '</div>' : '') +
    '</div></div>';
}

// ═══════════════════════════════════════════════════════
//  页面详情渲染（含 TOC 自动生成）
// ═══════════════════════════════════════════════════════

function renderPageDetail() {
  const page = findPage(state.currentPage);
  if (!page) {
    $("#app").innerHTML = '<div class="empty-state"><div class="empty-icon">📄</div><p>页面未找到</p></div>';
    return;
  }

  const d = state.data;
  const typeLabel = d.type_labels[page.type] || page.type;

  // 生成 TOC（从 h2 提取）
  const tocResult = generateTOC(page.html);

  let html = '<div class="page-detail">' +
    '<button class="back-btn" data-action="back">← 返回</button>' +
    '<div class="detail-meta">' +
    '<span class="detail-type">' + getTypeIcon(page.type) + ' ' + typeLabel + '</span>' +
    (page.created ? '<span class="detail-dates">创建: ' + page.created + '</span>' : '') +
    (page.updated ? '<span class="detail-dates">更新: ' + page.updated + '</span>' : '') +
    '</div>' +
    '<h1>' + esc(page.title) + '</h1>';

  // 标签
  if (page.tags && page.tags.length) {
    html += '<div class="detail-tags">' +
      page.tags.map(t => '<button class="tag" data-tag="' + esc(t) + '">#' + esc(t) + '</button>').join("") +
      '</div>';
  }

  // 目录
  if (tocResult.headings.length > 1) {
    html += '<details class="toc-container" open><summary class="toc-title">📑 目录</summary><nav class="toc-list">' +
      tocResult.headings.map(h => '<a href="#' + h.id + '" class="toc-link">' + esc(h.text) + '</a>').join("") +
      '</nav></details>';
  }

  // Wiki 内容（已带 id 的版本）
  html += '<div class="wiki-content">' + tocResult.html + '</div>';

  // 相关页面
  if (page.related && page.related.length) {
    const relatedPages = page.related.map(r => findPage(r)).filter(Boolean);
    if (relatedPages.length) {
      html += '<div class="related-section"><h3>📎 相关页面</h3><div class="related-links">' +
        relatedPages.map(rp =>
          '<button class="related-link" data-page="' + esc(rp.path) + '">' + getTypeIcon(rp.type) + ' ' + esc(rp.title) + '</button>'
        ).join("") + '</div></div>';
    }
  }

  // 原始资料
  if (page.sources && page.sources.length) {
    html += '<div class="related-section" style="margin-top:16px;"><h3>📚 原始资料来源</h3>' +
      '<ul style="font-size:0.84em;color:var(--text-muted);padding-left:20px;margin:0;">' +
      page.sources.map(s => '<li>' + esc(s) + '</li>').join("") + '</ul></div>';
  }

  html += '</div>';
  $("#app").innerHTML = html;
}

// ═══════════════════════════════════════════════════════
//  TOC 自动生成（从 h2 标签提取）
// ═══════════════════════════════════════════════════════

function generateTOC(html) {
  const h2Regex = /<h2>(.*?)<\/h2>/g;
  const headings = [];
  let index = 0;

  const newHtml = html.replace(h2Regex, (full, text) => {
    const id = "toc-" + index;
    const plainText = text.replace(/<[^>]+>/g, "").trim();
    headings.push({ id: id, text: plainText });
    index++;
    return '<h2 id="' + id + '">' + text + '</h2>';
  });

  return { html: newHtml, headings };
}

// ═══════════════════════════════════════════════════════
//  辅助函数
// ═══════════════════════════════════════════════════════

function findPage(path) {
  if (!state.data || !path) return null;
  let page = state.data.pages.find(p => p.path === path);
  if (page) return page;
  const pathNoMd = path.replace(/\.md$/, "");
  page = state.data.pages.find(p => p.path.replace(/\.md$/, "") === pathNoMd);
  if (page) return page;
  const pathBasename = pathNoMd.split("/").pop();
  page = state.data.pages.find(p => {
    return p.path.replace(/\.md$/, "").endsWith("/" + pathBasename);
  });
  if (page) return page;
  if (!path.startsWith("Wiki/wiki/")) {
    const wikiPath = "Wiki/wiki/" + pathNoMd.replace(/^(Wiki\/wiki\/)?/, "");
    page = state.data.pages.find(p => p.path.replace(/\.md$/, "") === wikiPath);
    if (page) return page;
  }
  return null;
}

function getTypeIcon(type) {
  const icons = { concept: "💡", entity: "🏢", topic: "📝", comparison: "⚖️", overview: "🗺️" };
  return icons[type] || "📄";
}

function hlText(text, query) {
  const safe = esc(text);
  if (!query) return safe;
  const q = esc(query);
  const re = new RegExp("(" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi");
  return safe.replace(re, '<span class="search-highlight">$1</span>');
}

function esc(str) {
  if (!str) return "";
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function debounce(fn, ms) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

// ═══════════════════════════════════════════════════════
//  启动
// ═══════════════════════════════════════════════════════

window.addEventListener("DOMContentLoaded", init);

// 全局暴露（兼容内联 onclick）
window.appNav = navigate;
