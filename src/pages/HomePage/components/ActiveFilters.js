import { Box, Chip } from '@mui/material';
import { capitalizeFirstLetter, SORT_OPTIONS } from '../../../components/FunctionsFillter';

// แสดง Chip ตัวกรองที่ถูกเลือก (หมวดหมู่/การเรียงลำดับ)
const ActiveFilters = ({
  category,
  setCategory,
  sort,
  setSort,
  searchTerm,
  setSearchTerm
}) => {
  return (
    <Box sx={{ mb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
      {/* แสดง Chip คำค้นหา */}
      {searchTerm && (
        <Chip
          label={`ค้นหา: ${searchTerm}`}
          onDelete={() => setSearchTerm('')}
          color="primary"
          size="small"
          sx={{
            borderRadius: '4px',
            backgroundColor: '#ffc107',
            color: '#212327',
            fontWeight: 500,
            '& .MuiChip-deleteIcon': {
              color: '#212327',
              '&:hover': { color: '#424347' }
            }
          }}
        />
      )}
      {/* แสดง Chip หมวดหมู่ที่เลือก */}
      {category && (
        <Chip
          label={`หมวดหมู่: ${capitalizeFirstLetter(category)}`}
          onDelete={() => setCategory('')}
          color="primary"
          size="small"
          sx={{
            borderRadius: '4px',
            backgroundColor: '#ffc107',
            color: '#212327',
            fontWeight: 500,
            '& .MuiChip-deleteIcon': {
              color: '#212327',
              '&:hover': { color: '#424347' }
            }
          }}
        />
      )}
      {/* แสดง Chip การเรียงลำดับที่เลือก */}
      {sort && (
        <Chip
          label={`Sort by: ${SORT_OPTIONS.find(o => o.value === sort)?.label}`}
          onDelete={() => setSort('')}
          color="primary"
          size="small"
          sx={{
            borderRadius: '4px',
            backgroundColor: '#ffc107',
            color: '#212327',
            fontWeight: 500,
            '& .MuiChip-deleteIcon': {
              color: '#212327',
              '&:hover': { color: '#424347' }
            }
          }}
        />
      )}
    </Box>
  );
};

export default ActiveFilters;