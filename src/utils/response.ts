import type { Context } from "koa";

function success<T>(ctx: Context, data?: T, message = "success") {
  ctx.status = 200;
  ctx.body = {
    code: 0,
    message,
    data: data ?? null,
  };
}

function fail(
  ctx: Context,
  statusCode: number,
  errorCode: number,
  message: string,
) {
  ctx.status = statusCode;
  ctx.body = {
    code: errorCode,
    message,
    data: null,
  };
}

export { success, fail };
