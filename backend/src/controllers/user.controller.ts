import express from "express";
import { prisma } from "../lib/prisma.ts";
import bcrypt from "bcrypt";


const createUser = async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, password } = req.body;
    const passwordHash = bcrypt.hashSync(password, 10);
    const existingUser = await prisma.user.findUnique({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use!" });
    }
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        passwordHash: passwordHash,
      },
    });
    return res.status(200).json({ message: "User created successfully!", user });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Error creating user!" });
  }
};

const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        isVerified: true,
        trustScore: true,
        mealsDonated: true,
        mealsReceived: true,
        createdAt: true,
      },
    });
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users!" });
  }
};

const getUserById = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params as { id: string };
    const userId = parseInt(id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        locations: true,
        pickupLocations: true,
        ratingsReceived: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const { passwordHash: _pw, ...userWithoutPassword } = user;
    res.status(200).json({ user: userWithoutPassword });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user!" });
  }
};

const updateUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params as { id: string };
    const userId = parseInt(id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const { name, phone, role } = req.body;
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(name && { name }),
        ...(phone && { phone }),
        ...(role && { role }),
      },
    });
    const { passwordHash: _pw, ...userWithoutPassword } = user;
    res.status(200).json({ message: "User updated successfully!", user: userWithoutPassword });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user!" });
  }
};

const deleteUser = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params as { id: string };
    const userId = parseInt(id);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    await prisma.user.delete({
      where: { id: userId },
    });
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user!" });
  }
};

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };
