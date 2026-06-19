import "dotenv/config";

const env = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  isDev: process.env.NODE_ENV !== "production",
  mongoUri: process.env.MONGO_URI || "",
};

export default env;
