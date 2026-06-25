import type { Context, Next } from "koa";
import type { ZodType } from "zod";
import { ZodError } from "zod";
import { BizError } from "@/utils";

enum ValidateType {
  BODY = "body",
  QUERY = "query",
  PARAMS = "params",
}

function validate(schema: ZodType, type: ValidateType = ValidateType.BODY) {
  return async (ctx: Context, next: Next) => {
    try {
      // parse 校验通过会返回解析后的值（含默认值等转换），直接覆写 body
      if (type === ValidateType.BODY) {
        schema.parse(ctx.request.body);
      } else if (type === ValidateType.QUERY) {
        schema.parse(ctx.query);
      } else if (type === ValidateType.PARAMS) {
        schema.parse(ctx.params);
      }
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

export { validate, ValidateType };
