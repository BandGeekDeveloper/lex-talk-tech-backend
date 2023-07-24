const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const socialMediaSchema = new Schema({
  handle: {
    type: String,
    required: false,
  },

  profileUrl: {
    type: String,
  },

  speakerID: {
    type: Schema.Types.ObjectId,
    ref: "Speaker",
  },

  platformId: {
    type: Schema.Types.ObjectId,
    ref: "Platform",
  }
});

module.exports = mongoose.model("SocialMedia", socialMediaSchema);
