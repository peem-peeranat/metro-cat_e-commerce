import { Box, Typography, Button, IconButton } from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import { useCart } from '../context/CartContext';

const Cart = ({ onClose }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start shopping to add items to your cart
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: 350, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Shopping Cart ({cartCount})
      </Typography>

      <Box sx={{ maxHeight: 400, overflowY: 'auto', mb: 2 }}>
        {cart.map((item) => (
          <Box key={item.id} sx={{ display: 'flex', mb: 2, borderBottom: '1px solid #eee', pb: 2 }}>
            <img
              src={item.thumbnail}
              alt={item.title}
              style={{ width: 80, height: 80, objectFit: 'contain', marginRight: 16 }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle1">{item.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                ${item.price} x {item.quantity}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Remove fontSize="small" />
                </IconButton>
                <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                <IconButton
                  size="small"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Add fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <Typography variant="subtitle1">
                ${(item.price * item.quantity).toFixed(2)}
              </Typography>
              <IconButton
                size="small"
                color="error"
                onClick={() => removeFromCart(item.id)}
              >
                <Delete fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ borderTop: '1px solid #eee', pt: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1">Subtotal:</Typography>
          <Typography variant="subtitle1">${cartTotal.toFixed(2)}</Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        href="/cart"
        onClick={onClose}
      >
        View Cart
      </Button>
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ mt: 1 }}
        href="/checkout"
        onClick={onClose}
      >
        Checkout
      </Button>
    </Box>
  );
};

export default Cart;