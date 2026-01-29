import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blogs');

export type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    content: string;
    author: string;
    readTime: string;
    category: string;
};

export function getBlogPosts(): BlogPost[] {
    // Create directory if it doesn't exist to prevent crashes
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        // Remove ".md" from file name to get id
        const slug = fileName.replace(/\.md$/, '');

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Use gray-matter to parse the post metadata section
        const { data, content } = matter(fileContents);

        return {
            slug,
            content, // We might not need full content for the list, but it's okay for now
            title: data.title || 'Untitled',
            excerpt: data.excerpt || '',
            date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
            author: data.author || 'Ragnild Team',
            readTime: data.readTime || '5 min read',
            category: data.category || 'General',
        };
    });

    // Sort posts by date
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    });
}

export function getBlogPost(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);

        if (!fs.existsSync(fullPath)) {
            return null;
        }

        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            content,
            title: data.title || 'Untitled',
            excerpt: data.excerpt || '',
            date: data.date ? new Date(data.date).toISOString() : new Date().toISOString(),
            author: data.author || 'Ragnild Team',
            readTime: data.readTime || '5 min read',
            category: data.category || 'General',
        };
    } catch {
        return null;
    }
}
