import type { APIRoute } from 'astro';
import { z } from 'zod';
import type { TrackData } from '../../types';

const lastfmApiResponseSchema = z.object({
  recenttracks: z.object({
    track: z.array(
      z.object({
        name: z.string(),
        artist: z.object({
          '#text': z.string(),
        }),
        album: z.object({
          '#text': z.string(),
        }),
        image: z.array(
          z.object({
            size: z.string(),
            '#text': z.string(),
          }),
        ),
        date: z
          .object({
            uts: z.string(),
          })
          .optional(),
        '@attr': z
          .object({
            nowplaying: z.string(),
          })
          .optional(),
      }),
    ),
  }),
});

const trackDataSchema = z.object({
  name: z.string(),
  artist: z.string(),
  album: z.string(),
  albumArt: z.string(),
  nowPlaying: z.boolean(),
  timestamp: z.number(),
}) satisfies z.ZodType<TrackData>;

export const prerender = false;

function buildETag(artist: string, name: string, nowPlaying: boolean): string {
  return `"${btoa(encodeURIComponent(`${nowPlaying}:${artist}:${name}`))}"`;
}

export const GET: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.LASTFM_API_KEY;
  const username = import.meta.env.LASTFM_USERNAME;

  if (!apiKey || !username) {
    return new Response(JSON.stringify({ error: 'Last.fm API credentials not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const url = new URL('https://ws.audioscrobbler.com/2.0/');
    url.searchParams.set('method', 'user.getRecentTracks');
    url.searchParams.set('user', username);
    url.searchParams.set('api_key', apiKey);
    url.searchParams.set('format', 'json');
    url.searchParams.set('limit', '1');

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Last.fm API error: ${response.status} ${response.statusText}`);
    }

    const data: unknown = await response.json();
    const apiResponse = lastfmApiResponseSchema.parse(data);
    const track = apiResponse.recenttracks.track[0];

    if (!track) {
      throw new Error('No track data found in Last.fm response');
    }

    const largeImage = track.image.find((img) => img.size === 'large');
    const isNowPlaying = track['@attr']?.nowplaying === 'true';
    const timestamp = isNowPlaying ? Date.now() : track.date ? parseInt(track.date.uts) * 1000 : Date.now();

    const trackData = trackDataSchema.parse({
      name: track.name,
      artist: track.artist['#text'],
      album: track.album['#text'],
      albumArt: largeImage?.['#text'] || '',
      nowPlaying: isNowPlaying,
      timestamp,
    });

    const etag = buildETag(trackData.artist, trackData.name, trackData.nowPlaying);
    const cacheControl = 'public, s-maxage=30, stale-while-revalidate=60';

    if (request.headers.get('If-None-Match') === etag) {
      return new Response(null, {
        status: 304,
        headers: { 'ETag': etag, 'Cache-Control': cacheControl },
      });
    }

    return new Response(JSON.stringify(trackData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': cacheControl,
        'ETag': etag,
      },
    });
  } catch (error) {
    console.error('Last.fm API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch Last.fm data' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
