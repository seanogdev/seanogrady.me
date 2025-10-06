import { z } from 'zod';
import type { TrackData } from '../../shared/types';
import { readCache, writeCache } from '../utils/cache';

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
}) satisfies z.ZodType<TrackData>;

async function fetchRecentTracks(apiKey: string, username: string) {
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

  const data = await response.json();
  return lastfmApiResponseSchema.parse(data);
}

function extractTrackData(apiResponse: z.infer<typeof lastfmApiResponseSchema>): TrackData | null {
  const track = apiResponse.recenttracks.track[0];

  if (!track) {
    return null;
  }

  const largeImage = track.image.find((img) => img.size === 'large');

  const trackData = {
    name: track.name,
    artist: track.artist['#text'],
    album: track.album['#text'],
    albumArt: largeImage?.['#text'] || '',
    nowPlaying: track['@attr']?.nowplaying === 'true',
  };

  return trackDataSchema.parse(trackData);
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const apiKey = config.lastfmApiKey;
  const username = config.lastfmUsername;

  if (!apiKey || !username) {
    throw createError({
      statusCode: 500,
      message: 'Last.fm API credentials not configured',
    });
  }

  try {
    const apiResponse = await fetchRecentTracks(apiKey, username);
    const trackData = extractTrackData(apiResponse);

    if (!trackData) {
      throw new Error('No track data found in Last.fm response');
    }

    // Update cache file on successful response
    await writeCache('lastfm.json', trackData);

    return trackData;
  } catch (error) {
    console.error('Last.fm API error:', error);

    // Try to fall back to cached data
    const cachedData = await readCache<TrackData>('lastfm.json');
    if (cachedData) {
      console.log('Returning cached Last.fm data due to API failure');
      return cachedData;
    }

    throw createError({
      statusCode: 503,
      message: 'Failed to fetch Last.fm data and no cached data available',
    });
  }
});
