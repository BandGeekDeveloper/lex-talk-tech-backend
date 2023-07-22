const Event = require("../Models/eventModel");
const Speaker = require("../Models/speakerModel");
const Conference = require("../Models/conferenceModel");
const mongoose = require("mongoose");

const createEvent = async (req, res) => {
  const {
    title,
    description,
    startTime,
    endTime,
    eventType,
    speakerId,
    conferenceId,
    createdAt,
  } = req.body;

  try {
    await Promise.all([
      Speaker.findById(speakerId).exec(),
      Conference.findById(conferenceId).exec(),
    ]);

    if (!speakerId || !conferenceId) {
      return res
        .status(404)
        .json({ error: "Invalid conference or speaker ID." });
    }

    const event = await Event.create({
      title,
      description,
      startTime,
      endTime,
      eventType,
      speaker: speakerId,
      conference: conferenceId,
      createdAt,
    });
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getEventByConferenceId = async (req, res) => {
  const { conferenceId } = req.params;

  try {
    const event = await Event.find({ conference: conferenceId });

    if (!conferenceId) {
      res.status(200).json({
        message: "This event is not at this conference.",
      });
    }

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const getEventBySpeakerId = async (req, res) => {
  const { speakerId } = req.params;

  try {
    const event = await Event.find({ speaker: speakerId });

    if (!speakerId) {
      res.status(200).json({
        message: "This event does not belong to that speaker.",
      });
    }

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const getAllEvents = async (res) => {
  try {
    //finds all speakers and sorts by last name. Returns the speaker in JSON format.
    const events = await Speaker.find({}).sort({ startTime: 1 });

    res.status(200).json(events);
  } catch {
    res.status(500).json({ error: "Internal server error." });
  }
};

const getAnEvent = async (req, res) => {
  const { id } = req.params;

  // checks to see if the speaker ID is a valid mongoose Object ID
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Please enter a valid event ID." });
    }

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({ error: "Please enter an event ID." });
    }

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Please enter a valid event ID" });
  }

  try {
    const event = await Event.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!event) {
      return res.status(404).json({ error: "Please enter an event ID." });
    }
    res.status(200).json({ message: "Event has been updated!" });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server error." });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Please enter a valid event ID." });
  }

  try {
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({ error: "Please enter a event ID" });
    }

    res.status(200).json({ message: "Event has been deleted." });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  createEvent,
  getEventByConferenceId,
  getEventBySpeakerId,
  getAllEvents,
  getAnEvent,
  updateEvent,
  deleteEvent,
};
