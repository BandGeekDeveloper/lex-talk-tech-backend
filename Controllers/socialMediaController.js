const Speaker = require("../Models/speakerModel");
const Platform = require("../Models/platformModel");
const SocialMedia = require("../Models/socialMediaModel");
const mongoose = require("mongoose");

const throwErrorResponse = (res, status, message) => {
  return res.status(status).json({ error: message });
};

const createSocialMedia = async (req, res) => {
  const { handle, profileUrl, speakerId, platformId } = req.params;

  try {
    const socialMedia = await SocialMedia.create({
      handle,
      profileUrl,
      speaker: speakerId,
      platform: platformId,
    });
    res
      .status(201)
      .json({ message: "Social Media has been added!", data: socialMedia });
  } catch (err) {
    throwErrorResponse(
      res,
      500,
      "There has been a problem adding the social media. Please try again."
    );
  }
};
