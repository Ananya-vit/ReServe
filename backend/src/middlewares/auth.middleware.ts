import express from "express";
import { verifyToken } from "../utils/jwt.ts";

export const authMiddleware = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.headers.authorization?.split(" ")?.[1];

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    const decoded = verifyToken(accessToken) as Express.UserPayload;
    if (!decoded || decoded.type !== "access") {
      return res.status(401).json({ message: "Unauthorized!" });
    }
    req.user = decoded;
    next();
  } catch (_error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};
