const mongoose = require("mongoose");
const Conference = require("./conferenceModel");

const Schema = mongoose.Schema;

const speakerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  bio: {
    type: String,
    required: false,
  },

  email: {
    type: String,
    required: true,
  },

  organization: {
    type: String,
    required: false,
  },

  phoneNumber: {
    type: String,
    required: false,
  },

  conferenceId: {
    type: Schema.Types.ObjectId,
    ref: "Conference",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Speaker", speakerSchema);
