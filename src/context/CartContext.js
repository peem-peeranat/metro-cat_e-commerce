import { createContext, useContext, useState, useEffect } from 'react';

// สร้าง Context สำหรับตะกร้าสินค้า
const CartContext = createContext();

// Provider Component สำหรับจัดการตะกร้าสินค้า
export const CartProvider = ({ children }) => {
  // State สำหรับเก็บข้อมูลตะกร้า (โหลดจาก localStorage ถ้ามี)
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // State สำหรับ cache ข้อมูลสินค้าแต่ละตัว (ใช้เวลา fetch รายละเอียด)
  const [products, setProducts] = useState({});

  // State สำหรับสถานะการโหลดสินค้าแต่ละตัว
  const [loadingProducts, setLoadingProducts] = useState({});

  // บันทึกตะกร้าไปยัง localStorage ทุกครั้งที่ cart เปลี่ยน
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // ฟังก์ชันดึงข้อมูลสินค้าจาก API (ถ้ามีใน cache แล้วจะไม่ fetch ใหม่)
  const fetchProduct = async (id) => {
    if (products[id]) {
      return products[id];
    }
    try {
      setLoadingProducts(prev => ({ ...prev, [id]: true }));
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProducts(prev => ({ ...prev, [id]: data }));
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    } finally {
      setLoadingProducts(prev => ({ ...prev, [id]: false }));
    }
  };

  // เพิ่มสินค้าลงตะกร้า (ถ้ามีอยู่แล้วจะบวกจำนวน)
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      // เพิ่มใหม่ถ้ายังไม่มี
      return [
        ...prevCart,
        {
          ...product,
          quantity,
          addedAt: new Date().toISOString() // timestamp สำหรับเรียงลำดับ
        }
      ];
    });
  };

  // ลบสินค้าออกจากตะกร้า
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // ลบสินค้าหลายรายการพร้อมกัน
  const removeItemsFromCart = (productIds) => {
    setCart(prevCart => prevCart.filter(item => !productIds.includes(item.id)));
  };

  // อัพเดทจำนวนสินค้าในตะกร้า (ถ้า <= 0 จะลบออก)
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // ล้างตะกร้าทั้งหมด
  const clearCart = () => {
    setCart([]);
  };

  // คำนวณราคารวมทั้งหมดในตะกร้า
  const cartTotal = cart.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  // คำนวณจำนวนสินค้าทั้งหมดในตะกร้า
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // ตรวจสอบว่าสินค้านี้มีอยู่ในตะกร้าหรือไม่
  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  // เรียงลำดับสินค้าในตะกร้า (ใหม่ล่าสุดขึ้นก่อน)
  const sortedCart = [...cart].sort((a, b) =>
    new Date(b.addedAt) - new Date(a.addedAt)
  );

  // ส่งค่าทั้งหมดไปให้ Component อื่นใช้ผ่าน Context
  return (
    <CartContext.Provider
      value={{
        cart: sortedCart,          // ตะกร้าสินค้าเรียงลำดับ
        products,                  // ข้อมูลสินค้าที่ดึงมา
        loadingProducts,           // สถานะการโหลดของสินค้าแต่ละรายการ
        fetchProduct,              // ฟังก์ชันดึงข้อมูลสินค้า
        addToCart,                 // ฟังก์ชันเพิ่มสินค้า
        removeFromCart,            // ฟังก์ชันลบสินค้า
        removeItemsFromCart,       // ฟังก์ชันลบหลายรายการ
        updateQuantity,            // ฟังก์ชันอัพเดทจำนวน
        clearCart,                 // ฟังก์ชันล้างตะกร้า
        cartTotal,                 // ราคารวมทั้งหมด
        cartCount,                 // จำนวนสินค้ารวม
        isInCart                   // ตรวจสอบว่าสินค้ามีในตะกร้า
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook สำหรับใช้งาน Context นี้ใน Component อื่น
export const useCart = () => useContext(CartContext);