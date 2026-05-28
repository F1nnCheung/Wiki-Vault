---
title: DeepSeek 模型接入 Codex 完整教程
type: topic
tags: [codex, deepseek, cc-switch, mimo2codex, 国产模型, 接入配置]
created: 2026-05-28
updated: 2026-05-28
sources:
  - raw/articles/Codex/DeepSeek 模型接入 Codex（AI 编程助手）的超级详细保姆级安装部署教程.md
related:
  - entities/codex.md
  - entities/cc-switch.md
  - topics/codex-guide.md
  - topics/claude-code-installation.md
---

# DeepSeek 模型接入 Codex 完整教程

通过 **mimo2codex 本地中间件 + CC Switch 配置管理** 实现 DeepSeek 模型接入 Codex。方案核心优势：零修改 Codex 核心文件、API Key 只在本地使用不泄露到第三方、安全稳定。

---

## 方案概述

```
DeepSeek API → mimo2codex（本地转发）→ CC Switch（配置管理）→ Codex
```

- **mimo2codex**：本地中间件，负责请求转发和模型适配（将 DeepSeek API 转换为 OpenAI 兼容格式）
- **CC Switch**：跨平台 GUI 配置管理工具，管理 Codex 供应商配置
- **DeepSeek API**：提供模型能力（deepseek-v4-pro、deepseek-v4-flash 等）

---

## 前置准备（Mac & Windows 通用）

### 1. 安装 Node.js

推荐 LTS 版本（v18+）。

**Mac：**
```bash
brew install node
```

**Windows：** 从 [Node.js 官网](https://nodejs.org) 下载安装包。

验证：
```bash
node -v
npm -v
```

### 2. 获取 DeepSeek API Key

1. 访问 [DeepSeek 平台](https://platform.deepseek.com)
2. 注册/登录 → API Keys 页面 → 创建新 Key 并复制保存

> ⚠️ API Key 只在本地使用，不要分享给他人或上传到公开仓库。

### 3. 安装 CC Switch

**Mac：**
```bash
brew tap farion1231/ccswitch
brew install --cask cc-switch
```

**Windows：** 从 GitHub Releases 下载 `.msi` 安装包。

首次启动如遇 Gatekeeper 提示，前往「系统设置 → 隐私与安全性」允许。

### 4. 安装 Codex

按 [[Codex 完整教程|Codex 官方文档]] 安装 CLI 或桌面版，确保能正常启动。

---

## 接入步骤

### 步骤 1：全局安装 mimo2codex

```bash
# Mac
npm install -g mimo2codex

# 如遇权限问题
sudo npm install -g mimo2codex

# Windows（管理员 PowerShell）
npm install -g mimo2codex
```

验证：
```bash
mimo2codex --help
```

### 步骤 2：启动本地转发服务（核心步骤）

**Mac：**
```bash
export DEEPSEEK_API_KEY="sk-你的真实DeepSeek_API_Key"
mimo2codex --model ds --port 8789
```

**Windows：**
```powershell
$env:DEEPSEEK_API_KEY="sk-你的真实DeepSeek_API_Key"
mimo2codex --model ds --port 8789
```

| 参数 | 说明 |
|------|------|
| `--model ds` | 使用 DeepSeek 模型 |
| `--port 8789` | 本地服务端口（可改其他空闲端口） |
| `DEEPSEEK_API_KEY` | 你的 DeepSeek API Key |

> ⚠️ **保持此终端窗口一直打开**，服务持续运行在 `http://127.0.0.1:8789`。

### 步骤 3：获取 CC Switch 配置信息

**新开另一个终端窗口**（不要关闭服务窗口）：

```bash
mimo2codex --model ds --port 8789 print-cc-switch
```

输出包含 `auth.json` 和 `config.toml` 两段配置，**完整复制备用**。

### 步骤 4：在 CC Switch 中添加 DeepSeek 供应商

1. 打开 CC Switch 应用
2. 切换到 **Codex** 标签页
3. 点击 **添加新供应商** → 选择 **自定义 / OpenAI 兼容**
4. 填写配置：

| 配置项 | 值 |
|--------|-----|
| **供应商名称** | `DeepSeek` 或 `DEEPSEEK` |
| **API Key** | `mimo2codex-local`（或工具输出对应值） |
| **Base URL** | `http://127.0.0.1:8789/v1` |
| **模型名称** | `deepseek-v4-pro`、`deepseek-v4-flash` 等 |

5. 在 config.toml 编辑区粘贴步骤 3 的内容，修改 `name` 为 `DEEPSEEK`，保存并启用
6. CC Switch 自动写入 Codex 配置文件

### 步骤 5：验证与使用

1. **重启 Codex**
2. 在模型选择栏选择 **DEEPSEEK**
3. 发送测试指令（如 `你好`）
4. 看到 DeepSeek 正常回复即接入成功

---

## 常见问题排查

### 端口占用（Mac）

```bash
# 检查端口占用
lsof -i :8789
# 终止占用进程
kill -9 <PID>
```

### npm 权限问题

推荐使用 `nvm` 管理 Node.js 避免 sudo：
```bash
brew install nvm
nvm install node
```

### 连接失败

1. 确认 mimo2codex 服务仍在运行（终端窗口未关闭）
2. 检查防火墙是否阻止了本地 8789 端口
3. 确认 CC Switch 中 Base URL 为 `http://127.0.0.1:8789/v1`（注意 `/v1` 后缀）
4. 确认已重启 Codex

### DeepSeek API Key 无效

1. 登录 DeepSeek 平台确认 Key 状态
2. 检查 Key 余额是否充足
3. 确认 Key 未被其他地方泄露导致禁用

---

## 方案优势

| 维度 | mimo2codex + CC Switch | 直接修改配置文件 |
|------|------------------------|-------------------|
| **安全性** | API Key 仅在本机环境变量中 | 可能明文写入配置文件 |
| **稳定性** | 零修改 Codex 核心文件，升级不受影响 | 升级可能覆盖修改 |
| **可维护性** | CC Switch GUI 可视化管理 | 手动编辑 JSON/TOML |
| **跨平台** | Mac + Windows 统一方案 | 各系统路径不同，容易出错 |
