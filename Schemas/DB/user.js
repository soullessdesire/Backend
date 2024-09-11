const mongoose = require("mongoose");
("https://youtube.com/shorts/nckf0HKja3A?si=DS3vfPygLx5Ql4za");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "The username is required"],
    unique: true,
    minLength: 4,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
  },
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
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
    unique: true,
    partialFilterExpression: {
      googleId: {
        $exists: true,
        $ne: null,
      },
    },
  }
);
userSchema.index(
  { facebookId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      facebookId: {
        $exists: true,
        $ne: null,
      },
    },
  }
);
userSchema.pre(
  ["findOneAndUpdate", "updateOne", "updateMany"],
  function (next) {
    this.set({ updateAt: Date.now() });
    next();
  }
);
module.exports = mongoose.model("User", userSchema);
