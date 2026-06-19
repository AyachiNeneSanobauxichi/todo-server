import mongoose from "mongoose";
import app from "@/app";
import env from "@/config/env";
import { connectMongo } from "@/config/mongodb";

async function bootstrap() {
  await connectMongo();
  const server = app.listen(env.port, () => {
    console.log(
      `Server running on http://localhost:${env.port} [${env.nodeEnv}]`,
    );
  });

  process.on("SIGINT", async () => {
    server.close();
    await mongoose.connection.close();
    console.log("[Server] Gracefully shut down");
    process.exit(0);
  });
}

bootstrap().catch((err) => {
  console.error("[Server] Failed to start:", err);
  process.exit(1);
});
