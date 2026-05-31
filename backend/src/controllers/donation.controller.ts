import express from "express";
import { prisma } from "../lib/prisma.ts";
import { FoodTypeEnum } from "../../generated/prisma/enums.ts";

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

    const donation = await prisma.donation.create({
      data: {
        donorId,
        pickupLocationId,
        foodName,
        foodType,
        quantity,
        description,
        specialInstructions,
        pickupDeadline: new Date(pickupDeadline),
      },
    });
    res.status(201).json({ message: "Donation created successfully!", donation });
  } catch (error) {
    res.status(400).json({ error: "Invalid request body" });
  }
};

const getAllDonations = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;
    const offset = (page - 1) * limit;

    const donations = await prisma.donation.findMany({
      skip: offset,
      take: limit,
      include: {
        donor: true,
        pickupLocation: true,
      },
    });
    res.status(200).json({ donations });
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
    const donation = await prisma.donation.findUnique({
      where: { id: parseInt(id) },
      include: {
        donor: true,
        pickupLocation: true,
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
) => {};

const deleteDonation = async (
  req: express.Request,
  res: express.Response,
) => {};

export {
  createDonation,
  getAllDonations,
  getDonationById,
  updateDonation,
  deleteDonation,
};
