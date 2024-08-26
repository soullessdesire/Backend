const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  address: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Address", addressSchema);
