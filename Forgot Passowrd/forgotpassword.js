const jwt = require("jsonwebtoken");
const path = require("path");
const nodemailer = require("nodemailer");
const ejs = require("ejs");
const express = require("express");
const router = express.Router();
const User = require("../Schemas/DB/user");
const dotenv = require("dotenv");
dotenv.config();

router.post("/forgotpassword", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    const payload = {
      user: user[0].username,
    };
    if (user.length) {
      return res.json({ message: `user with the email ${email} is not found` });
    }
    jwt.sign(
      payload,
      process.env.SESSION_SECRET_KEY,
      { expiresIn: 300000 },
      (err, token) => {
        if (err) res.sendStatus(500);
        const templateData = {
          appName: "Serene",
          logoUrl: "../../assets/logo.svg",
          resetLink: `https://localhost:5173/form/main/forgotPassChange?state=${token}`,
        };

        ejs.renderFile(
          path.join(__dirname, "PasswordChange.ejs"),
          templateData,
          (err, html) => {
            if (err) res.sendStatus(500);
            let transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: process.env.GMAIL,
                pass: process.env.GMAIL_PASS,
              },
            });

            let mailOptions = {
              from: '"Serene" soullessdesire34@gmail.com',
              to: `${email}`,
              subject: "Password Change Request",
              html: html,
            };

            transporter.sendMail(mailOptions, (error, info) => {
              if (error) {
                res.sendStatus(500);
                return console.log(error);
              }
              console.log("Message sent: %s", info.messageId);
              console.log(
                "Preview URL: %s",
                nodemailer.getTestMessageUrl(info)
              );
            });
          }
        );
      }
    );
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
