import express from "express";
import {
  createBook,
  getAllBooks,
  getTopBooks,
} from "../controllers/bookController";

const router = express.Router();

router.post("/books", createBook);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 description: URL or path to the book's cover image
 *               author:
 *                 type: string
 *                 description: Name of the author
 *               title:
 *                 type: string
 *                 description: Title of the book
 *               description:
 *                 type: string
 *                 description: Description of the book
 *               originalPrice:
 *                 type: number
 *                 format: float
 *                 description: Original price of the book
 *               discountPrice:
 *                 type: number
 *                 format: float
 *                 description: Selling price of the book
 *               stock:
 *                 type: integer
 *                 description: Number of copies available in stock
 *             required:
 *               - title
 *               - author
 *               - originalPrice
 *               - discountPrice
 *               - stock
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   additionalProperties: true
 *                 meta:
 *                   type: object
 *                   additionalProperties: true
 *       500:
 *         description: An error occurred while creating the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while creating the book"
 *                 data:
 *                   type: object
 *                   additionalProperties: true
 *                 meta:
 *                   type: object
 *                   properties:
 *                     errorDetails:
 *                       type: string
 *                       description: Details about the error
 */

router.get("/books", getAllBooks);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books with pagination and search
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number to retrieve
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The number of books to retrieve per page
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *           example: "Harry Potter"
 *         description: The search term to filter books by name
 *     responses:
 *       200:
 *         description: A successful response containing the list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "success"
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     additionalProperties: true
 *                 meta:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 100
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 10
 *       500:
 *         description: An error occurred while fetching the books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error fetching products"
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 data:
 *                   type: object
 *                   nullable: true
 *                 meta:
 *                   type: object
 *                   nullable: true
 */

router.get("/books/top", getTopBooks);

export default router;
