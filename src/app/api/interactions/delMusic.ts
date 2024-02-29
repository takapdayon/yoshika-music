import { kv } from '@vercel/kv';
import { InteractionResponseType } from 'discord-interactions';
import { NextResponse } from 'next/server';

import type {
  OutputAddMusicRequest,
  OutputDelMusicRequest,
} from '@/app/types/api';

const { MUSICLIST_KEYNAME = 'musiclist' } = process.env;

export const delMusic = async (data: OutputDelMusicRequest) => {
  try {
    const musicListFromKV = await kv.lrange<OutputAddMusicRequest>(
      MUSICLIST_KEYNAME,
      0,
      -1,
    );
    musicListFromKV.map(async (music, i) => {
      if (music.youtubeUrl === data.value) {
        await kv.lset(MUSICLIST_KEYNAME, i, {
          ...music,
          deleted: true,
        });
      }
    });
  } catch (e) {
    if (e instanceof Error) {
      console.log(`error set vercel data: ${e.message} value:${data.value}`);
    } else {
      console.log(`error something wrong value:${data.value}`);
    }
    return NextResponse.json({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `sorry! server is something wrong =v=`,
      },
    });
  }
  return NextResponse.json({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Successful deleting: ${data.value}`,
    },
  });
};
