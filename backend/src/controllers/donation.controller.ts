import express from "express";
import { prisma } from "../lib/prisma.ts";
import { FoodTypeEnum } from "../../generated/prisma/enums.ts";
import { imagekit } from "../utils/imagekit.ts";

type CreateDonationBody = {
  foodName: string;
  foodType: FoodTypeEnum;
  quantity: number;
  description?: string;
  specialInstructions?: string;
  pickupDeadline: string | Date;
  pickupLocationId: number;
};

const createDonation = async (req: express.Request, res: express.Response) => {
  try {
    const {
      foodName,
      foodType,
      quantity,
      description,
      specialInstructions,
      pickupDeadline,
      pickupLocationId,
    } = req.body as CreateDonationBody;
    const donorId = req.user?.userId;
    const files = req.files as Express.Multer.File[];
    // Validate required fields
    if (
      !donorId ||
      !foodName ||
      !foodType ||
      !quantity ||
      !pickupDeadline ||
      !pickupLocationId
    ) {
      return res.status(400).json({ message: "Missing required fields!" });
    }

    const uploadedImages: string[] = [];
    if (files && files.length > 0) {
      for (const file of files) {
        const uploadResponse = await imagekit.upload({
          file: file.buffer,
          fileName: file.originalname,
          folder: "/reserve_donations",
        });
        uploadedImages.push(uploadResponse.url);
      }
    }

    const donation = await prisma.donation.create({
      data: {
        donorId,
        pickupLocationId: Number(pickupLocationId),
        foodName,
        foodType,
        quantity: Number(quantity),
        description,
        specialInstructions,
        pickupDeadline: new Date(pickupDeadline),
        images: {
          create: uploadedImages.map((url) => ({
            imageUrl: url,
          })),
        },
      },
    });
    res.status(201).json({ message: "Donation created successfully!", donation });
  } catch (error) {
    console.error("Donation creation error:", error);
    res.status(500).json({ error: "Failed to create donation" });
  }
};

const getAllDonations = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [donations, totalCount] = await Promise.all([
      prisma.donation.findMany({
        skip: offset,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          donor: true,
          pickupLocation: true,
          images: true,
        },
      }),
      prisma.donation.count(),
    ]);
    res.status(200).json({ donations, totalCount });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};

const getDonationById = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params as { id: string };
    const donationId = parseInt(id);
    if (isNaN(donationId)) {
      return res.status(400).json({ error: "Invalid donation ID" });
    }
    const donation = await prisma.donation.findUnique({
      where: { id: donationId },
      include: {
        donor: true,
        pickupLocation: true,
        images: true,
      },
    });
    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }
    res.status(200).json({ donation });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch donation" });
  }
};

const updateDonation = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params as { id: string };
    const donorId = req.user?.userId;
    const donation = await prisma.donation.findUnique({
      where: { id: parseInt(id) },
    });
    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }
    if (donation.donorId !== donorId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const updatedDonation = await prisma.donation.update({
      where: { id: parseInt(id) },
      data: {
        ...(req.body.foodName && { foodName: req.body.foodName }),
        ...(req.body.foodType && { foodType: req.body.foodType }),
        ...(req.body.quantity && { quantity: Number(req.body.quantity) }),
        ...(req.body.description !== undefined && { description: req.body.description }),
        ...(req.body.specialInstructions !== undefined && { specialInstructions: req.body.specialInstructions }),
        ...(req.body.pickupDeadline && { pickupDeadline: new Date(req.body.pickupDeadline) }),
        ...(req.body.status && { status: req.body.status }),
      },
    });
    res.status(200).json({ message: "Donation updated!", donation: updatedDonation });
  } catch (error) {
    res.status(500).json({ error: "Failed to update donation" });
  }
};

const deleteDonation = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { id } = req.params as { id: string };
    const donorId = req.user?.userId;
    const donation = await prisma.donation.findUnique({
      where: { id: parseInt(id) },
    });
    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }
    if (donation.donorId !== donorId) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    await prisma.donation.delete({
      where: { id: parseInt(id) },
    });
    res.status(200).json({ message: "Donation deleted!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete donation" });
  }
};

const getMyDonations = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const donorId = req.user?.userId;
    if (!donorId) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [donations, totalCount] = await Promise.all([
      prisma.donation.findMany({
        where: { donorId },
        skip: offset,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          pickupLocation: true,
          images: true,
          claims: {
            include: {
              claimer: {
                select: { id: true, name: true, phone: true, email: true },
              },
            },
            orderBy: { createdAt: "desc" },
          },
        },
      }),
      prisma.donation.count({ where: { donorId } }),
    ]);

    res.status(200).json({ donations, totalCount });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch your donations" });
  }
};

export {
  createDonation,
  getAllDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
  getMyDonations,
};
