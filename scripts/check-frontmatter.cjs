// frontmatter 必填字段检查
const fs = require('fs');
const path = process.argv[2];
if (!path) { console.log('用法: node check-frontmatter.cjs <文件路径>'); process.exit(1); }
try {
  const content = fs.readFileSync(path, 'utf8');
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (!fmMatch) { console.log('未找到frontmatter'); process.exit(1); }
  const fm = fmMatch[1];
  const required = ['title', 'date', 'category', 'tags', 'excerpt'];
  const missing = [];
  for (const field of required) {
    if (!new RegExp(`^${field}\\s*:`, 'm').test(fm)) missing.push(field);
  }
  if (missing.length === 0) {
    console.log(`文件: ${path}`);
    console.log('frontmatter必填字段：全部齐备 ✓');
    // 列出每个字段
    for (const field of required) {
      const m = fm.match(new RegExp(`^${field}\\s*:\\s*"?([^"\\n]+)"?`, 'm'));
      console.log(`  ${field}: ${m ? m[1].slice(0, 60) + (m[1].length > 60 ? '...' : '') : '?'}`);
    }
  } else {
    console.log(`文件: ${path}`);
    console.log(`frontmatter缺失字段: ${missing.join(', ')}`);
  }
} catch (e) {
  console.log('读取失败:', e.message);
}
