import mongoose from "mongoose";
const bookSchema = new mongoose.Schema(
  {
    bookName: String,
    category: String,
    rentPerDay: Number,
  },
  { timestamps: true }
);
export const Book = mongoose.model("Book", bookSchema);
