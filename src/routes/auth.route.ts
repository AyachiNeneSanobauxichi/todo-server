import Router from "@koa/router";
import { authController } from "@/controllers";
import { authMiddleware } from "@/middlewares";

const authRouter = new Router({ prefix: "/auth" });

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/refresh-token", authController.refreshToken);
authRouter.post("/logout", authMiddleware.verifyToken, authController.logout);

export { authRouter };
