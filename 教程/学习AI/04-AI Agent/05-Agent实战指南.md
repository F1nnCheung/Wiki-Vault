---
title: 第五章：Agent 实战指南
type: tutorial
tags: [ai-agent, hands-on, setup, security, tutorial]
created: 2026-05-29
updated: 2026-05-29
sources:
  - Wiki/wiki/topics/hermes-agent-guide.md
  - Wiki/wiki/topics/openclaw-guide.md
  - Wiki/wiki/topics/hermes-configuration.md
  - Wiki/wiki/topics/hermes-workspace-setup.md
  - Wiki/wiki/topics/hermes-obsidian-integration.md
  - Wiki/wiki/topics/hermes-home-assistant-integration.md
related:
  - 03-主流Agent工具.md
  - 04-多Agent协作与编排.md
  - 00-AI Agent 学习指南.md
---

# 第五章：Agent 实战指南

> 从安装第一个 Agent，到配置规则、安全管理、知识库集成——把前面的理论变成实操能力。

---

## 5.1 从零搭建第一个 Agent

### 推荐入门路径

```
第一步：OpenClaw（最快上手，建立体感）
  → 5 分钟装好，10 分钟派第一个任务
  → 体验「Agent 能做什么」

第二步：Hermes Agent（体验自进化）
  → 安装 + 配置 SOUL.md
  → 用 3 天，观察它是否真的「越用越聪明」

第三步：Claude Code / Codex（编程场景）
  → 根据你的技术栈和偏好选择
```

### OpenClaw 快速上手

```bash
# 1. 一键安装
curl -fsSL https://openclaw.ai/install.sh | bash

# 2. 配置向导（选择模型提供商）
openclaw onboard
# 推荐：DeepSeek（国内性价比高）或 Anthropic（能力最强）

# 3. 配置消息平台（比如 Telegram）
openclaw config set channels.telegram.botToken "你的Bot Token"

# 4. 启动
openclaw gateway start

# 5. 在 Telegram 里给你的 Bot 发消息
# 「帮我把桌面整理一下」——体验 Agent 做事的能力
```

### Hermes Agent 快速上手

```bash
# 1. 一键安装
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
source ~/.bashrc

# 2. 初始化配置
hermes setup
# 推荐模型提供商：OpenRouter（聚合 200+ 模型，国内首选）

# 3. 启动交互
hermes
# 直接在终端里和 Agent 对话

# 4. 尝试第一个任务
# 「帮我查一下今天的热点新闻，整理成一份简报保存到桌面」
```

---

## 5.2 装完后第一件事：写规则文件

> ⚠️ 很多人装完就去装 Skill，但真正该做的第一件事是写规则文件。规则文件决定了 Agent 的「性格」和「边界」。

### SOUL.md（Hermes）- 全局身份定义

位置：`~/.hermes/SOUL.md`

```markdown
# 我的 SOUL.md

## 基本设定
- 你是我的技术助手「小爱」，不是客服——回答直接、简洁、给方案
- 你精通 Python、TypeScript、Shell 脚本
- 你的工作环境是 macOS

## 行为准则
- 不确定的事先查再回，不要猜
- 每次操作前告诉我你打算怎么做（一句话即可）
- 涉及 rm、sudo、git push --force 的操作必须等我确认
- 操作失败时，分析原因后再尝试，最多重试 3 次

## 沟通风格
- 默认用中文回复
- 技术术语保留英文
- 代码块标注语言
- 复杂任务完成后来一句总结
```

### AGENTS.md（Hermes / Codex）- 项目规则

位置：项目根目录

```markdown
# 项目规则

## 技术栈
- Next.js 14 + TypeScript + Prisma + PostgreSQL
- Tailwind CSS + shadcn/ui
- 启动：npm run dev
- 测试：npm test

## 目录约定
- src/components/ — UI 组件
- src/app/ — Next.js App Router 页面
- src/lib/ — 工具函数和业务逻辑
- prisma/ — 数据库 schema（不要手动改）

## 不要做的事
- 不要修改 .env 文件
- 不要修改 prisma/migrations/
- 不要升级依赖版本（除非明确要求）
- 不要引入新的依赖包（除非明确要求）

## 代码风格
- 组件用函数式组件 + TypeScript
- 异步操作用 async/await
- 错误处理用 try/catch + 日志
```

### CLAUDE.md（Claude Code）- 项目上下文

Claude Code 的 CLAUDE.md 有层级结构（全局→项目→子目录），12 条核心规则让编程失误率从 41% 降到 3%。

> 📚 深入学习：[[Wiki/wiki/topics/claude-md-12-rules|CLAUDE.md 12 条规则深度解析]]

---

## 5.3 Agent 安全与权限管理

### 核心原则

| 原则 | 含义 | 实践 |
|------|------|------|
| **最小权限** | 只给 Agent 真正需要的权限 | 不需要写权限的只给 read |
| **分级审批** | 不同风险级别不同审批策略 | 读文件 allow / 写文件 ask / 删文件 deny |
| **沙箱隔离** | 高风险操作在容器中执行 | Docker 部署、文件系统限制 |
| **操作日志** | 记录所有行为，可审计可回溯 | 开启 command-logger Skill |

### Hermes 安全配置

```bash
# 智能审批：低风险自动放行，高风险需确认
hermes config set approval.mode smart

# 高风险操作列表
hermes config set approval.high_risk_commands "rm -rf,sudo,chmod 777,git push --force"
```

### OpenClaw 安全配置

```bash
# 仅允许特定目录的文件操作
openclaw config set security.allowed_paths "/home/user/projects,/tmp"

# 启用安全扫描 Skill
clawhub install skill-vetter
```

### 安全红线（任何 Agent 都必须遵守）

1. **绝对禁止**给 Agent 开放 `rm -rf /` 或 `sudo` 无限制权限
2. **绝对禁止**让 Agent 直接操作生产数据库
3. **绝对禁止**把 API Key 硬编码在规则文件里
4. **绝对禁止**让 Agent 操作 `.ssh/` 或 `.gnupg/` 等敏感目录
5. **务必**定期检查 Agent 的操作日志

---

## 5.4 Hermes Workspace：Web 可视化控制

Hermes Workspace 是一个六面板 Web UI，提供可视化的 Agent 管理：

```bash
# 安装 Workspace
git clone https://github.com/outsourc-e/hermes-workspace.git
cd hermes-workspace && pnpm install

# 终端 1：启动 Hermes 网关
hermes gateway run

# 终端 2：启动 Workspace
pnpm dev
# 打开 http://localhost:3000
```

### 六面板功能

| 面板 | 功能 |
|------|------|
| **Chat** | 多模型聊天，同对话内切换模型 |
| **Memory** | 浏览、搜索、编辑三层记忆 |
| **Skills** | 100+ 技能在线管理 |
| **Terminal** | 内置终端，直接操作 |
| **Tools** | 实时查看 Agent 调用了哪些工具 |
| **Conductor** | 任务编排 + Kanban 多 Agent 协作 |

> 📚 深入学习：[[Wiki/wiki/topics/hermes-workspace-setup|Workspace 设置指南]]

---

## 5.5 Agent + Obsidian 知识库集成

这是将 Agent 能力延伸到知识管理的高级玩法。

### 架构：Obsidian 做底座，Agent 做执行层

```
网页内容 → Web Clipper → Obsidian raw/
    ↓
AI Agent 处理 → 提取结构化知识
    ↓
生成 wiki 页面 → 更新索引
    ↓
Agent 可检索 → 回答问题
```

### 内容生产线

```
Source（原始素材）→ Topic（专题提炼）→ Draft（初稿）→ Published（终稿）
```

1. **Source**：Web Clipper 将网页内容保存到 Obsidian
2. **Topic**：Agent 自动分析原始素材，提取关键主题
3. **Draft**：Agent 生成结构化知识页面
4. **Published**：人工审核后发布为正式 wiki 页面

### 实操配置

```bash
# 1. 在 Hermes 中配置 Obsidian 知识库路径
hermes config set obsidian.vault_path "/Users/xxx/Obsidian Vault"

# 2. 创建处理 Skill
# Agent 会自动学习「读取 raw/ → 提取 → 写入 wiki/ → 更新 index」流程

# 3. 日常使用
# 「帮我把今天存的 3 篇文章整理进知识库」
```

> 📚 深入学习：[[Wiki/wiki/topics/hermes-obsidian-integration|Hermes + Obsidian 集成]]

---

## 5.6 进阶实战场景

### 场景一：Agent + RAG 个人知识检索

用 Hermes 搭建本地 RAG 系统，自然语言检索所有笔记：

```
Markdown 笔记 → Ollama Embedding → ChromaDB 向量库 → Hermes 检索
```

> 📚 教程：[[Wiki/wiki/topics/hermes-rag-setup|Hermes RAG 检索设置]]

### 场景二：Agent + 智能家居

用 Hermes 控制 Home Assistant，自然语言操控全屋设备：

```
「把客厅灯光调暗，打开空调 26 度，5 分钟后关窗帘」
```

> 📚 教程：[[Wiki/wiki/topics/hermes-home-assistant-integration|Hermes + Home Assistant]]

### 场景三：Agent + 学术写作

用 Gemini 3.5 + 6 个 Skill 完成从框架到结论的完整论文初稿：

```
定框架 → 引言 → 文献综述 → 方法 → 结果分析 → 结论
```

> 📚 教程：[[Wiki/wiki/topics/gemini-academic-writing|Gemini 学术写作工作流]]

### 场景四：Agent + 创业

AI Agent 作为 OPC（一人公司）的核心生产力：

- 用 Agent 做市场调研和竞品分析
- 用 Agent 写代码、做测试、部署
- 用 Agent 处理客服和日常运营
- AI 效率杠杆让一个人做到以前十个人的事

> 📚 教程：[[../OPC/00-OPC 一人公司学习指南|00-OPC 一人公司学习指南]]

---

## 5.7 常见问题与排错

### Agent 不听指令？

1. 检查规则文件是否正确加载：`hermes config show`
2. 规则太模糊 → 写得更具体，给示例
3. 规则太多 → 精简，Agent 一次只能遵循有限规则

### Agent 消耗 Token 太多？

1. 限制工具调用轮次：`hermes config set loop.max_iterations 20`
2. 开启上下文压缩：`/compact`（Claude Code）
3. 使用更便宜的模型做简单任务

### Agent 创建的 Skill 质量差？

1. 手动编辑 Skill 文件改进
2. 在下次使用时纠正 Agent → 它会更新 Skill
3. 写更具体的 SOUL.md 引导技能创建标准

### 国内网络问题？

1. Claude Code → 用 CC Switch 接入国产模型
2. Hermes → 用 OpenRouter 或直接配置国产模型 API
3. OpenClaw → 配置阿里云百炼或 DeepSeek

---

## 自测清单

- [ ] 成功安装并运行至少一个 Agent 工具
- [ ] 为自己常用的 Agent 写了 SOUL.md / AGENTS.md
- [ ] 配置了基本的安全策略（权限分级）
- [ ] 用 Agent 完成了至少 3 个不同类型的任务
- [ ] 了解至少一个进阶场景的实操方法
- [ ] 遇到问题知道去哪里找答案

---

## 继续学习

完成本章后，你已经具备了独立使用 Agent 的能力。推荐接下来的学习方向：

1. **深入 Agent 架构**：[[Wiki/wiki/topics/hermes-architecture-deep-dive|Hermes 五层架构深度拆解]]
2. **搭建多 Agent 系统**：[[Wiki/wiki/topics/hermes-multi-agent|多 Agent 团队搭建]]
3. **Agent + 知识库**：[[Wiki/wiki/topics/hermes-obsidian-integration|Obsidian 知识库集成]]
4. **Agent 编程**：[[../05-AI Coding/00-AI Coding学习指南|AI Coding 学习指南]]

---

> 🎉 **恭喜完成 00-AI Agent 学习指南！** 返回 [[00-AI Agent 学习指南|总目录]] 查看全局。
