import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

export const searchVideos = async (query, maxResults = 12) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q: query,
        maxResults,
        type: 'video',
        key: API_KEY,
      },
    });

    // Get video details to get duration and view count
    const videoIds = response.data.items.map(item => item.id.videoId).join(',');
    const detailsResponse = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet,contentDetails,statistics',
        id: videoIds,
        key: API_KEY,
      },
    });

    // Combine search results with details
    return response.data.items.map((item, index) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      channel: item.snippet.channelTitle,
      duration: detailsResponse.data.items[index].contentDetails.duration,
      views: detailsResponse.data.items[index].statistics.viewCount,
    }));
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
};