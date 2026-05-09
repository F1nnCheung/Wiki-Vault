---
title: "Claude 官方客户端 + DeepSeek-V4：免登录，无需订阅！（保姆级教程）"
source: "https://mp.weixin.qq.com/s/4G5sNwkrGSQ_epa5OgtjNQ"
author:
  - "[[木易的AI频道]]"
published:
created: 2026-05-08
description: "Claude 桌面客户端，可以自定义第三方模型了！"
tags:
  - "clippings"
---
木易的AI频道 *2026年4月29日 06:01*

Claude 桌面客户端，可以自定义第三方模型了！

国内不用账号直接用。不需要海外手机号验证，不需要订阅。

Claude Cowork 和 Claude Code 都可以。

划重点，这是 Anthropic 官方支持的功能。Claude 桌面版的菜单里多了个新开关，叫 `Configure Third-Party Inference` 。

`DeepSeek-V4` 、 `GLM-5.1` 、 `Kimi-K2.6` 、 `GPT-5.5` ，任何兼容 Anthropic API 接口的模型都能接进去。

接上 `DeepSeek-V4-Pro` 满血版，1M 上下文、输入命中缓存永久 1 折、配合 `V4` 的限时 2.5 折，这性价比堪比 Coding Plan。而就在昨天，DeepSeek 延长了 2.5 折的截止日期到 5 月 31 日 23:59。香到爆。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/VpHtkRLWJlhHJU37WxFASMgzv04xJYWKwYPjxpe43U7Tk2SOyVwXMG3hZvvSAiamUibwLyxFAjcphHnQvlszoE1ticLBr136IPIUfAnKVryTK8/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

拿 Anthropic 最强客户端，搭配国产最强开源模型。官方支持，非破解。

话不多说，依旧手把手教程。上车，走起。

---

### 01｜先拿到 DeepSeek API Key

已经有了的小可爱直接跳到下一步，没有的继续。

打开 DeepSeek 开放平台 `platform.deepseek.com` ，注册登录。

点左侧菜单栏里的「API keys」进入 API Key 管理页面。选「创建 API Key」，给它起个名字，点确定，然后复制保存好。

`sk-xxx` 这串 Key 后面你就看不到了，得重新生成。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

新账号记得充值。左侧菜单点「充值」。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

### 02｜Claude 桌面客户端，开发者模式

去 `claude.com/download` 下载 Claude 桌面客户端。

Mac 和 Windows 都支持，Linux 暂时没有。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

安装。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

重点来了，安装好先别登录账号。第三方模式和 Claude 官方账号互不兼容，之前登录的要先退出，重新打开。

打开顶部菜单 `Help` → `Troubleshooting` → `Enable Developer Mode` ，打开开发者模式。

![4](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

按提示重启，菜单栏会多出一个 `Developer` 的选项。

如果你之前安装过老版本，第一步先 `Claude` → `Check for Updates` 升级。自定义模型这个功能是最近才加的，旧版菜单里可能没有。

---

### 03｜接入 DeepSeek-V4

从顶部菜单栏里找到 `Developer` → `Configure Third-Party Inference` 。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

会出来一个弹窗。默认就是 `Connection` ，连接方式选 `Gateway` 。这是 Anthropic 给非自家服务开通的通用入口，凡是兼容 Anthropic 协议的都可以从这里接入。

依次填下面这三项。

```
Gateway base URL:     https://api.deepseek.com/anthropic
Gateway API key:      你的 DeepSeek API Key
Gateway auth scheme:  bearer
```

Gateway auth scheme 必须选 `bearer` 。选错了会连不通。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续往下拉到「模型列表」（Model list）那一栏，添加模型。

```
deepseek-v4-pro[1m]
```

`[1m]` 后缀解锁百万上下文。Cowork 和 Code 都是 agent 类型的请求，DeepSeek 会自动把思考强度设成 `max` ，这就是满血版 `V4-Pro Max` 。

模型 ID 下面有个 `1M-context` 开关，记得打开。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

加完点击右下角的 `Apply locally` ，然后选 `Relaunch Now` 。桌面客户端会自动重启。

进到主界面，你会看到左上角有 `Cowork` 和 `Code` 两个标签。

默认模型就是你刚才填的 `deepseek-v4-pro[1m]` 。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

发一句话试一下，有回复就大功告成了。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

小彩蛋，能接的模型，远不止 `V4` 。

Gateway 只认接口协议，理论上任何兼容 Anthropic 的模型都能接入。

一个桌面客户端，随意切换多个模型。

Cowork 是给非技术用户的桌面 Agent，读你电脑里的文件、整理表格、写报告。Code 是带图形界面的 Claude Code，能调用系统命令、Skills、MCP。

可以冲了。成功用上的小可爱评论区吱一声。

---

> 我是木易，Top2 + 美国 Top10 CS 硕，现在是 AI 产品经理。
> 
> 关注「AI信息Gap」，让 AI 成为你的外挂。

---

**微信扫一扫赞赏作者**

Claude · 目录

阅读原文

继续滑动看下一个

AI信息Gap

向上滑动看下一个