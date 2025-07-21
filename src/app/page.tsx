import YouTubeList from "@/components/ui/YouTubeList";
import { getVideos } from "@/lib/youtube";

export default async function Home() {
  console.log("🏠 HomePage: Fetching videos...");
  const videos = await getVideos();
  console.log(`🏠 HomePage: Received ${videos.length} videos`);

  // Use mock blogs for now until Medium integration
  // const blogs = mockBlogs.filter((blog) => blog.isPublished);

  // Show only the latest 6 blog posts on homepage
  // const featuredBlogs = blogs.slice(0, 6);

  const featuredVideos = videos.slice(0, 7);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Get to know{" "}
            <span className="text-blue-600 dark:text-blue-400">Me</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Actively learning Data structures, Algorithms and Problem-solving.
            Deeply interested in System Design and Backend Development.{" "}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* <a
              href="#blogs"
              className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Read Latest Posts
            </a> */}
            <a
              href="#videos"
              className="bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Watch Tutorials
            </a>
          </div>
        </div>
      </section>

      {/* Featured YouTube Videos */}
      <section id="videos">
        <YouTubeList videos={featuredVideos} title="Latest YouTube Videos" />
      </section>

      {/* Featured Blog Posts */}
      {/* <section id="blogs">
        <BlogList blogs={featuredBlogs} title="Latest Blog Posts" />
      </section> */}
    </div>
  );
}
