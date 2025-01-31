import { Request, Response } from 'express';
import Department from '../models/departments';

const fetchDepartments = async (req: Request, res: Response) => {
  const allDepartments = await Department.find();
  return res.status(200).json(allDepartments);
};

const createDepartment = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  const newDepartment = await Department.create({ name });
  return res
    .status(201)
    .json({ message: 'Department created successfully', id: newDepartment._id });
};

export { fetchDepartments, createDepartment };
