const mongoose = require("mongoose");
const Speaker = require("./speakerModel");

const Schema = mongoose.Schema;

const conferenceSchema = new Schema({
  handle: {
    type: String,
    required: false,
  },

  speakerId: {
    type: Schema.Types.ObjectId,
    ref: "Speaker",
  },

  platform: {
    type: String,
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Conference", conferenceSchema);
