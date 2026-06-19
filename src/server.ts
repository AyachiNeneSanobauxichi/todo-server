import app from "@/app";
import {
  envConfig,
  connectMongo,
  disconnectMongo,
  connectRedis,
  disconnectRedis,
} from "@/config";

async function bootstrap() {
  await Promise.all([connectMongo(), connectRedis()]);

  const server = app.listen(envConfig.port, () => {
    console.log(
      `Server running on http://localhost:${envConfig.port} [${envConfig.nodeEnv}]`,
    );
  });

  process.on("SIGINT", async () => {
    server.close();
    await Promise.all([disconnectMongo(), disconnectRedis()]);
    console.log("[Server] Gracefully shut down");
    process.exit(0);
  });
}

bootstrap().catch((err) => {
  console.error("[Server] Failed to start:", err);
  process.exit(1);
});
