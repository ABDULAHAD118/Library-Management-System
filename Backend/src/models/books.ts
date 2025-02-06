import { model, Schema } from 'mongoose';

const BookSchema = new Schema(
  {
    name: { type: String, required: true },
    authorName: { type: String, required: true },
    edition: { type: String, default: null },
    ISBN: { type: String, required: true, unique: true },
    DDC: { type: String, required: true },
    year: { type: Number, required: true },
    pages: { type: Number, default: null },
    publisher: { type: String, required: true },
    title: { type: String, required: true },
    copies: { type: Number, required: true },
    availableCopies: { type: Number, required: true },
    rack: { type: String, required: true },
    unitPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    callNo: { type: String, default: null },
    department: { type: Schema.Types.ObjectId, ref: 'Department', required: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const Book = model('Book', BookSchema);

export default Book;
