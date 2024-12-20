import express from "express"
import { createBooks, getAllBooks } from "../../Controllers/Book/bookController.js";
import { isAuthenticatedUser } from "../../Middlewares/auth.js"

const router = express.Router();

router.route('/books').get(isAuthenticatedUser, getAllBooks).post(isAuthenticatedUser, createBooks);

export default router;