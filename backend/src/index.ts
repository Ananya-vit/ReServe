import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import myEnv from "./config/env.ts";
import userRouter from "./routes/user.route.ts";
import authRouter from "./routes/auth.route.ts";
import donationRouter from "./routes/donation.route.ts";
import locationRouter from "./routes/location.route.ts";
import claimRouter from "./routes/claim.route.ts";
import ratingRouter from "./routes/rating.route.ts";
import notificationRouter from "./routes/notification.route.ts";

const app = express();
const PORT = myEnv.PORT || 3000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

app.get("/", (_req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/donation", donationRouter);
app.use("/api/location", locationRouter);
app.use("/api/claim", claimRouter);
app.use("/api/rating", ratingRouter);
app.use("/api/notification", notificationRouter);

// Global error handler
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
