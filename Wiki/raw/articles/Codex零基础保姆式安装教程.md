欧工666 *2026年5月6日 08:09*

今天来教大家装另一个我最常用的工具和模型：Codex

自从GPT5.5出来以后，Claude逐渐失宠了，GLM5.1目前我只用来打杂， 稍微干点重活慢的要死，重活也干不好。

不得不说，有市场竞争就是好啊，只有竞争受益的才是咱普通人。

## 先搞清楚：Codex 有哪几种用法？

Codex 是 OpenAI 的 AI 编程助手，类似于Claude code这种工具，配合大模型使用，可以帮你阅读项目、改代码、运行命令、检查错误。

Codex目前是用OpenAI的模型，比如GPT5.5，GPT5.4等。。  

![图片](https://mmbiz.qpic.cn/mmbiz_png/vekUiaIEicGrOjGEJ9uRsibJDFjOYpbcn6AAClq9ty4OQDPn9W0D5nHXc3fXHFoAoGLco8ceJFEddrMtaz487lcsmJD7WsTYe9M8y2qPTH4Gp8/640?from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

我是自从出了GPT5.5以后，Claude彻底失宠了，现在写代码，基本用GPT5.5，又快又准又比较便宜。

现在常见入口有四种：

| 入口 | 适合谁 | 推荐程度 |
| --- | --- | --- |
| Codex App | 零基础、Windows/macOS 用户、想要图形界面 | 强烈推荐 |
| Codex CLI | 熟悉终端、经常在项目目录里工作 | 推荐 |
| IDE Extension | VS Code / Cursor / Windsurf 用户 | 推荐 |
| Codex Web | 想把任务交给云端跑、配合 GitHub 仓库 | 进阶 |

我也不想像别的教程一样，把东西搞太复杂，熟悉我的都知道，我是实干者，一切以能落地，能直接用于实际为主。

所以我最推荐的是直接装Codex App就够了，又简单，又是真正的生产力工具，不用折腾太多工具，反而累赘。

---

## 1\. 准备工作

### 1.1 你需要准备什么

1. 一台电脑。
2. 一个 ChatGPT 账号，推荐使用支持 Codex 的 ChatGPT 方案登录。
3. 可以科学的稳定网络。

### 1.2 推荐先装 Git

Codex 会修改文件。新手最好先装 Git，这样改坏了还能回退。

下载地址：

https://git-scm.com/downloads

安装时一路默认即可。

安装后打开 PowerShell或者命令行，输入：

```
1
git --version
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/vekUiaIEicGrM0PCcJ2MfMRJhFKPyk6aEiaUqia3VCYCgPosAMGBjv0JXCTmwYU9B1RubZOH7ZO9JD5FelPltFPvTMN5AfJeQkjtzQCNNy1neS0/640?from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=1)

如果能看到类似下面的内容，就说明 Git 安装好了：

```
1
git version 2.xx.x.windows.x
```

---

## 2\. 最推荐：安装 Codex App（图形界面）

这是最适合零基础的方式。Windows 上可以直接通过 Microsoft Store 安装。

### 2.1 打开官方下载入口

打开官方 Codex Quickstart：

https://developers.openai.com/codex/quickstart

找到 App 部分，点击 Windows 下载入口。官方 Windows 文档也写明可以从 Microsoft Store 下载：

![图片](https://mmbiz.qpic.cn/mmbiz_png/vekUiaIEicGrOiba9C49WlZevHQeujYcPVEIWCuUvfm7TxQJYVVGllF61H0ickY50tnZ0c0CDsictHFaEsWJpeicleLJ3wGOKoiaXEmX4byia8PricRY/640?from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=2)

也可以直接打开 Microsoft Store 页面：

https://get.microsoft.com/

然后搜索：

```
1
Codex
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/vekUiaIEicGrNQQD1w5GuhN3sCMszxmFjgG4zMgFZB3yEiamic9Pluo8iax5pVMfNnST5icib6XSdibWwibkbpjH0aTPu0v55WrcmSoU9BweCR9pUVPo/640?from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=3)

然后自行安装就好了，安装程序应该不用教了吧？

### 2.3 打开 Codex 并登录

安装完成后，打开Codex，选择登录方式。  

![图片](https://mmbiz.qpic.cn/mmbiz_png/vekUiaIEicGrOyU0ktx7z9t0z6y32ofR1lDuYyic6gKbicRDDkqeZibkgXy4Xakk6dfM4WBsnhicVR7nXkm8aMHkFRmmFerqhicJWWvDU8mRgX4LLc/640?from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=4)

Codex 支持两种 OpenAI 登录方式：

| 登录方式 | 适合谁 |
| --- | --- |
| 使用ChatGPT登录（订阅号） | 大多数普通用户 |
| 换种方式登录（API key） | 用 API 余额计费、CI/CD、自动化脚本 |

如果是订阅套餐的就选择使用ChatGPT登录，如果用API Key或者中转站的，一般选择换方式登录。

我的建议就是，最好直接使用订阅号登录，中转站虽然便宜，但水太深了，鱼龙混杂，牛鬼蛇神，什么叼毛都有。

哪怕用中转站，也不要一次充辣么多，充个30,50的用完再说，防止跑路。

而且我试了下，通过订阅登录的，可以调模型速度，中转站的好像不行。

你点使用ChatGPT登录以后，会弹出一个网页，让你登录ChatGPT账号。  

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/vekUiaIEicGrMLw8ZnGaFF33AibRYicFTu6amkvT03Ir1Dl5dPbweVrNSHayaXwFA4eYeJI38c8EtKf8opVYNqib7q3PT3mCGeBsshtfgC5OfOxM/640?from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=5)

输入你的ChatGPT账号登录就好了，如果没有ChatGPT账号，可以到官网先注册一个。

### 2.4 选择项目文件夹

登录后，Codex 会让你选择一个项目目录。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/vekUiaIEicGrPKmDibn04XJ9GPaUUJVT5tA0zD97Vv4GkWT4ibVNiaTfI2Wanf7MlbEAQlkEDElWI9ibqhMWXyLJHyJZQh3ZHGQ11lNkKKVh0nQ3M/640?from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=6)

因为我这个账号已经选择了一个叫AI嵌入式的文件夹了，所以登录进去会保存记录。

我们可以在电脑本地新建一个文件夹，比如我在D盘新建文件夹Codextest  

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/vekUiaIEicGrP5HEic4srXuk8fexECDWB3V78LwSefjM1B5Ot7yp2PibJ1Ct6Kh2rK2bchxZn2vuibsUtC9CjjYiciaBJUahjib5OekvFhRZmEcku7U/640?from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=7)

然后在Codex点项目栏这个添加项目的图标，把刚刚那个文件夹添加进来

![图片](https://mmbiz.qpic.cn/mmbiz_png/vekUiaIEicGrOPpLuUulbIjybstmWQOuVa8Y1Cibdm3E8M0sbftcsIJ5oEk63PaC2sCIyrrAE7OviatnfDNWOJqCNV4XA1Z7ssm7F8zuKWGvCuE/640?from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=8)

找到我们刚刚创建的文件夹，点选择文件夹

![图片](https://mmbiz.qpic.cn/mmbiz_png/vekUiaIEicGrNzibsibqdsku6H5W5ic2hRMS7j69WyZy6307icbqf0OOtyuWeibZjBL2xibDtjjy1GuuvcOtrLjsl9nO6n1pRsJrej5aZ1rltGicFobI/640?from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=9)

选择以后，在codex就能出现这个文件夹工作区了，然后点击文件夹工右边的开始新对话图标，就可以和GPT聊天啦。  

![图片](https://mmbiz.qpic.cn/mmbiz_png/vekUiaIEicGrOLWr8Ctu3TuUdvm79R8AKm37BLia35GbTczjgaYibiaTGRpvAGsqY7PR8fxvmodJhvHwCRpECwrdAxOKyAecLpRjZZx7yOoAZLfw/640?from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=10)

新建对话后，会在这里显示你当前的工作区。。  

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/vekUiaIEicGrN08ugDib2ibDfEdXFQV3PcvDwjic4j80UFHOZg2niajzkj8yEjk2QuKkDfSrz3o1d3SiaGQMhxcYTH6RsTgYBecaaIXWEg2UniaIPrQ/640?from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=11)

### 2.5 发出第一条消息

进入项目后，可以问它：

```
1
如何使用Codex，请给我生成一份详细的新手教程，保存为.md文档：
```

很快它就会帮你在Codextest目录下新建一个Codex新手教程。md文档  

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/vekUiaIEicGrOoObA2Ms6P9jlqkXL8dXibEiccibDpuEib17TeIAr9iariaeNGViaZjoNpuNN80JVRc5BhPyDSFImtLDNjQDzKIKuYicibl1GPkicOL0M70/640?from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=12)

然后打开文档看一下，神奇吧？

![图片](https://mmbiz.qpic.cn/mmbiz_png/vekUiaIEicGrMp6ufGR88pRn11Tgk697G7Ebom9Qyw8IgqNbokzEia1oztVS63mRrvCo4ia3jhicMobMQunFpNfKtiaNOlEWqN2ql4Puef3xNj0gw/640?from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=13)

至此，一个美好的开端就开始了，后面任何事情你都可以问它，以及让它帮你完成。

**微信扫一扫赞赏作者**

继续滑动看下一个

欧工AI

向上滑动看下一个