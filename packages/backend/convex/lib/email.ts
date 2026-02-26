import { Resend } from "resend";
import { EMAIL_FROM, RESEND_API_KEY } from "../env";

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
  console.log("Before sending email");
  await resend.emails.send({
    from: EMAIL_FROM,
    to,
    subject,
    text,
  });
}
