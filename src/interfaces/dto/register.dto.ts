import type { z } from "zod";
import { registerSchema } from "@/validators";

type RegisterDTO = z.infer<typeof registerSchema>;

export type { RegisterDTO };
