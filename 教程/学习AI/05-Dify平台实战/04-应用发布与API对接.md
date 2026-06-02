---
title: 应用发布与 API 对接
type: tutorial
tags: [Dify, API, 发布, 工作流, Agent, 集成]
created: 2026-06-02
updated: 2026-06-02
sources:
  - Wiki/wiki/entities/dify.md
related:
  - 00-Dify平台实战指南.md
  - 03-RAG管线搭建.md
---

# 第四章：应用发布与 API 对接

> 📖 将 Dify 应用发布为网页、API 或嵌入到现有系统中。

---

## 4.1 应用类型

| 类型 | 适用场景 | 示例 |
|------|---------|------|
| **聊天助手** | 知识库问答 | 「代码库 Q&A 助手」 |
| **文本生成** | 单次任务 | 「SQL 生成器」「代码审查」 |
| **Agent** | 多步自主任务 | 「自动 TDD 开发助手」 |
| **工作流** | 复杂编排 | 「代码提交 → 审查 → 部署」全流程 |

---

## 4.2 发布方式

| 方式 | 适用 | 操作 |
|------|------|------|
| **内嵌网页** | 团队内部使用 | 应用 → 概览 → 公开访问 → 复制链接 |
| **API 调用** | 集成到其他系统 | 应用 → API 参考 → 生成 API Key |
| **前端 SDK** | 自建 UI | 应用 → 嵌入 → 复制 iframe 或 SDK 代码 |
| **飞书/钉钉集成** | 企业内部 | 应用 → 集成 → 选择平台 → 配置 |

---

## 4.3 API 调用示例

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

---

## 4.4 进阶：工作流 + Agent

当基础 RAG 问答满足不了需求时，Dify 的工作流和 Agent 功能可以构建更复杂的 AI 应用：

### 工作流示例：代码审查 Pipeline

```
GitHub Webhook 触发
  → 获取 PR diff
  → 代码安全扫描节点
  → 代码质量分析节点
  → 生成审查报告
  → 回写 PR Comment
```

### Agent 示例：全栈开发助手

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

## 4.5 本章实战练习

- [ ] 将你的代码问答机器人发布为内嵌网页
- [ ] 用 Python/cURL 调用 API，完成一次完整的问答
- [ ] 设计一个工作流（至少 3 个节点），实现自动化代码审查
- [ ] 评估：你的使用场景是否需要工作流/Agent，还是基础 RAG 就够？

---

> 📖 继续学习 [[../07-Coze平台实战/00-Coze平台实战指南|Coze 可视化 Agent 编排]]——用可视化方式快速验证 Agent 想法。
