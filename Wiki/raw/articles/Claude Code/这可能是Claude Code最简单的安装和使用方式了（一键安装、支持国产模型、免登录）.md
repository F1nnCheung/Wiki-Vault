---
title: "这可能是Claude Code最简单的安装和使用方式了（一键安装、支持国产模型、免登录）"
source: "https://mp.weixin.qq.com/s/jnbpkYhR24TVUpgLI_dxfw"
author:
  - "[[小豪被注册了]]"
published:
created: 2026-05-08
description: "如果你一直还没有尝试 Claude Code，那这篇一定适合你。"
tags:
  - "clippings"
---
小豪被注册了 *2026年4月29日 08:01*

前段时间我写过一篇《 [Claude Code 保姆级安装教程](https://mp.weixin.qq.com/s?__biz=MzA5Nzk0Njk4MQ==&mid=2247484319&idx=1&sn=0497d36a08c766c6e597515143ddaa21&scene=21#wechat_redirect) 》，反响很好，也帮助很多朋友第一次安装上了Claude Code。但说实话，基于命令行运行的 Claude Code 对很多非技术同学来说还是有一定门槛的：

- 要装 Node.js
- 要懂命令行
- 要在终端里敲命令
- 界面操作总归不太友好

那么，有没有一种更简单的方式，可以更方便的安装上Claude Code，并且既不用操作命令行、不用捣鼓Claude的账号登录（封号问题），又可以使用国产模型呢？

答案是有的！

今天就给大家介绍下 Claude 的另外一个产品：Claude桌面客户端。

> 准确说是Anthropic家的产品，Anthropic是Claude的母公司。

不废话，我们来一步一步操作。

Claude 桌面客户端是什么？

简单来说，这是 Anthropic 官方推出的桌面版 Claude 应用，支持 macOS 和 Windows，可以像安装APP一样，下载-双击安装即可。

它内置了三个工作模式：

- Chat模式：普通对话，和网页版 Claude 一样
- Cowork模式：主要面向非技术用户，可以对话、自主执行任务，处理电脑文件等
- Code模式：可以对话、自主执行任务、操作电脑，更是编程助手，更专业

我们这篇文章的重点，就是它的 **Code 模式** —— 它本质上就是 Claude Code 的图形界面版本，但比命令行版更好安装、更易用！

开通大模型，并生成API Key

因为后面运行Claude，需要配置一个大模型，如果还没有开通过大模型服务，先跟着我完成大模型开通；如果你已经有了，请跳过直接看下面的“如何安装”。

> 什么是API key？你理解为使用大模型的一把钥匙，我们购买了大模型的套餐，就可以获得钥匙，后面把钥匙配置到Claude里，它就可以使用我们的大模型了。

在这里，推荐开通火山引擎的Coding Plan（模型套餐），token量大稳定，价格良心，这种Agent产品会比较消耗token，还是比较适合的。

另外，目前国内的几家模型能力，完全可以胜任大部分用户的90%甚至100%的工作需要，放心用，不用一味追求国外顶级模型。

开通地址：https://www.volcengine.com/activity/codingplan

> 开通这个火山引擎的模型套餐，有哪些模型可以选？
> 
> 除了豆包自家的主力模型，还包含了国内主流的开源模型（包括DeepSeek、MiniMax、Kimi、智谱GLM）。
> 
> 套餐怎么选？
> 
> 轻度用户开通40元/月的，重度用户直接开通200元/月的，首次使用Claude，可以先开40元的，不够用后续可以升级套餐，很方便。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

开通以后，点击左侧API Key管理，生成一个API Key：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

生成好API key以后，页面先放在这，我们进行下一步。

如何安装？

### 第一步：下载安装包

打开 Claude 官方下载页面，选择你的系统：

- **macOS** ：下载 for macOS 版本（同时支持 Intel 和 Apple Silicon）
- **Windows** ：下载 for Windows 版本
- **Linux** ：暂不支持

> 下载链接：https://claude.ai/download

### 上图为Windows系统看到的下载页面

### 第二步：双击安装

Windows 用户：双击运行下载的安装程序，一路下一步即可。

macOS 用户：打开下载的`.dmg` 文件，把 Claude 拖到 Applications 文件夹。

第三步：打开Claude客户端的3P模式

什么是3P模式？

3P模式其实也叫 Cowork 3P，是 **Claude 第三方大模型部署模式** （3P = Third-Party）的简称。

简单来说：

**正常模式** ：Claude 桌面客户端是通过 Anthropic 自家 API 运行，需要登录 Anthropic 账号和使用 Claude 自家模型，数据经过 Anthropic 服务器。

**3P 模式** ：该模式下将允许客户端的模型推理请求路由到你自己配置的第三方大模型，而不是 Anthropic 的官方 API。对话历史存储在用户本地设备上。

所以，这是一种官方允许的、合规的使用非Claude模型驱动Claude的方式，可以安心使用。

如何打开3P模式？

一、打开刚刚安装好的 Claude 客户端，不要登录，只是打开！

二、点击左上角菜单（三条横线）

三、依次选择菜单：Help → Troubleshooting → Enable Developer mode （Mac用户也按照此菜单路径选择）

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

四、上面操作可能会自动重启Claude，重启好以后，在刚刚的菜单里，就会多出一个 Developer 的选项（即开发者选项），然后依次选择：Developer → Configure third-party inference

五、此时会打开 Configure third-party inference 配置页面（如下图）

开始配置第三方大模型：

1）选择 Gateway（通常是默认选项，如下图）

2）Gateway base URL：如果你开通的是火山引擎的Coding Plan，这里请填写https://ark.cn-beijing.volces.com/api/coding；如果是其他家的Coding Plan，请查看下对应厂家的URL，通常会有比较明确的文档说明。

3）Gateway API key：这里就需要用到我们前面在火山引擎后台创建的API Key啦，从火山的那个后台把 API key 复制过来。

4）Gateway auth scheme 就默认 bearer。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

5）设置具体大模型：下滑页面，配置具体要使用的模型，比如火山引擎的套餐下，是可以选择很多家的大模型的，包括它们自己的doubao，还有minimax、kimi、glm和deepseek。

```apache
# 火山引擎套餐直接复制下面的model名称# 推荐使用 minimax-lastest 和 doubao 的minimax-latestkimi-k2.6doubao-seed-2-0-code-preview-latestglm-5.1deepseek-v3.2
```

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

6）上面的配置好，点击底部“Apply locally”，然后会提示重启，点击重启即可。

大功告成！

重启好，此时就开始使用 Claude 啦

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

切换为 Code 模式（推荐）

配置上面的第三方大模型后，默认Claude 客户端是以 Cowork 模式运行的，它跟 Code 模式还是有一些差异的，如果想完全使用Claude Code的能力，点击左上角的 </> 切换为 Code 模式。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

切换为 Code 模式后，你就进入了 Claude Code 的图形界面版本，这就跟使用命令行版本的Claude Code没有什么差异了。

开始使用前，需要先选择一个文件夹作为你的工作文件夹（点击Open folder），然后就可以开始跟AI对话或下发指令了。

> 因为 Claude Code 是需要依赖一个指定文件夹进行工作的，这是一种项目制的思维进行工作开展和管理，适合复杂、持续性的工作任务。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

最佳实践

1、因为 Code 模式下，是以文件夹的方式进行使用和会话管理的，所以建议左侧会话这里（见下图），可以将 Group by 设置为 Project （按照文件夹进行分组展示会话，更清晰也符合实际工作场景）

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

2、Code 模式下，如果想引用一个当前文件夹下的文件，可以输入@，然后就可以选择指定文件了，可以让AI基于指定文件进行分析或相关操作。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

3、Cowork 和 Code 模式都有 Scheduled 定时功能，可以设置一个定时任务，让Claude在指定时间帮你完成一个指定任务（比如每日晨报、定期自动整理你的文件或者工作汇报等）。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

4、另外，你还可以根据你的工作场景，给它安装上各种Skills，将大大提高工作效率！

之前推荐的《 [OpenCLI 保姆级安装指南（Claude Code和龙虾必备浏览器自动工具）](https://mp.weixin.qq.com/s?__biz=MzA5Nzk0Njk4MQ==&mid=2247484394&idx=1&sn=ed1a43a992846b1072b91eab180736ca&scene=21#wechat_redirect) 》建议大家先安装上，这样你的 Claude Code 使用浏览器会很方便。

更多Skills，可以去下面两个网址看看，搞不懂的私信或留言～

https://skillhub.cn/

https://clawhub.ai/

说两句

如果你之前因为命令行的门槛一直没尝试 Claude Code，那桌面客户端就是为你准备的。

如果你已经在用命令行版本，桌面客户端的图形化 Diff 审查和并行会话功能，也值得你尝试一下。

AI工具的普及，需要从"降低使用门槛"开始，我一直希望帮助更多非技术同学更好的拥抱AI，而 Claude Code 目前确实代表了当下最主流和强大的AI工具和能力，还是希望每个人都去用一用，学习下，感受下。

好了，今天就到这，希望对你有用。

更多推荐：

[OpenCLI 保姆级安装指南（Claude Code和龙虾必备浏览器自动工具）](https://mp.weixin.qq.com/s?__biz=MzA5Nzk0Njk4MQ==&mid=2247484394&idx=1&sn=ed1a43a992846b1072b91eab180736ca&scene=21#wechat_redirect)

[【进阶篇】让你的 Claude Code 更懂你，初识 CLAUDE.md](https://mp.weixin.qq.com/s?__biz=MzA5Nzk0Njk4MQ==&mid=2247484353&idx=1&sn=de01196443b38076d89946eef302f9bf&scene=21#wechat_redirect)

[一文讲透 Hermes（含保姆级安装教程）](https://mp.weixin.qq.com/s?__biz=MzA5Nzk0Njk4MQ==&mid=2247484498&idx=1&sn=65173ae1e9a97b194301d7737ebaff45&scene=21#wechat_redirect)

[OpenClaw 小龙虾保姆级安装教程（手搓最新版，含打通飞书教程）](https://mp.weixin.qq.com/s?__biz=MzA5Nzk0Njk4MQ==&mid=2247484654&idx=1&sn=8de49fadc8c452d73c0cf7f0ee740536&scene=21#wechat_redirect)

**微信扫一扫赞赏作者**

继续滑动看下一个

小豪被注册了

向上滑动看下一个