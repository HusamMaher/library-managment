const Book = require("../models/books");
const { Op } = require("sequelize");
const getAllBooks = async (req, res) => {
	try {
		const books = await Book.findAll();
		if (books.length == 0) return res.sendStatus(404);

		res.send(books);
	} catch (error) {
		res.sendStatus(500);
	}
};

const getBookById = async (req, res) => {
	try {
		const id = req.params.id;
		const book = await Book.findOne({ where: { id } });
		if (!book) return res.send(404);

		res.send(book);
	} catch (error) {
		console.log(error);
		res.send(500);
	}
};

const searchBook = async (req, res) => {
	try {
		console.log(req.query);
		const option = req.query.option;
		const keyword = req.query.keyword;
		let book;

		// console.log(option, keyword);
		// book = await Book.findAll({
		// 	where: { title: { [Op.substring]: keyword } },
		// });

		switch (option) {
			case "title":
				book = await Book.findAll({
					where: { title: { [Op.substring]: keyword } },
				});
				break;
			case "ISBN":
				book = await Book.findAll({
					where: { isbn: { [Op.substring]: keyword } },
				});
			case "publisher":
				book = await Book.findAll({
					where: { publisher: { [Op.substring]: keyword } },
				});
		}
		if (book.length === 0) {
			return res.status(404).json({ message: "book not found" });
		} else {
			return res.send(book);
		}
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

const deleteBookById = async (req, res) => {
	try {
		const result = await Book.destroy({ where: { id: req.params.id } });
		if (result !== 1) return res.sendStatus(409);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};
const updateBookById = async (req, res) => {
	try {
		const updated = req.body;
		console.log(req.body);
		const updatedvlaue = await Book.update(updated, {
			where: { id: req.params.id },
		});
		console.log(updatedvlaue);

		if (updatedvlaue[0] !== 1) return res.sendStatus(409);
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.status(500);
	}
};

module.exports = {
	getAllBooks,
	getBookById,
	searchBook,
	deleteBookById,
	updateBookById,
};
