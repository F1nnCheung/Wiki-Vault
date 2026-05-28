---
title: Hermes + Home Assistant 智能家居集成
type: topic
tags: [hermes, home-assistant, smart-home, natural-language, automation]
created: 2026-05-28
updated: 2026-05-28
sources:
  - raw/articles/Home Assistant/Hermes Agent + Home Assistant：用自然语言控制你的整个家.md
related:
  - entities/hermes-agent.md
  - entities/home-assistant.md
  - topics/hermes-configuration.md
---

# Hermes + Home Assistant 智能家居集成

> 将 Hermes Agent 的自然语言理解能力接入 Home Assistant 智能家居平台，实现「说话就能控制全家设备」的智能家居体验。不再需要记住设备名、场景名、实体 ID——用日常语言表达即可。

## 前提条件

| 条件 | 说明 |
|------|------|
| Home Assistant 已安装运行 | 任何安装方式（Docker/NAS/树莓派）均可 |
| Long-Lived Access Token | HA 用户配置中生成 |
| Hermes Agent 已安装 | v0.13+ 推荐 |
| 网络互通 | Hermes 能访问 HA 的 IP:8123 |

## 配置步骤

### 第一步：获取 HA Token

1. 打开 Home Assistant Web UI
2. 点击左下角用户头像
3. 滚动到底部 → 「Long-Lived Access Tokens」
4. 创建 token，复制保存（只显示一次）

### 第二步：配置 Hermes

编辑 `~/.hermes/.env`：

```bash
HASS_TOKEN=your-long-lived-access-token
HASS_URL=http://your-homeassistant-ip:8123
```

**仅需这两个环境变量。** Hermes 检测到 `HASS_TOKEN` 后，启动时自动加载 `homeassistant` toolset。

### 第三步：验证连接

启动 Hermes 后输入：

```
列出我家所有的设备
```

如果连接成功，Hermes 返回 HA 中的所有实体列表。

> ⚠️ **`HASS_TOKEN` 修改后必须重启 Hermes**，toolset 在启动时加载。

## 五大实战场景

### 场景一：自然语言控制

不再需要记住实体 ID。用日常语言描述即可：

```
把客厅灯调到 30% 亮度，色温暖白
关掉所有卧室的灯
把空调设到 24 度，制冷模式
```

### 场景二：复杂条件逻辑

```
如果现在室外温度超过 30 度，打开客厅空调设到 25 度。
如果低于 30 度，只开风扇。
```

Hermes 查询温度传感器 → 根据数据判断 → 执行对应动作。

### 场景三：定时自动化（Cron）

```
设一个定时任务：每天晚上 11 点，关掉所有灯，只留卧室小夜灯。
```

Hermes 内部等价于：

```bash
hermes cron create "0 23 * * *"
# prompt: 关掉所有灯，只留卧室小夜灯
```

> ⚠️ **Cron 任务在 gateway 模式下才持久**。纯 CLI 模式退出后 cron 不执行。

### 场景四：Telegram 远程控制

配置 Hermes Telegram 渠道后，在路上发消息：

```
我快到家了，提前开空调和玄关灯
```

Hermes 收到消息 → 调用 HA API → 设备开启。人在路上，家已就绪。

### 场景五：Philips Hue 场景控制

如果已接入 Philips Hue（通过 OpenHue Skill）：

```
把书房切换到"专注"场景
把客厅灯设成日落色，亮度 60%
```

## 配合记忆使用（关键特性）

第一次告诉 Hermes 你的偏好：

```
记住：我喜欢睡觉时客厅全关，卧室留小夜灯 10% 亮度，空调 26 度
```

之后只需说：

```
我要睡了
```

Hermes 从记忆中读取偏好 → 自动执行完整场景。**从「手动配置自动化」进化到「AI 记住习惯并自动执行」。**

## 架构

```
用户（自然语言 / Telegram / Cron）
    ↓
Hermes Agent
    ├── 自然语言理解 + 记忆系统
    ├── homeassistant toolset（自动加载）
    └── OpenHue Skill（可选）
    ↓  REST API (HASS_TOKEN)
Home Assistant（:8123）
    ↓
设备层：灯 / 空调 / 风扇 / 门铃 / ...
```

## 社区案例：LLM 接管门铃对讲

一位 HA 用户的实验性方案：当门铃响且检测到无人在家时，让本地 LLM 接管对讲。

流程：

1. 门铃响 → HA 检测到无人在家
2. 触发 Hermes Agent
3. Hermes 通过 TTS 对门铃说话："你好，主人不在家，请问你是谁？有什么事？"
4. 门铃录音 → STT 转文字 → Hermes 理解内容
5. Hermes 根据情况回应：快递→「请放门口」，朋友→「我帮你转告」
6. 同时发 Telegram 通知主人

**全程使用本地模型（Ollama），不依赖云端 API，隐私完全可控。**

## 踩坑提醒

| 问题 | 解决方案 |
|------|----------|
| Token 设置后不生效 | **重启 Hermes**，toolset 启动时加载 |
| Hermes 无法访问 HA | 检查网络互通（同一个局域网/VPN） |
| 实体名匹配失败 | 尝试使用 HA 中的精确实体 ID 替代自然语言名称 |
| Cron 不执行 | CLI 模式下 cron 不持久，切换到 gateway 模式 |
| HA 在远程服务器上 | 确保 `HASS_URL` 可达，必要时配置内网穿透 |

## 能力边界

- ✅ 自然语言控制现有设备
- ✅ 条件判断 + 多步骤自动化
- ✅ 定时任务 + 远程控制
- ✅ 记住偏好，简化交互
- ❌ 不能直接在 HA 中添加新设备（需 HA UI 操作）
- ❌ 复杂自动化仍建议用 HA 原生 Automation（可靠性更高）

---

> 📚 参考：[[../entities/hermes-agent|Hermes Agent]] · [[../entities/home-assistant|Home Assistant]] · Hermes Home Assistant 文档
