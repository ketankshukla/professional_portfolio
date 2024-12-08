import { Metadata } from 'next';
import BlogCard from '@/components/blog/BlogCard';
import { getAllPosts } from '@/utils/blog';

export const metadata: Metadata = {
  title: 'Blog | Ketan Shukla',
  description: 'Thoughts on software development, machine learning, and technology.',
};

export default async function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Blog
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
