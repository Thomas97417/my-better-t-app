import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { betterAuth } from "better-auth";

import type { DataModel } from "./_generated/dataModel";

import { components, internal } from "./_generated/api";
import { query, type ActionCtx } from "./_generated/server";
import authConfig from "./auth.config";
import { SITE_URL, EMAIL_FROM } from "./env";

export const authComponent = createClient<DataModel>(components.betterAuth);

function createAuth(ctx: GenericCtx<DataModel>) {
  return betterAuth({
    baseURL: `${SITE_URL}`,
    trustedOrigins: [SITE_URL],
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      sendResetPassword: async ({ user, url }) => {
        const actionCtx = ctx as unknown as ActionCtx;
        await actionCtx.runAction(
          internal.sendEmails.sendResetPasswordEmail,
          {
            from: EMAIL_FROM,
            to: user.email,
            url,
          },
        );
      },
    },
    user: {
      changeEmail: {
        enabled: true,
        updateEmailWithoutVerification: true,
      },
    },
    plugins: [
      convex({
        authConfig,
        jwksRotateOnTokenGenerationError: true,
      }),
    ],
  });
}

export { createAuth };

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return await authComponent.safeGetAuthUser(ctx);
  },
});
