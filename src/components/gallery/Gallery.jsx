import React, { useEffect, useState } from 'react';
import './gallery.scss';
import ImageGallery from 'react-image-gallery';
import items from './items.json';
import photos from './photos.json';
import { isMobile } from 'react-device-detect';

export default function Gallery({ language }) {
  const [list, setList] = useState({});
  useEffect(() => {
    setList(items.find((i) => i.language === language.id).data);
  }, [language]);
  return (
    <div className={'gallery ' + (isMobile && 'mobile')} id="gallery">
      <h1>{list.title}</h1>
      <div>
        <ImageGallery
          className={'images ' + (isMobile && 'mobile')}
          items={photos}
          showIndex={true}
          showThumbnails={false}
          slideInterval={2000}
          lazyLoad={true}
        />
      </div>
    </div>
  );
}
