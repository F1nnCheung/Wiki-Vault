---
title: Dify
type: entity
tags: [AI平台, LLMOps, 开源, RAG, Agent开发]
created: 2026-06-01
updated: 2026-06-03
sources:
  - raw/articles/低代码agent/Dify、n8n、扣子、Fastgpt、Ragflow到底该怎么选？超详细指南来了【好文推荐，附MinerU实用教程】.md
  - raw/articles/低代码agent/Dify 与 Coze 深度对比：架构、技术、优势与应用场景.md
  - raw/articles/低代码agent/Dify 新手入门第二课：从工作流到对话流的底层机制.md
  - raw/articles/低代码agent/本地部署 Dify + Ollama + DeepSeek 最全指南.md
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

## Dify 四层架构详解

Dify 可以划分为四层，通过 DAG（有向无环图）表示节点依赖，确保执行顺序和可追踪性：

### 1. 前端交互层
用户输入界面、对话窗口、表单和模块拖拽页面。支持 Chatflow 对话历史显示、输入输出管理。

### 2. 智能体执行层（Engine）
核心是 **DAG 执行引擎**。节点类型包括：
- **模型节点（LLM）**：调用语言模型生成文本或结构化输出（温度/Top-K/输出类型 JSON/文本）
- **知识库节点（RAG）**：向量检索 + 文本增强生成（知识库选择/Top-K/向量维度/查询模板）
- **工具节点（HTTP/Tool）**：调用外部 API 或执行脚本
- **条件分支节点（IF/CASE）**：控制流程走向
- **变量/运算节点**：数据计算、条件判断、数组/对象操作
- **循环节点（LOOP/FOREACH）**：对集合执行重复逻辑
- **会话管理节点**：Chatflow 专用，保存多轮对话上下文

### 3. 模型与数据层
多模型管理、参数配置（温度、Top-K）。知识库支持向量搜索和混合检索模式。日志记录与监控：节点执行状态、错误追踪、历史回溯。

### 4. 发布与运维层
- 发布方式：Web App / API / MCP Server
- DSL 导出：YAML/JSON（含节点定义/变量/流程拓扑），支持版本控制、应用迁移、CI/CD 集成
- 版本控制、权限管理、错误定位、回滚功能

## Workflow vs Chatflow

| 特性 | Workflow | Chatflow |
|------|----------|----------|
| 触发机制 | 用户输入或触发器（Webhook/定时） | 用户消息触发 |
| 状态管理 | 一次执行，无状态 | 多轮对话，保留上下文 |
| 条件控制 | IF/Branch | IF/Branch + 上下文记忆 |
| 适用场景 | 自动化任务、数据处理 | 对话助手、客户交互 |

> Chatflow 在 Workflow 基础上增加了会话记忆、上下文变量和多轮对话支持。所有节点均可在 DAG 中复用，变量在节点间传递形成完整执行链。

## 核心节点清单

| 节点类型 | 属性 | 作用 |
|----------|------|------|
| 用户输入节点 | ID/标签/输入类型/上下文引用 | 捕获用户输入，触发流程 |
| 模型节点（LLM） | 模型类型/提示模板/输出类型/错误策略 | 调用 AI 模型生成输出 |
| 知识库检索节点 | 知识库/Top-K/向量维度/查询模板 | RAG 查询，增强 AI 准确性 |
| HTTP/Tool 节点 | API URL/Method/Headers/Body/超时 | 调用外部服务 |
| 条件分支节点 | 条件表达式/分支路径 | 根据逻辑选择执行路线 |
| 输出节点 | 输出目标/格式化选项 | 返回最终结果 |
| 变量/运算节点 | 变量名称/类型/表达式 | 数据处理与计算 |
| 循环节点 | 循环条件/迭代变量 | 对集合执行重复逻辑 |
| 会话管理节点 | 变量作用域/保存策略 | Chatflow 专用，跨轮次上下文 |
| 错误处理/Fallback | 异常类型/处理策略 | 保证流程可继续执行 |

## Docker 本地部署

```bash
# 1. 安装 Docker Desktop（Mac/Windows）
# 2. 克隆仓库
git clone https://github.com/langgenius/dify.git
cd dify/docker

# 3. 复制环境配置
cp .env.example .env

# 4. 启动（Docker Compose V2）
docker compose up -d

# 5. 检查容器状态（3 业务服务 + 6 基础组件）
docker compose ps

# 6. 访问初始化页面
# 本地：http://localhost/install
# 服务器：http://your_server_ip/install
```

### 更新版本

```bash
cd dify/docker
docker compose down
git pull origin main
docker compose pull
docker compose up -d
# ⚠️ 如果 .env.example 有更新，需同步修改本地 .env 文件
```

### 接入本地模型（Ollama + DeepSeek）

本地部署后可通过 Ollama 插件对接自托管模型。例如 Mac 24G M3 可流畅运行 `deepseek-r1:7b`。

---

> 📖 导航：[[../../教程/学习AI/07-Dify平台实战/00-Dify平台实战指南|Dify 教程]] · [[../comparisons/lowcode-ai-platforms|低代码 AI 平台对比]]
