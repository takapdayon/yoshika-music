import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { addMusic } from '../api/interactions/addMusic';
import { delMusic } from '../api/interactions/delMusic';

const addMusicKeysEnum = z.enum([
  'youtube_url',
  'youtube_title',
  'music_title',
  'artist',
  'start_time',
  'end_time',
]);
type AddMusicKeysEnum = z.infer<typeof addMusicKeysEnum>;

export const commandEnum = z.enum(['add_music', 'del_music']);
export type CommandEnum = z.infer<typeof commandEnum>;

const optionOfyoutubeUrl = z.object({
  name: z.literal(addMusicKeysEnum.Enum.youtube_url),
  type: z.number(),
  value: z.string().url({ message: '' }),
});
type OptionOfYoutubeUrl = z.infer<typeof optionOfyoutubeUrl>;

const optionOfyoutubeTitle = z.object({
  name: z.literal(addMusicKeysEnum.Enum.youtube_title),
  type: z.number(),
  value: z.string(),
});
type OptionOfyoutubeTitle = z.infer<typeof optionOfyoutubeTitle>;

const optionOfMusicTitle = z.object({
  name: z.literal(addMusicKeysEnum.Enum.music_title),
  type: z.number(),
  value: z.string(), // IDEA: 既存のvercelKV内に似たものがあればそっちに置き換えてもいいかも
});
type OptionOfMusicTitle = z.infer<typeof optionOfMusicTitle>;

const optionOfArtist = z.object({
  name: z.literal(addMusicKeysEnum.Enum.artist),
  type: z.number(),
  value: z.string(), // IDEA: 既存のキーに似たものがあればそっちに置き換えてもいいかも
});
type OptionOfArtist = z.infer<typeof optionOfArtist>;

const optionOfStartTime = z.object({
  name: z.literal(addMusicKeysEnum.Enum.start_time),
  type: z.number(),
  value: z.number().nonnegative({ message: 'マイナスは指定できないぴょん' }), // IDEA: 既存のキーに似たものがあればそっちに置き換えてもいいかも
});
type OptionOfStartTime = z.infer<typeof optionOfStartTime>;

const optionOfEndTime = z.object({
  name: z.literal(addMusicKeysEnum.Enum.end_time),
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
      [key in AddMusicKeysEnum]: string | number; // FIXME: アサーションなしにできないか検討してー,
    },
  );

export const addMusicRequest = z
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
  .length(6)
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

export type InputAddMusicRequest = z.input<typeof addMusicRequest>;
export type OutputAddMusicRequest = z.output<typeof addMusicRequest>;

export const delMusicRequest = z
  .array(optionOfyoutubeUrl)
  .transform(args => args[0]);

export type InputDelMusicRequest = z.input<typeof delMusicRequest>;
export type OutputDelMusicRequest = z.output<typeof delMusicRequest>;

export const interactionRequest = z
  .discriminatedUnion('name', [
    z.object({
      name: z.literal(commandEnum.Enum.add_music),
      options: addMusicRequest,
    }),
    z.object({
      name: z.literal(commandEnum.Enum.del_music),
      options: delMusicRequest,
    }),
  ])
  .transform(args => {
    /* NOTE:
      discriminatedUnionの要素に対してtransformは行えないので外側で行っている。
    */
    if (args.name === commandEnum.Enum.add_music) {
      return {
        ...args,
        func: () => addMusic(args.options),
      };
    }
    return {
      ...args,
      func: () => delMusic(args.options),
    };
  });

export type InputInteractionRequest = z.input<typeof interactionRequest>;
export type OutputInteractionRequest = z.output<typeof interactionRequest>;
