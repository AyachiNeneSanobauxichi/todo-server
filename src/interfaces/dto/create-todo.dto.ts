import type { z } from "zod";
import { todoSchema, updateTodoSchema } from "@/validators";

type CreateTodoDTO = z.infer<typeof todoSchema>;
type UpdateTodoDTO = z.infer<typeof updateTodoSchema>;

export type { CreateTodoDTO, UpdateTodoDTO };
