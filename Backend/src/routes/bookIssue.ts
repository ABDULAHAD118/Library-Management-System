import { Router } from 'express';
import { fetchIssuedBooks, issueBook, searchIssuedBooks } from '../controllers/bookIssue';

const bookIssueRouter = Router();

bookIssueRouter.route('/').get(fetchIssuedBooks).post(issueBook);
bookIssueRouter.get('/search', searchIssuedBooks);

export default bookIssueRouter;
