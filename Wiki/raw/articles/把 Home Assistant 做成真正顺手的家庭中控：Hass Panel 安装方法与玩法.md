夏白的小屋 *2026年5月31日 14:16*

> ❝
> 
> 适合人群：已经在用 Home Assistant，或者准备把家里的灯、空调、窗帘、传感器、摄像头统一管理起来的智能家居玩家。

很多人第一次装好 Home Assistant 后，都会遇到同一个问题：

设备是接进来了，自动化也能跑，但给家人用时，原生界面还是偏“工程师”。灯在哪里、空调在哪里、摄像头在哪里、哪个按钮能按、哪个状态只是显示，普通用户需要适应一段时间。

Hass Panel 的价值就在这里：它不是替代 Home Assistant，而是给 Home Assistant 加一层更适合日常使用的可视化控制面板。它基于 React 开发，支持拖拽布局、移动端和桌面端响应式显示、PWA 安装、亮色/暗色主题、多用户管理，以及常见智能家居设备卡片。

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/wsJBM8OaCcDF0Aha1ibrVzDuhibgPnC6WwYr5ic1wPVm2ZRDB1B0G08l23tHBWNSDzFHHkOauH2uGSFpssk1h7hZLQTq4aT6VxdWCeZSM8icMrs/640?wx_fmt=jpeg&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

## 一、它适合解决什么问题？

如果你只是自己调试 Home Assistant，原生 Lovelace 已经够用。但如果你希望把中控放在墙上平板、客厅 iPad、手机桌面，或者让家人也能无学习成本使用，那么 Hass Panel 更适合做“日常入口”。

它最适合这几类场景：

1. **墙上平板中控**
	放在玄关、客厅、餐厅，常驻显示天气、灯光、窗帘、空调、摄像头、用电情况。
2. **家人使用的简化入口**
	不暴露太多 Home Assistant 的配置细节，只保留常用控制和状态。
3. **全屋设备状态看板**
	比如一屏查看：谁在家、哪些灯开着、空气质量如何、服务器/NAS/PVE 是否正常、摄像头画面是否在线。
4. **临时展示或客房控制**
	给客人或家人一个更简单的页面，只放客厅灯、空调、窗帘、场景按钮。

换句话说，Home Assistant 负责“连接和自动化”，Hass Panel 负责“看得懂、点得准、用得顺”。

## 二、安装方式怎么选？

Hass Panel 支持 Home Assistant 加载项、Docker、Docker Compose 三种安装方式。普通 HAOS 用户优先选加载项；有独立服务器、NAS、软路由的用户可以选 Docker。

### 方式 1：Home Assistant 加载项安装

这是官方文档推荐的方式，适合 HAOS / Supervised 用户。

手动添加步骤如下：

1. 打开 Home Assistant。
2. 进入「设置」或「配置」。
3. 打开「加载项」。
4. 进入「加载项商店」。
5. 点击右上角三个点，选择「存储库」。
6. 添加仓库地址：
```
复制文末的 Hass Panel GitHub 仓库地址
```
7. 刷新加载项商店。
8. 找到「Hass Panel」并安装。
9. 启动后，在 Home Assistant 侧边栏访问。

这个方式的优点是集成度高，升级和管理都在 Home Assistant 里完成。

### 方式 2：Docker 安装

如果你把 Home Assistant 跑在独立服务器、NAS 或 Linux 主机上，可以直接使用 Docker。

```
docker run \
  --name hass-panel \
  --restart unless-stopped \
  --network host \
  -v ./data/:/config/hass-panel \
  -d \
  registry.cn-hangzhou.aliyuncs.com/hass-panel/hass-panel:latest
```

启动后访问：

```
你的主机 IP 的 5123 端口
```

这里有两个点要注意：

- `./data/` 会保存 Hass Panel 的配置数据，升级前不要随手删除。
- 使用 `--network host` 是为了让面板更容易访问同一主机或局域网内的 Home Assistant。

### 方式 3：Docker Compose 安装

更推荐长期运行时使用 Compose，方便升级和迁移。

```
version: '3'
services:
hass-panel:
    container_name:hass-panel
    image:registry.cn-hangzhou.aliyuncs.com/hass-panel/hass-panel:latest
    restart:unless-stopped
    network_mode:host
    volumes:
      -./data:/config/hass-panel
```

启动：

```
docker-compose up -d
```

升级：

```
docker-compose pull
docker-compose up -d
```

## 三、第一次初始化怎么填？

首次打开 Hass Panel，会进入初始化页面。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/wsJBM8OaCcAqCTs6fV3fN98ZDiasj0HMDriaFIc7N2KgA2FWRSvzmnBtQTVicTvibEUAdxdwmPiaOo5ckwnaiaHO5buG8NWpgEibIibYnRKZtia2jImY/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

这里需要配置 5 个信息：

1. 管理员用户名
2. 管理员密码
3. 确认密码
4. Home Assistant 地址
5. Home Assistant Token，可选

Home Assistant 地址一般写成：

```
homeassistant.local 加 8123 端口
```

或：

```
Home Assistant 所在设备的局域网 IP 加 8123 端口
```

如果你的 Hass Panel 和 Home Assistant 不在同一台机器，建议直接写局域网 IP，更稳定。

Token 可以先不填。官方文档说明，如果不填写长期访问令牌，后续可以通过跳转到 Home Assistant 登录页面完成授权。但如果你是固定墙屏、内网部署、希望减少登录步骤，建议在 Home Assistant 中创建长期访问令牌后填入。

创建长期访问令牌的位置：

```
Home Assistant 个人资料页 -> 安全 -> 长期访问令牌
```

## 四、面板搭建顺序：别一上来就堆满卡片

Hass Panel 的卡片很多，包括时间、天气、灯光、窗帘、传感器、媒体播放器、空调、电量、路由器、NAS、摄像头、人体传感器、净水器、插座、PVE、服务器、家庭人员状态等。

但真正好用的面板，不是把所有设备都放上去，而是按“使用频率”和“决策价值”来排。

建议按下面这个顺序搭建。

### 第 1 层：常用控制

先放每天都会点的设备：

- 客厅灯
- 餐厅灯
- 主卧灯
- 空调
- 窗帘
- 常用场景

这部分应该放在首屏最容易点击的位置。墙屏使用时，建议按钮和卡片尽量大一些。

### 第 2 层：关键状态

再放需要经常看的状态：

- 温湿度
- 空气质量
- 门窗状态
- 人体传感器
- 用电功率
- 家庭成员在家状态

这类卡片不一定要经常点击，但要一眼能看出异常。

### 第 3 层：低频但重要

最后再放不常操作、但出问题时很有用的项目：

- 摄像头
- 路由器
- NAS
- 服务器
- PVE 虚拟机
- 净水器

这部分适合放在第二屏，或者做成专门的“设备状态页”。

## 五、添加卡片：从“房间”开始，比从“设备类型”开始更好

Hass Panel 支持通过右下角的加号添加卡片。添加时可以选择卡片类型，再配置标题、实体 ID、图标等信息。

![图片](https://mmbiz.qpic.cn/mmbiz_png/wsJBM8OaCcBSzRadibbeDK6U6rPywvnXZKiaicOAJBRxjwwibCQQJVNmU9duwN4ViavDWUTJhd4Wwcfdo9T2M1oicYrYNOEz5ytjNFVnYqywHRlso/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

很多人搭面板时会按设备类型分组，比如“所有灯”“所有传感器”“所有空调”。这种方式对维护者清晰，但对家人不一定直观。

更推荐按房间组织：

### 客厅

- 客厅主灯
- 灯带
- 空调
- 窗帘
- 电视/媒体播放器
- 客厅温湿度

### 卧室

- 主灯
- 床头灯
- 空调
- 窗帘
- 人体传感器

### 玄关

- 门锁状态
- 人体传感器
- 玄关灯
- 回家/离家场景

### 设备运维

- 路由器
- NAS
- PVE
- 服务器
- 摄像头

这样做有一个明显好处：家人不需要知道某个设备属于哪个集成，也不需要理解实体 ID，只需要找到对应房间。

## 六、几个实用玩法

### 玩法 1：墙屏全屏模式

Hass Panel 首页支持全屏显示。配合平板浏览器或 PWA，可以做成接近原生 App 的墙屏体验。

建议设置：

- 平板固定横屏。
- 首页只放高频卡片。
- 开启深色模式，夜间不刺眼。
- 重要按钮放大，避免误触。
- 不常用卡片放到第二屏。

如果平板长期通电，建议同时配置自动灭屏、人体感应唤醒或低亮度常亮策略。

### 玩法 2：做一个“离家前检查”区域

在首屏放一组离家前最关心的状态：

- 门窗是否关闭
- 灯是否关闭
- 空调是否关闭
- 插座是否断电
- 摄像头是否在线
- 家庭成员是否全部离家

再配合 Home Assistant 的离家自动化，就可以做成一个很实用的“出门检查台”。

### 玩法 3：用快捷指令卡片承载场景

Hass Panel 支持快捷指令面板，可以把 Home Assistant 里的脚本或自动化作为按钮放出来。

适合做这些按钮：

- 回家模式
- 离家模式
- 观影模式
- 睡眠模式
- 起夜模式
- 全屋关灯
- 打开新风
- 关闭所有空调

这类按钮要少而明确。不要把几十个自动化都放上来，否则面板会重新变复杂。

### 玩法 4：把设备监控做成“家庭运维屏”

如果你家里有 NAS、软路由、PVE、服务器，Hass Panel 的路由器、NAS、PVE、服务器监控类卡片会很有用。

可以单独做一个区域，显示：

- NAS 存储状态
- 服务器在线状态
- PVE 虚拟机状态
- 路由器运行时间
- 网络设备状态

这个区域不一定给家人看，但对维护智能家居系统的人很有价值。

### 玩法 5：摄像头只放“需要看”的画面

Hass Panel 支持摄像头卡片，并提到 WebRTC、ONVIF、RTSP、HLS 等视频流能力。实际使用时，不建议一页塞满所有摄像头。

更实用的做法是：

- 首屏只放门口、庭院、客厅这类关键画面。
- 低频摄像头放到单独页面或后半屏。
- 摄像头卡片尽量放大，避免小窗看不清。
- 如果画面卡顿，优先检查 RTSP/ONVIF 地址、编码格式和网络带宽。

## 七、布局技巧：让家人少思考

Hass Panel 支持编辑模式，可以拖拽卡片位置、调整尺寸、切换列数、保存布局。

我的建议是：

1. **把“可点击”和“只显示”的卡片分开**
	可点击控制放左侧或下方，状态显示放右侧或上方，减少误触。
2. **一屏不要超过 12 个核心卡片**
	卡片太多之后，找设备的时间会明显变长。
3. **高频设备大一点，低频设备小一点**
	比如空调、灯光、窗帘可以更大；温湿度、门窗状态可以小一些。
4. **按生活动线排列**
	玄关、客厅、餐厅、卧室、阳台，比“灯、窗帘、空调、传感器”更符合普通人的直觉。
5. **先给家人试用一周再定稿**
	真正的好面板通常不是第一次就设计出来的。看家人经常问什么、找什么、误点什么，再回来调整。

## 八、常见问题与避坑

### 1\. 配置不生效

优先检查三个地方：

- 实体 ID 是否写错。
- Home Assistant 地址是否可访问。
- 修改后是否保存并刷新页面。

实体 ID 不要凭记忆输入，建议在 Home Assistant 的开发者工具里复制。

### 2\. 设备显示离线

先不要怀疑 Hass Panel，先确认 Home Assistant 里这个实体是否正常。

排查顺序：

1. Home Assistant 原生页面能否控制。
2. 实体 ID 是否存在。
3. 设备本身是否在线。
4. Hass Panel 到 Home Assistant 的网络是否通。

### 3\. 摄像头没有画面

摄像头最容易受协议、编码和网络影响。

建议检查：

- ONVIF/RTSP 地址是否正确。
- 摄像头是否限制并发连接。
- 是否需要用户名密码。
- 局域网内是否能用 VLC 打开 RTSP 流。
- H.265 编码是否导致浏览器不兼容，必要时改 H.264。

### 4\. 墙屏访问慢

常见原因是背景图太大、摄像头太多、平板性能弱。

优化建议：

- 背景图压缩到 1MB 以内。
- 首屏减少摄像头数量。
- 不重要的状态卡片放到第二屏。
- 使用局域网 IP，减少 DNS 或代理影响。

### 5\. 升级前要备份什么？

从 v1.3.2 起，项目说明中提到系统使用 SQLite 数据库存储配置，并且首次使用需要完成初始化流程。因此升级前建议备份挂载的数据目录。

Docker 用户重点备份：

```
./data/
```

Compose 用户重点备份：

```
./data:/config/hass-panel
```

不要只备份容器本身，真正重要的是配置数据。

## 九、我的推荐配置模板

如果你不知道第一版面板怎么搭，可以直接按这个模板来。

### 首屏：日常控制

- 时间
- 天气
- 家庭人员状态
- 客厅灯光
- 主卧灯光
- 客厅空调
- 主卧空调
- 客厅窗帘
- 卧室窗帘
- 回家模式
- 离家模式
- 全屋关灯

### 第二屏：状态监控

- 温湿度
- 空气质量
- 光照传感器
- 人体传感器
- 门窗状态
- 用电统计
- 插座状态

### 第三屏：运维与安防

- 摄像头
- 路由器
- NAS
- 服务器
- PVE
- 净水器

这个结构的核心是：首屏给家人用，第二屏给状态判断，第三屏给维护者排查。

## 十、总结

Hass Panel 最值得用的地方，不是“它有很多卡片”，而是它让 Home Assistant 从一个强大的智能家居后台，变成了一个更适合全家使用的前台入口。

安装并不复杂，真正需要花时间的是面板设计：

- 哪些设备放首屏？
- 哪些状态需要一眼看到？
- 哪些自动化应该做成按钮？
- 哪些卡片应该隐藏到后面？
- 家人实际使用时会不会迷路？

如果你已经搭好了 Home Assistant，下一步不妨试试 Hass Panel。先用一小时搭出第一版，再用一周观察家人的使用习惯，最后你会得到一个比“默认仪表盘”更接近真实生活的家庭中控。

---

## 相关地址

- Hass Panel GitHub ： https://github.com/mrtian2016/hass-panel

最后，欢迎关注，我会持续分享互联网好玩好用的资源！

![图片](https://mmbiz.qpic.cn/mmbiz_png/hysnYvbDx7Lm5AYicibQlKwjliaFwgSPHrBJlyPsPp7EHXzZic4IvKNjea55CbX7KGw1ruedm8nQC9VUM3vVCOvPxg/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

继续滑动看下一个

夏白的小屋

向上滑动看下一个