import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Abdul Rahim",
  description:
    "A modern blog showcasing Data structures, Algorithms, and Problem-solving tutorials using Next.js and TypeScript.",
  keywords: [
    "Data Structures",
    "Algorithms",
    "Problem Solving",
    "Competitive Programming",
    "Cpp",
    "Programming",
    "Tutorials",
  ],
  authors: [{ name: "Abdul Rahim" }],
  creator: "Abdul Rahim",
  openGraph: {
    title: "Abdul Rahim",
    description: "Learn Data structures, Algorithms, and Problem-solving",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdul Rahim ",
    description: "Learn Data structures, Algorithms, and Problem-solving",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased bg-white dark:bg-gray-900`}
      >
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
