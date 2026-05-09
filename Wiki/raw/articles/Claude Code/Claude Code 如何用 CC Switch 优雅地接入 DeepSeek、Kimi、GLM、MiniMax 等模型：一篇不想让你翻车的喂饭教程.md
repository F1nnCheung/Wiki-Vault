---
title: "Claude Code 如何用 CC Switch 优雅地接入 DeepSeek、Kimi、GLM、MiniMax 等模型：一篇不想让你翻车的喂饭教程"
source: "https://mp.weixin.qq.com/s/szvOQbNaQ01Qj_921Ptpsg"
author:
  - "[[石不多话]]"
published:
created: 2026-05-08
description: "你要是在 Claude Code 里手动换过模型，就知道有多烦。找配置文件。改 settings.json。"
tags:
  - "clippings"
---
石不多话 *2026年4月28日 15:56*

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/DibF67705Gy84yuJ9Rvn4hJu2rUUcxPhLOXmic4X8m7x2o92ftoKheMhIGthRNtmTIG7HNrzFdvXBp3r2YLcjg0PJB8wHJgN5zu2mk23EraL4/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

你要是在 Claude Code 里手动换过模型，就知道有多烦。

找配置文件。

改 `settings.json` 。

填 `base_url` 。

填 `auth_token` 。

填模型名。

一个字符写错，直接原地爆炸。

你只是想吃碗面，老板让你先去后厨修燃气灶。 合理吗？不合理。

程序员经常这么搞，我也被搞过，那不优雅。

今天这篇就讲一个工具： **CC Switch** 。

它帮你把 Claude Code 背后的模型配置，做成一个可视化开关。

你不用背配置，不用手搓 JSON，不用对着文档怀疑人生。

选供应商，填 API Key，选模型，保存，启用，完事。

项目地址放这：

```
https://github.com/farion1231/cc-switch
```

---

## 一、CC Switch 到底解决了什么破事

Claude Code 本身不是不能接别的模型。

能接，但对普通人不友好。

你得去改配置文件，你得知道字段怎么写，你还得知道不同供应商的接口地址、鉴权方式、模型名。

这很蠢。

用户想干的是：

“我想让 Claude Code 用某个模型写代码。”

不是：

“我想研究一晚上 JSON 的语法边界。”

CC Switch 把原本藏在配置文件里的东西，搬到了桌面 App 里。

你点几下，它帮你写配置。

你换模型，它帮你改配置。

你想热切换，它也能搞。

CC Switch 就是 Claude Code 的“模型路由器”，现在伸手一切。

这才像人用的。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

## 二、先把 CC Switch 装上

打开项目 Release 页面（页面右侧，别滑太快）

```
https://github.com/farion1231/cc-switch
```

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

往下找 **Assets** 。

根据你的系统下载对应安装包。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Windows 就下 Windows 版本，Mac 就下 Mac 版本，Linux 就下 Linux 版本。

你是什么系统，就下什么系统的包。

Mac 用户下载后，双击运行。

Windows 用户下载后，按正常软件安装。

Linux 用户看包格式，该装就装。

装完之后，打开 CC Switch。

你会看到一个桌面 App。

界面不复杂，不是那种“我一打开就想关掉”的开源软件。

---

## 三、给 Claude Code 添加一个模型供应商

打开 CC Switch 后，找到 Claude Code 对应的区域。

一般会看到 Claude 图标。

图标旁边有一个加号。

点它。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这里不是让你写代码。

这里是让你选供应商。

CC Switch 内置了不少供应商预设。

你常见的那些模型服务商，基本都能找到。

选择你要用的供应商。

比如你想接某个国产大模型服务，就选对应预设。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

选完之后，你会发现很多字段已经自动填好了。

这就是 CC Switch 省事的地方。

以前你得自己去查接口地址。

现在它帮你填。

以前你得确认模型配置格式。

现在它帮你写。

你只需要补一个最关键的东西： **API Key** 。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

## 四、填 API Key，别填错，也别截图发朋友圈

选好供应商后，找到 API Key 输入框。

把你的 API Key 粘进去。

注意，不是邀请码，不是昵称，不是账号。

是你在模型供应商后台生成的密钥，相当于你钱包的门禁卡。

别乱发，别截图，别问群友“兄弟们这个 Key 能不能用”。

能用，然后你的额度也能被别人用完。

填完 API Key 后，往下看模型选项。

CC Switch 通常会给你预设一个模型名。

如果你不想折腾，就先用默认的。

如果你知道自己要用哪个模型，就手动改模型名。

注意：去各家 API 文档找模型名称。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

## 五、看一眼配置预览，但别被它吓到

当你选好供应商、填好 API Key、选好模型之后，CC Switch 会生成一段配置。

你会看到类似 JSON 的东西。

别慌。

这不是让你背。

也不是让你改。

它只是告诉你：

“兄弟，我准备往 Claude Code 的配置文件里写这些。”

你能看就看。

看不懂也没事。

这一步的核心不是研究配置。

是确认你前面填的东西没离谱。

供应商对不对。

模型名对不对。

API Key 有没有填。

确认没问题，点右下角保存。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

## 六、保存后，回首页启用它

保存之后，回到 CC Switch 首页。

你会看到刚才添加的供应商配置。

点击 **启用** 。

这一步很关键。

保存只是把配置存进 CC Switch。

启用才是把它写到 Claude Code 能读到的配置里。

这就像你把外卖地址填好了，但没点下单，你不能怪骑手没来。

点完启用后，重启 Claude Code，正常使用。（连续两次 Ctrl + C 退出 Claude Code 后，翟在进入）

下一轮请求就会走你刚才配置的模型。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

## 七、热切换：这才是 CC Switch 最爽的地方

CC Switch 最舒服的地方，不是第一次配置。

是后面切模型。

你可以在菜单栏里点 CC Switch 图标。

直接选择另一个供应商或模型配置。

切完之后，Claude Code 下一轮对话就会使用新模型。

不用关终端。

不用重启会话。

不用重新打开项目。

这叫热切换。

但有个坑你别踩。

**不要在模型正在输出、正在跑任务的时候切。**

它正在干活，你突然拔方向盘。

不报错才怪。

正确姿势是：

等这一轮回复结束。

再切。

再发下一轮。

这样稳。

配置稍微复杂，别慌。

打开设置。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

打开路由。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

激活路由。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

## 八、用量查询：别等余额没了才开始装清醒

模型用着爽，账单也会爽。

尤其是你让 Agent 跑大项目的时候，它不是在聊天。

它是在烧 token。

CC Switch 有用量查询功能。

在模型列表里，找到 **配置用量查询** 。

点进去。

打开用量查询。

如果你走的是官方 API，就选择官方查询方式。

如果你买的是 token plan，就选择对应供应商的 token plan。

保存配置。

回到首页后，你就能看到余额或消耗情况。

这功能没那么花，但很实用。

你不看账单，账单就会教育你。

成年人最朴素的 AI 使用美德，就是知道自己烧了多少钱。

配置三连。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

## 九、使用统计：看看你到底在哪些时间段最能烧钱

CC Switch 还有使用统计。

它能展示不同时间段的消耗。

这个功能适合两类人。

第一类，认真做成本管理的人。

第二类，嘴上说随便用，月底看账单沉默的人。

你能看到自己什么时候用得最多。

也能看到哪些任务更费钱。

这东西对 Agent 用户很重要。

因为 Agent 跟普通聊天不一样。

普通聊天是一问一答。

Agent 是一边读文件，一边改代码，一边跑命令，一边自我反思。

它看起来很勤奋。

账单也很勤奋。

所以你得知道钱花哪儿了。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

## 十、本地路由和故障转移：让 Agent 别半夜死在路上

这个功能稍微高级点。

但值得讲。

你可能遇到过这种场景：

睡前给 Claude Code 派了个大活。

“把这个项目重构一下。”

“把测试补齐。”

“把文档整理完。”

你满意地合上电脑，觉得自己像个掌控全局的老板。

第二天起来一看。

任务半路断了。

原因可能是供应商挂了。

可能是额度用完了。

可能是网络抽风。

可能是请求超时。

总之，你睡得很好。

它死得很早。

CC Switch 的本地路由和故障转移，就是干这个的。

它可以在本地起一个代理服务。

Claude Code 的请求先打到这个本地代理。

再由 CC Switch 转发到你配置的供应商。

如果第一个供应商挂了，它自动切到下一个。

这就像你叫车。

第一辆司机取消，平台自动给你换一辆。

你不用站路边骂街。

设置方法：

打开 CC Switch 左上角设置。

找到路由服务。

打开本地路由开关。

然后在应用路由区域，启用 Claude 路由。

建议打开“在主页面显示本地路由开关”。

这样你后面开关路由不用钻设置。

接着打开自动故障转移。

选择 Claude。

添加几个备用供应商。

回到首页后，通过拖拽调整顺序。

排在上面的优先使用。

上面的挂了，再往下切。

这功能适合长任务。

尤其适合你要让 Agent 自己跑一段时间的时候。

但要注意：

如果你用的是官方原生模型配置，路由未必适合。

有些场景会有兼容问题。

别硬开。

硬开翻车就别怪工具。

点击⚙️进入路由，选自动故障转移。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

一定要保存。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

## 十一、推荐配置思路：别什么任务都上贵模型

很多人用 Agent 有个坏习惯。

一上来就怼最贵最强的模型。

这当然爽。

但没必要。

日常小任务，比如改 README、补注释、写脚本、整理文档，用性价比模型就够。

复杂任务，比如大规模重构、架构设计、疑难 bug，再切强模型。

这才是 CC Switch 的正确用法。

不是为了炫技。

是为了把钱花在刀刃上。

你可以这么配：

一个便宜快的模型，处理杂活。

一个中档稳定的模型，做日常编码。

一个强模型，处理硬骨头。

再配一个备用供应商，防止半夜任务断掉。

这套组合比“全程顶配”聪明。

全程顶配不是专业。

那叫不会过日子。

当然，我以前也这么干。

所以我骂的是过去的自己。

---

## 十二、常见翻车点

#### 1\. API Key 填错

表现通常是鉴权失败。

解决方法很土：

重新复制 API Key。

确认没有多复制空格。

确认 Key 没过期。

确认账号还有额度。

#### 2\. 模型名填错

模型名不是你自己起的外号。

供应商叫什么，你就填什么。

大小写、横线、版本号，都别乱改。

能获取模型列表，就从列表里选。

不能获取，就去供应商控制台或文档里查。

#### 3\. 保存了但没启用

保存不等于生效。

回首页点启用。

别漏。

#### 4\. 正在运行任务时切模型

别这么干。

等当前回复结束再切。

你在高速上换轮胎，车不翻算命大。

#### 5\. 路由开了之后异常

先关路由。

确认普通直连能跑。

再开路由。

再加故障转移。

排查问题别一口气开十个功能。

那不是排查。

那是做法。

---

## 十三、最短操作流程

如果你只想赶紧跑起来，按这个来：

打开 CC Switch Releases\] 下载对应系统安装包。

```
https://github.com/farion1231/cc-switch/releases
```

安装并打开 CC Switch。

在 Claude Code 区域点加号。

选择供应商。

填 API Key。

选择或填写模型名。

保存。

回首页点启用。

打开 Claude Code，开始用。

后面想换模型，就从菜单栏点 CC Switch 图标切。

这就是全流程。

---

## 十四、我的结论

CC Switch 不是那种“看起来很高级但你用不上”的工具。

它解决的是一个很具体的痛点：

**让 Claude Code 换模型这件事，从改配置文件，变成点按钮。**

这就够了。

工具好不好，不看它吹了多少概念。

看它有没有把你的脏活累活拿走。

CC Switch 拿走的，就是模型配置这坨脏活。

你要是经常用 Claude Code，又经常在不同模型之间切，装它不亏。

手动改配置不是不行。

但人类文明都发展到 2026 年了，还天天手搓 `settings.json` ，多少有点对不起电费。

**微信扫一扫赞赏作者**

作者提示: 个人观点，仅供参考

继续滑动看下一个

石不言

向上滑动看下一个