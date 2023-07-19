const Speaker = require("../Models/speakerModel");
const Conference = require("../Models/conferenceModel");
const mongoose = require("mongoose");
const conferenceModel = require("../Models/conferenceModel");

// This function will be run when a speaker submits their form
const createSpeaker = async (req, res) => {
  // the request body when a speaker fills out the form.
  const {
    firstName,
    lastName,
    bio,
    email,
    organization,
    phoneNumber,
    conferenceId,
    topic,
    createdAt,
  } = req.body;

  // checks for the validity of the email format.
  const isValidEmail = (email) => {
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regEmail.test(email);
  };

  if (!isValidEmail(email)) {
    return res
      .status(400)
      .json({ error: "Please enter a valid email address." });
  }

  try {
    const email = req.body.email;

    // checks to see if the email they create is unique.
    const existingEmail = await Speaker.findOne({ email: email });

    if (existingEmail) {
      return res.status(409).json({
        error: "This email already exists. Please Choose another one.",
      });
    }

    // if it passes the check above it will create a speaker with the following credentials, otherwise it will give an error.
    const speaker = await Speaker.create({
      firstName,
      lastName,
      bio,
      email,
      organization,
      phoneNumber,
      conference: conferenceId,
      topic,
      createdAt,
    });
    res.status(200).json(speaker);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getSpeakerByConferenceId = async (req, res) => {
  const { conferenceId } = req.params;

  try {
    const speakers = await Speaker.find({ conference: conferenceId });

    if (!conferenceId) {
      res.status(200).json({
        message: "This speaker has no conferences.",
      });
    }

    res.status(200).json(speakers);
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
};

// Read all speakers sorted by last name ascending
const getAllSpeakers = async (res) => {
  try {
    //finds all speakers and sorts by last name. Returns the speaker in JSON format.
    const speakers = await Speaker.find({}).sort({ lastName: 1 });

    res.status(200).json(speakers);
  } catch {
    res.status(500).json({ error: "Internal server error." });
  }
};

// read a single speaker by id or email
const getASpeaker = async (req, res) => {
  const { id } = req.params;

  // checks to see if the speaker ID is a valid mongoose Object ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Please enter a valid Speaker ID." });
  }

  try {
    let speaker;

    speaker = await Speaker.findById(id);

    if (!speaker) {
      speaker = await Speaker.findOne({ email: id });
    }

    if (!speaker) {
      return res
        .status(404)
        .json({ error: "Please enter a speaker id or email." });
    }

    res.status(200).json(speaker);
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
};

const updateSpeaker = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Please enter a valid Speaker ID." });
  }

  try {
    let speaker;
    let speakerEmail = req.body.email;

    speaker = await Speaker.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!speaker) {
      speaker = await Speaker.findOneAndUpdate(
        { email: speakerEmail },
        { ...req.body },
        { new: true }
      );
    }

    if (!speaker) {
      return res
        .status(404)
        .json({ error: "Please enter a speaker ID or email." });
    }

    res.status(200).json({ message: "Speaker has been updated!" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server Error." });
  }
};

const deleteSpeaker = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Please enter a valid Speaker ID." });
  }

  try {
    const speaker = await Speaker.findByIdAndDelete(id);

    if (!speaker) {
      return res
        .status(404)
        .json({ error: "Please enter a speaker ID or email." });
    }

    res.status(200).json({ message: "Speaker has been deleted." });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  createSpeaker,
  getAllSpeakers,
  getASpeaker,
  updateSpeaker,
  deleteSpeaker,
  getSpeakerByConferenceId,
};
