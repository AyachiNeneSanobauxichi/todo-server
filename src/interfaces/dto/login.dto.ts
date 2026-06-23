import type { z } from "zod";
import { loginSchema } from "@/validators";

type LoginDTO = z.infer<typeof loginSchema>;

export type { LoginDTO };
