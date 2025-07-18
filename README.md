# Abdul Rahim - Next.js & TypeScript Portfolio

A modern portfolio and blog platform built with Next.js 14, TypeScript, and TailwindCSS. This project showcases web development skills and serves as a learning resource for building full-stack applications.

## 🚀 Features

### Frontend
- **Blog Showcase**: Display blog posts with proper SEO optimization
- **YouTube Integration**: Real-time YouTube video fetching from @AbdulRaheemCodes channel
- **Responsive Design**: Mobile-first approach using TailwindCSS
- **Dark Mode**: Built-in dark mode support
- **SEO Optimized**: Proper meta tags and Open Graph support

### Content Management
- **YouTube Videos**: Automatically fetched from YouTube Data API v3
- **Blog Posts**: Currently using mock data with future Medium integration planned
- **Real-time Updates**: Fresh content fetching on each visit

### Technical Features
- **Next.js 14**: App Router with Server Components
- **TypeScript**: Full type safety throughout the application
- **CSS Modules**: Component-scoped styling (no inline styles)
- **API Routes**: RESTful backend with proper error handling
- **Component Architecture**: Reusable and maintainable React components

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + CSS Modules
- **Icons**: Lucide React
- **Font**: Inter (Google Fonts)
- **Development**: ESLint, TypeScript strict mode

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (YouTube integration)
│   ├── blog/              # Blog pages
│   ├── videos/            # Video showcase page
│   └── about/             # About page
├── components/            # React components
│   └── ui/                # Reusable UI components
├── data/                  # Mock data and static content
├── lib/                   # Utility functions and YouTube API
├── styles/                # CSS modules (no inline styles)
└── types/                 # TypeScript type definitions
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learning2
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### Frontend
- **Homepage**: View featured blog posts and YouTube videos
- **Blog Page**: Browse all published blog posts
- **Individual Posts**: Read full blog posts with proper formatting
- **Videos Page**: Watch YouTube videos in an organized layout
- **About Page**: Learn more about the project and its features

### API Endpoints

#### YouTube Integration
- `GET /api/youtube` - Fetch latest videos from @AbdulRaheemCodes channel

### Content Sources
- **YouTube Videos**: Fetched from YouTube Data API v3 (@AbdulRaheemCodes channel)
- **Blog Posts**: Currently using mock data, future Medium integration planned

## 🎯 Learning Objectives

This project teaches:

1. **Next.js 14 App Router**: Understanding the new routing system and server components
2. **TypeScript Integration**: Proper typing and interface design for scalable applications
3. **CSS Architecture**: Using CSS modules instead of inline styles for maintainable styling
4. **API Integration**: Working with external APIs (YouTube Data API)
5. **Component Architecture**: Building reusable and maintainable React components
6. **State Management**: Client-side state handling without external libraries
7. **SEO Best Practices**: Meta tags, Open Graph, and semantic HTML
8. **Modern Development**: Server components, static generation, and performance optimization

## 🔧 Key Implementation Details

### CSS Modules Approach
Instead of using inline TailwindCSS classes, this project uses CSS modules for component styling:

```typescript
// Component
import styles from '@/styles/blog.module.css';

// Usage
<div className={styles.blogCard}>
  <h2 className={styles.blogTitle}>Title</h2>
</div>
```

### TypeScript Types
Comprehensive type definitions ensure type safety:

```typescript
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  tags: string[];
  isPublished: boolean;
  readTime: number;
  slug: string;
}
```

### API Error Handling
Consistent API response structure:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
For production deployment, you'll need to set up environment variables for:
- YouTube API keys (for real YouTube integration) - See YOUTUBE_SETUP.md for details
- Database connections (when implementing dynamic blog integration)

## 📚 Learning Resources

### Next.js 14
- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript with React](https://react-typescript-cheatsheet.netlify.app/)

### TailwindCSS
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [CSS Modules](https://github.com/css-modules/css-modules)

## 🤝 Contributing

This is a learning project, but contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add proper TypeScript types
5. Test your changes
6. Submit a pull request

## 📄 License

This project is created for educational purposes. Feel free to use it as a learning resource or starting point for your own projects.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [TailwindCSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Fonts by [Google Fonts](https://fonts.google.com/)

---

**Happy Learning! 🎉**

This project demonstrates real-world development practices and serves as a comprehensive example of building modern web applications with Next.js and TypeScript.
