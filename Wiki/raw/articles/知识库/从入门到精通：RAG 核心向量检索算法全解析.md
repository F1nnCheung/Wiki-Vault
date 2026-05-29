算法屋 *2026年5月11日 23:19*

RAG 召回很垃？搜索很慢？停，先别急着换模型，你的向量检索可能该升级了！本文将从基础，到核心参数调优，一文打通 RAG向量检索场景，相信看完本文，你会对向量检索有一个更完整清晰的认识。

## 1\. 大模型为什么需要向量检索

大模型本身不适合直接记住或实时遍历大量外部知识。向量检索的典型作用是：

- 把文本、图片、音频、代码、商品、用户行为等内容编码成 embedding 向量。
- 用户问题也编码成 query embedding。
- 在向量库里查找和 query 最相似的若干条数据。
- 把检索结果作为上下文交给大模型生成答案。

典型 RAG 流程：

```
原始文档
  -> 清洗/切块 chunk
  -> embedding 模型编码
  -> 写入向量索引
  -> 用户 query 编码
  -> 向量召回 top_k
  -> 可选：关键词召回、过滤、重排序 rerank
  -> 拼接上下文
  -> LLM 生成答案
```

向量检索系统最核心的目标是：在延迟、召回率、成本、内存、更新速度之间做权衡。

---

## 2\. 基础概念

### 2.1 向量相似度

常见相似度或距离：

| 名称 | 公式直觉 | 常见用途 | 说明 |
| --- | --- | --- | --- |
| Cosine Similarity | 比较夹角 | 文本 embedding 最常见 | 关注方向，不太关注向量长度 |
| Inner Product | 内积越大越相似 | 推荐、归一化后的文本向量 | 如果向量已 normalize，点积等价于 cosine |
| L2 / Euclidean | 欧氏距离越小越相似 | 图像、聚类、部分 Faiss 索引 | 关注空间距离 |
| Hamming | 二进制位差异 | Binary Quantization、SimHash | 适合二值向量 |

大模型文本检索最常见的是 cosine 或 inner product。很多工程系统会先把向量归一化，然后使用 inner product 来加速 cosine 检索。

### 2.2 精确检索与近似检索

向量检索分两类：

- 精确最近邻检索，Exact Nearest Neighbor，简称 exact search。
- 近似最近邻检索，Approximate Nearest Neighbor，简称 ANN。

精确检索会计算 query 和所有向量的距离，结果最准，但数据量大时很慢。ANN 会牺牲少量召回率，换取数量级的速度提升。

---

## 3\. 主流算法总览

| 算法 / 索引 | 类型 | 代表实现 | 优点 | 缺点 | 典型场景 |
| --- | --- | --- | --- | --- | --- |
| Flat / Brute Force | 精确搜索 | Faiss IndexFlat、NumPy、pgvector exact | 结果准确、实现简单、适合评测基线 | O(N) 扫描，数据大时慢 | 小数据、离线评估、作为 recall 对照 |
| HNSW | 图索引 ANN | hnswlib、Faiss、Qdrant、Weaviate、pgvector、OpenSearch | 召回高、查询快、工程默认选择多 | 内存占用高、构建较慢、删除更新复杂 | RAG 默认首选、百万到亿级内存检索 |
| IVF | 聚类倒排 ANN | Faiss IVF、Milvus IVF\_FLAT | 内存和速度可控，适合大规模 | 需要训练，召回依赖 nprobe | 千万到十亿级向量召回 |
| IVF + PQ | 聚类 + 压缩 | Faiss IndexIVFPQ、Milvus IVF\_PQ | 显著降低内存，适合大规模 | 精度下降，参数复杂 | 内存受限的大规模向量库 |
| SQ / BQ | 标量/二值量化 | Faiss、Qdrant、OpenSearch | 压缩简单，部署友好 | 召回下降，需调参 | 成本敏感、磁盘或内存压缩 |
| ScaNN | 向量量化 + 分区 | Google ScaNN | 在部分 CPU 场景很快 | 生态不如 HNSW/Faiss 广 | Google 生态、特定高吞吐场景 |
| LSH | 哈希 ANN | datasketch、部分旧系统 | 原理简单，适合部分相似度 | 高维语义向量表现通常不如 HNSW | 去重、SimHash、候选粗召回 |

当前大模型应用里，最主流的组合通常是：

1. 中小规模 RAG：HNSW。
2. 大规模低成本：IVF、IVF\_PQ、SQ、BQ。
3. 小数据或评测：Flat 精确检索。
4. 生产 RAG：向量召回 + BM25 稀疏召回 + reranker 重排序。

---

## 4\. Flat 精确检索

Flat 是最直接的检索方式：对每个 query，遍历所有向量并计算距离。

### 优点

- 结果准确，是评估 ANN recall 的基准。
- 不需要训练索引。
- 适合小数据集。
- 参数少，行为容易理解。

### 缺点

- 查询复杂度约为 O(N \* d)，N 是向量数量，d 是维度。
- 数据量达到百万、千万后，CPU 查询成本明显上升。
- 大规模在线服务通常不可接受。

### 适合场景

- 本地 demo。
- 小型知识库。
- 离线评估。
- 验证 HNSW / IVF / PQ 的召回率。

---

## 5\. HNSW：现在最常见的默认选择

HNSW，全称 Hierarchical Navigable Small World，是目前向量数据库最常见的 ANN 图索引之一。

它把向量组织成多层小世界图：

- 上层图节点少，用来快速跳到目标区域。
- 下层图节点多，用来精细搜索。
- 查询时从高层入口开始，逐层向下贪心搜索。

### 优点

- 查询速度快。
- 召回率高。
- 不需要像 IVF 那样提前训练聚类中心。
- 参数相对直观。
- Qdrant、Weaviate、pgvector、OpenSearch、Elasticsearch、Chroma 等都广泛使用或支持。

### 缺点

- 内存占用较高，因为除了向量本身，还要存图边。
- 构建索引较慢，尤其是高 recall 配置。
- 动态删除和大量更新比普通数据库索引更麻烦。
- 超大规模时成本可能高，需要量化或磁盘索引配合。

### 常用参数

| 参数 | 作用 | 调大后效果 | 代价 |
| --- | --- | --- | --- |
| M | 每个节点最多连接多少邻居 | 图更密，召回更高 | 内存增加，构建变慢 |
| efConstruction | 构建索引时的候选队列大小 | 索引质量更高 | 构建时间增加 |
| efSearch | 查询时的候选队列大小 | 召回更高 | 查询延迟增加 |
| top\_k | 返回结果数量 | 返回更多候选 | 后处理成本增加 |

经验起点：

| 场景 | M | efConstruction | efSearch |
| --- | --- | --- | --- |
| 低延迟优先 | 16 | 100-128 | 32-64 |
| 平衡配置 | 32 | 128-256 | 64-128 |
| 高召回优先 | 48-64 | 256-512 | 128-256 |

注意：HNSW 的最终表现和 embedding 模型、向量维度、数据分布、过滤条件都有关系，不能只看参数。

---

## 6\. IVF：聚类倒排索引

IVF，全称 Inverted File Index，思想类似搜索引擎的倒排表，但不是按词倒排，而是按向量聚类倒排。

基本流程：

1. 用 k-means 把全部向量聚成 nlist 个簇。
2. 每个向量分配到最近的簇。
3. 查询时先找到 query 最近的若干个簇。
4. 只在这些簇里做精细检索。

### 优点

- 相比 Flat，查询只扫描部分向量。
- 相比 HNSW，内存可以更可控。
- 适合和 PQ、SQ 等压缩技术组合。
- Faiss、Milvus 等大规模检索系统常用。

### 缺点

- 需要训练索引。
- 召回率强依赖 nlist 和 nprobe。
- 如果数据分布变化明显，聚类中心可能需要重训。
- 对小数据集未必比 HNSW 更省心。

### 常用参数

| 参数 | 作用 | 调大后效果 | 代价 |
| --- | --- | --- | --- |
| nlist | 聚类中心数量，也就是倒排桶数量 | 每个桶更小，扫描更少 | 训练更慢；nprobe 也要配合 |
| nprobe | 查询时搜索多少个桶 | 召回更高 | 查询更慢 |
| metric | 距离类型 | 影响相似度定义 | 需和 embedding 训练目标一致 |

经验起点：

- nlist 可以从 `sqrt(N)` 到 `4 * sqrt(N)` 附近试起。
- nprobe 可以先设为 nlist 的 1%-10%。
- 如果召回不够，优先增大 nprobe。
- 如果查询太慢，降低 nprobe 或增大 nlist 后重新评估。

---

## 7\. PQ、SQ、BQ：向量压缩和量化

大模型 embedding 常见维度是 384、768、1024、1536、3072 等。假设 1 亿条 768 维 float32 向量：

```
100,000,000 * 768 * 4 bytes = 307.2 GB
```

还没算索引结构、元数据和副本。因此生产系统经常需要压缩。

### 7.1 Product Quantization，PQ

PQ 把一个高维向量切成多个子向量，然后每个子空间用码本表示。

例如 768 维向量切成 96 段，每段 8 维，每段用一个 byte 编码，就可以把一个向量压缩到约 96 bytes，远小于原始 3072 bytes。

优点：

- 压缩率高。
- 适合超大规模。
- 常和 IVF 组合成 IVF\_PQ。

缺点：

- 召回会下降。
- 参数复杂。
- 需要训练码本。
- 对高精度 RAG，通常需要 rerank 或存原向量做二阶段精排。

常用参数：

| 参数 | 作用 | 调大后效果 | 代价 |
| --- | --- | --- | --- |
| m | 子向量个数 | 编码更细，精度可能更好 | 编码长度和计算成本增加 |
| nbits | 每个子向量编码位数 | 码本更大，表达力更强 | 内存和训练成本增加 |
| nlist | IVF 聚类数 | 候选桶更细 | 训练成本增加 |
| nprobe | 搜索桶数量 | 召回更高 | 延迟增加 |

### 7.2 Scalar Quantization，SQ

SQ 把 float32 压缩成 int8、uint8、float16 等更低精度表示。

优点：

- 工程简单。
- 压缩效果稳定。
- 对召回影响通常比 PQ 更温和。

缺点：

- 压缩率不如 PQ。
- 极端精度需求下仍可能损失召回。

### 7.3 Binary Quantization，BQ

BQ 把向量压成二进制表示，使用 Hamming 距离等方式快速比较。

优点：

- 压缩率极高。
- 适合极低成本或粗召回。

缺点：

- 信息损失较大。
- 通常需要二阶段重排。

---

## 8\. 现在主流到底用什么

最常见：

- HNSW 作为默认向量索引。
- top\_k 取 10-100。
- 再用 reranker 重排到 3-10 条上下文。
- 同时加入 BM25 或关键词检索做 hybrid search。

代表工具：

- Qdrant：HNSW + payload filter。
- Weaviate：HNSW + hybrid search。
- Milvus：HNSW、IVF、PQ、DiskANN 等多索引。
- pgvector：exact、IVFFlat、HNSW。
- Elasticsearch / OpenSearch：向量检索 + BM25 混合。
- Chroma：轻量 RAG 开发常见。
- Faiss：本地或自研检索服务常用底层库。

### 9\. 常用参数解释

### 9.1 通用参数

| 参数 | 含义 | 常见取值 | 影响 |
| --- | --- | --- | --- |
| dim | 向量维度 | 384、768、1024、1536、3072 | 维度越高，存储和计算越贵 |
| metric | 距离类型 | cosine、ip、l2 | 必须和 embedding 模型匹配 |
| top\_k | 返回候选数量 | 5、10、20、50、100 | 越大召回更多，但后处理更慢 |
| batch\_size | 批量写入或查询大小 | 32-1024 | 影响吞吐和内存 |
| normalize | 是否归一化向量 | true/false | cosine 常配合 normalize |
| filter | 元数据过滤 | tenant、time、category、acl | 强过滤会影响 ANN 搜索效果 |

### 9.2 HNSW 参数

| 参数 | 推荐起点 | 说明 |
| --- | --- | --- |
| M | 16-32 | 图中每个节点的连接数，影响召回和内存 |
| efConstruction | 128-256 | 构建索引时探索的候选数，影响索引质量 |
| efSearch | 64-128 | 查询时探索的候选数，影响召回和延迟 |

调参方向：

- 召回低：增大 efSearch。
- 召回仍低：增大 M 和 efConstruction，重建索引。
- 延迟高：降低 efSearch，减少 top\_k，或加 rerank 前粗筛。
- 内存高：降低 M，启用量化，或换 IVF/PQ/DiskANN。

### 9.3 IVF 参数

| 参数 | 推荐起点 | 说明 |
| --- | --- | --- |
| nlist | sqrt(N) 到 4 \* sqrt(N) | 聚类桶数量 |
| nprobe | nlist 的 1%-10% | 查询时扫描桶数量 |

调参方向：

- 召回低：增大 nprobe。
- 延迟高：降低 nprobe。
- 桶太大：增大 nlist 并重新训练。
- 数据分布变化明显：重新训练 IVF。

### 9.4 PQ 参数

| 参数 | 推荐起点 | 说明 |
| --- | --- | --- |
| m | 维度的因子，如 768 维可用 64 或 96 | 子向量个数 |
| nbits | 8 | 每段编码位数，8 表示每段 256 个中心 |
| use\_original\_vectors\_for\_rerank | true | 候选召回后用原向量或原文本重排 |

---

## 10\. 案例一：Faiss 精确检索 Flat

安装：

```
pip install faiss-cpu sentence-transformers numpy
```

示例：

```
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

docs = [
    "HNSW 是一种基于图的近似最近邻搜索算法。",
    "IVF 使用聚类中心把向量分到不同倒排桶里。",
    "Product Quantization 可以显著压缩向量存储。",
    "RAG 会先检索相关文档，再把上下文交给大模型。",
    "BM25 是传统关键词检索算法。",
]

query = "大模型 RAG 为什么需要向量检索？"

model = SentenceTransformer("BAAI/bge-small-zh-v1.5")

doc_vectors = model.encode(docs, normalize_embeddings=True).astype("float32")
query_vector = model.encode([query], normalize_embeddings=True).astype("float32")

dim = doc_vectors.shape[1]

# 归一化后，用 Inner Product 等价于 Cosine Similarity。
index = faiss.IndexFlatIP(dim)
index.add(doc_vectors)

top_k = 3
scores, ids = index.search(query_vector, top_k)

for score, idx in zip(scores[0], ids[0]):
    print(f"score={score:.4f}, doc={docs[idx]}")
```

关键点：

- `normalize_embeddings=True` ：把向量归一化。
- `IndexFlatIP` ：使用点积检索。
- `top_k` ：返回最相似的 k 条。
- Flat 没有训练过程，适合作为 baseline。

---

## 11\. 案例二：Faiss HNSW

```
import faiss
import numpy as np
from sentence_transformers import SentenceTransformer

docs = [
    "向量数据库常用 HNSW 作为默认索引。",
    "efSearch 越大，HNSW 查询召回通常越高。",
    "M 控制 HNSW 图中每个节点的最大邻居数量。",
    "IVF 的 nprobe 控制查询时扫描多少个聚类桶。",
    "DiskANN 适合超大规模磁盘向量检索。",
]

query = "HNSW 有哪些重要参数？"

model = SentenceTransformer("BAAI/bge-small-zh-v1.5")
doc_vectors = model.encode(docs, normalize_embeddings=True).astype("float32")
query_vector = model.encode([query], normalize_embeddings=True).astype("float32")

dim = doc_vectors.shape[1]

M = 32
index = faiss.IndexHNSWFlat(dim, M, faiss.METRIC_INNER_PRODUCT)

# efConstruction 影响建图质量。必须在 add 前设置。
index.hnsw.efConstruction = 128
index.add(doc_vectors)

# efSearch 影响查询召回和延迟。可以按查询场景动态调整。
index.hnsw.efSearch = 64

scores, ids = index.search(query_vector, 3)

for score, idx in zip(scores[0], ids[0]):
    print(f"score={score:.4f}, doc={docs[idx]}")
```

参数说明：

- `M=32` ：图连接数，越大越准，但更耗内存。
- `efConstruction=128` ：构建时候选数量，越大索引质量越好。
- `efSearch=64` ：查询时候选数量，越大召回越好但越慢。
- `faiss.METRIC_INNER_PRODUCT` ：向量已归一化时可表示 cosine。

---

## 12\. 案例三：Faiss IVF\_FLAT

IVF 需要训练索引。真实场景至少需要几千到几万条训练向量；下面为了演示，用随机向量构造。

```
import faiss
import numpy as np

np.random.seed(42)

num_vectors = 10000
dim = 768
top_k = 5

vectors = np.random.random((num_vectors, dim)).astype("float32")
queries = np.random.random((3, dim)).astype("float32")

faiss.normalize_L2(vectors)
faiss.normalize_L2(queries)

nlist = 100
quantizer = faiss.IndexFlatIP(dim)
index = faiss.IndexIVFFlat(quantizer, dim, nlist, faiss.METRIC_INNER_PRODUCT)

# IVF 必须先 train，再 add。
index.train(vectors)
index.add(vectors)

# nprobe 控制搜索多少个聚类桶。
index.nprobe = 10

scores, ids = index.search(queries, top_k)

print("ids:")
print(ids)
print("scores:")
print(scores)
```

参数说明：

- `nlist=100` ：把向量聚成 100 个桶。
- `nprobe=10` ：每次查询搜索最相关的 10 个桶。
- `nprobe` 越大召回越高，延迟也越高。
- `train(vectors)` ：训练 IVF 聚类中心。

调参建议：

- 召回不够时，把 `nprobe` 从 5、10、20、50 逐步加大。
- 如果每个桶太大，增加 `nlist` 并重新训练。
- 如果数据只有几万条，HNSW 往往更省心。

---

## 13\. 案例四：Faiss IVF\_PQ 压缩索引

IVF\_PQ 适合大规模低内存场景。

```
import faiss
import numpy as np

np.random.seed(42)

num_vectors = 50000
dim = 768
top_k = 10

vectors = np.random.random((num_vectors, dim)).astype("float32")
queries = np.random.random((2, dim)).astype("float32")

faiss.normalize_L2(vectors)
faiss.normalize_L2(queries)

nlist = 256
m = 96
nbits = 8

quantizer = faiss.IndexFlatIP(dim)
index = faiss.IndexIVFPQ(
    quantizer,
    dim,
    nlist,
    m,
    nbits,
    faiss.METRIC_INNER_PRODUCT,
)

index.train(vectors)
index.add(vectors)

index.nprobe = 16

scores, ids = index.search(queries, top_k)

print(ids)
print(scores)
```

参数说明：

- `nlist=256` ：IVF 聚类桶数。
- `m=96` ：把 768 维切成 96 个子向量，每段 8 维。
- `nbits=8` ：每个子向量用 8 bit 编码，也就是 256 个码字。
- `nprobe=16` ：查询时扫描 16 个桶。

优缺点：

- 优点：内存明显下降。
- 缺点：召回通常低于 HNSW 和 IVF\_FLAT。
- 生产中常用做法：IVF\_PQ 召回较多候选，再用原始向量、cross encoder 或 LLM rerank 精排。

---

## 14\. 案例五：Qdrant HNSW 向量库

Qdrant 是 RAG 中很常见的向量数据库，默认核心索引是 HNSW。

安装：

```
pip install qdrant-client sentence-transformers
```

本地启动：

```
docker run -p 6333:6333 qdrant/qdrant
```

Python 示例：

```
from qdrant_client import QdrantClient
from qdrant_client.models import (
    Distance,
    HnswConfigDiff,
    PointStruct,
    VectorParams,
)
from sentence_transformers import SentenceTransformer

collection_name = "rag_docs"

docs = [
    {"id": 1, "text": "HNSW 是当前 RAG 常用的向量检索索引。", "source": "ann"},
    {"id": 2, "text": "BM25 可以和向量检索组成混合检索。", "source": "sparse"},
    {"id": 3, "text": "reranker 通常放在召回之后，用于提高最终上下文质量。", "source": "rerank"},
]

model = SentenceTransformer("BAAI/bge-small-zh-v1.5")
vectors = model.encode(
    [item["text"] for item in docs],
    normalize_embeddings=True,
).tolist()

client = QdrantClient(url="http://localhost:6333")

client.recreate_collection(
    collection_name=collection_name,
    vectors_config=VectorParams(
        size=len(vectors[0]),
        distance=Distance.COSINE,
        hnsw_config=HnswConfigDiff(
            m=32,
            ef_construct=128,
        ),
    ),
)

points = [
    PointStruct(
        id=item["id"],
        vector=vector,
        payload={"text": item["text"], "source": item["source"]},
    )
    for item, vector in zip(docs, vectors)
]

client.upsert(collection_name=collection_name, points=points)

query = "RAG 里向量召回后为什么还要重排？"
query_vector = model.encode(query, normalize_embeddings=True).tolist()

results = client.search(
    collection_name=collection_name,
    query_vector=query_vector,
    limit=3,
    search_params={"hnsw_ef": 64, "exact": False},
)

for hit in results:
    print(hit.score, hit.payload["text"])
```

参数说明：

- `m=32` ：HNSW 图连接数。
- `ef_construct=128` ：建图质量参数。
- `hnsw_ef=64` ：查询时 efSearch 类参数。
- `Distance.COSINE` ：使用 cosine 距离。
- `exact=False` ：使用近似搜索；调试时可设 `exact=True` 对比召回。

---

## 15\. 案例六：RAG 检索 + 简单重排框架

实际 RAG 里，向量 top\_k 不一定就是最终喂给 LLM 的上下文。常见做法是先召回较多，再重排取少量。

```
from sentence_transformers import CrossEncoder, SentenceTransformer
import faiss
import numpy as np

docs = [
    "HNSW 是一种图索引，常用于向量数据库。",
    "IVF 会先聚类，再只搜索部分聚类桶。",
    "PQ 可以压缩向量，但可能损失召回。",
    "RAG 需要把检索到的文档作为上下文交给大模型。",
    "权限过滤是企业 RAG 必须考虑的问题。",
]

query = "企业 RAG 为什么不能只做向量检索？"

embedder = SentenceTransformer("BAAI/bge-small-zh-v1.5")
doc_vectors = embedder.encode(docs, normalize_embeddings=True).astype("float32")
query_vector = embedder.encode([query], normalize_embeddings=True).astype("float32")

index = faiss.IndexFlatIP(doc_vectors.shape[1])
index.add(doc_vectors)

# 第一阶段：向量召回更多候选。
candidate_k = 5
scores, ids = index.search(query_vector, candidate_k)
candidate_docs = [docs[i] for i in ids[0]]

# 第二阶段：cross encoder 重排。
reranker = CrossEncoder("BAAI/bge-reranker-base")
pairs = [(query, doc) for doc in candidate_docs]
rerank_scores = reranker.predict(pairs)

ranked = sorted(
    zip(candidate_docs, rerank_scores),
    key=lambda item: item[1],
    reverse=True,
)

final_context = [doc for doc, score in ranked[:3]]

print("最终上下文：")
for doc in final_context:
    print("-", doc)
```

实际生产中可以把第一阶段换成 HNSW、IVF、Qdrant、Milvus、Elasticsearch 等。

---

## 16\. Hybrid Search：为什么向量检索经常要配 BM25

纯向量检索擅长语义相似，但不总是适合精确匹配。

例如：

- 查错误码： `ERR_CONN_RESET_1045`
- 查订单号： `order_id=ABC123`
- 查函数名： `getUserProfileById`
- 查法规条款： `第十二条第三款`

这些场景 BM25、关键词、倒排索引往往更可靠。

17\. 常见融合方式：

### 17.1 并行召回

```
query
  -> dense vector search top 50
  -> BM25 keyword search top 50
  -> merge
  -> rerank
  -> top 5 context
```

### 17.2 分数融合

常见方法：

- 加权求和： `score = alpha * dense_score + (1 - alpha) * sparse_score`
- RRF，Reciprocal Rank Fusion：按排名融合，不依赖原始分数尺度。

RRF 简单示例：

```
def rrf_fusion(rank_lists, k=60):
    scores = {}

    for rank_list in rank_lists:
        for rank, doc_id in enumerate(rank_list, start=1):
            scores[doc_id] = scores.get(doc_id, 0.0) + 1.0 / (k + rank)

    return sorted(scores.items(), key=lambda item: item[1], reverse=True)

dense_rank = ["doc1", "doc3", "doc2", "doc5"]
sparse_rank = ["doc2", "doc4", "doc1", "doc6"]

print(rrf_fusion([dense_rank, sparse_rank]))
```

---

## 18\. 如何评估向量检索效果

不要只看“查得快”，还要看“查得准”。

常见指标：

| 指标 | 含义 |
| --- | --- |
| Recall@K | 标准答案是否出现在前 K 个候选中 |
| Precision@K | 前 K 个结果里相关结果比例 |
| MRR | 第一个正确结果排名越靠前越好 |
| nDCG | 考虑相关性等级和排名位置 |
| Latency P50/P95/P99 | 延迟分布 |
| QPS | 每秒查询数 |
| Index Build Time | 索引构建时间 |
| Memory / Disk | 存储成本 |

建议做一个评估集：

```
query, positive_doc_ids, hard_negative_doc_ids
```

然后比较：

- Flat baseline。
- HNSW 不同 efSearch。
- IVF 不同 nprobe。
- 是否启用量化。
- 是否加 BM25。
- 是否加 reranker。

---

## 19\. 选型建议

- HNSW 是默认首选。
- 如果内存成本高，考虑 SQ 或 IVF。
- RAG 场景建议加 reranker。

---

## 20\. 常见坑

### 20.1 向量没有归一化

如果你想用 cosine，但实际用了 inner product 且没有 normalize，结果可能偏向向量长度大的样本。

### 20.2 chunk 切得太差

向量索引再好，也救不了糟糕的 chunk。

常见问题：

- chunk 太长，主题混杂。
- chunk 太短，缺上下文。
- 表格、代码、标题层级被破坏。
- 元数据丢失。

### 20.3 top\_k 太小

只取 top 3 然后直接给 LLM，容易漏掉真正答案。生产 RAG 常先召回更多，再重排。

### 20.4 只用向量不用关键词

错误码、ID、专有名词、函数名、条款编号等场景，BM25 往往更稳。

### 20.5 过滤条件没有评估

强过滤会改变 ANN 搜索质量。需要单独评估带过滤条件的 Recall@K 和延迟。

### 20.6 用线上大索引直接调参

调参最好先抽样，建立评估集，再逐步扩大。否则很难判断是参数问题、数据问题还是 embedding 问题。

最后，大家在项目上选向量检索算法，别光盯着“谁最快”，先问问自己：数据有多少？能忍多慢的延迟？召回率底线在哪？数据是不是经常增删？内存够不够？能不能接受两阶段重排？把这些搞清楚了，答案自然就出来了。对大多数团队，起步直接上 HNSW + 混合检索 + 重排就够了；等数据量爆了、成本扛不住了，再慢慢加量化、IVF就可以了。

继续滑动看下一个

算法屋

向上滑动看下一个