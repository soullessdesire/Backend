const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "The username is required"],
    unique: true,
    minLength: 4,
  },
  email: {
    type: String,
    required: [true, "The email is required"],
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (value) {
        return (
          /[A-Z]/.test(value) && /[$.?><)(*&^%$#@!-_=}{}\/'";:+]/.test(value)
        );
      },
      message:
        "The password must contain one capital letter and one special character",
    },
  },
  googleId: {
    type: String,
    validate: {
      validator: function (value) {
        const count = mongoose
          .model("User")
          .countDocuments({ googleId: value });
        return count === 0;
      },
      message: "This googleId is already in use",
    },
  },
  accessToken: String,
  refreshToken: String,
  personalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PersonalDetails",
  },
  Image: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
  },
  kinInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kin",
  },
  Services: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Services",
  },
  Address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Address",
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: Date,
    default: () => Date.now(),
  },
});

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index(
  { googleId: 1 },
  {
    partialFilterExpression: {
      googleId: { $type: "string", $exists: true, $ne: null },
    },
  }
);

module.exports = mongoose.model("User", userSchema);
