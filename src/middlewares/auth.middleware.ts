import type { Context, Next } from "koa";
import { verifyToken } from "@/utils";

const authMiddleware = {
  async verifyToken(ctx: Context, next: Next) {
    const authHeader = ctx.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      ctx.status = 401;
      ctx.body = { code: 401, message: "Unauthorized" };
      return;
    }

    try {
      const token = authHeader.split(" ")[1];
      ctx.state.user = verifyToken(token);
      await next();
    } catch {
      ctx.status = 401;
      ctx.body = { code: 401, message: "Unauthorized" };
      return;
    }
  },
};

export { authMiddleware };
