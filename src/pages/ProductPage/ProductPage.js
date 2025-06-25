import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, useTheme, useMediaQuery, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useCart } from '../../context/CartContext';
import LoadingState from './components/LoadingState';
import ProductImageGallery from './components/ProductImageGallery';
import ProductInfo from './components/ProductInfo';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const ProductPage = () => {
  // รับ id สินค้าจาก url
  const { id } = useParams();
  // ฟังก์ชันดึงข้อมูลสินค้าและ state โหลด
  const { fetchProduct, loadingProducts } = useCart();
  // state สำหรับเก็บข้อมูลสินค้า
  const [product, setProduct] = useState(null);
  // state สำหรับแสดง snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // ตรวจสอบขนาดหน้าจอ
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  // ใช้สำหรับเปลี่ยนหน้า
  const navigate = useNavigate();

  // โหลดข้อมูลสินค้าเมื่อ id เปลี่ยน
  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProduct(id);
      setProduct(data);
    };
    loadProduct();
  }, [id, fetchProduct]);

  // ฟังก์ชันเรียกเมื่อเพิ่มสินค้าลงตะกร้าสำเร็จ
  const handleAddToCartSuccess = () => {
    setOpenSnackbar(true);
  };

  // ฟังก์ชันปิด snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  // แสดง loading ขณะโหลดสินค้า
  if (loadingProducts[id]) {
    return <LoadingState isMobile={isMobile} />;
  }

  // ถ้าไม่พบสินค้า
  if (!product) {
    return (
      <Container maxWidth="lg" sx={{
        py: 10,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        backgroundColor: '#ffffff'
      }}>
        <Typography variant={isMobile ? 'h6' : 'h5'} sx={{
          color: '#212327',
          fontWeight: 500
        }}>
          No products found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{
      py: isMobile ? 3 : 6,
      px: isMobile ? 2 : 4,
      backgroundColor: '#ffffff',
      transition: 'all 0.3s ease'
    }}>
      {/* ปุ่มย้อนกลับ */}
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          mb: 3,
          color: '#bdbdbd',
          background: 'rgba(245, 245, 245, 0.7)',
          borderRadius: '50%',
          boxShadow: '0 2px 8px 0 rgba(33,35,39,0.06)',
          border: '1px solid #eeeeee',
          backdropFilter: 'blur(2px)',
          transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
          '&:hover': {
            background: 'rgba(255, 193, 7, 0.12)',
            color: '#ffc107',
            boxShadow: '0 4px 16px 0 rgba(255,193,7,0.10)',
            borderColor: '#ffe082'
          }
        }}
        aria-label="ย้อนกลับ"
      >
        <ArrowBackIcon sx={{ fontSize: 28 }} />
      </IconButton>
      <Box sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: '100%',
        overflow: 'hidden',
      }}>
        {/* แสดงรูปสินค้า */}
        <ProductImageGallery
          product={product}
          isMobile={isMobile}
        />
        {/* แสดงรายละเอียดสินค้า */}
        <ProductInfo
          product={product}
          isMobile={isMobile}
          onAddToCartSuccess={handleAddToCartSuccess}
        />
      </Box>
      {/* Snackbar แจ้งเตือนเมื่อเพิ่มสินค้าลงตะกร้าสำเร็จ */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'middle', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            boxShadow: '0 8px 32px 0 rgba(33,35,39,0.12)',
            borderRadius: 3,
            minWidth: 320,
            maxWidth: 400,
            p: 0,
          }
        }}
      >
        <MuiAlert
          elevation={8}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{
            fontWeight: 700,
            fontSize: 20,
            borderRadius: 3,
            px: 4,
            py: 2,
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(90deg, #ffe082 0%, #ffc107 100%)',
            color: '#212327',
            boxShadow: '0 4px 24px 0 rgba(255,193,7,0.18)',
            letterSpacing: 0.5,
            textAlign: 'center',
            minWidth: 0,
          }}
        >
          Added products to cart!
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default ProductPage;