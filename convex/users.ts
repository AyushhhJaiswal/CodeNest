import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const syncUser = mutation({
  args: {
    userId: v.string(),
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .first();

    if (!existingUser) {
      await ctx.db.insert("users", {
        userId: args.userId,
        email: args.email,
        name: args.name,
        isPro: false,
      });
    }
  },
});


export const getUser = query({
    args: { userId: v.string() },
  
    handler: async (ctx, args) => {
      if (!args.userId) return null;
  
      const user = await ctx.db
        .query("users")
        .withIndex("by_user_id")
        .filter((q) => q.eq(q.field("userId"), args.userId))
        .first();
  
      if (!user) return null;
  
      return user;
    },
  });
  


  //upgradeTo pro mutation
  export const upgradeToPro = mutation({
    handler: async (ctx) => {
      const identity = await ctx.auth.getUserIdentity();
      if (!identity) throw new Error("Not authenticated");
  
      const user = await ctx.db
        .query("users")
        .withIndex("by_user_id")
        .filter((q) => q.eq(q.field("userId"), identity.subject))
        .first();
  
      if (!user) throw new Error("User not found");
  
      await ctx.db.patch(user._id, {
        isPro: true,
        proSince: Date.now(),
      });
    },
  });
  