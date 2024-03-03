import React, { useEffect, useState } from 'react';
import './intro.scss';
import items from './items.json';
import { Button } from '@mui/material';
import { isMobile } from 'react-device-detect';
import PhoneIcon from '@mui/icons-material/Phone';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
export default function Intro({ language }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(items.find((i) => i.language === language.id).data);
  }, [language]);

  return (
    <div className={'intro ' + (isMobile && 'mobile')} id="intro">
      <div className={'image ' + (isMobile && 'mobile')}></div>
      <div className="content">
        <h1 className={isMobile && 'mobile'}>{list.title}</h1>
        <div>
          <Button
            className="button"
            size="large"
            variant="outlined"
            startIcon={<PhoneIcon />}
            href="#contact"
          >
            {list.buttonLeft}
          </Button>
          <Button
            className="button"
            size="large"
            variant="contained"
            startIcon={<BookOnlineIcon />}
            href="#reservation"
          >
            {list.buttonRight}
          </Button>
        </div>
      </div>
    </div>
  );
}
