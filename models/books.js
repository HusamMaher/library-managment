const Sequelize = require("sequelize");
const sequelize = require("../config/db");

const Book = sequelize.define("book", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	},
	title: {
		type: Sequelize.STRING,
	},
	description: {
		type: Sequelize.STRING,
	},
	publisher: {
		type: Sequelize.STRING,
	},
	isbn: {
		type: Sequelize.INTEGER,
	},
});

module.exports = Book;
