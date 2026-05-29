import express from "express";
const claimRouter = express.Router();
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { createClaimController } from "../controllers/claim.controller.ts";

claimRouter.post("/", authMiddleware, createClaimController);

export default claimRouter;