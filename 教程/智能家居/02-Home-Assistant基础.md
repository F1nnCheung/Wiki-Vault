---
title: 智能家居 02 — Home Assistant 基础
type: tutorial
tags: [智能家居, home-assistant, 基础, 架构, HACS, 集成]
created: 2026-05-29
updated: 2026-05-29
sources:
  - Wiki/wiki/entities/home-assistant.md
  - Wiki/raw/articles/Home Assistant/真正全屋智能HomeAssistant：跨平台接入群晖NAS——整合米家、海尔、美的、海信、Homekit.md
related:
  - 01-智能家居概览.md
  - 03-安装与部署.md
---

# 智能家居 02 — Home Assistant 基础

> 在动手部署之前，先理解 Home Assistant 的核心概念和技术架构。这些知识会在你遇到问题时帮你快速定位。

---

## Home Assistant 是什么

Home Assistant 是一款开源的智能家居自动化平台，由 Paulus Schoutsen 于 2013 年创建。截至 2026 年，GitHub 上已获得 **70,000+ Stars**，拥有 **2,700+ 集成组件**。

### 关键数据

| 指标 | 数据 |
|------|------|
| 首次发布 | 2013 年 |
| GitHub Stars | 70,000+ |
| 集成组件 | 2,700+ |
| 默认端口 | 8123 |
| 安装方式 | Docker / HA OS / 树莓派 / NAS / 虚拟机 |
| 许可证 | Apache 2.0（开源免费） |

---

## 核心概念

理解这四个概念，就理解了 HA 的工作方式：

### 1. 集成（Integration）

**集成是 HA 连接外部设备或服务的「驱动程序」。**

每个品牌需要对应的集成才能接入 HA：

| 品牌 | 集成名称 | 来源 |
|------|----------|------|
| 米家 | Xiaomi Miot | HACS 社区商店 |
| 海尔 | Haier | 离线安装包 |
| 美的 | Midea AC LAN | HACS 社区商店 |
| 海信 | Hisense | 离线安装包 |
| Apple | HomeKit Bridge | HA 内置 |

> 集成 ≠ 设备。一个集成可以带出该品牌下的多个设备。

### 2. 实体（Entity）

**实体是 HA 中最小的可控单元。** 一个设备可以有多个实体：

```
设备：客厅空调
  ├─ 实体：开关（climate.living_room_ac）
  ├─ 实体：温度传感器（sensor.living_room_temp）
  ├─ 实体：模式（制冷/制热/送风）
  └─ 实体：风速（auto/low/medium/high）
```

每个实体有唯一的 `entity_id`（如 `light.living_room_main`），这是自动化规则和 AI Agent 操作的**最小粒度**。

### 3. 自动化（Automation）

**自动化 = 触发器 + 条件 + 动作**

```
触发器：室外温度 > 30°C
条件：  客厅有人
动作：  打开客厅空调，设为 25°C，制冷模式
```

HA 内置了强大的自动化引擎，支持：
- 时间触发（每天 23:00）
- 状态触发（门锁打开）
- 数值触发（温度 > 阈值）
- 手动触发（按钮/NFC）

### 4. HACS（Home Assistant Community Store）

**HACS 是 HA 的「应用商店」。** 安装第三方品牌集成、自定义组件、主题等都通过它。

```
HA 内置集成（如 HomeKit Bridge）
  +
HACS 社区集成（如 Xiaomi Miot、Midea AC LAN）
  +
custom_components 手动安装（如 Haier、Hisense）
  =
2700+ 集成生态
```

---

## 技术架构

```
┌─────────────────────────────────────────────┐
│                  控制层                       │
│  Web UI (:8123) │ 手机 App │ Apple Home │ AI  │
├─────────────────────────────────────────────┤
│              Home Assistant Core             │
│  ┌──────────────┐  ┌──────────────────────┐ │
│  │  设备状态管理  │  │    自动化引擎         │ │
│  │  (State Mgmt) │  │  (Automation Engine) │ │
│  └──────────────┘  └──────────────────────┘ │
├─────────────────────────────────────────────┤
│                  集成层                       │
│  Xiaomi Miot │ Haier │ Midea │ Hisense │ ... │
├─────────────────────────────────────────────┤
│                  设备层                       │
│  灯 │ 空调 │ 冰箱 │ 电视 │ 传感器 │ 门锁 │ ... │
└─────────────────────────────────────────────┘
```

**数据流**：
1. 集成通过厂商 API 或局域网协议获取设备状态
2. Core 维护所有实体的状态机
3. 自动化引擎根据规则触发动作
4. 控制层（UI/App/AI）发送指令，经 Core → 集成 → 设备执行

---

## 四种部署方式对比

| 方式 | 优点 | 缺点 | 适合人群 |
|------|------|------|----------|
| **Docker（NAS）** | 利用现有 NAS，24h 运行 | 需 NAS，初装稍复杂 | 已有群晖/威联通等 NAS 的用户 |
| **Home Assistant OS** | 开箱即用，完整功能 | 需专用硬件 | 愿意买树莓派/迷你主机的用户 |
| **树莓派** | 低功耗，便宜 | SD 卡寿命有限 | 入门体验 |
| **虚拟机** | 隔离环境，快照恢复 | 资源占用 | 有虚拟化环境的用户 |

> **本教程以 Docker on 群晖 NAS 为主力方案**，这是国内家庭最实用的选择——NAS 本来就要 24 小时开机。

---

## 理解 REST API

HA 提供了完整的 REST API，这是 AI Agent 能够控制设备的基础：

```bash
# 获取所有设备状态
curl -H "Authorization: Bearer TOKEN" http://ha-ip:8123/api/states

# 控制设备（开灯）
curl -X POST \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"entity_id": "light.living_room"}' \
  http://ha-ip:8123/api/services/light/turn_on
```

AI Agent（如 Hermes）正是通过这个 API + Long-Lived Access Token 来实现自然语言控制设备的。详见 [[05-AI语音控制与自动化|第五章]]。

---

## 目录结构（Docker 部署）

了解 HA 的文件结构有助于排查问题：

```
/docker/homeassistant/          ← NAS 共享文件夹（映射到容器 /config）
├── configuration.yaml           ← 主配置文件
├── automations.yaml             ← 自动化规则
├── custom_components/           ← 手动安装的集成
│   ├── hacs/                    ← HACS 本体
│   ├── haier/                   ← 海尔集成
│   └── hisense/                 ← 海信集成
├── www/                         ← 静态资源（主题、图片）
└── .storage/                    ← 内部状态存储（不要手动改）
```

---

## 下一步

理解了核心概念和架构后，是时候动手了：[[03-安装与部署|第三章：安装与部署]]——在群晖 NAS 上用 Docker 部署 Home Assistant。
