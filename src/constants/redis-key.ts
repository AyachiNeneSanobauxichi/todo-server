const RedisKey = {
  refreshToken: (userId: string) => `refresh:${userId}`,
};

export { RedisKey };
