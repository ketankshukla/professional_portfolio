import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Blog Post Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, the blog post you're looking for doesn't exist or may have been moved.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>
      </div>
    </div>
  );
}
