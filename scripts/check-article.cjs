// 文章质量综合检查
const fs = require('fs');
const path = process.argv[2];
if (!path) { console.log('用法: node check-article.cjs <文章路径>'); process.exit(1); }
const content = fs.readFileSync(path, 'utf8');

// 1. frontmatter 提取
const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
if (!fmMatch) { console.log('❌ 未找到frontmatter'); process.exit(1); }
const fm = fmMatch[1];

// 2. 必填字段
const required = ['title', 'date', 'category', 'tags', 'excerpt'];
const missing = required.filter(f => !new RegExp(`^${f}\\s*:`, 'm').test(fm));
console.log('【frontmatter必填字段】', missing.length === 0 ? '✅ 全部齐备' : '❌ 缺失：' + missing.join(', '));

// 3. 禁用词汇检查
const body = content.replace(/^---[\s\S]*?---\n/, '');
const forbidden = ['落点', '金句', '亮点', '升华', '点睛', '布局', '策划', '打磨', '过渡', '的核心在于', '关键在于', '值得注意', '值得注意的是', '请注意', '总的来说'];
const bodyForbidden = forbidden.filter(w => body.includes(w));
console.log('【禁用策划词汇】', bodyForbidden.length === 0 ? '✅ 全部未出现' : '❌ 出现：' + bodyForbidden.join(', '));

// 4. 机械结构检查
const sequentialPattern = /[\n](?:[一二三四五六七八九十]、|（[一二三四五六七八九十]）)/g;
const matches = body.match(sequentialPattern) || [];
console.log('【机械结构(一/二/三)】', matches.length === 0 ? '✅ 未出现' : '❌ 出现：' + matches.slice(0,3).join('; '));

// 5. 字数
const textLen = body.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, '').length;
console.log(`【字数】约 ${textLen} 字`);

// 6. frontmatter 字段值
console.log('\n【frontmatter字段值】');
for (const f of required) {
  const m = fm.match(new RegExp(`^${f}\\s*:\\s*(.+)`, 'm'));
  if (m) {
    const val = m[1].replace(/^["']|["']$/g, '');
    console.log(`  ${f}: ${val.length > 80 ? val.slice(0,80) + '...' : val}`);
  }
}

// 7. 检查 frontmatter 是否有明显引号嵌套问题（简单启发式）
const titleLine = fm.match(/^title\s*:\s*(.*)$/m);
if (titleLine) {
  const t = titleLine[1];
  // 计算英文双引号
  const enQuotes = (t.match(/"/g) || []).length;
  console.log(`\n【title引号】title行含 ${enQuotes} 个英文双引号（应为2）`);
}

// 8. AI 惯用语
const aiPhrases = ['首先', '其次', '再次', '最后', '综上所述', '总结一下', '让我们一起'];
const bodyAi = aiPhrases.filter(p => body.includes(p));
console.log('【AI惯用语】', bodyAi.length === 0 ? '✅ 未出现' : '⚠️ 出现：' + bodyAi.join(', '));
