import express from "express";
const router = express.Router()
import { getAllUser } from "../controllers/userController.js";
import { addNewUser } from "../controllers/userController.js";
router.get('/',getAllUser)
router.post('/addUser',addNewUser)
export default router;