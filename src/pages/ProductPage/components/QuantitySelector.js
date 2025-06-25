import { IconButton, TextField, Box } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const QuantitySelector = ({ quantity, setQuantity, isMobile }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: isMobile ? '100%' : 'auto',
        // maxWidth: isMobile ? 340 : 'none',
        mr: isMobile ? 0 : 4,
        mb: isMobile ? 1.5 : 0,
        boxShadow: '0 4px 12px rgba(33,35,39,0.10)',
        borderRadius: isMobile ? '28px' : '12px',
        overflow: 'hidden',
        border: '1.5px solid rgba(33,35,39,0.12)',
        height: isMobile ? 56 : 'auto',
        minWidth: isMobile ? 0 : 140,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        background: '#fff',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(33,35,39,0.15)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <IconButton
        onClick={() => setQuantity(Math.max(1, quantity - 1))}
        size={isMobile ? 'large' : 'medium'}
        sx={{
          flex: isMobile ? '0 0 56px' : 'none',
          height: isMobile ? 56 : 48,
          width: isMobile ? 56 : 48,
          bgcolor: '#f8f9fa',
          borderRadius: 0,
          color: '#212327',
          fontSize: isMobile ? 28 : 22,
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: '#ffc107',
            color: '#ffffff',
            transform: 'scale(1.08)'
          },
          '&:active, &.Mui-focusVisible': {
            bgcolor: '#f8f9fa',
            color: '#212327'
          }
        }}
      >
        <Remove fontSize="inherit" />
      </IconButton>

      <TextField
        value={quantity}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          if (!isNaN(value) && value > 0) setQuantity(value);
        }}
        type="number"
        inputProps={{
          min: 1,
          style: {
            textAlign: 'center',
            padding: isMobile ? '16px 0' : '12px 0',
            fontWeight: 700,
            fontSize: isMobile ? '1.25rem' : '1.1rem',
            color: '#212327',
            MozAppearance: 'textfield'
          }
        }}
        sx={{
          flex: 1,
          mx: 0,
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            bgcolor: '#fff',
            height: isMobile ? 56 : 48,
            '& fieldset': {
              borderLeft: 'none',
              borderRight: 'none',
              borderColor: 'rgba(33,35,39,0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(33,35,39,0.2)'
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ffc107',
              borderWidth: 2
            }
          },
          '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
            WebkitAppearance: 'none',
            margin: 0
          }
        }}
      />

      <IconButton
        onClick={() => setQuantity(quantity + 1)}
        size={isMobile ? 'large' : 'medium'}
        sx={{
          flex: isMobile ? '0 0 56px' : 'none',
          height: isMobile ? 56 : 48,
          width: isMobile ? 56 : 48,
          bgcolor: '#f8f9fa',
          borderRadius: 0,
          color: '#212327',
          fontSize: isMobile ? 28 : 22,
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: '#ffc107',
            color: '#ffffff',
            transform: 'scale(1.08)'
          },
          '&:active, &.Mui-focusVisible': {
            bgcolor: '#f8f9fa',
            color: '#212327'
          }
        }}
      >
        <Add fontSize="inherit" />
      </IconButton>
    </Box>
  );
};

export default QuantitySelector;