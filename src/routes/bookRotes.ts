import express from "express";
import {
  createBook,
  getAllBooks,
  getTopBooks,
  getBookById,
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

/**
 * @swagger
 * /api/books/top:
 *   get:
 *     summary: Get top 3 books by rating
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Successfully retrieved top books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "603d9d1e8b3b5a7e2c8e9c6b"
 *                       title:
 *                         type: string
 *                         example: "Here's to Us"
 *                       author:
 *                         type: string
 *                         example: "Tinhinan Shop"
 *                       description:
 *                         type: string
 *                         example: "Amazon.com: Here's to Us eBook : Albertalli,"
 *                       image:
 *                         type: string
 *                         example: "https://i.pinimg.com/564x/dd/94/d4/dd94d4a1a3b3c3ae540f8b4af0acbd3d.jpg"
 *                       originalPrice:
 *                         type: number
 *                         example: 0
 *                       discountPrice:
 *                         type: number
 *                         example: 29.99
 *                       stock:
 *                         type: integer
 *                         example: 2
 *                       ratingStar:
 *                         type: number
 *                         example: 4
 *                       ratingCount:
 *                         type: integer
 *                         example: 38
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-04T12:34:56Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-11-04T12:34:56Z"
 *                 meta:
 *                   type: object
 *                   description: Metadata related to the response
 *       500:
 *         description: Server error occurred while fetching top books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while fetching top books
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 data:
 *                   type: object
 *                   description: Empty object as no data is returned in case of error
 *                 meta:
 *                   type: object
 *                   properties:
 *                     errorDetails:
 *                       type: string
 *                       example: "Error message details"
 */

router.get("/books/:id", getBookById);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by its ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: success
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "603d9d1e8b3b5a7e2c8e9c6b"
 *                     title:
 *                       type: string
 *                       example: "Here's to Us"
 *                     author:
 *                       type: string
 *                       example: "Tinhinan Shop"
 *                     description:
 *                       type: string
 *                       example: "Amazon.com: Here's to Us eBook : Albertalli,"
 *                     image:
 *                       type: string
 *                       example: "https://i.pinimg.com/564x/dd/94/d4/dd94d4a1a3b3c3ae540f8b4af0acbd3d.jpg"
 *                     originalPrice:
 *                       type: number
 *                       example: 0
 *                     discountPrice:
 *                       type: number
 *                       example: 29.99
 *                     stock:
 *                       type: integer
 *                       example: 2
 *                     ratingStar:
 *                       type: number
 *                       example: 4
 *                     ratingCount:
 *                       type: integer
 *                       example: 38
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-04T12:34:56Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-11-04T12:34:56Z"
 *                   required:
 *                     - _id
 *                     - title
 *                     - author
 *                     - description
 *                     - image
 *                     - originalPrice
 *                     - discountPrice
 *                     - stock
 *                     - ratingStar
 *                     - ratingCount
 *                 meta:
 *                   type: object
 *                   description: Metadata related to the response
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book not found
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 data:
 *                   type: object
 *                   description: Empty object as no data was found
 *                 meta:
 *                   type: object
 *                   description: Metadata related to the response
 *       500:
 *         description: Server error occurred while fetching the book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred while fetching book
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 data:
 *                   type: object
 *                   description: Empty object as no data is returned in case of error
 */

export default router;
