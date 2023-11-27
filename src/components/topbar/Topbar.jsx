import React, { Fragment } from 'react';
import { Menu, Close } from '@mui/icons-material';
import './topbar.scss';
import { isMobile } from 'react-device-detect';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Topbar({ menuOpen, setMenuOpen }) {
  return (
    <div className={'topbar ' + (menuOpen && 'active')}>
      <div className="wrapper">
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

        {!isMobile && <div className="right"></div>}
      </div>
    </div>
  );
}
