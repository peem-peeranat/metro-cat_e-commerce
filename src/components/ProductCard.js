import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  Box,
  Chip,
  useTheme,
  useMediaQuery,
  alpha,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';

const ProductCard = ({ product, isMobile, isTablet, onAddToCartSuccess }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  // เมื่อคลิกที่ตัวการ์ด จะนำไปยังหน้ารายละเอียดสินค้า
  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  // เมื่อกดปุ่มเพิ่มสินค้าลงตะกร้า
  const handleAddToCart = () => {
    addToCart(product);
    if (onAddToCartSuccess) onAddToCartSuccess();
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: isMobileView ? 'none' : 'translateY(-5px)',
          boxShadow: isMobileView ? 'none' : '0 10px 20px rgba(33, 35, 39, 0.15)'
        },
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: isMobileView ? '0 2px 8px rgba(0,0,0,0.1)' : '0 4px 12px rgba(0,0,0,0.1)',
        backgroundColor: '#ffffff',
        border: '1px solid #f0f0f0'
      }}
    >
      {/* แสดง Badge ส่วนลดถ้ามี */}
      {product.discountPercentage > 0 && (
        <Chip
          label={`${Math.round(product.discountPercentage)}% OFF`}
          color="primary"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            zIndex: 1,
            fontWeight: 'bold',
            fontSize: isMobileView ? '0.65rem' : '0.75rem',
            height: isMobileView ? 24 : 28,
            backgroundColor: '#ffc107',
            color: '#212327',
            '&:hover': {
              backgroundColor: '#ffca28'
            }
          }}
        />
      )}

      {/* รูปสินค้า (ถ้ายังโหลดไม่เสร็จจะแสดง spinner) */}
      <Box
        sx={{
          position: 'relative',
          paddingTop: isMobileView ? '100%' : '75%',
          cursor: 'pointer',
          backgroundColor: '#f8f8f8'
        }}
        onClick={handleCardClick}
      >
        {/* แสดง spinner ระหว่างโหลดรูป */}
        {!imgLoaded && !imgError && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#eee'
            }}
          >
            <CircularProgress size={40} thickness={4} color="warning" />
          </Box>
        )}
        <CardMedia
          component="img"
          image={
            imgError
              ? 'https://via.placeholder.com/300x300?text=No+Image'
              : product.thumbnail
          }
          alt={product.title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            p: isMobileView ? 1 : 2,
            transition: 'transform 0.3s ease',
            opacity: imgLoaded ? 1 : 0,
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />
      </Box>

      {/* เนื้อหาสินค้า (ชื่อ แบรนด์ เรตติ้ง ราคา) */}
      <CardContent
        sx={{
          flexGrow: 1,
          px: isMobileView ? 1.5 : 2,
          pt: isMobileView ? 1.5 : 2,
          pb: isMobileView ? 1 : 1.5
        }}
        onClick={handleCardClick}
      >
        {/* ชื่อสินค้า */}
        <Typography
          variant={isMobileView ? 'subtitle2' : 'subtitle1'}
          fontWeight="bold"
          sx={{
            mb: 0.5,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: isMobileView ? '2.8em' : '3em',
            fontSize: isMobileView ? '0.875rem' : '1rem',
            color: '#212327'
          }}
        >
          {product.title}
        </Typography>

        {/* แบรนด์สินค้า */}
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            fontSize: isMobileView ? '0.75rem' : '0.875rem',
            color: '#666666'
          }}
        >
          {product.brand}
        </Typography>

        {/* เรตติ้งสินค้า */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating
            value={product.rating}
            precision={0.5}
            readOnly
            size={isMobileView ? 'small' : 'medium'}
            sx={{
              '& .MuiRating-iconFilled': {
                color: '#ffc107'
              }
            }}
          />
          <Typography
            variant="body2"
            sx={{
              ml: 1,
              fontSize: isMobileView ? '0.75rem' : '0.875rem',
              color: '#666666'
            }}
          >
            ({product.rating})
          </Typography>
        </Box>

        {/* ราคาและราคาก่อนลด */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5 }}>
          <Typography
            variant={isMobileView ? 'subtitle1' : 'h6'}
            fontWeight="bold"
            sx={{
              fontSize: isMobileView ? '0.875rem' : '1.125rem',
              color: '#212327'
            }}
          >
            ${product.price.toFixed(2)}
          </Typography>

          {product.discountPercentage > 0 && (
            <Typography
              variant="body2"
              sx={{
                ml: 1,
                textDecoration: 'line-through',
                fontSize: isMobileView ? '0.75rem' : '0.875rem',
                color: '#999999'
              }}
            >
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </Typography>
          )}
        </Box>
      </CardContent>

      {/* ปุ่มกดดูรายละเอียด และปุ่มเพิ่มลงตะกร้า */}
      <CardActions sx={{
        px: isMobileView ? 1.5 : 2,
        pb: isMobileView ? 1.5 : 2,
        pt: 0,
        flexDirection: isMobileView ? 'column' : 'row',
        gap: isMobileView ? 1 : 0.5
      }}>
        {/* ปุ่มดูรายละเอียดสินค้า */}
        <Button
          fullWidth
          variant="outlined"
          size={isMobileView ? 'small' : 'medium'}
          startIcon={!isMobileView && <VisibilityIcon />}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            mr: isMobileView ? 0 : 0.5,
            fontSize: isMobileView ? '0.75rem' : '0.875rem',
            minWidth: isMobileView ? '100%' : 'auto',
            color: '#212327',
            borderColor: '#e0e0e0',
            '&:hover': {
              borderColor: '#ffc107',
              backgroundColor: alpha('#ffc107', 0.1)
            }
          }}
        >
          {isMobileView ? 'View' : 'Details'}
        </Button>

        {/* ปุ่มเพิ่มสินค้าลงตะกร้า */}
        <Button
          fullWidth
          variant="contained"
          size={isMobileView ? 'small' : 'medium'}
          startIcon={!isMobileView && <ShoppingCartIcon />}
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            fontSize: isMobileView ? '0.75rem' : '0.875rem',
            minWidth: isMobileView ? '100%' : 'auto',
            ml: isMobileView ? '0 !important' : '0.5',
            backgroundColor: '#ffc107',
            color: '#212327',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#ffca28',
              boxShadow: '0 2px 8px rgba(255, 193, 7, 0.4)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          {isMobileView ? 'Add to Cart' : 'Add'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;