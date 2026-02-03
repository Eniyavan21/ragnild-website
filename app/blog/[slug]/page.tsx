import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import ReactMarkdown from 'react-markdown';
import { Calendar, Clock, User } from 'lucide-react';
import Footer from '@/components/Footer';
import BackButton from '@/components/ui/BackButton';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Mark as dynamic since we're fetching from external API
export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: `${post.title} | Ragnild Blog`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <header className="absolute top-6 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <BackButton />
                </div>
            </header>

            <div className="pt-32 pb-20">
                <article className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">

                    {/* Cover Image */}
                    {post.coverImage && (
                        <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 shadow-xl">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                unoptimized={process.env.NODE_ENV === 'development'}
                            />
                        </div>
                    )}

                    {/* Header */}
                    <header className="mb-12 border-b border-gray-100 pb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium ring-1 ring-inset ring-blue-600/10">
                                {post.category}
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                    <User className="h-4 w-4" />
                                </div>
                                <span className="font-medium text-gray-900">{post.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(post.date).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>
                    </header>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[#3054fd] prose-strong:text-gray-900 prose-code:text-blue-600 prose-pre:bg-gray-50 prose-pre:text-gray-900 prose-pre:border prose-pre:border-gray-200">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>

                </article>
            </div>

            <Footer />
        </main>
    );
}
