import express from "express";
import { createRatingController, getUserRatingsController } from "../controllers/rating.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";

const ratingRouter = express.Router();

ratingRouter.post("/", authMiddleware, createRatingController);
ratingRouter.get("/user/:userId", getUserRatingsController);

export default ratingRouter;
