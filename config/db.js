const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("xls", "root", "root", {
	host: "localhost",
	dialect: "mysql",
	logging: false,
});

module.exports = sequelize;
