---
title: Agent 上下文压缩
type: concept
tags: [agent, context, compression, token-optimization, hermes-agent, openclaw]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/OpenClaw/【万字】OpenClaw vs Hermes：一文深入拆解两大 Agent 框架.md
  - raw/articles/OpenClaw/OpenClaw vs Hermes：拆解 Hermes Agent 五层架构.md
related:
  - comparisons/openclaw-vs-hermes.md
  - concepts/agent-memory-systems.md
---

# Agent 上下文压缩

长对话场景下，上下文窗口迟早会被塞满。压缩是躲不掉的。OpenClaw 和 Hermes 在处理上下文压缩时，核心思路一致（用 LLM 提取摘要、保留关键信息），但从**哪里开始压**的差异导致了完全不同的记忆保留策略。

## 两种策略对比

| 维度 | Hermes | OpenClaw |
|------|--------|----------|
| 压缩位置 | 保护两端，压缩中间 | 从最老轮次开始压 |
| 摘要方式 | 迭代摘要（增量更新） | LLM 提取摘要 |
| 数据保留 | Session 链（parent_session_id） | 快照归档到 archive 路径 |
| 缓存策略 | 确定性排序、空格规范化、cache boundary marker | 头部稳定 → 前缀缓存命中 |

## Hermes：保护两端，压缩中间

`ContextCompressor`（位于 `agent/context_compressor.py`）的压缩流程：

### 第一步：裁旧工具输出（不调 LLM）

把旧的工具输出替换成 `[Old tool output cleared to save context space]`。很多时候这一步就够降到阈值以下了。

### 第二步：保护头部

系统提示词 + 前 3 条消息不动（通常是第一轮完整交换：系统提示词 + 第一条用户消息 + 第一条助手回复）。

### 第三步：保护尾部按 token 预算

触发阈值 = `context_length × 0.50`（上下文用掉一半时触发），尾部预算 = `threshold_tokens × 0.20`。

例如 200K 上下文模型：阈值 100K，尾部保护 20K token。

> 注意：不是按消息数算的。一条长代码和一句"好的" token 差 100 倍，按数字算没意义。

### 第四步：中间摘要

用配置里指定的便宜模型做摘要，摘要前拼 `SUMMARY_PREFIX`："这是来自前一个上下文窗口的交接"——暗示这是**另一个助手**留下的笔记，防止模型把摘要里的旧请求当新指令再执行。

摘要结构：

```
## 已解决的问题
- [配置问题]: 已通过修改 ~/.hermes/config.yaml 解决
- [依赖缺失]: 已 pip install 缺失包

## 待决问题
- [性能优化]: 当前方案是用缓存，还在评估其他方案
```

### 第五步：增量更新

二次压缩在已有摘要上更新，不从头重压。摘要 token 上限 12000，防自身膨胀。

压缩触发时主动调 `_invalidate_system_prompt()` + `_build_system_prompt()` 重建系统提示词，冻结的记忆快照重新生成。

## OpenClaw：从头部开始压缩

- 从最老的对话轮次开始压缩，最近对话原样保留
- 压缩前保留快照，原始消息归档到 archive 路径
- 做了一套缓存稳定性措施：确定性排序、空格规范化、cache boundary marker

## Session 链：数据不丢的关键

上下文压缩有一个容易被忽略的副作用：**摘要是有损的**。

用户今天聊了一大段，明天回来问"昨天你说的那个函数名叫什么来着"，模型在当前 session 里只看到摘要，细节可能已被压缩掉了。如果压缩是"就地覆盖"旧对话，那历史就丢了。

Hermes 的解决方案——每次上下文压缩时，SessionDB 做三件事：

1. 结束当前 session，**原始对话完整保留在数据库，不删**
2. 开新 session，压缩后的摘要作为新 session 的起点
3. 新 session 的 `parent_session_id` 指回旧 session

连续压缩几次形成一条链，能一路追溯到最初对话。

**分层满足两个矛盾目标**：
- **模型层**（当前 session）：只装系统提示词 + 摘要 + 近期对话，token 成本可控
- **数据层**（SQLite）：所有原始消息保留，FTS5 全文可搜。用户问历史问题 → `session_search` 直接命中原文 → 返回片段给模型

## 如何选择

- **高频调用、成本敏感** → OpenClaw 从头压的策略
- **需要深度推理、信息不能丢** → Hermes 保护两端 + session 链的策略
- Hermes 的选择结果显得更"聪明"——多一层 LLM 处理，但算力换质量
