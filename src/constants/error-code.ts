const ErrorCode = {
  // 通用
  INTERNAL_SERVER_ERROR: { code: 10000, message: "Internal server error" },
  VALIDATION_ERROR: { code: 10001, message: "Validation error" },

  // 认证 1xxxx
  UNAUTHORIZED: { code: 11000, message: "Unauthorized" },
  TOKEN_INVALID: { code: 11001, message: "Invalid token" },
  TOKEN_BLACKLISTED: { code: 11002, message: "Token has been invalidated" },
  INVALID_CREDENTIALS: {
    code: 11003,
    message: "Username or password is incorrect",
  },
  USER_ALREADY_EXISTS: { code: 11004, message: "User already exists" },
  INVALID_REFRESH_TOKEN: { code: 11005, message: "Invalid refresh token" },

  // 待办事项 12xxx
  TODO_NOT_FOUND: { code: 12000, message: "Todo not found" },
} as const;

type ErrorCodeKey = keyof typeof ErrorCode;

export { ErrorCode };
export type { ErrorCodeKey };
