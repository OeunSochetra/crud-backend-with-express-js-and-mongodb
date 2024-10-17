// npm run serve
// npm run dev for run on typescript

import express, { Application } from "express";
import { Request, Response } from "express";
import { connectDB } from "../config/mongodb";
import Product from "./models/product.modal";

const app: Application = express();
connectDB();

app.use(express.json()); // Middleware to parse JSON

// Create new product (POST)
app.post("/api/products", async (req: Request, res: Response) => {
  const { name, price, description, stock } = req.body;
  try {
    const product = new Product({ name, price, description, stock });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
});

// Get all products (GET)
app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Get a single Product by ID (GET)

app.get("/api/products/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

// Update product by ID (PUT)

app.put("/api/products/:id", async (req: Request, res: Response) => {
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
});

// Delete product by ID (DELETE)

app.delete("/api/products/:id", async (req: Request, res: Response) => {
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
});

// app.get("/", (req: Request, res: Response) => {
//   res.send("new version of server hello ");
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
