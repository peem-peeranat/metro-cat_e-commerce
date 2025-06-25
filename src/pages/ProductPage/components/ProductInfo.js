import { useState } from 'react';
import {
  Box, Typography, Divider, Chip, Rating
} from '@mui/material';
import QuantitySelector from './QuantitySelector';
import AddToCartButton from './AddToCartButton';

// แสดงรายละเอียดสินค้าและปุ่มเพิ่มลงตะกร้า
const ProductInfo = ({ product, isMobile, onAddToCartSuccess }) => {
  // state สำหรับจำนวนสินค้าที่จะเพิ่มลงตะกร้า
  const [quantity, setQuantity] = useState(1);

  return (
    <Box sx={{
      width: isMobile ? '100%' : '50%',
      px: isMobile ? 2 : 6,
      py: isMobile ? 3 : 4,
      position: 'relative',
      backgroundColor: '#ffffff'
    }}>
      {/* แสดงแบรนด์สินค้า */}
      {product.brand && (
        <Chip
          label={product.brand}
          size="small"
          sx={{
            mb: isMobile ? 1 : 2,
            fontWeight: 600,
            bgcolor: '#ffc107',
            color: '#212327',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-1px)'
            }
          }}
        />
      )}

      {/* ชื่อสินค้า */}
      <Typography variant={isMobile ? 'h5' : 'h4'} sx={{
        fontWeight: 700,
        mb: isMobile ? 1 : 2,
        color: '#212327',
        lineHeight: 1.3,
        transition: 'all 0.3s ease'
      }}>
        {product.title}
      </Typography>

      {/* รายละเอียดสินค้า */}
      <Typography variant="body1" paragraph sx={{
        color: '#5a5a5a',
        mb: isMobile ? 2 : 3,
        lineHeight: 1.7,
        fontSize: isMobile ? '0.875rem' : '1rem',
        transition: 'all 0.3s ease'
      }}>
        {product.description}
      </Typography>

      {/* คะแนนรีวิวและจำนวนสินค้าในสต็อก */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        mb: isMobile ? 1 : 2,
        transition: 'all 0.3s ease'
      }}>
        <Rating
          value={product.rating}
          precision={0.1}
          readOnly
          size={isMobile ? 'small' : 'medium'}
          sx={{
            color: '#ffc107',
            mr: 1
          }}
        />
        <Typography variant="body2" sx={{
          ml: 1,
          color: '#5a5a5a',
          fontSize: isMobile ? '0.75rem' : '0.875rem',
        }}>
          {product.rating.toFixed(1)} | Stock: {product.stock}
        </Typography>
      </Box>

      {/* ราคาสินค้าและส่วนลด */}
      <Box sx={{
        mb: isMobile ? 2 : 3,
        transition: 'all 0.3s ease'
      }}>
        <Typography variant={isMobile ? 'h5' : 'h4'} sx={{
          color: '#212327',
          fontWeight: 700,
          display: 'inline-block',
          mr: 2,
        }}>
          ${product.price.toFixed(2)}
        </Typography>

        {product.discountPercentage > 0 && (
          <Chip
            label={`-${Math.round(product.discountPercentage)}% OFF`}
            size="small"
            sx={{
              bgcolor: '#212327',
              color: '#ffffff',
              fontWeight: 600,
              verticalAlign: 'middle',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-1px)'
              }
            }}
          />
        )}
      </Box>

      {/* เส้นคั่น */}
      <Divider sx={{
        my: isMobile ? 2 : 3,
        borderColor: 'rgba(33,35,39,0.1)',
        transition: 'all 0.3s ease'
      }} />

      {/* ส่วนเลือกจำนวนและปุ่มเพิ่มลงตะกร้า */}
      <Box sx={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'flex-start' : 'center',
        mb: isMobile ? 3 : 4,
        transition: 'all 0.3s ease'
      }}>
        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
          isMobile={isMobile}
        />
        <AddToCartButton
          product={product}
          quantity={quantity}
          isMobile={isMobile}
          onAddToCartSuccess={onAddToCartSuccess}
        />
      </Box>
    </Box>
  );
};

export default ProductInfo;