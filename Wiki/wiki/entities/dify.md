---
title: Dify
type: entity
tags: [AI平台, LLMOps, 开源, RAG, Agent开发]
created: 2026-06-01
updated: 2026-06-01
sources:
  - raw/articles/低代码agent/Dify、n8n、扣子、Fastgpt、Ragflow到底该怎么选？超详细指南来了【好文推荐，附MinerU实用教程】.md
  - raw/articles/低代码agent/Dify 与 Coze 深度对比：架构、技术、优势与应用场景.md
related:
  - entities/coze.md
  - entities/n8n.md
  - comparisons/lowcode-ai-platforms.md
  - concepts/rag-architectures.md
---

# Dify

Dify 是一个开源的 LLM 应用开发平台，融合 Backend-as-a-Service 和 LLMOps 理念，定位「企业级 AI 应用一站式开发与运营平台」。

## 核心定位

Dify 的口号是「你只管创新，其他交给 Dify」。它将 RAG Pipeline、AI 工作流、模型管理、监控工具、MCP 等功能集成到一个平台中，目标是让开发者和非技术用户都能快速构建生产级 AI 解决方案。

> GitHub Stars: 98.3K+（2026.05）；支持 Docker 私有化部署，最低配置 2 核 4G。

## 架构设计

Dify 采用四层解耦的「Beehive（蜂巢）」架构：

| 层级 | 核心技术 | 主要功能 |
|------|----------|----------|
| **应用交互层** | Next.js/React + Ant Design | 可视化工作流编排、提示词编辑、实时调试 |
| **API 服务层** | FastAPI/Flask | 请求路由分发、权限控制、多租户管理 |
| **核心引擎层** | 工作流/RAG/Agent 引擎 | Orchestraion Studio、RAG Pipeline、Agent DSL |
| **基础设施层** | PostgreSQL + Redis + 向量数据库 | 数据存储、模型抽象、文件解析、消息队列 |

## 核心技术模块

- **Orchestration Studio**：可视化工作流编排引擎，支持 DAG 设计，50+ 内置节点（LLM/条件/循环/并行/自定义代码）
- **RAG Pipeline**：端到端检索增强生成管道，20+ 文档格式解析，混合检索（语义+关键词），多轮对话记忆
- **Agent DSL**：基于 ReAct 模式的智能体定义语言，50+ 预置工具，多智能体协同
- **MCP Server**：统一模型调度中枢，100+ 主流模型支持（OpenAI/Claude/通义千问/智谱/本地模型），流控熔断
- **LLMOps 套件**：日志分析、性能监控、A/B 测试、模型版本管理

## 核心优势

| 维度 | 说明 |
|------|------|
| **开源灵活性** | 完全开源，支持私有化部署，数据安全可控 |
| **模型兼容性** | 100+ 主流模型，不绑定任何平台，支持本地模型 |
| **企业级特性** | 多模型热切换、细粒度权限、操作审计、全链路监控 |
| **RAG 能力** | 端到端 RAG Pipeline，20+ 文档格式，混合检索 |
| **开发深度** | 自定义函数/插件/代码节点，适合技术团队构建复杂应用 |

## 主要不足

- 学习曲线较陡，功能丰富导致新手入门慢
- 自部署需要运维能力（Docker/K8s）
- 插件生态不如 [[coze|Coze]] 丰富
- 前端界面相对简洁，交互体验一般
- Bot API 不兼容 OpenAI API，外部对接较困难
- 给人一种「样样通，样样松」的感觉

## 与其他平台对比

- **vs Coze**：Dify 开源灵活、数据可控、更适合技术团队；Coze 易上手、生态丰富、适合非技术人员
- **vs n8n**：Dify 专注 AI 应用开发 + LLMOps；n8n 是通用工作流自动化
- **vs FastGPT**：Dify 更全面（工作流+Agent+LLMOps）；FastGPT 更轻量、知识库效果更好、API 兼容 OpenAI

详见 [[../comparisons/lowcode-ai-platforms|低代码 AI 平台对比]]。

## 适用场景

- 企业级 AI 应用开发（金融/医疗/政务等合规行业）
- 复杂 RAG 系统构建
- 多模型协同应用
- 有 Python 技术栈的团队深度开发
- 需要 LLMOps 能力的生产级 AI 运维

---

> Dify 像瑞士军刀——什么都有，但未必每项都极致。适合需要「全链路可控」的专业团队。
