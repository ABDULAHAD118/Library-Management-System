import { Router } from 'express';
import {
  createBook,
  deleteBook,
  fetchBooks,
  searchBooks,
  singleBook,
  updateBook,
} from '../controllers/books';

const bookRouter = Router();

bookRouter.route('/').get(fetchBooks).post(createBook);
bookRouter.route('/search').get(searchBooks);
bookRouter.route('/:id').get(singleBook).patch(updateBook).delete(deleteBook);

export default bookRouter;
