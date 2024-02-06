import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { NextResponse } from 'next/server';

type Interaction = {
  type: InteractionType;
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
  return NextResponse.json({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: `You`,
    },
  });
};
