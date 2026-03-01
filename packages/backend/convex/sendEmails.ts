import { components } from "./_generated/api";
import { Resend } from "@convex-dev/resend";
import type { MutationCtx } from "./_generated/server";

export const resend: Resend = new Resend(components.resend, {});

export async function sendTestEmail(
  ctx: MutationCtx,
  {
    from,
    to,
    subject,
    html,
  }: { from: string; to: string; subject: string; html: string },
) {
  await resend.sendEmail(ctx, { from, to, subject, html });
}
