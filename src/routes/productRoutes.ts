import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

const router = express.Router();

// Create new products
router.post("/products", createProduct);
// Get all products
router.get("/products", getAllProducts);
// Get a single product by ID
router.get("/products/:id", getProductById);
// Update product by ID
router.put("/products/:id", updateProduct);
// Delete product by ID
router.delete("/products/:id", deleteProduct);

export default router;
