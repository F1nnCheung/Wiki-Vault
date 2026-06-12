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

![图片](https://mmbiz.qpic.cn/mmbiz_png/myyLXgWFwKUMtWu0PvAVicqXTPLY7OGaLQOciaQeYVHFQyYHVRHndia0gXFdMQVVQNm3AVCuDZahzhsRBtSeQVBlRZpHNRbIhFpGtRL0dLUicPU/640?wx_fmt=png&from=appmsg&watermark=1&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

> 填入组名，点击create group

4.1.2 新建项目

> 创建空白项目

> 输入项目名，点击create project

4.1.3 新建token

> 点击页面右上角头像，选择preferences(偏好设置)或者settings，在左侧导航栏点击access 找到personal access tokens(访问令牌)选项----> add new token

> 输入token名称，并选择失效日期 ，选择scopes-------------->create personal access token

> 拷贝token glpat-L-fXfWkppEshLJSK3beQy286MQp1OjEH.01.0w1kdmts1

五、idea创建项目

5.1 idea安装

> 网址：https://www.jetbrains.com.cn/idea/根据自己的系统选择对应的安装包

5.2 新建项目

> 选择spring boot ----输入名称------输入位置-----下一步

> 填写名称，位置，选择java ------ maven

> 选择web------spring web------create

> 打开刚创建的项目------> 选择刚才创建项目的目录(E:\\idea\\project)

> 修改服务端口为8088

> 在com.example.jenkinstest目录下新建软件包controller，并创建java类HelloController

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

> 右键点击项目运行，并访问

> 测试完成后关闭

5.3 idea配置git

> settings ------> git 在path to git executable里面选择idea所安装主机的git目录(未安装请先安装git)

5.4 配置git仓库

> 选择最上面的版本控制 ---------> 创建git仓库(选择当前项目目录，意思是吧当前项目当做git仓库)

> 出现以下视图表示成功

5.5 关联git远程仓库

> 项目右键 ---> git ---> manage remotes(管理远程) -----> 点击+ -----> 弹出define remote,在URL里面填写从gitlab项目克隆的http连接填进去

> 在gitlab里面复制以下地址

> 填写我们上面复制的token----log in----->成功如下

5.7 提交代码到本地仓库

> 右键项目------> git-------------->提交目录

> 填写信息-----> 提交

5.8 推送项目到远程

5.9 在gitlab上合并代码

> create merge request -------->合并后gitlab如下显示

六、jenkins CICD

6.1 安装maven插件

> jenkins我们需要maven进行构建,需安装maven插件
> 
> dashboard ----> manage Jenkins ----> 插件管理 ----> Available plugins,搜索maven,点击安装

> 当代安装完成后，点击最下方返回首页

6.2 创建项目

> Dashboard ----> All ----> 新建Item

6.3 配置git

> dashboard ----> first ----> Configuration-------点击git
> 
> 输入gitlab的项目地址，选择凭据，没有凭据点击凭据后面的添加，指定分支, 配置maven

> 以上凭据添加

> 配置maven

> 在http：//192.168100.101/configureTools/下配置maven安装路径后并保存

> Root POM保持不变

> Root POM表示，相对于项目文件夹jenkins-test，pom.xml的位置，我们的pom.xml刚好位于jenkins-test路径下，所以不变。保存以上配置

6.4 测试jenkins 打包

> 点击项目运行，

> 如果遇到以上打包报错http，则将maven的/usr/local/maven/apache-maven-3.9.16/conf/settings.xml阿里云仓库http更换为https

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

6.5 安装 SSH Publisher插件

> 要利用jenkins 将这个jar传到测试服务器，需要使用插件ssh publisher
> 
> dashboard ---> Manage jenkins ---> 插件管理 ---> Available plugins,搜索 ssh publisher, 点击安装，安装后返回首页

6.6 配置测试服务器信息

> dashboard -----> Mansge Jenkins ------> system,下滑找到 SSH server 点击新增

> 填写后------点击test configuration 测试连接 ----> 成功后保存

> test configuration 测试连接-----成功后保存

6.7 配置Post steps

> dashboard ------> first ------> configurtion ----> post steps,下拉找到 `send files or execute commands over ssh` ----> 点击add post-build step --- 找到send files or execute commands over SSH

> 配置post steps----保存

> Source files 表示从workspace 开始找编译后的包，jenkins将我们的代码编译到下面路径
> 
> /root/.jenkins/workspace/first/target/

> \*\*：表示任意路径
> 
> jenkin\*.jar：表示通配符匹配
> 
> Remote directory：包存放的远程服务器目录，默认是 ~，即当前使用的 SSH 账户的 家目录。root 用户是 /root，普通用户是 /home/当前用户名

6.8 测试jenkins 传包

> 立即构建，构建成功后，r2的/root目录下多了/target目录

> 返回jenkins6.7找到post steps配置项，配置Remove prefix，去掉/target这一层---保存

> 重新运行构建，第二次构建后直接在/root目录下显示了jar包

> 可见，jenkins多次构建并不会帮我们清楚旧的构建，需要我们编写Exec command来作这些工作

6.9 配置remote director

> 返回jenkins6.7配置post steps，配置Remote director,将jar包放置在项目文件夹里，方便不同的项目管理

> 第三次构建会在/root/目录下生成/jenkins-test目录

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

> 保存后，构建，查看是否成功

> 访问

6.12 更新jar包

> 更新jar包访问内容，重新上传，打包测试

> 推送到远程

> 查看gitlab是否推送成功

> jenkins重新打包

> 查看进程是否启动，结果发现进程id还是以前的

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

> 保存并重新构建，查看pid已经不同，并且更新的内容也跟着变化了

> 访问网页内容也跟着变化了

优化一、

> 如需将远程服务器上jar包存放的根目录进行更改，需要修改以下位置路径,(因为默认是家目录为跟目录)

注意二、

> jenkins构建后生成的目录路径也可以根据以下位置进行修改

**微信扫一扫赞赏作者**

cicd-gitlab · 目录

继续滑动看下一个

kkit运维

向上滑动看下一个