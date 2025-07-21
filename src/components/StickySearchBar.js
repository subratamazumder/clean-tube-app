import { useRouter } from 'next/router';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
// import SearchBox from './SearchBox';
import AutoCompleteSearch from '../components/AutoCompleteSearch';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
const StickySearchBar = ({ query }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const handleHomeClick = () => {
    // Clear all caches and force reload
  if (typeof window !== 'undefined') {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/';
  }
  };
  return (
    <Box
      aria-label="Return to homepage"
      role="button"
      tabIndex={0}
      // onKeyUp={(e) => e.key === 'Enter' && router.push('/')}
      sx={{
        transition: 'all 0.3s ease',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        backgroundColor: 'background.paper',
        py: 2,
        px: { xs: 2, sm: 4 },
        boxShadow: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 3
      }}
    >
      {/* Clickable Logo/Icon */}
      <Box 
        onClick={handleHomeClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.8
          }
        }}
      >
      <VideoLibraryIcon sx={{
        color: 'red',
        fontSize: '2rem',
        mr: 1
      }} />
      {/* Logo/Brand Name - Only shown on desktop */}
      {!isMobile && (
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: 'black',
            fontFamily: '"Roboto", Arial, sans-serif',
            minWidth: '140px' // Prevents layout shift
          }}
        >
          CleanTube
        </Typography>
      )}
      </Box>
      {/* Search Box - Takes remaining space */}
      <Box sx={{
        flexGrow: 1,
        maxWidth: { sm: '600px', md: '800px' }
      }}>
        {/* <SearchBox initialQuery={query} /> */}
        <AutoCompleteSearch
                            onSearch={(searchQuery) => {
                                if (searchQuery.trim()) {
                                    router.push(`/?q=${encodeURIComponent(searchQuery)}`);
                                }
                            }}
                        />
      </Box>
    </Box>
  );
};

export default StickySearchBar;