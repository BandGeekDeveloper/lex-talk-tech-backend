const Conference = require("../Models/conferenceModel");
const mongoose = require("mongoose");

const getAllConferences = async (res) => {
  try {
    const conferences = await Conference.find({}).sort({ conferenceDate: -1 });
    res.status(200).json(conferences);
  } catch {
    res.status(500).json({ error: "Internal server error." });
  }
};

const getAConference = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(404)
        .json({ error: "Please enter a valid conference ID." });
    }

    const conference = await Conference.findById(id);

    if (!conference) {
      return res.status(404).json({ error: "Please enter a conference ID." });
    }

    res.status(200).json(conference);
  } catch (err) {
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  getAllConferences,
  getAConference,
};
