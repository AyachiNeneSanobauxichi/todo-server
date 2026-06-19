import type { RedisClientType } from "redis";
import { createClient } from "redis";
import env from "@/config/env";

let redisClient: RedisClientType;

function getRedisClient() {
  if (!redisClient) {
    redisClient = createClient({
      url: env.redisUrl,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 5) {
            console.error("[Redis] Max reconnect attempts reached");
            return new Error("Redis max retries exceeded");
          }
          return Math.min(retries * 500, 3000);
        },
      },
    });
  }

  redisClient.on("connect", () => console.log("[Redis] Connected"));
  redisClient.on("error", (err) => console.error("[Redis] Error:", err));
  redisClient.on("reconnecting", () => console.warn("[Redis] Reconnecting..."));

  return redisClient;
}

async function connectRedis() {
  const client = getRedisClient();
  await client.connect();
}

async function disconnectRedis() {
  const client = getRedisClient();
  await client.quit();
}

export { getRedisClient, connectRedis, disconnectRedis };
