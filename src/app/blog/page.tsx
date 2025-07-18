import { BlogPost } from '@/types';
import BlogList from '@/components/ui/BlogList';

async function getBlogs(): Promise<BlogPost[]> {
  try {
    const response = await fetch('http://localhost:3000/api/blogs?published=true', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch blogs');
      return [];
    }
    
    const result = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              All Blog Posts
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore tutorials, insights, and guides about modern web development,
              Next.js, TypeScript, and more.
            </p>
          </div>
        </div>
      </div>

      <BlogList blogs={blogs} title="" />
    </div>
  );
}
