const RedisKey = {
  refreshToken: (userId: string) => `refresh:${userId}`,
  accessBlacklist: (jti: string) => `blacklist:access:${jti}`,
};

export { RedisKey };
