const yaml = require('js-yaml');
const fs = require('fs');
const c = fs.readFileSync('src/content/news/600-year-ancient-tree-destruction-2026.mdx', 'utf8');
try {
  const r = yaml.load(c.split(/^---$/m)[1]);
  console.log('parsed ok, title:', r.title);
  console.log('excerpt length:', r.excerpt.length);
} catch(e) {
  console.log('error:', e.message);
  console.log('at line:', e.mark && e.mark.line, 'column:', e.mark && e.mark.column);
}