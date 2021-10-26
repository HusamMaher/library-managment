const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE||"xls", process.env.USERNAME||"root",process.env.PASSWORD|| "root", {
	host: process.env.DBHOST||"localhost",
	dialect: process.env.DIALECT||"mysql",
	logging: false,
});

module.exports = sequelize;
