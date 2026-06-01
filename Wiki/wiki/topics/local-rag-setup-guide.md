---
title: 本地 RAG 知识库搭建实战
type: topic
tags: [RAG, 本地部署, Langchain-Chatchat, Qwen, 向量数据库, 知识库]
created: 2026-06-01
updated: 2026-06-01
sources:
  - raw/articles/知识库/从零搭建本地RAG知识库，你的文档终于能自己回答问题了！从安装到测试全流程讲解！.md
related:
  - concepts/rag-architectures.md
  - topics/rag-optimization-techniques.md
  - concepts/hybrid-retrieval.md
---

# 本地 RAG 知识库搭建实战

基于 Langchain-Chatchat + Qwen2.5-7B + bge-large-zh 的完整本地 RAG 知识库搭建教程，**全程断网可用，数据不出电脑**。

## 核心思路

一句话概括：用嵌入模型把文档向量化 → 存入向量数据库 → 用户提问时检索最相关片段 → LLM 基于片段生成答案。

## 技术选型

| 组件 | 选型 | 理由 |
|------|------|------|
| **框架** | Langchain-Chatchat | 纯 Python、中文生态最好、比 Dify 轻量 |
| **嵌入模型** | bge-large-zh-v1.5 | C-MTEB 中文检索长期第一，1.3GB |
| **LLM** | Qwen2.5-7B-Instruct Q4_K_M | 原生中文，7B + 4bit 量化 = 5GB 显存 |
| **向量库** | FAISS | Meta 出品，纯 CPU，个人知识库最快最省事 |
| **模型管理** | Ollama | 一行命令下载/启动，集成 llama.cpp |

## 为什么选 Langchain-Chatchat 而不是 Dify

| 对比 | Langchain-Chatchat | Dify |
|------|-------------------|------|
| **定位** | 轻量 RAG 知识库 | 全栈 LLM 应用平台 |
| **部署** | 纯 Python，pip install | Docker + PostgreSQL + Redis |
| **显存** | 12GB 可跑 | 需要额外服务器组件 |
| **适合** | 个人私有知识库 | 企业级 AI 应用 |

## 显存预算（12 GB 场景）

| 组件 | 占用 |
|------|------|
| 嵌入模型 bge-large-zh-v1.5 (FP16) | ~1.3 GB |
| LLM Qwen2.5-7B Q4_K_M (Ollama) | ~5 GB |
| FAISS 向量索引（1 万份文档） | ~0.2 GB |
| 剩余给 KV Cache / 上下文 | ~5.5 GB（≈ 8000-12000 token） |

## 架构流程

```
你的文档（PDF/Word/TXT）
    │
    ▼
嵌入模型（bge-large-zh-v1.5）
    │ 将文档转成向量
    ▼
向量数据库（FAISS）
    │
    ▼
LLM（Qwen2.5-7B-Instruct Q4_K_M）
    │ 根据检索到的文档片段生成答案
    ▼
回答（附来源引用）
```

## 关键步骤速览

### 1. 硬件与环境

- NVIDIA RTX 4070 Ti（12 GB 显存）或类似配置，最低 8 GB
- WSL2（Ubuntu 22.04）或原生 Linux
- CUDA ≥ 11.8，推荐 12.1+

### 2. 安装 Ollama + 下载 Qwen

```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama pull qwen2.5:7b-instruct-q4_K_M
```

### 3. 安装 PyTorch + 依赖

```bash
pip install torch torchvision --index-url https://download.pytorch.org/whl/cu121
# 锁死关键版本号：
pip install langchain==0.1.17 langchain-core==0.1.53 ...
pip install langchain-chatchat -U
```

### 4. 下载嵌入模型

```bash
python3 -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('BAAI/bge-large-zh-v1.5')"
```

### 5. 配置与启动

```yaml
# 关键配置
LLM_MODELS = ["qwen2.5:7b-instruct-q4_K_M"]
EMBEDDING_MODEL = "BAAI/bge-large-zh-v1.5"
EMBEDDING_DEVICE = "cuda"
VECTOR_STORE = "faiss"
CHUNK_SIZE = 500
CHUNK_OVERLAP = 50
```

```bash
python3 chatchat/startup.py -a
# 浏览器打开 http://localhost:8501
```

## 配置参数说明

| 参数 | 建议值 | 为什么 |
|------|--------|--------|
| CHUNK_SIZE | 500 | 太小语义断裂，太大检索不准 |
| CHUNK_OVERLAP | 50 | 防止关键信息落在块边界被截断 |
| EMBEDDING_DEVICE | cuda | GPU 比 CPU 快 10 倍以上 |
| TEMPERATURE | 0 | 知识库问答不需要创意，需要准确 |

## 十条真实踩坑记录

1. **venv 报错** → 用 virtualenv 替代
2. **git clone 超时** → 用 Gitee 镜像
3. **Python 3.12 不支持** → 从本地子包源安装，绕过 PyPI 版本检查
4. **poetry 依赖卡死** → 放弃 poetry，手工 pip + 清华源
5. **langchain 版本地狱** → 锁死 0.1.x 系列
6. **HuggingFace 下载被墙** → `export HF_ENDPOINT=https://hf-mirror.com`
7. **torch 版本过低** → `pip install torch --upgrade`
8. **WSL 找不到 Ollama** → 建别名指向 Windows 版
9. **faiss-cpu 版本约束太死** → 先装最新版，`--no-deps` 跳过校验
10. **启动缺 data 子目录** → `mkdir -p data/knowledge_base data/media data/temp data/logs`

## 与其他工具的联动

原作者的 AI 链：**Hermes 负责执行任务 → Obsidian 负责记笔记 → Langchain-Chatchat 负责检索知识库**。三个工具串起来：知识库查到的东西 → 喂给 Hermes → 结果写进 Obsidian。

## RAG 效果的关键

> RAG 的效果，80% 取决于知识库的切片质量和检索策略，剩下 20% 才是模型本身。

没有来源引用的回答，默认当它不存在。知识库问答最大的风险是 LLM 胡说八道——来源引用让你能追溯到原始文档。

---

> 本地 RAG 的核心优势：数据不出电脑 + 免费 + 可定制。适合有隐私需求（合同/内部手册/客户资料）的个人和小团队。
