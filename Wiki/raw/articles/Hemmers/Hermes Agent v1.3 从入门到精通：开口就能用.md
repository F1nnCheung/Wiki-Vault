小飞哥的龙虾 *2026年4月23日 19:10*

> **不用记命令。你说话，它干活。**

---

## 一、Hermes 是什么？

Hermes Agent 是一个 **会进化的 AI 工作伙伴** 。

传统的 AI 助手，每次对话都是从零开始——你跟它聊过的东西，下次换一个 session 就全忘了。Hermes 不一样：它会记住你告诉它的事情，记住你的偏好，记住它自己犯过的错，下次遇到类似的事情它会做得更好。

这不是一个聊天机器人，而是一个 **真正能帮你做事的 AI** ——你让它帮你接平台，它帮你接好；你让它帮你管服务器，它自己去跑命令；你告诉它你的习惯，它就按你的习惯来。

**一句话定位：**

> 你说话，它干活，越用越懂你。

---

## 二、安装（10 分钟搞定）

支持 Linux、macOS、Windows（WSL2）、安卓（Termux）。

**第一步：运行安装脚本**

```
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

**第二步：生效配置**

```
source ~/.bashrc
```

**第三步：启动**

```
hermes
```

> **Windows 用户** ：需要先安装 WSL2，原生 Windows 不支持。
> 
> **安卓 / 手机用户** ：在 Termux 里运行同样的安装命令，体验和电脑一样。

安装完成后，你会进入交互界面。告诉它你想做什么：

- "帮我接上飞书"
- "我想用 Claude"
- "装一个搜索技能"

---

## 三、模型配置（20+ 供应商）

> **你** ："我想用 Claude"
> 
> **Hermes** ："好的，Claude 4.1 推理能力强，适合复杂任务。我帮你切换。"

> **你** ："有没有便宜一点的国内模型？"
> 
> **Hermes** ："推荐 Kimi（Moonshot）或硅基流动。Kimi 中文效果好，价格便宜。我帮你配置？"

**支持的模型供应商（20+）** ：

| 你说 | Hermes 帮你做 |
| --- | --- |
| "我想用 GPT-5" | 配置 OpenAI API 并切换 |
| "帮我换成 Claude" | 配置 Anthropic API |
| "用 xAI 的 Grok" | xAI 官方支持，Grok-3/2/1 可选 |
| "换成 DeepSeek" | 配置 DeepSeek，性价比高 |
| "换成 Qwen3.5" | 配置阿里通义千问，中文能力强 |
| "用 Gemma 3" | 配置 Google 开源模型 |
| "帮我用 Ollama 本地跑" | 配置本地模型，完全私有可控 |
| "我想用 OpenRouter" | 聚合 200+ 模型，最灵活 |
| "用 Azure OpenAI" | 配置企业内网 Azure |
| "用 MiniMax" | 配置 MiniMax，M2.5 最新 |

> **你** ："帮我配置 API Key"
> 
> **Hermes** ："好的，告诉我你想用哪个供应商，我去引导你获取 Key，然后帮你写入配置。"

```
hermes config set OPENAI_API_KEY=sk-xxx
hermes config set ANTHROPIC_API_KEY=sk-ant-xxx
```

---

## 四、接入消息平台（16 个平台）

**传统方式** ：查文档 → 找配置项 → 改配置文件 → 重启服务。

**Hermes 方式** ：

> **你** ："帮我接上飞书"
> 
> **Hermes** ："好的。需要你的 App ID 和 App Secret，去飞书开放平台创建企业自建应用后就能拿到。配置好之后 Gateway 重启就能用。"

> **你** ："我想在微信里用"
> 
> **Hermes** ："没问题，微信通过 iLink Bot API 接入。帮你配置 App ID 和 App Secret，重启后微信就通了。"

> **你** ："接上 Telegram"
> 
> **Hermes** ："最推荐的接入方式，最稳定。告诉我你的 Bot Token，我帮你配好。"

**完整的平台支持** ：

| 你说 | Hermes 帮你做 | 说明 |
| --- | --- | --- |
| "接上飞书" | 配置飞书机器人 | 企业场景首选 |
| "连微信" | 配置微信 iLink Bot API | 国内必备 |
| "连企业微信" | 配置企业微信应用 | 团队场景 |
| "接上 Telegram" | 配置 Bot Token | **最推荐，稳定** |
| "连 Discord" | 配置 Discord Bot | 服务器场景 |
| "连 WhatsApp" | 配置 WhatsApp Business API |  |
| "连钉钉" | 配置钉钉机器人 |  |
| "接上 Signal" | 配置 Signal | 隐私优先 |
| "连 Slack" | 配置 Slack Bot | 团队协作 |
| "连 iMessage" | 配置 BlueBubbles 服务器 | 苹果生态 |
| "连邮件" | 配置 SMTP/IMAP |  |
| "接上 SMS" | 配置 Twilio |  |

接入之后，你人在哪里都可以跟 Hermes 对话——微信、Telegram、飞书，随你选。

---

## 五、v0.10.0 核心新功能

> **你** ："这个版本有什么新东西？"
> 
> **Hermes** ："v0.10.0 是一次大版本更新，新支持了 MCP 协议、Qwen3.5、Gemma 3、RAG 语义记忆，还有新的 NousBridge。下面一个个说。"

### 1\. MCP Server & Client——协议级工具生态

> **你** ："什么是 MCP？"
> 
> **Hermes** ："MCP（Model Context Protocol）是 Anthropic 提出的标准协议，让 AI 能以一种通用方式调用各种工具。v0.10.0 同时支持做 MCP Server（对外提供服务）和 MCP Client（调用别人）。"

- **做 MCP Server** ：Hermes 暴露的工具可以被支持 MCP 的 AI 客户端直接调用
- **做 MCP Client** ：可以接入任何 MCP Server，比如访问 GitHub、文件系统、数据库等
```
/hermes mcp server start           # 启动 MCP Server
/hermes mcp client connect <url>   # 连接远程 MCP Server
/hermes mcp list                   # 查看已连接的工具
```

### 2\. NousBridge——第三方能力桥接

> **你** ："NousBridge 是什么？"
> 
> **Hermes** ："NousBridge 是 v0.10.0 新增的桥接层，用来接入 Nous Research 生态的外部服务和工具，比如高级推理后端、第三方记忆系统等。订阅制，按需开启。"

```
/hermes bridge enable nous
/hermes bridge config
```

### 3\. RAG Memory——语义搜索记忆

> **你** ："之前记住的事情太多了，怎么快速找到？"
> 
> **Hermes** ："v0.10.0 内置了 RAG 语义搜索记忆，你说过的事情、文件内容、Session 记录，都能用自然语言搜索。"

```
/hermes memory search "我上次说的那个 Python 方案"
/hermes memory index ~/docs
```

### 4\. Claude Agentic Coding——自主编程模式

> **你** ："能不能让它自己写代码？"
> 
> **Hermes** ："v0.10.0 支持 Claude Agentic Coding 模式，Claude 可以自主规划、执行、修正代码，适合复杂的长任务。"

### 5\. Qwen3.5 / Gemma 3 / DeepSeek V3 & R2——新模型支持

> **你** ："支持 Qwen3.5 吗？"
> 
> **Hermes** ："支持，v0.10.0 同时新增了 Qwen3.5、Gemma 3、DeepSeek V3 和 DeepSeek R2，直接切换就能用。"

| 新型号 | 说明 |
| --- | --- |
| Qwen3.5 | 阿里通义千问最新旗舰，中文能力强 |
| Gemma 3 | Google 开源模型，轻量高效 |
| DeepSeek V3 | 深度求索最新推理模型 |
| DeepSeek R2 | R2 强化版，支持多模态 |

### 6\. Azure OpenAI——企业级接入

> **你** ："我们公司用的是 Azure OpenAI，能接吗？"
> 
> **Hermes** ："v0.10.0 原生支持 Azure OpenAI，配置 endpoint 和 API 版本就能用，适合企业内网场景。"

### 7\. OpenRouter v2 API——聚合平台升级

> **你** ："OpenRouter 体验怎么样？"
> 
> **Hermes** ："v0.10.0 升级到了 OpenRouter v2 API，接入更稳定，支持模型更多，还能自动选择最优模型。"

### 8\. Bedrock Transport——AWS 原生支持

> **你** ："跑在 AWS 上有优化吗？"
> 
> **Hermes** ："有，v0.10.0 新增了 Bedrock Transport，直接走 AWS Bedrock 调用 Claude/Gemma，不需要绕 API，延迟更低、成本更省。"

---

## 六、安装和配置技能

Hermes 的技能（Skill）系统，是它能力扩展的核心。你不需要自己写，官方和社区已经做了大量技能，装上就能用。

> **你** ："有什么技能可以装？"
> 
> **Hermes** ："网页搜索、GitHub 管理、arXiv 论文搜索、图片生成……很多。你说想做什么，我帮你找。"

**常用技能** ：

| 你说 | 技能作用 |
| --- | --- |
| "帮我装网页搜索" | `/web`  搜索互联网 |
| "帮我装 GitHub 技能" | `/github`  管理仓库 |
| "装一个读论文的技能" | `/arxiv`  搜索论文 |
| "装定时任务技能" | `/cron`  管理自动化 |

**管理技能** ：

| 你说 | Hermes 帮你做 |
| --- | --- |
| "我装了哪些技能？" | 列出已安装技能 |
| "这个不用了" | 禁用或卸载 |
| "有新的技能吗？" | 搜索社区市场 |
| "这个技能怎么用？" | 预览说明 |

---

## 七、自动化任务

定时任务让 Hermes 可以主动做事，不需要你每次触发。

> **你** ："每天早上给我发天气"
> 
> **Hermes** ："好的，你在哪座城市？"
> 
> **你** ："北京"
> 
> **Hermes** ："已创建，每天 9:00 查询北京天气发给你。"

| 你说 | Hermes 帮你做 |
| --- | --- |
| "每天早上给我发头条新闻" | 自动搜索整理发送 |
| "每周五下午提醒我写周报" | 定时提醒 |
| "每小时检查服务器还活着吗" | 监控并告警 |
| "有人提 PR 就通知我" | Webhook 监控 |
| "这个任务取消" | 删除或暂停 |

> **你** ："这个任务不用了"
> 
> **Hermes** ："已删除。"

---

## 八、记忆你的偏好

> **你** ："记住我叫张三"
> 
> **Hermes** ："记住了，以后我叫你张总 😊"

> **你** ："我写代码用 Java，Spring Boot"
> 
> **Hermes** ："记住了。以后给你推荐方案的时候会结合 Java 生态的上下文。"

> **你** ："以后中文回复我"
> 
> **Hermes** ："好的，全部中文。"

记忆持久化，跨 session 保留，关闭再打开 Hermes 依然记得。

---

## 九、从 OpenClaw 迁移

> **你** ："我之前用 OpenClaw，能迁移过来吗？"
> 
> **Hermes** ："可以，大部分配置能自动迁移。"

```
hermes claw migrate --dry-run               # 预览迁移内容
hermes claw migrate --preset full --yes     # 执行迁移
```

**能迁移的内容** ：

- MEMORY.md、SOUL.md、USER.md
- Skill 配置
- 模型 API Key
- Telegram / Discord 等海外平台

**需要重建的内容** ：

- 飞书 / 企业微信（接入方式不同，需重新配置）
- Cron 定时任务
- 自定义插件

---

## 十、升级指南（v0.9.0 → v0.10.0）

> **你** ："怎么升级到最新版本？"
> 
> **Hermes** ："一行命令。"

```
hermes update
hermes version      # 确认升级成功
```

| 新功能 | 说明 |
| --- | --- |
| MCP Server & Client | 协议级工具生态，可做服务端也可做客户端 |
| NousBridge | 接入 Nous Research 生态外部服务 |
| RAG Memory | 语义搜索记忆，支持自然语言查找 |
| Claude Agentic Coding | 自主编程模式，复杂长任务 |
| Qwen3.5 | 阿里通义千问最新旗舰 |
| Gemma 3 | Google 开源轻量模型 |
| DeepSeek V3 / R2 | 深度求索新版推理模型 |
| Azure OpenAI | 企业内网场景 |
| OpenRouter v2 API | 更稳定，模型更多 |
| Bedrock Transport | AWS 原生调用，成本更低 |
| MiniMax M2.5 | MiniMax 最新模型 |

---

## 十一、实用命令参考

虽然说"开口就能用"，但有些命令确实很高效，记住几个常用的如虎添翼：

| 你说（简写） | 等价命令 | 作用 |
| --- | --- | --- |
| `/m` | `hermes model` | 切换模型 |
| `/skills` | `hermes skills` | 管理技能 |
| `/cron` | `hermes cron` | 定时任务 |
| `/sessions` | `hermes sessions` | 历史会话 |
| `/backup` | `hermes backup` | 备份 |
| `/dashboard` | 浏览器打开 | 图形界面 |
| `/new` | 开启新会话 |  |
| `/clear` | 清屏重置 |  |

---

## 十二、选型参考

> **你** ："Hermes 和 OpenClaw 哪个更适合我？"

| 需求 | 推荐 |
| --- | --- |
| 主要用飞书 / 企业微信 | Hermes（原生支持） |
| **让 AI 越用越懂你** | **Hermes（学习循环是核心差异）** |
| 需要 20+ 平台接入 | Hermes（16 平台） |
| 完全开源 | Hermes |
| 在手机上跑 | **Hermes**  （Termux 支持） |
| 快速接入微信 | Hermes（iLink Bot API 原生支持） |
| 更直观的界面 | Hermes Dashboard |

---

## 十三、快速上手

**第一步：装好 Hermes**

```
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
source ~/.bashrc
hermes
```

**第二步：说你想做什么**

- "帮我接上飞书"
- "我想用 Claude"
- "帮我装一个搜索技能"

**第三步：让它帮你做实事**

- 搜资料、管文件、跑代码
- 设置定时任务
- 记住你的偏好

---

## 一句话总结

> **Hermes Agent = 你说话，它干活。**
> 
> 接入 16 个消息平台，20+ 大模型，手机上能跑，会学习，越用越懂你。微信和 iMessage 的加入补全了国内外生态最重要的两块拼图。
> 
> Slash 命令是备用出口，正常使用只需要开口。

---

> 如果对你有帮助，欢迎转发给需要的朋友 👇

---

## 交流与合作

> **想深入了解 Hermes？遇到问题没人解答？**
> 
> 欢迎添加我的微信 **ysf99918** ，备注「Hermes」，我会拉你进技术交流群。
> 
> 你将获得：
> 
> - Hermes 实际使用中的避坑指南
> - 定时任务、Skill 编写、平台接入的一手经验
> - 和开发者直接交流的机会

微信号： **ysf99918** （复制直接添加）

---

*本文基于 Hermes Agent v0.10.0 编写，最新功能请参考官方文档。*

第二个我 · 目录

继续滑动看下一个

猿码

向上滑动看下一个