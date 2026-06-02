---
title: Ollama 本地部署
type: tutorial
tags: [Ollama, 本地部署, 模型选型, DeepSeek, Qwen, 分层策略]
created: 2026-06-02
updated: 2026-06-02
sources:
  - Wiki/wiki/entities/mcp.md
related:
  - 00-MCP与本地部署学习指南.md
  - 02-Function Calling.md
---

# 第三章：Ollama 本地部署

> 📖 对应学习计划 Day 6-7。在本地电脑上运行大语言模型——免费、断网可用、零 Token 费用。

---

## 3.1 Ollama 是什么？

Ollama 是一个让你在**本地电脑**上运行大语言模型的工具——免费、断网可用、零 Token 费用。

**适用场景**：
- 断网环境或网络不稳定
- 处理敏感代码（不能上传到云端 API）
- 简单任务降本（代码补全、格式转换、文档生成）
- 学习 LLM 原理（本地调试更方便）

> ⚠️ **务实建议**：不要盲目下载超大规模模型。代码场景 7B/14B 参数性价比最优。复杂推理任务仍用云端 API。

---

## 3.2 安装与模型下载

```bash
# macOS / Linux 安装
curl -fsSL https://ollama.ai/install.sh | sh

# Windows 安装
# 下载安装包：https://ollama.ai/download

# 验证安装
ollama --version

# 下载模型（代码专用推荐）
ollama pull deepseek-coder:6.7b      # DeepSeek 编码专用（约 4GB）
ollama pull qwen2.5-coder:7b         # Qwen 编码专用（约 4GB）
ollama pull deepseek-r1:8b           # DeepSeek 推理增强（约 5GB）
ollama pull glm4:9b                  # 智谱 GLM-4（约 5.5GB）
ollama pull codegemma:7b             # Google 编码专用（约 4GB）

# 通用模型
ollama pull qwen2.5:14b              # 综合能力强（约 9GB）
ollama pull llama3.1:8b              # Meta 开源（约 5GB）

# 查看已下载模型
ollama list

# 测试运行
ollama run deepseek-coder:6.7b
```

### 模型选型建议

| 场景 | 推荐模型 | 大小 | 内存要求 |
|------|---------|------|---------|
| **代码补全/生成** | deepseek-coder:6.7b | ~4GB | 8GB+ |
| **代码审查/Debug** | qwen2.5-coder:7b | ~4GB | 8GB+ |
| **复杂逻辑推理** | deepseek-r1:8b | ~5GB | 16GB+ |
| **中文综合** | qwen2.5:14b | ~9GB | 16GB+ |
| **日常对话/文档** | glm4:9b | ~5.5GB | 12GB+ |

---

## 3.3 API 调用与本地编码集成

Ollama 提供了兼容 OpenAI 格式的 API（默认 http://localhost:11434）：

```python
# Python 调用示例
import requests

def ollama_chat(model: str, prompt: str) -> str:
    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": model,
            "prompt": prompt,
            "stream": False
        }
    )
    return response.json()["response"]

# 代码生成示例
code = ollama_chat(
    "deepseek-coder:6.7b",
    "Write a Python function that finds the longest palindromic substring. Only output code."
)
print(code)
```

```bash
# cURL 调用
curl http://localhost:11434/api/generate -d '{
  "model": "deepseek-coder:6.7b",
  "prompt": "用 TypeScript 写一个类型安全的 EventEmitter 类",
  "stream": false
}'
```

---

## 3.4 本地模型 vs 云端 API 的分层策略

```
代码补全 / 格式转换 / 简单重构  → Ollama 本地（零成本、低延迟）
  ↓ 模型能力不足以处理
Bug 定位 / 中等复杂度功能开发  → DeepSeek V3 API（高性价比）
  ↓ 需要最强推理
复杂架构设计 / 多文件重构     → Claude Opus 4 API（最强能力）
```

### 成本对比

| 场景 | Ollama 本地 | DeepSeek API | Claude API |
|------|-----------|-------------|------------|
| 代码补全（1000次/天） | ¥0 | ¥0.5 | ¥8 |
| 复杂重构（10次/天） | ❌ 能力不足 | ¥0.8 | ¥12 |
| 月总成本 | ¥0 | ~¥50 | ~¥600 |

---

## 3.5 调用链风控

Function Calling 在 Ollama 下的注意事项：

```python
# 风控配置
AGENT_CONFIG = {
    "max_tool_calls": 5,        # 单次任务最大工具调用次数
    "tool_timeout": 30,         # 单次工具调用超时（秒）
    "max_result_length": 2000,  # 工具返回结果最大长度（字符）
    "allowed_tools": [          # 白名单
        "read_file",
        "search_code",
        "run_test"
    ],
    "blocked_tools": [          # 黑名单（永远禁止）
        "rm_minus_rf",
        "force_push",
        "drop_table"
    ]
}
```

---

## 3.6 本章实战练习

- [ ] 安装 Ollama 并下载 deepseek-coder:6.7b
- [ ] 用 Python API 完成一次代码生成
- [ ] 建立你的三层调用策略（本地 / DeepSeek API / Claude API）
- [ ] 配置风控参数（白名单 + 黑名单）

---

> 📖 完成第 6 周学习后，进入 [[../03-AI编码工具/00-AI Coding 学习计划|第 7 周：Agent 框架实战（OpenClaw + Hermes + Agentic RAG + KV 缓存）]]——已有完整教程，直接使用即可。
