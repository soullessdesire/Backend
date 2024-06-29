const express = require("express");
const router = express.Router();
const transporter = require("../Forgot Passowrd/forgotpassword");

router.post("/", (req, res) => {
  const { to, subject, text, html } = req.body;

  let mailOptions = {
    from: "soullessdesire34@gmail.com",
    to,
    subject,
    text,
    html,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Message sent " + info.messageId);
  });
});
router.post("/forgort-password", (req, res) => {
  const { to, subject } = req.body();
  let mailOptions = {
    from: "soullessdesire34@gmail.com",
    to,
    subject,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Message sent " + info.messageId);
  });
});
