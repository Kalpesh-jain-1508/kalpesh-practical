import catchAsyncError from "../../Middlewares/catchAsyncError.js";
import ErrorHandler from "../../Utils/errorHandler.js";
import { Book } from './../../Models/Book/bookModel.js';

export const getAllBooks = catchAsyncError(async (req, res, next) => {

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const books = await Book.find({}).skip(skip).limit(limit);

    const totalBooks = await Book.countDocuments();

    res.status(200).json({
        success: true,
        currentPage: page,
        totalPages: Math.ceil(totalBooks / limit),
        books
    });

});

export const createBooks = catchAsyncError(async (req, res, next) => {

    const { title, author } = req.body;

    if(!title || !author)
        next(new ErrorHandler("All Fields Required"));

    const newBook = new Book({ title, author });
    await newBook.save();

    res.status(201).json({
        success: true,
        message: "Book Created Successfully",
    });
});