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
  currentTutFolder: null,
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
  createProgressBar();

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

  const tutorialMatch = h.match(/^\/tutorial\/(.+)$/);
  if (tutorialMatch) return { view: "tutorial", path: decodeURIComponent(tutorialMatch[1]) };

  const tutFolderMatch = h.match(/^\/tutorials\/(.+)$/);
  if (tutFolderMatch) return { view: "tutorialFolder", folder: decodeURIComponent(tutFolderMatch[1]) };

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
    case "tutorial":
      return "#/tutorial/" + encodeURIComponent(params.path);
    case "tutorialFolder":
      return "#/tutorials/" + encodeURIComponent(params.folder);
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
  state.currentTutFolder = parsed.folder || null;

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
//  阅读进度条
// ═══════════════════════════════════════════════════════

function createProgressBar() {
  const bar = document.createElement("div");
  bar.className = "reading-progress";
  bar.id = "readingProgress";
  document.body.appendChild(bar);

  $("#mainContent").addEventListener("scroll", () => {
    const main = $("#mainContent");
    const scrollTop = main.scrollTop;
    const scrollHeight = main.scrollHeight - main.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = Math.min(pct, 100) + "%";
  });
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
    if (e.key === "Escape" && (state.currentView === "page" || state.currentView === "tutorial" || state.currentView === "tutorialFolder")) {
      navigate(state.currentView === "page" ? "browse" : "home");
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
    // 阻止所有 # 锚点的默认跳转
    if (e.target.closest('a[href="#"]')) e.preventDefault();

    // TOC 链接：滚动到对应标题而非修改 URL hash
    const tocLink = e.target.closest('a.toc-link[href^="#"]');
    if (tocLink) {
      e.preventDefault();
      const id = tocLink.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); }
      return;
    }

    // Wiki 链接 (data-page)
    const wl = e.target.closest("[data-page]");
    if (wl) { navigate("page", { path: wl.dataset.page }); return; }

    // 页面卡片 (data-path)
    const pc = e.target.closest("[data-path]");
    if (pc) { navigate("page", { path: pc.dataset.path }); return; }

    // 标签按钮 (data-tag)
    const tb = e.target.closest("[data-tag]");
    if (tb) { navigate("browse", { tag: tb.dataset.tag }); return; }

    // 筛选按钮 (data-filter)
    const fb = e.target.closest("[data-filter]");
    if (fb) { navigate("browse", fb.dataset.filter ? { type: fb.dataset.filter } : {}); return; }

    // 动作按钮 (data-action: back, home, browse)
    const ab = e.target.closest("[data-action]");
    if (ab) {
      e.preventDefault();
      const action = ab.dataset.action;
      if (action === "home") { navigate("home"); return; }
      if (action === "browse") { navigate("browse"); return; }
      if (action === "back") { navigate("browse"); return; }
      if (action === "open-tutorial") {
        const tp = ab.dataset.tutpath;
        if (tp) {
          navigate("tutorial", { path: tp });
        }
        return;
      }
      if (action === "tutorial-folder") {
        const tf = ab.dataset.folder;
        if (tf !== undefined) {
          navigate("tutorialFolder", { folder: tf });
        }
        return;
      }
    }

    // 统计卡片中 "browse" 是特殊值，表示全部页面
    const sc2 = e.target.closest("[data-stat]");
    if (sc2) {
      const statType = sc2.dataset.stat;
      if (statType === "browse") { navigate("browse"); return; }
      if (statType === "tutorials") {
        const el = document.getElementById("tutorial-section");
        if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); }
        return;
      }
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
  // 页面详情视为"全部页面"的子视图，教程/教程文件夹视为"首页"的子视图
  const activeView = state.currentView === "page" ? "browse" :
                     (state.currentView === "tutorial" || state.currentView === "tutorialFolder") ? "home" : state.currentView;
  $$(".nav-item[data-view]").forEach(item => {
    item.classList.toggle("active", item.dataset.view === activeView && !state.currentType);
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
  $("#navTagCount").textContent = state.data.stats.total_tags;
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
      case "tutorial": renderTutorialDetail(); break;
      case "tutorialFolder": renderTutorialFolder(); break;
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
  } else if (query && (state.currentView === "page" || state.currentView === "tutorial" || state.currentView === "tutorialFolder")) {
    // 从详情页搜索时跳转到浏览视图
    navigate("browse");
  }
}

// ═══════════════════════════════════════════════════════
//  首页渲染
// ═══════════════════════════════════════════════════════

function renderHome() {
  const d = state.data;
  const s = d.stats || {};
  const recent = d.recent_updates || [];
  const topFolders = new Set((d.tutorials || []).map(t => t.folder.split("/")[0]));

  const statCards = [
    { n: topFolders.size, l: "教程", i: "📖", v: "tutorials" },
    { n: s.entities, l: "核心实体", i: "🏢", v: "entity" },
    { n: s.topics, l: "专题页面", i: "📝", v: "topic" },
    { n: s.concepts, l: "核心概念", i: "💡", v: "concept" },
    { n: s.comparisons, l: "对比分析", i: "⚖️", v: "comparison" },
  ];

  const today = new Date();
  const dateStr = today.getFullYear() + " 年 " + (today.getMonth() + 1) + " 月 " + today.getDate() + " 日";

  let html = '<div class="page-header" style="text-align:center; padding-top:12px;">' +
    '<h1 style="font-size:2.1em;">📚 知识库</h1>' +
    '<p class="subtitle">' + greetByTime() + '，今天是 ' + dateStr + '</p></div>';

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
    const { tree, rootFiles } = buildTutorialTree(d.tutorials);
    html += '<h2 id="tutorial-section" style="font-size:1.1rem; margin:28px 0 12px; font-family:var(--font-display);">📖 教程入口</h2>';
    // 根级教程文件（无文件夹归属，不缩进）
    if (rootFiles.length > 0) {
      html += '<div style="display:flex;flex-direction:column;gap:2px;margin-bottom:8px;">' +
        rootFiles.map(t =>
          '<a href="#" class="tutorial-file-link" data-action="open-tutorial" data-tutpath="' + esc(t.path) + '">📄 ' + esc(t.title) + '</a>'
        ).join("") + '</div>';
    }
    html += '<div style="display:flex;flex-direction:column;gap:6px;">' +
      tree.map(n => renderTutorialNode(n, 0)).join("") + '</div>';
  }

  html += '<div class="site-footer">共 ' + s.wiki_pages + ' 个 Wiki 页面 · ' +
    topFolders.size + ' 个教程系列 · 更新于 ' + d.generated_at + '</div>';

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

  // 类型筛选栏 — 注意 entity 的复数是不规则的
  const statPlural = { concept: "concepts", entity: "entities", topic: "topics", comparison: "comparisons", overview: "overviews" };
  html += '<div class="filter-bar">' +
    '<button class="filter-btn' + (!state.currentType && !state.currentTag ? ' active' : '') + '" data-filter="">全部</button>' +
    Object.entries(d.type_labels).map(([type, label]) =>
      '<button class="filter-btn' + (state.currentType === type ? ' active' : '') + '" data-filter="' + type + '">' +
      getTypeIcon(type) + ' ' + label + ' (' + (d.stats[statPlural[type]] || 0) + ')</button>'
    ).join("") + '</div>';

  if (pages.length === 0) {
    html += '<div class="empty-state"><div class="empty-icon">🔍</div><p>没有找到匹配的页面</p><p style="font-size:0.82em;margin-top:4px;">试试其他关键词，或 <a href="#" data-action="browse" style="color:var(--accent);">浏览全部页面</a></p></div>';
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
    (page.updated ? '<div class="page-date">更新: ' + relTime(page.updated) + '</div>' : '') +
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

  // 面包屑
  const typeLabelCN = d.type_labels[page.type] || page.type;
  let html = '<div class="page-detail">' +
    '<nav class="breadcrumb">' +
    '<a href="#" data-action="home">📚 首页</a>' +
    '<span class="breadcrumb-sep">›</span>' +
    '<a href="#" data-action="browse">📋 全部页面</a>' +
    (page.type !== 'overview' ? '<span class="breadcrumb-sep">›</span><a href="#" data-filter="' + page.type + '">' + getTypeIcon(page.type) + ' ' + typeLabelCN + '</a>' : '') +
    '<span class="breadcrumb-sep">›</span>' +
    '<span class="breadcrumb-current">' + esc(page.title) + '</span>' +
    '<button class="copy-link-btn" onclick="copyPageUrl()" title="复制链接" aria-label="复制链接">🔗</button>' +
    '</nav>' +
    '<div class="detail-meta">' +
    '<span class="detail-type">' + getTypeIcon(page.type) + ' ' + typeLabel + '</span>' +
    (page.word_count ? '<span class="detail-dates">' + page.word_count.toLocaleString() + ' 字</span>' : '') +
    (page.word_count ? '<span class="detail-dates">约 ' + Math.max(1, Math.ceil(page.word_count / 400)) + ' 分钟</span>' : '') +
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

  html += '</div>';
  $("#app").innerHTML = html;
}

// ═══════════════════════════════════════════════════════
//  教程详情渲染（含 TOC 自动生成）
// ═══════════════════════════════════════════════════════

function renderTutorialDetail() {
  const tutorial = findTutorial(state.currentPage);
  if (!tutorial) {
    $("#app").innerHTML = '<div class="empty-state"><div class="empty-icon">📄</div><p>教程未找到</p></div>';
    return;
  }

  // 生成 TOC（从 h2 提取）
  const tocResult = generateTOC(tutorial.html || "");

  // 面包屑：首页 › 教程 › 文件夹层级（可点击） › 标题（不可点击）
  const folderParts = tutorial.folder === "root" ? [] : tutorial.folder.split("/");
  let html = '<div class="page-detail">' +
    '<nav class="breadcrumb">' +
    '<a href="#" data-action="home">📚 首页</a>' +
    '<span class="breadcrumb-sep">›</span>' +
    '<a href="#" data-action="tutorial-folder" data-folder="">📖 教程</a>';

  // 每个文件夹层级的路径逐步累积，使每个层级都可点击
  let accumulatedFolder = "";
  for (let i = 0; i < folderParts.length; i++) {
    accumulatedFolder = accumulatedFolder ? accumulatedFolder + "/" + folderParts[i] : folderParts[i];
    html += '<span class="breadcrumb-sep">›</span>' +
      '<a href="#" data-action="tutorial-folder" data-folder="' + esc(accumulatedFolder) + '">' + esc(folderParts[i]) + '</a>';
  }

  html += '<span class="breadcrumb-sep">›</span>' +
    '<span class="breadcrumb-current">' + esc(tutorial.title) + '</span>' +
    '<button class="copy-link-btn" onclick="copyPageUrl()" title="复制链接" aria-label="复制链接">🔗</button>' +
    '</nav>' +
    '<div class="detail-meta">' +
    '<span class="detail-type">📖 教程</span>' +
    (tutorial.word_count ? '<span class="detail-dates">' + tutorial.word_count.toLocaleString() + ' 字</span>' : '') +
    (tutorial.word_count ? '<span class="detail-dates">约 ' + Math.max(1, Math.ceil(tutorial.word_count / 400)) + ' 分钟</span>' : '') +
    '</div>' +
    '<h1>' + esc(tutorial.title) + '</h1>';

  // 标签
  if (tutorial.tags && tutorial.tags.length) {
    html += '<div class="detail-tags">' +
      tutorial.tags.map(t => '<button class="tag" data-tag="' + esc(t) + '">#' + esc(t) + '</button>').join("") +
      '</div>';
  }

  // 目录
  if (tocResult.headings.length > 1) {
    html += '<details class="toc-container" open><summary class="toc-title">📑 目录</summary><nav class="toc-list">' +
      tocResult.headings.map(h => '<a href="#' + h.id + '" class="toc-link">' + esc(h.text) + '</a>').join("") +
      '</nav></details>';
  }

  // 教程内容（已带 id 的版本）
  html += '<div class="wiki-content">' + tocResult.html + '</div>';

  // 上/下一步导航
  const prevTut = tutorial.prev_path ? findTutorial(tutorial.prev_path) : null;
  const nextTut = tutorial.next_path ? findTutorial(tutorial.next_path) : null;
  if (prevTut || nextTut) {
    html += '<nav class="chapter-nav">';
    if (prevTut) {
      html += '<a href="#" class="chapter-nav-link chapter-nav-prev" data-action="open-tutorial" data-tutpath="' + esc(prevTut.path) + '">' +
        '<span class="chapter-nav-label">← 上一章</span>' +
        '<span class="chapter-nav-title">' + esc(prevTut.title) + '</span></a>';
    } else {
      html += '<span class="chapter-nav-link chapter-nav-prev chapter-nav-empty"></span>';
    }
    if (nextTut) {
      html += '<a href="#" class="chapter-nav-link chapter-nav-next" data-action="open-tutorial" data-tutpath="' + esc(nextTut.path) + '">' +
        '<span class="chapter-nav-label">下一章 →</span>' +
        '<span class="chapter-nav-title">' + esc(nextTut.title) + '</span></a>';
    } else {
      html += '<span class="chapter-nav-link chapter-nav-next chapter-nav-empty"></span>';
    }
    html += '</nav>';
  }

  html += '</div>';
  $("#app").innerHTML = html;
}

// ═══════════════════════════════════════════════════════
//  教程文件夹视图渲染
// ═══════════════════════════════════════════════════════

function renderTutorialFolder() {
  const folder = state.currentTutFolder || "";
  const d = state.data;
  const tutorials = d.tutorials || [];

  // 筛选该文件夹下的教程
  const directFiles = tutorials.filter(t => {
    const f = t.folder === "root" ? "" : t.folder;
    return f === folder;
  });

  // 筛选子文件夹
  const subFolderSet = new Set();
  const folderPrefix = folder ? folder + "/" : "";
  tutorials.forEach(t => {
    const f = t.folder === "root" ? "" : t.folder;
    if (f !== folder && f.startsWith(folderPrefix)) {
      const sub = f.slice(folderPrefix.length).split("/")[0];
      subFolderSet.add(folder ? folder + "/" + sub : sub);
    }
  });

  // 统计每个子文件夹的教程数量
  const subFolders = Array.from(subFolderSet).sort((a, b) => a.localeCompare(b, "zh")).map(sf => {
    const parts = sf.split("/");
    return {
      name: parts[parts.length - 1],
      fullPath: sf,
      count: tutorials.filter(t => {
        const f = t.folder === "root" ? "" : t.folder;
        return f === sf || f.startsWith(sf + "/");
      }).length,
    };
  });

  // 面包屑
  const folderParts = folder ? folder.split("/") : [];
  let html = '<div class="page-detail">' +
    '<nav class="breadcrumb">' +
    '<a href="#" data-action="home">📚 首页</a>' +
    '<span class="breadcrumb-sep">›</span>' +
    '<a href="#" data-action="tutorial-folder" data-folder="">📖 教程</a>';

  let accumulated = "";
  for (const part of folderParts) {
    accumulated = accumulated ? accumulated + "/" + part : part;
    html += '<span class="breadcrumb-sep">›</span>' +
      '<a href="#" data-action="tutorial-folder" data-folder="' + esc(accumulated) + '">' + esc(part) + '</a>';
  }

  html += '</nav>';

  // 标题
  const displayName = folder ? folderParts[folderParts.length - 1] : "全部教程";
  html += '<h1 style="font-family:var(--font-display); font-size:1.6rem; margin-bottom:6px;">📁 ' + esc(displayName) + '</h1>';
  html += '<p class="subtitle" style="margin-bottom:20px;">共 ' + directFiles.length + ' 篇教程，' + subFolders.length + ' 个子文件夹</p>';

  // 子文件夹列表
  if (subFolders.length > 0) {
    html += '<h2 style="font-size:1rem; margin-bottom:10px; font-family:var(--font-display);">📂 子文件夹</h2>';
    html += '<div class="tut-folder-grid">';
    for (const sf of subFolders) {
      html += '<a href="#" class="tut-folder-card" data-action="tutorial-folder" data-folder="' + esc(sf.fullPath) + '">' +
        '<span class="tut-folder-icon">📁</span>' +
        '<span class="tut-folder-name">' + esc(sf.name) + '</span>' +
        '<span class="tut-folder-count">' + sf.count + ' 篇</span></a>';
    }
    html += '</div>';
  }

  // 直接文件列表
  if (directFiles.length > 0) {
    html += '<h2 style="font-size:1rem; margin:20px 0 10px; font-family:var(--font-display);">📄 教程列表</h2>';
    html += '<div class="page-list">';
    for (const t of directFiles) {
      // 找到该教程的上一章和下一章，用于显示顺序信息
      const siblings = directFiles;
      const idx = siblings.indexOf(t);
      const numLabel = siblings.length > 1 ? '<span class="tut-order">' + (idx + 1) + ' / ' + siblings.length + '</span>' : '';

      html += '<div class="page-card" data-action="open-tutorial" data-tutpath="' + esc(t.path) + '">' +
        '<div class="page-type-badge topic">📄</div>' +
        '<div class="page-info">' +
        '<div class="page-title">' + esc(t.title) + numLabel + '</div>' +
        (t.summary ? '<div class="page-summary">' + esc(t.summary) + '</div>' : '') +
        '<div class="page-meta">' +
        (t.word_count ? '<span class="page-date">' + t.word_count.toLocaleString() + ' 字</span>' : '') +
        (t.word_count ? '<span class="page-date">约 ' + Math.max(1, Math.ceil(t.word_count / 400)) + ' 分钟</span>' : '') +
        '</div></div></div>';
    }
    html += '</div>';
  }

  // 空状态
  if (directFiles.length === 0 && subFolders.length === 0) {
    html += '<div class="empty-state"><div class="empty-icon">📂</div><p>该文件夹下暂无教程</p></div>';
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

function findTutorial(path) {
  if (!state.data || !path) return null;
  return state.data.tutorials.find(t => t.path === path) || null;
}

function greetByTime() {
  const h = new Date().getHours();
  if (h < 6) return "🌙 夜深了";
  if (h < 12) return "☀️ 早上好";
  if (h < 18) return "🌤️ 下午好";
  if (h < 19) return "🌅 傍晚好";
  return "🌙 晚上好";
}

function relTime(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const now = new Date();
  const diff = Math.floor((now - d) / 86400000);
  if (diff === 0) return "今天";
  if (diff === 1) return "昨天";
  if (diff < 7) return diff + " 天前";
  if (diff < 30) return Math.floor(diff / 7) + " 周前";
  if (diff < 365) return Math.floor(diff / 30) + " 个月前";
  return dateStr;
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
//  教程树结构（按文件夹层级合并展示）
// ═══════════════════════════════════════════════════════

function buildTutorialTree(tutorials) {
  const byFolder = {};
  const rootFiles = [];
  for (const t of tutorials) {
    if (t.folder === "root") {
      rootFiles.push(t);
      continue;
    }
    if (!byFolder[t.folder]) byFolder[t.folder] = [];
    byFolder[t.folder].push(t);
  }

  const nodes = {};
  function getNode(path) {
    if (nodes[path]) return nodes[path];
    const parts = path.split("/");
    const name = parts[parts.length - 1];
    nodes[path] = { name, fullPath: path, files: byFolder[path] || [], children: [] };
    if (parts.length > 1) {
      const parentPath = parts.slice(0, -1).join("/");
      getNode(parentPath).children.push(nodes[path]);
    }
    return nodes[path];
  }

  for (const folder of Object.keys(byFolder)) { getNode(folder); }

  // 提取顶层节点 + 排序
  function sortNode(n) {
    n.children.sort((a, b) => a.name.localeCompare(b.name, "zh"));
    // 按文件路径排序以保留数字前缀定义的章节顺序（01-、02- 等）
    n.files.sort((a, b) => a.path.localeCompare(b.path, "zh"));
    n.children.forEach(sortNode);
  }
  const topLevel = Object.values(nodes).filter(n => !n.fullPath.includes("/"));
  topLevel.forEach(sortNode);
  topLevel.sort((a, b) => a.name.localeCompare(b.name, "zh"));

  // 根级文件排序
  rootFiles.sort((a, b) => a.path.localeCompare(b.path, "zh"));

  return { tree: topLevel, rootFiles };
}

function countAllFiles(node) {
  return node.files.length + node.children.reduce((s, c) => s + countAllFiles(c), 0);
}

function renderTutorialNode(node, depth) {
  const indent = depth > 0 ? ' style="margin-left:' + (depth * 16) + 'px"' : "";
  const hasContent = node.files.length > 0 || node.children.length > 0;
  if (!hasContent) return "";

  const total = countAllFiles(node);
  const icon = node.children.length ? "📁" : "📂";
  const cls = depth === 0 ? "tutorial-folder tutorial-folder--top" : "tutorial-folder tutorial-folder--sub";

  let html = '<details class="' + cls + '"' + indent + '><summary class="tutorial-folder-summary"><strong>' + icon + ' ' + esc(node.name) + '</strong>' +
    '<span class="tut-count">' + total + ' 篇</span></summary>';

  if (node.files.length > 0) {
    html += '<div class="tutorial-files">' +
      node.files.map(t =>
        '<a href="#" class="tutorial-file-link" data-action="open-tutorial" data-tutpath="' + esc(t.path) + '">📄 ' + esc(t.title) + '</a>'
      ).join("") + '</div>';
  }

  html += node.children.map(c => renderTutorialNode(c, depth + 1)).join("");
  html += '</details>';
  return html;
}

// ═══════════════════════════════════════════════════════
//  启动
// ═══════════════════════════════════════════════════════

window.addEventListener("DOMContentLoaded", init);

// 全局暴露（兼容内联 onclick）
window.appNav = navigate;

function copyPageUrl() {
  const url = location.origin + location.pathname + location.hash;
  navigator.clipboard.writeText(url).then(() => {
    const btn = document.querySelector(".copy-link-btn");
    if (btn) { btn.textContent = "✓"; btn.classList.add("copied");
      setTimeout(() => { btn.textContent = "🔗"; btn.classList.remove("copied"); }, 2000);
    }
  }).catch(() => { /* clipboard not available */ });
}
window.copyPageUrl = copyPageUrl;
