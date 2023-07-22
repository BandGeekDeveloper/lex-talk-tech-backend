const Platform = require("../Models/platformModel");

const getPlatforms = async (req, res) => {
  try {
    const allPlatforms = await Platform.find({}).sort({ label: 1 });

    res.status(200).json(allPlatforms);
  } catch (err) {
    res.status(500).json({
      error: "There was an error getting all platforms. Please try again.",
    });
  }
};

module.exports = {
  getPlatforms,
};
