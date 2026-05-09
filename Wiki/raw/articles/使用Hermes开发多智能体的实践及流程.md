Dr.Xiang *2026年5月5日 01:01*

五一假期，终于把心心念念了很久的 Hermes Agent 跑了起来。从最初在阿里云轻量服务器上一键部署，到完成微信接入、实现第一个定时任务，再到搭建双智能体协同开发，都在这里了。这篇文章既是给自己的一份技术笔记，也希望能帮助更多对自进化AI感兴趣的朋友少走弯路。

### 一、Hermes Agent（“爱马仕”）：不只是“另一款AI助手”

2026年伊始，AI Agent领域经历了一轮激烈的进化。如果说OpenClaw（江湖人称“龙虾”）是打通大模型与业务的“AI网关”，那么由Nous Research开源的Hermes Agent则更像一台会自主进化的“AI引擎”。两者同样支持全托管部署、打通了Telegram/Discord/Slack等主流IM平台、同样兼容多模型灵活切换，但在相似的“壳子”之下，两者的底层设计哲学截然不同。OpenClaw是“随时待命、渠道全覆盖”的个人助理，Hermes则致力于成为“越用越懂你”的持续学习系统。

![图片](https://mmbiz.qpic.cn/mmbiz_png/WtfKzqmTF0euibHwz8jAiaIr9VdkBaeFy5jQJyNM7ttDEffILou4mfZaqibfuniap4wq8wDwuqWDpK6c9EDZrsZGOzcGQUmIYCKicvv1icBO1w13o/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

Hermes **真正的核心优势在于：**

1.**持久记忆系统** 。它将记忆拆解为三层——MEMORY.md存储项目环境与偏好，USER.md存储用户画像，外加SQLite数据库存储历史会话，支持FTS5全文搜索。这意味着你的AI不会每天早上都忘记你是谁。

2.**自动技能沉淀（程序性记忆）** 。当Agent完成一项复杂任务后——比如反复调用多个工具、走过错误路径后找到正确解法——它会自动将这个过程固化为一个可复用的技能文件（SKILL.md），下次遇到类似任务直接调用，不用重新摸索。

3.**闭环学习系统** 。越使用、越聪明，这是Hermes最打动我的点。

### 二、部署实战：在阿里云上一键拥有“爱马仕”

阿里云轻量应用服务器上线Hermes Agent官方镜像后，部署门槛大幅降低。配置2GiB及以上内存的实例即可流畅运行。

**部署流程：**

1.登录阿里云轻量应用服务器控制台，创建实例时选择「应用镜像」中的「Hermes Agent」， **内存必须** **≥2GiB** ，推荐2核4GB。

2.实例创建完毕后，前往控制台绑定阿里云百炼模型的API Key，可以使用百炼Coding Plan，也可以用别的大模型和计费方式。本人为了体验DeepSeek-v4-pro，选择了通过配置文件设置DeepSeek的API Key。

3.配置安全组防火墙，放通 18789 和 8648 等必需端口。

部署后还可以配置SSH密钥登录，避免每次使用密码。在本地生成一对密钥后，将公钥添加到服务器的~/.ssh/authorized\_keys中，即可免密连接。此外，还可通过SSH隧道在本地访问Web管理界面：执行ssh -N -L 8648:127.0.0.1:8648 admin@服务器IP，之后在浏览器打开http://localhost:8648/#/?token=xxxxx即可可视化操作。注意，此操作需要在服务器端已经开启hermes-web-ui，前述在浏览器打开的地址就是服务器端启动hermes-web-ui后显示要在本地打开的地址。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

三、微信接入：让AI驻守在你最常用的地方

Hermes原生支持微信接入，原理是基于腾讯官方推出的iLink Bot API。

**接入步骤：**

1.确保 Hermes 版本 ≥ v0.6.0，运行hermes update更新至最新版本。

2.安装微信适配器所需的Python库：pip install aiohttp cryptography qrcode。

3.运行配置向导：hermes gateway setup。在交互界面中选择 **Weixin** 。

4.扫描终端显示的二维码，在手机上确认登录，一路回车确认默认配置即可。

5.配置完成后在微信中搜索联系人 **“微信** **Clawbot”（本人都做了重命名）** ，发送消息即可与你的AI助手对话。

**为什么选择微信作为入口？** 一个永不停机的个人AI助手，全天候驻守在你最常打开的微信里，随时待命帮你处理消息、整理信息、执行任务。这意味着你不需要额外打开任何网页或终端——随时随地，微信发条消息，AI就能自动接活儿。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

接入微信后，尝试搭建了一个单Agent定时任务，从微信端向default智能体发出以下任务需求如下：

创建一个定时任务，每天早上8点，全网搜集一次美国帕兰迪尔（Palantir）公司的最新消息，即过去24小时内发布的消息，对每一则消息提取摘要，并给出消息连接。最终生成一份有汇总说明的文档（含每一则消息摘要和链接）发给我。注意，消息按照重要性和来源可信度降序排列，总消息数不要超过10条。每天收集的上述信息，保存到知识库中，形成知识积累。进一步保存为向量化知识库，方便未来大模型调用。

经过不到一分钟的运行，得到回复如下：

```markdown
全部就绪 ✅ 这是完整的架构：
---
**📐 系统架构**
\`\`\`每天早上 8:00 (北京时间)        │        ▼┌──────────────────┐│  web_search 全网 │  多关键词搜索 → 去重 → 排序精选 ≤10条│  搜集 Palantir   │└────────┬─────────┘         │         ▼┌──────────────────┐│  生成 Markdown   │  汇总说明 + 逐条摘要 + 链接│  中文新闻简报     │└────────┬─────────┘         │    ┌────┴────┐    ▼         ▼┌───────┐  ┌──────────────────────┐│ 微信   │  │ 知识库 (~/.hermes/   ││ 推送   │  │   knowledge/palantir/)│└───────┘  │                      │           │  YYYY-MM-DD.md       │ ← 原始文档           │  INDEX.md            │ ← 日期索引           │  chroma_db/          │ ← 向量数据库           │    └─ palantir_news  │           └──────────────────────┘\`\`\`
**🔑 关键文件**
| 用途 | 路径 ||------|------|| 向量索引脚本 | \`~/.hermes/knowledge/palantir/index_docs.py\` || 向量数据库 | \`~/.hermes/knowledge/palantir/chroma_db/\` || Embedding 模型 | \`all-MiniLM-L6-v2\`（sentence-transformers） |
**🔍 以后你可以这样问我：**
> "最近一周 Palantir 有什么政府合同新闻？"> "查一下知识库里有没有关于 Palantir AIP 的消息"> "帮我总结这个月 Palantir 的股价趋势相关新闻"
我会自动加载 \`palantir-kb-search\` 技能，从向量知识库检索相关新闻。明天早上 8:00 收到第一期，知识积累就正式开始了 📚
```

到现在已经收到了两天的定时任务结果。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

四、多智能体创建：从default到coding的专业分工

Hermes支持创建多个智能体（Agents），通过分工协作提升效率。核心机制是通过hermes profile create命令复制agent配置，克隆出独立的子智能体来分担不同类型的任务。

**创建coding** **智能体：**

hermes profile create coding --clone-fromdefault

这会在~/.hermes/profiles/coding/下生成完整的配置目录。之后需要为新agent配置API Key和模型（直接配置即可，子Agent拥有独立的环境变量文件）。

**角色分工：**

\- **default** 担任“项目经理／架构师”，负责理解需求、拆解任务、分派子Agent

\- **coding** 承担“开发者”角色，专注于代码编写、调试和修复

为了让两个Agent高效协作，可以利用Hermes的 **subagent** 机制，通过delegate\_task等工具将任务可靠地分发给子Agent执行。更好的做法是将协作规范写入SOUL.md或MEMORY.md，让Agent自动遵循默认流程。

**配置角色分工：**

配置SOUL.md，明确default和coding的职责：

首先配置default的SOUL.md，部分内容如下：

```markdown
# 人格：任务调度中心、任务执行者和代码审查专家 CodeReviewer## 身份定位1. 接收来自用户分派的任务，并根据任务类型分配给相应的专家Agent。2. 如果用户分配的是编写代码的任务，则分配个coding agent，否则自己完成该任务。3. 你是资深全栈代码审查工程师，精通 Python、Shell、Docker、前端、系统架构，熟悉工程规范、安全漏洞、性能隐患、代码可读性、工程可维护性。你有一个专家agent：1. coding（代码专家）擅长：写代码，脚本开发，代码测试调试，技术方案调试方式：在终端执行coding chat -q "任务描述"## 工作流程1. 收到用户任务后，先判断属于那个专家的能力范围2. 等待所有专家的返回结果3. 审查coding agent的代码质量，如果有问题，则要求coding agent进行修改后再返回，如此重复直至自己满意为止，注意反复修改次数不超过7次，4. 把结果整理汇总后回复给用户，著名每部分分别有哪个专家完成。## 代码审查任务的工作原则1. 严谨客观，不情绪化，只按规范和最佳实践评审。2. 分级别标注：致命漏洞、严重问题、一般规范、优化建议。3. 每条问题必须给出：问题位置、原因、整改方案、示例代码。4. 不敷衍，不笼统，精准到行数、逻辑点、潜在风险。## 代码审查任务的审查维度（篇幅限制，以下省掉了一些具体内容）主要包括以下几个方面：1. 安全审计......2. 代码规范......3. 逻辑与业务......4. 性能与资源......5. 工程可维护性......## 代码审查任务的输出格式要求......## 代码审查任务的行为约束......coding的SOUL.md则更简洁，明确其作为“代码专家”的角色：# 风格- 直截了当- 除非复杂性需要深度阐述，否则要言简意赅- 指出某件事是个馊主意- 更注重实际权衡，而非理想化的抽象# 避免- 谄媚- 炒作言论- 对显而易见的事过度解释# 核心人格- 你是谁：我是一名全栈工程师，同时也负责产品设计和市场营销。你是一位务实的资深工程师。你更看重准确性和实际可行性，而非听起来多么高大上。- 沟通风格：简洁直接，避免废话；提供可执行的方案，而不是理论。- 专业领域：前后端开发、C/C++开发、Web开发、AI应用、自动化流程、内容创作。# 工作偏好- 代码风格：遵循最佳实践，注重可读性和可维护性。- 文档要求：提供完整注释，输出Markdown格式。- 时间管理：优先处理紧急且重要的任务，提供明确的时间估算。# 长期目标- 短期：完成当前项目的MVP版本。- 长期：建立个人品牌，实现"一人公司"模式。# 禁忌- 不要过度道歉或客套- 不要提供没有验证的信息- 不要忽略安全风险
```

当然还有其他的一些配置文档，比如skills，大模型配置等等，这里不一一列举。

五、多智能体协同实战：12分钟，从需求到可运行的爬虫

任务需求：爬取帕兰迪尔公司过去24小时的最新信息，生成带摘要和链接的Markdown简报，每天定时执行，同时保存网页快照。

**智能体协同流程：**

1.**规划阶段（default** **）** ：接收到需求后，default智能体将复杂任务拆解为四个子任务（数据采集、内容精选、简报生成、定时调度），制定了完整的技术方案。

2.**编码阶段（coding** **）** ：coding智能体根据方案编写了611行的Python爬取脚本，采用纯标准库设计。

3.**代码审查（default** **对coding** **）** ：default审查后发现了1个排序Bug（日期按字典序而非时间顺序）和2处规范问题（函数内import），要求coding修复。

4.**修复与验证** ：coding完成了修复，default复审后全部通过。实际运行测试显示：抓取112条消息→去重过滤→精选10条，简报和HTML快照全部生成成功。

5.**定时调度** ：default智能体将脚本配置为 **每天北京时间** **9:00** **自动执行** 。

从下达需求到最终交付工作代码，总耗时 **12** **分56** **秒** ，仅消耗 **56.8K Tokens** 。整个过程中default负责规划与审查，coding负责编码实现，两个智能体相互配合，各有侧重。

以下是运行过程的部分内容，省略号表示为了节省空间，有一部分内容省掉了。

```ruby
...╭─ ⚕ Hermes ────────────────────────────────────────────────────────────────────────────────╮    现在委托 coding agent 编写 Python 脚本。我会将已有的 RSS 搜索代码片段作为参考传递给它。╰───────────────────────────────────────────────────────────────────────────────────────────╯  ┊ 🔀 preparing delegate_task…  ┊ 🔀 delegate  编写一个 Python 脚本，用于从网络爬取帕兰迪尔（Palantir Technologies）公司过去 24 小时的最新新闻，生成 Markdown 简报并保存网页 HTML。  209.7s...╭─ ⚕ Hermes ────────────────────────────────────────────────────────────────────────────────╮    已完成对脚本的全面审查。现在汇编码审报告。...    现在让 coding agent 修复排序问题：╰───────────────────────────────────────────────────────────────────────────────────────────╯  ┊ 🔀 preparing delegate_task…  ┊ 🔀 delegate  修复 palantir_news_scraper.py 中的排序 bug（pubdate 字典序问题）和代码规范问题（函数内 import）。  80.8s╭─ ⚕ Hermes ────────────────────────────────────────────────────────────────────────────────╮    修复完成。我来验证关键变更点并测试脚本。╰───────────────────────────────────────────────────────────────────────────────────────────╯...╭─ ⚕ Hermes ────────────────────────────────────────────────────────────────────────────────╮    三个修复全部验证通过。现在运行脚本测试：╰───────────────────────────────────────────────────────────────────────────────────────────╯...核心文件    /home/admin/palantir_news_scraper.py — 单文件 Python 脚本（纯标准库，零依赖）    代码审查结论    - 🔴 致命问题：0 个    - 🟠 严重问题：已修复（排序字典序 Bug → 改用 datetime 对象排序）    - 🟡 规范优化：已修复（email.utils、Counter import 移至文件顶部）    测试验证    刚才实际运行结果：    - Google News RSS: 92 条    - Yahoo Finance RSS: 20 条    - 时间过滤后: 24 条    - 去重+噪音过滤+精选: 10 条HTML
    - Markdown 简报已生成    输出结构    /home/admin/output/    ├── 2026-05-04.md          ← Markdown 简报    └── 2026-05-04/            ← 原始 HTML 目录        ├── 01_Jim_Cramer_...html        ├── 02_Jobs_Report_...html        └── ... (共 10 个文件)    定时任务    | 项目     | 详情                            |    | :------- | :------------------------------ |    | Job ID   | 0a4a67b4f05d                    |    | 名称     | Palantir每日新闻爬取            |    | 执行时间 | 每天北京时间 09:00（UTC 01:00） |    | 下次运行 | 2026-05-05 09:00 (北京时间)     |    | 状态     | ✅ 已启用                        |    脚本功能概要    1. 双源采集：Google News RSS + Yahoo Finance RSS    2. 时间过滤：仅保留过去 24 小时新闻    3. MD5 去重：标题前 60 字符指纹去重    4. 噪音过滤：15 种正则排除机构持仓变动等噪音    5. 可信度排序：22 家媒体分 4-10 级评分 + 同源上限 3 条    6. HTML 存档：每条精选新闻下载原始 HTML 到日期目录    7. 中文简报：Markdown 格式，含汇总说明 + 新闻详情列表
```

以下截图可见上述运行的效果：

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

六、从“一次性任务”走向“长期能力沉淀”

上述两个任务开发往后，智能体每天都会搜索和爬取有关内容，生成相关文档保存到本地和知识库。可以支持未来用自然语言检索：“最近一周Palantir有什么政府合同新闻？”。

虽然这里都要求智能体搜索或爬取一个指定公司的信息，但是，如果需要别的信息，那也是类似的方式可以实现。这个设计意味着你的AI不再只是单次执行任务的工具，而是在持续积累行业知识的“数字员工”。 **能力会随着数据积累不断强化。**

### 七、写在最后：让AI成为你的长期伙伴

这次实践最深的感受是：AI Agent领域的迭代速度远超想象。从 2 月份接触 OpenClaw 到现在部署Hermes，才短短三个月——从“发起指令让它做事”到“它自动学习自己的工作方式”，技术范式正在持续发生转变。

如果你也想拥有一个 7×24 小时在线、而且越用越聪明的 AI 智能体，现在就是最好的时机。从阿里云轻量服务器的一键部署开始，花一个下午跑通全流程，然后和你的 AI 慢慢磨合——它真的会成为你最好的数字助理。

【以上内容有AI的辅助】

作者提示: 个人观点，仅供参考

继续滑动看下一个

永红博士

向上滑动看下一个