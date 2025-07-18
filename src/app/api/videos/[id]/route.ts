import { NextRequest, NextResponse } from 'next/server';
import { YouTubeVideo, ApiResponse } from '@/types';
import { mockYouTubeVideos } from '@/data/mockData';

// In a real application, you would use a database
let videos: YouTubeVideo[] = [...mockYouTubeVideos];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = params.id;
    const video = videos.find(v => v.id === videoId);

    if (!video) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Video not found',
      };
      return NextResponse.json(response, { status: 404 });
    }

    const response: ApiResponse<YouTubeVideo> = {
      success: true,
      data: video,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching video:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to fetch video',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = params.id;
    const body = await request.json();
    
    const videoIndex = videos.findIndex(v => v.id === videoId);
    
    if (videoIndex === -1) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Video not found',
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Update the video
    const updatedVideo: YouTubeVideo = {
      ...videos[videoIndex],
      ...body,
      id: videoId, // Ensure ID doesn't change
      thumbnailUrl: body.thumbnailUrl || `https://img.youtube.com/vi/${body.videoId || videos[videoIndex].videoId}/maxresdefault.jpg`,
    };

    videos[videoIndex] = updatedVideo;

    const response: ApiResponse<YouTubeVideo> = {
      success: true,
      data: updatedVideo,
      message: 'Video updated successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error updating video:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to update video',
    };
    return NextResponse.json(response, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const videoId = params.id;
    const videoIndex = videos.findIndex(v => v.id === videoId);
    
    if (videoIndex === -1) {
      const response: ApiResponse<null> = {
        success: false,
        error: 'Video not found',
      };
      return NextResponse.json(response, { status: 404 });
    }

    // Remove the video
    videos.splice(videoIndex, 1);

    const response: ApiResponse<null> = {
      success: true,
      message: 'Video deleted successfully',
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error deleting video:', error);
    const response: ApiResponse<null> = {
      success: false,
      error: 'Failed to delete video',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
