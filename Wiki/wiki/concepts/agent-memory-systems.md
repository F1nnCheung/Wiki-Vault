---
title: Agent 记忆系统设计
type: concept
tags: [agent, memory, context, hermes-agent, openclaw]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/OpenClaw/【万字】OpenClaw vs Hermes：一文深入拆解两大 Agent 框架.md
  - raw/articles/OpenClaw/OpenClaw vs Hermes：拆解 Hermes Agent 五层架构.md
related:
  - comparisons/openclaw-vs-hermes.md
  - concepts/agent-context-compression.md
  - concepts/agent-self-evolution.md
---

# Agent 记忆系统设计

Agent 的记忆系统决定了系统如何跨会话、跨任务保留和利用信息。OpenClaw 和 Hermes 在这一块采用了完全不同的设计哲学。

## 两种设计哲学

| | Hermes | OpenClaw |
|------|--------|----------|
| **架构** | 三层分离（内置 + 外部 + 搜索） | 单插件槽位，可替换 |
| **设计理念** | 围绕"推理过程"设计 | 围绕"怎么接进系统不破坏稳定性" |
| **关注点** | Agent 怎么靠记忆越来越像人 | 记忆怎么接进系统 |

## Hermes 的三层记忆

### 第一层：内置记忆

两个文件，存在 `~/.hermes/` 下：

| 文件 | 用途 | 容量限制 |
|------|------|---------|
| `MEMORY.md` | Agent 自己的笔记本：环境信息、项目约定、踩过的坑 | 2200 字符 |
| `USER.md` | 用户画像：偏好、沟通习惯、工作风格 | 1375 字符 |

**关键设计：冻结快照**

```python
class MemoryStore:
    def load_from_disk(self):
        self.memory_entries = self._read_file(mem_dir / "MEMORY.md")
        self.user_entries = self._read_file(mem_dir / "USER.md")
        # 捕获冻结快照
        self._system_prompt_snapshot = {
            "memory": self._render_block("memory", self.memory_entries),
            "user": self._render_block("user", self.user_entries),
        }
```

记忆在**会话开始时**注入系统提示词，整个会话期间不再更新。会话期间通过工具写入的记忆会**立刻持久化到磁盘**，但系统提示词快照不变——下次新会话才刷新。

**为什么？** 为了前缀缓存命中。每轮写记忆都改系统提示词，缓存就没法命中。这是用一致性换性能的工程权衡。

写入记忆时有一轮安全扫描（提示注入、不可见 Unicode 字符等），命中规则直接拒绝写入。

### 第二层：外部记忆（MemoryProvider）

通过 `MemoryProvider` 抽象把记忆能力外包出去。支持的 8 种 Provider：

| Provider | 特点 |
|----------|------|
| Honcho | 用户建模，逐步养成用户画像 |
| Hindsight | 会话记忆，跨会话上下文衔接 |
| Mem0 | 向量检索，语义查找历史记录 |
| Byterover | 代码场景，编程上下文 |
| Holographic | 多维关联，关系网记忆 |
| OpenViking | 开源实现，基础能力 |
| RetainDB | 数据库持久化，传统思路 |
| Supermemory | 跨平台整合 |

`MemoryProvider` 接口嵌进 Agent 推理循环的多个时机：

```
prefetch(query) → 每轮开始前捞相关记忆
queue_prefetch(query) → 异步准备下一轮
sync_turn(user, assistant) → 每轮结束同步新交互
on_pre_compress(messages) → 压缩前摘关键信息
on_delegation(task, result) → 子 Agent 完成后的观察学习
on_memory_write(action, target, content) → 记忆写入通知
on_session_end(messages) → 会话结束，长期记忆整理
```

### 第三层：会话搜索（session_search）

不会在每轮把历史对话直接塞进上下文。流程：

```
FTS5 全文搜索历史对话
→ 按会话分组，取前几个会话
→ 每个会话加载匹配点前后约 10 万字符
→ 便宜辅助模型做摘要
→ 返回摘要（而非原始对话）
```

与 OpenClaw 的差异：OpenClaw 搜到什么就丢给主模型让模型自己判断。Hermes 在中间加了一层 LLM 先压缩过滤。好处是上下文更干净，代价是多一次模型调用。

## OpenClaw 的单插件设计

OpenClaw 把记忆当作**特殊插件**，同一时间只激活一个记忆插件：

- 实现简洁、边界清晰、可替换性强
- 对记忆来源、读写、注入方式都有较强约束，不容易失控
- 设计初衷：关注记忆怎么接进系统才不破坏稳定性，至于 Agent 怎么靠记忆越来越像人，权限交给开发者

## 记忆案例：内容运营 Agent

假设长期把 Hermes 当成内容运营 + 文章写作助理：

1. **第一次对话**：告诉 Hermes 写作偏好 → 写入 `USER.md`（偏好）+ `MEMORY.md`（环境约定）
2. **日常对话**：大量交互内容存入对话数据库，不塞进内置记忆
3. **检索取出**：新会话中用 `session_search` 找回历史讨论。关键词被拆解 → FTS5 搜索 → 辅助模型提炼摘要 → 返回给主模型
4. **长期模式**：外部 MemoryProvider 把多次对话中反复出现的信号整理成长期可复用记忆

## 注意事项

### 记忆 ≠ 搜索

`session_search` 是按需检索——模型得主动调工具才能拿到旧对话片段，搜索结果只是当次推理的临时上下文，不会自动写入 MEMORY.md。

真正持久的"记忆"只有一条路：模型主动调 `memory` 工具写入，下次新会话启动时从磁盘加载进快照。

**Session 链保原始数据不丢，记忆系统保经验沉淀不丢，两条通道各管各的。**

### 真实难点

Agent 记忆真正的难点不是"记住偏好"，而是**如何有效利用外部知识库**。比如已有 40 节管理课程文档，Agent 如何有效利用这些数据——这才是真正困难的问题。
