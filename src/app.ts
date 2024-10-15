// npm run serve
// npm run dev for run on typescript

import express, { Application } from "express";
import { Response, Request } from "express";
import { connectDB } from "../config/mongodb";
import Product from "./models/product.modal";

const app: Application = express();
connectDB();

app.use(express.json());

// create new product
app.post("/api/products", async (req: Request, res: Response) => {
  const { name, price, description, stock } = req.body;
  try {
    const product = new Product({ name, price, description, stock });
    await product.save();
    res.status(201).json(product);
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
