import fs from 'fs';
const s = fs.readFileSync('src/content/articles/sister-seeks-justice-27-years-commentary.mdx', 'utf8');
const s_fmStart = s.indexOf('---\n') + 4;
const s_fmEnd = s.indexOf('---\n', s_fmStart);
const s_fm = s.slice(s_fmStart, s_fmEnd);
const lines = s_fm.split('\n');
const titleLine = lines[0];
console.log('Title line codepoints:');
for(let i=0; i<titleLine.length; i++) {
  const code = titleLine.charCodeAt(i);
  const hex = code.toString(16);
  console.log(i, code, '0x' + hex, JSON.stringify(titleLine[i]));
}