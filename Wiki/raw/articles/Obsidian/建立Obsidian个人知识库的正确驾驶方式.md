---
title: "建立Obsidian个人知识库的正确驾驶方式"
source: "https://mp.weixin.qq.com/s/RY7Feokexi4_dN9AW8WD8w"
author:
  - "[[isEris]]"
published:
created: 2026-05-08
description: "有多少人看了karpathy发布LLM WIKI这篇文章，进而发表自己是怎么搭建Obsidian的个人知识库的"
tags:
  - "clippings"
---
isEris *2026年4月7日 14:31*

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/mueTe9C2d0R96ibXG2nqf9KIYAjz7FUpDoZhvSWaXO2gUlxWDE72tBmSpvWGO9jFMKM0ibGWRBBDX3mGWxdhicuOibD28HY60Xo8GhEIDOmDIyg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

有多少人看了karpathy发布LLM WIKI这篇文章，进而发表自己是怎么搭建Obsidian的个人知识库的。

> https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f
> 
> karpathy

## 整体的思路是这样的：（下述文件范围默认为Obsidian全局）

通过不同方式将源文件（编写的、摘录的内容）放入

放入时，插件Templater自动打上标签

定期用插件Text Generator，根据标签进行蒸馏，得到Wiki页面，用Obsidian的双向连接符号标注实体，及得到实体关系

插件Text Generator，将 Wiki页面 放到指定目录，如：个人Wiki

插件Dataview，形成知识地图，动态更新Wiki

和个人Wiki对话。通过插件copilot指定目录

插件关系图谱，去呈现图像化的实体关系

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Obsidian的插件，英文名是plugin，本身预装了一部分，可以去第三方市场安装更多

鉴于我已经给出了一套插件的方案，每个人可能使用的插件还不一样，只就我遇到的这些插件的情况列出遇到的问题

## 这时候你会遇到以下问题

1. 模板文件怎么写
2. 模板文件放在哪里
3. Templater和Text generator两个模板文件是独立放还是分开放（是否统一管理模板文件）
4. Templater模板文件怎么触发
5. Text Generator怎么配置
6. copilot里LLM是否配置正确，能使用
7. Text Generator的模板文件怎么触发（可选项：自动、右键、命令）
8. 怎么批量的用Text Generator蒸馏文件，批量的范围
9. 以上规则是否有需要排除的目录
10. 已有的文件已经有标签头，怎么处理
11. 对于这次改造怎么批量处理和统一标签头
12. 已蒸馏的文件标签怎么在蒸馏后修改
13. 插件报错了怎么处理？特别是text generator、copilot，错误并不会给出具体的错误代码和错误关键词
14. 操作界面50%是英文，排版紧密，无法选中描述文字。掺杂专业名字，你需要具备较高的英文阅读能力

这些问题我用1天都解决了，但最后Text generator处理单个文件的时候，可以正常的蒸馏，当我一次性将700个文件丢给它的时候，它没有报错，但是也没有出结果。

## 这时候我就在想，使用了这么多插件，配置了这么久，我想要的是：

一个实体关系准确的个人知识库，能够自动或者定时的去更新，能够对话，能够可视化

那我一定要使用Obsidian吗？一定要使用Obsidian的插件去实现才能自动吗？市面上有没有其他产品可以做得到呢？

然后我总结了下面这一句话，丢给了IDE（用你自己熟悉的）：

```powershell
帮我做一个脚本，实现以下功能初次使用时，记录用户接下来配置的信息。后续启动时就可以直接作为默认值，用户也可以修改。输入需要蒸馏的区域。默认是整个Obsidian目录。输入需要排除的区域。可以结合上一步来对特定的目录排除。这两个选项结合之后，就可以得到一个灵活的交集。输入知识库的目录。通常是用户在Obsidian目录里面新建一个子目录。配置LLM模型的信息。通过CURL的方式来请求。Base URL.API key。模型ID。脚本提示词。默认已经写好了一段提示词，用户可以修改。以上信息确认后，脚本开始工作，去每个文件蒸馏并输出到指定目录。蒸馏完成的文件，将标签改为已蒸馏。蒸馏完成后，显示统计，蒸馏了多少个文件以及时间。
```

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

大概20分钟，我就得到了全部蒸馏的文件。这时打开插件知识图谱，就可以可视化这些实体关系了。

之后，我有文件直接丢Obsidian里面，自动打标，每天运行一下这个脚本。没了。

实现了全自动。我要提问的时候，我甚至都不需要打开Obsidian，我可以在IDE里面去提问，并且即时调用联网能力去对提问的内容进行后续处理。

## 所以，为什么要使用Obsidian的插件去做这些事情呢？在现在

用现在任何一个IDE，我觉得都能完全覆盖Obsidian的功能，有任何问题都可以用自然语言去沟通和解决。而Obsidian最大的优点是在于它能较好地让人阅读Markdown文件，同时Markdown文件本身就能被模型阅读。

知识库 · 目录

作者提示: 个人观点，仅供参考

继续滑动看下一个

男朋友的求生欲

向上滑动看下一个