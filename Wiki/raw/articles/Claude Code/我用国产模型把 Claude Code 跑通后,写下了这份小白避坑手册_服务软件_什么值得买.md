## 我用国产模型把 Claude Code 跑通后,写下了这份小白避坑手册

这篇东西的目标读者是完全没碰过命令行、没装过 Node、看到终端黑窗口就头皮发麻的人。如果你已经会用 npm,后面大部分内容你可以跳着看。

读完你会得到三样东西。一个能在本地跑的 Claude Code,接的是国产模型,合规可用。一套清晰的概念地图,知道模型、Agent、Skill、MCP 这些词到底在指什么。一个真的能用的早读小工具,做完直接能在小红书发布。

## 写在前面的两条建议

完全新手按顺序做完前五章,能跑出第一个网页小工具就算入门。

遇到任何报错,直接截图丢给 Claude Code 或者豆包,描述清楚我在哪一步、看到了什么报错。比自己百度快十倍。

## 第一章 把基础概念搞明白

很多人卡在第一步不是因为脑子笨,是因为名词没串起来。听到一个不懂的词就慌,慌完整个人就放弃了。这一章把后面会反复出现的词一次性掰开。

### 1.1 三个最核心的概念

`模型(Model)     = 大脑(只会思考,没有手脚) Chatbot(聊天机器人)= 大脑 + 一张嘴(能说不能做) Agent(智能体)    = 大脑 + 手脚 + 工具箱(能说能做)`

模型是大脑。GPT、Claude、Gemini、DeepSeek、豆包、千问、Kimi、GLM、MiniMax 这些都是模型。

Chatbot 在模型外面套了一个对话框。ChatGPT 网页、豆包 App、DeepSeek 对话框,你跟它一问一答,它回答你,但活儿得你自己干。

Agent 在模型外面套了一整套执行环境。你说帮我建一个网站,它直接在你电脑上建文件夹、写代码、跑起来、自己调 bug,最后告诉你做好了。Claude Code 就是 Agent。

同一个模型放在不同工具里,能力差别非常大。同样是 Claude 模型,放在网页里只是聊天,放在 Claude Code 里就能自己写代码。这件事记住,后面配国产模型时会反复用到。

### 1.2 Token、上下文、Harness

Token 是 AI 理解文字的最小单位。一个中文字大概一到两个 Token,一个英文单词差不多一个。Token 是你用 AI 的电费,学习阶段不要省。

上下文是你跟 AI 这一轮对话里所有内容的总和。AI 没有长期记忆,桌面上放多少资料它就能参考多少。

上下文窗口是每个模型桌面的大小。2026 年主流模型基本都到了 100 万 Token,大概对应 70 到 80 万字。

上下文污染指的是在一个窗口里东聊一句、西聊一句,AI 会乱。一个窗口聊一件事,切话题就开新窗口。

Harness,中文叫挽具,也叫上下文工程。这不是某个软件,是一套驾驭 AI 的方法,包括怎么组织信息、怎么管理上下文、怎么引导 AI、怎么验证结果。Claude Code 之所以好用,就是因为它把 Harness 做得最成熟。

### 1.3 Skill 是什么

Skill 是给 Claude 看的 SOP 手册。

麦当劳全球几万家店巨无霸味道都差不多,不是每个店都有大厨,是每个店都有 SOP。Skill 对 Claude 来说就是这套 SOP,把先做什么、再做什么、用什么工具、做成什么样算合格,全部写死。

写一次,反复调用。把自己的工作经验教给了 Claude,它从此就是你的虚拟员工。

### 1.4 三种付费方式

[![我用国产模型把 Claude Code 跑通后,写下了这份小白避坑手册](https://am.zdmimg.com/202605/20/6a0d25b95dad08099.jpg_e1080.jpg)](https://post.smzdm.com/p/ak8evrd9/pic_2/)

最现实的方案是用国产模型 API 加 cc-switch 一键切换。第三章会细讲。

### 1.5 安装前要懂的辅助工具### 1.6 MCP,给 Agent 用的插座标准

MCP 全称 Model Context Protocol,模型上下文协议。

你可以理解成一种插座标准,让 Agent 能对接各种外部工具和数据源,飞书、数据库、浏览器、小红书、微信公众号都行。

类比一下。USB 接口让你能给电脑插各种外设,插上音响电脑就多了播放音乐的能力。MCP 让你能给 Claude Code 插各种工具,插上 Tavily 它就多了搜实时热点的能力,插上 xiaohongshu-mcp 它就多了发小红书的能力。

默认情况下,Claude Code 只能处理你直接给它的信息,不会主动上互联网搜资料。装了 MCP 它才能搜索、读数据库、调外部 API。

### 1.7 多模态,AI 不只会读文字

模态就是信息的类型。文字是一种模态,图片、声音、视频都是不同的模态。

单模态只能处理文字,你打字它打字。多模态能同时处理文字、图片、音频、视频、文件、屏幕。

2026 年主流模型支持的模态:输入和输出不是一回事。AI 能看懂某种模态,不代表它能生成这种模态。几乎所有主流模型都能看图,但只有部分能画图,比如 GPT Image、Gemini 图片生成、豆包 Seedance、即梦、Nano Banana。视频也是,Gemini、豆包、Kimi 能看视频,但大模型本身不直接做视频,要借专门工具,比如 Wan、Seaweed Dance、即梦。

各家模型的强项:给小白的实操建议是,跟 AI 协作不要只靠打字,学会把截图、录音、视频直接丢给它,效率会高很多。

### 1.8 AI 工具全景图

直播弹幕里最高频的痛点就是这些工具到底都是啥。一张图理清。

Agent 工具(帮你干活的):

`Agent 工具 ├── 命令行类(在终端里用,功能最强) │   ├── Claude Code,Anthropic 出品,当前最强,本教程主角 │   └── Codex CLI,OpenAI 出品,开源 │ ├── 图形界面类(有可视化界面,更友好) │   ├── Codex 桌面版/网页版,OpenAI 出品 │   ├── Claude Cowork,Anthropic 出品,面向非技术用户 │   ├── Trae Solo,字节出品,国产,有 Code 和 MTC 双模式 │   ├── WorkBuddy,腾讯出品,国产,面向职场非开发 │   └── Kiro,AWS 出品,规范驱动的 IDE,VS Code 分支 │ ├── 自主运行类(后台持续运行的智能体) │   ├── OpenClaw,原 Clawdbot,开源,可微信/Telegram 远程控电脑 │   └── Hermes,Nous Research 出品,开源,有持久记忆和自我进化 │ └── 工作流编排类(搭积木式的自动化平台)     └── COZE 扣子,字节出品,拖拽搭建工作流`

Chatbot 工具(跟你聊天的):

`Chatbot ├── 海外 │   ├── ChatGPT,GPT 模型 │   ├── Claude.ai,Claude 模型 │   ├── Gemini,Google 模型 │   └── Grok,xAI 出品 │ └── 国产     ├── 豆包,字节     ├── DeepSeek,深度求索,性价比高     ├── 千问,阿里     ├── Kimi,月之暗面     ├── 微信元宝,腾讯,微信生态数据强     └── GLM / 智谱清言,智谱 AI`

评论区里的黑话:### 1.9 一句话总结整套关系

`你(人)   ↕ 用自然语言交流 Claude Code(Agent),装上 MCP 后能连任何外部工具   ↕ 调用 模型(Claude / GLM / MiniMax / Kimi 等)   ↕ 消耗 Token(电费)`

## 第二章 装环境

按顺序装四样东西,Git、Node.js、VS Code、Claude Code。Mac 和 Windows 流程略有差异,跟着自己的系统走。

### 2.1 先确认电脑的芯片类型

下载安装包要分 ARM 和 x86 两类,先确认自己的电脑属于哪种。

Mac 用户点左上角苹果图标,关于本机,看芯片那一栏。M1、M2、M3、M4 这种是 ARM,Intel 是 x86\_64。

Windows 用户右键我的电脑,属性,看处理器。Intel 或 AMD 是 x86\_64,显示 ARM 那就是 ARM。

记住自己是哪种,后面下安装包会用到。

### 2.2 装 Git

Mac 用户打开终端,启动台搜索终端就能找到。粘贴下面这条命令,回车。

`/bin/zsh -c "$(curl -fsSL https://gitee.com/happyaicoder/HomebrewCN/raw/master/Homebrew.sh)"`

中途会要你输入电脑开机密码,输入时不会显示是正常的,直接打完回车即可。选项让你选 1 就选 1,选 Y 就选 Y。装完 brew,git 会一起装好。

验证:

`brew -v git --version`

两条都能看到版本号就 OK。

Windows 用户打开 [git-scm.com](http://git-scm.com/ "git-scm.com"),点首页中间的 Install for Windows,下载。双击安装,全程默认下一步,不要改安装路径。装完桌面或开始菜单会出现 Git Bash 图标。

不要自己改 Git 的安装目录,改了后面 Claude Code 会报错。这一点我必须强调,我们组有两个同事改了路径,排查了一下午。

### 2.3 装 Node.js,必须 18 以上,推荐 20 或 22

Mac 用户终端粘贴这条命令:

`/bin/bash -c "$(curl -fsSL https://gitee.com/iamzhihuix/nvm-install-cn/raw/main/install.sh)"`

验证:

`node -v npm -v`

Windows 用户打开 [nodejs.org](http://nodejs.org/ "nodejs.org"),下载 LTS 版安装程序,扩展名是.msi。双击安装,默认下一步,遇到是否对设备更改选是。装完打开 PowerShell,输入:

`node -v npm -v`

如果 npm -v 报错无法执行脚本,先跑一条策略命令再试:

`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

提示让你确认就输入 Y 回车。这是 Windows 默认的脚本执行策略限制,跟 Node.js 本身没关系。

### 2.4 装 VS Code

打开 [code.visualstudio.com](http://code.visualstudio.com/ "code.visualstudio.com"),下载对应系统的安装包。

Mac 用户双击 zip 解压后,把 Visual Studio Code 拖到应用程序文件夹。Windows 用户双击 exe 安装,勾选添加到 PATH 和通过右键打开等所有选项。

### 2.5 装 Claude Code

Mac 用户终端粘贴:

`npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com`

末尾那个 registry 加了国内镜像源,不加的话会卡很久或者直接失败。如果报权限错误,前面加 sudo 再跑一次,需要输入开机密码。

`sudo npm install -g @anthropic-ai/claude-code`

验证:

`claude -v`

Windows 用户以管理员身份打开 PowerShell,先跑一条策略命令:

`Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`

选 Y 回车。然后安装 Claude Code:

`npm install -g @anthropic-ai/claude-code --registry=https://registry.npmmirror.com`

验证:

`claude -v`

### 2.6 常见报错速查## 第三章 给 Claude Code 配上国产模型

Claude Code 是工具,也就是外壳,还需要一个模型作为大脑。官方 Claude 模型需要外网、海外信用卡,有封号风险。我自己两个 Anthropic 账号都被封过,几十美金的余额没了。

对国内用户最现实的方案是用 cc-switch 配国产模型。

### 3.1 选模型

目前在 Claude Code 上体验和质量比较好的国产模型有三家:新手推荐 MiniMax 套餐,29 元一个月起,足够试水。

### 3.2 装 cc-switch

下载页:[https://github.com/farion1231/cc-switch/releases](https://github.com/farion1231/cc-switch/releases "https://github.com/farion1231/cc-switch/releases")

下载慢就用国内镜像:[https://gitee.com/iamzhihuix/cc-switch-mirror](https://gitee.com/iamzhihuix/cc-switch-mirror "https://gitee.com/iamzhihuix/cc-switch-mirror")

Windows 用户下.msi 双击安装。如果报错下 Portable 免安装版,解压到固定目录,右键以管理员身份运行。

Mac 用户下.dmg,双击后拖到应用程序。第一次打开会提示无法打开,这是 macOS 的 Gatekeeper 机制。系统设置,隐私与安全性,拉到最下面,仍要打开,然后输入开机密码即可。

### 3.3 拿到模型的 API Key,以 MiniMax 为例

打开 minimax 官网,购买 key:[https://platform.minimaxi.com/subscribe/coding-plan?code=G4YsAHUVMT&source=link](https://platform.minimaxi.com/subscribe/coding-plan?code=G4YsAHUVMT&source=link "https://platform.minimaxi.com/subscribe/coding-plan?code=G4YsAHUVMT&source=link")

用 [手机](https://www.smzdm.com/fenlei/zhinengshouji/) 号注册登录。选套餐,新手选 29 元一个月或 49 元一个月,重度使用选 119 元一个月。

付完款,进 [https://platform.minimaxi.com/user-center/basic-information/interface-key](https://platform.minimaxi.com/user-center/basic-information/interface-key,%E6%B3%A8%E6%84%8F%E6%89%BE%E7%9A%84%E6%98%AF "https://platform.minimaxi.com/user-center/basic-information/interface-key")[,注意找的是](https://platform.minimaxi.com/user-center/basic-information/interface-key,%E6%B3%A8%E6%84%8F%E6%89%BE%E7%9A%84%E6%98%AF ",注意找的是") Coding Plan Key,不是普通 API Key。这两个不通用,我见过至少五个人卡在这一步。点复制,把 Key 保存到一个文本文件里。

其他模型,GLM、Kimi、DeepSeek 等流程一样,注册、进控制台、创建 API Key、复制。

### 3.4 在 cc-switch 里配置

打开 cc-switch,左上角点 Claude 图标。右上角点加号,选模型供应商,比如 MiniMax 或 Zhipu GLM。把 Key 粘进去,点添加。回主页面,[鼠标](https://www.smzdm.com/fenlei/shubiao/) 移到该模型上,看到使用中或点启用。

### 3.5 验证配置成功

打开终端,Mac 用终端,Windows 用 PowerShell,输入:

`claude`

首次启动按回车跳过主题选择,进入对话界面后输入:

> 你是什么模型?

如果回复了正确的模型名,比如 MiniMax-M2.7 或 GLM 5.1,配置成功。

### 3.6 配置成功但还是连官方接口报错

打开配置文件。Mac 在 /Users/你的用户名/.claude/settings.json,Windows 在 C:Users你的用户名.claudesettings.json,Windows 要先开启显示隐藏文件。

确认里面有 ANTHROPIC\_AUTH\_TOKEN 和 ANTHROPIC\_BASE\_URL 两项。如果没有,回 cc-switch 重新点一次启用。

如果还是不行,再打开.claude.json,在同一个用户目录下,用记事本搜 hasCompletedOnboarding,没有就加这一行,注意逗号是英文:

`"hasCompletedOnboarding": true,`

不放心格式可以丢去 [json.cn](http://json.cn/ "json.cn") 验证。

## 第四章 Claude Code 基础操作

### 4.1 启动 Claude Code 的两种方式

**方式一,VS Code 终端启动,新手首选。**

打开 VS Code,文件,打开文件夹,新建一个空文件夹,比如叫我的 AI 工作区,打开它。信任项目,弹窗里点是,我信任作者。点 VS Code 顶部终端菜单,新终端,或者直接按 Ctrl 加反引号。在终端里输入:

`claude`

看到对话框就可以开始聊了。

**方式二,VS Code 插件启动。**

VS Code 左侧扩展面板搜 Claude Code,认准 Anthropic 出品。安装,重启 VS Code。右上角会出现 Claude Code 图标,点它就能打开对话框。

如果用插件方式打开后出现订阅画面,回 cc-switch 设置里勾上应用到 Claude Code 插件,重启 VS Code。

### 4.2 必须记住的快捷操作### 4.3 三种工作模式

Claude Code 有几个会影响它怎么干活的模式。新手最容易混的是这三个:Plan 模式特别重要。Claude 会先把方案想清楚,拆步骤、识依赖、估风险,列出来给你看,你点同意它才动手。复杂功能强烈建议先用 Plan 模式过一遍。

### 4.4 普通思考和深度思考 ultrathink例子:

`ultrathink 帮我设计一个自动发布到公众号的 skill,先不要写代码,把可能的方案对比一下`

加了 ultrathink 后,它会消耗更多 Token 但给出更深、更全面的方案。新手建议默认开普通思考,遇到大问题再加 ultrathink。

### 4.5 YOLO 模式

正常用 Claude Code 时,每改一个文件都要你确认一下,写大项目时很烦。YOLO 模式让它自己跑,不打扰你。

启动命令:

`claude --dangerously-skip-permissions`

第一次会弹个警告,选 yes 回车。看到左下角有 bypass permissions on 就说明开了。

不想每次都打这一长串,让 Claude Code 帮你配个别名:

`请帮我在终端配置一个别名,使得输入 claude 时自动执行 claude --dangerously-skip-permissions 命令`

YOLO 模式适合从零到一新建项目。在你不熟悉的项目或重要项目上用要慎重,因为它会自动改任何文件。我们组就有人在生产代码仓库里开 YOLO 模式跑 Skill,把配置改坏了,回滚花了一晚上。

### 4.6 让 Claude 记住你的偏好,CLAUDE.md

在 ~/.claude/ [CLAUDE.md](https://www.anthropic.com/app-unavailable-in-region?utm_source=country "CLAUDE.md"),这是全局,或者当前项目根目录的 [CLAUDE.md](https://www.anthropic.com/app-unavailable-in-region?utm_source=country "CLAUDE.md") 里写下你的偏好,Claude Code 每次启动都会自动读,相当于长期记忆。

例子:

`- 我是产品经理,不写代码,所有解释用大白话 - 所有生成的文件统一放到 outputs/ 文件夹 - 写注释用中文`

我自己的全局 [CLAUDE.md](https://www.anthropic.com/app-unavailable-in-region?utm_source=country "CLAUDE.md") 跑了两个月没换过,就这种简单的几条。

## 第五章 用 Claude Code 做一个早读神器

不要急着做大项目,先用一个简单的小工具体验完整流程。

早读神器的逻辑是这样的。学生大声朗读时,[麦克风](https://www.smzdm.com/fenlei/maikefeng/) 音量超过阈值,屏幕上自动出现小动物 emoji,声音越大动物越多。小红书上这类教育小工具很火,做出来的本身就是个能变现的产品。

### 5.1 在 VS Code 里建工作目录

VS Code,文件,打开文件夹,新建一个文件夹,比如叫早读神器,打开。

在 VS Code 里新建一个文件 [prd.md](http://prd.md/ "prd.md"),PRD 是产品需求文档的缩写。

把下面这段需求贴进去,保存。Mac 用 Cmd+S,Windows 用 Ctrl+S。

`请用 HTML + CSS + JavaScript 创建一个早读动物园应用,具体需求:  1. 主界面布局    - 顶部,标题"早读动物园"和副标题    - 中间,大的天蓝色动物展示区,带浅绿色地面,动物图标随机散落分布    - 底部三栏,左边显示当前分贝和阈值调节,中间显示计时,右边是设置和暂停按钮  2. 核心功能    - 使用 Web Audio API 获取麦克风音量分贝值    - 当音量超过设定阈值时,每隔一定时间生成一个随机动物 emoji    - 动物以随机位置、随机大小出现在展示区,带淡入动画    - 计时器记录累计朗读时间  3. 设置面板,点击设置按钮弹出    - 动物生成速度滑块,范围 1 到 60 秒    - 动物种类选择,多选 emoji,包括 🐶🐱🐰🐻🐨🦊🦁🐐🐷🐸🐔🐧🦆    - 全选和全不选按钮    - 保存和重置按钮  4. 视觉效果    - 使用渐变色背景    - 动物 emoji 大小在 30 到 60 像素间随机    - 卡片式设计,圆角阴影    - 按钮用蓝色和红色区分功能  5. 技术要点    - 请求麦克风权限    - 实时计算音量分贝    - 动态生成和移除 DOM 元素    - localStorage 保存用户设置`

### 5.2 在 VS Code 终端启动 Claude Code

`claude --dangerously-skip-permissions`

### 5.3 让它实现

对话框输入:

`@prd.md 实现这个功能`

回车,等它跑完,一般 2 到 5 分钟。期间会自动建文件、写代码、跑测试。

### 5.4 打开网页看效果

项目目录里右键 index.html,选择用谷歌浏览器打开。Mac 在 Finder 里右键,Windows 在文件资源管理器里右键,用浏览器打开。

浏览器弹出是否允许使用麦克风,选允许。

调节阈值,对着麦克风说话,看小动物有没有蹦出来。

跑通了,你就做出了第一个 Claude Code 产品。

### 5.5 这一节学到了什么

从小红书挖需求。找到对标产品,截图问 AI,我想复刻这个,先帮我写好 PRD。

PRD 先于代码。好的需求文档让 AI 一次写对,省 80% 的来回沟通。这个比例不是我夸张,是我自己掐着秒表算过的。

@文件名 是 Claude Code 的核心语法,让它精准聚焦到某个文件,避免它在上下文里乱翻乱猜。

不会写代码也能做出产品。你只负责想清楚要什么,AI 负责怎么做。

## 第六章 学会工作流 Skills

走完第五章,你已经能让 Claude Code 帮你写一次性的代码。Skills 让你把反复要做的事情固化成可复用的 SOP,以后只要一句话就能调用。

### 6.1 Skills 的本质

回顾第一章,Skill 就是给 Claude 看的 SOP 手册。一个 Skill 包含几样东西。

[SKILL.md](https://agentskills.io/ "SKILL.md") 是核心配置文件,定义这个 Skill 干什么、什么时候触发、按什么步骤执行。scripts 文件夹是可选的,放可执行脚本。templates 文件夹也是可选的,放模板文件,规定输出格式。examples 文件夹也可选,放示例文件,AI 会模仿示例的结构。

[SKILL.md](https://agentskills.io/ "SKILL.md") 长什么样:

`--- name: baoyu-post-to-wechat description: 把 Markdown 文章一键发布到微信公众号草稿箱。用户说"发到公众号"              或"上传文章到微信"时触发。 ---  # 公众号发布技能  [技能说明] 将本地 Markdown 文章转换为公众号格式并上传草稿箱。  [执行流程] 1. 读取本地 .md 文件 2. 转换为微信支持的 HTML 3. 上传图片到微信服务器换取 media_id 4. 替换文章中的图片占位符 5. 调用微信草稿箱接口发布 6. 返回预览链接  [注意事项] - AppID 和 AppSecret 必须配对使用 - 图片大小不能超过 1MB`

最上面三个减号之间的部分叫 Frontmatter,前置元数据,最关键的就两行。

name 是 Skill 的唯一标识,调用时用。description 是最重要的一行,Claude 每次启动都会读所有 Skill 的 description,靠这一行判断这次任务该不该触发这个 Skill。所以写 Skill 时这行要尽量具体,列出触发关键词。

下面方括号里的内容是 SOP 主体,Claude 触发后会一步步照做。

### 6.2 用万能安装工具 npx skills

Vercel 出品的 skills 安装工具,一行命令就能给 Claude Code、Codex、Cursor、Gemini-CLI 等三十多个工具安装 Skill。

以宝玉老师的 Skills 包为例。新建并进入一个项目文件夹,比如 xiaohongshu-jiazhuang,在该文件夹右键,在终端中打开。终端输入:

`npx skills add jimliu/baoyu-skills`

上下方向键浏览,空格选中你想要的 Skill,回车。选择安装到哪个 Coding Agent,多选用空格,选 Claude Code。安装到哪里,选 project,项目级最推荐。安装方式选默认的 symlink,回车,最后选 yes。

安装注意事项有几条。

尽量不要全局安装,特别是带特定业务场景的 Skill,避免模型乱激活。同一个项目内 Skill 不要超过十个,容易互相干扰。不要做 Skill 套娃,一个 Skill 激活另一个,推荐在 [CLAUDE.md](https://www.anthropic.com/app-unavailable-in-region?utm_source=country "CLAUDE.md") 里声明使用场景和流程。

来源不明的 Skill 绝对不装。Skills 有留后门的安全风险,会盗 token、盗账号。我的建议是只装大厂仓库的,以及 GitHub star 数过千的个人项目。

### 6.3 推荐的 Skills 市场和仓库### 6.4 常用 Skill 速查

`# 头脑风暴 npx skills add https://github.com/obra/superpowers --skill brainstorming  # 文档协作 npx skills add https://github.com/anthropics/skills --skill doc-coauthoring  # 网页设计 npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines  # SEO 审计 npx skills add https://github.com/coreyhaines31/marketingskills --skill seo-audit  # 公众号发布 npx skills add JimLiu/baoyu-skills --skill baoyu-post-to-wechat  # 小红书头图 npx skills add JimLiu/baoyu-skills --skill baoyu-xhs-images  # 文章封面图 npx skills add JimLiu/baoyu-skills --skill baoyu-cover-image`

### 6.5 第一个自定义 Skill,自动配图

让 Claude Code 帮你做一个 Skill,每次写完文章,自动生成 3 张插画风格的配图。

**步骤一,拿到图像生成 API Key,以 APImart 为例。**

打开 [https://apimart.ai/zh/model/nano-banana-2-api](https://apimart.ai/zh/model/nano-banana-2-api,%E6%B3%A8%E5%86%8C%E7%99%BB%E5%BD%95,%E9%82%AE%E7%AE%B1%E3%80%81Google%E3%80%81GitHub "https://apimart.ai/zh/model/nano-banana-2-api")[,注册登录,邮箱、Google、GitHub](https://apimart.ai/zh/model/nano-banana-2-api,%E6%B3%A8%E5%86%8C%E7%99%BB%E5%BD%95,%E9%82%AE%E7%AE%B1%E3%80%81Google%E3%80%81GitHub ",注册登录,邮箱、Google、GitHub") 都行,完成邮箱验证。点 API 密钥,创建 API 密钥,起名比如 Claude-skill,复制并保存。进账单,充值,首次推荐 5 到 10 美元,每次生成 3 张图大概 0.05 美元。

**步骤二,让 Claude Code 创建这个 Skill。**

启动 Claude Code,在新项目目录里输入:

`我需要你帮我设计一个 skill,主要用来帮我实现文章配图。当我写完一篇文章之后,调用这个 skill,帮我文章配图。 我的 API 是 apimart,调用模型选择 gemini-3-pro-image-preview,Nano Banana 2,调用文档:https://docs.apimart.ai/  要求: - 每篇文章只生成 3 张图片,前 30%、中间 30%、最后 30% 各一张 - 图片中的文字必须是中文 - 图片风格固定为手绘漫画风格,温暖、亲和、有故事感,不偏写实、不偏赛博朋克 - 横向或方形构图,画面干净,主体清晰  这个 skill 的名字叫"插画风格配图生成 skill"。`

回车,等它跑完,3 到 5 分钟。

**步骤三,把 API Key 给它。**

Claude Code 会询问 API Key,直接粘贴:

`我的 APImart API Key 是:[粘贴你的 Key] 请把它配置到 skill 中,并测试一下能不能用。`

**步骤四,测试。**

`列举下现在可以用的 skills 列表`

然后试着用:

`/插画风格配图生成skill "这是一篇关于春天的文章,描述了花开的美景和温暖的阳光。"`

看到 3 张手绘风格的插画就成功了。

### 6.6 Skills、MCP、Hooks、Plugin 的区别

经常有人问我该写 Skill 还是装 MCP。这几个东西解决的根本不是同一件事。类比理解。Skill 像菜谱,告诉厨师按什么步骤做菜。MCP 像厨房的水电气,没有这些基础设施,厨师做不了菜。Hooks 像定时器,到点自动响铃提醒。Plugin 像一整套厨具组合,锅碗瓢盆食谱一起送给你。

新手判断标准。想让 Claude 稳定完成某个流程,写 Skill。想让 Claude 能用某个外部服务或工具,装 MCP。想让 Claude 自动响应某种事件,配 Hooks。想一站式安装某个能力组合,找 Plugin。

公众号发布就是 Skill 加 MCP 配合的典型场景,Skill 负责整体流程,MCP,比如 Tavily 或 Exa,负责搜热点这个能力。

### 6.7 Skill 用不好的几个坑## 第七章 硬件与网络

### 7.1 硬件怎么选

Mac 比 Windows 更适合 AI。M 系列芯片是 [内存](https://www.smzdm.com/fenlei/neicun/) 显存共享架构,同样 32GB 内存,Mac 上能跑的本地模型规模比 Windows 大很多。系统环境也更干净,少很多奇怪报错。

但已有 Windows 的不用换,本教程的所有内容都能在 Windows 上跑通。

### 7.2 网络

用国产模型加 cc-switch 不需要外网。

用 Claude 官方模型、订阅 Pro 或 Max 需要稳定外网,且要海外信用卡。

网络报错时,特别是图生图、MCP 这类场景,把代理改成 TUN 模式、增强模式或虚拟网卡模式。

## 附录 A 核心命令速查表

`# 启动 Claude Code claude  # 启动 YOLO 自动模式 claude --dangerously-skip-permissions  # 看版本 claude -v  # 看已装的 Skills /skills list  # 刷新 Skills 列表 /skills refresh  # 清空当前对话 /clear  # 清理但保留记忆 /compact  # 检测安装问题 /doctor  # 切换模型 /model  # 装 Skill,万能命令 npx skills add `

## 附录 B 常见报错与处理## 附录 C 小白名词速查

教程里一闪而过、但你可能卡住的词,每个一句话讲清楚。

Markdown 和编辑器:配置文件:命令行与环境:网络与认证:项目流派:## 写在最后

先上路,再谈车技。

不用着急一次全搞懂所有概念。先把第二到第五章走完,做出第一个能用的小工具,你就比 99% 的人更早摸到了门道。剩下的那些名词、Skill、MCP、Agent 之间的关系,会在你用的过程中自然变清晰。

遇到任何报错、任何看不懂的东西,截图丢给豆包、ChatGPT 或者 Claude Code 本身,描述清楚我在做哪一步、看到了什么,比反复读教程快十倍。

会用 AI 和不会用 AI 的人,生产力差距已经是十倍、一百倍。

我们组今年做过一次内部统计,同样的需求,用 Claude Code 的同事两小时交付,不用的同事两天交付,质量还差一截。这不是个人能力问题,是工具代差。

从今天开始,慢一点没关系,但要开始。

作者声明本文无利益相关，欢迎值友理性交流，和谐讨论～