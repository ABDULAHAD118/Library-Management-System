import { Request, Response } from 'express';
import Issue from '../models/bookIssue';
const fetchIssuedBooks = async (req: Request, res: Response) => {
  const issueBooks = await Issue.find();
  if (issueBooks) {
    return res.status(200).json({ issueBooks });
  }
  return res.status(404).json({ message: 'No issued books found' });
};
const issueBook = async (req: Request, res: Response) => {};
const returnBook = async (req: Request, res: Response) => {};
export { fetchIssuedBooks, issueBook, returnBook };
