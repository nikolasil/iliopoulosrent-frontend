import React from 'react';
import { Menu, Close } from '@mui/icons-material';
import './topbar.scss';
import { isMobile } from 'react-device-detect';

export default function Topbar({ menuOpen, setMenuOpen }) {
  return (
    <div
      className={'topbar ' + (menuOpen && ' active ') + (isMobile && ' mobile ')}
    >
      <div className={'wrapper ' + (isMobile && 'mobile')}>
        <div className="left">
          {' '}
          {menuOpen && (
            <Close className="closeButton" onClick={() => setMenuOpen(false)} />
          )}
          {!menuOpen && (
            <Menu
              className="menuButton"
              onClick={() => {
                setMenuOpen(true);
              }}
            />
          )}
        </div>
        <div className="middle">
          <a href="#intro" className={!isMobile ? 'logo' : 'small-logo'}>
            Seaside House In Nea Makri
          </a>
        </div>

        <div className="right"></div>
      </div>
    </div>
  );
}
