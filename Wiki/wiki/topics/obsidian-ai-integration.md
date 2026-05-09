---
title: Obsidian AI 集成方案
type: topic
tags: [obsidian, ai, claude-code, deepseek, copilot, minmax, ollama]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/Obsidian/Claude Code+Obsidian ：让 AI 当你的知识管家.md
  - raw/articles/Obsidian/Obsidian Cli 基础使用教程 AI化知识管理全过程.md
  - raw/articles/Obsidian/别再手动整理笔记了！Claude+Obsidian打造永不遗忘的AI知识系统.md
  - raw/articles/Obsidian/从崩溃到兴奋，5小时把DeepSeek V4接入Obsidian实现自动化.md
  - raw/articles/Obsidian/新手别折腾了：这套 Obsidian + DeepSeek 组合，便宜又能直接用！.md
related:
  - entities/obsidian.md
  - entities/claude-code.md
  - topics/claude-code-installation.md
  - topics/obsidian-getting-started.md
  - topics/obsidian-llm-wiki-practice.md
---

# Obsidian AI 集成方案

2025-2026 年，AI 与 Obsidian 的集成出现了多种路线。核心问题不是「要不要用 AI」，而是「选哪条路线」。本文梳理六种主流方案，从成本、隐私、门槛、能力四个维度对比。

## 路线总览

| 方案 | 核心组合 | 成本 | 隐私 | 门槛 | 适合人群 |
|------|---------|------|------|------|---------|
| **Claude Code + CLI** | Obsidian CLI + Claude Code | 中等（API 费用） | 高（本地文件，数据可控制） | 中高 | 追求最强能力的深度用户 |
| **Copilot + 便宜模型** | Copilot 插件 + DeepSeek API | 极低 | 中（API 传输） | 低 | 新手、高频日常使用 |
| **Claudian 插件** | Claudian + Claude Code | 中等 | 高 | 中 | 想在 Obsidian 内无缝使用 Claude 的用户 |
| **Copilot + 本地模型** | Copilot 插件 + Ollama | 免费 | 极高（完全离线） | 中高 | 隐私敏感用户 |
| **Web Clipper + Claude Code** | Web Clipper + Claude Code 批量处理 | 中等 | 高 | 中 | 大量网页素材处理 |

## 方案一：Claude Code + Obsidian CLI（最强能力）

### 核心理念

**Markdown 是 LLM 的母语，本地文件让 AI 零摩擦读写。** Obsidian Vault 就是一个文件夹，Claude Code 进入后是有完整权限的管理员，不是隔着 API 传话的外人。

### 为什么这个组合是 2026 年最优解

1. **Markdown 是 LLM 的母语**：token 效率比 JSON/XML 高 30-50%，`##`、`>`、` ``` ` 等标记本身就是结构分隔符
2. **本地文件 = AI 直接读写**：不需要 API、不需要认证、不需要网络请求
3. **三个十亿级项目殊途同归**：Manus、OpenClaw、Claude Code 都在用 Markdown 文件做 Agent 记忆层

### 搭建步骤（30 分钟）

**第一步：cd 进 Vault，启动 Claude Code**
```bash
cd ~/Documents/MyBrain
claude
```

**第二步：写 CLAUDE.md 给 AI 看**

在 Vault 根目录创建 `CLAUDE.md`，Claude Code 每次启动都会读它。最少包含：
- 关于你（身份、关注领域、偏好）
- Vault 结构（各文件夹用途）
- Front matter 模板（新建笔记时的必填格式）
- 行为规则（可以/不可以做什么）

**第三步：每个大目录补 index.md**

在每个文件夹放一份 3-5 行的 `index.md`，说明这里是干嘛的、关键文件在哪、AI 操作规则。Claude Code 读完这个 3 秒知道全貌，不需要逐个扫描。

**第四步：装 obsidian-skills**

Obsidian CEO kepano 亲自做的官方 Skill 集，教 Claude Code 正确处理 `[[]]`、callout、`.canvas`、`.base` 等 Obsidian 特有语法：
```bash
git clone https://github.com/kepano/obsidian-skills.git .claude/skills/obsidian-skills
```

### 实战：让 AI 整理散乱笔记

找一批旧笔记扔进 `raw/`，告诉 Claude Code：
```
帮我整理 raw/ 下的散乱笔记。读取所有文件，按主题分类，
给每条笔记加 Front Matter，建立 [[双向链接]]，
最后给每个文件夹生成 index.md。
```

### 进阶方向

1. **raw → wiki → output 三层架构**：AI 把原始素材编译成结构化 wiki，知识从一次性消耗变成永久资产
2. **自动 backlinks**：写好规则，AI 自动扫描日记中人名/地名/书名/概念，搜索是否已有对应笔记，有就加 `[[wikilink]]`，没有就建占位页
3. **嵌进 Obsidian + 语义搜索**：Claudian 插件把对话界面嵌入侧边栏 + Smart Connections 做语义关联 + Copilot 做 Vault 级 RAG 问答

## 方案二：Copilot + DeepSeek（新手最佳）

### 为什么推荐新手先用 DeepSeek

- **便宜**：比 Claude API 便宜 6-15 倍，充 10 元能用很久
- **配置简单**：Copilot 插件界面化配置，几分钟搞定
- **够用**：日常代码、总结、翻译等基础场景完全满足

### 搭建步骤

1. 在 Obsidian 插件中心下载 Copilot 插件
2. 在 deepseek.com 创建 API Key（建议充值 10 元）
3. 在 Copilot 设置 → Model → 找到 deepseek-chat → 勾选 Enable → 填入 Base URL（`https://api.deepseek.com`）和 API Key
4. Basic 配置页的 Default Chat Model 选择 deepseek_chat

### 使用策略

- **高频日常使用**：笔记处理、批量生成、自动化流水线 → 用 DeepSeek
- **高结构性需求**：深度总结、强上下文推理 → 切换 Claude
- 两者不是替代关系，是互补关系——先便宜跑通流程，再按需升级

## 方案三：Claudian 插件（无缝体验）

Claudian 把 Claude Code 的对话界面直接嵌入 Obsidian 侧边栏，避免了 Alt+Tab 切窗口的摩擦。

**安装**：从 GitHub（github.com/YishenTu/claudian）下载 3 个文件放入插件目录，重启启用。

**关键特性**：
- 完整支持 Claude Code Skills（`/` 命令面板）
- 内联编辑：选中文本，AI 直接在原文中修改
- 支持 obsidian-skills 官方 Skill 集

## 方案四：Copilot + Ollama（完全本地）

完全离线运行，零数据外传，零费用。适合对隐私极度敏感的用户。

```bash
# 安装 Ollama
brew install ollama

# 拉取模型
ollama pull llama3.2       # 对话模型
ollama pull nomic-embed-text  # 嵌入模型

# 启动服务
ollama serve
```

然后在 Copilot 设置中选择 Ollama 作为提供商。

这是 Obsidian 在 AI 时代的杀手锏组合：**本地 Markdown 笔记 + 本地 LLM = 完全私有的智能知识系统**。Notion AI 无论如何做不到。

## 方案五：Web Clipper + Claude Code（批量处理）

先用 Obsidian Web Clipper 浏览器插件一键剪藏网页内容到 Vault，积累素材后在 Claude Code 中批量处理。详见 [[Obsidian 信息收集工作流|obsidian-capture-workflow]]。

## 国内用户注意：模型接入与踩坑

### DeepSeek V4 接入踩坑

多位作者提到配置过程中的常见陷阱：
1. **AI 给的配置方案可能是错的**：Claude Code 官方文档不会主动写 DeepSeek 兼容配置，需要手动查 DeepSeek 官方文档
2. **CMD 和 PowerShell 语法不同**：复制粘贴命令前确认运行环境
3. **找不到 settings.json**：没登录过 Anthropic 账号不会自动生成，需手动新建
4. **Terminal 插件安装**：无科学上网环境大概率安装失败

### MiniMax 替代方案（国内推荐）

MiniMax Coding Plan 29 元/月起，通过设置 `ANTHROPIC_BASE_URL` 指向 `https://api.minimaxi.com/anthropic`，可让 Claude Code 使用国内包月模型。

## 方案六：Gemini CLI（Google 出品）

Gemini CLI 是 Google 推出的命令行 AI 工具，直接操作本地文件系统，与 Obsidian 天然兼容。

### 安装与配置

```bash
# 前置条件：Node.js
node --version  # 确认已安装

# 安装 Gemini CLI
npm install -g @google/gemini-cli

# 进入 Vault 启动
cd /path/to/your/vault
gemini
# 选择 Login with Google 完成授权
```

### 典型用例

**智能选题**：
```
"自媒体存档"文件夹里是我过去写的所有视频脚本。
请分析我的选题特色和行文风格，结合当前网络热点，
帮我生成 10 个新的视频选题。每个选题包含标题、简介和大纲。
将结果输出到"新选题.md"文件中。
```

**批量文件处理**：
```
请将"年度总结.md"按二级标题拆分成多个独立笔记，
每个笔记以二级标题命名，存放到"2025年度总结"文件夹中。
```

**模仿文风写作**：
```
请阅读"自媒体存档"文件夹中的内容，学习我的行文风格。
然后搜索最近关于"AI Agent"的热门话题，模仿我的风格写一篇视频脚本。
```

### 安全：Git 兜底

用 Git 同步的 Vault 中，AI 的每次操作都被 Git 追踪。不满意随时回滚：
```bash
git checkout -- 文件名    # 恢复单个文件
```
或在 GitHub Desktop 中 "Discard changes" 一键撤销。

### 与 Claude Code 的对比

| 维度 | Gemini CLI | Claude Code |
|------|------------|-------------|
| 模型 | Gemini 系列 | Claude 系列 |
| 费用 | 有免费额度 | 按 API 用量 |
| 网络搜索 | ✅ 内置 | 需通过 MCP |
| 代码能力 | 强 | 更强 |
| 中文内容创作 | 较好 | 优秀 |
| 国内可用性 | 需网络环境 | 需网络环境/第三方中转 |

## 总结建议

- **新手**：先 Obsidian + DeepSeek（Copilot 插件），便宜够用
- **中等用户**：Obsidian + Claude Code + obsidian-skills，能力最强
- **重度隐私用户**：Obsidian + Copilot + Ollama，完全离线
- **追求流畅体验**：加装 Claudian 插件，AI 对话嵌入侧边栏

> ⚠️ 一个关键判断：40 万字以内不需要向量数据库。Claude 的上下文窗口够大，纯文本 wiki + index.md 导航，AI 找到相关知识的速度和准确度都很高。超过百万字级别再考虑加语义搜索。
