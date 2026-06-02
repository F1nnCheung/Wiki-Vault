---
title: 认识 Dify
type: tutorial
tags: [Dify, 低代码, Beehive架构, 选型]
created: 2026-06-02
updated: 2026-06-02
sources:
  - Wiki/wiki/entities/dify.md
  - Wiki/wiki/comparisons/lowcode-ai-platforms.md
related:
  - 00-Dify平台实战指南.md
  - 02-私有化部署.md
---

# 第一章：认识 Dify

---

## 1.1 Dify 是什么？

Dify 是一个**开源的 LLM 应用开发平台**，融合 Backend-as-a-Service 和 LLMOps 理念。它的口号是「你只管创新，其他交给 Dify」。

**一句话**：Dify 让你能像搭积木一样构建 AI 应用——RAG 知识库、AI Agent、自动化工作流——无需从零写后端代码。

> GitHub Stars: 98.3K+（2026.05）| 许可证：Apache 2.0 | 最低配置：2 核 4G

### Dify 解决的核心痛点

| 痛点 | Dify 的解决方案 |
|------|---------------|
| RAG 系统开发复杂 | 可视化 RAG Pipeline：上传文档 → 自动切片 → 向量化 → 检索 |
| 多模型管理混乱 | 统一模型网关：100+ 模型一站式管理 |
| AI 应用运维困难 | LLMOps 套件：日志/监控/A/B测试/成本管控 |
| 企业权限与合规 | 细粒度权限 + 操作审计 + 私有化部署 |
| 重复造轮子 | 50+ 内置节点：LLM/条件/循环/并行/代码节点 |

---

## 1.2 四层 Beehive 架构

| 层级 | 技术栈 | 作用 |
|------|--------|------|
| **应用交互层** | Next.js + Ant Design | 可视化工作流编排、实时调试 |
| **API 服务层** | FastAPI/Flask | 请求路由、权限控制、多租户管理 |
| **核心引擎层** | 工作流/RAG/Agent 引擎 | 编排引擎、RAG Pipeline、Agent DSL |
| **基础设施层** | PostgreSQL + Redis + 向量数据库 | 数据存储、模型调度、文件解析 |

---

## 1.3 选型决策

| 场景 | 推荐平台 | 理由 |
|------|---------|------|
| **企业 RAG 知识库 + 私有化部署** | ✅ Dify | 开源可控、LLMOps 完善、数据安全 |
| **快速原型 + 非技术人员** | Coze | 更易上手、生态丰富 |
| **通用工作流自动化** | n8n | 不限于 AI，400+ 集成 |
| **轻量知识库（仅 RAG）** | FastGPT | 更轻量、知识库效果更好 |
| **文档解析 + RAG** | RAGFlow | 深度文档解析，适合多格式混合场景 |

> 📖 完整对比见 [[Wiki/wiki/comparisons/lowcode-ai-platforms|低代码 AI 平台对比]]。

---

## 1.4 本章实战练习

- [ ] 用自己的话解释 Dify 解决了什么问题（说给非技术同事听）
- [ ] 画出 Dify 的四层 Beehive 架构图
- [ ] 对比 Dify vs Coze，确定你的使用场景更适合哪个

---

> 📖 继续学习 [[02-私有化部署|第二章：私有化部署]]——用 Docker 一键部署 Dify。
