import express from "express";
import {
  signupController,
  loginController,
  refreshTokenController,
} from "../controllers/auth.controller.ts";

const authRouter = express.Router();

authRouter.post("/signup", signupController);
authRouter.post("/login", loginController);
authRouter.post("/refresh", refreshTokenController);

export default authRouter;
