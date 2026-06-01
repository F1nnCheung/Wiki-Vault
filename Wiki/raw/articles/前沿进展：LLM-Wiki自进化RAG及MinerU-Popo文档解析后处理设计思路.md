刘焕勇 *2026年5月27日 11:42*

今天是 **2026年5月27日** ，星期三，北京，天气雨

继续会到文档智能方向，主要还是结合RAG去讲。

**RAG检索增强** 范式主要沿两条路径发展：以 **视觉为中心** 的方法（如M3DocRAG、SV-RAG）利用图像嵌入实现页面级检索；另一种是 **结构感知框架的方案** ，则将文档建模为树或图，以进行细粒度的结点级检索，所以这都依赖于文档的结构化解析。因此，这块，看个后处理工作， **文本截断恢复、表格截断恢复、标题层级重构以及图像-文本关联** 。

另一个就是基于LLM-Wiki的检索推理思路，归结起来，这个工作的思路就是： **把文档用LLM转成带链接的Markdown页面->建目录、建双向链接->写一个错误检查脚本（抓悬空链接、格式错误）->把错误转成规则，下次编译自动遵守->给智能体开放两个工具：search/read->智能体按“搜→读→跳链接→判断证据够不够”循环执行** ，这里看一个思路

## 一、MinerU-Popo文档解析通用后处理模型

讲的故事是MinerU-Popo：结构化文档解析的通用后处理模型，解决 **跨页文本/表格截断、标题层级混乱、图文无关联等痛点** ，关于这块的能力，现有的模型方案解决的并不好。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/wUtXN4IVhDGME3eia4t2bb42gU11xDO8cF5VPP5BfmZ4pmbJRpEXqOCrjibAlvwN4GcE0Y0IRMhW4YNTxojmQLPFwmUnjfeSeWDhN8ycY150s/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

将问题分解为四个聚焦的子任务： **文本截断恢复、表格截断恢复、标题层级重构以及图像-文本关联** ，将页面级OCR输出转为连贯文档级结构，工作在《 **MinerU-Popo: Universal Post-Processing Model for Structured Document Parsing** 》，https://arxiv.org/pdf/2605.24973，https://github.com/opendatalab/MinerU-Popo。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/wUtXN4IVhDEoupgVG8vVqib3jJd3Ian44cu7FpXtSzlc2fZBDHvLAdywYbhynibKs2oIgmw4QaicicbN9tEvh4kyp0JvJxKnHMuXRIFWmlJG1LE/640?wx_fmt=jpeg&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

其大致步骤为： **先让任意OCR把每页拆成块→Popo把这些碎块重新拼成一篇完整、有结构、跨页连贯的文档→最后输出树结构+摘要，给RAG用** 。

建模起来就是：输入 **任意OCR（MinerU/Paddle/GLM-OCR/Dolphin/Monkey）的输出** ：一页一页的元素块（文本、标题、表格、图片、图注），每个块带内容、位置、页码、类型，但没有跨页关系：段落被切断、表格被切断、标题层级乱、图片不知道属于哪段。 **Popo不重做OCR，只做后处理** 。

核心看几个点：

1、实现步骤：

**Step1、任务专属过滤部分**

分成，4个子任务， **标题层级重构** 只留标题块，其他全扔掉； **文本截断恢复** 只留页边/段边的文本块，完整段落直接丢掉； **表格截断恢复** 只留上一页最后一个表格+下一页第一个表格； **图文关联** 只留标题、图片、表格、图注，正文全扔掉。

**Step2、动态分块**

因为在文档几百页时，模型一次吃不下，所以要切块。具体的， **不固定切页** ，而是动态选边界，在一个滑动窗口里，找标题最多的那一页切开，保证块边界信息最丰富；然后设定块之间重叠 3 页，防止 **跨块的段落/标题** 被切断。每个块独立跑模型推理。

**Step3、块间同步**

这一步是保证全局结构不乱，切块会导致前块把“第一章”标成1级，后块没看到，把“第二章”也标成1级，导致层级乱掉。所以思路是 **取重叠区域的标题，计算两块预测的平均偏差，把后一块整体加/减偏差校准，最后把所有块拼接成全局一致的层级** 。比如，重叠区标题前块=2，后块=3→偏差=-1，后块所有层级全部-1。

**Step4、分别执行对应任务**

四个子任务： **文本截断恢复、表格截断恢复、标题层级重构以及图像-文本关联** ，如下，分别用大模型去做，

**1）文本截断恢复**

对于一系列文本元素，此子任务需要为每一对相邻文本pi∈{0,1}预测一个二元标签(eitext,eitext+1)，以判断它们是否在逻辑上被截断，应连结成一个连续的段落。

![图片](https://mmbiz.qpic.cn/mmbiz_png/wUtXN4IVhDGeXr9DKiaQDcCRsSqo8CfDMOf6RhFsfO9ITnrmquBUZ5yWt5CBnOeZRBjglYajmwSPPWN9kEXSfcia3fUoQ5Js6xR31LNf9Bchg/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

换句话说就是： **模型输入** 页眉/页底的文本片段，内容、位置、是否断句， **模型输出** 二分类：0=不连或者1=连起来，连续的片段合并成一个完整段落。

这里考虑的特征是 **语义通顺、语法完整、字体一致、没有句号/换行结束**

**1）表格截断恢复**

对于跨页边界的任意两个相邻表格元素，该子任务首先需要 **预测一个表格级别的延续标签pi∈{0,1}，以指示它们是否属于同一个逻辑表格** 。如果pi=1，则需要进一步预测一个按列的单元合并策略Qi={q1,...,qx}，其中qj∈{0,1}指示第j列中的边界单元应保持分离（简单拼接）还是合并为一个连续的单元。

![图片](https://mmbiz.qpic.cn/mmbiz_png/wUtXN4IVhDFgriciaKYEOUrWoe8ZT22iaYia3nrBtymBCzS5siaLEUicIveme1k7N5C9H5XL5Petcgk6lI95EniaATtqRMGDX7Wq5auMTYkchlKnjY/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

这个换句话说就是，把跨页表格拼回去， **模型输入** ：上一页表尾、下一页表头、列数、宽度、标题是否带“续表”， **模型先判断** ：是不是同一张表， **再输出** ：每一列要不要合并（0=不合并，1=合并），最终拼成一个完整表格。

**3）标题层级重构**

给定从 **文档中提取的标题元素序列** ，此子任务需要为每个标题预测一个开放式的整数层级（level∈{1,2,3,...}），其中较小的数字代表较高的层级（例如，一级用于文档标题，二级用于主要章节）。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/wUtXN4IVhDFnA5aJnGxOicxJ19yygibriaFrPZg43EyMeeiaHDe3bibiab0hncQA7MV4MVmd0K5icBogibAsB0B0bdzcPwlI2MicApsThJ578HROYE4E/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

这一步是建立文档树， **模型输入** ：所有标题，按阅读顺序排好， **模型输出** ：给每个标题一个数字层级（1 级 > 2 级 > 3 级…），判断依据包括编号（1、1.1、1.1.1）、字体大小、语义包含关系以及位置。

**4）图像-文本关联**

对于每个标题元素，该子任务需要预测与其关联的图像或表格。此外，为将这些视觉元素嵌入文档树中，还需预测在逻辑上统摄每个图像或表格的相应章节标题。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/wUtXN4IVhDHetDZ3GYwunyYaHsJIK3yW44CHpKoqVIhQAUKnAH5PQNH2X5iaKTJ2qlfTXtXwtOEUIlXORracrmicbV2Jibyl4iaRXrGAyAAaSjA/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

这一步是将 **图片/表格挂到对应章节** ，模型做三件事，包括 **图片和图注绑定、表格和表注绑定、图片/表格和管辖它的章节标题绑定** 。

**Step5、进行文档增强恢复**

把上面4步结果，变成树结构+摘要。包括几步： **结构增强** 上，标题做父节点，文本、表格、图片做子节点，形成一颗文档树； **语义增强** 上，把太长的节点再切分，用LLM给每个节点生成摘要，最终输出： **树结构** （JSON/Markdown）+结点摘要，这个结果用来做RAG，只需要检索摘要。

**2、看模型训练及推理速度**

收集真实PDF（Common Crawl 公开网页文档、真实用户上传的PDF（学术、技术、教育、法律、政府、年报）），用用 MinerU、PaddleOCR、GLM-OCR跑一遍，得到块序列，用 **规则+大模型标注4类任务数据** ，数据量共30K训练样本，使用Qwen3-VL-4B轻量微调，损失上，文本截断、表格截断、图文关联，作为分类任务， **使用交叉熵损失 CrossEntropyLoss** ，标题层级预测，作为序列标注任务，使用 **序列交叉熵** ，总损失=4个任务损失加权求和。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/wUtXN4IVhDEvxcyiapIUeEmG5ntakfgNnLfFRHCwibpHJRicwwr7J2vsg0UxENMMw4C4lA1nyFQY46lT09HHcha26uibmzAAujGCXWrDervd4ibs/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

速度如上，推理速度单位为doc/s，表示每秒处理完整文档的数量，测试集为PostDocBench（共 165 份文档），但是没有讲具体 **平均多少页** 。

## 二、基于LLM-Wiki的检索推理思路

讲的故事是将检索范式从检索即查找变为为检索即推理，通过把 **文档编译为带双向链接的结构化Wiki页面、提供搜索/阅读/链接追踪工具接口、搭配ErrorBook纠错机制** ，最终发现在 **多跳QA与结构化查询任务上显著优于传统RAG与GraphRAG等基线** 【这个结论很有趣】

工作在：《 **Retrieval as Reasoning: Self-Evolving Agent-Native Retrieval via LLM-Wiki** 》(https://arxiv.org/pdf/2605.25480)，一句话就是 **把原始文档→编译成互相链接的维基页面→智能体用搜索/阅读/点链接来推理→错误簿自动修bug。**

具体拆开来看细节：

**1、离线构建阶段**

这块包括两个内容，一个是 **LLM-WIKI** 、一个是 **error\_book** ，分别展开看：

![图片](https://mmbiz.qpic.cn/mmbiz_png/wUtXN4IVhDE21eicsIwRybjIBRIXVDMiaBnvVxMUKNzyHS31Wq6JvSUUcmTo8Kf52iccNRsS3v1nQEdDs9XjiaWLz2fqPDBFBXksolUrlZnThgI/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

首先是 **LLM-WIKI** ，这一步输入任意文档/段落（比如维基百科、业务文档），然后对每一段文本，LLM找到当前维基里最相关的已有页面，不随便新建，避免重复页面、保证知识统一，接着编译维基页面，把文本转成固定结构的Markdown页面，包含： **元数据（类型、创建时间、别名、标签）、一句话摘要、关键事实（结构化）、双向维基链接（指向其他页面）、来源引用（保证可追溯）** 。最后建立目录体系，生成可浏览的索引，包括全局index.md（总目录）、分类目录\_index.md（如people/、events/、media/）、页面之间双向链接（A指向B，B自动指向A）

**其次是error\_book** ，这块比较有意思，因为编译一定会出错误，所以搞个错误本。

错误记录以 **结构化的YAML文件** （error\_book.yaml）形式持久化存储，其中每条记录包含 **错误现象、根本原因分析、生成的约束规则、验证方法以及生命周期状态（open/closed）** 。

约束以自然语言指令的形式注入，涵盖从结构规则如 **“绝不要创建指向\_index.md 中不存在页面的链接”，到语义规则如“除非引用来源摘要中支持，否则不要添加实体属性”** 。这些指令利用大模型的指令遵循能力，无需进行架构修改。

具体的：

![图片](https://mmbiz.qpic.cn/mmbiz_png/wUtXN4IVhDGwcDicflAibGaE7XW4DmwlmcRteBKJhZPiaopJujE9hdibfGZkIzo9IskhQZo1bqlgp5aicX19TK8tpA9OpGgec62nZgg49CLEHhl4/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

先定义7类必查错误，包括 **结构类** 【悬空链接（链接到不存在的页面）、页面不完整、引用格式错误、意外覆盖页面、索引不一致】和 **内容类** 【无依据事实、跨页面矛盾】。然后进行管理，几流程包括： **发现** ：编译后自动扫描错误-> **归因** ：找到为什么错（如“没检查页面是否存在”）-> **约束** ：写成自然语言规则，例如不要生成指向不存在页面的链接-> **注入** ：把约束塞给LLM，下次编译直接遵守-> **验证关闭** ：修复后检查，没问题就关闭这条错误。

修复这块也可以再看下：

![图片](https://mmbiz.qpic.cn/mmbiz_png/wUtXN4IVhDHXObLEgSBoicTtHF3JzdfTKSdIt78ia9U1q0Iu2GGwBZHsZ86eiaO98mIuSCk8HE0kTxREyfj3hFeEGD6tGZFN2icqWy9O1Lqz7bE/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=9)

通过 **两层机制主动修复现有错误** 。 **第1层（代码自动修复）** 在每次批量编译后运行，并应用确定性流程修复结构错误，包括悬空链接、噪声格式和索引不一致等问题。 **第2层（LLM周期修复）** 每隔N篇文章触发一次，处理需要推理的语义或内容级错误，例如缺失页面、不完整的摘要、不支持的事实以及跨页面矛盾。因此， **第1层确保维基结构的有效性，而第2层则提升事实准确性与跨页面一致性** 。

**2、在线推理阶段**

在线推理，主要解决智能体怎么“检索即推理”，智能体只有两个工具，但能完成所有多跳推理。

![图片](https://mmbiz.qpic.cn/mmbiz_png/wUtXN4IVhDFujic5F4ib9tiakjEiaON4g1OGkkZckcNGuyj7D1gWXW7xTqyicRictyQ8NfkWrpmlMBvxsLu2ESZcRRzxShRhDBedIiaiblKia7cenpC4/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=10)

用到两个工具： **工具1：wiki\_search** (查询)，优先匹配：页面名→别名→标签→描述→内容，返回候选页面列表+元数据； **工具2：wiki\_read(路径**)，读目录或读具体页面，返回带链接的结构化内容，智能体可以直接“点链接”跳过去。在此过程中外加几个终止条件： **证据够了、工具调用≤15次、连续3次搜索为空**

所以，归结起来，这个工作的思路就是： **把文档用LLM转成带链接的Markdown页面->建目录、建双向链接->写一个错误检查脚本（抓悬空链接、格式错误）->把错误转成规则，下次编译自动遵守->给智能体开放两个工具：search/read->智能体按“搜→读→跳链接→判断证据够不够”循环执行** 。

## 参考文献

1、https://arxiv.org/pdf/2605.24973

2、https://arxiv.org/pdf/2605.25480

## 关于我们

老刘，主页：https://liuhuanyong.github.io。

**对大模型&知识图谱&RAG&文档理解等技术方向感兴趣，欢迎加入社区，社区持续纳新。**

加入社区方式：关注公众号，在后台菜单栏中点击会员社区加入。

文档智能 · 目录

继续滑动看下一个

老刘说NLP

向上滑动看下一个