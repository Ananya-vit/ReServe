import express from "express";
import { prisma } from "../lib/prisma.ts";

type CreateRatingBody = {
  rating: number;
  review?: string;
  donationId: number;
  toUserId: number;
};

const createRatingController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { rating, review, donationId, toUserId } = req.body as CreateRatingBody;
    const fromUserId = req.user?.userId;

    if (!fromUserId || rating == null || !donationId || !toUserId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be an integer between 1 and 5" });
    }

    const ratingRecord = await prisma.rating.create({
      data: {
        rating,
        review,
        donationId,
        fromUserId,
        toUserId,
      },
    });

    res.status(201).json({ message: "Rating created successfully!", rating: ratingRecord });
  } catch (error) {
    console.error("Error creating rating:", error);
    res.status(500).json({ message: "Error creating rating" });
  }
};

const getUserRatingsController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { userId } = req.params as { userId: string };
    const ratings = await prisma.rating.findMany({
      where: { toUserId: parseInt(userId) },
      include: { fromUser: true },
    });

    const avgRating = ratings.length > 0
      ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
      : 0;

    res.status(200).json({ ratings, averageRating: avgRating, totalRatings: ratings.length });
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({ message: "Error fetching ratings" });
  }
};

export { createRatingController, getUserRatingsController };
