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
) => {};

const getDonationById = async (
  req: express.Request,
  res: express.Response,
) => {};

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
