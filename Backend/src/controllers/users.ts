import mongoose from 'mongoose';
import { Request, Response } from 'express';
import User from '../models/users';

const fetchUsers = async (req: Request, res: Response) => {
  const allUsers = await User.find();
  if (allUsers.length > 0) {
    return res.status(200).json({ users: allUsers });
  } else {
    return res.status(404).json({ message: 'No user found' });
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
  if (cnic.length !== 13) {
    return res.status(400).json({ message: 'Cnic number should be 13 digits' });
  }
  const checkCnic = await User.findOne({ cnic: cnic });
  if (checkCnic) {
    return res.status(400).json({ message: 'User with this cnic number already exists' });
  }
  if (contact.length !== 11) {
    return res.status(400).json({ message: 'Contact number should be 11 digits' });
  }
  if (!mongoose.Types.ObjectId.isValid(department)) {
    return res.status(400).json({ error: 'Invalid user ID' });
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

const singleUsers = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    return res.status(200).json({ user: user });
  }
  return res.status(404).json({ message: 'User not found' });
};

const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { redgNo, firstName, lastName, cnic, contact, department } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      redgNo: redgNo ? redgNo.toLowerCase() : user.redgNo,
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      cnic: cnic || user.cnic,
      contact: contact || user.contact,
      department: department || user.department,
    },
    { new: true },
  );
  if (updatedUser) {
    return res.status(200).json({ message: 'User updated successfully!', id: updatedUser._id });
  }
  return res.status(404).json({ message: 'User not found' });
};

const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await User.findByIdAndDelete(userId);
  if (user) {
    return res.status(200).json({ message: 'User deleted successfully!' });
  }
  return res.status(404).json({ message: 'User not found' });
};

const searchUsers = async (req: Request, res: Response) => {
  const userName = req.params.user;
  const searchTerms = userName.trim().split(/\s+/); // Splits by space

  let searchConditions: { [key: string]: any }[] = [];
  // const department = await User.find({ department: { $regex: userName, $options: 'i' } });

  if (searchTerms.length === 1) {
    // If only one word is entered, search across all fields
    searchConditions = [
      { firstName: { $regex: searchTerms[0], $options: 'i' } },
      { lastName: { $regex: searchTerms[0], $options: 'i' } },
      { redgNo: { $regex: searchTerms[0], $options: 'i' } },
      { cnic: { $regex: searchTerms[0], $options: 'i' } },
    ];
  } else if (searchTerms.length >= 2) {
    // If two words are entered, assume firstName and lastName
    searchConditions = [
      {
        $and: [
          { firstName: { $regex: searchTerms[0], $options: 'i' } },
          { lastName: { $regex: searchTerms[1], $options: 'i' } },
        ],
      },
      { redgNo: { $regex: userName, $options: 'i' } },
      { cnic: { $regex: userName, $options: 'i' } },
    ];
  }

  // Perform the search
  const users = await User.find({ $or: searchConditions }).populate('department');

  if (users.length > 0) {
    return res.status(200).json({ users: users });
  }
  return res.status(404).json({ message: 'No user found' });
};

export { fetchUsers, createUser, singleUsers, updateUser, deleteUser, searchUsers };
