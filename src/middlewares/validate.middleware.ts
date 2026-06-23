import type { Context, Next } from "koa";
import type { ZodType } from "zod";
import { ZodError } from "zod";
import { BizError } from "@/utils";

function validate(schema: ZodType) {
  return async (ctx: Context, next: Next) => {
    try {
      // parse 校验通过会返回解析后的值（含默认值等转换），直接覆写 body
      schema.parse(ctx.request.body);
      await next();
    } catch (err) {
      if (err instanceof ZodError) {
        // 把 Zod 的错误列表转成可读的消息
        const message = err.issues.map((issue) => issue.message).join("; ");
        throw new BizError("VALIDATION_ERROR", message);
      }

      throw err;
    }
  };
}

export { validate };
