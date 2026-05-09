---
title: "从崩溃到兴奋，5小时把DeepSeek V4接入Obsidian实现自动化"
source: "https://mp.weixin.qq.com/s/2wxVHds50cNYQ4heAe5MeA"
author:
  - "[[小观]]"
published:
created: 2026-05-08
description: "现在我的Obsidian知识库彻底告别纯手动时代，进入半自动AI托管模式。"
tags:
  - "clippings"
---
小观 *2026年4月27日 18:10*

上周 DeepSeek V4 发布了，网页版速度快到飞起。做 AI 提效这么久，我一直坚信：打工人最好的外挂，从来不是只会聊天的 AI ，而是能接管自己资料库的 AI 。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/wDTqiamVZ9pyxXAv76jCY0ZObDcibAptKia9fQBTNdxUWIadIibibYVcDw7WcvkwicvkKpXESR6rnkJz3EmzfRmjYicl7bdMMgRXqcBKL7sradY998/640?wx_fmt=jpeg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

今天彻底下定决心改造！

参考了很多大佬的方案，最终敲定这套顶配组合：

Obsidian + Terminal 插件 \+ Claude Code + DeepSeek V4 API

整整折腾了 5 个多小时，踩满全网所有坑，终于全部调试成功✅

给大家复盘一下我的完整踩坑经历！

全程四大致命踩坑（ 90% 的人都会失败）

1\. Terminal 插件安装失败

这个插件安装步骤本身非常简单，没有复杂操作。

但最大的问题就是：无科学上网环境，大概率安装报错、加载失败。

建议大家安装前提前准备好环境，能直接避开第一步翻车。

2\. AI 自带配置方案是错的！

刚开始我让 DeepSeek 帮我配置 Claude Code 对接 DeepSeek ，它直接告诉我：

❌“ Claude Code 仅支持官方模型， DeepSeek API 接口不兼容，无法配置”差点让我直接放弃！

好在我翻到了 DeepSeek 官方配置文档，把文档链接直接丢给 AI 。

3.运行环境需要区分语法

由于这种古早配置方法，必须使用 CMD 和 PowerShell 两种语法

但是跟着 AI 配置的时候，它没有区分提示，我直接复制粘贴，导致大量代码运行报错，反复调试无果。

4. 找不到核心配置文件 settings.json

这是最折磨人的一个坑！

按照教程，安装完 Claude Code 需要修改目录下的 settings.json 文件。

但我翻遍文件夹完全找不到，全网查了很久才摸清原因：

没有登录注册过 Anthropic 账号，系统不会自动生成配置文件

解决方案很简单：手动新建 settings.json 文件，再填入对应配置代码即可。

折腾整整一下午，终于把整套链路彻底跑通。

现在我的 Obsidian 知识库彻底告别纯手动时代，进入半自动 AI 托管模式。

后续不用自己费时梳理、归档、分析文档，交给 AI 就能自动整理笔记、分析内容、归类归档。

当然搭建只是基础，接下来最重要的工作：精细化优化知识库管家规则，让 AI 更适配我的笔记逻辑、工作习惯。

继续滑动看下一个

百妙观察

向上滑动看下一个