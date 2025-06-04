'use client';
import React from 'react';
import { Box, IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FullscreenIcon from '@mui/icons-material/Fullscreen'; // ✅ NEW
import { MediaItem } from './types';

interface MediaDisplayProps {
  currentItem: MediaItem;
  onPrev: () => void;
  onNext: () => void;
}

const MediaDisplay: React.FC<MediaDisplayProps> = ({
  currentItem,
  onPrev,
  onNext,
}) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null); // ✅ NEW

  const handleFullscreen = () => {
    const el = containerRef.current;
    if (el) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        el.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable full-screen mode: ${err.message}`
          );
        });
      }
    }
  };

  return (
    <Box
      ref={containerRef} // ✅ NEW
      sx={{
        flexGrow: 1,
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mb: 2,
        position: 'relative',
      }}
    >
      {currentItem?.url ? (
        <Box
          component="iframe"
          src={currentItem.url}
          title="YouTube video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sx={{ width: '100%', height: '100%', border: 'none' }}
        />
      ) : (
        <>
          <Box
            component="img"
            src={currentItem?.path}
            alt="Gallery item"
            loading="lazy"
            sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
          <IconButton // ✅ NEW
            onClick={handleFullscreen}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(0,0,0,0.4)',
              color: 'white',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
            }}
          >
            <FullscreenIcon />
          </IconButton>
        </>
      )}

      <IconButton onClick={onPrev} sx={navBtnStyle('left')}>
        <NavigateBeforeIcon fontSize="large" />
      </IconButton>
      <IconButton onClick={onNext} sx={navBtnStyle('right')}>
        <NavigateNextIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

const navBtnStyle = (side: 'left' | 'right') => ({
  position: 'absolute',
  top: '50%',
  [side]: 8,
  transform: 'translateY(-50%)',
  bgcolor: 'rgba(0,0,0,0.4)',
  color: 'white',
  '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
});

export default MediaDisplay;
