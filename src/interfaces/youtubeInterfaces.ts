export interface YouTubeApiResponse {
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

export interface YouTubeVideoDetails {
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
