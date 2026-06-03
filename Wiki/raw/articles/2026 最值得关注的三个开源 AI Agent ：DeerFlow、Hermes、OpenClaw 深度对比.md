李燊城 *2026年6月2日 19:06*

![图片](https://mmbiz.qpic.cn/mmbiz_png/ibdPSLqks2t2KkFMPriayzA51U1iaBWOlzTeUFk7a8icxtztnRFl3GQLDndVyIEUXA59YQvLOib46GcKwsjQN5XY8j7lp3sdPhfbg6VflbovdmXc/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

今年开源 AI Agent 框架的爆发速度，说实话有点超出预期。光是 GitHub 上 Star 数超过 10 万的就不下五个，而其中最受瞩目的，无疑是 **字节跳动的 DeerFlow** 、 **Nous Research 的 Hermes Agent** 和 **Peter Steinberger 的 OpenClaw** 。

三个框架加起来 Star 数超过 60 万，但它们的底层思路和适用场景，几乎是三条完全不同的路。前两天花了些时间把三个框架都跑了一遍，从架构、效率、效果和适用场景四个维度做了个深度对比，分享给大家。

## 一、这三个项目分别是干嘛的

先看一张基本信息表，快速建立认知：

| 框架 | 出品方 | 一句话定位 | GitHub Star |
| --- | --- | --- | --- |
| **DeerFlow**  🦌 | 字节跳动 | 多代理并行调度框架 | ~28K |
| **Hermes Agent**  🧠 | Nous Research | 自进化学习型 AI Agent | ~61K |
| **OpenClaw**  🦞 | Peter Steinberger | 自托管 AI 消息网关 | ~315K |

别看 OpenClaw 的 Star 最多，它的定位其实跟前两者完全不同——它不是 Agent，而是"Agent 的管道"。这一点后面会细说。

![三大框架速览对比](https://mmbiz.qpic.cn/mmbiz_png/ibdPSLqks2t2Pb2k9VCYI7icmsGq06Syic6s0Xia8arIicRfZoYic6hmpQzj1muEQq6jg16JkkKaWOF2Qs4UwdOYrCMLxx1Uk5nicfPsKSCG9OE4hg/640?from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

## 二、架构差异：三种不同的世界观

三个框架最根本的区别，不在于代码量或性能，而是它们对"AI Agent 应该长什么样"这件事的理解完全不同。

### DeerFlow：任务驱动的多代理编排

DeerFlow 的哲学可以概括为： **把一个大任务拆成很多小任务，分给很多小代理并行完成** 。

它基于 LangGraph 构建，整体呈主从层次结构。一个 Coordinator 负责接收任务、拆解意图、分配子代理；下面挂着 Planner、Researcher、Coder、Reporter 等多个专职子代理，各司其职并行干活。代码执行放在 Docker 沙盒里，安全隔离做得比较到位。

这种架构的优点很明显：复杂任务的处理能力非常强，做深度研究、多轮数据分析、生成报告这类事情是它的主场。缺点也很实在：部署门槛高，需要 Python、Node、Docker 一套配齐，启动开销大。简简单单查个天气也要拉起一堆容器，杀鸡用牛刀。

### Hermes Agent：封闭式自进化闭环

Hermes 的哲学完全不同： **只有一个代理，但它会在每次任务后学习，越来越聪明** 。

它是一个单体架构，核心引擎约 9200 行代码，全部同步编排。它的亮点在于"自生成技能"机制——每完成一个新型任务，它会自动把经验写成 Skill 文件存下来，下次再遇到类似任务就能直接用。记忆系统用 SQLite 加 FTS5 全文检索，跨会话记忆做得相当扎实。

上手也是最简单的，一键安装脚本就能跑起来，16GB 内存的机器完全够用。适合长期陪伴型场景：每天帮你写日报、跑定时任务、持续辅助开发。但它不太适合超大规模并行任务——单体串行架构在那摆着。

### OpenClaw：中心化消息网关

OpenClaw 跟他们走的不是一条赛道。它更像一个 **AI 版的智能电话交换机** ：统一接收来自 Discord、iMessage、Telegram、WhatsApp 等 15+ 渠道的消息，然后路由到后端的 Agent 去处理。

它不做 AI 推理本身——AI 能力取决于你后端接的是哪个 Agent。它的核心价值在于渠道整合：全平台消息统一入口，插件化渠道扩展，本地优先部署。

如果你需要在多个平台上使用同一个 AI，或者想让团队在一个统一的入口使用不同的 AI 能力，OpenClaw 是最合适的选择。

![三种架构哲学对比](https://mmbiz.qpic.cn/mmbiz_png/ibdPSLqks2t2QcKfcUuk2pekybhTpD6zoUeOhRUFCTr0lfcuaNg68kj961BvHp7y6icYZsttLJwxeGsVKiash1b013FGVDNpjK9Nxu4kmRzJWk/640?from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

## 三、执行效率对比

效率这块，我画了张表：

| 维度 | DeerFlow | Hermes | OpenClaw |
| --- | --- | --- | --- |
| 上手速度 | 慢（需 Docker 全栈） | 快（一键脚本） | 中等（Node 24+） |
| 单任务吞吐 | 极高（并行 3-5 倍提速） | 中等（串行） | 高（网关无瓶颈） |
| 长期维护 | 较高（多服务） | 低（自动优化） | 中等 |
| 资源消耗 | 较大（Docker） | 轻量（16GB 可跑） | 轻量（单进程） |
| 定制灵活度 | 高（Skill+MCP） | 高（自生成+手写） | 高（插件化） |

总结一下： **DeerFlow 在并行任务上效率最高** ，但启动成本也最高。 **Hermes 的长期效率会随着使用时间增长** ，越用越顺手。 **OpenClaw 在消息路由层几乎没有性能损耗** ，但 AI 能力是借来的。

## 四、不同场景下的表现

### DeerFlow——深度研究任务的王者

它最适合做需要长时间、多步骤、多信息来源的复杂任务。子代理可以持续接力执行好几个小时不会中途失忆，沙盒环境支持完整文件操作和 Shell 执行，还能生成 Markdown 报告、音频、PPT 等多模态输出。

### Hermes——个人助手的进化冠军

如果你想要一个能长期陪着你、记住你的偏好和习惯、并且越来越懂你的助手，Hermes 是目前最好的选择。跨会话记忆是真的能用，不是摆设。技能自生成也是真实用的特性——做了第一次报告，下次它就知道怎么做了。

### OpenClaw——多平台接入的整合冠军

一个网关覆盖 15+ 个平台，这个东西的价值被很多人低估了。当你需要在 Discord 上跟同事讨论、在 Telegram 上接收通知、在 WhatsApp 上跟客户互动，而且都想用同一个 AI 大脑的时候，OpenClaw 的价值就体现出来了。

![技术关键点横评](https://mmbiz.qpic.cn/mmbiz_png/ibdPSLqks2t2jBsfmOnuKiaOKad7SY6yFuibChEibkK6tUFiaS3ibOEczDhatXDLMwsyNdZ2gJnzib1RN33PvVHSbrNOeVMLLk21icw4gAE6fYFtYks/640?from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

## 五、选型建议

如果你在纠结选哪个，可以这样想：

**先问自己三个问题：**

1. 你需要自动完成"从搜索到分析到生成报告"的长链路任务吗？→ 选 DeerFlow
2. 你需要一个长期陪伴、能记住你的个人 AI 助手吗？→ 选 Hermes
3. 你需要在多个即时通讯平台上使用同一个 AI 吗？→ 选 OpenClaw

**进阶玩法——三者组合：**

用 OpenClaw 做统一消息入口，把不同渠道的任务路由到 DeerFlow 做深度研究，同时用 Hermes 维护用户的长期记忆和偏好。接入层+执行层+记忆层，三层架构合体，是目前我见到的最强 Agent 系统方案。

![选型决策指南](https://mmbiz.qpic.cn/sz_mmbiz_png/ibdPSLqks2t1q3HibaKZbZWI7x4AfGuBBsecCUcVjicrRIv2v2ZMz5UFLb1p0EATmMFvb0DWWst9icjxTWx8icTmjOQGKicZT577Iib6NAggfoOc40/640?from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

没有最好的框架，只有最合适的框架。DeerFlow 是任务机器，Hermes 是成长伙伴，OpenClaw 是智能枢纽。选型不是终点，用起来才是。

---

**#Agent #DeerFlow #Hermes #OpenClaw #开源AI工具**

— END —

**微信扫一扫赞赏作者**

继续滑动看下一个

AI科技跃迁

向上滑动看下一个