const express = require("express");

const router = express.Router();

const { upload } = require("../controllers/excel.controller");
const uploadFile = require("../config/multer");

router.post("/xlsFile", uploadFile.single("file"), upload);

module.exports = router;
