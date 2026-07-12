import type { Context } from "koa";
import type { RegisterDTO, LoginDTO, RefreshTokenDTO } from "@/interfaces";
import type { AccessTokenPayload } from "@/types";
import { authService } from "@/services";
import { success } from "@/utils";

const authController = {
  async register(ctx: Context) {
    const { username, email, password } = ctx.request.body as RegisterDTO;
    const data = await authService.register(username, email, password);
    success(ctx, data);
  },

  async login(ctx: Context) {
    const { identifier, password } = ctx.request.body as LoginDTO;
    const data = await authService.login(identifier, password);
    success(ctx, data);
  },

  async refreshToken(ctx: Context) {
    const { refreshToken } = ctx.request.body as RefreshTokenDTO;
    const data = await authService.refreshToken(refreshToken);
    success(ctx, data);
  },

  async logout(ctx: Context) {
    const payload = ctx.state.user as AccessTokenPayload;
    await authService.logout(payload);
    success(ctx, null, "Logged out successfully");
  },
};

export { authController };
