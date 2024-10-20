// npm run serve
// npm run dev for run on typescript

import express, { Application } from "express";
import { connectDB } from "../config/mongodb";
import productRoutes from "./routes/productRoutes";

const app: Application = express();
connectDB();

app.use(express.json()); // Middleware to parse JSON

app.use("/api", productRoutes);

// app.get("/", (req: Request, res: Response) => {
//   res.send("new version of server hello ");
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
