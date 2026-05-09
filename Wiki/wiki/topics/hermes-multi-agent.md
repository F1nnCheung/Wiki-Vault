---
title: Hermes 多 Agent 团队搭建指南
type: topic
tags: [hermes-agent, multi-agent, kanban, profile, task-orchestration]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/Hemmers/Hermes Agent 多角色团队搭建指南.md
  - raw/articles/Hemmers/Hermes(爱马仕)：如何搭建多Agent(智能体)任务编排系统.md
  - raw/articles/Hemmers/使用Hermes开发多智能体的实践及流程.md
related:
  - entities/hermes-agent.md
  - topics/hermes-agent-guide.md
  - topics/hermes-configuration.md
  - topics/hermes-workspace-setup.md
---

# Hermes 多 Agent 团队搭建指南

Hermes Agent 支持在同一台机器上运行多个完全独立的 Agent 实例，各自拥有独立的配置、密钥、记忆、会话和技能。v0.13.0 后更引入了 Kanban 看板系统，实现了 Orchestrator/Dispatcher/Worker/Board 四角色协作的任务编排体系。

> **核心思路**：不是让一个 Agent 干所有事，而是把大任务拆成小任务，分派给不同的专业角色，各司其职、串并行执行。

## 一、Profile 机制：多 Agent 的基础

Profile 是 Hermes 实现多 Agent 隔离的核心机制。每个 Profile 是一个完全独立的 Hermes 主目录。

### 目录隔离结构

```
~/.hermes/
├── config.yaml          # 默认 Profile
├── .env
├── SOUL.md
├── memories/
├── sessions/
├── skills/
└── profiles/
    ├── coder/           # 编码助手
    │   ├── config.yaml
    │   ├── .env
    │   ├── SOUL.md
    │   ├── memories/
    │   ├── sessions/
    │   ├── skills/
    │   └── state.db
    ├── research/        # 研究助手
    └── personal/        # 个人助理
```

### 隔离原理

通过 `HERMES_HOME` 环境变量实现完全隔离。运行 `coder chat` 时，系统自动设置 `HERMES_HOME=~/.hermes/profiles/coder`，所有文件读写操作限定在该目录内。

**隔离内容包括**：
- **config.yaml** — 模型配置、终端设置、工具权限
- **.env** — API 密钥、Bot Token
- **SOUL.md** — 人格、专长、行为准则
- **memories/** — 长期记忆，互不干扰
- **sessions/** — 对话历史，各自独立
- **skills/** — 自定义技能脚本
- **state.db** — 运行时状态（Cron 任务、Gateway 状态等）

### 创建与管理

```bash
# 创建并克隆当前配置
hermes profile create "coder" --clone

# 完整快照备份（含记忆和会话）
hermes profile create "backup" --clone-all

# 设为默认 Profile
hermes profile use coder

# 用 -p 标志临时切换
hermes -p research chat

# 删除 Profile（停止 Gateway、移除服务、删除所有数据）
hermes profile delete old-bot
```

## 二、Profile 角色配置

### 定制 SOUL.md

每个 Profile 的 SOUL.md 应明确定义该 Agent 的专长边界：

**编码助手（coder）**：
- 专注代码审查和重构
- 遵循最佳实践，注重可读性和可维护性
- 提供可执行方案，不空谈理论

**研究 Agent（research）**：
- 只处理文献检索和知识整理
- 输出结构化摘要，标注信息来源

**个人助理（personal）**：
- 负责日程和提醒
- 记住用户偏好和习惯

### 独立 Gateway 进程

每个 Profile 可跑独立的 Gateway 进程，配置不同的 Telegram/Discord/Slack Bot Token。系统自动检测冲突防止误用。

```bash
coder gateway start
research gateway start
```

### 指定工作目录

在 Profile 的 `config.yaml` 中设置：

```yaml
terminal:
  cwd: /absolute/path/to/project
```

## 三、多 Agent Kanban：任务编排系统

v0.13.0 引入的 Kanban 系统本质上是一个持久化的 SQLite 任务队列 + 调度器，用于多智能体任务编排。

### 四角色架构

| 组件 | 职责 |
|------|------|
| **Orchestrator** | 分解目标、创建任务、路由给合适角色 |
| **Dispatcher** | 常驻 Gateway，定期扫描看板，拉起 ready 任务（默认 60 秒扫描） |
| **Worker** | 独立进程执行具体任务，独立上下文和工具集 |
| **Kanban Board** | 任务持久化到 SQLite（`~/.hermes/kanban.db`），跟踪状态流转 |

### 状态流转

```
triage → todo → ready → in_progress → done
                              ↓
                          blocked（可人工介入）
```

### 工作流程

```
用户发出指令
  ↓
Orchestrator 拆任务，kanban_create 创建子任务
  ↓
Dispatcher 60 秒内唤醒对应 Profile
  ↓
researcher 独立跑 → kanban_complete
writer 独立跑 → kanban_complete
  ↓
全部完成 → 通知用户
```

### 持久化 —— 不怕崩溃

所有看板数据存储在 `~/.hermes/kanban.db`（SQLite）：
- Agent 进程崩溃 → 任务进度不丢
- 电脑重启 → 继续跑
- 跨天/周的任务 → 无缝衔接

```bash
hermes kanban list          # 查看所有任务
hermes kanban stats         # 按状态统计
hermes kanban tail <id>     # 实时跟踪某个任务
```

### Human-in-the-Loop 人工介入

```bash
# Agent 遇到无法判断的节点，调用 kanban_block
kanban_block(reason="两篇论文的结论相反，需要确认采纳哪篇")

# 用户通过任意渠道输入 /unblock + 指令
/unblock 用 2025 年的最新论文数据
```

Worker 重新拉起，注入用户反馈后继续执行。在自动化和人工决策之间找到平衡。

## 四、实战案例：双 Agent 协同开发

### 角色分工

- **default** — 项目经理/架构师：理解需求、拆解任务、分派子 Agent、审查输出
- **coding** — 编码专家：代码编写、调试、修复

### default 的 SOUL.md 关键配置

```markdown
# 身份定位
1. 接收用户任务，根据任务类型分配给相应专家 Agent
2. 代码类任务分配给 coding agent
3. 作为资深全栈代码审查工程师，审查 coding 的代码质量

# 工作流程
1. 收到用户任务 → 判断属于哪个专家的能力范围
2. 等待所有专家返回结果
3. 审查 coding agent 的代码质量，有问题要求修改
4. 反复修改不超过 7 次
5. 汇总结果回复用户，注明各部分由哪个专家完成
```

### coding 的 SOUL.md 关键配置

```markdown
# 核心人格
- 务实的资深工程师，更看重准确性和实际可行性
- 沟通风格：简洁直接，避免废话
- 专业领域：前后端开发、Web 开发、AI 应用、自动化流程

# 禁忌
- 不要过度道歉或客套
- 不要提供没有验证的信息
- 不要忽略安全风险
```

### 实测效果

**任务**：爬取 Palantir 公司过去 24 小时的新闻，生成带摘要和链接的 Markdown 简报，每天定时执行。

**结果**：
- 总耗时：12 分 56 秒
- Token 消耗：56.8K
- 产出：611 行 Python 爬虫脚本（纯标准库，零依赖）
- default 发现 1 个排序 Bug（日期字典序）和 2 处规范问题，coding 完成修复
- 定时任务配置为每天北京时间 9:00 自动执行

### Agent 协作模式

1. **规划阶段（default）**：拆解为四个子任务（数据采集、内容精选、简报生成、定时调度）
2. **编码阶段（coding）**：编写完整脚本
3. **代码审查（default → coding）**：发现问题，要求修复
4. **修复验证**：coding 修复，default 复审通过
5. **定时调度**：配置 Cron 自动执行

## 五、什么时候用

| 场景 | 方案 |
|------|------|
| 单个简单任务 | 单 Agent 直接执行 |
| 需要多个专业角色协作 | Profile + delegate_task |
| 任务可能跑很久或需崩溃恢复 | Kanban（持久化到 SQLite） |
| 需要中间改需求 | Kanban + kanban_block/unblock |
| 有并行子任务能加速 | Kanban（多 Worker 并行） |
| 需要完整审计轨迹 | Kanban |

## 六、注意事项

- Kanban 的使用门槛比 `delegate_task` 高，适合面对复杂多步骤工作流
- 每个 Profile 的 SOUL.md 应职责清晰、边界明确
- 记忆需要定期清理：旧路径过期、旧工具不再用、规则只适合旧版本
- Skill 堆积不维护本身会成为干扰
- 给 Agent 反馈越具体，它改进越准确
