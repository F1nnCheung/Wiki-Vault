AI潮局 *2026年5月15日 15:00*

我是潮局。

这篇可能是全网目之所及，Hermes讲得最透的吧。

先假设个时光倒流的场景。

2025年某天，一位开发者花了40分钟教会AI助手一个复杂的调试技巧：先用哪个命令排查哪个节点，哪个参数组合能绕过那个坑。下一个session，他满怀期待地继续工作——然后AI又从零开始了。那40分钟，就像没存在过一样。

这不是哪个产品的bug。这是所有AI助手的结构性缺陷：对话结束，记忆清零。Hermes Agent 想解决的就是这件事。它在两个月内拿到了 GitHub 9万颗星——而这个数字背后，是一套真正能把经验留下来的系统。

1

## 先有身份，才有记忆

说真的，在聊记忆系统之前，有一个层经常被忽略：身份层。

记忆是AI知道的事，技能是它会做的事。但这两样都没有回答一个最基本的问题：它是谁？它以什么风格出现在你面前？

没有身份层，每次对话都像同一个AI换了件衣服。Hermes 用一个文件解决这个问题： `SOUL.md` 。它放在配置目录的根目录，固定插在系统提示词的第一位。它定义了AI的性格、语气、交流风格，以及一些硬边界。这个文件是你写一次然后长期使用的东西，不会每次session重置。

所以整个学习环路，实际上是透过这个身份框架来运作的。记忆是里面会变化的部分，身份是外面的固定框架。

<svg viewBox="0 0 960 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hermes Agent 身份与记忆关系图" style="width:100%;height:auto;display:block;border-radius:8px;background:#F6F6F6;"><rect x="280" y="60" width="400" height="280" rx="12" fill="#FFFFFF" stroke="#D8D8D8" stroke-width="1.5"></rect><rect x="330" y="110" width="300" height="180" rx="8" fill="#F6F6F6" stroke="#D8D8D8" stroke-width="1"></rect><circle cx="480" cy="200" r="55" fill="#1A1A1A"></circle><text x="480" y="195" font-size="22" fill="#FFFFFF" text-anchor="middle" font-weight="600">SOUL</text> <text x="480" y="215" font-size="13" fill="#FFFFFF" text-anchor="middle">身份层</text> <circle cx="400" cy="155" r="28" fill="#0F62FE" opacity="0.85"></circle><text x="400" y="160" font-size="14" fill="#FFFFFF" text-anchor="middle" font-weight="500">记忆</text> <circle cx="560" cy="155" r="28" fill="#24A148" opacity="0.85"></circle><text x="560" y="160" font-size="14" fill="#FFFFFF" text-anchor="middle" font-weight="500">技能</text> <circle cx="480" cy="260" r="28" fill="#8A3FFC" opacity="0.85"></circle><text x="480" y="265" font-size="14" fill="#FFFFFF" text-anchor="middle" font-weight="500">GEPA</text> <line x1="445" y1="175" x2="435" y2="158" stroke="#D8D8D8" stroke-width="1.5"></line><line x1="515" y1="175" x2="525" y2="158" stroke="#D8D8D8" stroke-width="1.5"></line><line x1="480" y1="255" x2="480" y2="235" stroke="#D8D8D8" stroke-width="1.5"></line><text x="480" y="355" font-size="14" fill="rgba(0,0,0,.45)" text-anchor="middle">身份框架决定记忆与技能如何被整合</text> <text x="120" y="200" font-size="16" fill="rgba(0,0,0,.4)" text-anchor="middle" font-weight="500">固定</text> <text x="120" y="220" font-size="13" fill="rgba(0,0,0,.4)" text-anchor="middle">身份</text> <line x1="140" y1="200" x2="270" y2="200" stroke="#D8D8D8" stroke-width="1" stroke-dasharray="4,3"></line><text x="830" y="200" font-size="16" fill="rgba(0,0,0,.4)" text-anchor="middle" font-weight="500">可变</text> <text x="830" y="220" font-size="13" fill="rgba(0,0,0,.4)" text-anchor="middle">记忆/技能</text><line x1="700" y1="200" x2="620" y2="200" stroke="#D8D8D8" stroke-width="1" stroke-dasharray="4,3"></line></svg>

图：身份框架与记忆/技能系统的关系。SOUL.md 是固定层，记忆和技能是内部动态组件。

2

## 三层记忆体系：三个速度，三种用途

Hermes 的记忆不是一块硬盘，是三个不同速度的存储层。每一层解决不同问题，之间有明确的取舍关系。

**第一层：两个小文件，永久在上下文里。**

核心是两个放在磁盘上的 Markdown 文件。 `MEMORY.md` （最多2200字符）存AI对自己环境、项目规范、工具特性和经验教训的记录。 `USER.md` （最多1375字符）存用户信息：名字、沟通偏好、技能水平、注意事项。

每次新session开始，这两个文件以固定快照的形式注入到系统提示词里。如果AI在对话中途写了新记忆，变化会立即写入磁盘，但这个变化要等到下一个session才会出现在系统提示词里。当记忆用到接近80%容量，AI会主动整合，把相关内容合并成更密集的版本。

**第二层：全量对话历史，随时可搜索。**

每次对话（CLI和消息平台）都完整存在 SQLite 里，带全文搜索索引。这层解决"上周我问了什么来着"这类问题。代价是它需要AI主动去搜，然后做摘要，不是默认在上下文里。第一层常驻但极小，第三层可搜索但需要主动调用。

**第三层：外部记忆提供者，8种插件。**

如果需要更深入的持久记忆，Hermes 支持8种外置 provider，可以在你不用的时候主动预取相关内容、对话结束后同步记忆、以及在session结束时提取记忆。这些 provider 和内置记忆并行运作，互不替代，每次只启用一种。

<svg viewBox="0 0 960 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hermes 三层记忆架构" style="width:100%;height:auto;display:block;border-radius:8px;background:#F6F6F6;"><rect x="180" y="30" width="600" height="90" rx="8" fill="#1A1A1A"></rect><text x="220" y="62" font-size="15" fill="#FFFFFF" font-weight="600">Tier 1 · 系统提示词常驻</text> <text x="220" y="82" font-size="13" fill="rgba(255,255,255,.65)">MEMORY.md + USER.md · 2200 + 1375 字符</text> <text x="680" y="72" font-size="28" fill="#FFFFFF" text-anchor="middle">⚡</text> <text x="800" y="72" font-size="13" fill="rgba(255,255,255,.55)" text-anchor="end">速度最快</text> <rect x="180" y="135" width="600" height="90" rx="8" fill="#0F62FE"></rect><text x="220" y="167" font-size="15" fill="#FFFFFF" font-weight="600">Tier 2 · SQLite 全量搜索</text> <text x="220" y="187" font-size="13" fill="rgba(255,255,255,.65)">state.db · WAL模式 · FTS5索引 · 无限容量</text> <text x="680" y="177" font-size="28" fill="#FFFFFF" text-anchor="middle">🔍</text> <text x="800" y="177" font-size="13" fill="rgba(255,255,255,.55)" text-anchor="end">按需搜索</text> <rect x="180" y="240" width="600" height="90" rx="8" fill="#8A3FFC"></rect><text x="220" y="272" font-size="15" fill="#FFFFFF" font-weight="600">Tier 3 · 外部 Provider</text> <text x="220" y="292" font-size="13" fill="rgba(255,255,255,.65)">8种插件 · 预取 + 同步 + 提取</text> <text x="680" y="282" font-size="28" fill="#FFFFFF" text-anchor="middle">🗄</text> <text x="800" y="282" font-size="13" fill="rgba(255,255,255,.55)" text-anchor="end">空闲时运行</text> <line x1="480" y1="120" x2="480" y2="135" stroke="#D8D8D8" stroke-width="1.5" marker-end="url(#arrow)"></line><line x1="480" y1="225" x2="480" y2="240" stroke="#D8D8D8" stroke-width="1.5"></line><text x="480" y="360" font-size="13" fill="rgba(0,0,0,.4)" text-anchor="middle">容量: Tier1 &lt;&lt; Tier2 &lt; Tier3</text></svg>

图：三层记忆的速度与容量关系。越快容量越小，越慢容量越大。

3

## 技能自进化：AI自己写操作手册

记忆解决的是"知道什么"。技能解决的是"怎么做"。在 Hermes 里，技能是带有 YAML 元数据的 Markdown 文件，内容就是操作步骤。有点像把一个老工程师的操作习惯文档化——只不过这个文档是AI自己写的。

触发技能创建的条件有几种：完成一个超过5步工具调用复杂任务、遇到错误死磕出解决方案、用户纠正了AI的做法、或者发现了非平凡的工作流。每次满足条件，AI就会用 `skill_manage` 工具自动生成一个新的 `SKILL.md` 。

一个典型技能长这样：描述触发场景、列出具体步骤、注明坑位提醒、以及验证方式。为了节省 token，技能使用渐进式披露——AI默认只看到名称和描述，当真正需要某个技能时才加载完整内容。

<svg viewBox="0 0 960 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Skill 自进化循环" style="width:100%;height:auto;display:block;border-radius:8px;background:#F6F6F6;"><rect x="40" y="110" width="160" height="100" rx="8" fill="#FFFFFF" stroke="#D8D8D8" stroke-width="1.5"></rect><text x="120" y="148" font-size="18" fill="#1A1A1A" text-anchor="middle" font-weight="600">遇到问题</text> <text x="120" y="172" font-size="14" fill="rgba(0,0,0,.45)" text-anchor="middle">5+工具调用</text> <path d="M200 160 C260 160 260 60 320 60" fill="none" stroke="#0F62FE" stroke-width="2" stroke-dasharray="6,3"></path><polygon points="320,55 330,60 320,65" fill="#0F62FE"></polygon><rect x="320" y="20" width="160" height="80" rx="8" fill="#FFFFFF" stroke="#D8D8D8" stroke-width="1.5"></rect><text x="400" y="58" font-size="18" fill="#1A1A1A" text-anchor="middle" font-weight="600">试错解决</text> <text x="400" y="80" font-size="14" fill="rgba(0,0,0,.45)" text-anchor="middle">找到正确路径</text> <path d="M480 60 C540 60 540 160 600 160" fill="none" stroke="#0F62FE" stroke-width="2" stroke-dasharray="6,3"></path><polygon points="600,155 610,160 600,165" fill="#0F62FE"></polygon><rect x="600" y="110" width="160" height="100" rx="8" fill="#0F62FE"></rect><text x="680" y="148" font-size="18" fill="#FFFFFF" text-anchor="middle" font-weight="600">写入技能</text> <text x="680" y="172" font-size="14" fill="rgba(255,255,255,.65)" text-anchor="middle">SKILL.md</text> <path d="M680 210 C680 260 480 260 400 260" fill="none" stroke="#0F62FE" stroke-width="2" stroke-dasharray="6,3"></path><polygon points="405,255 400,265 395,255" fill="#0F62FE"></polygon><rect x="240" y="220" width="160" height="70" rx="8" fill="#24A148"></rect><text x="320" y="252" font-size="17" fill="#FFFFFF" text-anchor="middle" font-weight="600">下次直接命中</text> <text x="320" y="272" font-size="13" fill="rgba(255,255,255,.65)" text-anchor="middle">跳过试错</text> <text x="480" y="310" font-size="14" fill="rgba(0,0,0,.45)" text-anchor="middle">自进化循环：遇到问题 → 解决 → 存档 → 下次直接用</text></svg>

图：技能自进化循环。AI遇到问题并解决后，将成功路径写入技能库，下次直接调用。

**Curator：技能的垃圾回收。**

如果AI可以无限创建技能，技能库会迅速膨胀成一堆重复、过时、相互冲突的操作手册。Curator 就是来解决这个问题的后台维护系统。

它不是定时运行的守护进程。它只在检测到"7天未运行 + AI空闲2小时"时才触发。触发后会有两个阶段：首先，自动规则处理明显过时的：30天未使用的技能标记为过时，90天未使用的归档。然后，AI接管做更细致的判断——最多8轮迭代，逐个判断每个AI创建的技能是保留、打补丁、合并还是归档。

两个重要限制：Curator 永远不会动内置技能和从 Hub 安装的技能，只处理AI自己写的。另外它永远不会直接删除，最多归档到 archive 目录，可以随时恢复。

4

## GEPA：离线优化，不碰模型权重

这里有一个真实的张力：AI自己创建的技能，存在"自我美化"的问题。它几乎总是认为自己做得不错，即使实际上没有。社区反馈也确认了这一点——有时候自创技能还会覆盖掉手动的、更好的定制版本。

GEPA（Genetic-Pareto Prompt Evolution）就是来解决这个的。它不是 Hermes 运行时的内置模块，而是独立运行的优化流水线，相关论文是 ICLR 2026 Oral，MIT 协议开源。

GEPA 的核心思路是：别问AI"你做得好不好"，直接去读执行痕迹，理解失败的原因，然后通过进化搜索提出有针对性的改进。它的流水线是这样的：从 Hermes 仓库读取当前技能，生成评测数据集（可以用 Claude Opus 生成合成测试用例、从 SQLite 提取真实会话历史、或者人工整理黄金集），然后运行优化器读取执行痕迹、找出失败点、生成候选改进版本，再用 LLM 评分（带评分细则，不是简单的通过/失败二元判断），最后过约束门：测试必须100%全过、技能文件不超过15KB、缓存兼容性保持、语义不漂移。

不需要GPU，全部通过API调用完成，每次优化运行大约花费2到10美元。最终胜出的版本以 PR 形式提交到 Hermes 仓库，永远不是直接 commit。

GEPA 可以跳过，但如果遇到瓶颈，它是一种在全面微调之前的有效替代方案。

5

## 快速上手：一行命令启动

说真的，理论讲完了，现在说怎么跑起来。

**安装：** Linux、macOS 或 WSL2，Python 3.11 以上，8GB 内存够跑 API 模式。一行命令搞定：

curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

装完之后运行向导配置 provider、API key、模型和工具：

hermes setup

然后就可以直接聊了： `hermes` 。

**连 Telegram：** 从 @BotFather 获取 bot token，再从 @userinfobot 获取自己的 Telegram ID，配置好之后就可以在手机上和AI对话了。

**多 agent 玩法：** Hermes 的 profiles 功能支持创建多个完全隔离的实例，每个有自己的配置、记忆、技能和 Telegram bot。可以创建一个程序员（把代码执行委托给 Claude Code）、一个研究员（负责每日 AI 资讯推送）、一个设计师（生成特定风格的插图）。

**定时任务：** 用自然语言描述想要什么，Hermes 自动转换成 cron 表达式。例如"每个工作日早上8点推送AI资讯摘要"，研究员 agent 会自动创建定时任务并通过 Telegram 交付结果。

✦

## 小结

Hermes Agent 的核心不是一个聊天机器人，而是一个有学习环路的个人AI系统。 `SOUL.md` 设定身份，运行时循环捕获经验，Curator 保持技能库健康，GEPA 确保库里东西真的管用。

这个系统做到了其他开源 agent 都没做到的事：把三个本来分开的部分——实时技能学习、持久多层记忆、和可选的离线优化流水线——真正整合到了一个框架里。它不是靠一个杀手级功能，而是靠这个组合。

回到开头那个场景。如果那位开发者用的是 Hermes，下一次session，AI会直接说"我注意到上次我们调试那个问题用了这个方法……"。那40分钟没有消失。它被留下来了。

你用 AI 助手时，最头疼的记忆问题是什么？

· Hermes 的三层记忆体系，最吸引你的是哪一层？

· 如果可以给 AI 设计一个"永远不忘"的能力，你最想留住什么？

· 你认为 AI 自创技能靠谱吗？有什么潜在风险？

来源：

Akshay @akshay\_pachaar，2026年5月13日· Hermes Agent GitHub· GEPA 论文（ICLR 2026 Oral）

**微信扫一扫赞赏作者**

实战工具与Agent · 目录

继续滑动看下一个

AI潮局

向上滑动看下一个