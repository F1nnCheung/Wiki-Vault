---
title: Skills 封装实战
type: tutorial
tags: [Skills, 封装实战, 技能库, API生成, SQL编写, 代码重构, 测试生成]
created: 2026-06-02
updated: 2026-06-02
sources:
  - Wiki/wiki/concepts/skills-concept.md
  - Wiki/wiki/topics/claude-code-skills-recommendations.md
  - Wiki/wiki/topics/claude-code-skills-ecosystem.md
related:
  - 00-Rule与Skills学习指南.md
  - 02-Skills概念与触发机制.md
---

# 第三章：Skills 封装实战

> 📖 对应学习计划 Day 6-7。编写自定义 Skill，搭建个人 AI 技能库。

---

## 3.1 编写第一个自定义 Skill

### 实战：从零编写 `commit-generator` Skill

**场景**：每次写完代码，你都需要写 Git commit message。让 AI 帮你自动生成规范的 commit。

```markdown
# Skill: commit-generator

## Description
Auto-generate Conventional Commits based on git diff.
Analyzes changes and produces well-formatted commit messages.

## Triggers
- "commit"
- "git commit"
- "generate commit message"
- "写 commit"

## Instructions

### Phase 1: Analyze Changes
1. Run `git diff --staged` to see staged changes
2. If no staged changes, run `git diff` for unstaged changes
3. Run `git diff --stat` to see affected files

### Phase 2: Classify Changes
Categorize each change:
- `feat:` — new feature
- `fix:` — bug fix
- `refactor:` — code restructure (no behavior change)
- `docs:` — documentation only
- `test:` — adding/updating tests
- `chore:` — build/config/dependencies

### Phase 3: Generate Message
Format: `type(scope): description`

Rules:
- Description in imperative mood, lowercase, no period at end
- Max 72 characters for the summary line
- If multiple types, use the most significant one
- Body (optional): explain WHY, not WHAT

### Phase 4: Review
1. Show the generated message
2. Ask: "Commit with this message? (y/n)"
3. If yes, run `git commit -m "message"`
4. If no, ask for edits

## Output Format
```
feat(auth): add JWT refresh token rotation

- Implement token rotation to prevent replay attacks
- Add refresh token invalidation on logout
- Update tests to cover rotation scenarios
```
```

### Skill 编写自查清单

写完 SKILL.md 后，逐项检查：

- [ ] **description 是否足够具体？** AI 能据此判断何时调用吗？
- [ ] **triggers 是否覆盖了常见说法？** 中英文都考虑了吗？
- [ ] **instructions 是否分阶段？** 每阶段有明确的可验证产出吗？
- [ ] **输出格式是否明确？** AI 知道该输出什么、什么格式吗？
- [ ] **是否有边界条件处理？** 空输入、异常情况有定义吗？

---

## 3.2 6-8 个开发常用 Skill 模板

以下 6 个 Skill 覆盖日常开发 80% 的高频动作：

### Skill 1：接口生成器（api-generator）

**触发词**：「生成接口」「创建 API」「add endpoint」

**核心流程**：
1. 读 Prisma/TypeORM schema
2. 生成 CRUD 路由（GET/POST/PUT/DELETE）
3. 添加 Zod 校验
4. 添加错误处理
5. 生成集成测试

### Skill 2：SQL 编写器（sql-writer）

**触发词**：「写 SQL」「查询」「数据库」

**核心流程**：
1. 读 schema 了解表结构
2. 理解查询需求
3. 输出优化后的 SQL + EXPLAIN 分析
4. 标注索引建议

### Skill 3：代码重构器（code-refactor）

**触发词**：「重构」「拆分」「提取函数」

**核心流程**：
1. 分析目标文件/模块
2. 给出重构计划（影响范围、风险）
3. 分步执行，每步验证
4. 保持外部 API 不变

### Skill 4：单元测试生成器（test-generator）

**触发词**：「写测试」「添加测试」「test」

**核心流程**：
1. 读被测代码
2. 分析函数签名和分支
3. 生成测试：正常+边界+异常+空值
4. Mock 外部依赖

### Skill 5：技术方案评审（tech-review）

**触发词**：「技术方案」「架构设计」「选型」

**核心流程**：
1. 理解业务需求和技术约束
2. 给出 2-3 个备选方案
3. 每个方案：思路 + 优势 + 风险 + 工作量
4. 推荐方案 + 理由

### Skill 6：代码安全检查（security-audit）

**触发词**：「安全检查」「security」「漏洞」

**核心流程**：
1. 扫描目标代码
2. 检查：注入/越权/XSS/硬编码密钥/不安全依赖
3. 按严重程度排序
4. 给出修复方案

### 6 个 Skill 的模板速查

| Skill | 适用场景 | 核心产出 | 复杂度 |
|-------|---------|---------|--------|
| api-generator | 新数据模型上线 | CRUD 路由 + 校验 + 测试 | ⭐⭐ |
| sql-writer | 复杂查询需求 | 优化 SQL + EXPLAIN + 索引建议 | ⭐⭐ |
| code-refactor | 代码腐化、函数过长 | 重构计划 + 分步执行 | ⭐⭐⭐ |
| test-generator | 新功能、Bug 修复后 | 测试文件（正常/边界/异常） | ⭐⭐ |
| tech-review | 技术选型、架构设计 | 多方案对比 + 推荐 | ⭐⭐⭐ |
| security-audit | 上线前审查 | 风险报告（按严重程度） | ⭐⭐ |

---

## 3.3 Skills 分级管理与角色定制

参考 [[Wiki/wiki/topics/claude-code-skills-recommendations|Skills 分级推荐]]，Skill 分为五级梯队：

| 梯队 | 定位 | 示例 |
|------|------|------|
| **T0：必装** | 所有角色通用 | Superpowers、Repomix、ccusage |
| **T1：核心增强** | 按角色选 2-3 个 | frontend-design（前端）、FastAPI-MCP（后端） |
| **T2：领域专用** | 特定场景 | marketingskills（增长）、academic-writing（学术） |
| **T3：进阶探索** | 深度使用后尝试 | claude-mem（长期记忆）、multi-agent（多 Agent 协同） |
| **T4：实验性** | 社区新出，稳定前谨慎 | 各种 beta 版本 Skill |

### 按角色推荐

| 角色 | T0 必装 | T1 核心 | T2 领域 |
|------|---------|---------|---------|
| **前端** | Superpowers + Repomix | frontend-design + Figma MCP | UI UX Pro Max |
| **后端** | Superpowers + Repomix | api-generator + sql-writer | Prisma MCP |
| **全栈** | Superpowers + Repomix + ccusage | frontend-design + api-generator | claude-mem |
| **架构师** | Superpowers + Repomix | tech-review + security-audit | ECC 全套 |

### Skills 的分级安装策略

```
第一周：只装 T0（Superpowers + Repomix + ccusage）
   → 熟悉 Skills 的工作方式

第二周：按角色装 T1（2-3 个）
   → 覆盖核心开发场景

一个月后：按需装 T2（领域专用）
   → 深入特定领域

长期：探索 T3/T4
   → 但不让 Skill 数量超过 15 个（超过后 AI 选择困难）
```

> ⚠️ **Skill 不是越多越好**：超过 15 个 Skill 后，AI 的匹配准确率开始下降。定期清理不常用的 Skill。

---

## 3.4 安装与配置实战命令

```bash
# === 社区 Skill 安装 ===

# 方式 1：插件市场（推荐）
/plugin install superpowers
/plugin install repomix
/plugin install ccusage

# 方式 2：手动克隆
git clone https://github.com/anthropics/superpowers.git ~/.claude/skills/superpowers
git clone https://github.com/yamadashy/repomix.git ~/.claude/skills/repomix

# 方式 3：CC Switch GUI
# 打开 CC Switch → Skills 面板 → 搜索 → 一键安装

# === 自定义 Skill 安装 ===

# 1. 创建 Skill 目录
mkdir -p ~/.claude/skills/api-generator

# 2. 编写 SKILL.md（参考 3.1 节模板）
# 3. 如果有辅助脚本
mkdir -p ~/.claude/skills/api-generator/scripts
mkdir -p ~/.claude/skills/api-generator/templates

# 4. 验证安装
# 在 Claude Code 对话中：列出你当前可用的 Skills
```

### 项目级 vs 用户级 Skill

```bash
# 用户级（所有项目共享）
~/.claude/skills/
├── api-generator/       # 通用的
├── sql-writer/          # 通用的
└── test-generator/      # 通用的

# 项目级（仅当前项目）
./claude/skills/
└── project-conventions/  # 项目特有的规范
```

> 💡 **最佳实践**：通用 Skill 放用户级，项目特有的 Skill（如特定框架规范、内部 API 约定）放项目级。

---

## 3.5 本章实战练习

- [ ] 编写你的第一个自定义 Skill（建议从 commit-generator 或 api-generator 开始）
- [ ] 为 Skill 编写至少 3 个测试场景，验证 AI 是否正确触发和执行
- [ ] 安装 Superpowers，完成一次完整的 brainstorming → plan → TDD → review 流程
- [ ] 确定你的角色（前端/后端/全栈/架构师），安装对应的 T1 核心 Skill
- [ ] 整理你的个人 AI 技能库清单（Skill 名称 + 用途 + 触发词）
- [ ] 编写一个项目级 Skill（如项目特定的代码规范检查）

---

> 📖 完成第 2 周学习后，进入 [[../03-AI-编码/00-AI Coding 学习计划|第 3 周：AI 编码工具全栈 + Vibe Coding]]——吃透四大主流 AI 代码助手，掌握自然语言编程范式。
