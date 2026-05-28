Al4ALL *2026年5月1日 21:05*

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/CT8qWWQqv09XuNUSw1jeqibgauRj9IicwEsrUSnticScwbBTEaAxBQjjkXB0WPMEfeL2c7LibuXfssHgRMglPwBntJupRe452ggZMCCJ8eTCOsY/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

很多人用 Codex，第一反应还是“让它帮我写代码”。

这当然没错，但太窄了。

更好的用法是把 Codex 当成一个本地 AI 工作台：它能读写文件，跑项目，打开浏览器，操作电脑，生成文档，做表格，搭网站，写 App，接数据库，做动效短片，还能把重复任务做成自动化。

我觉得真正值得学的不是某个功能按钮，而是这套工作方式：

1. 先给 Agent 一个明确的项目目录。
2. 把大任务拆成几个 chat。
3. 每个 chat 只负责一个具体产物。
4. 用文件、截图、预览和反馈持续推进。
5. 重复流程做成 skill。
6. 周期任务做成 automation。

下面直接展开。

## 1\. 先建项目目录，再开始聊天

用 Codex 做正经事，第一步不是输入 prompt，而是选一个本地目录。

这个目录会变成项目的工作现场。Agent 生成的文档、表格、代码、图片、动效工程、App 文件，都会放在这里。后面继续开 chat，也能引用这些文件。

我建议按项目拆开：

```text
Projects/
  codex-research/
  my-new-business/
  launch-demo/
  app-prototype/
```

不要把所有任务都塞进一个大杂烩文件夹。项目一多，迟早找不到东西。

一个正常的 Codex 项目目录，大概会长这样：

- 几个 chat 负责不同任务。
- 一个 `plan.md` 管总进度。
- 一个 `outputs` 文件夹放结果。
- 表格、PPT、Word、Markdown 等文档。
- 网站或 App 代码。
- 数据库脚本、素材、导出文件。

聊天只是入口。真正的资产在文件夹里。

## 2\. 不要等一个 Agent 干完，开多个 chat 并行跑

Agent 任务会越来越长。稍微复杂一点的工作，跑十几分钟甚至一两个小时都正常。

如果你盯着一个 chat 等它结束，就还是旧工作方式。

更好的做法是拆开：

```text
Chat A：做资料研究
Chat B：整理成 Excel
Chat C：写 Landing Page
Chat D：做 iOS App
Chat E：做发布短片
Chat F：做投资人 Deck
Chat G：做 X 内容自动化
```

你负责调度，Agent 负责执行。

这时候 prompt 就不是“聊天内容”，而是一张工单。写 prompt 时要交代清楚：

- 目标是什么。
- 输入材料在哪。
- 输出成什么文件。
- 风格和约束是什么。
- 怎么判断做完。

发出去以后，切到下一个任务。别干等。

## 3\. 研究、文档、表格，是最适合的第一类任务

Codex 很适合做研究型工作。

比如你可以让它：

1. 搜索某个产品的新功能。
2. 对比官网、博客、社区反馈和 X 讨论。
3. 把结果整理成表格。
4. 生成 Markdown 报告。
5. 再把报告改成公众号、PPT 或内部简报。

关键点是：不要只让它在聊天框里回答。

要让它产出真实文件。

例如：

```text
请把调研结果整理成 xlsx，包含：
- 功能名称
- 用户反馈
- 参考链接
- 影响判断
- 我们可以借鉴的点
```

然后在预览里打开表格，继续改：

```text
删除 source page 这一列。
把影响判断改成高/中/低。
再加一列：可执行动作。
```

这类任务最适合先练手，因为反馈快、风险低、价值直接。

## 4\. 预览窗口不是展示区，是验收区

Codex 的预览要经常用。

让 Agent 做完东西以后，直接看结果：

- 表格列对不对。
- 文档结构顺不顺。
- 网页能不能点。
- App 跑不跑得起来。
- 动效节奏有没有问题。
- 文件有没有真的写到项目目录。

看到问题，不要说“优化一下”。这句话太空。

要具体到能执行：

```text
顶部标题滚动时不要跟着内容移动。
按钮重叠了，把 CTA 下移。
表格里 source page 这一列删掉。
这个页面要和 iOS App 的白底风格一致。
第 2 秒 20 帧这里，鼠标点击位置偏右。
```

Agent 不怕任务复杂，怕反馈含糊。

## 5\. 重复三次的流程，做成 skill

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Skill 可以理解成一套可复用流程。

如果你经常做同一件事，就不要每次重新写 prompt。直接封装成 skill。

比如内容团队常见流程：

- 抓取 YouTube transcript。
- 总结某个频道最近 10 条内容。
- 分析哪些选题表现好。
- 拆解开头 hook。
- 生成 Word 报告。
- 输出公众号改写版。

这种流程很适合做成一个 `YouTube Researcher` 之类的 skill。

大致步骤：

1. 先让 Codex 调研可用 API。
2. 选一个稳定服务，比如 Supadata。
3. 准备 API key。
4. 用 skill creator 生成 skill。
5. 新开 chat 测试。
6. 稳定后再接 automation。

能封装的东西很多：

- 竞品分析。
- 会议纪要。
- 公众号改写。
- 周报生成。
- 投放素材生成。
- X 帖子草稿。
- PRD 模板。
- 用户访谈总结。

判断标准很简单：一件事你重复做了三次，就值得封装。

## 6\. Plugin 和 MCP 的本质：让 Agent 进入别的系统

Plugin、Skill、MCP 这些名字容易让人晕。

不用纠结定义。实际工作里只看一件事：它能不能让 Agent 进入某个工具干活。

几个典型例子：

- Google Calendar：读取日程。
- Gmail：发送邮件。
- Figma：检查或修改设计文件。
- Supabase：建表、写数据、接认证。
- Remotion：生成代码化动效。
- Typefully：创建 X 草稿。

工具连接越多，Agent 能跑的闭环越长。

一开始你可能只是让它写一段文字。接上外部工具后，它可以直接完成一串动作：

```text
读取日历 -> 生成周报 -> 发到邮箱 -> 每周五自动运行
```

这才是 Agent 比聊天机器人更有用的地方。

## 7\. Automation：不要只让它做一次，要让它以后自动做

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

最省时间的不是“让 AI 帮我做一次”，而是让它以后按节奏自动做。

适合自动化的任务：

- 每周日程总结。
- 每月内容复盘。
- 每天生成社媒草稿。
- 每周竞品监控。
- 每天整理销售线索。
- 每周产品数据报告。
- 每月财务摘要。

一个 automation 至少要写清楚：

```text
什么时候运行？
用哪些数据？
输出什么格式？
发到哪里？
是否需要人工确认？
失败了怎么处理？
```

我更建议先做“草稿型自动化”。

比如每天早上生成 3 条 X 草稿，而不是直接发出去。这样既省时间，又不会把账号交给机器裸奔。

## 8\. 做产品前，先写 plan.md

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

做复杂项目时，先建一个 `plan.md` 。

别急着写代码。

一个最小计划文档可以这样写：

```markdown
# Project Plan

## Goal
做一个什么产品？

## Outputs
- [ ] iOS App
- [ ] Landing Page
- [ ] Database
- [ ] Launch Demo
- [ ] Deck
- [ ] Automation

## Current Status
- Mobile App: in progress
- Web App: waiting
- Launch Demo: draft
```

这个文件的作用不是装样子。

当你同时开多个 chat 时，它就是总控台。哪个任务完成了，哪个卡住了，下一步该做什么，都写在这里。

每完成一项，让 Codex 更新计划。

复杂项目最怕的不是难，是乱。

## 9\. App 开发：先跑 Hello World

做 App 时，别一上来就要求完整产品。

更稳的顺序是：

1. 创建项目。
2. 跑一个 Hello World。
3. 打开 Xcode 或模拟器。
4. 确认工程能跑。
5. 接入基础页面。
6. 接设计稿。
7. 接数据库。
8. 接登录。
9. 真机测试。
10. 准备 TestFlight。

这条顺序很土，但有效。

工程先跑起来，后面才有讨论空间。否则你会在“漂亮但跑不起来”的幻觉里浪费很多时间。

给 Agent 派任务时，也按这个粒度拆：

```text
第一步：创建 Swift 项目，只显示 Hello World。
第二步：加底部导航和四个空页面。
第三步：接入设计稿。
第四步：接 Supabase 数据。
第五步：接邮箱登录。
第六步：准备 TestFlight。
```

每一步都能验收，才好继续。

## 10\. 设计反馈要具体，别只说“高级一点”

Agent 做设计，经常会差最后一口气。

这时候不要用玄学词：

```text
更高级
更现代
更有质感
更像大厂
```

这些词对 Agent 不够有用。

换成具体反馈：

```text
标题固定在顶部，不要随内容滚动。
列表滑到底部时，内容不要压到底部 tab。
滚动到顶部和底部时加一点 fade。
按钮有重叠，把 CTA 下移 24px。
页面保持白底，字体和 App 一致。
```

截图也很重要。

你可以直接圈出问题，告诉它“这里重叠”“这里太靠上”“这里点击位置偏了”。比写一大段审美描述有效得多。

## 11\. Landing Page 先收邮箱，别做成作品集

早期 Landing Page 的目标通常只有一个：收集潜在用户。

够用的结构：

- 产品名。
- 一句说明。
- 两三个价值点。
- 邮箱表单。
- 一个 CTA。

表单可以直接用 Tally。

流程：

1. 创建 waitlist form。
2. 保留姓名和邮箱。
3. 发布表单。
4. 复制 embed code。
5. 放进 React Landing Page。
6. 部署到 Vercel。
7. 真实提交一次，确认后台能收到。

不要一开始就做复杂官网。

先验证有没有人愿意留下邮箱。

## 12\. 内容型 App 不要把数据写死

如果你做的是内容型 App，比如课程库、工具库、技能库、平台目录，就不要把内容硬编码在 App 里。

后面会痛苦。

更好的方式是接数据库。

Supabase 是一个现实选择：Postgres、认证、API、后台都比较顺手，也适合让 Agent 通过 MCP 或脚本继续维护数据。

适合放进数据库的内容：

- 平台列表。
- 平台介绍。
- 技能库。
- 学习课程。
- 用户收藏。
- 用户资料。

重点不是非得用 Supabase。

重点是：内容要可运营。

如果你希望以后继续让 Agent 帮你添加、修改、整理内容，就别把内容锁死在代码里。

## 13\. 登录方案先选最简单的

认证最容易把 MVP 拖死。

Google OAuth、Apple 登录、Clerk、Supabase Auth，都可以。但第一版别贪。

最简单的路径通常是邮箱密码。

先跑通：

1. 注册。
2. 登录。
3. 显示当前用户。
4. 保存用户数据。
5. 退出再登录，数据还在。

这些走通以后，再考虑 Google 或 Apple。

产品早期，闭环比优雅重要。

## 14\. 发布短片：先做可运行草稿

Remotion 这类代码化动效工具，很适合交给 Agent。

正确顺序：

1. 先做一个能跑的草稿。
2. 放一个 App mockup。
3. 展示几个关键页面。
4. 本地预览。
5. 再调节奏、转场、字体、音乐。

反馈方式要像改代码一样具体：

```text
第 2 秒 20 帧这里，鼠标点击位置偏右。
这个 fade 太慢，改成更快的 cut。
技能卡片转得太快，看不清。
这里不要出现 Welcome to Chorus。
最后改成复制 skill 到 Codex 输入框。
```

动效类任务尤其需要截图、时间点和坐标。

“做得更好看”没有用。“第 4 秒这里切太慢，改成 8 帧内完成”才有用。

## 15\. Fork：别浪费已有上下文

当一个 chat 已经聊了很久，里面有产品定位、代码结构、视觉风格、文件路径，就不要重新开空白 chat。

直接 fork。

适合 fork 的情况：

- 从 App 开发分叉去做投资人 Deck。
- 从设计稿分叉去做 Landing Page。
- 从研究报告分叉去写公众号文章。
- 从产品计划分叉去做发布脚本。

Fork 的好处是新任务继承旧上下文。

你不用从头解释“我们在做什么”“风格是什么”“文件在哪”。少很多重复解释，也少很多错。

## 16\. 部署后一定要真实走一遍

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Agent 说 done，不算 done。

你自己跑完一遍，才算。

Web App 的检查：

- 页面能打开吗？
- 移动端正常吗？
- 表单能提交吗？
- 后台能收到数据吗？
- CTA 能点击吗？

App 的检查：

- 能在模拟器跑吗？
- 能在真机跑吗？
- 注册登录能走通吗？
- 收藏后刷新还在吗？
- 数据库里能看到记录吗？

自动化的检查：

- 能手动运行吗？
- 结果发到正确位置了吗？
- 生成的是草稿还是直接发布？
- 出错时有没有提示？

别相信完成状态。相信验证结果。

## 17\. 社媒自动化先做草稿，不要直接发

用 Typefully 这类工具，可以让 Agent 生成 X 草稿。

比较稳的做法：

1. 创建 Typefully skill。
2. 测试能不能生成草稿。
3. 让 Agent 每天早上生成 3 条。
4. 人工挑选和修改。
5. 再排程发布。

不要一开始就全自动发布。

社媒内容有语气、事实、品牌风险。Agent 可以帮你起草，但最后最好有人看一眼。

自动化不是放弃控制，而是把重复劳动往前推。

## 18\. 一套完整工作流可以产出什么

用这套方法，一个小产品可以同时推进这些东西：

- iOS App。
- 移动端设计。
- 数据库。
- 用户认证。
- TestFlight 构建。
- Landing Page。
- Waitlist 表单。
- Vercel 部署。
- 投资人 Deck。
- 发布短片。
- 研究型 skill。
- 发帖型 skill。
- 周报自动化。
- 月报自动化。
- 社媒草稿自动化。

每个产物第一版都不一定完美。

但重点是它们真的出来了，而且彼此连接。

这就是 AI 工作台和普通聊天机器人的差别。

## 19\. 我会照抄的 10 条规则

第一，任何项目先建文件夹。

第二，复杂任务先写 `plan.md` 。

第三，一个 chat 只负责一个主要产物。

第四，Agent 工作时不要干等，切到下一个任务。

第五，输出必须落成文件。

第六，重复三次的流程做成 skill。

第七，固定周期的任务做成 automation。

第八，设计反馈用截图、时间点、坐标和具体元素。

第九，App 开发先 Hello World，再接设计、数据库、认证和部署。

第十，所有“完成”都要自己走一遍。

## 20\. 从哪里开始练

别一上来就做大项目。

先做三个小练习。

### 练习一：研究报告自动化

目标：

- 每周收集一个领域的新消息。
- 输出 Markdown 或 Word 报告。
- 附参考链接和摘要。

练到：

- Web research。
- 文档生成。
- Automation。

### 练习二：内容生产流水线

目标：

- 输入一个主题。
- 生成公众号大纲。
- 生成文章初稿。
- 改成 X、小红书、短内容脚本。

练到：

- Skill。
- 多文件输出。
- 多平台改写。

### 练习三：小产品 Demo

目标：

- 做一个 Landing Page。
- 接一个表单。
- 部署到 Vercel。
- 测试真实提交。

练到：

- 前端生成。
- 预览调试。
- 部署验收。

这三个做完，再去碰 App、数据库、动效短片和复杂自动化，会顺很多。

## 最后

Codex 不只是写代码。

它更像一个能落地文件、连接工具、驱动多个任务的工作台。

真正的门槛也不只是 prompt。更重要的是拆任务、管上下文、设计验收标准，以及知道什么时候该封装成 skill，什么时候该做成 automation。

工具会越来越强。

工作流才是你自己的东西。

**微信扫一扫赞赏作者**

智能体 · 目录

作者提示: 个人观点，仅供参考

继续滑动看下一个

AI Prime

向上滑动看下一个