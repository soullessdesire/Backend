const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  drugTherapy: Boolean,
  couplesTherapy: Boolean,
  physicalTherapy: Boolean,
});

module.exports = mongoose.model("Services", serviceSchema);
