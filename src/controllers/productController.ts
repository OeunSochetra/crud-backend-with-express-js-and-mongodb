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

// get all products

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//Get all products
// export const getAllProducts = async (req: Request, res: Response) => {
//   try {
//     const { page = 1, pageSize = 10, search = "" } = req.query;

//     // Convert page and pageSize to numbers
//     const currentPage = parseInt(page as string) || 1;
//     const limit = parseInt(pageSize as string) || 10;

//     // Create a search query
//     const searchQuery = search
//       ? { name: { $regex: search, $options: "i" } } // Case-insensitive search on the 'name' field
//       : {};

//     const totalProducts = await Product.countDocuments(searchQuery);
//     const products = await Product.find(searchQuery)
//       .skip((currentPage - 1) * limit)
//       .limit(limit);

//     res.status(200).json({
//       total: totalProducts,
//       page: currentPage,
//       pageSize: limit,
//       products,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error });
//   }
// };

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
