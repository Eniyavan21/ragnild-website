import { client, urlFor, BLOG_POSTS_QUERY, BLOG_POST_BY_SLUG_QUERY } from './sanity'
import type { SanityImageSource } from '@sanity/image-url'

// Sanity Portable Text types
interface PortableTextMark {
  _type: string;
  _key: string;
  href?: string;
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
  listItem?: 'bullet' | 'number';
  level?: number;
  children?: PortableTextChild[];
  markDefs?: PortableTextMark[];
  asset?: {
    _ref: string;
    _type: string;
  };
  alt?: string;
  caption?: string;
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

// Convert inline children to markdown text
function childrenToMarkdown(block: PortableTextBlock): string {
  if (!block.children) return '';
  const markDefs = block.markDefs || [];

  return block.children
    .map((child) => {
      if (!child.text) return '';

      let text = child.text;

      // Apply marks (bold, italic, links, etc.)
      if (child.marks && child.marks.length > 0) {
        child.marks.forEach((mark) => {
          if (mark === 'strong') { text = `**${text}**`; return; }
          if (mark === 'em') { text = `*${text}*`; return; }
          if (mark === 'code') { text = `\`${text}\``; return; }
          if (mark === 'underline') { text = `<u>${text}</u>`; return; }
          if (mark === 'strike-through') { text = `~~${text}~~`; return; }

          // Look up annotation marks (links, etc.) from markDefs
          const markDef = markDefs.find((def) => def._key === mark);
          if (markDef && markDef._type === 'link' && markDef.href) {
            text = `[${text}](${markDef.href})`;
          }
        });
      }

      return text;
    })
    .join('');
}

// Convert Sanity Portable Text to Markdown (with image, list support)
function portableTextToMarkdown(blocks: PortableTextBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) return '';

  const lines: string[] = [];
  let numberCounter = 0;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    // Handle image blocks
    if (block._type === 'image' && block.asset) {
      const imageUrl = urlFor(block.asset).width(1200).url();
      const alt = block.alt || 'Blog image';
      const caption = block.caption ? `\n*${block.caption}*` : '';
      lines.push(`![${alt}](${imageUrl})${caption}`);
      numberCounter = 0;
      continue;
    }

    if (!block.children) { numberCounter = 0; continue; }

    const content = childrenToMarkdown(block);
    const indent = '  '.repeat(Math.max(0, (block.level || 1) - 1));

    // Handle list items
    if (block.listItem === 'bullet') {
      lines.push(`${indent}- ${content}`);
      numberCounter = 0;
      continue;
    }

    if (block.listItem === 'number') {
      numberCounter++;
      lines.push(`${indent}${numberCounter}. ${content}`);
      continue;
    }

    // Reset number counter when leaving a numbered list
    numberCounter = 0;

    // Apply block-level formatting
    const style = block.style || 'normal';
    switch (style) {
      case 'h1':
        lines.push(`# ${content}`);
        break;
      case 'h2':
        lines.push(`## ${content}`);
        break;
      case 'h3':
        lines.push(`### ${content}`);
        break;
      case 'h4':
        lines.push(`#### ${content}`);
        break;
      case 'blockquote':
        lines.push(`> ${content}`);
        break;
      default:
        // Replace leading spaces with non-breaking spaces to preserve indentation
        // without triggering Markdown code blocks (4 spaces).
        lines.push(content.replace(/^ +/g, (match) => '\u00A0'.repeat(match.length)).trimEnd());
    }
  }

  // Join with proper spacing: single newline between consecutive list items, double elsewhere
  const result: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    result.push(lines[i]);
    if (i < lines.length - 1) {
      const currentIsList = lines[i].match(/^\s*[-\d]/);
      const nextIsList = lines[i + 1].match(/^\s*[-\d]/);
      result.push(currentIsList && nextIsList ? '\n' : '\n\n');
    }
  }

  return result.join('');
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
