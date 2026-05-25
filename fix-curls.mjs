import grayMatter from 'gray-matter';
import fs from 'fs';

// Scan all content directories
const dirs = ['articles', 'news', 'cases', 'laws'];

for(const dir of dirs) {
  const dirPath = `src/content/${dir}`;
  try {
    const files = fs.readdirSync(dirPath);
    for(const file of files) {
      if(!file.endsWith('.mdx') && !file.endsWith('.md')) continue;
      const filePath = `${dirPath}/${file}`;
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check if file parses OK
      try {
        grayMatter(content);
        continue; // OK
      } catch(e) {
        // Has error - find and replace curly quotes in frontmatter
        const fmStart = content.indexOf('---\n') + 4;
        const fmEnd = content.indexOf('---\n', fmStart);
        if(fmStart === -1 || fmEnd === -1) continue;
        
        const fm = content.slice(fmStart, fmEnd);
        let fixed = fm;
        
        // Replace curly quotes with angle brackets
        // U+201C (") U+201D (") -> 《》
        // U+2018 (') U+2019 (') -> 『』
        fixed = fixed.replace(/[\u201c\u201d]/g, '《》');
        fixed = fixed.replace(/[\u2018\u2019]/g, '『』');
        
        if(fixed !== fm) {
          const newContent = content.slice(0, fmStart) + fixed + content.slice(fmEnd);
          fs.writeFileSync(filePath, newContent, 'utf8');
          console.log(`Fixed: ${file}`);
        }
      }
    }
  } catch(e) {
    console.log(`Error reading ${dir}: ${e.message}`);
  }
}