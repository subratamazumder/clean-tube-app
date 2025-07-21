import { Container, Box } from '@mui/material';
import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Video Search App</title>
        <meta name="description" content="Search and watch videos" />
      </Head>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {children}
        </Container>
      </Box>
    </>
  );
};

export default Layout;