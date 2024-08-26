const mongoose = require("mongoose");

const kinInfo = new mongoose.Schema({
  closestKinName: String,
  closestKinPhoneNumber: String,
  // relation: String,
});

module.exports = mongoose.model("Kin", kinInfo);
