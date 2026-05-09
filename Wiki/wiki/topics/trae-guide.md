---
title: Trae 完整教程
type: topic
tags: [trae, tutorial, installation, getting-started]
created: 2026-05-09
updated: 2026-05-09
sources: []
related:
  - entities/trae.md
  - topics/ai-coding-tools-comparison.md
  - topics/ai-coding-learning-plan.md
---

# Trae 完整教程

## 一、介绍

Trae 是字节跳动推出的 AI 原生 IDE，**永久免费**，2026 年中国市场份额 41.2%。内置豆包、DeepSeek、GLM、Qwen 等顶级模型，中文理解准确率 98%。

**官网**：trae.cn（国内）/ trae.ai（国际）

**核心特点**：
- 永久免费（个人版）
- 国内直连，无需代理
- 四种开发模式覆盖全场景
- 可从 VS Code / Cursor 导入配置

---

## 二、安装

### 系统要求

| 系统 | 要求 |
|---|---|
| Windows | Windows 10/11，64 位 |
| macOS | 12.0+（Intel / Apple Silicon） |
| Linux | Ubuntu 20.04+ / Debian 11（.deb） |

### 步骤

1. 访问 **https://www.trae.cn**（⚠️ 认准 `.cn` 域名）
2. 点击「下载 IDE」，约 100MB
3. 安装后首次启动用**手机号**或**稀土掘金账号**登录
4. 可选：从 VS Code / Cursor 导入配置

---

## 三、入门使用

### 四种开发模式

| 模式 | 快捷键 | 适用场景 |
|---|---|---|
| **Chat** | `Cmd/Ctrl + L` | 代码解释、Bug 排查、技术咨询 |
| **Builder** | `Cmd/Ctrl + B` | 快速搭建 CRUD、数据看板 |
| **SOLO** | `Cmd/Ctrl + I` | 一句话生成完整项目 |
| **IDE** | 默认 | 传统编码 + AI 补全 |

### Chat 模式

```
1. 选中代码 → Cmd/Ctrl + L
2. 输入问题：「这段代码有什么问题？」
3. AI 分析并给出建议
4. 点击 Apply 直接应用修改
```

### SOLO 模式

```
1. Cmd/Ctrl + I 打开 SOLO
2. 描述需求：「做一个待办事项应用，支持添加、完成、删除」
3. AI 自动生成完整项目结构
4. 预览效果，迭代修改
```

### CUE 智能补全

- **代码补全**：输入时自动建议，Tab 接受
- **多行修改**：AI 识别多处需要同步修改的位置
- **智能导入**：自动添加缺失的 import
- **智能重命名**：跨文件同步重命名

---

## 四、进阶使用

### MCP Server 配置

Trae 支持 MCP（Model Context Protocol），可接入自定义工具：

```json
// .trae/mcp.json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}
```

### 火山引擎 Coding Plan

如需使用更多商业模型（DeepSeek-V3.2、Kimi-K2.6 等）：

1. 注册火山引擎账号
2. 开通 Coding Plan
3. 在 Trae 设置中配置 API Key

### 规则配置

在项目根目录创建 `.trae/rules.md`：

```markdown
# 项目规则

- 使用 TypeScript 严格模式
- 组件使用 React 函数组件 + Hooks
- 样式使用 Tailwind CSS
- 测试使用 Vitest
```

---

## 五、插件与扩展

### 推荐插件

| 插件 | 用途 |
|---|---|
| PlatformIO | 嵌入式/物联网开发 |
| GitLens | Git 增强 |
| Prettier | 代码格式化 |
| ESLint | 代码检查 |

Trae 兼容 VS Code 插件生态，可直接从 VS Code Marketplace 安装。

---

## 六、Trae vs Cursor 快速对比

| 维度 | Trae | Cursor |
|---|---|---|
| 定价 | **免费** | $20-200/月 |
| 中文 | **98%** | 75% |
| 国内速度 | **极速** | 一般 |
| 模型选择 | 固定 | 灵活 |
| 国际化 | 弱 | 强 |

**选 Trae**：国内开发者、学生、预算为零、中文项目
**选 Cursor**：需要最强模型、国际化项目、愿意付费
