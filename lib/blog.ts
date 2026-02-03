// Strapi API types
interface StrapiContentChild {
  type: string;
  text?: string;
  bold?: boolean;
  url?: string;
  children?: StrapiContentChild[];
}

interface StrapiContentNode {
  type: string;
  children?: StrapiContentChild[];
  text?: string;
}

interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

interface StrapiMedia {
  id: number;
  url: string;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
}

interface StrapiBlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: StrapiContentNode[];
  coverimage?: string | StrapiMedia;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  publishedate: string;
}

interface StrapiResponse {
  data: StrapiBlogPost[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  content: string;
  author: string;
  readTime: string;
  category: string;
  coverImage?: string;
};

// Strapi API base URL from environment or default to localhost
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

// Convert Strapi rich text content to plain text/HTML
function convertStrapiContent(content: StrapiContentNode[]): string {
  if (!content || !Array.isArray(content)) return '';

  return content
    .map((node) => {
      if (node.type === 'paragraph' && node.children) {
        return node.children
          .map((child) => {
            if (child.type === 'text') {
              let text = child.text || '';
              if (child.bold) {
                text = `**${text}**`;
              }
              return text;
            }
            if (child.type === 'link' && child.url) {
              const linkText = child.children?.map((c) => c.text).join('') || child.url;
              return `[${linkText}](${child.url})`;
            }
            return '';
          })
          .join('');
      }
      return '';
    })
    .join('\n\n');
}

// Generate excerpt from content
function generateExcerpt(content: string, maxLength: number = 150): string {
  const plainText = content.replace(/[*_#\[\]()]/g, '').trim();
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + '...';
}

// Calculate read time based on content length
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

// Fetch all blog posts from Strapi
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${STRAPI_API_URL}/api/blogs?populate=*`, {
      cache: 'no-store', // Disable caching for fresh data
    });

    if (!response.ok) {
      console.error('Failed to fetch blog posts:', response.statusText);
      return [];
    }

    const data: StrapiResponse = await response.json();

    if (!data.data || !Array.isArray(data.data)) {
      return [];
    }

    const posts: BlogPost[] = data.data.map((post) => {
      const content = convertStrapiContent(post.content);
      const excerpt = generateExcerpt(content);
      const readTime = calculateReadTime(content);

      // Handle cover image - can be string URL or Strapi media object
      let coverImage: string | undefined;
      if (post.coverimage) {
        if (typeof post.coverimage === 'string') {
          // If it's a string, use it directly (prepend base URL if relative)
          coverImage = post.coverimage.startsWith('http')
            ? post.coverimage
            : `${STRAPI_API_URL}${post.coverimage}`;
        } else if (typeof post.coverimage === 'object' && 'url' in post.coverimage) {
          // If it's a Strapi media object, extract the URL
          const url = post.coverimage.url;
          coverImage = url.startsWith('http') ? url : `${STRAPI_API_URL}${url}`;
        }
      }

      // Debug logging
      if (coverImage) {
        console.log(`📸 Cover image for "${post.title}":`, coverImage);
        console.log(`🌐 STRAPI_API_URL:`, STRAPI_API_URL);
      }

      return {
        slug: post.slug,
        title: post.title,
        excerpt,
        date: post.publishedate || post.publishedAt,
        content,
        author: 'Ragnild Team', // Default author, can be extended
        readTime,
        category: 'General', // Default category, can be extended
        coverImage,
      };
    });

    // Sort posts by date (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

// Fetch a single blog post by slug
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const posts = await getBlogPosts();
    const post = posts.find((p) => p.slug === slug);
    return post || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}
