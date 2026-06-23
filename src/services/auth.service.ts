import { tokenRepository, userRepository } from "@/repositories";
import { AccessTokenPayload } from "@/types";
import {
  hashPassword,
  comparePassword,
  signRefreshToken,
  verifyRefreshToken,
} from "@/utils";
import { signAccessToken } from "@/utils";

const authService = {
  async register(username: string, password: string) {
    const existingUser = await userRepository.findUserByUsername(username);
    if (existingUser) {
      throw new Error("User already exists");
    }
    const hashedPassword = await hashPassword(password);
    const user = await userRepository.createUser({
      username,
      password: hashedPassword,
    });

    return { id: user._id.toString(), userName: user.username };
  },

  async login(username: string, password: string) {
    const user = await userRepository.findUserByUsername(username);
    if (!user) {
      throw new Error("Username or password is incorrect");
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Username or password is incorrect");
    }
    const payload = { userId: user._id.toString(), username: user.username };
    // access token
    const accessToken = signAccessToken(payload);
    // refresh token
    const refreshToken = signRefreshToken(payload);

    // 7 天 = 7 * 24 * 60 * 60 秒
    await tokenRepository.setRefreshToken(
      payload.userId,
      refreshToken,
      7 * 24 * 60 * 60,
    );

    return { accessToken, refreshToken };
  },

  async refreshToken(refreshToken: string) {
    const payload = verifyRefreshToken(refreshToken);
    const stored = await tokenRepository.getRefreshToken(payload.userId);

    if (!stored || stored !== refreshToken) {
      throw new Error("Invalid refresh token");
    }

    const accessToken = signAccessToken({
      userId: payload.userId,
      username: payload.username,
    });

    return { accessToken };
  },

  async logout(payload: AccessTokenPayload) {
    // 计算 access token 的剩余寿命，作为黑名单 TTL
    const ttl = payload.exp - Math.floor(Date.now() / 1000);
    if (ttl > 0) {
      await tokenRepository.addToBlacklist(payload.jti, ttl);
    }

    await tokenRepository.deleteRefreshToken(payload.userId);
  },
};

export { authService };
