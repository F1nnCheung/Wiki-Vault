---
title: Obsidian 插件进阶指南
type: topic
tags: [obsidian, 插件, custom-attachment-location, enhancing-export, dataview, templater, quickadd, calendar]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/Obsidian/04-第三方插件.md
  - raw/articles/Obsidian/Obsidain使用教程大纲.md
related:
  - entities/obsidian.md
  - topics/obsidian-getting-started.md
  - topics/obsidian-git-sync.md
---

# Obsidian 插件进阶指南

深入介绍 Obsidian 中解决问题型插件的配置与用法。涵盖图片管理、文档导出、数据查询、动态模板、快速捕获等高频需求。

## 插件一：Custom Attachment Location — 图片标准化管理

### 解决什么问题

Obsidian 默认粘贴图片时：
- 图片散落在笔记同级目录，根目录杂乱
- 使用 Wiki 链接语法 `[[图片名]]`，GitHub 网页端和 VS Code 无法显示
- 重命名笔记时图片链接不会自动更新

### 安装与核心配置

1. 社区插件市场搜索 **Custom Attachment Location**（作者 RainCat1998）
2. 安装启用后进入设置

**四项关键配置**：

| 配置项 | 填写值 | 说明 |
|--------|--------|------|
| Attachment folder path | `assets/${noteFileName}` | 按笔记名分子文件夹存放 |
| Markdown URL 格式 | `assets/${noteFileName}/${generatedAttachmentFileName}` | 生成标准 `![](路径)` 链接 |
| Generated attachment file name | `file-${date:YYYY-MM-DD-HHmmss}` | 时间戳命名，避免中文乱码 |
| Rename 附件 | 全部勾选 | 笔记重命名/移动时自动同步附件 |

### 配合系统设置

进入设置 → 文件与链接：
- **关闭**「使用 Wiki 链接」
- 内部链接类型 → 「基于当前笔记的相对路径」

### 效果

配置后的目录结构：
```
Vault/
├── 我的笔记.md
└── assets/
    └── 我的笔记/
        ├── file-2025-01-01-120000.png
        └── file-2025-01-01-121500.png
```

笔记中生成的链接为标准 Markdown：
```markdown
![file-2025-01-01-120000](assets/我的笔记/file-2025-01-01-120000.png)
```

**重命名测试**：将 `我的笔记.md` 重命名为 `技术笔记.md`：
- `assets/我的笔记` 自动重命名为 `assets/技术笔记`
- 笔记内图片链接自动更新

**跨工具验证**：GitHub 网页端、VS Code、任何 Markdown 编辑器都能正常显示图片。

### 调整图片尺寸

图片太宽时，在方括号内输入数字限制宽度：
```markdown
![500](assets/技术笔记/file-2025-01-01-120000.png)
```

## 插件二：Enhancing Export — 多格式文档导出

### 解决什么问题

Obsidian 笔记是 Markdown，但有时需要导出为 Word、PDF、HTML 分享给他人。

### 依赖安装：Pandoc

Enhancing Export 依赖 Pandoc 文档转换引擎。

- **macOS**：`brew install pandoc`
- **Windows**：从 [GitHub Releases](https://github.com/jgm/pandoc/releases) 下载，解压到 `C:\Tools\pandoc`
- **Linux**：`sudo apt-get install pandoc`

### 安装与配置

1. 社区插件市场搜索 **Enhancing Export**，安装启用
2. 设置中填入 Pandoc 路径（Windows 需填完整路径如 `C:\Tools\pandoc\pandoc.exe`，macOS/Linux 留空即可）

### 导出操作

右键笔记 → 导出为 → 选择格式：

| 格式 | 适用场景 |
|------|---------|
| **Word (.docx)** | 发送给同事/老师，排版完整 |
| **PDF (.pdf)** | 打印、正式分发 |
| **HTML (.html)** | 网页发布 |
| **ePub (.epub)** | 电子书阅读器 |
| **LaTeX (.tex)** | 学术排版 |

导出效果：标题层级、表格、图片、代码块均保留格式。

### 进阶：自定义导出模板

准备 Word 模板文件（设置好字体、行距、页边距），导出时指定 `--reference-doc=模板.docx` 参数即可使用自定义样式。

## 插件三：Dataview — 笔记数据库查询

Dataview 是 Obsidian 社区最强大的数据查询插件，被称为「Obsidian 中的 SQL」。

### 基础用法

在笔记中插入 `dataview` 代码块：

**列出所有带某标签的笔记**：
````markdown
```dataview
LIST
FROM #待办
```
````

**按属性查询生成表格**：
````markdown
```dataview
TABLE status, priority, due
FROM "项目"
WHERE status = "进行中"
SORT priority DESC
```
````

**显示最近 7 天创建的笔记**：
````markdown
```dataview
TABLE file.cday AS "创建日期", file.tags AS "标签"
WHERE file.cday >= date(today) - dur(7 days)
SORT file.cday DESC
```
````

### 典型应用场景

| 场景 | 用途 |
|------|------|
| 项目看板 | 汇总项目笔记，按状态筛选排序 |
| 阅读清单 | 汇总读书笔记，按评分降序 |
| 待办汇总 | 从 Daily Notes 收集未完成任务 |
| 知识库仪表盘 | 显示本周新增、进行中项目、待处理收件箱 |
| 最近修改 | 找出最近 3 天内改过的笔记 |

### 进阶：DataviewJS

用 JavaScript 实现更复杂的查询逻辑，适合有编程基础的用户。

## 插件四：Templater — 动态模板系统

### 比内置模板强在哪

Obsidian 内置模板只能插入静态内容。Templater 支持：
- 动态日期/时间（当前日期、昨天、下周）
- 文件名、文件路径
- 用户输入（弹窗询问书名、作者等）
- 执行 JavaScript 代码

### 基础模板示例

**每日笔记模板**：
```markdown
---
date: <% tp.date.now("YYYY-MM-DD") %>
tags: daily
---

# <% tp.date.now("YYYY年MM月DD日 dddd") %>

## 今日目标
- [ ] 

## 今日记录

## 今日复盘
- 学到了什么：
```

**阅读笔记模板**（含用户输入）：
```markdown
---
title: <% await tp.system.prompt("书名") %>
author: <% await tp.system.prompt("作者") %>
status: reading
tags: book
date_started: <% tp.date.now("YYYY-MM-DD") %>
---

# 《<% tp.frontmatter.title %>》阅读笔记

## 核心观点
## 关键摘录
## 个人思考
```

创建笔记时选择模板，Templater 自动将 `<% ... %>` 替换为实际值，有 `tp.system.prompt()` 的地方弹出输入框。

### 与 QuickAdd 配合

Templater 负责「填充内容」，QuickAdd 负责「一键触发」，两者配合使用体验最佳。

## 插件五：Calendar — 日历与日记管理

### 功能

- 右侧边栏显示月历视图
- 点击日期打开/创建当日日记
- 有日记的日期显示小圆点标记
- 支持周记模式

### 使用场景

- **习惯追踪**：每天在日记中记录习惯完成情况，日历直观看到连续记录
- **每日复盘**：每晚在当日日记写复盘
- **日程回顾**：点击任意日期快速查看那天记录了什么

## 插件六：QuickAdd — 快速捕获与工作流胶水

### 核心理念

「Capture」（捕获）——快速将想法、任务、链接捕获到笔记中，不打断当前工作流。

### 四种模式

| 模式 | 用途 | 示例 |
|------|------|------|
| **Template** | 一键按模板创建笔记 | 一键创建会议笔记 |
| **Capture** | 快速追加内容到指定文件 | 闪念捕获→当日日记 |
| **Macro** | 链式执行多个操作 | 创建笔记→应用模板→在日记中添加链接→打开新笔记 |
| **AI** | 通过 AI 命令处理 | 一键从 URL 生成阅读笔记 |

### 典型配置

**闪念捕获**：
1. 创建 Capture 类型 Choice，目标设为当日日记的「灵感捕获」部分
2. 绑定快捷键 `Cmd+Shift+I`
3. 任何时候按快捷键 → 弹出输入框 → 输入想法 → 自动追加到日记，带上时间戳
4. 全程不到 2 秒

**一键创建读书笔记**：
1. 创建 Template 类型 Choice，选择读书笔记模板，指定目标文件夹
2. 绑定快捷键
3. 一键触发 → 弹出书名/作者输入框 → 自动生成标准格式的读书笔记

## 其他实用插件速览

| 插件 | 功能 | 推荐度 |
|------|------|--------|
| Recent Files | 侧边栏显示最近打开笔记 | ⭐⭐⭐⭐ |
| Outliner | 大纲编辑增强，支持折叠/拖拽 | ⭐⭐⭐⭐ |
| Excalidraw | 手绘风格画布，深度集成 | ⭐⭐⭐⭐⭐ |
| PDF Plus | PDF 标注并生成可跳转笔记链接 | ⭐⭐⭐ |
| Mind Map | Markdown 大纲转思维导图 | ⭐⭐⭐ |
| Admonition | 彩色提示框（警告/提示/注意） | ⭐⭐⭐ |
| Breadcrumbs | 面包屑导航，显示笔记层级 | ⭐⭐⭐ |
| Supercharged Links | 根据属性给链接添加图标和颜色 | ⭐⭐⭐ |

## 插件性能建议

- 20 个左右的活跃插件是平衡点
- 安装 **Lazy Plugin Loader** 延迟加载不常用插件
- 定期审视插件列表，禁用或删除不再使用的
- 某个插件明显拖慢速度时，先检查是否有更轻量的替代品
