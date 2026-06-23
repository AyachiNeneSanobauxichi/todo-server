import type { Context } from "koa";
import type { LoginDTO, RefreshTokenDTO } from "@/interfaces";
import type { AccessTokenPayload } from "@/types";
import { authService } from "@/services";
import { success } from "@/utils";

const authController = {
  async register(ctx: Context) {
    const { username, password } = ctx.request.body as unknown as LoginDTO;
    const data = await authService.register(username, password);
    success(ctx, data);
  },

  async login(ctx: Context) {
    const { username, password } = ctx.request.body as unknown as LoginDTO;
    const data = await authService.login(username, password);
    success(ctx, data);
  },

  async refreshToken(ctx: Context) {
    const { refreshToken } = ctx.request.body as unknown as RefreshTokenDTO;
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
