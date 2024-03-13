import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createMessage = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    const newMessage = await ctx.db.insert("messages", {
      userId: user?.tokenIdentifier || "",
      name: user?.name || "Anonymous",
      pictureUrl: user?.pictureUrl || "",
      text: args.text,
    });

    return newMessage;
  },
});

export const getMessages = query({
  args: {},
  handler(ctx) {
    return ctx.db.query("messages").order("desc").collect();
  },
});
