import { Box, Typography, Button, CircularProgress } from '@mui/material';
import ProductGrid from './ProductGrid';
import Pagination from '@mui/material/Pagination';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';

// ส่วนแสดงรายการสินค้าและการจัดการโหลด/เปลี่ยนหน้า
const ProductSection = ({
  loading, isMobile, isTablet,
  products, mobileProducts, mobileHasMore, loadMoreLoading,
  handleLoadMore, totalProducts, PRODUCTS_PER_PAGE, page, setPage, searchTerm, onAddToCartSuccess
}) => {
  // แสดง loading ขณะดึงข้อมูล
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress size={60} thickness={4} sx={{ color: '#ffc107' }} />
      </Box>
    );
  }

  // แสดงผลสำหรับ Mobile
  if (isMobile) {
    // ถ้าไม่มีสินค้า
    if (mobileProducts.length === 0) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="50vh"
        >
          <SentimentDissatisfiedIcon sx={{ fontSize: 64, color: '#ffc107', mb: 2 }} />
          <Typography variant="h5" sx={{ color: '#212327', fontWeight: 700, mb: 1 }}>
            No products found
          </Typography>
          <Typography variant="body1" sx={{ color: '#757575', textAlign: 'center' }}>
            {searchTerm
              ? <>Sorry, no products match <b>"{searchTerm}"</b>.<br />Please try searching again.</>
              : 'Sorry, no products found. Please try again.'}
          </Typography>
        </Box>
      );
    }
    // แสดงสินค้าและปุ่มโหลดเพิ่ม (ถ้ามี)
    return (
      <>
        <ProductGrid
          products={mobileProducts}
          isMobile={isMobile}
          isTablet={isTablet}
          onAddToCartSuccess={onAddToCartSuccess}
        />
        {mobileHasMore && (
          <Box display="flex" justifyContent="center" mt={3}>
            <Button
              variant="contained"
              sx={{
                background: '#ffc107',
                color: '#212327',
                fontWeight: 700,
                borderRadius: 8,
                px: 4,
                py: 1.5,
                '&:hover': { background: '#ffb300' }
              }}
              onClick={handleLoadMore}
              disabled={loadMoreLoading}
            >
              {loadMoreLoading ? 'Loading...' : 'Load more'}
            </Button>
          </Box>
        )}
      </>
    );
  }

  // แสดงผลสำหรับ Desktop
  if (products.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <SentimentDissatisfiedIcon sx={{ fontSize: 64, color: '#ffc107', mb: 2 }} />
        <Typography variant="h5" sx={{ color: '#212327', fontWeight: 700, mb: 1 }}>
          No products found
        </Typography>
        <Typography variant="body1" sx={{ color: '#757575', textAlign: 'center' }}>
          {searchTerm
            ? <>Sorry, no products match <b>"{searchTerm}"</b>.<br />Please try searching again.</>
            : 'Sorry, no products found. Please try again.'}
        </Typography>
      </Box>
    );
  }
  // แสดงสินค้าและ Pagination (ถ้ามีหลายหน้า)
  return (
    <>
      <ProductGrid
        products={products}
        isMobile={isMobile}
        isTablet={isTablet}
        onAddToCartSuccess={onAddToCartSuccess}
      />
      {totalProducts > PRODUCTS_PER_PAGE && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={Math.ceil(totalProducts / PRODUCTS_PER_PAGE)}
            page={page}
            onChange={(_, value) => {
              setPage(value);
              const el = document.getElementById('home-content');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            color="primary"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                color: '#212327', // สีตัวเลข
                fontWeight: 700,
                backgroundColor: 'transparent',
                '&.Mui-selected': {
                  backgroundColor: '#ffc107',
                  color: '#212327',
                },
                '&:hover': {
                  backgroundColor: '#ffe082',
                },
              },
            }}
          />
        </Box>
      )}
    </>
  );
};

export default ProductSection;