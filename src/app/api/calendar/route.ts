import axios from 'axios';

let cachedData: string | null = null;
let lastFetched = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

export async function GET() {
  const now = Date.now();

  if (cachedData && now - lastFetched < CACHE_DURATION) {
    return new Response(cachedData, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar',
        'X-Cache': 'HIT',
      },
    });
  }

  const icalUrl =
    'https://www.airbnb.gr/calendar/ical/918194955382388607.ics?s=0ac559498f1faa77f6697e0072e1d4a1';

  try {
    const response = await axios.get(icalUrl, { responseType: 'text' });

    cachedData = response.data;
    lastFetched = now;

    return new Response(response.data, {
      status: 200,
      headers: {
        'Content-Type': 'text/calendar',
        'X-Cache': 'MISS',
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: 'Server error fetching iCal' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
