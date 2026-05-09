---
title: "推荐 Obsidian + Claude Code + Andrej Karpathy Wiki的obsidian-wiki，同时支持 hermes、openclaw等 AI接管你的 LangChain 实战课"
source: "https://mp.weixin.qq.com/s/TnbcTvGGKf4WtIT3XFQoaQ"
author:
  - "[[灵境星匠]]"
published:
created: 2026-05-08
description: "使用Obsidian配合Claude Code，完成Andrej Karpathy Wiki的开源 Skill obsidian-wiki，同时支持 hermes、openclaw等 AI接管你的 LangChain 实战课"
tags:
  - "clippings"
---
灵境星匠 *2026年5月7日 00:20*

> 这周在 Obsidian 里整理 LangChain 实战课内容，无意中发现 **Ar9av/obsidian-wiki** （988★，今天刚发 v2026.05）。和前两期分享的 6 个 Andrej Karpathy LLM Wiki 实现都不一样——它装在 Vault 里、能发现你过去半年和 AI 的对话。我把课程的 23 篇 markdown 课程全量放了进去，记录一下全流程。

## 上两期回顾：6 个 Andrej Karpathy LLM Wiki 实现

过去两周，公众号连发了两期 Karpathy LLM Wiki 主题。

[推荐基于Andrej Karpathy LLM Wiki 理论框架的3 个开源，在github上可以拿来即用的个人知识库管理应用](https://mp.weixin.qq.com/s?__biz=MzkwNDY3MzA5MA==&mid=2247484303&idx=1&sn=baf85485b52fe6c75222022d33d2ea61&scene=21#wechat_redirect) 。这三个都是带 GUI / Web 的独立工具：

- **lucasastorian/llmwiki**
	— 698★，Karpathy 本人转发过的完美实现，MCP 协议让 Claude Desktop 直接变 wiki 编辑器
- **nashsu/llm\_wiki**
	— 3856★，Tauri 桌面 + 三栏布局 + Louvain 社区检测自动发现知识簇
- **taffy123d/Karpathy-LLM-Wiki**
	— 8★，国产模型友好（通义 / DeepSeek / OpenAI 一行切换）

[Andrej Karpathy LLM Wiki理论下的Skill项目（llm-wiki-skill、karpathy-llm-wiki和llm-wiki-skill），让正在用Claude Code的你脱颖而出](https://mp.weixin.qq.com/s?__biz=MzkwNDY3MzA5MA==&mid=2247484319&idx=1&sn=402eda6ffce46a1e75ce1bf5de6bba29&scene=21#wechat_redirect) 这三个是塞进 Claude Code / Codex 项目里跑的 skill 包：

- **sdyckjq-lab/llm-wiki-skill**
	— 1183★，国内素材报拍最齐（公众号 / 知乎 / X / YouTube 字幕一站抓取）+ 数字山水风离线知识图谱
- **gatelynch/llm-knowledge-base**
	— 221★，繁体中文项目，把官方三层魔改成 raw / wiki / brainstorming / artifacts 四层
- **Astro-Han/karpathy-llm-wiki**
	— 651★，agentskills.io 开放标准 + 94 篇真实样例库

## Ar9av/obsidian-wiki（988★，昨天刚发 v2026.05）

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Ar9av/obsidian-wiki — Obsidian × 多 Agent 共享的 Wiki Skills 框架（933★）。仅今天一天仓库发了新 release、stars 从 933 涨到 988。

它和前 6 个的差异，看这张表：

| 维度 | 完整应用（4-28 三款） | Skill 包（4-29 三款） | **Ar9av/obsidian-wiki** |
| --- | --- | --- | --- |
| **部署位置** | 独立 GUI / Web | Claude Code 项目内 | **Obsidian Vault 内** |
| **Agent 兼容** | 自带前端 | 4 种（ `npx add-skill` ） | **14+ 种**  （全局 symlink） |
| **Slash 命令** | 不适用 | 3 核心（ingest/query/lint） | **20+ 个** |
| **挖会话历史** | ❌ | ❌ | **✅**  ~/.claude /.codex /.hermes /.openclaw |
| **Graph 导出** | nashsu 有桌面图谱 | ❌ | **✅**  Gephi / Neo4j / 交互 HTML |
| **语义检索** | nashsu 内置 | ❌ | **✅**  QMD MCP 双路（lex+vec） |
| **自主研究** | ❌ | ❌ | **✅**  wiki-research 多轮网搜自归档 |

简单说：skill 不再只是 Claude Code 项目里的局部插件，而是装到 Obsidian Vault 里、对 14 种 Agent 共享，连过去半年和 AI 的对话都能挖出来当素材。

这「14+ 种」覆盖主流的 Claude Code / Cursor / Codex / Gemini CLI，也括较新的 **Hermes** （本地 Agent 框架）和 **OpenClaw** （开源跨模型 Agent）。 `setup.sh` 一次跑完会把同一份 skill 同时 symlink 到这些 Agent 的全局 skills 发现路径下，所以你早上在 Claude Code 顺手 `/wiki-ingest、` 下午切到 Codex 用 `$wiki-query` 查同一份 wiki、晚上跑 Hermes / OpenClaw 也是一样的命令。一份 wiki，多 Agent 共读共写——4-29 那批绑死 Claude Code 的 skill 包做不到这件事。

下面讲一下如何安装、如何初始化、以及如何使用 23 篇 LangChain 实战课实战Obsidian wiki。

## 如何安装（3 选 1）

```
# 方式 A: Skills CLI 一键（推荐）
npx skills add Ar9av/obsidian-wiki

# 方式 B: git clone + setup.sh
git clone <https://github.com/Ar9av/obsidian-wiki.git>
cd obsidian-wiki && bash setup.sh

# 方式 C: 手动 symlink（按 Agent 查路径，Codex 用 $ 不是 /）
.claude/skills/
```

`setup.sh` 做 4 件事：

1. 询问 Obsidian vault 路径（新空文件夹或已有 vault 都行）
2. 写配置到 `~/.obsidian-wiki/config`
3. 把 `.skills/*` symlink 到 14+ 种 Agent 的全局 skills 发现路径（含 Claude Code / Cursor / Codex / Gemini CLI / Hermes / OpenClaw 等）
4. 全局装 `wiki-update，` 从任何项目都能调

Claude Code 装完是这样：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

高频 6 种 Agent 启动速查：

| Agent | 启动命令 | Skills 目录 | Slash 前缀 |
| --- | --- | --- | --- |
| **Claude Code** | `claude "set up my wiki"` | `~/.claude/skills/` | `/` |
| **Cursor** | chat 里输 `/wiki-setup` | `.cursor/skills/` | `/` |
| **Codex (OpenAI)** | `codex "set up my wiki"` | `~/.codex/skills/` | **`$`**  （不是 `/` ） |
| **Gemini CLI** | `gemini "set up my wiki"` | `~/.gemini/skills/` | `/` |
| **Hermes** | `hermes "set up my wiki"` | `~/.hermes/skills/` | `/` |
| **OpenClaw** | `openclaw "set up my wiki"` | `~/.openclaw/skills/` | `/` |

## 如何初始化

不管哪种安装方式，最后一步都一样——在你的 Agent 里说一句：

```
set up my wiki
```

`wiki-setup` 会自动：

- 在 vault 里建好 `raw/` · `wiki/` · `_raw/` · `.manifest.json`
- 写好 `index.md` （全局目录）和 `log.md` （操作历史）
- 提示你录入第一篇素材

## 实战：如何使用23 篇markdown格式的 LangChain 实战课

为什么选这份：

- **黄佳老师《LangChain 实战课》**
	（极客时间 课程 ID 100617601），共 23 篇，每篇 markdown 约 3000 字，总量 约 7 万字
- markdown 源在 https://github.com/uaxe/geektime-docs（1.3k★）
- 篇节跨引用多：LLMChain / PromptTemplate / Agent / Memory / RAG / VectorStore / Chains 在 5篇里都会出现
- LangChain 本身在快速演化，课程基于 0.0.x、2026 年已到 0.3.x。"旧文档 + 新现实"的矛盾交给 schema-agent 来标记很合适

### 步骤一：把课程笔记内容，全部存在 \_raw/ 暂存层

```
git clone https://github.com/uaxe/geektime-docs.git ~/tmp/geektime
cp -r "~/tmp/geektime/AI-大数据/LangChain实战课/docs"/* /path/to/your/vault/_raw/langchain-course/
```
![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 步骤二： 一条命令 ingest 全量

在 Claude Code里输入：

```
/wiki-ingest 把 _raw/langchain-course/ 全量导入 wiki，按章节聚合概念
```

Ar9av 的 ingest-agent 走 Karpathy 原论述的 4 阶段：

1. **Ingest：**
	读完 23 篇 markdown，给每篇写 1–2 句 `summary:` 到 frontmatter
2. **Extract：**
	提取概念 / 实体 / 关系 / 悬而未决的问题，每个来源打 provenance（ `extracted` / `^[inferred]` / `^[ambiguous]` ）
3. **Resolve**
	：同概念页面自动合并。比如 "PromptTemplate" 在 04 / 05 / 06 篇文章都出现，会合并成 **一个 wiki 页面 + 三个节 references。** 矛盾项会单独标出——课程里 "VectorStore" 还是 Pinecone，新版 LangChain 改推 Chroma，会被加个 `^[ambiguous]` 标记。
4. **Schema：**
	schema 不预设，跟着源资料长。下次你进、LangGraph 课程的笔记进来也不会破坏老结构

`.manifest.json` 记住了每份源文件的 hash，下次 `/wiki-update` 只跑 delta，不重复干活。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 步骤三： 查询验证

```
/wiki-query LangChain 里 Memory 模块的几种类型有什么差异？
```

分级检索：先在 `index.md` 定位，再读 body。命中 04 篇 + 11 篇 + 19篇，列出 ConversationBufferMemory / ConversationSummaryMemory / VectorStoreRetrieverMemory 三种，附 23 篇实战里的取舍和原篇节链接。

```
/wiki-query quick answer LangChain 0.0.x 和 0.3.x 主要 breaking changes
```

quick answer 模式只读 index、不读 body，省 token。返回"课程基于 0.0.x，关键差异 5 处"，要看细节再点进去加载全文。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 步骤四：graph 导出看知识图谱

```
/wiki-export
```
![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

输出四份：

- `graph.json`
	— 通用节点 / 边格式
- `graph.graphml`
	— 导进 Gephi 做网络分析 / 社区检测
- `graph.cypher`
	— 导进 Neo4j
- `graph.html`
	— **双击浏览器打开，知识图谱直接打开**

自然语言上色：

```
color my graph                  # 默认按 top 10 tag
color code by category          # 按 7 大文件夹
highlight visibility in graph   # 高亮 PII / internal 标签
```

### 步骤五：检查数据状态

```
/wiki-status      # 看 7 日 delta + bridge pages
/wiki-lint        # 找断链 / 缺失页 / 矛盾 / 过时
/cross-linker     # 自动补 [[wikilinks]]
/tag-taxonomy     # 标签词表治理
```

### 特别玩法：发现你以前的 AI 对话

这个是 Ar9av 独家。你调 LangChain 时跟 Claude Code / Codex 聊过的所有内容都在 `~/.claude/` 和 `~/.codex/，` 一条命令全部装进wiki：

```
/claude-history-ingest      #  ~/.claude 会话与记忆
/codex-history-ingest       #  ~/.codex sessions / rollouts
/wiki-history-ingest hermes # 同款适配 hermes / openclaw
```

效果：你为调通某个 Memory 问题踩过的 7 个坑、试过 3 种 prompt、最后选哪个方案为什么选，都以 wiki 页形式落到第二大脑里。下次再遇到同类问题，不用从头开始。

## 总结一下 obsidian-wiki 的优势

装上 obsidian-wiki之后，第二大脑不再是"你存素材、偊尔翻一下" 的无效数据库。三个变化：

第一： 让 AI 接管课程及笔记

raw/ 里是原始素材，wiki/ 里是 LLM 重写过的结构化页面，你只管存源素材。

第二：回到过去

`history-ingest` 把你过去半年和 AI 的对话沉淀成知识——你为调通 LangChain 踩过的坑、试过的 prompt、最后选的方案，下次同类问题重现不用再走一遍。

第三：知识网络可视化

wiki-export → Gephi 或 graph.html，你的概念关系网长什么样、哪些孤岛、哪些中心，一图看清。

Ar9av 真正干的事：把你和 AI 的对话历史，变成你和 AI 共同维护的知识资产。

将无形资产可视化的全过程，资产沉淀的越多越有价值。

🙏欢迎三连击， **关注、点赞和推荐** 🙏

Ai教程 · 目录

作者提示: 个人观点，仅供参考

继续滑动看下一个

灵境星匠AI

向上滑动看下一个