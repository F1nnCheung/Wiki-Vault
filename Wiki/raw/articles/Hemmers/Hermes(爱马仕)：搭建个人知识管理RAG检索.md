---
title: "Hermes(爱马仕)：搭建个人知识管理RAG检索"
source: "https://mp.weixin.qq.com/s/KJcGq1VdPaHpKdXErjI-LQ"
author:
  - "[[远飞哥]]"
published:
created: 2026-05-08
description:
tags:
  - "clippings"
---
远飞哥 *2026年4月29日 00:58*

> 字数 1295，阅读大约需 7 分钟

  
👇关注我，后续继续分享更多的 AI Agent、技术开发相关的文章.

有几天没有写了🥲，争取保持每周1-2篇记录📝，经过多年的积累其实已经有很多总结的md笔记🥲，之前Emacs org-mdoe也有部分笔记记录，切换到hermes agent智能体后就一直想能否能让大模型回答问题先检索以前记录的笔记内容这样会回答的更精确点，这段时间也折腾尝试过很多方法，也就以下的方案稳步运行到现在。

## 为什么需要这个？

我试过以下几种「知识管理」方案，全都拉垮了：

| 方案 | 问题 |
| --- | --- |
| **文件夹分类** | 一个笔记可能同时属于「心理学」「决策」「投资」，放哪都不对 |
| **标签系统** | 标签越加越多，最后忘了自己打了什么标签 |
| **全文搜索** | 搜「杠铃策略」找不到我写过「塔勒布 杠铃」的那篇笔记 |
| **纯人工记忆** | 我已经不是 20 岁了，记不住 |

**核心痛点不是「找不到文件」，而是「想不起当时是怎么想的」。**

---

## 方案设计

Hermes RAG 的目标是： **你写过的所有东西，都能用自然语言「问」出来** 。

架构图：

```
Markdown 笔记库 (Obsidian LeonHe)
  ↓
vectorize-leonhe.py (向量化脚本)
  ↓
Ollama qwen3-embedding:4b (生成 embedding)
  ↓
ChromaDB (~/vector_db/wiki) (向量存储)
  ↓
query-wiki.py (语义查询)
```

**关键技术决策：**

1. 1\. **本地运行** ：数据不出机器，Ollama 和 ChromaDB 都跑在本机
2. 2\. **增量更新** ：只向量化改动的文件，不是每次全量扫
3. 3\. **统一查询入口** ：不管来自 Obsidian 还是独立 wiki，都走同一个 query-wiki.py
4. 4\. **语义而非关键字** ：搜「怎么抗风险」能匹配到「杠铃策略」「反脆弱」这些笔记

---

## 核心代码

### 1\. 向量化脚本

`~/.hermes/scripts/vectorize-leonhe.py` ：

```
# 核心逻辑
def clean_markdown(content: str) -> str:
    """去掉 frontmatter、wikilinks、图片、URL，保留纯文本"""
    # 去掉 YAML frontmatter
    if content.startswith("---"):
        end = content.find("---", 3)
        if end > 0:
            content = content[end+3:]

    # 去掉 [[wikilinks]] 但保留文字
    content = re.sub(r'\[\[([^\]|]+?)\]\]', r'\1', content)

    # 清理空格
    return content.strip()
```

**为什么这么清理？**

YAML frontmatter 是元数据，搜「标题」不该匹配到 tags 字段；wikilinks 是链接语法，但你要搜的是 **内容** ，不是 `[[杠铃策略]]` 这个字符串。

### 2\. Ollama Embedding API

```
def get_embedding(text: str) -> list:
  response = requests.post(
      "http://localhost:11434/api/embed",
      json={"model": "qwen3-embedding:4b", "input": text},
      timeout=60
  )
  return response.json()["embeddings"][0]  # 注意：直接取 [0]，不是 ["embedding"]
```

⚠️ **常见坑** ：Ollama 返回的是 `{"embeddings": [[0.1, 0.2, ...]]}` ，不是 `{"embedding": {...}}` 。我第一次写错了，找了半小时 bug。

### 3\. ChromaDB 存储

```
chroma_client = chromadb.PersistentClient(path="~/.openclaw/vector_db/wiki")
collection = chroma_client.get_or_create_collection("wiki_notes")

collection.add(
    ids=[file_id],
    embeddings=[embedding],
    documents=[cleaned_content],
    metadatas=[{"source": filepath}]
)
```

ID 用相对路径生成（ `concepts/antifragile.md` → `concepts_antifragile.md` ）——确保同一文件更新时能覆盖而不是新增。

### 4\. 查询脚本

`~/.hermes/scripts/query-wiki.py` ：

```
results = collection.query(
    query_embeddings=[query_emb],
    n_results=3  # 只返回最相关的 3 条
)

for doc, metadata in zip(results["documents"][0], results["metadatas"][0]):
    print(f"Source: {metadata['source']}")
    print(f"Preview: {doc[:200]}...")
```

n\_results=3 是我试出来的值——太多了干扰判断，少了可能漏掉关键笔记。

---

## 效果与数据

**使用45 天后的数据：**

| 指标 | 之前 | 之后 |
| --- | --- | --- |
| 平均单次知识查找耗时 | 18 分钟 | 42 秒 |
| 重复内容产出次数 | 每周 3.2 次 | 几乎为 0 |
| 「这个我写过」的概率 | 40% | 89% |
| 发现旧笔记的惊喜次数 | 0 | 每周 1-2 次 |

**意外的收益：**

1. 1\. **倒逼笔记整理** ：为了让查询结果更好，我开始主动给笔记加标题、拆长文、去水词
2. 2\. **知识串联** ：搜「决策」同时出现「心理学笔记」「投资笔记」「工作笔记」，看到了以前没发现的联系
3. 3\. **写作加速** ：写新文章前先搜一遍，避免重复，还能找到可引用的旧内容

最爽的一次：写《个人知识管理架构》时，搜「知识管理」蹦出 12 篇相关笔记，其中几篇是我完全忘了的。

---

## ⚠️注意事项

### 1\. 🌚文件编码问题

Obsidian 有些笔记是 GBK 编码（从 Windows 复制过来的）， `utf-8` 打开报错。

**解决** ： `chardet` 自动检测编码。

```
import chardet
with open(filepath, 'rb') as f:
    raw = f.read()
    encoding = chardet.detect(raw)['encoding']
content = raw.decode(encoding or 'utf-8', errors='ignore')
```

### 2\. 🐰短文本被跳过

有些笔记只有标题+一行字（<50 字符），向量化时被跳过，导致搜不到。

**决策** ：保留，但加个标志位，查询时如果其他结果太远，把这堆「短文本」也塞进去。

### 3\. 🫸向量数据库不要过大

大概10W字符，1000+ 笔记向量化后，ChromaDB 查询会很慢🔍。

**解决方案** ：

- • 换 `qwen3-embedding:4b` → `qwen3-embedding:1.5b` （快 3 倍，精度差 8%，够用）
- • 定期清理旧版本笔记的旧 embedding

---

## 下一步

这个系统现在只做了 **「写过的笔记」** 这一块。接下来要加：

1. 1\. **网页剪藏** ：Obsidian WebClip、Readwise 导入的网页高亮，自动加入知识库
2. 2\. **多模型 embedding** ：Qwen 负责中文，Gemini 负责英文，BGE 负责代码

**最终目标：问任何问题，系统都知道答案藏在哪里——哪怕它分散在 10 个不同的地方怕，增强回答精确度减少“幻觉”。**

## 一句话总结

**知识管理的终点不是整理，是让知识自己开口说话。**

**👇关注我，后续继续分享更多的 AI Agent、技术开发相关的文章.**

**微信扫一扫赞赏作者**

AI · 目录

作者提示: 个人观点，仅供参考

继续滑动看下一个

飞哥的技术与烟火

向上滑动看下一个