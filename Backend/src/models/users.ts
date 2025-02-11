import { model, Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    regNo: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    cnic: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const User = model('User', UserSchema);

export default User;
