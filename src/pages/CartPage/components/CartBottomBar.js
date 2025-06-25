import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  FormControlLabel,
  Checkbox,
  Container,
  Badge
} from '@mui/material';
import { styled } from '@mui/material/styles';

// ปุ่ม Checkout ที่ตกแต่งด้วย MUI styled
const CheckoutButton = styled(Button)(({ theme }) => ({
  background: '#212327',
  color: '#ffc107',
  border: '2px solid transparent',
  borderRadius: '12px',
  padding: theme.spacing(1.5, 3),
  fontWeight: 'bold',
  textTransform: 'none',
  boxShadow: '0 4px 15px rgba(33, 35, 39, 0.2)',
  transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(45deg, #ffc107 0%, #ffd54f 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: 1
  },
  '&:hover': {
    color: '#212327',
    boxShadow: '0 6px 20px rgba(33, 35, 39, 0.3)',
    transform: 'translateY(-2px)',
    '&:before': {
      opacity: 1
    },
    '& span': {
      position: 'relative',
      zIndex: 2
    }
  },
  '&:active': {
    transform: 'translateY(0)',
    boxShadow: '0 2px 10px rgba(33, 35, 39, 0.2)'
  },
  '&:disabled': {
    background: '#e0e0e0',
    color: '#9e9e9e',
    boxShadow: 'none',
    '&:before': {
      opacity: 0
    }
  }
}));

const CartBottomBar = ({
  isMobile,
  isAllSelected,
  isIndeterminate,
  handleSelectAll,
  cart,
  selectedCount,
  selectedTotal,
  selectedItems,
  handleCheckout
}) => {
  return (
    // แถบด้านล่างของหน้าตะกร้า (แสดงยอดรวม ปุ่มเลือกทั้งหมด และปุ่มชำระเงิน)
    <AppBar
      position="fixed"
      sx={{
        top: 'auto',
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 -4px 25px rgba(33, 35, 39, 0.1)',
        borderTop: '1px solid rgba(33, 35, 39, 0.05)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        transition: 'all 0.3s ease',
        zIndex: 1200
      }}
    >
      <Toolbar sx={{
        minHeight: '80px !important',
        px: { xs: 2, sm: 3 }
      }}>
        <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 1,
            width: '100%'
          }}>
            {/* แสดงปุ่มเลือกสินค้าทั้งหมด (เฉพาะ desktop) */}
            {!isMobile && (
              <Box sx={{ mr: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAllSelected}
                      indeterminate={isIndeterminate}
                      onChange={handleSelectAll}
                      sx={{
                        color: 'rgba(33, 35, 39, 0.7)',
                        '&.Mui-checked': {
                          color: '#ffc107',
                        },
                        '&.MuiCheckbox-indeterminate': {
                          color: '#ffc107',
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(255, 193, 7, 0.1)'
                        }
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body1"
                      sx={{
                        color: '#212327',
                        fontWeight: 600,
                        ml: 1,
                        fontSize: '0.95rem',
                        letterSpacing: '0.02em'
                      }}
                    >
                      Select All ({cart.length} items)
                    </Typography>
                  }
                  sx={{
                    '& .MuiFormControlLabel-label': {
                      transition: 'color 0.2s ease'
                    },
                    '&:hover .MuiFormControlLabel-label': {
                      color: '#ffc107'
                    }
                  }}
                />
              </Box>
            )}

            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? 2 : 4,
              flex: 1,
              justifyContent: isMobile ? 'space-between' : 'flex-end'
            }}>
              {/* แสดงจำนวนที่เลือกและยอดรวม */}
              <Box sx={{
                textAlign: isMobile ? 'left' : 'right',
                transition: 'all 0.3s ease'
              }}>
                <Typography
                  variant={isMobile ? 'body2' : 'body1'}
                  sx={{
                    color: '#212327',
                    fontWeight: isMobile ? 500 : 600,
                    lineHeight: 1.2,
                    fontSize: isMobile ? '0.85rem' : '0.95rem',
                    letterSpacing: '0.03em',
                    opacity: 0.9
                  }}
                >
                  Selected: {selectedCount} {selectedCount === 1 ? 'item' : 'items'}
                </Typography>
                <Typography
                  variant={isMobile ? 'body1' : 'h6'}
                  sx={{
                    color: '#212327',
                    fontWeight: 700,
                    fontSize: isMobile ? '1.15rem' : '1.35rem',
                    lineHeight: 1.2,
                    mt: 0.5,
                    background: 'linear-gradient(45deg, #212327 0%, #424242 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    textFillColor: 'transparent',
                    display: 'inline-block'
                  }}
                >
                  ${selectedTotal.toFixed(2)}
                </Typography>
              </Box>

              {/* ปุ่ม Checkout พร้อม Badge แสดงจำนวนที่เลือก */}
              <Badge
                badgeContent={selectedItems.size}
                color="primary"
                overlap="circular"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#ffc107',
                    color: '#212327',
                    fontWeight: 'bold',
                    right: -5,
                    top: -5,
                    minWidth: '24px',
                    height: '24px',
                    borderRadius: '12px'
                  }
                }}
              >
                <CheckoutButton
                  onClick={handleCheckout}
                  size={isMobile ? 'medium' : 'large'}
                  disabled={selectedItems.size === 0}
                  sx={{
                    minWidth: isMobile ? '140px' : '180px',
                    fontSize: isMobile ? '0.95rem' : '1.05rem',
                    letterSpacing: '0.03em'
                  }}
                >
                  <span>
                    {isMobile ? 'Checkout' : 'Proceed to Checkout'}
                  </span>
                </CheckoutButton>
              </Badge>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default CartBottomBar;