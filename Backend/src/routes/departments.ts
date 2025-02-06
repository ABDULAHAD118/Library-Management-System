import express from 'express';
import {
  createDepartment,
  fetchDepartments,
  removeDepartment,
  searchDepartments,
  singleDepartment,
  updateDepartment,
} from '../controllers/departments';

const departmentRouter = express.Router();

departmentRouter.route('/').get(fetchDepartments).post(createDepartment);
departmentRouter.route('/search').get(searchDepartments);
departmentRouter
  .route('/:id')
  .get(singleDepartment)
  .patch(updateDepartment)
  .delete(removeDepartment);

export default departmentRouter;
