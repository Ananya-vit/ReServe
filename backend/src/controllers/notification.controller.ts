import express from "express";
import { prisma } from "../lib/prisma.ts";
import { NotificationTypeEnum } from "../../generated/prisma/enums.ts";

type CreateNotificationBody = {
  userId: number;
  donationId?: number;
  claimId?: number;
  type: NotificationTypeEnum;
  title: string;
  body: string;
};

const createNotificationController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { userId, donationId, claimId, type, title, body } = req.body as CreateNotificationBody;

    if (!userId || !type || !title || !body) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const notification = await prisma.notification.create({
      data: {
        userId,
        donationId,
        claimId,
        type,
        title,
        body,
      },
    });

    res.status(201).json({ message: "Notification created!", notification });
  } catch (error) {
    console.error("Error creating notification:", error);
    res.status(500).json({ message: "Error creating notification" });
  }
};

const getUserNotificationsController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const userId = req.user?.userId;
    const notifications = await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ notifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Error fetching notifications" });
  }
};

const markNotificationAsReadController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params as { id: string };
    const notificationId = parseInt(id);
    if (isNaN(notificationId)) {
      return res.status(400).json({ message: "Invalid notification ID" });
    }
    const notification = await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });

    res.status(200).json({ message: "Notification marked as read!", notification });
  } catch (error) {
    console.error("Error updating notification:", error);
    res.status(500).json({ message: "Error updating notification" });
  }
};

const markAllNotificationsAsReadController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const userId = req.user?.userId;
    await prisma.notification.updateMany({
      where: { userId },
      data: { isRead: true },
    });

    res.status(200).json({ message: "All notifications marked as read!" });
  } catch (error) {
    console.error("Error updating notifications:", error);
    res.status(500).json({ message: "Error updating notifications" });
  }
};

export {
  createNotificationController,
  getUserNotificationsController,
  markNotificationAsReadController,
  markAllNotificationsAsReadController,
};
