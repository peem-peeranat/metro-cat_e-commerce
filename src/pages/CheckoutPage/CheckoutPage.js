import { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Container, Box, Typography } from '@mui/material';
import CheckoutForm from './components/CheckoutForm';
import OrderSummary from './components/OrderSummary';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { removeItemsFromCart } = useCart();
  // รับข้อมูลสินค้าที่เลือกมาจาก state (ถ้าไม่มีให้เป็น array ว่าง)
  const { selectedCartItems = [] } = location.state || {};

  // state สำหรับเก็บข้อมูลฟอร์ม
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    email: '',
    phone: '',
    paymentMethod: 'credit',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  // state สำหรับ error ของแต่ละ field
  const [errors, setErrors] = useState({});

  // ref สำหรับแต่ละ input field (ใช้ scroll/focus ไปยัง error)
  const fieldRefs = {
    firstName: useRef(),
    lastName: useRef(),
    address: useRef(),
    city: useRef(),
    state: useRef(),
    zipCode: useRef(),
    country: useRef(),
    email: useRef(),
    phone: useRef(),
    paymentMethod: useRef(),
    cardNumber: useRef(),
    expiry: useRef(),
    cvv: useRef(),
  };

  // คำนวณยอดรวมราคาสินค้าที่เลือก
  const selectedTotal = selectedCartItems.reduce(
    (sum, item) => sum + (item.price * item.quantity),
    0
  );

  // อัพเดทค่าในฟอร์มเมื่อกรอกข้อมูล
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ไฮไลต์ input ที่ error (เปลี่ยน box-shadow ชั่วคราว)
  const highlightField = (ref) => {
    if (!ref?.current) return;
    const el = ref.current;
    const originalBoxShadow = el.style.boxShadow;
    el.style.transition = 'box-shadow 0.4s';
    el.style.boxShadow = '0 0 0 4px #ffe082';
    setTimeout(() => {
      el.style.boxShadow = originalBoxShadow;
    }, 1200);
  };

  // ตรวจสอบความถูกต้องของข้อมูลในฟอร์ม
  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone) newErrors.phone = 'Phone is required';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment method is required';

    // ตรวจสอบข้อมูลบัตรถ้าเลือกจ่ายด้วยบัตร
    if (formData.paymentMethod === 'credit' || formData.paymentMethod === 'debit') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiry) newErrors.expiry = 'Expiration date is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
    }
    setErrors(newErrors);

    // ถ้ามี error ให้ scroll/focus ไปยัง field แรกที่ error
    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      const ref = fieldRefs[firstErrorKey];
      if (ref && ref.current) {
        ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        highlightField(ref);
        setTimeout(() => {
          ref.current.focus && ref.current.focus();
        }, 600);
      }
      return false;
    }
    return true;
  };

  // เมื่อ submit ฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // ลบสินค้าที่ซื้อออกจากตะกร้า
        const purchasedProductIds = selectedCartItems.map(item => item.id);
        removeItemsFromCart(purchasedProductIds);
        navigate('/order-success');
      } catch (error) {
        console.error('Order submission failed:', error);
        alert('There was an error processing your order. Please try again.');
      }
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* หัวข้อหน้า Checkout */}
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Checkout
      </Typography>

      {/* กล่องแบ่งซ้าย-ขวา: ฟอร์มกรอกข้อมูล กับสรุปรายการสินค้า */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4
      }}>
        <CheckoutForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          fieldRefs={fieldRefs}
        />
        <Box sx={{ height: '100%' }}>
          <OrderSummary
            selectedCartItems={selectedCartItems}
            selectedTotal={selectedTotal}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default CheckoutPage;