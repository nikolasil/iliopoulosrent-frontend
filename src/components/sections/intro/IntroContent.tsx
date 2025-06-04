'use client';
import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTranslations } from 'next-intl';

interface IntroContentProps {
  onScrollToSection: (id: string) => void;
}

const IntroContent: React.FC<IntroContentProps> = ({ onScrollToSection }) => {
  const t =  useTranslations();
  return (
    <Box
      sx={{
        bgcolor: 'rgba(0,0,0,0.35)', // lighter, less black background
        borderRadius: 3,
        p: 4,
        maxWidth: '95dvw',
        boxShadow: '0 0 20px rgba(0,0,0,0.9)',
        border: '1.5px solid rgba(255, 255, 255, 0.3)',
        outline: '1px solid rgba(255,255,255,0.1)',
        textShadow: '0 0 8px rgba(0,0,0,0.8)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 'bold',
          textShadow: '0 0 6px rgba(0,0,0,0.9)',
          fontSize: {
            xs: '1.75rem', // smaller font on xs (small screens)
            sm: '2.125rem', // default h4 font size on sm and up
          },
        }}
      >
        {t('intro.subTitle')}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onScrollToSection('#contact')}
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            boxShadow: '0 4px 12px rgba(46, 125, 195, 0.7)',
            minWidth: 140, // added minimum width to ensure consistent width
            '&:hover': {
              boxShadow: '0 6px 20px rgba(46, 125, 195, 0.9)',
            },
          }}
        >
          {t('intro.buttonLeft')}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onScrollToSection('#reservations')}
          sx={{
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            borderColor: 'rgba(255, 255, 255, 0.7)',
            color: 'white',
            minWidth: 140, // match width with the first button
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 1)',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          }}
        >
          {t('intro.buttonRight')}
        </Button>
      </Box>
    </Box>
  );
};

export default IntroContent;
