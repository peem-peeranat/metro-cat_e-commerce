// ฟังก์ชันดึงสินค้าจาก API สามารถระบุหมวดหมู่, จำนวน limit, และ skip สำหรับ pagination ได้
export const fetchProducts = async (category = '', limit = 12, skip = 0) => {
  // ถ้ามีการระบุหมวดหมู่ จะดึงสินค้าตามหมวดนั้น ถ้าไม่ระบุจะดึงสินค้าทั้งหมด
  let url = category
    ? `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
    : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

  // เรียก API
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

// ฟังก์ชันค้นหาสินค้าด้วย query (ใช้กับช่องค้นหา)
export const searchProducts = async (query = '') => {
  const url = `https://dummyjson.com/products/search?q=${query}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to search products');
  }
  return response.json();
};

// ฟังก์ชันดึงรายชื่อหมวดหมู่สินค้าทั้งหมดจาก API
export const fetchCategories = async () => {
  const response = await fetch('https://dummyjson.com/products/categories');
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return response.json();
};