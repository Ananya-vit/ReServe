import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import myEnv from "./config/env.ts";
import userRouter from "./routes/user.route.ts";
import authRouter from "./routes/auth.route.ts";
import donationRouter from "./routes/donation.route.ts";
const app = express();
const PORT = myEnv.PORT || 3000;

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter)
app.use("/api/donation", donationRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
