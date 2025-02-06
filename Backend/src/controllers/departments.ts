import { Request, Response } from 'express';
import Department from '../models/departments';

const fetchDepartments = async (req: Request, res: Response) => {
  const allDepartments = await Department.find();
  if (allDepartments.length > 0) {
    return res.status(200).json({ departments: allDepartments });
  }
  return res.status(404).json({ message: 'Departments not found' });
};

const singleDepartment = async (req: Request, res: Response) => {
  const departmentId = req.params.id;
  const department = await Department.findById(departmentId);
  if (department) {
    return res.status(200).json({ department: department });
  }
  return res.status(404).json({ message: 'Department not found' });
};
const searchDepartments = async (req: Request, res: Response) => {
  const department = req.params.department;
  const searchResult = await Department.find({ name: { $regex: department, $options: 'i' } });
  if (searchResult.length > 0) {
    return res.status(200).json({ departments: searchResult });
  }
  return res.status(404).json({ message: 'Department not found' });
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

const updateDepartment = async (req: Request, res: Response) => {
  const departmentId = req.params.id;
  const department = await Department.findById(departmentId);
  if (!department) {
    return res.status(404).json({ message: 'Department not found' });
  }
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  const updatedDepartment = await Department.findByIdAndUpdate(departmentId, { name });
  if (!updatedDepartment) {
    return res.status(500).json({ message: 'Internal server error' });
  }
  return res.status(200).json({ message: 'Department updated successfully' });
};

const removeDepartment = async (req: Request, res: Response) => {
  const departmentId = req.params.id;
  const department = await Department.findById(departmentId);
  if (!department) {
    return res.status(404).json({ message: 'Department not found' });
  }
  const deleteDepartment = await Department.findByIdAndUpdate(departmentId, {
    deletedAt: new Date(),
  });
  return res
    .status(200)
    .json({ message: 'Department deleted successfully', id: deleteDepartment?._id });
};
export {
  fetchDepartments,
  singleDepartment,
  createDepartment,
  updateDepartment,
  removeDepartment,
  searchDepartments,
};
