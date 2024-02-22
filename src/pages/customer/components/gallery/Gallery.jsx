import React, { createRef, useEffect, useRef, useState } from 'react';
import './gallery.scss';
import items from './items.json';

import { isMobile } from 'react-device-detect';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useTransition, animated } from 'react-spring';
export default function Gallery({ language }) {
  const [list, setList] = useState({});
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [thumbnailRange, setThumbnailRange] = useState([0, 3]);
  const photos = [
    {
      path: 'assets/gallery2/MANTHOS-01.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-02.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-03.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-04.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-05.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-06.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-07.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-08.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-09.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-10.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-11.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-12.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-13.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-14.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-15.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-16.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-17.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-18.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-19.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-20.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-21.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-22.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-23.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-24.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-25.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-26.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-27.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-28.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-29.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-30.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-31.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-32.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-33.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-34.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-35.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-36.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-37.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-38.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-39.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-40.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-41.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-42.jpg',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-43.png',
      nodeRef: createRef(null),
    },
    {
      path: 'assets/gallery2/MANTHOS-44.jpg',
      nodeRef: createRef(null),
    },
  ];

  const [fullscreen, setFullscreen] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    setList(items.find((i) => i.language === language.id).data);
  }, [language]);
  useEffect(() => {
    if (currentPhotoIndex === 0) {
      setThumbnailRange([0, 3]);
    } else if (currentPhotoIndex === 1) {
      setThumbnailRange([0, 4]);
    } else if (currentPhotoIndex === 2) {
      setThumbnailRange([0, 5]);
    } else if (currentPhotoIndex === 3) {
      setThumbnailRange([1, 6]);
    } else if (currentPhotoIndex >= 4 && currentPhotoIndex <= 41) {
      setThumbnailRange([currentPhotoIndex - 2, currentPhotoIndex + 3]);
    }
    if (currentPhotoIndex != 0) {
      document.getElementsByClassName('selected')[0].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
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
        <ArrowBackIosNewIcon
          class={'prev ' + (isMobile && 'mobile')}
          onClick={() => {
            setCurrentPhotoIndex((prev) => {
              if (prev === 0) return prev;
              return prev - 1;
            });
          }}
        />

        <img
          class={'centerImage ' + (isMobile && 'mobile')}
          src={photos[currentPhotoIndex]?.path}
          alt=""
        />

        <ArrowForwardIosIcon
          class={'next ' + (isMobile && 'mobile')}
          onClick={() => {
            setCurrentPhotoIndex((prev) => {
              if (prev === photos.length - 1) return prev;
              return prev + 1;
            });
          }}
        />
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
            <img
              loading="lazy"
              class={
                (currentPhotoIndex === index ? 'selected ' : ' ') +
                (isMobile ? 'mobile ' : ' ') +
                (index === 0 ? 'first ' : '')
              }
              src={i.path}
              alt=""
              onClick={() => {
                setCurrentPhotoIndex(index);
                document.getElementsByClassName('selected')[0].scrollIntoView({
                  behavior: 'smooth',
                  block: 'nearest',
                  inline: 'center',
                });
              }}
            ></img>
          );
        })}
      </div>
      {/* <TransitionGroup className="list">
          {photos
            .slice(thumbnailRange[0], thumbnailRange[1])
            .map(({ path, nodeRef }, index) => {
              return (
                <CSSTransition
                  key={thumbnailRange[0] + index}
                  nodeRef={nodeRef}
                  timeout={500}
                  classNames="item"
                >
                  <img
                    ref={nodeRef}
                    class={
                      (currentPhotoIndex === thumbnailRange[0] + index
                        ? 'selected '
                        : ' ') +
                      (isMobile ? 'mobile ' : ' ') +
                      (index === 0 ? 'first ' : '')
                    }
                    onClick={() => {
                      setCurrentPhotoIndex(thumbnailRange[0] + index);
                    }}
                    src={path}
                    alt=""
                  />
                </CSSTransition>
              );
            })}
        </TransitionGroup> */}
    </div>
  );
}
