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
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// read a single speaker by id
const getAUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid Speaker ID" });
  }

  try {
    let speaker;

    speaker = await Speaker.findById(id);

    if (!speaker) {
      speaker = await Speaker.findOne({ email: id });
    }

    if (!speaker) {
      return res.status(404).json({ error: "Speaker does not exist" });
    }

    res.status(200).json(speaker);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const updateSpeaker = async (req, res) => {
//     const {id} = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({error: "Invalid speaker ID"})
//     }

//     try {

//         let speaker;

//         speaker = await Speaker.findOneAndUpdate({_id: id}, {...req.body});

//         if (!speaker) {
//             speaker = await Speaker.findOneAndUpdate({_email: email}, {...req.body});
//         }
//     } catch (err) {

//     }
// }
