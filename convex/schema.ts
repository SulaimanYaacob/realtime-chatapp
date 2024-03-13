import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
  messages: defineTable({
    userId: v.string(),
    name: v.string(),
    pictureUrl: v.string(),
    text: v.string(),
  }),
});
