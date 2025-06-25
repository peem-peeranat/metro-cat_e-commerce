import {
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Divider,
  Button,
  styled,
  alpha
} from '@mui/material';
import { CATEGORIES, SORT_OPTIONS } from '../../../components/FunctionsFillter';
import { capitalizeFirstLetter } from '../../../components/FunctionsFillter';
import { useNavigate, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getCategories } from '../../../components/FunctionsFillter';

// สไตล์ของ FormControl สำหรับตัวกรอง
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
  marginBottom: theme.spacing(2),
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(33, 35, 39, 0.07)',
    transition: 'all 0.3s ease',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(33, 35, 39, 0.12)',
      borderColor: '#ffc107'
    },
    '&.Mui-focused': {
      boxShadow: '0 0 0 2px rgba(255, 193, 7, 0.15)',
      borderColor: '#ffc107',
    },
  },
  '& .MuiInputLabel-root': {
    color: '#212327',
    fontWeight: 500,
    '&.Mui-focused': {
      color: '#ffc107',
    },
  },
  '& .MuiSelect-select': {
    color: '#212327',
    fontWeight: 500,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha('#212327', 0.15),
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha('#212327', 0.25),
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#ffc107',
    borderWidth: '1px'
  }
}));

// คอมโพเนนต์ตัวกรองสินค้า (หมวดหมู่/เรียงลำดับ)
const FilterControls = ({ category, setCategory, sort, setSort, isMobile }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // โหลดหมวดหมู่สินค้า
  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  // ฟังก์ชันล้างตัวกรองทั้งหมด
  const handleClear = () => {
    setCategory('');
    setSort('');
    // ล้าง location.state ถ้ามีการค้นหา
    if (location.state && location.state.searchedProducts) {
      navigate('/', { replace: true, state: {} });
    }
  };

  // แสดงตัวกรองแบบ Mobile
  if (isMobile) {
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{
          background: '#fff',
          borderRadius: 3,
          boxShadow: '0 2px 12px rgba(33,35,39,0.07)',
          p: 2,
          mb: 2
        }}>
          {/* ตัวกรองหมวดหมู่ */}
          <Typography variant="subtitle2" sx={{ mb: 1, color: '#212327', fontWeight: 700 }}>
            Category
          </Typography>
          <StyledFormControl size="small" sx={{ minWidth: '100%', mb: 0 }}>
            <InputLabel shrink>Choose category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Choose category"
              variant="outlined"
              notched
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: '12px',
                    marginTop: '8px',
                    boxShadow: '0 8px 24px rgba(33, 35, 39, 0.2)',
                  }
                }
              }}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{
          background: '#fff',
          borderRadius: 3,
          boxShadow: '0 2px 12px rgba(33,35,39,0.07)',
          p: 2,
          mb: 2
        }}>
          {/* ตัวกรองเรียงลำดับ */}
          <Typography variant="subtitle2" sx={{ mb: 1, color: '#212327', fontWeight: 700 }}>
            Sort by
          </Typography>
          <StyledFormControl size="small" sx={{ minWidth: '100%', mb: 0 }}>
            <InputLabel shrink>Choose sorting</InputLabel>
            <Select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              label="Choose sorting"
              variant="outlined"
              notched
              MenuProps={{
                PaperProps: {
                  sx: {
                    borderRadius: '12px',
                    marginTop: '8px',
                    boxShadow: '0 8px 24px rgba(33, 35, 39, 0.2)',
                  }
                }
              }}
            >
              {SORT_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </StyledFormControl>
        </Box>
        {/* ปุ่มล้างตัวกรอง (Mobile) */}
        <Button
          fullWidth
          variant="outlined"
          color="warning"
          onClick={handleClear}
          sx={{
            mt: 2,
            borderRadius: 2,
            fontWeight: 600,
            borderColor: '#ffc107',
            color: '#ffc107',
            '&:hover': {
              background: '#fff8e1',
              borderColor: '#ffb300',
              color: '#ffb300'
            }
          }}
        >
          Clear filters
        </Button>
      </Box>
    );
  }

  // แสดงตัวกรองแบบ Desktop
  return (
    <Box sx={{ width: '100%' }}>
      {/* ตัวกรองหมวดหมู่ */}
      <Typography variant="subtitle2" sx={{ mb: 1, color: '#212327', fontWeight: 700 }}>
        Category
      </Typography>
      <StyledFormControl size="medium" sx={{ minWidth: '100%', mb: 2 }}>
        <InputLabel shrink>Choose category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Choose category"
          variant="outlined"
          notched
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: '12px',
                marginTop: '8px',
                boxShadow: '0 8px 24px rgba(33, 35, 39, 0.2)',
              }
            }
          }}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.value} value={cat.value}>
              {cat.label}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
      <Divider sx={{ my: 2 }} />
      {/* ตัวกรองเรียงลำดับ */}
      <Typography variant="subtitle2" sx={{ mb: 1, color: '#212327', fontWeight: 700 }}>
        Sort by
      </Typography>
      <StyledFormControl size="medium" sx={{ minWidth: '100%', mb: 2 }}>
        <InputLabel shrink>Choose sorting</InputLabel>
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          label="Choose sorting"
          variant="outlined"
          notched
          MenuProps={{
            PaperProps: {
              sx: {
                borderRadius: '12px',
                marginTop: '8px',
                boxShadow: '0 8px 24px rgba(33, 35, 39, 0.2)',
              }
            }
          }}
        >
          {SORT_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
      {/* ปุ่มล้างตัวกรอง (Desktop) */}
      <Button
        fullWidth
        variant="outlined"
        color="warning"
        onClick={handleClear}
        sx={{
          mt: 2,
          borderRadius: 2,
          fontWeight: 600,
          borderColor: '#ffc107',
          color: '#ffc107',
          '&:hover': {
            background: '#fff8e1',
            borderColor: '#ffb300',
            color: '#ffb300'
          }
        }}
      >
        Clear filters
      </Button>
    </Box>
  );
};

export default FilterControls;