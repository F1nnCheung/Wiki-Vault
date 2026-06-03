SailorY *2026年5月28日 20:36*

> 个人知识库搭建，我很早的时候就提到了要写一篇个人知识库搭建的文章，但是一直拖更哈哈哈，正好最近玩AI比较多，就搜集整理了一些，搭建了一下。——填一下之前文章埋的坑哈哈哈~ 这个文章里面提到的哈哈哈（属于自己考古自己了）： [Mac工作流搭建分享（科研版）](https://mp.weixin.qq.com/s?__biz=MzYyMjgxMTQ0Ng==&mid=2247483669&idx=1&sn=bd314c0be38cdbbec4a814196d65cf46&scene=21#wechat_redirect)

## 前言

**Obsidian** 是一款非常好的开源知识库管理软件，适合用来管理自己的文章。在日常的学习和写作当中，我一般使用 `Typora` 来进行写作，而 `Obsidian` 则更多的用于对我写好的文章以及收集的资料进行管理。然而在使用 `Obsidian` 进行日常管理的过程中，对标签、链接的添加往往很枯燥和繁琐——于是我就搜索了解，看看能不能将 `AI` 接入 `Obsidian`,帮助我进行知识的管理。然后我就发现了这么一个宝藏的方法： `ClaudeCode+Obsidian`,还了解到了大神Karpathy的 `LLM Wiki` 项目，便开始在自己的电脑上进行复现和尝试。

本文主要内容：

1. 将 `LLM Wiki` 配置到自己电脑上的流程，以及其简单使用。
2. Obsidian在 `AI` 的帮助下，怎么帮助我们进行知识的管理和可视化。

## LLM Wiki配置流程

> **LLM Wiki 简介：** 是利用大预言模型构建知识库的一种模式。它将Obsidian当成集成开发环境（IDE），把LLM当成程序员，wiki就是代码库。这适用于很多不同的情境：
> 
> - **个人** ：追踪自己的目标、健康、心理、自我提升——整理日记、文章、播客笔记，并逐步构建一个结构化的自我形象。
> - **研究** ：在数周或数月内深入探讨一个主题——阅读论文、文章、报告，逐步构建一个带有不断发展论点的综合维基。

> - **读书** ：边读边整理每一章，构建角色、主题、情节线索及其关联的页面。到最后你就拥有了一个丰富的同伴维基。可以想象一下像托尔金之门这样的粉丝维基——成千上万个相互关联的页面，涵盖角色、地点、事件、语言，由志愿者社区多年建立。你可以边读边自己搭建类似的东西，由大型语言模型负责所有交叉引用和维护。

> - **业务/团队** ：由大型语言模型维护的内部维基，通过Slack线程、会议记录、项目文档、客户电话提供信息。可能会有人工参与审核更新。维基之所以保持最新，是因为大语言模型负责团队里没人愿意做的维护。
> - **竞争分析、尽职调查、行程规划、课程笔记、兴趣深入探讨** ——任何你在积累知识、希望它有条理而非零散的项目。
> 	——————Karpathy原文翻译
> 
> 参考链接：大神Karpathy提出的LLM Wiki概念介绍：llm-wiki

作为个人用户，它提到的笔记整理、研究助手和读书笔记整理对我还是非常有吸引力的，我决定在我的电脑上配置一下，并且尝试用于整理我平时的学习笔记和帮助我推进毕业论文。

### 1\. 环境配置

#### 1.1 软件下载

根据Karpathy提到的内容，我们需要准备Obsidian，一款自己喜欢的AI Agent（OpenAI Codex、Claude Code、OpenCode等）工具

- Obsidian
- ClaudeCode
- Node.js(其实在配置ClaudeCode的时候已经配置)
- Python3.9+（因为部分功能需要用到python）

Obsidian可以直接去官网下载（官网链接：Obsidian - Sharpen your thinking），根据你自己的电脑选择相应的版本。

ClaudeCode可以参考我之前文章（windows、mac系统）：

- [在MacOS系统中配置ClaudeCode并接入国产大模型](https://mp.weixin.qq.com/s?__biz=MzYyMjgxMTQ0Ng==&mid=2247483874&idx=1&sn=a36cc4b646dc75126580ec13c8ab0948&scene=21#wechat_redirect)
- [在Windows中搭建ClaudeCode并接入国产大模型并使用VS Code可视化插件（免登陆）](https://mp.weixin.qq.com/s?__biz=MzYyMjgxMTQ0Ng==&mid=2247483783&idx=1&sn=4af150c3a6735f2bff337c0c558ceb9e&scene=21#wechat_redirect)

Node.js直接去官网下载即可：Node.js — 在任何地方运行 JavaScript

> 这里没啥特别复杂的，就是简单的下载对应的软件。就是claudecode的配置需要一些时间，但是之前的教程已经写得很详细了。

#### 1.2 在ClaudeCode配置LLM-Wiki

实现这一步的方法很多：

1. 使用claudecode阅读Karpathy原文让它学习提炼之后创建文件夹
2. 使用已有插件
3. 在claude市场中找llm-wiki的skill（略）

##### 1.2.1 原文学习和提炼

将Karpathy的原文复制给ClaudeCode，给他一个指令，让它学习文章中所说的框架并建立。

```
原文链接：https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
```

我在vscode编译环境下使用尝试了这个方法进行搭建（步骤如下）：

1. 告诉ClaudeCode进行学习提炼——>发送原文并执行
```
# 提示词1
我将发给你一个karpathy提出的的llm-wiki说明文档，请按照文档要求帮我建立相应的文件夹
```
2. 检查执行结果 下图展示了我的执行结果，可以看见已经整理好了完整的目录文件夹
	![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

##### 1.2.2 插件法安装

目前已经有比较成熟的插件，可以配置到各种AI工具中。安装插件参考网站：LLM Wiki — LLM-compiled knowledge bases for Claude Code, Codex, OpenCode & any LLM agent：https://llm-wiki.net/

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**安装插件** ：我在vscode中安装的这个插件（科学上网下，无科学上网没有尝试），在交互界面中输入:`claude plugin install wiki@llm-wiki`.

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以发现，在全局`.claude` 目录中的 `plugins` 文件夹中可以发现 `wiki` 文件夹已经存在了，这里我点进去之后发现markdown文件已经配置好了。在后面的使用中就可以直接告诉 `ClaudeCode` 调用 `llm-wiki` 插件中的功能或者方法，直接搭建一个框架。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

##### 1.2.3 skills方法（直接在claudecode的skills市场搜llm-wiki即可）

### 2\. 使用体验（一个课程作业复习slides的案例，简版）

> **在raws中添加文件---告诉claude执行---验证输出**

首先，我在 `raws/` 文件夹下创建了一个 `materials` 文件夹，并将一份 `计量经济学的slides` 放在其中，并输入一下提示词：

```
请帮我读取学习raws/materials中的文件，并进行学习研究和整理。
```

然后就让claudecode进行执行。在执行的过程中，claudecode会向你请求一些执行操作，并给出研究方向建议，这里可以根据自己的理解，告诉AI你的研究重点和需求。

Obsidian中的效果展示：左侧是目录，中间是整理好的资料，右边是知识网络。效果很nice！！！

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这是我最终的文件夹目录结构

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 3\. 插件拓展

#### 3.1 Claudian——在Obsidian中使用ClaudeCode

> 前提：
> 
> - 配置ClaudeCode CLI版本（但是实际上我使用发现是 **Claude Agent SDK** 框架下）
> - 下载好Obsidian，并关闭安全模式

*目前已经可以在Obsidian的插件市场找到并下载。*

1. 打开Obsidian，点击设置并关闭安全模式，浏览插件市场。
2. 搜索 `claudian` ，点击安装
	![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
3. 配置
	默认配置是使用的ClaudeCode SDK框架，但是我们可以通过设置 `Claude CLI path` 来实现，使用我之前配置好的计入deepseek的ClaudeCode CLI. 这里我忘了自己的CLI路径（我是npm安装的），然后问的claudecode让它帮我找出来的，我就直接复制粘贴了。
	```
	Claude CLI path 中文翻译
	Claude Code CLI 的自定义路径。留空以自动检测。对于原生安装程序，请使用 claude.exe。对于 npm/pnpm/yarn 或其他包管理器安装，请使用 cli-wrapper.cjs 路径（而不是 claude.cmd）。
	```
	![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
	我填好CLI之后，已经正确配置了，接入了deepseek模型。
	![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)
4. 使用

我们会发现打开插件之后，在 `Obsidian` 的左侧会出现一个小机器人头像，点开就会跳出对话框。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### 3.2 其他推荐插件

这部分我就只提供链接了，这里是karpathy在文中推荐的一些插件，但是我平时用不到，就没弄。

- `Obsidian Web Clipper` （一个浏览器插件）----https://obsidian.md/clipper
- `Marp` (可以在Obsidian插件市场中搜索到)
- `Dataview`

这次的分享就到这里，也算是填了自己之前的坑。希望能帮助大家搭建自己的知识库或者进行学习和研究。

## 参考资料

LLM WIKI 的 知识库管理文章：

LLM Wiki — LLM-compiled knowledge bases for Claude Code, Codex, OpenCode & any LLM agent 原文链接：https://llm-wiki.net/

https://github.com/nashsu/llm\_wiki 现在链接网站

---

往期推荐：

[在Windows中搭建ClaudeCode并接入国产大模型并使用VS Code可视化插件（免登陆）](https://mp.weixin.qq.com/s?__biz=MzYyMjgxMTQ0Ng==&mid=2247483783&idx=1&sn=4af150c3a6735f2bff337c0c558ceb9e&scene=21#wechat_redirect)

[在MacOS系统中配置ClaudeCode并接入国产大模型](https://mp.weixin.qq.com/s?__biz=MzYyMjgxMTQ0Ng==&mid=2247483874&idx=1&sn=a36cc4b646dc75126580ec13c8ab0948&scene=21#wechat_redirect)

[Skills实操——快速上手搭建一个skill](https://mp.weixin.qq.com/s?__biz=MzYyMjgxMTQ0Ng==&mid=2247483893&idx=1&sn=cc7e05389c25a611f8746002e67a00f5&scene=21#wechat_redirect)

**微信扫一扫赞赏作者**

真实AI使用体验 · 目录

作者提示: 个人观点，仅供参考

继续滑动看下一个

划船渡学海

向上滑动看下一个