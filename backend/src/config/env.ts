import dotenv from "dotenv";

dotenv.config();

const myEnv = {
  PORT: process.env["PORT"] || "3000",
  PG_DATABASE_URL: process.env["PG_DATABASE_URL"] || "",
  JWT_SECRET_KEY: process.env["JWT_SECRET_KEY"] || "",
};

export default myEnv;
