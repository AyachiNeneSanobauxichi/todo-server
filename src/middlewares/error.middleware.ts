import type { Context, Next } from "koa";
import { BizError, fail } from "@/utils";
import { ErrorCode } from "@/constants";

async function errorMiddleware(ctx: Context, next: Next) {
  try {
    await next();
  } catch (err) {
    if (err instanceof BizError) {
      // 业务错误：已知错误，正常返回给客户端
      fail(ctx, 200, err.code, err.message);
    } else {
      // 未知错误：系统异常，记日志、不暴露内部细节
      console.error("Unhandled error: ", err);
      fail(
        ctx,
        500,
        ErrorCode.INTERNAL_SERVER_ERROR.code,
        ErrorCode.INTERNAL_SERVER_ERROR.message,
      );
    }
  }
}

export { errorMiddleware };
