import Koa from "koa";
import { koaBody } from "koa-body";
import { router } from "./routes";

const app = new Koa();

app.use(koaBody());

router.get("/health", (ctx) => {
  ctx.body = { status: "ok" };
});

app.use(router.routes());
app.use(router.allowedMethods());

export default app;
