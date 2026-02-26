import { Resend } from "resend";
import { RESEND_API_KEY } from "../env";

const resend = new Resend(RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  await resend.emails.send({
    from: "no-reply@yourdomain.com",
    to,
    subject,
    text,
  });
}
