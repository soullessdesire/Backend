const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  drugTherapy: Boolean,
  couplesTherapy: Boolean,
  physicalTherapy: Boolean,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Services", serviceSchema);
