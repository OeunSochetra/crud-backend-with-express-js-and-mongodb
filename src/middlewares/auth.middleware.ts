import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: string | object;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    const secretKey = process.env.JWT_SECRET || "";
    const decoded = jwt.verify(token, secretKey);

    (req as AuthRequest).user = decoded; // Attach `user` to `req` with type assertion

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
