const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const platformSchema = new Schema({
  label: {
    type: String,
  },
});

module.exports = mongoose.model("Platform", platformSchema);
