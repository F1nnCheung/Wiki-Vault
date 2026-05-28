---
title: Home Assistant
type: entity
tags: [home-assistant, smart-home, open-source, iot, home-automation]
created: 2026-05-28
updated: 2026-05-28
sources:
  - raw/articles/Home Assistant/真正全屋智能HomeAssistant：跨平台接入群晖NAS——整合米家、海尔、美的、海信、Homekit.md
  - raw/articles/Home Assistant/Hermes Agent + Home Assistant：用自然语言控制你的整个家.md
related:
  - entities/hermes-agent.md
  - topics/hermes-home-assistant-integration.md
---

# Home Assistant

> 开源的智能家居中控平台，将市面上各种品牌的智能设备整合到一个统一的控制面板中，打破品牌壁垒，实现真正的全屋智能。

## 是什么

Home Assistant（简称 HA）是一款开源的智能家居自动化平台，核心价值在于**跨品牌统一控制**。中国家庭常见的困境——米家控制小家电、海尔控制冰箱、美的控制空调、海信控制电视——每个品牌一个 APP，HA 把所有这些整合到一个界面。

- **开源免费**：社区驱动，2700+ 集成组件
- **本地优先**：数据留在本地，不依赖厂商云
- **部署灵活**：支持 Docker、树莓派、NAS、虚拟机等多种方式
- **默认端口**：8123

## 核心架构

```
智能设备层：米家 / 海尔 / 美的 / 海信 / HomeKit / ...
    ↕
集成层：Xiaomi Miot / Haier / Midea AC LAN / Hisense / HomeKit Bridge
    ↕
Home Assistant Core（设备状态 + 自动化引擎）
    ↕
控制层：Web UI（:8123）/ 手机 App / Apple Home / 语音助手
    ↕
扩展层：HACS 插件商店（社区集成 + 自定义组件）
```

## 群晖 NAS Docker 部署

这是国内家庭最实用的部署方式——NAS 24 小时开机，天然适合做智能家居中枢。

### 环境准备

1. 群晖套件中心安装 **Container Manager**（Docker 环境）
2. 添加国内镜像仓库地址：`https://docker.1ms.run`
3. 在 File Station 中创建 `docker/homeassistant` 共享文件夹

### 安装步骤

1. Container Manager → 注册表 → 搜索 `home-assistant` → 下载镜像
2. 容器 → 新增 → 选择镜像 → 命名容器
3. **文件夹映射**：主机路径 `/docker/homeassistant` → 挂载路径 `/config`
4. **环境变量**：`TZ=Asia/Shanghai`
5. **网络模式**：选择 `host`（让 HA 使用 NAS 网络）
6. 启动容器，首次初始化需几分钟
7. 浏览器访问 `http://[NAS_IP]:8123` 完成初始设置

## HACS 插件商店

HACS（Home Assistant Community Store）是 HA 的「应用商店」，安装第三方品牌集成必须通过它。

### 离线安装（推荐，避免网络问题）

1. 在 `/docker/homeassistant` 下创建 `custom_components/hacs` 文件夹
2. 下载 HACS 压缩包解压到该文件夹（注意不要多套一层 hacs 目录）
3. 重启 HA 容器
4. 设置 → 设备与服务 → 添加集成 → 搜索 HACS → 安装
5. GitHub 授权（可能需要代理或手机热点）

## 品牌集成方案

### 米家（Xiaomi Miot）

- **途径**：HACS 搜索 `xiaomi` → 下载 Xiaomi Miot → 重启 → 添加集成
- **认证**：米家账号 + 密码 + 验证码
- **覆盖**：小家电上百种控制功能，是 HA 上设备最多的品牌

### 海尔（Haier）

- **途径**：离线安装包放入 `custom_components/haier` → 重启 → 添加集成
- **认证**：**令牌验证**（最棘手）——需用小黄鸟抓包工具从微信小程序「海尔智家」登录过程中抓取 `id` 和 `refreshToken`
- **注意**：海尔旗下高端品牌卡萨帝需先导入海尔 APP 再集成

### 美的（Midea AC LAN）

- **途径**：HACS 直接搜索 `Midea AC LAN` → 下载 → 重启 → 添加集成
- **认证**：美的美居 APP 账号 + 密码
- **注意**：colmo 品牌需先导入美的美居 APP；美的兼容 colmo，但 colmo 不兼容美的

### 海信（Hisense）

- **途径**：离线安装包放入 `custom_components/hisense` → 重启 → 添加集成
- **认证**：海信账号 + 密码（最简单）
- **兼容**：同时支持海信和科龙品牌

### Apple HomeKit

- **途径**：设置 → 设备与服务 → 添加集成 → 搜索 `apple` → HomeKit Bridge
- **配对**：生成二维码 → iPhone 相机扫码或「家庭」App 添加配件
- **效果**：所有 HA 设备出现在 Apple Home 中，可用 Siri 控制

> ⚠️ **品牌兼容链**：高端子品牌（卡萨帝/colmo）需先导入母品牌 APP 才能在 HA 中识别。

## 远程访问

内网穿透方案（花生壳）：

1. 安装花生壳 → 注册登录
2. 高级设置 → 内网穿透 → 新增映射
3. 内网 IP 填写 NAS 地址，内网端口填 `8123`
4. 获取外网访问地址
5. 手机 App 配置：内网地址（家内）+ 外网地址（外出），自动切换

## 关键数据

- 首次发布：2013 年
- GitHub Stars：70,000+（截至 2026）
- 集成组件：2,700+
- 安装方式：Docker / Home Assistant OS / 树莓派 / NAS / 虚拟机
- 默认端口：8123

## 与 AI Agent 的集成

Home Assistant 提供了 REST API，可与 AI Agent 框架深度集成：

- **[[Hermes Agent|Hermes]]**：通过 Long-Lived Access Token + toolset 实现自然语言控制（见 [[hermes-home-assistant-integration|Hermes + HA 集成]]）
- **Claude Code**：可通过 MCP 或自定义工具调用 HA API
- **场景价值**：从「手动点 APP」进化到「说一句话控制全家」，再进化到「AI 根据上下文自动判断执行」

---

> 📚 参考：[[topics/hermes-home-assistant-integration|Hermes + Home Assistant 集成教程]]
