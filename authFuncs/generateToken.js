const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = () => {
  const payload = {
    role: "patient",
    iat: Date.now(),
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: 600000,
  });
  return token;
};
module.exports = generateToken;
