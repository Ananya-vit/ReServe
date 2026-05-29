import express from "express";
import { addNewPickupLocation } from "../controllers/location.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";

const locationRouter = express.Router();

locationRouter.post("/", authMiddleware, addNewPickupLocation);

export default locationRouter;
