// 编码检查脚本：检查文件头字节是否符合UTF-8 LF规范
const fs = require('fs');
const path = process.argv[2];
if (!path) { console.log('用法: node check-encoding.js <文件路径>'); process.exit(1); }
try {
  const buf = fs.readFileSync(path);
  const head = buf.slice(0, 5);
  const hex = head.toString('hex');
  let result = 'UNKNOWN';
  if (hex.startsWith('2d2d2d')) result = 'OK: UTF-8 LF (--)';
  else if (hex.startsWith('efbbbf2d')) result = 'OK: UTF-8 BOM (需去BOM)';
  else if (hex.startsWith('ffe42d') || hex.startsWith('fffe2d')) result = 'ERROR: UTF-16 (需转UTF-8)';
  else if (hex.startsWith('2d')) result = 'OK: UTF-8 LF (无BOM)';
  console.log(`文件: ${path}`);
  console.log(`头5字节hex: ${hex}`);
  console.log(`判定: ${result}`);
} catch (e) {
  console.log('读取失败:', e.message);
}
