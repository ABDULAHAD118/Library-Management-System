import { Request, Response } from 'express';
import Issue from '../models/bookIssue';
import mongoose from 'mongoose';
import Book from '../models/books';
import User from '../models/users';
const fetchIssuedBooks = async (req: Request, res: Response) => {
  try {
    const issueBooks = await Issue.find().populate('user').populate('book');
    if (issueBooks.length > 0) {
      return res.status(200).json({ issueBooks });
    }
    return res.status(404).json({ message: 'No issued books found' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
const issueBook = async (req: Request, res: Response) => {
  try {
    const { user, book, lastDate } = req.body;
    if (!user || !book || !lastDate) {
      return res.status(400).json({ message: 'Please provide all the details' });
    }
    if (!mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }
    if (!mongoose.Types.ObjectId.isValid(book)) {
      return res.status(400).json({ message: 'Invalid book id' });
    }
    const validBookId = await Book.findById(book);
    if (!validBookId) {
      return res.status(404).json({ message: 'This book is not found' });
    }
    const validUserId = await User.findById(user);
    if (!validUserId) {
      return res.status(404).json({ message: 'This user is not registered' });
    }
    const checkIssuedBook = await Issue.findOne({ user, book });
    if (checkIssuedBook) {
      return res.status(200).json({ message: 'Book already issued to this student' });
    }
    const issueBook = await Issue.create({ user, book, lastDate });
    if (issueBook) {
      return res
        .status(200)
        .json({ message: 'Books Issued Successfully', user: issueBook.user, book: issueBook.book });
    }
    return res.status(500).json({ message: 'Failed to issue book' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

const searchIssuedBooks = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    if (!search) {
      return res.status(400).json({ message: 'Please provide search query' });
    }
    let filter: { book?: any; user?: any } = {};
    const books = await Book.find({ title: { $regex: search, $options: 'i' } });
    const bookIds = books.map((book) => book._id);
    if (bookIds.length > 0) {
      filter.book = { $in: bookIds };
    }
    const users = await User.find({ firstName: { $regex: search, $options: 'i' } });
    const userIds = users.map((user) => user._id);
    if (userIds.length > 0) {
      filter.user = { $in: userIds };
    }
    const findBook = await Issue.aggregate([
      { $match: filter }, // Apply search filter
      {
        $lookup: {
          from: 'books',
          localField: 'book',
          foreignField: '_id',
          as: 'bookDetails',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      { $unwind: '$userDetails' }, // Convert array to object
      {
        $group: {
          _id: '$user', // Group by user ID
          userName: { $first: '$userDetails.firstName' }, // Get email
          issuedBooks: { $push: '$bookDetails' }, // Store all books in an array
        },
      },
      {
        $project: {
          _id: 0,
          userId: '$_id',
          userName: 1,
          issuedBooks: {
            $map: {
              input: '$issuedBooks',
              as: 'book',
              in: { book: '$$book' },
            },
          },
        },
      },
    ]);

    if (findBook.length > 0) {
      return res.status(200).json({ findBook });
    }
    return res.status(404).json({ message: 'No issued book found' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
const returnBook = async (req: Request, res: Response) => {};
export { fetchIssuedBooks, issueBook, returnBook, searchIssuedBooks };
