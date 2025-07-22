// pages/api/youtube.js
import axios from 'axios';

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { q, maxResults = 20 } = req.query;

  try {
    const API_KEY = process.env.YOUTUBE_API_KEY;
    const BASE_URL = 'https://www.googleapis.com/youtube/v3';

    // 1. Search for videos
    const searchResponse = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        q,
        maxResults,
        type: 'video',
        key: API_KEY,
      },
    });

    // 2. Get video details + channel icons in parallel
    const videoDetailsPromises = searchResponse.data.items.map(async (item) => {
      const [details, channel] = await Promise.all([
        // Video details
        axios.get(`${BASE_URL}/videos`, {
          params: {
            part: 'contentDetails,statistics',
            id: item.id.videoId,
            key: API_KEY,
          },
        }),
        // Channel details (for icon)
        axios.get(`${BASE_URL}/channels`, {
          params: {
            part: 'snippet',
            id: item.snippet.channelId,
            key: API_KEY,
          },
        }),
      ]);

      return {
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
        channel: item.snippet.channelTitle,
        channelIcon: channel.data.items[0]?.snippet?.thumbnails?.default?.url || null,
        duration: details.data.items[0].contentDetails.duration,
        views: details.data.items[0].statistics.viewCount,
        uploadDate: item.snippet.publishedAt,
      };
    });

    const videos = await Promise.all(videoDetailsPromises);

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(videos);
    
  } catch (error) {
    console.error('YouTube API error:', error.response?.data || error.message);
    
    // Return mock data in development
    if (process.env.NODE_ENV === 'development') {
      const mockVideos = Array.from({ length: maxResults }, (_, i) => ({
        id: `mock${i}`,
        title: `${q} video ${i}`,
        channel: `Channel ${i}`,
        channelIcon: null,
        thumbnail: 'https://via.placeholder.com/320x180',
        views: Math.floor(Math.random() * 1000000),
      }));
      return res.status(200).json(mockVideos);
    }

    res.status(500).json({ 
      error: 'Failed to fetch videos',
      ...(process.env.NODE_ENV === 'development' && {
        details: error.message,
        stack: error.stack
      })
    });
  }
}