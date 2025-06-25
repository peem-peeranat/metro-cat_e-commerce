import { Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { useCart } from '../../../context/CartContext';

const AddToCartButton = ({ product, quantity, isMobile, onAddToCartSuccess }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      if (onAddToCartSuccess) onAddToCartSuccess();
    }
  };

  return (
    <Button
      variant="contained"
      size={isMobile ? 'large' : 'large'}
      startIcon={<ShoppingCart />}
      onClick={handleAddToCart}
      fullWidth={isMobile}
      sx={{
        px: isMobile ? 2 : 4,
        py: isMobile ? 2 : 1.5,
        height: isMobile ? 56 : 48,
        fontSize: isMobile ? '1.05rem' : '1rem',
        fontWeight: 700,
        borderRadius: isMobile ? '28px' : '12px',
        textTransform: 'none',
        boxShadow: '0 4px 12px rgba(255,193,7,0.2)',
        backgroundColor: '#ffc107',
        color: '#212327',

        '&:hover': {
          backgroundColor: '#ffca28',
          boxShadow: '0 6px 16px rgba(255,193,7,0.3)',
          transform: 'translateY(-2px)'
        },
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      Add
    </Button>
  );
};

export default AddToCartButton;