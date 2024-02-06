import { NextRequest, NextResponse } from 'next/server';

export const GET = (_request: Request) =>
  NextResponse.json({ success: true, message: '^v^' }, { status: 200 });

export const POST = async (_request: NextRequest) =>
  // const body = await request;

  // const returnBody = `POSTで受け取った値：${body.name}`;

  new NextResponse(JSON.stringify({ body: 'returnBody' }));
