---
title: "Hermes Agent 从入门到精通 V1.2：2026年最值得学的 AI Agent 框架"
source: "https://mp.weixin.qq.com/s/7yAXf9pjBf5-IQy7dR505w"
author:
published:
created: 2026-05-08
description: "点击查看详情......"
tags:
  - "clippings"
---
*2026年5月7日 14:00*

## Hermes Agent 入门到精通 V1.2：2026年最值得学的 AI Agent 框架

### 前言：为什么 Hermes Agent 最近这么火？

2026 年 4 月 13 日，Hermes Agent 发布了 **v0.9.0** （v2026.4.13），被称为"全平台出击"版本——支持微信、iMessage、安卓（Termux），手机终于能跑了。

这个版本还带来了 **487 个 commit、269 个 PR 合并、167 个 issue 解决** ，是迄今最大一次更新。

它最大的标签是： **会自我进化的 AI Agent** 。

每次帮你完成任务后，它会自动总结经验，下次遇到类似的事做得更好。传统的 AI 助手每次对话都是从零开始，Hermes 不是。

---

## 一、十分钟安装：命令行一行搞定

支持 Linux、macOS、Windows（WSL2）、安卓（Termux）。

Bash

```
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

装完之后：

Bash

```
source ~/.bashrc    # 生效hermes              # 启动！
```

• *注意* ：Windows 用户要先装 WSL2，原生 Windows 不支持。

---

## 二、第一步：选一个模型

Hermes v0.9.0 支持 **20+ 种模型提供商** ，主流的：

| 提供商 | 说明 | 特点 |
| --- | --- | --- |
| Nous Portal | Nous 自家订阅服务 | 零配置，OAuth 登录 |
| OpenAI (Codex) | GPT-5.4、GPT-4o、GPT-4 系列 | 生态成熟，Fast Mode 加速 |
| Anthropic (Claude) | Claude 4.1/4.0 系列 | 推理能力强，Fast Mode 加速 |
| xAI (Grok) | Grok-3/2/1 | v0.9.0 新增官方支持 |
| 小米 MiMo | MiMo 系列 | v0.9.0 新增，国内可用 |
| OpenRouter | 聚合 200+ 模型 | 最灵活 |
| 硅基流动 / Kimi | 国内可用 | 便宜 |
| DeepSeek | DeepSeek 系列 | 性价比高 |
| 自建模型 (Ollama/vLLM) | 本地或私有部署 | 完全可控 |

配置命令：

Bash

```
hermes config set OPENAI_API_KEY=sk-xxxhermes config set ANTHROPIC_API_KEY=sk-ant-xxx
```

---

## 三、连接平台：16 个平台，总有一个你在用

v0.9.0 支持 **16 个平台** ，涵盖国内外主流消息渠道：

### 海外平台

| 平台 | 命令 | 说明 |
| --- | --- | --- |
| Telegram | `/platform add telegram` | 最推荐，稳定 |
| Discord | `/platform add discord` | 服务器场景 |
| WhatsApp | `/platform add whatsapp` |  |
| Signal | `/platform add signal` | 隐私优先 |
| Slack | `/platform add slack` | 团队协作 |
| Matrix | `/platform add matrix` | 开源去中心化 |
| Email | `/platform add email` | SMTP/IMAP |
| iMessage | `/platform add bluebubbles` | v0.9.0 新增，苹果生态 |
| SMS | `/platform add sms` | Twilio |

### 国内平台

| 平台 | 命令 | 说明 |
| --- | --- | --- |
| 飞书 | `/platform add feishu` |  |
| 企业微信 | `/platform add wecom` | v0.9.0 优化 |
| 微信 | `/platform add wechat` | v0.9.0 新增，iLink Bot API |
| 钉钉 | `/platform add dingtalk` |  |
| 公众号回调 | `/platform add wechat-callback` |  |

• *微信接入（v0.9.0 新功能）：*

Bash

```
hermes platform add wechat --appid your_appid --appsecret your_secret
```

---

## 四、v0.9.0 核心新功能详解

### 4.1 Fast Mode — 低延迟加速

`/fast` 命令让 OpenAI 和 Anthropic 模型走优先队列，延迟显著降低：

Bash

```
/fast    # 开启 FastMode/fast off  # 关闭
```

支持：GPT-5.4-Pro、Codex、Claude 4.1 等 OpenAI 优先处理模型 + Anthropic 快速档。

### 4.2 本地 Web Dashboard

启动浏览器管理界面，不用改配置文件：

Bash

```
hermes dashboard
```

可以管理：设置、Session 历史、Skill 浏览、Gateway 配置。

### 4.3 后台进程监控（watch\_patterns）

让 Hermes 监控后台进程输出，符合条件时自动通知：

Bash

```
/hermes watch "error" --platform telegram/hermes watch "listening on port" --platform discord
```

### 4.4 可插拔 Context Engine

用 `hermes plugins` 插入自定义上下文引擎：

Bash

```
hermes plugins install my-context-filterhermes plugins list
```

可以控制 Agent 每轮看到什么内容，做领域过滤、摘要注入等。

### 4.5 微信接入（WeChat）

v0.9.0 支持通过 iLink Bot API 接入微信：

Bash

```
hermes platform add wechat --appid xxx --appsecret xxx
```

支持：流式光标、媒体上传、Markdown 链接处理、原子状态持久化。

### 4.6 iMessage（BlueBubbles）

苹果生态用户终于能用 iMessage 了：

Bash

```
hermes platform add bluebubbles --server-url http://your-bluebubbles-server
```

v0.9.0 支持：自动 webhook 注册、设置向导集成、崩溃恢复。

### 4.7 安卓/Termux 支持

手机上跑 Hermes：

Bash

```
# 在 Termux 里curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bashsource ~/.bashrchermes
```

/image 命令在手机上也能用。

### 4.8 备份与迁移

Bash

```
hermes backup            # 完整备份配置、Session、Skill、Memoryhermes import backup.tar.gz  # 跨机器迁移
```

---

## 五、Skill 系统：让 Agent 做专业的事

Hermes 的 Skill 来自两个生态： **官方 Skill** 和 **社区 Skill** 。

### 官方 Skill（内置）

Bash

```
/hermes skills list         # 查看已安装/hermes skills enable web    # 启用网页搜索
```

### 社区 Skill（安装）

Bash

```
hermes skills install https://github.com/user/awesome-skill
```

---

## 六、从 OpenClaw 迁移过来

如果你已经在用 OpenClaw，Hermes 官方给了迁移工具：

Bash

```
hermes claw migrate --dry-run    # 预览会迁移什么hermes claw migrate --preset full --yes   # 执行迁移
```

• *能迁移的：*

•✅ MEMORY.md、SOUL.md、USER.md

•✅ Skill 配置

•✅ 模型 API Key

•✅ Telegram / Discord 等海外平台配置

• *不能迁移、需要重建的：*

•⚠️ 飞书 / 企业微信（接入方式不同）

•⚠️ Cron 定时任务

•⚠️ 自定义插件

---

## 七、v0.8.0 → v0.9.0 升级指南

如果你已经在用 Hermes：

Bash

```
hermes self-updatehermes version   # 确认 v0.9.0
```

• *v0.9.0 主要变化：*

| 变化 | 说明 |
| --- | --- |
| Fast Mode | `/fast`  优先队列，需要重新开启 |
| 微信支持 | 新增，需要重新配置 |
| iMessage 支持 | 新增，BlueBubbles 配置不同 |
| Dashboard | 新增，之前用 config 文件的可以改用 UI |
| watch\_patterns | 新后台监控命令 |
| 平台数 | 12 → 16 个 |

---

## 八、选型参考

| 你的情况 | 建议 |
| --- | --- |
| 主要用飞书 / 企业微信 | OpenClaw 更成熟 |
| 想让 AI 越用越懂你 | Hermes 的学习循环是核心差异 |
| 需要 20+ 平台接入 | Hermes（16平台 vs OpenClaw 更多） |
| 想完全开源 | Hermes |
| 想在手机上跑 | Hermes（Termux 支持） |
| 想快速接入微信 | Hermes v0.9.0 原生支持 |
| 需要企业级后台管理 | Hermes Dashboard 更直观 |

---

## 一句话总结

> **Hermes Agent v0.9.0 是一个会自我进化的 AI Agent，支持 20+ 模型、16 个平台、手机上能跑、完全开源。微信和 iMessage 的加入让它补全了国内生态最重要两块拼图**

来源：猿码，侵权联系我们，马上删除！

继续滑动看下一个

AI学霸

向上滑动看下一个