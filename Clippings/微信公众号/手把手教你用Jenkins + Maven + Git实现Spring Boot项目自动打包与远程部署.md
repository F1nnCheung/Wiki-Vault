kkkk运维 *2026年5月27日 17:01*

> 1、程序员将本地代码，git push 到远程gitlab服务器
> 
> 2、jenkins 拉取到jenkins服务器，并用maven帮我们打成jar包。
> 
> 3、最后，jenkins将打好的jar包通过ssh publisher发布到测试服务器

一、基础环境

| 服务器名 | IP | 配置 | 安装的软件 |
| --- | --- | --- | --- |
| r1 | 192.168.100.101 | 16c16g | gitlab\\jdk\\jenkins\\maven\\git |
| r2 | 192.168.100.102 | 2c2g | jdk |

二、gitlab安装

三、jenkins安装

四、gitlab配置

4.1 gitlab创建项目

4.1.1 创建分组

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKUMtWu0PvAVicqXTPLY7OGaLQOciaQeYVHFQyYHVRHndia0gXFdMQVVQNm3AVCuDZahzhsRBtSeQVBlRZpHNRbIhFpGtRL0dLUicPU/640?wx_fmt=png&from=appmsg&watermark=1) ![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKXXTCCj8mYSDOkdkWCVNypL2BueHWawFFRaks4ZDficlfBnU7RfmTNogo0ZEC2e3OXHzn7JzSBcVDEeRFBF9Frb0MCoJQ8Mrt88/640?wx_fmt=png&from=appmsg&watermark=1)

> 填入组名，点击create group

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKXEwu1LRqLlGibB3446YJtvuMlSKGO6A5dZIWWkhibFxp5QcIVsq2GEyWxLLkK40QxmSj410x2Sy2XZR2bIoO313QicVVsDODUYNI/640?wx_fmt=png&from=appmsg&watermark=1) ![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKXnbIwUopibO5FQv1A13tgylYTqAIoHjRjVjVicSvmNt5DAIPxCO5MYTQmD9NibibpMuxzic8hATibLsqy8VHqicA6UCgbAOuORj6EicaM/640?wx_fmt=png&from=appmsg&watermark=1)

4.1.2 新建项目

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKW7UnyLtjWXVxbo411QgOibu455PxeJRaBrReMlW2QsK1umvXTfVpF0Zcn4PefvKAZQyZNQHTzqnF5rLJShI6MhRFpDVcXcRbBc/640?wx_fmt=png&from=appmsg&watermark=1)

> 创建空白项目

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKUqHM4gGAibt10vSu43OPw2mtPVFrYxpHianafzVj6neQLchDocTDry7ptCrY2hHsOEzn6zasJPUjQZhG4jRyibNSrWKWLDFPkTDo/640?wx_fmt=png&from=appmsg&watermark=1)

> 输入项目名，点击create project

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKXtJYOe0Op3zbJYkGcRNM13P5ty3bktIOjJs4SDvNyt0Da2M4YMBfcJLFPjRgwK3q1QEv37ibgvJ1eIu2g8zC4icia7VSc4CxzgAc/640?wx_fmt=png&from=appmsg&watermark=1)

4.1.3 新建token

> 点击页面右上角头像，选择preferences(偏好设置)或者settings，在左侧导航栏点击access 找到personal access tokens(访问令牌)选项----> add new token

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKWoYsIibax6BN2pPEGlHz13BFbcMyEpyQIs4eLicXriaOclGRmeq1cIlHTEyotDlU12ibibTZ0PmCslDdnm3BoA3NMbDs6kSOibDtxdg/640?wx_fmt=png&from=appmsg&watermark=1)

> 输入token名称，并选择失效日期 ，选择scopes-------------->create personal access token

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKVePicgSb3liaxV5hqeiaBdrSWFH3WoDok8myrbvDx60t0MeWwsJiav9HtfHxTdvhNcbRiagSH4lMLUL60iaEjAzo3xXOgKX8Gx3xjnI/640?wx_fmt=png&from=appmsg&watermark=1)

> 拷贝token glpat-L-fXfWkppEshLJSK3beQy286MQp1OjEH.01.0w1kdmts1

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKVE5QbnIRS5gZ3sYWrux3qiabDRUKMTfR886DW7G2icM8sz9BJWF0z3SAKqUJ9cbvic0W0IQvxkicJjkicYxlpmoIk94GedrkSdwkfY/640?wx_fmt=png&from=appmsg&watermark=1)

五、idea创建项目

5.1 idea安装

> 网址：https://www.jetbrains.com.cn/idea/根据自己的系统选择对应的安装包

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKXuRlQ8xpcUdxh8AznGicEfEiakiaXrfRhK2iaicm0guw5phBRp8d2PWNGvedcosjzoq09E2gNSrF4y2nwcAvv2TACzFQrNRHknH0cw/640?wx_fmt=png&from=appmsg&watermark=1)

5.2 新建项目

> 选择spring boot ----输入名称------输入位置-----下一步

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKWjicz2CBH0KtRR47gKoiafDRYibZnAI2M6NQcQYC584uG2FQuE9p481mtbQJaiaKIt1MKgOEibY8YknIRL5HAGje6dKb2XBWV4mbFM/640?wx_fmt=png&from=appmsg&watermark=1)

> 填写名称，位置，选择java ------ maven

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKUURcYibmp07vgOwezBL3xv0URKCdEQUFicPTTtBK0iat4Xkh44UTZnemPu2I3Tkic2ZR6z3mA6RLbQ332ib8KL5WakmyWXVXPniblWA/640?wx_fmt=png&from=appmsg&watermark=1)

> 选择web------spring web------create

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKUDeIQFBhddJSPCXSX9LYDopbZnSSGPzpnKdZDoVtfmxFMNt1fVAKlicmjqbBFZdnb5QgoTVGNHbia3m4SRmAj2GRUvPWA4t0QFs/640?wx_fmt=png&from=appmsg&watermark=1)

> 打开刚创建的项目------> 选择刚才创建项目的目录(E:\\idea\\project)

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKXfKpu0FbgoIFLBs2ESDquJLZJOxIRL8ZPu6pG8fXkYWq9AJtuV4kpZria71Xib3PbblvFup4RXqHEszWOKxygGv0Mdps57oNjSw/640?wx_fmt=png&from=appmsg&watermark=1) ![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKXLoXqhFb4ghxIicQEYroHAv2q4G2mGm2SNd1gqILJ4LN3anm8WMqPNroVey9IuCkVkeGOhxh77IjlZoPcnicGBAGputicYScN4rk/640?wx_fmt=png&from=appmsg&watermark=1)

> 修改服务端口为8088

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKXLQcOj4lfqeNYzFb0Hd0VOxc8VeQGaGibsL8CpVXtbA33Y6SmO5sNtAA6w8VHdAzpyJ55ny3Aqiah2n3FWOmsViaSopXibCxdnC64/640?wx_fmt=png&from=appmsg&watermark=1)

> 在com.example.jenkinstest目录下新建软件包controller，并创建java类HelloController

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKViar7QpHNr1labPYLdDhxH7w6xicQjXIJyuIOPk4FofkEKVblJumWAU1L58735mMODPCchCibKsk4eRRGNv99JImUZMqtkiaicV1Wc/640?wx_fmt=png&from=appmsg&watermark=1)

> ```
> package com.example.jenkinstest.controller;
> 
> import org.springframework.web.bind.annotation.RequestMapping;
> import org.springframework.web.bind.annotation.RestController;
> 
> @RestController
> @RequestMapping("/")
> public class HelloController {
> 
>     @RequestMapping
>     public String sayHello() {
>         return "Hello dev";
>     }
> }
> ```

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKVt12nPT2iaicjbeQaFAy79GGLYIO3Jc2N0hRO6ibyca006rUlgf2uxpbOOZUSjcs1eDGxeicuql3ib8EYeQ4dwuibqrO9WjCVUUKLug/640?wx_fmt=png&from=appmsg&watermark=1) ![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKVhH31jwM4PctA0ibbdpRibFLibY4I5zDnP0xjwKj1dsscPYXBfZhx450ydgHrDTic8hibOIwzj4IGodmx4L2m4FZeEW3D5VLRmttNI/640?wx_fmt=png&from=appmsg&watermark=1)

> 右键点击项目运行，并访问

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKXFnibOBrwS5qGERWYuicjjpzGh8dE5jV3FFaa6kwg349JltTEnoyQsPTjUiapDaBFu81fE8WLo2qamUsQ1fvgQmkI8OGHw10bZHo/640?wx_fmt=png&from=appmsg&watermark=1) ![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKUmvKOcuoTLSSl8Xj8k6QNH7AdftNZicp9oXesibos26yITbW7icS4K0fSwr7Rusp7773JKrwQsqGpAiaRQNx9hd650TWS8iaM1ibcJ4/640?wx_fmt=png&from=appmsg&watermark=1) ![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKV9uJrPX081V4G5vkgSWAoVFMhwI0sgTsia2s64z993IOh9mDnI7JtZ66qd13BCItUjvU99549APAItunrAy5F7aVstbsTeUX3E/640?wx_fmt=png&from=appmsg&watermark=1)

> 测试完成后关闭

5.3 idea配置git

> settings ------> git 在path to git executable里面选择idea所安装主机的git目录(未安装请先安装git)

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKUjoEeRnkYcbEln8sicu4ofDMibL4rqGnTmwWHAhHN07PTY756gYhQM1saykbVbM10oRm5AQOE0sk4tlbozO9rFdc6KS9HGoDXLQ/640?wx_fmt=png&from=appmsg&watermark=1) ![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKW4mDibC8UiajY85NeiaPYBDNlnPDgHnicrnibia2RojTcKykmsJdCeaibQ0XNia9GXEbmIicT84bLnM3pLnQicBaWvHsiasUDqRTfTCMc0tI/640?wx_fmt=png&from=appmsg&watermark=1)

5.4 配置git仓库

> 选择最上面的版本控制 ---------> 创建git仓库(选择当前项目目录，意思是吧当前项目当做git仓库)

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKU6o9xEZC9yvkfnYDYTfUPbpEUHQaPMB9gHQ9L55SfOt1qujZbcBlXiakpUXficTkrlNvW5vvbiaIsWekuFrej2IXLbUiamnArGWDQ/640?wx_fmt=png&from=appmsg&watermark=1) ![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKXMBfXW8d6CZWJXBQNe7vkRibslTiarYzqU0wMnb6UhbQfuKxwyxh8gfrI16tbxXXqZQfxkicJicfiamPXLfqTxnd8GaJ1ruFYak0F4/640?wx_fmt=png&from=appmsg&watermark=1)

> 出现以下视图表示成功

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKVcBRFBaiaib1srTXXQyzVvqoQt9mRzw7LCj0ic62zgrnFbBwAQ1q1Y1Yn10hex5s9nduUwFtVggqrBAVCayh3B0xPuHGT7QJAE8o/640?wx_fmt=png&from=appmsg&watermark=1)

5.5 关联git远程仓库

> 项目右键 ---> git ---> manage remotes(管理远程) -----> 点击+ -----> 弹出define remote,在URL里面填写从gitlab项目克隆的http连接填进去

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKXN8R24oianicoxSdeX1lUgkHSvOhAweOPkdiaYib7wgXfCMibvKe6spqm8VPUsaOWzvz4nMcC2X3icp8rDDR1tXYhhGtSEPdynjfHdI/640?wx_fmt=png&from=appmsg&watermark=1) ![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKVuHpCBAqNzOqusml31gD4qH2ianaq3lfI8xVNaFAKiaeMO2DJEicJ4EYgzD9zDeNicF5diaIxXRt0EibyicJdr2sBziatLmMyHBI6V7wA/640?wx_fmt=png&from=appmsg&watermark=1)

> 在gitlab里面复制以下地址

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKWrYwWtyCL9dKbmZgxo7w8vgeQnlfn57sAYFEp0M3pZ2IuwfeYDy4mvsMvR9SJXVThpj0oQy03W2w9iaoKYpkibHfjic6zYAaldDM/640?wx_fmt=png&from=appmsg&watermark=1) ![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKXtX0OmHENUiavna9CtFiaQUUgJ8QT0auOTD3VBwRzQ6HAOgl7uh2vadXDYhmT1ic0iaoENogKPgxZhv5kkjUic0llwzGeChPTJDAr4/640?wx_fmt=png&from=appmsg&watermark=1)

> 填写我们上面复制的token----log in----->成功如下

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKVDmmKbEvoynd4m6NibVHkeJibaXUTAskx4TmPxVt9l6zK71xCbKoa3rXVFKkCVQFzhXAicHNWbQ3FLYVCLF8Z88d63cV6X3xTh9U/640?wx_fmt=png&from=appmsg&watermark=1)

5.7 提交代码到本地仓库

> 右键项目------> git-------------->提交目录
> 
> ![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKXmH42M2I7bPkVhHHy4pVaUTesedPwicNwSMDPEnas7oSibJibiaBCeMicnmOgSVRvRoozXOjDD9vibfibH12TKexImKrGicpI5ia8ZAlT8/640?wx_fmt=png&from=appmsg&watermark=1)

> 填写信息-----> 提交

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKX9wCWv3LaQvKpib3maWdr6hS1mdpjuk9jJYvoicdk5Ym8uyhicTAkEue5IzMAjABXFF3YficbLFCzr4bNlbHpbybFkNaecsFib8tAA/640?wx_fmt=png&from=appmsg&watermark=1)

5.8 推送项目到远程

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKWrBDU6MT0UQt97YnHo8b9MMTicSzUhJ2hsgtlLPCnm3ibAGf2toStLddZWNPlzlG3neCA4JN6XEKXs9pJxweu4r0lmPhxNLnayA/640?wx_fmt=png&from=appmsg&watermark=1) ![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKWWPuQqo8yicgWhrLpU2Nc8KzBWCQbic5e0fJGz6M5ur07ngkFQOsFHZFwt7YF1rMfBShLQH4lfMrqT4rA9WrYTGEYLK8RicEmpKM/640?wx_fmt=png&from=appmsg&watermark=1)

5.9 在gitlab上合并代码

> create merge request -------->合并后gitlab如下显示

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKW1ibzxMy9vTWQhd1CB0icSOjehG4orehZ1nA1EicfYHd1iaVHu5ckTXCicegAy6kP1SLp9w9vdeAglf2mYzLn2hwXTSRpujCR11E9o/640?wx_fmt=png&from=appmsg&watermark=1) ![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKWcoqfC4iczj7tN4EKfk0h7RhIIkibF8zcoZX1RcHvMVpQBnqI7rTxkHsREXUTcMYK5eSjwbP9Ct6Z4mTjn408wMyZJONxgdgiaQM/640?wx_fmt=png&from=appmsg&watermark=1)

六、jenkins CICD

6.1 安装maven插件

> jenkins我们需要maven进行构建,需安装maven插件
> 
> dashboard ----> manage Jenkins ----> 插件管理 ----> Available plugins,搜索maven,点击安装

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKXGRYFIVeJb96qIiblDEHPZkaZFG9y5Y7kPQZ89pcdGSXbTUhjic8eSk72TyBA6ZHoj0QkhzXich02a4DjojicrGHrm6deH3iaZS1eU/640?wx_fmt=png&from=appmsg&watermark=1)

> 当代安装完成后，点击最下方返回首页

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKWc8VXrk5v9icp5rylxnoM28wZ4pVgGQGzhVibicYjo1Tic6EUsMBVmmB2liaTslYEs4UjLQmswOPPhicv1yeAdagpafO8VCoiccTdmJk/640?wx_fmt=png&from=appmsg&watermark=1)

6.2 创建项目

> Dashboard ----> All ----> 新建Item

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKVQBqFG6OiaSicNQuhWwHuW4ZGiawBBXBISBd69S4020Vx3hyUCibP7lWnkHh34JoV6PtIpWuKdZQJnlxesbfsXbPbF5j5LuLNXYtg/640?wx_fmt=png&from=appmsg&watermark=1)

6.3 配置git

> dashboard ----> first ----> Configuration-------点击git
> 
> 输入gitlab的项目地址，选择凭据，没有凭据点击凭据后面的添加，指定分支, 配置maven

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKXQibMQpWQHmIfl9ibdG78GxUetNpPia8e4SOiawy9yfYQkA87lvIQK5kUslYOOvUxwsvkSTFWAI2Up8jqHw0dxTOTuv13gnfDbeFU/640?wx_fmt=png&from=appmsg&watermark=1)

> 以上凭据添加

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKWdxyd6u9BickicJ7YRvAczylEe0EZYKYQyIic5ZdO1RN8RLbleyibv1qgcV3hbOoNXtt5jxITia7DxOHEdUPU5QnZvvRz6DQNUMeiak/640?wx_fmt=png&from=appmsg&watermark=1)

> 配置maven

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKVgBwsHfqxD8cJax1bm2o2KwVuewiclH2UXglktia7nhibpLRmSHaVIxiaJAK3KhGFF94XWraUmGazfYdC13cDKZH89tPetdic7AE8c/640?wx_fmt=png&from=appmsg&watermark=1)

> 在http：//192.168100.101/configureTools/下配置maven安装路径后并保存

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKVgg6n5osicyYtNydNK59KfUQA6KNKk0x6Jp3fStTEg9BQ0yJrowyMs6XPxRm5fVvibXvzHxeGy4CkuwhZceG3KichBYxS22BAasw/640?wx_fmt=png&from=appmsg&watermark=1)

> Root POM保持不变

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKUYsNJxoga1fiaENTic5NicxZICiaV3AYRuYVPGDOzAswmibp0BFzUMLZjAibWpMxycVZAAkqw2E7mlWQYUq9Gn6NTqBlwibu1S2zX1ug/640?wx_fmt=png&from=appmsg&watermark=1)

> Root POM表示，相对于项目文件夹jenkins-test，pom.xml的位置，我们的pom.xml刚好位于jenkins-test路径下，所以不变。保存以上配置

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKUfUccxGPjamSAgAiazozZKEgSWkDFfHJe8wRZbX0jKVJEqzWv65hBpmL6JM7sMBF0KsibJVVLwLoCvo8OOwOEDaib33BkKhclPHE/640?wx_fmt=png&from=appmsg&watermark=1)

6.4 测试jenkins 打包

> 点击项目运行，

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKWQiaAWJwTn3yGjgghRNqPyicPacWUVnRe1prIXVjcIlpwOm0ichCgGAEGq5SBHofETUBavPcNjroGAUXpfhpXDUnvYrh2HhVWib3M/640?wx_fmt=png&from=appmsg&watermark=1)

> 如果遇到以上打包报错http，则将maven的/usr/local/maven/apache-maven-3.9.16/conf/settings.xml阿里云仓库http更换为https

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKVLlQFJG5RwdT98Tn5wPCichWIeFPsYUOWybGgic3jQK2EjgCeOyyP0E8D6uo1JgsD2W7juPPw5CV4gic4hviaOpkUpvWWUEDeWu4U/640?wx_fmt=png&from=appmsg&watermark=1) ![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKXoVlIlK3HQPjyFnsRYCnibQFtetOyW8CZtibcialXRcN5D4picqj2kEzLuRhBTXFAicbh7Ljtn0h4ITwHb9PzJcZ8BMswUWJRU5sfk/640?wx_fmt=png&from=appmsg&watermark=1)

> 进入/root/.jenkins/workspace/first/target/测试打出来的包是否运行成功

```
[root@r1 ~]# ll /root/.jenkins/workspace/first/target/
total 19352
drwxr-xr-x 3 root root       47 May 27 15:49 classes
drwxr-xr-x 3 root root       25 May 27 15:49 generated-sources
drwxr-xr-x 3 root root       30 May 27 15:49 generated-test-sources
-rw-r--r-- 1 root root 19809865 May 27 15:50 jenkins-test-0.0.1-SNAPSHOT.jar
-rw-r--r-- 1 root root     3506 May 27 15:50 jenkins-test-0.0.1-SNAPSHOT.jar.original
drwxr-xr-x 2 root root       28 May 27 15:50 maven-archiver
drwxr-xr-x 3 root root       35 May 27 15:49 maven-status
drwxr-xr-x 2 root root      137 May 27 15:50 surefire-reports
drwxr-xr-x 3 root root       17 May 27 15:49 test-classes

[root@r1 ~]# java -jar /root/.jenkins/workspace/first/target/jenkins-test-0.0.1-SNAPSHOT.jar

#  启动后，网页访问IP:8088，成功则表示打包没有问题。测试成功后杀掉进程
```
![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKV3IVYbHq44tA3q4PScXq79V9orichVSMQFgNMd2AA1SIy9iaWAfCTIkFM21bBO4WAPDM5dHgOmoicey1ibwHbMibiab0JP7CT58Ls0I/640?wx_fmt=png&from=appmsg&watermark=1)

6.5 安装 SSH Publisher插件

> 要利用jenkins 将这个jar传到测试服务器，需要使用插件ssh publisher
> 
> dashboard ---> Manage jenkins ---> 插件管理 ---> Available plugins,搜索 ssh publisher, 点击安装，安装后返回首页

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKVrm8wSeasVLibiavN3V5A8Rv81g3FTbSmsGI5aXBeLQC0OS03VfuJ4ovNZGITOzrjYptI6gGUceV1vTnyWSE9xu4SyNbq05nBOw/640?wx_fmt=png&from=appmsg&watermark=1) ![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKX2n5f2ib137bOarowNZD5yBJCJicpibbiaSNtpvn1n9btsO2akZLpibsVtwvHOjjuYpWVru0o2xBW8BxdUt4ibAvX6CX5OiakngGmepI/640?wx_fmt=png&from=appmsg&watermark=1)

6.6 配置测试服务器信息

> dashboard -----> Mansge Jenkins ------> system,下滑找到 SSH server 点击新增

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKUiaJOYUXy5Zn9DFL2F1l2icR0MPW5xAibGpeSqPibVNbnwIeBRHw4UGEN84OelLlLcJ83FXQdnc5Z9T3icUvS4nHVTeZQ8sGuhjTl4/640?wx_fmt=png&from=appmsg&watermark=1)

> 填写后------点击test configuration 测试连接 ----> 成功后保存

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKVGo8IufsP7pibYgV4KaGdSY96z1iaZkz5UfOB7wzpuhLXZfpYylKcjBGOQxFiaknjCHL4896APd8IIdF5UrEsJZdMYdNTib2yu08g/640?wx_fmt=png&from=appmsg&watermark=1)

> test configuration 测试连接-----成功后保存

6.7 配置Post steps

> dashboard ------> first ------> configurtion ----> post steps,下拉找到 `send files or execute commands over ssh` ----> 点击add post-build step --- 找到send files or execute commands over SSH

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKVXZcHZntsJeQJqhnbhKO03x21TqKPYANo1XgLBXoCWC8T5t1drWts0NSicaDODYzQPhxr9UrIAWKKk7sQdSH2hnxBTpovg7DbA/640?wx_fmt=png&from=appmsg&watermark=1)

> 配置post steps----保存

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKXelpq7eSdAYpQpEKMPib9Xict8SvZOCEqhCKEGeicH9Bs7juRSakZszDkiaJBBB2x63MS0fIAZtt2SS8MFyicdeM5smxbGIlzYEdRk/640?wx_fmt=png&from=appmsg&watermark=1)

> Source files 表示从workspace 开始找编译后的包，jenkins将我们的代码编译到下面路径
> 
> /root/.jenkins/workspace/first/target/

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKWXGw21CHVPOvoqtwsEYMJuRUC0j8yOxuWlGl0pf9Zwgcwhhhsd8ibhcKNNbt7HY6pibK9s3nUCv0Gm9ls44EibBE7ls3kelianoiaY/640?wx_fmt=png&from=appmsg)

> \*\*：表示任意路径
> 
> jenkin\*.jar：表示通配符匹配
> 
> Remote directory：包存放的远程服务器目录，默认是 ~，即当前使用的 SSH 账户的 家目录。root 用户是 /root，普通用户是 /home/当前用户名

6.8 测试jenkins 传包

> 立即构建，构建成功后，r2的/root目录下多了/target目录

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKXPJKlYgWtFsdjrC3ic80zfblIPuHTOYHRYs5zFI6rAnMJiaIs2CibqjduZZGLVG2m0qzPszsibz1wfXPQibQYdbnYLwjvIM9CNY2ib0/640?wx_fmt=png&from=appmsg&watermark=1) ![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKWTaCdcuXEY8zZsRkcu5LBWmfrEVEulFRK4YfNqNzSpkdTRtCHOdksBhdWG3iclaQ6UuA8ku2wal4ZCEQYDthWEIBbsScRaDnibE/640?wx_fmt=png&from=appmsg)

> 返回jenkins6.7找到post steps配置项，配置Remove prefix，去掉/target这一层---保存

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKXrhoPvWWAFZhC720F147D4Vv3cicGSVIM3csUtQyXibE6TKxvDic04kyDhgrhuUWydQia1G6MGNEkOvQMtFQAibEtcspdVibov2bY3E/640?wx_fmt=png&from=appmsg&watermark=1)

> 重新运行构建，第二次构建后直接在/root目录下显示了jar包

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKWI6O8ypmic9UB4PN2hYkbNtxTEa2M0AC0eG6fkGPvEZIbJnF1sZwZf8Metyuauic7Xo2CwejpwGhnJVCicmcctS4uZsCzSeqqMKg/640?wx_fmt=png&from=appmsg&watermark=1)

> 可见，jenkins多次构建并不会帮我们清楚旧的构建，需要我们编写Exec command来作这些工作

6.9 配置remote director

> 返回jenkins6.7配置post steps，配置Remote director,将jar包放置在项目文件夹里，方便不同的项目管理

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKVCLggJVJtj9Ar6WmFKQytx01Yy2Piay7poEVCEQrSAyWjzI1vXlrIic84wibLpXqtNXvV1iamMaibGQQUZTA6O7e8Qr0HEbQL4M6T4/640?wx_fmt=png&from=appmsg&watermark=1)

> 第三次构建会在/root/目录下生成/jenkins-test目录

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKVP8zqfwcq7hKDjGRjibz2icwGfBXz0D8nicjE97PdU7Jib69rRde5so2kQxCe4oYpiaYS9dq86NtURmPUYovqfWNxK0mibIZFeGURnw/640?wx_fmt=png&from=appmsg&watermark=1)

6.11 配置Exec command 运行jar包

```
nohup /usr/local/jdk/jdk-17.0.12/bin/java -jar /root/jenkins-test/jenkins*.jar >> /var/log/log.out 2>&1 &

nohup（忽略挂起信号）：进程与终端解耦，即使终端关闭，进程仍能继续运行。
 >>：将 nohup java -jar 的日志输出，从标准输出（控制台）重定向到 /var/log/log.out 文件。并且是以追加的方式。
 2>&1：将标准错误输出（2）重定向到标准输出（1），而标准输出在前面已经被重定向到 /var/log/log.out 文件，所以标准错误输出也被重定向到 /var/log/log.out 文件。
 最后一个 &：后台运行程序，此时终端会立即返回控制权（可以继续输入其他命令）。

 注意: r2服务器需要提前安装java，参考安装jenkins文档
 并在/etc/bashrc下面添加以下内容，因为/bin/bash启动的终端也需要配置JAVA_HOME
 -------------------------------------------
export JAVA_HOME=/usr/local/jdk/jdk-17.0.12
export PATH=$PATH:$JAVA_HOME/bin
export CLASSPATH=.:$JAVA_HOME/lib/
------------------------------------
```
![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKUqeHTJFc6mypWc4KQ1BeJnMxTXcoicAep3XGbDGs9eOicoC8W5Smfasar27J5rcwe9icVolea5zRFzib6KshSPyMzDJUhaGWpEPkY/640?wx_fmt=png&from=appmsg&watermark=1)

> 保存后，构建，查看是否成功

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKXU7EXedlvOIMQbR9cnYLpN36jsaLexTR2DmIleTOeShf4rOFFyjjNiaZf4U1pFUe2JbCAAfhrDSYC2B16ITRT7BXwbV9vpmTD0/640?wx_fmt=png&from=appmsg&watermark=1)

> 访问

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKXIqgeWbxPEbGcyOblXKiaulPCQ0lJvcnzzKGKFP8LpwRqiapKEUeJtVT27Fmdhs0tn400O6V6dtMmUtgp3XnWHiafDjMHH7jMImc/640?wx_fmt=png&from=appmsg&watermark=1)

6.12 更新jar包

> 更新jar包访问内容，重新上传，打包测试

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKXn4MSvfGOp60acHicYnIPicN6VIuplMjFGCNTpOwSFiaDlGIqgu8cYZZ5lwObcHS7X5If9OT1J0icicRaz0pvudgWyiaW9897B169dk/640?wx_fmt=png&from=appmsg&watermark=1) ![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKXSzsbfWj5MwkPSHnSnY1UUANgsib2aictrkl16PyLic7njSfk1ZibsDuQSacqob6KxPwwAqiaEVIQyLp29DAPJ6PyrchVia8bXWlx1A/640?wx_fmt=png&from=appmsg&watermark=1) ![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKUicTvZHd0Ha9SM4aDm2ib0rKFQBEgw43XEeiaib7mdVBSiaTmAmTepicbqV2H5oCsRG3uia62qDc6ZiaVmRqKXYDX7CeoWh7y3LOcoYX0/640?wx_fmt=png&from=appmsg&watermark=1)

> 推送到远程

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKXYKluRNyibWI4Q3xFsz1UjRLuhrOTb1jIF5kbLcuefBql4j473PYtujT2gxqvicoicwrbYmA6MYJwwiaUiazItWh5QgZdRcj8fs5Cs/640?wx_fmt=png&from=appmsg&watermark=1) ![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKX9afyocUwekMtaBpTjXicTaGm8w0pE9fqpSASn8u6hPDR7Lu7aE4IKNVXkaXfQ3zfLseaHC7DoQEWhAL2richHqalRSltmqrf0w/640?wx_fmt=png&from=appmsg&watermark=1)

> 查看gitlab是否推送成功

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKWWep8jIBU9qZC9My3dKTtXVSwT0TyTZHYjtSrgUZsibKSbvtTW45yV3eIaJl0Lt0fS3ZsO5YAEMwWU4GLbGicHCSowicNtlP3oVk/640?wx_fmt=png&from=appmsg&watermark=1)

> jenkins重新打包

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKXyn9UMcAyGWk24ibonOUFM4iaWnRgJ4enIU67TtjxvJgzuTSqGj6sPfbSfSzZjcaIIMTNuYzN97bLL4KUnx9OADCJ01pEjwia8WE/640?wx_fmt=png&from=appmsg&watermark=1)

> 查看进程是否启动，结果发现进程id还是以前的

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKWNia5pBkGveT3St6YfruujjZCVA1p0DEvwwWEaL2NEoFIFcMoNeYatWyE5tFErcdTgGP4y3kUwv6MrAHJzITBDB0pepaxR4yeY/640?wx_fmt=png&from=appmsg&watermark=1)

> 我们在这里更新gitlab，重新jenkins打包后，发现访问内容没有变化，查看/var/log/log.out日志发现端口被占用，没有重新启动新的进程，所以导致不管我们怎么更新内容，重新jenkins打包，旧的进程都无法自动退出，启动心得进程。所以解决这个问题，需要我们构建前清理旧的进程和jar包。

配置 pre steps

```
# 编写清理脚本，/root/clean.sh
#!/bin/bash

appname=$1

if [ -z "$appname"]; then
    echo "应用名称不能为空！"
    exit 1
fi

echo "应用名称为: $appname"

# 删除旧的 jar 包（假设 jar 包在当前目录下，如 jenkins-test-0.0.1-SNAPSHOT.jar）
rm -f "./${appname}"*.jar
echo "已删除旧的 ${appname}*.jar"

# 优雅地停止进程
pid=$(pgrep -f "java.*${appname}.*\.jar" | head -1)

if [ -z "$pid"]; then
    echo "$appname 未运行"
else
    echo "找到进程 PID: $pid，正在停止..."
    kill -15 $pid   # 先尝试正常终止

    # 等待最多 30 秒
    for i in {1..30}; do
        if ! kill -0 $pid 2>/dev/null; then
            echo "$appname 已停止"
            break
        fi
        sleep 1
    done

    # 如果仍未停止，强制杀死
    if kill -0 $pid 2>/dev/null; then
        echo "正常停止失败，强制终止..."
        kill -9 $pid
        echo "$appname 已被强制终止"
    fi
fi

chmod +x /root/clean.sh
```
![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKUgSP6IyZ6U8Do9Ux2JKbgbCjPAGr1uj9K5rL7fqwzFvShAegLS7yzE3n5f2jZ6H3PhUVyKWCm9TvzLoBA5j2awuq7sibv3Vhlo/640?wx_fmt=png&from=appmsg&watermark=1) ![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKUyYGMrGxdUFt0QiaziaibaCVxEkic3xhqquF6JowHDkibUvtaa7WolyTJ1TntjARXIn0BcRQUuDmGYTXOlfnvQp7KHiasmmQPZquYiaA/640?wx_fmt=png&from=appmsg&watermark=1)

> 保存并重新构建，查看pid已经不同，并且更新的内容也跟着变化了

![](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKXx0ErPHBiaTVaDVooUbQ1zniaeHJEJc6Yicj1hFBm3o1TFyvNIdSzWcRucLZ7FfU7ZKZEqCIqJPSq6CwCccjE5vZuL1tqQx6Iwyo/640?wx_fmt=png&from=appmsg&watermark=1)

> 访问网页内容也跟着变化了

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKU6mIEM3niarT72Qfufqs4ibHLeuCGIAme99m1dULRsibWKAkbpP2d0HHag0q9T9tHia0lCP7ibxqzMqBhTE6kNOaerOb57Zj3BoXibQ/640?wx_fmt=png&from=appmsg&watermark=1)

优化一、

> 如需将远程服务器上jar包存放的根目录进行更改，需要修改以下位置路径,(因为默认是家目录为跟目录)

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKVHaRnARCLfs3o0IPQtOWLC09ZyaBNBnbs92OmqGLIpIVtj9t66sw0ZB1zjyXrZIRuIkvdOVCPlyM80B2CQw6aANfrc8ujoEico/640?wx_fmt=png&from=appmsg&watermark=1)

注意二、

> jenkins构建后生成的目录路径也可以根据以下位置进行修改

![](https://mmbiz.qpic.cn/sz_mmbiz_png/myyLXgWFwKVSqL3aTAia5STib6jNZWRmtrgG5wSrRRibG8ribUIaQlLPqCYNaslk30MFkZIWHKlwzMPCicVvxSTqpYibLjhOVa1jnr6WVmZfTRfEc/640?wx_fmt=png&from=appmsg&watermark=1)

**微信扫一扫赞赏作者**

cicd-gitlab · 目录

继续滑动看下一个

kkit运维

向上滑动看下一个