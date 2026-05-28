---
title: Claude Code Skills 分级推荐
type: topic
tags: [claude-code, skills, recommendations, frontend, backend, superpowers, gstack]
created: 2026-05-28
updated: 2026-05-28
sources:
  - raw/articles/Claude Code/Claude Code十一个常用Skill推荐（含各职业最佳Skill）.md
related:
  - entities/claude-code.md
  - topics/claude-code-skills-ecosystem.md
  - concepts/skills-concept.md
  - entities/superpowers.md
  - entities/gstack.md
---

# Claude Code Skills 分级推荐

> 裸用 Claude Code 是一个全能但粗糙的通用工具——缺乏领域知识、缺乏工作流纪律、缺乏对专业质量的判断力。Skills 就是解决"粗糙"的那套东西。本文按五级梯队 + 8 种角色，给出经过高频开发者实测的推荐方案。

## Skills 的本质：不只是 Markdown

Anthropic 工程师说过一句很直白的话：**Skills 是一个常见的误解，大家以为它们只是 Markdown 文件。** 真正的 Skill 是一个文件夹，装着四样东西：

```
my-skill/
├── SKILL.md       # 必须：元数据 + 核心执行指令（指挥中心）
├── scripts/       # 可选：可被直接调用的 Python/Bash 脚本（动手能力）
├── references/    # 可选：补充规则、格式标准、API 签名（资料库）
└── assets/        # 可选：模板、样例数据、品牌色板（标准答案）
```

### 渐进式披露：装了 50 个 Skill 也不吃上下文

传统 Agent 是把所有工具说明书一次性塞进上下文——7 个 MCP 就能占 9.87 万 Token。Skills 的渐进式披露完全逆转了这个逻辑：

1. 启动时只加载每个 Skill 的 `name` 和 `description`（约 **100 Token/个**）
2. 任务匹配到某个 Skill 后才加载 `SKILL.md` 正文（推荐 ≤5000 Token）
3. 正文引用的外部资源（脚本、模板）只在执行到对应步骤时才被调用

> 装了 50 个 Skill 也只在启动时占约 5000 Token，而不是 50 本手册同时摊开在上下文里。

### Skills vs MCP

| 维度 | Skills | MCP |
|------|--------|-----|
| 解决什么 | **怎么把这个工具用对** | 我能调什么工具 |
| 比喻 | 副驾驶 | 飞行员 |
| 你会因为副驾驶认识路，就把飞行员炒掉吗？不会。两者互补，不可互替。 |

---

## 三条必备命令

```bash
# 安装：从 skills.sh 注册表安装
npx skills add vercel-labs/agent-skills --skill frontend-design

# 全局安装（所有项目可用）
npx skills add vercel-labs/agent-skills --skill frontend-design -g

# 查看已安装
npx skills list -g

# 检查更新
npx skills check

# 一键升级
npx skills update

# 搜索
npx skills find podcast
```

全局 Skill 路径 `~/.claude/skills/`，项目级 `./.claude/skills/`，互不冲突。

---

## 第一梯队：生态基础设施（4 个，所有人必装）

前三个现在就该装，第四个等你遇到第 8 个想装的 Skill 时再回来。

### 1. superpowers — 强制工程纪律门禁

**GitHub 170K+ Stars，Claude Code 核心贡献者 Jesse Vincent 开源。**

不给任何新能力，而是给 Claude Code 套上一整套强制执行的工程门禁。核心理念：**不让 AI 跳过任何一个不可妥协的工程纪律。** 9 大子技能覆盖从头脑风暴到审查合并的全工作流——其中 brainstorming 在写代码前强制苏格拉底式追问，writing-plans 把需求拆成 5-10 个可验证原子步骤，executing-plans 严格逐步验证，test-driven-development 强制先写会失败的测试。

```bash
npx skills add https://github.com/obra/superpowers
```

> ⚠️ 微型任务（单文件、半小时内）关掉它，只留原生 Claude Code 更省 Token。

### 2. find-skills — Skills 生态的第一把钥匙

**安装量最高，上线 4 天破 5.2 万。** 元技能——自己什么活都不干，但有了它你再也不用手动翻页找技能。对 Claude Code 说"帮我找个做浏览器自动化的 Skill"，它自动搜索、按安装量排序、列出最优选项、帮你装好。

```bash
npx skills add vercel-labs/skills --skill find-skills -g
```

**建议全局安装**。从"我需要某领域的 Skill"到"它在干活了"，缩短 20 倍以上。

### 3. skill-creator — 把经验变成 AI 可复用资产

**Anthropic 官方出品。** 引导你走完从捕捉需求到创建 SKILL.md 到测试迭代的完整闭环。2.0 版本加入自动描述优化器——哪怕你写的 description 模糊得像"这东西帮我干点事"，也能帮你改写成可被 Agent 精确触发的版本。

```bash
npx skills add anthropics/skills --skill skill-creator -g
```

**建议全局安装**。

### 4. claude-mem — 跨会话长期记忆

长任务最怕：今天刚带 Claude 理顺复杂业务逻辑，明天新开会话它就变回"最熟悉的陌生人"。claude-mem 通过 SQLite + 向量数据库将项目决策、代码变动和技术讨论转化为可检索知识库。你可以直接问："上周重构支付模块时，我们最后决定的接口协议是什么？"

```bash
/plugin marketplace add thedotmack/claude-mem
```

> 中大型项目协作的"入场券"。

---

## 第二梯队：文档与数据处理（3 个）

只要工作中碰过 PDF、Excel、Word 任何一种，这梯队就是挡掉手工搬运的第一道墙。Anthropic 官方出品，底层精确格式控制——不是靠模型猜出来的排版。

### 5. pdf — 真正读懂 PDF 的内部表格

内置专业 PDF 解析逻辑，能从 300 页年报里自动抽出指定财务表格，保存为结构化数据。

```bash
npx skills add anthropics/skills --skill pdf
```

### 6. xlsx — Excel 全链路自动化

处理 `.xlsx`、`.xlsm`、`.csv`、`.tsv`——读取修改、数据清洗、制作图表、格式化转换。被设计为"只输出真正的 Excel 可操作工作表"。

```bash
npx skills add anthropics/skills --skill xlsx
```

### 7. docx — 生成的 Word 有自动目录和样式

生成自动目录、统一样式、页码自动对齐。所有格式变更直接操作底层 OOXML 指令，不经过文本转义层。没有这个 Skill 时，一份 8000 字文档可能烧掉数十万 Token 在格式调整上。

```bash
npx skills add anthropics/skills --skill docx
```

---

## 第三梯队：设计风格与视觉规范（2 个）

解决"AI 写的界面跑得通但一眼就能认出是 AI 写的"。

### 8. frontend-design — 用强势风格打穿万年蓝白灰

**skills.sh 前端大类第一。** 不教你写代码，而是逼 AI 在写代码之前先定设计方向——极简、复古未来还是粗野主义？在这个基调约束下逐组件执行。

```bash
npx skills add https://github.com/anthropics/skills --skill frontend-design
```

与 web-design-guidelines 一起装：一个管审美，一个管规范，互补不能互替。

### 9. web-design-guidelines — 300+ 条铁律

只做代码约束审查和专业交互规范——对比度合不合无障碍标准、响应式不同尺寸下组件是否叠合、按钮有无按压反馈。

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines
```

---

## 第四梯队：后端与工程自动化（2 个）

### 10. gstack — 23 个虚拟角色组成一个人的工程团队

**YC CEO Garry Tan 开源，60 天产出 60 万行生产代码（其中 35% 是测试）。** 23 个角色共享同一模型引擎但关注点彼此隔离：产品经理做需求澄清（`/office-hours`）、代码审查员逐行挑逻辑隐患（`/review`）、QA 在真实浏览器里点页面（`/qa`）。

```bash
git clone https://github.com/garrytan/gstack ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && chmod +x setup && ./setup
```

### 11. agent-browser — 让 AI 拥有"视觉"

**浏览器自动化赛道安装量最高。** AI 不再只能分析代码——直接打开无头浏览器，真的点击页面按钮、填写表单、做页面抓取。前端自动化回归与终端测试最被低估的基础设施。

```bash
npx skills add anthropics/skills --skill agent-browser
```

---

## 第五梯队：发布与交付

gstack 内置：
- `/land-and-deploy` — 自动合并分支、跑全部前置检查、打 PR 描述、部署
- `/make-pdf` — 架构图、进度文档一键转换成可分发 PDF

> **底层原则**：评判某个 Skill 是否值得安装，就看它是否能替代你日常重复执行的一套定型动作。每周出现两次以上，固化进 Skill 的收益远超 Token 开销。

---

## 按角色定制

| 角色 | 核心痛点 | 必装组合 |
|------|---------|----------|
| **前端开发** | AI 风格界面、无交互规范、适配崩坏 | `frontend-design` + `web-design-guidelines` + `agent-browser` + `gstack` |
| **后端开发** | 错误处理漏项、并发安全、API 无标准化 | `superpowers` + `gstack` + `claude-mem` + `docx` + `data-analysis` |
| **全栈开发** | 模块边界模糊、前后端数据契约无约束 | 前端组合 + 后端组合 + `data-analysis` 做数据一致性交叉验证 |
| **一人公司创始人** | 唯一技术负责人，没人为你想战略/做测试/做安全审计 | `superpowers` + `gstack`（重点跑 CEO 审查和安全审计） + `claude-mem` + `excalidraw-diagram` + `data-analysis` + `agent-browser` |
| **数据分析师** | 数据散乱、分析流程未标准化 | `data-analysis` + `xlsx` + `pdf` + `agent-browser` + `superpowers` |
| **产品经理/技术写作** | 产出质量波动大、竞品搜集靠手工 | `docx` + `pdf` + `excalidraw-diagram` + `brainstorming` + `agent-browser` + `frontend-design` |
| **DevOps/安全** | 部署链条断在没人盯的边缘环境 | `gstack`（部署与安全角色） + `superpowers` + `agent-browser` |
| **学生/新手** | 没工程习惯，代码"能跑就行" | `superpowers` + `data-analysis` + `find-skills` |

---

## 避开五个常见坑

1. **数量陷阱**：Anthropic 建议持有 20-30 个 Skill，实测日常高频触发的只有 5-7 个。装了 50 个 Skill 会把工具描述挤进上下文，挤出模型推理能力。

2. **路径陷阱**：装了 Skill 但 Claude Code 叫不出——因为你装到了 `.agents/skills/` 下，但 Claude Code 只识别 `.claude/skills/`。装完用 `npx skills list` 确认路径。

3. **安全陷阱**：Skills 生态全开源，2026 年已发现恶意 Skill（内置窃密和挖矿逻辑）。优先高安装量官方源，装前检查 GitHub 星标数和最后更新时间。

4. **版本陷阱**：热门 Skill 几周到几个月就切版本，`npx skills check` 每 2-3 周跑一次。

5. **闲置陷阱**：每个 Skill 启动时占约 100 Token，每季度做一次 Audit——过去三个月 0 触发的 Skill 直接删或移到 `~/.claude/skills-archive/`。

---

## 小结

裸用 Claude Code 的时候赶紧找 superpowers 替你在门口问清楚该回答的问题；用 find-skills 让你不至于在 Skill 海里扒拉一个晚上；Skill 不在于多，在于能在你每周重复两次以上的工作流里替你接住那些永远不变的琐碎。

> 📖 继续阅读：[[claude-code-skills-ecosystem|Skills 生态系统]] — Skills vs Slash 命令 vs MCP 的对比及 Skill 文件结构标准。
