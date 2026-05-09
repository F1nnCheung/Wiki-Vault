AI 的探索之旅 *2026年5月8日 22:03*

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/l3tcFSYBduFtn3pvxcGVibodia68TYMpctMVpiabI44JuBCHHoLGD60EWA2KyEgSWeDjF2NibpZlA7m6SKz8O53U7xKcnUybvKZnlroV2D6uOKk/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

**在最近的 Hermes Agent 更新中多 Agent 的内容更新越来越多，这也是一个趋势**

在之前大部分人把所有任务都塞给一个 Agent，API 密钥、记忆、会话全混在一起，上下文里夹着许多聊天记录，Agent 的记忆库被日常琐事污染。

其实 Hermes 中有一个 Profile 机制可以让你在同一台机器上跑多个完全独立的 Agent，各自拥有独立的配置、密钥、记忆、会话、技能库和状态数据库。

直接开始

## 三步搭建你的多 Agent 体系

### 1️⃣ 创建专用 Profile

终端执行：

```
hermes profile create "coder" --clone
```

继承当前的 `config.yaml` 、`.env` 和 `SOUL.md` ，但记忆和会话完全隔离。

- 想要不同的 API 密钥？改 `~/.hermes/profiles/coder/.env`
- 想要不同的人设？改对应的 `SOUL.md`

### 2️⃣ 为每个 Profile 定制身份

编辑各自的 `SOUL.md` ，明确这个 Agent 的专长边界：

- **编码助手** ：专注代码审查和重构
- **研究 Agent** ：只处理文献检索和知识整理
- **个人助理** ：负责日程和提醒

职责清晰，上下文不串。

### 3️⃣ 直接调用，各司其职

Profile 创建后自动生成同名命令：

```
coder chat coder setup coder gateway start
```

或者用 `-p` 标志切换：

```
hermes -p research chat
```

想设置默认 Profile 就用：

```
hermes profile use coder
```

之后所有 `hermes` 命令自动指向 coder 这个 Profile。

## 进阶玩法

### 独立的 Gateway 进程

每个 Profile 可以跑独立的 Gateway 进程，配置不同的 Telegram/Discord/Slack bot token.

在 `.env` 里设置各自的 token，系统会自动检测冲突防止误用。

### 指定工作目录

想让某个 Profile 默认工作在特定项目目录，就在它的 `config.yaml` 里设置：

```
terminal:   cwd: /absolute/path/to/project
```

### 完整快照备份

需要完整快照（包括所有记忆和会话历史）就用：

```
hermes profile create backup --clone-all
```

### 干净删除

删除 Profile 也很干净：

```
hermes profile delete old-bot
```

会停止 Gateway、移除服务、删除命令别名和所有数据。

## 工作原理与目录结构

### Profile 的目录组织

每个 Profile 都是一个完全独立的 Hermes 主目录。来看一个实际的目录结构：

```
~/.hermes/ ├── config.yaml          # 默认 Profile 的配置 ├── .env                 # 默认 Profile 的环境变量 ├── SOUL.md              # 默认 Profile 的人格定义 ├── memories/            # 默认 Profile 的记忆库 ├── sessions/            # 默认 Profile 的会话历史 ├── skills/              # 默认 Profile 的技能库 └── profiles/     ├── coder/           # 编码助手 Profile     │   ├── config.yaml     │   ├── .env     │   ├── SOUL.md     │   ├── memories/     │   ├── sessions/     │   ├── skills/     │   └── state.db     ├── research/        # 研究助手 Profile     │   ├── config.yaml     │   ├── .env     │   ├── SOUL.md     │   ├── memories/     │   ├── sessions/     │   ├── skills/     │   └── state.db     └── personal/        # 个人助理 Profile         ├── config.yaml         ├── .env         ├── SOUL.md         ├── memories/         ├── sessions/         ├── skills/         └── state.db
```

### 隔离机制解析

**本质上** ，Profile 通过 `HERMES_HOME` 环境变量实现完全隔离。

当你运行 `coder chat` 时，系统自动设置 `HERMES_HOME=~/.hermes/profiles/coder` ，之后所有的文件读写操作都限定在这个目录内：

- **config.yaml** ：模型配置、终端设置、工具权限
- **.env** ：API 密钥、bot token、第三方服务凭证
- **SOUL.md** ：Agent 的人格、专长、行为准则
- **memories/** ：长期记忆存储，不同 Profile 互不干扰
- **sessions/** ：对话历史记录，各自独立
- **skills/** ：自定义技能脚本，可以针对不同场景定制
- **state.db** ：运行时状态数据库，包括 cron 任务、gateway 状态等

这种设计的好处是： **编码助手不会记得你昨天和研究 Agent 讨论的论文，研究 Agent 也看不到你让个人助理设置的私人提醒** 。每个 Agent 只知道它该知道的事情。

默认 Profile 就是 `~/.hermes` 本身，现有安装无需迁移。

---

**多任务并行处理已经成为 AI Agent 的核心趋势。**

当你需要同时进行代码开发、文献研究、内容创作时，单个 Agent 的串行处理方式早已跟不上节奏。Profile 机制配合 Hermes 的看板功能，让你可以构建一个真正的多角色 Agent 团队：编码助手负责技术实现，研究 Agent 持续追踪最新论文，内容 Agent 同步输出文档——每个 Agent 在各自的看板上推进任务，互不干扰又协同高效。

这不是未来，这是现在就能用上的生产力革命。

Hermes Agent · 目录

作者提示: 个人观点，仅供参考

继续滑动看下一个

从AI到Web3的探索之旅

向上滑动看下一个