---
title: gstack
type: entity
tags: [gstack, toolchain, deployment, browser, execution]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/Claude Code/实战篇 Claude Code + superpowers + gstack 开发流程实录，可直接复制使用，一篇文章讲清楚！.md
  - raw/articles/Claude Code/别再给Claude Code乱装Skill了，推荐这8个.md
related:
  - entities/superpowers.md
  - entities/claude-code.md
  - topics/claude-code-superpowers-workflow.md
---

# gstack

gstack 是 Y Combinator 合伙人 Garry Tan 开发的一套 Claude Code 执行工具链，将日常工程操作封装为一键命令。与 Superpowers（思考层）配合，形成「大脑+手脚」双插件体系。

GitHub: github.com/garrytan/gstack

## 定位

> Superpowers 是大脑，gstack 是手脚。

- Superpowers 只约束"怎么想"（方法论），不写代码、不跑浏览器、不发布
- gstack 封装"怎么做"（执行工具），提供一键命令

## 核心命令

| 命令 | 功能 | 类别 |
|---|---|---|
| `/browse` | 唯一浏览器入口，打开页面→验证→截图→报告 | 验证 |
| `/qa` | 端到端质量检测 | 验证 |
| `/design-review` | UI QA：视觉一致性、响应式、对比度 | 验证 |
| `/ship` | 发布流水线：测试→version bump→CHANGELOG→commit→push→PR | 发布 |
| `/land-and-deploy` | 合 PR→等 CI→等部署→生产健康检查 | 发布 |
| `/canary` | 上线后监控 30 分钟，确认无 regression | 发布 |
| `/document-release` | 更新 README 和 CHANGELOG | 发布 |
| `/retro` | 周工程回顾：分析 commit 历史、代码质量趋势 | 回顾 |
| `/careful` | 危险命令护栏：先确认再执行 | 安全 |
| `/freeze` | 将文件操作限定在沙箱目录 | 安全 |
| `/guard` | `/careful` + `/freeze` 组合 | 安全 |

## 五条铁律

1. **浏览器只走 `/browse`**：禁用底层 MCP 浏览器原语
2. **作者不能审自己的代码**：verification 和 code-review 必须是两个独立上下文
3. **没证据不算完成**：测试跑了吗？截图有了吗？QA 报告绿色吗？三缺一不算
4. **歧义先 brainstorm**：任何创造性工作前先调用 Superpowers 的 brainstorming
5. **危险命令先 `/careful`**：rm -rf / DROP TABLE / force-push 一律先走护栏

## 不适合的场景

- 纯后端库/SDK 开发（gstack 的浏览器/QA/设计审查用不上）
- 无正规 CI/PR 发布流程的小团队
- 追求极简的资深开发者（可选只装 gstack，Superpowers 按需触发）
