import { Router } from 'express';
import { fetchIssuedBooks, issueBook } from '../controllers/bookIssue';

const bookIssueRouter = Router();

bookIssueRouter.route('/').get(fetchIssuedBooks).post(issueBook);

export default bookIssueRouter;
