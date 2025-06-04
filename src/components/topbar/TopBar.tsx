
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslations } from 'next-intl';

type TopBarProps = {
  drawerOpen: boolean;
  toggleDrawer: () => void;
};

const TopBar: React.FC<TopBarProps> = ({
  drawerOpen,
  toggleDrawer,
}) => {
  const t =  useTranslations();

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)', // semi-transparent white
          boxShadow: 4, // or your preferred shadow
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <IconButton
            edge="start"
            aria-label={drawerOpen ? 'close menu' : 'open menu'}
            onClick={toggleDrawer}
            sx={{
              mr: 2,
              color: 'primary.main',
              width: 48, // increase width (default is 40px)
              height: 48, // increase height (default is 40px)
              '& svg': {
                // target the icon inside
                fontSize: 32, // increase icon size (default is 24px)
              },
            }}
          >
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>

          <Typography
            variant="h6"
            component="div"
            sx={{
              textAlign: 'center',
              userSelect: 'none',
              fontFamily: "'Allura', cursive",
              fontSize: { xs: '1.2rem', sm: '2rem' },
              fontWeight: 700,
              color: 'primary.main',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
              '&:hover': {
                color: 'secondary.main',
              },
            }}
            onClick={() => {
              window.location.href = '#intro';
            }}
          >
            {t('topbar.title')}
          </Typography>

          <Box sx={{ width: 48 }} />
        </Toolbar>
      </AppBar>
      <Box sx={{ height: { xs: 56, sm: 64 } }} />
    </>
  );
};

export default TopBar;
