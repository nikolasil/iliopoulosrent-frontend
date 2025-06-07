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

// Converts "YYYY-MM-DD" to a JS Date (local time, no timezones involved)
const toDate = (dateStr: string): Date => {
  const [year, month, day] = dateStr.split('-').map(Number);
  return new Date(year, month - 1, day);
};

// Checks if a date is between start and end, inclusive
const isSameOrBetween = (target: Date, start: Date, end: Date): boolean => {
  const t = new Date(target.getFullYear(), target.getMonth(), target.getDate());
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  return t >= s && t <= e;
};

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 60 * 60 * 24 * 365],
    ['month', 60 * 60 * 24 * 30],
    ['day', 60 * 60 * 24],
    ['hour', 60 * 60],
    ['minute', 60],
    ['second', 1],
  ];

  for (const [unit, secondsInUnit] of units) {
    const value = Math.floor(diffSec / secondsInUnit);
    if (value >= 1) {
      const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' });
      return rtf.format(-value, unit);
    }
  }

  return 'just now';
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
          start: toDate(range.start),
          end: toDate(range.end),
        }));

        setBookedRanges(parsedRanges);
        setLastFetched(new Date(data.lastFetched));
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchRanges();
  }, [apiUrl]);

  const isDateBooked = (date: Date) => {
    return bookedRanges.some((range) =>
      isSameOrBetween(date, range.start, range.end)
    );
  };

  const isBeforeToday = (date: Date) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const target = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    return target < today;
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== 'month') return null;

    const booked = isDateBooked(date) || isBeforeToday(date);

    return (
      <div
        className={`date-number ${booked ? 'booked' : 'available'}`}
        aria-label={booked ? 'Booked date' : 'Available date'}
      >
        {booked ? '-' + date.getDate() + '-' : date.getDate()}
      </div>
    );
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
            tileContent={tileContent}
            minDate={new Date()}
            calendarType="gregory"
            showNeighboringMonth
            showDoubleView={!isMobile}
          />
          {lastFetched && (
            <Typography variant="caption" color="text.secondary" mt={1}>
              {t('reservations.lastUpdated')} {formatRelativeTime(lastFetched)}
            </Typography>
          )}
        </>
      )}

      <style jsx global>{`
        .react-calendar {
          width: 100% !important;
          font-weight: 400;
        }
        .react-calendar__tile > abbr {
          visibility: hidden;
        }
        .date-number {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .date-number.booked {
          color: rgb(100, 0, 0);
          font-size: 0.8rem;
        }
        .date-number.available {
          color: rgb(0, 100, 0);
          font-weight: 600;
          font-size: 1rem;
        }

        @media (max-width: 600px) {
          .react-calendar {
            font-size: 0.75rem;
          }
          .date-number {
            font-size: 0.85rem;
          }
        }
      `}</style>
    </Box>
  );
};

export default MyCalendar;
