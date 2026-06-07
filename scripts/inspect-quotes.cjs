const fs = require('fs');
const content = fs.readFileSync('C:/Users/Administrator/.openclaw/workspace/hilaw/src/content/articles/livestream-fake-beef-commentary-2026.mdx', 'utf8');
const titleLine = content.split('\n').find(l => l.startsWith('title:'));
console.log('title行:');
console.log(titleLine);
console.log('---');
console.log('title行每个引号字符:');
for (let i = 0; i < titleLine.length; i++) {
  const c = titleLine[i];
  if (c === '"' || c === '\u201C' || c === '\u201D') {
    console.log('  位置 ' + i + ': ' + c + ' (U+' + c.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0') + ')');
  }
}
