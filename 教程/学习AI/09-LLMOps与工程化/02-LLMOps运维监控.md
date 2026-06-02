---
title: LLMOps 运维监控
type: tutorial
tags: [LLMOps, Token监控, 质量追踪, 运维面板, 成本控制]
created: 2026-06-02
updated: 2026-06-02
sources:
  - Wiki/wiki/entities/dify.md
  - Wiki/wiki/concepts/agentic-engineering.md
related:
  - 00-LLMOps与工程化指南.md
  - 01-MVP架构设计.md
  - 03-AI代码安全审计.md
---

# 第二章：LLMOps 运维监控

> 📖 对应学习计划 Day 5-6。Token 消耗监控、质量追踪、报错率面板——AI 开发工作台的「仪表盘」。

---

## 2.1 为什么需要 LLMOps

当你开始日常使用 AI 编码时，三个问题会逐渐浮现：

1. **成本失控**：不知不觉 API 费用暴涨，但你不知道钱花在哪了
2. **质量漂移**：模型升级后，之前能过的任务现在失败，但你发现得太晚
3. **幻觉隐匿**：AI 在代码中插入了不存在的 API，你上线后才发现

LLMOps 就是解决这三个问题的工程实践。

---

## 2.2 Token 消耗监控

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

### 按模型的价格参考（2026 年 6 月）

| 模型 | 输入价格 ($/1M tokens) | 输出价格 ($/1M tokens) | 适合任务 |
|------|----------------------|----------------------|---------|
| Claude Opus 4 | $15 | $75 | 复杂架构设计 |
| Claude Sonnet 4 | $3 | $15 | 日常开发（推荐） |
| DeepSeek V3 | $0.27 | $1.10 | 高性价比批量任务 |
| Ollama 本地 | ¥0 | ¥0 | 代码补全、简单重构 |

---

## 2.3 报错率与质量监控

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

### 关键监控指标

| 指标 | 计算方式 | 告警阈值 | 说明 |
|------|---------|---------|------|
| **成功率** | 成功任务 / 总任务 | < 85% | 核心健康指标 |
| **幻觉率** | 幻觉任务 / 总任务 | > 3% | 需检查 Prompt 和模型版本 |
| **人均修正率** | 需人工修正 / 总任务 | > 20% | AI 产出的可用性指标 |
| **平均 Token/任务** | 总 Token / 任务数 | 偏离基线 >50% | 检测异常任务 |
| **P99 延迟** | 99 分位响应时间 | > 30s | 用户体验指标 |

---

## 2.4 简单监控面板

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

## 2.5 生产级 LLMOps 进阶方向

MVP 阶段的监控脚本适合个人使用。当你要推广到团队时，考虑以下升级方向：

| MVP | 生产级 | 工具 |
|-----|-------|------|
| 终端 Dashboard | Web Dashboard + Grafana | Prometheus + Grafana |
| 本地 Python 脚本 | 集中式日志收集 | ELK / Datadog |
| 手动告警 | 自动告警推送到 IM | PagerDuty / 飞书机器人 |
| 按会话统计 | 按用户/项目/模型多维分析 | ClickHouse + Metabase |
| 事后分析 | 实时流式监控 | Kafka + Flink |

---

## 2.6 本章实战练习

- [ ] 运行 Token 监控脚本，记录你一天开发中的 Token 消耗
- [ ] 用 QualityTracker 追踪至少 10 个 AI 任务的成功/失败状态
- [ ] 计算出你的 24h 成功率，找到最常见的失败类型
- [ ] 设定你的日 Token 预算，配置告警阈值

---

> 📖 继续学习 [[03-AI代码安全审计|第三章：AI 代码安全审计]]——自动拦截 AI 生成的漏洞代码。
