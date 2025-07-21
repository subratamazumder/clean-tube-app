export const formatDuration = (duration) => {
  // Convert ISO 8601 duration to readable format
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  const hours = (parseInt(match[1]) || 0);
  const minutes = (parseInt(match[2]) || 0);
  const seconds = (parseInt(match[3]) || 0);
  
  return [
    hours ? `${hours}:` : '',
    minutes ? `${minutes.toString().padStart(2, '0')}:` : '0:',
    seconds.toString().padStart(2, '0'),
  ].join('');
};

export const formatViews = (views) => {
  const num = parseInt(views);
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

// Add to your existing helpers
export const formatTimeAgo = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now - date;
  
  const minute = 60 * 1000;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  if (diff < hour) return `${Math.floor(diff/minute)} minutes ago`;
  if (diff < day) return `${Math.floor(diff/hour)} hours ago`;
  if (diff < month) return `${Math.floor(diff/day)} days ago`;
  if (diff < year) return `${Math.floor(diff/month)} months ago`;
  return `${Math.floor(diff/year)} years ago`;
};