import grayMatter from 'gray-matter';
import fs from 'fs';

// Test 1: Check if it's the em-dash causing the problem
const test1 = `---
title: "test —— test"
date: "2026-05-22"
---`;
try {
  const r = grayMatter(test1);
  console.log('Test1 (em-dash only) OK');
} catch(e) {
  console.log('Test1 ERROR:', e.message);
}

// Test 2: Check if it's the embedded ASCII quotes
const test2 = `---
title: "test \\"inner\\" test"
date: "2026-05-22"
---`;
try {
  const r = grayMatter(test2);
  console.log('Test2 (escaped quotes) OK');
} catch(e) {
  console.log('Test2 ERROR:', e.message);
}

// Test 3: Single-quote the inner value
const test3 = `---
title: "test 'inner' test"
date: "2026-05-22"
---`;
try {
  const r = grayMatter(test3);
  console.log('Test3 (single quotes inner) OK');
} catch(e) {
  console.log('Test3 ERROR:', e.message);
}

// Test 4: What if we just fix the sister file's title with angle brackets?
const test4 = `---
title: "追了27年，等来一个死缓——<姐姐为亡弟追凶案>背后的法律选择题"
date: "2026-05-22"
---`;
try {
  const r = grayMatter(test4);
  console.log('Test4 (angle brackets) OK');
} catch(e) {
  console.log('Test4 ERROR:', e.message);
}

// Test 5: Pipe syntax (multi-line)
const test5 = `---
title: >-
  追了27年，等来一个死缓——"姐姐为亡弟追凶案"背后的法律选择题
date: "2026-05-22"
---`;
try {
  const r = grayMatter(test5);
  console.log('Test5 (pipe syntax) OK:', JSON.stringify(r.data.title));
} catch(e) {
  console.log('Test5 ERROR:', e.message);
}