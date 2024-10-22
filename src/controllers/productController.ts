import { Request, Response } from "express";
import Product from "../models/product.modal";

// Create new products

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, description, stock } = req.body;
  try {
    const product = new Product({ name, price, description, stock });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

//Get all products

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    // Convert page and limit to numbers
    const currentPage = parseInt(page as string, 10) || 1;
    const pageSize = parseInt(limit as string, 10) || 10;

    // Create a search query for the product name (case-insensitive)
    const searchQuery = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    // Get total number of matching products
    const totalProducts = await Product.countDocuments(searchQuery);

    // Get paginated product data
    const products = await Product.find(searchQuery)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    // Calculate total pages
    const totalPages = Math.ceil(totalProducts / pageSize);

    // Construct response with meta and data
    res.status(200).json({
      message: "success",
      statusCode: 200,
      data: products, // The array of products
      meta: {
        total: totalProducts, // Total number of products found
        page: currentPage, // Current page number
        pageSize: pageSize, // Number of products per page
        totalPages: totalPages, // Total number of pages
      },
    });
  } catch (error) {
    // Handle errors
    res.status(500).json({
      message: "Error fetching products",
      statusCode: 500,
      data: null,
      meta: null,
    });
  }
};

// Get a single Product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Update product by ID
export const updateProduct = async (req: Request, res: Response) => {
  const { name, price, description, stock } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.stock = stock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Delete product by ID
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
