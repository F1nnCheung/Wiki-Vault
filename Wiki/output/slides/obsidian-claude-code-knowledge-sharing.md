---
marp: true
theme: uncover
class:
  - lead
paginate: true
backgroundColor: "#0f0f1a"
color: "#e0e0e0"
headingColor: "#f0c060"
footer: "Obsidian + Claude Code 知识库分享"
style: |
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;700;900&display=swap');

  :root {
    --accent: #f0c060;
    --accent2: #e8755a;
    --accent3: #5ab4e8;
    --dark: #0f0f1a;
    --card: #1a1a2e;
    --card2: #16213e;
  }

  section {
    font-family: "Noto Sans SC", "PingFang SC", "Microsoft YaHei", sans-serif;
    font-size: 28px;
    padding: 60px 80px;
    background: var(--dark);
    background-image:
      radial-gradient(ellipse at 20% 50%, rgba(240, 192, 96, 0.04) 0%, transparent 60%),
      radial-gradient(ellipse at 80% 20%, rgba(90, 180, 232, 0.03) 0%, transparent 50%);
  }

  section.lead {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  h1 {
    font-size: 2.2em;
    font-weight: 900;
    color: var(--accent);
    margin-bottom: 0.3em;
    letter-spacing: 0.02em;
  }
  h2 {
    font-size: 1.6em;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 0.4em;
    position: relative;
    padding-bottom: 0.3em;
  }
  h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(to right, var(--accent), transparent);
    border-radius: 2px;
  }
  section.lead h2::after { display: none; }
  h3 {
    font-size: 1.15em;
    font-weight: 700;
    color: var(--accent2);
    margin: 0.5em 0 0.3em;
  }

  p { margin: 0.3em 0; line-height: 1.6; }
  ul, ol { margin: 0.3em 0; padding-left: 1.2em; }
  li { margin: 0.15em 0; line-height: 1.5; }

  strong { color: var(--accent); font-weight: 700; }
  em { color: #ccc; }

  code {
    background: rgba(240, 192, 96, 0.12);
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.85em;
    color: var(--accent);
  }
  pre {
    background: var(--card);
    padding: 16px 20px;
    border-radius: 10px;
    font-size: 0.55em;
    line-height: 1.4;
    border: 1px solid rgba(255,255,255,0.06);
  }

  table {
    font-size: 0.7em;
    margin: 0.5em auto;
    border-collapse: separate;
    border-spacing: 0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  }
  th {
    background: linear-gradient(135deg, #2a2a4a, #1a1a3a);
    color: var(--accent);
    padding: 10px 20px;
    font-weight: 700;
    text-align: left;
  }
  td {
    padding: 8px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    background: var(--card);
  }
  tr:last-child td { border-bottom: none; }

  blockquote {
    border-left: 4px solid var(--accent);
    padding: 10px 20px;
    margin: 0.8em 0;
    background: rgba(240, 192, 96, 0.06);
    border-radius: 0 8px 8px 0;
    font-style: italic;
    font-size: 0.85em;
    color: #c0c0c0;
  }

  .columns { display: flex; gap: 30px; }
  .columns > div { flex: 1; }

  .card {
    background: var(--card);
    border-radius: 12px;
    padding: 24px;
    border: 1px solid rgba(255,255,255,0.06);
    box-shadow: 0 8px 30px rgba(0,0,0,0.2);
  }

  .tag {
    display: inline-block;
    background: rgba(240, 192, 96, 0.15);
    color: var(--accent);
    padding: 3px 12px;
    border-radius: 20px;
    font-size: 0.7em;
    margin: 2px 4px;
  }

  .big-number {
    font-size: 2.5em;
    font-weight: 900;
    color: var(--accent);
    line-height: 1;
  }

  .gradient-text {
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  sup { font-size: 0.5em; color: var(--accent2); }

  section.section-divider {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: linear-gradient(135deg, #0f0f1a 0%, #16213e 50%, #0f0f1a 100%);
  }
  section.section-divider h1 {
    font-size: 2.8em;
    margin-bottom: 0.2em;
  }
  section.section-divider h2 {
    font-size: 1.4em;
    color: #aaa;
  }
  section.section-divider h2::after { display: none; }
