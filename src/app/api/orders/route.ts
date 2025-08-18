import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

import { OrderEmail } from '@/emails/OrderEmail';

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const OrderSchema = z.object({
  lang: z.string().default('en'),
  orderId: z.string().min(1),
  selectedPostcards: z.array(z.string()).min(1),
  name: z.string().min(1),
  email: z.string().regex(EMAIL_RE, { message: 'Invalid email' }),
  comment: z.string().optional().default(''),
});

function requireEnv(key: string): string {
  const env = process.env[key];
  if (!env) {
    throw new Error(`Missing required env var: ${key}`);
  }
  return env;
}

export async function POST(request: Request) {
  try {
    const json = await request.json().catch(() => null);

    if (!json) {
      return NextResponse.json({ error: 'Missing / invalid JSON body' }, { status: 400 });
    }

    const PAYLOAD = OrderSchema.parse(json);
    const FROM = requireEnv('EMAIL_FROM');
    const TO = process.env.EMAIL_TO ?? PAYLOAD.email;

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: TO,
      subject: `Pletunia order #${PAYLOAD.orderId}`,
      react: OrderEmail(PAYLOAD),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err: unknown) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', issues: err.issues }, { status: 400 });
    }
    if (err instanceof Error) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
