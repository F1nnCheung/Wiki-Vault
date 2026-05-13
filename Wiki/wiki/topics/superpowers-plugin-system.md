---
title: Superpowers 插件系统与多平台适配
type: topic
tags: [superpowers, plugin, cross-platform, codex, cursor, hook, versioning, contribution]
created: 2026-05-13
updated: 2026-05-13
sources:
  - raw/articles/Superpowers 深度实战指南：从入门到精通.md
related:
  - entities/superpowers.md
  - concepts/superpowers-design-philosophy.md
  - topics/claude-code-superpowers-workflow.md
  - topics/claude-code-skills-ecosystem.md
---

# Superpowers 插件系统与多平台适配

Superpowers 并非"每个平台一个独立插件工程"，而是 **同一套 `skills/` 与若干平台适配层** 的架构。本文深入拆解多平台适配的技术细节、跨平台钩子兼容方案、版本管理机制，以及贡献标准与适用场景判断。

## 多平台适配架构

### 统一模型

所有平台共享同一套 `skills/` 技能库，差异仅在于"如何把 `using-superpowers` 送进代理上下文"的装配层：

| 平台 | 接入形态 | 引导机制 |
|------|---------|---------|
| Claude Code | 插件清单 + SessionStart hook | `hooks/session-start` → JSON context |
| Codex CLI / Codex App | 同一个插件包，App 额外读取 UI 元数据 | 插件系统内置技能发现 |
| Cursor | 插件清单 + Cursor hook | `hooks-cursor.json` → `sessionStart` |
| OpenCode | Git 插件 + 运行时消息 transform | `.opencode/plugins/superpowers.js` → 消息变换 + 技能目录注册 |
| Gemini CLI | 扩展清单 + 上下文文件 | `GEMINI.md` → `@./skills/using-superpowers/SKILL.md` |
| GitHub Copilot CLI | 市场安装 + SDK 标准上下文注入 | 复用 `hooks/session-start` 的 SDK 标准输出格式 |
| Factory Droid | README 中声明的市场安装入口 | Droid 插件系统 |

### 配置层文件全景

```
superpowers/
├── .claude-plugin/          # Claude Code
│   ├── plugin.json
│   └── marketplace.json
├── .codex-plugin/           # Codex CLI/App 共享
│   └── plugin.json
├── .cursor-plugin/          # Cursor
│   └── plugin.json
├── .opencode/               # OpenCode
│   ├── INSTALL.md
│   └── plugins/
├── hooks/                   # 跨平台钩子层
│   ├── hooks.json           # Claude Code SessionStart
│   ├── hooks-cursor.json    # Cursor sessionStart
│   ├── session-start        # 核心启动脚本（Bash）
│   └── run-hook.cmd         # 跨平台包装器（Windows 兼容）
├── gemini-extension.json    # Gemini CLI
└── .version-bump.json       # 版本同步配置
```

## Bootstrap 路径回顾

详见 [[entities/superpowers#工作原理：三种 Bootstrap 路径|Superpowers 工作原理]]。三路径速览：

1. **路径 A（Hook 驱动）**：Claude Code / Cursor / GitHub Copilot CLI — `hooks/session-start` 读取 `using-superpowers` 技能正文，转义为 JSON 后嵌入 `<EXTREMELY_IMPORTANT>` 上下文
2. **路径 B（插件 Transform）**：OpenCode — 插件注册技能目录 + 消息变换注入 bootstrap
3. **路径 C（上下文文件引用）**：Gemini CLI — `GEMINI.md` 显式引用 `@./skills/using-superpowers/SKILL.md`

**核心结论**：`using-superpowers` 是所有平台共享的唯一行为入口；hook、插件 transform、context file 只是不同 harness 的装配层。

---

## Codex 插件特殊配置

Codex CLI 和 Codex App 共享同一个 `.codex-plugin/plugin.json` 插件包，但 Codex App 的 UI 会额外读取其中的 `interface` 字段来展示名称、分类、默认提示词、品牌色等信息：

```json
{
  "interface": {
    "displayName": "Superpowers",
    "shortDescription": "Planning, TDD, debugging, and delivery workflows",
    "category": "Coding",
    "capabilities": ["Interactive", "Read", "Write"],
    "defaultPrompt": [
      "I've got an idea for something I'd like to build.",
      "Let's add a feature to this project."
    ],
    "brandColor": "#F59E0B"
  }
}
```

关键字段说明：

| 字段 | 用途 |
|------|------|
| `displayName` | Codex App UI 中展示的插件名称 |
| `shortDescription` | 插件列表中的一句话描述 |
| `category` | 分类标签（`Coding` 表示出现在编码类插件区） |
| `capabilities` | 声明插件所需的权限（读/写/交互） |
| `defaultPrompt` | 安装后为用户提供的"快速开始"提示词模板 |
| `brandColor` | 品牌色（`#F59E0B` 琥珀色），用于 UI 中的视觉标识 |

> Codex CLI 不渲染 UI 元数据，仅使用 `plugin.json` 中的技能注册和 bootstrap 逻辑。

---

## 跨平台钩子兼容：`run-hook.cmd`

### 设计问题

`hooks/session-start` 是 Bash 脚本，但 Windows 默认不包含 Bash。如果直接在 Windows 上调用 `.sh` 文件，某些环境会对扩展名做错误预处理。Superpowers 的解决方案是 `run-hook.cmd`——一个 **多语言脚本**，在 Windows 上作为 batch 文件运行，在 Unix 上作为 bash 脚本运行。

### 脚本机制

```
: << 'CMDBLOCK'
@echo off
REM Windows: 找到 bash 并执行
if exist "C:\Program Files\Git\bin\bash.exe" (
    "C:\Program Files\Git\bin\bash.exe" "%HOOK_DIR%%~1" ...
)
CMDBLOCK

# Unix: 直接执行
exec bash "${SCRIPT_DIR}/${SCRIPT_NAME}" "$@"
```

核心技巧：
- `: << 'CMDBLOCK'` 在 Bash 中是 heredoc 的开始标记，`CMDBLOCK` 是结束标记——之间的内容（Windows batch 代码）被 Bash 忽略
- 在 Windows CMD 中，`: << 'CMDBLOCK'` 尝试跳转到 `<<` 标签（失败但不报错），接着执行 `@echo off` 及之后的 batch 代码
- `CMDBLOCK` 在 CMD 中作为 goto 标签，之后的 Unix 代码被跳过

### 关键细节：静默退出 0

如果 Windows 上完全找不到 bash，脚本会 **静默退出 0**：

```
if exist "C:\Program Files\Git\bin\bash.exe" (
    ...
)
REM 找不到 bash → 静默退出
```

这意味着：
- 插件不会崩溃、不会报错
- 但 **SessionStart 上下文注入能力完全丧失** —— `using-superpowers` 技能不会被注入，代理行为将退回到默认模式
- 排查时需确认 `run-hook.cmd` 能找到 bash（通常通过 Git for Windows 安装）

### Hook 配置文件

Claude Code 的 `hooks/hooks.json`：

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "startup|clear|compact",
        "hooks": [
          {
            "type": "command",
            "command": "\"${CLAUDE_PLUGIN_ROOT}/hooks/run-hook.cmd\" session-start",
            "async": false
          }
        ]
      }
    ]
  }
}
```

- `matcher: "startup|clear|compact"` — 会话启动、清除、压缩三种事件都触发重新注入
- `async: false` — 必须同步等待 hook 完成，确保技能上下文在代理开始工作前就位

> Cursor 使用 `hooks/hooks-cursor.json`，结构类似但事件名为 `sessionStart`。

---

## 版本管理

### `bump-version.sh` 脚本

`scripts/bump-version.sh` 负责跨所有配置文件的版本同步。三个命令：

```bash
# 查看当前版本
./scripts/bump-version.sh --check

# 更新所有配置文件到指定版本
./scripts/bump-version.sh 5.2.0

# 审计：检查是否有遗漏的版本字符串（未在 .version-bump.json 中声明）
./scripts/bump-version.sh --audit
```

### `.version-bump.json` 配置文件

声明了哪些文件的哪个字段包含版本号——当前覆盖 6 个文件：

```json
{
  "files": [
    { "path": "package.json",                          "field": "version" },
    { "path": ".claude-plugin/plugin.json",             "field": "version" },
    { "path": ".cursor-plugin/plugin.json",             "field": "version" },
    { "path": ".codex-plugin/plugin.json",              "field": "version" },
    { "path": ".claude-plugin/marketplace.json",        "field": "plugins.0.version" },
    { "path": "gemini-extension.json",                  "field": "version" }
  ]
}
```

**关键点**：
- 版本号分散在 6 个不同文件的不同 JSON 路径中，手动修改极易遗漏
- `marketplace.json` 的版本路径是 `plugins.0.version`（数组嵌套），而非顶层 `version`
- `--audit` 命令用于检测是否有文件包含版本号字符串但未被 `.version-bump.json` 声明（防止配置漂移）
- 版本号在所有平台间同步——一次 `bump-version.sh` 即可确保 Claude Code、Cursor、Codex、Gemini 四平台版本一致

---

## 贡献指南与质量标准

### PR 模板要求

每个 PR 必须填写完整的模板，包含以下检查项：

1. **解决什么问题** — 必须是真实经历的问题，不能是推测性的
2. **PR 改变了什么** — 具体的文件变更和逻辑说明
3. **是否适合核心库** — 评估是否应进入主仓库还是作为个人技能
4. **考虑了哪些替代方案** — 展示设计思考过程
5. **是否包含多个不相关的变更** — 单一 PR 原则
6. **Existing PRs 检查** — 必须查看 open 和 closed PRs，避免重复工作
7. **测试环境表格** — 列出测试过的平台和版本
8. **新 harness 的完整验收 transcript**（如适用）— 完整会话记录
9. **评估结果** — 前后对比数据
10. **技能改动的 rigor / adversarial testing 声明** — 是否经过对抗性测试
11. **人类审查清单** — 供 reviewer 逐项检查

### 项目拒绝标准

以下类型的 PR 会被直接拒绝（共 9 条红线）：

| # | 拒绝类型 | 说明 |
|---|---------|------|
| 1 | 添加第三方依赖 | Superpowers 仅由 Markdown + Shell 组成，不引入外部依赖 |
| 2 | 为"合规"重构技能 | 无实际行为改进的纯粹格式调整 |
| 3 | 项目/个人特定配置 | 通用框架不接受特定项目的硬编码 |
| 4 | 批量/喷洒式 PR | 一次 PR 应聚焦一个明确问题 |
| 5 | 推测性修复 | "可能会出问题"的修复，而非"已经出问题"的修复 |
| 6 | 领域特定技能 | 仅适用于特定领域（如前端/后端/数据）的技能不进核心库 |
| 7 | Fork 特定变更 | 针对某个 fork 而非上游的修改 |
| 8 | 捏造内容 | 未经验证的声明或虚假数据 |
| 9 | 捆绑不相关变更 | 一个 PR 包含多个无关的修改 |

### 新平台集成验收测试

新增平台支持必须通过统一的验收测试：

> 在新平台中打开干净会话，发送 "Let's make a react todo list"，**brainstorming 技能必须自动触发**。

要求提供完整的会话记录（transcript）作为证据。这个测试确保：
- 平台引导机制正常工作（bootstrap 上下文已注入）
- `using-superpowers` 入口技能被正确加载
- 代理能够根据描述自动命中正确的技能

---

## 适用与不适用场景

### 适用场景

- 需要 AI 代理长时间自主工作的项目
- 需要高质量代码输出的团队（TDD + 审查 + 验证三层保障）
- 需要可预测、可审查的代理行为的工作流
- 多平台协作场景（一套方法论统一不同代理平台的行为）

### 不适用场景

- **快速原型**：brainstorming 流程会增加前期时间，与快速迭代目标冲突
- **单文件脚本**：工作流开销大于脚本本身的价值
- **不支持 bootstrap 上下文注入或技能发现机制的代理平台**：Superpowers 依赖平台具备"在会话启动时注入额外上下文"的能力
- **短期/一次性任务**：14 个技能的完整闭环更适合长期项目

### 判断指南

```
这个项目会持续多久？
├── < 1 天 → 不装 Superpowers（开销不值得）
├── 1 天 - 1 周 → 选择性使用核心技能（brainstorming + TDD + verification）
└── > 1 周 或 多人协作 → 完整安装（14 个技能全量）
```

---

## 延伸阅读

- [[entities/superpowers|Superpowers]] — 框架全貌、14 个技能详解、安装配置
- [[concepts/superpowers-design-philosophy|Superpowers 设计哲学]] — 铁律 + 硬门控 / 合理化防范 / 人的搭档 / CSO
- [[topics/claude-code-superpowers-workflow|Superpowers + gstack 工作流]] — 完整开发闭环与实战
- [[topics/claude-code-skills-ecosystem|Skills 生态系统]] — Skill 生态全景
