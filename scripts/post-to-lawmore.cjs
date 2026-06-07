// 推送文章到劳模网 WordPress
const fs = require('fs');
const yaml = require('js-yaml');
const https = require('https');
const path = process.argv[2];

if (!path) { console.log('用法: node post-to-lawmore.cjs <文章mdx路径>'); process.exit(1); }

const content = fs.readFileSync(path, 'utf8');
const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
if (!fmMatch) { console.log('未找到 frontmatter'); process.exit(1); }
const fm = yaml.load(fmMatch[1]);

// 提取正文（去掉 frontmatter）
let body = content.replace(/^---\n[\s\S]*?\n---\n/, '');

// 转换 MDX/Markdown 为 HTML
body = body
  .replace(/^### (.+)$/gm, '<h3>$1</h3>')
  .replace(/^## (.+)$/gm, '<h2>$1</h2>')
  .replace(/^# (.+)$/gm, '<h1>$1</h1>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

// 段落处理
const lines = body.split('\n');
const out = [];
let para = [];
const flushPara = () => {
  if (para.length) {
    out.push('<p>' + para.join(' ') + '</p>');
    para = [];
  }
};
for (const line of lines) {
  const t = line.trim();
  if (!t) { flushPara(); continue; }
  if (t.startsWith('<h') || t.startsWith('<blockquote')) {
    flushPara();
    out.push(t);
  } else {
    para.push(t);
  }
}
flushPara();
const html = out.join('\n');

// 准备 WordPress REST API 请求
const username = 'user';
const password = 'muOM yCRK tkVj MlaY Y0Mc FR84';
const auth = 'Basic ' + Buffer.from(username + ':' + password).toString('base64');

// 分类：根据 tags/类别，嗨唠网"民商"对应劳模网"民商"=15
const categories = [15];  // 民商
const tags = [];  // 标签由 WordPress 自动处理或留空

const postData = JSON.stringify({
  title: fm.title,
  content: html,
  excerpt: fm.excerpt,
  status: 'publish',
  categories: categories
});

const options = {
  hostname: 'www.lawmore.cn',
  path: '/wp-json/wp/v2/posts',
  method: 'POST',
  headers: {
    'Authorization': auth,
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, res => {
  let data = '';
  res.on('data', c => data += c);
  res.on('end', () => {
    console.log('状态码:', res.statusCode);
    console.log('响应:', data);
    if (res.statusCode === 201) {
      try {
        const result = JSON.parse(data);
        console.log('\n✅ 上传成功！');
        console.log('文章ID:', result.id);
        console.log('链接:', result.link);
      } catch (e) { /* ignore */ }
    } else {
      console.log('\n❌ 上传失败');
    }
  });
});
req.on('error', e => console.log('请求错误:', e.message));
req.write(postData);
req.end();
