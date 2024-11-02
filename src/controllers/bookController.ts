import { Request, Response } from "express";
import Book from "../models/book.modal";

// Create new books

export const createBook = async (req: Request, res: Response) => {
  const {
    image,
    author,
    title,
    description,
    originalPrice,
    discountPrice,
    stock,
  } = req.body;
  try {
    const book = new Book({
      image,
      author,
      title,
      description,
      originalPrice,
      discountPrice,
      stock,
    });
    await book.save();

    res.status(201).json({
      message: "success",
      data: book,
      meta: {},
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while creating the book",
      data: {},
      meta: { errorDetails: (error as Error).message },
    });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    // Convert page and limit to numbers
    const currentPage = parseInt(page as string, 10) || 1;
    const pageSize = parseInt(limit as string, 10) || 10;

    const searchQuery = search
      ? { name: { $regex: search, $options: "i" } }
      : {};

    const totalProducts = await Book.countDocuments(searchQuery);

    const products = await Book.find(searchQuery)
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    const totalPages = Math.ceil(totalProducts / pageSize);

    res.status(200).json({
      message: "success",
      statusCode: 200,
      data: products,
      meta: {
        total: totalProducts,
        page: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
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
