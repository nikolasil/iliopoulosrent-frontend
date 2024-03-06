import React, { useEffect, useRef, useState } from 'react';
import './gallery.scss';
import items from './items.json';
import photos from './photos.json';
import { isMobile } from 'react-device-detect';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { AsyncImage } from 'loadable-image';
import { Blur } from 'transitions-kit';

export default function Gallery({ language }) {
  const [list, setList] = useState({});
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const imageRef = useRef(null);
  const [firstUpdate, setFirstUpdate] = useState(true);
  useEffect(() => {
    setList(items.find((i) => i.language === language.id).data);
  }, [language]);

  useEffect(() => {
    if (!firstUpdate)
      document.getElementsByClassName('selected')[0].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    setFirstUpdate(false);
  }, [currentPhotoIndex]);

  const enterFullscreen = () => {
    const elem = imageRef.current;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      // Firefox
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      // Chrome, Safari, and Opera
      elem.webkitRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari, and Opera
      document.webkitExitFullscreen();
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      enterFullscreen();
      setFullscreen(true);
    } else {
      exitFullscreen();
      setFullscreen(false);
    }
  };

  return (
    <div className={'gallery ' + (isMobile && 'mobile')} id="gallery">
      <h1>{list.title}</h1>

      <div ref={imageRef} class={'container ' + (isMobile && 'mobile')}>
        <div class={'counter ' + (isMobile && 'mobile')}>
          {currentPhotoIndex + 1 + '/' + photos.length}
        </div>
        <div>
          <ArrowBackIosNewIcon
            class={'prev ' + (isMobile && 'mobile')}
            onClick={() => {
              setCurrentPhotoIndex((prev) => {
                if (prev === 0) return prev;
                return prev - 1;
              });
            }}
          />

          {photos[currentPhotoIndex]?.url != null ? (
            <iframe
              src={photos[currentPhotoIndex]?.url}
              width={photos[currentPhotoIndex]?.width}
              height="90%"
              title="www.iliopoulosrent.com"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          ) : (
            <img
              class={'centerImage ' + (isMobile && 'mobile')}
              src={photos[currentPhotoIndex]?.path}
              alt=""
            />
          )}

          <ArrowForwardIosIcon
            class={'next ' + (isMobile && 'mobile')}
            onClick={() => {
              setCurrentPhotoIndex((prev) => {
                if (prev === photos.length - 1) return prev;
                return prev + 1;
              });
            }}
          />
        </div>
        {!fullscreen ? (
          <FullscreenIcon
            class={'fullscreen ' + (isMobile && 'mobile')}
            onClick={handleFullscreen}
          />
        ) : (
          <FullscreenExitIcon
            class={'fullscreen ' + (isMobile && 'mobile')}
            onClick={handleFullscreen}
          />
        )}
      </div>
      <div className="list">
        {photos.map((i, index) => {
          return (
            <AsyncImage
              src={i?.path}
              Transition={Blur}
              loader={<div style={{ background: '#888' }} />}
              className={
                'thumbnail ' +
                (currentPhotoIndex === index ? ' selected ' : ' ') +
                (isMobile ? ' mobile ' : ' ')
              }
              alt=""
              onClick={() => {
                setCurrentPhotoIndex(index);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
