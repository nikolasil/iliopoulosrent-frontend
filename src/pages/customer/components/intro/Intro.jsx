import React, { useEffect, useState } from 'react';
import './intro.scss';
import items from './items.json';
import { Button } from '@mui/material';

export default function Intro({ language }) {
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(items.find((i) => i.language === language.id).data);
  }, [language]);

  return (
    <div className="intro" id="intro">
      <h1>{list.title}</h1>
      <div>
        <Button className="button" variant="outlined" href="#contact">
          {list.buttonLeft}
        </Button>
        <Button className="button" variant="contained" href="#reservation">
          {list.buttonRight}
        </Button>
      </div>
    </div>
  );
}
