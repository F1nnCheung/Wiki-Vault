---
title: "手把手实践 Karpathy 爆红的 AI 知识库"
source: "https://mp.weixin.qq.com/s/93-751qeWmt-wDY_fP0Ciw"
author:
  - "[[多颗糖]]"
published:
created: 2026-05-08
description: "包教包会"
tags:
  - "clippings"
---
多颗糖 *2026年4月10日 07:15*

上周最火的一篇推文：Karpathy 提出了一种 LLM Knowledge Base 的知识整理方法，也叫做 LLM-wiki，最近我动手实践了一下，写下了这篇教程。

视频版在 B 站 BV1ouDbBiEEr，或者点击“阅读原文”查看。

作为一个笔记爱好者，也折腾过不少笔记，感觉每年都在换，从有道笔记、为知笔记、OneNote、印象笔记、Bear、语雀、obsidian、logseq、heptabase 到现在用的 notion 和 flomo 组合，差不多把市面上的笔记软件都折腾了个遍，读了《卡片笔记写作法》，也在少数派研究了各种笔记软件整理方法 PARA 诸如此类的奇巧淫技，突出的主要问题其实就一个：

整理成本大于写作成本。

很多时候我们要花很多时间去整理笔记，设计目录结构，为一篇新的笔记想好存放的路径，但是我们正在要使用的笔记，好像又少之又少。

也就是说，大部分笔记没有“活”着，处于“深睡眠”状态。

现在我们有了 LLM，我们可以把知识喂给他，然后要用的时候直接找他要，之前提出了 RAG 之类的问答方式，现在 Karpathy 提出了一种新的、不需要 RAG 只需要 LLM 的方式。

我们一起来实践一下。

## 0\. 准备工具

我们需要一个 markdown 文件阅读器（Karpathy 推荐 obsidian），一个 LLM Agent（Claude Code、Codex、Gemini 或者 KIMI 都可以），个人比较推荐前两个。

## 1\. 基本原理

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

vault 代表 obsidian 里的一个独立的仓库，我们通过 LLM 维护 3 个文件夹：

raw/：存放笔记素材，可以是文章、推文、论文、截图、笔记和体检报告，只要是主体相关的，都可以丢进去，不用整理；

wiki/：通过 LLM 阅读 raw/ 里的素材之后，编译成一个结构化的知识 wiki，也就是说，将整理笔记的工作丢个 AI；

output/：保存你和 LLM 的对话，好的回答可以存回 wiki，继续编译为结构化知识。

The schema：通常是或文件，告诉 LLM 维护结构化知识时需要遵循的工作流；

接下来，我们的工作流就分为 3 步：

摄入：把信息源丢到 raw/ 文件夹，我们可以通过 Obsidian Web Clipper 插件来实现；

查询：我们对着 LLM 开始提问，LLM 会去搜索相关素材、引用、并综合为答案，好的答案可以作为新页面重新归档到维基——我们要比较、分析和发现知识中的联系，这些都很有价值，不应该被消失在聊天记录里。

Lint：定期让 LLM 对维基进行健康检查。发现其中的：矛盾素材、已被新知识取代的陈旧知识、孤儿页面和缺失的交叉引用等等。

我们来试一下。

## 2.安装

首先我们打开 Obsidian，创建一个新的 vault：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

然后进入 vault 所在的路径，打开我们的 LLM Agent 对话框，通过 Karpathy 提供的 \[\*\*llm-wiki.md\*\*\]() 来进行安装，直接把其中的内容丢给我们的 LLM Agent，如下图所示（我丢给了 codex）。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

执行完毕后的 obsidian 目录长这样：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

接下来，我们要往 raw/ 里添加素材，在这之前，我们先安装 obsidian 插件 Obsidian Web Clipper 并进行设置。

（Chrome 安装插件的方式此处省略）

安装好插件后，我们做一个更方便的设置，把剪裁后的网页内容，直接保存到 raw/ 目录下面，我们的是保存在 /raw/inbox/ ，你只需要按照下图设置，修改如下变量即可。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

接下来我们精选一些想要的素材，我这里用来研究 Harness engineering，所以我把一些重要的文章剪裁进了 raw/ 文件夹， 通过选择 5-10 篇，然后告诉 LLM Agent，开始整理 wiki，我的提示词是：

> 让我们创建一个关于 Harness Engineering 的 wiki。我已经在 raw 文件夹里放入了一些信息，请你再自行做一些调研，并把相关的 raw Markdown 文件整理进来，用于生成这份 wiki。

接下来可能需要比较长的时间等待。

创建完毕后，我们可以通过 LLM 基于这个 wiki 进行问答。

## 一些感想

LLM wiki 这套方法虽说挺高级，但也不是没有缺点。

有几点个人感想：

- 不能代替思考。这也是最重要的，笔记永远只是记录，用上 LLM 也只是帮你整理，但是想要真的从中获得知识，还是要经历一些痛苦的思考，并不是说把思考外包给了 LLM。所以提问的水平还是很重要。
- 不能代替个人随想笔记。如果你要记录一些随想、灵感或片段，这个方法可能也不适合你，它适合围绕一个主题来构建 wiki，可以是个人健康、运动、研究、读书、代码、商业分析等等，但随想笔记缺乏关联，并且每个笔记就几十个字，可能还是使用备忘录或者 flomo 会好些。
- 和 NotebookLM 的对比。当然，这套方法最大的优点在于本地化，如果你有本地模型，可以很隐私。但是 NotebookLM 的优势是，多媒体支持强大，可以生成播客等等。我觉得各有优劣。

总之，这套方法是有门槛的，网上其实也有一些争议，HN 上有人说得很直接："I'm not sure how you can get any closer to turning your thinking over to machines."

到底好不好用，我体验一段时间之后，也许会再分享一下。

***欢迎关注我的公众号：***

**微信扫一扫赞赏作者**

上头智能体 · 目录

阅读原文

继续滑动看下一个

多颗糖

向上滑动看下一个