远飞哥 *2026年5月7日 23:43*

> 字数 1034，阅读大约需 6 分钟

👇关注我，后续继续分享更多的 AI Agent、技术开发相关的文章.

最近hermes agent在更新后有了看板Kanban功能就体验了下，其实 `Hermes Agent 看板` 是一个多智能体任务编排系统，本质是一个持久化的 SQLite 任务队列 + 调度器。

## 核心思路

不是一个 agent 干所有事，而是把大任务拆成小任务，分派给不同的「专业 agent 角色」，各司其职、串并行执行,搭建完以后就是以下的流程:

```
你在 QQ/微信上给Hermes指令
  ↓
Hermes拆任务，用 kanban_create 创建子任务
  ↓
dispatcher 60 秒内唤醒对应的 profile
  ↓
researcher 独立跑 → kanban_complete
writer 独立跑 → kanban_complete
  ↓
Hermes看板上一看，全完成了,通知你📢
```

## 什么时候用

• 需要多个专业角色协作  
• 任务可能跑很久或者需要崩溃后恢复  
• 你想中间插一脚改需求  
• 有并行子任务能加速  
• 需要完整的审计轨迹

## 怎么玩

首先我们理解下hermes kanban有哪些核心的组件,然后再创建 `agent profile`.

## 关键组件

| 组件 | 职责 |
| --- | --- |
| **Orchestrator** | 分解目标、创建任务、路由给合适角色 |
| **Dispatcher** | 常驻 Gateway，定期扫描看板，拉起 ready 任务 |
| **Worker** | 独立进程执行具体任务，拥有独立上下文和工具集, 领一个任务，干活，写 handoff 总结，完成 |
| **Kanban Board** | 任务持久化到 SQLite，跟踪每个任务的 todo → ready → in\_progress → done/blocked |

## Agent Profile

我们需要创建每个子 `agent profile` ，并对它们进行技能的配置，比如下边我们创建一个researcher调研agent,需要搜索、总结能力:

```
#创建 profile 
hermes profile create researcher

#装技能 
hermes skills install web-search, hermes skills install summarize

# 配模型 — 每个 profile 可以有自己的模型,根据需求来适配模型
hermes profile create researcher

# 给 researcher 装上搜索和总结的能力
hermes skills install devops/kanban-worker  
hermes -p researcher skills install web-search
hermes -p researcher skills install summarize
```

唯一的遗憾是目前 hermes kanban没有webui来看当前任务或子agent处理的进度,只能通过以下方式来查看.

### 持久化 —— 不怕崩溃，不怕重启

所有看板数据存储在 `~/.hermes/kanban.db` （SQLite）。这意味着：

- • Agent 进程崩溃 → 任务进度不丢
- • 电脑重启 → 继续跑
- • 跨天/周的任务 → 无缝衔接
```
hermes kanban list          # 查看所有任务
hermes kanban stats         # 按状态统计
hermes kanban tail <id>     # 实时跟踪某个任务
```

对于长周期项目来说，这个特性是 **刚性需求** 。你不会希望一个跑了 3 天的调研任务因为终端意外关闭而付诸东流。

### 人工介入 —— Human-in-the-Loop

完全自动化的多 Agent 流程看起来很美好，但现实世界中，总有一些节点需要 **人的判断** 。

Kanban 的 `kanban_block()` 机制提供了这个能力：

```
T3: 综合分析
   │
   ├── 发现数据矛盾
   │
   └── block("两篇论文的结论相反，需要确认采纳哪篇")
         │
         ↑ 用户看到任务被阻塞
         │
         └── /unblock 用 2025 年的最新论文数据
               │
         Dispatcher 重新拉起 T3
               │
         T3 拿到用户反馈 → 继续执行
```

#### 实现原理

1. 1\. Worker 调用 `kanban_block(reason="...")` → 任务状态变为 `blocked`
2. 2\. 用户通过任意渠道输入 `/unblock` + 指令
3. 3\. Dispatcher 重新拉起 Worker，注入用户反馈
4. 4\. Worker 读取反馈后继续执行

这个能力让 Kanban 工作流在 **自动化和人工决策** 之间找到了一个平衡点——简单、不打断主流程、但关键时刻有人拍板。

## 后记

使用 Kanban 的门槛比 `delegate_task` 高，但当你面对的是"需要 3 个研究员并行搜索 → 1 个分析师汇总 → 1 个写手成稿 → CTO 审阅"这样的真实工作流时，Kanban 的持久化、依赖编排和角色系统会让整个过程的可靠性和可控性上一个数量级。

---

*本文基于 Hermes Agent 实际架构整理。如果你正在搭建自己的多 Agent 系统，希望这里的经验能帮你少踩几个坑。*

👇关注我，后续继续分享更多的 AI Agent、技术开发相关的文章.

**微信扫一扫赞赏作者**

AI · 目录

作者提示: 个人观点，仅供参考

阅读原文

继续滑动看下一个

飞哥的技术与烟火

向上滑动看下一个