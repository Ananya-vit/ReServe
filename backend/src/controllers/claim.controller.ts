import express from "express";
import { prisma } from "../lib/prisma.ts";

type CreateClaimBody = {
  donationId: number;
  scheduledPickup: string | Date;
};
const createClaimController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { donationId, scheduledPickup } = req.body as CreateClaimBody;

    const claimerId = req.user?.userId;
    if (!claimerId || !donationId || !scheduledPickup) {
      return res.status(401).json({ message: "Missing required fields." });
    }
    const donation = await prisma.donation.findUnique({
      where: { id: donationId },
    });
    if (!donation) {
      return res.status(404).json({ message: "Donation not found." });
    }

    const existingClaim = await prisma.claim.findFirst({
      where: {
        donationId,
        claimerId,
      },
    });
    if (existingClaim) {
      return res
        .status(409)
        .json({ message: "Claim already exists for this user." });
    }

    const claim = await prisma.claim.create({
      data: {
        claimerId,
        donationId,
        scheduledPickup: new Date(scheduledPickup),
      },
    });

    return res
      .status(201)
      .json({ message: "Claim created successfully!", claim });
  } catch (error) {
    return res.status(500).json({ message: "Error creating claim." });
  }
};

export { createClaimController };
