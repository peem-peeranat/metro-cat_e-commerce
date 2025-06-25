import { useEffect, useState, useCallback, useRef } from 'react';
import {
  Container,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  IconButton,
  Drawer,
  Fab,
  Snackbar
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';

import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { fetchProducts } from '../../api/productService';
import { sortProducts } from '../../components/FunctionsFillter';
import FilterControls from './components/FilterControls';
import { useLocation } from 'react-router-dom';
import SidebarFilter from './components/SidebarFilter';
import ActiveFilters from './components/ActiveFilters';
import ProductSection from './components/ProductSection';
import HeroSection from './components/HeroSection';

const PRODUCTS_PER_PAGE = 16;

const Home = () => {
  // state หลักสำหรับสินค้าและการกรอง/เรียงลำดับ
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  // state สำหรับ mobile
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [mobileHasMore, setMobileHasMore] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);

  // state สำหรับ desktop
  const [allProducts, setAllProducts] = useState([]);

  // state สำหรับ snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // ตรวจสอบขนาดหน้าจอ
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const location = useLocation();
  const homeContentRef = useRef(null);

  // โหลดข้อมูลสินค้า (Mobile/PC)
  useEffect(() => {
    let ignore = false;
    const loadData = async () => {
      setLoading(true);
      try {
        if (isMobile) {
          // ถ้ามีการค้นหา
          if (location.state && location.state.searchedProducts) {
            let products = location.state.searchedProducts;
            if (sort) products = sortProducts([...products], sort);
            setMobileProducts(products);
            setTotalProducts(products.length);
            setMobileHasMore(false);
            setPage(1);
            setTimeout(() => {
              const el = document.getElementById('home-content');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              // เคลียร์ location.state หลังใช้เสร็จ
              window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
            }, 100);
          } else {
            // โหลดสินค้าหน้าแรกสำหรับ mobile
            const skip = 0;
            const data = await fetchProducts(category, PRODUCTS_PER_PAGE, skip);
            let products = data.products;
            if (sort) products = sortProducts([...products], sort);
            if (!ignore) {
              setMobileProducts(products);
              setTotalProducts(data.total);
              setMobileHasMore(products.length < data.total);
              setPage(1);
            }
          }
        } else {
          // Desktop: โหลดสินค้าทั้งหมดแล้ว slice ตามหน้า
          if (location.state && location.state.searchedProducts) {
            let products = location.state.searchedProducts;
            if (sort) products = sortProducts([...products], sort);
            setAllProducts(products);
            setProducts(products.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE));
            setSearchTerm(location.state.searchTerm || '');
            setTotalProducts(products.length);
            setPage(1);
            setTimeout(() => {
              const el = document.getElementById('home-content');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              // เคลียร์ location.state หลังใช้เสร็จ
              window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
            }, 100);
          } else {
            // โหลดสินค้าทั้งหมด (limit 1000)
            const data = await fetchProducts(category, 1000, 0);
            let products = data.products;
            if (sort) products = sortProducts([...products], sort);
            if (!ignore) {
              setAllProducts(products);
              setProducts(products.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE));
              setTotalProducts(products.length);
            }
          }
        }
      } catch (error) { }
      setLoading(false);
    };
    loadData();
    return () => { ignore = true; };
    // eslint-disable-next-line
  }, [category, isMobile, location.state, sort]);

  // เรียงลำดับใหม่เมื่อ sort เปลี่ยน (Mobile/PC)
  useEffect(() => {
    if (sort) {
      if (isMobile) {
        setMobileProducts(prev => sortProducts([...prev], sort));
      } else {
        setProducts(prev => sortProducts([...prev], sort));
      }
    }
    // eslint-disable-next-line
  }, [sort, isMobile]);

  // Desktop: เปลี่ยนหน้า/เรียงลำดับ/slice ใหม่
  useEffect(() => {
    if (!isMobile && allProducts.length > 0) {
      let sorted = sort ? sortProducts([...allProducts], sort) : [...allProducts];
      setProducts(sorted.slice((page - 1) * PRODUCTS_PER_PAGE, page * PRODUCTS_PER_PAGE));
    }
    // eslint-disable-next-line
  }, [page, sort, allProducts, isMobile]);

  // โหลดสินค้าหน้าใหม่เมื่อกดปุ่ม Load more (Mobile)
  const handleLoadMore = useCallback(async () => {
    setLoadMoreLoading(true);
    try {
      const skip = mobileProducts.length;
      const data = await fetchProducts(category, PRODUCTS_PER_PAGE, skip);
      setMobileProducts(prev => [...prev, ...data.products]);
      setMobileHasMore(mobileProducts.length + data.products.length < totalProducts);
    } catch (error) { }
    setLoadMoreLoading(false);
    // eslint-disable-next-line
  }, [category, mobileProducts, totalProducts]);

  // ฟังก์ชันเมื่อเพิ่มสินค้าลงตะกร้าสำเร็จ
  const handleAddToCartSuccess = () => {
    setOpenSnackbar(true);
  };

  // ฟังก์ชันปิด snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  // ฟังก์ชัน scroll ไปยังสินค้าเมื่อกด Shop Now
  const handleShopNowClick = () => {
    if (homeContentRef.current) {
      homeContentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ฟังก์ชันเปลี่ยนหมวดหมู่สินค้า (reset page = 1 ทุกครั้ง)
  const handleSetCategory = (cat) => {
    setCategory(cat);
    setPage(1);
  };
  // ฟังก์ชันเปลี่ยนการเรียงลำดับ (reset page = 1 ทุกครั้ง)
  const handleSetSort = (sortValue) => {
    setSort(sortValue);
    setPage(1);
  };

  return (
    <Box>
      {/* ส่วน Hero ด้านบน */}
      <HeroSection onShopNow={handleShopNowClick} />
      <Container
        id="home-content"
        ref={homeContentRef}
        maxWidth="xl"
        sx={{ py: 14, position: 'relative', minHeight: '80vh' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            alignItems: 'flex-start',
            width: '100%',
          }}>
          {/* Sidebar Filter (Desktop) */}
          {!isMobile && (
            <SidebarFilter
              category={category}
              setCategory={handleSetCategory}
              sort={sort}
              setSort={handleSetSort}
            />
          )}

          {/* ส่วนแสดงสินค้า */}
          <Box sx={{ flex: 1, width: '100%' }}>
            <ActiveFilters
              category={category}
              setCategory={handleSetCategory}
              sort={sort}
              setSort={handleSetSort}
            />
            <ProductSection
              loading={loading}
              isMobile={isMobile}
              isTablet={isTablet}
              products={products}
              mobileProducts={mobileProducts}
              mobileHasMore={mobileHasMore}
              loadMoreLoading={loadMoreLoading}
              handleLoadMore={handleLoadMore}
              totalProducts={totalProducts}
              PRODUCTS_PER_PAGE={PRODUCTS_PER_PAGE}
              page={page}
              setPage={setPage}
              searchTerm={searchTerm}
              onAddToCartSuccess={handleAddToCartSuccess}
            />
          </Box>
        </Box>

        {/* ปุ่มเปิดฟิลเตอร์ (Mobile) */}
        {isMobile && (
          <>
            <Fab
              color="primary"
              aria-label="filter"
              onClick={() => setMobileFilterOpen(true)}
              sx={{
                position: 'fixed',
                bottom: 32,
                right: 32,
                background: '#ffc107',
                color: '#212327',
                boxShadow: '0 4px 16px rgba(33,35,39,0.15)',
                zIndex: 2000,
                '&:hover': { background: '#ffb300' }
              }}
            >
              <FilterListIcon />
            </Fab>
            <Drawer
              anchor="bottom"
              open={mobileFilterOpen}
              onClose={() => setMobileFilterOpen(false)}
              PaperProps={{
                sx: {
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  p: 3,
                  minHeight: '40vh',
                  maxHeight: '80vh',
                  background: '#fff',
                }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Product filter</Typography>
                <IconButton onClick={() => setMobileFilterOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <FilterControls
                category={category}
                setCategory={handleSetCategory}
                sort={sort}
                setSort={handleSetSort}
                isMobile={true}
              />
            </Drawer>
          </>
        )}

        {/* Snackbar แจ้งเตือนเมื่อเพิ่มสินค้าสำเร็จ */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'middle', horizontal: 'center' }}
          sx={{
            bottom: 100,
            '& .MuiSnackbarContent-root': {
              boxShadow: '0 8px 32px 0 rgba(33,35,39,0.12)',
              borderRadius: 3,
              minWidth: 320,
              maxWidth: 400,
              p: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            Added products to cart!
          </MuiAlert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Home;