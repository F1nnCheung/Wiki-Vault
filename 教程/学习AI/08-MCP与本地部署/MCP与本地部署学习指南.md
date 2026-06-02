---
title: MCP 与本地部署学习指南
type: tutorial
tags: [MCP, Function Calling, Ollama, 本地部署, 多智能体通信, 学习计划]
created: 2026-06-01
updated: 2026-06-01
sources:
  - Wiki/wiki/entities/mcp.md
  - Wiki/wiki/topics/claude-code-mcp-ecosystem.md
  - Wiki/wiki/concepts/ai-agent.md
related:
  - ../AI Coding/AI Coding 学习计划.md
  - ../AI Agent/AI Agent 学习指南.md
  - ../LLMOps与工程化/00-LLMOps与工程化指南.md
---

# MCP 与本地部署学习指南

> 对应学习计划**第 6 周**：掌握 MCP 多智能体通信协议、Function Calling 底层机制、Ollama 本地私有化部署。三个主题强关联——MCP 是 Agent 的「手脚」，Function Calling 是 MCP 的底层基础，Ollama 让这一切在本地零成本运行。

---

## 学习路线图

```
阶段一：MCP 协议（Day 1-3，4 小时）
  ├── MCP 是什么？为什么是「AI 版 USB-C」？
  ├── Client-Server 架构与消息格式
  ├── 工具暴露机制与权限模型
  ├── 安装核心 MCP（Playwright / GitHub / Context7）
  └── 实战产出：Claude Code 接入 3+ MCP 体验 AI 操作浏览器

        ↓

阶段二：Function Calling（Day 4-5，3 小时）
  ├── LLM 原生 Function Calling 机制
  ├── 工具 Schema 定义（JSON Schema）
  ├── 调用链优化与风控
  └── 实战产出：手写支持 Function Calling 的 Agent 工具调度器

        ↓

阶段三：Ollama 本地部署（Day 6-7，3 小时）
  ├── Ollama 安装与模型下载
  ├── API 调用与本地编码集成
  ├── 国产模型选型（DeepSeek / Qwen / GLM）
  └── 实战产出：本地 Ollama + DeepSeek 7B 替代云端 API
```

---

## 第一章：MCP 协议

> 📖 对应学习计划 Day 1-3。深度内容见 [[Wiki/wiki/entities/mcp|MCP 实体页]] 和 [[Wiki/wiki/topics/claude-code-mcp-ecosystem|MCP 生态系统]]。

### 1.1 MCP 是什么？

MCP（Model Context Protocol）是 Anthropic 推出的**开源标准协议**，用于将 AI 应用连接到外部数据源和工具。类比 USB-C——为 AI 接入外部系统提供了标准化方式。

**一句话**：MCP 是 AI 的「手脚」。默认 Claude Code 只能读文件和对话，装上 MCP 后能操作浏览器、管理 GitHub、查最新文档、连接数据库。

```
AI ←→ MCP ←→ 浏览器 / 数据库 / GitHub / Figma / ...
```

> ⚠️ **社区共识**：不装 MCP 的 Claude Code 只发挥了约三成功力。

### 1.2 Client-Server 架构

MCP 采用经典的 Client-Server 模式：

```
┌──────────┐        ┌──────────┐        ┌──────────┐
│ AI Host  │ ←────→ │MCP Client│ ←────→ │MCP Server│
│ (Claude) │        │ (内置)    │        │ (工具实现)│
└──────────┘        └──────────┘        └──────────┘
```

| 角色 | 说明 | 示例 |
|------|------|------|
| **AI Host** | AI 应用本身 | Claude Code、Cursor、Trae、Codex |
| **MCP Client** | 协议客户端（内置于 Host） | Claude Code 内置的 MCP Client |
| **MCP Server** | 提供具体能力的服务 | Playwright MCP（浏览器操作）、GitHub MCP（仓库管理） |

**MCP Server 的三种通信方式**：

| 方式 | 协议 | 适用 |
|------|------|------|
| **stdio** | 标准输入/输出 | 本地工具（Claude Code 启动子进程，通过 stdin/stdout 通信） |
| **SSE** | Server-Sent Events | 远程 HTTP 服务 |
| **Streamable HTTP** | HTTP + 流式响应 | 2025 新版，替代 SSE |

### 1.3 消息格式与工具暴露机制

MCP 使用 JSON-RPC 2.0 消息格式。核心消息类型：

| 方法 | 方向 | 说明 |
|------|------|------|
| `tools/list` | Client → Server | 获取可用工具列表 |
| `tools/call` | Client → Server | 调用具体工具 |
| `resources/list` | Client → Server | 获取可用资源（文件/数据） |
| `resources/read` | Client → Server | 读取资源内容 |
| `prompts/list` | Client → Server | 获取预置提示词模板 |

**关键概念——Tool vs Resource vs Prompt**：

| 概念 | 含义 | 示例 |
|------|------|------|
| **Tool** | AI 可以调用的**操作** | `browser_navigate(url)` |
| **Resource** | AI 可以读取的**数据** | 数据库表结构、日志文件 |
| **Prompt** | 预置的**提示词模板** | 「帮我审查这段代码的 SQL 注入风险」 |

### 1.4 核心 MCP 安装实战

#### Playwright MCP（浏览器操作）

```bash
# 安装
claude mcp add playwright -- npx @playwright/mcp@latest

# 功能：AI 能做的事情
# - 打开网页、填表、点击按钮
# - 截图验证页面效果
# - 测试登录/注册/表单提交流程
# - 检查页面可访问性
```

**验证安装**：在 Claude Code 中说「打开 https://example.com，截图给我看」

#### GitHub MCP（仓库管理）

```bash
# 安装
claude mcp add github -- npx @anthropic/mcp-github

# 功能
# - 创建/管理 PR 和 Issue
# - 代码审查
# - 搜索仓库内容
# - 管理分支和标签
```

#### Context7 MCP（最新文档注入）

```bash
# 安装
claude mcp add context7 -- npx @context7/mcp

# 功能：注入最新版本框架文档，防止 AI 用过时的 API
# 适用：遇到「AI 建议的 API 不存在」问题时
```

#### 实战：用 MCP 完成一次完整开发验证

```
「帮我修复 src/login.ts 的表单验证问题，然后在浏览器里验证修复是否生效」

Claude Code 使用：
1. Filesystem MCP → 读取并修改 login.ts
2. Playwright MCP → 启动浏览器 → 打开本地页面 → 测试表单
3. 如果验证失败 → 读取 Playwright MCP 的截图 → 继续修复
```

### 1.5 按角色推荐 MCP 组合

| 角色 | 推荐组合 | 理由 |
|------|---------|------|
| **前端** | Filesystem + Playwright + Figma + Context7 | 浏览器验证 + 设计稿转代码 + 最新文档 |
| **后端** | Filesystem + GitHub + PostgreSQL + Context7 | 版本管理 + 数据库直连 + 最新 API |
| **全栈** | Filesystem + Playwright + GitHub + Context7 | 前后端全覆盖 |
| **数据分析** | Context7 + mcp-run-python + SQLite | Python 执行 + 数据库查询 |
| **新手起步** | Filesystem + Playwright + GitHub | 能直观体验 MCP 价值的组合 |

### 1.6 MCP 避坑指南

1. **不要一次性装太多**：按项目选 2-4 个核心 MCP，多了反而让 AI 混淆
2. **优先项目级配置**：使用 `.mcp.json`（项目根目录）而非全局配置，方便团队共享
3. **先装 Playwright**：最能直观感受 MCP 价值的入口——AI 操作浏览器让你亲眼看到效果
4. **注意权限**：MCP 给了 AI 操作外部系统的能力，生产环境要控制权限范围
5. **stdio 模式更安全**：优先使用本地 stdio 模式，避免不必要的网络暴露

---

## 第二章：Function Calling

> 📖 对应学习计划 Day 4-5。

### 2.1 LLM 原生 Function Calling 机制

Function Calling（函数调用）是 Agent 调用工具的底层基础。LLM 不是真的「执行」函数——它只是生成一个**结构化的函数调用请求**，由你的代码来实际执行。

```
用户：「查询北京今天的天气」

1. LLM 分析：需要调用 get_weather(city: "北京")
2. LLM 生成函数调用请求：{"name": "get_weather", "arguments": {"city": "北京"}}
3. 你的代码执行：调用天气 API
4. 将结果返回给 LLM
5. LLM 根据结果生成回复：「北京今天晴，22-30°C」
```

**核心原理**：LLM 被微调为识别「什么情况下该调用哪个函数」，但函数实际上是由**你的代码**来执行的。

### 2.2 工具 Schema 定义

使用 JSON Schema 定义工具，让 LLM 理解每个工具的用途和参数：

```python
# 工具定义示例
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "获取指定城市的当前天气信息",
            "parameters": {
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "城市名称，如 北京、上海"
                    },
                    "unit": {
                        "type": "string",
                        "enum": ["celsius", "fahrenheit"],
                        "description": "温度单位"
                    }
                },
                "required": ["city"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "search_codebase",
            "description": "在代码库中搜索文件或代码片段",
            "parameters": {
                "type": "object",
                "properties": {
                    "pattern": {"type": "string", "description": "搜索模式，支持正则表达式"},
                    "path": {"type": "string", "description": "搜索目录，默认项目根目录"},
                    "fileTypes": {"type": "array", "items": {"type": "string"}, "description": "限定文件类型，如['.ts', '.tsx']"}
                },
                "required": ["pattern"]
            }
        }
    }
]
```

**设计工具 Schema 的最佳实践**：

| 原则 | 说明 | 错误示例 | 正确示例 |
|------|------|---------|---------|
| **清晰的功能描述** | description 要让 LLM 准确判断何时调用 | `"处理文件"` | `"读取指定路径的文件内容，支持文本和代码文件"` |
| **精确的参数说明** | 每个参数注明类型、格式、约束 | `"time": "时间"` | `"time": "ISO 8601 格式的时间字符串，如 2026-06-01T14:00:00"` |
| **合理的必填标记** | 只标记真正必须的参数为 required | 把所有参数标为 required | 只标核心参数，可选参数提供默认值 |
| **枚举约束** | 有限选项用 enum 而非自由文本 | `"type": {"type": "string"}` | `"type": {"type": "string", "enum": ["js", "ts", "py"]}` |

### 2.3 手写 Agent 工具调度器

```python
import json
from typing import Any

class AgentToolDispatcher:
    """Agent 工具调度器：接收 LLM 的函数调用请求，执行工具，返回结果"""
    
    def __init__(self):
        self.tools = {}  # name -> handler function
    
    def register(self, name: str, handler: callable, schema: dict):
        """注册一个工具"""
        self.tools[name] = {
            "handler": handler,
            "schema": schema
        }
    
    def get_schemas(self) -> list:
        """获取所有工具的 Schema（用于发给 LLM）"""
        return [t["schema"] for t in self.tools.values()]
    
    def dispatch(self, function_name: str, arguments: dict) -> dict:
        """执行工具调用"""
        if function_name not in self.tools:
            return {"error": f"Unknown tool: {function_name}"}
        
        try:
            result = self.tools[function_name]["handler"](**arguments)
            return {"result": result, "status": "ok"}
        except Exception as e:
            return {"error": str(e), "status": "error"}
    
    def execute_llm_response(self, llm_response: dict) -> dict:
        """解析 LLM 响应中的工具调用并执行"""
        tool_calls = llm_response.get("tool_calls", [])
        results = []
        for call in tool_calls:
            result = self.dispatch(
                call["function"]["name"],
                json.loads(call["function"]["arguments"])
            )
            results.append(result)
        return results


# 使用示例
dispatcher = AgentToolDispatcher()

# 注册工具
dispatcher.register(
    "read_file",
    lambda path: open(path).read(),
    {
        "type": "function",
        "function": {
            "name": "read_file",
            "description": "读取文件内容",
            "parameters": {
                "type": "object",
                "properties": {
                    "path": {"type": "string", "description": "文件路径"}
                },
                "required": ["path"]
            }
        }
    }
)

dispatcher.register(
    "run_command",
    lambda cmd: __import__("subprocess").check_output(cmd, shell=True).decode(),
    {
        "type": "function",
        "function": {
            "name": "run_command",
            "description": "执行 shell 命令",
            "parameters": {
                "type": "object",
                "properties": {
                    "cmd": {"type": "string", "description": "要执行的命令"}
                },
                "required": ["cmd"]
            }
        }
    }
)
```

### 2.4 调用链优化与风控

| 优化点 | 策略 | 原因 |
|--------|------|------|
| **工具数量上限** | 单个 Agent 不超过 8-12 个工具 | 过多工具导致 LLM 选择困难 |
| **调用次数限制** | 单次任务最多 3-5 次工具调用 | 防止 Agent 进入无限循环 |
| **超时控制** | 每次工具调用 30 秒超时 | 防止外部服务卡死 Agent |
| **结果截断** | 工具返回结果截断到 2000 字符 | 防止上下文膨胀 |
| **权限分级** | 读操作自动允许 / 写操作需确认 / 破坏性操作禁止 | 安全三原则 |

---

## 第三章：Ollama 本地部署

> 📖 对应学习计划 Day 6-7。

### 3.1 Ollama 是什么？

Ollama 是一个让你在**本地电脑**上运行大语言模型的工具——免费、断网可用、零 Token 费用。

**适用场景**：
- 断网环境或网络不稳定
- 处理敏感代码（不能上传到云端 API）
- 简单任务降本（代码补全、格式转换、文档生成）
- 学习 LLM 原理（本地调试更方便）

> ⚠️ **务实建议**：不要盲目下载超大规模模型。代码场景 7B/14B 参数性价比最优。复杂推理任务仍用云端 API。

### 3.2 安装与模型下载

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

**模型选型建议**：

| 场景 | 推荐模型 | 大小 | 内存要求 |
|------|---------|------|---------|
| **代码补全/生成** | deepseek-coder:6.7b | ~4GB | 8GB+ |
| **代码审查/Debug** | qwen2.5-coder:7b | ~4GB | 8GB+ |
| **复杂逻辑推理** | deepseek-r1:8b | ~5GB | 16GB+ |
| **中文综合** | qwen2.5:14b | ~9GB | 16GB+ |
| **日常对话/文档** | glm4:9b | ~5.5GB | 12GB+ |

### 3.3 API 调用与本地编码集成

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

**对接 Claude Code（国内方案）**：

```json
// ~/.claude/settings.json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "ollama",
    "ANTHROPIC_BASE_URL": "http://localhost:11434/v1",
    "ANTHROPIC_MODEL": "qwen2.5-coder:7b"
  }
}
```

> ⚠️ 注意：Ollama API 不完全兼容 Anthropic API。推荐使用 CC Switch 或 Claude Code Router 做模型路由——简单任务走 Ollama 本地模型，复杂任务走云端 Claude。

### 3.4 本地模型 vs 云端 API 的分层策略

```
代码补全 / 格式转换 / 简单重构  → Ollama 本地（零成本、低延迟）
  ↓ 模型能力不足以处理
Bug 定位 / 中等复杂度功能开发  → DeepSeek V3 API（高性价比）
  ↓ 需要最强推理
复杂架构设计 / 多文件重构     → Claude Opus 4 API（最强能力）
```

**成本对比**：

| 场景 | Ollama 本地 | DeepSeek API | Claude API |
|------|-----------|-------------|------------|
| 代码补全（1000次/天） | ¥0 | ¥0.5 | ¥8 |
| 复杂重构（10次/天） | ❌ 能力不足 | ¥0.8 | ¥12 |
| 月总成本 | ¥0 | ~¥50 | ~¥600 |

### 3.5 调用链风控

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

## 附录 A：第 6 周每日学习清单

| 天数 | 学习内容 | 实战产出 |
|------|---------|---------|
| Day 1-2 | MCP 协议原理：Client-Server、消息格式、工具暴露 | 理解 MCP 的「AI 版 USB-C」定位 |
| Day 3 | MCP 实战：安装 Playwright/GitHub/Context7 | Claude Code 接入 3+ MCP，AI 操作浏览器 |
| Day 4-5 | Function Calling 深入：Schema 定义、调度器、风控 | 手写支持 Function Calling 的 Agent 工具调度器 |
| Day 6-7 | Ollama 安装、模型下载、API 调用、与 Claude Code 对接 | 本地 Ollama + DeepSeek 7B 替代云端 API |

## 附录 B：第 6 周复盘自检

- [ ] 能解释 MCP 的 Client-Server 架构和工具暴露机制？
- [ ] Claude Code 至少接入了 3 个 MCP，能否让 AI 成功操作浏览器？
- [ ] 能用手写的 Function Calling 调度器让 LLM 调用自定义工具？
- [ ] Ollama 本地运行成功，能用 API 完成代码生成？
- [ ] 是否建立了云端 API + 本地 Ollama 的分层调用策略？

## 附录 C：延伸阅读

| 主题 | 知识库资源 |
|------|-----------|
| MCP 实体页（协议详解） | [[Wiki/wiki/entities/mcp\|MCP 实体页]] |
| MCP 生态系统（Top 15 排行榜） | [[Wiki/wiki/topics/claude-code-mcp-ecosystem\|MCP 生态系统]] |
| Claude Code 安装与国内模型接入 | [[Wiki/wiki/topics/claude-code-installation\|Claude Code 安装配置]] |
| AI Agent 核心架构 | [[AI Agent/AI Agent 学习指南\|AI Agent 教程]] |

---

> 📖 完成第 6 周学习后，进入 [[AI Coding/AI Coding 学习计划\|第 7 周：Agent 框架实战（OpenClaw + Hermes + Agentic RAG + KV 缓存）]]——已有完整教程，直接使用即可。
