import { Transaction } from "../models/transactionModel.js";
import { Book } from "../models/bookModel.js";
import { User } from "../models/userModel.js";

// Issues a book
export const issueBook = async (req, res) => {
  const { bookName, userId, issueDate } = req.body;
  try {
    const book = await Book.findOne({ bookName });
    if (!book)
      return res.status(404).json({ succes: false, msg: "Book not found" });

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ success: false, msg: "User not found" });

    if (!book || !user)
      return res.status(400).json({ message: "Invalid book or user" });

    const newTransaction = new Transaction({
      bookId: book._id,
      userId: user._id,
      issueDate,
    });
    await newTransaction.save();
    res.status(201).json({ success: true, msg: "Book issued successfully" });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};

// Return book

export const returnBook = async (req, res) => {
  const { bookName, userId, returnDate } = req.body;
  try {
    const book = await Book.findOne({ bookName });
    const user = await User.findById(userId);

    const transaction = await Transaction.findOne({
      bookId: book._id,
      userId: user._id,
      returnDate: null,
    });
    if (!transaction)
      return res.status(400).json({ message: "No active transaction found" });

    const issueDate = new Date(transaction.issueDate);
    const totalDays = Math.ceil(
      (new Date(returnDate) - issueDate) / (1000 * 3600 * 24)
    );
    const totalRent = totalDays * book.rentPerDay;

    transaction.returnDate = returnDate;
    transaction.totalRent = totalRent;
    await transaction.save();

    res.json({ message: "Book returned successfully", totalRent });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};

// Get transaction for a book
export const transactions = async (req, res) => {
  try {
    const { bookName } = req.params;
    const book = await Book.findOne({ bookName });
    if (!book) return res.status(400).json({ message: "Book not found" });

    const transactions = await Transaction.find({ bookId: book._id }).populate(
      "userId",
      "name"
    );
    const currentlyIssued = transactions.find((t) => !t.returnDate);
    const totalRentGenerated = transactions.reduce(
      (acc, t) => acc + (t.totalRent || 0),
      0
    );

    res.json({
      totalCount: transactions.length,
      currentlyIssued: currentlyIssued
        ? currentlyIssued.userId.name
        : "Not issued",
      totalRentGenerated,
    });
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};

//get book issued to a person
export const user = async (req, res) => {
  const { userId } = req.params;
  try {
    const transactions = await Transaction.find({ userId }).populate(
      "bookId",
      "name"
    );
    res.json(transactions.map((t) => t.bookId.name));
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};

// get book issued in date range
export const dateRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  try {
    const transactions = await Transaction.find({
      issueDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).populate("bookId userId", "name");

    res.json(
      transactions.map((t) => ({
        book: t.bookId.name,
        user: t.userId.name,
        issueDate: t.issueDate,
      }))
    );
  } catch (error) {
    res.status(501).json({ msg: error.message });
  }
};
