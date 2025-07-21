export const mockVideos = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Never Gonna Give You Up',
    description: 'Official music video for Rick Astley - Never Gonna Give You Up',
    thumbnail: 'https://i.ytimg.com/vi/dQw4w9WgXcQ/mqdefault.jpg',
    channel: 'Rick Astley',
    duration: 'PT3M33S',
    views: '123456789',
  },
  {
    id: '9bZkp7q19f0',
    title: 'Gangnam Style',
    description: 'PSY - GANGNAM STYLE(강남스타일) M/V',
    thumbnail: 'https://i.ytimg.com/vi/9bZkp7q19f0/mqdefault.jpg',
    channel: 'officialpsy',
    duration: 'PT4M13S',
    views: '456789123',
  },
  // Add more mock videos as needed
];

export const searchMockVideos = (query) => {
  return mockVideos.filter(video => 
    video.title.toLowerCase().includes(query.toLowerCase()) ||
    video.channel.toLowerCase().includes(query.toLowerCase())
  );
};