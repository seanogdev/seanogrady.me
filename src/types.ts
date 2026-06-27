import { z } from 'zod';

export const trackDataSchema = z.object({
  album: z.string(),
  albumArt: z.string(),
  artist: z.string(),
  name: z.string(),
  nowPlaying: z.boolean(),
  timestamp: z.number(),
});

export type TrackData = z.infer<typeof trackDataSchema>;
