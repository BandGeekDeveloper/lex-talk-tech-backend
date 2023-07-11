const Speaker = require("../Models/speakerModel");
const mongoose = require("mongoose");

// This function will be run when a speaker submits their form
const createSpeaker = async (req, res) => {
  const { firstName, lastName, email, organization, phoneNumber, talkTopic } =
    req.body;

  try {
    const speaker = await Speaker.create({
      firstName,
      lastName,
      email,
      organization,
      phoneNumber,
      talkTopic,
    });
    res.status(200).json(speaker);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read all speakers sorted by last name ascending
const getAllSpeakers = async (res) => {
  try {
    const speakers = await Speaker.find({}).sort({ lastName: 1 });

    res.status(200).json(speakers);
  } catch {
    res.status(500).json({ error: "Internal server error." });
  }
};

// read a single speaker by id or email
const getASpeaker = async (req, res) => {
  const { id } = req.params;

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
