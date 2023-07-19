const express = require("express");
const mongoose = require("mongoose");

const {
  createSpeaker,
  getAllSpeakers,
  getASpeaker,
  updateSpeaker,
  deleteSpeaker,
  getSpeakerByConferenceId,
} = require("../Controllers/speakerController");

const router = express.Router();

router.post("/", createSpeaker);
router.get("/", getAllSpeakers);
router.get("/:id", getASpeaker);
router.get("/conference/:id", getSpeakerByConferenceId);
router.patch("/:id", updateSpeaker);
router.delete("/:id", deleteSpeaker);

module.exports = router;
