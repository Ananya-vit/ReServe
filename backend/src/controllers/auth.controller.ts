import express from "express";
import { prisma } from "../lib/prisma.ts";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwt.ts";

const signupController = async (
  req: express.Request,
  res: express.Response,
) => {
  let user;
  try {
    const { name, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use!" });
    }
    user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        passwordHash: passwordHash,
      },
    });
    res.status(200).json({ message: "Signup successful!" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user!" });
  }
};

const loginController = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
    const payload = { userId: user.id, email: user.email };
    const accessToken = generateAccessToken({ ...payload, type: "access" });
    const refreshToken = generateRefreshToken({ ...payload, type: "refresh" });
    res
      .status(200)
      .json({ message: "Login successful!", accessToken, refreshToken });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Error logging in!" });
  }
};

const refreshTokenController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const refreshToken =
      req.body?.refreshToken ||
      req.cookies?.refreshToken ||
      req.headers["x-refresh-token"];
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required!" });
    }
    const payload = verifyToken(refreshToken) as {
      userId: number;
      email: string;
      type: string;
    };
    if (payload.type !== "refresh") {
      return res.status(400).json({ message: "Invalid token type!" });
    }
    const newAccessToken = generateAccessToken({
      userId: payload.userId,
      email: payload.email,
    });
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ message: "Error refreshing token!" });
  }
};

export { signupController, loginController, refreshTokenController };
