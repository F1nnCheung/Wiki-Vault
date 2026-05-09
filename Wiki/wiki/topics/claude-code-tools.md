---
title: Claude Code 辅助工具
type: topic
tags: [claude-code, tools, hud, understand-anything, knowledge-graph]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/claude/Claude HUD - 让 Claude Code 状态一目了然.md
  - raw/articles/claude/Claude Code 神器来了！Understand-Anything 用知识图谱彻底搞懂代码库.md
related:
  - entities/claude-code.md
  - topics/claude-code-getting-started.md
---

# Claude Code 辅助工具

## Claude HUD：终端状态栏

### 解决什么痛点

- 不知道上下文用了多少 → 快溢出了才发现
- 不知道 AI 在用哪些工具 → 盲等
- 不知道任务进度 → 无法估时
- 不知道会话运行了多久 → 成本失控

### 显示内容

```
[Opus | Max] │ my-project git:(main*)
Context █████░░░░░ 45% │ Usage ██░░░░░░░░ 25% (1h 30m / 5h)
```

**可选视图**：
- 工具活动：`◐ Edit: auth.ts | ✓ Read ×3 | ✓ Grep ×2`
- 代理跟踪：`◐ explore [haiku]: Finding auth code (2m 15s)`
- 待办进度：`▸ Fix authentication bug (2/5)`

### 安装

```bash
/plugin marketplace add jarrodwatts/claude-hud
/plugin install claude-hud
/claude-hud:setup         # 立即显示，无需重启
/claude-hud:configure     # 交互式配置
```

**三种预设**：Full（全部启用）、Essential（精简）、Minimal（极简）

### 技术原理

- 使用 Claude Code 原生 **statusline API**（非估算，是真实数据）
- 解析 transcript JSONL 获取工具/代理活动
- 每 300ms 刷新，兼容任何终端，无需 tmux
- GitHub 4.3k Stars

---

## Understand-Anything：代码库知识图谱

### 一句话概括

通过 6 个专业 Agent 协作分析代码库，生成**交互式知识图谱**——点击节点看 LLM 摘要，双击展开代码和调用关系，自然语言问答定位功能模块。

### 六 Agent 流水线

1. **Project Scanner**：扫描目录、识别技术栈
2. **File Analyzer**：并行分析文件，LLM 生成摘要
3. **Architecture Analyzer**：识别架构层次和数据流
4. **Tour Builder**：生成多角色定制导览
5. **Graph Reviewer**：验证图谱完整性
6. **Domain Analyzer**：提取业务领域知识

### 核心命令

```bash
/plugin marketplace add Lum1104/Understand-Anything

/understand              # 全量分析（首次 1-5 分钟）
/understand-dashboard    # 启动交互看板
/understand-chat "问题"   # 自然语言问答
/understand-diff         # 增量更新（只分析变更）
```

### 关键特性

- **基于结构化图谱**而非全文检索，回答准确性和上下文连贯性更高
- **Git 增量分析**：只分析变更部分，无需全量重扫
- **多平台支持**：Claude Code、Cursor、VS Code、Codex、Gemini CLI 等 9 大平台
- GitHub 12.9k Stars，MIT 许可证

### 局限

- 首次运行消耗大量 Token
- 超大图谱（3,000+ 节点）可能导致浏览器冻结

---

## 辅助工具全景

| 工具 | 用途 | 推荐度 |
|---|---|---|
| Claude HUD | 实时会话状态监控 | ⭐⭐⭐⭐⭐ |
| Understand-Anything | 代码库知识图谱 | ⭐⭐⭐⭐ |
| ccusage | Token 消耗实时显示 | ⭐⭐⭐⭐ |
| Repomix | 仓库打包为一个文件 | ⭐⭐⭐⭐ |
| Claude Mem | 长期跨会话记忆 | ⭐⭐⭐ |
