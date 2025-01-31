import { model, Schema } from "mongoose";

const DepartmentSchema = new Schema(
  {
    name: { type: String, required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const Department = model("Department", DepartmentSchema);
export default Department;
