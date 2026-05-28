唐巧 *2026年5月10日 10:16*

![图片](https://mmbiz.qpic.cn/mmbiz_jpg/ATwvxoLHQIywz8CN8FKuBrGxzl7WOXzzVI4r6Cz7H0I8fOaRxicedBHYuYKcaFE9cW19j4xHsB1YiaYia4CjCMJyiczKpMEL3aKnv84iaE9neSdU/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1#imgIndex=0)

用 Markdown 做笔记，用 HTML 做呈现的好处是：我们同时兼得了 Markdown 的对大模型的友好度和 HTML 对人类的内容呈现的友好度。

这种工作方式已经在我们公司执行一段时间了，我认为体验还是比较好的。

具体使用方式是：跟你的 Agent 聊天，然后让它将聊天的内容整理成 Markdown 文件，并且基于这个文件多轮对话去进行内容的调整，最后让它基于这个 Markdown 文件生成对应的 HTML 即可。

Thariq（@trq212）是 Anthropic / Claude Code 团队成员，他在这篇推文中详细解释了这样做的好处：

https://x.com/i/status/2052809885763747935，我把这篇文章翻译了，见《 [HTML 不可思议的有效性](https://mp.weixin.qq.com/s?__biz=MjM5NTIyNTUyMQ==&mid=2709548661&idx=1&sn=b1723f3e8d8fb355a37380bc25392791&scene=21#wechat_redirect) 》

这样做的唯一问题是：我们需要保留两份文件，一份是 Markdown 文件，一份是 HTML 文件。但是好在这两个文件都不是很大，并且我们可以让 Agent 帮我们自动做整理。

以上，周末愉快。

AI 学习笔记 · 目录

继续滑动看下一个

唐巧

向上滑动看下一个