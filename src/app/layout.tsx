import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abdul Rahim - Next.js & TypeScript Tutorials",
  description: "A modern blog showcasing Next.js, TypeScript, and web development tutorials with YouTube video integration.",
  keywords: ["Next.js", "TypeScript", "React", "Web Development", "Programming", "Tutorials"],
  authors: [{ name: "Abdul Rahim" }],
  creator: "Abdul Rahim",
  openGraph: {
    title: "Abdul Rahim - Next.js & TypeScript Tutorials",
    description: "Learn modern web development with Next.js, TypeScript, and more",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Rahim - Next.js & TypeScript Tutorials",
    description: "Learn modern web development with Next.js, TypeScript, and more",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-white dark:bg-gray-900`}>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
