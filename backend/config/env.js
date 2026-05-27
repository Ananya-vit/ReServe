import dotenv from "dotenv";
dotenv.config();

const myEnv = {
  PORT: process.env.PORT || 3000,
};

export default myEnv;