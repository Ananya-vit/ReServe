import express from "express"
import { prisma } from "../lib/prisma.ts";
import bcrypt from "bcrypt";


const createUser = async (req: express.Request, res: express.Response) => {
  let user;
  try {
    const { name, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    const existingUser = await prisma.user.findUnique({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use!" });
    }
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
};

const getAllUsers = async (req: express.Request, res: express.Response) => {
  // Logic to get all users
};

const getUserById = async (req: express.Request, res: express.Response) => {
  // Logic to get a user by ID
};

const updateUser = async (req: express.Request, res: express.Response) => {
  // Logic to update a user
};

const deleteUser = async (req: express.Request, res: express.Response) => {
  // Logic to delete a user
};

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };
