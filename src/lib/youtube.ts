import { YouTubeVideo } from '@/types';

interface YouTubeApiResponse {
  items: {
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      description: string;
      publishedAt: string;
      resourceId?: {
        videoId: string;
      };
      thumbnails: {
        maxres?: { url: string };
        high?: { url: string };
        medium?: { url: string };
        default?: { url: string };
      };
    };
  }[];
}

interface YouTubeVideoDetails {
  items: {
    id: string;
    contentDetails: {
      duration: string;
    };
    statistics: {
      viewCount: string;
    };
  }[];
}

function parseYouTubeDuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';
  
  const hours = parseInt(match[1] || '0');
  const minutes = parseInt(match[2] || '0');
  const seconds = parseInt(match[3] || '0');
  
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export async function fetchYouTubeVideos(): Promise<YouTubeVideo[]> {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
  
  if (!API_KEY || !CHANNEL_ID) {
    console.error('YouTube API key or Channel ID not configured');
    return [];
  }

  try {
    // First, get the channel's uploads playlist ID
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
    );
    
    if (!channelResponse.ok) {
      throw new Error('Failed to fetch channel information');
    }
    
    const channelData = await channelResponse.json();
    const uploadsPlaylistId = channelData.items[0]?.contentDetails?.relatedPlaylists?.uploads;
    
    if (!uploadsPlaylistId) {
      throw new Error('Could not find uploads playlist');
    }

    // Get the latest videos from the uploads playlist
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=5&key=${API_KEY}&order=date`
    );
    
    if (!videosResponse.ok) {
      throw new Error('Failed to fetch videos');
    }
    
    const videosData: YouTubeApiResponse = await videosResponse.json();
    
    // Get video IDs for detailed information
    const videoIds = videosData.items.map(item => item.snippet.resourceId?.videoId).filter(Boolean);
    
    if (videoIds.length === 0) {
      return [];
    }
    
    // Get video details (duration, view count)
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(',')}&key=${API_KEY}`
    );
    
    if (!detailsResponse.ok) {
      throw new Error('Failed to fetch video details');
    }
    
    const detailsData: YouTubeVideoDetails = await detailsResponse.json();
    
    // Combine data and format
    const videos: YouTubeVideo[] = videosData.items.map((item, index) => {
      const videoId = item.snippet.resourceId?.videoId || '';
      const details = detailsData.items.find(detail => detail.id === videoId);
      
      return {
        id: (index + 1).toString(),
        videoId: videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl: item.snippet.thumbnails.maxres?.url || 
                     item.snippet.thumbnails.high?.url || 
                     item.snippet.thumbnails.medium?.url || 
                     item.snippet.thumbnails.default?.url || '',
        publishedDate: new Date(item.snippet.publishedAt).toISOString().split('T')[0],
        duration: details ? parseYouTubeDuration(details.contentDetails.duration) : '0:00',
        viewCount: details ? parseInt(details.statistics.viewCount) : 0,
        isDisplayed: true
      };
    });
    
    return videos;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    return [];
  }
}

// Alternative method using channel handle/username
export async function fetchYouTubeVideosByHandle(handle: string): Promise<YouTubeVideo[]> {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  
  if (!API_KEY) {
    console.error('YouTube API key not configured');
    return [];
  }

  try {
    // Search for the channel by handle
    const searchResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(handle)}&type=channel&key=${API_KEY}`
    );
    
    if (!searchResponse.ok) {
      throw new Error('Failed to search for channel');
    }
    
    const searchData = await searchResponse.json();
    const channelId = searchData.items[0]?.id?.channelId;
    
    if (!channelId) {
      throw new Error('Channel not found');
    }
    
    // Now get videos using the found channel ID
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=5&order=date&type=video&key=${API_KEY}`
    );
    
    if (!videosResponse.ok) {
      throw new Error('Failed to fetch videos');
    }
    
    const videosData: YouTubeApiResponse = await videosResponse.json();
    
    // Get video IDs for detailed information
    const videoIds = videosData.items.map(item => item.id.videoId).filter(Boolean);
    
    if (videoIds.length === 0) {
      return [];
    }
    
    // Get video details
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(',')}&key=${API_KEY}`
    );
    
    if (!detailsResponse.ok) {
      throw new Error('Failed to fetch video details');
    }
    
    const detailsData: YouTubeVideoDetails = await detailsResponse.json();
    
    // Format the videos
    const videos: YouTubeVideo[] = videosData.items.map((item, index) => {
      const videoId = item.id.videoId;
      const details = detailsData.items.find(detail => detail.id === videoId);
      
      return {
        id: (index + 1).toString(),
        videoId: videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnailUrl: item.snippet.thumbnails.maxres?.url || 
                     item.snippet.thumbnails.high?.url || 
                     item.snippet.thumbnails.medium?.url || 
                     item.snippet.thumbnails.default?.url || '',
        publishedDate: new Date(item.snippet.publishedAt).toISOString().split('T')[0],
        duration: details ? parseYouTubeDuration(details.contentDetails.duration) : '0:00',
        viewCount: details ? parseInt(details.statistics.viewCount) : 0,
        isDisplayed: true
      };
    });
    
    return videos;
  } catch (error) {
    console.error('Error fetching YouTube videos by handle:', error);
    return [];
  }
}
