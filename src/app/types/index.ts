import { format } from 'date-fns';
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
    deleted: z.boolean().default(false),
  })
  .transform(args => ({
    ...args,
    playTime: args.playEndTime - args.playStartTime,
  }))
  .transform(args => {
    const date = new Date(0);
    date.setSeconds(args.playTime);
    const formattedPlayTime = format(date, 'mm:ss');
    return {
      ...args,
      formattedPlayTime,
    };
  });

export type InputMusic = z.input<typeof Music>;
export type OutputMusic = z.output<typeof Music>;
