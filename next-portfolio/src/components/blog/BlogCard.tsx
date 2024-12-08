'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/types/blog';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-2"
    >
      <div className="relative h-48 w-full">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}</time>
          <span className="mx-2">·</span>
          <span>{post.readingTime}</span>
        </div>

        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
