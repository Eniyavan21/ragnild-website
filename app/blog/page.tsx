import { getBlogPosts } from '@/lib/blog';
import BlogCard from '@/components/BlogCard';
import Footer from '@/components/Footer';
import BackButton from '@/components/ui/BackButton';
import Pagination from '@/components/Pagination';

export const metadata = {
    title: 'Blog | Ragnild',
    description: 'Insights and functional strategies for modern DevOps and Software Engineering.',
};

// Mark as dynamic since we're fetching from external API
export const dynamic = 'force-dynamic';

const POSTS_PER_PAGE = 9;

interface BlogPageProps {
    searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const params = await searchParams;
    const currentPage = Number(params.page) || 1;
    const allPosts = await getBlogPosts();

    // Calculate pagination
    const totalPosts = allPosts.length;
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const posts = allPosts.slice(startIndex, endIndex);

    return (
        <main className="min-h-screen bg-white">
            <header className="absolute top-6 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <BackButton />
                </div>
            </header>

            <div className="pt-32 pb-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Header */}
                    <div className="mb-16 text-center">
                        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                            Latest <span className="text-[#3054fd]">Insights</span>
                        </h1>
                        <p className="mx-auto max-w-2xl text-lg text-gray-500">
                            Discover the latest trends, strategies, and technical deep dives from our engineering team.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
                        {posts.map((post) => (
                            <BlogCard key={post.slug} post={post} />
                        ))}
                    </div>

                    {allPosts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-500">No blog posts found yet. Check back soon!</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            baseUrl="/blog"
                        />
                    )}
                </div>
            </div>

            <Footer />
        </main>
    );
}
