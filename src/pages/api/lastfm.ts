import type { APIRoute } from 'astro';
import { z } from 'zod';

import type { TrackData } from '../../types';

const lastfmApiResponseSchema = z.object({
  recenttracks: z.object({
    track: z.array(
      z.object({
        '@attr': z
          .object({
            nowplaying: z.string(),
          })
          .optional(),
        album: z.object({
          '#text': z.string(),
        }),
        artist: z.object({
          '#text': z.string(),
        }),
        date: z
          .object({
            uts: z.string(),
          })
          .optional(),
        image: z.array(
          z.object({
            '#text': z.string(),
            size: z.string(),
          }),
        ),
        name: z.string(),
      }),
    ),
  }),
});

const trackDataSchema = z.object({
  album: z.string(),
  albumArt: z.string(),
  artist: z.string(),
  name: z.string(),
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
      headers: { 'Content-Type': 'application/json' },
      status: 500,
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
    const timestamp = isNowPlaying ? Date.now() : (track.date ? parseInt(track.date.uts) * 1000 : Date.now());

    const trackData = trackDataSchema.parse({
      album: track.album['#text'],
      albumArt: largeImage?.['#text'] || '',
      artist: track.artist['#text'],
      name: track.name,
      nowPlaying: isNowPlaying,
      timestamp,
    });

    const etag = buildETag(trackData.artist, trackData.name, trackData.nowPlaying);
    const cacheControl = 'public, s-maxage=30, stale-while-revalidate=60';

    if (request.headers.get('If-None-Match') === etag) {
      return new Response(null, {
        headers: { 'Cache-Control': cacheControl, ETag: etag },
        status: 304,
      });
    }

    return new Response(JSON.stringify(trackData), {
      headers: {
        'Cache-Control': cacheControl,
        'Content-Type': 'application/json',
        ETag: etag,
      },
      status: 200,
    });
  } catch (error) {
    console.error('Last.fm API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch Last.fm data' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 503,
    });
  }
};
