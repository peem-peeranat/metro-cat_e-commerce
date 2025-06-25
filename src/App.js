import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Home from './pages/HomePage/Home';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import Footer from './components/Footer';
import { CartProvider } from './context/CartContext';
import OrderSuccessPage from './pages/CheckoutPage/components/OrderSuccessPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: [
      '"Montserrat"',
      '"Noto Sans Thai"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});

function App() {
  return (
    <CartProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
          }}>
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1 }}> {/* เนื้อหาหลักจะขยายเต็มพื้นที่ */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
              </Routes>
            </Box>
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </CartProvider>
  );
}

export default App;