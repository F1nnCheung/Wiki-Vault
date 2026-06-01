小橙子 *2026年5月21日 08:06*

## 多模态 与 LLM+工具链

多数时候，遇到"非文本输入"时，第一反应都是找解析工具，比如PDF 用 pdfminer，Word 用 python-docx，音频用 Whisper 转写，PPT 拆页截图再 OCR。

LLM+工具链这种方式，看起来大部场景下完全够用。但随着业务复杂度上升，开始碰到一些解析工具解决不了的问题，比如扫描件的表格识别精度差、图文混排的语义关系丢失、复杂图表根本无法转成文字。

（ps：本文只是非常简单的概念内容，起因是使用Langchain接多模态的时候发现很多参数设计并不多模态~）

---

## LLM 的底层原理

### 一切皆 Token

LLM 处理的基本单位是 Token，而不是字符或词。以 BPE（Byte Pair Encoding）为例，分词器会把文本切成高频子词片段： `"tokenization"` 可能被切成 `["token", "ization"]` 。每个 Token 映射到一个高维向量，这是模型理解语言的起点。

**LLM 天然只能处理可以被 Token 化的序列** 。图像、音频、视频不在其中。

### Transformer 的核心：Self-Attention

Transformer 的核心机制是 Self-Attention，对于输入序列中的每一个 Token，模型都会计算它与其他所有 Token 的相关权重，然后加权聚合信息。这让模型能捕捉长距离依赖关系，比如句子开头的主语和句尾的谓语之间的关系。

多层 Transformer 堆叠之后，底层捕获语法结构，高层捕获语义和推理关系。

### 自回归生成

GPT 系列模型的生成方式是自回归，每次预测下一个 Token 的概率分布，采样后拼回输入，再预测下一个，循环往复。这意味着生成过程天然是顺序的， **输出同样只能是 Token 序列** 。

输入是 Token 序列、输出是 Token 序列。

### LLM 能力边界

当前主流的LLM 擅长的事情基本集中在语义理解、逻辑推理、文本生成、代码生成、结构化输出等方面，各家各有侧重。

LLM 不擅长的事情，不是因为模型不够聪明，而是因为 **输入形式的限制** ：图像、声音等没有被文字化的信息无法识别读取。

---

## LLM + 工具链方案

### 工具链

一切皆文本： **把源数据翻译成文本，再交给 LLM** 。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/MIicShn2JIYs2CdRJYe6Vz2YEA9Sngp9TRLpf6Tt7RD3LkYLJrKju9HJN4O2ETHAroLfZKU3Oz1GbDIicCfY8fffiaqiaURfCahs9YcnooJdNbk/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

这套方案即便在现在，依旧在大量 LLM 应用中被大量采用，工具链也越来越成熟。

### 优势

**成本可控** 。文字提取工具几乎免费，OCR 的 API 成本远低于把图片送给多模态模型（图片往往消耗大量 Token）。实际生产环境下，批量处理百万级文档时，成本差距可能就不在一个量级上了。

**速度快** 。解析工具是确定性程序，没有模型推理延迟。提取文字这一步通常在毫秒级完成。

**可控性强** 。已经知道解析器输出了什么，可以在送入 LLM 之前做清洗、过滤、格式化。出了问题容易定位是哪一步出的错。

**长文档友好** 。工具链可以把文档拆成任意粒度的 chunk，结合向量检索（RAG）处理几百页的 PDF。多模态模型受上下文窗口限制，直接处理长文档成本极高。

**部署简单** 。开源工具链本地跑，不依赖大模型推理基础设施。

### 缺点

**解析层信息损失** 是最根本的问题。比如：

- • **图文关系** ：一张图表旁边有一段解释文字，解析后图表要么变成 `[图片]` 占位符，要么被 OCR 成乱码，而那段文字和图表的空间关系完全丢失。
- • **排版语义** ：大标题和正文的字号不同，传递的权重信息是不一样的。解析成纯文本后，这些信息消失了，版面信息很难得到正确的解析。
- • **复杂表格** ：合并单元格、多级表头，很多工具解析出来后行列对应关系是错的。
- • **扫描件** ：没有文字层，全靠 OCR，识别精度受图像质量影响大，手写内容、印章基本无解。

**格式鲁棒性差** 。不同软件生成的 PDF 内部结构差异很大，同一套解析代码在某些 PDF 上能工作，换一个生成器就可能乱码或报错。

[RAG：PDF解析难在哪，主流方案是什么](https://mp.weixin.qq.com/s?__biz=MzIzNTExNzMwNg==&mid=2647833392&idx=1&sn=acfcf7995e1c36b59ddaa95f66b0e9eb&scene=21#wechat_redirect)

**多工具拼接的维护成本** 。每种文件类型对应一个工具，版本升级、格式变化都需要维护。当工具链变长，整体可靠性就变得复杂了。

**图表无法语义化** 。一张折线图，OCR 可能只能读出坐标轴上的数字，趋势信息完全丢失。这类内容只能依赖旁边的文字描述，而很多文档里图表是独立存在的。

---

## 多模态模型的底层原理

### 模型处理不同模态

纯 LLM 只有一个输入通道：Token 序列。多模态模型要做的事情，是给图像、音频等模态也建立对应的"输入通道"，并且让这些通道的输出能和文本 Token 放在一起，统一送入 LLM 主干推理。

实现这一点，需要解决两个子问题：

1. 1\. 如何把图像/音频转换成向量表示？
2. [从词袋到语义：向量（上）](https://mp.weixin.qq.com/s?__biz=MzIzNTExNzMwNg==&mid=2647833156&idx=1&sn=f0ce9fd4f8d6f1af66a6228bb3f05088&scene=21#wechat_redirect)
3. 2\. 如何保证这个向量表示和文本的向量表示在同一个语义空间里，让 LLM 能统一理解？
4. [从词袋到语义：向量（中）](https://mp.weixin.qq.com/s?__biz=MzIzNTExNzMwNg==&mid=2647833223&idx=1&sn=3c519a3974edd6d5cc8f76c430319dc2&scene=21#wechat_redirect)
5. [从词袋到语义：向量（下）](https://mp.weixin.qq.com/s?__biz=MzIzNTExNzMwNg==&mid=2647833257&idx=1&sn=f9df7affa1221cc130afa6dbec971dfa&scene=21#wechat_redirect)

### 视觉编码器：ViT 和 CLIP

**ViT（Vision Transformer）** 的做法是把图像切成固定大小的 Patch（比如 16×16 像素），每个 Patch 展平后映射成一个向量，类似于文本中的 Token。这样图像就变成了一个"视觉 Token 序列"，可以送入 Transformer 处理。

但仅仅把图像变成向量还不够，还需要让这些向量和文本向量能统一表征，也即是"说同一种语言"。 **CLIP（Contrastive Language-Image Pre-training）** 解决这个问题。CLIP 用图文对数据（一张图 + 对应描述文字）做对比学习训练：配对的图文在向量空间中距离近，不配对的距离远。训练完成后，"一只猫坐在窗台上"这句话和对应图片的向量会非常接近。这就是跨模态语义对齐的核心机制。

### 音频编码器

音频不能直接送进 Transformer，需要先转换成数值表示。常用的方式是 **Mel 频谱图** ：对音频做傅里叶变换，提取不同频率随时间的能量分布，得到一个二维矩阵。这个矩阵可以用类似图像的方式处理，送入音频编码器（比如 Whisper 使用的卷积 + Transformer 结构）生成向量序列。

需要区分两种处理方式：

- • **级联方式** ：先用 ASR（自动语音识别）把音频转成文字，再送入 LLM。这是 LLM+工具链方案中 Whisper 的用法，损失了语气、情感、停顿等声学信息。
- • **端到端方式** ：音频编码器直接生成向量，送入多模态 LLM 统一推理。GPT-4o、Gemini 等原生多模态模型采用这种方式，能感知语气和情感。

### 跨模态对齐：投影层的作用

视觉编码器和音频编码器输出的向量维度和分布，和 LLM 的文本 Embedding 空间不一样。需要一个投影层（Projection Layer）把它们对齐。

以 LLaVA 架构为例：

投影层的训练数据就是大量图文对，目标是让映射后的视觉向量能被 LLM "读懂"。不少主流模型则把视觉和语言的对齐融入更早的网络层，而不是简单地在末端拼接，这使得跨模态的联合推理能力更强。

### 架构

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 训练方式

多模态模型的训练通常分两个阶段：

**对齐训练** ：冻结 LLM 主干，只训练投影层，用大量图文对让视觉向量进入 LLM 能理解的语义空间。这一阶段数据量大，但训练目标简单。

**指令微调** ：解冻部分或全部参数，用高质量的多模态指令数据（图文问答、文档理解等）微调，让模型学会按指令操作。这一阶段数据质量比数量更重要。

---

## 两种方案对比

### 本质差异

LLM+工具链：先把文件格式转换成文本，再理解文本内容。

多模态：直接在原始信息上理解内容本身。

工具链方案在"格式转换"这一步不可避免地引入损失，而多模态方案把这个步骤交给了模型本身，代价是更高的计算成本和更黑盒的行为。

### 维度对比

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 幻觉

多模态模型的幻觉和纯文本 LLM 的幻觉性质不同。

**视觉幻觉** 指的是模型描述了图像中不存在的内容，或者误读了图像细节。这是当前多模态模型的已知缺陷，在精细空间推理、文字识别（尤其是小字）、相似物体区分等场景中仍然很明显。

对于需要精确提取字段的场景（比如发票金额、合同条款），工具链解析 + 人工校验的可靠性可能高于直接用多模态模型。

---

## RAG 场景

### 工具链方案在 RAG 中的问题

RAG 的基本逻辑是：把文档解析成文本 → chunk切块 → Embedding → 向量检索 → LLM 生成。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

解析质量直接影响两个环节：

- • **检索阶段** ：如果一段话在解析后变成乱码或被截断，它的 Embedding 向量就失去了语义，检索时根本召回不到。
- • **生成阶段** ：检索到的 chunk 如果是残缺的（比如表格行列错位），送给 LLM 的上下文本身就是错的，无论 LLM 多强都无法给出正确答案。

解析过程不可避免地引入错误，这些错误会在检索和生成两个阶段都可能带来错误的结果。

### 多模态在 RAG 中的引入方式

目前实际落地中有多种做法：

**多模态 Embedding** ：用 CLIP 这类模型，把图片和文字映射到同一向量空间。这样一张图表可以直接被 Embedding，检索时用文字 query 也能召回相关图片，再送给多模态 LLM 生成答案。这个方案改动相对小，只需要换掉 Embedding 模型。

**混合解析兜底** ：先用工具链解析，对于工具链失败或置信度低的内容（扫描页、图表页），触发多模态模型兜底处理。混合策略算是在成本和质量之间取得平衡。

没有绝对优劣，只有场景匹配。

**优先选择 LLM + 工具链的场景：**

- • 文档格式规范、来源可控（比如内部系统导出的 PDF）
- • 需要精确字段提取（金额、日期、合同编号）
- • 大批量处理，成本敏感
- • 需要中间结果可审计
- • 本地部署，无法使用大型多模态模型

**优先选择多模态的场景：**

- • 文档来源混乱，格式多样（各种扫描件、老版本 Office 文件）
- • 文档中图表是核心信息来源
- • 需要理解图文关系（图片和周围文字的语义关联）
- • 手写内容、印章识别
- • 对理解深度要求高，而非精确提取

**混合架构流程：**

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

混合架构的好处是成本可控，大多数格式规范的文档走工具链，只有真正需要视觉理解的内容才消耗多模态推理资源。

---

## 结语

虽然多模态已经不是新鲜概念，但工程落地仍然也还是有不少问题的。

**成本** ：图片 Token 比文本 Token 贵得多。一张普通分辨率的图片可能消耗几百个 Token，处理一份图文混排的 PDF 成本可能是纯文本的 5-10 倍。

**视觉幻觉** ：这是当前多模态模型最主要的可靠性问题，在精细识别场景下仍需要验证机制。

**架构演进** ：主流模型（Qwen3.5、LLaMA 4、Gemini 3 等）正在把视觉能力从"插件"变成"原生能力"，视觉和语言的融合深度在持续增加。

**长视频和长文档** ：这是当前多模态最薄弱的环节，受上下文窗口和推理成本的双重限制。

总的来说，如下：

**原理层面** ：LLM 只处理 Token 序列，多模态模型通过编码器 + 投影层把其他模态对齐到同一向量空间，让 LLM 主干能统一推理。两者的本质差异是输入通道的宽度。

**工程层面** ：LLM+工具链的核心代价是解析层信息损失，多模态的核心代价是推理成本和可控性。没有一条路线在所有场景下都优，关键是根据文档类型、准确率要求和成本约束做匹配。

**实践层面** ：混合架构是当前最务实的生产方案，工具链处理格式规范的主干文档，多模态处理工具链失效的边界情况。可能随着多模态模型成本持续下降，这条边界会逐渐向工具链方向移动。

继续滑动看下一个

AI Engineer编程

向上滑动看下一个