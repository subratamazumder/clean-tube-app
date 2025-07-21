import { Box } from '@mui/material';
import VideoCard from './VideoCard';

const VideoGrid = ({ videos, onSelectVideo }) => {
  return (
    <Box sx={{ 
      maxWidth: '1200px',
      mx: 'auto',
      px: 3,
      py: 2
    }}>
      {videos.map((video) => (
        <VideoCard 
          key={video.id}
          video={video}
          onClick={() => onSelectVideo(video)}
        />
      ))}
    </Box>
  );
};

// THIS IS THE MISSING EXPORT STATEMENT:
export default VideoGrid;