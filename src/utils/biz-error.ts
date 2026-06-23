import type { ErrorCodeKey } from "@/constants";
import { ErrorCode } from "@/constants";

class BizError extends Error {
  public readonly code: number;

  constructor(key: ErrorCodeKey, message?: string) {
    const entry = ErrorCode[key];
    super(message ?? entry.message);
    this.code = entry.code;
    this.name = "BizError";
  }
}

export { BizError };
