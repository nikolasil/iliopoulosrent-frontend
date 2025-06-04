'use client';
import React from 'react';
import Box from '@mui/material/Box';
import IntroContent from './IntroContent';
import IntroArrow from './IntroArrow';

const Intro: React.FC = () => {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const id = href.substring(1);
      const element = document.getElementById(id);

      if (element) {
        const isMobile = window.innerWidth < 600;
        const yOffset = isMobile ? -56 : -64;

        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    } else if (href.startsWith('/')) {
      window.location.href = href;
    }
  };

  return (
    <Box
      id="intro"
      sx={{
        height: {
          xs: `calc(100dvh - 56px)`,
          sm: `calc(100dvh - 64px)`,
        },
        position: 'relative',
        color: 'white',
        overflow: 'hidden',

        // Add bottom padding on small devices to prevent arrow clipping
        pb: {
          xs: `calc(48px + env(safe-area-inset-bottom))`,
          sm: 0,
        },
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100dvw',
          height: '100dvh',
          backgroundImage: `url('/assets/gallery/MANTHOS-01.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: -1,
          filter: 'brightness(1.3)',
        }}
      />

      {/* Centered content */}
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          textAlign: 'center',
        }}
      >
        <IntroContent onScrollToSection={scrollToSection} />
      </Box>

      {/* Arrow positioned at bottom center with responsive spacing */}
      <Box
        sx={{
          position: 'absolute',
          bottom: {
            xs: `calc(16px + env(safe-area-inset-bottom))`,
            sm: 32,
          },
          left: '50%',
          transform: 'translateX(-50%)',
          cursor: 'pointer',
          zIndex: 10,
        }}
        onClick={() => scrollToSection('#informations')}
      >
        <IntroArrow />
      </Box>
    </Box>
  );
};

export default Intro;
