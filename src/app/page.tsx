import { BlogPost, YouTubeVideo } from '@/types';
import BlogList from '@/components/ui/BlogList';
import YouTubeList from '@/components/ui/YouTubeList';
import { mockBlogs } from '@/data/mockData';

async function getVideos(): Promise<YouTubeVideo[]> {
  try {
    const response = await fetch('http://localhost:3000/api/youtube', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch YouTube videos');
      return [];
    }
    
    const result = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}

export default async function Home() {
  const videos = await getVideos();
  
  // Use mock blogs for now until Medium integration
  const blogs = mockBlogs.filter(blog => blog.isPublished);

  // Show only the latest 6 blog posts on homepage
  const featuredBlogs = blogs.slice(0, 6);
  
  // Show only the latest 4 videos on homepage
  const featuredVideos = videos.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Get to know <span className="text-blue-600 dark:text-blue-400">Me</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Passionate about Data structures, Algorithms and Problem-solving. I have a keen interest in System Design and Backend Development. </p>
         
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#blogs"
              className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors"

            >
              Read Latest Posts
            </a>
            <a
              href="#videos"
              className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Watch Videos
            </a>
          </div>
        </div>
      </section>


      {/* Featured YouTube Videos */}
      <section id="videos">
        <YouTubeList videos={featuredVideos} title="Latest YouTube Videos" />
      </section>

      {/* Featured Blog Posts */}
      <section id="blogs">
        <BlogList blogs={featuredBlogs} title="Latest Blog Posts" />
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Follow along for more tutorials, tips, and insights about modern web development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/blog"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              View All Posts
            </a>
            <a
              href="/videos"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              All Videos
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
