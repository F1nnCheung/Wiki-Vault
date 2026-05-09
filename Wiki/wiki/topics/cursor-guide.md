---
title: Cursor 完整教程
type: topic
tags: [cursor, tutorial, installation, ide]
created: 2026-05-09
updated: 2026-05-09
sources: []
related:
  - entities/cursor.md
  - topics/ai-coding-tools-comparison.md
  - topics/trae-guide.md
---

# Cursor 完整教程

## 一、介绍

Cursor 是 Anysphere 开发的 AI 原生 IDE（基于 VS Code），2026 年估值 290 亿美元。被 19% 的开发者选为最爱，仅次于 Claude Code。

**官网**：cursor.com

---

## 二、安装

### 系统要求

| 系统 | 要求 |
|---|---|
| Windows | Windows 10/11，64 位 |
| macOS | 12.0+（Intel / Apple Silicon） |
| Linux | AppImage / deb / rpm |

### 步骤

1. 访问 **cursor.com** 下载安装包
2. 安装后首次启动可选择从 VS Code 导入配置
3. 注册/登录 Cursor 账号
4. 选择订阅计划（Free / Pro $20 / Business $40）

---

## 三、入门使用

### 核心功能

| 功能 | 快捷键 | 说明 |
|---|---|---|
| **Tab 补全** | `Tab` | <100ms 延迟，多行代码预测 |
| **Cmd+K** | `Cmd/Ctrl + K` | 选中代码，自然语言修改 |
| **Composer** | `Cmd/Ctrl + I` | 跨文件编辑 Agent |
| **Chat** | `Cmd/Ctrl + L` | 侧边栏 AI 对话 |
| **@ 引用** | `@` | 引用文件/文件夹/文档 |

### Tab 补全

```
输入代码时 AI 自动建议 → Tab 接受
支持：多行补全、函数参数推测、上下文感知
```

### Cmd+K 内联编辑

```
1. 选中要修改的代码
2. Cmd/Ctrl + K
3. 输入：「添加错误处理」
4. AI 生成修改，Diff 预览
5. Accept / Reject
```

### Composer（跨文件编辑）

```
1. Cmd/Ctrl + I 打开
2. 描述任务：「给所有 API 调用加上超时和重试」
3. AI 自动跨文件修改
4. 逐个文件 Review + Accept
```

### @ 引用技巧

```
@file       引用单个文件
@folder     引用整个文件夹
@web        引用网页内容
@docs       引用官方文档
@codebase   引用整个代码库
```

---

## 四、进阶使用

### Background Agents

Cursor 3 支持 Agent 在云端后台运行：

```
1. 启动 Agent 任务
2. Agent 在云端运行，不阻塞 IDE
3. 完成后通知你 Review 结果
```

### 多模型配置

在 Settings → Models 中配置：

- Claude 系列（Opus/Sonnet/Haiku）
- GPT-4o / GPT-5
- Gemini 2.5
- 自定义 API endpoint

### .cursorrules 项目规则

```markdown
# .cursorrules
你是一个 TypeScript 全栈开发者。
技术栈：Next.js 14 + Prisma + Tailwind CSS
编码规范：
- 所有函数必须有类型注解
- 组件使用 Server Components 优先
- API 路由使用 Route Handlers
```

### Rules for AI

```
Settings → Rules for AI
全局规则，应用到所有项目
```

---

## 五、插件与扩展

Cursor 完全兼容 VS Code 插件生态。

**推荐插件**：

| 插件 | 用途 |
|---|---|
| GitLens | Git 增强 |
| Prettier | 代码格式化 |
| Tailwind CSS IntelliSense | Tailwind 智能提示 |
| Error Lens | 行内错误显示 |
| Thunder Client | API 测试 |

---

## 六、Cursor vs Trae 选择指南

| 场景 | 推荐 |
|---|---|
| 追求最强模型能力 | Cursor |
| 预算为零 | Trae |
| 国内中文项目 | Trae |
| 国际化/英语项目 | Cursor |
| 需要 VS Code 生态 | 两者均可 |
| 需要云端 Agent | Cursor 3 |
