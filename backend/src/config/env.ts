import dotenv from "dotenv";

dotenv.config();

const myEnv = {
  PORT: process.env["PORT"] || "3000",
  PG_DATABASE_URL: process.env["PG_DATABASE_URL"] || "",
};

export default myEnv;
