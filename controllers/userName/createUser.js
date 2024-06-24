const User = require("../../Schemas/user");
const hashing = require("../../cryptography/hashing");
require("dotenv").config();
const generateToken = require("../../authFuncs/generateToken");

const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    let { password } = req.body;
    password = await hashing(password);
    const user = await User.create({ username, email, password });
    console.log(user);
    const token = generateToken();
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error.message);
  }
};

module.exports = createUser;
