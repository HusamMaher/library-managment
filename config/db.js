const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
	"epiz_30174337_XXX",
	"epiz_30174337",
	"TFNK9aMzumo6Cc",
	{
		host: "sql104.epizy.com",
		dialect: "mysql",
		logging: false,
	},
);

module.exports = sequelize;
