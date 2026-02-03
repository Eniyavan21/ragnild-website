import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <Link href={`/blog/${post.slug}`} className="group relative block h-full">
            <div className="relative h-full flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:border-blue-100 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1">

                {/* Cover Image */}
                {post.coverImage && (
                    <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            unoptimized={process.env.NODE_ENV === 'development'}
                        />
                    </div>
                )}

                <div className="p-6 flex flex-col flex-grow">
                    {/* Category Badge */}
                    <div className="mb-4">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 ring-1 ring-inset ring-blue-600/10">
                            {post.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#3054fd]">
                        {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-500">
                        {post.excerpt}
                    </p>

                    {/* Meta Data */}
                    <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-400">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{new Date(post.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{post.readTime}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-1 text-[#3054fd] font-medium opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
                            Read Article
                            <ArrowRight className="h-3.5 w-3.5" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
