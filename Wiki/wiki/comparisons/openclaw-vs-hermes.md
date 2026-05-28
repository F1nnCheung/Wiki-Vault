---
title: OpenClaw vs Hermes 深度对比
type: comparison
tags: [openclaw, hermes-agent, agent, comparison, architecture]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/OpenClaw/【万字】OpenClaw vs Hermes：一文深入拆解两大 Agent 框架.md
  - raw/articles/OpenClaw/OpenClaw vs Hermes：拆解 Hermes Agent 五层架构.md
related:
  - entities/openclaw.md
  - entities/hermes-agent.md
  - topics/hermes-architecture-deep-dive.md
  - concepts/agent-self-evolution.md
  - concepts/agent-memory-systems.md
  - concepts/agent-context-compression.md
---

# OpenClaw vs Hermes 深度对比

两个 Agent 框架回答的根本问题不同，导致架构设计走向了完全不同的方向：**OpenClaw 关注"怎么让 Agent 安全可靠地执行任务"，Hermes 关注"Agent 怎么才能越来越强"。**

## 核心差异一览

| 维度 | Hermes Agent | OpenClaw |
|------|-------------|----------|
| **核心问题** | Agent 怎么才能越来越强？ | 怎么让 Agent 安全可靠地执行任务？ |
| **语言** | Python | TypeScript |
| **技能/插件** | Agent 自己创建 Markdown 技能文件 | Plugin SDK，manifest-first，严格边界 |
| **记忆系统** | 三层：内置 + 外部提供商 + 会话搜索 | 单插件槽位，可替换 |
| **上下文压缩** | 压中间，保护两端，迭代摘要 | 压最老轮次，保留最近，归档原始数据 |
| **安全模型** | 智能审批（辅助模型判断风险） | 10+ 安全模块，默认安全 |
| **执行环境** | 6 种后端（含无服务器） | 3 种后端（偏安全沙箱） |
| **国内平台** | 飞书/钉钉/企业微信/微信 原生支持 | 飞书/QQ 扩展支持 |
| **研究能力** | 内置 RL 训练工具链 | 纯产品，无训练能力 |

## 一、设计哲学的根本分歧

### OpenClaw：安全优先

OpenClaw 的设计原则是 **"默认安全，高权限需显式声明"**。它配备 10+ 安全审计模块、危险工具白名单、沙箱隔离，是工程实践的产物。

多层审批机制（safe-bin、allowlist、执行审批）+ Docker 沙箱隔离 + 审计系统，在策略层面做限制。执行方式支持本地、Docker、SSH 远程沙箱三种，整体偏生产环境设计。

### Hermes：成长优先

Hermes 的设计原则是 **"从经验中学习，越用越强"**。它的核心机制是[[../concepts/agent-self-evolution|自进化闭环]]：

```
经验 → 技能 → 改进 → 知识持久化
```

安全方面走的是"智能审批"路线——用便宜辅助模型判断命令风险级别，低风险自动通过，高风险才需用户确认。但这种做法本身引入了新的信任问题：辅助模型判断不准怎么办？

### 现实判断

目前 Agent 还没有趋于成熟，在执行任务的稳定性和安全性上都还有很大进步空间。现阶段更多是**范式探索**而非**完全生产架构**。基于此：

- 做工程研究 → 看 OpenClaw（安全机制、分层架构值得学习）
- 快速探索/个人使用 → Hermes 更灵活、更"聪明"
- 企业环境/安全合规 → OpenClaw 更让人放心

## 二、学习闭环 vs 预定义技能

这是两个项目最核心的差异点。详见 [[../concepts/agent-self-evolution|Agent 自进化]]。

| 维度 | OpenClaw | Hermes |
|------|----------|--------|
| 创建方式 | 人工/开发者编写 | Agent 自动提取 + 人工可编辑 |
| 更新机制 | 人工维护 | Agent 自主判断是否更新 |
| 存储形式 | 结构化定义 | Markdown 文件 |
| 设计出发点 | 标准化、可控 | 自我进化、持续学习 |

**OpenClaw**：Skills 是预定义的任务流程描述，定位是"给 Agent 的操作手册"，Skills 库极其丰富（5700+ 社区 Skill），人和 Agent 都能查看。

**Hermes**：Skills 是 Agent 自己写的 Markdown 文件，放在 `~/.hermes/skills/`，不需要编译、注册、审批。社区 `optional-skills/` 有 40+ 个技能包，分 13 个类别。

**关键问题**：Hermes 的自进化完全依赖 prompt 引导，没有硬编码的自动提取逻辑。三层提示词分工：
- 第一层：告诉 Agent 什么时候该创建技能
- 第二层：列出五条创建条件和三条更新条件
- 第三层：督促 Agent 持续改进

> ⚠️ 争议：完全依赖 prompt 引导 Agent 自己判断是否沉淀技能，会不会跑偏？答案是"肯定不会每次都正确，大概率会有跑偏的时候"。但设计者显然认为大模型的指令跟随能力足够强。

## 三、记忆系统对比

详见 [[../concepts/agent-memory-systems|Agent 记忆系统设计]]。

| 维度 | Hermes | OpenClaw |
|------|--------|----------|
| 架构 | 三层分离 | 单插件槽位 |
| 内置记忆 | MEMORY.md (2200字符) + USER.md (1375字符) | 插件实现 |
| 外部记忆 | 8 个 Provider（Honcho/Mem0/Hindsight等） | 可替换插件 |
| 会话搜索 | FTS5 + LLM 摘要（session_search） | 直接丢给主模型判断 |
| 记忆注入 | 会话启动时冻结快照（为前缀缓存） | 按需 |

**Hermes 的记忆设计亮点**：
- **冻结快照**：记忆在会话开始时注入，会话期间不变。通过工具写入的记忆立刻落盘，但系统提示词快照不变，下次新会话才刷新。这是用一致性换性能——每轮写记忆都改系统提示词，前缀缓存就没法命中。
- **三层分工**：内置记忆（环境/偏好）→ 外部 Provider（长期模式提取）→ 会话搜索（按需检索历史）
- **session_search 流程**：FTS5 全文搜索 → 匹配消息按会话分组 → 取匹配点前后约 10 万字符 → 便宜辅助模型做摘要 → 返回摘要而非原始对话

**OpenClaw 的记忆设计**：把记忆当作"特殊插件"统一管理，同一时间只激活一个记忆插件，约束强、不易失控。但它关注的是"记忆怎么接进系统才不破坏稳定性"，至于"Agent 怎么靠记忆越来越像人"，这个权限交给了开发者。

## 四、上下文压缩策略

详见 [[../concepts/agent-context-compression|Agent 上下文压缩]]。

| 维度 | Hermes | OpenClaw |
|------|--------|----------|
| 压缩位置 | 保护两端，压缩中间 | 从最老轮次开始压 |
| 摘要方式 | 迭代摘要（增量更新） | LLM 提取摘要 |
| 归档策略 | Session 链（parent_session_id） | 快照归档到 archive 路径 |
| 缓存优化 | 确定性排序、空格规范化、cache boundary marker | 头部稳定 → 前缀缓存命中 |

**Hermes** 的压缩策略更精细：
1. 先裁旧工具输出（不调 LLM）→ 很多时候这一步就够了
2. 保护头部（system prompt + 前 3 条消息）
3. 保护尾部按 token 预算（threshold_tokens × 20%）
4. 中间用便宜模型生成结构化摘要（`## 已解决的问题` / `## 待决问题`）
5. 二次压缩在已有摘要上增量更新

**上下文压缩后的数据不丢**：Hermes 的做法是每次压缩时开新 session，`parent_session_id` 指回旧 session，形成 session 链。原始对话完整保留在 SQLite，FTS5 全文可搜。

## 五、安全模型

**这是所有模块里面差距最大的一个。**

**OpenClaw**：默认安全原则。有专门的 `SECURITY.md` 和漏洞响应流程，安全测试覆盖全。10+ 安全审计模块、危险工具白名单、多层审批。

**Hermes**：智能审批。用便宜辅助模型判断命令风险级别：
```
risk_level = cheap_model.evaluate(command)
if risk_level == "low": 自动通过
else: 需用户确认
```
另有危险命令检测（rm -rf、sudo、chmod）、上下文注入防护（提示注入、不可见 Unicode 字符、凭证外泄）。

> ⚠️ 矛盾：用辅助模型做风险判断本身就引入了新的信任问题——辅助模型如果判断不准怎么办？源码中未见对辅助模型判断的检查机制。

## 六、执行环境

| 维度 | Hermes | OpenClaw |
|------|--------|----------|
| 后端数量 | 6 种 | 3 种 |
| 设计取向 | 灵活切换，按需使用 | 安全沙箱，隔离优先 |
| 统一抽象 | `BaseEnvironment.execute()` | 多层审批包裹 |

Hermes 支持 Daytona（沙盒+生命周期管理，支持 stop/resume 省资源）、Modal（按需启动，文件系统快照保存状态）等多种后端。所有执行环境收敛到 `BaseEnvironment.execute()` 统一接口，切换只需改配置。

## 七、子 Agent 系统

两个项目都支持任务委派，设计原则一致："父 Agent 只需要结果，上下文窗口不该被细节塞满。"

| 维度 | Hermes | OpenClaw |
|------|--------|----------|
| 协议 | Delegate Tool（内置） | ACP（Agent Client Protocol） |
| 最大深度 | 1 层（父→子） | 可配置 |
| 子 Agent 迭代预算 | 50 轮 | 取决于实现 |
| 工具黑名单 | 5 个（防递归/反问/写记忆/发消息/写脚本） | HTTP 端口默认拒绝 |
| 级联中断 | 30 秒心跳，父停子停 | 取决于实现 |
| 并发上限 | 3 个 | 取决于实现 |

Hermes 子 Agent 被禁用的 5 个工具：
- `delegate_task`：防套娃
- `clarify`：子 Agent 不能反问用户
- `memory`：防一次临时委托污染共享记忆
- `send_message`：对外沟通只能经由父 Agent
- `execute_code`：子 Agent 定位是逐步推理，不该用 PTC 折叠

## 八、国内生态

Hermes 在中国生态上优势明显：
- **消息平台**：飞书、钉钉、企业微信都有 Gateway 原生支持（`feishu.py`、`dingtalk.py`、`wecom.py`）
- **微信**：通过腾讯官方 iLink Bot API 实现，不需逆向协议
- **模型**：通过 models.dev 集成 4000+ 模型元数据，含智谱、月之暗面、MiniMax

OpenClaw 通过扩展插件支持飞书和 QQ 机器人，缺钉钉、企业微信和个人微信的原生支持。

## 九、选型建议

```
安全合规是硬要求 → 选 OpenClaw
想让 Agent 自己学习改进 → 选 Hermes
消息平台要覆盖最广的 → OpenClaw 支持 25+ 渠道
主力用飞书/钉钉/企业微信 → Hermes 三者原生支持
做 RL 训练研究 → 只有 Hermes 有工具链
想低成本 24 小时跑 → Hermes 无服务器后端更合适
TypeScript 技术栈 → OpenClaw，Python → Hermes
```

**一句话总结**：从整体设计来说，Hermes 非常迎合小白用户（灵活、自进化、多平台），而 OpenClaw 想做生产级平台（安全、稳定、可扩展）——但现阶段 Agent 整体还不成熟，两者都偏探索性质。
