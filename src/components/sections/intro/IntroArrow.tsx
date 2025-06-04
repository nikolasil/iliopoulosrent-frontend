'use client';
import React from 'react';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';


const IntroArrow: React.FC = () => {
  return (
    <KeyboardDoubleArrowDownIcon
      sx={{
        position: 'absolute',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: 48,
        color: 'secondary.main',
        animation: 'flicker 1.5s infinite',
        '@keyframes flicker': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
        cursor: 'pointer',
      }}
    />
  );
};

export default IntroArrow;
