import { client, urlFor, BLOG_POSTS_QUERY, BLOG_POST_BY_SLUG_QUERY } from './sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Sanity Portable Text types
interface PortableTextMark {
  _type: string;
  _key: string;
}

interface PortableTextChild {
  _type: string;
  _key: string;
  text: string;
  marks?: string[];
}

interface PortableTextBlock {
  _type: string;
  _key: string;
  style?: string;
  children: PortableTextChild[];
  markDefs?: PortableTextMark[];
}

interface SanityBlogPost {
  _id: string;
  title: string;
  slug: string;
  description: PortableTextBlock[];
  coverimage?: SanityImageSource;
  publishedate: string;
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

// Convert Sanity Portable Text to Markdown
function portableTextToMarkdown(blocks: PortableTextBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) return '';

  return blocks
    .map((block) => {
      if (!block.children) return '';

      // Handle different block styles
      const style = block.style || 'normal';
      let content = block.children
        .map((child) => {
          if (!child.text) return '';

          let text = child.text;

          // Apply marks (bold, italic, etc.)
          if (child.marks && child.marks.length > 0) {
            child.marks.forEach((mark) => {
              if (mark === 'strong') text = `**${text}**`;
              if (mark === 'em') text = `*${text}*`;
              if (mark === 'code') text = `\`${text}\``;
            });
          }

          return text;
        })
        .join('');

      // Apply block-level formatting
      switch (style) {
        case 'h1':
          return `# ${content}`;
        case 'h2':
          return `## ${content}`;
        case 'h3':
          return `### ${content}`;
        case 'h4':
          return `#### ${content}`;
        case 'blockquote':
          return `> ${content}`;
        default:
          return content;
      }
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

// Fetch all blog posts from Sanity
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts: SanityBlogPost[] = await client.fetch(BLOG_POSTS_QUERY, {}, {
      cache: 'no-store', // Disable caching for fresh data
    });

    if (!posts || !Array.isArray(posts)) {
      return [];
    }

    const blogPosts: BlogPost[] = posts.map((post) => {
      const content = portableTextToMarkdown(post.description || []);
      const excerpt = generateExcerpt(content);
      const readTime = calculateReadTime(content);

      // Handle cover image from Sanity
      let coverImage: string | undefined;
      if (post.coverimage) {
        coverImage = urlFor(post.coverimage)
          .width(1200)
          .height(630)
          .url();
      }

      return {
        slug: post.slug,
        title: post.title,
        excerpt,
        date: post.publishedate,
        content,
        author: 'Ragnild Team',
        readTime,
        category: 'General',
        coverImage,
      };
    });

    return blogPosts;
  } catch (error) {
    console.error('Error fetching blog posts from Sanity:', error);
    return [];
  }
}

// Fetch a single blog post by slug from Sanity
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const post: SanityBlogPost | null = await client.fetch(
      BLOG_POST_BY_SLUG_QUERY,
      { slug },
      { cache: 'no-store' }
    );

    if (!post) {
      return null;
    }

    const content = portableTextToMarkdown(post.description || []);
    const excerpt = generateExcerpt(content);
    const readTime = calculateReadTime(content);

    let coverImage: string | undefined;
    if (post.coverimage) {
      coverImage = urlFor(post.coverimage)
        .width(1200)
        .height(630)
        .url();
    }

    return {
      slug: post.slug,
      title: post.title,
      excerpt,
      date: post.publishedate,
      content,
      author: 'Ragnild Team',
      readTime,
      category: 'General',
      coverImage,
    };
  } catch (error) {
    console.error('Error fetching blog post from Sanity:', error);
    return null;
  }
}
