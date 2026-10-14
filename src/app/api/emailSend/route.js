import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  try {
    const { email, subject, text, html, subjectreceiver, htmlrevier } = await req.json();

    const receiverEmail = process.env.NEXT_PUBLIC_LEADS_RECEIVER_EMAIL;

    const messages = [
      {
        to: email, // User who submitted the form
        from: receiverEmail, // Your verified SendGrid sender email
        subject,
        text,
        html,
      },
      {
        to: receiverEmail, // Admin/receiver
        from: receiverEmail, // Your verified SendGrid sender email
        subject: subjectreceiver,
        html: htmlrevier,
      }
    ];

    await sgMail.send(messages);

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
