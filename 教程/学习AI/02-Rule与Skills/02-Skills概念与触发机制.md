---
title: Skills 概念与触发机制
type: tutorial
tags: [Skills, Slash命令, MCP, SKILL.md, 触发机制, 社区生态]
created: 2026-06-02
updated: 2026-06-02
sources:
  - Wiki/wiki/concepts/skills-concept.md
  - Wiki/wiki/topics/claude-code-skills-ecosystem.md
related:
  - 00-Rule与Skills学习指南.md
  - 01-Rule规则体系.md
  - 03-Skills封装实战.md
---

# 第二章：Skills 概念与触发机制

> 📖 对应学习计划 Day 4-5。概念详解见 [[Wiki/wiki/concepts/skills-concept|Skills 概念页]]。

---

## 2.1 Skills vs Slash 命令 vs MCP：本质区别

| 维度 | Skills | Slash 命令 | MCP |
|------|--------|-----------|-----|
| **触发方式** | **自动发现、智能调用** | 手动输入 `/命令名` | AI 按需调用 |
| **内容形态** | 完整方法论（流程+脚本+模板） | 提示文本模板 | 外部工具接口 |
| **定位** | 教 AI **怎么思考** | 快速执行常见操作 | 给 AI **工具** |
| **持久性** | 跨会话持久 | 一次性 | 跨会话持久 |
| **安装位置** | `~/.claude/skills/` 或 `.claude/skills/` | `.claude/commands/` | MCP 配置 |

**一句话记忆**：
- 命令 = 快捷键（手动按）
- Skills = 员工培训手册（自动查阅）
- MCP = 办公设备（按需使用）

### 三者的协同关系

```
Slash 命令：用户主动触发 → 快速执行
    「/review 这个 PR」   → AI 按命令模板执行

Skills：AI 自动识别场景 → 按方法论执行
    用户：「帮我写个 API」→ AI 识别到 api-generator Skill → 按 Skill 的流程执行

MCP：AI 需要工具 → 调用外部能力
    用户：「打开浏览器测试」→ AI 调用 Playwright MCP
```

**协同示例**：
```
用户：「帮我给 User 模型生成完整的 CRUD API」

1. AI 识别到「生成 API」→ 触发 api-generator Skill
2. Skill 流程要求「先读 Prisma Schema」→ AI 读文件
3. Skill 流程要求「生成集成测试」→ AI 调用 test-runner MCP 跑测试
4. 用户输入 /deploy → Slash 命令触发部署流程
```

---

## 2.2 Skill 文件结构

```
my-skill/
├── SKILL.md       # 必需：技能元数据和说明
│   ├── name: 技能名称
│   ├── description: 功能描述（AI 用来判断何时调用）
│   ├── triggers: 触发条件（关键词或场景）
│   └── instructions: 详细执行指令
├── scripts/       # 可选：辅助脚本（Python/Bash/Node）
├── templates/     # 可选：输出模板
└── resources/     # 可选：参考文档
```

### SKILL.md 模板

```markdown
# Skill: api-generator

## Description
Generate RESTful API endpoints based on Prisma schema.
Creates route handlers, validation, error handling, and tests.

## Triggers
- "create API for"
- "generate endpoint"
- "add route"
- User mentions a new database model

## Instructions

### Phase 1: Understand the Schema
1. Read the relevant Prisma schema file
2. Identify the model, its fields, and relations
3. Note any existing API patterns in the codebase

### Phase 2: Generate Code
1. Create route handler in `src/app/api/[resource]/route.ts`
2. Implement GET (list), GET by ID, POST, PUT, DELETE
3. Add Zod validation for request body
4. Add error handling for each operation
5. Follow existing project patterns for response format

### Phase 3: Add Tests
1. Generate integration tests covering all methods
2. Include edge cases: invalid ID, missing fields, unauthorized

## Output Format
- Each file in a separate code block
- Label each file with its path as a comment
```

### Skill 目录结构的三种模式

| 模式 | 结构 | 适用 |
|------|------|------|
| **极简** | 仅 `SKILL.md` | 纯方法论 Skill（如 code-review） |
| **标准** | `SKILL.md` + `templates/` | 需要输出模板的 Skill（如 api-generator） |
| **完整** | `SKILL.md` + `scripts/` + `templates/` + `resources/` | 需要自动化执行的 Skill（如 test-generator） |

---

## 2.3 Skills 的加载与触发机制

```
用户发起任务
  ↓
AI 读取任务描述
  ↓
扫描已安装 Skills 的 description 和 triggers
  ↓
匹配 → 自动加载 SKILL.md 内容到上下文
  ↓
按 instructions 分阶段执行
```

**关键设计原则**：
- Skills 是**被动发现**的——AI 自己判断要不要用
- 多个 Skill 可能同时匹配——AI 按优先级选择
- Skills 之间可以互相引用（如在 instructions 中调用另一个 Skill）

### 触发匹配的三种模式

| 模式 | 说明 | 示例 |
|------|------|------|
| **关键词匹配** | 用户消息中包含 trigger 关键词 | 「生成 API」→ api-generator |
| **场景推断** | AI 根据任务上下文推断需要哪个 Skill | 用户提到新数据库模型 → 推断需要 api-generator |
| **显式调用** | 用户直接指定 Skill | 「用 sql-writer Skill 写这个查询」 |

### Skill 优先级规则

当多个 Skill 同时匹配时：
1. **显式调用** > 场景推断 > 关键词匹配
2. **项目级 Skill**（`.claude/skills/`）> 用户级 Skill（`~/.claude/skills/`）
3. **更具体的匹配** > 更宽泛的匹配

---

## 2.4 社区核心 Skill 生态

详见 [[Wiki/wiki/topics/claude-code-skills-ecosystem|Skills 生态系统]]，精选如下：

| Skill | 用途 | 适用场景 |
|-------|------|---------|
| **Superpowers** | 14 个方法论强制流程（brainstorming → plan → TDD → review → ship） | Claude Code / Codex / Cursor 等 8 平台 |
| **gstack** | YC 工程标准：部署/监控/回滚 | 生产级部署 |
| **frontend-design** | 一句话生成有设计感的前端 UI | 前端快速原型 |
| **claude-mem** | 跨会话长期记忆 | 大型项目 |
| **Repomix** | 打包整个仓库为一个文件 | 一次性读懂项目全貌 |
| **ccusage** | 实时 Token 消耗显示 | 成本控制 |
| **skill-vetter** | Skill 安全扫描 | 安装第三方 Skill 前检查 |

> 💡 如果你想要开箱即用的一整套 Skill + Agent 体系，[[Wiki/wiki/entities/everything-claude-code|ECC（Everything Claude Code）]] 提供了 228 个 Skill + 60 个 Agent——是目前社区最大的单一 Skill 集合。

### Superpowers 深度介绍

Superpowers 是目前最成熟的 Skill 集合，14 个 Skill 覆盖了从需求到部署的完整开发流程：

```
brainstorming → plan → TDD → review → ship
     ↓           ↓      ↓       ↓       ↓
  创意发散    架构设计  红-绿-重构 代码审查  一键部署
```

**Superpowers 的核心设计理念**（详见 [[Wiki/wiki/concepts/superpowers-design-philosophy|Superpowers 设计哲学]]）：
1. **铁律+硬门控**：关键步骤有强制性检查，不过不能继续
2. **合理化防范**：不是盲目禁止，而是让 AI 解释为什么
3. **人的搭档**：不替代人类判断，而是增强人类决策
4. **CSO（Chief Safety Officer）**：内置安全审查节点

---

## 2.5 安装 Skills 的实操命令

```bash
# Claude Code 安装 Skill
# 方式 1：插件市场
/plugin install skill-name

# 方式 2：手动克隆
git clone <repo-url> ~/.claude/skills/my-skill

# 方式 3：CC Switch GUI（推荐）
# 打开 CC Switch → Skills 面板 → 搜索 → 一键安装

# 查看已安装 Skills
ls ~/.claude/skills/

# 或通过 Claude Code 查看
# 对话中直接问：「列出你当前可用的 Skills」
```

### 新手推荐起步组合

```bash
# 第一天：先装这 3 个，感受 Skills 的价值
/plugin install superpowers      # 14 个方法论流程
/plugin install repomix           # 仓库打包
/plugin install ccusage           # Token 监控

# 第二天：根据你的角色追加
# 前端：/plugin install frontend-design
# 后端：自行编写 api-generator + sql-writer
# 全栈：以上全部
```

---

## 2.6 本章实战练习

- [ ] 用自己的话解释 Skill / Slash 命令 / MCP 三者的区别（说给同事听，看对方能否听懂）
- [ ] 安装至少 3 个社区 Skill（推荐 Superpowers + Repomix + ccusage）
- [ ] 阅读一个社区 Skill 的 SKILL.md，理解其结构
- [ ] 用 Superpowers 的 brainstorming Skill 完成一次技术方案讨论
- [ ] 设计你的第一个 Skill 的 SKILL.md（只写 description + triggers，下一章完善）

---

> 📖 继续学习 [[03-Skills封装实战|第三章：Skills 封装实战]]——编写自定义 Skill，搭建个人 AI 技能库。
