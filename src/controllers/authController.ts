import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.modal";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.json({ message: "User registered successfully" });
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
    const token = jwt.sign({ id: user._id }, secretKey, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
