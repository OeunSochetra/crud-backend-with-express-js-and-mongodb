import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI as string;

// const options: any = {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
// };

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${uri}`);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1); // Exit process if connection fails
  }
};
