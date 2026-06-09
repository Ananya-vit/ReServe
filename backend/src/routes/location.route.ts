import express from "express";
import {
  addNewPickupLocation,
  addUserLocation,
  getUserLocations,
  getPickupLocations,
  deleteUserLocation,
} from "../controllers/location.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";

const locationRouter = express.Router();

locationRouter.post("/pickup", authMiddleware, addNewPickupLocation);
locationRouter.post("/user", authMiddleware, addUserLocation);
locationRouter.get("/user", authMiddleware, getUserLocations);
locationRouter.get("/pickup", authMiddleware, getPickupLocations);
locationRouter.delete("/:id", authMiddleware, deleteUserLocation);

export default locationRouter;
