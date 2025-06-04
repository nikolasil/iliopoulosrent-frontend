'use client';

import React from 'react';
import { Box, Typography, Grid, Link } from '@mui/material';
import platforms from './platforms.json';
import MyCalendar from './MyCalendar';
import SectionTitle from '@/components/SectionTitle';
import SectionWrapper from '@/components/SectionWrapper';
import { useTranslations } from 'next-intl';

const Reservation = () => {
  const t =  useTranslations();

  return (
    <SectionWrapper
      id="reservations"
      heightCalc={{ xs: `calc(120dvh - 56px)` }}
    >
      <SectionTitle title={t('reservations.title')} />

      <Typography variant="body1" sx={{ mb: 5, maxWidth: 800 }}>
        {t('reservations.subTitle')}
      </Typography>

      {/* Platform icons */}
      <Grid
        container
        columns={{ xs: 6, sm: 12 }}
        spacing={{ xs: 2, sm: 3, md: 2 }}
        justifyContent="center"
        sx={{ mb: 6 }}
      >
        {platforms.map((platform) => (
          <Grid
            key={platform.name}
            size={{ xs: 3, sm: 3 }}
            sx={{ textAlign: 'center' }}
          >
            <Link
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{ display: 'inline-block' }}
            >
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid white',
                  borderRadius: 2,
                  boxSizing: 'border-box',
                  transition: 'transform 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={platform.icon}
                  alt={platform.name}
                  sx={{
                    maxWidth: '60%',
                    maxHeight: '60%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>

      {/* Calendar */}
      <Box sx={{ maxWidth: 900, mx: 'auto' }}>
        <MyCalendar icalUrl="/api/calendar" />
      </Box>
    </SectionWrapper>
  );
};

export default Reservation;
