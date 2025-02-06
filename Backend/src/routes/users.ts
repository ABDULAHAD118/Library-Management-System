import express from 'express';
import {
  createUser,
  deleteUser,
  fetchUsers,
  searchUsers,
  singleUsers,
  updateUser,
} from '../controllers/users';

const userRouter = express.Router();

userRouter.route('/').get(fetchUsers).post(createUser);
userRouter.route('/:id').get(singleUsers).patch(updateUser).delete(deleteUser);
userRouter.route('/search/:user').get(searchUsers);

export default userRouter;
