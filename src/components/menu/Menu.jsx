import React from 'react';
import './menu.scss';
import list from './items.json';
import { isMobile } from 'react-device-detect';
import HomeIcon from '@mui/icons-material/Home';
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import CollectionsIcon from '@mui/icons-material/Collections';
import PhoneIcon from '@mui/icons-material/Phone';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
export default function Menu({ menuOpen, setMenuOpen }) {
  return (
    <div className={'menu ' + (menuOpen && 'active')}>
      <div className="container">
        <div className="spacer"></div>
        <ul>
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
              ) : i.location === '#reservation' ? (
                <BookOnlineIcon className="icon" />
              ) : i.location === '#contact' ? (
                <PhoneIcon className="icon" />
              ) : (
                ''
              )}
              <a href={i.location} class={'' + (menuOpen && 'active')}>
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
