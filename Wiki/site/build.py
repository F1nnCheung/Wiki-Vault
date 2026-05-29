#!/usr/bin/env python3
"""
知识库数据构建脚本
扫描 Wiki/wiki/ 下所有页面，提取 frontmatter 和内容，生成 data.json
"""

import json
import os
import re
import sys
from pathlib import Path
from datetime import date

import yaml
import markdown as md_lib

# 配置
VAULT_ROOT = Path(__file__).resolve().parent.parent.parent  # Vault root
WIKI_DIR = VAULT_ROOT / "Wiki" / "wiki"
RAW_DIR = VAULT_ROOT / "Wiki" / "raw" / "articles"
TUTORIAL_DIR = VAULT_ROOT / "教程"
OUTPUT_FILE = Path(__file__).resolve().parent / "data" / "data.json"

# Markdown 转换器（支持表格、代码高亮、围栏代码块）
md_converter = md_lib.Markdown(extensions=["tables", "fenced_code", "codehilite", "toc"])


def extract_frontmatter_and_content(text: str) -> tuple[dict, str]:
    """从 Markdown 文本中提取 YAML frontmatter 和正文"""
    fm = {}
    content = text
    if text.startswith("---"):
        parts = text.split("---", 2)
        if len(parts) >= 3:
            try:
                fm = yaml.safe_load(parts[1]) or {}
            except yaml.YAMLError:
                pass
            content = parts[2].strip()
    return fm, content


def get_first_paragraph(text: str) -> str:
    """提取正文第一个非空段落作为摘要"""
    lines = text.strip().split("\n")
    paragraph = []
    for line in lines:
        stripped = line.strip()
        if stripped == "" and paragraph:
            break
        if stripped and not stripped.startswith("#") and not stripped.startswith("```"):
            # 去除 markdown 链接语法 [text](url) -> text
            cleaned = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", stripped)
            # 去除 Wiki 链接 [[page|text]] 或 [[page]] -> text/page
            cleaned = re.sub(r"\[\[(?:[^\]|]+\|)?([^\]]+)\]\]", r"\1", cleaned)
            # 去除粗体斜体
            cleaned = re.sub(r"\*{1,3}([^*]+)\*{1,3}", r"\1", cleaned)
            cleaned = re.sub(r"`([^`]+)`", r"\1", cleaned)
            paragraph.append(cleaned)
    summary = " ".join(paragraph)
    if len(summary) > 200:
        summary = summary[:200] + "…"
    return summary


def convert_markdown_links(text: str, page_map: dict) -> str:
    """将 Wiki 链接和 markdown 链接转换为 HTML 链接"""
    # [[page|text]] 或 [[page]] -> HTML link
    def replace_wikilink(m):
        target = m.group(1)
        display = m.group(2) if m.group(2) else target
        # 去除 .md 后缀以匹配
        clean_target = target.replace(".md", "")
        # 查找相对路径
        if clean_target in page_map:
            return f'<a href="#" data-page="{page_map[clean_target]}" class="wiki-link">{display}</a>'
        # 尝试匹配
        for key in page_map:
            if key.endswith(clean_target) or clean_target.endswith(key):
                return f'<a href="#" data-page="{page_map[key]}" class="wiki-link">{display}</a>'
        # 保留为纯文本
        return display

    text = re.sub(r"\[\[([^\]|]+)(?:\|([^\]]+))?\]\]", replace_wikilink, text)

    # 外部链接 markdown 风格保持原样（会在 md->html 时处理）
    return text


def scan_raw_articles() -> int:
    """统计原始文章数量"""
    count = 0
    if RAW_DIR.exists():
        for f in RAW_DIR.rglob("*.md"):
            count += 1
    return count


def scan_tutorials() -> list[dict]:
    """扫描教程目录"""
    tutorials = []
    if TUTORIAL_DIR.exists():
        for f in sorted(TUTORIAL_DIR.rglob("*.md")):
            rel_path = str(f.relative_to(VAULT_ROOT))
            text = f.read_text(encoding="utf-8", errors="ignore")
            fm, content = extract_frontmatter_and_content(text)
            tutorials.append({
                "path": rel_path,
                "title": fm.get("title", f.stem),
                "folder": str(f.parent.relative_to(TUTORIAL_DIR)) if f.parent != TUTORIAL_DIR else "root",
            })
    return tutorials


def main():
    pages = []
    tag_counts = {}
    type_counts = {"concept": 0, "entity": 0, "topic": 0, "comparison": 0, "overview": 0}

    # 扫描所有 wiki 页面（全部纳入）
    md_files = sorted(WIKI_DIR.rglob("*.md"))

    # 第一步：收集所有页面路径建立映射
    page_map = {}
    for f in md_files:
        rel = str(f.relative_to(VAULT_ROOT))
        # 多个 key 形式
        key_no_ext = rel.replace(".md", "")
        key_wiki = "Wiki/wiki/" + str(f.relative_to(WIKI_DIR)).replace(".md", "")
        page_map[rel] = rel
        page_map[key_no_ext] = rel
        page_map[key_wiki] = rel
        page_map[f.stem] = rel
        page_map[str(f.relative_to(WIKI_DIR)).replace(".md", "")] = rel
        page_map["Wiki/wiki/" + str(f.relative_to(WIKI_DIR))] = rel

    # 第二步：解析每个页面
    for f in md_files:
        try:
            text = f.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue

        fm, content = extract_frontmatter_and_content(text)
        rel_path = str(f.relative_to(VAULT_ROOT))

        page_type = fm.get("type", "unknown")
        title = fm.get("title", f.stem)
        tags = fm.get("tags", [])
        if isinstance(tags, str):
            tags = [t.strip() for t in tags.split(",")]

        # 统计标签
        for tag in tags:
            tag_counts[tag] = tag_counts.get(tag, 0) + 1

        # 统计类型
        if page_type in type_counts:
            type_counts[page_type] += 1

        # 转换内容中的 wiki 链接
        content = convert_markdown_links(content, page_map)

        # Markdown -> HTML
        try:
            html_content = md_converter.convert(content)
        except Exception:
            html_content = content.replace("\n", "<br>")

        # 提取摘要
        summary = get_first_paragraph(content)

        # 处理 sources 和 related
        sources = fm.get("sources", [])
        if isinstance(sources, str):
            sources = [sources]
        related = fm.get("related", [])
        if isinstance(related, str):
            related = [related]

        # 转换 related 中的链接
        related_links = []
        for r in related:
            r_clean = r.replace(".md", "")
            if r_clean in page_map:
                related_links.append(page_map[r_clean])
            else:
                related_links.append(r)

        pages.append({
            "path": rel_path,
            "filename": f.name,
            "title": title,
            "type": page_type,
            "tags": tags,
            "created": str(fm.get("created", "")),
            "updated": str(fm.get("updated", "")),
            "summary": summary,
            "html": html_content,
            "sources": sources,
            "related": related_links,
            "word_count": len(content),
        })

    # 按 updated 排序得到最近更新
    recent = sorted(
        [p for p in pages if p["updated"]],
        key=lambda x: x["updated"],
        reverse=True
    )[:15]

    # 扫描原始文章
    article_count = scan_raw_articles()
    tutorials = scan_tutorials()

    # 构建最终数据结构
    data = {
        "generated_at": str(date.today()),
        "stats": {
            "wiki_pages": len(pages),
            "articles": article_count,
            "concepts": type_counts.get("concept", 0),
            "entities": type_counts.get("entity", 0),
            "topics": type_counts.get("topic", 0),
            "comparisons": type_counts.get("comparison", 0),
            "overviews": type_counts.get("overview", 0),
            "tutorials": len(tutorials),
            "total_tags": len(tag_counts),
        },
        "pages": pages,
        "tags": dict(sorted(tag_counts.items(), key=lambda x: x[1], reverse=True)),
        "recent_updates": recent,
        "tutorials": tutorials,
        "type_labels": {
            "concept": "概念",
            "entity": "实体",
            "topic": "专题",
            "comparison": "对比",
            "overview": "概览",
        },
    }

    # 写入 JSON
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f"✅ 数据构建完成！")
    print(f"   Wiki 页面: {data['stats']['wiki_pages']} 个")
    print(f"   概念: {data['stats']['concepts']}  实体: {data['stats']['entities']}  专题: {data['stats']['topics']}  对比: {data['stats']['comparisons']}")
    print(f"   原始文章: {data['stats']['articles']} 篇")
    print(f"   教程: {data['stats']['tutorials']} 份")
    print(f"   标签: {data['stats']['total_tags']} 个")
    print(f"   输出: {OUTPUT_FILE}")


if __name__ == "__main__":
    main()
