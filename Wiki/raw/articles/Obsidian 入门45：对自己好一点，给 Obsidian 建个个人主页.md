林大友 *2026年5月13日 11:57*

> 这是一个「Obsidian × AI」系列。
> 
> 我会从最基础的认知开始，慢慢写到资料整理和收集、写作工作流，再到怎么把 AI 接进来。
> 
> 如果你还没看过上一篇，可以先看 [Obsidian 入门44：YouTube 视频字幕剪藏实战——能看但剪不下来](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247489891&idx=1&sn=723cb3f85ba4c2a65e36457d58a11a31&scene=21#wechat_redirect)

之前在 Obsidian 入门系列里提过我的个人主页，有朋友留言问是怎么做的。

其实没什么玄乎的，就是装了个插件，再堆几个 Dataview 查询。

但被问起来我才意识到，这个需求很多人都有。笔记越记越多，每次打开软件，不知道从哪看起。

所以分享一下我的做法，给你提供个思路。

---

## 从一个需求开始

先说说我的场景。

我用 Obsidian 写东西，每天的节奏大概是，打开软件，看一眼昨天写了什么，切到项目文件夹，然后继续。

听起来很正常吧？

但问题出在「打开软件」这一步。Obsidian 默认会打开你上次关闭时的文件，这个设计很合理，但我经常搞不清自己上次看到哪了。

而且，如果我只是想「随便看看最近在写什么」，这个默认行为就帮不上忙了。

我的需求很简单，每次打开 Obsidian，第一眼能看到一个全景画面，最近在写什么、写了多少、今天有什么值得回顾的东西。

然后我找到了 HomePage（读作后母佩吉） 这个插件，可以理解为就是主页。

它的核心功能只有两个。一个是设置一个笔记作为启动页，另一个是当你关闭所有标签页时自动回到这个页面。就这么简单，没有多余的功能。装上之后，我把 My Homepage.md 设成了我的大本营。

安装就更简单了，社区插件里搜 HomePage，安装启用。

![CleanShot 2026-05-13 at 08.10.01.png|400](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

CleanShot 2026-05-13 at 08.10.01.png|400

然后在设置里指定你的主页笔记就行。支持指定一个文件做为主页，也可以做其他设定，比如随机笔记、日记或者周记。

没有复杂的配置项，设完就能跑。

我建议把第一个“Open on startup”和“Open when empty”打开，这样的话你启动 Obsidian 或者关闭了所有标签页，就会自动回到设定的主页。

![CleanShot 2026-05-13 at 08.19.33.png|400](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

CleanShot 2026-05-13 at 08.19.33.png|400

---

## 我的主页长什么样

我的主页分成三个区块，每个区块解决一个具体问题。

![CleanShot 2026-05-13 at 08.37.39.png|400](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

CleanShot 2026-05-13 at 08.37.39.png|400

### 第一个区块：足迹

最醒目的部分是一张热力图，类似 GitHub 那种绿格子，记录我的写作活动。哪一天写了多少字，颜色深浅一目了然。

这个热力图是我用 Heatmap插件配合 我自己写的一个本地插件实现的。

它读取本地的 activity-log.jsonl 文件，把每天的写作数据汇总成热力图。下面还有几行统计，今日最高字数、总字数、今年活跃了多少天。最底下是一行年份进度：「2026 年已经过去了 X 天」。

说实话，这个实现有点重。我写的时候是因为当时没有现成的方案，现在社区里已经有了更好的选择。

比如 Activity Heatmap 插件，装上就能自动追踪文件变化，生成同样的热力图；

还有 Activity Graph 插件，功能更丰富，支持嵌入到笔记正文、追踪 Tasks 插件的完成情况，还有好几种视图模式可以切换。

如果你也想在主页里放一张热力图，我会建议直接从社区装一个现成的插件，省心很多。

热力图下面还有两行文字，是 Dataview 自动算出来的，今年写了多少天、每天的统计数据。这些都是机器干的活，你只需要写一次查询，它就每天自动更新。

我是用的语法放在下面供你参考。你可以把这一段和你的需求提供给你的 AI，让它参考之后给出你的版本

后面2个区块也是同样的做法：把他们交给你的 AI。

```
1234567891011121314151617181920212223242526272829303132333435363738394041424344454647484950515253545556575859606162今天是\`=dateformat(date(today), "yyyy年M月d日")\`，\`=date(today).year\` 年已经过去了\`=(date(today)-date(date(today).year + "-01-01")).days\`天。
 

dataviewjs
// --- 配置 ---
const LOG_FILE_PATH = "_internal/activity-log.jsonl"; // 确认日志文件路径

// --- 主逻辑 ---
(async () => {
    let logContent = "";
    try {
        logContent = await dv.io.load(LOG_FILE_PATH);
    } catch (e) {
        dv.paragraph("❌ 无法加载活动日志文件。");
        console.error("Error loading log file for footprint:", e);
        return;
    }

    if (!logContent || logContent.trim() === "") {
        dv.paragraph("- 你今年还没有留下任何足迹。");
        return;
    }

    // 获取当前年份
    const currentYear = moment().format('YYYY'); // 或者 new Date().getFullYear().toString();

    const parsedLogEntries = [];
    const lines = logContent.trim().split('\n');
    for (const line of lines) {
        if (line.trim() === "") continue;
        try {
            const entry = JSON.parse(line);
            // 校验：确保有 date 字段且格式为 YYYY-MM-DD
            if (entry && entry.date && typeof entry.date === 'string' && entry.date.length === 10) {
                 parsedLogEntries.push(entry);
            }
        } catch (e) {
            // console.warn(\`Skipping bad JSON line in footprint calculation: ${line}\`, e);
        }
    }

    // **修改点：过滤出当年的条目**
    const thisYearEntries = parsedLogEntries.filter(entry => entry.date.startsWith(currentYear + '-'));

    if (thisYearEntries.length === 0) {
        dv.paragraph(\`- 你在 ${currentYear} 年还没有留下足迹。\`);
        return;
    }

    // 提取当年的所有活跃日期并去重
    const uniqueThisYearDates = new Set(thisYearEntries.map(entry => entry.date));

    // 获取当年唯一活跃日期的数量
    const footprintDaysThisYear = uniqueThisYearDates.size;

    // 显示结果
    dv.paragraph(\`- 你在 ${currentYear} 年总共留下了 ${footprintDaysThisYear} 天的足迹，继续加油！\`);

})().catch(err => {
    dv.paragraph("❌ 计算当年足迹天数时出错: " + err.message);
    console.error("Error calculating this year's footprint days:", err);
});
```

关于 Dataview，我们之前也介绍过：

- [Obsidian 入门22：认识 Dataview 插件，给你 3 段直接复制的指令，打造全自动仪表盘](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247489278&idx=1&sn=b6ef4706cb3b7ee76fb23c3edb306dc7&scene=21#wechat_redirect)
- [Obsidian 入门23：别让待办烂在笔记里！用 Dataview 自动汇总你所有的 TODO](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247489447&idx=1&sn=b3bc62fc583d1084d1d38627615707b7&scene=21#wechat_redirect)
- [Obsidian 入门24：不会写 Dataview 代码？教你一招，让 AI 成为你的专属“程序员”](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247489452&idx=1&sn=69800fc0bfac99db63ff35fe88b0f6b6&scene=21#wechat_redirect)

### 第二个区块：那年今日

这个区域是一个 Dataview 查询，找出所有创建日期是「今天」的笔记，按时间倒序排列。

效果很奇妙。比如今天打开 Obsidian，看到「一年前的今天我写了一篇关于 X 的文章」「三年前的今天我刚开始学 Y」。有时候你会惊讶，原来我那时候就在想这个事情了。

这个功能不复杂，就几行 Dataview 代码。但它带来的体验是一种连续感，你的笔记库像一条流动的河，每一天都被过去某一天的自己提醒着。

```
123456789101112## 那年今日
今天是 \`=dateformat(date(today), "yyyy年M月d日")\`，那年今日，你曾记录过：
 
\`\`\`dataview
TABLE WITHOUT ID<br>
    file.link AS "Article",<br>
    dateformat(file.ctime, "yyyy-MM-dd (EEE)") AS "创建时间",<br>
    dateformat(file.mtime, "yyyy-MM-dd HH:mm:ss") AS "最后修改时间"<br>
FROM ""<br>
WHERE dateformat(file.ctime, "MM-dd") = dateformat(date(today), "MM-dd")<br>
SORT file.ctime DESC<br>
LIMIT 100
```

### 第三个区块：今日随机推荐

这个是我最喜欢的一个小设计。

如果从现有笔记里随机抽一篇，你今天可能看到任何东西。但问题是，如果每次刷新都换一篇，那就没有「今天」的感觉了。

所以我的做法是，基于当天日期生成一个随机种子。今天打开，看到的是笔记 A。明天打开，看到的是笔记 B。同一天内，不管你刷新多少次，看到的都是同一篇。这就形成了一个有趣的组合，稳定性加上意外性。

有时候你会翻到自己都快忘记写过的笔记，然后重新读一遍，还挺有意思的。

```
123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960dataviewjs<br>
// 获取所有有效笔记（排除模板和系统文件）<br>
const allNotes = dv.pages('""').file<br>
    .filter(f => f.path &&<br>
           f.path.endsWith(".md") &&<br>
           !f.path.includes("Templates/") &&<br>
           !f.path.includes("_attachments/"));

// 显示标题<br>
dv.header(2, "今日随机推荐");

// 检查是否有可用笔记<br>
if (!allNotes || allNotes.length === 0) {<br>
    dv.paragraph("*没有找到符合条件的笔记*");<br>
} else {<br>
    try {<br>
        // 基于当天日期生成随机种子（确保每日结果一致）<br>
        const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"<br>
        const seed = parseInt(today.replace(/-/g, "")); 
        
        // 确保随机索引在有效范围内<br>
        let randomIndex = Math.abs(Math.floor(Math.sin(seed) * allNotes.length)) % allNotes.length;<br>
        if (randomIndex < 0 || randomIndex >= allNotes.length) {<br>
            randomIndex = 0; // 如果索引无效，使用第一个笔记<br>
        }
        
        // 获取随机笔记<br>
        const randomNote = allNotes[randomIndex];
        
        // 确保随机笔记存在并有有效的路径<br>
        if (randomNote && randomNote.path) {<br>
            // 显示可点击的链接（带友好提示）<br>
            dv.paragraph(\`[[{randomNote.name || randomNote.basename || "未命名笔记"}]]\`);
            
            // 提取并显示笔记所在的文件夹路径<br>
            const folderPath = randomNote.path.split("/").slice(0, -1).join("/");<br>
            dv.paragraph(\`*"${folderPath || "根目录"}" 中的笔记*\`);<br>
        } else {<br>
            dv.paragraph("*无法获取随机笔记信息*");<br>
        }<br>
    } catch (error) {<br>
        // 显示错误信息<br>
        dv.paragraph(\`*生成随机推荐时出错: ${error.message}*\`);<br>
        console.error("随机笔记生成错误:", error);<br>
    }<br>
}

dataviewjs<br>
const getSafeTitle = (note) => {<br>
    if (note?.frontmatter?.title) return note.frontmatter.title;<br>
    if (note?.name) return note.name.replace(".md", "");<br>
    return note?.path?.split("/").pop()?.replace(".md", "") || "随机笔记";<br>
};

dataviewjs<br>
const getSafeTitle = (note) => {<br>
    if (note?.frontmatter?.title) return note.frontmatter.title;<br>
    if (note?.name) return note.name.replace(".md", "");<br>
    return note?.path?.split("/").pop()?.replace(".md", "") || "随机笔记";<br>
};
```

---

## 你可以从哪开始

如果你也想在 Obsidian 里建一个主页，我的建议是，不用一步到位。

最简单的版本，装 HomePage 插件，新建一个笔记，在里面放几个你最常用的链接。比如「每日笔记」「项目文件夹」「正在写的文章」。

这就够了。

你的主页只有一个功能，让你每次打开 Obsidian 都知道从哪开始。

等你习惯了有一个主页，再慢慢加东西。

想看看最近改了什么，加一个 Dataview 的最近修改列表。

想统计写作情况，再加一个热力图插件。不要一上来就想做得跟我一样，先想清楚一件事， **我每天打开 Obsidian 最想看什么** 。

这个问题的答案，就是你的主页应该放的东西。

---

说到底，建个人主页跟技术关系不大。

你不需要会写代码，不需要懂 Dataview 的语法，甚至不需要用跟我一样的插件。你只需要想清楚一件事，每次打开 Obsidian，你最想看到的那个画面是什么。

对我来说，是热力图上慢慢连成片的绿格子。是那年今日里突然跳出来的旧笔记。

对你来说，可能是完全不同的东西。

但重要的是，每次打开 Obsidian，你都有一个熟悉的起点，一个带着你个人痕迹的地方。

工具是次要的。找到自己的方式，才重要。

---

## 进阶阅读

- [Obsidian 入门22：认识 Dataview 插件，给你 3 段直接复制的指令，打造全自动仪表盘](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247489278&idx=1&sn=b6ef4706cb3b7ee76fb23c3edb306dc7&scene=21#wechat_redirect)
- [Obsidian 入门23：别让待办烂在笔记里！用 Dataview 自动汇总你所有的 TODO](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247489447&idx=1&sn=b3bc62fc583d1084d1d38627615707b7&scene=21#wechat_redirect)
- [Obsidian 入门24：不会写 Dataview 代码？教你一招，让 AI 成为你的专属“程序员”](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247489452&idx=1&sn=69800fc0bfac99db63ff35fe88b0f6b6&scene=21#wechat_redirect)
- [Obsidian 入门40：把我的写作工作流Skill免费分享给你](https://mp.weixin.qq.com/s?__biz=Mzk2NDAwMzAzMw==&mid=2247489834&idx=1&sn=6e3f4040aadb0857e6a65b5f8640facf&scene=21#wechat_redirect)

如果这篇文章对你有帮助，欢迎三连（点赞、转发、推荐）。

我也建了一个 Obsidian 交流群，欢迎你的加入。在 AI 时代，让我们一起做好知识管理。群满200人了，感兴趣的朋友可以加我：linauwawa，我拉你入群。

![Image](data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='1px' height='1px' viewBox='0 0 1 1' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3E%3C/title%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' fill-opacity='0'%3E%3Cg transform='translate(-249.000000, -126.000000)' fill='%23FFFFFF'%3E%3Crect x='249' y='126' width='1' height='1'%3E%3C/rect%3E%3C/g%3E%3C/g%3E%3C/svg%3E)

**微信扫一扫赞赏作者**

Obsidian 系列 · 目录

阅读原文

继续滑动看下一个

林小卫很行

向上滑动看下一个