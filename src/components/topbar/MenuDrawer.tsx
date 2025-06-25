'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import InfoIcon from '@mui/icons-material/Info';
import CollectionsIcon from '@mui/icons-material/Collections';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import { useTranslations } from 'next-intl';
import { locales } from '@/i18n/routing';
import Cookies from 'js-cookie';

type MenuDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const navLinks = [
  {
    label: 'intro.title',
    href: '#intro',
    icon: <HomeIcon fontSize="medium" />,
  },
  {
    label: 'informations.title',
    href: '#informations',
    icon: <InfoIcon fontSize="medium" />,
  },
  {
    label: 'gallery.title',
    href: '#gallery',
    icon: <CollectionsIcon fontSize="medium" />,
  },
  {
    label: 'reservations.title',
    href: '#reservations',
    icon: <BedroomParentIcon fontSize="medium" />,
  },
  {
    label: 'contact.title',
    href: '#contact',
    icon: <ContactMailIcon fontSize="medium" />,
  },
];

const MenuDrawer: React.FC<MenuDrawerProps> = ({ open, onClose }) => {
  const t = useTranslations();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(t('id'));

  const router = useRouter();
  const pathname = usePathname();

  const openSettings = () => setSettingsOpen(true);
  const closeSettings = () => setSettingsOpen(false);

  const handleClick = (href: string) => {
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

      onClose();
    } else if (href.startsWith('/')) {
      window.location.href = href;
      onClose();
    }
  };

  return (
    <>
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            width: { xs: '80dvw', sm: '50dvw', md: '40dvw' }, // wider on xs, medium on sm, default on md+
            maxWidth: 360,
            borderTopRightRadius: 32,
            borderBottomRightRadius: 32,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundColor: 'background.paper',
            boxShadow: 'rgba(0, 0, 0, 0.2) 4px 0px 12px',
            px: { xs: 2, sm: 4, md: 6 }, // responsive horizontal padding
            py: { xs: 3, sm: 4 }, // add vertical padding on smaller screens
          },
        }}
        ModalProps={{
          keepMounted: true,
          BackdropProps: {
            sx: {
              backgroundColor: 'rgba(0,0,0,0.3)',
              backdropFilter: 'blur(2px)',
            },
          },
        }}
      >
        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 2, sm: 3 },
            userSelect: 'none',
            px: { xs: 1, sm: 0 }, // reduce padding on xs
          }}
        >
          {navLinks.map(({ label, href, icon }) => (
            <ListItem key={label} disablePadding sx={{ width: '100%' }}>
              <ListItemButton
                sx={{
                  justifyContent: 'center',
                  flexDirection: 'column',
                  py: { xs: 1.5, sm: 2 },
                  borderRadius: 3,
                  transition: 'all 0.25s ease',
                  color: 'text.primary',
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    cursor: 'pointer',
                  },
                }}
                onClick={() => handleClick(href)}
              >
                {icon}
                <ListItemText
                  primary={t(label)}
                  sx={{
                    mt: 1,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: { xs: '0.9rem', sm: '1rem' }, // smaller font on xs
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: { xs: 3, sm: 4 }, mx: { xs: 3, sm: 6 } }} />

        <Box
          sx={{
            px: { xs: 1, sm: 6 },
            mb: 4,
            width: '100%',
            maxWidth: 300,
            mx: 'auto',
          }}
        >
          <Button
            variant="outlined"
            fullWidth
            onClick={openSettings}
            sx={{
              borderRadius: 3,
              fontWeight: 'bold',
              py: 1.5,
              textTransform: 'none',
            }}
          >
            {t('menu.settingsButton')}
          </Button>
        </Box>
      </Drawer>

      <Dialog open={settingsOpen} onClose={closeSettings}>
        <DialogTitle>{t('menu.settingsButton')}</DialogTitle>
        <DialogContent sx={{ minWidth: 300 }}>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="locale-select-label">
              {t('menu.language')}
            </InputLabel>
            <Select
              labelId="locale-select-label"
              value={selectedLang}
              label={t('menu.language')}
              onChange={(event: SelectChangeEvent) => {
                const newLang = event.target.value;
                setSelectedLang(newLang);

                // ✅ Set cookie to persist language
                Cookies.set('NEXT_LOCALE', newLang, { expires: 365 });

                // ✅ Replace locale segment in URL
                const segments = pathname.split('/');
                if (locales.some((l) => l.locale === segments[1])) {
                  segments[1] = newLang;
                }
                const newPath = segments.join('/') || '/';
                router.replace(newPath);

                closeSettings();
                onClose();
              }}
            >
              {locales.map((dict) => (
                <MenuItem key={dict.locale} value={dict.locale}>
                  {dict.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MenuDrawer;
