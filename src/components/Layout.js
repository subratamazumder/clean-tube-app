import { Container, Box, Typography, Link } from '@mui/material';
import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>LeanTube</title>
        <meta name="description" content="Search and watch videos" />
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f9f9f9',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container maxWidth="xl" sx={{ py: 4, flex: 1 }}>
          {children}
        </Container>

        {/* Footer - matches body color and sticks to bottom */}
        <Box
          component="footer"
          sx={{
            py: 2,
            px: 2,
            backgroundColor: '#f9f9f9', // Same as body background
            textAlign: 'center',
            marginTop: 'auto', // Ensures footer sticks to bottom
          }}
        >
          <Typography variant="body2" color="text.secondary">
            <Box 
              component="span" 
              sx={{ 
                display: { xs: 'block', sm: 'inline' },
                mb: { xs: 0.5, sm: 0 }
              }}
            >
              Powered by{' '}
              <Link 
                href="https://vercel.com" 
                target="_blank" 
                rel="noopener noreferrer"
                color="inherit"
                sx={{ textDecoration: 'underline' }}
              >
                Vercel
              </Link>
            </Box>
            <Box 
              component="span" 
              sx={{ 
                display: { xs: 'none', sm: 'inline' },
                mx: 1
              }}
            >
              •
            </Box>
            <Box 
              component="span" 
              sx={{ 
                display: { xs: 'block', sm: 'inline' }
              }}
            >
              Developed by{' '}
              <Link 
                href="https://subrata.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                color="inherit"
                sx={{ textDecoration: 'underline' }}
              >
                subrata.dev
              </Link>
            </Box>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Layout;