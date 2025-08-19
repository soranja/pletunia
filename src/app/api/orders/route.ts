import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

import postcards from '@/data/home/postcards.json';
import { EMAIL_REGEX } from '@/constants';
import OrderEmail from '@/emails/OrderEmail';
import { normalizeLang } from '@/utils/order';
import { SupportedLang } from '@/types/props';

const RESEND = new Resend(requireEnv('RESEND_API_KEY'));
const LangSchema = z.preprocess(normalizeLang, z.enum(['en', 'ru']));
const OrderSchema = z.object({
  lang: LangSchema.default('en'),
  orderId: z.string().min(1),
  selectedPostcards: z.array(z.string()).min(1),
  name: z.string().min(1),
  email: z.string().regex(EMAIL_REGEX, { message: 'Invalid email' }),
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
    const OWNER = process.env.EMAIL_TO;
    const TO = PAYLOAD.email;

    const originFromReq = (() => {
      try {
        return new URL(request.url).origin;
      } catch {
        return null;
      }
    })();

    const assetBaseUrl = process.env.ASSET_BASE_URL || originFromReq || 'https://pletunia.com';

    const selectedIds = PAYLOAD.selectedPostcards
      .map((slug) => postcards.find((p) => p.name === slug)?.id)
      .filter((id): id is number => typeof id === 'number');

    if (selectedIds.length === 0) {
      return NextResponse.json({ error: 'No valid postcards selected' }, { status: 400 });
    }

    const { data, error } = await RESEND.emails.send({
      from: FROM,
      to: [TO],
      ...(OWNER ? { bcc: [OWNER] } : {}),
      reply_to: [TO],
      subject: `Pletunia • Order #${PAYLOAD.orderId}`,
      react: OrderEmail({
        lang: PAYLOAD.lang as SupportedLang,
        orderId: PAYLOAD.orderId,
        name: PAYLOAD.name,
        comment: PAYLOAD.comment,
        selectedIds,
        assetBaseUrl,
      }),
    });

    if (error) {
      const code = (error as Error & { name?: string }).name ?? 'ResendError';
      return NextResponse.json({ error: error.message, code }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      id: data?.id,
      orderId: PAYLOAD.orderId,
      selectedIds,
    });
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
