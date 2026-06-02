---
title: Dify 平台实战指南
type: tutorial
tags: [Dify, 低代码, RAG, 私有化部署, LLMOps, 学习计划]
created: 2026-06-01
updated: 2026-06-01
sources:
  - Wiki/wiki/entities/dify.md
  - Wiki/wiki/comparisons/lowcode-ai-platforms.md
  - Wiki/wiki/concepts/rag-architectures.md
  - Wiki/wiki/concepts/hybrid-retrieval.md
related:
  - ../Coze平台实战/Coze平台实战指南.md
  - ../知识库技术/知识库技术学习指南.md
  - ../AI Agent/AI Agent 学习指南.md
---

# Dify 平台实战指南

> 对应学习计划**第 4 周 Day 4-7**：先懂 RAG 原理（Day 1-3 见 [[../知识库技术/知识库技术学习指南|知识库技术教程]]），再用 Dify 低代码平台快速落地 RAG 管线，二者互为表里。

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

## 第一章：认识 Dify

### 1.1 Dify 是什么？

Dify 是一个**开源的 LLM 应用开发平台**，融合 Backend-as-a-Service 和 LLMOps 理念。它的口号是「你只管创新，其他交给 Dify」。

**一句话**：Dify 让你能像搭积木一样构建 AI 应用——RAG 知识库、AI Agent、自动化工作流——无需从零写后端代码。

> GitHub Stars: 98.3K+（2026.05）| 许可证：Apache 2.0 | 最低配置：2 核 4G

Dify 解决的核心痛点：

| 痛点 | Dify 的解决方案 |
|------|---------------|
| RAG 系统开发复杂 | 可视化 RAG Pipeline：上传文档 → 自动切片 → 向量化 → 检索 |
| 多模型管理混乱 | 统一模型网关：100+ 模型一站式管理 |
| AI 应用运维困难 | LLMOps 套件：日志/监控/A/B测试/成本管控 |
| 企业权限与合规 | 细粒度权限 + 操作审计 + 私有化部署 |
| 重复造轮子 | 50+ 内置节点：LLM/条件/循环/并行/代码节点 |

### 1.2 四层 Beehive 架构

| 层级 | 技术栈 | 作用 |
|------|--------|------|
| **应用交互层** | Next.js + Ant Design | 可视化工作流编排、实时调试 |
| **API 服务层** | FastAPI/Flask | 请求路由、权限控制、多租户管理 |
| **核心引擎层** | 工作流/RAG/Agent 引擎 | 编排引擎、RAG Pipeline、Agent DSL |
| **基础设施层** | PostgreSQL + Redis + 向量数据库 | 数据存储、模型调度、文件解析 |

### 1.3 选型决策

| 场景 | 推荐平台 | 理由 |
|------|---------|------|
| **企业 RAG 知识库 + 私有化部署** | ✅ Dify | 开源可控、LLMOps 完善、数据安全 |
| **快速原型 + 非技术人员** | Coze | 更易上手、生态丰富 |
| **通用工作流自动化** | n8n | 不限于 AI，400+ 集成 |
| **轻量知识库（仅 RAG）** | FastGPT | 更轻量、知识库效果更好 |
| **文档解析 + RAG** | RAGFlow | 深度文档解析，适合多格式混合场景 |

> 📖 完整对比见 [[Wiki/wiki/comparisons/lowcode-ai-platforms|低代码 AI 平台对比]]。

---

## 第二章：私有化部署

### 2.1 Docker 部署（推荐）

**前置要求**：Docker & Docker Compose、2 核 4G+ 内存、20G+ 磁盘

```bash
# 1. 克隆仓库
git clone https://github.com/langgenius/dify.git
cd dify/docker

# 2. 复制环境变量配置
cp .env.example .env

# 3. 编辑 .env（关键配置项）
# SECRET_KEY=  # 生成随机字符串：openssl rand -hex 32
# INIT_PASSWORD=  # 管理员初始密码
# SANDBOX_API_KEY=  # 代码沙箱密钥

# 4. 启动服务
docker compose up -d

# 5. 验证
# 浏览器访问 http://localhost:80
# 初始管理员邮箱：根据 .env 配置
# 初始密码：根据 .env 中 INIT_PASSWORD

# 6. 查看运行状态
docker compose ps
docker compose logs -f api  # 查看 API 服务日志
```

**Docker Compose 核心服务**：

| 服务 | 端口 | 用途 |
|------|------|------|
| `api` | 5001 | 后端 API 服务 |
| `web` | 3000 | 前端界面 |
| `nginx` | 80/443 | 反向代理 |
| `db` | 5432 | PostgreSQL 数据库 |
| `redis` | 6379 | 缓存与消息队列 |
| `weaviate` | 8080 | 默认向量数据库 |
| `sandbox` | 8194 | 代码执行沙箱 |

### 2.2 关键配置项

```bash
# .env 关键配置

# === 模型配置 ===
# OpenAI
OPENAI_API_KEY=sk-xxx

# Claude
ANTHROPIC_API_KEY=sk-ant-xxx

# 国内模型（推荐至少配一个）
TONGYI_API_KEY=sk-xxx        # 阿里通义千问
ZHIPUAI_API_KEY=xxx           # 智谱 GLM
DEEPSEEK_API_KEY=sk-xxx       # DeepSeek（性价比最高）

# === 向量数据库 ===
# 默认 Weaviate 已内置，无需额外配置
# 如需切换 Milvus：
VECTOR_STORE=milvus
MILVUS_HOST=localhost
MILVUS_PORT=19530

# === 企业功能 ===
# 邮件服务（用于邀请成员、密码重置）
MAIL_TYPE=smtp
MAIL_DEFAULT_SEND_FROM=admin@yourcompany.com
SMTP_SERVER=smtp.yourcompany.com
SMTP_PORT=587
SMTP_USERNAME=your-email
SMTP_PASSWORD=your-password
```

### 2.3 初始设置

登录 Dify 后，第一步操作清单：

1. **配置模型供应商**：设置 → 模型供应商 → 添加至少一个
2. **创建管理员账号**：设置 → 成员 → 添加团队成员
3. **配置默认向量数据库**：设置 → 知识库 → 选择默认向量存储
4. **开启功能模块**：根据需要开启工作流/Agent/MCP 等功能

---

## 第三章：RAG 管线搭建

> 💡 **学习心法**：先理解 RAG 的底层原理（见 [[../知识库技术/知识库技术学习指南|知识库技术教程]]），再用 Dify 做可视化实践。这样当你需要突破 Dify 能力边界时，你知道底层手写该怎么做。

### 3.1 创建知识库

```
工作台 → 知识库 → 创建知识库
```

**关键配置项**：

| 配置 | 选项 | 建议 |
|------|------|------|
| **索引方式** | 高质量（调用 Embedding）/ 经济（关键词匹配）/ 社区（混合） | 代码场景选「高质量」 |
| **Embedding 模型** | OpenAI text-embedding-3 / bge-large-zh / m3e-base | 中文选 bge-large-zh |
| **检索方式** | 向量检索 / 全文检索 / 混合检索 | 推荐「混合检索」 |
| **重排序（Rerank）** | Cohere Rerank / bge-reranker | 开启后可大幅提升相关性 |

### 3.2 文档上传与切片

**支持的格式**：PDF、TXT、Markdown、HTML、Word、Excel、CSV、JSON、EPUB

**切片策略配置**：

| 策略 | 适用场景 | Dify 中如何配置 |
|------|---------|---------------|
| **固定大小切片** | 通用文本 | 分段长度 500-1000 tokens，重叠 10-20% |
| **语义切片** | 结构化文档 | 开启「自动分段与清洗」，Dify 会按段落/章节切 |
| **代码专用** | 代码文件 | 分段长度 800-1500 tokens，开启「保留格式」 |
| **QA 模式** | 问答对 | 上传 Q&A CSV 格式 |

**代码知识库特殊建议**：
- 上传前先用 Repomix 将项目打包为单文件（保留目录结构上下文）
- 切片长度设 1500 tokens（保证函数完整性）
- 开启混合检索（代码中的关键字匹配 + 语义理解）
- 在文档元数据中标注文件名和路径

### 3.3 搭建问答应用

```
工作台 → 创建应用 → 聊天助手 → 关联知识库
```

#### 提示词编排（系统提示词）

```markdown
你是一个代码知识库助手，负责回答关于 [项目名] 的技术问题。

## 知识范围
- 你可以访问 [项目名] 的全部代码和文档
- 回答基于知识库中的代码和文档
- 如果知识库中没有相关信息，明确告知并建议查阅源码位置

## 回答格式
1. 直接回答（2-3 句话核心要点）
2. 相关代码片段（标注文件路径）
3. 补充说明（如有注意事项或替代方案）

## 约束
- 不确定就说不知道，不要编造
- 代码片段标注来源文件路径
- 如涉及多个文件，标注它们之间的关系
```

#### 上下文配置

| 参数 | 建议值 | 说明 |
|------|-------|------|
| **TopK** | 3-5 | 每次检索返回的片段数 |
| **Score 阈值** | 0.5-0.7 | 低于此分数的结果不返回（代码场景设 0.6） |
| **重排序** | 开启 | 用 Rerank 模型对 TopK 结果二次排序 |
| **最大 Token** | 2000-4000 | 给 LLM 的上下文上限 |

### 3.4 实战：团队代码知识库问答机器人

以下是从零搭建的完整步骤：

**Step 1：准备代码文档**

```bash
# 使用 Repomix 打包项目
npx repomix --output project-doc.txt

# 或从 Git 导出最近的关键文件
git log --name-only --since="3 months ago" --format="" | sort -u | \
  while read f; do [ -f "$f" ] && echo "--- $f ---" && cat "$f"; done > recent-code.txt
```

**Step 2：上传到 Dify 知识库**
- 拖拽文件或通过 API 批量上传
- 选择「高质量」索引模式
- Embedding 模型：中文项目用 `bge-large-zh-v1.5`，英文项目用 `text-embedding-3-large`

**Step 3：配置检索策略**
```
索引方式：高质量
检索方式：混合检索（向量 + BM25）
TopK：5
Score 阈值：0.5
重排序：开启（bge-reranker-large）
```

**Step 4：编写系统提示词**

参考 3.3 节模板，根据项目特点自定义。

**Step 5：测试与调优**
- 用 10 个典型问题测试
- 记录回答不准确的 case
- 调整 TopK、Score 阈值、切片策略
- 补充关键文档到知识库

**Step 6：发布使用**
- 生成内嵌网页：分享链接给团队
- API 接入：集成到内部工具（Tower/Jira/飞书）

---

## 第四章：应用发布与 API 对接

### 4.1 应用类型

| 类型 | 适用场景 | 示例 |
|------|---------|------|
| **聊天助手** | 知识库问答 | 「代码库 Q&A 助手」 |
| **文本生成** | 单次任务 | 「SQL 生成器」「代码审查」 |
| **Agent** | 多步自主任务 | 「自动 TDD 开发助手」 |
| **工作流** | 复杂编排 | 「代码提交 → 审查 → 部署」全流程 |

### 4.2 发布方式

| 方式 | 适用 | 操作 |
|------|------|------|
| **内嵌网页** | 团队内部使用 | 应用 → 概览 → 公开访问 → 复制链接 |
| **API 调用** | 集成到其他系统 | 应用 → API 参考 → 生成 API Key |
| **前端 SDK** | 自建 UI | 应用 → 嵌入 → 复制 iframe 或 SDK 代码 |
| **飞书/钉钉集成** | 企业内部 | 应用 → 集成 → 选择平台 → 配置 |

### 4.3 API 调用示例

```python
import requests

# 配置
API_BASE = "http://your-dify-server/v1"
API_KEY = "app-xxxxxxxx"  # 应用 → API 参考中生成

# 发送聊天消息
response = requests.post(
    f"{API_BASE}/chat-messages",
    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    },
    json={
        "inputs": {},
        "query": "UserService 的 authenticate 方法在哪里定义？",
        "response_mode": "blocking",  # streaming 或 blocking
        "user": "developer-001"
    }
)

result = response.json()
print(result["answer"])
# 如果关联了知识库，response 中会包含 metadata.retriever_resources
```

```bash
# cURL 示例
curl -X POST "http://your-dify-server/v1/chat-messages" \
  -H "Authorization: Bearer app-xxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "如何配置数据库连接？",
    "response_mode": "blocking",
    "user": "developer-001"
  }'
```

### 4.4 进阶：工作流 + Agent

当基础 RAG 问答满足不了需求时，Dify 的工作流和 Agent 功能可以构建更复杂的 AI 应用：

**工作流示例：代码审查 Pipeline**
```
GitHub Webhook 触发
  → 获取 PR diff
  → 代码安全扫描节点
  → 代码质量分析节点
  → 生成审查报告
  → 回写 PR Comment
```

**Agent 示例：全栈开发助手**
```
用户：帮我生成用户管理模块
  → Agent 规划任务
  → 调用「知识库检索」了解项目结构
  → 调用「代码生成」创建文件
  → 调用「代码审查」检查质量
  → 调用「测试生成」补充测试
  → 输出完整模块
```

---

## 附录 A：学习计划对照

| 学习计划 Day | 学习内容 | 本文对应章节 |
|-------------|---------|------------|
| Day 4 | Dify 私有化部署 | 第二章 |
| Day 5 | RAG 管线搭建 | 第三章 |
| Day 6-7 | 进阶优化 + 实战项目 | 第三、四章 |

> ⚠️ 学习计划 Day 1-3 的 RAG 理论基础部分，参见 [[../知识库技术/知识库技术学习指南|知识库技术教程]]。

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
# 备份 PostgreSQL
docker exec -t dify-db-1 pg_dump -U postgres dify > backup.sql

# 备份文件存储
tar -czf dify-storage-backup.tar.gz dify/docker/volumes/
```

**Q: 混合检索怎么选？**
- 技术文档/代码库：全文检索（BM25）+ 向量检索
- 纯对话/客服：向量检索即可
- 法规/合同：全文检索为主，向量为辅

**Q: 什么时候该从 Dify 迁移到自研方案？**
- 需要突破 Dify 的切片策略限制
- 需要更灵活的检索算法（自定义 RRF 融合参数）
- 需要接入内部自研模型/向量库
- 高并发场景（>1000 QPS）

## 附录 C：延伸阅读

| 主题 | 知识库资源 |
|------|-----------|
| RAG 三大架构（Classic / Graph / Agentic） | [[Wiki/wiki/concepts/rag-architectures\|RAG 架构]] |
| RAG 优化 20 法（五阶段管线） | [[Wiki/wiki/topics/rag-optimization-techniques\|RAG 优化 20 法]] |
| 混合检索（BM25 + 向量） | [[Wiki/wiki/concepts/hybrid-retrieval\|混合检索]] |
| Dify vs Coze vs n8n 全面对比 | [[Wiki/wiki/comparisons/lowcode-ai-platforms\|低代码 AI 平台对比]] |
| 知识库技术完整教程 | [[../知识库技术/知识库技术学习指南\|知识库技术学习指南]] |

---

> 📖 Dify 帮助企业快速落地 RAG 管线，但低代码平台不是终点——生产级定制必须回到代码层。接下来学习 [[../Coze平台实战/Coze平台实战指南|Coze 可视化 Agent 编排]]，用低代码平台快速验证 Agent 想法。
