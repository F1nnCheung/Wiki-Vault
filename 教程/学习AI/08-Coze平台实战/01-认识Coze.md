---
title: 认识 Coze
type: tutorial
tags: [Coze, 扣子, 低代码, Agent编排]
created: 2026-06-02
updated: 2026-06-02
sources:
  - Wiki/wiki/entities/coze.md
  - Wiki/wiki/comparisons/lowcode-ai-platforms.md
related:
  - 00-Coze平台实战指南.md
  - 02-快速上手第一个Agent.md
---

# 第一章：认识 Coze

---

## 1.1 Coze 是什么？

Coze（国内版：**扣子**）是字节跳动推出的 AI Agent 开发平台，定位「人人都是 AI 开发者」。

**一句话**：像搭积木一样创建 AI Agent——内置上千款工具插件，支持零代码可视化编排，一键发布到微信、抖音、飞书等平台。

---

## 1.2 四大产品线

| 产品 | 定位 | 适合谁 |
|------|------|-------|
| **扣子 Agent** | 智能体对话助手 + 技能商店 | 所有人 |
| **扣子编程** | AI 编程（Vibe Coding）+ 低代码（可视化） | 产品经理、程序员 |
| **扣子罗盘** | Agent 开发与运维平台（全生命周期管理） | 专业开发者 |
| **扣子开源** | 企业私有化部署与二次开发 | 企业技术团队 |

---

## 1.3 Coze vs Dify 快速对比

| 维度 | Coze | Dify |
|------|------|------|
| **上手难度** | ⭐ 极低（零代码为主） | ⭐⭐⭐ 中等（需理解架构） |
| **开源** | 部分开源 | ✅ 完全开源 Apache 2.0 |
| **私有化部署** | 扣子开源版 | ✅ Docker 一键部署 |
| **插件生态** | ✅✅ 500+ 插件 + 技能商店 | ⚠️ 基础，不如 Coze |
| **多平台分发** | ✅✅ 微信/抖音/飞书/小程序/API | ⚠️ 主要为 API 和网页嵌入 |
| **RAG 能力** | 内置基础 RAG | ✅✅ 深度 RAG Pipeline |
| **LLMOps** | 基础监控 | ✅✅ 完整 LLMOps 套件 |
| **适合场景** | 快速原型、非技术人员、内容创作 | 企业级 AI 应用、复杂 RAG、数据安全 |

> 📖 完整对比见 [[Wiki/wiki/comparisons/lowcode-ai-platforms|低代码 AI 平台对比]]。

### 选择 Coze 还是 Dify？

```
你的需求是什么？
├── 快速搭建 Agent → 先发布到微信/抖音？ → Coze
├── 企业私有化 RAG 知识库 → 数据安全优先？ → Dify
├── 复杂工作流编排 → 需要深度定制？ → Dify（或 LangGraph）
└── 两者都用 → 原型验证用 Coze，生产落地用 Dify
```

---

## 1.4 本章实战练习

- [ ] 用自己的话解释 Coze 的四大产品线分别适合谁
- [ ] 选一个你常用的场景，判断应该用 Coze 还是 Dify
- [ ] 访问 https://www.coze.cn 注册账号

---

> 📖 继续学习 [[02-快速上手第一个Agent|第二章：快速上手第一个 Agent]]——注册并搭建你的个人开发助手。
