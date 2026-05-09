1Percent *2026年5月8日 12:00*

很多人装完 Hermes，第一反应是去找 Skill。

先别急。

如果你的 Hermes 经常出现这些问题：

- 反复问同一个背景
- 文件乱放
- 改完代码不测试
- 不知道项目该怎么跑
- 每次打开都像重新认识你

问题不一定出在模型，也不一定是 Skill 不够。

很可能是你还没给它写规则。

Hermes 里最值得先处理的，不是装多少插件，而是这两个文件：

`SOUL.md` 和 `AGENTS.md` 。

一个管“它怎么和你长期协作”。

一个管“它在这个项目里该怎么干活”。

## 先说结论

| 文件 | 主要作用 | 放在哪里 |
| --- | --- | --- |
| `SOUL.md` | 全局身份、语气、协作方式 | `~/.hermes/SOUL.md`  或 `$HERMES_HOME/SOUL.md` |
| `AGENTS.md` | 项目规则、命令、目录、注意事项 | 项目根目录 |

一句话：

`SOUL.md` 是给 Hermes 定“性格”。

`AGENTS.md` 是给项目定“规矩”。

前者适合长期跟着你走，后者只服务当前项目。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 一、SOUL.md：让 Hermes 知道你希望它怎么协作

官方文档里， `SOUL.md` 是 Hermes 的主要身份文件。

它不是项目说明书。

它更像你给 Hermes 写的一份长期协作说明：

- 你希望它说话直接还是温和
- 你希望它先给结论还是先铺背景
- 遇到不确定信息时要不要主动核实
- 高风险操作前要不要先提醒
- 输出内容要克制还是更有表达感

最常见的错误，是把项目路径、端口、启动命令、接口说明都塞进 `SOUL.md` 。

这些不该放这里。

`SOUL.md` 只写全局习惯。

项目规则，放到 `AGENTS.md` 。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## SOUL.md 可复制模板

这是一份基础模板，不需要全部保留。

你可以先复制，再删掉不适合自己的部分。

```
# Identity

你是我的长期 AI 协作助手。

你的主要任务是帮助我完成：

- 资料整理
- 代码辅助
- 工具配置
- 自动化任务
- 公众号写作
- 项目排障

你的目标不是显得聪明，而是把问题处理清楚。

# Communication Style

默认使用中文。

先说结论，再解释原因。

能用短句就不用长句。

不确定时直接说“不确定”，不要编造答案。

如果信息可能过期，优先提醒我核实官方文档、GitHub 或 README。

# Working Principles

开始处理任务前，先理解当前目录、现有文件和已有规则。

不要主动修改无关文件。

不要在没有确认的情况下删除、覆盖、迁移、发布或执行高风险操作。

涉及安装依赖、改配置、迁移数据、连接外部服务时，先说明影响。

# Output Preferences

输出要直白、克制、实用。

少讲空泛道理，多给可执行步骤。

写文章时，多用短段落。

写教程时，按“适合谁、解决什么问题、怎么做、有什么坑”来组织。

# Avoid

不要夸大工具能力。

不要承诺收益、涨薪、转型成功或副业结果。

不要把猜测写成事实。

不要用未经核实的数据做确定判断。
```

## 二、AGENTS.md：让 Hermes 知道这个项目怎么干活

如果说 `SOUL.md` 管的是“你希望 Hermes 成为什么样的助手”，那 `AGENTS.md` 管的就是：

这个项目里，什么能做，什么不能做。

比如：

- 项目是干什么的
- 前端在哪里
- 后端在哪里
- 临时文件放哪里
- 用什么命令启动
- 用什么命令测试
- 哪些文件不能乱改
- 修改完成后怎么验收

这类信息如果不写，Hermes 只能靠猜。

它猜错了，你就会看到各种熟悉场面：

文件放错目录。

测试没跑。

改了不该改的配置。

临时文件堆在根目录。

所以，只要是一个长期使用的项目，我建议都放一份 `AGENTS.md` 。

新手先放项目根目录就够了。

如果项目很大，再考虑在 `frontend/` 、 `backend/` 等子目录里放更细的 `AGENTS.md` 。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## AGENTS.md 可复制模板

这份模板适合大多数项目起步用。

同样不需要全保留，按你的项目改。

```
# AGENTS.md

## 项目说明

这是一个用于的项目。

主要目标是：

- 
- 
- 

## 目录规则

- 正式源码放在：
- 文档资料放在：
- 临时实验放在：
- 测试文件放在：
- 不要把临时文件、截图、压缩包直接放在项目根目录。

## 常用命令

安装依赖：填写命令，例如 npm install

启动开发环境：填写命令，例如 npm run dev

运行测试：填写命令，例如 npm test

代码检查：填写命令，例如 npm run lint

构建项目：填写命令，例如 npm run build

## 工作规则

开始修改前，先阅读相关文件，不要直接猜项目结构。

修改代码后，尽量运行对应测试或检查命令。

如果无法运行测试，需要说明原因。

不要主动重构无关模块。

不要删除用户已有内容，除非用户明确要求。

## 输出要求

完成任务后，请说明：

- 修改了哪些文件
- 解决了什么问题
- 是否运行了测试
- 还有哪些风险或后续建议

## 禁止事项

不要把 API Key、Token、密码、私钥写进项目文件。

不要把真实密钥写进 \`SOUL.md\` 或 \`AGENTS.md\`。

不要在未确认的情况下执行删除、覆盖、迁移、发布等高风险操作。
```

## 三、这两个文件怎么配合用

最简单的使用顺序是：

第一步，先改 `SOUL.md` 。

让 Hermes 知道你的长期偏好。

比如你喜欢结论先行，讨厌废话，希望它遇到不确定信息时主动核实。

第二步，在每个重要项目根目录放 `AGENTS.md` 。

让它知道这个项目的目录、命令、测试方式和禁区。

第三步，尽量在项目根目录启动 Hermes。

这样它更容易先读到项目级规则，后面再进入子目录时，也能继续结合对应规则工作。

![图片](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

## 四、不要把它们写得太满

很多人第一次写规则文件，会犯一个问题：

什么都想管。

结果写成一大坨，Hermes 反而抓不住重点。

我的建议是：

`SOUL.md` 控制在 4 到 8 条核心偏好。

`AGENTS.md` 先写清楚项目结构、常用命令、测试方式和禁止事项。

先让它有一个能稳定工作的底座。

用一段时间后，再慢慢补。

规则文件不是一次写完的。

它更像项目里的 README，会随着你的使用不断更新。

## 五、常见错误

第一个错误：

把 `SOUL.md` 放到项目里。

官方文档里， `SOUL.md` 是全局身份文件，默认在 `~/.hermes/SOUL.md` ，如果你自定义了 `HERMES_HOME` ，就在 `$HERMES_HOME/SOUL.md` 。

项目里的规则，应该写 `AGENTS.md` 。

第二个错误：

把项目命令写进 `SOUL.md` 。

比如端口、启动命令、目录结构、接口路径，这些都应该放进 `AGENTS.md` 。

第三个错误：

规则写得太空。

比如只写一句：

“请认真工作。”

这对 Agent 没什么用。

你要写清楚：

- 文件放哪里
- 用什么命令
- 什么不能碰
- 做完怎么验收

第四个错误：

把密钥写进去。

不要把 API Key、Token、密码、私钥写进 `SOUL.md` 或 `AGENTS.md` 。

这些文件是规则文件，不是密钥管理工具。

## 最后

Hermes 的重点，不只是“能聊天”。

它真正有价值的地方，是能在规则、记忆和技能之间慢慢形成稳定工作方式。

但前提是，你要先把规则写清楚。

先别急着装一堆 Skill。

先写好这两个文件：

`SOUL.md`

`AGENTS.md`

一个让它长期懂你。

一个让它在项目里少犯错。

这一步花不了多久，但后面能少很多反复解释、反复返工、反复救火。

工具越强，越需要规则。

这就是 Agent 真正好用的开始。

## 参考资料

- Hermes 官方文档：Personality & SOUL.md  
	https://hermes-agent.nousresearch.com/docs/user-guide/features/personality
- Hermes 官方指南：Use SOUL.md with Hermes  
	https://hermes-agent.nousresearch.com/docs/guides/use-soul-with-hermes
- Hermes 官方文档：Context Files  
	https://hermes-agent.nousresearch.com/docs/user-guide/features/context-files
- Hermes 官方文档：Configuration  
	https://hermes-agent.nousresearch.com/docs/user-guide/configuration

**微信扫一扫赞赏作者**

Hermes · 目录

继续滑动看下一个

2Percent

向上滑动看下一个