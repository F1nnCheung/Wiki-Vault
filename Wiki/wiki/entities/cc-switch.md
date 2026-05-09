---
title: CC Switch
type: entity
tags: [cc-switch, tool, model-management, gui]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/claude/Claude Code 如何用 CC Switch 优雅地接入 DeepSeek、Kimi、GLM、MiniMax 等模型：一篇不想让你翻车的喂饭教程.md
  - raw/articles/claude/Claude Code 保姆级完整教程（包含10个章节，包括接入国内大模型）.md
related:
  - entities/claude-code-router.md
  - entities/claude-code.md
  - topics/claude-code-installation.md
---

# CC Switch

CC Switch 是跨平台桌面应用（52.8k GitHub Stars），通过 GUI 方式管理 Claude Code、Codex、OpenCode、Gemini CLI 的 Provider 配置、MCP 服务器和 Skills。适合不喜欢手动编辑 JSON 配置文件的用户。

GitHub: github.com/farion1231/cc-switch

## 核心功能

- **一键切换**：在多工具间热切换 Provider 配置，无需关闭终端
- **供应商预设**：内置多家 API 供应商预设，自动填充接口地址和配置格式
- **速度测试**：测量各 API 端点延迟，可视化对比
- **MCP 管理**：统一管理所有 MCP 服务器，支持导入导出
- **Skills 管理**：扫描 GitHub 仓库，一键安装 Skills
- **Prompts 管理**：多预设系统提示，带 Markdown 编辑器
- **用量查询**：实时显示 Token 消耗和余额，避免超额
- **自动故障转移**：供应商故障时自动切换到备用供应商

## 安装

```bash
# macOS - Homebrew
brew tap farion1231/ccswitch
brew install --cask cc-switch

# ArchLinux
paru -S cc-switch-bin

# Windows/Linux - GitHub Releases 下载安装包
```

## 与 CCR 的关系

| 特性 | CC Switch | CCR |
|---|---|---|
| 界面类型 | 桌面 GUI（Tauri） | 命令行 + Web UI |
| 智能路由 | ✗ 仅手动切换 | ✓ 按任务类型自动路由 |
| MCP/Skills 管理 | ✓ 跨应用统一管理 | ✗ |
| 适用场景 | 本地开发、频繁切换 | CI/CD、自动化、服务器 |

💡 最佳组合：用 CC Switch 管理基础 Provider 配置，再用 CCR 处理复杂路由逻辑。
