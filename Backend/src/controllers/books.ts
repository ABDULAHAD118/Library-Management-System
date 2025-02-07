import mongoose from 'mongoose';
import { Request, Response } from 'express';
import Book from '../models/books';
const fetchBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find({}).populate('department');
    return res.status(200).json({ books });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
const singleBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }
    const book = await Book.findById(id).populate('department');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    return res.status(200).json({ book });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
const createBook = async (req: Request, res: Response) => {
  try {
    const {
      name,
      authorName,
      edition,
      ISBN,
      DDC,
      year,
      pages,
      publisher,
      title,
      copies,
      availableCopies,
      unitPrice,
      totalPrice,
      rack,
      callNo,
      department,
    } = req.body;
    if (
      !name ||
      !authorName ||
      !ISBN ||
      !DDC ||
      !year ||
      !publisher ||
      !title ||
      !copies ||
      !availableCopies ||
      !rack ||
      !department ||
      !unitPrice ||
      !totalPrice
    ) {
      return res.status(400).json({ message: 'Please fill all the fields' });
    }
    const uniqueISBN = await Book.findOne({ ISBN });
    if (uniqueISBN) {
      return res.status(400).json({ message: 'Book with this ISBN already exists' });
    }
    const book = await Book.create({
      name,
      authorName,
      edition,
      ISBN,
      DDC,
      year,
      pages,
      publisher,
      title,
      copies,
      availableCopies,
      rack,
      callNo,
      department,
      unitPrice,
      totalPrice,
    });
    if (!book) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(201).json({ message: 'Book added successfully', id: book._id });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Book Id' });
    }
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not Found' });
    }
    const {
      name,
      authorName,
      edition,
      ISBN,
      DDC,
      year,
      pages,
      publisher,
      title,
      copies,
      availableCopies,
      unitPrice,
      totalPrice,
      rack,
      callNo,
      department,
    } = req.body;
    if (ISBN) {
      const checkISBN = await Book.findOne({ ISBN });
      if (checkISBN) {
        return res.status(400).json({ message: 'ISBN number already used' });
      }
    }
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      {
        name: name || book.name,
        authorName: authorName || book.authorName,
        edition: edition || book.edition,
        ISBN: ISBN || book.ISBN,
        DDC: DDC || book.DDC,
        year: year || book.year,
        pages: pages || book.pages,
        publisher: publisher || book.publisher,
        title: title || book.title,
        copies: copies || book.copies,
        availableCopies: availableCopies || book.availableCopies,
        unitPrice: unitPrice || book.unitPrice,
        totalPrice: totalPrice || book.totalPrice,
        rack: rack || book.rack,
        callNo: callNo || book.callNo,
        department: department || book.department,
      },
      { new: true },
    );
    if (!updatedBook) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(200).json({ message: 'Book Update Successfully', id: updatedBook._id });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Book ID' });
    }
    const book = await Book.findById(id);
    if (book) {
      if (book.deletedAt) {
        return res.status(200).json({ message: 'Book already deleted' });
      }
    } else {
      return res.status(404).json({ message: 'Book not Found' });
    }
    const deleteBook = await Book.findByIdAndUpdate(id, { deletedAt: new Date() }, { new: true });
    if (!deleteBook) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    return res.status(200).json({ message: 'Book Deleted Successfully', id: deleteBook._id });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
const searchBooks = async (req: Request, res: Response) => {};

export { fetchBooks, singleBook, createBook, updateBook, deleteBook, searchBooks };
