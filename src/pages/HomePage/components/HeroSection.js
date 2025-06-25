import React from "react";
import { Box, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import styled from "@emotion/styled";

const HeroSection = ({ onShopNow }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 0.5
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.04,
      boxShadow: "0 4px 24px 0 rgba(255,193,7,0.18)",
      backgroundColor: "#ffb300",
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.97
    }
  };

  // Styled components
  const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: "24px",
    padding: isMobile ? "10px 28px" : "16px 48px",
    fontWeight: 700,
    letterSpacing: "1.2px",
    fontSize: isMobile ? "1rem" : "1.15rem",
    background: "#ffc107",
    color: "#212327",
    boxShadow: "0 2px 12px rgba(255, 193, 7, 0.10)",
    textTransform: "uppercase",
    transition: "all 0.2s cubic-bezier(.25,.8,.25,1)",
    "&:hover": {
      background: "#ffb300",
      color: "#fff"
    }
  }));

  return (
    <Box
      component="section"
      sx={{
        top: '-73px',
        width: "100vw",
        maxWidth: "100%",
        minHeight: "100vh",
        background: "radial-gradient(circle at 50% 50%, #23272f 0%, #181A20 70%)",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxSizing: "border-box",
        py: isMobile ? 6 : 0,
        overflow: "hidden"
      }}
    >
      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          textAlign: "center",
          zIndex: 2,
          px: isMobile ? 2 : 3,
          maxWidth: "700px",
          width: "100%"
        }}
      >
        <Typography
          component={motion.div}
          variants={itemVariants}
          variant={isMobile ? "h4" : "h2"}
          gutterBottom
          sx={{
            fontWeight: 900,
            mb: isMobile ? 1 : 2,
            color: "#ffc107",
            fontSize: isMobile ? "2.1rem" : "3.2rem",
            letterSpacing: 2,
            lineHeight: 1.1
          }}
        >
          SUMMER SALE 2025
        </Typography>

        <Typography
          component={motion.div}
          variants={itemVariants}
          variant={isMobile ? "h6" : "h4"}
          sx={{
            fontWeight: 600,
            mb: isMobile ? 2 : 4,
            color: "#fff",
            fontSize: isMobile ? "1.1rem" : "1.7rem"
          }}
        >
          Up to <Box component="span" sx={{ color: "#ffc107", fontWeight: 900, fontSize: isMobile ? "1.2em" : "1.3em" }}>50% OFF</Box> on Selected Items
        </Typography>

        <Typography
          component={motion.div}
          variants={itemVariants}
          variant="body1"
          sx={{
            maxWidth: "600px",
            mx: "auto",
            mb: isMobile ? 3 : 6,
            color: "rgba(255,255,255,0.85)",
            fontSize: isMobile ? "1rem" : "1.13rem",
            lineHeight: 1.7
          }}
        >
          Limited time offer! Shop now and enjoy huge discounts on our best-selling products. Free shipping on all orders over $50.
        </Typography>

        <Box
          component={motion.div}
          variants={itemVariants}
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap"
          }}
        >
          <StyledButton
            component={motion.button}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={onShopNow}
          >
            Shop Now
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;