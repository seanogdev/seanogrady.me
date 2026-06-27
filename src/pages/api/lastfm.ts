import type { APIRoute } from 'astro';
import { z } from 'zod';

import { trackDataSchema, type TrackData } from '../../types';

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

type LastfmTrack = z.infer<typeof lastfmApiResponseSchema>['recenttracks']['track'][number];

const CACHE_CONTROL = 'public, s-maxage=30, stale-while-revalidate=60';

export const prerender = false;

function buildETag(track: TrackData): string {
  const { artist, name, nowPlaying } = track;
  return `"${btoa(encodeURIComponent(`${nowPlaying}:${artist}:${name}`))}"`;
}

function buildLastfmApiUrl({ apiKey, username }: { apiKey: string; username: string }): string {
  const url = new URL('https://ws.audioscrobbler.com/2.0/');
  url.searchParams.set('method', 'user.getRecentTracks');
  url.searchParams.set('user', username);
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('format', 'json');
  url.searchParams.set('limit', '1');
  return url.toString();
}

function parseTimestamp(track: LastfmTrack, isNowPlaying: boolean): number {
  if (isNowPlaying) {
    return Date.now();
  }
  if (track.date) {
    return Math.trunc(Number(track.date.uts)) * 1000;
  }
  return Date.now();
}

function toTrackData(track: LastfmTrack): TrackData {
  const largeImage = track.image.find((img) => img.size === 'large');
  const isNowPlaying = track['@attr']?.nowplaying === 'true';

  return trackDataSchema.parse({
    album: track.album['#text'],
    albumArt: largeImage?.['#text'] ?? '',
    artist: track.artist['#text'],
    name: track.name,
    nowPlaying: isNowPlaying,
    timestamp: parseTimestamp(track, isNowPlaying),
  });
}

async function fetchRecentTrack(apiKey: string, username: string): Promise<TrackData> {
  const url = buildLastfmApiUrl({ apiKey, username });
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Last.fm API error: ${response.status} ${response.statusText}`);
  }

  const data: unknown = await response.json();
  const apiResponse = lastfmApiResponseSchema.parse(data);
  const [track] = apiResponse.recenttracks.track;

  if (!track) {
    throw new Error('No track data found in Last.fm response');
  }

  return toTrackData(track);
}

function buildCachedResponse(request: Request, trackData: TrackData): Response {
  const etag = buildETag(trackData);

  if (request.headers.get('If-None-Match') === etag) {
    return new Response('', {
      headers: { 'Cache-Control': CACHE_CONTROL, ETag: etag },
      status: 304,
    });
  }

  return Response.json(trackData, {
    headers: {
      'Cache-Control': CACHE_CONTROL,
      'Content-Type': 'application/json',
      ETag: etag,
    },
    status: 200,
  });
}

export const GET: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.LASTFM_API_KEY;
  const username = import.meta.env.LASTFM_USERNAME;

  if (!apiKey || !username) {
    return Response.json({ error: 'Last.fm API credentials not configured' }, { status: 500 });
  }

  try {
    const trackData = await fetchRecentTrack(apiKey, username);
    return buildCachedResponse(request, trackData);
  } catch {
    return Response.json(
      { error: 'Failed to fetch Last.fm data' },
      {
        headers: { 'Content-Type': 'application/json' },
        status: 503,
      },
    );
  }
};
