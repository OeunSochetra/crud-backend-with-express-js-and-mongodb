import mongoose, { Schema, Document } from "mongoose";
import { IBooks } from "../constants/common";

const BookSchema: Schema = new Schema(
  {
    image: {
      type: String,
      required: [true, "Book image is required"],
    },
    title: {
      type: String,
      required: [true, "Book title is required"],
    },
    author: {
      type: String,
      required: [true, "Book author is required"],
    },
    description: {
      type: String,
      required: [true, "Book description is required"],
    },
    originalPrice: {
      type: Number,
      required: [true, "Book Original Price is required"],
      default: 0,
    },
    discountPrice: {
      type: Number,
      required: [true, "Book Selling Price is required"],
      default: 0,
    },
    ratingStar: {
      type: Number,
      default: 0,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model<IBooks>("Book", BookSchema);
export default Book;
