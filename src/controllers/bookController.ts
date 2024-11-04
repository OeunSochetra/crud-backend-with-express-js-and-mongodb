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
    ratingStar,
    ratingCount,
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
      ratingStar,
      ratingCount,
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

export const getTopBooks = async (req: Request, res: Response) => {
  try {
    const topBooks = await Book.find()
      .sort({ ratingStar: -1, ratingCount: -1 })
      .limit(3);

    res.status(200).json({
      message: "success",
      statusCode: 200,
      data: topBooks,
      meta: {},
    });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching top books",
      statusCode: 500,
      data: {},
      meta: { errorDetails: (error as Error).message },
    });
  }
};

// how to get a single book by id
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.status(200).json({
        message: "success",
        statusCode: 200,
        data: book,
        meta: {},
      });
    } else {
      res.status(404).json({
        message: "Book not found",
        statusCode: 404,
        data: {},
        meta: {},
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while fetching book",
      statusCode: 500,
      data: {},
    });
  }
};
