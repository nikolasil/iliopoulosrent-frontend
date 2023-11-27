import React from 'react';
import { useState } from 'react';
import Topbar from './components/topbar/Topbar';
import Intro from './components/intro/Intro';
import Menu from './components/menu/Menu';
import './app.scss';
import { isMobile } from 'react-device-detect';
import Gallery from './components/gallery/Gallery';
import Reservation from './components/reservation/Reservation';
import Contact from './components/contact/Contact';
import Informations from './components/informations/Informations';
import languages from './languages.json';

function App() {
  const [backdropOpen, setBackdropOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  let storedLanguage = localStorage.getItem('language');
  if (storedLanguage != null) {
    storedLanguage = JSON.parse(storedLanguage);
  }
  // let storedLanguage = null;
  console.log(localStorage.getItem('language'));
  const [language, setLanguage] = useState(
    storedLanguage != null
      ? languages.find((i) => i.initials === storedLanguage.initials)
      : languages.at(0)
  );
  return (
    <div className="app">
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        languages={languages}
        language={language}
        setLanguage={setLanguage}
      />
      <div className={'sections ' + (isMobile && 'mobile')}>
        <Intro language={language} />
        <Gallery language={language} />
        <Informations language={language} />
        <Reservation language={language} />
        <Contact language={language} />
      </div>
    </div>
  );
}

export default App;
