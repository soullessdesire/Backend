const FacebookStrategy = require("passport-facebook").Strategy;
const express = require("express");
const router = express.Router();
const User = require("../Schemas/DB/user");
const passport = require("passport");
const dotenv = require("dotenv");
const generateToken = require("../authFuncs/generateToken");
const image = require("../Schemas/DB/image");
dotenv.config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: "https://localhost:3000/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails"],
    },
    async (_, __, profile, done) => {
      try {
        let user = await User.findOne({ facebookId: profile.id });
        const Image = await image.create({
          path: profile.profileUrl,
        });
        console.log(profile, user);
        if (!user) {
          user = await User.create({
            username: profile.displayName,
            provider: profile.provider,
            facebookId: profile.id,
            Image: Image._id,
          });
        }
        done(null, user);
      } catch (error) {
        console.error("Error in Facebook strategy:", error);
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.facebookId);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ facebookId: id });
    done(null, user);
  } catch (error) {
    console.error("Error deserializing user:", error);
    done(error);
  }
});

router.get(
  "/",
  passport.authenticate("facebook", {
    scope: ["public_profile"],
  })
);

router.get(
  "/callback",
  passport.authenticate("facebook", {
    failureRedirect: "https://localhost:5173/login",
  }),
  (req, res) => {
    if (req.user) {
      console.log(req.user, "here is the log");
    }
    const token = generateToken(req.user.username);
    res.redirect(
      `https://localhost:5173/patient/${req.user.username}/profile?token=${token}`
    );
  }
);

module.exports = router;
