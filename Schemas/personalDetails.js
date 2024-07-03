const mongoose = require("mongoose");

const personalDetails = new mongoose.Schema({
  Religion: String,
  Gender: String,
  maritalStatus: Boolean,
  Sexuality: String,
  Tribe: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("PersonalDetails", personalDetails);
