import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Auth } from "../models/auth.modal";

export const register = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const auth = new Auth({ username, password });
    await auth.save();

    res.status(201).json({
      message: "success",
      data: auth,
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
    const user = await Auth.findOne({ username });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }
    if (!(await user.comparePassword(password))) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }
    const token = jwt.sign({ id: user._id }, secretKey, {
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
