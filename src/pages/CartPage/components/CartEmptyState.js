import { Container, Typography, Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const CartEmptyState = () => {
  return (
    // กล่องหลักแสดงสถานะตะกร้าว่าง
    <Container maxWidth="lg" sx={{
      py: 8,
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
    }}>
      {/* ไอคอนตะกร้าสินค้า */}
      <ShoppingCart sx={{
        fontSize: 80,
        color: '#ffc107',
        mb: 3,
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)'
        }
      }} />

      {/* ข้อความแจ้งว่าตะกร้าว่าง */}
      <Typography variant="h4" gutterBottom sx={{
        fontWeight: 700,
        color: '#212327',
        mb: 2,
      }}>
        Your cart is empty
      </Typography>

      {/* ข้อความแนะนำให้ไปเลือกซื้อสินค้า */}
      <Typography variant="body1" sx={{
        mb: 4,
        color: '#6c757d',
        fontSize: '1.1rem',
        maxWidth: '500px',
        lineHeight: '1.6'
      }}>
        Looks like you haven't added any items yet
      </Typography>

      {/* ปุ่มกลับไปหน้าแรกเพื่อเลือกซื้อสินค้า */}
      <Button
        component={Link}
        to="/"
        variant="contained"
        size="large"
        sx={{
          px: 5,
          py: 1.5,
          backgroundColor: '#ffc107',
          color: '#212327',
          fontWeight: '600',
          fontSize: '1rem',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(255, 193, 7, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: '#ffca28',
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 15px rgba(255, 193, 7, 0.4)'
          }
        }}
      >
        Continue Shopping
      </Button>
    </Container>
  );
};

export default CartEmptyState;