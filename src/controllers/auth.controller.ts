import type { Context } from "koa";
import type { LoginDTO, RefreshTokenDTO } from "@/interfaces";
import type { AccessTokenPayload, JwtPayload } from "@/types";
import { authService } from "@/services";

const authController = {
  async register(ctx: Context) {
    const { username, password } = ctx.request.body as unknown as LoginDTO;
    const data = await authService.register(username, password);
    ctx.body = { code: 0, data };
  },

  async login(ctx: Context) {
    const { username, password } = ctx.request.body as unknown as LoginDTO;
    const data = await authService.login(username, password);
    ctx.body = { code: 0, data };
  },

  async refreshToken(ctx: Context) {
    const { refreshToken } = ctx.request.body as unknown as RefreshTokenDTO;
    const data = await authService.refreshToken(refreshToken);
    ctx.body = { code: 0, data };
  },

  async logout(ctx: Context) {
    const payload = ctx.state.user as AccessTokenPayload;
    await authService.logout(payload);
    ctx.body = { code: 0, message: "Logged out successfully" };
  },
};

export { authController };
