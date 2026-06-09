import express from "express";
import { prisma } from "../lib/prisma.ts";
type AddLocationBody = {
  address: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  isPrimary?: boolean;
};

const addNewPickupLocation = async (req: express.Request, res: express.Response) => {
  try {
    const { address, city, state, pincode, latitude, longitude } = req.body as AddLocationBody;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!address || !city || !state || !pincode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const location = await prisma.pickupLocation.create({
      data: {
        userId,
        address,
        city,
        state,
        pincode,
        latitude,
        longitude,
      },
    });
    res.status(201).json({
      message: "Location added successfully",
      location,
    });
  } catch (error) {
    console.error("Error creating pickup location:", error);
    return res.status(400).json({ message: "Invalid request body" });
  }
};

const addUserLocation = async (req: express.Request, res: express.Response) => {
  try {
    const { address, city, state, pincode, latitude, longitude, isPrimary } = req.body as AddLocationBody;
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!address || !city || !state || !pincode) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const location = await prisma.userLocation.create({
      data: {
        userId,
        address,
        city,
        state,
        pincode,
        latitude,
        longitude,
        isPrimary: isPrimary || false,
      },
    });
    res.status(201).json({
      message: "User location added successfully",
      location,
    });
  } catch (error) {
    console.error("Error adding user location:", error);
    return res.status(400).json({ message: "Invalid request body" });
  }
};

const getUserLocations = async (req: express.Request, res: express.Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const locations = await prisma.userLocation.findMany({
      where: { userId },
    });
    res.status(200).json({ locations });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching locations" });
  }
};

const getPickupLocations = async (req: express.Request, res: express.Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const locations = await prisma.pickupLocation.findMany({
      where: { userId },
    });
    res.status(200).json({ locations });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching pickup locations" });
  }
};

const deleteUserLocation = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params as { id: string };
    const locationId = parseInt(id);
    if (isNaN(locationId)) {
      return res.status(400).json({ message: "Invalid location ID" });
    }
    await prisma.userLocation.delete({
      where: { id: locationId },
    });
    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting location" });
  }
};

export {
  addNewPickupLocation,
  addUserLocation,
  getUserLocations,
  getPickupLocations,
  deleteUserLocation,
};
