import axios from 'axios';
import ICAL from 'ical.js';

let cachedData: string | null = null;
let lastFetched = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

const icalUrls = [
  'https://www.airbnb.gr/calendar/ical/918194955382388607.ics?s=0ac559498f1faa77f6697e0072e1d4a1',
  'https://admin.booking.com/hotel/hoteladmin/ical.html?t=150369dd-8bfb-4802-a4b0-e80cecf98e15',
  'http://www.vrbo.com/icalendar/53129a118e954927b0b0db04c07544c5.ics?nonTentative',
];

export async function GET() {
  const now = Date.now();

  if (cachedData && now - lastFetched < CACHE_DURATION) {
    // parse to extract the original lastFetched timestamp
    const parsed = JSON.parse(cachedData);
    const responseBody = {
      lastFetched: parsed.lastFetched,
      ranges: parsed.ranges,
    };

    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'X-Cache': 'HIT',
      },
    });
  }

  try {
    const responses = await Promise.all(
      icalUrls.map((url) =>
        axios.get(url, { responseType: 'text' }).then((res) => res.data)
      )
    );

    const ranges: { start: string; end: string }[] = [];

    for (const data of responses) {
      const jcalData = ICAL.parse(data);
      const comp = new ICAL.Component(jcalData);
      const vevents = comp.getAllSubcomponents('vevent');

      for (const vevent of vevents) {
        const event = new ICAL.Event(vevent);
        ranges.push({
          start: event.startDate.toJSDate().toISOString(),
          end: event.endDate.toJSDate().toISOString(),
        });
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
