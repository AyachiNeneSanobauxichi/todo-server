import type { z } from "zod";
import { todoSchema, updateTodoSchema, deleteTodoSchema } from "@/validators";

type CreateTodoDTO = z.infer<typeof todoSchema>;
type UpdateTodoDTO = z.infer<typeof updateTodoSchema>;
type DeleteTodoDTO = z.infer<typeof deleteTodoSchema>;

export type { CreateTodoDTO, UpdateTodoDTO, DeleteTodoDTO };
