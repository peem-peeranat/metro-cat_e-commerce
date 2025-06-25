import { useState, useMemo } from 'react';
import {
  Container,
  Box,
  Typography,
  useMediaQuery,
  createTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartEmptyState from './components/CartEmptyState';
import CartItemsList from './components/CartItemsList';
import CartBottomBar from './components/CartBottomBar';

// กำหนดธีมสำหรับ breakpoint (ใช้กับ useMediaQuery)
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const CartPage = () => {
  // ดึงข้อมูลตะกร้าและฟังก์ชันที่เกี่ยวข้องจาก context
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();
  // state สำหรับเก็บ id ของสินค้าที่ถูกเลือก
  const [selectedItems, setSelectedItems] = useState(new Set());
  const navigate = useNavigate();
  // ตรวจสอบว่าเป็น mobile หรือไม่
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // คำนวณยอดรวมและจำนวนสินค้าที่ถูกเลือก
  const { selectedTotal, selectedCount } = useMemo(() => {
    const selectedCartItems = cart.filter(item => selectedItems.has(item.id));
    const total = selectedCartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const count = selectedCartItems.reduce((sum, item) => sum + item.quantity, 0);
    return { selectedTotal: total, selectedCount: count };
  }, [cart, selectedItems]);

  // เลือกหรือยกเลิกเลือกสินค้าทั้งหมด
  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedItems(new Set(cart.map(item => item.id)));
    } else {
      setSelectedItems(new Set());
    }
  };

  // เลือกหรือยกเลิกเลือกสินค้าทีละชิ้น
  const handleSelectItem = (itemId) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(itemId)) {
      newSelectedItems.delete(itemId);
    } else {
      newSelectedItems.add(itemId);
    }
    setSelectedItems(newSelectedItems);
  };

  // ไปหน้าชำระเงิน พร้อมส่งข้อมูลสินค้าที่เลือกไปด้วย
  const handleCheckout = () => {
    navigate('/checkout', {
      state: {
        selectedItems: Array.from(selectedItems),
        selectedCartItems: cart.filter(item => selectedItems.has(item.id))
      }
    });
  };

  // เช็คว่ามีการเลือกสินค้าทั้งหมดหรือไม่
  const isAllSelected = cart.length > 0 && selectedItems.size === cart.length;
  // เช็คว่ามีการเลือกบางส่วนหรือไม่
  const isIndeterminate = selectedItems.size > 0 && selectedItems.size < cart.length;

  // ถ้าตะกร้าว่าง ให้แสดงหน้าตะกร้าว่าง
  if (cartCount === 0) {
    return <CartEmptyState />;
  }

  return (
    <Box>
      <Container maxWidth="lg" sx={{ py: isMobile ? 3 : 4 }}>
        {/* หัวข้อหน้าตะกร้า */}
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          gutterBottom
          sx={{
            fontWeight: 600,
            mb: isMobile ? 2 : 3
          }}
        >
          Shopping Cart
        </Typography>
        {/* รายการสินค้าในตะกร้า */}
        <CartItemsList
          cart={cart}
          isMobile={isMobile}
          isAllSelected={isAllSelected}
          isIndeterminate={isIndeterminate}
          selectedItems={selectedItems}
          handleSelectAll={handleSelectAll}
          handleSelectItem={handleSelectItem}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
        />
      </Container>
      {/* แถบสรุปยอดและปุ่มชำระเงินด้านล่าง */}
      <CartBottomBar
        isMobile={isMobile}
        isAllSelected={isAllSelected}
        isIndeterminate={isIndeterminate}
        handleSelectAll={handleSelectAll}
        cart={cart}
        selectedCount={selectedCount}
        selectedTotal={selectedTotal}
        selectedItems={selectedItems}
        handleCheckout={handleCheckout}
      />
    </Box>
  );
};

export default CartPage;