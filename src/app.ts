import Koa from "koa";
import { koaBody } from "koa-body";
import Router from "@koa/router";

const app = new Koa();
const router = new Router();

app.use(koaBody());

router.get("/health", (ctx) => {
  ctx.body = { status: "ok" };
});

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
