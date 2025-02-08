import { model, Schema } from 'mongoose';

const IssueSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    book: { type: Schema.Types.ObjectId, required: true, ref: 'Book' },
    lastDate: { type: Date, required: true },
  },
  { timestamps: true },
);

const Issue = model('Issue', IssueSchema);
export default Issue;
