---
title: Function Calling
type: tutorial
tags: [Function Calling, JSON Schema, 工具调度, 风控]
created: 2026-06-02
updated: 2026-06-02
sources:
  - Wiki/wiki/entities/mcp.md
  - Wiki/wiki/concepts/ai-agent.md
related:
  - 00-MCP学习指南.md
  - 01-MCP协议.md
  - 01-Ollama本地部署.md
---

# 第二章：Function Calling

> 📖 对应学习计划 Day 4-5。Function Calling 是 Agent 调用工具的底层基础。

---

## 2.1 LLM 原生 Function Calling 机制

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

---

## 2.2 工具 Schema 定义

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
                    "fileTypes": {"type": "array", "items": {"type": "string"}, "description": "限定文件类型"}
                },
                "required": ["pattern"]
            }
        }
    }
]
```

### 设计工具 Schema 的最佳实践

| 原则 | 说明 | 错误示例 | 正确示例 |
|------|------|---------|---------|
| **清晰的功能描述** | description 要让 LLM 准确判断何时调用 | `"处理文件"` | `"读取指定路径的文件内容，支持文本和代码文件"` |
| **精确的参数说明** | 每个参数注明类型、格式、约束 | `"time": "时间"` | `"time": "ISO 8601 格式的时间字符串"` |
| **合理的必填标记** | 只标记真正必须的参数为 required | 把所有参数标为 required | 只标核心参数，可选参数提供默认值 |
| **枚举约束** | 有限选项用 enum 而非自由文本 | `"type": {"type": "string"}` | `"type": {"type": "string", "enum": ["js", "ts", "py"]}` |

---

## 2.3 手写 Agent 工具调度器

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
```

---

## 2.4 调用链优化与风控

| 优化点 | 策略 | 原因 |
|--------|------|------|
| **工具数量上限** | 单个 Agent 不超过 8-12 个工具 | 过多工具导致 LLM 选择困难 |
| **调用次数限制** | 单次任务最多 3-5 次工具调用 | 防止 Agent 进入无限循环 |
| **超时控制** | 每次工具调用 30 秒超时 | 防止外部服务卡死 Agent |
| **结果截断** | 工具返回结果截断到 2000 字符 | 防止上下文膨胀 |
| **权限分级** | 读操作自动允许 / 写操作需确认 / 破坏性操作禁止 | 安全三原则 |

---

## 2.5 本章实战练习

- [ ] 用 AgentToolDispatcher 注册至少 3 个工具
- [ ] 为每个工具编写清晰的 Schema（description + parameters + enum 约束）
- [ ] 配置风控参数（工具上限、调用次数、超时）
- [ ] 用一个真实的 LLM 调用测试调度器是否工作

---

> 📖 继续学习 [[01-Ollama本地部署|第三章：Ollama 本地部署]]——本地运行大模型，零成本替代云端 API。
