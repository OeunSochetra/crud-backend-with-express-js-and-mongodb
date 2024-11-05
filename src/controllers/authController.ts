import { Request, Response } from "express";
import { User } from "../models/user.modal";
import { IUser, IAuthUser } from "../constants/common";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";

const randomImage = faker.image.avatar();

export const register = async (req: Request, res: Response) => {
  const { username, password, email, image } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const user = new User({ username, password, email, image: randomImage });
    await user.save();

    res.status(201).json({
      message: "success",
      data: user,
      meta: {},
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const secretKey = process.env.JWT_SECRET || "";

    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    if (!(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const payload: IAuthUser = {
      id: user!._id!.toString(),
    };

    const token = jwt.sign(payload, secretKey, {
      expiresIn: "365d",
    });

    res.status(201).json({
      message: "success",
      data: {
        accessToken: token,
      },
      meta: {},
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// get me

export const getMe = async (req: Request, res: Response) => {
  const authUser = (req as any).user as IAuthUser;
  try {
    const user = await User.findById(authUser.id).select("-password"); // Exclude password field for security
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({
      message: "success",
      data: user,
      meta: {},
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const updateMe = async (req: Request, res: Response) => {
  const authUser = (req as any).user as IAuthUser;
  const { username, email, image } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      authUser.id,
      { username, email, image },
      { new: true, runValidators: true } // `new: true` returns the updated document
    ).select("-password");

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({
      message: "success",
      data: updatedUser,
      meta: {},
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
