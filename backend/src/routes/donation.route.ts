import express from "express";
import {
  createDonation,
  deleteDonation,
  getAllDonations,
  getDonationById,
  updateDonation,
} from "../controllers/donation.controller.ts";

const donationRouter = express.Router();

donationRouter.post("/", createDonation);
donationRouter.get("/", getAllDonations);
donationRouter.get("/:id", getDonationById);
donationRouter.put("/:id", updateDonation);
donationRouter.delete("/:id", deleteDonation);

export default donationRouter;
