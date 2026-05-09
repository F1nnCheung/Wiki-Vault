---
title: Obsidian 入门指南
type: topic
tags: [obsidian, 入门, 知识管理, PARA, zettelkasten, MOC, 插件]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/Obsidian/万字长文：个人如何用 Obsidian 搭建本地知识库——从入门到构建你的「第二大脑」.md
  - raw/articles/Obsidian/建立Obsidian个人知识库的正确驾驶方式.md
  - raw/articles/Obsidian/一个装上就不想换的 Obsidian 主题：Baseline.md
related:
  - entities/obsidian.md
  - concepts/second-brain.md
  - concepts/file-over-app.md
  - topics/obsidian-ai-integration.md
---

# Obsidian 入门指南

从零开始用 Obsidian 搭建个人知识库的完整路径。覆盖方法论（PARA / Zettelkasten / MOC）、核心插件和实操步骤。

## 核心理念：先有体系，再有工具

工具再好，没有方法论也只是一堆散乱文件。Obsidian 不只是一个编辑器——它是一套知识管理哲学的技术载体。

### 三种核心方法论

#### PARA 方法：给知识找到「位置」

由 Tiago Forte 提出，按**可操作性**分四个层级：

| 层级 | 作用 | 示例 |
|------|------|------|
| **Projects（项目）** | 有明确目标和截止日期的当前工作 | 「写一篇公众号文章」「搭建个人网站」 |
| **Areas（领域）** | 没有截止日期但需持续关注的职责范围 | 「健康管理」「财务投资」「技术成长」 |
| **Resources（资源）** | 感兴趣的主题或参考资料 | 「机器学习」「设计灵感」 |
| **Archives（归档）** | 已完成或不再活跃的内容 | 去年完成的项目 |

PARA 回答最根本的问题：**这条信息应该放在哪里？**

#### Zettelkasten 方法：让知识「连接」起来

德国社会学家 Niklas Luhmann 用这套方法一生出版了 70 多本书、400 多篇论文。四条核心原则：

1. **原子化**：每条笔记只包含一个想法
2. **用自己的话重写**：永远不要直接复制粘贴
3. **链接优于层级**：通过 `[[双向链接]]` 相连，而非文件夹嵌套
4. **唯一标识**：在 Obsidian 中，文件名天然就是标识符

Zettelkasten 的魔力在于**涌现性**——积累几百条原子笔记并用链接连起来后，会产生意想不到的洞察。

#### MOC（Maps of Content）：给知识创建「地图」

MOC 本质上是**导航笔记**——围绕某个主题精心策划的链接列表。它不是文件夹，而是更高层级的笔记，为一组相关想法提供结构。

**关键原则**：不要预先创建 MOC。让它们在某个主题的笔记数量增长到需要导航时自然涌现。三五条笔记不需要 MOC，三五十条才需要。

### 三种方法的融合

- **PARA 作为行动枢纽**：文件夹结构用于组织活跃项目和持续关注的领域
- **Zettelkasten 作为洞察引擎**：原子化的链接笔记用于知识构建
- **MOC 作为导航层**：在两个系统之间架起桥梁

三者功能互补、结构互不冲突，可在同一个 Vault 中无缝共存。

## 从零搭建实操

### 第一步：安装与基础设置

1. 从 obsidian.md 下载对应平台版本（全平台支持）
2. 创建 Vault：选一个你能完全控制的本地文件夹，建议 `~/Documents/MyBrain`
3. 推荐基础设置：
   - 编辑器 → 开启「行号显示」「严格换行」
   - 文件与链接 → 开启「自动更新内部链接」
   - 外观 → 安装 Minimal 或 Baseline 主题
   - 核心插件 → 开启「图谱视图」「反向链接」「标签面板」「大纲」

### 第二步：建立文件夹结构

基于 PARA 方法：

```
MyBrain/
├── 00-Inbox/          # 所有新内容先进入收件箱
├── 01-Projects/       # 当前活跃项目
├── 02-Areas/          # 持续关注的领域
├── 03-Resources/      # 参考资料和兴趣主题
├── 04-Archives/       # 已完成或不再活跃的内容
├── 05-Templates/      # 模板文件
├── 06-Attachments/    # 图片、PDF 等附件
└── 07-Daily/          # 每日笔记
```

**重要原则**：不要在文件夹结构上花太多时间。Obsidian 的核心不是文件夹，而是链接。真正的组织靠 `[[链接]]` 和 MOC。

### 第三步：分批安装插件

不要一次装 20 个。按优先级分批，每批适应一周再加新的：

| 批次 | 插件 | 优先级 |
|------|------|--------|
| **第 1 周** | Templater、Calendar + Periodic Notes、Linter、Git | 基础必装 |
| **第 2 周** | Dataview、Tasks、QuickAdd、Various Complements | 效率提升 |
| **第 3 周** | Commander、Style Settings、Omnisearch、Note Toolbar | 体验优化 |
| **第 4 周** | Excalidraw、Kanban、Meta Bind、BRAT、Supercharged Links | 进阶功能 |
| **按需** | Smart Connections、Copilot、Text Generator | AI 集成 |

### 第四步：建立工作流

```
捕获 → 处理 → 组织 → 连接 → 产出 → 复盘
```

- **捕获**：一切新信息先进入 Inbox。使用 QuickAdd 快速捕获功能
- **处理**：定期清空收件箱（每天或每两天一次），对每条信息做决策
- **组织**：放到正确位置，添加标签和 YAML frontmatter
- **连接**：为每条新笔记至少添加一个 `[[链接]]`
- **产出**：知识库的终极目的不是收藏，而是产出
- **复盘**：利用 Periodic Notes 进行周复盘和月复盘

### 第五步：配置 Git 自动备份

1. 在 GitHub 创建私有仓库
2. 在 Vault 根目录初始化 Git
3. 配置 `.gitignore` 排除 `workspace.json` 和 `.trash/`
4. 在 Git 插件中设置：自动提交间隔 10 分钟、自动推送、启动时自动拉取

## 主题推荐：Baseline

Baseline 是 2026 年最受关注的新主题之一，由 Cupertino（2024 年官方年度最佳主题）的作者 aaaaalexis 打造。

**核心特点**：
- 默认状态就好用，不需花时间调 Style Settings
- 兼容 Minimal 绝大多数 CSS 功能类，迁移成本低
- 在一个主题内集合了多种配色（Minimal、Catppuccin、Sanctum 等）和工作区布局（Border、Iridium、Craft 风格）
- 手机端单独调优，非桌面缩小版
- 提供 Minimal → Baseline 迁移工具

## 常见误区

1. **完美体系先行**：先写笔记，让系统从笔记里长出来，而非从设计图纸里长出来
2. **插件一次性装太多**：分批进行，用熟了再加新的
3. **过早拆分多 Vault**：500 篇以下别拆，等到两类内容完全不交叉时再考虑
4. **只存不加工**：知识不是收集出来的，是反复拿出来咀嚼、碰撞、连接出来的

## 最小可行方案

只需要 5 分钟启动：
1. 安装 Obsidian
2. 创建 Inbox 和 Notes 两个文件夹
3. 每天写一条笔记
4. 每条笔记尽量加一个 `[[链接]]`
5. 装 Calendar 插件方便导航

一个最小但持续使用的知识库，比一个完美但三天后就放弃的系统强一万倍。
