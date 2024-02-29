import { kv } from '@vercel/kv';
import { InteractionResponseType } from 'discord-interactions';
import { NextResponse } from 'next/server';

import type { OutputAddMusicRequest } from '@/app/types/api';

const { MUSICLIST_KEYNAME = 'musiclist' } = process.env;

export const addMusic = async (data: OutputAddMusicRequest) => {
  // zodでバリデーションする
  try {
    await kv.lpush(MUSICLIST_KEYNAME, data);
  } catch (e) {
    if (e instanceof Error) {
      console.log(`error set vercel data: ${e.message} id:${data.id}`);
    } else {
      console.log(`error something wrong id: ${data.id}`);
    }
    return NextResponse.json({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `sorry! server is something wrong =v=`,
      },
    });
  }
  // 結果OKだったらvercelに保存, 保存OKの結果を返す
  return NextResponse.json({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `Successful adding of music: ${data.title}`,
    },
  });
};
