---
title: Claude Code 安装与配置
type: topic
tags: [claude-code, installation, configuration, setup]
created: 2026-05-09
updated: 2026-06-03
sources:
  - raw/articles/Claude Code/Claude Code 教程丨安装、使用与配置指南.md
  - raw/articles/Claude Code/这可能是Claude Code最简单的安装和使用方式了（一键安装、支持国产模型、免登录）.md
  - raw/articles/Claude Code/Claude Code 保姆级完整教程（包含10个章节，包括接入国内大模型）.md
  - raw/articles/Claude Code/Claudecode保姆级教程(搭配Skill+mcp).md
  - raw/articles/Claude Code/Claude 官方客户端 + DeepSeek-V4：免登录，无需订阅！（保姆级教程）.md
  - raw/articles/Claude Code/我用国产模型把 Claude Code 跑通后,写下了这份小白避坑手册_服务软件_什么值得买.md
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

## 小白入门避坑速通

完全没碰过命令行、没装过 Node、看到终端黑窗口就头皮发麻的新手，按此顺序走：

### 环境安装顺序

1. **Git**（版本管理工具）→ 2. **Node.js**（Claude Code 运行环境，需 18+）→ 3. **VS Code**（可选，但推荐）→ 4. **Claude Code**

> 遇到任何报错，直接截图丢给 Claude Code 或豆包，描述清楚「我在哪一步、看到了什么报错」，比自己百度快十倍。

### 关键概念速通

| 概念 | 一句话 |
|------|--------|
| **模型（Model）** | AI 的大脑，只会思考没有手脚（GPT/Claude/DeepSeek/豆包/Kimi/GLM） |
| **Chatbot** | 模型 + 对话框 = 能说不能做（ChatGPT 网页、豆包 App） |
| **Agent** | 模型 + 执行环境 + 工具箱 = 能说能做（Claude Code 就是 Agent） |
| **Token** | AI 理解文字的最小单位，~1 中文 ≈ 2 Token，像用电的「电费」 |
| **上下文** | 对话里所有内容的总和，AI 没有长期记忆，桌面放多少资料就能参考多少 |
| **Skill** | 给 AI 看的 SOP 手册——先做什么、再做什么、用什么工具、做成什么样算合格 |
| **MCP** | AI 的 USB 接口标准——让 Agent 能对接外部工具（飞书/数据库/浏览器/小红书） |
| **Harness** | 上下文工程——组织信息、管理上下文、引导 AI、验证结果的一整套方法 |

### 三种付费方式

| 方式 | 适用 | 成本 |
|------|------|------|
| Claude 订阅（$20/月） | 海外用户、追求原生体验 | $20/月固定 |
| API 按量付费 | 轻量使用 | 按 Token 计费 |
| **国产模型 API + cc-switch** | **国内最现实的方案** | 按 Token 计费（火山引擎/阿里云百炼/DeepSeek） |

### 新手最常见踩坑点

1. **别在一个窗口东聊西聊**：AI 会乱（上下文污染）。一个窗口聊一件事，切话题就开新窗口
2. **Token 学习阶段不要省**：就像用电，该花的得花
3. **不要跳过 /init**：安装后第一件事就是初始化项目规则
4. **国产模型接入**：最稳定路径 = DeepSeek 官方 API + cc-switch，不要直接改核心文件
5. 完整小白教程详见 [[../raw/articles/Claude Code/我用国产模型把 Claude Code 跑通后,写下了这份小白避坑手册_服务软件_什么值得买|小白避坑手册原文]]
