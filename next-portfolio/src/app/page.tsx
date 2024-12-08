import Image from 'next/image';
import { getAllPosts } from '@/utils/blog';
import { projects } from '@/data/projects';
import BlogCard from '@/components/blog/BlogCard';
import ProjectCard from '@/components/projects/ProjectCard';
import HeroSection from '@/components/sections/HeroSection';

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Latest Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section id="opensource" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Open Source Contributions</h2>
          <div className="prose max-w-none">
            <p className="text-lg text-gray-600 text-center mb-8">
              I'm passionate about open source and regularly contribute to various projects.
              Here are some of my notable contributions:
            </p>
            {/* Add your open source contributions here */}
          </div>
        </div>
      </section>
    </main>
  );
}
