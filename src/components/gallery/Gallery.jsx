import React, { useEffect, useRef } from 'react';
import './gallery.scss';
import ImageGallery from 'react-image-gallery';
import images from './photos.json';
import { isMobile } from 'react-device-detect';

export default function Gallery() {
  return (
    <div className={'gallery ' + (isMobile && 'mobile')} id="gallery">
      <h1>Gallery</h1>
      <div>
        <ImageGallery
          className={'images ' + (isMobile && 'mobile')}
          items={images}
          showIndex={true}
          showThumbnails={false}
          slideInterval={2000}
          lazyLoad={true}
        />
      </div>
    </div>
  );
}
