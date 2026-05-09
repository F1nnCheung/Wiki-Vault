---
title: Claude Code 安装与配置
type: topic
tags: [claude-code, installation, configuration, setup]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/claude/Claude Code 教程丨安装、使用与配置指南.md
  - raw/articles/claude/这可能是Claude Code最简单的安装和使用方式了（一键安装、支持国产模型、免登录）.md
  - raw/articles/claude/Claude Code 保姆级完整教程（包含10个章节，包括接入国内大模型）.md
  - raw/articles/claude/Claudecode保姆级教程(搭配Skill+mcp).md
  - raw/articles/claude/Claude 官方客户端 + DeepSeek-V4：免登录，无需订阅！（保姆级教程）.md
related:
  - entities/claude-code.md
  - entities/cc-switch.md
  - entities/claude-code-router.md
  - topics/claude-code-introduction.md
  - topics/claude-code-getting-started.md
---

# Claude Code 安装与配置

## 两条安装路线

### 路线一：CLI 安装（推荐开发者）

**前置要求**：Node.js 18+、Git

```bash
# 官方脚本安装（推荐）
curl -fsSL https://claude.ai/install.sh | bash

# 或 npm 全局安装
npm install -g @anthropic-ai/claude-code

# 验证安装
claude --version
```

**启动**：
```bash
cd your-project
claude
```

### 路线二：桌面客户端（适合非技术用户）

1. 从 claude.ai/download 下载 Claude Desktop Client
2. 启用开发者模式：Help → Troubleshooting → Enable Developer Mode
3. 切换到 **Code 模式**（`</>`图标）获得完整 Claude Code 能力

桌面客户端提供三种模式：Chat（对话）、Cowork（桌面 Agent）、Code（GUI 版 Claude Code）。

## 国内用户配置第三方模型

由于 Claude 账号容易封禁，国内社区形成两条替代路线：

### 方法一：settings.json 配置

```json
{
  "hasCompletedOnboarding": true,
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "你的API Key",
    "ANTHROPIC_BASE_URL": "https://api.deepseek.com/anthropic",
    "ANTHROPIC_MODEL": "deepseek-chat"
  }
}
```

配置文件位置：`~/.claude/settings.json`（macOS/Linux）或 `C:\Users\用户名\.claude\settings.json`（Windows）

### 方法二：桌面客户端 3P 模式

1. 启用 Developer Mode
2. Developer → Configure Third-Party Inference
3. 配置 Gateway：填入 API 地址和密钥
4. 不需要 Anthropic 账号、不需手机验证、不需订阅

### 推荐的国产模型供应商

| 供应商 | 优势 | 推荐模型 |
|---|---|---|
| 火山引擎 | Coding Plan 性价比高 | minimax-latest, kimi-k2.6, glm-5.1, deepseek-v3.2 |
| 阿里云百炼 | 有免费额度 | glm-5, qwen系列 |
| DeepSeek | 兼容性最好 | deepseek-chat, deepseek-reasoner |
| 智谱 GLM | 有 Claude Code 专门文档 | glm-5.1 |

## 配置的三个层次

| 层 | 文件 | 用途 |
|---|---|---|
| 工具层 | `settings.json` | 权限、模型、MCP 配置 |
| 规则层 | `CLAUDE.md` | 项目规范、编码约定（<200行） |
| 学习层 | auto memory | AI 自动记录的偏好和经验 |

## 进阶配置工具

- **[CC Switch](cc-switch.md)**：GUI 管理多工具 Provider/MCP/Skills 配置，支持热切换
- **[Claude Code Router](claude-code-router.md)**：按任务类型智能路由到不同模型，降低成本 70%+

## 安装后第一步

```bash
# 在项目根目录生成 CLAUDE.md
/init

# 编辑 CLAUDE.md，补充你的技术栈和编码规范
/memory
```

🎯 推荐顺序：先跑通最小闭环 → 加入 CLAUDE.md 规则 → 配置第三方模型 → 逐步添加增强工具。
