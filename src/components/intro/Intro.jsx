import React, { useEffect, useRef } from 'react';
import './intro.scss';
import { Button } from '@mui/material';

export default function Intro() {
  return (
    <div className="intro" id="intro">
      <h1>
        Escape to modern seaside luxury with our stunning entire house rental
      </h1>
      <div>
        <Button className="button" variant="outlined" href="#contact">
          Contact
        </Button>
        <Button className="button" variant="contained" href="#reservation">
          Book now
        </Button>
      </div>
    </div>
  );
}
