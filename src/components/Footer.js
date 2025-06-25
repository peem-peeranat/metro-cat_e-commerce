import { Box, Typography, Container, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

// StyledFooter 
const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: '#212327',
  color: '#ffffff',
  width: '100%',
  padding: theme.spacing(0.5, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1.2, 0)
  },
  borderTop: `1px solid rgba(255, 193, 7, 0.2)`,
  boxShadow: theme.shadows[4],
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[8],
    borderTopColor: 'rgba(255, 193, 7, 0.4)'
  }
}));

// SocialIcon 
const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: '#ffffff',
  backgroundColor: 'transparent',
  margin: theme.spacing(0, 0.25),
  transition: 'all 0.3s ease',
  padding: 4,
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(0, 0.5),
    padding: 8
  },
  '&:hover': {
    color: '#ffc107',
    transform: 'scale(1.2)'
  }
}));

const Footer = () => {
  return (
    // Footer หลักของเว็บไซต์
    <StyledFooter component="footer">
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'center', sm: 'flex-start' },
            justifyContent: 'space-between',
            gap: { xs: 0.2, sm: 2 },
            py: { xs: 0.3, sm: 0 }
          }}
        >
          {/* ข้อความลิขสิทธิ์ */}
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '0.75rem', sm: '1rem' },
              fontWeight: 400,
              letterSpacing: '0.5px',
              opacity: 0.85,
              mt: { xs: 0, sm: 2 },
              mb: { xs: 0.2, sm: 0 },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            © {new Date().getFullYear()} Metro cat - All Rights Reserved
          </Typography>

          {/* ลิงก์ไปยัง Social Media ต่าง ๆ */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', sm: 'flex-end' },
              mb: { xs: 0, sm: 2 }
            }}
          >
            <SocialIcon aria-label="Facebook" href="https://facebook.com" target="_blank" rel="noopener">
              <Facebook fontSize="small" />
            </SocialIcon>
            <SocialIcon aria-label="Twitter" href="https://twitter.com" target="_blank" rel="noopener">
              <Twitter fontSize="small" />
            </SocialIcon>
            <SocialIcon aria-label="Instagram" href="https://instagram.com" target="_blank" rel="noopener">
              <Instagram fontSize="small" />
            </SocialIcon>
            <SocialIcon aria-label="LinkedIn" href="https://linkedin.com" target="_blank" rel="noopener">
              <LinkedIn fontSize="small" />
            </SocialIcon>
          </Box>
        </Box>
      </Container>
    </StyledFooter>
  );
};

export default Footer;