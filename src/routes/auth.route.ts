import Router from "@koa/router";
import { authController } from "@/controllers";

const authRouter = new Router({ prefix: "/auth" });

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

export { authRouter };
