import express from 'express';
import { allUsers, createUser } from '../controllers/users';

const userRouter = express.Router();

userRouter.route('/').get(allUsers).post(createUser);

export default userRouter;
