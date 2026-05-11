---
title: 2.5.2 Codex 基本使用与 Spec-Driven 开发
type: tutorial
tags: [codex, basic-usage, spec-driven, workflow]
created: 2026-05-11
updated: 2026-05-11
sources:
  - Wiki/wiki/topics/codex-guide.md
  - 教程/AI-Coding/AI Coding 学习计划.md
related:
  - 01-介绍与安装.md
  - 03-适用场景.md
---

# 2.5.2 Codex 基本使用与 Spec-Driven 开发

> Codex 的核心使用模式是「下任务 → 等结果 → Review」。描述越精确，结果越好；模糊的需求是 Codex 最大的敌人。

---

## 基本工作流

```
你：描述任务
  ↓
Codex：分析仓库结构（读文件、理解项目）
  ↓
Codex：制定执行计划
  ↓ （展示给你确认）
你：确认 / 调整计划
  ↓
Codex：执行（创建文件、修改代码、安装依赖）
  ↓
Codex：运行测试 → 发现错误 → 自动修复 → 再测试
  ↓
Codex：提交 PR
  ↓
你：Review PR → Merge
```

---

## 任务描述技巧

### 好描述 vs 差描述

```
❌ 差："优化代码"
  → Codex 不知道你想要什么，可能做无用功

✅ 好："把 src/api/ 下所有请求函数从 fetch 改成 axios，
   加上 10s 超时和 3 次重试，错误统一用 AppError 类"
  → Codex 精确知道要做什么
```

### 任务描述的要素

一个完整的任务描述应包含：

```
1. 目标：要做什么（不是要优化，而是要具体改什么）
2. 范围：哪些文件/目录（限制 AI 的操作范围）
3. 约束：技术限制（超时、重试次数、错误类型）
4. 参考：关联文件/文档（给 AI 提供上下文）
```

### 实操示例

```
✅ 新功能开发：
"给 Next.js 项目添加 JWT 认证系统：
- 参考 src/types/user.ts 的 User 类型
- 创建 src/lib/auth.ts（jose 库，HS256）
- 创建 src/middleware.ts（保护 /dashboard/* 路由）
- 创建 src/app/api/auth/login/route.ts
- 写单元测试"

✅ 重构：
"把 src/components/ 下所有 class 组件改成函数组件 + Hooks：
- 保持功能完全不变
- Props 类型放在同文件的 interface 中
- 删除所有 this. 引用"

✅ Bug 修复：
"修复 issue #42：登录后跳转到 /dashboard 时白屏
- 可能是 useEffect 依赖数组问题
- 重点检查 src/app/dashboard/page.tsx 的认证状态检查"
```

---

## 支持的任务类型

| 类型 | 示例 | 预计耗时 |
|---|---|---|
| **新功能** | 「添加暗色模式切换」 | 5-15 分钟 |
| **重构** | 「把 class 组件改成函数组件」 | 10-30 分钟 |
| **Bug 修复** | 「修复登录后白屏的问题」 | 3-10 分钟 |
| **代码迁移** | 「从 JavaScript 迁移到 TypeScript」 | 30 分钟-2 小时 |
| **文档生成** | 「给所有 API 添加 JSDoc 注释」 | 5-15 分钟 |
| **测试生成** | 「给 src/utils/ 下所有函数写测试」 | 10-30 分钟 |

---

## Spec-Driven 开发

这是 Codex 最高效的使用模式——用规格文件精确约束 AI 的行为。

### 什么是 Spec 文件

Spec 文件是用 Markdown 编写的功能和接口规格说明。它告诉 Codex：**「这就是你该实现的东西，照着做。」**

### Spec 文件示例

```markdown
# spec/auth.md

## 认证系统接口规范

### POST /api/auth/login
- 功能：用户邮箱密码登录
- 参数：{ email: string, password: string }
- 返回：{ token: string, user: { id, email, name } }
- 错误：
  - 400：参数格式不正确
  - 401：邮箱或密码错误
  - 429：请求过于频繁（每分钟最多 5 次）

### POST /api/auth/register
- 功能：用户注册
- 参数：{ email: string, password: string, name: string }
- 验证规则：
  - email：合法邮箱格式
  - password：至少 8 位，包含大小写字母和数字
  - name：2-50 个字符
- 返回：{ token: string, user: { id, email, name } }
- 错误：
  - 400：参数校验失败（返回具体字段和原因）
  - 409：邮箱已被注册

### Middleware
- 保护 /api/user/* 路由
- 从 Authorization header 提取 Bearer token
- 验证 token 有效性
- 将 user 信息注入 request context
```

### 如何使用 Spec

```
在 Codex 中输入：
"根据 @spec/auth.md 的接口定义，实现完整的认证模块：
- src/lib/auth.ts（jose 库，HS256 算法）
- src/app/api/auth/login/route.ts
- src/app/api/auth/register/route.ts
- src/middleware.ts（保护 /api/user/* 路由）
- 测试文件"
```

### Spec-Driven 的好处

| 不写 Spec | 写 Spec |
|---|---|
| AI 自由发挥，结果不可控 | AI 按规格执行，结果可预测 |
| 需要多次返工纠正 | 一次到位率高 |
| 验收标准模糊 | Spec 就是验收标准 |
| Token 浪费在纠正上 | Token 花在实现上 |

> 💡 **核心原则**：花 10 分钟写 Spec，节省 1 小时返工。

---

## 安全建议

### 使用 Codex 的注意事项

1. **隔离仓库**：给 Codex 独立的 fork 或分支，不要直接在 main 上操作
2. **Review 每个 PR**：绝不盲目合并 Codex 的 PR
3. **敏感信息**：绝对不要在任务描述中包含 API Key、密码等
4. **限制权限**：按仓库授权 GitHub 访问，不給全账号权限
5. **先小后大**：先用简单任务验证效果，再提交复杂任务

---

## 本章小结

1. Codex 工作流：描述任务 → 确认计划 → 自动执行 → Review PR
2. 任务描述的关键：具体、有范围、有约束、有参考
3. Spec-Driven 开发是最佳实践——先写规格，再让 AI 执行
4. 花 10 分钟写 Spec = 节省 1 小时返工
5. 安全第一：隔离仓库、Review 每个 PR、不给敏感信息

> 📖 **下一步**：阅读 [[03-适用场景]]，了解 Codex 适合和不适合的场景，避免用错工具。

---

> 📚 参考：[[Wiki/wiki/topics/codex-guide|Codex 完整教程]]
