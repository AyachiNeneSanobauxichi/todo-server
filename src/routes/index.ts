import Router from "@koa/router";
import { authRouter } from "./auth.route";

const router = new Router({ prefix: "/api" });
router.use(authRouter.routes(), authRouter.allowedMethods());

export { router };
