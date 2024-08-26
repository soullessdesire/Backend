const nodemailer = require("nodemailer");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USERNAME,
    pass: process.env.GMAIL_PASSWORD,
  },
});
const html = ``;
// let trassport = nodemailer.createTransport({
//   host: "",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "dontgiveafuck@outlook.com",
//     pass: "Munyuamwangi4$",
//   },
// });
const info = await transporter.sendMail(
  {
    html,
    subject: "Forgort Password",
    to: "mbwakoko88@gmail.com",
    from: "soullessdesire@gmail.com",
  },
  (error, info) => {
    if (error) {
    }
  }
);

module.exports = transporter;
