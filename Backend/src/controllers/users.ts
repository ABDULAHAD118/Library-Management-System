import { Request, Response } from 'express';
import User from '../models/users';

const allUsers = async (req: Request, res: Response) => {
  const allUsers = await User.find();
  if (allUsers) {
    return res.status(200).json(allUsers);
  } else {
    return res.status(404).send('No user found');
  }
};

const createUser = async (req: Request, res: Response) => {
  const { redgNo, firstName, lastName, cnic, contact, department } = req.body;
  if (!redgNo || !firstName || !cnic || !contact || !department) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }
  const checkRedgNo = await User.findOne({ redgNo: redgNo });
  if (checkRedgNo) {
    return res.status(400).json({ message: 'User with this registration number already exists' });
  }
  const checkCnic = await User.findOne({ cnic: cnic });
  if (checkCnic) {
    return res.status(400).json({ message: 'User with this cnic number already exists' });
  }
  const user = await User.create({
    redgNo: redgNo.toLowerCase(),
    firstName,
    lastName,
    cnic,
    contact,
    department,
  });
  return res.status(201).json(user);
};

export { allUsers, createUser };
