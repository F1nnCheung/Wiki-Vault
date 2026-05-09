---
title: Codex 完整教程
type: topic
tags: [codex, openai, tutorial, cloud-agent]
created: 2026-05-09
updated: 2026-05-09
sources: []
related:
  - entities/codex.md
  - topics/ai-coding-tools-comparison.md
---

# Codex 完整教程

## 一、介绍

Codex 是 OpenAI 推出的云端 AI 编程 Agent，集成于 ChatGPT。核心能力是「无人值守」编程——给它任务描述，它从需求分析到部署完成全流程自动化。

**入口**：chatgpt.com → 切换到 Codex 模式

**核心特点**：
- 云端运行，不占用本地资源
- 需求→代码→测试→部署全流程
- 克隆 Git 仓库自主修改
- 自动提交 PR

---

## 二、安装与配置

### 无需安装

Codex 是云端服务，不需要本地安装：

1. 访问 **chatgpt.com**
2. 登录 OpenAI 账号
3. 切换到 Codex 模式
4. 连接 GitHub 账号（授权仓库访问）

### CLI 工具（可选）

```bash
# 安装 Codex CLI
npm install -g @openai/codex

# 登录
codex login

# 在当前目录启动
codex init
```

---

## 三、入门使用

### 基本工作流

```
1. 描述任务：「给这个 Next.js 项目加上用户认证系统」
   ↓
2. Codex 分析仓库结构
   ↓
3. Codex 制定计划（展示给你确认）
   ↓
4. Codex 执行：创建文件/修改代码/安装依赖
   ↓
5. Codex 运行测试，修复错误
   ↓
6. Codex 提交 PR
```

### 任务类型

| 类型 | 示例 |
|---|---|
| **新功能** | 「添加暗色模式切换」 |
| **重构** | 「把 class 组件改成函数组件」 |
| **Bug 修复** | 「修复登录后白屏的问题」 |
| **代码迁移** | 「从 JavaScript 迁移到 TypeScript」 |
| **文档** | 「给所有 API 添加 JSDoc 注释」 |

### 最佳实践

1. **任务描述要具体**：不要说「优化代码」，说「把 API 调用从 fetch 改成 axios，加上超时和重试」
2. **提供上下文**：链接相关文件或说明技术栈
3. **分步执行**：大任务拆成小步骤，每步验证
4. **Review PR**：Always review before merging

---

## 四、进阶使用

### Spec-Driven 开发

```markdown
# spec/auth.md
## 认证系统接口

### POST /api/auth/login
- 参数：{ email: string, password: string }
- 返回：{ token: string, user: User }
- 错误：401（凭证无效）、429（频率限制）
```

在 Codex 中引用：
```
根据 @spec/auth.md 的接口定义，实现 src/auth/ 模块
```

### 与其他工具配合

```
Cursor/Copilot（日常编码）
  +
Codex（批量任务/自动化脚本）
  +
Claude Code（架构审查/重构）
```

---

## 五、Codex 适用场景

| ✅ 适合 | ❌ 不适合 |
|---|---|
| 从零搭建新项目 | 与现有复杂项目深度集成 |
| 批量代码迁移/重构 | 需要精细业务逻辑的场景 |
| 自动化脚本和工具 | 强依赖内部服务的系统 |
| 生成文档和测试 | 安全性要求极高的代码 |
