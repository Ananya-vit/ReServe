import dotenv from "dotenv";

dotenv.config();

const myEnv = {
  PORT: process.env["PORT"] || "3000",
  PG_DATABASE_URL: process.env["PG_DATABASE_URL"] || "",
  JWT_SECRET_KEY: process.env["JWT_SECRET_KEY"] || "",
  RESEND_API_KEY: process.env["RESEND_API_KEY"] || "",
  RESEND_FROM_EMAIL: process.env["RESEND_FROM_EMAIL"] || "reserve@resend.xsam.in",
};

export default myEnv;
