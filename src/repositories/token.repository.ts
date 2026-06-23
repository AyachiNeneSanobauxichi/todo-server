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

  addToBlacklist: (jti: string, ttlSeconds: number) => {
    return getRedisClient().set(RedisKey.accessBlacklist(jti), "1", {
      EX: ttlSeconds,
    });
  },

  isBlacklisted: async (jti: string) => {
    const exists = await getRedisClient().exists(RedisKey.accessBlacklist(jti));
    return exists === 1;
  },
};

export { tokenRepository };
