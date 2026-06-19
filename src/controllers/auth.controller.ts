import type { Context } from "koa";
import type { LoginDTO } from "@/interfaces";
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
};

export { authController };
