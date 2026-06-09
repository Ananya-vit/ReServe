import express from "express";
import { prisma } from "../lib/prisma.ts";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyToken,
} from "../utils/jwt.ts";
import { sendOtpEmail, sendWelcomeEmail } from "../utils/email.ts";
import { generateOtp, storeOtp, verifyOtp } from "../utils/otp.ts";

const signupController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { name, email, password, role } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use!" });
    }
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        passwordHash: passwordHash,
        ...(role && { role }),
      },
    });
    const payload = { userId: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken({ ...payload, type: "access" });
    const refreshToken = generateRefreshToken({ ...payload, type: "refresh" });
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "strict" });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "strict" });

    // Generate and send OTP email
    const otp = generateOtp();
    storeOtp(email, otp);
    sendOtpEmail(email, name || "there", otp); // fire-and-forget

    res.status(200).json({ message: "Signup successful!", accessToken, refreshToken });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user!" });
  }
};

const verifyOtpController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required." });
    }

    const isValid = verifyOtp(email, otp);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }

    // Mark user as verified
    const user = await prisma.user.update({
      where: { email },
      data: { isVerified: true },
    });

    // Send welcome email after verification
    sendWelcomeEmail(email, user.name || "partner", user.role);

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Error verifying OTP!" });
  }
};

const resendOtpController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const otp = generateOtp();
    storeOtp(email, otp);
    sendOtpEmail(email, user.name || "there", otp);

    res.status(200).json({ message: "OTP resent!" });
  } catch (error) {
    console.error("Error resending OTP:", error);
    res.status(500).json({ message: "Error resending OTP!" });
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
    const payload = { userId: user.id, email: user.email, role: user.role };
    const accessToken = generateAccessToken({ ...payload, type: "access" });
    const refreshToken = generateRefreshToken({ ...payload, type: "refresh" });
    res.cookie("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "strict" });
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "strict" });
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
    const payload = verifyToken(refreshToken) as Express.UserPayload;
    if (payload.type !== "refresh") {
      return res.status(400).json({ message: "Invalid token type!" });
    }
    const newAccessToken = generateAccessToken({
      userId: payload.userId,
      email: payload.email,
      role: payload.role,
      type: "access",
    });
    res.cookie("accessToken", newAccessToken, { httpOnly: true, secure: true, sameSite: "strict" });
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ message: "Error refreshing token!" });
  }
};

export { signupController, verifyOtpController, resendOtpController, loginController, refreshTokenController };
