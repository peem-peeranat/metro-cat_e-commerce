import { Box, Typography } from '@mui/material';
import FilterControls from './FilterControls';

const SidebarFilter = ({ category, setCategory, sort, setSort }) => (
  <Box sx={{
    width: 280,
    flexShrink: 0,
    background: '#fff',
    borderRadius: 3,
    boxShadow: '0 2px 12px rgba(33,35,39,0.07)',
    minHeight: '60vh',
    position: 'sticky',
    top: 185,
  }}>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#212327' }}>
      Product filter
    </Typography>
    <FilterControls
      category={category}
      setCategory={setCategory}
      sort={sort}
      setSort={setSort}
      isMobile={false}
    />
  </Box>
);

export default SidebarFilter;