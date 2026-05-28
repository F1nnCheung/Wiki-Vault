---
title: 2.5.2 Codex 基本使用
type: tutorial
tags: [codex, basic-usage, workflow, sandbox, plan-mode, steering, agents-md]
created: 2026-05-11
updated: 2026-05-28
sources:
  - Wiki/wiki/topics/codex-guide.md
  - Wiki/wiki/entities/codex.md
  - 教程/AI-Coding/AI Coding 学习计划.md
related:
  - 01-介绍与安装.md
  - 03-适用场景.md
---

# 2.5.2 Codex 基本使用

> Codex 的核心工作方式是「委派 + 异步」：一次性给足上下文，发出去后信任 Agent 完成 5-15 分钟工作，期间转去发起下一个任务。

---

## 界面速览（Codex App）

Codex App 采用经典**三栏布局**：

| 区域 | 功能 |
|------|------|
| **左侧栏** | 任务列表（按项目分组）、对话搜索（Ctrl+G）、插件入口、自动化入口 |
| **中间** | 对话窗口 + 权限控制 + 上下文指示器 + 模型选择 + 速度选项 |
| **右侧** | 多功能区（文件树/内置浏览器/代码变更/预览） |

**任务状态标识**：🔵蓝色=完成 / 🟢绿色=等待批准 / 🔄转圈=工作中

---

## 项目与任务管理

### 项目 = 文件夹

每个项目对应你电脑的真实目录。Codex 在里面读写文件，所有产物落在你的硬盘：
- 可用资源管理器/Finder 正常操作
- 跨 chat 通过 `@文件名` 互相引用
- 删除项目只从侧边栏移除，文件不丢

**建议按项目拆分目录**，不要把不同任务塞进一个大杂烩文件夹。

### 多任务并行

Codex 支持同时运行多个 chat。核心技巧是 **序列化 prompt**：
1. 一次性给足上下文（避免来回打补丁）
2. 发出去后**信任 Agent** 独立完成
3. 转去发起下一个任务
4. 蓝点提示回来 review

### Plan 模式（强烈推荐）

开启 Plan 模式后，Codex 先输出完整工作计划与你确认，确认后再执行。**所有复杂任务必须先开 Plan 模式。**

### Steering（引导/Steer）

当 AI 执行过程中理解偏了/方向错了，点击「引导」按钮（或 Ctrl+Enter），立即插入纠正指令——不等当前步骤结束。默认模式下新输入会排队，点 Steer 则是中途接管方向盘。

### Fork Chat（分叉）

在某条历史消息处右键「派生到本地」，复制对话但不复制代码改动。等价于 Git branch 应用到对话状态。

---

## 记忆系统：AGENTS.md

AGENTS.md 是项目的「持久说明书」，每次对话自动加载。**最关键的一项：写清测试命令。**

```markdown
# AGENTS.md

## 技术栈
- TypeScript + React，包管理用 pnpm

## 代码规范
- 禁止 any，禁止 console.log 进提交

## 怎么验证（Codex 完成任务前会自动跑）
- 单元测试：pnpm test
- 类型检查：pnpm typecheck
- 上面两个都绿，这个任务才算做完
```

写了测试命令后，Codex 交活之前会自己跑 `pnpm test`，不绿自己接着改——**这是「用好 Codex」和「用 Codex」之间最大的分水岭。**

### 全局 AGENTS.md

设置 → 个性化 → 自定义指令 编辑，对所有项目生效。推荐加入安全规则：

```
禁止批量删除文件或目录。
不要使用：del /s、rd /s、rm -rf、Remove-Item -Recurse
需要删除文件时，只能一次删除一个明确路径的文件。
```

---

## 扩展能力使用

Codex 的能力扩展分三层：

| 层级 | 说明 | 使用方式 |
|------|------|----------|
| **Plugin** | 第三方服务的软件包 | 插件市场一键安装 |
| **Skill** | 可复用工作流配方（SKILL.md） | 官方市场 / GitHub 下载放 `.codex/skills/` / Skill Creator 自建 |
| **MCP** | 外部服务标准协议接入 | 设置 → MCP 服务器 → 配置 URL |

### 安装第三方 Skill

1. GitHub 下载 skill 压缩包
2. 放入项目 `.codex/skills/` 目录
3. 对话中 `/` 唤起

### 自建 Skill

Codex 内置 **Skill Creator**——用自然语言描述工作流，自动生成 SKILL.md。例如告诉它「当我提供视频和字幕文件时，第一步读 SRT 生成 Markdown，第二步用 ffmpeg 截图，第三步替换占位符」。

---

## Git 工作流

Codex 支持**对话式 Git 操作**：

### Worktree 并行开发
同一项目创建多个工作树分支，不同文件夹互不干扰，并行开发后合并回主干。

### Fork + 回滚（双重撤销）
1. Fork Chat：在出问题前的消息处右键「派生到本地」
2. Git 回退：复制目标 commit hash → 让 Codex `git reset` 回去
3. = 对话历史 + 代码双重回滚

### IDE 联动
右上角一键在 VSCode / Cursor / Windsurf 中打开项目。

---

## TDD 闭环（给自主 Agent 装缰绳）

这是用 Codex 做复杂开发最可靠的模式：

1. 先让 Codex **写测试**，别写实现
2. 跑一遍，确认这些测试**全部失败**（证明测试有效）
3. 把这批失败的测试 commit 存档
4. 再让 Codex 写实现：**实现到所有测试通过，并且不许改测试本身**

测试就是那根缰绳——它怎么折腾都行，只要测试全绿且测试没被动过，这活就可信。

---

## Spec-Driven 开发

用规格文件精确约束 AI 的行为。写 10 分钟 Spec，节省 1 小时返工。

### Spec 文件示例

```markdown
# spec/auth.md

## 认证系统接口

### POST /api/auth/login
- 参数：{ email: string, password: string }
- 返回：{ token: string, user: User }
- 错误：401（凭证无效）、429（频率限制）

### Middleware
- 保护 /api/user/* 路由
- 从 Authorization header 提取 Bearer token
```

### 使用方式

```
根据 @spec/auth.md 的接口定义，实现完整的认证模块。
先写测试，确认测试全部失败后，再写实现。
```

Spec-Driven 的好处：Codex 按规格执行（结果可预测）、Spec 就是验收标准、Token 花在实现上而不是返工纠正上。

---

## 安全底线

| 场景 | 推荐配置 |
|------|----------|
| **日常开发** | workspace-write + on-request + 自动审查 |
| **读代码/做规划** | 切 read-only |
| **全局规则** | AGENTS.md 加批量删除禁令 |
| **危险操作** | 绝不要轻易用 danger-full-access |

---

## 本章小结

1. 界面三栏布局：任务列表/对话/多功能区
2. 核心工作节奏：写好 prompt → 发出去 → 信任等待 → 蓝点回来 review
3. Plan 模式 + Steering + Fork Chat 是三大操作法宝
4. **AGENTS.md 中写测试命令**是最大分水岭
5. TDD 闭环：先写测试→确认失败→写实现→不许改测试

> 📖 **下一步**：阅读 [[03-适用场景]]，了解 Codex 的适用边界以及如何与 Claude Code 配合使用。

---

> 📚 参考：[[Wiki/wiki/topics/codex-guide|Codex 完整教程]]
