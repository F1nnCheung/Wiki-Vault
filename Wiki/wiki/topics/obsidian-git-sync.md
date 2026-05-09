---
title: Obsidian Git 云同步完整指南
type: topic
tags: [obsidian, git, github, 同步, 备份, 手机端]
created: 2026-05-09
updated: 2026-05-09
sources:
  - raw/articles/Obsidian/03-Git云同步.md
  - raw/articles/Obsidian/Obsidain使用教程大纲.md
related:
  - entities/obsidian.md
  - topics/obsidian-getting-started.md
  - concepts/file-over-app.md
---

# Obsidian Git 云同步完整指南

免费、安全、全自动的 Obsidian 多端同步方案。覆盖电脑端和手机端的完整配置流程。

## 为什么选择 Git + GitHub

Obsidian 本身不提供免费云同步（Obsidian Sync 是付费功能 $4/月）。Git + GitHub 方案的优势：

| 对比维度 | Git + GitHub | iCloud/OneDrive | Obsidian Sync |
|---------|-------------|-----------------|---------------|
| **费用** | 🆓 完全免费 | 🆓 免费 | 💰 $4/月 |
| **版本历史** | ✅ 完整 Git 历史 | ❌ 有限或无 | ✅ 有 |
| **回滚能力** | ✅ 随时回滚任意版本 | ❌ 困难 | ✅ 有 |
| **冲突处理** | ✅ 可手动合并 | ⚠️ 容易产生冲突文件 | ✅ 自动处理 |
| **跨平台** | ✅ 全平台 | ✅ 全平台 | ✅ 全平台 |
| **稳定性** | GitHub 极高 | ⚠️ 偶有同步延迟 | ✅ 官方方案 |

> ⚠️ **不要用 Dropbox**，社区大量报告存在同步问题。

## 电脑端配置

### 第一步：创建 GitHub 私有仓库

1. 注册/登录 [GitHub](https://github.com)
2. 点击右上角 + → New repository
3. Repository name: `personal-vault`（自定义）
4. **务必选择 Private**（笔记不会公开到互联网）
5. 点击 Create repository

### 第二步：克隆仓库到本地

**新手推荐 GitHub Desktop**：
1. 下载 [GitHub Desktop](https://desktop.github.com)
2. 登录 GitHub 账号
3. File → Clone repository → 选择刚创建的仓库 → 选择本地路径 → Clone

**或命令行**：
```bash
git clone https://github.com/你的用户名/personal-vault.git
```

### 第三步：在 Obsidian 中打开

1. 打开 Obsidian → Open folder as vault
2. 选择克隆到本地的文件夹
3. 你的 Vault 就是一个 Git 仓库了

### 第四步：创建 .gitignore

在 Vault 根目录创建 `.gitignore`：

```gitignore
# 工作区布局文件（不同设备布局不同，不需同步）
.obsidian/workspace.json
.obsidian/workspace-mobile.json

# 垃圾桶
.trash/
```

### 第五步：安装并配置 Git 插件

1. 设置 → 第三方插件 → 浏览 → 搜索 **Git**（作者 Denis Olekhov）
2. 安装并启用

**核心配置项**：

| 配置项 | 设置值 | 作用 |
|--------|--------|------|
| Auto commit-and-sync after stopping file edits | **开启** | 停止编辑后自动提交 |
| Auto commit-and-sync interval | **1 分钟** | 停止编辑 1 分钟后触发 |
| Pull on startup | **开启** | 启动时自动拉取最新内容 |
| Push on commit-and-sync | **开启** | 自动推送到 GitHub |
| Pull on commit-and-sync | **开启** | 提交前先拉取远程更新 |

配置完成后，每当你停止编辑 1 分钟，Obsidian 自动执行：
```
git add → git commit → git pull → git push
```

状态栏会显示 Git 操作状态，右上角弹窗提示同步结果。

### 第六步：验证

1. 在 Obsidian 中新建一篇笔记，停止编辑等 1 分钟
2. 看右上角是否有 "Committed X files" 弹窗
3. 打开 GitHub 网页版仓库，确认新笔记出现
4. 反向验证：在 GitHub 网页端创建文件 → Obsidian 中命令面板 → "Git: Pull" → 确认同步

## 手机端配置

### 第一步：复制 Vault 到手机

用数据线连接手机与电脑：
1. 手机选择「传输文件」模式
2. 将整个 Vault 文件夹复制到手机的 Documents 目录

### 第二步：安装手机端 Obsidian

- iOS：App Store
- Android：Google Play 或官网 APK

打开 App → Open folder as vault → 选择 Documents/Vault 文件夹 → 信任作者并启用插件

### 第三步：生成 Personal Access Token

在**电脑上**操作（GitHub 网页端）：
1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Note: `Obsidian Git Sync`
4. Expiration: **No expiration**（永不过期）
5. Scopes: 勾选 **repo**（私有仓库全控制）
6. Generate token → **立即复制**（刷新页面后就看不到了）

### 第四步：手机端 Git 插件配置

手机端 Obsidian → 设置 → 第三方插件 → Git → 选项：
- **Author name**：GitHub 用户名
- **Email**：注册 GitHub 的邮箱
- **Personal access token**：粘贴刚才复制的 token

### 第五步：验证手机同步

1. 手机上新建笔记，写内容，退出编辑
2. 等待 1 分钟
3. 电脑浏览器打开 GitHub 仓库，确认新文件出现
4. 反过来：电脑修改笔记 → 等同步完成 → 手机端手动 Pull 验证

## 使用注意事项

### 避免 Git 冲突

Git 冲突发生在两设备同时修改同一文件的同一部分时。预防措施：
- **不要同时在两台设备上编辑同一篇笔记**
- 编辑完一台设备后，确认同步完成再编辑另一台
- 不要长时间在两台设备上同时保持同一篇笔记打开

### 冲突解决方法

如果出现了冲突标记：
```
<<<<<<< HEAD
这是电脑端修改的内容
=======
这是手机端修改的内容
>>>>>>> branch-name
```

手动编辑，保留想要的内容，删除冲突标记（包括 `<<<<<<<`、`=======`、`>>>>>>>`），保存后 Git 插件会自动提交。

### 大型附件处理

如果 Vault 有大量图片/视频：
- 大文件（视频、PSD 等）不要放入 Git 仓库
- 使用网盘单独同步大文件
- 或使用 Git LFS（配置较复杂）
- 笔记正文和图片分离：Git 同步笔记，网盘同步素材

## 多重备份策略

| 层级 | 方式 | 频率 | 作用 |
|------|------|------|------|
| **热备份** | GitHub | 实时 | 多端同步，随时可用 |
| **温备份** | 网盘（百度云/iCloud/OneDrive） | 每周 | 独立于 Git 的第二备份 |
| **冷备份** | 移动硬盘/U盘 | 每月 | 完全离线，防勒索病毒 |

组合使用，即使极端情况（GitHub 关闭、电脑损坏）笔记依然安全。

## 排查清单

同步失败时按顺序检查：
1. 网络连接（能否访问 github.com）
2. Git 插件状态栏提示，看具体错误信息
3. 命令面板 → "Git: Pull" 手动拉取
4. 是否有未提交的本地变更 → 手动 Commit
5. `.gitignore` 是否配置正确
6. Token 是否过期（手机端常见问题）
7. 是否有冲突文件等待手动解决
