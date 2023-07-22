const express = require("express");
const mongoose = require("mongoose");

const {
  createEvent,
  getEventByConferenceId,
  getEventBySpeakerId,
  getAllEvents,
  getAnEvent,
  updateEvent,
  deleteEvent,
} = require("../Controllers/eventController");

const router = express.Router();

router.post("/", createEvent);
router.get("/", getAllEvents);
router.get("/:id", getAnEvent);
router.get("/conference/:id", getEventByConferenceId);
router.get("/speaker/:id", getEventBySpeakerId);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
