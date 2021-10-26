const express = require("express");
const env = require("dotenv");
const path = require("path");
const xlsRouter = require("./routes/upload.router");
const authRouter = require("./routes/auth.router");
const bookRouter = require("./routes/book.router");

env.config();

const sequelize = require("./config/db");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/book", bookRouter);
app.use("/auth", authRouter);
app.use("/upload", xlsRouter);

const port = process.env.PORT || 500;

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}
console.log("hi");
app.listen(5000, () => {
	console.log(`server is running on port ${port}`);
	sequelize
		.sync()
		.then((result) => {
			console.log("database connected successfully");
		})
		.catch((err) => {
			console.error(err);
		});
});
