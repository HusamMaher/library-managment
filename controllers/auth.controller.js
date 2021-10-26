const jwt = require("jsonwebtoken");

const login = (req, res) => {
	try {
		const { username, password } = req.body;

		if (!username && !password) return res.send(409);

		if (username === "admin" && password === "admin") {
			const token = jwt.sign(
				{ role: "admin", id: 1, username: "admin" },
				"Supper_SECRET_DONT_SHARE",
				{ expiresIn: "365d" },
			);

			return res.send({ token, role: "admin", userId: 1 });
		}
		res.statusText = "invalid";
		res.status(409).json({ message: "invalid credential" });
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
};

module.exports = { login };
