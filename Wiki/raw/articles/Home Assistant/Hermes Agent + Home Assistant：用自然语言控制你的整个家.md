AI赋能说 *2026年5月20日 08:46*

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/B9Tu6L8wd2afLbq0Fvp6roicbws8MJBtS69ZAWZXF3nhRZvCgHaia97vGlwV32icG6RVvoxgKIFsuibIgeHOsn6RosvroZuw6thkA2KliacbKnpw/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

上一篇说了为什么 AI 应该做智能家居的大脑。这篇以hermes-agent 为例子教你接入。

---

## 前提

- Home Assistant 已安装并运行（任何安装方式都行）
- 有一个 Long-Lived Access Token
- Hermes Agent 已安装

---

## 第一步：获取 Home Assistant Token

1. 打开 Home Assistant Web UI
2. 点击左下角你的用户头像
3. 滚动到底部 → "Long-Lived Access Tokens"
4. 创建一个 token，复制保存

---

## 第二步：配置 Hermes

编辑 `~/.hermes/.env` ：

```
HASS_TOKEN=your-long-lived-access-token
HASS_URL=http://your-homeassistant-ip:8123
```

就这两个变量。Hermes 检测到 `HASS_TOKEN` 后，自动启用 `homeassistant` toolset。

---

## 第三步：验证连接

```
hermes
```

进入对话后说：

```
列出我家所有的设备
```

如果连接成功，Hermes 会返回你 Home Assistant 里的所有实体列表。

---

## 实战场景

### 场景一：自然语言控制

```
把客厅灯调到 30% 亮度，色温暖白
```
```
关掉所有卧室的灯
```
```
把空调设到 24 度，制冷模式
```

### 场景二：复杂条件逻辑

```
如果现在室外温度超过 30 度，打开客厅空调设到 25 度。
如果低于 30 度，只开风扇。
```

Hermes 会查询温度传感器，根据结果执行不同动作。

### 场景三：定时自动化

```
设一个定时任务：每天晚上 11 点，关掉所有灯，只留卧室小夜灯。
```

Hermes 用内置 cron 设置定时任务：

```
# 等价于
hermes cron create "0 23 * * *"
# prompt: 关掉所有灯，只留卧室小夜灯
```

### 场景四：通过 Telegram 远程控制

在 Telegram 里给 Hermes 发消息：

```
我快到家了，提前开空调和玄关灯
```

Hermes 收到消息 → 调用 Home Assistant API → 设备开启。

你还在路上，家已经准备好了。

### 场景五：Philips Hue 场景控制

如果你有 Philips Hue，Hermes 有专属的 OpenHue skill：

```
把书房切换到"专注"场景
```
```
把客厅灯设成日落色，亮度 60%
```

---

## 配合记忆使用

第一次告诉 Hermes：

```
记住：我喜欢睡觉时客厅全关，卧室留小夜灯 10% 亮度，空调 26 度
```

以后只需要说：

```
我要睡了
```

Hermes 从记忆中读取你的偏好，自动执行完整场景。

---

## 架构

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

## 社区案例：让 LLM 接管门铃对讲

一个 Home Assistant 用户做了一个实验：当门铃响起且检测到家里没人时，让本地 LLM 接管门铃的对讲功能。

流程：

1. 门铃响 → Home Assistant 检测到无人在家
2. 触发 Hermes Agent
3. Hermes 通过 TTS 对门铃说话："你好，主人不在家，请问你是谁？有什么事？"
4. 门铃录音 → STT 转文字 → Hermes 理解内容
5. Hermes 根据情况回应（快递→"请放门口"，朋友→"我帮你转告"）
6. 同时发 Telegram 通知主人

整个过程用的是本地模型（Ollama），不依赖云端 API。隐私完全可控。

这不是科幻。是 2026 年已经有人在跑的方案。

参考：https://tech.yahoo.com/home/articles/let-local-llm-control-video-153016480.html

---

## 踩坑提醒

1. **`HASS_TOKEN` 设好后要重启 Hermes** 。toolset 在启动时加载。
2. **Home Assistant 要能被 Hermes 访问** 。如果 Hermes 在远程服务器上，确保网络通。
3. **实体名称要准确** 。说"客厅灯"时，Hermes 会匹配 Home Assistant 里的实体名。如果匹配不上，用实体 ID。
4. **Cron 任务在 gateway 模式下才持久** 。纯 CLI 模式退出后 cron 不会执行。

---

## 参考

- Hermes Home Assistant 文档：https://hermes-agent.nousresearch.com/docs/user-guide/messaging/homeassistant
- OpenHue Skill：https://hermes-agent.nousresearch.com/docs/user-guide/skills/bundled/smart-home/smart-home-openhue
- Home Assistant Long-Lived Token：https://www.home-assistant.io/docs/authentication/

**下方是赋能君的AI学习交流永久免费星球，想学习更多内容，欢迎扫码加入。**

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

Hermes Agent · 目录

继续滑动看下一个

AI赋能说

向上滑动看下一个