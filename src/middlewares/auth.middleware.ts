import type { Context, Next } from "koa";
import { verifyToken } from "@/utils";
import { tokenRepository } from "@/repositories";

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
      const payload = verifyToken(token);

      // 命中黑名单（已登出的 token）直接拒绝
      if (await tokenRepository.isBlacklisted(payload.jti)) {
        ctx.status = 401;
        ctx.body = { code: 401, message: "Token has been invalidated" };
        return;
      }

      ctx.state.user = payload;
      await next();
    } catch {
      ctx.status = 401;
      ctx.body = { code: 401, message: "Invalid token" };
      return;
    }
  },
};

export { authMiddleware };
