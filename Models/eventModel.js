const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  startTime: {
    type: Date,
    required: true,
  },

  endTime: {
    type: Date,
    required: true,
  },

  eventType: {
    type: String,
    required: true,
  },

  speakerId: {
    type: Schema.Types.ObjectId,
    ref: "Speaker",
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

module.exports = mongoose.model("Event", eventSchema);
