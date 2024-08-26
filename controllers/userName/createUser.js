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
    let kin;
    let service;
    let personal;
    let Ad;
    let image;
    try {
      const { closestKinName, closestKinPhoneNumber } = req.body;
      if (closestKinName && closestKinPhoneNumber) {
        kin = await kinInfo.create({
          closestKinName,
          closestKinPhoneNumber,
        });
        console.log(kin);
      }
    } catch (e) {
      console.log(e);
    }
    try {
      const { servicesNeeded } = req.body;
      if (servicesNeeded) {
        const { physicalTherapy, couplesTherapy, drugTherapy } = servicesNeeded;
        service = await Services.create({
          physicalTherapy,
          couplesTherapy,
          drugTherapy,
        });
        console.log(service);
      }
    } catch (e) {
      console.log(e);
    }
    const { Gender, Status, Sexuality, Religion, Tribe, phoneNumber } =
      req.body;
    if ((Gender && Status && Sexuality && Religion, Tribe)) {
      personal = await personalDetails.create({
        Gender,
        Status,
        Sexuality,
        Religion,
        Tribe,
        phoneNumber,
      });
      console.log(personal);
    }
    console.log(req.file);
    if (req.file) {
      image = await Image.create({
        path: req.file.path,
      });
      console.log(image);
    }
    const { address } = req.body;
    if (address) {
      Ad = await Address.create({ address });
      console.log(Ad);
    }
    const { username, email } = req.body;
    const token = generateToken(username);
    let { password } = req.body;
    password = await hashing(password);
    const { googleId } = req.body;
    // console.log(personal._id);
    console.log(service._id);
    console.log(image._id);
    // console.log(kin._id);
    console.log(Ad._id);
    const user = await User.create({
      username,
      email,
      password,
      googleId,
      // kinInfo: kin._id,
      Services: service._id,
      // personalDetails: personal._id,
      Image: image._id,
      Address: Ad._id,
    });
    return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error });

    console.log(error);
  }
};

module.exports = createUser;
