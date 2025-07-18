import YouTubeList from "@/components/ui/YouTubeList";
import { getVideos } from "@/lib/youtube";

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              YouTube Tutorials
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Watch my latest tutorials and coding sessions covering data
              structures, algorithms, and problem-solving.
            </p>
          </div>
        </div>
      </div>

      <YouTubeList videos={videos} title="" />
    </div>
  );
}
