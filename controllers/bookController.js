import { Book } from "../models/bookModel.js";
// Get list of all books
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(201).json({ success: true, books });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};
// create sample book
export const addBook = async (req, res) => {
  const { bookName, category, rentPerDay } = req.body;
  try {
    const book = new Book({ bookName, category, rentPerDay });
    const savedBook = await book.save();
    res.status(201).json({ success: true, savedBook });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};

//search by book name
export const searchByName = async (req, res) => {
  const { name } = req.query;
  const books = await Book.find({ name: { $regex: name, $options: "i" } });
  res.status(201).json({ success: true, books });
  try {
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};

// search by rent range
export const searchByRentRange = async (req, res) => {
  try {
    const { min, max } = req.query;
    const books = await Book.find({ rentPerDay: { $gte: min, $lte: max } });
    res.status(201).json({ success: true, books });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};

// search by category + name + rent range
export const advancedSearch = async (req, res) => {
  try {
    const { category, name, minRent, maxRent } = req.query;
    const books = await Book.find({
      category,
      name: { $regex: name, $options: "i" },
      rentPerDay: { $gte: minRent, $lte: maxRent },
    });
    res.status(201).json({ success: true, books });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};
