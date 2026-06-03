---
title: 发布与 API 集成
type: tutorial
tags: [Coze, API, 发布, 集成, VS Code, 手写Agent]
created: 2026-06-02
updated: 2026-06-02
sources:
  - Wiki/wiki/entities/coze.md
related:
  - 00-Coze平台实战指南.md
  - 03-可视化工作流编排.md
---

# 第四章：发布与 API 集成

> 📖 将 Agent 发布到多平台，通过 API 接入本地开发环境。

---

## 4.1 多平台一键发布

Coze 的核心优势：一次搭建，多平台发布。

| 发布平台 | 配置难度 | 适用场景 |
|---------|---------|---------|
| **扣子商店** | ⭐ | 公开分享，获取用户 |
| **微信** | ⭐⭐ | 私域流量，企业内部 |
| **飞书** | ⭐ | 企业内部协作 |
| **抖音** | ⭐⭐ | 内容营销 |
| **微信小程序** | ⭐⭐⭐ | 产品级应用 |
| **Web 网页** | ⭐ | 嵌入网站 |
| **API** | ⭐⭐ | 接入自有系统 |

**发布步骤**：Agent 页面 → 发布 → 选择平台 → 填写配置 → 提交审核

> ⚠️ 微信/抖音发布需要应用审核，预留 1-3 个工作日。

---

## 4.2 API 调用

Coze 支持将 Agent 发布为 API，供本地程序调用：

```python
import requests

# Coze API 配置
API_URL = "https://api.coze.cn/v1/chat"
API_KEY = "pat_xxxxxxxx"  # 个人访问令牌
BOT_ID = "bot_xxxxxxxx"    # Agent ID

# 发送消息
response = requests.post(
    API_URL,
    headers={
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    },
    json={
        "bot_id": BOT_ID,
        "user": "developer-001",
        "query": "用 TypeScript 写一个 LRU Cache 实现",
        "stream": False
    }
)

print(response.json()["messages"][-1]["content"])
```

---

## 4.3 与本地开发环境集成

### VS Code 集成

```json
// .vscode/settings.json
{
  "rest-client.environmentVariables": {
    "coze": {
      "apiKey": "pat_xxxxxxxx",
      "botId": "bot_xxxxxxxx"
    }
  }
}
```

```http
### .vscode/coze.http
POST https://api.coze.cn/v1/chat
Authorization: Bearer {{apiKey}}
Content-Type: application/json

{
  "bot_id": "{{botId}}",
  "user": "vscode-user",
  "query": "审查当前打开的文件",
  "stream": false
}
```

### 终端集成

```bash
# ~/.zshrc 或 ~/.bashrc
coze() {
  curl -s -X POST "https://api.coze.cn/v1/chat" \
    -H "Authorization: Bearer $COZE_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"bot_id\": \"$COZE_BOT_ID\", \"user\": \"cli-user\", \"query\": \"$1\", \"stream\": false}" \
    | jq -r '.messages[-1].content'
}

# 使用
coze "帮我查一下 localhost:3000 的 /api/users 接口返回格式"
```

---

## 4.4 进阶：Coze → 手写 Agent

当你通过 Coze 验证了 Agent 的核心逻辑后，可以将其迁移到代码层：

```
Coze 可视化原型 → 验证核心逻辑（1 天）
  ↓
确定 Agent 的核心工具和工作流
  ↓
手写代码实现：Function Calling + MCP + 记忆系统
  ↓
部署到自有服务器，突破 Coze 能力边界
```

### 何时该从 Coze 迁移？

| 信号 | 说明 |
|------|------|
| 需要自定义复杂的 Function Calling 逻辑 | Coze 的代码节点有限 |
| 需要接入自研模型或向量数据库 | Coze 模型选择有限 |
| 需要复杂的多 Agent 协作 | Coze 对多 Agent 支持有限 |
| 数据安全要求数据不出企业服务器 | Coze 云端处理 |
| 需要处理高并发请求（>100 QPS） | Coze 有限流 |

---

## 4.5 本章实战练习

- [ ] 将你的 Agent 发布为 API，用 Python 调用一次
- [ ] 在终端配置 `coze` 函数，实现命令行直接调用 Agent
- [ ] 确定你的 Agent 是否需要从 Coze 迁移到代码层，给出判断理由
- [ ] 如果需要迁移，写出迁移计划（哪些部分手写、哪些保留在 Coze）

---

> 📖 继续学习 [[../03-MCP/00-MCP学习指南|第 6 周：MCP 协议 + Function Calling + Ollama 本地部署]]——掌握 Agent 生态的核心协议和本地化方案。
