const User = require("../../Schemas/DB/user");
const hashing = require("../../cryptography/hashing");

const updateUser = async (req, res) => {
  try {
    const { username } = req.params;
    let updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = hashing(updateData["password"]);
    }
    password = hashing(password);
    const user = await User.findOneAndUpdate(
      { username },
      { ...req.body, password }
    );
    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateUser;
