const res = require("express/lib/response");
const Speaker = require("../Models/speakerModel");
const mongoose = require("mongoose");

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

const getAllSpeakers = async (res) => {
  const speakers = await Speaker.find({}).sort({ lastName: 1 });
};
