const express = require("express");
const router = express.Router();
const login = require("../controllers/Login/login");
const auth = require("../authFuncs/auth");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../Schemas/user");
const generateToken = require("../authFuncs/generateToken");

router.post("/login", login);
router.post("/auth", auth);
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      let user = await User.find({ googleId: profile.id });
      console.log(user);
      if (!user.length) {
        user = await User.create({
          username: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
          accessToken,
          refreshToken,
        });
      } else {
        user.accessToken = accessToken;
        user.refreshToken = refreshToken;
      }
      done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (error) {
    console.error("Error serializing user:", error);
    done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    console.log(id);
    const user = await User.find({ googleId: id });
    done(null, user);
  } catch (error) {
    done(error);
  }
});
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    if (req.user) {
      console.log(req.user, "here is the log");
    }
    const token = generateToken();
    res.redirect(
      `http://localhost:5173/patient/${req.user.name.givenName}?token=${token}`
    );
  }
);

module.exports = router;
