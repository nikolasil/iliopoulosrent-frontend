'use client';
import React from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { MediaItem } from './types';

interface ThumbnailsProps {
  thumbs: MediaItem[];
  currentIndex: number;
  startIndex: number;
  total: number;
  onThumbClick: (index: number) => void;
  onScrollLeft: () => void;
  onScrollRight: () => void;
}

const Thumbnails: React.FC<ThumbnailsProps> = ({
  thumbs,
  currentIndex,
  startIndex,
  total,
  onThumbClick,
  onScrollLeft,
  onScrollRight,
}) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      justifyContent="center"
      alignItems="center"
    >
      {startIndex > 0 && (
        <IconButton
          onClick={onScrollLeft}
          size="small"
          sx={{ bgcolor: 'background.paper' }}
        >
          <NavigateBeforeIcon />
        </IconButton>
      )}

      {thumbs.map((item, idx) => {
        const realIndex = startIndex + idx;
        const isActive = realIndex === currentIndex;

        return (
          <Box
            key={realIndex}
            component="img"
            src={item.path}
            alt={`Thumb ${realIndex + 1}`}
            onClick={() => onThumbClick(realIndex)}
            sx={{
              width: 64,
              height: 64,
              objectFit: 'cover',
              borderRadius: 1,
              cursor: 'pointer',
              border: isActive ? '3px solid' : '2px solid transparent',
              borderColor: isActive ? 'primary.main' : 'transparent',
              filter: isActive ? 'none' : 'grayscale(70%)',
              transition: 'all 0.3s ease',
              '&:hover': {
                filter: 'none',
                borderColor: 'primary.light',
              },
            }}
          />
        );
      })}

      {startIndex + thumbs.length < total && (
        <IconButton
          onClick={onScrollRight}
          size="small"
          sx={{ bgcolor: 'background.paper' }}
        >
          <NavigateNextIcon />
        </IconButton>
      )}
    </Stack>
  );
};

export default Thumbnails;
