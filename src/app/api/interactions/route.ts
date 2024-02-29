import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { NextResponse } from 'next/server';

import { interactionRequest } from '@/app/types/api';

type Interaction = {
  type: InteractionType;
  data: unknown;
};

export const GET = (_request: Request) =>
  NextResponse.json({ success: true, message: '^v^' }, { status: 200 });

export const POST = async (request: Request) => {
  const interaction = (await request.json()) as Interaction;
  if (interaction && interaction.type === InteractionType.PING) {
    return NextResponse.json({
      type: InteractionResponseType.PONG,
    });
  }
  const parsedInteractionData = interactionRequest.safeParse(interaction.data);
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
  return parsedInteractionData.data.func();
};
