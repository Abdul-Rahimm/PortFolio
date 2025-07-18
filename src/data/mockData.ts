import { BlogPost, YouTubeVideo } from '@/types';

export const mockBlogs: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Next.js 14 and TypeScript',
    excerpt: 'Learn how to build modern web applications with Next.js 14, TypeScript, and the new App Router.',
    content: `# Getting Started with Next.js 14 and TypeScript

Next.js 14 brings incredible performance improvements and developer experience enhancements. In this comprehensive guide, we'll explore how to build scalable applications using TypeScript.

## What's New in Next.js 14

Next.js 14 introduces several groundbreaking features:

- **Turbopack**: Lightning-fast bundler for development
- **Server Actions**: Simplified server-side logic
- **Partial Prerendering**: Hybrid rendering for optimal performance

## Setting Up Your Project

To get started with Next.js 14 and TypeScript:

\`\`\`bash
npx create-next-app@latest my-app --typescript
cd my-app
npm run dev
\`\`\`

## TypeScript Best Practices

When working with Next.js and TypeScript, follow these practices:

1. **Use proper type definitions** for your props and API responses
2. **Leverage Next.js built-in types** like \`NextPage\` and \`GetServerSideProps\`
3. **Create custom types** for your domain-specific data structures

## Conclusion

Next.js 14 with TypeScript provides an excellent foundation for building modern web applications. The combination of type safety, performance, and developer experience makes it an ideal choice for projects of any scale.`,
    author: 'John Doe',
    publishedDate: '2024-01-15',
    tags: ['Next.js', 'TypeScript', 'React', 'Web Development'],
    isPublished: true,
    readTime: 5,
    slug: 'getting-started-nextjs-14-typescript'
  },
  {
    id: '2',
    title: 'Mastering TailwindCSS: From Basics to Advanced',
    excerpt: 'Discover the power of utility-first CSS with TailwindCSS and learn advanced techniques for building beautiful interfaces.',
    content: `# Mastering TailwindCSS: From Basics to Advanced

TailwindCSS has revolutionized how we approach styling in modern web development. This utility-first framework allows for rapid development while maintaining design consistency.

## Why TailwindCSS?

TailwindCSS offers several advantages:

- **Utility-first approach**: Build complex designs with simple utility classes
- **Responsive design**: Built-in responsive modifiers
- **Customization**: Highly configurable design system
- **Performance**: Purges unused CSS for optimal bundle size

## Core Concepts

### Utility Classes

Instead of writing custom CSS, TailwindCSS provides utility classes:

\`\`\`html
<div class="bg-blue-500 text-white p-4 rounded-lg shadow-md">
  Beautiful card component
</div>
\`\`\`

### Responsive Design

TailwindCSS makes responsive design effortless:

\`\`\`html
<div class="text-sm md:text-base lg:text-lg xl:text-xl">
  Responsive text
</div>
\`\`\`

## Advanced Techniques

### Custom Components

Create reusable components using @apply directive:

\`\`\`css
.btn-primary {
  @apply bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded;
}
\`\`\`

### Dark Mode

Implement dark mode with ease:

\`\`\`html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  Dark mode compatible content
</div>
\`\`\`

## Best Practices

1. **Use component extraction** for repeated patterns
2. **Leverage the configuration file** for custom values
3. **Utilize plugins** for extended functionality
4. **Maintain consistency** with your design system

## Conclusion

TailwindCSS empowers developers to build beautiful, responsive interfaces quickly and efficiently. By understanding its core concepts and advanced features, you can create stunning web applications with minimal custom CSS.`,
    author: 'Jane Smith',
    publishedDate: '2024-01-10',
    tags: ['TailwindCSS', 'CSS', 'Frontend', 'Design'],
    isPublished: true,
    readTime: 8,
    slug: 'mastering-tailwindcss-basics-advanced'
  },
  {
    id: '3',
    title: 'Building RESTful APIs with Next.js App Router',
    excerpt: 'Learn how to create robust and scalable APIs using Next.js App Router and TypeScript.',
    content: `# Building RESTful APIs with Next.js App Router

The Next.js App Router introduces a new way to build APIs with enhanced performance and developer experience. Let's explore how to create robust RESTful APIs.

## App Router API Routes

With the App Router, API routes are defined using the \`route.ts\` file:

\`\`\`typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'Hello from API!' });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ received: body });
}
\`\`\`

## Dynamic Routes

Create dynamic API endpoints:

\`\`\`typescript
// app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = params.id;
  return NextResponse.json({ userId });
}
\`\`\`

## Error Handling

Implement proper error handling:

\`\`\`typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    // Process the request
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}
\`\`\`

## Best Practices

1. **Use TypeScript** for type safety
2. **Implement proper validation** for request data
3. **Handle errors gracefully** with appropriate status codes
4. **Use middleware** for common functionality
5. **Document your APIs** for better maintainability

## Conclusion

Next.js App Router provides a powerful foundation for building APIs. With TypeScript integration and modern features, you can create scalable and maintainable backend services.`,
    author: 'Mike Johnson',
    publishedDate: '2024-01-05',
    tags: ['Next.js', 'API', 'Backend', 'TypeScript'],
    isPublished: true,
    readTime: 6,
    slug: 'building-restful-apis-nextjs-app-router'
  }
];

export const mockYouTubeVideos: YouTubeVideo[] = [
  {
    id: '1',
    videoId: 'dQw4w9WgXcQ',
    title: 'Next.js 14 Tutorial: Building a Full-Stack App',
    description: 'Complete tutorial on building a full-stack application with Next.js 14, covering both frontend and backend development.',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    publishedDate: '2024-01-20',
    duration: '45:30',
    viewCount: 125000,
    isDisplayed: true
  },
  {
    id: '2',
    videoId: 'LXb3EKWsInQ',
    title: 'TypeScript Masterclass: Advanced Patterns',
    description: 'Deep dive into advanced TypeScript patterns and best practices for large-scale applications.',
    thumbnailUrl: 'https://img.youtube.com/vi/LXb3EKWsInQ/maxresdefault.jpg',
    publishedDate: '2024-01-18',
    duration: '32:15',
    viewCount: 89000,
    isDisplayed: true
  },
  {
    id: '3',
    videoId: '6stlCkUDG_s',
    title: 'TailwindCSS: Creating Beautiful UIs',
    description: 'Learn how to create stunning user interfaces with TailwindCSS utility classes and responsive design.',
    thumbnailUrl: 'https://img.youtube.com/vi/6stlCkUDG_s/maxresdefault.jpg',
    publishedDate: '2024-01-15',
    duration: '28:45',
    viewCount: 67000,
    isDisplayed: true
  },
  {
    id: '4',
    videoId: 'oHg5SJYRHA0',
    title: 'React Server Components Explained',
    description: 'Understanding React Server Components and how they work in Next.js App Router.',
    thumbnailUrl: 'https://img.youtube.com/vi/oHg5SJYRHA0/maxresdefault.jpg',
    publishedDate: '2024-01-12',
    duration: '38:20',
    viewCount: 95000,
    isDisplayed: true
  }
];
