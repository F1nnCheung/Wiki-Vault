---
title: "给 Claude Code 接上 Playwright MCP：让它不只写代码，还能自己验页面"
source: "https://mp.weixin.qq.com/s/4FnqX_H5ZShNVVpb3ue3cA"
author:
  - "[[大鹏数智]]"
published:
created: 2026-05-08
description: "给 Claude Code 接上 Playwright MCP 后，它不只是写代码，还能打开页面、点按钮、做一次浏览器验收。"
tags:
  - "clippings"
---
大鹏数智 *2026年4月28日 18:09*

Claude Code 最容易被低估的一点，是它不应该只停在“写代码”。

如果它写完一个前端改动，只能把 diff 扔给你看，那它还是半个工程助手。

真正更有意思的用法，是让它写完之后顺手打开页面、点按钮、看表单、跑一次浏览器验收。

这就是 Playwright MCP 的价值。

Playwright MCP 是 Microsoft 做的 Playwright Model Context Protocol server。它把浏览器自动化能力通过 MCP 暴露给 AI 工具，让 Claude 这类模型可以基于页面结构和 accessibility snapshot 操作真实网页。

换句话说，Claude Code 不只是“猜页面长什么样”，而是能看见页面结构、点击元素、填写表单、检查结果。

● ● ●

## 一、为什么 Claude Code 需要浏览器能力

很多前端 bug，只看代码不够。

比如：

- 按钮是不是被遮住了
- 表单校验文案有没有出现
- 登录后路由有没有跳对
- 弹窗是不是在移动端溢出
- 某个 aria role 是否能被识别

这些问题，单靠读文件很容易漏。

Claude Code 可以写组件、改样式、补测试，但如果没有浏览器能力，它对“页面实际效果”的判断还是间接的。

Playwright MCP 补的就是这一层。

它不是替代 Playwright 测试，而是让 Claude Code 在开发过程中多一个“现场验收工具”。

● ● ●

## 二、怎么接入

官方 Playwright MCP 文档给出的方向很明确：它是一个 MCP server，可以给 VS Code、Cursor、Windsurf、Claude Desktop 以及其他 MCP client 使用。

在 Claude Code 里，思路也是一样：把 Playwright MCP 配成一个 MCP server，让 Claude Code 可以调用它。

典型命令形态类似：

```
npx @playwright/mcp@latest
```

如果你的 Claude Code MCP 配置支持 `stdio` server，可以把它写成类似结构：

```
{   "mcpServers": {     "playwright": {       "command": "npx",       "args": ["@playwright/mcp@latest"]     }   } }
```

不同客户端配置文件位置会不一样，关键不是照抄路径，而是确认三件事：

1. 01
	MCP server 能启动。
2. 02
	Claude Code 能看到 playwright 工具。
3. 03
	打开一个测试页面后，Claude Code 能拿到页面快照并执行点击/输入。

● ● ●

## 三、一个可复制的验收流程

假设你正在改一个登录页，不要只让 Claude Code 写代码。

可以这样要求：

```
请完成登录页错误提示优化。 完成后使用 Playwright MCP 打开本地页面，测试三件事： 1. 空密码提交时出现错误提示。 2. 错误提示文案符合设计稿。 3. 修复没有影响正常登录按钮状态。 最后给出修改文件、浏览器验收步骤和剩余风险。
```

这比“帮我改一下登录页”稳得多。

因为它把交付标准从“代码改了”变成“页面行为被验证了”。

Claude Code 接上 Playwright MCP 后，可以在同一个任务里完成：

```
读代码 → 修改 → 启动本地服务 → 打开页面 → 操作页面 → 根据结果再修 → 输出报告
```

这才是 coding agent 该有的闭环。

● ● ●

## 四、它适合做什么

Playwright MCP 特别适合这些场景：

- 表单验证
- 登录/注册流程
- 管理后台按钮操作
- 页面跳转检查
- 弹窗、抽屉、Toast 验证
- 可访问性结构检查
- 生成 Playwright 测试前的探索

它不只是“自动点击浏览器”。

它更像是让 Claude Code 先用浏览器理解页面，再决定怎么写测试或怎么改代码。

这能减少一种常见问题：AI 直接生成一段看起来很标准的 Playwright 测试，但 selector 全是猜的，跑起来很脆。

有了实际页面快照，测试更容易贴近真实 DOM。

● ● ●

## 五、什么时候不要用

也不是所有任务都应该上 Playwright MCP。

不适合的场景：

- 纯后端逻辑修改
- 没有页面交互的工具库
- 本地服务启动成本很高
- 页面依赖真实账号、支付、短信验证码等敏感流程
- 你还没有隔离测试环境

尤其是涉及真实账号和真实支付时，不要让 Agent 随便点。

可以给它测试账号、mock 环境、只读后台，或者明确禁止提交类动作。

浏览器能力越强，边界越要写清楚。

● ● ●

## 六、建议加到 CLAUDE.md 里

如果你的项目长期使用 Claude Code + Playwright MCP，我建议在 `CLAUDE.md` 里写一段：

```
## Browser QA with Playwright MCP  - 本地页面启动命令：pnpm dev - 默认测试地址：http://localhost:3000 - 可以使用 Playwright MCP 做页面验收。 - 禁止在生产环境执行写入操作。 - 涉及支付、删除、发消息、真实用户数据时必须先询问。 - 前端改动完成后，至少验证相关页面能打开，关键按钮能点击，错误提示能出现。
```

这段配置的目的，是让 Claude Code 知道什么时候该用浏览器，什么时候必须停下。

● ● ●

## 七、我的判断

Playwright MCP 不是一个“装了就万事大吉”的神器。

它真正的价值，是把 Claude Code 的交付从代码层推进到页面行为层。

以前你可能只能问：代码改了吗？

现在可以问：页面验了吗？按钮点了吗？错误提示出现了吗？

对于前端项目、管理后台、SaaS 控制台，这个差别非常大。

最后一句话：Claude Code 接上 Playwright MCP 后，最值得做的不是让它多写几段测试，而是让它形成一个习惯——写完代码，自己去浏览器里看一眼。

**微信扫一扫赞赏作者**

继续滑动看下一个

大鹏数智

向上滑动看下一个