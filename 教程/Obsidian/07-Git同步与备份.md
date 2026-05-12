---
title: Obsidian 07 — Git 同步与备份
type: tutorial
tags: [obsidian, git, github, 同步, 备份]
created: 2026-05-12
updated: 2026-05-12
sources:
  - Wiki/wiki/topics/obsidian-git-sync.md
related:
  - 05-插件系统.md
  - 08-AI集成方案.md
---

# Obsidian 07 — Git 同步与备份

> 免费、安全、全自动的 Obsidian 多端同步方案。覆盖电脑端和手机端的完整配置，加上多重备份策略，确保你的知识库永不丢失。

---

## 为什么选择 Git + GitHub

Obsidian Sync 是官方付费服务（$4/月）。Git + GitHub 是完全免费的替代方案：

| 对比维度 | Git + GitHub | iCloud/OneDrive | Obsidian Sync |
|---|---|---|---|
| **费用** | 🆓 完全免费 | 🆓 免费 | 💰 $4/月 |
| **版本历史** | ✅ 完整 Git 历史 | ❌ 有限 | ✅ 有 |
| **回滚能力** | ✅ 随时回滚任意版本 | ❌ 困难 | ✅ 有 |
| **冲突处理** | ✅ 可手动合并 | ⚠️ 容易冲突 | ✅ 自动 |
| **跨平台** | ✅ 全平台 | ✅ 全平台 | ✅ 全平台 |

> ⚠️ 不要用 Dropbox——社区大量报告存在同步问题。

---

## 电脑端配置

### 第一步：创建 GitHub 私有仓库

1. 登录 GitHub → 右上角 + → New repository
2. Repository name: `personal-vault`
3. **务必选择 Private**
4. Create repository

### 第二步：克隆到本地

```bash
git clone https://github.com/你的用户名/personal-vault.git
```

然后在 Obsidian 中 Open folder as vault，选择克隆下来的文件夹。

### 第三步：创建 .gitignore

在 Vault 根目录：

```gitignore
# 工作区布局文件（不同设备布局不同，不需同步）
.obsidian/workspace.json
.obsidian/workspace-mobile.json

# 垃圾桶
.trash/
```

### 第四步：安装 Git 插件

1. 社区插件 → 搜索 **Git**（作者 Denis Olekhov）
2. 安装并启用

**核心配置**：

| 配置项 | 推荐值 | 作用 |
|---|---|---|
| Auto commit-and-sync interval | **1 分钟** | 停止编辑 1 分钟后触发 |
| Pull on startup | **开启** | 启动时自动拉取 |
| Push on commit-and-sync | **开启** | 自动推送 |
| Pull on commit-and-sync | **开启** | 提交前先拉取远程 |

配置完成后，每当你停止编辑 1 分钟：
```
git add → git commit → git pull → git push
```

### 第五步：验证

```
□ 新建一篇笔记，停止编辑等 1 分钟
□ 右上角出现 "Committed X files" 弹窗
□ GitHub 网页版仓库中出现新文件
```

---

## 手机端配置

### 第一步：复制 Vault 到手机

用数据线将整个 Vault 文件夹复制到手机 Documents 目录。

### 第二步：安装手机端 Obsidian

iOS：App Store / Android：Google Play 或官网 APK

打开 App → Open folder as vault → 选择 Documents/Vault 文件夹

### 第三步：生成 Personal Access Token

在电脑 GitHub 网页端：
1. Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Expiration: **No expiration**
4. Scopes: 勾选 **repo**
5. Generate → **立即复制**（关掉页面就看不到了）

### 第四步：手机端 Git 插件配置

手机 Obsidian → 设置 → Git 插件 → 选项：
- **Author name**：GitHub 用户名
- **Email**：GitHub 注册邮箱
- **Personal access token**：粘贴 Token

### 第五步：验证

```
□ 手机上新建笔记 → 等 1 分钟 → GitHub 上确认出现
□ 电脑上修改笔记 → 等同步 → 手机端手动 Pull 验证
```

---

## 避免 Git 冲突

预防措施：
- **不要同时在两台设备上编辑同一篇笔记**
- 编辑完一台后，确认同步完成再编辑另一台
- 不要长时间在两台设备上同时保持同一篇笔记打开

---

## 多重备份策略

| 层级 | 方式 | 频率 | 作用 |
|---|---|---|---|
| **热备份** | GitHub | 实时 | 多端同步，随时可用 |
| **温备份** | 网盘（百度云/OneDrive） | 每周 | 独立于 Git 的第二备份 |
| **冷备份** | 移动硬盘/U盘 | 每月 | 完全离线，防勒索病毒 |

---

## 同步失败排查清单

按顺序检查：
1. 网络连接（能否访问 github.com）
2. Git 插件状态栏提示的具体错误
3. 命令面板 → "Git: Pull" 手动拉取
4. 是否有未提交的本地变更 → 手动 Commit
5. `.gitignore` 是否配置正确
6. Token 是否过期（手机端常见问题）
7. 是否有冲突文件等待手动解决

---

## 本章小结

1. Git + GitHub = 免费同步 + 完整版本历史
2. 电脑端：安装 Git 插件，配置自动 commit/push/pull
3. 手机端：复制 Vault + Personal Access Token 认证
4. 避免冲突：不要同时在两台设备编辑同一篇笔记
5. 三重备份：GitHub（热）+ 网盘（温）+ 硬盘（冷）

> 📖 **下一步**：知识库永不丢失了，阅读 [[08-AI集成方案]]，学习如何让 AI 帮你打理知识库。

---

> 📚 参考：[[Wiki/wiki/topics/obsidian-git-sync|Git 云同步指南]]
