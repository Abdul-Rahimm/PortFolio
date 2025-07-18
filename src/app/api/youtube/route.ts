import { NextResponse } from 'next/server';
import { fetchYouTubeVideosByHandle } from '@/lib/youtube';

export async function GET() {
  try {
    // Using the channel handle from your URL
    const videos = await fetchYouTubeVideosByHandle('@AbdulRaheemCodes');
    
    return NextResponse.json({
      success: true,
      data: videos,
      count: videos.length
    });
  } catch (error) {
    console.error('Error in YouTube API route:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch YouTube videos',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
