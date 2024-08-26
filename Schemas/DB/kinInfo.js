const mongoose = require("mongoose");

const kinInfo = new mongoose.Schema({
  closestKinName: String,
  closestKinPhoneNumber: String,
  // relation: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Kin", kinInfo);
