export interface BlogPost {
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

export interface YouTubeVideo {
  id: string;
  videoId: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedDate: string;
  duration: string;
  viewCount: number;
  isDisplayed: boolean;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
