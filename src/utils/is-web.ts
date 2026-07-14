import type { Context } from "koa";

function isWeb(ctx: Context) {
  return ctx.headers["x-client-type"] === "web";
}

export { isWeb };
