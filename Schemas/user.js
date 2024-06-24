const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "The username is required"],
    validator: {
      validate: async function (value) {
        const count = await mongoose
          .model("User")
          .countDocuments({ username: value });
        return count === 0;
      },
      message: "The username is already in use",
    },
  },
  email: {
    type: String,
    required: [true, "The email is required"],
  },
  password: {
    type: String,
    minLength: 8,
    validator: {
      validate: async function (value) {
        if (
          /[A-Z]/.test(value) &&
          /[$.?><)(*&^%$#@!-_=}{}\/'";:+]/.test(value)
        ) {
          return true;
        }
        console.log("password error");
        return false;
      },
      message:
        "The password must contain one capital letter and one special character",
    },
  },
  googleId: {
    type: String,
    validator: {
      validate: async function (value) {
        const count = await mongoose
          .model("User")
          .countDocuments({ googleId: value });
        return count === 0;
      },
      message: "This googleId is already used",
    },
  },
  accessToken: String,
  refreshToken: String,
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

module.exports = mongoose.model("User", userSchema);
