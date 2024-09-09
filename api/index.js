import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "../routes/userRoute.js";
import bookRoutes from "../routes/bookRoute.js";
import transactionRoutes from "../routes/transactionRoute.js";
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Database is connect succesfully");
    app.listen(3000, () => {
      console.log("server is running succesfully");
    });
  })
  .catch((error) => {
    console.log(error);
  });
app.use("/api/user", userRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/transaction", transactionRoutes);
