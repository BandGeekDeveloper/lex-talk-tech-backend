const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conferenceSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  conferenceDate: {
    type: Date,
    required: true,
  },

  venueName: {
    type: String,
    required: false,
  },

  venueAddress1: {
    type: String,
  },

  venueAddress2: {
    type: String,
  },

  venueCity: {
    type: String,
  },

  venueState: {
    type: String,
  },

  venuePostalCode: {
    type: Number,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Conference", conferenceSchema);
