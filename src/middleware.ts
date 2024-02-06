import { verifyKey } from 'discord-interactions';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

const PUBLIC_KEY = process.env.PUBLIC_KEY ?? '';

export const middleware = async (req: NextRequest) => {
  const signature = req.headers.get('X-Signature-Ed25519') ?? '';
  const timestamp = req.headers.get('X-Signature-Timestamp') ?? '';
  const rawBody = await req.text();
  const isValidRequest = verifyKey(rawBody, signature, timestamp, PUBLIC_KEY);
  if (!isValidRequest) {
    return NextResponse.json(
      { success: false, message: 'captain teemo' },
      { status: 401 },
    );
  }
  return NextResponse.next();
};

export const config = {
  matcher: ['/api/:path*'],
};
