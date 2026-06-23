import Router from "@koa/router";
import { authController } from "@/controllers";
import { authMiddleware, validate } from "@/middlewares";
import { loginSchema, refreshTokenSchema } from "@/validators";

const authRouter = new Router({ prefix: "/auth" });

authRouter.post("/register", validate(loginSchema), authController.register);
authRouter.post("/login", validate(loginSchema), authController.login);
authRouter.post(
  "/refresh-token",
  validate(refreshTokenSchema),
  authController.refreshToken,
);
authRouter.post("/logout", authMiddleware.verifyToken, authController.logout);

export { authRouter };
