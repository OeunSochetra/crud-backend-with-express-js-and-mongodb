import express, { Application, Response } from "express";
import productRoutes from "./routes/productRoutes";
import authRoutes from "./routes/authRoutes";
import { connectDB } from "../src/services/mongodb";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
connectDB();

app.use(express.json()); // Middleware to parse JSON
app.use(cors()); // Use CORS middleware

// Use CORS middleware
// app.use(
//   cors({
//     origin: "http://localhost:5173", // The frontend URL (Vite dev server)
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
//     credentials: true, // Allow credentials (cookies, auth headers, etc.)
//   })
// );

app.use("/api", productRoutes);
app.use("/api", authRoutes);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// app.get("/", (req: Request, res: Response) => {
//   res.send("new version of server hello ");
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
