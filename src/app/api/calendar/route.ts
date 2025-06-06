import axios from 'axios';
import ICAL from 'ical.js';

let cachedData: string | null = null;
let lastFetched = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

const icalSources = [
  {
    name: 'airbnb',
    url: 'https://www.airbnb.gr/calendar/ical/918194955382388607.ics?s=0ac559498f1faa77f6697e0072e1d4a1',
  },
  {
    name: 'booking',
    url: 'https://admin.booking.com/hotel/hoteladmin/ical.html?t=150369dd-8bfb-4802-a4b0-e80cecf98e15',
  },
  {
    name: 'vrbo',
    url: 'http://www.vrbo.com/icalendar/53129a118e954927b0b0db04c07544c5.ics?nonTentative',
  },
];

function parseAirbnb(data: string) {
  const jcalData = ICAL.parse(data);
  const comp = new ICAL.Component(jcalData);
  const vevents = comp.getAllSubcomponents('vevent');

  return vevents.map((vevent) => {
    const event = new ICAL.Event(vevent);
    return {
      start: event.startDate.toJSDate().toISOString(),
      end: event.endDate.toJSDate().toISOString(),
    };
  });
}

function parseBooking(data: string) {
  const jcalData = ICAL.parse(data);
  const comp = new ICAL.Component(jcalData);
  const vevents = comp.getAllSubcomponents('vevent');

  return vevents.map((vevent) => {
    const event = new ICAL.Event(vevent);
    // Booking often uses all-day format where endDate is exclusive
    const start = event.startDate.toJSDate();
    const end = new Date(event.endDate.toJSDate().getTime() - 1); // Make it inclusive
    return {
      start: start.toISOString(),
      end: end.toISOString(),
    };
  });
}

function parseVrbo(data: string) {
  const jcalData = ICAL.parse(data);
  const comp = new ICAL.Component(jcalData);
  const vevents = comp.getAllSubcomponents('vevent');

  return vevents.map((vevent) => {
    const event = new ICAL.Event(vevent);
    const start = event.startDate.toJSDate();
    const end = new Date(event.endDate.toJSDate().getTime() - 1); // VRBO also uses exclusive end date
    return {
      start: start.toISOString(),
      end: end.toISOString(),
    };
  });
}

export async function GET() {
  const now = Date.now();

  if (cachedData && now - lastFetched < CACHE_DURATION) {
    const parsed = JSON.parse(cachedData);
    return new Response(JSON.stringify({
      lastFetched: parsed.lastFetched,
      ranges: parsed.ranges,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Cache': 'HIT',
      },
    });
  }

  try {
    const responses = await Promise.all(
      icalSources.map((source) =>
        axios.get(source.url, { responseType: 'text' }).then((res) => ({
          name: source.name,
          data: res.data,
        }))
      )
    );

    let ranges: { start: string; end: string }[] = [];

    for (const { name, data } of responses) {
      switch (name) {
        case 'airbnb':
          ranges = ranges.concat(parseAirbnb(data));
          break;
        case 'booking':
          ranges = ranges.concat(parseBooking(data));
          break;
        case 'vrbo':
          ranges = ranges.concat(parseVrbo(data));
          break;
      }
    }

    const responseBody = {
      lastFetched: new Date(now).toISOString(),
      ranges,
    };

    const json = JSON.stringify(responseBody);
    cachedData = json;
    lastFetched = now;

    return new Response(json, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Cache': 'MISS',
      },
    });
  } catch {
    return new Response(
      JSON.stringify({ error: 'Server error fetching one or more iCal feeds' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}