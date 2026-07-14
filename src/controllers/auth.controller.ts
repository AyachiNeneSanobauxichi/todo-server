import type { Context } from "koa";
import type { RegisterDTO, LoginDTO } from "@/interfaces";
import type { AccessTokenPayload } from "@/types";
import env from "@/config/env";
import { authService } from "@/services";
import { fail, isWeb, success } from "@/utils";
import { ErrorCode } from "@/constants";

const authController = {
  async register(ctx: Context) {
    const { username, email, password } = ctx.request.body as RegisterDTO;
    const data = await authService.register(username, email, password);
    success(ctx, data);
  },

  async login(ctx: Context) {
    const { identifier, password } = ctx.request.body as LoginDTO;
    const { accessToken, refreshToken, user } = await authService.login(
      identifier,
      password,
    );

    if (isWeb(ctx)) {
      // Web：refreshToken 进 HttpOnly cookie，body 不含它
      ctx.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        secure: !env.isDev,
        sameSite: "lax",
        path: `/api/auth/refresh-token`,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      success(ctx, { accessToken, user });
    } else {
      // 其他平台返回完整内容
      success(ctx, { accessToken, refreshToken, user });
    }
  },

  async refreshToken(ctx: Context) {
    const body = ctx.request.body as { refreshToken?: string };
    const refreshToken = ctx.cookies.get("refreshToken") ?? body?.refreshToken;

    if (!refreshToken) {
      fail(
        ctx,
        401,
        ErrorCode.UNAUTHORIZED.code,
        ErrorCode.UNAUTHORIZED.message,
      );
      return;
    }

    const data = await authService.refreshToken(refreshToken);
    success(ctx, data);
  },

  async logout(ctx: Context) {
    const payload = ctx.state.user as AccessTokenPayload;
    await authService.logout(payload);
    ctx.cookies.set("refreshToken", "", {
      path: "/api/auth/refresh-token",
      maxAge: 0,
    });
    success(ctx, null, "Logged out successfully");
  },
};

export { authController };
