const express = require("express");
const router = express.Router();
const login = require("../controllers/Login/login");
const auth = require("../authFuncs/auth");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../Schemas/DB/user");
const Image = require("../Schemas/DB/image");
const generateToken = require("../authFuncs/generateToken");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "https://localhost:3000/api/auth/google/callback",
    },
    async (_, __, profile, done) => {
      let user = await User.findOne({ googleId: profile.id });
      console.log(user);
      if (!user) {
        let image;
        if (profile.photos.length) {
          image = await Image.create({
            path: profile.photos[0].value,
          });
          console.log(image);
        }
        user = await User.create({
          username: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          Image: image ? image._id : "",
        });
      }
      done(null, user);
    }
  )
);
passport.serializeUser((user, done) => {
  try {
    console.log(user, "here is another fucking log");
    done(null, user.googleId);
  } catch (error) {
    console.error("Error serializing user:", error);
    done(error);
  }
});

passport.deserializeUser(async (googleId, done) => {
  try {
    const user = await User.findOne({ googleId });
    done(null, user);
  } catch (error) {
    done(error);
  }
});
router.get(
  "/",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/callback",
  passport.authenticate("google", {
    failureRedirect: "https://localhost:5173/form/main",
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
