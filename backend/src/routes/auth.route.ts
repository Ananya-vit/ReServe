import express from "express";
import {
  signupController,
  verifyOtpController,
  resendOtpController,
  loginController,
  refreshTokenController,
} from "../controllers/auth.controller.ts";

const authRouter = express.Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
authRouter.post("/refresh", refreshTokenController);
authRouter.post("/verify-otp", verifyOtpController);
authRouter.post("/resend-otp", resendOtpController);

export default authRouter;
