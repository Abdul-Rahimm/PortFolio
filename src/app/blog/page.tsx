import { BlogPost } from '@/types';
import BlogList from '@/components/ui/BlogList';
import { mockBlogs } from '@/data/mockData';

export default async function BlogPage() {
  // Use mock blogs for now until Medium integration
  const blogs = mockBlogs.filter(blog => blog.isPublished);

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
