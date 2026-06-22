import { getRedisClient } from "@/config";
import { RedisKey } from "@/constants";

const tokenRepository = {
  setRefreshToken: (userId: string, token: string, ttlSeconds: number) => {
    return getRedisClient().set(RedisKey.refreshToken(userId), token, {
      EX: ttlSeconds,
    });
  },

  getRefreshToken: (userId: string) => {
    return getRedisClient().get(RedisKey.refreshToken(userId));
  },

  deleteRefreshToken: (userId: string) => {
    return getRedisClient().del(RedisKey.refreshToken(userId));
  },
};

export { tokenRepository };
