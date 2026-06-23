interface JwtPayload {
  userId: string;
  username: string;
}

interface AccessTokenPayload extends JwtPayload {
  jti: string;
  iat: number;
  exp: number;
}

export type { JwtPayload, AccessTokenPayload };
