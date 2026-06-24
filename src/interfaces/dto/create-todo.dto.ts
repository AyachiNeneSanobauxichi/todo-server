import type { z } from "zod";
import { todoSchema } from "@/validators";

type CreateTodoDTO = z.infer<typeof todoSchema>;

export type { CreateTodoDTO };
