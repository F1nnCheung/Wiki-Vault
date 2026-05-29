坚强粑粑 *2026年5月26日 17:38*

> 本文基于 Hermes Agent 官方文档、107+ 技能库源码及实际使用经验整理，覆盖配置、技能、日常使用、自动化和避坑。

## 一、Hermes Agent 是什么

Hermes Agent 是 Nous Research 开源的 AI Agent 框架。简单说，它是一个能在你的终端、消息平台（Telegram、飞书、Discord、Slack 等）和 IDE 里跑的自主执行代理。它不只是一个聊天机器人——它能调用工具、执行命令、读写文件、搜索网络、管理定时任务，而且 **跨会话有记忆** 。

核心差异化：

- **Skill（技能）系统**
	——解决过的问题可以沉淀为可复用的技能，越用越聪明
- **持久记忆**
	——跨会话记住你是谁、你的偏好、环境信息
- **多平台网关**
	——同一套 Agent 跑在 Telegram、Discord、Slack、飞书等 10+ 平台上
- **模型无关**
	——随时切换模型和提供商，不需要改配置
- **Profile（配置文件）**
	——多实例隔离，不同的工作场景用不同的 profile
- **可扩展**
	——插件、MCP 服务器、自定义工具、Webhook 触发、定时任务

## 二、安装与初始配置

### 快速安装

```
bashcurl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

### 初始化向导

```
bashhermes setup
```

这会引导你完成模型选择、终端配置、网关设置、工具集和 Agent 行为的配置。

### 健康检查

```
bashhermes doctor --fix
```

第一次跑完后执行这个命令，检查依赖和配置是否完整， `--fix` 会自动修复常见问题。

### 关键路径速查

| 路径 | 作用 |
| --- | --- |
| `~/.hermes/config.yaml` | 主配置文件 |
| `~/.hermes/.env` | API 密钥和敏感信息 |
| `$HERMES_HOME/skills/` | 已安装的技能 |
| `~/.hermes/state.db` | 会话存储（SQLite + FTS5 全文搜索） |
| `~/.hermes/logs/` | 网关和错误日志 |

## 三、推荐的 Skills（技能）

Hermes 目前有 107+ 个技能。以下是实际使用中 **最值得安装和使用的** ，按场景分类：

### 3.1 开发效率类

| 技能 | 用途 | 推荐指数 |
| --- | --- | --- |
| `systematic-debugging` | 四阶段根因调试法，遇到 bug 先看这个，避免盲目改代码 | ⭐⭐⭐⭐⭐ |
| `writing-plans` | 写实现计划，把大任务拆成可执行的小步骤，存到 `.hermes/plans/` | ⭐⭐⭐⭐⭐ |
| `github-pr-workflow` | GitHub PR 全流程：分支、提交、打开、CI、合并 | ⭐⭐⭐⭐ |
| `github-code-review` | PR 代码审查，支持 diff 和内联评论 | ⭐⭐⭐⭐ |
| `codebase-inspection` | 用 pygount 分析代码库：行数、语言、比例 | ⭐⭐⭐ |
| `requesting-code-review` | 提交前自动审查：安全扫描、质量门控、自动修复 | ⭐⭐⭐⭐ |

### 3.2 内容创作类

| 技能 | 用途 | 推荐指数 |
| --- | --- | --- |
| `humanizer` | 去除 AI 写作痕迹，让文本读起来像人写的 | ⭐⭐⭐⭐⭐ |
| `tech-article-writing` | 技术文章写作：对比文章、工具介绍、分析类内容 | ⭐⭐⭐⭐⭐ |
| `architecture-diagram` | 暗色主题 SVG 架构/云/基础设施图 | ⭐⭐⭐⭐ |
| `baoyu-image-gen` | AI 图片生成（支持 OpenAI、DashScope、Google 等多个后端） | ⭐⭐⭐⭐ |
| `baoyu-slide-deck` | 从内容生成专业 PPT 图片 | ⭐⭐⭐⭐ |
| `obsidian` | Obsidian 笔记管理：读取、搜索、创建、编辑 | ⭐⭐⭐⭐ |

### 3.3 研究与信息收集类

| 技能 | 用途 | 推荐指数 |
| --- | --- | --- |
| `tavily-search` | Tavily API 网络搜索，返回精炼结果和摘要 | ⭐⭐⭐⭐⭐ |
| `multi-search-engine` | 17 个搜索引擎集成（8 国内 + 9 国际），无需 API Key | ⭐⭐⭐⭐ |
| `arxiv` | arXiv 论文搜索：关键词、作者、分类 | ⭐⭐⭐⭐ |
| `blogwatcher` | 监控博客和 RSS/Atom 订阅源 | ⭐⭐⭐ |
| `tech-repo-research` | 研究 GitHub 仓库并生成对比/概览文章 | ⭐⭐⭐⭐ |
| `youtube-content` | YouTube 转录转摘要、Thread、博客 | ⭐⭐⭐ |

### 3.4 自动化与运维类

| 技能 | 用途 | 推荐指数 |
| --- | --- | --- |
| `hermes-agent` | Hermes 自身配置、扩展、贡献的全套指南 | ⭐⭐⭐⭐⭐ |
| `self-improvement` | 自我改进：捕获错误、纠正和新发现的工作流 | ⭐⭐⭐⭐⭐ |
| `openclaw-auto-updater` | 定时自动更新 Hermes 和技能，带可靠的重试机制 | ⭐⭐⭐⭐ |
| `kanban-worker` | Kanban 工作流指南，多 Agent 协作任务 | ⭐⭐⭐ |
| `webhook-subscriptions` | Webhook 订阅：事件驱动的 Agent 运行 | ⭐⭐⭐ |

### 3.5 媒体与生活类

| 技能 | 用途 | 推荐指数 |
| --- | --- | --- |
| `spotify` | Spotify 播放、搜索、队列、播放列表管理 | ⭐⭐⭐ |
| `gif-search` | Tenor GIF 搜索/下载 | ⭐⭐⭐ |
| `songwriting-and-ai-music` | 歌曲创作和 Suno AI 音乐提示词 | ⭐⭐⭐ |
| `imessage` | macOS 上收发 iMessage/SMS | ⭐⭐ |
| `apple-reminders` | Apple 提醒事项管理 | ⭐⭐ |

## 四、Context Files 上下文文件

这是 Hermes 一个非常实用的功能——通过项目根目录的约定文件，让 Agent 每次自动加载你的项目规则和偏好。

### 4.1 支持的文件

Hermes 会自动发现并加载以下文件：

| 文件名 | 用途 | 推荐内容 |
| --- | --- | --- |
| `AGENTS.md` | 项目级指令 | “用 pytest，不要用 unittest”、“API 在 /api/v2” |
| `CLAUDE.md` | 兼容 Claude Code 的指令 | 代码规范、目录结构说明 |
| `SOUL.md` | Agent 人格和行为准则 | 沟通风格、决策偏好、底线原则 |
| `.cursorrules` | 兼容 Cursor 的规则 | IDE 行为偏好 |
| `.hermes.md` | Hermes 专属指令 | 特定于 Hermes 的工作流配置 |

### 4.2 AGENTS.md 最佳实践

如果你发现自己在重复同样的指令——“用 tab 不用空格”、“我们跑 pytest”、“API 地址是 /api/v2”——把它们写进 AGENTS.md，Agent 每次会话自动读取，零额外成本。

示例 `AGENTS.md` ：

```
markdown# 项目约定

- 测试框架：pytest，不用 unittest
- 代码风格：4 空格缩进，行宽 88
- API 版本：当前使用 v2，路径 /api/v2/
- 数据库：PostgreSQL 15+
- 包管理：uv，不用 pip
- 提交信息：Conventional Commits 格式
```

### 4.3 SOUL.md 最佳实践

SOUL.md 定义 Agent 的"人格"——沟通风格、决策偏好、底线。

示例 `SOUL.md` ：

```
markdown# SOUL

- 沟通：直接，不绕弯子，用中文
- 遇到不确定的事情：先问我，不要自己猜
- 代码审查：重点看安全和性能，格式问题忽略
- 拒绝：如果要求不合理，直接拒绝并说明原因
```

### 4.4 Context References

在对话中用 `@` 引用文件、文件夹、git diff 和 URL，Hermes 会自动展开内容：

```
@AGENTS.md 帮我看看这个架构设计是否符合项目约定
@src/auth/ 审查认证模块的代码
```

### 4.5 文件大小限制

| 限制 | 值 |
| --- | --- |
| 单文件最大字符数 | 20,000（约 7,000 tokens） |
| 头部截断比例 | 70% |
| 尾部截断比例 | 20% |
| 截断标记 | 10%（显示字符数并建议使用文件工具） |

超过 20,000 字符的文件会被自动截断，保留头尾关键信息。

## 五、日常使用最佳实践

### 5.1 启动与对话

```
bash# 交互式对话（默认模式）
hermes

# 单次查询，适合脚本调用
hermes chat -q "帮我分析这段代码的问题"

# 指定模型
hermes chat -m anthropic/claude-sonnet-4

# 预加载特定技能
hermes -s systematic-debugging -s writing-plans

# 恢复最近会话
hermes --continue

# 恢复指定会话
hermes --resume 20260526_143052_abc123
```

### 5.2 对话内的斜杠命令

最常用的几个：

| 命令 | 作用 |
| --- | --- |
| `/new` | 新建会话 |
| `/model` | 查看或切换模型 |
| `/tools` | 管理工具集 |
| `/skills` | 搜索、安装、管理技能 |
| `/usage` | 查看 token 使用量 |
| `/config` | 查看当前配置 |
| `/insights` | 使用分析 |
| `/compress` | 手动压缩上下文 |

### 5.3 工具集管理

工具集的开启/关闭用 `hermes tools` 命令：

```
bash# 交互式管理（推荐）
hermes tools

# 启用某个工具集
hermes tools enable web

# 禁用某个工具集
hermes tools disable browser
```

**注意：** 工具集变更后需要 `/reset` 或新建会话才能生效。这是为了保护 prompt 缓存——会话中途改工具会打断缓存命中。

### 5.4 多模型切换

Hermes 支持 20+ 个提供商，切换非常方便：

```
bash# 交互式选择
hermes model

# 命令行直接设置
hermes config set model.default anthropic/claude-sonnet-4

# 对话内临时切换
/model anthropic/claude-sonnet-4
```

推荐做法：日常用性价比高的模型（如 Claude Sonnet 4），复杂任务切到更强大的模型，简单查询用便宜的模型。

## 六、Memory（记忆）系统

Hermes 的持久记忆是核心亮点之一。

### 6.1 自动记忆

Agent 会在对话中自动保存以下信息：

- **用户画像**
	：名字、角色、偏好、沟通风格
- **环境信息**
	：操作系统、已安装工具、项目结构
- **工具特性**
	：某个工具的坑、特殊用法
- **约定和规范**
	：项目约定、API quirks、工作流偏好

### 6.2 记忆管理

```
bash# 查看/设置记忆
hermes memory status

# 关闭记忆
hermes config set memory.memory_enabled false
```

### 6.3 记忆的最佳用法

1. **主动纠正**
	——当 Agent 犯错时，直接说「记住，以后别这样」，它会把纠正存到记忆里
2. **环境发现**
	——Agent 发现你的项目约定、目录结构等会自动记录，下次不用重复说
3. **偏好沉淀**
	——沟通风格、代码风格、工具偏好等会被自动学习
4. **别存临时信息**
	——任务进度、PR 号、session 状态这些不要存到记忆里，它们很快过期

## 七、Session（会话）管理

### 7.1 浏览和搜索

```
bash# 列出最近会话
hermes sessions list

# 交互式选择器（推荐）
hermes sessions browse

# 导出会话
hermes sessions export ~/my-sessions.jsonl

# 重命名会话
hermes sessions rename <id> "我的项目名称"

# 清理旧会话
hermes sessions prune --older-than 30
```

### 7.2 会话搜索

在对话中使用 `session_search` 工具可以搜索过去的对话：

- **发现模式**
	： `session_search(query="auth refactor", limit=3)` — 搜索主题
- **滚动模式**
	：传入 `session_id` + `around_message_id` — 读取某段对话的完整上下文
- **浏览模式**
	：不传参数 — 浏览最近的会话列表

## 八、上下文压缩机制

这是 Hermes 解决上下文窗口问题的核心能力。很多 Agent 的做法是简单截断旧消息，但 Hermes 用的是结构化压缩。

### 8.1 双层压缩系统

Hermes 使用两层压缩机制：

| 层级 | 触发时机 | 作用 |
| --- | --- | --- |
| Agent 压缩层 | 上下文窗口使用率达 50% | 理解对话结构，保留语义连贯性 |
| Gateway 安全网 | 上下文窗口使用率达 85% | 防止溢出，兜底保护 |

两层故意错开——如果都设成 50%，每轮对话都会过早压缩。

### 8.2 压缩策略

- **压缩，不截断**
	——丢掉旧消息会丢失信息。Hermes 的压缩器理解对话结构，保留语义连贯性
- **渐进式披露**
	——Skills、工具、上下文文件都有元数据层，按需加载完整内容
- **预算作为一等概念**
	——迭代次数、token 数、时间，Agent 需要预算管理和压力警告
- **保留叙事连续性**
	——压缩后仍然保持故事线的完整

### 8.3 Prompt Caching

Hermes 利用 Anthropic prompt caching 来提升长对话的效率。当压缩触发时，缓存系统会：

- 保留最近的真实用户消息
- 压缩中间的工具调用历史
- 重新注入初始上下文

### 8.4 手动压缩

```
bash# 对话内手动触发
/compress

# 调整压缩配置
hermes config set compression.enabled true
hermes config set compression.threshold 0.50
hermes config set compression.target_ratio 0.20
```

## 九、Cron 定时任务

这是 Hermes 最实用的功能之一。

### 9.1 创建定时任务

```
bash# 每 30 分钟执行
hermes cron create "30m"

# 每天早上 9 点
hermes cron create "0 9 * * *"

# 每周一上午 9 点
hermes cron create "every monday 9am"
```

### 9.2 管理任务

```
bash# 列出所有任务
hermes cron list

# 编辑任务
hermes cron edit <job_id>

# 暂停/恢复
hermes cron pause <job_id>
hermes cron resume <job_id>

# 手动触发
hermes cron run <job_id>

# 删除任务
hermes cron remove <job_id>
```

### 9.3 实用场景

- **日报生成**
	：每天早上 9 点自动汇总昨天完成的工作
- **监控告警**
	：每 5 分钟检查磁盘/CPU/内存，超阈值发消息
- **内容更新**
	：定期更新 RSS 订阅源并生成摘要
- **技能维护**
	：定时检查和更新已安装的技能（ `openclaw-auto-updater` ）
- **链式任务**
	：Job A 收集数据 → Job B 处理 → Job C 推送通知（通过 `context_from` 串联）

### 9.4 高级用法

```
yaml# 指定每任务的模型
model: anthropic/claude-sonnet-4

# 预加载技能
skills: ["tavily-search", "tech-article-writing"]

# 限制工具集（减少 token 开销）
enabled_toolsets: ["web", "terminal", "file"]

# 脚本预运行收集数据
script: "scripts/check_disk.py"

# 纯脚本模式（不调用 LLM）
no_agent: true

# 工作目录（加载该目录的 AGENTS.md/CLAUDE.md）
workdir: "/path/to/project"
```

## 十、Profile（配置文件）系统

### 10.1 什么是 Profile

Profile 让你在同一台机器上运行多个 **完全独立** 的 Hermes 实例。每个实例有自己的：

- 配置（config.yaml）
- 技能（skills）
- 记忆（memory）
- 会话（sessions）
- API 密钥（.env）

### 10.2 使用场景

- **内容创作 profile**
	——安装内容生成相关的 skills，连接飞书/微信公众号
- **开发 profile**
	——安装开发相关的 skills，连接 GitHub
- **家庭自动化 profile**
	——连接智能家居设备
- **研究 profile**
	——安装论文搜索、数据分析 skills

### 10.3 操作命令

```
bash# 列出所有 profile
hermes profile list

# 创建新 profile
hermes profile create my-profile

# 从现有 profile 克隆
hermes profile create content-builder --clone dev-profile

# 切换 profile
hermes profile use content-builder

# 查看 profile 详情
hermes profile show my-profile
```

## 十一、Gateway（消息平台网关）

Hermes 可以连接 10+ 消息平台，让 Agent 随时在线。

### 11.1 支持的平台

| 平台 | 说明 |
| --- | --- |
| Telegram | 最成熟，推荐 |
| Discord | 支持 Bot 和 DM |
| Slack | 企业场景 |
| WhatsApp | 需要第三方提供商 |
| Signal | 隐私优先 |
| 飞书 | 国内团队协作 |
| 钉钉 | 国内企业 |
| Email | IMAP/SMTP |
| Matrix | 开源协议 |
| Home Assistant | 智能家居 |
| API Server | Open WebUI 等 |

### 11.2 启动网关

```
bash# 前台运行（调试用）
hermes gateway run

# 安装为后台服务
hermes gateway install

# 启动/停止/重启
hermes gateway start
hermes gateway stop
hermes gateway restart

# 查看状态
hermes gateway status

# 配置平台
hermes gateway setup
```

### 11.3 网关最佳实践

1. **安装为系统服务**
	—— `hermes gateway install` ，这样重启后自动运行
2. **设置 Home Channel**
	——在对话中用 `/sethome` 设置主消息通道
3. **SSH 断线保护**
	——如果通过 SSH 管理，开启 linger： `sudo loginctl enable-linger $USER`
4. **WSL2 用户注意**
	——需要在 `/etc/wsl.conf` 中设置 `systemd=true`

## 十二、Security（安全）最佳实践

### 12.1 命令审批

```
bash# 智能审批（推荐）——低风险命令自动放行，高风险仍需确认
hermes config set approvals.mode smart

# 手动审批（默认）——每次危险命令都确认
hermes config set approvals.mode manual

# 关闭审批（不推荐）
hermes config set approvals.mode off
```

### 12.2 密钥泄露保护

```
bash# 开启密钥自动脱敏
hermes config set security.redact_secrets true
```

开启后，Agent 在工具输出中看到 API Key、Token 等敏感信息会自动打码。

**注意：** 这个配置需要新会话才会生效，中途切换不生效——这是故意的，防止 LLM 自己改配置绕过保护。

### 12.3 网站屏蔽

```
bash# 在 config.yaml 中添加屏蔽列表
hermes config set security.website_blocklist "['bad-site.com', 'malicious.org']"
```

### 12.4 工具级隔离

通过 `hermes tools` 关闭不需要的工具集，比如在生产环境中关闭 `terminal` 和 `browser` ，只保留 `file` 和 `web` 。

## 十三、Kanban 多 Agent 协作看板

这是 Hermes 最强大的高级用法之一——用看板系统把多个 Profile（独立 Agent 实例）组织成一个协作团队。

### 13.1 什么是 Kanban

Hermes Kanban 是一个基于 SQLite 的持久化任务看板。你可以：

- 创建任务卡片，分配给不同的 Profile（相当于不同角色的 Agent）
- 设置任务依赖关系——子任务等父任务完成自动进入 ready 状态
- 跟踪任务状态：todo → ready → running → done / blocked
- 多个 Agent 并行工作，通过看板协调
- 完整的审计日志，所有操作持久化

### 13.2 什么时候用 Kanban

满足以下任一条件就用看板，否则用 `delegate_task` 或者直接回答：

- 需要多个 specialist（研究员 + 工程师 + 审稿人）
- 工作需要跨重启存活（长时间运行、重要任务）
- 用户可能中途介入（human-in-the-loop）
- 多个子任务可以并行执行
- 需要审查 / 迭代循环
- 审计追踪很重要

### 13.3 Orchestrator（编排者）工作模式

编排者的核心规则： **只分解和派发，不自己干活** 。

```
Step 0: 发现可用的 Profile（hermes profile list）
Step 1: 理解目标，画出任务依赖图
Step 2: 分解任务，每个 lane 对应一个 Profile
Step 3: 创建看板卡片，设置依赖关系
Step 4: 向用户报告创建了哪些任务
```

任务分解示例：

```
python# 独立研究任务，可以并行
t1 = kanban_create(
    title="成本对比分析",
    assignee="researcher",  # 研究角色的 Profile
)["task_id"]

t2 = kanban_create(
    title="性能基准测试",
    assignee="researcher",  # 同一个 Profile，并行执行
)["task_id"]

# 综合任务，依赖 t1 和 t2
t3 = kanban_create(
    title="综合推荐报告",
    assignee="analyst",
    parents=[t1, t2],  # 等两个研究都完成才启动
)["task_id"]
```

### 13.4 Worker（执行者）工作模式

Worker 的生命周期：

1. **Orient**
	— `kanban_show` 确认任务状态
2. **Work**
	— 在工作空间内执行实际工作
3. **Heartbeat**
	— 定期汇报进度（“epoch 12/50, loss 0.31”）
4. **Complete / Block**
	— 完成或阻塞等待

好的完成报告：

```
pythonkanban_complete(
    summary="限流器已交付 — 令牌桶算法，基于 user_id 键控，IP 作为备选，14 个测试通过",
    metadata={
        "changed_files": ["rate_limiter.py", "tests/test_rate_limiter.py"],
        "tests_run": 14,
        "tests_passed": 14,
        "decisions": ["user_id 优先，未认证请求回退到 IP"],
    },
)
```

代码类任务建议用 `kanban_block(reason="review-required: ...")` 而不是直接 complete，把代码变更详情写到评论里，等人工审查后再 unblock。

### 13.5 Dashboard 看板面板

Hermes 自带 Dashboard，提供以下能力：

- **实时状态**
	— 所有任务的当前状态、执行进度
- **Recovery 面板**
	— Worker 崩溃时的快速恢复操作：
- **Reclaim**
	— 立即中止运行中的 worker，重置为 ready
	- **Reassign**
	— 切换到另一个 Profile 重新执行
	- **Change profile model**
	— 修改 Profile 的模型配置后重试
- **告警标记**
	— 任务失败或异常时显示 ⚠ 标记
- **审计追踪**
	— 所有操作记录持久化，方便排查

### 13.6 常用命令

```
bash# 初始化看板
hermes kanban init

# 创建任务
hermes kanban create "任务标题" --assignee researcher

# 列出任务
hermes kanban list
hermes kanban list --status running

# 查看任务详情
hermes kanban show <task_id>

# 完成任务
hermes kanban complete <task_id> --summary "完成说明"

# 阻塞任务
hermes kanban block <task_id> "需要人工确认的决策"

# 解除阻塞
hermes kanban unblock <task_id>

# 追踪任务
hermes kanban tail <task_id>

# 归档旧任务
hermes kanban archive <task_id>
```

### 13.7 常见模式

| 模式 | 说明 |
| --- | --- |
| 扇出 + 扇入 | N 个研究任务并行 → 1 个综合任务汇总 |
| 并行实现 + 验证 | 实现者做修改，同时验证者确认配置 |
| 流水线 | 规划者 → 实现者 → 审查者，每步依赖上一步 |
| 同 Profile 队列 | 多个任务分给同一个 Profile，串行执行积累经验 |
| Human-in-the-loop | 任何任务可以随时 block 等待人工输入 |

### 13.8 避坑

- **不要编造 Profile 名称**
	——Dispatcher 对不存在的 assignee 静默失败，任务永远卡在 ready
- **不要把独立任务绑在一起**
	——两个独立结果要拆成两张卡
- **依赖关系别漏设**
	——用 `parents=[...]` 确保子任务不会在父任务完成前启动
- **不要在对话中用 delegate\_task 替代 kanban\_create**
	——delegate\_task 是会话内的短推理，kanban\_create 是跨会话的持久化协作

## 十四、高级技巧与隐藏用法

### 14.1 子代理（Delegate Task）

让 Agent 派生独立的子代理来并行工作：

- **单任务**
	：指定一个目标，子代理独立执行
- **批量并行**
	：最多 3 个子代理同时运行（可配置）
- **角色区分**
	： `leaf` （叶子节点，不能再派生）vs `orchestrator` （编排器，可以继续派生）
- **适用场景**
	：复杂的研究任务、代码审查、多文件重构

### 14.2 生成多个独立 Agent

```
bash# 一次性任务（fire-and-forget）
hermes chat -q "研究 GRPO 论文并写总结到 ~/research/grpo.md"

# 交互式 Agent（用 tmux）
tmux new-session -d -s agent1 'hermes'
# 等待启动后发消息
tmux send-keys -t agent1 'Build a FastAPI auth service' Enter
# 查看输出
tmux capture-pane -t agent1 -p
```

**适用场景** ：需要 Agent 长时间自主工作的情况，比如搭建整个项目、跑 CI/CD 配置。

### 14.3 MCP（Model Context Protocol）集成

```
bash# 添加 MCP 服务器
hermes mcp add my-server --command "npx -y @some/mcp-server"

# 列出已配置的服务器
hermes mcp list

# 测试连接
hermes mcp test my-server

# 选择工具
hermes mcp configure my-server
```

MCP 让 Hermes 可以接入外部的工具和服务，这是扩展能力的关键方式。

### 14.4 Webhook 事件驱动

```
bash# 创建 Webhook 路由
hermes webhook subscribe my-trigger

# 列出所有订阅
hermes webhook list

# 测试
hermes webhook test my-trigger
```

适合 CI/CD 管道触发、GitHub 事件通知、外部系统推送等场景。

### 14.5 上下文压缩

```
bash# 自动压缩（默认开启）
# 阈值：50% context 剩余时触发
# 目标：压缩到 20%

# 手动压缩
/compress

# 调整配置
hermes config set compression.enabled true
hermes config set compression.threshold 0.50
hermes config set compression.target_ratio 0.20
```

长对话时自动压缩可以保持上下文不溢出，同时保留关键信息。

### 14.6 实用技巧（来自官方文档和社区经验）

**提问时一次性给足上下文**

与其分三轮说明问题，不如一开始就把文件路径、错误信息、预期行为全写上。Agent 能直接解析 traceback，不用你解释格式。

```
帮我修 api/handlers.py 第 47 行的 TypeError——process_request() 从 parse_body() 收到了 None。
完整的 traceback 是：...
```

**让 Agent 用自己的工具**

不要试图在对话中帮 Agent 读文件——直接让它用工具。你说"这个文件在 src/auth/auth.py"，它会去读；你贴内容，它只能看到你选的那部分。

**用 AGENTS.md 代替重复说明**

如果你每次都在说"用 pytest"、“我们跑 black”、“API 在 /api/v2”——写进 AGENTS.md，零额外成本。

**Skill 的渐进式加载**

Skills 不是一次性加载全部内容。先通过 `skills_list()` 看到元数据，再 `skill_view(name)` 按需加载。这比把所有技能说明塞进 system prompt 省得多。

**Skill 的自进化**

Reddit 上一个 Hermes 资深用户的经验：每次做完一件事，让 Agent 把它保存为 skill。“一旦你成功走通一次，它就能变成可复用的 skill。之后这个能力就是你的了，不用每次重新教。”

**每月审查 Skill 库**

Agent 自己生成的 skill 存在 `~/.hermes/skills/` 。定期看看：

```
bash# 看最近创建的
ls -lt ~/.hermes/skills/ | head

# 审查具体 skill
cat ~/.hermes/skills/my-skill/SKILL.md
```

低质量或过时的 skill 可以归档或删除，保持 skill 库干净。

**本地模型也能用**

Hermes 支持连接 Ollama、LM Studio 等本地模型。适合不需要联网、对隐私要求高的场景。

**用 execute\_code 压缩多步骤流程**

`execute_code` 工具可以把多步骤工具调用链条压缩成单次推理调用。比如"搜索 → 下载 → 分析 → 生成报告"可以写成一个 Python 脚本，一次推理搞定。

## 十五、生产环境部署（VPS / Docker）

### 15.1 VPS 部署

如果你打算让 Hermes 7×24 在线，跑在 VPS 上比本地机器靠谱得多。以下是主流做法：

**方案 A：Docker 容器部署（推荐生产环境）**

Hermes 提供官方 Docker 镜像，沙箱化终端后端，Agent 执行的代码不直接访问宿主机。适合企业部署。

```
bash# 拉取镜像
docker pull nousresearch/hermes-agent

# 配置
docker run -d \
  --name hermes \
  -v ~/.hermes:/root/.hermes \
  -e DASHSCOPE_API_KEY=your_key \
  nousresearch/hermes-agent
```

**方案 B：VPS 一键部署**

部分 VPS 提供商（如 Hostinger）支持一键部署 Hermes Agent。选 Ubuntu 24.04 LTS，安装脚本自动拉取最新版本、创建虚拟环境、生成 starter config.yaml。

**方案 C：systemd 服务（长期运行）**

```
bash# 创建 systemd 服务文件
sudo tee /etc/systemd/system/hermes-gateway.service << 'EOF'
[Unit]
Description=Hermes Agent Gateway
After=network.target

[Service]
Type=simple
User=$USER
ExecStart=/path/to/hermes gateway run
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable hermes-gateway
sudo systemctl start hermes-gateway
```

### 15.2 Redis 调优（持久化记忆场景）

如果记忆使用 Redis 后端，建议：

```
bash# 持久化
appendonly yes
appendfsync everysec

# 内存限制
maxmemory 2gb
maxmemory-policy allkeys-lru
```

### 15.3 外部监控

用 UptimeRobot 等免费服务监控 Gateway：

```
bashURL: http://your-server:port/health
Method: GET
Interval: 5 minutes
Alert: Email or webhook on downtime
```

### 15.4 防火墙配置

```
bash# 开放网关端口（按需修改）
sudo ufw allow 8080/tcp

# 生产环境建议限制 IP
sudo ufw allow from 192.168.1.0/24 to any port 8080
```

## 十六、推荐配置清单

以下是一份经过验证的推荐配置：

```
yaml# config.yaml 推荐配置

# 模型
model:
  default: "anthropic/claude-sonnet-4"  # 日常主力模型
  context_length: 128000

# Agent 行为
agent:
  max_turns: 90  # 单轮最大交互次数

# 压缩
compression:
  enabled: true
  threshold: 0.50
  target_ratio: 0.20

# 显示
display:
  skin: "default"
  tool_progress: true
  show_reasoning: false  # 默认不显示推理过程，减少噪音
  show_cost: true  # 显示成本，控制开销

# 安全
security:
  redact_secrets: true  # 开启密钥脱敏
  tirith_enabled: false  # 按需开启

# 记忆
memory:
  memory_enabled: true
  user_profile_enabled: true

# 审批
approvals:
  mode: "smart"  # 智能审批，低风险自动放行
```

## 十七、常见问题与避坑指南

### Q1：改了配置/安装了新工具/新技能，但没生效？

**原因** ：Hermes 在会话启动时加载配置和工具集。

**解决** ：

- 对话内：输入 `/reset` 或 `/new` 重新开始会话
- 网关： `hermes gateway restart`
- CLI：退出后重新启动

### Q2：Gateway 频繁崩溃？

```
bash# 查看日志
grep -i "failed to send\|error" ~/.hermes/logs/gateway.log | tail -20

# 重置崩溃状态
systemctl --user reset-failed hermes-gateway
```

### Q3：Discord Bot 收不到消息？

必须启用 **Message Content Intent** ：Discord Developer Portal → Bot → Privileged Gateway Intents → 开启 Message Content Intent。

### Q4：Slack Bot 只在 DM 里工作？

需要订阅 `message.channels` 事件。否则 Bot 会忽略公共频道的消息。

### Q5：辅助模型（vision/compression/session\_search）不工作？

`auto` 模式找不到后端。需要设置 `OPENROUTER_API_KEY` 或 `GOOGLE_API_KEY` ，或者显式配置：

```
bashhermes config set auxiliary.vision.provider <your_provider>
hermes config set auxiliary.vision.model <model_name>
```

### Q6：技能安装后看不到？

```
bashhermes skills list          # 确认已安装
hermes skills config        # 检查平台启用状态
# 对话内显式加载
/skill <name>
```

### Q7：YOLO 模式（跳过所有确认）怎么用？

```
bash# 命令行参数
hermes --yolo

# 环境变量
export HERMES_YOLO_MODE=1

# 对话内
/yolo
```

**注意** ：YOLO 模式不会关闭密钥脱敏，两者是独立的。

## 十八、工作流示例

### 示例 1：用 Hermes 写技术文章

```
bash# 1. 启动对话，预加载相关技能
hermes -s tavily-search -s tech-article-writing -s humanizer

# 2. 搜索素材
> 帮我搜索关于 "Rust vs Go 性能对比" 的最新资料

# 3. 撰写文章
> 根据搜索结果，写一篇技术对比文章

# 4. 去 AI 味
> 用 humanizer 润色一下这篇文章

# 5. 保存
> 保存到 ~/articles/rust-vs-go.md
```

### 示例 2：用 Hermes 做代码审查

```
bash# 1. 启动对话，预加载审查技能
hermes -s github-code-review -s systematic-debugging

# 2. 指定要审查的 PR
> 帮我审查这个 PR：https://github.com/myorg/myrepo/pull/123

# 3. 生成审查报告
> 列出所有安全问题、性能问题和可能的 bug
```

### 示例 3：定时日报自动化

```
bash# 创建每天早上 9 点的日报任务
hermes cron create "0 9 * * *"

# 任务内容：搜索昨天的会话记录，生成工作总结，发送到飞书
```

## 十九、总结

Hermes Agent 不是那种装完就丢的工具。它的 skill 系统、持久记忆、profile 隔离，这些东西用一段时间后才会真正显出价值——每次遇到新坑、解决新问题，agent 会把这些经验沉淀下来，下一次不用再走弯路。

几条实在的建议：

1. 用 profile 把工作场景隔开。内容创作、开发、研究各搞一个，别混在一起
2. 解决过一次的问题，保存为 skill。这个习惯越早养成越省事
3. 记忆系统开着就好，agent 会自己学你的偏好和环境，不用你主动喂
4. cron 定时任务值得认真搞。日报、监控、维护、数据收集，这些放 cron 比手动靠谱得多
5. 安全配置别跳过。 `approvals.mode: smart` + `security.redact_secrets` 就够用了
6. 模型随时能换，别死守一个。简单查询用便宜的，复杂任务上强的，成本差很多

## 参考资料与来源

*本文档基于 Hermes Agent v2.1+ 编写，官方文档地址：https://hermes-agent.nousresearch.com/docs/*

本文内容基于以下来源整理：

#Hermes #HermesAgent

### 官方文档

- Hermes Agent 官方文档：https://hermes-agent.nousresearch.com/docs/
- Tips & Best Practices：https://hermes-agent.nousresearch.com/docs/guides/tips
- Context Files：https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files
- Context Compression and Caching：https://hermes-agent.nousresearch.com/docs/developer-guide/context-compression-and-caching
- Skills System：https://hermes-agent.nousresearch.com/docs/user-guide/features/skills
- Working with Skills：https://hermes-agent.nousresearch.com/docs/guides/work-with-skills
- Features Overview：https://hermes-agent.nousresearch.com/docs/user-guide/features/overview

### GitHub 仓库

- NousResearch/hermes-agent：https://github.com/NousResearch/hermes-agent — 源码及 Release Notes
- Issue #499: Context Compaction Quality Overhaul：https://github.com/NousResearch/hermes-agent/issues/499

### 社区讨论

- Reddit: Looking for Hermes best practices from serious users (r/hermesagent)：https://www.reddit.com/r/hermesagent/comments/1tlnmw3/
- Reddit: I Used Hermes Agent Setup Guide To Build A Better Agent：https://www.reddit.com/r/AISEOInsider/comments/1taamqq/

### 技术博客与分析

- How Hermes Agent Solves the Context Window Problem — Medium：https://medium.com/@maclarensg\_50191/how-hermes-agent-solves-the-context-window-problem-and-what-every-agent-builder-should-borrow-bf90071f4757
- Hermes Agent Guide for PMs: Setup + Workflows (2026)：https://www.news.aakashg.com/p/hermes-agent-guide
- Hermes Agent Tips: Configuration, Best Practices & Security — DreamSAICanBuy：https://dreamsaicanbuy.com/blog/hermes-agent-tips
- How to Build a Self-Hosted AI Agent (2026 Stack Guide — PetronellaTech)：https://petronellatech.com/blog/hermes-agent-ai-guide
- Context Compression in AI Agents: Hermes vs Claude Code — Mem0：https://mem0.ai/blog/how-hermes-and-claude-handle-context-compression-in-real-production-agents-(and-what-you-should-extract
- Hermes Agent Deep Dive & Build-Your-Own Guide — Dev.to：https://dev.to/truongpx396/hermes-agent-deep-dive-build-your-own-guide-1pcc

### 部署与运维指南

- How to Deploy Hermes Agent on a VPS in Under an Hour — MindStudio：https://www.mindstudio.ai/blog/how-to-deploy-hermes-agent-vps-under-one-hour-step-by-step-docker-setup-guide
- 3 Ways to Deploy Hermes Agent on the Cloud — Tencent Cloud：https://www.tencentcloud.com/techpedia/144041
- Your Complete Hermes Agent Deployment Roadmap — Tencent Cloud：https://www.tencentcloud.com/techpedia/144037

### 视频教程

- Hermes Agent Full Tutorial for Beginners — Tech With Tim (YouTube)：https://www.youtube.com/watch?v=1ve4Atbqmoo
- Full Hermes Agent Setup Tutorial: Step-by-Step Walkthrough (YouTube)：https://www.youtube.com/watch?v=uycgV-eulGE
- Hermes Agent: The Ultimate Beginner’s Guide (YouTube)：https://www.youtube.com/watch?v=CwPUOVUdApE
- Full Hermes Agent Set-Up For Beginners in 2026 (YouTube)：https://www.youtube.com/watch?v=w4xOiuBQHKA

### 内部源码

- Hermes Agent 107+ 内置技能库（ `~/.hermes/profiles/content-builder/skills/` ），包括 `hermes-agent` 、 `kanban-worker` 、 `kanban-orchestrator` 、 `humanizer` 、 `tech-article-writing` 等技能的 SKILL.md 文件

AI · 目录

继续滑动看下一个

坚强粑粑

向上滑动看下一个