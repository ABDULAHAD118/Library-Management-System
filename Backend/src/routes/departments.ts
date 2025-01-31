import express from 'express';
import { createDepartment, fetchDepartments } from '../controllers/departments';

const departmentRouter = express.Router();

departmentRouter.route('/').get(fetchDepartments).post(createDepartment);

export default departmentRouter;
