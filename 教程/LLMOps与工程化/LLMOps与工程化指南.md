---
title: LLMOps 与工程化落地指南
type: tutorial
tags: [LLMOps, 工程化, MVP, 代码安全, 运维, 学习计划]
created: 2026-06-01
updated: 2026-06-01
sources:
  - Wiki/wiki/entities/dify.md
  - Wiki/wiki/concepts/agentic-engineering.md
  - Wiki/wiki/concepts/harness-engineering.md
related:
  - ../MCP与本地部署/MCP与本地部署学习指南.md
  - ../Dify平台实战/Dify平台实战指南.md
  - ../AI Agent/AI Agent 学习指南.md
---

# LLMOps 与工程化落地指南

> 对应学习计划**第 8 周**：整合全部所学技术，打造 MVP 级别的程序员 AI 开发工作台，接入 LLMOps 运维监控，沉淀个人 AI 资产库。

> ⚠️ 重要认知：2 周不足以打造「可商用工作台」。优化版学习计划将目标调整为 **MVP**：核心链路完整可用，其余模块可插拔预留接口。商用打磨放到计划完成后持续迭代。

---

## 学习路线图

```
阶段一：架构设计与核心链路（Day 1-2，4h）
  ├── MVP 七层架构设计
  ├── 「LLM → Rule → Agent → MCP → 输出」核心链路
  └── 实战产出：工作台整体框架

        ↓

阶段二：知识层 + 智能体层联调（Day 3-4，4h）
  ├── Chroma 向量库搭建
  ├── Agentic RAG 检索管线
  ├── Agent + RAG 联动
  └── 实战产出：代码问答 + 自动生成 + 审查

        ↓

阶段三：应用层 + 运维层（Day 5-6，4h）
  ├── Dify + Coze 应用层接入
  ├── LLMOps 监控面板
  ├── AI 代码安全审计
  └── 实战产出：Token 消耗面板 + 代码安全扫描

        ↓

阶段四：复盘与资产沉淀（Day 7，2h）
  ├── 整理个人 AI 资产库
  ├── 产出可复用资产清单
  └── 实战产出：Prompt/Rule/Skills/Agent/RAG/MCP 全套资产
```

---

## 第一章：MVP 架构设计

### 1.1 七层架构

```
┌──────────────────────────────────────┐
│  7. 运维层：LLMOps + 安全审计        │ ← Token 监控 · 报错率 · 安全扫描
├──────────────────────────────────────┤
│  6. 应用层：Dify + Coze              │ ← RAG 问答入口 · Agent 对外分发
├──────────────────────────────────────┤
│  5. 智能体层：Agent + MCP + FC       │ ← 核心调度 · 工具调用 · 通信协议
├──────────────────────────────────────┤
│  4. 知识层：Chroma + Agentic RAG     │ ← 矢量存储 · 智能检索 · 知识问答
├──────────────────────────────────────┤
│  3. 编码层：Trae/Cursor + Vibe Coding│ ← 本地 IDE · 自然语言编程
├──────────────────────────────────────┤
│  2. 约束层：Rule + Skills            │ ← 全局规则 · 可复用技能包
├──────────────────────────────────────┤
│  1. 底座层：Ollama + 云端 API        │ ← 本地模型 · 云端切换 · 自动降级
└──────────────────────────────────────┘
```

### 1.2 核心链路

```
用户需求
  ↓
[底座层] Ollama 本地模型（简单任务）/ Claude API（复杂任务）
  ↓
[约束层] Rule 自动注入（项目规范 + 个人偏好）
  ↓
[编码层] AI IDE 生成代码，Vibe Coding 迭代
  ↓
[知识层] Agentic RAG 检索项目知识库，补充上下文
  ↓
[智能体层] Agent 调度工具（读文件 → 写代码 → 跑测试 → Git）
  ↓
[应用层] Dify 后台面板 / Coze API 对外分发
  ↓
[运维层] LLMOps 监控 Token/报错/安全
```

### 1.3 MVP 范围定义

**MVP 必须包含（核心链路）**：
- [x] 本地 Ollama + 云端 API 双通道自动切换
- [x] 全局 Rule 文件（CLAUDE.md）自动加载
- [x] 3+ 可复用 Skills（接口生成 / SQL 编写 / 代码审查）
- [x] Chroma 向量库 + 项目知识库检索
- [x] Agent 核心调度器（规划 → 执行 → 验证）
- [x] 基础 LLMOps（Token 消耗 + 报错率）

**MVP 留给后续迭代（预留接口）**：
- [ ] Dify 私有化后台面板
- [ ] Coze 多渠道分发
- [ ] 多 Agent 协同
- [ ] 自动化 CI/CD 集成
- [ ] 完整安全审计管线

---

## 第二章：LLMOps 运维监控

### 2.1 Token 消耗监控

Token 是最直接的 AI 开发成本。没有监控，你的 API 费用会悄无声息地膨胀。

```python
import json
import time
from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional

@dataclass
class TokenUsage:
    """单次调用的 Token 消耗记录"""
    timestamp: str
    model: str
    prompt_tokens: int
    completion_tokens: int
    task_type: str          # 代码生成 / Bug 修复 / 代码审查 / 重构
    cost: float
    session_id: str

@dataclass
class SessionTracker:
    """会话级 Token 追踪器"""
    session_id: str
    model: str
    budget: int = 30000     # 默认预算 30K token
    usages: list = field(default_factory=list)
    
    @property
    def total_tokens(self) -> int:
        return sum(u.prompt_tokens + u.completion_tokens for u in self.usages)
    
    @property
    def budget_remaining(self) -> int:
        return self.budget - self.total_tokens
    
    @property
    def is_budget_critical(self) -> bool:
        return self.total_tokens > self.budget * 0.8
    
    def record(self, usage: TokenUsage):
        self.usages.append(usage)
        if self.is_budget_critical:
            print(f"⚠️ Token 预算预警：已用 {self.total_tokens}/{self.budget}")
    
    def summary(self) -> dict:
        """生成会话摘要"""
        return {
            "session_id": self.session_id,
            "model": self.model,
            "total_tokens": self.total_tokens,
            "budget_remaining": self.budget_remaining,
            "call_count": len(self.usages),
            "avg_tokens_per_call": self.total_tokens / max(len(self.usages), 1),
            "by_task_type": self._by_task_type()
        }
    
    def _by_task_type(self) -> dict:
        result = {}
        for u in self.usages:
            if u.task_type not in result:
                result[u.task_type] = {"count": 0, "tokens": 0}
            result[u.task_type]["count"] += 1
            result[u.task_type]["tokens"] += u.prompt_tokens + u.completion_tokens
        return result


# 全局 Token 监控器
class LLMUsageMonitor:
    """全局 LLM 使用监控"""
    
    def __init__(self, daily_budget: float = 10.0):
        self.daily_budget = daily_budget
        self.sessions: dict[str, SessionTracker] = {}
        self.daily_cost = 0.0
        self.alert_threshold = 0.8  # 80% 预警
    
    def new_session(self, model: str, budget: int = 30000) -> SessionTracker:
        session_id = f"sess_{int(time.time())}"
        tracker = SessionTracker(session_id=session_id, model=model, budget=budget)
        self.sessions[session_id] = tracker
        return tracker
    
    def check_daily_budget(self) -> Optional[str]:
        if self.daily_cost > self.daily_budget * self.alert_threshold:
            return f"⚠️ 日预算预警：已花费 ${self.daily_cost:.2f}/${self.daily_budget:.2f}"
        return None
```

### 2.2 报错率与质量监控

```python
from enum import Enum

class TaskStatus(Enum):
    SUCCESS = "success"
    FAILED = "failed"
    HALLUCINATION = "hallucination"  # 检测到幻觉
    TIMEOUT = "timeout"
    REQUIRED_FIX = "required_fix"    # 需要人工修正

class QualityTracker:
    """输出质量追踪器"""
    
    def __init__(self):
        self.tasks: list = []
    
    def record(self, task_id: str, task_type: str, status: TaskStatus, 
               model: str, tokens: int, notes: str = ""):
        self.tasks.append({
            "task_id": task_id,
            "task_type": task_type,
            "status": status.value,
            "model": model,
            "tokens": tokens,
            "notes": notes,
            "timestamp": datetime.now().isoformat()
        })
    
    def error_rate(self, window_hours: int = 24) -> dict:
        """计算指定窗口内的错误率"""
        cutoff = datetime.now().timestamp() - window_hours * 3600
        recent = [t for t in self.tasks 
                  if datetime.fromisoformat(t["timestamp"]).timestamp() > cutoff]
        
        if not recent:
            return {"error_rate": 0, "total": 0}
        
        total = len(recent)
        failed = sum(1 for t in recent if t["status"] != TaskStatus.SUCCESS.value)
        
        return {
            "error_rate": failed / total * 100,
            "total": total,
            "failed": failed,
            "by_type": self._by_status(recent)
        }
    
    def _by_status(self, tasks: list) -> dict:
        result = {}
        for t in tasks:
            status = t["status"]
            result[status] = result.get(status, 0) + 1
        return result
    
    def weekly_report(self) -> str:
        """生成周报"""
        rate = self.error_rate(window_hours=168)
        return f"""
        📊 周质量报告
        ━━━━━━━━━━━━━
        总任务数：{rate['total']}
        成功率：{100 - rate['error_rate']:.1f}%
        失败率：{rate['error_rate']:.1f}%
        
        状态分布：{rate['by_type']}
        """
```

### 2.3 简单监控面板

用 Python 脚本生成一个终端 Dashboard：

```python
def print_dashboard(monitor: LLMUsageMonitor, quality: QualityTracker):
    """终端 LLMOps 面板"""
    
    # Token 概览
    total_tokens = sum(s.total_tokens for s in monitor.sessions.values())
    today_cost = monitor.daily_cost
    
    # 质量概览
    quality_stats = quality.error_rate(window_hours=24)
    
    print("""
    ┌─────────────────────────────────────────┐
    │         🤖 AI 工作台 LLMOps 面板         │
    ├─────────────────────────────────────────┤
    """)
    print(f"    │  📊 今日 Token 消耗：{total_tokens:>10,} tokens  │")
    print(f"    │  💰 今日费用：     ${today_cost:>10.2f}         │")
    print(f"    │  📈 24h 成功率：   {100 - quality_stats['error_rate']:>9.1f}%        │")
    print(f"    │  🔄 活跃会话数：   {len(monitor.sessions):>10}           │")
    print(f"    │  ⚠️  今日报错：     {quality_stats.get('failed', 0):>10}           │")
    print("    └─────────────────────────────────────────┘")
    
    if monitor.check_daily_budget():
        print(f"    {monitor.check_daily_budget()}")
```

---

## 第三章：AI 代码安全审计

### 3.1 AI 生成代码的安全风险图谱

| 风险类别 | 常见问题 | 检查方法 |
|---------|---------|---------|
| **注入** | SQL 拼接代替参数化查询、Shell 拼接命令 | 代码扫描 + 模式匹配 |
| **硬编码密钥** | API Key、密码、Token 写在代码里 | 正则扫描 `sk-` / `Bearer` / `password=` |
| **越权** | 未校验用户权限的 API | 审查每个 API 的 middleware |
| **XSS** | `dangerouslySetInnerHTML`、未转义用户输入 | React/前端代码扫描 |
| **依赖漏洞** | 使用已知漏洞的 npm/pip 包 | `npm audit` / `pip-audit` / Snyk |
| **信息泄露** | 报错信息暴露内部路径/数据库结构 | 扫描 `console.log(error)` 模式 |

### 3.2 自动化安全扫描脚本

```python
import re
import os
from pathlib import Path

class AICodeSecurityScanner:
    """AI 生成代码安全扫描器"""
    
    # 硬编码密钥模式
    SECRET_PATTERNS = [
        (r'sk-[a-zA-Z0-9]{32,}', 'OpenAI API Key'),
        (r'sk-ant-[a-zA-Z0-9_-]{32,}', 'Anthropic API Key'),
        (r'AKIA[0-9A-Z]{16}', 'AWS Access Key'),
        (r'(password|passwd|pwd|secret)\s*[:=]\s*[\'"][^\'"]+[\'"]', '硬编码密码'),
        (r'Bearer\s+[a-zA-Z0-9_-]{20,}', '硬编码 Bearer Token'),
    ]
    
    # SQL 注入风险模式
    SQL_INJECTION_PATTERNS = [
        (r'execute\s*\(\s*["\']\s*SELECT.*\%.*["\']', 'SQL 字符串拼接'),
        (r'execute\s*\(\s*["\']\s*INSERT.*\%.*["\']', 'SQL 字符串拼接'),
        (r'\.execute\s*\(\s*f[\'"].*\{', 'Python f-string SQL'),
    ]
    
    # 危险函数调用
    DANGEROUS_CALLS = [
        (r'dangerouslySetInnerHTML', 'React XSS 风险'),
        (r'eval\s*\(', 'eval() 代码注入风险'),
        (r'exec\s*\(', 'Python exec() 风险'),
        (r'os\.system\s*\(', 'Shell 注入风险'),
        (r'subprocess\.call\s*\(\s*[^,\]]*shell\s*=\s*True', 'Shell=True 注入风险'),
    ]
    
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.findings: list[dict] = []
    
    def scan_file(self, filepath: Path) -> list[dict]:
        """扫描单个文件"""
        findings = []
        try:
            content = filepath.read_text(encoding='utf-8', errors='ignore')
        except Exception:
            return findings
        
        for line_no, line in enumerate(content.split('\n'), 1):
            for pattern, risk_type in self.SECRET_PATTERNS:
                if re.search(pattern, line, re.IGNORECASE):
                    findings.append({
                        "file": str(filepath.relative_to(self.project_root)),
                        "line": line_no,
                        "type": "SECRET",
                        "risk": risk_type,
                        "severity": "CRITICAL",
                        "code": line.strip()[:100]
                    })
            
            for pattern, risk_type in self.SQL_INJECTION_PATTERNS:
                if re.search(pattern, line, re.IGNORECASE):
                    findings.append({
                        "file": str(filepath.relative_to(self.project_root)),
                        "line": line_no,
                        "type": "SQL_INJECTION",
                        "risk": risk_type,
                        "severity": "HIGH",
                        "code": line.strip()[:100]
                    })
            
            for pattern, risk_type in self.DANGEROUS_CALLS:
                if re.search(pattern, line):
                    findings.append({
                        "file": str(filepath.relative_to(self.project_root)),
                        "line": line_no,
                        "type": "DANGEROUS_CALL",
                        "risk": risk_type,
                        "severity": "HIGH",
                        "code": line.strip()[:100]
                    })
        
        return findings
    
    def scan_project(self, file_patterns: list[str] = None) -> list[dict]:
        """扫描整个项目"""
        if file_patterns is None:
            file_patterns = ['*.py', '*.js', '*.ts', '*.tsx', '*.jsx', '*.java', '*.go']
        
        for pattern in file_patterns:
            for filepath in self.project_root.rglob(pattern):
                # 跳过 node_modules、.git、venv
                if any(skip in filepath.parts for skip in ['node_modules', '.git', 'venv', '__pycache__']):
                    continue
                self.findings.extend(self.scan_file(filepath))
        
        return self.findings
    
    def report(self) -> str:
        """生成扫描报告"""
        if not self.findings:
            return "✅ 未发现安全风险"
        
        critical = [f for f in self.findings if f['severity'] == 'CRITICAL']
        high = [f for f in self.findings if f['severity'] == 'HIGH']
        
        report = f"""
        🔒 AI 代码安全审计报告
        ━━━━━━━━━━━━━━━━━━━
        CRITICAL: {len(critical)} 项
        HIGH:     {len(high)} 项
        TOTAL:    {len(self.findings)} 项
        
        详细信息：
        """
        for f in self.findings:
            report += f"\n  [{f['severity']}] {f['file']}:{f['line']}"
            report += f"\n  风险：{f['risk']}"
            report += f"\n  代码：{f['code']}"
        
        return report
```

### 3.3 安全审计流程 SOP

```
每次 AI 生成代码后：
  ↓
1. 自动扫描（scan_project）
  ↓
2. CRITICAL 级别 → 强制阻止合并
   HIGH 级别 → 标记需人工审查
  ↓
3. 生成审计报告
  ↓
4. 修复后重新扫描
```

---

## 第四章：个人 AI 资产沉淀

### 4.1 资产库结构

```
~/.ai-assets/
├── prompts/              # Prompt 模板库
│   ├── code-gen.md       # 代码生成 Prompt
│   ├── bug-fix.md        # Bug 修复 Prompt
│   ├── code-review.md    # 代码审查 Prompt
│   ├── sql-gen.md        # SQL 生成 Prompt
│   └── api-design.md     # API 设计 Prompt
├── rules/                # Rule 规则文件
│   ├── global.md         # 全局通用 Rule
│   ├── frontend.md       # 前端项目 Rule
│   └── backend.md        # 后端项目 Rule
├── skills/               # 自定义 Skills
│   ├── api-generator/
│   ├── sql-writer/
│   └── test-generator/
├── agents/               # Agent 配置
│   ├── dev-agent.json    # 开发 Agent
│   └── review-agent.json # 审查 Agent
├── mcp/                   # MCP 配置
│   └── mcp.json
└── monitoring/            # 监控配置
    └── llmops-config.json
```

### 4.2 资产复用检查清单

完成第 8 周后，应确保以下资产可跨项目复用：

- [ ] **Prompt 模板 8 套**：功能实现 / Bug 修复 / 代码审查 / 代码重构 / SQL 生成 / 测试生成 / API 设计 / 技术方案
- [ ] **Rule 文件 3 套**：全局通用 / 前端项目 / 后端项目
- [ ] **Skills 6 个**：api-generator / sql-writer / code-refactor / test-generator / tech-review / security-audit
- [ ] **Agent 配置**：开发 Agent（含工具列表+系统提示词）、审查 Agent
- [ ] **MCP 组合**：按项目类型预设的 MCP 列表
- [ ] **LLMOps 脚本**：Token 监控 / 质量追踪 / 安全扫描

---

## 附录 A：第 8 周每日学习清单

| 天数 | 学习内容 | 实战产出 |
|------|---------|---------|
| Day 1-2 | 架构设计 + 核心链路搭建 | 工作台整体框架，「LLM → Rule → Agent → MCP → 输出」链路打通 |
| Day 3-4 | 知识层 + 智能体层联调 | Chroma 向量库 + Agentic RAG + Agent 联动 |
| Day 5 | 应用层接入 + 工具组合 | Dify + Coze 分别发布入口 |
| Day 6 | LLMOps 监控 + AI 安全审计 | Token 面板 + 安全扫描脚本 + 审计报告 |
| Day 7 | 复盘 + 资产沉淀 | 个人 AI 资产库 + 可复用资产清单 |

## 附录 B：第 8 周复盘自检

- [ ] MVP 七层架构的核心链路是否完整可运行？
- [ ] Token 监控面板是否在工作？
- [ ] AI 代码安全扫描能否自动拦截硬编码密钥和 SQL 注入？
- [ ] 个人 AI 资产库是否已整理并验证跨项目可复用？
- [ ] 哪些模块留给后续迭代？（明确写在 TODO 中）
- [ ] 下一步重点是什么？（选 1-2 个 MVP 中体验最差的环境优先优化）

## 附录 C：8 周全计划完成总检

- [ ] 能否零调试，用 Prompt 生成符合团队规范的工业级代码？
- [ ] 能否编写完整的 Rule 规则文件 + 封装 5+ 可复用 Skill？
- [ ] 能否纯 Vibe Coding 完成完整项目？熟练切换四大 AI 编码工具？
- [ ] 能否理解 RAG 全链路并用 Dify 搭建私有知识库问答？
- [ ] 能否独立手写 Agent 核心代码 + 用 Coze 搭建可视化 Agent？
- [ ] 能否理解 MCP 协议、Function Calling？熟练使用 Ollama 本地模型？
- [ ] 能否部署并对比 OpenClaw 和 Hermes 两类 Agent 框架？
- [ ] 能否整合全技术栈，落地 LLMOps 运维监控，产出可运行的 MVP？

## 附录 D：延伸阅读

| 主题 | 知识库资源 |
|------|-----------|
| ECC 一站式 Harness 完整指南 | [[Wiki/wiki/topics/ecc-complete-guide\|ECC 完整指南]] |
| Superpowers + gstack 开发闭环 | [[Wiki/wiki/topics/claude-code-superpowers-workflow\|Superpowers+gstack 工作流]] |
| ID Coding — AI 编程终极愿景 | [[Wiki/wiki/concepts/id-coding\|ID Coding 概念页]] |
| Agentic Engineering | [[Wiki/wiki/concepts/agentic-engineering\|Agentic Engineering]] |
| 完整 8 周学习计划 | [[Ai学习计划/程序员专属AI全栈系统化学习计划（2026优化版）\|优化版学习计划]] |

---

> 🎉 **恭喜完成 8 周 AI 全栈系统化学习！** 这不是终点，而是起点。建议接下来：
> 1. 花 2-4 周打磨 MVP 中最弱的模块
> 2. 选一个真实项目深度实践全链路
> 3. 持续关注知识库更新（AI Coding 领域每月有新变化）
> 4. 如果你想深入某个方向：Agent 专项见 [[../AI Agent/AI Agent 学习指南\|AI Agent 教程]]，知识库技术见 [[../知识库技术/知识库技术学习指南\|知识库技术教程]]
> 5. 🆕 **想用这套能力变现？** 进入 [[../OPC/OPC 一人公司学习指南\|第 9 周：AI 创业落地]]——一个人 + AI = 一家公司，六大商业模式 + 四阶段创业法，把你前 8 周积累的技术能力变成持续收入
