import fs from 'fs';
const s = fs.readFileSync('src/content/articles/sister-seeks-justice-27-years-commentary.mdx', 'utf8');
const s_fmStart = s.indexOf('---\n') + 4;
const s_fmEnd = s.indexOf('---\n', s_fmStart);
const s_fm = s.slice(s_fmStart, s_fmEnd);
const lines = s_fm.split('\n');
const titleLine = lines[0];
console.log('Title line raw:', titleLine);
console.log('Title line JSON:', JSON.stringify(titleLine));
for(let i=0; i<titleLine.length; i++) {
  if(titleLine.charCodeAt(i) === 34) {
    console.log('ASCII quote at', i, 'context:', JSON.stringify(titleLine.slice(i-3, i+8)));
  }
}