import { Box, Typography, Stack, Avatar } from '@mui/material';
import { formatDuration, formatViews, formatTimeAgo } from '../utils/helpers';

const VideoCard = ({ video, onClick }) => {
  return (
    <Box 
      onClick={onClick}
      sx={{
        display: 'flex',
        gap: 2,
        mb: 3,
        cursor: 'pointer',
        '&:hover': { backgroundColor: 'action.hover' },
        p: 1,
        borderRadius: '8px',
        width: '100%'
      }}
    >
      {/* Thumbnail with Duration */}
      <Box sx={{ 
        position: 'relative',
        flexShrink: 0,
        width: '360px',
        borderRadius: '8px',
        overflow: 'hidden'
      }}>
        <img
          src={video.thumbnail}
          alt={video.title}
          style={{
            width: '100%',
            aspectRatio: '16/9',
            objectFit: 'cover',
            display: 'block'
          }}
        />
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            bottom: 6,
            right: 6,
            backgroundColor: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '2px 4px',
            borderRadius: '4px',
            fontSize: '0.75rem',
          }}
        >
          {formatDuration(video.duration)}
        </Typography>
      </Box>

      {/* Video Info */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 500,
            mb: 1,
            lineHeight: 1.4
          }}
        >
          {video.title}
        </Typography>
        
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
          <Avatar 
            src={video.channelIcon} 
            sx={{ width: 24, height:24 }}
          />
          <Typography variant="body2" color="text.secondary">
            {video.channel}
          </Typography>
        </Stack>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
          {formatViews(video.views)} views • {formatTimeAgo(video.uploadDate)}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {video.description}
        </Typography>
      </Box>
    </Box>
  );
};

// THIS IS THE CRUCIAL LINE THAT WAS MISSING:
export default VideoCard;