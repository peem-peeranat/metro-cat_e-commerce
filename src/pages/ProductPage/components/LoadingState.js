import { Container, CircularProgress } from '@mui/material';

const LoadingState = ({ isMobile }) => {
  return (
    <Container maxWidth="lg" sx={{
      py: 10,
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      backgroundColor: '#ffffff'
    }}>
      <CircularProgress
        size={isMobile ? 40 : 60}
        thickness={4}
        sx={{
          color: '#ffc107',
          transition: 'all 0.3s ease'
        }}
      />
    </Container>
  );
};

export default LoadingState;