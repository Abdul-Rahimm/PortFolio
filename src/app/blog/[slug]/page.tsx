import { notFound } from 'next/navigation';
import { BlogPost } from '@/types';
import { formatDate } from '@/lib/utils';
import styles from '@/styles/blog.module.css';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

async function getBlog(slug: string): Promise<BlogPost | null> {
  try {
    const response = await fetch(`http://localhost:3000/api/blogs/${slug}`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      return null;
    }
    
    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Blog
        </Link>

        {/* Blog Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {blog.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400 mb-6">
            <div className="flex items-center gap-2">
              <User size={18} />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={18} />
              <span>{formatDate(blog.publishedDate)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} />
              <span>{blog.readTime} min read</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {blog.excerpt}
          </p>
        </header>

        {/* Blog Content */}
        <article className={styles.blogContent}>
          <div dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br>') }} />
        </article>

        {/* Share Section */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Published on {formatDate(blog.publishedDate)} by {blog.author}
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/blog"
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium transition-colors"
              >
                ← More Posts
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  // In a real application, you would fetch all blog slugs from your database
  // For now, we'll return an empty array to enable dynamic rendering
  return [];
}
