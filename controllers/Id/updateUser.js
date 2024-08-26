const User = require("../../Schemas/DB/user");
const hashing = require("../../cryptography/hashing");

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };
    if (updateData.password) {
      updateData.password = hashing(updateData.password);
    }
    password = hashing(password);
    const user = await User.findByIdAndUpdate(id, { ...req.body, password });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = updateUser;
