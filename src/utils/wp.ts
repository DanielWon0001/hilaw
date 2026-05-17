export interface WPPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  link: string;
  categories: number[];
  slug: string;
}

export async function getWPPosts(limit = 2): Promise<WPPost[]> {
  try {
    const response = await fetch(
      'https://www.lawmore.cn/wp-json/wp/v2/posts?per_page=10&page=1',
      {
        headers: {
          'Authorization': 'Basic ' + btoa('user:muOM yCRK tkVj MlaY Y0Mc FR84'),
        },
      }
    );

    if (!response.ok) {
      throw new Error(`WP API error: ${response.status}`);
    }

    const posts: WPPost[] = await response.json();
    
    // Decode HTML entities in title and clean excerpt
    const decodedPosts = posts.map(post => ({
      ...post,
      title: {
        rendered: decodeHTMLEntities(post.title.rendered),
      },
      excerpt: {
        rendered: decodeHTMLEntities(removeHTML(post.excerpt.rendered)),
      },
    }));

    return decodedPosts.slice(0, limit);
  } catch (error) {
    console.warn('Failed to fetch WP posts:', error);
    return [];
  }
}

function decodeHTMLEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&nbsp;': ' ',
    '&apos;': "'",
  };
  return text.replace(/&[^;]+;/g, match => entities[match] || match);
}

function removeHTML(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}

export function getCategoryName(catId: number): string {
  const map: Record<number, string> = {
    12: '刑事', 15: '民商', 24: '知产', 32: '涉外',
    30: '互联网犯罪', 29: '刑事辩护', 31: '医疗纠纷', 33: '热点评论',
  };
  return map[catId] || '文章';
}