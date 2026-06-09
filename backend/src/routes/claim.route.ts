import express from "express";
const claimRouter = express.Router();
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import {
  createClaimController,
  getAllClaimsController,
  getClaimByIdController,
  getMyClaimsController,
  getDonorClaimsController,
  updateClaimStatusController,
  cancelClaimController,
} from "../controllers/claim.controller.ts";

claimRouter.post("/", authMiddleware, createClaimController);
claimRouter.get("/", getAllClaimsController);
claimRouter.get("/my-claims", authMiddleware, getMyClaimsController);
claimRouter.get("/donor-claims", authMiddleware, getDonorClaimsController);
claimRouter.get("/:id", getClaimByIdController);
claimRouter.put("/:id", authMiddleware, updateClaimStatusController);
claimRouter.patch("/:id/cancel", authMiddleware, cancelClaimController);

export default claimRouter;