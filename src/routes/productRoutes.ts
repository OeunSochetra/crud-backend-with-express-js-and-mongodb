import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

// How to run the swagger http://localhost:4000/api-docs/#/

// router.use(checkAuth);

// Create new products
router.post("/products", authMiddleware as any, createProduct);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the product
 *                 example: "Sample Product"
 *               price:
 *                 type: number
 *                 description: Price of the product
 *                 example: 100
 *               description:
 *                 type: string
 *                 description: Description of the product
 *                 example: "This is a sample product description"
 *               stock:
 *                 type: number
 *                 description: Stock quantity of the product
 *                 example: 50
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   description: The newly created product data
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The ID of the created product
 *                       example: "64adfaecbaf"
 *                     name:
 *                       type: string
 *                       description: The name of the product
 *                       example: "Sample Product"
 *                     price:
 *                       type: number
 *                       description: The price of the product
 *                       example: 100
 *                     description:
 *                       type: string
 *                       description: The product description
 *                       example: "This is a sample product description"
 *                     stock:
 *                       type: number
 *                       description: Stock quantity
 *                       example: 50
 *                     createdAt:
 *                       type: string
 *                       description: The creation date
 *                       example: "2024-10-22T12:34:56Z"
 *                 meta:
 *                   type: object
 *                   description: Additional meta information (currently empty)
 *                   example: {}
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "An error occurred while creating the product"
 *                 data:
 *                   type: object
 *                   description: Empty data object
 *                   example: {}
 *                 meta:
 *                   type: object
 *                   description: Meta information containing error details
 *                   properties:
 *                     errorDetails:
 *                       type: string
 *                       description: The detailed error message
 *                       example: "Validation failed: name is required."
 */

// Get all products
router.get("/products", authMiddleware as any, getAllProducts);

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products with pagination and search
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number to retrieve (default is 1)
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: pageSize
 *         required: false
 *         description: The number of products per page (default is 10)
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: search
 *         required: false
 *         description: A string to search for in the product names
 *         schema:
 *           type: string
 *           example: "Product"
 *     responses:
 *       200:
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: List of products
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the product
 *                       name:
 *                         type: string
 *                         description: The name of the product
 *                       price:
 *                         type: number
 *                         description: The price of the product
 *                       description:
 *                         type: string
 *                         description: The description of the product
 *                       stock:
 *                         type: number
 *                         description: The stock quantity of the product
 *                 meta:
 *                   type: object
 *                   description: Metadata for pagination and search
 *                   properties:
 *                     total:
 *                       type: integer
 *                       description: Total number of products matching the search
 *                     page:
 *                       type: integer
 *                       description: Current page number
 *                       example: 1
 *                     pageSize:
 *                       type: integer
 *                       description: Number of products per page
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       description: Total number of pages
 *                       example: 5
 *       500:
 *         description: Server error
 */

// Get a single product by ID
router.get("/products/:id", authMiddleware as any, getProductById);

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to retrieve
 *         schema:
 *           type: string
 *           example: "64afc13e5f9b2e00123b4567"
 *     responses:
 *       200:
 *         description: Successfully retrieved the product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Status message
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   description: The product data
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The ID of the product
 *                     name:
 *                       type: string
 *                       description: The name of the product
 *                     price:
 *                       type: number
 *                       description: The price of the product
 *                     description:
 *                       type: string
 *                       description: The description of the product
 *                     stock:
 *                       type: number
 *                       description: The stock quantity of the product
 *                 meta:
 *                   type: object
 *                   description: Additional metadata (empty in this case)
 *                   example: {}
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Status message
 *                   example: "Product not found"
 *                 data:
 *                   type: object
 *                   description: Empty data object when product is not found
 *                   example: {}
 *                 meta:
 *                   type: object
 *                   description: Additional metadata (empty in this case)
 *                   example: {}
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "An error occurred while fetching the product"
 *                 data:
 *                   type: object
 *                   description: Empty data object when an error occurs
 *                   example: {}
 *                 meta:
 *                   type: object
 *                   description: Metadata containing error details
 *                   properties:
 *                     errorDetails:
 *                       type: string
 *                       description: Detailed error message
 *                       example: "Error fetching product: <error message>"
 */

// Update product by ID
router.put("/products/:id", authMiddleware as any, updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to update
 *         schema:
 *           type: string
 *           example: "64afc13e5f9b2e00123b4567"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the product
 *                 example: "Updated Product Name"
 *               price:
 *                 type: number
 *                 description: The price of the product
 *                 example: 29.99
 *               description:
 *                 type: string
 *                 description: The description of the product
 *                 example: "Updated product description"
 *               stock:
 *                 type: integer
 *                 description: The stock quantity of the product
 *                 example: 15
 *     responses:
 *       200:
 *         description: Product successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Status message
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   description: The updated product data
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The ID of the product
 *                     name:
 *                       type: string
 *                       description: The name of the product
 *                     price:
 *                       type: number
 *                       description: The price of the product
 *                     description:
 *                       type: string
 *                       description: The description of the product
 *                     stock:
 *                       type: integer
 *                       description: The stock quantity of the product
 *                 meta:
 *                   type: object
 *                   description: Additional metadata (empty in this case)
 *                   example: {}
 *       404:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Status message
 *                   example: "Product not found"
 *                 data:
 *                   type: object
 *                   description: Empty data object
 *                   example: {}
 *                 meta:
 *                   type: object
 *                   description: Additional metadata (empty in this case)
 *                   example: {}
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message
 *                   example: "An error occurred while updating the product"
 *                 data:
 *                   type: object
 *                   description: Empty data object when an error occurs
 *                   example: {}
 *                 meta:
 *                   type: object
 *                   description: Metadata containing error details
 *                   properties:
 *                     errorDetails:
 *                       type: string
 *                       description: Detailed error message
 *                       example: "Error updating product: <error message>"
 */

// Delete product by ID
router.delete("/products/:id", authMiddleware as any, deleteProduct);

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the product to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   description: The data related to the deleted product, empty if not applicable
 *                   example: {}
 *                 meta:
 *                   type: object
 *                   description: Additional meta information, empty in this case
 *                   example: {}
 */

export default router;
