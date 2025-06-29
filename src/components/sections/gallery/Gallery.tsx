'use client';
import React, { useMemo, useState } from 'react';
import { Typography } from '@mui/material';
import items from './photos.json';
import MediaDisplay from './MediaDisplay';
import Thumbnails from './Thumbnails';

import SectionTitle from '@/components/SectionTitle';
import SectionWrapper from '@/components/SectionWrapper';
import { useTranslations } from 'next-intl';

const THUMBNAILS_VISIBLE = 3;

const Gallery: React.FC = () => {
  const t = useTranslations();

  const [currentIndex, setCurrentIndex] = useState(0);
  const total = items.length;
  const maxIndex = total - 1;

  const currentItem = items[currentIndex];

  const thumbStartIndex = useMemo(() => {
    const start = currentIndex - Math.floor(THUMBNAILS_VISIBLE / 2);
    if (start < 0) return 0;
    return Math.min(start, maxIndex - THUMBNAILS_VISIBLE + 1);
  }, [currentIndex, maxIndex]);

  const thumbEndIndex = Math.min(thumbStartIndex + THUMBNAILS_VISIBLE, total);
  const visibleThumbs = items.slice(thumbStartIndex, thumbEndIndex);

  const next = () => setCurrentIndex((i) => (i + 1 > maxIndex ? 0 : i + 1));
  const prev = () => setCurrentIndex((i) => (i - 1 < 0 ? maxIndex : i - 1));
  const scrollLeft = () => setCurrentIndex((i) => Math.max(i - 1, 0));
  const scrollRight = () => setCurrentIndex((i) => Math.min(i + 1, maxIndex));

  return (
    <SectionWrapper id="gallery">
      <SectionTitle title={t('gallery.title')} />
      <MediaDisplay currentItem={currentItem} onPrev={prev} onNext={next} />
      <Typography
        variant="body2"
        fontWeight="bold"
        color="text.secondary"
        mb={2}
      >
        {currentIndex + 1} / {total}
      </Typography>
      <Thumbnails
        thumbs={visibleThumbs}
        currentIndex={currentIndex}
        startIndex={thumbStartIndex}
        total={total}
        onThumbClick={setCurrentIndex}
        onScrollLeft={scrollLeft}
        onScrollRight={scrollRight}
      />
    </SectionWrapper>
  );
};

export default Gallery;
