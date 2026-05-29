PaperRAG *2026年5月20日 07:32*

过去一年，agentic RAG 成为 RAG 领域最火的方向——Search-R1、AutoRefine、DeepRAG……方法层出不穷，性能一路攀升。但有一个被选择性忽视的代价： **延迟** 。

LatentRAG 的论文里有一组令人窒息的数据：在多跳 QA 任务上，Search-R1 的平均延迟是朴素单步 RAG 的 **16-22 倍** 。一个本来 400ms 能回答的问题，要等 **5-7 秒** 。

这 90% 的时间花在哪了？LatentRAG 团队做了精确的分阶段计时：

**思维生成（Thought Generation）：占 ~75% 延迟** **子查询生成（Subquery Generation）：占 ~15% 延迟** **检索+最终答案生成：仅占 ~10%**

问题非常清晰：agentic RAG 的瓶颈不在检索系统，而在 LLM 的 **自回归生成** 。每一步思考、每一个子查询，都是逐 token 生成的——每个 token 都要等前一个 token 算完才能开始。这是 Transformer 架构的硬约束，跟硬件无关。

LatentRAG 来自阿姆斯特丹大学，提出一个大胆的解决方案： **既然自回归生成这么慢，干脆不生成了——把推理和检索全部搬进隐空间。**

## 核心思路

LatentRAG 的关键洞察来自另一个领域—— **latent reasoning（隐式推理）** 。

传统 chain-of-thought 要求模型生成一段自然语言思考链，比如：

> "我需要先找出 2016 年马拉喀什 ePrix 的冠军，然后再查他的出生年份。"

这个过程要逐 token 生成，几十个 token 就意味着几十次顺序前向传播。

Latent reasoning 说：模型不需要把这些想明白的东西「说出来」。它可以在 **隐藏状态（hidden states）** 中完成思考，然后直接输出动作。

LatentRAG 把这个想法搬到 agentic RAG 场景，但面临一个独特挑战：agentic RAG 不仅需要思考，还需要 **发出检索查询** 。而检索模型期望的输入是自然语言，不是隐藏状态向量。

这引出了 LatentRAG 的两个核心技术贡献。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 技术 1：隐空间检索

LatentRAG 用 **特殊 token 序列** 替代自然语言思考和子查询：

- 思考： `<think 1> <think 2> <think 3> <think 4>` （4 个特殊 token）
- 子查询： `<query 1> <query 2> ... <query 16>` （16 个特殊 token）

这些特殊 token 在 prefill 阶段被 **并行处理** ，产出对应的最后一层隐藏状态——这就是 **隐式思维 token** 和 **隐式子查询 token** 。

关键在于：隐式子查询 token 如何被检索模型使用？

LatentRAG 加了一个轻量的 **Retrieval Projector** （双向自注意力 + FFN），把 LLM 的隐藏状态映射到检索模型的输入空间。映射后的向量直接输入检索模型，产出子查询 embedding，然后在文档库中做 top-k 检索。

### KL 散度对齐：不直接学 embedding，学分布

训练数据是个问题。传统检索模型需要数亿级 query-document 对，但 agentic RAG 的训练数据通常只有数万条 QA 对，没有中间子查询的标注。

LatentRAG 的方案：用一个冻结的参考检索模型，把原始自然语言子查询编码为参考 embedding，然后用 **KL 散度** 让隐式子查询 embedding 的文档相似度分布逼近参考分布。

为什么不用常见的 InfoNCE loss？消融实验给出了答案：

| 对齐方法 | EM (%) | 检索成功率 (%) |
| --- | --- | --- |
| KL 散度（LatentRAG） | **43.46** | **61.27** |
| Cosine loss | 42.55 | 60.76 |
| InfoNCE | 41.86 | 58.60 |

KL 散度表现最好。Cosine loss 的检索重叠率最高（最接近 teacher），但性能反而更差——作者认为过度模仿 teacher 会限制模型容量。

## 技术 2：并行隐式解码

隐空间推理的代价是不透明——你不知道模型在想什么、搜了什么。论文用了一个优雅的方案：

加一个 **Decoding Projector** ，把隐式 token 映射回 LLM 输入空间，然后让 LLM 解码成自然语言。关键设计： **每个步骤的解码是独立的** ，所以所有步骤的思考/子查询可以 **并行解码** 。

推理时解码是可选的：

- **不要解码** ：延迟降低 **89%** ，完全在隐空间运行
- **要解码** ：延迟降低 **47-63%** ，但获得完整的思考链可见性

即使开了解码，也比显式方法快得多，因为并行解码省掉了大量顺序前向传播。

## 隐空间里到底藏了什么？

这是论文最有意思的分析之一。作者用 **LogitLens** 技术把隐式 token 的隐藏状态投影回词汇表空间，观察最可能对应的词。

结果令人惊讶：

- 一个隐式 token 可以直接编码整个语义概念，比如 `William Goldman` 或 `Christianity Today`
- 不像自然语言 tokenization 那样把词拆成多个 subword，一个 latent token 就能代表一整个实体
- 不同步骤的 latent token 自然地「迁移」到不同语义区域——第一步靠近第一个子查询的词汇，后续步骤逐渐偏向答案相关词汇

这说明模型确实在隐空间中学到了有意义的语义表示，而不只是随机噪声。

## 实验结果

在 7 个 QA benchmark、5 种不同检索模型上，LatentRAG 的表现非常一致：

**对比 Search-R1（最强 agentic baseline）：**

| 模型 | LatentRAG | Search-R1 | 延迟降低 |
| --- | --- | --- | --- |
| Qwen3-Embedding-0.6B | EM 43.46% | EM 42.47% | **89%** |
| AutoRefine | EM 43.79% | EM 42.73% | **89%** |

性能差距在 **±5% 以内** ，有些场景甚至略超 baseline。而延迟从 5 秒级降到了 **500ms 级** ——几乎和朴素单步 RAG 一样快。

**细看延迟分解（对比 Search-R1）：**

- 思维生成：从 4,021ms → 98ms（降低 **97.6%** ）
- 子查询生成：从 803ms → 133ms（降低 **83.4%** ）
- 总延迟：从 5,372ms → 593ms
![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

模型缩放实验也表现稳健——LLM 从 3B 到 14B、检索模型从 0.6B 到 8B，LatentRAG 的延迟优势始终保持在 86-92%。

## 一点思考

LatentRAG 提出了一个非常重要的研究方向： **agentic 系统是否真的需要「说人话」？**

我们习惯了让 LLM 用自然语言思考、用自然语言生成工具调用。但这背后的代价是巨大的——自回归生成本质上是串行的，而大部分推理计算其实可以并行化。LatentRAG 证明了在隐空间完成推理和检索是可行的，而且效率提升是数量级的。

现有搜索系统是为人类设计的文本搜索引擎。但在 agentic 系统时代，也许我们应该重新设计面向 embedding 的 agent-native 搜索引擎。

**隐空间不只是推理的加速器，它可能是下一代 agentic 系统的基础设施。**

```
文章标题：LatentRAG: Latent Reasoning and Retrieval for Efficient Agentic RAG
```

RAG · 目录

继续滑动看下一个

PaperAGI

向上滑动看下一个