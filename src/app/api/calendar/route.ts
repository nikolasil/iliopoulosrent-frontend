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

function toDateOnly(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
// Parse a single .ics string into date ranges
function parseEvents(data: string, sourceName: string) {
  const jcalData = ICAL.parse(data);
  const comp = new ICAL.Component(jcalData);
  const vevents = comp.getAllSubcomponents('vevent');

  return vevents.map((vevent) => {
    const event = new ICAL.Event(vevent);
    const start = event.startDate.toJSDate();
    const end = event.endDate.toJSDate();

    // Subtract one day from end (iCal end is exclusive)
    const adjustedEnd = new Date(end);
    adjustedEnd.setUTCDate(adjustedEnd.getUTCDate() - 1);

    return {
      start: toDateOnly(start),
      end: toDateOnly(adjustedEnd),
      source: [sourceName],
    };
  });
}

function mergeRanges(
  ranges: { start: string; end: string; source: string[] }[]
) {
  if (ranges.length === 0) return [];

  const today = toDateOnly(new Date());

  // Remove past ranges
  ranges = ranges.filter((range) => range.end >= today);

  // Sort by start
  ranges.sort(
    (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
  );

  const merged: typeof ranges = [ranges[0]];

  for (let i = 1; i < ranges.length; i++) {
    const last = merged[merged.length - 1];
    const current = ranges[i];

    if (current.start <= last.end) {
      last.end = current.end > last.end ? current.end : last.end;
      last.source = Array.from(new Set([...last.source, ...current.source]));
    } else {
      merged.push(current);
    }
  }

  return merged;
}

export async function GET() {
  const now = Date.now();

  if (cachedData && now - lastFetched < CACHE_DURATION) {
    const parsed = JSON.parse(cachedData);
    return new Response(
      JSON.stringify({
        lastFetched: parsed.lastFetched,
        ranges: parsed.ranges,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-Cache': 'HIT',
        },
      }
    );
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

    let allRanges: { start: string; end: string; source: string[] }[] = [];

    for (const { name, data } of responses) {
      allRanges = allRanges.concat(parseEvents(data, name));
    }

    const mergedRanges = mergeRanges(allRanges);

    const responseBody = {
      lastFetched: new Date(now).toISOString(),
      ranges: mergedRanges,
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
