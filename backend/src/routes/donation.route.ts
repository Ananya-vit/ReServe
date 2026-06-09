import express from "express";
import {
  createDonation,
  deleteDonation,
  getAllDonations,
  getDonationById,
  updateDonation,
  getMyDonations,
} from "../controllers/donation.controller.ts";
import { authMiddleware } from "../middlewares/auth.middleware.ts";
import { upload } from "../middlewares/upload.middleware.ts";

const donationRouter = express.Router();

donationRouter.post("/", authMiddleware, upload.array('images', 5), createDonation);
donationRouter.get("/", getAllDonations);
donationRouter.get("/my-donations", authMiddleware, getMyDonations);
donationRouter.get("/:id", getDonationById);
donationRouter.put("/:id", authMiddleware, updateDonation);
donationRouter.delete("/:id", authMiddleware, deleteDonation);

export default donationRouter;
