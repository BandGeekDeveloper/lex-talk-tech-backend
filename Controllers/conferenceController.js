const Conference = require("../Models/conferenceModel");
const mongoose = require("mongoose");

const throwErrorRes = (res, status, message) => {
  return res.status(status).json({error: message})
}

const getAllConferences = async (req,res) => {
  try {
    const conferences = await Conference.find({}).sort({ conferenceDate: -1 });

    res.status(200).json(conferences);
  } catch (err) {
    throwErrorRes(res, 500, "The was a problem getting conferences. Please try again.")
  }
};

const getAConference = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return throwErrorRes(res, 400, "Invalid Conference ID. Please try your search again.")
    }

    const conference = await Conference.findById(id);

    if (!conference) {
      return res.status(400).json({error: "We cannot find your conference. Please try your search again."})
    }

    res.status(200).json(conference);
  } catch (err) {
    res.status(500).json({error: "There was a problem getting the conference. Please try again."})
  }
};

module.exports = {
  getAllConferences,
  getAConference,
};
