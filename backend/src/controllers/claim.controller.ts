import express from "express";
import { prisma } from "../lib/prisma.ts";
import { sendClaimNotificationEmail, sendClaimStatusEmail } from "../utils/email.ts";

type CreateClaimBody = {
  donationId: number;
  quantity: number;
  scheduledPickup: string | Date;
};

const createClaimController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { donationId, quantity, scheduledPickup } = req.body as CreateClaimBody;
    const parsedDonationId = Number(donationId);
    const requestedQty = Number(quantity);

    const claimerId = req.user?.userId;
    if (!claimerId || !parsedDonationId || !scheduledPickup || !requestedQty) {
      return res.status(401).json({ message: "Missing required fields." });
    }
    if (requestedQty <= 0) {
      return res.status(400).json({ message: "Quantity must be greater than 0." });
    }

    const donation = await prisma.donation.findUnique({
      where: { id: parsedDonationId },
      include: { donor: true },
    });
    if (!donation) {
      return res.status(404).json({ message: "Donation not found." });
    }

    if (requestedQty > donation.quantity) {
      return res.status(400).json({ message: `Only ${donation.quantity} items available.` });
    }

    const existingClaim = await prisma.claim.findFirst({
      where: {
        donationId: parsedDonationId,
        claimerId,
      },
    });
    if (existingClaim) {
      return res
        .status(409)
        .json({ message: "Claim already exists for this user." });
    }

    const claimer = await prisma.user.findUnique({ where: { id: claimerId } });

    const claim = await prisma.claim.create({
      data: {
        claimerId,
        donationId: parsedDonationId,
        quantity: requestedQty,
        scheduledPickup: new Date(scheduledPickup),
      },
    });

    // Notify the donor via email
    if (donation.donor?.email) {
      sendClaimNotificationEmail(
        donation.donor.email,
        donation.donor.name || "Donor",
        claimer?.name || "NGO Partner",
        donation.foodName,
        donation.quantity,
        new Date(scheduledPickup).toLocaleDateString(),
      );
    }

    return res
      .status(201)
      .json({ message: "Claim created successfully!", claim });
  } catch (error) {
    return res.status(500).json({ message: "Error creating claim." });
  }
};



const getAllClaimsController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const claims = await prisma.claim.findMany({
      skip: offset,
      take: limit,
      include: {
        donation: true,
        claimer: true,
      },
    });

    res.status(200).json({ claims });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching claims." });
  }
};

const getClaimByIdController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params as { id: string };
    const claimId = parseInt(id);
    if (isNaN(claimId)) {
      return res.status(400).json({ message: "Invalid claim ID" });
    }
    const claim = await prisma.claim.findUnique({
      where: { id: claimId },
      include: {
        donation: true,
        claimer: true,
      },
    });

    if (!claim) {
      return res.status(404).json({ message: "Claim not found." });
    }

    res.status(200).json({ claim });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching claim." });
  }
};

const getMyClaimsController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const claimerId = req.user?.userId;
    if (!claimerId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const claims = await prisma.claim.findMany({
      where: { claimerId },
      include: {
        donation: {
          include: {
            donor: true,
            pickupLocation: true,
          },
        },
      },
    });

    res.status(200).json({ claims });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching your claims." });
  }
};

const updateClaimStatusController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params as { id: string };
    const claimId = parseInt(id);
    if (isNaN(claimId)) {
      return res.status(400).json({ message: "Invalid claim ID" });
    }
    const { status, actualPickup, confirmationPhotoUrl } = req.body;

    const claim = await prisma.claim.findUnique({
      where: { id: claimId },
      include: {
        claimer: true,
        donation: { include: { donor: true } },
      },
    });

    if (!claim) {
      return res.status(404).json({ message: "Claim not found." });
    }

    const donorId = req.user?.userId;
    if (claim.donation.donorId !== donorId) {
      return res.status(403).json({ message: "You can only manage claims on your own donations." });
    }

    if (status === "ACCEPTED" && claim.quantity > 0) {
      const newQty = Math.max(0, claim.donation.quantity - claim.quantity);
      await prisma.donation.update({
        where: { id: claim.donation.id },
        data: { quantity: newQty },
      });
    }

    const updatedClaim = await prisma.claim.update({
      where: { id: claimId },
      data: {
        ...(status && { status }),
        ...(actualPickup && { actualPickup: new Date(actualPickup) }),
        ...(confirmationPhotoUrl && { confirmationPhotoUrl }),
      },
    });

    // Notify the claimer about status change via email
    if (status && claim.claimer?.email) {
      sendClaimStatusEmail(
        claim.claimer.email,
        claim.claimer.name || "Partner",
        claim.donation?.foodName || "Food item",
        status,
        claim.donation?.donor?.name || "Donor",
      );
    }

    res.status(200).json({ message: "Claim updated successfully!", claim: updatedClaim });
  } catch (error) {
    return res.status(500).json({ message: "Error updating claim." });
  }
};

const cancelClaimController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params as { id: string };
    const claimId = parseInt(id);
    if (isNaN(claimId)) {
      return res.status(400).json({ message: "Invalid claim ID" });
    }
    const { cancellationReason } = req.body;

    const claim = await prisma.claim.findUnique({
      where: { id: claimId },
    });

    if (!claim) {
      return res.status(404).json({ message: "Claim not found." });
    }

    const updatedClaim = await prisma.claim.update({
      where: { id: claimId },
      data: {
        status: "CANCELLED",
        cancellationReason,
      },
    });

    res.status(200).json({ message: "Claim cancelled successfully!", claim: updatedClaim });
  } catch (error) {
    return res.status(500).json({ message: "Error cancelling claim." });
  }
};

const getDonorClaimsController = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const donorId = req.user?.userId;
    if (!donorId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const claims = await prisma.claim.findMany({
      where: {
        donation: { donorId },
      },
      include: {
        donation: {
          include: {
            pickupLocation: true,
            images: true,
          },
        },
        claimer: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ claims });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching donor claims." });
  }
};

export {
  createClaimController,
  getAllClaimsController,
  getClaimByIdController,
  getMyClaimsController,
  getDonorClaimsController,
  updateClaimStatusController,
  cancelClaimController,
};
