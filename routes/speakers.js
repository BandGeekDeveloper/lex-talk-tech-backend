const express = require("express");
const mongoose = require("mongoose");

const {
  createSpeaker,
  getAllSpeakers,
  updateSpeaker,
  deleteSpeaker,
} = require("../Controllers/speakerController");

const router = express.Router();

router.post("/", createSpeaker);
router.get("/", getAllSpeakers);
router.patch("/:id", updateSpeaker);
router.delete("/:id", deleteSpeaker);

module.exports = router;
