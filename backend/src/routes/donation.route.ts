import express from "express";
import {
  createDonation,
  deleteDonation,
  getAllDonations,
  getDonationById,
  updateDonation,
} from "../controllers/donation.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";

const donationRouter = express.Router();

donationRouter.post("/",authMiddleware, createDonation);
donationRouter.get("/", getAllDonations);
donationRouter.get("/:id", getDonationById);
donationRouter.put("/:id", authMiddleware, updateDonation);
donationRouter.delete("/:id", authMiddleware, deleteDonation);

export default donationRouter;
