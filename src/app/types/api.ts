import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

const InteractionKeysEnum = z.enum([
  'youtube_url',
  'youtube_title',
  'music_title',
  'artist',
  'start_time',
  'end_time',
]);
type InteractionKeysEnum = z.infer<typeof InteractionKeysEnum>;

const optionOfyoutubeUrl = z.object({
  name: z.literal(InteractionKeysEnum.Enum.youtube_url),
  type: z.number(),
  value: z.string().url({ message: '' }),
});
type OptionOfYoutubeUrl = z.infer<typeof optionOfyoutubeUrl>;

const optionOfyoutubeTitle = z.object({
  name: z.literal(InteractionKeysEnum.Enum.youtube_title),
  type: z.number(),
  value: z.string(),
});
type OptionOfyoutubeTitle = z.infer<typeof optionOfyoutubeTitle>;

const optionOfMusicTitle = z.object({
  name: z.literal(InteractionKeysEnum.Enum.music_title),
  type: z.number(),
  value: z.string(), // IDEA: 既存のvercelKV内に似たものがあればそっちに置き換えてもいいかも
});
type OptionOfMusicTitle = z.infer<typeof optionOfMusicTitle>;

const optionOfArtist = z.object({
  name: z.literal(InteractionKeysEnum.Enum.artist),
  type: z.number(),
  value: z.string(), // IDEA: 既存のキーに似たものがあればそっちに置き換えてもいいかも
});
type OptionOfArtist = z.infer<typeof optionOfArtist>;

const optionOfStartTime = z.object({
  name: z.literal(InteractionKeysEnum.Enum.start_time),
  type: z.number(),
  value: z.number().nonnegative({ message: 'マイナスは指定できないぴょん' }), // IDEA: 既存のキーに似たものがあればそっちに置き換えてもいいかも
});
type OptionOfStartTime = z.infer<typeof optionOfStartTime>;

const optionOfEndTime = z.object({
  name: z.literal(InteractionKeysEnum.Enum.end_time),
  type: z.number(),
  value: z.number().nonnegative({ message: 'マイナスは指定できないぴょん' }), // IDEA: 既存のキーに似たものがあればそっちに置き換えてもいいかも
});
type OptionOfEndTime = z.infer<typeof optionOfEndTime>;

type ConvertToObjectType = Array<
  | OptionOfYoutubeUrl
  | OptionOfyoutubeTitle
  | OptionOfMusicTitle
  | OptionOfArtist
  | OptionOfStartTime
  | OptionOfEndTime
>;

const convertToObject = (args: ConvertToObjectType) =>
  args.reduce(
    (obj, item) => ({
      ...obj,
      [item.name]: item.value,
    }),
    {} as {
      [key in InteractionKeysEnum]: string | number; // FIXME: アサーションなしにできないか検討してー,
    },
  );

export const interactionRequest = z
  .array(
    z.discriminatedUnion('name', [
      optionOfyoutubeUrl,
      optionOfyoutubeTitle,
      optionOfMusicTitle,
      optionOfArtist,
      optionOfStartTime,
      optionOfEndTime,
    ]),
  )
  .transform(args => {
    const toObject = convertToObject(args);
    return {
      id: uuidv4(),
      youtubeUrl: toObject.youtube_url,
      title: toObject.music_title,
      artist: toObject.artist,
      playStartTime: toObject.start_time,
      playEndTime: toObject.end_time,
      youtubeTitle: toObject.youtube_title,
    };
  });

export type InputInteractionRequest = z.input<typeof interactionRequest>;
export type OutputInteractionRequest = z.output<typeof interactionRequest>;
