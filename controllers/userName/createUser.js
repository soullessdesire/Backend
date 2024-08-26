const User = require("../../Schemas/DB/user");
const hashing = require("../../cryptography/hashing");
require("dotenv").config();
const generateToken = require("../../authFuncs/generateToken");
const kinInfo = require("../../Schemas/DB/kinInfo");
const Services = require("../../Schemas/DB/Services");
const personalDetails = require("../../Schemas/DB/personalDetails");
const Image = require("../../Schemas/DB/image");
const Address = require("../../Schemas/DB/address");

const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    let { password } = req.body;
    password = await hashing(password);
    const user = await User.create({
      username,
      email,
      password,
    });
    console.log(user, req.body);

    const { closestKinName, closestKinPhoneNumber } = req.body;
    const kin = await kinInfo.create({
      closestKinName,
      closestKinPhoneNumber,
      userId: user._id,
    });
    const { physicalTherapy, couplesTherapy, drugTherapy } = req.body;
    const service = await Services.create({
      physicalTherapy,
      couplesTherapy,
      drugTherapy,
      userId: user._id,
    });
    const { Gender, Status, Sexuality, Religion, Tribe } = req.body;
    const personal = await personalDetails.create({
      Gender,
      Status,
      Sexuality,
      Religion,
      Tribe,
      userId: user._id,
    });
    const image = await Image.create({
      path: req.file.path,
    });
    const { address } = req.body;
    const Ad = await Address.create({
      address,
    });
    console.log(req.file, service, kin, personal, image, Ad);

    const token = generateToken();
    res.status(200).json({ token, data: req.file });
  } catch (error) {
    res.status(500).json({ message: error.message });

    console.log(error.message);
  }
};

module.exports = createUser;
