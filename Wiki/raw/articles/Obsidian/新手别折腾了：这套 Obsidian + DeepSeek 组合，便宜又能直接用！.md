---
title: "新手别折腾了：这套 Obsidian + DeepSeek 组合，便宜又能直接用！"
source: "https://mp.weixin.qq.com/s/E--GX7SXfuYurDXmB7HzVg"
author:
  - "[[西湖太极熊]]"
published:
created: 2026-05-08
description: "当前Obsidian的内容应用和AI结合已经成为不可逆的趋势，那到底选择什么AI工具才是最理想的组合状态呢？"
tags:
  - "clippings"
---
西湖太极熊 *2026年5月1日 20:34*

![图片](https://mmbiz.qpic.cn/mmbiz_gif/0Hn5UOcS7tUKvHzRFdSsNybdh0Tlrf5JhficJ8rPgTXHSSKuWNJAkyXSibjutMY9WibAK2IQKyB4rg1q2GzxicMWmg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

当前Obsidian的内容应用和AI结合已经成为不可逆的趋势，那到底选择什么AI工具才是最理想的组合状态呢？

看了很多国内外的文章介绍，爆火的集中在Claude+Obsidian的组合. 但是在经过折腾对比以后，我发现当前对于很多新手来说，这些并不是当下主要需要考虑的，更多的注意力应该在于专注记录，并学会用最低成本，最简单的方式学会如何使用AI和AI进行最高效的协同才是关键。

对于我自己也一样，没有花太多时间去深度研究各种AI技能，而是逐步基于自己的需要来探索AI能达到的极限。

因此，我自己一直延续一个AI辅助原则：

- 配置简单
- 便宜好用

---

## 配置简单

Obsidian有一个插件Copilot可以非常方便的接入DeepSeek，极大的简化了接入deepseek的配置工作，核心只需要花几块钱充值一个接口，获得一个秘钥即可很快的进行配置成功，不需要太复杂的操作。

核心配置流程只需要如下几步：

1. 在obsidian插件中心，下载Copilot插件
2. 在deepseek的官网创建一个秘钥
3. 打开Copilot配置页面，找到model，找到deepseek\_chat，添加名称、官网地址、秘钥即可
4. 然后在basic配置页面的Default Chat Model选择deepseek\_chat即可
5. 安装完成后，左边界面会出现一个文本图案，点击后在右侧边栏会有输入窗口，即可开始deekseek使用

## 便宜好用

作为新手免不了大量的使用接口来咨询各种问题，因此，一开始不可能达到高效和高质量的协同创作。因此，deepseek api接口使用起来，要比Claude使用起来便宜6-15倍。对于新手来说，性价比直接拉满。

对于日常有高频作业的人来说，比如：笔记处理，批量生成等情况，以及自动化流水线作业多的人，先接入deepseek是最佳选择。

对于日常的应用场景，如：代码、总结、翻译等等基础问题和反馈，都可以完全满足。

等需要处理高结构性，强上下文等深度总结性的需求时，可以再考虑接入Claude来精细化的使用，那个时候才能发挥Claude的价值。

## 详细Obsidian接入DeepSeek步骤

### 1、Copilot插件下载

点击下载

点击启用

已开始使用

### 2、注册deepseek创建秘钥

登录官网链接：https://www.deepseek.com，如下：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

点击API开放平台，进入平台页面，如果没有账号，用手机或者邮箱注册登录即可。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

建议充值10元，然后会生成一个API keys，后续接入obsidian最主要的就是秘钥。

### 3、参数配置

打开obsidian设置，点击插件Copilot，显示界面如下：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

点击Model，如下：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

按照Model名称，找到deepseek-chat，勾选Enable.

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

点击编辑，打开参数配置页面：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

添加参数：

1. Model Name: 默认或者自定义即可
2. Base URL: https://api.deepseek.com
3. API Key：官网充值购买的秘钥，复制粘贴进来即可

在Basic配置页面的Default Chat Model选择刚才配置好的deepseek\_chat即可。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

回到obsidian页面，可以看到左侧功能栏最下面有一个对话图标：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

点击图标后，打开右侧边栏：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以看到chat（free）窗口，就是deepseek输入窗口，到现在就是配置完成了。

### 4、Deepseek测试

在对话框输入文字：请总结一下Obsidian和Notion的差异？运行结果如下：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

点击图标：Insert/Replace at cursor

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

可以将以上内容直接插入到当前笔记中：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

测试正常可用。

## 总结

Obsidian+DeepSeek或者Obsidian+Claude都是服务我们的工具，没有绝对的好坏高低之分，但是结合我们当前的使用场景和状态进展，选择当前最适合我们的工具，才能更高效的发挥出工具的价值。

对于新手需要不断的探索各种应用，Obsidian+DeepSeek的组合就是当前最佳的选择，配置只需要几分钟，界面化填写配置非常简单，详细步骤如上分享。

希望更多的人可以充分的使用起来，如大家有更好的AI方案，也可以一起分享讨论！

\--END--

**微信扫一扫赞赏作者**

Obsidian知识管理 · 目录

继续滑动看下一个

西湖太极熊

向上滑动看下一个