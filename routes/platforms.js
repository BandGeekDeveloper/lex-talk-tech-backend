const express = require("express");

const { getPlatforms } = require("../Controllers/platformController");

const router = express.Router();

router.get("/", getPlatforms);

module.exports = router;
