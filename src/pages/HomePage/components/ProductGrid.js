import {
  Box,
  Typography
} from '@mui/material';
import ProductCard from '../../../components/ProductCard';

const ProductGrid = ({ products, isMobile, isTablet, onAddToCartSuccess }) => {
  let gridTemplate = 'repeat(auto-fill, minmax(250px, 1fr))';

  if (isMobile) {
    gridTemplate = 'repeat(auto-fill, minmax(150px, 1fr))';
  } else if (isTablet) {
    gridTemplate = 'repeat(auto-fill, minmax(200px, 1fr))';
  }

  if (products.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
        textAlign="center"
      >
        <Typography variant="h6" color="textSecondary">
          No products found. Please try another category.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: gridTemplate,
        gap: 1,
        width: '100%'
      }}
    >
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          isMobile={isMobile}
          isTablet={isTablet}
          onAddToCartSuccess={onAddToCartSuccess}
        />
      ))}
    </Box>
  );
};

export default ProductGrid;