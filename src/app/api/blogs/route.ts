import { NextRequest, NextResponse } from 'next/server';
import { BlogPost, ApiResponse } from '@/types';
import { mockBlogs } from '@/data/mockData';

// In a real application, you would use a database
// For this demo, we'll use the mock data and simulate CRUD operations
let blogs: BlogPost[] = [...mockBlogs];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get('published');
    const tag = searchParams.get('tag');
    
    let filteredBlogs = [...blogs];
    
    // Filter by published status
    if (published !== null) {
      const isPublished = published === 'true';
      filteredBlogs = filteredBlogs.filter(blog => blog.isPublished === isPublished);
    }
    
    // Filter by tag
    if (tag) {
      filteredBlogs = filteredBlogs.filter(blog => 
        blog.tags.some(blogTag => 
          blogTag.toLowerCase().includes(tag.toLowerCase())
        )
      );
    }
    
    // Sort by published date (newest first)
    filteredBlogs.sort((a, b) => 
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );

    const response: ApiResponse<BlogPost[]> = {
      success: true,
      data: filteredBlogs,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch blog posts',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.content || !body.excerpt) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Missing required fields: title, content, and excerpt are required',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Create new blog post
    const newBlog: BlogPost = {
      id: (blogs.length + 1).toString(),
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      author: body.author || 'Admin',
      publishedDate: body.publishedDate || new Date().toISOString().split('T')[0],
      tags: body.tags || [],
      isPublished: body.isPublished || false,
      readTime: body.readTime || 5,
      slug: body.slug,
    };

    blogs.push(newBlog);

    const response: ApiResponse<BlogPost> = {
      success: true,
      data: newBlog,
      message: 'Blog post created successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to create blog post',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
