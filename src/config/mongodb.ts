import mongoose from "mongoose";
import env from "@/config/env";

export async function connectMongo() {
  mongoose.connection.on("connected", () => {
    console.log("[MongoDB] Connected");
  });
  mongoose.connection.on("error", (err) => {
    console.error("[MongoDB] Connection error:", err);
  });
  mongoose.connection.on("disconnected", () => {
    console.warn("[MongoDB] Disconnected");
  });
  await mongoose.connect(env.mongoUri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  });
}
