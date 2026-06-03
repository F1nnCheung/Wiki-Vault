六加一 *2026年4月11日 17:11*

## Dify 本地部署教程

## 什么是 Dify？

**Dify** 是一个用于构建 **AI 工作流** 的 **开源平台** 。通过在可视化画布上编排 **AI 模型** 、连接 **数据源** 、定义 **处理流程** ，直接将你的领域知识转化为可运行的软件。

> 不过我发现有些人把 Dify 用成了低代码平台，这就有点大材小用了。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/cr4TMFFAtF7w5YibPR5nTpBq4DvUsMSW1go4UcxAP1bmMq6vRM3vXjuJcicQjhOTGmv3n51nEkkgRmjFILFZbHk07uW2KEeVlaVH1ckEMSz1I/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

---

## 本地部署 Dify

**第一步：安装 Docker**

访问 Docker 官网， **Mac** 和 **Windows** 用户可以直接下载 **Docker Desktop** 。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**第二步：克隆 Dify 代码仓库**

```bash
git clone https://github.com/langgenius/dify.git
```

> ⚠️ **注意** ：如果因为 **网络原因** 无法 clone GitHub 代码，可以利用 **离线包** 。但有个坑——后续更新 Dify 版本时 **无法直接** `git pull origin main` 。

第三步：进入 Docker 目录

```bash
cd dify/docker
```

**第四步：复制环境配置文件**

```bash
cp .env.example .env
```

**第五步：启动 Docker 容器**

首先检查 **Docker Compose** 版本：

```nginx
docker compose version
```

如果是 **Docker Compose V2** ，使用：

```nginx
docker compose up -d
```

如果是 **Docker Compose V1** ，使用：

```js
docker-compose up -d
```

`启动成功后，会看到类似以下的输出：`

```
[+] Running 11/11 ✔ Network docker_ssrf_proxy_network  Created                                                                 0.1s  ✔ Network docker_default             Created                                                                 0.0s  ✔ Container docker-redis-1           Started                                                                 2.4s  ✔ Container docker-ssrf_proxy-1      Started                                                                 2.8s  ✔ Container docker-sandbox-1         Started                                                                 2.7s  ✔ Container docker-web-1             Started                                                                 2.7s  ✔ Container docker-weaviate-1        Started                                                                 2.4s  ✔ Container docker-db-1              Started                                                                 2.7s  ✔ Container docker-api-1             Started                                                                 6.5s  ✔ Container docker-worker-1          Started                                                                 6.4s  ✔ Container docker-nginx-1           Started                                                                 7.1s
```

**第六步：检查容器运行状态**

```nginx
docker compose ps
```

**`正常情况下，你会看到 `**  **3 个业务服务** 和 **6 个基础组件** ：

```
NAME                  IMAGE                              COMMAND                   SERVICE      CREATED              STATUS                        PORTSdocker-api-1          langgenius/dify-api:0.6.13         "/bin/bash /entrypoi…"   api          About a minute ago   Up About a minute             5001/tcpdocker-db-1           postgres:15-alpine                 "docker-entrypoint.s…"   db           About a minute ago   Up About a minute (healthy)   5432/tcpdocker-nginx-1        nginx:latest                       "sh -c 'cp /docker-e…"   nginx        About a minute ago   Up About a minute             0.0.0.0:80->80/tcp, :::80->80/tcp, 0.0.0.0:443->443/tcp, :::443->443/tcpdocker-redis-1        redis:6-alpine                     "docker-entrypoint.s…"   redis        About a minute ago   Up About a minute (healthy)   6379/tcpdocker-sandbox-1      langgenius/dify-sandbox:0.2.1      "/main"                   sandbox      About a minute ago   Up About a minute             docker-ssrf_proxy-1   ubuntu/squid:latest                "sh -c 'cp /docker-e…"   ssrf_proxy   About a minute ago   Up About a minute             3128/tcpdocker-weaviate-1     semitechnologies/weaviate:1.19.0   "/bin/weaviate --hos…"   weaviate     About a minute ago   Up About a minute             docker-web-1          langgenius/dify-web:0.6.13         "/bin/sh ./entrypoin…"   web          About a minute ago   Up About a minute             3000/tcpdocker-worker-1       langgenius/dify-api:0.6.13         "/bin/bash /entrypoi…"   worker       About a minute ago   Up About a minute             5001/tcp
还可以到docker的面板中查看容器镜像的启动情况：
```
![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

## 更新 Dify 版本（当前还不涉及）

进入 Dify 源代码的 docker 目录，按顺序执行：

```bash
cd dify/dockerdocker compose downgit pull origin maindocker compose pulldocker compose up -d
```

`⚠️ 重要：更新时记得同步环境变量配置！`

> •如果 `.env.example` 文件有更新，请务必 **同步修改** 你本地的 `.env` 文件
> 
> •检查 **所有配置项** ，确保与实际运行环境匹配

---

## 访问 Dify

**初始化管理员账户**

先访问管理员初始化页面：

• **本地环境** ： `http://localhost/install`

• **服务器环境** ： `http://your_server_ip/install`

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**访问 Dify 主页面**

• **本地环境** ： `http://localhost`

• **服务器环境** ： `http://your_server_ip`

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

---

## 自定义配置

如果需要自定义配置，编辑 `.env` 文件中的 **环境变量** ，然后重启 Dify：

```nginx
docker compose downdocker compose up -d
```

> 完整的环境变量集合可以在 `docker/.env.example` 中找到。

---

## 下期预告

Dify 本地部署完成后，后面就可以开始使用 Dify 对接 **模型** 了。有 **两种方式** ：

• **方式一** ：自己本地跑模型

• **方式二** ：买 **Token** 直接配置

下期我会详细介绍这两种方式的步骤。提前剧透：

本地部署模型选择使用 **Ollama 插件** 来对接模型，下载 **DeepSeek** 模型。

> 在 **Ollama** 中下载开源免费的 **DeepSeek** 模型。具体下载哪个看自己 **电脑配置** 。我的是 **Mac 24G 内存 + M3 芯片** ，下载的是 `deepseek-r1:7b` ，跑起来毫无压力。

AI探索之路 · 目录

作者提示: 个人观点，仅供参考

继续滑动看下一个

左移

向上滑动看下一个