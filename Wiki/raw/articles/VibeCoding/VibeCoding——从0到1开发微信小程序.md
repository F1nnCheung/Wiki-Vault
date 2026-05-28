子言sugar *2026年5月18日 16:47*

又是好久没有发文章了，主要还是4月的时候，家里的小朋友一直在感冒，又是高烧不退，又是幼儿急疹。感觉那些天整个人都是晕的，再加上最近也一直在忙着工作上的事。所以也是偷了个懒，好久没发文了，还是要加坚持加油。

想来想去，感觉还是给大家分享下最近的学习AI的一些经历吧。体验了trae的solo模式(MTC下AI的体验又是不一样的感觉)，ai的发展还是太快了，只要不学，那有些知识就没必要学了。

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/Zvh48oWTRGMT0t5IInSqpBKMnE3icMExZcQmicHzphiaebl5RF60dSqOicJWrj4wbpCiaoEQS2tw1qaNlw12KQsgVTlz5aV3mWpFUaoib2LpnXqib4/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

今天分享个通过Figma+trae实现从0到1开发一款多端小程序的实战吧，主要讲解的是思路，也希望大家可以一起多多交流，

***01***

使用Figema生成原型图

1、登录https://www.figma.com/ Figma网站，注册登录。我们可以自由输入你想创建的应用。比如

```js
创建一个宝妈馄饨的微信小程序，要温馨。体现宝妈，婴儿元素。三个根页面，我的，订单，菜单
```

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

2、Figma就会生成我们想要的页面，也可以调整样式，直到你满意为止

***02***

使用HbuilderX创建初始模板

1、下载HbuilderX,访问https://www.dcloud.io/hbuilderx.html

```js
Hbuilder是一款开发Uniapp的IDE编辑器，通过Uniapp+UniCloud我们就可以生成多端的应用程序了
```

2、新建项目，选择去搜索，下载一键登录的插件。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

3、关联服务空间，这里的服务空间，存放的就是我们后台的数据库还有静态资源的地方。这样我们一个初始的程序就搭建好了。

***03***

使用Trae生成程序

1、下载Trae,https://www.trae.cn/。这就是我们的AI的编辑器了

2、打开trae，我们将Figma生成的原型图，下载放到我们HbuilderX搭建的项目框架里。拖动整个文件夹到AI对话框，然后提问

```js
参考这个figma原型图文件，一比一复刻开发小程序的前端页面
```

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

这时我们的Trae就会开始工作，严格按照我们的原型图开始构建项目了。

***04***

使用微信开发者工具运行

1、下载微信开发者工具，访问https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html

2、打开unpackage\\dist\\dev\\mp-weixin这个目录，配置好我们的小程序AppID，在微信小程序中运行，我们就可以一键登录，运行了啦。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

3、大功告成！

***05***

End

说到最后，有了AI我们可以看到确实极大的缩短了我们的开发，又或者让不懂代码的人可以跟着一步一步开发出属于他们的软件。当然有些基础的知识，还是要掌握的，我上面的开发过程，也是给大家提供了一些思路，距离真正的成品还是有很多优化的空间。

比如在trae里面，我们还可以选中我们的菜单页面，拖到trae的对话框里，然后选择我们uicloud的服务空间里面的对象，做具体的后台的数据替换，这样我们的菜单就是动态的了，我们也可以去维护我们服务空间的数据库的数据，实现前后台的交互。

好了，大家也可以直接使用trae的MTC模式，直接全流程去开发，大家都去试一试吧。

最后，请关注，留言，交流下各位对于AI的一些心得吧。

**\- END -**

点亮【 **赞与在看** 】，让这世间的好运都流向你。

AI · 目录

作者提示: 个人观点，仅供参考

继续滑动看下一个

子言sugar杂谈

向上滑动看下一个