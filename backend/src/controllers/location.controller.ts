import express from "express";
import { prisma } from "../lib/prisma.ts";
type AddLocationBody = {
  address: string;
  city: string;
  state: string;
  pincode: string;
};

const addNewPickupLocation = async (req: express.Request, res: express.Response) => {
  try {
    const { address, city, state, pincode } = req.body as AddLocationBody;
    // Process the location data (e.g., save to database)
    if (!address || !city || !state || !pincode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const location = await prisma.pickupLocation.create({
      data: {
        userId: req.user!.userId,
        address,
        city,
        state,
        pincode,
      },
    });
    res.status(201).json({
      message: "Location added successfully",
      location,
    });
  } catch (error) {
    console.error("Error parsing request body:", error);
    return res.status(400).json({ message: "Invalid request body" });
  }
};

export { addNewPickupLocation };
