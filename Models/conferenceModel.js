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

  venue: {
    type: String,
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Conference", conferenceSchema);
