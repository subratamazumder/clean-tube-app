import { Box, Typography } from '@mui/material';

const VideoPlayer = ({ video }) => {
  if (!video) return null;
  // Parameters to disable recommendations
  const embedParams = new URLSearchParams({
    rel: '0',              // Disables related videos
    modestbranding: '1',   // Hides YouTube logo
    fs: '1',               // Hides fullscreen button (optional)
    controls: '1',         // Ensures controls are visible
    disablekb: '0 ',        // Disables keyboard controls (optional)
    iv_load_policy: '3',   // Disables annotations
    autoplay: '1',         // Autoplay the video
    playsinline: '1',       // Plays inline on mobile devices
    controls: '1'         // Hides video controls
  }).toString();
  return (
    <Box sx={{ mb: 4 }} id="video-player">
      <Box
        sx={{
          position: 'relative',
          paddingBottom: '56.25%', // 16:9 aspect ratio
          height: 0,
          overflow: 'hidden',
          mb: 2,
          borderRadius: '12px',
          overflow: 'hidden'
        }}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.id}?${embedParams}`} // Added autoplay
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
          title={video.title}
        ></iframe>
      </Box>
      <Typography variant="h6" gutterBottom>
        {video.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {video.channel} • {video.views} views
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {video.description}
      </Typography>
    </Box>
  );
};

export default VideoPlayer;