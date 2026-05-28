邵猛 *2026年5月1日 09:30*

100 分钟 Codex 完整教程

来自 AI 开发者、VibeCode Dev 联合创始人 Riley Brown 100 分钟的视频教程，不仅仅是一支单纯的"工具教程"。Riley Brown 真正想传递的核心论点是： **Codex 已经从一个"AI 编程助手"演化成了一个统一的、通用型 AI Agent 操作平台** 。在他看来，它和 Claude Code 处于同一代次，但因为整合度更高、UI 更友好、与 OpenAI 模型（GPT-5.5、计算机使用 computer-use 等）深度耦合，所以更适合作为日常生产力的"超级应用"。

> Codex Full Course 2026: The NEW Best AI Coding Tool
> 
> https://www.youtube.com/watch?v=KXIdYEdOPys <sup>[1]</sup>

下面咱们把视频拆解为四个层次： **产品定位 → 核心机制 → 实战工作流 → 方法论与启示** 。

---

## 产品定位：Codex 是一个"AI 操作系统"，不是 IDE

Riley 反复强调一个判断：

> "Codex is the only unified all-purpose AI agent tool — coding, co-work, browser, computer use, all in one interface."

这句话的潜台词是：过去我们把 AI 工具按场景切成几类——

- 编程类：Cursor、Claude Code
- 文档类：ChatGPT、Notion AI
- 设计类：Figma、Paper
- 自动化类：Zapier、Make
- 浏览器类：Browser Use、Computer Use

而 Codex 桌面应用试图把这些 **收敛到一个聊天界面 + 一个文件夹（项目根目录）** ：你跟它说话，它在你电脑里读写文件、调外部 API、操控浏览器、生成图片、构建视频、发布社交媒体。Riley 把它视为「下一代生产力 super app」。

这个判断的争议性在于：它依赖的是模型能力曲线持续陡峭上升（GPT-5.5 已经能稳定跑 1–2 小时长任务），以及生态侧 plugin/MCP 数量的快速堆积。如果这两个变量任一停滞，"超级应用"叙事就会回退到"高级 IDE"。但视频里 Riley 用一个晚上 6 个并行项目的演示，说明 **今天这个叙事在工程上已经站得住** 。

---

## 核心机制：四个必须理解的概念

视频的 Part 1 本质上是在教你掌握 Codex 的"心智模型"。我把它压缩成四个支柱：

### 1\. Project = 文件夹

每个项目对应你电脑里的一个真实目录。Agent 在这个目录里读写文件，生成的产物（xlsx、md、png、Swift 工程……）都落到这里。 **项目不是 Codex 私有的数据库，而是文件系统的视图** 。这意味着：

- 你可以用 Finder、Git、其他编辑器照常操作；
- 跨 chat 通过 `@文件名` 互相引用；
- 删除项目只是从侧边栏移除，文件本身不会丢。

这是 Codex 比传统 SaaS 更"可信"的地方——所有产物都在你硬盘里。

### 2\. Chats vs. Steering vs. Queueing

每个 chat 是一次独立任务。Codex 的差异化在于支持 **steering（即时插入指令）** ：当 Agent 正在跑一个长任务，你不必等它结束再追加；普通输入会被排队（queue），点 "steer" 则会在它下一个工具调用结束时立刻插入。

这一点对多任务场景很关键——它把"人类与 Agent 的交互"从同步对话改成了 **异步纠偏** 。

### 3\. Skills vs. Plugins vs. MCP

这是大多数新用户混淆的概念，Riley 的拆法清晰：

| 概念 | 本质 | 例子 |
| --- | --- | --- |
| **Plugin** | 官方/第三方预装的能力扩展 | Figma、Google Calendar、Gmail、Remotion、Vercel |
| **Skill** | 用户可定义的 **可复用工作流配方** （一组 prompt + API + 文件模板） | 自建的 YouTube Researcher、Mobile Design、Excalidraw |
| **MCP** | 底层协议层，外部服务以 MCP 接入 | Supabase MCP、Paper MCP |

关键洞察： **当一个工具没有官方 plugin 时，你可以让 Codex 自己读取它的 API 文档，生成一个 Skill 来包装它** 。Riley 现场演示了用 Supadata API 创建 "YouTube Researcher" skill 的全过程——从查 API 到生成 skill 到调用，全在 chat 里完成，不写一行代码。这是 Codex 真正"超级"的地方： **用户可以靠自然语言扩展 Agent 的能力边界** 。

### 4\. Automations

任何 chat 都可以一句话变成定时任务（"Make this a weekly automation, every Friday at 4pm"）。它实际上是把 prompt + skill 组合保存为 cron。视频里他设置了：

- 每周五 4 点的日历总结；
- 每月最后一天的 YouTube 频道分析报告；
- 每天早晨自动起草 3 条 X 推文（通过 Typefully API）。

这意味着 **Skill + Automation 是个人级的 RPA** ——你不再需要 Zapier。

---

## Part 2 实战：六个项目并行的工作流

Part 2 是整个视频的灵魂。Riley 用一个虚构（但已真实部署）的产品 **Chorus** （一个学习 AI Agent 的 iOS 应用），同时跑 6 条产线：

1. **iOS App 设计稿** （自建 Mobile Design skill，从 Claude.ai/design 反向工程而来）
2. **iOS App 本体** （Swift + Xcode + 真机调试 + TestFlight 上架）
3. **落地页** （React + Tally 表单 + Vercel 部署）
4. **投资人 Deck** （Codex 生成 → Claude Opus 4.7 精修 → 导出 Canva）
5. **发布视频** （Remotion plugin，时间线编辑 + 加配乐）
6. **X 自动发帖** （Typefully API + 自建 skill + Automation）

这套演示传递的信号比单个功能更重要——

### 信号 1：模型分工已经开始

Riley 明确说： **Codex 适合工程编排，Claude（Opus 4.7）在"设计审美"上更强** 。所以他在 Codex 内置终端里直接 `claude --dangerously-skip-permissions` 跑 Claude Code，处理落地页和 Deck 的视觉细化。这是一个值得记住的实践模式：

> **把 Codex 当 orchestrator，把 Claude Code 当 subagent，按任务气质分配模型。**

### 信号 2：多任务的本质是"序列化 prompt"

他自己纠正了"multitask"这个词，说更准确的描述是 **"serializing"** ：

> "Each prompt that you type in is the task. Once you press enter, check out of that task and move to a new one."

人类的工作不是同时盯 6 个屏幕，而是把高质量 prompt 一个个发出去，然后 **信任 Agent 独立完成 5–15 分钟的工作** ，期间转去发起下一个任务。这种工作节奏要求两件事：

1. **写 prompt 的密度要高** ——一次性给足上下文，避免来回打补丁；
2. **学会"放手"** ——不要焦虑地盯进度条，而是按蓝点提示回来 review。

### 信号 3：fork chat = 分支思维

他在 mobile app chat 完成后右键 "fork into local"，新分支继承了所有上下文，直接开始做 investor deck（"参考 app 的视觉风格"）。这等价于 **Git 的 branch 应用到对话状态** ——上下文不浪费，分叉不污染主线。

### 信号 4：Computer Use + Plugin = 真实世界的手脚

Figma plugin 演示：他让 Agent 创建 hello world 文本，然后画出新球鞋公司 NoSho 的落地页设计稿（包括用内置图像生成产出无背景的鞋子图）。 **Agent 不是在调 API 操作 Figma，而是在真实操控你打开的 Figma 应用** 。这是 OpenAI 把 "computer use" 默默嵌入日常工具链的方式——你以为是 plugin，其实是计算机使用。

---

## 方法论与启示

剥开具体操作，这个视频背后有几个值得长期记住的判断：

**1\. Agent 工作时长是新摩尔定律。** Riley 反复说："agents are working for longer and longer——up to 1 or 2 hours per task." 一旦单任务时长超过 30 分钟， **协作模式必须从"对话"变成"委派 + 异步"** 。多窗口、命名 chat、pin 重要 chat、用 plan.md 做 checklist——这些组织技巧会变成核心竞争力。

**2\. 通用模型 + 自定义 skill > 专用工具。** 当你能让 Agent 在 5 分钟内为你包装出一个 Typefully、Supadata、Paper 的 skill，那么"是否有现成 SaaS"就不再是关键。 **API 可达 + Agent 能写 = 你想要的工具就存在。** 这是对所有"轻量 SaaS"的降维打击，也是 Riley 说"未来公司会抢着进 plugin 列表"的原因。

**3\. 设计 vs. 工程的能力差距还在。** Codex 在工程上扎实（Swift、Supabase、Vercel 部署、TestFlight 一条龙），但视觉设计仍然平庸——所以他用 Claude Opus 4.7 补刀。 **当前阶段，跨模型协作不是奢侈，是必须** 。

**4\. "白嫖 + 拼装"是新的开发哲学。** 整个 Chorus 应用的栈：Supabase（数据库）+ Tally（表单）+ Vercel（部署）+ Typefully（社媒）+ Remotion（视频）+ Canva（演示）+ Xcode（iOS）。 **没有一行真正"原创"的基础设施** ，但通过 Agent 把它们拼起来，几小时内拿到了一个能上 TestFlight 的产品 + 投资人 Deck + 推广视频。这是单人创业者（solopreneur）能力上限的一次跃迁示范。

**5\. "学不会"已经不是借口。** 他多次现场说"我也没用过 Supabase / Remotion / Typefully API"——然后让 Agent 边教边做。学习曲线被 Agent 抹平后， **人的核心能力变成了"提出值得做的事"+ "判断结果是否够好"** ，而不是"会不会用某个工具"。

## 相关视频推荐

[30 分钟掌握 Codex 95% 的能力？！不相信？一起学习：七大核心能力 + 一个彩蛋功能！](https://mp.weixin.qq.com/s?__biz=MzkwNDExODE4Nw==&mid=2247496887&idx=1&sn=2d6a668019604b39a9a5c024deb97361&scene=21#wechat_redirect)

[从 Claude Code 忠实用户到被说服切换到 Codex：一场 64 分钟的 OpenAI Codex 大师课](https://mp.weixin.qq.com/s?__biz=MzkwNDExODE4Nw==&mid=2247496882&idx=1&sn=3809729da1b43cfbf4791a3321715587&scene=21#wechat_redirect)

[Claude Code 架构深度解读：Agent 系统的真正护城河不在模型，而在 Harness](https://mp.weixin.qq.com/s?__biz=MzkwNDExODE4Nw==&mid=2247496868&idx=1&sn=ba5b5c4640b6db1d80646ff467ae9afa&scene=21#wechat_redirect)

[怎么写好 Skill ？OpenAI、Anthropic 与 Sentry 的 Skill-Creator 对比结合：从快速原型到工程化工作流持续迭代](https://mp.weixin.qq.com/s?__biz=MzkwNDExODE4Nw==&mid=2247496794&idx=1&sn=f5c759b152eb0cdcf1f0fa44c5ce6787&scene=21#wechat_redirect)

**微信扫一扫赞赏作者**

OpenAI Codex · 目录

作者提示: 内容由AI生成

继续滑动看下一个

AI 启蒙小伙伴

向上滑动看下一个