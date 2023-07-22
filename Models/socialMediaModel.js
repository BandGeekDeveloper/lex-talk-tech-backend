const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const socialMediaSchema = new Schema({
  handle: {
    type: String,
    required: false,
  },
});
