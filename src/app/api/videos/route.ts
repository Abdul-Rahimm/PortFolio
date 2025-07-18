import { NextRequest, NextResponse } from 'next/server';
import { YouTubeVideo, ApiResponse } from '@/types';
import { mockYouTubeVideos } from '@/data/mockData';

// In a real application, you would use a database
let videos: YouTubeVideo[] = [...mockYouTubeVideos];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const displayed = searchParams.get('displayed');
    
    let filteredVideos = [...videos];
    
    // Filter by displayed status
    if (displayed !== null) {
      const isDisplayed = displayed === 'true';
      filteredVideos = filteredVideos.filter(video => video.isDisplayed === isDisplayed);
    }
    
    // Sort by published date (newest first)
    filteredVideos.sort((a, b) => 
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    );

    const response: ApiResponse<YouTubeVideo[]> = {
      success: true,
      data: filteredVideos,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching videos:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch YouTube videos',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.videoId || !body.title) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Missing required fields: videoId and title are required',
      };
      return NextResponse.json(response, { status: 400 });
    }

    // Create new video entry
    const newVideo: YouTubeVideo = {
      id: (videos.length + 1).toString(),
      videoId: body.videoId,
      title: body.title,
      description: body.description || '',
      thumbnailUrl: body.thumbnailUrl || `https://img.youtube.com/vi/${body.videoId}/maxresdefault.jpg`,
      publishedDate: body.publishedDate || new Date().toISOString().split('T')[0],
      duration: body.duration || '0:00',
      viewCount: body.viewCount || 0,
      isDisplayed: body.isDisplayed || false,
    };

    videos.push(newVideo);

    const response: ApiResponse<YouTubeVideo> = {
      success: true,
      data: newVideo,
      message: 'YouTube video added successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error creating video entry:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to add YouTube video',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
