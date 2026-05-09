---
title: "Claudecode保姆级教程(搭配Skill+mcp)"
source: "https://mp.weixin.qq.com/s/HhaPKPLXwWN0IbA_i9i8DQ"
author:
  - "[[电子灵魂华]]"
published:
created: 2026-05-08
description: "Claudecode保姆级教程(搭配Skill+mcp)"
tags:
  - "clippings"
---
电子灵魂华 *2026年4月28日 20:34*

目前市面比较好的AI工具有Claude Code、Codex、OpenCode、openclaw、Gemini CLI，  
简单来说他们本质都是一个智能体，相比聊天，多了规划和自动动手能力。目前最智能的就是Claude Code

以下开始Claude Code的教程

**本文会具体涉及安装使用claudecode,文件配置，相关命令学习，llm模型配置,以及叠加mcp和Skills的使用**  
下面一张图说明四者关系，并在下文教程中具体使用

![图片](https://mmbiz.qpic.cn/sz_mmbiz_png/SZNNkibwlOq3AsJZIx9mibjElHtQP3R98JAoiaY9fE3zyic5UtwkM63X5U4ZicvbDXgBP6OT6OZ1Za3qfhVAD1LboN2JubrPCSr7QY2f7QPIYSSE/640?wx_fmt=png&from=appmsg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

### 简单说明Claude Code

相比普通AI聊天（平常使用豆包，ds），claudecode不仅能聊天还能能直接动手做事

借用网上一张图，对比说明下

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

简而言之：只需描述您的需求，Claude 即可处理其余一切

### 提前准备

**1 安装git(必须)**  
git-scm.com/install/windows

进去找到适合自己计算机的版本 点点点就行  
win安装成功后桌面空白右键会看到'open git bash here'表示安装成功

**2 安装node（必须）**  
https://nodejs.org/zh-cn

3 Watt Toolkit(非必需，加速器工具)  
https://steampp.net/

github加速器 可以让你在国内顺利快速访问github，谷歌翻译等

4 安装tabby（非必需但推荐）  
https://tabby.sh/

一款可无限定制的跨平台终端应用，适用于本地shell、串口、SSH和Telnet连接  
一个替代cmd命令行的工具 经验上好用的多，而且功能多  
既然之后要在命令行使用claude,相比原生的cmd,一款好用的终端必不可少

以上我已经下载打包好了，不会的拉到末尾 ，回复获取网盘链接

### Claudecode安装

官网（文档）地址：  
claude.com/product/claude-code  
code.claude.com/docs/zh-CN

**1 打开powershell**  
打开powershell,一般在搜索可以搜到 搜不到直接找源头，

> C:\\Windows\\System32\\WindowsPowerShell\\v1.0
> 
> 这个目录下，双击即可

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**2 开始下载**  
输入：irm https://claude.ai/install.ps1 | iex

如果无法安装，请尝试  
1 winget install Anthropic.ClaudeCode  
或者  
2 npm install -g @anthropic-ai/claude-code

验证：  
claude --version  
注意：有时候提醒安装成功后需要重启计算机或者重新打开cmd才可以生效

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### Claudecode文件配置

上面看到我们还无法使用，因为Claude对国内封闭比较严重，所以要先修改配置文件和配置模型

**1找到配置文件**  
C:\\Users\\Administrator.claude\\settings.json

按照如下格式修改  
hasCompletedOnboarding":true, #绕开检验  
env为模型相关配置示例  
{  
"hasCompletedOnboarding":true,  
"env":{  
"ANTHROPIC\_AUTH\_TOKEN": "你的APiKey",  
"ANTHROPIC\_BASE\_URL": "你的baseurl",  
"ANTHROPIC\_MODEL": "你的模型"  
}  
}

下面使用阿里云百炼为例，配置相关信息

**2配置模型**  
通常Claudecode账号大部分会被封禁，所以这里使用国产模型，可以使用glm-5.1或者MiniMax M2.7或者kimi或者ds，qwen等  
通常去官网查找模型就行 用最好的就行

这里选择 **阿里云百炼** ，开始有免费额度，刚开始测试够你用啦

地址：bailian.console.aliyun.com/

进入后点击模型用量，查看免费额度这里开启glm5.1测试

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**参数配置**  
点击文档-->接入客户端-->ClaudeCode #查看配置信息  
其他平台以此类推

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

获取apikey，在模型左边最后一个有APiKey选项，复制到配置文件

{  
"hasCompletedOnboarding":true,  
"env":{  
"ANTHROPIC\_AUTH\_TOKEN": "你的APiKey",  
"ANTHROPIC\_BASE\_URL": "https://dashscope.aliyuncs.com/apps/anthropic",  
"ANTHROPIC\_MODEL": "glm-5"  
}  
}

最后保存配置文件，接下来测试一下

**说明如果感觉配置文件有点麻烦 可以下载如下CC-switch来管理相关模型配置参数**

#### cc-switch-非必要（模型配置管理工具）

cc-switch：支持 Claude Code、Codex、OpenCode、openclaw、Gemini CLI 五合一切换与管理的跨平台桌面应用！目前在GitHub上已经斩获52.8K Star！

解决AI编程辅助工具使用痛点

> • 想同时用官方Claude系列模型、或者某个中转或国产的便宜模型 → 得手动改配置文件  
> • 多个API Key、多个代理地址来回切 → 改错一次就全乱套  
> • 不同工具的MCP服务器、Skills、Prompts各自管理 → 维护成本爆炸  
> • 换模型测试效果 → 重启终端、重新认证，效率极低

项目地址：  
github.com/farion1231/cc-switch

不会下的直接查看结尾 回复后网盘获取

### Claudecode简单使用

接下来就可以愉快的使用Claude的

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

首先找一个新的工作空间（新建一个文件夹），切换到这个文件夹 输入Claude 开始干活

接下来我们首先要学习如何使用Claudecode，所以我让他创建一个学习 Claude Code 命令的网站

“帮我做一个学习Claudecode命令的网站，使用HTML实现”

几分钟后他就创建好了，如下

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E) ![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

### 相关命令学习

1 三种模式（shift table切换）  
？for shortcuts #默认模式(修改文件前询问)  
accept edits on #自动模式（自动修改）  
plan mode on #规划模式（只讨论不修改）

注意：启动 **claude ----dangerously-skip-permissions** #绕过权限模式，完全自主模式

2 常用技巧

```
！bash模式； / 查看相关命令；shift+enter 换行；
ctrl+g 编辑器编辑；
/tasks #查看命令； esc #返回; /rewind 2次esc#回退;
/resume #恢复历史会话 或者执行Claude -c；
/btw(By the way) #不中断主任务、不污染对话历史的前提下，快速提问并获取答案
/compact #压缩上下文； ctrl+o 查看压缩后的内容
/clear #清空所有上下文
/init #生成CLAUMD.md文件 项目记忆文件
/memory #选中后可直接打开CLAUMD.md
/hook #钩子 在项目开始结束前后自动做些事情
```

### MCP 使用(在claudecode中)

mcp官网：modelcontextprotocol.io/  
mcp市场：https://mcp.so/zh  
claudecode中如何使用mcp：  
code.claude.com/docs/en/mcp

官方解释

> MCP（模型上下文协议）是一种用于将 AI 应用程序连接到外部系统的开源标准。  
> 使用 MCP，Claude 或 ChatGPT 等 AI 应用程序可以连接到数据源（例如本地文件、数据库）、工具（例如搜索引擎、计算器）和工作流程（例如专门的提示），从而使它们能够访问关键信息并执行任务。  
> 可以将MCP视为人工智能应用的USB-C接口。正如USB-C提供了一种连接电子设备的标准化方式一样，MCP也提供了一种将人工智能应用连接到外部系统的标准化方式。

简单来说mcp就是使得智能体能够更好的使用各种工具；  
一般其他出名的应用比如github,figma等都会开发自己的一套mcp,这样我们就可直接安装相关mcp服务后就可以直接使用，一键获取相关信息

相比以前需要自己去写函数，调用接口，相比简单的多。

示例：安装一个mcp--Context7

> Context7 是一个 MCP 服务器，通过动态注入最新、版本特定的文档到你的提示词中来解决这些问题。当你在提示词中包含 use context7 时，服务器会获取当前官方文档和代码示例，并直接集成到你的 AI 助手的上下文窗口中

**配置命令：**  
claude mcp add context7 -- npx -y @upstash/context7-mcp@latest  
参数：--scopes （-s）#安装范围

> Local #当前目录（默认）  
> Project #当前项目下 利于团队协作  
> User #所有项目

**触发：使用提示词 +"use context7"**  
例如：  
Create a CRUD API in FastAPI with authentication. **use context7**

```
claude mcp list #查看mcp列表
claude mcp get github #查看指定mcp
claude mcp remove github #删除mcp
/mcp
/mcp github #查看某个mcp详细情况
```

### skills以及插件使用

先说一下plugin，输入命令后如下 ，以下重点说下skills

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

```
/plugin #一个整合全能包 包括skill，hook等等
```

skills 简单来说就是智能体的操作手册和说明书

**常用skills地址**

> 官方仓库：https://github.com/anthropics/skills  
> 社群网站：https://skillsmp.com/zh  
> 热门Skills：http://agentskills.so/zh  
> awesome-skills：(56.8k)  
> github.com/ComposioHQ/awesome-claude-skills

**编写规范**  
https://agentskills.io/home

**Skill 文件结构**

> skill-name/  
> ├── SKILL.md # 必需：技能说明和元数据  
> ├── scripts/ # 可选：辅助脚本  
> ├── templates/ # 可选：文档模板  
> └── resources/ # 可选：参考文件

**SKILL.md 模板**

```
name: my-skill-name
description: 对该技能功能和使用时间的清晰描述。
---

# My Skill Name

详细描述技能的目的和功能。

## 何时使用此技能

- 使用场景 1
- 使用场景 2
- 使用场景 3

## 说明
[Claude 如何执行此技能的详细说明]

## 示例
[展示技能实际应用的现实世界示例]
```

**Claudecode中使用skills**

复制上面下载相关skills到如下目录（按需复制）  
项目集目录.claude/skills/  
全局极目录：~/.claude/skills/

接下可以尽情发挥自己的想象，通过Ai将想法快速落地实现

尽情想象 ，无限可能！

**以上所有软件和skills,不会下载的直接回复claudecode\_tools获取全部安装包**

**微信扫一扫赞赏作者**

agents · 目录

继续滑动看下一个

电子灵魂华

向上滑动看下一个