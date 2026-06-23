import type { Context, Next } from "koa";
import { fail, verifyToken } from "@/utils";
import { tokenRepository } from "@/repositories";
import { ErrorCode } from "@/constants";

const authMiddleware = {
  async verifyToken(ctx: Context, next: Next) {
    const authHeader = ctx.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      fail(
        ctx,
        401,
        ErrorCode.UNAUTHORIZED.code,
        ErrorCode.UNAUTHORIZED.message,
      );
      return;
    }

    try {
      const token = authHeader.split(" ")[1];
      const payload = verifyToken(token);

      // 命中黑名单（已登出的 token）直接拒绝
      if (await tokenRepository.isBlacklisted(payload.jti)) {
        fail(
          ctx,
          401,
          ErrorCode.TOKEN_BLACKLISTED.code,
          ErrorCode.TOKEN_BLACKLISTED.message,
        );
        return;
      }

      ctx.state.user = payload;
      await next();
    } catch {
      fail(
        ctx,
        401,
        ErrorCode.TOKEN_INVALID.code,
        ErrorCode.TOKEN_INVALID.message,
      );
      return;
    }
  },
};

export { authMiddleware };
