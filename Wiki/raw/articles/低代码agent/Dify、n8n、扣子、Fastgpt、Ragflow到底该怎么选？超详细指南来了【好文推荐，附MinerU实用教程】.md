*2025年6月27日 00:00*

编者荐语：

MinerU PDF 解析工具已接入诸多知识库及工作流产品中，包括 Dify、n8n等。但不少朋友在挑选这些产品时犯了难，今天这篇文章就从各方面对这些热门的产品进行了对比介绍，清晰展现各家的特点。这篇干货文非常值得一读，推荐阅读。

大家好。

一直以来，我分享了不少关于工作流平台、LLM应用平台的不少干货文章。

主要包含：Dify、Coze、n8n、Fastgpt、Ragflow

但是几乎每一篇文章的评论区都有小伙伴问，xxx平台和xxx平台比怎么样，该怎么选？

![图片](https://mmbiz.qpic.cn/mmbiz_png/3QzcPBL9P1Agcagib89iaycOKHKfl5ZB8usaGJ1iatHI0puZDExEUe5UCwYCHOiasnQOL79Tb7OvxIMnicdcnozVl9w/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

这不就来了嘛，三连在看，养成习惯～

确实，面对日新月异的AI技术，还有飞速发展的各种LLM平台，我们很容易患上选择困难症

但我想说的是，每个平台各有优势，需要根据自身需求，选择合适的即可。

这篇文章会从实用角度出发，通过详细的功能对比、真实的使用体验和具体的应用场景，帮助你在Dify、Coze、n8n、FastGPT和RAGFlow这五款主流平台中找到最适合自己的那一个。

无论你是AI开发者、企业用户，还是刚接触AI的新手，这篇对比分析都能为你提供清晰的选择指南。

本篇文章5000字，干货满满，建议收藏～

首先我们要明确一下

LLM应用平台有：Dify、Coze、Fastgpt、ragflow

n8n比较特殊一点，它是以工作流为主的LLM平台。

LLM应用平台的核心价值在于大大降低了AI应用的开发门槛，加速从概念到产品的落地过程，并为开发者提供整合、管理和优化AI能力的工具集（插件、MCP工具等等）。

通过这些平台，咱们可以更专注于业务逻辑和用户体验创新，而非重复性的底层技术构建。

先简单了解一下这几个平台的特点

**n8n：** 以其强大的通用工作流自动化能力著称，近年来积极拥抱AI，允许用户将LLM节点嵌入复杂的自动化流程中。

**Coze (扣子)：** 由字节跳动推出，主打低代码/无代码的AI Agent开发，强调快速构建和部署对话式AI应用。

**FastGPT：** 一个开源的AI Agent构建平台，专注于知识库问答系统的构建，提供数据处理、模型调用和可视化工作流编排能力。

**Dify：** 开源的LLM应用开发平台，融合BaaS和LLMOps理念，旨在提供一站式的AI应用快速开发与运营能力，包括Agent工作流、RAG Pipeline等。

**RAGFlow：** 基于深度文档理解的开源RAG引擎，专注于解决复杂格式文档的知识提取与高质量问答。

各平台详情

**Dify：LLM平台中的瑞士军刀**

**先给Dify 3个关键词吧**

**#开源 #LLMOps #生产就绪**

**一句话：** Dify 是个23年4月开源的LLM应用开发平台，如果想整点专业的、能上生产的AI应用，还想把后端、模型运维的事全搞定？用它就OK了。

地址：dify.ai

Dify 主打“Backend-as-a-Service”和“LLMOps”，目标是让开发者和不懂技术的创新者都能轻松上手，快速鼓捣出实用的AI解决方案。

它把 RAG（检索增强生成）管道、AI工作流、监控工具、模型管理，MCP这些功能都塞进一个平台里。

确实像瑞士军刀一样，想要什么功能基本都有。

主打一个“你只管创新，其他交给Dify”。

顺便插播一下，Dify最近做了一下品牌焕新。

支持使用Docker私有化部署，运行起来的服务器最低配置是2核4G

社区活跃度也不错，目前在Github已经有98.3K Star了

但是总给我一种样样通，"样样松"的感觉，好像没有特别突出的地方。

还有一个缺点就是Dify里面创建的Bot，如果想对外提供服务的话，其API没有兼容OpenAI API，就会导致外部应用想要对接会相对困难。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

另外，对于只想快速实现一些小功能的用户来说是有点重了

大型企业集成的话，应该还是需要自己在上面二次开发的。

**适合人群：** 有一定技术的开发者、追求专业、效率的团队、需要定制化AI解决方案的企业。

对MinerU 接入Dify 插件实操感兴趣的朋友，可以参考 [MinerU教程第一弹丨Dify插件超详细配置攻略和工作流搭建案例，不允许还有人不会](https://mp.weixin.qq.com/s?__biz=MzkxMDc0MDU5Mg==&mid=2247550543&idx=1&sn=5d83f1601148cadf2a649a9cecf3c74b&scene=21#wechat_redirect)

**Coze：LLM平台界的“乐高”**

#无代码 #智能体构建 #多平台发布

**先来一句话总结：** Coze（扣子）是字节跳动旗下的，主打一个“人人都是AI开发者”，内置上千款工具插件，让你像搭积木一样简单地创建和发布AI Agent。

地址：coze.cn

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

不管你懂不懂编程，Coze都能让你把脑洞里的AI智能体快速实现。

可视化搭建、丰富的插件、知识库、工作流一应俱全，还支持一键发布到抖音、飞书、微信公众号、小程序、Discord、Telegram等各大平台。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

有海外版（Coze）和国内版（扣子）

Coze是闭源的，但它的功能比Dify更丰富。

我比较中意的有代码插件，零代码小程序、web页面，定时任务等功能。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**适合人群：** AI入门用户、产品经理、运营人员、想快速搭建个性化AI Agent的创作者、以及预算、技术有限的个人和小型团队等。

**FastGPT：知识库小能手**

**#开源 #RAG知识库**

**一句话：** FastGPT是个免费开源的AI知识库平台，让AI根据你的私有数据精准回答问题，是你的第二个"大脑"

地址：tryfastgpt.ai

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

FastGPT 提供数据处理、模型调用、RAG检索和可视化AI工作流，MCP一条龙服务。

你可以导入各种格式的文档（Word、PDF、网页链接等），用最短的时间打造出特定领域的AI问答助手。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Fastgpt的RAG效果是相当不错的，它能够简单、快速构建一个高质量知识库，我之前用它做我的微信AI助理产品的客服，挺棒的。

一些企业级客户我也是帮助他们用fastgpt来构建知识库，轻量，简单，好用。

它还提供与OpenAI兼容的API，可以非常方便的把它集成到现有的其他应用里。

支持Docker私有化部署，最好用2核4G的服务器来跑。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

相比Dify来说，优点在于更轻量、知识库效果更好、API兼容OpenAI API，更方便集成到其他应用。

但是在功能的丰富度、和一些体验上是不如Dify的，社区也不如Dify活跃，目前在Github是24.2K Star

但是如果你是想快速打造知识库为主的AI应用，我都推荐先试试Fastgpt。

适合人群：需要构建企业内部知识库、AI客服、的开发者或企业，以及对RAG技术感兴趣的AI爱好者。

**RAGFlow：知识库专家**

标签：#开源 #RAG引擎 #深度文档理解

**一句话：** RAGFlow 是个开源的RAG引擎

地址：ragflow.io

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

RAGFlow的核心竞争力在于“深度文档理解”，比如能从合同里提取条款、总结长篇报告。以及支持10多种类型的数据预处理，不管是在RAG的知识库构建，还是问答阶段都有非常丰富的参数去调整。还支持知识图谱功能。

RAG的颗粒度细，知识库效果上限很高。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

如果说Fastgpt是知识库小能手，那么Ragflow就是知识库专家（从它的名字里面就能看出来）。

支持Docker部署，但是比较重，需要至少4核16G配置的服务器才能流畅使用。目前在Github有53.1K Star

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**适合对答案准确性和可追溯性有高要求的行业（如法律、医疗、金融）、需要处理大量复杂文档的企业、以及RAG技术的研究者和开发者。**

**n8n：最强开源工作流平台**

#开源 #工作流自动化 #低代码

**一句话总结：** n8n 是一个开源的低代码工作流自动化工具，专注于将各种应用和服务连接起来，形成自动化的业务流程。

地址：n8n.io

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

n8n 的核心是通过可视化节点（Node）来构建自动化流程，同时每个节点所提供的配置参数丰富，定制化程度高。

它提供了超过400个预置集成，覆盖各类SaaS服务和数据库。既可以通过简单的拖拽操作构建工作流，也可以通过js或Python代码进行更复杂的定制。

它包含Agent节点，能够快速接入各种大模型，同样支持了MCP。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

在实际业务中，n8n能极大提高工作效率

比如Delivery Hero使用n8n每月节省了200多小时的工作时间

https://n8n.io/case-studies/delivery-hero/

StepStone也靠它运行了200多个关键任务流程

https://n8n.io/case-studies/stepstone/

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

虽然n8n有很多优点，但毕竟是工作流平台，主打工作流。在LLM这块丝滑程度还是比不上其他专业的LLM应用平台，LLM这块该有的也都有，就是用起来感觉更麻烦一些。

同时上手难度也是这些个平台里面最大的了，需要一些逻辑思维，和前期的学习成本，但上手之后效率将会极大的提升。

也支持Docker私有化部署，完全不吃配置，1核1G的服务器应该都能跑。

**适合人群：** 需要高度定制自动化流程的团队、开发者、以及追求效率最大化的中小企业。

对MinerU 接入n8n实际使用案例感兴趣的朋友，可以看一下 [MinerU 教程第三弹：零基础使用 n8n 调用 MinerU MCP 搭建文档处理自动化系统](https://mp.weixin.qq.com/s?__biz=MzkxMDc0MDU5Mg==&mid=2247550718&idx=1&sn=4fbf1dbec848be4af80cb8fbf5ebf4dd&scene=21#wechat_redirect)

5大平台功能横向对比

为了帮助大家更清晰地了解这五个平台的区别和优势，我整理了一张详细的对比表，从多个维度进行客观分析：

*其中Coze目前不是免费的了*

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**平台选择实用建议：**

从我的实际体验来看，如果你是刚接触AI应用开发，希望快速看到成果， **Coze** 是最容易上手的选择。

如果你的工作或者业务涉及多个系统和服务之间的数据流转，需要自动化处理， **n8n** 的强大自动化工作流会为你节省超多时间。

想搭建企业内部智能知识库或者Q&A系统，FastGPT、 **Ragflow可以** 优先考虑，它们在RAG方面都比较强，FastGPT更轻量、Ragflow更重（但上限更高）

对于有长期规划、需要构建可扩展企业级AI应用的团队， **Dify** 的完整生态系统和企业级功能是好的选择。

**为了更直观，基于我的实际使用体验和各平台特点，我整理了 **下面这张"用户适用性评分图"（满分5分），希望可以帮助大家快速定位自己的需求对应哪个平台：****

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

还有下面这个图，也可以参考参考

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

选型考量要素

在最终做出选择之前，建议大家考虑以下几个关键要素，它们会直接影响你的使用体验和长期效果：

**预算：**

开源平台可以免费自托管使用，但需要考虑服务器和维护成本；云服务则是按使用量或订阅付费，前期成本低但长期可能更高。根据你的资源状况和业务规模选择合适的方案。

**技术能力：**

评估你或团队的技术背景、学习意愿。如果技术实力有限，选择像Coze这样的无代码平台会更合适；如果有较强的技术团队，就可以考虑Dify或n8n等提供更多定制能力的平台。

**部署：**

考虑是否需要数据本地私有化。自托管方案提供更高的数据安全性和隐私保护，但需要更多的技术支持；云服务则提供快速部署和低维护成本，但可能存在数据安全风险。

**核心功能需求：**

详细列出你最核心的需求，看哪个平台能够最好地满足这些关键点。比如如果RAG能力是最重要的，那么FastGPT或RAGFlow可能比Coze更合适；如果需要复杂工作流，n8n或Dify会是更好的选择。

**平台可持续性：**

评估平台的更新频率、社区活跃度和长期支持情况。开源项目要看社区活跃度和贡献者数量；商业产品看公司背景和市场表现。这直接关系到你选择的平台能否长期发展并跟上技术变化。

**数据安全与合规方面：**

特别是对企业用户来说，数据隐私保护、访问控制和合规性至关重要。开源自托管平台在数据安全方面更有优势，因为数据可以完全保留在自己的环境中；商业平台则需要仔细阅读其隐私政策和数据处理协议等等。

**通过认真评估上面这些因素，结合前面的对比分析，相信大家应该能够找到最符合自身需求的LLM应用平台了吧。**

**「最后」**

**经过这次全方位的对比分析**

**希望大家对Dify、Coze、n8n、FastGPT和RAGFlow这五个平台有了更清晰的认识。**

**没有绝对完美的工具，只有最适合当前需求和发展阶段的选择。**

我的建议是：

如果可能的话，可以先从使用门槛较低的平台（如Coze）开始尝试，熟悉LLM应用开发的基本概念和流程；

后面需求越来越复杂，技术也有一定提升之后，再逐步过渡到更专业的平台（如Dify或n8n）。

AI Agent是一个快速发展的领域，各平台也在飞速进化和完善。

希望这篇分析能为大家提供一个基础的参考框架

帮助大家在这个充满机遇和挑战的AI时代找到适合自己的工具和方向。

如果还有其他问题或者经验分享，欢迎在评论区交流～

******以上，既然看到这里了，如果觉得不错，随手点个赞、在看、转发三连吧，如果想第一时间收到推送，也可以给我个星标⭐～谢谢你看我的文章，我们，下次再见。******

超详细的MinerU实用教程也为大家准备好了

点击阅读

👇

[MinerU教程第一弹丨Dify插件超详细配置攻略和工作流搭建案例，不允许还有人不会](https://mp.weixin.qq.com/s?__biz=MzkxMDc0MDU5Mg==&mid=2247550543&idx=1&sn=5d83f1601148cadf2a649a9cecf3c74b&scene=21#wechat_redirect)

2025-05-09

[MinerU教程第二弹丨MinerU 本地部署保姆级“喂饭”教程](https://mp.weixin.qq.com/s?__biz=MzkxMDc0MDU5Mg==&mid=2247550587&idx=1&sn=c5e384ed79be3ac63f6f8755b770fbfd&scene=21#wechat_redirect)

2025-05-16

[MinerU × Cherry Studio：知识库再添动力！](https://mp.weixin.qq.com/s?__biz=MzkxMDc0MDU5Mg==&mid=2247550749&idx=1&sn=8e8668431c3d41c81b5071d0d37064c4&scene=21#wechat_redirect)

2025-06-17

[【MinerU × LazyLLM】PDF无损拆包，让RAG更懂你的文章！附PDF解析组件选型与RAG案例分享](https://mp.weixin.qq.com/s?__biz=MzkxMDc0MDU5Mg==&mid=2247550423&idx=1&sn=aae4f098fd607829e3df9fef37814fe8&scene=21#wechat_redirect)

2025-04-08

继续滑动看下一个

OpenDataLab

向上滑动看下一个