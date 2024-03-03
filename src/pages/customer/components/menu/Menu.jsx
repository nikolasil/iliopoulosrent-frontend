import React, { useEffect, useState } from 'react';
import './menu.scss';
import items from './items.json';
import { isMobile } from 'react-device-detect';
import HomeIcon from '@mui/icons-material/Home';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import CollectionsIcon from '@mui/icons-material/Collections';
import PhoneIcon from '@mui/icons-material/Phone';
import InfoIcon from '@mui/icons-material/Info';
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
} from '@mui/material';

export default function Menu({
  menuOpen,
  setMenuOpen,
  languages,
  language,
  setLanguage,
}) {
  const [changeLanguagePopup, setChangeLanguagePopup] = useState(false);
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(items.find((i) => i.language === language.id).data.list);
  }, [language]);

  const handleChangeLanguage = (event) => {
    console.log(event.target.value);
    setLanguage(event.target.value);
    localStorage.setItem('language', JSON.stringify(event.target.value));
    setChangeLanguagePopup(true);
  };

  const handleChangeLanguagePopupClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setChangeLanguagePopup(false);
  };

  return (
    <div className={'menu ' + (menuOpen && 'active')}>
      <div className="container">
        <div className="spacer"></div>

        <Snackbar
          open={changeLanguagePopup}
          autoHideDuration={6000}
          onClose={handleChangeLanguagePopupClose}
        >
          <Alert
            onClose={handleChangeLanguagePopupClose}
            severity="success"
            sx={{ width: '100%' }}
          >
            {items.find((i) => i.language === language.id).data
              .languageChangeMessage +
              ' ' +
              language.desc +
              ' ' +
              language.initials}
          </Alert>
        </Snackbar>
        <ul>
          <div className="language-container">
            <FormControl variant="standard" size="small" className="language">
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                label="Language"
                onChange={handleChangeLanguage}
              >
                {languages
                  .filter((i) => i.initials !== '🇬🇷')
                  .map((i) => (
                    <MenuItem value={i}>{i.desc + ' ' + i.initials}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>

          {list.map((i) => (
            <li
              onClick={() => {
                setMenuOpen(false);
              }}
              onMouseEnter={(e) => {
                window.location = i.location;
              }}
            >
              {i.location === '#intro' ? (
                <HomeIcon className="icon" />
              ) : i.location === '#gallery' ? (
                <CollectionsIcon className="icon" />
              ) : i.location === '#informations' ? (
                <InfoIcon className="icon" />
              ) : i.location === '#reservation' ? (
                <BookOnlineIcon className="icon" />
              ) : i.location === '#contact' ? (
                <PhoneIcon className="icon" />
              ) : (
                ''
              )}
              <a
                href={i.location}
                class={'' + (menuOpen && 'active')}
              >
                {!isMobile ? i.name : i.mobileName}
              </a>
            </li>
          ))}
        </ul>
        <div
          className="closer"
          onClick={() => {
            setMenuOpen(false);
          }}
        ></div>
      </div>
    </div>
  );
}
