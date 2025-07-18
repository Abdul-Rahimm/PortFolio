import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Abdul Rahim</h3>
            <p className="text-gray-300 mb-4">
              A modern blog platform showcasing articles about web development, 
              programming tutorials, and tech insights. Built with Next.js and TypeScript.
            </p>
            <p className="text-gray-400 text-sm">
              Sharing knowledge through code and content.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  All Posts
                </Link>
              </li>
              <li>
                <Link href="/videos" className="text-gray-300 hover:text-white transition-colors">
                  YouTube Videos
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/blog?tag=Next.js" className="text-gray-300 hover:text-white transition-colors">
                  Next.js
                </Link>
              </li>
              <li>
                <Link href="/blog?tag=TypeScript" className="text-gray-300 hover:text-white transition-colors">
                  TypeScript
                </Link>
              </li>
              <li>
                <Link href="/blog?tag=React" className="text-gray-300 hover:text-white transition-colors">
                  React
                </Link>
              </li>
              <li>
                <Link href="/blog?tag=Web Development" className="text-gray-300 hover:text-white transition-colors">
                  Web Development
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © {currentYear} Abdul Rahim. Built with Next.js and TypeScript.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
