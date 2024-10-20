// npm run serve
// npm run dev for run on typescript

import express, { Application } from "express";
import productRoutes from "./routes/productRoutes";
import { connectDB } from "../src/services/mongodb";
import swaggerUi from "swagger-ui-express";
import { swaggerDocs } from "./config/swagger";

const app: Application = express();
connectDB();

app.use(express.json()); // Middleware to parse JSON

app.use("/api", productRoutes);

// Serve Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// app.get("/", (req: Request, res: Response) => {
//   res.send("new version of server hello ");
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
