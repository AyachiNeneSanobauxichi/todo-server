import Router from "@koa/router";
import { authRouter } from "./auth.route";
import { todoRouter } from "./todo.route";

const router = new Router({ prefix: "/api" });
router.use(authRouter.routes(), authRouter.allowedMethods());
router.use(todoRouter.routes(), todoRouter.allowedMethods());

export { router };
