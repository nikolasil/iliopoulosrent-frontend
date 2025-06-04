'use client';

import React, {  useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ICAL from 'ical.js';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

interface BookingRange {
  start: Date;
  end: Date;
}

const MyCalendar = ({ icalUrl }: { icalUrl: string }) => {
  const [bookedRanges, setBookedRanges] = useState<BookingRange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchICal = async () => {
      try {
        const res = await fetch(icalUrl);
        if (!res.ok) throw new Error('Failed to fetch iCal feed');
        const text = await res.text();

        const jcalData = ICAL.parse(text);
        const comp = new ICAL.Component(jcalData);
        const vevents = comp.getAllSubcomponents('vevent');

        const ranges: BookingRange[] = vevents.map((vevent) => {
          const event = new ICAL.Event(vevent);
          return {
            start: event.startDate.toJSDate(),
            end: event.endDate.toJSDate(),
          };
        });

        setBookedRanges(ranges);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'Error fetching calendar');
        setLoading(false);
      }
    };

    fetchICal();
  }, [icalUrl]);

  const isDateBooked = (date: Date) => {
    return bookedRanges.some(
      (range) => date >= range.start && date < range.end
    );
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return '';
    return isDateBooked(date) ? 'booked-date' : 'available-date';
  };

  const t =  useTranslations();

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
        <Calendar
          tileClassName={tileClassName}
          minDate={new Date()}
          calendarType="gregory"
          showNeighboringMonth
          showDoubleView={!isMobile}
        />
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
