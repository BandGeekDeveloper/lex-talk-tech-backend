const express = require("express");
const mongoose = require("mongoose");

const {
  getAllConferences,
  getAConference,
} = require("../Controllers/conferenceController");

const router = express.Router();

router.get("/", getAllConferences);
router.get("/:id", getAConference);

module.exports = router;
