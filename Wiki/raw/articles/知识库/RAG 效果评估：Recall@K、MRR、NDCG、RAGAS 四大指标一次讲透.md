Jameszyh *2026年5月11日 13:02*

大家好，我是James。

上一篇我们聊了知识库的动态更新，讲了文档新增、修改、删除三种场景怎么同步向量。但有一个问题一直没提——你怎么知道你的 RAG 检索 **到底好不好** ？

很多同学搭完 RAG 之后，评测方式是：自己问几个问题，回答大概靠谱，就觉得「没问题了」。然后上线，用户反馈「答非所问」，问题单一个接一个。复盘下来发现——不是模型不行，是检索一开始就没捞到对的文档。

这个坑我见过太多次了。 **评估 RAG，光靠"感觉"是不够的。** 需要一套量化指标体系，把「检索好不好」和「回答对不对」分开来看。

这篇，我把 RAG 评估从头拆一遍：检索层的 Recall@K、MRR、NDCG，生成层的 RAGAS 四大指标，再到用 LangChain.js 搭一套评估 Pipeline。每一个指标，我会告诉你它量的是什么、什么时候用、踩过哪些坑。

---

## 01 RAG 评估的两层结构：检索 vs 生成，不能混为一谈

![RAG 评估两层结构：检索层与生成层分开量化](https://mmbiz.qpic.cn/sz_mmbiz_png/po17k64iapicnZfmSjUzibmlvNPHgs0Kaky9yd7unX25GgSt3Iyca5Zz2Kj007EyfRtfsQ9KG6aqNSffuhbvl3yYicdFmjA2RpeaZZicWXTuR1qw/640?wx_fmt=png&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0 "RAG 评估两层结构：检索层与生成层分开量化")

很多人问我：「我直接用 LLM 打个分，看回答质量不就好了？」

这个思路的问题在于：LLM 打分只能告诉你「最终答案好不好」，没法告诉你「是哪个环节出了问题」。就像一道菜不好吃，你不知道是食材不行还是厨师手艺差。

RAG 系统的链路是：Query → 检索层（Retriever）→ 召回文档块 → 生成层（Generator）→ 最终 Answer。

这两层的问题是独立的：

- **检索层问题** ：召回的文档和 Query 不相关；或者相关文档被排在第 10 名，前 3 名全是废文
- **生成层问题** ：相关文档召回了，但 LLM 没用到（幻觉）；或者答案风马牛不相及

**评估体系也要分开：**

| 评估维度 | 解决的问题 | 核心指标 |
| --- | --- | --- |
| 检索层评估 | 召回的文档和 Query 相关吗？排序好不好？ | Recall@K、MRR、NDCG |
| 生成层评估 | LLM 用了召回内容吗？答案准确吗？ | RAGAS: Faithfulness、Answer Relevancy、Context Precision、Context Recall |

搞清楚这个分层，才知道下面的指标各管哪段链路。

![检索层与生成层的断链问题：哪层出问题很难光靠结果判断](https://mmbiz.qpic.cn/mmbiz_png/po17k64iapick98g0YQskaOic5zynSeBSZCKJXWDpAjKuy4ribYHgDvYTpYMbS4zuE23EWtItibjI2esT6nB4nFCCkblLJyk1qEicS8qtGELBLAS4/640?wx_fmt=png&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1 "检索层与生成层的断链问题：哪层出问题很难光靠结果判断")

---

## 02 Recall@K——你的答案在前 K 条里吗？

![Recall@K 原理示意：相关文档是否在 TopK 中](https://mmbiz.qpic.cn/mmbiz_png/po17k64iapicnvRlY9ia4v10P6rHqRxnwnMYc3WibO1arZvNxldskjLN6PScBKQc97orAmJHEYS6nCcaT11fxWkABplPOy8icQNjsS0vsqGt2sMQ/640?wx_fmt=png&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2 "Recall@K 原理示意：相关文档是否在 TopK 中")

**Recall@K 是最基础的检索指标** ，它回答的问题是：对于一个 Query，所有相关文档中，有多少比例出现在你召回的前 K 条里？

计算方式： `Recall@K = 前K条里的相关文档数 / 总相关文档数`

举个例子：你的知识库里有 5 篇和「Redis 集群方案」相关的文档。用户问了一个问题，你召回了 Top10，其中 4 篇是相关的，那么 Recall@10 = 4/5 = 0.8。

```
// ① Recall@K：前K条里有多少相关文档
function recallAtK(
  retrieved: string[],  // 召回文档 ID 列表（按排名）
  relevant: string[],   // 标注的相关文档 ID 集合
  k: number
): number {
  const topK = retrieved.slice(0, k);
  const relevantSet = new Set(relevant);
  const hits = topK.filter(id => relevantSet.has(id)).length;
  return relevant.length === 0 ? 0 : hits / relevant.length;
}

function avgRecallAtK(
  queries: Array<{ retrieved: string[]; relevant: string[] }>,
  k: number
): number {
  const scores = queries.map(q => recallAtK(q.retrieved, q.relevant, k));
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}

const testData = [
  { retrieved: ["doc_3", "doc_7", "doc_1", "doc_5", "doc_9"], relevant: ["doc_1", "doc_3", "doc_5"] },
  { retrieved: ["doc_2", "doc_8", "doc_4", "doc_6", "doc_10"], relevant: ["doc_2", "doc_4"] }
];
console.log(\`Recall@3: 3
\`);  // 0.667
console.log(\`Recall@5: 3
\`);  // 1.000

// ② MRR：第一个相关文档在第几名
function reciprocalRank(retrieved: string[], relevant: string[]): number {
  const relevantSet = new Set(relevant);
  for (let i = 0; i < retrieved.length; i++) {
    if (relevantSet.has(retrieved[i])) return 1 / (i + 1);
  }
  return 0;
}

function meanReciprocalRank(
  queries: Array<{ retrieved: string[]; relevant: string[] }>
): number {
  const scores = queries.map(q => reciprocalRank(q.retrieved, q.relevant));
  return scores.reduce((a, b) => a + b, 0) / scores.length;
}
```

**Recall@K 的盲区：** 它只管「相关文档有没有被召回」，不管排序。第 1 名和第 10 名对它来说没区别。但在 RAG 里，你一般只把 Top3 塞给 LLM——如果相关文档都在 Top8-10，Recall@10=1.0 但实际没用。这就是为什么还需要 MRR。

**MRR 的适用场景：** 当每个 Query 只有一个最正确答案时，MRR 很好用。MRR 的盲区：它只看第一个相关结果，如果一个 Query 有多个相关文档，后续排名的好坏它完全不管。

---

## 03 MRR——第一个相关文档在第几名？

![MRR 原理：首个相关文档排名位置的倒数平均值](https://mmbiz.qpic.cn/sz_mmbiz_png/po17k64iapiclbjmbqzJsZrxhVWiaFmxoJZljzfSWDpyGdjBmXBwSRDKpxnL8UvFibfGAuVI9IUcIo5KcSBwpNZW8eceI4SvOSefibNwqEdqmEps/640?wx_fmt=png&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3 "MRR 原理：首个相关文档排名位置的倒数平均值")

**MRR（Mean Reciprocal Rank）** ，专门关注第一个相关文档出现的位置。

计算方式：MRR = (1/|Q|) × Σ (1 / rank\_i)，其中 rank\_i 是第 i 个 Query 下第一个相关文档的排名。

为什么用 **倒数** ？第 1 名相关 → 得分 1.0，第 2 名 → 0.5，第 5 名 → 0.2，第 10 名 → 0.1（几乎无用）。排名越靠后，得分衰减越快，惩罚越重。

上面 Recall@K 代码里已包含 `reciprocalRank` 和 `meanReciprocalRank` 的实现，下面直接看对比验证：

```
// 对比两种检索策略的 MRR
const strategyA = [
  { retrieved: ["doc_x", "doc_1", "doc_3"], relevant: ["doc_1"] },  // 相关文档排第2
  { retrieved: ["doc_2", "doc_y", "doc_z"], relevant: ["doc_2"] },  // 相关文档排第1
];
const strategyB = [
  { retrieved: ["doc_1", "doc_x", "doc_3"], relevant: ["doc_1"] },  // 相关文档排第1
  { retrieved: ["doc_y", "doc_2", "doc_z"], relevant: ["doc_2"] },  // 相关文档排第2
];
console.log(\`Strategy A MRR: ${meanReciprocalRank(strategyA).toFixed(3)}\`); // 0.750
console.log(\`Strategy B MRR: ${meanReciprocalRank(strategyB).toFixed(3)}\`); // 0.750
// 两个 MRR 一样！MRR 分不清「哪篇文档更靠前更好」，需要 NDCG 来区分
```

---

## 04 NDCG——排序质量的全面评分

![NDCG 原理：考虑位置权重的综合排序质量评分](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "NDCG 原理：考虑位置权重的综合排序质量评分")

**NDCG（Normalized Discounted Cumulative Gain）** ，是最全面的检索排序指标。它同时考虑每个文档的相关性程度（可以分 0/1/2 等级）和文档所在位置（越靠前越值钱）。

原理：DCG@K = Σ (rel\_i / log₂(i+1))，NDCG@K = DCG@K / IDCG@K（实际值 / 理想排序值），永远在 \[0, 1\] 之间。

```
// 计算 DCG
function dcgAtK(relevances: number[], k: number): number {
  return relevances.slice(0, k).reduce((acc, rel, i) => {
    return acc + rel / Math.log2(i + 2);
  }, 0);
}

// 计算 NDCG@K
function ndcgAtK(
  retrieved: string[],
  relevanceMap: Map<string, number>,
  k: number
): number {
  const retrievedRels = retrieved.slice(0, k).map(id => relevanceMap.get(id) ?? 0);
  const idealRels = Array.from(relevanceMap.values()).sort((a, b) => b - a);
  const dcg = dcgAtK(retrievedRels, k);
  const idcg = dcgAtK(idealRels, k);
  return idcg === 0 ? 0 : dcg / idcg;
}

// 验证：相关文档排名靠前 vs 靠后的差距
const relevanceScores = new Map([
  ["doc_1", 2], // 高度相关
  ["doc_3", 1], // 部分相关
  ["doc_5", 2], // 高度相关
]);

const retrievalA = ["doc_x", "doc_y", "doc_1", "doc_3", "doc_5"]; // 相关文档在后
const retrievalB = ["doc_1", "doc_5", "doc_3", "doc_x", "doc_y"]; // 相关文档在前

console.log(\`Strategy A NDCG@5: 3
\`);
console.log(\`Strategy B NDCG@5: 3
\`);
// 策略B 明显高于策略A，这才是排序质量的差距
```

**什么时候用 NDCG：** 当你的知识库里有多个相关文档，且相关程度有差异（有的非常相关、有的一般相关）时，NDCG 是最全面的指标。 **比较两种检索策略（向量检索 vs 混合检索）时首选 NDCG。**

![三大检索指标对比：Recall@K vs MRR vs NDCG 的能力边界](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "三大检索指标对比：Recall@K vs MRR vs NDCG 的能力边界")

---

## 05 RAGAS 四大指标——生成层这样量

![RAGAS 四大指标关系图：检索精度、检索召回、忠实度、答案相关性](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "RAGAS 四大指标关系图：检索精度、检索召回、忠实度、答案相关性")

上面三个指标都是 **检索层** 的。现在来看 **生成层** ——LLM 拿到召回的文档后，有没有用好？

RAGAS（Retrieval Augmented Generation Assessment）是目前最主流的 RAG 生成评估框架，四个核心指标各管一段链路：

| 指标 | 量的是什么 | 低了说明什么 |
| --- | --- | --- |
| Faithfulness（忠实度） | 答案里的声明有多少来自 Context | LLM 在幻觉，凭空捏造 |
| Answer Relevancy（答案相关性） | 答案是否真正回答了 Query | 答非所问，离题了 |
| Context Precision（上下文精确率） | 召回文档里有用的比例 | 检索噪音太多 |
| Context Recall（上下文召回率） | 标准答案所需信息是否被覆盖 | 重要文档没有被召回 |

```
import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";

const llm = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0 });

// Faithfulness：答案是否基于上下文，没有幻觉？
async function faithfulness(context: string[], answer: string): Promise<number> {
  const prompt = PromptTemplate.fromTemplate(\`
你是一个严格的事实核查员。
上下文：{context}
答案：{answer}

请判断答案中的每一个声明是否都能在上下文中找到依据。
输出 JSON：{{"supported_claims": X, "total_claims": Y}}
  \`);
  const chain = prompt.pipe(llm);
  const result = await chain.invoke({
    context: context.join("\n\n"),
    answer,
  });
  const parsed = JSON.parse(result.content as string);
  return parsed.supported_claims / parsed.total_claims;
}

// Context Precision：召回的文档里有多少真正有用？
async function contextPrecision(
  query: string,
  contexts: string[],
  groundTruth: string
): Promise<number> {
  const prompt = PromptTemplate.fromTemplate(\`
问题：{query}
标准答案：{groundTruth}
文档片段：{context}
这个文档片段对回答该问题是否有帮助？输出 {{"useful": true/false}}
  \`);
  const chain = prompt.pipe(llm);
  let usefulCount = 0;
  let precisionSum = 0;
  for (let i = 0; i < contexts.length; i++) {
    const result = await chain.invoke({ query, groundTruth, context: contexts[i] });
    const { useful } = JSON.parse(result.content as string);
    if (useful) {
      usefulCount++;
      precisionSum += usefulCount / (i + 1);
    }
  }
  return usefulCount === 0 ? 0 : precisionSum / usefulCount;
}
```

四个指标的关系：Context Precision 和 Context Recall 评的是检索层给生成层「喂」的食材质量；Faithfulness 和 Answer Relevancy 评的是 LLM 怎么用这些食材做菜。四个数都高，才算一个好的 RAG 系统。

---

## 06 完整评估 Pipeline：从数据集构建到打分报告

![完整 RAG 评估 Pipeline：数据集构建 → 自动评估 → 指标看板](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "完整 RAG 评估 Pipeline：数据集构建 → 自动评估 → 指标看板")

光有指标没用，得有 Pipeline 跑起来。评估 RAG 的难点在于 **构建测试数据集** ——你需要有 `(query, contexts, answer, ground_truth)` 四元组。

有两种方法：人工标注（质量高，慢）和 LLM 自动合成（从已有文档自动生成 QA 对）。

```
import { ChatOpenAI } from "@langchain/openai";
import { Document } from "@langchain/core/documents";

// Step 1: LLM 自动合成评估数据集
async function synthesizeEvalDataset(
  docs: Document[],
  numQuestions = 20
): Promise<Array<{ query: string; groundTruth: string }>> {
  const llm = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0.3 });
  const samples = [];

  for (let i = 0; i < numQuestions; i++) {
    const doc = docs[Math.floor(Math.random() * docs.length)];
    const prompt = \`基于以下文档内容，生成一个有深度的问题和对应的标准答案（JSON）：
文档：${doc.pageContent}
输出：{"question": "...", "answer": "..."}\`;

    const result = await llm.invoke(prompt);
    const { question, answer } = JSON.parse(result.content as string);
    samples.push({ query: question, groundTruth: answer });
  }
  return samples;
}

// Step 2: 批量跑评估，生成报告
async function runRAGEval(
  ragChain: any,
  evalDataset: Array<{ query: string; groundTruth: string; relevantDocIds: string[] }>,
  vectorStore: any
): Promise<void> {
  const results = [];

  for (const sample of evalDataset) {
    const ragOutput = await ragChain.invoke({ query: sample.query });
    const retrievedDocs = await vectorStore.similaritySearch(sample.query, 10);
    const retrievedIds = retrievedDocs.map((d: Document) => d.metadata.id as string);

    const recall5 = recallAtK(retrievedIds, sample.relevantDocIds, 5);
    const mrr = reciprocalRank(retrievedIds, sample.relevantDocIds);
    const faith = await faithfulness(ragOutput.contexts, ragOutput.answer);

    results.push({ recall5, mrr, faithfulness: faith });
  }

  // 汇总输出报告
  const avg = (key: string) =>
    (results.reduce((a, b) => a + (b as any)[key], 0) / results.length).toFixed(3);

  console.log("\n===== RAG 评估报告 =====");
  console.log(\`Recall@5:     ${avg("recall5")}\`);
  console.log(\`MRR:          ${avg("mrr")}\`);
  console.log(\`Faithfulness: ${avg("faithfulness")}\`);

  // 自动诊断
  if (parseFloat(avg("recall5")) < 0.7) {
    console.log("⚠️  Recall@5 偏低 → 考虑增大 TopK 或换混合检索");
  }
  if (parseFloat(avg("faithfulness")) < 0.8) {
    console.log("⚠️  Faithfulness 偏低 → LLM 有幻觉，加强 System Prompt 约束");
  }
}
```

---

## 07 常见坑：评估 RAG 时最容易犯的 5 个错误

![RAG 评估常见坑：5个真实踩坑案例](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "RAG 评估常见坑：5个真实踩坑案例")

**坑 1：用生产数据当测试集，但没有 ground truth**

生产日志里有 query，但没有「正确答案」。直接用这些数据跑评估，Context Recall（需要知道「正确答案包含哪些信息」）根本没法算。解决：定期从生产 query 里抽样 50-100 条，人工标注，积累评估集。

**坑 2：K 值设太大，掩盖真实问题**

召回 Top20 算 Recall@20，几乎必然 >0.9，但你实际只把 Top5 喂给 LLM。应该用 **Recall@K 的 K = 你实际传给 LLM 的文档数** 。

**坑 3：只看 Faithfulness，忽视 Context 质量**

Faithfulness 高只说明 LLM 没有凭空捏造。但如果 Context 本身就是错误文档，Faithfulness=1.0 照样给出错误答案。要 **配合 Context Precision/Recall 一起看** 。

**坑 4：用 BLEU/ROUGE 评估语义类 RAG**

「他今年 30 岁」和「他今年而立之年」词汇重叠几乎为 0，但语义完全一致。BLEU/ROUGE 是词汇指标，RAG 评估请用 RAGAS，别用传统 NLP 指标。

**坑 5：只在固定测试集上跑，从不更新**

知识库在变，用户 query 分布在变。建议： **每次知识库大更新后重跑评估** ，设置指标基准线，低于基准线自动触发报警。

![RAG 评估持续集成流程：知识库更新触发自动评估](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "RAG 评估持续集成流程：知识库更新触发自动评估")

---

## 08 三种场景的指标组合：到底该看哪几个数？

![不同 RAG 场景的指标组合策略](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "不同 RAG 场景的指标组合策略")

不同 RAG 场景的评估侧重点不一样：

| 场景 | 优先指标 | 原因 |
| --- | --- | --- |
| 问答类（找唯一答案） | MRR + Faithfulness | 关心首位相关结果和答案准确性 |
| 知识库搜索（找多篇文档） | NDCG@10 + Context Precision | 排序质量 + 噪音控制 |
| 客服/对话类 | Recall@5 + Answer Relevancy + Faithfulness | 覆盖率 + 相关性 + 无幻觉 |
| 合规/内部文档 | Faithfulness（首要）+ Context Precision | 不能有幻觉，上下文要干净 |

```
// 根据场景快速配置评估器
type RAGScenario = "qa" | "search" | "chatbot" | "compliance";

interface EvalConfig {
  primaryMetrics: string[];
  retrievalK: number;
  warningThresholds: Record<string, number>;
}

const scenarioConfigs: Record<RAGScenario, EvalConfig> = {
  qa: {
    primaryMetrics: ["mrr", "faithfulness"],
    retrievalK: 5,
    warningThresholds: { mrr: 0.7, faithfulness: 0.85 },
  },
  search: {
    primaryMetrics: ["ndcg", "contextPrecision"],
    retrievalK: 10,
    warningThresholds: { ndcg: 0.75, contextPrecision: 0.7 },
  },
  chatbot: {
    primaryMetrics: ["recallAt5", "answerRelevancy", "faithfulness"],
    retrievalK: 5,
    warningThresholds: { recallAt5: 0.75, answerRelevancy: 0.8, faithfulness: 0.85 },
  },
  compliance: {
    primaryMetrics: ["faithfulness", "contextPrecision"],
    retrievalK: 3,
    warningThresholds: { faithfulness: 0.95, contextPrecision: 0.85 },
  },
};

function createEvaluator(scenario: RAGScenario) {
  const config = scenarioConfigs[scenario];

  return {
    async evaluate(results: Record<string, number>[]) {
      const avg = (key: string) =>
        results.reduce((a, b) => a + (b[key] ?? 0), 0) / results.length;

      const report: Record<string, string> = {};
      for (const metric of config.primaryMetrics) {
        const score = avg(metric);
        const threshold = config.warningThresholds[metric] ?? 0;
        report[metric] = score >= threshold ? \`✅ ${score.toFixed(3)}\` : \`⚠️  ${score.toFixed(3)} (低于 ${threshold})\`;
      }

      console.log(\`\n[${scenario.toUpperCase()} 场景评估报告]\`);
      Object.entries(report).forEach(([k, v]) => console.log(\`  ${k}: ${v}\`));
    }
  };
}
```

---

## 总结

这篇我们把 RAG 评估从头拆了一遍：

- **分层评估是前提** ：检索层和生成层用不同指标，不能用一个数字代替所有，否则你不知道出问题的是检索还是生成
- **Recall@K 看覆盖率，MRR 看首位相关，NDCG 看全局排序质量** ：三个检索指标是递进关系，场景越复杂选越全面的指标
- **Faithfulness 是 RAG 的生命线** ：低于 0.85 就要警惕，LLM 可能在用训练数据里的「知识」作答，而不是你提供的文档
- **Context Precision 和 Faithfulness 要配合看** ：Context 干净了，LLM 才有可能回答准确；只看其中一个，会漏掉另一层的问题
- **测试集要定期更新、场景对应指标** ：知识库变了评估集也要跟着变，合规场景优先 Faithfulness，搜索场景优先 NDCG

下一篇我们进入 GraphRAG，聊聊把知识图谱接进检索链路之后，传统向量检索解决不了的「多跳推理」问题怎么破。

![RAG 评估指标全景总结：六大指标位置关系速查图](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E "RAG 评估指标全景总结：六大指标位置关系速查图")

---

关注我，James 的成长日记，持续分享干货，帮你在 AI 时代少走弯路。

**微信扫一扫赞赏作者**

AI Agent 成神路 · 目录

作者提示: 个人观点，仅供参考

继续滑动看下一个

James的成长日记

向上滑动看下一个