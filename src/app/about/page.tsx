export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About DevBlog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A modern platform for sharing knowledge about web development, 
            built with Next.js 14 and TypeScript.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to DevBlog
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              This project demonstrates modern web development practices using Next.js 14, 
              TypeScript, and TailwindCSS. It serves as both a learning platform and a 
              showcase of best practices in building full-stack applications.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Project Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  🚀 Modern Tech Stack
                </h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• Next.js 14 with App Router</li>
                  <li>• TypeScript for type safety</li>
                  <li>• TailwindCSS for styling</li>
                  <li>• CSS Modules for component styles</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  ✨ Key Features
                </h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• Blog post management</li>
                  <li>• YouTube video integration</li>
                  <li>• Admin interface</li>
                  <li>• Responsive design</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  🛠️ Development Tools
                </h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• ESLint for code quality</li>
                  <li>• Lucide React for icons</li>
                  <li>• TypeScript strict mode</li>
                  <li>• API routes for backend</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  🎯 Best Practices
                </h3>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                  <li>• Component-based architecture</li>
                  <li>• Separation of concerns</li>
                  <li>• Type-safe API design</li>
                  <li>• SEO optimization</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Learning Objectives
            </h2>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This project is designed to teach and demonstrate:
              </p>
              <ul className="text-gray-700 dark:text-gray-300 space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span><strong>Next.js App Router:</strong> Understanding the new routing system and server components</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span><strong>TypeScript Integration:</strong> Proper typing and interface design for scalable applications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span><strong>CSS Architecture:</strong> Using CSS modules instead of inline styles for maintainable styling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span><strong>API Design:</strong> Creating RESTful endpoints with proper error handling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span><strong>Component Architecture:</strong> Building reusable and maintainable React components</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              How It Works
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Frontend Blog Showcase
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  The main page displays published blog posts with proper SEO optimization. 
                  Each post includes metadata, reading time calculation, and tag-based organization.
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  YouTube Integration
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  YouTube videos are showcased with thumbnails, descriptions, and direct links. 
                  The admin can control which videos are displayed on the homepage.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Admin Interface
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  A comprehensive admin panel allows content management with forms for creating 
                  and editing blog posts and managing YouTube video displays.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Getting Started
            </h2>
            <div className="bg-gray-900 dark:bg-gray-800 rounded-lg p-6 text-green-400 font-mono text-sm">
              <div className="mb-2"># Clone and setup the project</div>
              <div className="mb-2">npm install</div>
              <div className="mb-2">npm run dev</div>
              <div className="mt-4 text-gray-400"># Visit http://localhost:3000</div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-4 text-center">
              The project will be running locally with hot reload for development.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
