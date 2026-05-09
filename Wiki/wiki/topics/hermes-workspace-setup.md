---
title: Hermes Workspace 设置指南
type: topic
tags: [hermes-agent, workspace, web-ui, dashboard, kanban]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/Hemmers/手把手：给 Hermes Agent 装一个六面板控制中心.md
related:
  - entities/hermes-agent.md
  - topics/hermes-agent-guide.md
  - topics/hermes-multi-agent.md
---

# Hermes Workspace 设置指南

Hermes Workspace 是一个独立的 Web UI 项目（GitHub 2.8K Stars，MIT 协议），为 Hermes Agent 提供六面板控制中心。比内置 `hermes dashboard` 更强大，支持实时监控代理状态、管理记忆和技能、可视化多代理协作。

## 一、完成后的样子

两个进程协同工作：
- **Agent Gateway** 跑在 `8642` 端口 — 处理后端：模型调用、记忆读写、技能执行
- **Workspace** 跑在 `3000` 端口 — 提供 Web UI 界面

六个面板一目了然：聊天、记忆、技能、终端、工具卡片、Conductor 编排。

## 二、前提条件

| 组件 | 要求 | 验证命令 |
|------|------|---------|
| Node.js | ≥ 22 | `node -v` |
| Python | ≥ 3.11 | `python3 --version` |
| pnpm | 最新版 | `npm install -g pnpm` |
| Hermes Agent | 已安装 | `hermes --version` |

> Node.js 版本不够用 `nvm install 22 && nvm use 22` 升级。

## 三、安装步骤

### 第一步：克隆仓库

```bash
git clone https://github.com/outsourc-e/hermes-workspace.git
cd hermes-workspace
```

### 第二步：安装依赖

```bash
pnpm install
```

等它跑完，没有红色报错就是成功。验证：`ls node_modules` 能看到一堆文件夹。

### 第三步：创建环境变量文件

```bash
cp .env.example .env
```

### 第四步：编辑 .env

核心是两个地址：

```bash
HERMES_API_URL=http://localhost:8642
HERMES_DASHBOARD_URL=http://localhost:3000
```

- Agent Gateway 默认跑在 8642
- Workspace 默认跑在 3000
- 远程服务器把 `localhost` 换成服务器 IP

> ⚠️ **常见坑**：V2 架构下 Gateway 端口是 8642 不是 3000，搞反了会连不上。

### 第五步：启动 Agent Gateway

```bash
# 终端 1
hermes gateway run
```

这是后端。处理模型调用、记忆读写、技能执行。如果 Gateway 没启动，界面会显示「Disconnected」。

### 第六步：启动 Workspace

```bash
# 终端 2
cd ~/hermes-workspace && pnpm dev
```

或用一条命令同时启动：

```bash
pnpm start:all
```

浏览器打开 `http://localhost:3000`。看到界面显示「Connected」说明成功。

### 首次运行

第一次用需要跑 `hermes setup` 选模型提供商。支持 Anthropic、OpenAI、OpenRouter、Ollama、vLLM、LM Studio。不选的话聊天面板会报错。

## 四、六大面板功能

| 面板 | 功能 |
|------|------|
| **Chat** | 多模型聊天，流式回复。同一对话中切换模型（Claude/GPT/Gemini/本地模型）不丢上下文 |
| **Memory** | 三层记忆系统一览无余。可搜索、浏览、编辑 |
| **Skills** | 100+ 技能在线管理，一键启用/禁用 |
| **Terminal** | 内置终端，直接执行命令 |
| **Tools** | 实时看代理在调什么工具，可批准、可中止 |
| **Conductor** | 任务编排器，并行生成子代理，实时看工作网格 |

## 五、进阶：Kanban 多代理协作

跑通基础功能后，可以试多代理 Kanban：

```bash
hermes kanban create --title "调研三个竞品" --assignee researcher
```

任务状态流转：`triage → todo → ready → running → blocked → done`。

每个工作代理有自己的工具、技能和 Profile。它们从板上认领任务，通过链接依赖展开工作。整个系统 SQLite 支撑，崩溃重启后任务不丢。

第一次建议给一个小任务试水，看 Dispatcher 怎么分配、工作代理怎么汇报。

## 六、进阶：Inspector 调试代理

点击「Inspector」面板，能看到：
- 代理的推理链（为什么做了某个决定）
- 性能指标
- 错误追踪

调试速度比翻日志快一个数量级。

## 七、进阶：手机端与桌面端

- **PWA**：桌面、平板、手机功能完全一致。Tailscale 暴露到内网后，手机浏览器直接访问 `http://你的IP:3000`，可添加到主屏幕，支持离线和推送通知
- **macOS 桌面版**：GitHub Releases 下载 dmg 安装包（约 529 MB），拖进 Applications。仍需 Agent Gateway 后台运行

## 八、容易踩的坑

| 问题 | 解决 |
|------|------|
| Node.js 版本不够（系统自带 18/20） | `nvm install 22` |
| 没用 pnpm（用 npm install 报错） | `npm install -g pnpm` |
| .env 端口写反（Gateway 8642，Workspace 3000） | 检查 `HERMES_API_URL` |
| Gateway 没启动 | Workspace 只是前端，后面必须有 `hermes gateway run` |
| 首次运行没 setup | 跑 `hermes setup` 选模型提供商 |

## 九、资源开销

Workspace 本身只占约 200MB 内存，非常轻量。8 套主题可切换（每套亮色/暗色）。
