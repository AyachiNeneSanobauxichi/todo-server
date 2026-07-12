import { z, email } from "zod";

const loginSchema = z.object({
  username: z
    .string({ error: "Username is required" })
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
  email: email({
    error: (issue) =>
      issue.input === undefined ? "Email is required" : "Invalid email address",
  }),
  password: z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    ),
});

const refreshTokenSchema = z.object({
  refreshToken: z.string({ error: "Refresh token is required" }),
});

export { loginSchema, refreshTokenSchema };
