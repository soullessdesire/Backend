const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  path: String,
});

module.exports = mongoose.model("Image", ImageSchema);
