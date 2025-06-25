import {
  Box,
  Checkbox,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  IconButton
} from '@mui/material';
import { Delete, Add, Remove } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// ปุ่มเพิ่ม/ลดจำนวนสินค้าในตะกร้า
const QuantityButton = styled(IconButton)(({ theme }) => ({
  border: '1px solid #ffc107',
  color: '#212327',
  padding: theme.spacing(0.5),
  '&:hover': {
    backgroundColor: '#ffc107',
    color: '#212327'
  },
  '&:disabled': {
    borderColor: '#e0e0e0',
    color: '#bdbdbd'
  }
}));

// ปุ่มลบสินค้าออกจากตะกร้า
const DeleteButton = styled(IconButton)(({ theme }) => ({
  color: '#f44336',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(244, 67, 54, 0.08)',
    transform: 'scale(1.1)'
  }
}));

const CartItemsList = ({
  cart,
  isMobile,
  isAllSelected,
  isIndeterminate,
  selectedItems,
  handleSelectAll,
  handleSelectItem,
  updateQuantity,
  removeFromCart
}) => {
  const navigate = useNavigate();

  // ไปยังหน้ารายละเอียดสินค้า
  const handleGoToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  // แสดงแบบ mobile
  if (isMobile) {
    return (
      <Box sx={{ px: 1 }}>
        {/* แถบเลือกสินค้าทั้งหมด */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 2,
          p: 1,
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
          <Checkbox
            checked={isAllSelected}
            indeterminate={isIndeterminate}
            onChange={handleSelectAll}
            sx={{
              color: '#212327',
              '&.Mui-checked': {
                color: '#ffc107',
              },
              '&.MuiCheckbox-indeterminate': {
                color: '#ffc107',
              }
            }}
            size="small"
          />
          <Typography variant="body2" sx={{ color: '#212327', fontWeight: 500 }}>
            Select all ({cart.length})
          </Typography>
        </Box>

        {/* รายการสินค้าแต่ละชิ้น */}
        {cart.map((item) => (
          <Paper
            key={item.id}
            sx={{
              mb: 2,
              p: 1.5,
              position: 'relative',
              border: selectedItems.has(item.id) ? '2px solid #ffc107' : '1px solid rgba(33, 35, 39, 0.1)',
              borderRadius: '12px',
              backgroundColor: '#ffffff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              {/* เช็คบ็อกซ์เลือกสินค้า */}
              <Checkbox
                checked={selectedItems.has(item.id)}
                onChange={() => handleSelectItem(item.id)}
                sx={{
                  color: '#212327',
                  '&.Mui-checked': {
                    color: '#ffc107',
                  },
                  ml: 0.5,
                  mr: 1.5,
                }}
                size="small"
              />

              {/* รูปสินค้า */}
              <img
                src={item.thumbnail}
                alt={item.title}
                style={{
                  width: '64px',
                  height: '64px',
                  objectFit: 'contain',
                  marginRight: '10px',
                  borderRadius: '8px',
                  border: '1px solid rgba(33, 35, 39, 0.1)',
                  cursor: 'pointer'
                }}
                onClick={() => handleGoToProduct(item.id)}
              />

              {/* ข้อมูลสินค้า */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body1"
                  fontWeight="600"
                  sx={{
                    mb: 0.5,
                    color: '#212327',
                    fontSize: '1rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                    cursor: 'pointer'
                  }}
                  title={item.title}
                  onClick={() => handleGoToProduct(item.id)}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    color: '#212327',
                    opacity: 0.8,
                    fontSize: '0.95rem'
                  }}
                >
                  ${item.price.toFixed(2)}
                </Typography>

                {/* ปุ่มเพิ่ม/ลดจำนวนสินค้า */}
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mt: 0.5
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <QuantityButton
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      size="small"
                      disabled={item.quantity <= 1}
                    >
                      <Remove fontSize="small" />
                    </QuantityButton>
                    <Typography
                      sx={{
                        mx: 1,
                        minWidth: '22px',
                        textAlign: 'center',
                        fontWeight: 500,
                        color: '#212327',
                        fontSize: '1rem'
                      }}
                    >
                      {item.quantity}
                    </Typography>
                    <QuantityButton
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      size="small"
                    >
                      <Add fontSize="small" />
                    </QuantityButton>
                  </Box>

                  {/* ราคารวมต่อชิ้น */}
                  <Typography
                    variant="body1"
                    fontWeight="600"
                    sx={{ color: '#212327', fontSize: '1rem', ml: 1 }}
                  >
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </Box>
              </Box>

              {/* ปุ่มลบสินค้า */}
              <DeleteButton
                onClick={() => removeFromCart(item.id)}
                size="small"
                sx={{
                  position: 'absolute',
                  top: '50%',
                  right: 8,
                  transform: 'translateY(-50%)'
                }}
              >
                <Delete fontSize="small" />
              </DeleteButton>
            </Box>
          </Paper>
        ))}
      </Box>
    );
  }

  // แสดงแบบ desktop (table)
  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        border: '1px solid rgba(33, 35, 39, 0.1)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}
    >
      <Table>
        <TableHead
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 2,
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
          }}
        >
          <TableRow sx={{
            '& th': {
              color: '#212327',
              fontWeight: 600,
              fontSize: '0.875rem',
              backgroundColor: '#fff'
            }
          }}>
            <TableCell padding="checkbox" sx={{ width: '48px' }}>
              <Checkbox
                checked={isAllSelected}
                indeterminate={isIndeterminate}
                onChange={handleSelectAll}
                sx={{
                  color: '#212327',
                  '&.Mui-checked': {
                    color: '#ffc107',
                  },
                  '&.MuiCheckbox-indeterminate': {
                    color: '#ffc107',
                  }
                }}
              />
            </TableCell>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
            <TableCell align="right" sx={{ width: '64px' }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((item) => (
            <TableRow
              key={item.id}
              sx={{
                backgroundColor: selectedItems.has(item.id) ? 'rgba(255, 193, 7, 0.08)' : '#ffffff',
                '&:hover': {
                  backgroundColor: selectedItems.has(item.id) ? 'rgba(255, 193, 7, 0.12)' : 'rgba(33, 35, 39, 0.02)'
                },
                transition: 'background-color 0.3s ease'
              }}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedItems.has(item.id)}
                  onChange={() => handleSelectItem(item.id)}
                  sx={{
                    color: '#212327',
                    '&.Mui-checked': {
                      color: '#ffc107',
                    }
                  }}
                />
              </TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {/* รูปสินค้า */}
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain',
                      marginRight: '16px',
                      borderRadius: '8px',
                      border: '1px solid rgba(33, 35, 39, 0.1)',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleGoToProduct(item.id)}
                  />
                  <Box>
                    {/* ชื่อสินค้า */}
                    <Typography
                      variant="body1"
                      fontWeight="600"
                      sx={{ color: '#212327', cursor: 'pointer' }}
                      onClick={() => handleGoToProduct(item.id)}
                    >
                      {item.title}
                    </Typography>
                    {/* คำอธิบายสินค้า */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#212327',
                        opacity: 0.7,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        maxWidth: 260
                      }}
                    >
                      {item.description}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" fontWeight="600" sx={{ color: '#212327' }}>
                  ${item.price.toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell align="center">
                {/* ปุ่มเพิ่ม/ลดจำนวนสินค้า */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <QuantityButton
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    size="small"
                    disabled={item.quantity <= 1}
                  >
                    <Remove />
                  </QuantityButton>
                  <Typography
                    sx={{
                      mx: 2,
                      minWidth: '30px',
                      textAlign: 'center',
                      fontWeight: 500,
                      color: '#212327'
                    }}
                  >
                    {item.quantity}
                  </Typography>
                  <QuantityButton
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    size="small"
                  >
                    <Add />
                  </QuantityButton>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Typography variant="body1" fontWeight="600" sx={{ color: '#212327' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell align="right">
                {/* ปุ่มลบสินค้า */}
                <DeleteButton
                  onClick={() => removeFromCart(item.id)}
                  size="small"
                >
                  <Delete />
                </DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartItemsList;