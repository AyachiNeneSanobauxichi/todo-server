import { z } from "zod";

const todoSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(3, "Name must be at least 3 characters long")
    .max(20, "Name must be at most 20 characters long"),
  content: z
    .string({ error: "Content is required" })
    .min(3, "Content must be at least 3 characters long")
    .max(200, "Content must be at most 200 characters long"),
  type: z
    .enum(["normal", "important", "urgent"], { error: "Type is invalid" })
    .default("normal"),
  status: z
    .enum(["pending", "completed", "doing", "deleted"], {
      error: "Status is invalid",
    })
    .default("pending"),
});

const updateTodoSchema = todoSchema.partial().extend({
  id: z.string({ error: "Id is required" }).length(24, "Id is invalid"),
});

export { todoSchema, updateTodoSchema };
