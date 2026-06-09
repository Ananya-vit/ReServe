import jwt from "jsonwebtoken";
import myEnv from "../config/env.ts";

const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, myEnv.JWT_SECRET_KEY, { algorithm: "HS512", expiresIn: "1h" });
}
const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, myEnv.JWT_SECRET_KEY, { algorithm: "HS512", expiresIn: "7d" });
}
const verifyToken = (token: string) => {
  return jwt.verify(token, myEnv.JWT_SECRET_KEY, { algorithms: ["HS512"] });
};

export { generateAccessToken, generateRefreshToken, verifyToken };