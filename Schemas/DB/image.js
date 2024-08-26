const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  path: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Image", ImageSchema);
