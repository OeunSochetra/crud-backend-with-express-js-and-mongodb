import express from "express";
import { login, register, getMe } from "../controllers/authController";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/auth/register", register);

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Server error
 */

router.post("/auth/login", login);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in a user and get a token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully, returns a token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                       example: "your_jwt_token_here"
 *                 meta:
 *                   type: object
 *                   description: Metadata related to the response
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */

router.get("/me", authMiddleware as any, getMe);

export default router;
