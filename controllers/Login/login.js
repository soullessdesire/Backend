const User = require("../../Schemas/DB/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  let { username, password } = req.body;
  username = username.trim();
  password = password.trim();
  try {
    const user = await User.where("username").equals(username);
    console.log(user);
    if (!user.length) {
      res.status(400).json({ message: "Invalid Username" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user[0].password);
    console.log(isMatch);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid Password" });
      return;
    }
    const payload = {
      role: "patient",
      user: user[0].username,
      iat: Date.now(),
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET_KEY,
      { expiresIn: 600000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
module.exports = login;
