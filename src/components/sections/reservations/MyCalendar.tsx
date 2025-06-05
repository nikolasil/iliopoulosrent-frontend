'use client';

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

interface BookingRange {
  start: Date;
  end: Date;
}

interface BookingRange {
  start: Date;
  end: Date;
}

const MyCalendar = ({ apiUrl }: { apiUrl: string }) => {
  const [bookedRanges, setBookedRanges] = useState<BookingRange[]>([]);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const t = useTranslations();

  useEffect(() => {
    const fetchRanges = async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error('Failed to fetch availability');

        const data: {
          lastFetched: string;
          ranges: { start: string; end: string }[];
        } = await res.json();

        const parsedRanges = data.ranges.map((range) => ({
          start: new Date(range.start),
          end: new Date(range.end),
        }));

        setBookedRanges(parsedRanges);
        setLastFetched(new Date(data.lastFetched));
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Unknown error fetching availability');
        }
        setLoading(false);
      }
    };

    fetchRanges();
  }, [apiUrl]);

  const isDateBooked = (date: Date) => {
    return bookedRanges.some(
      (range) => date >= range.start && date <= range.end
    );
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return '';
    return isDateBooked(date) ? 'booked-date' : 'available-date';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2,
        width: '100%',
        maxWidth: 900,
        mx: 'auto',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {t('reservations.availability')}
      </Typography>

      {loading && (
        <Typography variant="body2" color="text.secondary">
          Loading availability...
        </Typography>
      )}
      {error && (
        <Typography variant="body2" color="error">
          Error loading calendar: {error}
        </Typography>
      )}

      {!loading && !error && (
        <>
          <Calendar
            tileClassName={tileClassName}
            minDate={new Date()}
            calendarType="gregory"
            showNeighboringMonth
            showDoubleView={!isMobile}
          />
          {lastFetched && (
            <Typography variant="caption" color="text.secondary" mt={1}>
              Last updated: {lastFetched.toLocaleString()}
            </Typography>
          )}
        </>
      )}

      <style jsx global>{`
        .react-calendar {
          width: 100% !important;
        }
        .react-calendar__tile.booked-date {
          background-color: #e57373;
        }
        .react-calendar__tile.booked-date:hover {
          background-color: #ef5350;
        }

        @media (max-width: 600px) {
          .react-calendar {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </Box>
  );
};

export default MyCalendar;
