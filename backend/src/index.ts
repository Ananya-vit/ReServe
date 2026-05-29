import express from "express";
import cors from "cors";
import myEnv from "./config/env.js";
import { prisma } from "./lib/prisma.js";
import bcrypt from "bcrypt";
const app = express();
const PORT = myEnv.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.get("/api/user", (req: express.Request, res: express.Response) => {
  const users = prisma.user.findMany();
  console.log("Fetched users:", users);
  res.status(200).json({ message: "Welcome to the API!", users });
});
app.post("/api/user", async (req: express.Request, res: express.Response) => {
  let user;
  try {
    const { name, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10); // In a real application, you should hash the password before storing it
    user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        passwordHash: passwordHash,
      },
    });
    console.log("Created user:", user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user!" });
  }
  res.status(200).json({ message: "User created successfully!", user });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
