import { z } from 'zod';

export const Music = z
  .object({
    id: z.string(),
    youtubeUrl: z.string(),
    title: z.string(),
    artist: z.string(),
    playStartTime: z.number(),
    playEndTime: z.number(),
    youtubeTitle: z.string(),
  })
  .transform(args => ({
    ...args,
    playTime: args.playEndTime - args.playStartTime,
  }))
  .transform(args => ({
    ...args,
    formatPlayTime: args.playTime,
  }));

export type InputMusic = z.input<typeof Music>;
export type OutputMusic = z.output<typeof Music>;
