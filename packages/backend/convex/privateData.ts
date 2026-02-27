import { query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const user = await ctx.auth.safeGetAuthUser(ctx);
    if (!user) {
      return {
        message: "Not authenticated",
      };
    }
    return {
      message: "This is private",
    };
  },
});
