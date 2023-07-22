const Speaker = require("../Models/speakerModel");
const Conference = require("../Models/conferenceModel");
const mongoose = require("mongoose");
const conferenceModel = require("../Models/conferenceModel");

const throwErrorResponse = (res, status, message) => {
  return res.status(status).json({ error: message });
};

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

  if (!firstName || !lastName || !email) {
    return throwErrorResponse(res, 400, "Please fill out any required fields.");
  }

  // checks for the validity of the email format.
  const isValidEmail = (email) => {
    const regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return regEmail.test(email);
  };

  if (!isValidEmail(email)) {
    return throwErrorResponse(
      res,
      400,
      "The email you entered is not valid. Please try again."
    );
  }

  try {
    // checks to see if the email they create is unique.
    const existingEmail = await Speaker.findOne({ email: email });

    if (existingEmail) {
      return throwErrorResponse(
        res,
        409,
        "The email you entered is already in use. Please try again."
      );
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
    res
      .status(201)
      .json({ message: "Speaker has been created!", data: speaker });
  } catch (err) {
    throwErrorResponse(
      res,
      500,
      "There has been a problem while creating the speaker. Please try again."
    );
  }
};

// Read all speakers sorted by last name ascending
const getAllSpeakers = async (req, res) => {
  try {
    //finds all speakers and sorts by last name. Returns the speaker in JSON format.
    const speakers = await Speaker.find({}).sort({ lastName: 1 });

    res.status(200).json(speakers);
  } catch {
    throwErrorResponse(
      res,
      500,
      "The has been a problem getting the speakers. Please try again."
    );
  }
};

const updateSpeaker = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return throwErrorResponse(res, 400, "Please enter a valid Speaker ID.");
  }

  try {
    updatedSpeaker = await Speaker.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!updatedSpeaker) {
      return throwErrorResponse(
        res,
        400,
        "Speaker not found. Please enter a valid speaker ID."
      );
    }
    res
      .status(200)
      .json({ message: "Speaker has been updated!", data: updatedSpeaker });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error updating the speaker. Please try again." });
  }
};

const deleteSpeaker = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return throwErrorResponse(res, 500, "Please enter a valid Speaker ID.");
  }

  try {
    const deletedSpeaker = await Speaker.findByIdAndDelete(id);

    if (!deletedSpeaker) {
      return throwErrorResponse(
        res,
        404,
        "Speaker not found. Please enter a valid speaker ID."
      );
    }

    res
      .status(204)
      .json({ message: "Speaker has been deleted.", data: deletedSpeaker });
  } catch (err) {
    return throwErrorResponse(
      res,
      500,
      "There was an error deleting the speaker. Please try again."
    );
  }
};

module.exports = {
  createSpeaker,
  getAllSpeakers,
  updateSpeaker,
  deleteSpeaker,
};
