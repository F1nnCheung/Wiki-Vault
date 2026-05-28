idong *2026年4月27日 22:08*

`Milvus` 是开源的分布式向量数据库，非常适合大规模的向量检索场景

优点：高性能检索、弹性扩展、生态完善

官网的 `Milvus` 高度解耦的系统架构图

![图片](https://mmbiz.qpic.cn/mmbiz_png/9dfpHJgbSFLWzWaTJB2qMxOnZibpH5ZCnKjHI9mQhaPezsDcTsKo7jBO9QibTQBNVs8l1J9QOTfVnoyjcfEPT0o0bHMvclf6AKiam6PlPf8bmY/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

#### 基本概念

以下介绍下向量数据库的基本概念，以便快速了解。想要深入研究请看官网：https://Milvus.io/docs/zh/create-collection.md

##### 数据库（Database）

数据库是 **组织和管理数据的逻辑单元** 。你可以创建多个数据库，为不同的应用程序或租户从逻辑上隔离数据

##### 集合(Collection)

向量 **数据存放的容器** ，相当于数据库中的表

- 所有向量按照业务存储在 `collection` 里
- 每个 `collection` 有固定的Schema结构
- 增删改查都在 `collection` 上操作

##### 字段（Field）

相当于 `mysql` 表中的 **列** ，一个集合有：

- 主键字段（必须）
- 向量字段（必须，指定维度 `dim` ）
- 其他标量字段（ `int` / `string` / `bool` 等）

##### 实体（Entity）

**一行数据** 、有主键ID+向量+标量字段

##### 向量（Vector）

**浮点数组** ，如\[0.1, 0.2, 0.3,..., 0.768\]。由模型（ `BGE` ）把文本、图片、音频转成 **特征表示** 。常见维度： **768、1024、1536**

##### 分区（Partition）

分区是 **集合的子集** ，对集合做 **数据分组** 。当创建一个集合时，默认会创建一个 **\_default 的** 分区。如果不增加其他分区，插入到集合的实体数据都会进入默认分区。创建分区会加快查询，缩小扫描范围

##### 索引（Index）

**快速检索结构** ，没有索引全表遍历很慢，有了索引加快搜索速度

- **FLAT**: 暴力全比对向量，最准但最慢，适合小数据
	**官方例子** ：
	```cs
	#建立索引ndex_params.add_index(    field_name="your_vector_field_name", # 要给哪个向量字段建索引（表中的向量列名）    index_type="FLAT", # 索引类型：FLAT    index_name="vector_index", # 给索引起个名字    metric_type="L2", # 相似度计算方式：L2距离    params={} # FLAT 不需要任何额外参数)#在索引上搜索res = MilvusClient.search(    collection_name="your_collection_name",# 集合名称（就是你存向量的“表名”）    anns_field="vector_field", # 向量字段名（表里存向量的列名）    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],  # 要查询的向量（你拿这个向量去搜相似的）# 返回最相似的前 3 条结果（TopK）
	    search_params={"params": {}}  # FLAT 索引不需要额外参数)
	```
- **IVF\_FLAT**: 先将向量聚类分桶，再查桶，快、常用。
	**解释** ：如果把向量比做成书籍的话。这个算法（ `IVF` ）就是通过K-Means将书籍进行归类（分区），把书籍放在不同的书架。具体会划分多少书架，得看设置的 `nlist` ， `nlist` 是多少，就会将书籍划分成多少个书架。所以在进行向量检索的时候，只需要检索相近的几个分区就能快速的找到向量了。设置 `nprobe`, `nprobe` 代表检索相近几个分区。 `FLAT` 则是完整保存向量，不压缩，比对距离时是精准原始计算，没有精度损耗。
	**官方例子**
	```makefile
	#建立索引index_params.add_index(    field_name="your_vector_field_name", # 要给哪个向量字段建索引（表中的向量列名）    index_type="IVF_FLAT", # 索引类型：IVF_FLAT    index_name="vector_index", # 给索引起个名字    metric_type="L2", # 相似度计算方式：L2距离    params={        "nlist": 64, # nlist 越大，则分区越多，单个分区数据少，检索速度快；nlist 越小，单个分区的数据就越大，检索的速度不快    } )
	#在索引上搜索search_params = {    "params": {        "nprobe": 10, # nprobe越大，则检索越准确，但是检索慢；nprobe越小，则检索越快，但是容易漏掉结果；    }}res = MilvusClient.search(    collection_name="your_collection_name", # 集合名称    anns_field="vector_field",    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],  # 查询向量    limit=3,  # 返回 Top3    search_params=search_params)
	```
- **IVF\_SQ8**: 对向量压缩，省内存，精度略降
	**解释** ：在分区的逻辑上和 `IVF_FLAT` 一样，唯一的区别是对向量进行了高强度压缩，只保留核心特征，丢掉了微小的细节。所以这种索引节省了大量的内存空间
	**官方例子**
	```makefile
	#建立索引index_params.add_index(    field_name="your_vector_field_name", # 要给哪个向量字段建索引（表中的向量列名）    index_type="IVF_SQ8", # 索引类型：IVF_SQ8    index_name="vector_index", # 给索引起个名字    metric_type="L2", # 相似度计算方式：L2距离    params={        "nlist": 64, # nlist 越大，则分区越多，单个分区数据少，检索速度快；nlist 越小，单个分区的数据就越大，检索的速度不快    } )
	#在索引上搜索search_params = {    "params": {        "nprobe": 8, # 检索相近分区的数量    }}res = MilvusClient.search(    collection_name="your_collection_name",     anns_field="vector_field",     data=[[0.1, 0.2, 0.3, 0.4, 0.5]],    limit=10,    search_params=search_params)
	```
- **HNSW**: 基于图结构，查询最快，精度最高，耗内存
	**解释**: 每个向量都与其他向量相连，组成一个超大的关系网络图，多层立体地图。向量完整原始保存，不压缩，不分区。向量检索通过地图进行跳跃查找。
	**官方例子**
	```makefile
	#建立索引index_params.add_index(    field_name="your_vector_field_name", # 要给哪个向量字段建索引（表中的向量列名）    index_type="HNSW", # 索引类型：HNSW    index_name="vector_index", # 给索引起个名字    metric_type="L2", # 相似度计算方式：L2距离    params={        "M": 64, # :每个节点可连接的最大邻居数量        "efConstruction": 100 # 索引构建过程中考虑连接的候选邻居数量    })
	#在索引上搜索search_params = {    "params": {        "ef": 10, #搜索时要考虑的邻居数量    }}
	res = MilvusClient.search(    collection_name="your_collection_name",    anns_field="vector_field",     data=[[0.1, 0.2, 0.3, 0.4, 0.5]],    limit=10,    search_params=search_params)
	```
- **SCANN**: 平衡速度与精度，高召回场景用
	**解释** ：结合了以上 `IVF` 、 `SQ8` 、 `HNSW` 的优点：
	1. 先像 `IVF` 一样： **划分大区、粗分区** ，先大范围缩小搜索范围
		2. 再像 `SQ8` 一样： **局部向量压缩** ，控制内存
		3. 最后像 `HNSW` 一样：在分区内部， **搭建小型邻居网络图** ，精细快速检索
	**官方例子**
	```makefile
	#建立索引index_params.add_index(    field_name="your_vector_field_name", # 要给哪个向量字段建索引（表中的向量列名）    index_type="SCANN", # 索引类型：SCANN    index_name="vector_index", # 给索引起个名字    metric_type="L2", # 相似度计算方式：L2距离    params={        "with_raw_data": True, # 是否在存储量化表示的同时存储原始向量数据。    })
	#在索引上搜索search_params = {    "params": {        "reorder_k": 10, # 在重新排序阶段要细化的候选实体数量        "nprobe": 8 # 要搜索的分区    }}
	res = MilvusClient.search(    collection_name="your_collection_name",    anns_field="vector_field",    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],    limit=10,    search_params=search_params)
	```
- **DISKANN**: 磁盘级图索引，向量落盘存储，适合海量向量+ `SSD` 环境
	**解释** ：把向量本体全部存在磁盘，内存只留导航索引，用磁盘换容量、省机器内存，速度略弱 `HNSW` ，远超 IVF 系列，是超大规模向量库的低成本方案。
	**官方案例** ：
	默认情况下， `Milvus` 会禁用 `DISKANN` ，以优先提高内存中索引的速度，以适应 `RAM` 中的数据集。
	`Milvus.yaml` 配置：
	```apache
	common:  DiskIndex:    MaxDegree: 56              # 每个向量最多连多少条“邻居线”    SearchListSize: 100        # 搜索时一次查多少候选    PQCodeBudgetGBRatio: 0.125  # 向量压缩比例，压缩到原来的 1/8    SearchCacheBudgetGBRatio: 0.1  # 内存里放多少缓存    BeamWidthRatio: 4          # 磁盘读取并发度
	```

**总结**

索引的选择：

| 场景 | 索引 |
| --- | --- |
| 数据量小，追求绝对精准，不在乎速度 | FLAT |
| 常规业务，百万级向量，平衡好用 | IVF\_FLAT |
| 海量向量，内存紧张 | IVF\_SQ8 |
| 线上高并发、接口低延迟、不差内存 | HNSW |
| 海量向量、高召回、省内存、速度快 | SCANN |
| 海量向量、内存极小、依赖高速 SSD、低成本扩容 | DISKANN |

##### 相似度量（Metric Type）

`Milvus` 通过不同的距离计算方式，判断两个向量之间的相似度，三种常用度量规则如下：

- **L2(欧式距离)** ：计算向量空间直线距离，数值越小，向量越相似
- **IP(内积)** ：计算向量关联程度，数值越大，向量越相似
- **CONSINE(余弦)** ：直比对向量方向，不关注长度，数值越大，语义/特征越相似

##### 检索（Search）

向量检索即相速度查询：业务传入一个目标查询向量， `Milvus` 根据选定的向量相似度度量公式，在向量索引中快速比对所有向量，最终返回 `TOP-K` 相似度最高的匹配结果。

##### 总结

以上就是 `Milvus` 向量数据库的简单介绍，想要深入了解的同学可以去官网研究。

RAG · 目录

继续滑动看下一个

架架架构师

向上滑动看下一个