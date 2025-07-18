import Link from "next/link";

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
              Competitive Programmer and Software Engineer with a passion for
              building efficient algorithms and solving complex problems.
            </p>
            <p className="text-gray-400 text-sm">
              Sharing knowledge through code and content.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © {currentYear} Abdul Rahim. Built with Next.js and TypeScript.
          </div>
        </div>
      </div>
    </footer>
  );
}
