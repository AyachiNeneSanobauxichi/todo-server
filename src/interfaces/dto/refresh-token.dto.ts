import type { z } from "zod";
import { refreshTokenSchema } from "@/validators";

type RefreshTokenDTO = z.infer<typeof refreshTokenSchema>;

export type { RefreshTokenDTO };
