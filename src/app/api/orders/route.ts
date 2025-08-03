import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { OrderEmail } from '@/emails/OrderEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { selectedPostcards, name, email, comment, lang, orderId, userAddress } =
    await request.json();

  try {
    await resend.emails.send({
      from: process.env.MAIL_FROM || '',
      to: [email],
      bcc: process.env.MAIL_BCC,
      subject: orderId,
      react: OrderEmail({
        selectedPostcards,
        name,
        comment,
        lang,
        orderId,
        userAddress,
      }),
    });
    return NextResponse.json(
      {
        status: 'OK',
      },
      {
        status: 200,
      }
    );
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(`Failed to send email: ${e.message}`);
    }
    return NextResponse.json(
      {
        error: 'Internal server error.',
      },
      {
        status: 500,
      }
    );
  }
}
