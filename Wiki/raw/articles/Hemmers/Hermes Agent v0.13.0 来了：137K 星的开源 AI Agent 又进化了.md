朗朗晴空 *2026年5月8日 08:49*

![图片](https://mmbiz.qpic.cn/sz_mmbiz_jpg/8hibj2yDAY7Obib7jqenhdk7ovBFOJtptZzLibcYxaMeDHgJQfbdfics8RvX7pnX1VO1a9us2hITQRib5getXMlM5TPoI8OZtDogzCOcdf3Fmtgc/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

开源工具 ·

KEY TAKEAWAY

Hermes Agent v0.13.0 带来了多 Agent Kanban 看板协作、跨轮目标追踪 /goal、视频理解、语音克隆、20 个消息平台全覆盖。一周 295 位贡献者、864 次 commit，是目前最活跃的开源 AI Agent 框架。升级只需一条命令，已经在用的人建议立刻更新。

137K

GitHub Stars

864

Commits / 周

295

贡献者 / 周

小白先看懂：这是干什么的

Hermes Agent，说白了就是一个能自己住在一台服务器上的 AI 管家。它不是那种你问一句它答一句的聊天机器人，而是一个可以独立执行任务的系统：它能记住你是谁、能自己学会新技能、能跨平台收发消息、能定时干活、能并行处理多个任务。

●　 **给谁用** — 开发者、AI 创业者、需要自动化工作流的团队

●　 **核心能力** — 一个 CLI + 消息网关，你通过 Telegram / Discord / 微信给它下指令，它在后台执行代码、查资料、写文件

●　 **典型场景** — 定时抓取竞品动态发到群里、自动编译 Obsidian 笔记生成播报、并行调查多个课题写报告

●　 **不适合谁** — 没有命令行经验、不想维护服务器、只想在网页上用 AI 的用户。初始配置有门槛。

137,554 ⭐ — 为什么它是增长最快的开源 AI Agent

截止 2026 年 5 月 8 日，Hermes Agent 在 GitHub 上获得 **137,554 颗星** 、21,184 个 Fork，是目前开源领域最受关注的自主 AI Agent 框架之一。从 2025 年 7 月首次提交至今不到一年，增长曲线在同类项目中极为罕见。

更值得关注的是社区活跃度。v0.12.0 到 v0.13.0 仅一周时间， **295 位社区贡献者** 提交了 864 个 commit，合并了 588 个 PR，解决了 282 个 Issue——其中 13 个 P0 级严重问题。这种参与度意味着项目已经从 Nous Research 团队的智力溢出，变成了真正的开源生态。

v0.13.0 核心新功能

▸　 **多 Agent Kanban** — 持久化任务看板，多个 Hermes 实例协作用于领取、执行、交付任务。内置心跳检测、僵尸进程清理、重试预算和幻觉拦截

▸　 **/goal 跨轮目标** — Agent 记住你要完成的目标，在多轮对话中持续推进，不需要重复提醒。对标经典 Ralph 循环

▸　 **video\_analyze 视频理解** — 在 Gemini 等支持视频的多模态模型上实现原生视频理解

▸　 **xAI Custom Voices 语音克隆** — 新增 TTS 提供商，支持语音克隆

▸　 **第 20 个消息平台** — 新增 Google Chat。至此覆盖 Telegram、Discord、Slack、WhatsApp、Signal、微信、QQBot、Feishu 等

▸　 **会话自动恢复** — Gateway 重启后自动恢复中断会话，不再丢进度

▸　 **写文件后自动 Lint** — write\_file 和 patch 后自动对 Python、JSON、YAML、TOML 做增量语法检查

安全加固：8 个 P0 漏洞

**重点** 　密钥自动脱敏默认开启、Discord 角色白名单限到服务器级（CVSS 8.1 跨 DM 绕过已关闭）、WhatsApp 默认拒绝陌生人、auth.json / MCP OAuth 时序竞争窗口关闭、Cron 扫描技能内容防注入。

升级方法

已经在用 Hermes 的用户，直接在终端执行：

```
hermes update
```

静默模式（跳过确认提示）：

```
hermes update --yes
```

全新安装（Linux / macOS / WSL2 / Termux）：

```
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/
scripts/install.sh | bash
```

社区信号与判断

Reddit 和 Discord 社区的主流评价是「功能密度极高、迭代速度快得离谱」。v0.12.0（Curator Release）上线仅一周就推出 v0.13.0，且 Kanban、/goal、Checkpoints v2 都是体系级功能，不是小修小补。

**值得注意的两个信号**

●　295 位社区贡献者 / 周意味着项目已不是单团队在主导，而是真正的开源生态在运转

●　588 个 PR 合并 / 周对代码质量是压力测试，但自动 lint 和增量安全检查在对冲风险

**适合立即试用** — 已有 VPS / 服务器的开发者，尤其已在用 OpenClaw 或 Claude Code 的用户（有自动迁移工具， `hermes claw migrate` ）

**暂时别折腾** — 没有命令行经验、不想维护服务器、只想在网页上用 AI 的用户

SOURCES

GitHub Releases v0.13.0 — https://github.com/NousResearch/hermes-agent/releases/tag/v2026.5.7

Hermes Agent Docs — https://hermes-agent.nousresearch.com/docs/

Hermes Agent GitHub — https://github.com/NousResearch/hermes-agent

Nous Research 公告 — https://x.com/NousResearch/status/2049956455982182593

ai 工作流 · 目录

作者提示: 内容由AI生成

继续滑动看下一个

极客BIM设计工坊

向上滑动看下一个