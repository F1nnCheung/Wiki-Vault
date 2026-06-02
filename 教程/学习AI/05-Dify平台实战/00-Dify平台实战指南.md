---
title: Dify 平台实战指南
type: tutorial
tags: [Dify, 低代码, RAG, 私有化部署, LLMOps, 学习计划]
created: 2026-06-01
updated: 2026-06-02
sources:
  - Wiki/wiki/entities/dify.md
  - Wiki/wiki/comparisons/lowcode-ai-platforms.md
  - Wiki/wiki/concepts/rag-architectures.md
  - Wiki/wiki/concepts/hybrid-retrieval.md
related:
  - ../07-Coze平台实战/00-Coze平台实战指南.md
  - ../04-知识库与RAG/知识库技术学习指南.md
  - ../06-AI智能体/AI Agent 学习指南.md
---

# Dify 平台实战指南

> 对应学习计划**第 4 周 Day 4-7**：先懂 RAG 原理（Day 1-3 见 [[../04-知识库与RAG/知识库技术学习指南|知识库技术教程]]），再用 Dify 低代码平台快速落地 RAG 管线，二者互为表里。

---

## 学习路线图

```
第一章：认识 Dify（30 分钟）
  ├── Dify 是什么？解决什么问题？
  ├── 四层 Beehive 架构
  ├── Dify vs Coze / FastGPT / RAGFlow 选型
  └── 适用场景决策

        ↓

第二章：私有化部署（1 小时）
  ├── Docker 部署（推荐）
  ├── 源码部署
  ├── 配置文件详解
  └── 初始设置与管理员配置

        ↓

第三章：RAG 管线搭建（2 小时）
  ├── 知识库创建与文档上传
  ├── 文档解析与切片策略配置
  ├── Embedding 模型选择
  ├── 检索策略配置（混合检索+重排序）
  └── 实战：搭建团队代码知识库问答机器人

        ↓

第四章：应用发布与 API 对接（1.5 小时）
  ├── 应用类型（聊天助手/文本生成/Agent/工作流）
  ├── 发布：内嵌网页 / API / 前端 SDK
  ├── API 调用示例（Python / cURL）
  └── 权限管理与多租户
```

---

## 分章导航

| 章节 | 内容 | 预计时间 |
|------|------|---------|
| [[01-认识Dify]] | Dify 核心价值、四层架构、选型决策 | 30min |
| [[02-私有化部署]] | Docker 部署、配置详解、初始设置 | 1h |
| [[03-RAG管线搭建]] | 知识库创建、切片策略、检索配置、实战问答机器人 | 2h |
| [[04-应用发布与API对接]] | 应用类型、发布方式、API 调用、工作流+Agent | 1.5h |

---

## 附录 A：学习计划对照

| 学习计划 Day | 学习内容 | 本文对应章节 |
|-------------|---------|------------|
| Day 4 | Dify 私有化部署 | [[02-私有化部署]] |
| Day 5 | RAG 管线搭建 | [[03-RAG管线搭建]] |
| Day 6-7 | 进阶优化 + 实战项目 | [[03-RAG管线搭建]]、[[04-应用发布与API对接]] |

> ⚠️ 学习计划 Day 1-3 的 RAG 理论基础部分，参见 [[../04-知识库与RAG/知识库技术学习指南|知识库技术教程]]。

## 附录 B：常见问题

**Q: Dify 部署后如何升级？**
```bash
cd dify/docker
git pull origin main
docker compose down
docker compose up -d --build
```

**Q: 如何备份 Dify 数据？**
```bash
docker exec -t dify-db-1 pg_dump -U postgres dify > backup.sql
tar -czf dify-storage-backup.tar.gz dify/docker/volumes/
```

**Q: 混合检索怎么选？**
- 技术文档/代码库：全文检索（BM25）+ 向量检索
- 纯对话/客服：向量检索即可
- 法规/合同：全文检索为主，向量为辅

**Q: 什么时候该从 Dify 迁移到自研方案？**
- 需要突破 Dify 的切片策略限制
- 需要更灵活的检索算法
- 需要接入内部自研模型/向量库
- 高并发场景（>1000 QPS）

## 附录 C：延伸阅读

| 主题 | 知识库资源 |
|------|-----------|
| RAG 三大架构 | [[Wiki/wiki/concepts/rag-architectures|RAG 架构]] |
| RAG 优化 20 法 | [[Wiki/wiki/topics/rag-optimization-techniques|RAG 优化 20 法]] |
| 混合检索 | [[Wiki/wiki/concepts/hybrid-retrieval|混合检索]] |
| Dify vs Coze 全面对比 | [[Wiki/wiki/comparisons/lowcode-ai-platforms|低代码 AI 平台对比]] |
| 知识库技术完整教程 | [[../04-知识库与RAG/知识库技术学习指南|知识库技术学习指南]] |

---

> 📖 Dify 帮助企业快速落地 RAG 管线，但低代码平台不是终点——生产级定制必须回到代码层。接下来学习 [[../07-Coze平台实战/00-Coze平台实战指南|Coze 可视化 Agent 编排]]，用低代码平台快速验证 Agent 想法。
