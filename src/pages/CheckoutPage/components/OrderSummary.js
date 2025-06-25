import {
  Box,
  List,
  ListItem,
  Card,
  CardContent,
  Avatar,
  Typography,
  Button,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';

// สรุปรายการสินค้าที่เลือกซื้อและยอดรวม
const OrderSummary = ({ selectedCartItems, selectedTotal, handleSubmit }) => {
  return (
    <Box sx={{
      width: { xs: '100%', md: '350px' },
      position: { md: 'sticky' },
      top: 16,
      alignSelf: 'flex-start'
    }}>
      <Card elevation={0} sx={{
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        boxShadow: '0 4px 20px rgba(33, 35, 39, 0.08)',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(33, 35, 39, 0.12)'
        }
      }}>
        <CardContent>
          {/* หัวข้อสรุปรายการ */}
          <Typography variant="h6" gutterBottom sx={{
            fontWeight: '600',
            color: '#212327',
            fontSize: '1.25rem',
            mb: 2,
            pb: 1,
            borderBottom: '2px solid #ffc107',
            display: 'inline-block'
          }}>
            Order Summary ({selectedCartItems.length} items)
          </Typography>

          {/* รายการสินค้าแต่ละชิ้น */}
          <List sx={{ mb: 2 }}>
            {selectedCartItems.map((item) => (
              <ListItem
                key={item.id}
                sx={{
                  py: 1.5,
                  px: 0,
                  display: 'flex',
                  justifyContent: 'space-between',
                  '&:not(:last-child)': {
                    borderBottom: '1px solid rgba(33, 35, 39, 0.08)'
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <Avatar
                    variant="square"
                    src={item.thumbnail}
                    sx={{
                      width: 56,
                      height: 56,
                      mr: 2,
                      borderRadius: '8px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{
                      fontWeight: 600,
                      color: '#212327'
                    }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{
                      color: '#6c757d',
                      fontSize: '0.875rem'
                    }}>
                      ${item.price} × {item.quantity}
                    </Typography>
                  </Box>
                </Box>
                <Typography sx={{
                  mr: 1,
                  fontWeight: 600,
                  color: '#212327'
                }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </ListItem>
            ))}
          </List>

          {/* สรุปยอดรวม/ค่าส่ง/ภาษี */}
          <Divider sx={{
            my: 2,
            borderColor: 'rgba(33, 35, 39, 0.1)'
          }} />

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            mb: 2
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#6c757d' }}>Subtotal</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>${selectedTotal.toFixed(2)}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#6c757d' }}>Shipping</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>Free</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="body2" sx={{ color: '#6c757d' }}>Tax</Typography>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>$0.00</Typography>
            </Box>
          </Box>

          <Divider sx={{
            my: 2,
            borderColor: 'rgba(33, 35, 39, 0.1)'
          }} />

          {/* ยอดรวมสุทธิ */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mb: 3,
            alignItems: 'center'
          }}>
            <Typography variant="subtitle1" sx={{
              fontWeight: '700',
              fontSize: '1.125rem',
              color: '#212327'
            }}>
              Total
            </Typography>
            <Typography variant="subtitle1" sx={{
              fontWeight: '700',
              fontSize: '1.25rem',
              color: '#212327'
            }}>
              ${selectedTotal.toFixed(2)}
            </Typography>
          </Box>

          {/* ปุ่มยืนยันสั่งซื้อ */}
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleSubmit}
            disabled={selectedCartItems.length === 0}
            sx={{
              backgroundColor: '#ffc107',
              color: '#212327',
              fontWeight: '600',
              py: 1.5,
              borderRadius: '8px',
              boxShadow: 'none',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: '#ffca28',
                boxShadow: '0 4px 12px rgba(255, 193, 7, 0.3)'
              },
              '&:disabled': {
                backgroundColor: '#e0e0e0',
                color: '#9e9e9e'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Place Order
          </Button>

          {/* ปุ่มกลับไปหน้าตะกร้า */}
          <Button
            component={Link}
            to="/cart"
            variant="outlined"
            fullWidth
            size="large"
            sx={{
              mt: 2,
              py: 1.5,
              borderColor: '#e0e0e0',
              color: '#212327',
              fontWeight: '600',
              borderRadius: '8px',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                borderColor: '#ffc107',
                backgroundColor: 'rgba(255, 193, 7, 0.08)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Back to Cart
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderSummary;