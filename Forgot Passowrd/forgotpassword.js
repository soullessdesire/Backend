const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "soullessdesire34@gmail.com",
    pass: "Munyuamwangi4$",
  },
});

module.exports = transporter;
