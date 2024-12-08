import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import { BlogPost } from '@/types/blog';

const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
});

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug: string): BlogPost {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const wordCount = content.split(/\s+/g).length;
  const readingTime = `${Math.ceil(wordCount / 200)} min read`;

  return {
    slug: realSlug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    content: md.render(content),
    readingTime,
    tags: data.tags || [],
    coverImage: data.coverImage || '/images/blog/default-cover.jpg',
  };
}

export function getAllPosts(): BlogPost[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
