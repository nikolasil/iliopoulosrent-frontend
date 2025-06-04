'use client';

import React from 'react';
import { Paper, PaperProps } from '@mui/material';

interface SectionWrapperProps extends PaperProps {
  id?: string;
  children: React.ReactNode;
  heightCalc?: {
    xs?: string;
    sm?: string;
  };
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  children,
  heightCalc,
  ...props
}) => {
  return (
    <Paper
      id={id}
      elevation={3}
      sx={{
        height: {
          xs: heightCalc?.xs || `calc(100dvh - 56px)`,
          sm: heightCalc?.sm || `calc(100dvh - 64px)`,
        },
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        borderRadius: 0,
        bgcolor: 'rgba(255, 255, 255, 0.75)',
        maxWidth: '100dvw',
        mx: 0,
        mt: 0,
        boxShadow: 'none',
        overflow: 'hidden',
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};

export default SectionWrapper;
