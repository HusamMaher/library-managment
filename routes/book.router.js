const express = require("express");

const router = express.Router();

const {
	getAllBooks,
	getBookById,
	searchBook,
	deleteBookById,
	updateBookById,
} = require("../controllers/book.controller");

router.get("/getAllBooks", getAllBooks);
router.get("/getBookById/:id", getBookById);
router.get("/searchBook", searchBook);
router.delete("/deleteBookById/:id", deleteBookById);
router.patch("/updateBookById/:id", updateBookById);

module.exports = router;
