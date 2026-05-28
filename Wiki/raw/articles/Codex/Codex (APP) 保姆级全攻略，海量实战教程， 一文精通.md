技术爬爬虾 *2026年4月29日 20:52*

最近 Codex APP 的能力越来越全面，变成了 Codex 四大产品形态里面最强的一个。Codex 比起 Claude Code，额度更高，功能更全，上手更快，免费账户也能用，而且不会出现限速、封号、降智等问题，用过的小伙伴们直呼真香。本期视频带来一个 Codex APP 的完整教程，主要分为以下 12 个章节。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwNy7qctsm1wV4zgQGQGGddtJbCDDe9rgHtIvu8sGDyM5yWKHCe45VYlsAXGySKRH2WJO35fk9syOuZnd0Ga5x61X2NkGrfYuh8/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

每个章节里面都会穿插一些重要的知识，对 Codex 的全部功能进行细致讲解。好，废话不多说，我们直接开始。

视频版：

## 安装

在安装使用 Codex APP 之前，需要进行 3 个准备工作，也就是需要先把 Git、Nodejs 还有 VSCode 安装一下。在我上期视频《从 0 开始用国内网络跑通一切 AI Agent》里面，有详细的操作步骤，不熟悉的朋友们可以参考那一期视频。

接下来我们来到 Codex 的官网，Codex 支持 Windows 跟 Mac 两大操作系统。官网会根据你的操作系统，自动提供对应的安装包。本期视频我主要使用 Windows 来进行演示。Windows 跟 Mac 电脑的功能基本是一致的，唯一欠缺的功能是 computer use，也就是自动操作电脑的能力。等需要演示这部分的时候，我会切换到 Mac 电脑进行演示。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwMzsvaNLMKuH76RGd46UvnOSh3jeTTiaAvVrVqicJIQeYZAD4N5s0CFDBmNKRPbqzr3NUyFeJ7McfVbO5TqPA5tYSNtYsW3S7B6c/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=1)

然后我们一路点击下一步完成安装。接下来我们把 Codex APP 启动起来，选择 ChatGPT 账户完成登录。现在 ChatGPT 的免费账户也能使用 Codex 了，不过额度比较低。第一次进入软件要选一下希望 Codex 为你处理的工作，Codex 会根据你的选择预装一些内置的插件和 skills。当然进入软件以后，我们还可以按需安装这些插件。然后选择主要的使用场景，是编程还是日常工作，这些都可以后续在设置里面进行修改。接下来点击设置沙盒按钮，完成沙盒的初始化。关于沙盒这部分的内容，我们下一个章节再来介绍。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwMa7mjReZxvXyL99ZCYqteFzvQSr38ILbiaadx55hgicwKGBQplcmPZicRClU0ibboUs8fKHNk7GIxv8bmuZTEXvpIfMUPHpzx45Ks/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=2)

## 项目与任务列表

我们点击右上角的按钮显示侧边栏，我们看到 Codex APP 是非常经典的三栏布局：左侧是任务列表，中间是对话窗口，右侧是多功能区域。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwOl7ewhvWwnUQyCZDKZ3fbbpa4ndWX6KwS42Wr5x2KquAictAFvFR13bph6ehEluClahssWn2iaI4lUD6vcvHibKKJSdZia7QmttlU/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=3)

我们先创建两个项目文件夹，来展示一下它的基础使用。这里我在桌面新建了两个文件夹，作为两个项目文件夹。然后我们来到 Codex，点击进入项目工作，使用现有文件夹。我们先选择第一个文件夹，这里我让它做一个 html 单页面的宠物洗护店的网页，开始。在左侧边栏里面增加了一个项目，项目的名称就是文件夹的名称，里面展示了正在运行的任务。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwO2MOSoywrVBExUZky5C3X1rF1tFpEQcIKJjdlqnEVwrpY5KpFicdATdaDiaZCUPPoVTcsfqFejI2b6Anw6kPiambym7lcdNOqZTg/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=4)

接下来我们点击左上角的新对话按钮。Windows 上的快捷键是 Ctrl+N，Mac 系统的快捷键是 command+N，来开启一个新的对话。我们可以选择新对话属于哪个项目。这里我准备开启一个新的项目，把第二个文件夹也添加进来，点击添加新项目，然后选择我们的第二个文件夹。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwMW2mOElvJ10ZfeiaHcaTTV56M8TxZQYZbLsEYMEVbSmhc8dxSPYMafEYFDrrwWltMysUdyed45Z7UIlM5CwWlMEw6Z4QeX61fw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=5)

这里输入我第二个项目的需求：用 react 框架做一个网页版待办事项的提醒工具，回车开始执行。

在两个项目并行工作的同时，我们还可以开启更多的工作对话。比如这里我想询问 Codex 一个技术问题，我们把鼠标指向第二个项目，点击这个小按钮，在项目里面开启新的对话。

这里我询问 Codex：react 框架是什么，回车。这里看到我们开启了 3 个任务并行执行，有两个任务属于项目一，一个任务属于项目 2。正在执行的任务上面都有一个转圈的小图标，表示 AI 正在工作。我们耐心等待一会。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwPyVMicciaHppiaBUkOWjMgNIWQCe0JFS1rbV1LTfDBAV2CC6mGRDEzovU45UHsgdoP26eYlC7K8xqyjcwCSPjVEvIRSVEZxwvjEc/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=6)

过了一会状态就不一样了。有一个任务上面显示一个绿色标签，表示等待批准；有一个任务上面出现了一个蓝色小点，表示已经执行完毕了；还有一个任务继续转圈。我们来到这个等待批准的任务里面，发现 Codex 需要联网下载 Vite React 项目的模板，正在申请权限。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwNAQaicITGbibcu6BfuQaLKV5mDOqZmdc9uqOa0iaDicibiajiaeIvQYnvaAQOcRx1hBNPXQtxbSRianpibhKx6UnuhcHVYkUae1mL2CurU/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=7)

我们点击“是”批准，这个任务就继续执行了。又过了一会，三个任务上面都标记了蓝色的小圆点，表示三个任务都执行完毕了。Codex 任务列表非常的简洁美观好用，可以很方便地观察任务状态，可以并行开启多个工作任务，还能高效地从多个任务里面自由地切换。

我们再来看一下左侧边栏任务列表的其他功能。新对话按钮用来开启新的对话，在下面可以选择对应的项目，也可以选择不使用任何的项目，纯粹的闲聊。这种不属于任何项目的对话，都会被收录到任务列表的最下面，也就是对话这一栏里面。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwPib4NymfhuMq3B57icGiaRKU8hxo8aEqzO0QdxgOZybnh2GIFibXOabWt0kSURPoaeUJCTk0toj92mfiazKZbDgcoMYDcujapxZY5w/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=8)

左侧边栏第二个按钮，快捷键是 Ctrl+G，Mac 电脑的快捷键是 command+G，可以搜索近期的对话历史。不过我试了一下，这个功能只能搜索到对话的标题，它无法搜索到对话里面的内容。这里补充一下，每个对话标题都是 AI 根据对话内容自动摘要生成的。我们也可以选择某个对话，双击，对它进行一个重命名。如果我们不再需要某个对话了，可以点击这个归档对话的小按钮确认，然后我们的对话就在左侧边栏消失了。在设置已归档对话里面，可以找到我们删除的对话，点击取消归档就可以把它还原回来。左侧边栏还有两个按钮，插件与自动化，这个等我们在后面的章节再来看。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwNh1OaHic0muU5ID7khr8sg5IpCibMeOvicsNAloPNF3k3T17I7Fh7mE6lGY6hJHjOX8TQ1n8FVPeXet0MFic0UFByzIrrN7lKOWcE/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=9)

## 权限控制与沙箱

接下来我们来看一下中间的对话页面。这里最显眼的功能就是权限控制。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwOQaYGiccaAkJdtr1ILQrggib1EPPrDkia2sBLjeasZOiceNpt8ehXvTyTQ4pbwl75spwDS4BibwELKGVHybNwt1g1rgNjlibiaG6ib8kE/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=10)

Codex 的权限控制全部是围绕沙箱来展开的，这点跟 Claude Code 有本质上的不同。Claude Code 的沙箱功能需要手动开启，Claude Code 的沙箱更像是一层可以额外开启的保护，而 Codex 的沙箱，它是整个权限系统运行的地基。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwNJnfIHzz2jiaFGPxdBV6XibRMKyPDjMic4KFpQcaGtgjkuvY2ASu0dqVnCkG0vUxcmj9RcKc59OMYEnzoCo4qSP676QspRv0mI2U/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=11)

Codex 会把当前的项目文件夹作为一个沙箱进行管理。在默认权限下面，Codex 具有读取修改沙箱内所有文件的权限。在默认模式下，Codex APP 可以直接修改沙箱内，也就是项目文件夹的所有文件，它并不会一个个地跑来问你。我觉得这点非常的方便，也是符合正常的使用习惯的。当然我们也可以通过设置，改成逐个文件修改都需要审批，这个在视频的后半段高级设置这个我们再来讲。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwPCibhQpnPuZrRSTmGGEm9vx1BxyxfeFrgdjuOAoImibcWb0KMKr5nDCafYIdRt94hIK7gSQ2w5xibFqMtBWC20OKvuH0gyibU4jNQ/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=12)

Codex 的沙箱有两个默认限制。第一点是 Codex 不能修改沙箱外的文件，第二点是 Codex 的沙箱是禁止联网的。这两点硬性限制，它并不是靠模型自觉遵守，而是 Codex 使用操作系统底层功能实现的。不同操作系统的实现机制是不一样的，比如 MacOS 使用的是系统内置的 Seatbelt Sandbox 机制。

Codex 的沙箱功能是前阵爆火的 Harness engineering 概念的一个典型的工程实现，用操作系统级别的机制把 AI 的能力约束在一个可控的范围之内。这也很形象地体现了 Harness 这个词的原始含义，也就是马具。AI 就像一匹能力很强的马，而沙箱权限审批机制这些，就是套在它身上的马具。

如果 Codex 需要修改沙箱外文件，或者需要联网，可以向用户申请权限，这个操作叫做 escalate，也就是提权操作。在默认情况下，提权操作都是需要人工审核同意的。Codex 为我们提供了第二个档位，也就是自动审查。启动了自动审查以后，Codex 会自动调用一个小模型，对提权操作进行安全性审查。如果发现是低风险的操作，就会直接放行。只有高风险的操作才会触发人工审查，这也是我最推荐的模式。自动审查使得绝大部分操作不需要人工审批，在获取了较高安全性的同时，还极大提升了使用的便利度。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwM6sVia1js9VIpAQ2u7qgNWJLGMbRonsT4oAjpJFoPxiaAdibpczYib5MWarpZF5yhdzCic4gpcJOcXAWibuBt2cHQOQtPHHpwLtH06k/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=13)

所以一般情况下，在权限管理这里，我都推荐开启第二档，也就是自动审查。Codex 还有第三档，完全访问权限。开启了这个以后，Codex 完全无视沙箱的限制，可以在电脑上执行一切的操作。不过我们尝试开启的时候，这里出现了很醒目的风险提示，提示我们要谨慎使用。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwPQ4S6RqYHiaqe8YZUH2mfxJ2p5TCJmjX9GMBrlkK7q9FEhgrTGL8nYnBOsLYOtkDzZ8Rch2jNFy1dqLcbvgZWjibD4PdQX42e30/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=14)

## 上下文

在权限控制的右边有一个圆圈，展示的是当前上下文使用情况。这里翻译得不太好，准确的翻译应该是上下文使用量信息，显示的是这个对话里的历史对话内容占用了多少模型上下文空间。当上下文超过限制的时候，Codex 会自动对对话历史进行压缩，从而释放出更多的上下文空间。我们也可以输入斜杠，选择压缩选项，手动触发一次上下文压缩。压缩完成以后，Codex 会把之前对话的一些不重要的内容排除掉，可以有效提高 AI 的专注力，并且降低 TOKEN 消耗。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwN5kT3kfV9mE6JibU064icqJibVptcg7g4q7ILzqvia4R8wnPiczz3164nsQGvUAaYNsxDpEWuG8U8KjRpsq2Lb8opOYVHpOGjoFFTw/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=15)

不过在 AI Agent 领域，有一个通用经验是清空好于压缩。因为过多的历史会话，会干扰 AI 的注意力。当我们让 AI 执行完一个任务以后，最好是开一个新的对话，清空上下文。这样有助于 AI 把注意力全部集中到新的任务上面来，从而提高任务的执行效果。

在上下文窗口的右边是模型选择，可以根据任务的复杂程度选择模型的思考强度。下面可以切换模型，这里一般我们就选择最新的模型，比如现在是 GPT-5.5。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwNtRfYIRBpXdVGovUB0IibLSNmicLfWwMicic7icCaiapnB4bKbU8yYFv9oYIcypPxEdZyc1YGotpML57Ke7AClYWNUszk2RU5GhNpZw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=16)

下面还有一个速度选项，可以选择标准还有快速。在快速模式下，会提升 50% 的 AI 推理速度，但是快速模式会消耗两倍的套餐用量。如果你的任务很急，但是套餐的余量还有很多，可以选择开启。

说到套餐余量，我们可以在左下角的设置剩余额度里面找到你现在的套餐余量。这里有两个限额，分别是 5 小时限额，还有周限额。这两个限额任意一个到达上限，Codex 都不能继续使用了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwOicq7bNDATCAuA3iaexT9wzs4VPXeubj0lrIMTibXh8r0EnlLqD8nNe9LIckmjDh7Zw9O6o3ricYPo6LgR7bfS2KPx7GqHNllNd5E/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=17)

两个限额都有对应的重置时间，时间到了以后，额度会重置成 100%。右边还有一个语音输入功能，可以让我们跟 AI 的交互从打字变成口喷，非常的好玩。

## AI 生图

Codex 内置了 AI 画图功能，而且它使用的是当今最强的 AI 生图模型 GPT-Image-2。这是刚才我让 Codex 为我们生成的宠物洗护的网站，我们看到它已经为我们配了一些图片。这里我看了一下，这些图片其实都是网络上的免费素材。这里有两个配图非常的不合适。首先这里的店内环境展示的都是一些宠物图片，它并不是一个真正的宠物洗护店的环境。第二点是门店信息，这里画的地图也太粗糙简陋了。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwNrFe2YEvIJZiaNondyicEBIjjdrTecrMaRqqBiaTI6JWgo6306Wicz9w60EQicTfA2ibaczw29tpIsNIg4q1TTtI3uyE232ZEWguHW0/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=18)

我们就针对这两个问题，让 Codex 帮我们来修改一下。我们来到 Codex，新开一个对话，项目选择宠物洗护店那个。我让 Codex 调用 AI 绘图功能，绘制三个店内环境的轮播图，三个图应该分别展示店内的不同区域。

我们看到 Codex 为我们生成了三张图片，基本都保持了店内装修风格的一致性。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwMiaNibDV3niaLzvPVPEJUJwGnCAhtVDhcGsCOyuaGYbFlUporbjq6UoWCM8wJXiaichsLDQFFcn3fkGYx8tiau4Qkm7Ew7ScwmwQCWY/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=19)

然后在网页这边也替换成了 3 张图片的轮播图，非常的不错。

接下来我们要改的是门店信息，这里的地图太简陋了。我们回到 Codex，在宠物店应用这里新开一个对话，输入我的指令：

```
我们的店在陕西北路 1620 号，就是地图上标记的这个点。你按我发你的位置，用可爱清新的宠物风格的地图把我们的店标记上，然后修改网页里的门店位置信息。
```

这里我来到地图，我截个图，然后把我们的店用箭头标记上。接下来我们直接 Ctrl+V，Mac 系统是 Command+V，把截图粘贴过来，开始。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwNibAzXClRFyZG6pZZyLdwmGYh1s17icqLuTMLgVsk6MH6ia7Q1XTnJfmoA4j1UeHGof9Eibygn3icsNbRiabdGbNs6YCaJjcIQBbkqk/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=20)

在 Codex 的执行过程中，我随时跟踪进度。这里我发现了一个问题，就是他画的这个地图是用 SVG 生成的，效果很差。我原本是想让他调用内置的 AI 生图模型来画。借着这个机会，我要介绍 Codex 的一个强大功能。它的英文名叫做 steer，中文翻译过来是引导。这个词的英文原文的意思是打方向盘。当我们发现 AI 在执行过程中理解错了我们的意思，就不应该让它继续执行了，这时候应该及时接管方向盘，人工进行引导干预。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwM96v0FSgo2pZe1mxRgyVgZVUpJD8pscAbnJQjzNX2iciayIpyg4G7GL2xHiaXUqL9HUj8iazW5bPp9zy54ObvNS77xw38Ixno5hzc/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=21)

这里我截个图发送给 Codex 说：你这图不行，应该调用 AI 绘图能力。

在默认模式下，这个新的指令进入了指令队列排队，需要 AI 把上一轮全部执行完，才能执行我们新输入的指令。我们可以点击这里的引导按钮，英文版叫做 steer，中途接管方向盘，引导干预 AI 的执行。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwNO2FI4wxE5NXISEVuOfRhoicLdJWhhq8Wjia6npaPBBd8gx66Trlr8Xutt308W7fQP6pH6UUZjH8A27YcHUEgHKkvIwyXpW07UQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=22)

我们看到 Codex 这里显示已引导对话，然后回复我说味不对，我立即改用 AI 生图，重新生成一张。我们使用 Codex 的 steer 功能，在运行中途成功纠正了模型的运行方向。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwMggCdyhmlXLibBJg2fnLIfsUTsufuJylSNB4NLiboAmhCTCxt2NpKxrthlYq8vk4FlCCia6dwjSAkuVZaXL9s1hZlG3DqaS2HtoA/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=23)

在 Codex 的设置常规设置里面，有一个跟进行为。这里可以设置在执行过程中，我们输入的指令是在后面排队，还是直接进入引导。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwMZNHFvte4jlhUPZqBl7gqFiat3z7LunrDTMgGBGhwvIGTpfCDicyouRyGPxicSd1VlibWGlcRw3Lz8Eiaaia13z9rgFzGfyhXS1kMiac/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=24)

这里我推荐还是默认选择排队，如果需要引导的话，我们直接点击那个引导按钮，或者按快捷键 Ctrl+回车。我们看到 Codex 为我们重新生成了一张图片，并且把它替换到了网页里面，标注出了我们店的位置，效果非常的棒。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwOKibj8zaXeMb9Y6Nzobribbcc3PQEyLLSWcCPQE7nV9w8iaFeeEvCCOuLZicwNoNdsWCOjeV3XAN0of9HzIq4k8h5HnV6iclavdBxk/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=25)

## 计划模式与内置浏览器

在对话窗口这里有一个加号，里面有三个功能。首先是添加照片和文件，我们可以用照片或者文件给 AI 补充上下文信息，或者可以像刚才一样通过复制粘贴，直接把照片或者文件粘贴进对话窗口。下面是插件，目前预装了 4 个插件，分别对应办公三大件（Word,Excel,PPT），还有浏览器自动化。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwNxZ7GEFZB0vklyYEYZfR2v0Rj4IUX1qsF7dIibgEbicl9IxibBTkzutJzGP23gBO1ibICbUeSAe2CQIIbLZ3JRkbAqdbeThadzG4g/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=26)

我们主要看这里的计划模式。开启了计划以后，Codex 就不会立即上手干活，而是先为我们输出一份完整的工作计划，跟我们进行了确认以后再干活。对于所有的复杂任务，建议都先开启计划模式，确保你能跟 AI 对齐颗粒度，让 AI 能够精准理解我们的意图。

我们在 Codex 里面打开计划模式，输入我们的需求：

```
把这个项目改造成 next js 框架
```

在计划模式里面，Codex 会很倾向于使用这种问题卡片的形式跟用户进行沟通。这里他询问我希望使用哪种项目形态，我选择 APP Router 加 TS。然后样式迁移希望怎么处理，这里我选择改 Tailwind。迁移完成要不要同时启动本地开发服务器验证，这里我选择构建加启动。Codex 为我们生成了一份完整的计划，我仔细阅读了一遍，没有发现问题。这里我们点击是，实施此计划。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwOmFCFhib0kQRpqyYHtThMBosIicDVXZDyhRmCIV6ica33kKpoyWVl6W6rXgwC4eA3shzzDklwfL870DgNdvzIDjqVGTC14VicuvPI/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=27)

代码编写完成以后，Codex 可以启动它内置的浏览器进行自动化的测试，这样任务就完成了，开发服务器也启动起来了。在右侧的多功能窗口，Codex 自动打开了浏览器。我们可以点击这里的展开面板按钮，看一下项目的完整状态。我们看到这次架构迁移非常的成功，页面上所有的元素都完整地保留了，非常的不错。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwNDB3Z9y1zNRSWselszKrmPWWyjaTQJVBr0meUxK6HFcf173NSKkJP3HKq8GHibsjlPRyoLA7KotYFrBIQejoXGn5jgEzoLVvts/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=28)

如果对某个部分不满意，我们可以点击这里的批注按钮，然后选中一个元素，在这里可以添加评论。比如这里我说为什么这个星星是空心的，然后在下面点击发送，让 AI 帮我们修改一下。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwPP4riaftsa8Sg8fOx5Y13pNPrx2PPhQib8ZnGGOzssxYMAZO32JYsURSoU2OlG9uRUDcObWIalfhEiavUF2YfMxdmcO8hw230ld4/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=29)

在下面也可以实时看到它的修改过程。我们刷新一下页面，这个星星就被修改成了实心的。这样我们就通过 Plan 模式配合 Codex 的内置浏览器，成功完成了项目架构的迁移，还顺手修改了一个小 bug。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwNvklp2qNG7Kfr1UyJSIbMltzrp11BLJw7iby8zzDoJB43OcjNFbQOricgz5r1zWZwreYE10rWkBicgTXgJKicjUxvrHmrn1j6UyN0/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=30)

## 代码管理

Codex APP 并不是传统的 IDE，它并不提供完整的代码编辑功能。我们可以在右上角点击切换文件树，这里虽然可以查看代码，但是没法直接编辑。我们只能点击某行代码来写批注，并不能直接修改代码。我们可以借助第三方的 IDE 来修改代码。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwMWfuiaq4icpGjv5cIqoibL2iauILHO1ZJH8cm4BIxtkicv4Ve26YblINdDOxreZ72XaFZ9NtYBWtu3vwia9MU9KY5pmHTYSX95ueTuQ/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=31)

在进行代码管理之前，我们需要先把项目初始化成一个 git 工程。这里我们新开启一个对话，输入提示词：

```
把项目初始化成一个 git 工程，注意排除掉不需要的文件。
```

Codex 先为我们创建了.gitignore 文件，把一些不需要提交的内容排除出去。Codex 帮我们把项目初始化成了 Git 仓库。

初始化成 Git 仓库以后，右上角又多了很多按钮。这里有一个 VSCode 按钮，我们点击一下，我们就可以快捷地使用 VSCode 来查看和修改代码。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwMibS7Pp3tTz7PxBQIJuH07hf7lUJmFcwWSibcjz7X2R9BBnYqicQ9jZBia1ynibH0X5MPRFqt4cn6MGticXibJeUNSnc10FmUzic1mFY8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=32)

除了使用 VSCode，在这个下拉列表里面，还可以使用其他的 IDE 来打开项目。如果你的电脑上装过这些 IDE，就可以在这里关联出来。我们也可以在设置常规设置里面选择默认打开的 IDE。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwNC3ZfIaVSPoiab3PpPrmpc0ibcyNuk8dodrBsVjDrib82ibmy4g1dSJalZfPnl8FOibgLOTTyxtkSOeKSxNertdd3okxfVnqiaiaf51M/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=33)

我还可以要求 AI 把代码帮我提交到 Github 上面。Codex 需要我先在 Github 上面为它创建一个仓库。这里我来到 Github，点击这个 new 按钮，仓库的名字还叫 pet\_care，点击创建。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwN2CsagVHMKkibtHHhFAdmx7DbS1zYNNyaZTJibJM6o8zDfneVa7xKicPMCJv4aVl6efFvfgAYgR2HPxR0Fpbufgt6V3qsNYNnjDc/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=34)

创建出来以后把这个地址复制一下，我们回到 Codex 扔给他，成功帮我们把代码推送到了 Github 上面。我们点击这个链接，看到我们的代码已经备份到了 GitHub 的网站上面。我们可以使用对话的方式进行一切 Git 与 Github 操作，这都属于编程的基础知识，本期视频我就不展开讲了。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwNfLM8GqAXCibhhQklMovCibAG7TgTckZNRBhQsKc4ibWYukoMpT5VqenOgXSfRWFyxac2icvibVicia8icicN65H5ElcpzBBELhdumcaSY/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=35)

## Git 回滚

本期视频我主要讲两个进阶技巧。第一个是使用 Git 对开发过程进行回滚，第二个技巧是 Git WorkTree。

我们先看第一个回滚。这里我新开一个对话，我们打开侧边栏，点击加号，浏览器输入我们项目本地开发的地址，这样进入浏览器。我们还是在这里面进行一些批注。我让 Codex 在这里添加一个期望到店时间的功能，直接点击 Ctrl 加回车发送。Codex 为我们添加了期望到店时间这个字段。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwMtOPcmAM0oJIVIps8VVVD8mAO8gtYKfziaPfBEoPurkf1T17deoBITKsKgt6nHquDhkfOXMibQmTgBhuHzOwicJlWOjwzfl9CTpY/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=36)

当 AI 完成一个功能的开发以后，我们就使用 Git 把它备份保存一下。这里点击提交，

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwNkKZCOe3GyXMzibZ8u5VibkuPVblQtcCPicbo6ibrnZgUkR7lIJxE4PvpN9l11nKJ2NyESr0nxfqdZ2GAxLbmDnTBicUZy3mAzI4uM/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=37)

填写一个提交消息，点击继续。这样最新的代码改动就以 Git 的方式保存下来了。接下来我让 AI 把期望到店时间放到联系人的上面，开始。Codex 为我们完成了修改，我们还是从内置的浏览器看一下效果。这个字段跑到了最上面，不过这么一改，我觉得更难看了，我后悔了。我觉得还是把它放到原来的位置比较好。这里我想做的是把这一次的对话，包括这一次的代码改动，全部回滚掉，最好是当做无事发生。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwNQ9SH2NV52icIj4E2ZgmUulGSs1yDC3Dab8RnZF3F8jkBsXvaljGE6gCjYZ4x1iau6pxfGvnkILQD57bCUibTcEVib7grnXicLjR08/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=38)

这里我们先借助 Codex 的分叉功能，英文是 fork。我们先把对话回滚掉。我们找到上一次对话结尾的位置，点击这个分叉按钮，选择派生到本地。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwO0prqOEWkgjoh0srHzibib1eIQPJiao1RNoI24xfQciccroL9hOXC5j4vsZyKdreb3bRSgU3UF508D5vteECLiciaEToSz3CYpibMNeA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=39)

我们看到 Codex 的分叉功能，就是在我点击的这个位置，把对话复制了一份。这样复制出来的新对话，就已经剔除掉了我们刚才想删除的部分了。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwPByOliaUw2JjILAXCIUy3nwWNKNt4iaW18eWqFegTICBej8FnjzhK8YoazGGUPFoWficbGzoTPI90YLK3mRbF1yjDSFqG7ic8ibUEA/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=40)

不过分叉功能只能回退对话历史，它不能同步回退代码。所以这里我们要做的是把代码一同回退掉。我们可以在 VSCode 里面点击这个 source control 按钮，查看所有的 Git 提交。这里我需要把代码回退到生成期望到店时间的这个状态上。我们点击右键，点击这个 copy commit hash，

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwMDTMib8TbiaGwHyX1rF2n54ePO4dKtncyDxjvdc5sNcsK5TjeibibsibXDd1UIc4SeAtc01e0WhMCZ6dkS9bN2je3VPF1iclkKV5ZlA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=41)

这样我们就把这次提交的 ID 复制下来了。我们回到 Codex，先让 AI 把代码回退到这个状态，后面就是我们刚才复制的提交 ID。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwN6mic8aPXwXXMIVSK7ClkicyYz8CpnBVLCxvqdSvxtoic9lhU3IfhBtUbhTibiamkbcgzUMyh48CevcRBd86icWiaRW3aDHRe6JzPPuU/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=42)

我们看到代码回退成功了，在浏览器里可以看到这个期望到店时间又变回了原来的位置。这样我们就使用了 Codex 的对话分岔功能，加上 Git 操作，成功地把这一次不需要的改动，从代码层面和对话历史层面进行了完全的回滚。

## Git worktree

接下来我们来看下一个功能，就是 Git worktree。WorkTree 这个名字听起来比较唬人，其实它本质上就是用 git 创建一个新的分支，然后把这个新分支的代码完整地复制到一个新的文件夹里面。这个新文件夹就是一个 WorkTree。主文件夹和分支文件夹可以并行工作，我们可以在两个文件夹里面各自修改代码，互相不干扰。我们可以基于主干创建多个分支，它们在底层通过 git 关联在一起。分支文件夹的改动，随时都能轻松合并回主干。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwNONcEb7LaiaibmsubXJpXMGIeHKwopojztH3ZVfT7ocszxDspavRhibzcRia5c3oCy946jI9NE8ExFDjxKNKbTicn4hg8iafNAZ1GHk/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=43)

找到我们的项目，右键创建永久工作树。这里起个名字，我想让第一个工作树专注优化客户评价这个部分，我给它加个后缀叫 customer rating。 Codex 把整个项目复制到了一个单独的文件夹里面，它跟主干已经不是同一个文件夹了。我们在分支里面做的操作不会影响到主干。这里我们再建一个工作树，第二个工作树主要用来负责优化下面的门店信息，还有这里的地图。我们给第二个树也起个名字。这样我们就拥有了两个工作树分支，它们都位于不同的文件夹下面，所以它们之间的并行工作不会影响到主干。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwPThTvZF6gibES4RSwCYP4Rz7R5iaUcxMw0nPoPibHsBWlEGcS11dia9rJwbE5fcaVbEn9tiaqwh6ATcopFpV8Fia5au5iaiaS8d5DAiavs/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=44)

这里我们来测试一下。我们先打开第一个分支新对话，输入我们的需求：

```
优化一下客户评价部分，多写几个评价，做一个动画轮播效果，
```

开始。然后我们来到第二个分支，创建一个新的对话：

```
优化一下门店信息部分，让门店信息跟地图上下排列，不要左右排列，把地图展示全。
```

我们在两个分支上面进行并行开发，因为它们位于两个不同的文件夹，所以互相之间不会产生干扰。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwNI5HSiawk0lZ8JRZZOVzbsibv93ibTOr5OrpzxzS8X7kWUsbJqYRzvKRlVm6k9HhiaWp7EYDCzWicyTictOELhVdvCfgL0U8p1dTwso/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=45)

两个分支在各自的文件夹里面都开发完毕了。接下来我们可以把它合并回主干。里直接输入合并回主干，两个分支都一样的操作，合并回主干。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwO6LSfKKTIVzeZgmiaCv2HqErMff2L8D2GibSs27vRCdSQB14VOPv7dLYUCW7veIBWAy8RjTAic8UNicZqxXrdenTswmugKb9LvI4A/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=46)

两个分支都成功合并进了主干。我们在浏览器这边可以看到，客户评价已经优化过了，门店信息也从左右排布变成了上下排布，地图展示得更全了。这样我们使用 Git worktree 功能，高效并行开发了两个任务。当我们的分支使用完毕，我们可以直接右键移除，把两个临时的分支移除掉，然后回到主干继续工作。

## 云端运行环境

接下来我们来介绍 Codex 的云端运行环境。Codex 的任务除了能在本地，也就是这台电脑上运行，它也可以在云端运行，比如处理文件或者修改代码等等。启动云端运行环境的前提是要先把代码全部同步到 Github 上面。我们在右上角点击这个推送按钮，点击继续。这样我们所有的代码都同步到了 Github 上面，确保了 Github 上面的远端代码跟本地代码是完全一致的。

接下来我们在运行模式这里选择关联 Codex Web，也就是把这个项目先初始化成一个网页版可以用的项目。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwNIHic7sEjHUhySn0yrQlRPO7ISOTiaj7UUzlKZB7BHF6smWOu4oxZMcsEnm0lMUciavUUpib9ia2M9FCgSroia2y7VuWG94IKXOaJP8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=47)

右上角点击前往 cloud。接下来我们选择代码仓库，这里输项目的名字 pet\_care，然后直接在这里输入我们的需求就可以了。比如我想让 Codex 给期望到店日期设置一个默认值，也就是明天（用户时间第二天）早晨的 9 点半。我让 AI 把首页的期望到店日期设置成明天早晨的 9 点半，开始。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwNqSCLEsWvseUngGLR4c5DBM2xmmDR7Z9CZQ3ZI6M5qbSvBianP4dmBvSll0wOcrsPGaZMax3Hl2PTxQlwO655DDtcoUpojoUNI/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=48)

在下面可以看到正在执行的任务。 Codex 先是初始化了一个云端运行环境，然后把 Github 的代码下载进去了，接着它调用 AI 功能对整个项目进行分析，然后完成了修改。

我们可以点击右上角的按钮创建拉取请求，然后再点击查看 PR。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwPKJFOzhgtWBoAueNs3T4t2KicNO3NdzXicA7HZLxFrbkbcFW6wkrzPqKZYKt6dmyZSvFNIicggzatpHL4oTGItRPxCGZLSZNq0CY/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=49)

刚才的代码改动就以一个 pull request 的形式提交到了 Github 的网站上面，我们可以在这里对他修改的代码进行审核。确认了没问题以后，在下面点击这个 merge 按钮，把代码合并进主干分支。这样修改就完成了。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwPJIGeBvib30rW371WeFtEfrgOiaDuoWic0A3t6WmyHScywtUuppvbhmEUSEtiazY0yQA649TEg3A0iaMz7zC7wqmh8Nd15dulnHwZQ/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=50)

我们回到电脑上的本地项目，点击使用 VSCode 打开，点击 source control。这里有一个 sync changes，点击一下。它的意思是把 GitHub 上面的最新代码同步到本地。然后我们在本地再测试一下，看到这里的期望到店日期就有默认值了。这样我们就使用了 Codex 的云端运行环境完成了一个任务，并且把代码同步到了本地。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwPLNS1LpRfQagibXRhN6S8qPfibm4IMKBlOcMPJTX60jUTqINxYmVlmhdnOnpqh296aiaZ7jryBFk9rcv28ZMLVjhTJMX9fsGOicgg/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=51)

Codex 网页版是可以用手机打开的。我觉得它最适合的工作场景就是，比如我们出门在外面，手头没有电脑，让它使用云端运行环境完成工作，我们只需要在手机上进行审批就可以了。

## 记忆系统

每当我们开启一个新对话，就进入了一个全新的上下文。AI 完全不记得之前发生了什么，进行过什么样的对话，甚至对于整个项目的记忆都是空白的。当项目变得复杂以后，每次对话都要重新给 AI 交代一遍项目背景，或者让他自己读代码、自己摸索，这是一种非常低效的工作方式。

本章节我们主要介绍两种给 Codex 增加记忆系统的方式。我们先看第一个通用方法。通用方法就是在项目的根目录创建一个 AGENTS.md 文件。这个文件在 Claude Code、OpenCode 等等其他的 AI Agent 工具里面也是通用的。

这里我们用 VSCode 打开项目。我们来到项目根目录，右键新建一个叫做 AGENTS.md 的文件。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwMXxlohfTG4vEwGjxM9iaEbjoPmleJFsRzQdytq1uZsj953o9HWicBZHV3WiagU2d4gHQAXU8jZT1mHO3R6IkunctUicVzHfPYvRN8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=52)

这个文件就是 AI 每次对话的时候必读的一个指南。有了这个文件以后，后续我们跟 Codex 的所有对话都会带上这个文件的内容作为上下文。这个文件有助于帮助 AI 更快地理解项目。比如这里我给 AI 补充一点上下文：我叫技术爬爬虾，擅长 Python 和 Java，对 CSS 一窍不通，遇到网页样式的问题，需要用大白话给我解释。

我们回到 Codex，新开一个对话。这里我询问 Codex 我叫什么，擅长什么技术。我们看到 Codex 可以自动地读取 AGENTS.md 文件，然后把里面的内容自动作为上下文带入对话。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwMcHnf1uhHfQ40X1JseTTTue6G1nicpQwMBuqc7ZaCdp3cKPzDR6CF69HcqpEI9BoE5WxQ0PWwN1oAdEwdUTrQwGIH4rg5DUO78/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=53)

如果自己编写这个 AGENTS.md 也有点麻烦，我们可以让 Codex 来帮我们编写。我让 Codex

```
通读当前文件夹，把它学到的关于项目的知识保存到 AGENTS.md 文件里面。
```

Codex 为我们完成了 AGENTS.md 文件的编写，把关于项目的重要知识都写入了这个文件。后续当我们开启新对话的时候，Codex 就会自动地获取这些知识，可以帮助他更快速地上手项目。所以对于复杂项目来说，这个 AGENTS.md 是必须要写的。

我们把 AGENTS.md 放到项目的根目录，它只对当前这个项目生效。Codex 为我们提供了另外一种方式，可以编写全局的 AGENTS.md，可以对这台电脑上所有的项目生效。我们回到 Codex 左下角设置，在个性化这里自定义指令，这里编辑的就是全局的 AGENTS.md，也就是对所有项目都生效。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwOic8SZVdNx2jksCI3jgn8A8JY3KkOXOnIFUKjwqXicsrljoeHch5v3QO7w65FBCy9QNibbXmBvEdU94soYlMv8Nbcc1qhPsB5bwE/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=54)

最近看到一些朋友们说，Codex 有时候编写命令失误，把自己的整个 D 盘都删除了，所以我一般会加上这么一个全局的提示词：禁止它使用脚本批量删除文件或者目录，只能使用 Remove-Item 一个一个文件进行删除。如果必须批量删除文件，应该停止操作，让用户手动地批量删除。

```
禁止批量删除文件或目录。
不要使用：
- \`del /s\`
- \`rd /s\`
- \`rmdir /s\`
- \`Remove-Item -Recurse\`
- \`rm -rf\`
需要删除文件时，只能一次删除一个明确路径的文件。
正确示例：
Remove-Item "C:\path\to\file.txt"
如果需要批量删除文件，应停止操作，并向用户请求，让用户手动删除。
```

这些内容保存进了 Codex 全局的 AGENTS.md 文件里面。我们可以来到 c 盘/用户/{你的用户名}/.codex 这个文件夹，有一个 AGENTS.md 文件，这里面就是我们刚才填写的对所有项目生效的全局提示词。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwMBwpDB112fycicSZO1jp9lPgEM70ib5g1f9JLXEUf7SHdeZ86A1YtojJ34Iuaniab3R3hyiaNWiaU8mu0T1Jibickj0kwiaKINbkvXTVM/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=55)

Codex 记忆功能还有一个实验性的特性，就是在下面有一个启用记忆。开启以后，它可以从聊天里面生成新的记忆，并且把它带入新的聊天。因为这个功能目前还是一个实验性的功能，这里我就不多做介绍了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwOZ6pSjJgwcuqk5rDIvFYcUGichTqSLYeUlscxsQrPsqftOM2pBRAXCicb4BBWRst42C1WB7goqS39vUQR1ecr6j1QDthjWfQHvQ/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=56)

## 插件与自动化

我们在 Codex 左侧边栏点击插件，进入了 Codex 官方插件市场。我们看到这里有两类，一个是插件，一个是技能。插件一般是第三方服务为 Codex 编写的软件包，这些第三方软件把自己的能力用插件的形式注入 Codex。我们看到能力已经非常的全面了。然后技能这一栏就是 Agent skills。爬爬虾有一期完整视频介绍 Agent skills，我们下个章节再来看技能。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwPibZ4DXLmIwT4vADe0Tjez6C9jRiacpKbcZR1yIahQvOLlqu9W8LZHZ3XK3t058yWDcaVlRaBPK45eK6m0JiaX4Eq0at6zOkrmqY/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=57)

这里还是看插件。这里我们安装两个插件来测试一下。首先第一个是 Github 插件，然后我们再来一个 Gmail 插件，让 Codex 可以控制我的谷歌邮箱。它自动在浏览器弹出了谷歌的登录窗口，我们先登录一下。这里显示 Gmail 已连接就配置成功了。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwPdeIzto5o7k1Rd1TdGRUfPZzoA5A00Gf7hCU6Yp902vN1QJohcCntCfEbxFnDpTdInNKibKt5iceHb8LquVBibiblK6o9UJdOAMG0/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=58)

然后我们新开启一个对话，输入斜杠调用起我们的插件。先选择 Github：你看一下我 star 数量前 10 的开源项目，还有 star 数。然后我们再唤起第二个插件 Gmail：用我的账户发邮件给我自己，做一个摘要。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwNMlfMFl0gbg0AZRyic6ZdLYkRQibicdeuo9kZVoAUWe3OqAEgKAqEC9LOMCZR6Cjvb8xLLd79AibRybF6LTsR2TzZOdVUicZ9mQvNA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=59)

好，任务处理完成了，邮件也已经发送了。我们去 Gmail 邮箱看一下，在 Gmail 邮箱里面就可以看到这封自己发给自己的邮件，里面对我 star 数量前 10 的项目做了一个摘要，非常的不错。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwNtgvicaHQ0LlZ1afIjCIZVfdLXybXG5jaPBib0j4LQZGdeEicKcPNrZqibFicF2iacdWHoclg0X3MR5cKuw3exv9PZxZEEMaotLhTL0/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=60)

接下来我想每周都运行一下这些任务，来观察一下我这些仓库的 star 数量有没有上涨。我跟 Codex 说：很好，你把上述工作做成一个自动化，然后每周五下午 4 点都发邮件给我。这个自动化工作就创建了。我们可以在左侧边栏找到自动化，这里有一个数字 1，点进去就可以看到我们的自动化工作了。点击这个小铅笔还可以进行编辑。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwP3YCUU2ltGdUOxT4nNic8uQ2I8F7zco0J0ufE2NIfOPMcnKsPsM8Olll2CdbkCiaWQgs2Cq7w8qqxn6zapVCxmIyEg1ZHNTJK7s/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=61)

比如可以编辑它重复执行的时间，是每周、每天还是每小时；编辑它使用的模型。一般这种简单的自动化任务，我们选择这种 mini 模型就可以了。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwOC0aUDwzPOiaP8F9OicPws96hcEJB5LlcdWpv3s6TnPhudzdf7RkygZMtMVHVBd0rYxsqtYkhR0rqRTU8Cbib80DjSDvuOibU9Bus/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=62)

还可以点击这个立即运行按钮，再测试一下。Codex 还有一点非常好，它在执行过程中，如果积累了经验，它会把它的经验写成这么一个 memory.md 的文件，用来帮助下一次自动化执行。这个功能非常的不错很好用。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwOjOuCGQ7SDWPyUVjiadMnrCDibNdDV3cicD4XO20lp6G3OywEs1cMlicrLibmzvI0zUd6M5MQtabspwKIB4wQeSwFohowDC7rSdhJM/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=63)

这个定时任务功能配合浏览器自动化，还有 computer use，玩法就更多了。我们在右上角点击新建自动化功能。比如我可以让它用 MacOS 的 computer use，把今天 teams 上的今日聊天记录汇总成工作日报发给老板

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwOvmic7q2rSqNiaSXLvG41JEkjHELfJRCZqES2PbZkqfAOyQ3EJXuxkuaLzlVlMLXXK9UXlMbzVIhuUuOzy7mubVOW4ibicceeuaWY/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=64)

或者让他用内置浏览器打开哪个网站，然后点击签到按钮签到，这些都可以发挥自己的想象力，打造各种好玩的玩法。

## Skills

skills 是给 AI Agent 的一个专业技能包，或者说是一种带目录的说明书。我们可以把工作流、专业能力或者某些规范封装定制成一个个 skills 交给 AI Agent，让 Agent 在执行特定任务的时候更稳定、更高效，输出也更可靠。在之前的这期视频里面，我介绍了 skills 的概念与技术原理。本章节我们介绍三种给 Codex 安装 skills 的方法，分别是官方 skills、第三方 skills，还有自己编写 skills。

在 Codex 的插件跟技能里面，都可以找到官方的技能。这里分类有点怪，因为有的插件本身它就是一个技能。比如我们来看这个 remotion。remotion 是一个让 AI 用编程的方式来创建动画视频的工具，我们看到这里面只包含一个 remotion best practice 技能，它也没有任何的软件包，但是它还是归到插件里面的。我们先把 remotion 安装一下。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwOJtzkkmshpwD3iaLqDqomV2fsU7jpDeMzRKtIIJIPnuSehtlWYNjtZX5yawCLLdqArcBpMYl6WNqP8HkY8BNfIVQpAqiaTFArvI/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=65)

我在桌面新建了一个 remotion 项目文件夹，然后我们在 Codex 添加新项目，选择这个新文件夹。使用斜线唤起我们刚才安装的 Skill。这里输入提示词：

```
帮我生成一个 3D 圆锥摆的视频动画，需要有受力分析，角速度随时间缓慢增大、
```

Codex 调用了 remotion 技能，它学习到了如何使用 remotion 来创建这种视频。

任务完成，Codex 为我们交付了一个完整视频，开启了一个网页版的剪辑工具。我们先看看视频，这是一个 3D 圆锥摆的动画演示。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwPxByh35ibe9A9PXG4qMZibsdciaicGAJ6xF3p4Ds0icWJAEibcFfltib8OuG5F1ibQQmyu5wC44xUgd8NBLU7GpM7OHUnYmpUaKBHPFcI/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=66)

这样我们就调用了 remotion 官方技能，为我们生成了完整视频。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwONvfO2c48xp1RoWD1KcNTicQzsVopnUTfFhplJ7fQaKdBKlut3Hpb0Qze85mecxHfOibrJvnP8ViaWkSgciapUlC3DgjyA1HEv6c8/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=67)

接下来我们看一个第三方 skills 的案例。这是我在 Github 上面找的歸藏开发的电子杂志风网页 PPT skill。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwPPTUTZTdI4eSfKgydtNx1vorncrz2BXvExXu28ltvozRTLVMERo7vs6k0kcBRVxYSictvmfjVjb2O3Pb1QBZQcYhyA3RXOuVvI/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=68)

AI 调用这个 skill 可以设计出这种风格的网页版的 PPT，可以把它用在线下分享、行业内部讲话、个人风格的演讲等等。我们来测试一下。首先第一步把这个 skill 下载一下，在 code 这里点击 download zip。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwPpGTJV7RicSPiczyFVXiaOOu7jLUpQjkRrgYqic3JHwoZPD6UOSmez9p8xathBILfAn0vVxPicmLztFSF1Vp61e2tL57CWgp0ycUrk/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=69)

然后我们打开压缩包，打开压缩包里面有这么一个文件夹，我先把它复制出来。

我又新创建了一个叫做 PPT 的文件夹。进来以后我们创建一个名字叫做.codex 的子文件夹，在这个子文件夹里面，我们再新建一个叫做 skills 的子文件夹。然后把我们从 Github 上面下载的 skills 直接放到这个 skills 的子文件夹里面。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwOOSAhmqnymdpSib8OYCr0yIkn2dSGz6K7tYHOszyfyAxSmnNxpFfTrKzPHo7IzZj5BZYBElDnQDWOgql0NF2BhARj3EkudvRH4/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=70)

我们回到 Codex，添加新项目，找到我们的 PPT 项目。我们直接斜线，找到这个 PPT skill，然后输入我们的需求：根据以下材料生成 PPT。我把视频开头那段文案粘贴过来

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwPF1Wh6SofHTXleXTKDP2DRKbT8tMCiaL77nkCAcwmF1tB1ia2GG4FicX1libOiaufBIDjSKOHTgJUIWnxq9GZh0icfnWkglWkuCM0lg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=71)

Codex 完成了任务，我们打开看一眼。PPT 效果非常不错，详略得当，重点突出，还加了很多高级的动效，把视频开头那段文案里的内容全部表达出来了，直接就可以拿来上台演讲或者录制视频。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwObbrAictZB82dicxz4ialv5XmoS2bletLic09VBt8ZgKV7tMub12J885OMCicwsQ4rst2hqGU7IGN0fWl7mGTZOKWomRLNoZaxJlkk/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=72)

接下来我们来看第 3 种使用 skills 的方法，也就是自己创建 skill。爬爬虾作为一个视频博主，经常会有一个需求，就是把我做的视频转换成图文笔记，然后发到各个平台上面。这里我就从剪辑软件里面导出了一个视频，还有它对应的字幕文件，然后我想把它转换成 Markdown 格式的图文教程。我准备把这个工作流编制成一个 skill，后续遇到类似的工作，我都调用这个 skill，让 Codex 帮我处理。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwM83RwLtjhYJ2HXuzqYd4iaqia48Hia2I7NsczYPoTs0FLcXVeOxa4p6ambjm1MARDOKjBBibErydutturVewUrQcJIwlN1vC1VTrM/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=73)

我新建了一个项目文件夹，然后我来到 Codex，添加新项目，选择新建的项目文件夹。我们输入斜线，然后找到 Codex 的内置技能 Skill Creator，一个帮助我们创建技能的技能。接下来输入提示词：创建一个 skill，当我提供视频跟字幕文件的时候。这里介绍一个技巧，当我们输入一行命令的时候，如果想换行，我们不能点回车，点回车就直接发送了。换行我们使用 shift+回车。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwMANNlgwLibWpKK9g6wK4TxGruYXLZq3TQ6FsUcGia1Gm6liaFiaAq7VYk4TmTsIr75Iibibqjyib6WsxGgxkiaMABEWjcSNc7OsG5x5kE/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=74)

第一步读取字幕文件，转换成 Markdown 笔记。

接下来我又提了很多要求，让它能够自动添加标点、划分段落。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwMaptc7UGQg5xsHBEF6rW5RO74WsL98RPoclKmbOAecXoua0YAwbe4pIKgbpWQaR2ae3VhwbAtxhdAU96QbbeSC5vdszNkLuxA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=75)

还有一个重点是截图占位符：如果某一句涉及代码讲解、UI 交互，或者能够借助视觉材料理解内容，就在这句末尾添加一个截图标记。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwPnhA2YbKicNR1fmvUt07gcic2McT1OaPb2LkPuKg1tg5Fgicn9pgkcJfQAgQrClcFCicL9V1JjFVw8mjDZue0C0PEVxJ9h4lICSAs/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=76)

第一步做完了以后，再做第二步，调用 ffmpeg，在每个截图提示位置进行截图，然后用本地图片替换掉 Markdown 里面的截图占位符。好，我们开始。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwMoJDvNzjiaRQyKJsEt3b4S4BILCvhicnZLb4sLNG3kmZ04aYUknUMqQ4SeABofsUtfHwX2M2cYEcCAtibAPHAlgYjtgwOPhy2JUo/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=77)

Codex 说他会使用 skill Creator 把这套流程固化成可复用的 skill，这正是我想要的。我们注意到这里有一个很有意思的点：它在清理测试文件，但是每次它只删一个

。因为之前的章节我介绍记忆系统的时候，在这里增加了全局提示词，要求它只能使用 Remove-Item 一个一个文件删除，不能批量删除文件。我们看到 Codex 严格遵守了我的约定，表现非常的好。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwOI3jpChtO2vYdNfkXNO2qSYfcTRqbZmOKH6CGgG6A7HL2wkvLxHZiaAxoGnYmxC39SsJ1TufrySIJQDsiaEt4vSHLme2PEhQn3k/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=78)

任务完成了，它交付了一个 SKILL.md 文件，还有一个用来批量替换截图的 Python 脚本。好，我们马上来测试一下。这里再新开一个对话，我们直接输入斜线，找到 Codex 为我们创建的技能，就是视频字幕转 Markdown。接下来我在工程文件夹里面准备了一个字幕、一个视频。我跟 Codex 说我准备了字幕跟视频，帮我转换。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwOaR9svnibZvNobHu0c64wCQEIicW2hFicQERS9bTFtZZoIiapKQygIBibmonSGgSDVJXBBo7SHpQ5ZDnTcWVKYH7FcP4XpZh3ehiclU/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=79)

Codex 先是调用了技能，读取到了它的流程要求，然后看到了我放在工作区里面的视频和字幕文件。接下来它开始生成 Markdown。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwOsaCsWwTROcGl3z7yUTx3rJUL8QptDgXr7BVyibfOQ6ouyRGZNAibw0CmlfY9w8S4Y89XC3ds8vuqz0OACzhZicCkDZXJGwk1HQI/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=80)

Codex 成功调用了我们自制的技能，把视频跟字幕转换成了 Markdown 文件。我们来看一下。这里选择用 VScode 打开这个笔记，然后按快捷键 Ctrl+Shift+V，渲染成 Markdown 格式。我们看到一个图文并茂的笔记教程就转换完成了。Codex 为我们划分了段落，然后在每个关键位置都配上了图片，效果非常的好。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwPFBWDfUEQKVxZWxLAfS8VS4ySguOABnMFBlGDTibuLv5ClxZ2r4fzfODNsIWgwEme0D8Ezzk2f74Sf07h0dfB3ELbPCkKR59I0/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=81)

## MCP

除了使用插件和 skills，还有一个扩展 Codex 的能力的方法就是 MCP。MCP 全称是模型上下文协议。简单来说，MCP 就是 AI 大模型的标准化工具箱，大模型可以利用这些工具与外界互动，获取信息并且完成具体任务。

在 Codex 里面，MCP 的入口隐藏得比较深。我们来到左下角的设置，这里有 MCP 服务器。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwPU6VWWU1F8TvIiaEBcT7nc0BTkSic8xPGB4waurdEucG6N5Tt85IomzEa3HhXKtnom4TwuShDu2m9pJicib8dVpfIEtxZKBqrdS7M/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=82)

我们来看一个例子。Supabase 是一个开源免费的 PostGreSQL 云端数据库，在爬爬虾之前的这期视频里面有 Supabase 的详细介绍。这里我们来到个人主页，点击创建新项目。填写个项目名字，我准备给我们宠物洗护的那个项目增加后台的数据库，点击创建。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwMuNs9RhpTRxUnYMFxXDIeQGcfVnXibk6mu28GIfE3vrr3A0qaCpnLZG6L060kG8QK07ZP1NyWjYWIeyqoUZwOk4H1CRkbakFOs/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=83)

项目创建完成以后，点击顶部的 connect 按钮，然后找到 MCP 客户端选择 Codex。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwNOFS9Weyfqxy63YjoYlte3xY6VHKojHrL7MIvGNKJ8ZD3zMXHIBAJbLdh2acibLQNRZrACcg2fJjrA7KLwaeDcCTtn9ebeb5Ws/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=84)

我们看到这里给了一个 URL，我们把这个 URL 复制一下。回到 Codex，选择流式 HTTP 的传输方式，填写上 URL。MCP 的名字就是 Supabase MCP。下面这些都不用填，直接保存。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwMd1uEkHdtchkNP1zv5SIA9O4iaqXWL23PsR8SjRrmNKzBJSoyuvNJv09Rep8VMzm0JJicPPzqTGuJQq26JxGvEp0hUicqicGkeGW8/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=85)

接下来我们回到 Codex，右上角有一个切换终端按钮，我们点击一下。这里就打开了我的 Powershell 终端，然后我们按照提示输入这个命令：

```
codex mcp login supabase
```
![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwPRep89pfoetwDIScibP5icmZd3IOPZrZ4z0AKPEq0ibv40oy4OhgktdGms7ibfiaFhqgEpsGG4MQqibpzuxFicgX4353Gwia0cLciapasw/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=86)

浏览器里面自动打开了一个授权窗口，这里我们点击授权。这样 Supabase MCP 就配置完成了。注意授权完成以后，一定要重启一次 Codex。

这里输入提示词：

```
使用 Supabase MCP 创建一个预约业务表。我的需求是把用户的表单存入预约业务表里面，数据库写入操作应该从后端用 session pool 的形式写入，
```

Codex 调用 Supabase MCP 为我们创建出了预约表，然后它在后端加入了一个新的端点，使用 postgres 连接池的方式来写入数据。任务完成了。Codex 为我们创建了预约表，然后在后端使用 postgres 连接池写入数据，改了前端的表单提交。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwN7gZiaAGRft1icbfNZic5hzh2UYdk65eHUkc1cnhTYib0Z727EEjXWmfESqEGKibOh0zAJn1GNACC0x1ndeIwcjV9FljGia3JB0gzt4/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=87)

现在我们要做的就是在配置文件里面填上 PostGreSQL 的连接地址。这里我用 vscode 打开，找到.env.local 这个文件。然后我们在 Supabase 这边找到 connect，找到连接池，把下面这个地址复制一下。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwN5kWiae6shACUalQWNeYBUt4aWAxVtSqdfo4GaRj0auq6K9KoAsc4sWmzDVkD1eAibib9iciaUe8dNvCyfaLXsGEnfHJf6yj6Lk014/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=88)

注意要把这里替换成自己的密码。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwOcialEJibhJUEggr3aticHyUn8YQBMV9h1aK5sub82ZvJtPTPsmrXMciciaKZZdQPXmzVjzPx6zy4ibq5mich6NbzvHCk29k1sUO8ic2s/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=89)

接下来我跟 Codex 说：我填好了环境变量，你重启一下。这里重启完成，我们在浏览器里打开 Codex 给我们的链接，把这个表单填写一下，然后点击预约。右下角弹出了提示：预约成功。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwMtYNq8Dgr0CuYDfWhlSyUeHIUkV6dtfribzUQFUmQicgus07SJQZcmGibXQFb34s5PqaAMgoaN9TgF75xFg2ibPGBGmD8HHibQcQQs/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=90)

接下来我们回到 Supabase 的网页端，在 table 这里找到它为我们创建的表。这里看到用户的预约数据就写入了数据库。这样我们成功使用 Supabase MCP 给这个项目添加了后端功能，并且把数据成功写入了数据库。项目的所有代码我都放到了 Github 的这个开源仓库下面，感兴趣的观众朋友们可以来参考一下。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwOoNibr2AIE01NYwAZYKK2Y7ia3uCg5UDLCIZ5ib9FLtIFtm90LTlXB6rrC33dIE9RzUkYuX1fPK8vwylQ65IsKXB0k5zRZ1o5yFQ/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=91)

## 部署项目

接下来我再简单介绍一个 Codex 上好用的插件。我们来到插件，这里我准备使用 Netlify。Netlify 是一个免费提供静态网页、nodejs 或者 Nextjs 项目部署的网络服务平台。我们先把它来安装一下。这里点击加号，点击安装。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwPyodqlSEfABmia9hRN1zMhSCl3bV4hrgz4Ww7hR4Il9Jrj7rvlrK2p1YlAzhAYwgFWtf4LDWK2SHgbY3dQ09w1ctstJXNdw2zk/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=92)

这里弹出了 Netlify 的登录页面，我先用 Github 登录一下，然后点击授权。

找到到这个 framework 功能，可以把 nextjs 项目部署到 Netlify 上面。我让 Codex 帮我把项目部署到 Netlify 上面。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwMJwIUAaibDhJ9p6iaiajwias5LKZrJDrlek7a1lzl6FTlZB9Hic72sZ9WUicBYQib3bibO3QkLO6b15Bic2U4Fg57AXKqo8FqPWIib6pLEA/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=93)

Codex 成功把这个宠物洗护的网站部署到了 Netlify，并且给了我们一个公网可用的域名。我们点进去试一下，我们的网站就部署好了，而且成功打开了。使用 Netlify 还有个好处，这个网站的域名在国内是可以直连的。

## 电脑自动化

终于我们来到了最后一个章节：电脑自动化。让 Codex 帮我们操作电脑，完成一些工作。在最后一个章节，我们就不编程了，我们做一点轻松好玩的事情。

这里我们来到 Codex 的插件。这里要注意 computer use 这个插件目前只有 Mac 电脑才可以使用，所以这里我用的家里的 Mac mini 进行的演示。我们先点击这个加号，把 computer use 插件安装一下。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/YIk8HsAvfwMVkU6IhiaNcSCGnRN9F9zBxyaALzzog9PVCOhpyZp6kmAicDMAl2iakZZlqrmeMtI3xwYYw79mucQz9uMhaE9rTicy4vFM90djXOk/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=94)

安装完成以后，我们新开一个对话，输入 @，然后选择 computer use。然后输入我的指令：

```
你打开聊天软件，找到老板，发送你好。
```

Codex 成功完成了操作，然后询问我是否确认发送。这里我确认发送，然后消息就成功发出去了，非常的不错。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwPiaydbDDibJ8PNJekCiciaeAJRrHYO75jFqOoTzlTT3wxEKSyQBfxicA8eCHx87W1vdrWetXkemTXlHcakeozn0qtehkxHSNNWbxjo/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=95)

接下来我们看一个复杂一点的案例。这里我给 Codex 一个 GitHub 上面的进度看板，团队使用这个看板来追踪每个工单的进度。我让 Codex 调用浏览器打开这个看板，把里面的项目进度汇总一下，然后做一个英文版的简报发送给老板。

![图片](https://mmbiz.qpic.cn/mmbiz_png/YIk8HsAvfwNb58yA1PgODQw9R5huWicOImbv7TqdUwB7alsNlkW3CQibhyAXk0AibfyibGz3l5QBQQ1rq6Eq92Ys2ghXJoYAiapIpsuiaJsYicibIlg/640?wx_fmt=png&from=appmsg&watermark=1#imgIndex=96)

这里 Codex 申请授权调用我的 Chrome 浏览器，我点击确认。然后他打开了 Chrome 浏览器，查阅了团队所有工单的进度情况。然后他又进行了一些细节确认。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwMEORdjibRlWWmsfnRhMicltKAuWD4dKORHGzGBdwtyPGwFEZZZTibStxXDzDXCSCNQG2ibzrPcjXH6byy9esG15stCst5duPDguNU/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=97)

computer use 这个功能非常的好，因为它使用了一个虚拟鼠标在后台自动运行，没有占用我当前窗口。他对项目进展做了一个总结，再次询问我是否发送。我点击确认，这样就发送成功了。

接下来我们可以直接把这个流程进行自动化。我说：

```
很好，你把以上的流程做成一个自动化，然后每天下午 5 点临下班的时候都发一个简报发送给老板。
```

Codex 把这个任务编制成了一个自动化的定时任务。我们可以在左侧自动化找到 Codex 创建的这个任务，任务的内容就是打开 Github 看板，然后对里面的内容进行一个总结，最后通过聊天软件发送给老板，每天 5 点执行，非常的棒。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/YIk8HsAvfwM9oVdmPmw9ibELqX1aDP6KovYYrBmvMdTOqkia18Iu0xnWq1uqZtods8aWD7UUjxBFMVhNXtXvxKRUPyBgvQ4efsI3uibCAKtzbQ/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=98)

这里提醒一下大家，如果想用 Codex 的自动化功能，每天定时完成任务，最好我们在设置里面开启这个运行时防止系统休眠的开关。这个开关是 Mac 电脑上独有的，Windows 系统不需要处理这一步骤。这就是本期视频的全部内容了。感谢大家看到这里，也感谢大家的点赞支持，我们下期再见。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/YIk8HsAvfwMRHwEeBbJz9qDmHcBfMw7kWicX1zqgwOibqwOMoJhyUOUFv4FVpGspCP82ViaFiaOutfTibPiaZb6x90fp1Sf8ZicVd1PPdicuaCUzyWM/640?wx_fmt=jpeg&from=appmsg&watermark=1#imgIndex=99)

**微信扫一扫赞赏作者**

继续滑动看下一个

技术爬爬虾

向上滑动看下一个