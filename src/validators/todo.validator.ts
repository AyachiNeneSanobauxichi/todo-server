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

const checkTodoIdSchema = z.object({
  id: z.string({ error: "Id is required" }).length(24, "Id is invalid"),
});

const todoQueryOptionsSchema = z.object({
  pageNumber: z
    .number({ error: "Page number is required" })
    .min(1, "Page number must be at least 1"),
  pageSize: z
    .number({ error: "Page size is required" })
    .min(10, "Page size must be at least 10"),
  todoName: z.string().optional(),
  todoType: z
    .enum(["normal", "important", "urgent"], { error: "Todo type is invalid" })
    .optional(),
  todoStatus: z
    .enum(["pending", "completed", "doing", "deleted"], {
      error: "Todo status is invalid",
    })
    .optional(),
  sortBy: z
    .enum(["createdAt", "updatedAt", "type", "status"], {
      error: "Sort by is invalid",
    })
    .optional(),
  sortOrder: z
    .enum(["asc", "desc"], { error: "Sort order is invalid" })
    .optional(),
});

export {
  todoSchema,
  updateTodoSchema,
  checkTodoIdSchema,
  todoQueryOptionsSchema,
};
