import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  TextField,
  InputAdornment,
  Box,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery,
  alpha
} from '@mui/material';
import {
  ShoppingCart,
  Search,
  Menu as MenuIcon,
  Close
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { searchProducts } from '../api/productService';

const Navbar = () => {
  const { cartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // เปิดเมนู (ใช้กับ mobile)
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // ปิดเมนู (ใช้กับ mobile)
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // ฟังก์ชันค้นหาสินค้า เมื่อกด Enter หรือกดปุ่มค้นหา
  const handleSearch = async (e) => {
    e.preventDefault();
    const query = searchQuery.trim();

    if (query) {
      try {
        const data = await searchProducts(query);

        // นำผลลัพธ์การค้นหาไปแสดงที่หน้า Home
        navigate('/', {
          state: {
            searchedProducts: data.products,
            searchTerm: query
          },
          replace: true
        });

        setSearchQuery('');
        handleMenuClose(); // ปิดเมนูหลังค้นหา (สำคัญสำหรับ mobile)
      } catch (error) {
        // ถ้าค้นหา error ให้แสดงผลลัพธ์ว่าง
        console.error('Error searching products:', error);
        navigate('/', {
          state: {
            searchedProducts: [],
            searchTerm: query
          },
          replace: true
        });
        handleMenuClose();
      }
    }
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: '#212327',
        color: '#ffffff',
        borderBottom: 'none',
        backdropFilter: 'blur(8px)',
        background: alpha('#212327', 0.95),
        transition: 'all 0.3s ease-in-out'
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: { xs: 1.5, sm: 1.2 },
          px: { xs: 2, sm: 3, md: 4 },
          maxWidth: '1440px',
          margin: '0 auto',
          width: '100%',
          gap: { xs: 1, sm: 3, md: 4 },
          minHeight: { xs: 64, sm: 72 },
        }}
      >
        {/* โลโก้เว็บไซต์ คลิกแล้ว reload หน้าใหม่ */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            minWidth: { xs: 0, sm: '90px' },
            justifyContent: { xs: 'flex-start', md: 'center' },
            mr: { xs: 0.5, sm: 2, md: 0 }
          }}
        >
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{
              textDecoration: 'none',
              color: '#ffc107',
              fontWeight: { xs: 700, sm: 800 },
              fontSize: { xs: '0.8rem', sm: '1.3rem', md: '1.6rem' },
              letterSpacing: '-0.5px',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              '&:hover': {
                color: '#ffd54f',
                transform: 'scale(1.02)',
                transition: 'all 0.2s ease'
              }
            }}
          >
            METRO CAT
          </Typography>
        </Box>

        {/* ช่องค้นหาสินค้า */}
        <Box
          component="form"
          onSubmit={handleSearch}
          sx={{
            flexGrow: 1,
            flexBasis: { xs: '1%', sm: 'auto' },
            mx: { xs: 0.5, sm: 2, md: 4 },
            maxWidth: { xs: 'calc(100vw - 110px)', sm: '350px', md: '600px', lg: '800px' },
            minWidth: { xs: '0', sm: '100px' },
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#ffffff99' }} />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <IconButton
                  onClick={() => setSearchQuery('')}
                  size="small"
                  sx={{ p: 0, color: '#ffffff99' }}
                  tabIndex={-1}
                >
                  <Close fontSize="small" />
                </IconButton>
              ),
              sx: {
                borderRadius: '50px',
                backgroundColor: alpha('#ffffff', 0.1),
                color: '#ffffff',
                '& .MuiInputBase-input': {
                  color: '#ffffff',
                  '&::placeholder': {
                    color: '#ffffff99',
                    opacity: 1
                  }
                },
                '&:hover': {
                  backgroundColor: alpha('#ffffff', 0.15)
                },
                '&.Mui-focused': {
                  backgroundColor: alpha('#ffffff', 0.15),
                  boxShadow: `0 0 0 2px ${alpha('#ffc107', 0.3)}`,
                  borderColor: '#ffc107'
                },
                transition: 'all 0.2s ease'
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(e);
              }
            }}
          />
        </Box>

        {/* ไอคอนตะกร้าสินค้า */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 0,
            ml: { xs: 0.2, sm: 1.5, md: 0 }
          }}
        >
          <IconButton
            component={Link}
            to="/cart"
            sx={{
              color: '#ffffff',
              p: { xs: 0.7, sm: 1.2 },
              '&:hover': {
                backgroundColor: alpha('#ffc107', 0.1),
                transform: 'scale(1.1)',
              },
              transition: 'all 0.2s ease'
            }}
          >
            <Badge
              badgeContent={cartCount}
              color="primary"
              overlap="circular"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#ffc107',
                  color: '#212327',
                  right: { xs: -2, sm: -3 },
                  top: { xs: 2, sm: 5 },
                  border: `2px solid #212327`,
                  padding: '0 4px',
                  fontSize: '0.7rem',
                  fontWeight: 'bold'
                }
              }}
            >
              <ShoppingCart
                fontSize={isMobile ? 'medium' : 'large'}
                sx={{ color: '#ffffff' }}
              />
            </Badge>
          </IconButton>
        </Box>

        {/* เมนูสำหรับ mobile */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              width: { xs: '96vw', sm: '340px' },
              maxWidth: '100%',
              mt: 1,
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              borderRadius: '18px',
              backgroundColor: '#212327',
              border: '1px solid #ffffff10',
              overflow: 'hidden',
              mx: { xs: 2, sm: 0 },
              px: { xs: 1.5, sm: 2 },
            }
          }}
        >
          {/* ส่วนหัวของเมนู */}
          <Box sx={{
            p: { xs: 2, sm: 2.5 },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: alpha('#ffc107', 0.9),
            color: '#212327'
          }}>
            <Typography variant="h6" sx={{ fontWeight: { xs: 600, sm: 800 } }}>เมนู</Typography>
            <IconButton
              onClick={handleMenuClose}
              size="small"
              sx={{
                color: '#212327',
                '&:hover': {
                  backgroundColor: alpha('#212327', 0.1)
                }
              }}
            >
              <Close />
            </IconButton>
          </Box>
          <Divider sx={{ borderColor: '#ffffff10' }} />
          {/* เมนูไปหน้าสินค้าทั้งหมด */}
          <MenuItem
            component={Link}
            to="/products"
            onClick={handleMenuClose}
            sx={{
              py: 1.5,
              color: '#ffffff',
              '&:hover': {
                bgcolor: alpha('#ffc107', 0.2)
              },
              transition: 'all 0.2s ease'
            }}
          >
            สินค้าทั้งหมด
          </MenuItem>
          <Divider sx={{ borderColor: '#ffffff10' }} />
          {/* ช่องค้นหาในเมนู mobile */}
          <Box sx={{ p: { xs: 1.5, sm: 2 } }}>
            <form onSubmit={handleSearch}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: '#ffffff99', fontSize: { xs: 18, sm: 22 } }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <>
                      {searchQuery && (
                        <IconButton
                          onClick={() => setSearchQuery('')}
                          size="small"
                          sx={{ p: 0, color: '#ffffff99' }}
                          tabIndex={-1}
                        >
                          <Close fontSize="small" />
                        </IconButton>
                      )}
                      <IconButton
                        onClick={handleSearch}
                        size="small"
                        sx={{ color: '#ffc107', ml: 1 }}
                        type="submit"
                      >
                        <Search sx={{ fontSize: { xs: 18, sm: 22 } }} />
                      </IconButton>
                    </>
                  ),
                  sx: {
                    borderRadius: '50px',
                    backgroundColor: alpha('#ffffff', 0.1),
                    color: '#ffffff',
                    fontSize: { xs: '0.95rem', sm: '1rem' },
                    '& .MuiInputBase-input': {
                      color: '#ffffff',
                      '&::placeholder': {
                        color: '#ffffff99',
                        opacity: 1
                      }
                    },
                    '&:hover': {
                      backgroundColor: alpha('#ffffff', 0.15)
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(e);
                  }
                }}
              />
            </form>
          </Box>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;