---
title: Claude Code Router (CCR)
type: entity
tags: [ccr, routing, model-management, cost-optimization]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/Claude Code/Claude Code 保姆级完整教程（包含10个章节，包括接入国内大模型）.md
  - raw/articles/Claude Code/Claude Code 如何用 CC Switch 优雅地接入 DeepSeek、Kimi、GLM、MiniMax 等模型：一篇不想让你翻车的喂饭教程.md
related:
  - entities/cc-switch.md
  - entities/claude-code.md
  - topics/claude-code-installation.md
---

# Claude Code Router (CCR)

CCR 是一个智能模型路由层，作为 Claude Code 和第三方语言模型之间的中间代理，按任务类型自动将请求分发到最合适的模型。核心价值是**成本优化**——合理搭配可降低 70% 以上 API 成本。

GitHub: github.com/musistudio/claude-code-router

## 路由策略

| 策略 | 用途 | 典型模型 |
|---|---|---|
| `default` | 普通任务（成本敏感） | 便宜的国产模型 |
| `background` | 后台任务（文件索引等） | 本地模型（零成本） |
| `think` | 复杂推理（架构设计、算法） | 强推理模型 |
| `longContext` | 超长上下文 | 支持长窗口的模型 |
| `webSearch` | 联网搜索 | 支持搜索的模型 |

## 架构

```
Claude Code CLI
      ↓
  CCR 路由层（智能分发）
  ├── 路由策略引擎
  ├── 请求转换器
  └── 日志统计
      ↓
 ┌────┼────┬────────┐
DeepSeek  本地LLM  Gemini
(默认)   (后台)  (长上下文)
```

## 配置示例

```json
{
  "Providers": [
    { "name": "deepseek", "api_base_url": "https://api.deepseek.com/...",
      "models": ["deepseek-chat", "deepseek-reasoner"] },
    { "name": "ollama", "api_base_url": "http://localhost:11434/...",
      "models": ["qwen2.5-coder:latest"] }
  ],
  "Router": {
    "default": "deepseek,deepseek-chat",
    "think": "deepseek,deepseek-reasoner",
    "background": "ollama,qwen2.5-coder:latest"
  }
}
```

## 与 CC Switch 的区别

CCR 关注**运行时智能路由**（按任务类型自动分发），CC Switch 关注**配置管理**（GUI 手动切换）。两者互补不冲突。
