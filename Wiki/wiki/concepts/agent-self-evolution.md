---
title: Agent 自进化
type: concept
tags: [agent, self-evolution, skills, learning-loop, hermes-agent]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/OpenClaw/【万字】OpenClaw vs Hermes：一文深入拆解两大 Agent 框架.md
  - raw/articles/OpenClaw/OpenClaw vs Hermes：拆解 Hermes Agent 五层架构.md
related:
  - comparisons/openclaw-vs-hermes.md
  - concepts/agent-memory-systems.md
  - entities/hermes-agent.md
---

# Agent 自进化

**Agent 自进化**是指 Agent 系统在执行任务过程中，自动将经验沉淀为可复用的技能（Skills）或规则，使系统越用越强的能力。这是 Hermes Agent 区别于 OpenClaw 等框架的核心特性。

## 核心定义

从工程上看，Agent 的自进化本质上是：

> 把一次次任务执行中产生的经验重新回收，再沉淀成新的 Skill、规则或工作方法。

基本架构不会变，Agent 也不涉及数据飞轮，能变的只有**工作方法（Workflow）**。而根据 OpenClaw 的启示，现阶段 Agent 承载 Workflow 的模块就是 **Skills**。

闭环模型：

```
交互数据积累 → 经验提炼 → 知识沉淀 → 下一轮效果提升
```

## 传统做法 vs Hermes 的做法

### 传统工程做法：后台流水线

最符合传统工程习惯的实现方式，不是让 Agent 在主链路里边做边判断，而是单独拉一条后台流水线：

```
任务执行完成 → 记录执行轨迹 → 筛选成功/失败案例
→ 提取可复用模式 → 生成或更新 Skill 文件 → 下次任务继续使用
```

具体来说：
1. 前台 Agent 负责完成任务
2. 后台系统收集日志、调用链、报错信息和成功路径
3. 独立模块分析这些轨迹
4. 把总结结果写回技能库

### Hermes 的做法：Prompt 驱动 + 后台复盘

Hermes 的技能提取**没有一行硬编码的自动触发逻辑**，靠两条信号并行：

#### 信号一：系统提示词主动引导（三层 Prompt）

- **第一层**：告诉 Agent 什么时候该创建技能
- **第二层**：列出五条创建条件和三条更新条件
- **第三层**：在 Agent 使用技能时督促它持续改进

#### 信号二：后台强制复盘

- `_skill_nudge_interval = 10`：每消耗 10 次模型推理轮次触发一次技能复盘
- 如果 10 轮内 Agent 自己已调过 `skill_manage`（信号一生效），计数器重置
- 复盘在**独立后台线程**中运行，`max_iterations=8`，`quiet_mode=True`（不回显给用户）
- 复盘在回复**已经发给用户之后**才启动，绝不和用户任务抢模型资源

> 工程关键点：Agent 自己主动存是理想情况，后台线程是防它漏掉或偷懒的保险。两条信号一起，技能库才能长期健康地长肉。

## 技能沉淀的触发条件

Hermes 在以下情况会倾向于沉淀 Skill：

1. **成功完成了复杂任务**：尤其是工具调用较多（如 5+ tool calls）
2. **中途遇到错误或死路**，但最后找到可行路径
3. **用户纠正了它的做法**：外部反馈明确告诉它原来的方法不对
4. **识别出 non-trivial workflow**：可能常用、可复用、多步骤的方法链

## 潜在问题

### Prompt 驱动靠谱吗？

完全依赖 prompt 引导 Agent 判断是否沉淀技能，"肯定不会每次都正确，大概率会有跑偏的时候"。但设计者认为大模型的指令跟随能力足够强（即便现在不够，以后肯定能满足）。

### 技能膨胀问题

如果不断使用 Hermes，技能会不会越来越多？多到 system prompt 里塞不下？

Hermes 的应对：**渐进式披露**——`skills_list` 只返回名称和描述，不一股脑全塞。个人用户技能数量大概几十个，模型能准确识别。

真正的问题在**团队使用**场景：当技能累积到几百个时，单纯把技能索引塞进 system prompt 里，模型判断就不一定准确了，需要更智能的技能检索机制。

### 技能文件示例

Agent 完成"热点话题多平台内容创作"后沉淀的技能：

```markdown
---
name: hot-topic-content-creation
description: "热点追踪与多平台内容创作技能"
conditions:
platforms: [macos, linux, windows]
---
# 热点内容创作流程
## 步骤
1. 搜索当前平台热门话题/趋势
2. 分析热点关键词，确定内容切入角度
3. 根据话题生成配图
4. 撰写小红书笔记：标题党+口语化正文+话题标签
5. 基于同一话题改写公众号长文
6. 生成发布建议
```

## 与数据飞轮的关系

传统的 AI 知识库自进化 = 数据飞轮：把边界案例、错误案例回流到知识层，架构本身不变，但知识库越来越强 → 系统表现越来越好。

Agent 自进化 = 方法飞轮：把任务执行中的成功路径、失败模式和可复用 workflow 回流到 Skills 层。前者沉淀的是**答案**，后者沉淀的是**做事方法**。两者都是飞轮，只是驱动的对象不同。

## 与 OpenClaw 的对比

| 维度 | Hermes（自进化） | OpenClaw（预定义） |
|------|------------------|-------------------|
| 技能来源 | Agent 自动提取 | 人工/开发者编写 |
| 更新方式 | Agent 自主判断 | 人工维护 |
| 设计目标 | 越用越强 | 标准化、可控 |
| 风险 | 可能跑偏 | 需持续人工投入 |

详见 [[../comparisons/openclaw-vs-hermes|OpenClaw vs Hermes 深度对比]]。
