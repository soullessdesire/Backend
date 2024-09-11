const mongoose = require("mongoose");

const personalDetails = new mongoose.Schema({
  Religion: String,
  Gender: String,
  maritalStatus: Boolean,
  Sexuality: String,
  Tribe: String,
  phoneNumber: String,
  dateOfBirth: String,
});

module.exports = mongoose.model("PersonalDetails", personalDetails);
