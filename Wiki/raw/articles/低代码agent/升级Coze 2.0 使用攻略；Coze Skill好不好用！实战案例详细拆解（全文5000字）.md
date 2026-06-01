杰克船长的AIGC *2026年1月20日 07:55*

点击上方卡片关注 不要错过精彩文章

持续更新有关Agent的最新搭建思路和工作流分享，希望能给您带来帮助，点一点上方的🔵蓝色小字关注，你的支持是我最大的动力！🙏谢谢啦！🌟"　

大家好！我是唐舰长🙏

每天早上我都有看公众号的习惯，昨天一早就看到Coze官方发布了一篇文章Coze2.0 正式上线

花了一点时间，把现在Coze的情况，以及最新更新的内容，怎么用、怎么玩进行一个整合，这篇文章算是一篇Coze2.0攻略，希望能给大家带来帮助。

Coze2.0升级点：增加「Agent Skills」（技能）、「Agent Skills」变现、Coze订阅费用、UI调整

![Image](https://mmbiz.qpic.cn/mmbiz_png/sqr7oTe0d22gJ9tMiaydMBibXuSTTuaADw0HaYmWzecExhcaHRLopr2NtILuicL4wLOBOUvn15zIxibwnsI2HdyxtA/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

这个Coze2.0其实就是相当于「扣子空间」的升级，而不是低代码搭建的升级

「扣子空间」相信大家都或多或少使用过，甚至之前我的很多文章封面都是拿的「扣子空间」做的，视觉效果是绝对没毛病的。

「扣子空间」有什么好升级的呢？功能更强吗，还是生成更好了...

其实都不是，而是Coze新推出一个功能「Agent Skills」，这个「Agent Skills」是可以直接被「扣子空间」进行调用

这个被调用的「Agent Skills」就是我们自己可以创建的

其实这两个月Skills的概念特别火，我也浅浅的了解了一下，因为业务需求不太多，并没有在这个板块去下功夫给大家分享，很多小伙伴可能都不清楚这个Skills，到底是个啥？

这里我先给大家看一下带有「Agent Skills」生成的效果：（这个「Agent Skills」是我自己生成的）

内容比较长，就截取三个选题，这是我做的一个每日热点选题Skills，并把选题方向变成舰长公众号的日常选题：“AI圈、AI Agent、AIGC”这些领域中

可以看出生成的效果确实不错，而且我就只有一句话“帮我生成今天的爆款选题”

「Agent Skills」的创建生成到上线部署，到运行效果，全程我只花了10分钟搞定；说出来可能不信，但我接下来会给大家演示如何实现的。

在开始实现之前，先给大家分享一下「Agent Skills」是什么？

关于这个板块，其实有非常多的文章信息，这里我就用等级的概念描述一下

初级「Agent Skills」

一个提示词的md文件给到AI，正如下面图片右侧中的内容，有角色、有任务、有操作步骤。（图片内容为Coze 技能生成的页面截图）

这些内容就是一个提示词的框架，根据我们的要求，生成一个结构化的提示词。对于小白或者提示词工程不熟悉的小伙伴是非常方便的。

中级「Agent Skills」

在初级的基础上增加两个板块：SOP流程（自己的行业经验）、API请求

SOP就是流程嘛，第一步干什么、第二步干什么；这些都是基于拥有行业经验，业务流程，明确需求的小伙伴所需要的，因为希望AI可以按照流程去干活

API请求则是一些可以快速调用其他平台功能，如：调用gemini的香蕉生图模型、某红书平台数据接口等等，让AI执行效率更高、质量更好。

案例在文章下面演示如何实现，一个电商批量出图的案例，曾经用n8n捣鼓许久的需求，「Coze技能」只需要30分钟（想想也是苦涩，但也是好事）

高级「Agent Skills」

一句话“带脚本”

脚本能干什么？

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

具体的我就不过多分享，在这一块有专业性的小伙伴，是有福了

本质上「Agent Skills」就是一个提示词工程，可以把我们之前搭建的工作流，也变成提示词让AI大模型去生成，省去搭建工作流的时间和技术。

通过拖拉拽搭建的工作流，现在一个需求文档，一句话就能搞定

接下来，分享一下Coze2.0的升级内容

### Coze2.0 升级内容分享

1.当我们打开网址：https://www.coze.cn/

就会出现曾经的「扣子空间」

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

2.在左上板块有四个功能按钮

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

收藏夹：添加自己的经验、文件

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

技能：也就是「Agent Skills」，现在有技能商店，可以上架自己生成的技能。供其他人使用，可以开启收费模式（和之前的Coze模版商店类似的收费）可供开发者变现，这算是一个优势了

只要你有好的行业经验和思路，生成的「Agent Skills」就可以被付费用户使用，更何况Coze本身做的也是办公领域的内容比较多，只要是功能不错是不缺用户使用的。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

3.创建、生成技能

点击右上角的创建技能

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

自动跳转到「扣子编程」使用栏

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这个页面就是原本的Coze低代码搭建平台，UI做了一些改动和升级；如果不喜欢新版本可以继续点击右上角的「回到旧版」，旧版就是低代码搭建平台，没有什么大的更新优化

喜欢曾经的Coze和使用的小伙伴，继续使用，没有什么影响

尝试创建一个「技能」：每日选题（初级「Agent Skills」）

输入一句话任务，并生成

```
一个每日热点选题，AI科技圈、AI 智能体、AIagent、AIGC这些领域相关的热点选题
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

生成后会跳到代码生成页面，左侧为运行状态，中间文件目录，右侧是文件内容

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

生成很快，大约5分钟左右，生成好后就能看到效果

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

想要使用自己生成的技能就需要部署，点击右上角的部署

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如果没有环境变量就直接跳过，继续部署

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

部署成功：整个时间不会超过10分钟，大家可以尝试一下这个demo

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

4.使用「Agent Skills」技能

回到网址：https://www.coze.cn/

点击“@”键——找到技能——选择生成好的“热点选题技能”

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

输入一句话：

```
帮我生成今天的爆款选题
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

生成后就能得到，上面我分享的效果截图

5.长期计划Agent Plan

现状：AI 是"等待指令"的工具

目前使用 AI，你需要不断主动提问，它才会回应。想让它帮你完成长期项目？你得像监工一样时刻盯着，隔三差五提醒它下一步该做什么。这种模式更像在使用工具，而非与伙伴协作。

转变：AI 成为"主动执行"的助手

现在，这个模式可以彻底反转——只需给 AI 设定一个长期目标，它会自主规划路径、持续执行，并定期向你汇报进展。不用你追着催，它会主动找你。

这就是扣子推出的「长期计划」（Agent Plan）。

举个例子：你想在3个月内通过英语六级考试

只需告诉扣子："帮我3个月内通过英语六级。"

Agent 会自动开始工作：

✅ 第1周：分析你的当前水平，制定个性化学习计划  
  
✅ 每日执行：推送单词任务、听力练习、阅读材料  
  
✅ 每周复盘：测试学习效果，调整薄弱环节的训练强度  
  
✅ 考前冲刺：自动整理高频考点，安排模拟测试

整个过程，你只需在开始时说一次目标，扣子 Agent 会持续数周甚至数月执行，直到帮你达成目标。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

6.付费订阅

这个板块目前我也搞的非常懵，原本的资源点都消失了，转为“积分”

这个板块官方也没有明说，但可以看出来，现在在Coze中的使用：“扣子编程、低代码搭建、扣子空间、知识库、插件调用”基本上所有的功能都已经收费。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

老用户的价格没变还是9.9，但多了很多订阅选项

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

为什么我没有买，是因为昨天我是19.9，且第二月34.9（os：当时心里还很郁闷呢，难道是杀熟，其实应该是没更新到）

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

创建第二个「技能」：电商产品详情图（中级「Agent Skills」）

使用下面代码框中的提示词，先看下面的注意事项，再复制去使用

```
我需要制作一个电商产品详情图的套图生成，每次需要生成九张
这个是图片prompt生成的智能体提示词：
\`\`\`
角色
你是一位顶级的电商视觉策略师和创意总监。你负责为品牌制定从吸引点击到最终转化的全链路视觉解决方案。你深知主图、副图、详情图在用户决策流程中扮演的不同角色，并擅长让它们协同作战，最大化产品的吸引力。生成的prompt都是中文

背景信息 (Context)
用户提供的产品信息核心卖点
任务
你已经收到了运营团队提供的结构化产品卖点。现在，请你作为视觉总监，为该产品策划并输出一套完整的【整合视觉资产方案】。此方案必须包含三个核心部分：主图、副图和详情图的设计策略与具体说明。

你的工作流程如下：
进行“设计风格定位”: 首先，基于产品、用户和卖点，为整个项目确立统一的视觉风格基调，并阐述理由。这是后续所有设计的基础。
规划“视觉资产组合”: 在你制定的风格指导下，分别为【主图】、【副图】和【详情图】这三个关键触点，设计其独特的视觉呈现方案，明确各自的沟通任务和表现形式。

输入的产品卖点
用户输入的产品卖点
输出要求
请严格按照以下结构输出。确保第一部分的“风格定位”能够统领全局，第二部分的“资产方案”中，主图、副图、详情图三者之间逻辑清晰、层层递进。
第一部分：整体设计风格定位

推荐主风格: [AI根据输入信息，在此处给出建议，例如：温暖居家日系风]
推荐辅助风格: [AI根据输入-信息，在此处给出建议，例如：场景化叙事]
设计策略阐述: [AI必须在此处详细阐述选择此风格的理由。例如：鉴于本产品为“智能恒温冲奶机”，目标用户是注重科学喂养的新手爸妈，因此：
主风格“温暖居家日系风”: 能营造温馨、安全、治愈的氛围，精准触达母婴人群的情感诉求，与冰冷的科技产品形成差异化。
辅助风格“场景化叙事”: 能将产品功能融入真实的育儿场景（如夜间喂奶、外出携带），让用户直观感受到产品带来的便利，产生强烈代入感。]

第二部分：整合视觉资产方案
2.1 主图设计 (Main Image Design)
核心任务: 脱颖而出，吸引点击。在1秒内传递“这是什么”和“为谁而生”，并在众多竞品中凭借独特的视觉风格胜出。
设计方案:
构图与布局: 建议采用一张高质量的场景图作为主图。产品放置在画面视觉中心，但并非生硬的白底图，而是巧妙融入温馨的婴儿房场景（如床头柜上）。
核心文案叠加: 在图片留白处，用圆润、亲和的字体叠加核心价值主张，例如“告别试温烦恼，每一口都是妈妈的爱”。文字不宜过多，点明即可。
氛围与质感: 整体色调采用低饱和度的暖色系（米白、原木色）。通过柔和的侧光，突出产品的材质质感和圆润的设计，传递安全感。

2.2 副图矩阵设计 (Carousel Images Design)
核心任务: 快速说服，建立兴趣。在用户滑动的前5张图内，快速展示产品的核心卖点、使用场景和整体外观，打消初步疑虑。
设计方案 (按产品卖点顺序来排布)，
输出参考格式如下:
    * 副图1 (对应核心卖点A):
    * 副图2 (对应核心卖点B):
    * 副图3 (对应核心卖点C):
    * 副图4 (对应核心卖点D):
    * 副图5 (对应核心卖点E): 
2.3 详情图设计 (Details Page Design)
核心任务: 深度沟通，建立信任，完成转化。通过富有逻辑的叙事结构，详细解答用户所有潜在疑问，展示品牌专业度，最终促成下单。
设计方案 (模块化叙事结构)，输出格式如下：
模块一：最大卖点: 目标-承接主图风格
其他模块：其他每个卖点用一个图来介绍: 目标-深度拆解副图中提到的核心卖点。呈现-为每个核心卖点设计独立的板块，使用“场景痛点 -> 解决方案 -> 技术原理”的逻辑，配合特写图、数据图标和分解图进行说明。
\`\`\`
生成1张主图、5张详情图、5张副图，生成图片需要调用banana的接口，接口请求信息为：API需要制作成环境变量
curl --location --request POST 'https://api.kafeiai.cn/v1/images/generations' \
--header 'Authorization: Bearer sk-RNlsxqsjcxD863RB53NTv9LVTbK1tVrK6igovPXfHcjxicY0' \
--header 'Content-Type: application/json' \
--data-raw '{
    "model": "nano-banana-2-2k",
    "prompt": "在纸箱上写上康师傅三个字",
    "aspect_ratio": "1:1",
    "response_format": "url",
    "image": ["参考图链接"]
  }'
\`\`\`
请求生成好图片后，我需要一个自动跳浏览器下载的功能。
\`\`\`
使用时我会提供一张产品原图的链接和产品信息，不要太复杂，只有产品原图和产品信息，生成的比例主图为1:1.详情图和副图为3:4。
```

上面代码框中的内容下面有一个API请求指令，修改黄色部分的API-KEY。获取到的API要替换掉再复制整个提示词给「技能」去生成「Agent Skills」

API获取地址为：https://api.kafeiai.cn/register?aff=b2d3be30429

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

生成后，继续去部署到「扣子空间中使用」

```
产品链接：https://cbu01.alicdn.com/img/ibank/O1CN01Uy1IyC21dibk52xlM_!!2218329237008-0-cib.jpg?x-oss-process=image/format,png

产品信息：冰红茶
```

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这个案例是之前我用n8n工作流搭建，之前的流程是这样的：

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

一个工作流的搭建时间是无法计算的

正常流程：梳理需求、思考实现、搭建几个小板块（生图板块、者提示词板块每个板块，单独搭建测试）、整体搭建、测试调优。（还不算本地部署n8n的时间和了解上手的时间）

刷到教程案例的小伙伴就只能一步一步的去完成，每个人的使用熟练度也不一定，上手难度确实挺高

而现在的流程：梳理需求+思考实现即可

如何实现生成图片？需要调用哪个API？调用的API生图中的提示词是什么？

这三个板块就是我思考的内容，其余全是「Coze 技能」帮我实现的

运行效果：每一个需求图片链接都已经返回过来，只需要进行下载即可

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

写在最后：

Coze 2.0的升级，本质上是把"搭建工作流"变成了"描述需求"。

以前需要花几天研究节点、调试代码的事情，现在一句话、10分钟就能搞定。这对我们这些做自动化工作流的人来说，真的是降维打击。

同时Coze做的这个生态也非常好，让开发者愿意去使用，愿意去分享好用的Skills（技能）

不能说Coze2.0毫无门槛，小白也能搞

但可以说只要你有“思考逻辑、懂一点技术”就能使用好

你觉得Coze 2.0的Agent Skills会取代AI工作流吗？欢迎评论区聊聊你的看法！

如果这篇文章对你有帮助，记得点赞+收藏，下期我会继续深挖Agent Skills的高级玩法，不想错过的记得关注我！同时每周日会分享新技术以公益直播方式，这周就会将Coze2.0的使用用直播的方式再进行一次分享，不要错过～

我是唐舰长，我们下期见！

关注公众号并添加舰长微信，领取智能体学习资料，并参与智能体技术直播讲解

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

另外非常欢迎大家加入\[唐舰长AI落地智能体交流群\],主要交流群每周都会进行公益直播教大家搭建AI智能体工作流

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

继续滑动看下一个

杰克船长的AIGC

向上滑动看下一个