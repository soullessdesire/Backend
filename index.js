//imports
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userIdRoute = require("./routes/apiusersid");
const userUserNameRoute = require("./routes/apiusername");
const login = require("./routes/login");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const Image = require("./Schemas/image.js");

// constants
const app = express();
const PORT = 3000;

//middleware
app.use(cors());
app.use(express.json());
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
      mongoUrl: "mongodb://127.0.0.1:27017/session",
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

// routes
app.use("/api/users/id", userIdRoute);
app.use("/api/users/username", userUserNameRoute);
app.use("", login);

app.get("/", (req, res) => {
  try {
    if (!req.session.viewCount) {
      req.session.viewCount = 1;
    } else {
      req.session.viewCount++;
    }
  } catch {
    console.log("error");
  }
  console.log(req.session);
  res.send("<h1>fuck off</h1>");
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
