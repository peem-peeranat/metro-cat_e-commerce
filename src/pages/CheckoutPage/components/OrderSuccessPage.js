import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  // เมื่อโหลดหน้านี้ จะ redirect กลับหน้าแรกหลังจาก 2 วินาที
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      minHeight="60vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={3}
      sx={{
        padding: '48px',
        margin: '20px',
      }}
    >
      {/* ไอคอนเช็คสีเหลือง */}
      <Box
        sx={{
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-8px',
            left: '-8px',
            right: '-8px',
            bottom: '-8px',
            background: 'rgba(255, 193, 7, 0.1)',
            borderRadius: '50%',
            zIndex: 0
          }
        }}
      >
        <CheckCircle
          sx={{
            fontSize: 88,
            color: '#ffc107',
            position: 'relative',
            zIndex: 1,
            filter: 'drop-shadow(0 6px 12px rgba(255, 193, 7, 0.2))',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            '&:hover': {
              transform: 'scale(1.08) rotate(5deg)'
            }
          }}
        />
      </Box>

      {/* ข้อความแจ้งสำเร็จ */}
      <Typography
        variant="h4"
        fontWeight={700}
        color="#212327"
        sx={{
          textShadow: '0 2px 4px rgba(33, 35, 39, 0.05)',
          letterSpacing: '0.8px',
          marginTop: '16px',
          position: 'relative',
          '&::after': {
            content: '""',
            display: 'block',
            width: '60px',
            height: '3px',
            background: '#ffc107',
            margin: '16px auto 0',
            borderRadius: '3px'
          }
        }}
      >
        Order Successful!
      </Typography>

      {/* ข้อความขอบคุณและแจ้ง redirect */}
      <Typography
        variant="body1"
        color="#212327"
        sx={{
          opacity: 0.8,
          maxWidth: '420px',
          textAlign: 'center',
          lineHeight: '1.7',
          letterSpacing: '0.2px',
          fontSize: '1.05rem',
          marginTop: '8px'
        }}
      >
        Thank you for your purchase. You will be redirected to the homepage shortly.
      </Typography>

      {/* แสดง progress หมุน */}
      <CircularProgress
        color="inherit"
        thickness={4}
        size={48}
        sx={{
          mt: 3,
          color: '#ffc107',
          '& .MuiCircularProgress-circle': {
            strokeLinecap: 'round'
          }
        }}
      />

      {/* ข้อความกำลัง redirect */}
      <Typography
        variant="caption"
        color="#212327"
        sx={{
          opacity: 0.6,
          fontSize: '0.8rem',
          letterSpacing: '0.5px',
          marginTop: '8px'
        }}
      >
        Redirecting...
      </Typography>
    </Box>
  );
};

export default OrderSuccessPage;