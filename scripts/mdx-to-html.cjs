// 将 MDX/Markdown 内容转换为 WordPress HTML
// WordPress REST API 不会自动转换 MDX/Markdown，需要手动转换
const fs = require('fs');
const path = process.argv[2];
if (!path) { console.log('用法: node mdx-to-html.cjs <文件路径>'); process.exit(1); }
let content = fs.readFileSync(path, 'utf8');

// 1. 移除 frontmatter
content = content.replace(/^---\n[\s\S]*?\n---\n/, '');

// 2. 转换 Markdown 到 HTML
// 标题
content = content.replace(/^### (.+)$/gm, '<h3>$1</h3>');
content = content.replace(/^## (.+)$/gm, '<h2>$1</h2>');
content = content.replace(/^# (.+)$/gm, '<h1>$1</h1>');

// 粗体
content = content.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

// 斜体（保留兼容）
content = content.replace(/(?<!\*)\*([^*\n]+)\*(?!\*)/g, '<em>$1</em>');

// 引用块
content = content.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

// 链接
content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

// 段落（将双换行分隔的块包装为 p）
const lines = content.split('\n');
const out = [];
let para = [];
const flushPara = () => {
  if (para.length) {
    out.push('<p>' + para.join(' ') + '</p>');
    para = [];
  }
};
for (const line of lines) {
  const t = line.trim();
  if (!t) { flushPara(); continue; }
  if (t.startsWith('<h') || t.startsWith('<blockquote') || t.startsWith('<ul') || t.startsWith('<ol') || t.startsWith('<li')) {
    flushPara();
    out.push(t);
  } else {
    para.push(t);
  }
}
flushPara();
content = out.join('\n');

console.log(content);
