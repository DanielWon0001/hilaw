import grayMatter from 'gray-matter';
import fs from 'fs';

// Scan all content directories
const dirs = ['articles', 'news', 'cases', 'laws'];
const errors = [];

for(const dir of dirs) {
  const dirPath = `src/content/${dir}`;
  try {
    const files = fs.readdirSync(dirPath);
    for(const file of files) {
      if(!file.endsWith('.mdx') && !file.endsWith('.md')) continue;
      const filePath = `${dirPath}/${file}`;
      const content = fs.readFileSync(filePath, 'utf8');
      
      try {
        grayMatter(content);
      } catch(e) {
        const fmStart = content.indexOf('---\n') + 4;
        const fmEnd = content.indexOf('---\n', fmStart);
        const fm = fmStart !== -1 && fmEnd !== -1 ? content.slice(fmStart, fmEnd) : '';
        errors.push({ file, fm, error: e.message });
      }
    }
  } catch(e) {
    console.log(`Error reading ${dir}: ${e.message}`);
  }
}

console.log(`Found ${errors.length} files with errors:`);
for(const { file, fm, error } of errors) {
  console.log(`\n=== ${file} ===`);
  console.log(fm);
  console.log('Error:', error);
}