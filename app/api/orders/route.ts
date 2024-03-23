import { NextResponse } from "next/server";
import { Resend } from "resend";

import { OrderEmail } from "@/emails/OrderEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { selectedPostcards, name, email, comment, lang } =
    await request.json();

  console.log(email, selectedPostcards, name, comment);

  try {
    await resend.emails.send({
      from: process.env.MAIL_FROM || "",
      to: [email],
      bcc: process.env.MAIL_BCC,
      subject: "New Order #...",
      react: OrderEmail({ selectedPostcards, name, comment, lang }),
    });
    return NextResponse.json(
      {
        status: "OK",
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
        error: "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}
