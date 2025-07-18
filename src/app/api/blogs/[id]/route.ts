import { NextRequest, NextResponse } from 'next/server';
import { BlogPost, ApiResponse } from '@/types';
import { mockBlogs } from '@/data/mockData';

// In a real application, you would use a database
let blogs: BlogPost[] = [...mockBlogs];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blogId = params.id;
    const blog = blogs.find(b => b.id === blogId || b.slug === blogId);

    if (!blog) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Blog post not found',
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<BlogPost> = {
      success: true,
      data: blog,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch blog post',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blogId = params.id;
    const body = await request.json();
    
    const blogIndex = blogs.findIndex(b => b.id === blogId);
    
    if (blogIndex === -1) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Blog post not found',
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Update the blog post
    const updatedBlog: BlogPost = {
      ...blogs[blogIndex],
      ...body,
      id: blogId, // Ensure ID doesn't change
    };

    blogs[blogIndex] = updatedBlog;

    const response: ApiResponse<BlogPost> = {
      success: true,
      data: updatedBlog,
      message: 'Blog post updated successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating blog post:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to update blog post',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const blogId = params.id;
    const blogIndex = blogs.findIndex(b => b.id === blogId);
    
    if (blogIndex === -1) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Blog post not found',
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Remove the blog post
    blogs.splice(blogIndex, 1);

    const response: ApiResponse<null> = {
      success: true,
      message: 'Blog post deleted successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting blog post:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to delete blog post',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
