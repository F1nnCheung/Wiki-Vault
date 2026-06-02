---
title: Rule 与 Skills 学习指南
type: tutorial
tags: [Rule, Skills, CLAUDE.md, 技能封装, 规则体系, 学习计划]
created: 2026-06-01
updated: 2026-06-01
sources:
  - Wiki/wiki/topics/claude-md-12-rules.md
  - Wiki/wiki/concepts/skills-concept.md
  - Wiki/wiki/topics/claude-code-skills-ecosystem.md
  - Wiki/wiki/entities/everything-claude-code.md
related:
  - ../LLM与Prompt工程/00-LLM与Prompt工程学习指南.md
  - ../AI Coding/AI Coding 学习计划.md
---

# Rule 与 Skills 学习指南

> 对应学习计划**第 2 周**：掌握 Rule 规则约束（根治 AI 自由发挥），将高频开发能力封装为可复用 Skills，搭建个人 AI 技能库。

---

## 核心认知

**Prompt 告诉 AI「这次做什么」，Rule 告诉 AI「在这个项目里怎么做事」，Skills 教 AI「遇到某类问题怎么思考」。**

三者协同关系：

```
Rule（约束层）→ 定义边界和规范，每次会话自动注入
  ↓
Prompt（指令层）→ 描述本次具体需求
  ↓
Skills（方法论层）→ 被 AI 自动发现、按需调用
```

**为什么需要 Rule？** 没有约束的 LLM 会自由发挥——过度设计、顺手重构、静默失败。约束不是限制 AI，是让 AI 成为你想要的开发者。

**为什么需要 Skills？** 把高频开发动作标准化——接口生成、SQL 编写、代码重构——不用每次都从零写 Prompt。

---

## 学习路线图

```
阶段一：Rule 规则体系（Day 1-3，4 小时）
  ├── Rule 本质：行为契约
  ├── CLAUDE.md 层级结构（用户级 / 项目级 / 会话级）
  ├── Karpathy 4 条基础规则
  ├── 辰北 8 条增量规则
  ├── 各工具 Rule 体系对比（Claude Code / Cursor / Trae / Hermes）
  └── 实战产出：通用全局 Rule 文件

        ↓

阶段二：Skills 概念与结构（Day 4-5，3 小时）
  ├── Skill vs Slash 命令 vs MCP 的本质区别
  ├── Skill 文件结构（SKILL.md + scripts + templates）
  ├── Skills 的触发与加载机制
  ├── 社区核心 Skill 生态
  └── 实战产出：理解 Skill 与 Slash 命令的本质区别

        ↓

阶段三：Skills 封装实战（Day 6-7，4 小时）
  ├── 编写第一个自定义 Skill
  ├── 6-8 个开发常用 Skill 模板
  ├── Skills 分级管理与角色定制
  └── 实战产出：个人 AI 技能库（6-8 个常用 Skill）
```

---

## 第一章：Rule 规则体系

> 📖 对应学习计划 Day 1-3。深度解析见 [[Wiki/wiki/topics/claude-md-12-rules|CLAUDE.md 12 条规则深度解析]]。

### 1.1 Rule 的本质：行为契约

Rule 不是「愿望清单」——它是一份**行为契约**。每一条 Rule 必须对应你观察到的**具体失败模式**。

**Rule 的核心价值**：
- **消除重复沟通**：不用每次新会话都解释技术栈、规范、偏好
- **约束 AI 行为**：告诉 AI「在这个项目里边界在哪」
- **减少失误率**：有实验数据显示，好的 Rule 可将失误率从 41% 降至 3%

> ⚠️ **关键原则**：Rule 不是越多越好。CLAUDE.md 超过 200 行后，合规率断崖下降。AI 会「遗忘」被噪声淹没的重要规则。

### 1.2 各工具的 Rule 体系

| 工具 | Rule 文件 | 作用域 | 加载方式 |
|------|----------|--------|---------|
| **Claude Code** | `CLAUDE.md` | 项目根目录 / 用户级 `~/.claude/` | 每次会话自动加载 |
| **Cursor** | `.cursorrules` | 项目根目录 | 每次会话自动加载 |
| **Trae** | `.trae/rules.md` | 项目根目录 | 每次会话自动加载 |
| **Codex** | `AGENTS.md` | 项目根目录 | 每次会话自动加载 |
| **Hermes Agent** | `AGENTS.md` + `SOUL.md` | 项目级（规矩）+ 用户级（性格） | 每次会话自动加载 |

#### CLAUDE.md 层级结构

Claude Code 的 Rule 有三层（按优先级从高到低）：

```
1. 会话级指令（本次对话中直接告诉 Claude 的）
     ↓ 覆盖
2. 项目级 CLAUDE.md（项目根目录）
     ↓ 覆盖
3. 用户级 CLAUDE.md（~/.claude/CLAUDE.md）
```

**实际加载顺序**：先加载企业共享的 CLAUDE.md → 追加用户级 CLAUDE.md → 追加项目级 CLAUDE.md → 最终以项目级为准（层级越高优先级越高）。

### 1.3 Karpathy 4 条基础规则

这 4 条规则是 Andrej Karpathy 2026 年 1 月提出的，堵住了约 **40%** 的无监督 Claude Code 翻车：

| 规则 | 核心要求 | 防止的失败模式 |
|------|---------|-------------|
| **1. 先想再写** | 明确说出假设，不确定就问，有更简单方案就 push back | 静默做错假设 |
| **2. 简单第一** | 最少代码解决问题，不写推测性功能，不建不必要的抽象 | 过度设计 |
| **3. 精准改动** | 只碰必须改的，不改相邻代码和注释，匹配现有风格 | 附带破坏 |
| **4. 目标驱动执行** | 定义成功标准，循环迭代直到验证通过 | 弱成功标准（过早停止或无限循环） |

### 1.4 辰北 8 条增量规则（2026 年 5 月）

这 8 条规则覆盖了 Karpathy 原版没触及的新失败模式——Agent 缠斗、Hook 级联、跨 Session 工作流：

| 规则 | 一句话 | 翻车现场 |
|------|-------|---------|
| **5. 别让模型做代码就能干的事** | 确定性逻辑交给代码，判断力任务交给模型 | 用 Claude 决策 503 重试——重试策略变成随机 |
| **6. Token 预算是硬约束** | 每任务 4000 token，超了总结重启 | 一次调试跑 90 分钟，模型忘了试过哪些方案 |
| **7. 暴露冲突，别取平均** | 两套模式冲突时选一套，不写「平均」代码 | Claude 写的代码同时用了两种错误处理模式 |
| **8. 先读再写** | 加代码前先读文件的 exports、调用者、共享工具 | 在已有相同函数的代码旁又加了一模一样的函数 |
| **9. 测试验证意图** | 测试必须编码 WHY，不是 WHAT | 12 个测试全过，生产挂了——测的是「有返回值」不是「返回值正确」 |
| **10. 长流程设检查点** | 每步完成总结做了什么、验证了什么、还剩什么 | 6 步重构第 4 步翻车，已把 5、6 步也做完了 |
| **11. 惯例优先于品味** | 代码库内的遵守 > 个人品味 | class-component 项目里引入 React hooks，测试全崩 |
| **12. 失败要喊出来** | 跳过/静默失败 ≠ 完成，默认暴露不确定性 | 迁移脚本静默跳过 14% 记录，11 天后才发现 |

### 1.5 程序员通用全局 Rule 模板

以下是直接可用于所有 AI 调用（Claude Code / Cursor / Trae / Codex）的通用 Rule 模板：

```markdown
# 全局 AI 调用强制规则

## 1. 身份定位
你是资深软件开发工程师。输出内容贴合工业级开发标准。

## 2. 代码优先原则
- 直接给代码，少解释——除非我明确要求解释
- 代码必须可直接运行，标注运行环境和依赖版本
- 不确定的 API/参数直接标注 TODO: verify，禁止编造

## 3. 最少修改原则
- 只改实现当前目标必需的代码
- 不重构无关代码、不改相邻注释和格式
- 匹配现有代码风格（命名、缩进、模式）

## 4. 不确定性原则
- 不确定就问，不要猜
- 需要更多上下文才能判断时，列出你还需要什么信息
- 如果有 2 个以上可行方案，列出各方案的 trade-off

## 5. 简单优先原则
- 用最少代码解决问题
- 不为「可能的未来需求」写抽象层
- 如果方案让你自己都觉得复杂，那就是复杂了

## 6. 工具使用约束
- 单次调用不超过 3 个工具
- 复杂任务自动拆分为多步，每步设检查点
- 远程操作（git push / 数据库写入）执行前二次确认

## 7. 格式约束
- 代码块标注语言类型
- Markdown 格式输出
- 文件路径使用相对路径
```

### 1.6 按阶段定制 Rule 严格度

不同开发阶段需要不同的 Rule 强度：

| 阶段 | Rule 强度 | 特殊规则 |
|------|---------|---------|
| **原型探索** | 宽松 | 显式声明 `## Override: Rule 2 (Simplicity) suspended for prototyping` |
| **功能开发** | 标准 | 套用完整规则 |
| **Bug 修复** | 严格 | 额外规则：「只输出根因分析和最小修复，不输出探索性代码」 |
| **代码审查** | 严格 | 额外规则：「不做任何修改，只输出审查意见」 |
| **生产部署** | 最严格 | 额外规则：「所有命令执行前二次确认，禁止自动执行破坏性操作」 |

---

## 第二章：Skills 技能系统

> 📖 对应学习计划 Day 4-5。概念详解见 [[Wiki/wiki/concepts/skills-concept|Skills 概念页]]。

### 2.1 Skills vs Slash 命令 vs MCP：本质区别

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

### 2.2 Skill 文件结构

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

#### SKILL.md 模板

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

### 2.3 Skills 的加载与触发机制

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

### 2.4 社区核心 Skill 生态

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

---

## 第三章：Skills 封装实战

> 📖 对应学习计划 Day 6-7。

### 3.1 6-8 个开发常用 Skill 模板

以下 6 个 Skill 覆盖日常开发 80% 的高频动作：

#### Skill 1：接口生成器（api-generator）

**触发词**：「生成接口」「创建 API」「add endpoint」

**核心流程**：
1. 读 Prisma/TypeORM schema
2. 生成 CRUD 路由（GET/POST/PUT/DELETE）
3. 添加 Zod 校验
4. 添加错误处理
5. 生成集成测试

#### Skill 2：SQL 编写器（sql-writer）

**触发词**：「写 SQL」「查询」「数据库」

**核心流程**：
1. 读 schema 了解表结构
2. 理解查询需求
3. 输出优化后的 SQL + EXPLAIN 分析
4. 标注索引建议

#### Skill 3：代码重构器（code-refactor）

**触发词**：「重构」「拆分」「提取函数」

**核心流程**：
1. 分析目标文件/模块
2. 给出重构计划（影响范围、风险）
3. 分步执行，每步验证
4. 保持外部 API 不变

#### Skill 4：单元测试生成器（test-generator）

**触发词**：「写测试」「添加测试」「test」

**核心流程**：
1. 读被测代码
2. 分析函数签名和分支
3. 生成测试：正常+边界+异常+空值
4. Mock 外部依赖

#### Skill 5：技术方案评审（tech-review）

**触发词**：「技术方案」「架构设计」「选型」

**核心流程**：
1. 理解业务需求和技术约束
2. 给出 2-3 个备选方案
3. 每个方案：思路 + 优势 + 风险 + 工作量
4. 推荐方案 + 理由

#### Skill 6：代码安全检查（security-audit）

**触发词**：「安全检查」「security」「漏洞」

**核心流程**：
1. 扫描目标代码
2. 检查：注入/越权/XSS/硬编码密钥/不安全依赖
3. 按严重程度排序
4. 给出修复方案

### 3.2 安装 Skills 的实操命令

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

### 3.3 Skills 分级管理与角色定制

参考 [[Wiki/wiki/topics/claude-code-skills-recommendations|Skills 分级推荐]]，Skill 分为五级梯队：

| 梯队 | 定位 | 示例 |
|------|------|------|
| **T0：必装** | 所有角色通用 | Superpowers、Repomix、ccusage |
| **T1：核心增强** | 按角色选 2-3 个 | frontend-design（前端）、FastAPI-MCP（后端） |
| **T2：领域专用** | 特定场景 | marketingskills（增长）、academic-writing（学术） |
| **T3：进阶探索** | 深度使用后尝试 | claude-mem（长期记忆）、multi-agent（多 Agent 协同） |
| **T4：实验性** | 社区新出，稳定前谨慎 | 各种 beta 版本 Skill |

**按角色推荐**：

| 角色 | T0 必装 | T1 核心 | T2 领域 |
|------|---------|---------|---------|
| **前端** | Superpowers + Repomix | frontend-design + Figma MCP | UI UX Pro Max |
| **后端** | Superpowers + Repomix | api-generator + sql-writer | Prisma MCP |
| **全栈** | Superpowers + Repomix + ccusage | frontend-design + api-generator | claude-mem |
| **架构师** | Superpowers + Repomix | tech-review + security-audit | ECC 全套 |

---

## 附录 A：第 2 周每日学习清单

| 天数 | 学习内容 | 实战产出 |
|------|---------|---------|
| Day 1-3 | Rule 规则编写：12 条规则逐条理解 + 各工具适配 | 通用全局 Rule 文件 |
| Day 4-5 | Skills 概念、结构、与命令和 MCP 的区别 | 理解 Skill 的本质和触发机制 |
| Day 6-7 | Skills 封装实战，安装社区 Skill + 编写自定义 Skill | 个人 AI 技能库（6-8 个常用 Skill） |

## 附录 B：第 2 周复盘自检

- [ ] 能否在 5 分钟内为新项目编写一份 50 行以内的 CLAUDE.md？
- [ ] 能否解释 Karpathy 4 条规则分别防止什么失败模式？
- [ ] 能否说清 Skill / Slash 命令 / MCP 三者各解决什么问题？
- [ ] 是否已安装并配置好至少 3 个社区核心 Skill？
- [ ] 是否已编写至少 2 个自定义 Skill 并验证可用？
- [ ] 个人全局 Rule 是否已挂载到所有 AI 编码工具的配置中？

## 附录 C：延伸阅读

| 主题 | 知识库资源 |
|------|-----------|
| 12 条规则完整实验数据 + 可复制模板 | [[Wiki/wiki/topics/claude-md-12-rules\|CLAUDE.md 12 条规则深度解析]] |
| Skills 概念 + 选择标准 | [[Wiki/wiki/concepts/skills-concept\|Skills 概念页]] |
| 8 个核心 Skill 详解 | [[Wiki/wiki/topics/claude-code-skills-ecosystem\|Skills 生态系统]] |
| 11 个 Skill 五级梯队 + 8 角色定制 | [[Wiki/wiki/topics/claude-code-skills-recommendations\|Skills 分级推荐]] |
| ECC：一站式 Harness（60 Agent + 228 Skill） | [[Wiki/wiki/entities/everything-claude-code\|ECC 实体页]] |

---

> 📖 完成第 2 周学习后，进入 [[../AI Coding/AI Coding 学习计划\|第 3 周：AI 编码工具全栈 + Vibe Coding]]——吃透四大主流 AI 代码助手，掌握自然语言编程范式。
