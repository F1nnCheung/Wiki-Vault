---
title: "【万字】OpenClaw vs Hermes：一文深入拆解两大 Agent 框架"
source: "https://mp.weixin.qq.com/s/wPuKUlajb6IaIL3uH7gSAA"
author:
  - "[[叶小钗]]"
published:
created: 2026-05-08
description: "OpenClaw VS Hermes：谁才是 2026 最值得研究的 Agent？"
tags:
  - "clippings"
---
叶小钗 *2026年4月20日 08:28*

> AI训练营 **9期** ， **5月7日** 开班，欢迎咨询

书接上文：

1. [《理论：从工程角度为你拆解 OpenClaw》](https://mp.weixin.qq.com/s?__biz=Mzg2MzcyODQ5MQ==&mid=2247499154&idx=1&sn=2766f89253ac3404bf42d4f8503b0364&scene=21#wechat_redirect)
2. [《万字：拆解 OpenClaw：从 Gateway、Memory、Skills、多 Agent 到 Runtime》](https://mp.weixin.qq.com/s?__biz=Mzg2MzcyODQ5MQ==&mid=2247499668&idx=1&sn=ee212ac2018c378f4761522f798cd241&scene=21#wechat_redirect)
3. [《万字：拆解 OpenClaw 上下文工程/记忆系统》](https://mp.weixin.qq.com/s?__biz=Mzg2MzcyODQ5MQ==&mid=2247499867&idx=1&sn=beae552f3459775b39f24002fb282fe7&scene=21#wechat_redirect)
4. [《万字：OpenClaw 核心机制 Skills 全解析》](https://mp.weixin.qq.com/s?__biz=Mzg2MzcyODQ5MQ==&mid=2247500098&idx=1&sn=cdff54e1d704aa3787ad3536d666651d&scene=21#wechat_redirect)

2026 开年以来，AI 界有两件巨大福利：

第一是 OpenClaw 的爆火，倒不是说小龙虾解决了多少问题，而是他首先为 Agent 的普及做了巨大的贡献；其次 OpenClaw 也几乎奠定了由 Agent 去驱动 Skills 的基础交付范式。

第二是 Claude Code 源码的泄露，这又给正在做 Agent 创业的团队提供了大量优质范本，在 CC 之前，大家对于什么是 Harness 驾驭工程其实还是有些模糊的。

只不过，前景是美好的，但现实也依旧存在很多问题，就我的观察、实践： **目前 Agent 还没有趋于成熟，OpenClaw 在执行任务的稳定性和安全性上都还有很大进步空间。**

所以，后面一定会有越来越多的 Agent 出现，他们每次都会进步一丝，比如最近逆势而上的 “爱马仕” Hermes：

> Hermes Agent，从 2 月底开源首月破 2.2 万星，到 4 月 8 日 v0.8.0 版本发布后单日新增 6400+ 星，不到两个月 GitHub 总星标突破 4.7 万，多日霸榜全球开源榜单第一

## OpenClaw VS Hermes

最近常常出现 ***小龙虾已死，爱马仕称王、Hermes 碾压 OpenClaw*** 这类说法，说实话，听着挺烦的，虽然我也会用这类标题...

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/6Uzn2S5AAyRnlXYcAibRO5E8uW4zsbZ7nG4G6b9D6NBFwiajm5XFjiaEoMmQOkiav7whLOVpPqbd41t44BkxHUIyuIpkA9J22JldN39C9iayupOE/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

这个 Hermes 到底是个什么东西，又凭撒可以跟 OpenClaw 一较高下，我们这里还是要 **回归本质** ，尽量用工程（少量源码）的角度，为大家展开论述。

首先，OpenClaw 是一个 TypeScript 写的 AI 助手平台，工程化程度相当高。我之前写过几篇拆解文章，文章开始有链接大家可以看看。

**Hermes Agent** 是由 Nous Research 团队开发，Python 编写，可开源商用的一套 Agent 平台：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**Hermes Agent** 的设计理念是什么，和 OpenClaw 最大的区别是什么？这是我们今天讨论的重点。

在具体展开之前，市面上已经有很多类似的拆解文，鼓吹了 Hermes 一些不得了的特性，所以我需要大家带着以下问题展开阅读：

1. **学习闭环** ：Hermes 用三层提示词引导 Agent 自己提取技能，真的靠谱吗？
2. **记忆系统** ：三层记忆 vs 单插件槽位，Hermes 和 OpenClaw 的设计差距在哪？
3. **安全 vs 成长** ：智能审批还是默认安全？两种哲学你该站哪边？

## Hermes整体架构

Hermes 的架构分为四层：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

核心设计理念是： ***闭环学习***

> 经验 → 技能 → 改进 → 知识持久化

看过我之前的文章的同学，对这个架构图一定会感到熟悉，这个设计和 OpenClaw 差不多，都是分层架构，网关、Agent 核心、工具层、执行环境，该有的都有：

![OpenClaw 五层架构](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

OpenClaw 五层架构

只不过每个模块的设计出发点有所差异，先看这张对比表：

| 维度 | Hermes Agent | OpenClaw |
| --- | --- | --- |
| 核心问题 | Agent 怎么才能越来越强？ | 怎么让 Agent 安全可靠地执行任务？ |
| 语言 | Python | TypeScript |
| 技能/插件 | Agent 自己创建 Markdown 技能文件 | Plugin SDK，manifest-first，严格边界 |
| 记忆系统 | 三层：内置 + 外部提供商 + 会话搜索 | 单插件槽位，可替换 |
| 上下文压缩 | 压中间，保护两端，迭代摘要 | 压最老轮次，保留最近，归档原始数据 |
| 安全模型 | 智能审批（辅助模型判断风险） | 10+ 安全模块，默认安全 |
| 执行环境 | 6 种后端（含无服务器） | 3 种后端（偏安全沙箱） |
| 国内平台 | 飞书/钉钉/企业微信/微信 原生支持 | 飞书/QQ 扩展支持 |
| 研究能力 | 内置 RL 训练工具链 | 纯产品，无训练能力 |

有了整体印象后，下面我们来讲细节，首先是最核心差异： **学习闭环**

## 学习闭环

Hermes 和 OpenClaw 的差异几乎都从 `学习闭环` 这一点衍生。

OpenClaw 回答的问题逻辑是： **怎么让 Agent 安全可靠地执行任务** 。

所以我们看到它的设计是多层审批、安全审计、沙箱隔离、严格插件边界。

而 Hermes 回答的逻辑是： **Agent 怎么才能越来越强？**

目的不一样，那么架构设计的方向就会有细微差异，最初我是比较偏向 OpenClaw 的，因为 **安全、稳定** 才是上生产的必须，从这个角度再看它的安全机制，10 多个安全审计模块、危险工具白名单、沙箱隔离，意义就很大，可以说完全是工程实践的产物。

只不过普通用户可能感知不到安全问题，对这个也不太敏感、OpenClaw 虽然做了很多策略，但也没正经人会让他去上生产执行 ***严肃性*** 任务，这就造成了一个结果：

我们这些 AI Agent 一线的打工人，可以很深刻感受 AI 带来的不确定性，甚至会遭遇 **删文件，删数据** 这些情况，但从学习的角度来说，这块又有些多余，毕竟现在 OpenClaw 更多还是在自娱自乐。

然后就是 Hermes 了，既然现阶段目标都还是 **范式探索** ，而不是 **完全生产架构** ，那么 **自进化、越用越强** 就是个非常好的特性了。

比如 Hermes Agent 的 skill loop 这个源码，整个设计思路就很有意思，很值得学习借鉴一番，其核心思路是一个闭环：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

核心代码在这几个函数里面， `agent/skill_utils.py` 、 `skill_manager_tool.py` 、 `prompt_builder.py`

我原本以为这个 `自我进化` 是靠某种自动 pipeline，比如 cron job 定时触发 + skill extraction 脚本。

这里先科普下什么是自进化：

#### 所谓自进化

对于 AI 应用来说，所谓的自进化，其实与 **数据飞轮** 的策略是很类似的，如果是 AI 客服类项目，传统做法是：

1. 先把用户问题、客服回复、最终是否解决这些数据沉淀下来；
2. 再从这些数据里筛选高质量问答、 ***失败案例、争议案例*** ；
3. 然后由人工或系统对这些内容进行整理、归类、清洗；
4. 最后再回灌到知识库、意图库，推动下一轮回答效果提升；

这是一个很典型的闭环：

> 交互数据积累 → 经验提炼 → 知识沉淀 → 下一轮效果提升

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

所以大家才会经常提 ***数据飞轮*** ，因为它描述的是系统会因为数据回流而逐步变强。AI 知识库其实就是最早、也是最常见的一种 ***自进化*** 形态。

这里处理的更多是边界数据、错误数据，回填的是 **知识库** ， ***系统架构本身并没有变化*** ，但因为知识库越来越强，整个系统表现就越来越好了。

从这个点再回顾 Agent/Hermes 架构，那么一样的 **基本的架构** 一定不会发生变化，而 Agent 也不会涉及数据，那么能变的就只有工作方法了，也就是我们常说的 ***工作流*** ，而根据之前 OpenClaw 的启示，现阶段 Agent 用以承载 Workflow 的模块就是 Skills。

> 综上，Agent 的自进化是围绕着每一个 skill 做展开的

接下来再说我们之前做自进化的策略：

#### 我们的 Agent 的自进化策略

如前所述，从工程上看， ***所谓 Agent 的自进化，本质上就是把一次次任务执行中产生的经验重新回收，再沉淀成新的 Skill、规则或工作方法。***

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

既然是经验回收，那最符合传统工程习惯的实现方式，往往就不是让 Agent 在主链路里自己边做边判断，而是单独拉出一条后台流水线。

这条流水线大概会长这样：

> 任务执行完成 → 记录执行轨迹 → 筛选成功/失败案例 → 提取可复用模式 → 生成或更新 Skill 文件 → 下次任务继续使用

如果再翻译翻译，那就是：

1. 前台 Agent 负责完成任务；
2. 后台系统负责收集日志、调用链、报错信息和成功路径；
3. 再由独立的模块去分析这些轨迹；
4. 最后把总结结果写回技能库、经验库或者某种规则文件；

这是一种很典型的设计，也是很多 AI 应用更常见的做法。

所以我最开始才会觉得，Hermes 背后应该也有一条类似的自动化学习流水线。只不过看了下代码，貌似并不是那么回事：

#### Hermes 的自进化策略

Hermes 的技能提取没有一行硬编码的自动触发逻辑，它在三个地方写了提示词， **引导 Agent 自己判断要不要把这个经验存下来** ：

这里举个例子，我在日常开发 Agent 的时候，经常遇到某些问题：模型在使用技能（我们已经编排好的技能）的时候，尤其是多次执行的时候，有可能会在同一个地方报错。

我的解决办法是 **把报错行为和成功的经验** 写到模型能看到的一个知识库中，我没让他改技能的原始内容，我主要怕他乱改！！知识库的经验总结之后，我在手动改技能说明...

这个动作是不是“多此一举”，在于你要不要相信 AI，其中知识库类似这种：

```
## 知识库文件
你的知识库文件路径为：\`{knowledge_path}\`
当你需要保存经验、用户偏好、学习到的知识时，请使用 \`file_write\` 工具写入该文件
该文件的内容会在每次对话时自动加载到你的系统提示中。
```

再回归 Hermes，他的三层提示词，分工很清楚：

- 第一层告诉 Agent 什么时候该创建技能。
- 第二层列出了五条创建条件和三条更新条件。
- 第三层在 Agent 使用技能时督促它持续改进，没有硬编码的自动提取逻辑，全靠提示词引导。
![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

于是这里真正的问题和与之前的差异就出现了： **完全依赖 prompt 是否靠谱呢，会不会跑偏？**

这个答案几乎是肯定的：

> 肯定不会每一次都正确，大概率会有跑偏的时候

但这套机制的设计者显然认为： **大模型的指令跟随能力足够强（即便现在不够强，以后肯定能满足），能把什么时候新增技能，什么时候更新技能这件事情识别出来。**

综上，从这里其实也就能说清楚 Hermes 的定位了：

> 做一些稳定性要求不高的任务更合适
> 
> ***因为这东西从架构设计上追求的是更灵活而不是更稳定***

举个实际的例子：你让 Agent 帮你做一期小红书内容运营。

它先搜索当下热门话题，发现某个美妆趋势正在爆发；接着根据这个热点生成配图，再分别写出小红书笔记和公众号长文，排版、标签、封面建议一条龙。

前后调了搜索、图片生成、内容撰写好几个工具，超过 5 次工具调用，满足硬指标， ***完成后它把这套流程提取成技能文件：***

```
---
name:hot-topic-content-creation
description:"热点追踪与多平台内容创作技能"
conditions:
platforms:[macos,linux,windows]
---
# 热点内容创作流程
## 步骤
1.搜索当前平台热门话题/趋势，筛选与自己领域相关的话题
2.分析热点关键词，确定内容切入角度
3.根据话题生成配图（封面图+内文插图）
4.撰写小红书笔记：标题党+口语化正文+话题标签
5.基于同一话题改写为公众号长文：深度分析+观点输出
6.生成发布建议（最佳时间、标签组合、互动话术）
...
```

这个主要是写给Agent看，但是我们也可以随时查看技能详情，也可以自定义修改。人和 Agent 都能查看，下次再遇到类似任务，直接调这个技能，不用从头推理，整体貌似挺不错的。

这里小结下：

> Hermes 具备一个能力，在执行一个复杂任务成功后，他们可以将他沉淀为 skill

至于什么时候 Hermes 会沉淀 skill，这里有个基本倾向策略：

1. **成功完成了一个复杂任务** ，尤其是工具调用较多，比如官方文档的 5+ tool calls 例子。
2. **中途遇到错误或死路** ，但最后找到了可行路径。
3. **用户纠正了它的做法。** 也就是外部反馈明确告诉它：原来的方法不对，新的方法更好。
4. **它识别出了一个 non-trivial workflow，** 也就是可能常用、可复用、多步骤的方法链，这个是适应于 skill 的定义的。

不过我读到这里的时候也产生了一个疑问：如果不断让 Hermes 做事，技能会不会越来越多？多了之后，system prompt 里塞了一堆技能索引，模型还能准确判断该用哪个吗？

从源码看，Hermes 用了渐进式披露， `skills_list` 只返回名称和描述，不会一股脑全塞进去。

个人用户技能数量大概率也就几十个，基本也就覆盖了个人工作，生活的场景，模型还是能够准确识别的。

真正的出问题会在团队使用，当技能累积到几百个的场景，这时候可能需要更智能的技能检索机制，单纯把技能索引塞进 system prompt 里，模型判断就不一定准确、混用、乱用的情况就会出现。

## 记忆系统

在记忆这块，两个项目也有较大的差异：

OpenClaw 把记忆当作一个 `特殊插件` 。也就是说，记忆在它的体系里并不是某种不可替换的核心模块，而是被放进了插件机制中统一管理。

这种做法的好处很明显：实现简洁、边界清晰、 ***可替换性强*** 。

可以说，OpenClaw 就没认为自己的记忆系统一定适应于所有团队，所以做了个最简实现，他要的就是我们用自己的插件去替换，所以 OpenClaw 这块做得就很轻：

他同一时间只激活一个记忆插件，也意味着系统对记忆来源、记忆读写、记忆注入方式都有较强约束，不容易失控。

只不过，可控的另一面就是缺乏灵活性，这也是 OpenClaw 设计的初衷： **他关注记忆这件事怎么接进系统，才不会破坏整体稳定性** 。

至于 **Agent 怎么靠记忆越来越像人** ，这个权限或者能力，平台交给了我们。

Hermes Agent 的话，把记忆分为三个部分

#### 内置记忆

这一块设计得很简单，就两个文件：

- `MEMORY.md` ：更多是 Agent 自己用的，记录一些环境信息、项目里的约定，还有踩过的坑
- `USER.md` ：专门存用户画像，比如偏好、沟通习惯这类东西

这东西本来挺简单，但有个细节需要注意：系统提示词里拿到的记忆，并不是实时的，而是 **会话启动那一刻的一个快照** 。

也就是说：你在当前对话里往 `MEMORY.md` 写了新内容，这些东西确实会立刻落盘，但模型这一轮对话是看不到的。

只有等下一次重新开一个会话，这些新记忆才会被带进系统提示词。

这个设计应该是为更好的利用缓存，降低推理成本，而且这两个东西是不应该总改的，所以有延迟也还好。

另外写入记忆的时候会做一轮安全扫描，比如提示注入、不可见 Unicode 字符这些，一旦命中规则就直接拒绝写入。

两个文件还有容量限制：

- `MEMORY.md` ：2200 字符
- `USER.md` ：1375 字符

超过这个上限，就不能继续写了，这点在实际用的时候需要稍微注意一下，不然很容易写着写着就失败了。这里给个简单案例，大家感受下：

```
# MEMORY
## 环境信息
- 当前主要工作：AI Agent 相关文章写作与分析
- 常用平台：公众号、小红书
- 默认输出语言：中文

## 项目约定
- 写文章时，优先讲清楚架构和设计思路
- 涉及 Agent 时，重点关注 Skills、记忆、工作流
- 不要自动改原始技能文件，先记录经验，再人工确认

## 经验记录
- 做复杂任务时，容易在中间某一步重复报错
- 同样的错误如果连续出现，应该记录下来，避免下次再犯
- 成功经验可以先写进知识库，后面再决定要不要改 Skill
```
```
# USER
## 用户偏好
- 喜欢中文回答
- 喜欢偏工程化、结构清楚的分析
- 不喜欢太空、太虚的表述

## 沟通习惯
- 喜欢先讲结论，再讲原因
- 喜欢文章里有自然的过渡段
- 喜欢用真实场景举例

## 内容风格
- 更关注架构差异，而不只是功能罗列
- 喜欢比较不同系统背后的设计哲学
- 希望内容可以直接拿去改成公众号文章
```

#### 外部记忆

除了本地这套，还有一层是通过 `MemoryProvider` 做的抽象。就是把记忆能力外包出去，现在一共接了八种不同的实现：

```
| 提供商 | 特点 |
|--------|------|
| Honcho | 更偏用户建模，会一点点把用户画像“养”出来 |
| Hindsight | 专注会话记忆，适合做跨会话上下文衔接 |
| Mem0 | 走向量检索这一套，按语义找历史记录 |
| Byterover | 偏代码场景，适合存编程相关上下文 |
| Holographic | 做多维关联的，有点像关系网那种记忆 |
| OpenViking | 一个开源实现，比较偏基础能力 |
| RetainDB | 基于数据库做持久化，思路比较传统 |
| Supermemory | 主打跨平台整合，什么都能往里收 |
```

Hermes 这一块的设计，和 OpenClaw 有一点像： **希望通过一种可插拔的方式，把不同实现接进来。**

至于为什么要这样设计，我们这里举个例子：比如你一开始做的是内容创作 Agent，最需要的是 **记住用户风格和偏好** ，那你可能更偏向接一个擅长用户建模的 provider。

但后来你把这个 Agent 拓展到代码场景，开始帮人修 bug、记项目约定，这时候原来的记忆后端可能就不够用了，你会更想换成一个更适合代码上下文的 provider。

Hermes 官方文档也明确把外部记忆能力区分成用户建模、语义搜索、知识图谱、跨会话记忆等不同方向。

> 从这里大家应该也会有相对直观的感受了，Hermes 这波的用户还是更偏向于 2C/个人/小团队

就现阶段他的记忆和 skill 组织方式，更像在做一个 **陪伴 Agent** ，官方这块也有叙述，当前 Hermes 的特点是更懂你。

可以说这挺聪明的，还是跟当前 Agent 不稳定/灵活的特性有关系，团队协作确实还不合适，所以做得越灵活，个人尤其是小白就越喜欢用，必定他们会感觉到 **似乎比 OpenClaw 更聪明** 。

#### 会话搜索

Hermes 不会在每一轮都把历史对话直接塞进上下文。

而是提供了一个工具 `session_search` 让模型在推理过程中按需去c查询历史，流程如下：

```
先用 FTS5（SQLite 的全文搜索引擎）在历史对话里找匹配的消息，按相关性排序。

然后把匹配到的消息按会话分组，取前几个会话；
每个会话加载完整对话记录，截取匹配点前后约 10 万字符；

最后把这些丢给一个便宜的辅助模型做摘要，返回的是针对搜索关键词的会话摘要，不是原始对话。
```

这里和 OpenClaw 的思路就就不一样。OpenClaw 搜到什么就直接丢给主模型，让模型自己去判断哪些有用。

Hermes 在中间加了一层 LLM，把信息先压缩、过滤一遍，再注入当前上下文。

这么做的好处是上下文更干净，噪音更少；但代价就是多了一次模型调用，以及一点延迟，而且大模型处理的效果，逻辑上会更好，所以孰优孰劣，不好说。

所有这些类似这种设计，都可以在 **算力和质量之间做取舍，更多的循环确认，结果肯定会显得更聪明** 。

然后就是 `MemoryProvider` 这一层其实很关键，它直接嵌进 Agent 推理循环里的，参与的时机非常多：

```
class MemoryProvider(ABC):
    def prefetch(self, query) -> str
    def queue_prefetch(self, query) -> None
    def sync_turn(self, user, assistant)
    def on_turn_start(self, turn_number, message)
    def on_pre_compress(self, messages) -> str
    def on_delegation(self, task, result)
    def on_memory_write(self, action, target, content)
    def on_session_end(self, messages)
```

这里按执行阶段去看，会更清晰一点。

在每一轮开始之前，它可以通过 prefetch 把相关记忆提前捞出来塞进上下文；

如果不想阻塞当前推理，可以走 queue\_prefetch，异步去准备下一轮要用的东西。

到了对话进行中，像 sync\_turn 这种，是在每一轮结束之后，把新的交互同步进去，相当于是持续在喂数据。

还有几个 hook：

1. on\_pre\_compress：在上下文压缩之前，先把关键信息摘出来，避免被压缩算法误伤
2. on\_delegation：子 Agent 执行完任务之后，可以观察学习
3. on\_memory\_write：当有记忆写入时，对外做通知，方便接外部系统

最后到会话结束，还有一个 on\_session\_end，用来做总结沉淀，这一步更像是在做长期记忆整理。

整体看下来，这套设计在 Agent 的整个生命周期里，插了一层 `可编排的记忆系统` 。

什么时候读、什么时候写、什么时候压缩、什么时候总结，全部是可控的。

这也是为什么它能同时对接那么多外部 MemoryProvider，因为接口本身就是围绕“推理过程”设计的，而不是围绕“数据存储”。

最后，我们来个简单的案例做串联：

#### 记忆案例

假如你长期把 Hermes 当成一个 ***内容运营 + 文章写作助理*** 来用。

##### 第一次对话

你对 Hermes 说：

1. 我写文章喜欢先讲架构，再讲细节
2. 我不希望你自动改原始 skill 文件
3. 我现在主要做公众号和小红书内容

这时候，Hermes 可能会把这里面一部分内容写进：

1. ***USER.md：*** 比如喜欢工程化表达、不喜欢太虚
2. ***MEMORY.md：*** 比如当前主要工作是内容运营与文章分析、不要自动改原始 skill 文件

这两类内容属于 **长期稳定、值得反复带入上下文的信息。** 官方文档明确说，USER.md 适合存偏好和沟通方式，MEMORY.md 适合存环境、约定、经验和已完成工作的摘要。

##### 日常对话

接下来几天，你和 Hermes 聊了很多内容，比如：

1. 某篇公众号文章怎么起标题
2. 某次小红书内容怎么选题
3. 某个 skill 在第 3 步总是出错
4. ...

这些对话内容，并不会都塞进 MEMORY.md / USER.md，而是会被放进 **对话数据库** 。

##### 检索取出

某天你开了一个新会话：

```
上周我们不是聊过一个
Agent 自进化和知识库数据飞轮
的比喻吗？帮我找回来
```

这时候 Hermes 当前 system prompt 里，只有会话启动时注入的 MEMORY.md / USER.md 快照。

于是它就会用 session\_search：

1. 先在 SQLite 的 FTS5 索引里，按关键词找相关历史消息。
2. 找到相关会话后，不是把原始长对话一股脑扔进来，而是返回针对这次查询的摘要。
3. 然后主模型基于这个摘要继续回答你；

这里需要特别说下整个检索流程，上述的问题可能会被拆解为以下关键词：

1. Agent 自进化
2. 知识库
3. 数据飞轮
4. 比喻

然后通过 SQLite + FTS5 在历史消息里找包含这些词或相近表达的内容。这里搜出来的结果，可能不是只命中一条消息，而是一坨信息；

而后将这些信息丢给辅助模型做判断，跟问题一起提炼出相关的内容，比如最后返回这样的东西：

```
你们当时讨论的核心比喻是：
AI 知识库的自进化，本质上是把错误案例、边界案例、争议案例回流到知识层；
Agent 的自进化，则是把任务执行中的成功路径、失败模式和可复用 workflow 回流到 Skills 层。
前者沉淀的是答案，后者沉淀的是做事方法。
所以两者都像数据飞轮，只是飞轮驱动的对象不同.
```

##### 更多额外信息

这块有个难点，或者说一个我还没完全搞明白如何使用的点 `MemoryProvider` 。

在上述场景中，长期背景信息以及历史对话理论上都找回了，那如果我有更多的私有化数据该怎么办，比如用户画像、知识图谱等。

这里将问题换一下：

```
你觉得我这段时间反复在关注哪些主题？
```

这种问题，很难靠一次会话检索解决。

因为答案可能分散在很多轮对话里，每一轮都只露出一点点，单条检索命中并不明显，但长期看却已经形成了稳定模式。

这时候，外部 MemoryProvider 的工作是： **把很多次对话里反复出现的信号，整理成一种长期可复用的记忆。**

也就是说： **MemoryProvider 给了 Hermes 一个选择性沉淀的能力** 。外部 provider 会在每轮回复后同步对话，在会话结束时做记忆提取，还会镜像 built-in memory 的写入。

记忆这块就说到这，其实大家可以看出来，还是在自己玩，第三层记忆主要还是在对第二层记忆系统做补足，处理的是那种不能一次性搜出的内容。

但 Agent 真正的难点和复杂度不在这里，真正的难点是 **如何利用外部知识库的课题。**

举个例子我现在用 Hermes 实现的是一套管理 Agent，而我已经有了 40节课 的管理 markdown 文档，那么 Hermes 应该如何有效利用这些数据，这是很困难的。

具体这里不展开...

## 上下文压缩

长对话场景下，上下文窗口迟早会被塞满，压缩是躲不掉的，关于压缩的策略。

两个项目的核心思路其实是一样的，都是用LLM 提取摘要，把关键信息留住，区别在于从哪儿开始压：

OpenClaw 的做法是 从 **最老的对话轮次（也就是头部）** 开始压缩，最近的对话原样保留。

OpenClaw 压缩前会保留快照，原始消息归档到 archive 路径；OpenClaw 还做了一套缓存稳定性措施，比如确定性排序、空格规范化、cache boundary marker。

Hermes 的 `ContextCompressor` （在 `agent/context_compressor.py` 里）则是保护两端、压缩中间：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

具体来说，system prompt + 最初几轮对话（head）和最近约 20K tokens 的对话（tail）都不动，中间的轮次用辅助模型生成结构化摘要。

跨多次压缩时采用迭代摘要，不是从头重写，而是在上一版摘要基础上增删改。摘要的前缀长这样：

```
## 已解决的问题
- [配置问题]: 已通过修改 ~/.hermes/config.yaml 解决
- [依赖缺失]: 已 pip install 缺失包

## 待决问题
- [性能优化]: 当前方案是用缓存，还在评估其他方案
```

两种做法的差异在于：OpenClaw 从头压，Hermes 压中间。OpenClaw 额外保留了完整归档和快照，信息可回溯；

Hermes 的迭代摘要机制更注重跨多次压缩的信息连续性。

需要那种压缩机制，取决于我们的任务场景：高频调用、成本敏感，选 OpenClaw、需要深度推理、信息不能丢，选 Hermes。

我这里没有什么倾向性，但看得出来 Hermes 依旧比较吸引用户，总而言之，他的选择的结果，就是看上去要聪明些...

## 技能系统

两个项目在 `怎么让 Agent 积累任务经验` 这件事上，路径完全不一样。

OpenClaw 的 Skills 是预定义的任务流程描述，由开发者或用户手动编写，Skills 的定位是 `给 Agent 的操作手册` ，告诉 Agent 遇到某类任务该按什么步骤执行。

创建和更新都依赖人工维护，Agent 本身不会主动创建或改写 Skill。

然后值得一提的是： **OpenClaw 的 Skills 库极其丰富** ！

#### Hermes Skills

Hermes 的 Skills 走的是另一个方向 `Agent 自己就能写技能` 。

技能就是 Markdown 文件，放在 `~/.hermes/skills/` 下面，不需要编译、注册、审批。Agent 在推理过程中发现一个复杂问题的解法有价值，就直接写一个 Markdown 文件存下来。

上一节讲的学习闭环，最终沉淀下来的产物就是这些 Skill 文件。

#### 核心差异

| 维度 | OpenClaw | Hermes |
| --- | --- | --- |
| 创建方式 | 人工/开发者编写 | Agent 自动提取 + 人工可编辑 |
| 更新机制 | 人工维护 | Agent 自主判断是否更新 |
| 存储形式 | 结构化定义 | Markdown 文件 |
| 设计出发点 | 标准化、可控 | 自我进化、持续学习 |

简单说：OpenClaw 的 Skills 是 **人教 Agent 怎么做** ，Hermes 的 Skills 是 **Agent 自己总结怎么做** ，一个偏向指令执行，一个偏向经验沉淀。

社区生态方面，Hermes 的 `optional-skills/` 目录下有 40+ 个社区技能包，分 13 个类别，从区块链到 MLOps、安全审计到 Blender 3D 建模。

技能分发平台叫 agentskills.io，走开放标准，OpenClaw 的 Skills 目前主要以官方和团队内部维护为主。

OpenClaw 的人工 Skills 在企业环境里更可控 `Agent 照着标准流程走` 这件事本身就有价值，直接封装企业的工作流。

Hermes 的自动提取技能保存，在个人使用和研究场景下更灵活 `Agent 用得越多，积累的经验越多` 。

还是那个点，OpenClaw 这块肯定更稳定，但对于小白用户来说，他们搞不定那个生态，所以 Hermes 大概率对小白用户更为亲和。

## 执行环境

执行环境这一块，Hermes 给的选择是比较多的，一共支持六种。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

它的思路其实很直接：把执行环境当成一个可g更改的后端能力。

比如 Daytona 这一类，是沙盒 + 生命周期管理，可以通过 stop / resume 来省资源；

Modal 更偏按需启动，通过文件系统快照来保存状态，用的时候拉起来，不用就关掉。

底层实现上，所有执行环境都收敛到一个统一抽象：

```
class BaseEnvironment(ABC):
    def execute(self, command, cwd, env) -> dict
```

如果需要切换执行环境只需要修改配置即可。

对比来看，OpenClaw 在这块的思路就不太一样了，它是安全优先。把整套执行流程包了一层防护：

```
有多层审批机制（像 safe-bin、allowlist、执行审批这一套）
自带一套隔离比较彻底的 Docker 沙箱（甚至包括浏览器环境）
另外还有审计系统，在策略层面做限制
```

执行方式上，它支持：

```
本地
Docker
SSH 远程沙箱
```

整体是一个更偏生产环境的设计。

所以这一块如果简单总结一下，其实就是两种取向：

1. Hermes：环境多、切换轻，适合快速试、灵活用
2. OpenClaw：限制多、边界清，适合需要安全兜底的场景

如果是个人项目或者原型验证，Hermes 会更顺手；但一旦涉及到企业环境，尤其是有安全合规要求的，OpenClaw 这一套会更让人放心一点。

只不过 OpenClaw 当然也远到不了生产环境的要求，这个阶段依旧是 Hermes 吃香。

## 子 Agent

两个项目都支持把任务委派给子 Agent，他们在这块的设计原则是一样的： `父 Agent 只需要结果，怎么干的不重要，上下文窗口本来就不够用，不该被细节塞满。`

OpenClaw 用的是 ACP（Agent Client Protocol），有专门的服务端和客户端实现，偏标准化。 `sessions_spawn` 工具默认在 HTTP 端口上被拒绝，需要显式启用，对委派操作的态度比较谨慎。

Hermes 把委派做成了一个内置工具（Delegate Tool），更直接：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

几个设计要点：

```
子 Agent 是全新会话，不继承父 Agent 的历史对话
工具黑名单：子 Agent 不能用 \`delegate_task\`（防递归）、\`clarify\`（不能跟用户交互）、\`memory\`（不能写共享记忆）、\`send_message\`（不能产生跨平台副作用）、\`execute_code\`（应逐步推理而非写脚本执行）
最大深度 2 层，每子 Agent 最多 50 次迭代
父 Agent 只看到摘要，不看完整推理过程
```

严格来说，整个多系统这东西依旧不成熟，所以两个 Agent 系统都做得偏弱，或者说确实也用不着做得太深，当前把 单Agent 玩明白就很不错了。

## 安全

安全这块，两个项目的差距挺大的， **是所有模块里面差距较大的一个** ：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

OpenClaw 原则是 `默认安全，高权限需显式声明` 。有专门的 `SECURITY.md` 和漏洞响应流程，安全测试覆盖很全。

Hermes 走的是另一条路 `智能审批` ，同时也有危险命令检测，如rm -rf、sudo、chmod 这些。

但是它在设计上多了一个机制：用便宜的辅助模型来判断命令风险级别，低风险自动通过，高风险才需要用户确认。

```
# 简化的智能审批逻辑
def smart_approve(command) -> bool:
    risk_level = cheap_model.evaluate(command)
    if risk_level == "low":
        return True   # 自动通过
    else:
        return ask_user(command)  # 需用户确认
```

Hermes Agent 在使用用辅助模型做风险判断这件事，本身就引入了一个新的信任问题，辅助模型如果判断不准怎么办，源码里我没看到针对 辅助模型判断的检查，这里就引入了一个安全问题。

此外还有上下文注入防护，检测提示注入、不可见 Unicode 字符、凭证外泄等攻击模式...

## 国内生态

Hermes 在中国生态上优势挺大。

消息平台方面，飞书、钉钉、企业微信都有对应的 Gateway 插件（ `gateway/platforms/` 下的 `feishu.py` 、 `dingtalk.py` 、 `wecom.py` ），开箱即用。

个人微信的接入值得单独说，Hermes 通过腾讯官方的 iLink Bot API（ `weixin.py` ）实现了微信个人号机器人，不需要逆向协议或第三方框架：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这套 API 支持收发文本、图片、语音、视频、文件，还能发"正在输入"状态。从 `APP_ID = "bot"` 和端点路径来看，应该是腾讯面向开发者提供的 Bot 接入能力，走的是官方正规通道。

OpenClaw 通过扩展插件支持飞书和 QQ 机器人（ `extensions/feishu/` 、 `extensions/qqbot/` ），但缺钉钉、企业微信和个人微信的原生支持。

模型方面，Hermes 通过 models.dev 集成了 4000+ 模型的元数据，包括智谱、月之暗面、MiniMax。 `hermes model` 一行命令切换模型。

还有个离线快照机制，先从打包数据加载，再从磁盘缓存读，最后才从网络拉取，网络不好也不影响使用。

OpenClaw 走的是 Provider Plugin 路线，每个提供商一个插件，支持 Auth Profile 轮换和 Failover，集成深度不错，广度不如 Hermes。

## 研究能力

Hermes 除了做产品，同时也是研究工具。

项目根目录下有 `rl_cli.py` 、 `batch_runner.py` 、 `trajectory_compressor.py` ，一套完整的 RL 训练工具链。

```
研究工具链：
Atropos RL 框架集成
  ├── 批量轨迹生成（给模型训练造数据）
  ├── 轨迹压缩（优化训练效率）
  └── SWE 基准测试环境

配套的 RL 工具集（10 个专用工具）：
  rl_list_environments    列出可用环境
  rl_select_environment   选择训练环境
  rl_start_training       开始训练
  rl_check_status         查看训练状态
  rl_get_results          获取训练结果
  ...
```

Hermes 的想法是 `训练下一代工具调用模型` 用自己跑任务产生的轨迹数据去训练更强的模型，再用更强的模型跑更好的任务。

OpenClaw 在这一点上立场很明确，它就是产品，不涉及训练。

## 如何选择

聊了这么多，说说我的看法。

OpenClaw 的优势是安全、稳定、渠道多。TypeScript 生态对前端和全栈友好，macOS Menu Bar App 和 iOS/Android 原生客户端也加分。安全合规要求高的，可以选它。

Hermes 的优势在自我进化。安全审计、测试覆盖确实不如 OpenClaw，但技能自动提取 + 三层记忆的这套机制，对做 AI 研究的团队、需要频繁切换模型、或者想用 Python 快速做实验的开发者更有吸引力。

简单总结下选型思路：

```
安全合规是硬要求，选 OpenClaw
想让 Agent 自己学习改进，选 Hermes
消息平台要覆盖最广的，OpenClaw 支持 25+ 渠道（含飞书和 QQ 机器人扩展）
但如果主力用飞书、钉钉、企业微信，Hermes 三者都有 Gateway 原生支持，开箱即用
做 RL 训练研究，只有 Hermes 有这套工具链
想低成本 24 小时跑着，Hermes 的无服务器后端更合适
TypeScript 技术栈选 OpenClaw，Python 选 Hermes
```

这里面还有个小细节：Hermes 已经提供了 `hermes claw migrate` 命令，支持从 OpenClaw 一键迁移配置。

两个项目不是非此即彼。

最后我们说一句私话： ***从整体设计来说，Hermes 是非常迎合小白用户的，而 OpenClaw 想要做生产级别的平台，显然现在各方面环境还不合适*** ，现阶段用 OpenClaw/Hermes 的场景依旧是偏玩耍。

基于此，Hermes 可能会好点，但做工程研究还是要看 OpenClaw。

说实话，我是越研究， **越觉得 Hermes 这个框架是真鸡贼** ！

**点击上方卡片关注叶小钗公众号，查看下方二维码，添加我个人微信：**

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

#### 往期推荐

[《系统性：如何进入AI行业？》](https://mp.weixin.qq.com/s?__biz=Mzg2MzcyODQ5MQ==&mid=2247500057&idx=1&sn=27826d0673deb3f8adf3f969540b6401&scene=21#wechat_redirect)

[《实践：用LangChain开发一个Agent》](https://mp.weixin.qq.com/s?__biz=Mzg2MzcyODQ5MQ==&mid=2247500179&idx=1&sn=9d5a3df0bb1d2064f0b708d0558c7aa4&scene=21#wechat_redirect)

---

[《万字：AI Coding 的真实情况》](https://mp.weixin.qq.com/s?__biz=Mzg2MzcyODQ5MQ==&mid=2247499378&idx=1&sn=37c5873c8dbf39a22f27794bbfc00065&scene=21#wechat_redirect)

[《AI Coding 实战：10年祖传系统，54万行代码，2周重构结束》](https://mp.weixin.qq.com/s?__biz=Mzg2MzcyODQ5MQ==&mid=2247499672&idx=1&sn=b7390fc0bb44bda67f9924d676d6853c&scene=21#wechat_redirect)

[《AI Coding 实战：2周重构54万行代码，细节详解》](https://mp.weixin.qq.com/s?__biz=Mzg2MzcyODQ5MQ==&mid=2247500076&idx=1&sn=f95caf1f2f5dbe5c6cddfdd58a95a5e2&scene=21#wechat_redirect)

---

[《万字：个人IP，包教包会》](https://mp.weixin.qq.com/s?__biz=Mzg2MzcyODQ5MQ==&mid=2247496320&idx=1&sn=a372de0f30bf54a0cd76976961e5138b&scene=21#wechat_redirect)

[《万字：AI客服实战方法论》](https://mp.weixin.qq.com/s?__biz=Mzg2MzcyODQ5MQ==&mid=2247498987&idx=1&sn=5e3c5dc641b9eb94734ee27af0ad3381&scene=21#wechat_redirect)

[《万字：生产级别的RAG系统》](https://mp.weixin.qq.com/s?__biz=Mzg2MzcyODQ5MQ==&mid=2247496384&idx=1&sn=35f385ecb8ab7327f1b7bb450ce1020c&scene=21#wechat_redirect)

[《万字：RAG实战技巧，包教包会》](https://mp.weixin.qq.com/s?__biz=Mzg2MzcyODQ5MQ==&mid=2247497766&idx=1&sn=8d0f38328dcda7b3455146e5ce43bc26&scene=21#wechat_redirect)

---

[《OpenClaw 会不会淘汰 Coze、Dify 这类平台？》](https://mp.weixin.qq.com/s?__biz=Mzg2MzcyODQ5MQ==&mid=2247499385&idx=1&sn=d29ddecd0b73840842deef1df0f118dd&scene=21#wechat_redirect)

[《别被 OpenClaw 带偏了，AI 公司到底该如何组织人才？》](https://mp.weixin.qq.com/s?__biz=Mzg2MzcyODQ5MQ==&mid=2247498929&idx=1&sn=60207051e94120546c2e2f22af6d82d8&scene=21#wechat_redirect)

**微信扫一扫赞赏作者**

继续滑动看下一个

叶小钗

向上滑动看下一个