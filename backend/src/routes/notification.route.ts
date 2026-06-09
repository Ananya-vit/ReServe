import express from "express";
import {
  createNotificationController,
  getUserNotificationsController,
  markNotificationAsReadController,
  markAllNotificationsAsReadController,
} from "../controllers/notification.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";

const notificationRouter = express.Router();

notificationRouter.post("/", authMiddleware, createNotificationController);
notificationRouter.get("/", authMiddleware, getUserNotificationsController);
notificationRouter.put("/:id/read", authMiddleware, markNotificationAsReadController);
notificationRouter.put("/read-all", authMiddleware, markAllNotificationsAsReadController);

export default notificationRouter;
