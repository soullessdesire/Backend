//imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userIdRoute = require("./routes/apiusersid");
const userUserNameRoute = require("./routes/apiusername");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const FacebookLogin = require("./utils/facebookLogin");
const GoogleLogin = require("./utils/googleLogin");
const forgotPassChange = require("./Forgot Passowrd/forgotpassword");
const MongoStore = require("connect-mongo");
const https = require("https");
const fs = require("fs");
const path = require("path");
const authLogin = require("./utils/auth&Login");

// constants
const app = express();
const PORT = 3000;

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose
  .connect("mongodb://127.0.0.1:27017/User")
  .then(() => console.log("connected to database"))
  .catch((error) => console.log(error));
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    name: "localhost",
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/User",
      autoRemove: "interval",
      autoRemoveInterval: 60,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    // genid: (req) => {
    //   if (!req.session) {
    //     console.error("Session is not initialized");
    //     return null; // Return null to indicate failure
    //   }
    //   if (!req.session.viewCount) {
    //     req.session.viewCount = 1;
    //   } else {
    //     req.session.viewCount++;
    //   }
    //   return req.sessionID;
    // },
  })
);

app.use(passport.initialize());
app.use(passport.session());

//public

app.use("/public", express.static(path.join(__dirname, "public")));
// routes
app.use("/api/users/id", userIdRoute);
app.use("/api/users/username", userUserNameRoute);
app.use("/api/auth/facebook", FacebookLogin);
app.use("/api/auth/google", GoogleLogin);
app.use("/api/users/passChangeEmail", forgotPassChange);
app.use("/api", authLogin);

https
  .createServer(
    {
      key: fs.readFileSync(path.join(__dirname, "key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "cert.pem")),
      passphrase: process.env.PASS_PHRASE,
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Backend server is running on https://localhost:${PORT}`);
  });
