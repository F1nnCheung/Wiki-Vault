---
title: Hermes 个人知识管理 RAG 检索
type: topic
tags: [hermes-agent, rag, knowledge-management, chromadb, ollama, embedding]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/Hemmers/Hermes(爱马仕)：搭建个人知识管理RAG检索.md
related:
  - entities/hermes-agent.md
  - topics/hermes-obsidian-integration.md
  - concepts/agent-memory-systems.md
---

# Hermes 个人知识管理 RAG 检索

用 Hermes Agent 搭建个人知识管理 RAG 检索系统，让你写过的所有东西都能用自然语言「问」出来。

> **核心痛点不是「找不到文件」，而是「想不起当时是怎么想的」。**

## 一、为什么需要 RAG 知识管理

传统的知识管理方案都有致命缺陷：

| 方案 | 问题 |
|------|------|
| **文件夹分类** | 一个笔记可能同时属于多个类别，放哪都不对 |
| **标签系统** | 标签越加越多，最后忘了自己打了什么标签 |
| **全文搜索** | 搜「杠铃策略」找不到写过「塔勒布 杠铃」的笔记 |
| **纯人工记忆** | 记不住 |

**目标**：所有写过的笔记，都能用自然语言「问」出来。

## 二、架构设计

```
Markdown 笔记库 (Obsidian 等)
  ↓
vectorize.py (向量化脚本)
  ↓
Ollama qwen3-embedding:4b (生成 embedding)
  ↓
ChromaDB (~/vector_db/wiki) (向量存储)
  ↓
query-wiki.py (语义查询)
```

### 关键技术决策

1. **本地运行** — 数据不出机器，Ollama 和 ChromaDB 都跑在本机
2. **增量更新** — 只向量化改动的文件，不是每次全量扫
3. **统一查询入口** — 不管来自哪个笔记工具，都走同一个 query 脚本
4. **语义而非关键字** — 搜「怎么抗风险」能匹配到「杠铃策略」「反脆弱」这些笔记

## 三、核心代码

### 1. 向量化脚本

`~/.hermes/scripts/vectorize-leonhe.py`：

```python
def clean_markdown(content: str) -> str:
    """去掉 frontmatter、wikilinks、图片、URL，保留纯文本"""
    # 去掉 YAML frontmatter
    if content.startswith("---"):
        end = content.find("---", 3)
        if end > 0:
            content = content[end+3:]
    # 去掉 [[wikilinks]] 但保留文字
    content = re.sub(r'\[\[([^\]|]+?)\]\]', r'\1', content)
    return content.strip()
```

**为什么这么清理？**
- YAML frontmatter 是元数据，搜「标题」不该匹配到 tags 字段
- Wikilinks 是链接语法，要搜的是内容不是 `[[杠铃策略]]` 这个字符串

### 2. Ollama Embedding API

```python
def get_embedding(text: str) -> list:
    response = requests.post(
        "http://localhost:11434/api/embed",
        json={"model": "qwen3-embedding:4b", "input": text},
        timeout=60
    )
    return response.json()["embeddings"][0]  # 注意：直接取 [0]
```

> ⚠️ **常见坑**：Ollama 返回的是 `{"embeddings": [[0.1, 0.2, ...]]}`，不是 `{"embedding": {...}}`。

### 3. ChromaDB 存储

```python
chroma_client = chromadb.PersistentClient(path="~/.openclaw/vector_db/wiki")
collection = chroma_client.get_or_create_collection("wiki_notes")

collection.add(
    ids=[file_id],
    embeddings=[embedding],
    documents=[cleaned_content],
    metadatas=[{"source": filepath}]
)
```

ID 用相对路径生成（`concepts/antifragile.md` → `concepts_antifragile.md`），确保同一文件更新时能覆盖而非新增。

### 4. 查询脚本

```python
results = collection.query(
    query_embeddings=[query_emb],
    n_results=3  # 只返回最相关的 3 条
)

for doc, metadata in zip(results["documents"][0], results["metadatas"][0]):
    print(f"Source: {metadata['source']}")
    print(f"Preview: {doc[:200]}...")
```

`n_results=3` 是实践出的值——太多干扰判断，太少可能漏关键笔记。

## 四、效果数据（使用 45 天后）

| 指标 | 之前 | 之后 |
|------|------|------|
| 平均单次知识查找耗时 | 18 分钟 | 42 秒 |
| 重复内容产出次数 | 每周 3.2 次 | 几乎为 0 |
| 「这个我写过」的发现概率 | 40% | 89% |
| 发现旧笔记的惊喜次数 | 0 | 每周 1-2 次 |

### 意外收益

1. **倒逼笔记整理** — 为了让查询结果更好，主动给笔记加标题、拆长文、去水词
2. **知识串联** — 搜「决策」同时出现心理学、投资、工作笔记，看到以前没发现的联系
3. **写作加速** — 写新文章前先搜一遍，避免重复，还能找到可引用的旧内容

## 五、注意事项

### 文件编码问题

Obsidian 有些笔记是 GBK 编码（从 Windows 复制过来的），`utf-8` 打开报错：

```python
import chardet
with open(filepath, 'rb') as f:
    raw = f.read()
    encoding = chardet.detect(raw)['encoding']
content = raw.decode(encoding or 'utf-8', errors='ignore')
```

### 短文本被跳过

有些笔记只有标题+一行字（<50 字符），向量化时被跳过导致搜不到。**决策**：保留但加标志位，查询时如果其他结果太远，把这堆「短文本」也塞进去。

### 向量数据库性能

约 10 万字符、1000+ 笔记向量化后，ChromaDB 查询会变慢。

**优化方案**：
- 换 `qwen3-embedding:4b` → `qwen3-embedding:1.5b`（快 3 倍，精度差 8%，够用）
- 定期清理旧版本笔记的旧 embedding

## 六、下一步扩展

1. **网页剪藏** — Obsidian WebClip、Readwise 导入的网页高亮自动加入知识库
2. **多模型 embedding** — Qwen 负责中文，Gemini 负责英文，BGE 负责代码

## 七、一句话总结

> 知识管理的终点不是整理，是让知识自己开口说话。
