import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Grid, Typography } from '@mui/material';
import { searchMockVideos } from '../services/mockData';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import Layout from '../components/Layout';
// import SearchBox from '../components/SearchBox';
// Replace your current SearchBox import with:
import AutoCompleteSearch from '../components/AutoCompleteSearch';
import VideoGrid from '../components/VideoGrid';
import VideoPlayer from '../components/VideoPlayer';
import StickySearchBar from '../components/StickySearchBar';
const Home = () => {
    const router = useRouter();
    const { q } = router.query;
    const [query, setQuery] = useState(q || '');
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo, error, setError] = useState(null);
    const [isMockData, setIsMockData] = useState(false);
    useEffect(() => {
        if (q) {
            handleSearch(q);
        }
    }, [q]);

    const handleSelectVideo = (video) => {
        setSelectedVideo(video);

        // Scroll to player after a tiny delay
        setTimeout(() => {
            const playerElement = document.getElementById('video-player');
            if (playerElement) {
                const offset = 20; // Adjust this value as needed
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = playerElement.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 50);
    };
    // invoke the API to fetch videos based on the search query
    const fetchVideos = async (query) => {
        try {
            const response = await fetch(`/api/youtube?q=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch videos:', error);
            throw error; // Or return mock data as fallback
        }
    };

    const handleSearch = async (searchQuery) => {
        setQuery(searchQuery);
        setSelectedVideo(null);

        try {
            // Try real API first
            const data = await fetchVideos(searchQuery);
            setVideos(data);
            setIsMockData(false);
        } catch (error) {
            console.log('Using mock data due to error:', error);
            setError('Failed to fetch videos. Using mock data...');
            // Fallback to mock data if API fails
            const mockData = searchMockVideos(searchQuery);
            setVideos(mockData);
            setIsMockData(true);
        }
    };

    return (
        <Layout>
            {!selectedVideo && videos.length === 0 && (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: selectedVideo ? 'auto' : '70vh',
                        mb: 4,
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <VideoLibraryIcon sx={{
                            color: 'red',
                            fontSize: '5rem',
                            mr: 1
                        }} />
                        <Typography
                            variant="h2"
                            gutterBottom
                            sx={{
                                fontWeight: 'bold',
                                mb: 3,
                                color: 'black',
                            }}
                        >
                            LeanTube
                        </Typography>
                    </Box>
                    <Box>
                        {/* Line 1 - Search text (always on its own line) */}
                        <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{
                                display: 'block',
                                mb: 1 // Margin bottom for all screen sizes
                            }}
                        >
                            Search what you want to watch!
                        </Typography>

                        {/* Lines 2 & 3 - Red text phrases */}
                        <Box sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' }, // Stack on mobile, inline on desktop
                            gap: { xs: 0, sm: 1 }, // No gap when stacked, small gap when inline
                            mb: 2 // Optional bottom margin
                        }}>
                            <Typography
                                component="span"
                                sx={{
                                    fontWeight: 'bold',
                                    color: 'red',
                                    display: 'block'
                                }}
                            >
                                no distractions!
                            </Typography>
                            <Typography
                                component="span"
                                sx={{
                                    fontWeight: 'bold',
                                    color: 'red',
                                    display: 'block'
                                }}
                            >
                                no recommendations!
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            width: {
                                xs: '90%',  // 90% on mobile
                                sm: '70%',  // 70% on tablets
                                md: '50%',  // 50% on medium devices
                                lg: '30%',  // 30% on desktop
                            },
                            maxWidth: '600px',
                            mx: 'auto', // Center horizontally
                        }}
                    >
                        {/* <SearchBox initialQuery={query} /> */}
                        <AutoCompleteSearch
                            onSearch={(searchQuery) => {
                                if (searchQuery.trim()) {
                                    router.push(`/?q=${encodeURIComponent(searchQuery)}`);
                                }
                            }}
                        />
                        {isMockData && (
                            <Typography variant="caption" color="text.secondary" mt={1}>
                                Using mock data - API might be unavailable
                            </Typography>
                        )}
                    </Box>
                </Box>
            )}
            {(selectedVideo || videos.length > 0) && (
                <StickySearchBar query={query} />
            )}
            {selectedVideo ? (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <VideoPlayer video={selectedVideo} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <VideoGrid
                            videos={videos.filter(v => v.id !== selectedVideo.id)}
                            onSelectVideo={setSelectedVideo}
                        />
                    </Grid>
                </Grid>
            ) : videos.length > 0 ? (
                <VideoGrid videos={videos} onSelectVideo={handleSelectVideo} />
            ) : query ? (
                <Typography variant="h6" textAlign="center" color="text.secondary">
                    No videos found for "{query}"
                </Typography>
            ) : null}
        </Layout>
    );
};

export default Home;