import { useState } from 'react';
import { Box, Stack, Modal, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// แกลเลอรี่รูปภาพสินค้า (แสดงรูปหลัก, รูปย่อย, และ modal ดูรูปใหญ่)
const ProductImageGallery = ({ product, isMobile }) => {
  // state สำหรับ index ของรูปที่เลือก
  const [selectedImage, setSelectedImage] = useState(0);
  // state สำหรับเปิด/ปิด modal
  const [open, setOpen] = useState(false);

  // เปิด modal และตั้งค่ารูปที่เลือก
  const handleOpen = (index) => {
    setSelectedImage(index);
    setOpen(true);
  };

  // ปิด modal
  const handleClose = () => setOpen(false);

  // เลื่อนดูรูปก่อนหน้า
  const handlePrev = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  // เลื่อนดูรูปรถัดไป
  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  // เพิ่ม gesture สำหรับสไลด์ (ทั้ง desktop/mobile)
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  // เริ่มจับตำแหน่งนิ้วหรือ mouse ตอนเริ่ม drag
  const handleTouchStart = (e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setTouchStartX(x);
  };
  // จับตำแหน่งนิ้วหรือ mouse ตอน drag
  const handleTouchMove = (e) => {
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    setTouchEndX(x);
  };
  // เมื่อปล่อยนิ้วหรือ mouse ให้เช็คทิศทาง
  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          // สไลด์ซ้าย (next)
          setSelectedImage((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
          );
        } else {
          // สไลด์ขวา (prev)
          setSelectedImage((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
          );
        }
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <Box sx={{
      width: isMobile ? '100%' : '50%',
      px: isMobile ? 2 : 6,
      py: isMobile ? 3 : 4,
      borderBottom: isMobile ? '1px solid' : 'none',
      borderColor: 'rgba(33,35,39,0.1)',
      backgroundColor: '#ffffff'
    }}>
      {/* รูปภาพหลักสินค้า */}
      <Box
        sx={{
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(33,35,39,0.1)',
          mb: isMobile ? 2 : 3,
          bgcolor: '#f5f5f5',
          textAlign: 'center',
          height: isMobile ? '250px' : '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: isMobile ? 'none' : 'translateY(-5px)',
            boxShadow: '0 8px 30px rgba(33,35,39,0.15)'
          },
          cursor: 'pointer'
        }}
        onClick={() => handleOpen(selectedImage)}
      >
        <img
          src={product.images[selectedImage]}
          alt={product.title}
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
            transition: 'transform 0.3s ease'
          }}
        />
      </Box>

      {/* แสดงรูปย่อยทั้งหมด */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          py: 1,
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        {product.images.map((img, index) => (
          <Box
            key={index}
            onClick={() => handleOpen(index)}
            sx={{
              border: selectedImage === index ? '2px solid #ffc107' : '1px solid rgba(33,35,39,0.1)',
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: 'pointer',
              width: isMobile ? 60 : 80,
              height: isMobile ? 60 : 80,
              flexShrink: 0,
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                borderColor: '#ffc107',
                transform: 'scale(1.05)'
              }
            }}
          >
            <img
              src={img}
              alt={`${product.title} ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </Box>
        ))}
      </Stack>

      {/* Modal แสดงรูปใหญ่ */}
      <Modal
        open={open}
        onClose={handleClose}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1500
        }}
      >
        <Box
          sx={{
            position: 'relative',
            outline: 'none',
            maxWidth: '90vw',
            maxHeight: '90vh',
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseMove={handleTouchMove}
          onMouseUp={handleTouchEnd}
        >
          {/* ปุ่มย้อนกลับ (ดูรูปก่อนหน้า) */}
          {product.images.length > 1 && (
            <IconButton
              onClick={handlePrev}
              sx={{
                position: 'absolute',
                left: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.7)',
                color: '#212327',
                zIndex: 2,
                '&:hover': { bgcolor: '#ffc107', color: '#212327' }
              }}
              aria-label="previous image"
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          )}

          {/* ปุ่มปิด modal */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: '#212327',
              bgcolor: 'rgba(255,255,255,0.7)',
              zIndex: 2
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>

          {/* ปุ่มถัดไป (ดูรูปรถัดไป) */}
          {product.images.length > 1 && (
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: 8,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255,255,255,0.7)',
                color: '#212327',
                zIndex: 2,
                '&:hover': { bgcolor: '#ffc107', color: '#212327' }
              }}
              aria-label="next image"
            >
              <ArrowForwardIosIcon />
            </IconButton>
          )}

          {/* รูปภาพใหญ่ใน modal */}
          <img
            src={product.images[selectedImage]}
            alt={product.title}
            style={{
              maxWidth: '80vw',
              maxHeight: '80vh',
              objectFit: 'contain',
              borderRadius: 8
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default ProductImageGallery;