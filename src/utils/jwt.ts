import type { JwtPayload } from "@/types";
import type { SignOptions } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import env from "@/config/env";

function signAccessToken(payload: JwtPayload) {
  const options: SignOptions = {
    expiresIn: env.jwtAccessExpires as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, env.jwtSecret, options);
}

function verifyToken(token: string) {
  return jwt.verify(token, env.jwtSecret) as JwtPayload;
}

function signRefreshToken(payload: JwtPayload) {
  const options: SignOptions = {
    expiresIn: env.jwtRefreshExpires as SignOptions["expiresIn"],
  };

  return jwt.sign(payload, env.jwtRefreshSecret, options);
}

function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.jwtRefreshSecret) as JwtPayload;
}

export { signAccessToken, verifyToken, signRefreshToken, verifyRefreshToken };
