import { Box, Typography, Button, IconButton, Rating, Divider, TextField, Grid } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const ProductDetail = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // ฟังก์ชันเพิ่มสินค้าลงตะกร้าตามจำนวนที่เลือก
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={4}>
        {/* ส่วนแสดงรูปสินค้า */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 2, textAlign: 'center' }}>
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
            />
          </Box>
          {/* แสดงรูปย่อยสำหรับเลือกดู */}
          <Grid container spacing={1}>
            {product.images.map((img, index) => (
              <Grid item key={index} xs={3}>
                <img
                  src={img}
                  alt={`${product.title} ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '80px',
                    objectFit: 'cover',
                    cursor: 'pointer',
                    border: selectedImage === index ? '2px solid #1976d2' : '1px solid #ddd'
                  }}
                  onClick={() => setSelectedImage(index)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        {/* ส่วนรายละเอียดสินค้า */}
        <Grid item xs={12} md={6}>
          {/* ชื่อสินค้า */}
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          {/* แบรนด์สินค้า */}
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Brand: {product.brand}
          </Typography>
          {/* เรตติ้งและจำนวนสินค้าใน stock */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {product.rating} ({product.stock} in stock)
            </Typography>
          </Box>
          {/* ราคาและส่วนลด */}
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price}
            {product.discountPercentage > 0 && (
              <Typography variant="body2" color="success.main" component="span" sx={{ ml: 1 }}>
                {Math.round(product.discountPercentage)}% off
              </Typography>
            )}
          </Typography>
          <Divider sx={{ my: 3 }} />
          {/* รายละเอียดสินค้า */}
          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>

          {/* เลือกจำนวนสินค้า */}
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              Quantity:
            </Typography>
            <IconButton
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Remove />
            </IconButton>
            <TextField
              value={quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value > 0) {
                  setQuantity(value);
                }
              }}
              type="number"
              inputProps={{ min: 1 }}
              sx={{ width: '80px', mx: 1 }}
            />
            <IconButton onClick={() => setQuantity(quantity + 1)}>
              <Add />
            </IconButton>
          </Box>

          {/* ปุ่มเพิ่มลงตะกร้า */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 3 }}
            onClick={handleAddToCart}
            fullWidth
          >
            Add to Cart
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetail;