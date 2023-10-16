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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="app">
      <Topbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className={'sections ' + (isMobile && 'mobile')}>
        <Intro />
        <Gallery />
        <Reservation />
        <Contact />
      </div>
    </div>
  );
}

export default App;
