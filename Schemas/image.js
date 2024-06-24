const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  name: String,
  path: String,
});

module.exports = mongoose.model("Image", ImageSchema);
