// 用 js-yaml 真正解析 frontmatter
const fs = require('fs');
const yaml = require('js-yaml');
const path = process.argv[2];
if (!path) { console.log('用法: node check-yaml.cjs <文件路径>'); process.exit(1); }
const content = fs.readFileSync(path, 'utf8');
const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
if (!fmMatch) { console.log('未找到 frontmatter'); process.exit(1); }
try {
  const data = yaml.load(fmMatch[1]);
  console.log('✅ YAML 解析成功');
  console.log('解析结果:');
  for (const [k, v] of Object.entries(data)) {
    const display = typeof v === 'string' ? v : JSON.stringify(v);
    console.log(`  ${k}: ${display.length > 100 ? display.slice(0,100) + '...' : display}`);
  }
} catch (e) {
  console.log('❌ YAML 解析失败:');
  console.log(e.message);
}
