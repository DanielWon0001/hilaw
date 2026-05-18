import { getCollection } from 'astro:content';

export async function GET() {
  const allNews = await getCollection('news');
  const sorted = allNews.sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());

  const data = sorted.map(item => ({
    title: item.data.title,
    excerpt: item.data.excerpt,
    date: item.data.date,
    category: item.data.category,
    tags: item.data.tags,
    source: item.data.source || '',
    url: `/news/${item.slug}`,
  }));

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}