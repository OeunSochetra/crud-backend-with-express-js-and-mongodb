import { timeStamp } from "console";
import mongoose, { Schema, Document } from "mongoose";
import { IProducts } from "../constants/common";

const ProductSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    stock: {
      type: Number,
      required: [true, "Product stock is required"],
      min: [0, "Stock cannot be negative"],
    },
  },
  { timestamps: true }
);

const Product = mongoose.model<IProducts>("Product", ProductSchema);

export default Product;
