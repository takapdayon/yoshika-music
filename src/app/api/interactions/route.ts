import { kv } from '@vercel/kv';
import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { NextResponse } from 'next/server';

import { InputInteractionRequest, interactionRequest } from '@/app/types/api';

type Interaction = {
  type: InteractionType;
  data: {
    name: string;
    options: InputInteractionRequest;
  };
};

const { MUSICLIST_KEYNAME = 'musiclist' } = process.env;

export const GET = (_request: Request) =>
  NextResponse.json({ success: true, message: '^v^' }, { status: 200 });

export const POST = async (request: Request) => {
  const interaction = (await request.json()) as Interaction;
  if (interaction && interaction.type === InteractionType.PING) {
    return NextResponse.json({
      type: InteractionResponseType.PONG,
    });
  }
  // zodでバリデーションする
  const parsedInteractionData = interactionRequest.safeParse(
    interaction.data.options,
  );
  if (!parsedInteractionData.success) {
    console.log(
      `validation error: ${parsedInteractionData.error.toString()} rawData: ${JSON.stringify(
        interaction.data,
      )}`,
    );
    return NextResponse.json({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        content: `error: ${parsedInteractionData.error.toString()}`,
      },
    });
  }
  try {
    await kv.lpush(MUSICLIST_KEYNAME, parsedInteractionData.data);
  } catch (e) {
    if (e instanceof Error) {
      console.log(
        `error set vercel data: ${e.message} id:${parsedInteractionData.data.id}`,
      );
    } else {
      console.log(`error something wrong id: ${parsedInteractionData.data.id}`);
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
      content: `Successful adding of music: ${parsedInteractionData.data.title}`,
    },
  });
};
