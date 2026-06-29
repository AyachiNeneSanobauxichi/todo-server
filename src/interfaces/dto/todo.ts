import type { z } from "zod";
import {
  todoSchema,
  updateTodoSchema,
  checkTodoIdSchema,
  todoQueryOptionsSchema,
} from "@/validators";

type CreateTodoDTO = z.infer<typeof todoSchema>;
type UpdateTodoDTO = z.infer<typeof updateTodoSchema>;
type CheckTodoIdDTO = z.infer<typeof checkTodoIdSchema>;
type TodoQueryOptionsDTO = z.infer<typeof todoQueryOptionsSchema>;

export type {
  CreateTodoDTO,
  UpdateTodoDTO,
  CheckTodoIdDTO,
  TodoQueryOptionsDTO,
};
