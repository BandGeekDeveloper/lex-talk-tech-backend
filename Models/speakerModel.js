const mongoose = require("mongoose");

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

  topic: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Speaker", speakerSchema);
