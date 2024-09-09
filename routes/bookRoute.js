import express from "express";
import { getAllBooks } from "../controllers/bookController.js";
import { addBook } from "../controllers/bookController.js";
const router = express.Router();
import { searchByName } from "../controllers/bookController.js";
import { advancedSearch } from "../controllers/bookController.js";
import { searchByRentRange } from "../controllers/bookController.js";

router.get("/", getAllBooks);
router.post("/addBook", addBook);
router.get("/searchByName", searchByName);
router.get("/searchByRentRange", searchByRentRange);
router.get("/advancedSearch", advancedSearch);

export default router;
